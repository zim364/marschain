"use client";

import { useEffect, useState, useCallback } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { createClient } from "@/lib/supabase/client";

type Profile = {
  user_id: string;
  username: string;
  email: string;
  balance_mrsc: number;
  status: string;
  is_admin: boolean;
  created_at: string;
};

type Payment = {
  id: string;
  coin: string;
  amount_crypto: number;
  amount_usd: number;
  mrsc_credited: number;
  status: string;
  created_at: string;
};

const LAUNCH_DATE = new Date("2027-01-01T00:00:00Z");

export default function DashboardPage() {
  const router = useRouter();
  const supabase = createClient();

  const [profile, setProfile] = useState<Profile | null>(null);
  const [payments, setPayments] = useState<Payment[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [now, setNow] = useState(Date.now());

  // Countdown tick
  useEffect(() => {
    const interval = setInterval(() => setNow(Date.now()), 1000);
    return () => clearInterval(interval);
  }, []);

  // Reusable loader
  const loadData = useCallback(async () => {
    const {
      data: { user },
    } = await supabase.auth.getUser();

    if (!user) {
      router.push("/login");
      return;
    }

    const { data: profileData, error: profileError } = await supabase
      .from("profiles")
      .select("*")
      .eq("id", user.id)
      .single();

    if (profileError || !profileData) {
      setError(profileError?.message || "Could not load profile");
      setLoading(false);
      return;
    }

    // Redirect admins to /admin
    if (profileData.is_admin) {
      router.push("/admin");
      return;
    }

    const { data: paymentsData, error: paymentsError } = await supabase
      .from("payments")
      .select("*")
      .eq("profile_id", user.id)
      .order("created_at", { ascending: false });

    if (paymentsError) {
      console.error("Payments query failed:", paymentsError);
    }

    setProfile(profileData);
    setPayments(paymentsData || []);
    setLoading(false);
  }, [router, supabase]);

  // Initial load
  useEffect(() => {
    loadData();
  }, [loadData]);

  // Re-fetch when tab becomes visible (debounced)
  useEffect(() => {
    let timeout: NodeJS.Timeout;
    function handleVisibility() {
      if (document.visibilityState === "visible") {
        clearTimeout(timeout);
        timeout = setTimeout(() => loadData(), 300);
      }
    }
    document.addEventListener("visibilitychange", handleVisibility);
    return () => {
      document.removeEventListener("visibilitychange", handleVisibility);
      clearTimeout(timeout);
    };
  }, [loadData]);

  async function handleLogout() {
    await supabase.auth.signOut();
    router.push("/login");
    router.refresh();
  }

  if (loading) {
    return (
      <main className="min-h-screen flex items-center justify-center">
        <div className="text-white/40 text-sm">Loading dashboard...</div>
      </main>
    );
  }

  if (error) {
    return (
      <main className="min-h-screen flex items-center justify-center px-6">
        <div className="glass rounded-2xl p-8 max-w-md text-center">
          <div className="text-red-400 text-sm mb-4">Error: {error}</div>
          <button
            onClick={handleLogout}
            className="text-orange-500 text-sm hover:text-orange-400"
          >
            Log out and try again
          </button>
        </div>
      </main>
    );
  }

  if (!profile) return null;

  const diff = LAUNCH_DATE.getTime() - now;
  const days = Math.max(0, Math.floor(diff / (1000 * 60 * 60 * 24)));
  const hours = Math.max(0, Math.floor((diff / (1000 * 60 * 60)) % 24));
  const minutes = Math.max(0, Math.floor((diff / (1000 * 60)) % 60));
  const seconds = Math.max(0, Math.floor((diff / 1000) % 60));

  return (
    <main className="min-h-screen px-4 sm:px-6 py-8 sm:py-10">
      <div className="max-w-5xl mx-auto">
        {/* Top bar */}
        <div className="flex items-center justify-between mb-8 sm:mb-10 fade-up">
          <div className="flex items-center gap-3">
            <div className="logo-mark" style={{ width: 36, height: 36 }}>
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none">
                <path
                  d="M12 2L3 7v10l9 5 9-5V7l-9-5z"
                  stroke="white"
                  strokeWidth="1.5"
                  strokeLinejoin="round"
                />
                <circle cx="12" cy="12" r="3" fill="white" />
              </svg>
            </div>
            <div>
              <div className="text-sm font-semibold">MarsChain</div>
              <div className="text-xs text-white/40">Dashboard</div>
            </div>
          </div>

          <button
            onClick={handleLogout}
            className="text-xs sm:text-sm text-white/50 hover:text-white transition"
          >
            Log out
          </button>
        </div>

        {/* Welcome */}
        <div className="mb-6 sm:mb-8 fade-up fade-up-delay-1">
          <h1 className="text-2xl sm:text-3xl font-semibold tracking-tight">
            Welcome, {profile.username}
          </h1>
          <p className="text-white/40 text-sm mt-2">
            Your User ID:{" "}
            <span className="text-orange-500 font-mono">
              {profile.user_id}
            </span>
          </p>
        </div>

        {/* Cards grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 sm:gap-5 mb-6 sm:mb-8">
          <div className="glass rounded-2xl p-5 sm:p-7 fade-up fade-up-delay-2">
            <div className="text-xs text-white/40 uppercase tracking-wider mb-2">
              Your Balance
            </div>
            <div className="text-3xl sm:text-4xl font-semibold tracking-tight">
              {profile.balance_mrsc.toLocaleString()}{" "}
              <span className="text-orange-500 text-xl sm:text-2xl">
                $MRSC
              </span>
            </div>
            <div className="text-xs text-white/30 mt-3">
              Locked until launch
            </div>
          </div>

          <div className="glass rounded-2xl p-5 sm:p-7 fade-up fade-up-delay-3">
            <div className="text-xs text-white/40 uppercase tracking-wider mb-2">
              Launch In
            </div>
            <div className="flex items-baseline gap-2 sm:gap-3 flex-wrap">
              <div>
                <div className="text-3xl sm:text-4xl font-semibold tracking-tight">
                  {days}
                </div>
                <div className="text-xs text-white/40 uppercase">Days</div>
              </div>
              <div>
                <div className="text-3xl sm:text-4xl font-semibold tracking-tight">
                  {hours}
                </div>
                <div className="text-xs text-white/40 uppercase">Hrs</div>
              </div>
              <div>
                <div className="text-3xl sm:text-4xl font-semibold tracking-tight">
                  {minutes}
                </div>
                <div className="text-xs text-white/40 uppercase">Min</div>
              </div>
              <div>
                <div className="text-3xl sm:text-4xl font-semibold tracking-tight text-orange-500">
                  {seconds}
                </div>
                <div className="text-xs text-white/40 uppercase">Sec</div>
              </div>
            </div>
          </div>
        </div>

        {/* Action cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 sm:gap-5 mb-6 sm:mb-8">
          <Link
            href="/buy"
            className="glass rounded-2xl p-5 sm:p-6 hover:border-orange-500/40 transition fade-up fade-up-delay-4 group"
          >
            <div className="text-base sm:text-lg font-semibold mb-1 group-hover:text-orange-500 transition">
              Buy $MRSC
            </div>
            <div className="text-xs text-white/40">
              Send BTC, USDT, or SOL to get early allocation
            </div>
          </Link>

          <Link
            href="/sell"
            className="glass rounded-2xl p-5 sm:p-6 hover:border-orange-500/40 transition fade-up fade-up-delay-4 group"
          >
            <div className="text-base sm:text-lg font-semibold mb-1 group-hover:text-orange-500 transition">
              Sell
            </div>
            <div className="text-xs text-white/40">
              Locked until launch on January 1
            </div>
          </Link>
        </div>

        {/* Purchase history */}
        <div className="glass rounded-2xl p-5 sm:p-7 fade-up fade-up-delay-4">
          <div className="flex items-center justify-between mb-4">
            <div className="text-sm font-semibold">Purchase History</div>
            <button
              onClick={loadData}
              className="text-xs text-white/40 hover:text-orange-500 transition"
            >
              Refresh
            </button>
          </div>
          {payments.length === 0 ? (
            <div className="text-sm text-white/40 py-8 text-center border border-dashed border-white/10 rounded-xl">
              No purchases yet. Your confirmed payments will appear here.
            </div>
          ) : (
            <div className="space-y-2">
              {payments.map((p) => (
                <div
                  key={p.id}
                  className="flex items-center justify-between px-3 sm:px-4 py-3 rounded-xl bg-white/[0.02] gap-3"
                >
                  <div className="flex items-center gap-3 min-w-0">
                    <div className="w-9 h-9 rounded-lg bg-orange-500/10 flex items-center justify-center text-xs font-semibold text-orange-500 shrink-0">
                      {p.coin}
                    </div>
                    <div className="min-w-0">
                      <div className="text-sm font-semibold truncate">
                        {Number(p.mrsc_credited).toLocaleString()} $MRSC
                      </div>
                      <div className="text-xs text-white/40 truncate">
                        {new Date(p.created_at).toLocaleString()}
                      </div>
                    </div>
                  </div>
                  <div className="text-right shrink-0">
                    <div className="text-sm font-semibold">
                      $
                      {Number(p.amount_usd).toLocaleString(undefined, {
                        minimumFractionDigits: 2,
                        maximumFractionDigits: 2,
                      })}
                    </div>
                    <div
                      className={`text-xs font-medium ${
                        p.status === "confirmed"
                          ? "text-green-400"
                          : p.status === "pending"
                          ? "text-orange-400"
                          : "text-red-400"
                      }`}
                    >
                      {p.status}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>

        {/* Footer */}
        <p className="text-center text-white/20 mt-12 text-xs">
          © {new Date().getFullYear()} MarsChain · Beyond Bitcoin
        </p>
      </div>
    </main>
  );
}
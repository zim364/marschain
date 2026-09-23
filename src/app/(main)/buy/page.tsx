"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { createClient } from "@/lib/supabase/client";
import UserNav from "@/components/UserNav";

type Coin = "BTC" | "USDT" | "SOL";

const COINS: Record<
  Coin,
  { label: string; network: string; color: string; icon: string }
> = {
  BTC: {
    label: "Bitcoin",
    network: "Bitcoin Network",
    color: "#f7931a",
    icon: "₿",
  },
  USDT: {
    label: "USDT",
    network: "Tron (TRC-20)",
    color: "#26a17b",
    icon: "₮",
  },
  SOL: {
    label: "Solana",
    network: "Solana Network",
    color: "#9945ff",
    icon: "◎",
  },
};

const PRICE_PER_MRSC = 1.0;

export default function BuyPage() {
  const router = useRouter();
  const supabase = createClient();

  const [amount, setAmount] = useState<string>("");
  const [selected, setSelected] = useState<Coin>("BTC");
  const [checking, setChecking] = useState(true);

  useEffect(() => {
    async function checkAuth() {
      const {
        data: { user },
      } = await supabase.auth.getUser();
      if (!user) {
        router.push("/login");
        return;
      }

      // Redirect admins to /admin
      const { data: profile } = await supabase
        .from("profiles")
        .select("is_admin")
        .eq("id", user.id)
        .single();

      if (profile?.is_admin) {
        router.push("/admin");
        return;
      }

      setChecking(false);
    }
    checkAuth();
  }, [router, supabase]);

  const numericAmount = parseFloat(amount) || 0;
  const totalUSD = numericAmount * PRICE_PER_MRSC;

  function handleContinue() {
    if (numericAmount < 1) return;
    router.push(`/buy/pay?amount=${numericAmount}&coin=${selected}`);
  }

  if (checking) {
    return (
      <main className="min-h-screen flex items-center justify-center">
        <div className="text-white/40 text-sm">Loading...</div>
      </main>
    );
  }

  return (
    <main className="min-h-screen px-4 sm:px-6 py-8 sm:py-12">
      <div className="max-w-xl mx-auto">
        <UserNav
          subtitle="Buy $MRSC"
          backHref="/dashboard"
          backLabel="← Dashboard"
        />

        {/* Heading */}
        <div className="mb-8 fade-up fade-up-delay-1">
          <div className="text-xs text-white/40 uppercase tracking-wider mb-3">
            Step 1 of 2
          </div>
          <h1 className="text-2xl font-semibold tracking-tight">
            Choose your amount
          </h1>
          <p className="text-white/40 text-sm mt-2">$1.00 per $MRSC</p>
        </div>

        {/* Amount input */}
        <div className="glass rounded-2xl p-6 mb-4 fade-up fade-up-delay-2">
          <label className="block text-xs font-medium mb-3 text-white/60 uppercase tracking-wider">
            Amount
          </label>
          <div className="relative">
            <input
              type="number"
              min="1"
              step="1"
              value={amount}
              onChange={(e) => setAmount(e.target.value)}
              className="input-field text-xl sm:text-2xl font-semibold pr-20"
              placeholder="0"
            />
            <div className="absolute right-4 top-1/2 -translate-y-1/2 text-white/40 text-sm">
              $MRSC
            </div>
          </div>

          {/* Quick amounts */}
          <div className="flex flex-wrap gap-2 mt-4">
            {[100, 500, 1000, 5000, 10000].map((n) => (
              <button
                key={n}
                onClick={() => setAmount(String(n))}
                className="px-3 py-1.5 text-xs rounded-lg border border-white/10 hover:border-orange-500/50 hover:text-orange-500 transition"
              >
                {n.toLocaleString()}
              </button>
            ))}
          </div>

          {/* Total */}
          {numericAmount > 0 && (
            <div className="mt-5 pt-5 border-t border-white/10 flex items-center justify-between">
              <div className="text-sm text-white/40">You pay</div>
              <div className="text-xl font-semibold">
                $
                {totalUSD.toLocaleString(undefined, {
                  minimumFractionDigits: 2,
                  maximumFractionDigits: 2,
                })}{" "}
                <span className="text-white/40 text-sm font-normal">USD</span>
              </div>
            </div>
          )}
        </div>

        {/* Coin selector */}
        <div className="glass rounded-2xl p-6 mb-4 fade-up fade-up-delay-3">
          <label className="block text-xs font-medium mb-4 text-white/60 uppercase tracking-wider">
            Payment method
          </label>
          <div className="space-y-2">
            {(Object.keys(COINS) as Coin[]).map((key) => {
              const c = COINS[key];
              const isActive = selected === key;
              return (
                <button
                  key={key}
                  onClick={() => setSelected(key)}
                  className={`w-full flex items-center gap-3 px-4 py-3 rounded-xl border transition text-left ${
                    isActive
                      ? "border-orange-500/60 bg-orange-500/5"
                      : "border-white/10 hover:border-white/20"
                  }`}
                >
                  <div
                    className="w-9 h-9 rounded-lg flex items-center justify-center text-lg font-semibold shrink-0"
                    style={{
                      background: `${c.color}20`,
                      color: c.color,
                    }}
                  >
                    {c.icon}
                  </div>
                  <div className="flex-1">
                    <div className="text-sm font-semibold">{c.label}</div>
                    <div className="text-xs text-white/40">{c.network}</div>
                  </div>
                  <div
                    className={`w-4 h-4 rounded-full border-2 flex items-center justify-center transition ${
                      isActive ? "border-orange-500" : "border-white/20"
                    }`}
                  >
                    {isActive && (
                      <div className="w-2 h-2 rounded-full bg-orange-500" />
                    )}
                  </div>
                </button>
              );
            })}
          </div>
        </div>

        {/* Continue */}
        <button
          onClick={handleContinue}
          disabled={numericAmount < 1}
          className="btn-primary fade-up fade-up-delay-4"
        >
          Continue to payment →
        </button>

        {/* Footer */}
        <p className="text-center text-white/20 mt-12 text-xs">
          © {new Date().getFullYear()} MarsChain · Beyond Bitcoin
        </p>
      </div>
    </main>
  );
}
"use client";

import { useEffect, useState, Suspense } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import Link from "next/link";
import { createClient } from "@/lib/supabase/client";
import UserNav from "@/components/UserNav";

type Coin = "BTC" | "USDT" | "SOL";

const COINS: Record<
  Coin,
  { label: string; network: string; address: string; color: string; icon: string }
> = {
  BTC: {
    label: "Bitcoin",
    network: "Bitcoin Network",
    address: process.env.NEXT_PUBLIC_BTC_ADDRESS || "",
    color: "#f7931a",
    icon: "₿",
  },
  USDT: {
    label: "USDT",
    network: "Tron (TRC-20)",
    address: process.env.NEXT_PUBLIC_USDT_TRC20_ADDRESS || "",
    color: "#26a17b",
    icon: "₮",
  },
  SOL: {
    label: "Solana",
    network: "Solana Network",
    address: process.env.NEXT_PUBLIC_SOL_ADDRESS || "",
    color: "#9945ff",
    icon: "◎",
  },
};

function PayContent() {
  const router = useRouter();
  const params = useSearchParams();
  const supabase = createClient();

  const amount = parseFloat(params.get("amount") || "0");
  const coinKey = (params.get("coin") || "BTC") as Coin;
  const coin = COINS[coinKey];

  const [copied, setCopied] = useState(false);
  const [checking, setChecking] = useState(true);

  useEffect(() => {
    let cancelled = false;

    async function init() {
      const {
        data: { user },
      } = await supabase.auth.getUser();
      if (!user) {
        router.push("/login");
        return;
      }
      if (!amount || amount < 1 || !coin) {
        router.push("/buy");
        return;
      }

      // Redirect admins to /admin (they should not create payments)
      const { data: profile } = await supabase
        .from("profiles")
        .select("is_admin")
        .eq("id", user.id)
        .single();

      if (profile?.is_admin) {
        router.push("/admin");
        return;
      }

      // Small delay to prevent Strict Mode double-insert
      await new Promise((r) => setTimeout(r, 100));

      if (cancelled) return;

      // Check if a pending payment for this amount/coin already exists
      const { data: existing } = await supabase
        .from("payments")
        .select("id")
        .eq("profile_id", user.id)
        .eq("coin", coinKey)
        .eq("amount_usd", amount)
        .eq("status", "pending")
        .maybeSingle();

      if (cancelled) return;

      // If none exists, create one
      if (!existing) {
        await supabase.from("payments").insert({
          profile_id: user.id,
          coin: coinKey,
          amount_crypto: 0,
          amount_usd: amount,
          mrsc_credited: amount,
          status: "pending",
        });
      }

      if (!cancelled) {
        setChecking(false);
      }
    }
    init();

    return () => {
      cancelled = true;
    };
  }, [router, supabase, amount, coinKey]);

  async function copyAddress() {
    await navigator.clipboard.writeText(coin.address);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  }

  if (checking || !coin) {
    return (
      <main className="min-h-screen flex items-center justify-center">
        <div className="text-white/40 text-sm">Loading...</div>
      </main>
    );
  }

  const totalUSD = amount * 1.0;

  return (
    <main className="min-h-screen px-4 sm:px-6 py-8 sm:py-12">
      <div className="max-w-xl mx-auto">
        <UserNav
          subtitle="Payment"
          backHref="/buy"
          backLabel="← Change"
        />

        {/* Heading */}
        <div className="mb-8 fade-up fade-up-delay-1">
          <div className="text-xs text-white/40 uppercase tracking-wider mb-3">
            Step 2 of 2
          </div>
          <h1 className="text-2xl font-semibold tracking-tight">
            Complete your payment
          </h1>
          <p className="text-white/40 text-sm mt-2">
            Send {coin.label} to the address below
          </p>
        </div>

        {/* Order summary */}
        <div className="glass rounded-2xl p-6 mb-4 fade-up fade-up-delay-2">
          <div className="text-xs text-white/40 uppercase tracking-wider mb-4">
            Order summary
          </div>
          <div className="space-y-3">
            <div className="flex justify-between text-sm">
              <span className="text-white/50">Amount</span>
              <span className="font-semibold">
                {amount.toLocaleString()} $MRSC
              </span>
            </div>
            <div className="flex justify-between text-sm">
              <span className="text-white/50">Price</span>
              <span className="font-semibold">$1.00 / token</span>
            </div>
            <div className="flex justify-between text-sm">
              <span className="text-white/50">Method</span>
              <span className="font-semibold">{coin.label}</span>
            </div>
            <div className="flex justify-between items-center pt-3 border-t border-white/10">
              <span className="text-white/50 text-sm">Total due</span>
              <span className="text-orange-500 font-semibold text-lg">
                $
                {totalUSD.toLocaleString(undefined, {
                  minimumFractionDigits: 2,
                  maximumFractionDigits: 2,
                })}
              </span>
            </div>
          </div>
        </div>

        {/* Payment address */}
        <div className="glass rounded-2xl p-6 fade-up fade-up-delay-3">
          <div className="flex items-center gap-3 mb-5">
            <div
              className="w-10 h-10 rounded-xl flex items-center justify-center text-xl font-semibold shrink-0"
              style={{
                background: `${coin.color}20`,
                color: coin.color,
              }}
            >
              {coin.icon}
            </div>
            <div>
              <div className="text-sm font-semibold">Send {coin.label}</div>
              <div className="text-xs text-white/40">{coin.network}</div>
            </div>
          </div>

          <div className="text-xs text-white/40 uppercase tracking-wider mb-2">
            Deposit address
          </div>
          <div className="bg-black/40 border border-white/10 rounded-xl p-4 mb-4">
            <div className="font-mono text-xs break-all text-white/90 leading-relaxed">
              {coin.address || "Address not configured"}
            </div>
          </div>

          <button
            onClick={copyAddress}
            className="btn-primary"
            disabled={!coin.address}
          >
            {copied ? "Copied ✓" : "Copy address"}
          </button>

          {/* Warning */}
          <div className="flex items-start gap-2 bg-amber-950/30 border border-amber-900/50 rounded-lg px-3 py-3 mt-4">
            <svg
              className="w-4 h-4 text-amber-400 mt-0.5 shrink-0"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
              strokeWidth="2"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M12 9v3.75m-9.303 3.376c-.866 1.5.217 3.374 1.948 3.374h14.71c1.73 0 2.813-1.874 1.948-3.374L13.949 3.378c-.866-1.5-3.032-1.5-3.898 0L2.697 16.126z"
              />
            </svg>
            <p className="text-amber-300 text-xs leading-relaxed">
              Send <strong>exactly ${totalUSD.toFixed(2)}</strong> worth of{" "}
              <strong>{coin.label}</strong> on{" "}
              <strong>{coin.network}</strong>. Wrong coin, wrong network, or
              wrong amount may result in lost funds.
            </p>
          </div>
        </div>

        {/* Back to dashboard */}
        <div className="mt-6 text-center fade-up fade-up-delay-4">
          <Link
            href="/dashboard"
            className="text-orange-500 hover:text-orange-400 text-xs font-medium transition"
          >
            Done — back to dashboard
          </Link>
        </div>

        {/* Footer */}
        <p className="text-center text-white/20 mt-12 text-xs">
          © {new Date().getFullYear()} MarsChain · Beyond Bitcoin
        </p>
      </div>
    </main>
  );
}

export default function PayPage() {
  return (
    <Suspense
      fallback={
        <main className="min-h-screen flex items-center justify-center">
          <div className="text-white/40 text-sm">Loading...</div>
        </main>
      }
    >
      <PayContent />
    </Suspense>
  );
}
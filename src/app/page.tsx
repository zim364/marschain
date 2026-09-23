import Link from "next/link";
import Countdown from "@/components/Countdown";
import PresaleProgress from "@/components/PresaleProgress";
import HowItWorks from "@/components/HowItWorks";
import SectionReveal from "@/components/SectionReveal";

export default function HomePage() {
  return (
    <main className="min-h-screen">
      {/* NAVBAR */}
      <nav className="fixed top-0 left-0 right-0 z-50 backdrop-blur-xl bg-black/40 border-b border-white/5">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 h-16 flex items-center justify-between">
          <Link href="/" className="flex items-center gap-3">
            <div className="logo-mark" style={{ width: 32, height: 32 }}>
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none">
                <path
                  d="M12 2L3 7v10l9 5 9-5V7l-9-5z"
                  stroke="white"
                  strokeWidth="1.5"
                  strokeLinejoin="round"
                />
                <circle cx="12" cy="12" r="3" fill="white" />
              </svg>
            </div>
            <span className="text-sm font-semibold">MarsChain</span>
          </Link>
          <div className="hidden md:flex items-center gap-8 text-sm text-white/60">
            <a href="#mission" className="hover:text-white transition">
              Mission
            </a>
            <a href="#how" className="hover:text-white transition">
              How it works
            </a>
            <a href="#tokenomics" className="hover:text-white transition">
              Tokenomics
            </a>
            <a href="#roadmap" className="hover:text-white transition">
              Roadmap
            </a>
            <a href="#faq" className="hover:text-white transition">
              FAQ
            </a>
          </div>
          <div className="flex items-center gap-2 sm:gap-3">
            <Link
              href="/login"
              className="text-xs sm:text-sm text-white/60 hover:text-white transition"
            >
              Log in
            </Link>
            <Link
              href="/register"
              className="text-xs sm:text-sm px-3 sm:px-4 py-2 rounded-lg bg-orange-600 hover:bg-orange-500 text-white font-medium transition"
            >
              Buy $MRSC
            </Link>
          </div>
        </div>
      </nav>

      {/* HERO */}
      <section className="relative pt-32 sm:pt-40 pb-20 sm:pb-32 px-4 sm:px-6">
        <div className="max-w-4xl mx-auto text-center">
          <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full border border-orange-500/30 bg-orange-500/5 text-xs text-orange-400 mb-8 fade-up">
            <span className="w-1.5 h-1.5 rounded-full bg-orange-500 animate-pulse" />
            Presale live · $1.00 per $MRSC
          </div>

          <h1 className="text-4xl sm:text-5xl md:text-7xl lg:text-8xl font-semibold tracking-tight leading-[0.95] fade-up fade-up-delay-1">
            Beyond
            <br />
            <span className="bg-gradient-to-r from-orange-500 via-orange-400 to-amber-300 bg-clip-text text-transparent">
              Bitcoin.
            </span>
          </h1>

          <p className="text-white/50 text-base sm:text-lg md:text-xl mt-8 max-w-2xl mx-auto leading-relaxed fade-up fade-up-delay-2">
            Bitcoin proved decentralized money works. MarsChain is
            engineered for what comes next. Built for speed, for scale,
            and for the next century of human settlement.
          </p>

          <div className="flex flex-col sm:flex-row items-center justify-center gap-4 mt-12 fade-up fade-up-delay-3">
            <Link
              href="/register"
              className="w-full sm:w-auto px-8 py-4 rounded-xl bg-gradient-to-r from-orange-600 to-orange-500 hover:from-orange-500 hover:to-orange-400 text-white font-semibold transition shadow-lg shadow-orange-500/20"
            >
              Buy $MRSC Now
            </Link>
            <a
              href="#mission"
              className="w-full sm:w-auto px-8 py-4 rounded-xl border border-white/10 hover:border-white/20 text-white/80 font-medium transition text-center"
            >
              Read the mission
            </a>
          </div>

          {/* Live countdown */}
          <div className="mt-14 sm:mt-16 fade-up fade-up-delay-4">
            <div className="text-xs text-white/40 uppercase tracking-wider mb-4">
              Launch in
            </div>
            <Countdown />
          </div>

          {/* Live presale progress */}
          <div className="mt-8 sm:mt-10 fade-up fade-up-delay-4">
            <PresaleProgress />
          </div>
        </div>
      </section>

      {/* MISSION */}
      <section
        id="mission"
        className="py-20 sm:py-32 px-4 sm:px-6 border-t border-white/5"
      >
        <div className="max-w-5xl mx-auto">
          <div className="max-w-2xl mb-12 sm:mb-16">
            <div className="text-xs text-orange-500 uppercase tracking-wider mb-3">
              The Mission
            </div>
            <h2 className="text-3xl sm:text-4xl md:text-5xl font-semibold tracking-tight leading-tight">
              Bitcoin started it.
              <br />
              MarsChain finishes it.
            </h2>
          </div>

          <SectionReveal>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {[
                {
                  title: "Speed",
                  desc: "Bitcoin settles in minutes. MarsChain is designed for instant finality. Transactions confirm before you blink.",
                },
                {
                  title: "Scale",
                  desc: "Bitcoin handles a handful of transactions per second. MarsChain is engineered for the throughput of a global economy.",
                },
                {
                  title: "Sovereignty",
                  desc: "Not just digital gold. A full ecosystem with decentralized applications, smart contracts, and real utility.",
                },
              ].map((p) => (
                <div key={p.title} className="glass rounded-2xl p-7">
                  <div className="text-3xl font-semibold tracking-tight mb-3">
                    {p.title}
                  </div>
                  <p className="text-white/50 text-sm leading-relaxed">
                    {p.desc}
                  </p>
                </div>
              ))}
            </div>
          </SectionReveal>
        </div>
      </section>

      {/* HOW IT WORKS */}
      <HowItWorks />

      {/* COMPARISON */}
      <section className="py-20 sm:py-32 px-4 sm:px-6 border-t border-white/5">
        <div className="max-w-5xl mx-auto">
          <div className="max-w-2xl mb-12">
            <div className="text-xs text-orange-500 uppercase tracking-wider mb-3">
              Comparison
            </div>
            <h2 className="text-3xl sm:text-4xl md:text-5xl font-semibold tracking-tight">
              MarsChain vs Bitcoin
            </h2>
          </div>

          <SectionReveal>
            <div className="glass rounded-2xl overflow-hidden">
              <div className="grid grid-cols-3 px-4 sm:px-6 py-4 border-b border-white/5 text-xs uppercase tracking-wider text-white/40">
                <div>Feature</div>
                <div>Bitcoin</div>
                <div className="text-orange-500">MarsChain</div>
              </div>
              {[
                ["Launch", "2009", "2027"],
                ["Supply", "21,000,000", "20,000,000"],
                ["Block time", "About 10 min", "Instant"],
                ["Smart contracts", "Limited", "Native"],
                ["Purpose", "Digital gold", "Beyond Bitcoin"],
              ].map(([feature, btc, mrs]) => (
                <div
                  key={feature}
                  className="grid grid-cols-3 px-4 sm:px-6 py-4 border-b border-white/5 last:border-0 text-xs sm:text-sm"
                >
                  <div className="text-white/40">{feature}</div>
                  <div className="text-white/70">{btc}</div>
                  <div className="text-white font-semibold">{mrs}</div>
                </div>
              ))}
            </div>
          </SectionReveal>
        </div>
      </section>

      {/* TOKENOMICS */}
      <section
        id="tokenomics"
        className="py-20 sm:py-32 px-4 sm:px-6 border-t border-white/5"
      >
        <div className="max-w-5xl mx-auto">
          <div className="max-w-2xl mb-12">
            <div className="text-xs text-orange-500 uppercase tracking-wider mb-3">
              Tokenomics
            </div>
            <h2 className="text-3xl sm:text-4xl md:text-5xl font-semibold tracking-tight">
              20 million. No more.
            </h2>
            <p className="text-white/50 mt-4">
              A fixed supply. A clear distribution. No inflation, no
              surprises.
            </p>
          </div>

          <SectionReveal>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="glass rounded-2xl p-5 sm:p-7">
                <div className="space-y-4">
                  {[
                    ["Presale", "30%", "6,000,000"],
                    ["Liquidity", "25%", "5,000,000"],
                    ["Community", "10%", "2,000,000"],
                    ["Treasury", "10%", "2,000,000"],
                    ["Team", "6%", "1,200,000"],
                    ["Marketing", "6%", "1,200,000"],
                    ["Ecosystem", "6%", "1,200,000"],
                    ["CEX listings", "4%", "800,000"],
                    ["Legal / audits", "3%", "600,000"],
                  ].map(([name, pct, amt]) => (
                    <div
                      key={name}
                      className="flex items-center justify-between text-sm gap-3"
                    >
                      <div className="flex items-center gap-3 min-w-0">
                        <div className="w-2 h-2 rounded-full bg-orange-500 shrink-0" />
                        <span className="text-white/70 truncate">{name}</span>
                      </div>
                      <div className="flex items-center gap-3 sm:gap-6 shrink-0">
                        <span className="text-white/40 font-mono text-xs hidden sm:inline">
                          {amt}
                        </span>
                        <span className="font-semibold w-12 text-right">
                          {pct}
                        </span>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              <div className="glass rounded-2xl p-5 sm:p-7 flex flex-col justify-center">
                <div className="space-y-6">
                  <div>
                    <div className="text-xs text-white/40 uppercase tracking-wider mb-2">
                      Total Supply
                    </div>
                    <div className="text-3xl sm:text-4xl font-semibold tracking-tight">
                      20,000,000
                    </div>
                  </div>
                  <div>
                    <div className="text-xs text-white/40 uppercase tracking-wider mb-2">
                      Presale Price
                    </div>
                    <div className="text-3xl sm:text-4xl font-semibold tracking-tight text-orange-500">
                      $1.00
                    </div>
                  </div>
                  <div>
                    <div className="text-xs text-white/40 uppercase tracking-wider mb-2">
                      Presale Allocation
                    </div>
                    <div className="text-xl sm:text-2xl font-semibold tracking-tight">
                      6,000,000 $MRSC
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </SectionReveal>
        </div>
      </section>

      {/* ROADMAP */}
      <section
        id="roadmap"
        className="py-20 sm:py-32 px-4 sm:px-6 border-t border-white/5"
      >
        <div className="max-w-5xl mx-auto">
          <div className="max-w-2xl mb-12">
            <div className="text-xs text-orange-500 uppercase tracking-wider mb-3">
              Roadmap
            </div>
            <h2 className="text-3xl sm:text-4xl md:text-5xl font-semibold tracking-tight">
              The path forward
            </h2>
          </div>

          <SectionReveal>
            <div className="space-y-4">
              {[
                {
                  phase: "Phase 1",
                  time: "Now to Dec 31",
                  title: "Presale",
                  desc: "Early allocation at $1.00. Community build. Audits begin.",
                  status: "active",
                },
                {
                  phase: "Phase 2",
                  time: "Jan 1",
                  title: "Launch",
                  desc: "Solana listing. Withdrawals open. DEX trading begins.",
                  status: "upcoming",
                },
                {
                  phase: "Phase 3",
                  time: "Q1 to Q2",
                  title: "Growth",
                  desc: "CEX listings. Staking rewards. Community programs.",
                  status: "upcoming",
                },
                {
                  phase: "Phase 4",
                  time: "Q3 to Q4",
                  title: "Ecosystem",
                  desc: "MarsChain testnet. Grants for builders. dApps launch.",
                  status: "upcoming",
                },
                {
                  phase: "Phase 5",
                  time: "2027 and beyond",
                  title: "MarsChain L1",
                  desc: "Mainnet launch. Full Layer-1 chain with validators and native apps.",
                  status: "upcoming",
                },
              ].map((step, i) => (
                <div
                  key={step.phase}
                  className={`glass rounded-2xl p-5 sm:p-6 flex items-start gap-4 sm:gap-5 ${
                    step.status === "active" ? "border-orange-500/30" : ""
                  }`}
                >
                  <div
                    className={`w-10 h-10 sm:w-12 sm:h-12 rounded-xl flex items-center justify-center text-xs sm:text-sm font-semibold shrink-0 ${
                      step.status === "active"
                        ? "bg-orange-500/20 text-orange-500"
                        : "bg-white/5 text-white/40"
                    }`}
                  >
                    {String(i + 1).padStart(2, "0")}
                  </div>
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center gap-2 sm:gap-3 flex-wrap">
                      <div className="text-xs text-white/40 uppercase tracking-wider">
                        {step.phase}
                      </div>
                      <div className="text-xs text-white/30">·</div>
                      <div className="text-xs text-white/40">
                        {step.time}
                      </div>
                      {step.status === "active" && (
                        <div className="flex items-center gap-1.5 text-xs text-orange-500">
                          <span className="w-1.5 h-1.5 rounded-full bg-orange-500 animate-pulse" />
                          Live
                        </div>
                      )}
                    </div>
                    <div className="text-base sm:text-lg font-semibold mt-2">
                      {step.title}
                    </div>
                    <div className="text-white/50 text-xs sm:text-sm mt-1">
                      {step.desc}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </SectionReveal>
        </div>
      </section>

      {/* CTA */}
      <section className="py-20 sm:py-32 px-4 sm:px-6 border-t border-white/5">
        <div className="max-w-3xl mx-auto text-center">
          <h2 className="text-3xl sm:text-4xl md:text-6xl font-semibold tracking-tight leading-tight">
            The next frontier
            <br />
            <span className="bg-gradient-to-r from-orange-500 to-amber-300 bg-clip-text text-transparent">
              starts here.
            </span>
          </h2>
          <p className="text-white/50 mt-6 text-base sm:text-lg">
            Early allocation closes December 31.
          </p>
          <Link
            href="/register"
            className="inline-block mt-10 px-8 py-4 rounded-xl bg-gradient-to-r from-orange-600 to-orange-500 hover:from-orange-500 hover:to-orange-400 text-white font-semibold transition shadow-lg shadow-orange-500/20"
          >
            Buy $MRSC Now →
          </Link>
        </div>
      </section>

      {/* FAQ */}
      <section
        id="faq"
        className="py-20 sm:py-32 px-4 sm:px-6 border-t border-white/5"
      >
        <div className="max-w-3xl mx-auto">
          <div className="mb-12">
            <div className="text-xs text-orange-500 uppercase tracking-wider mb-3">
              FAQ
            </div>
            <h2 className="text-3xl sm:text-4xl md:text-5xl font-semibold tracking-tight">
              Questions
            </h2>
          </div>

          <SectionReveal>
            <div className="space-y-3">
              {[
                [
                  "What is MarsChain?",
                  "MarsChain is a new blockchain project with a fixed supply of 20 million tokens. It launches on Solana in January, and from there the team is building toward its own Layer-1 chain. The goal is simple: take what Bitcoin started and push it further.",
                ],
                [
                  "How is this different from Bitcoin?",
                  "Bitcoin proved that decentralized money works. But it was built for a world that has changed. MarsChain is designed for speed, scale, and smart contracts. It is not trying to sit beside Bitcoin. It is trying to go beyond it.",
                ],
                [
                  "When can I withdraw or sell my tokens?",
                  "Your tokens stay locked until launch day on January 1. Once launch happens, you can sell your $MRSC on any Solana exchange or wallet that lists it.",
                ],
                [
                  "What happens if the presale does not sell out?",
                  "Any unsold tokens are burned permanently. This reduces the total supply, which makes the remaining tokens more scarce. The launch still happens on January 1 no matter what.",
                ],
                [
                  "Do I need to complete KYC?",
                  "No. There is no KYC to participate in the presale. All you need is an email address to create an account.",
                ],
                [
                  "Which cryptocurrencies can I use to buy?",
                  "You can pay with Bitcoin (BTC), USDT on the Tron network (TRC-20), or Solana (SOL). Each one has its own deposit address shown at checkout. Make sure you send the right coin on the right network.",
                ],
                [
                  "What is the total supply of $MRSC?",
                  "The total supply is 20,000,000 $MRSC and it will never change. There is no inflation, no extra minting, and no hidden reserve. What you see is what exists.",
                ],
              ].map(([q, a]) => (
                <details
                  key={q}
                  className="glass rounded-2xl group overflow-hidden"
                >
                  <summary className="px-5 sm:px-6 py-4 sm:py-5 cursor-pointer flex items-center justify-between text-sm font-semibold list-none gap-3">
                    {q}
                    <svg
                      className="w-4 h-4 text-white/40 group-open:rotate-45 transition shrink-0"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                      strokeWidth="2"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        d="M12 4v16m8-8H4"
                      />
                    </svg>
                  </summary>
                  <div className="px-5 sm:px-6 pb-5 text-sm text-white/50 leading-relaxed">
                    {a}
                  </div>
                </details>
              ))}
            </div>
          </SectionReveal>
        </div>
      </section>

      {/* FOOTER */}
      <footer className="border-t border-white/5 py-12 px-4 sm:px-6">
        <div className="max-w-6xl mx-auto">
          <div className="flex flex-col md:flex-row items-center justify-between gap-6">
            <div className="flex items-center gap-3">
              <div className="logo-mark" style={{ width: 32, height: 32 }}>
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none">
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
                <div className="text-xs text-white/40">Beyond Bitcoin</div>
              </div>
            </div>

            <div className="flex flex-wrap justify-center gap-4 sm:gap-6 text-xs text-white/40">
              <Link href="/terms" className="hover:text-white transition">
                
              </Link>
              <Link href="/privacy" className="hover:text-white transition">
                
              </Link>
              <Link href="/risk" className="hover:text-white transition">
                
              </Link>
            </div>
          </div>

          

          <p className="text-center text-white/20 mt-6 text-xs">
            © {new Date().getFullYear()} MarsChain · Beyond Bitcoin
          </p>
        </div>
      </footer>
    </main>
  );
}
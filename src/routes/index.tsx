import { createFileRoute } from "@tanstack/react-router";
import { useState, useEffect } from "react";

export const Route = createFileRoute("/")({
  component: Index,
});

const PDF_URL = "/The-Anxious-Avoidant-Trap-Blueprint.pdf";

function Index() {
  const [modalOpen, setModalOpen] = useState(false);

  useEffect(() => {
    if (modalOpen) document.body.style.overflow = "hidden";
    else document.body.style.overflow = "";
    return () => { document.body.style.overflow = ""; };
  }, [modalOpen]);

  const openModal = () => {
    setModalOpen(true);
  };

  return (
    <div className="min-h-screen bg-background text-foreground">
      {/* TOP BOOK BANNER */}
      <div className="flex justify-center border-b border-border/60 bg-background py-8">
        <svg
          viewBox="0 0 64 48"
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
          className="h-20 w-28 text-primary"
          aria-label="Blueprint book"
        >
          <rect x="4" y="4" width="56" height="40" rx="2" />
          <line x1="32" y1="4" x2="32" y2="44" />
          <line x1="10" y1="14" x2="26" y2="14" strokeWidth="1.2" />
          <line x1="10" y1="20" x2="26" y2="20" strokeWidth="1.2" />
          <line x1="38" y1="14" x2="54" y2="14" strokeWidth="1.2" />
          <line x1="38" y1="20" x2="54" y2="20" strokeWidth="1.2" />
        </svg>
      </div>

      {/* NAV */}
      <header className="border-b border-border/60">
        <div className="mx-auto flex max-w-6xl items-center justify-between px-5 py-5">
          <div className="flex items-center gap-2">
            <div className="h-2 w-2 rounded-full bg-primary" />
            <span className="text-sm font-semibold tracking-widest uppercase">The Blueprint</span>
          </div>
          <button
            onClick={openModal}
            className="hidden sm:inline-flex text-xs font-medium tracking-wide uppercase text-muted-foreground hover:text-foreground transition"
          >
            Get Access →
          </button>
        </div>
      </header>

      {/* HERO */}
      <section className="relative overflow-hidden">
        <div className="pointer-events-none absolute inset-0 opacity-40" style={{
          backgroundImage: "radial-gradient(ellipse 60% 50% at 80% 10%, oklch(0.62 0.19 20 / 0.18), transparent 70%), radial-gradient(ellipse 40% 40% at 10% 90%, oklch(0.62 0.19 20 / 0.12), transparent 70%)"
        }} />
        <div className="relative mx-auto grid max-w-6xl grid-cols-1 gap-12 px-5 py-16 md:py-24 lg:grid-cols-2 lg:gap-16 lg:py-32">
          <div>
            <div className="inline-flex items-center gap-2 rounded-full border border-primary/40 bg-primary/5 px-3 py-1 text-[11px] font-medium uppercase tracking-widest text-primary">
              <span className="h-1.5 w-1.5 rounded-full bg-primary animate-pulse" />
              Free · 3-Page Blueprint
            </div>
            <h1 className="mt-6 font-display text-5xl leading-[0.95] tracking-tight sm:text-6xl md:text-7xl">
              The cycle<br/>
              <span className="italic text-primary">ends</span> here.
            </h1>
            <p className="mt-6 max-w-xl text-base leading-relaxed text-muted-foreground sm:text-lg">
              Transform anxious urgency into deep internal peace. Stop chasing
              emotionally unavailable partners and learn to regulate your
              nervous system in real-time.
            </p>
            <div className="mt-9 flex flex-col items-start gap-3 sm:flex-row sm:items-center">
              <button
                onClick={openModal}
                className="group relative inline-flex w-full items-center justify-center gap-2 rounded-md bg-primary px-7 py-4 text-sm font-semibold uppercase tracking-wider text-primary-foreground transition-all hover:brightness-110 active:scale-[0.98] sm:w-auto"
                style={{ boxShadow: "0 10px 40px -10px oklch(0.62 0.19 20 / 0.6)" }}
              >
                Download the Free 3-Page Blueprint
              </button>
            </div>
          </div>

          {/* FORM CONTAINER */}
          <div className="w-full max-w-md bg-card border border-border p-6 rounded-xl shadow-sm">
            <h3 className="text-lg font-bold">Get Instant Access</h3>
            <p className="text-sm text-muted-foreground mb-4">Enter your details to download your blueprint.</p>
            <InlineForm />
          </div>
        </div>
      </section>
    </div>
  );
}

function InlineForm({ compact = false }: { compact?: boolean }) {
  return (
    <form action="https://api.sheetmonkey.io/form/jVxNoNKRPnc7dUTDz5jePN" method="POST" className={`${compact ? "mt-6 space-y-3" : "mx-auto mt-4 space-y-3"}`}>
      <div className="grid grid-cols-1 gap-3">
        <input
          required
          name="First Name"
          placeholder="First name"
          className="w-full rounded-md border border-border bg-input/50 px-4 py-3.5 text-sm text-foreground placeholder:text-muted-foreground/70 focus:border-primary"
        />
        <input
          required
          type="email"
          name="Email"
          placeholder="Email address"
          className="w-full rounded-md border border-border bg-input/50 px-4 py-3.5 text-sm text-foreground placeholder:text-muted-foreground/70 focus:border-primary"
        />
      </div>
      <button
        type="submit"
        className="w-full rounded-md bg-primary px-6 py-4 text-sm font-semibold uppercase tracking-wider text-primary-foreground transition-all hover:brightness-110"
      >
        Get the Free Blueprint Instantly →
      </button>
      <div className="mt-4 text-center">
        <a href={PDF_URL} download className="text-xs text-primary underline underline-offset-4">
          Direct Download Link (PDF)
        </a>
      </div>
    </form>
  );
}

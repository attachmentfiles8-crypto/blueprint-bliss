import { createFileRoute } from "@tanstack/react-router";
import { useState, useEffect } from "react";
import blueprintAsset from "@/assets/blueprint.pdf.asset.json";

export const Route = createFileRoute("/")({
  component: Index,
});

const PDF_URL = blueprintAsset.url;

function Index() {
  const [modalOpen, setModalOpen] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const [firstName, setFirstName] = useState("");
  const [email, setEmail] = useState("");

  useEffect(() => {
    if (modalOpen) document.body.style.overflow = "hidden";
    else document.body.style.overflow = "";
    return () => { document.body.style.overflow = ""; };
  }, [modalOpen]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!firstName || !email) return;
    // Trigger PDF download
    const a = document.createElement("a");
    a.href = PDF_URL;
    a.download = "The-Anxious-Avoidant-Trap-Blueprint.pdf";
    document.body.appendChild(a);
    a.click();
    a.remove();
    setSubmitted(true);
  };

  const openModal = () => {
    setSubmitted(false);
    setModalOpen(true);
  };

  return (
    <div className="min-h-screen bg-background text-foreground">
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
                <svg className="h-4 w-4 transition-transform group-hover:translate-y-0.5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5"><path d="M12 4v14m0 0l-5-5m5 5l5-5"/></svg>
              </button>
            </div>
            <div className="mt-5 flex items-center gap-4 text-xs text-muted-foreground">
              <div className="flex -space-x-1">
                {[0,1,2].map(i => (
                  <div key={i} className="h-6 w-6 rounded-full border-2 border-background" style={{background: `oklch(0.${5+i} 0.08 ${20+i*40})`}}/>
                ))}
              </div>
              <span>Trusted by 12,000+ readers</span>
            </div>
          </div>

          {/* PDF MOCKUP */}
          <div className="relative flex items-center justify-center lg:justify-end">
            <div className="relative h-[440px] w-full max-w-md sm:h-[520px]">
              {/* Page 3 (back) */}
              <PdfPage
                className="absolute left-8 top-8 rotate-6 opacity-70"
                label="03"
                title="Circuit Breaker"
              />
              {/* Page 2 (middle) */}
              <PdfPage
                className="absolute left-4 top-4 rotate-3 opacity-85"
                label="02"
                title="Uncomfortable Truth"
              />
              {/* Page 1 (front) */}
              <PdfPage
                className="relative -rotate-2"
                label="01"
                title="The Diagnosis"
                front
              />
              <div className="absolute -bottom-3 -right-3 rounded-md bg-primary px-3 py-1.5 text-[10px] font-bold uppercase tracking-widest text-primary-foreground rotate-3">
                PDF · Instant
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* MIRROR / AGITATOR */}
      <section className="border-y border-border/60 bg-card/40">
        <div className="mx-auto max-w-6xl px-5 py-20 md:py-28">
          <div className="max-w-2xl">
            <div className="text-[11px] font-semibold uppercase tracking-widest text-primary">01 — The Mirror</div>
            <h2 className="mt-4 font-display text-4xl leading-tight sm:text-5xl">
              You already know<br/>the feeling.
            </h2>
            <p className="mt-4 text-muted-foreground">
              Before the story, there's a signal in the body. Recognize it.
            </p>
          </div>

          <div className="mt-14 grid grid-cols-1 gap-px overflow-hidden rounded-xl border border-border/60 bg-border/60 md:grid-cols-3">
            {[
              {
                tag: "Somatic",
                title: "The Somatic Flare",
                body: "That sudden warmth in your chest, tight jaw, or hollow stomach when a reply slows down.",
              },
              {
                tag: "Behavioral",
                title: "The Dopamine Loop",
                body: "Treating your phone like a slot machine — chasing brief text-relief instead of true connection.",
              },
              {
                tag: "Relational",
                title: "The Trap",
                body: "How the Chaser's panic activates the Runner's suffocation alarm, locking you in a loop.",
              },
            ].map((c) => (
              <div key={c.title} className="group relative bg-background p-8 transition-colors hover:bg-card">
                <div className="text-[10px] font-semibold uppercase tracking-widest text-primary">{c.tag}</div>
                <h3 className="mt-4 font-display text-2xl leading-snug">{c.title}</h3>
                <p className="mt-3 text-sm leading-relaxed text-muted-foreground">{c.body}</p>
                <div className="mt-8 h-px w-8 bg-primary/70 transition-all group-hover:w-16" />
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* WHAT'S INSIDE */}
      <section className="mx-auto max-w-6xl px-5 py-20 md:py-28">
        <div className="grid grid-cols-1 gap-16 lg:grid-cols-[1fr_1.2fr] lg:gap-24">
          <div className="lg:sticky lg:top-16 lg:self-start">
            <div className="text-[11px] font-semibold uppercase tracking-widest text-primary">02 — Inside</div>
            <h2 className="mt-4 font-display text-4xl leading-tight sm:text-5xl">
              What's inside<br/>the blueprint.
            </h2>
            <p className="mt-5 text-muted-foreground">
              Three tightly-designed pages. No fluff, no filler — a direct path from trigger to regulation.
            </p>
            <button
              onClick={openModal}
              className="mt-8 inline-flex items-center gap-2 border-b border-primary pb-1 text-sm font-semibold uppercase tracking-wider text-primary hover:gap-3 transition-all"
            >
              Get it now →
            </button>
          </div>

          <ol className="space-y-4">
            {[
              {
                page: "Page 1",
                title: "The Diagnosis",
                body: "Recognizing the somatic flare before your mind creates a story.",
              },
              {
                page: "Page 2",
                title: "The Uncomfortable Truth",
                body: "Why anxiety isn't passion — and what is actually happening inside the Runner's mind.",
              },
              {
                page: "Page 3",
                title: "The Circuit Breaker",
                body: "The exact 3-step action plan (Pause & Locate · The 20-Minute Buffer · Shift the Spotlight) to interrupt the urge to double-text.",
              },
            ].map((item) => (
              <li key={item.page} className="group relative flex gap-6 rounded-xl border border-border/60 bg-card/40 p-6 transition-colors hover:border-primary/50 sm:p-8">
                <div className="flex-shrink-0">
                  <div className="flex h-11 w-11 items-center justify-center rounded-md border border-primary/40 bg-primary/10 text-primary">
                    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" className="h-5 w-5"><path d="M5 12l5 5L20 7"/></svg>
                  </div>
                </div>
                <div>
                  <div className="text-[11px] font-semibold uppercase tracking-widest text-muted-foreground">{item.page}</div>
                  <h3 className="mt-1 font-display text-2xl">{item.title}</h3>
                  <p className="mt-2 text-sm leading-relaxed text-muted-foreground">{item.body}</p>
                </div>
              </li>
            ))}
          </ol>
        </div>
      </section>

      {/* EMAIL CAPTURE */}
      <section id="capture" className="relative border-t border-border/60 bg-card/40">
        <div className="mx-auto max-w-3xl px-5 py-24 text-center md:py-32">
          <div className="text-[11px] font-semibold uppercase tracking-widest text-primary">03 — Free Access</div>
          <h2 className="mt-4 font-display text-4xl leading-tight sm:text-5xl md:text-6xl">
            Get the blueprint.<br/>
            <span className="italic text-primary">Free.</span>
          </h2>
          <p className="mx-auto mt-5 max-w-lg text-muted-foreground">
            Drop your name and email. The PDF downloads instantly.
          </p>

          <InlineForm
            firstName={firstName}
            email={email}
            setFirstName={setFirstName}
            setEmail={setEmail}
            onSubmit={handleSubmit}
            submitted={submitted}
          />
        </div>
      </section>

      {/* FOOTER */}
      <footer className="border-t border-border/60">
        <div className="mx-auto flex max-w-6xl flex-col items-center justify-between gap-4 px-5 py-8 text-xs text-muted-foreground sm:flex-row">
          <div className="flex items-center gap-2">
            <div className="h-1.5 w-1.5 rounded-full bg-primary" />
            <span className="uppercase tracking-widest">The Blueprint</span>
          </div>
          <div>© {new Date().getFullYear()} — All rights reserved.</div>
        </div>
      </footer>

      {/* MODAL */}
      {modalOpen && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center bg-black/70 p-4 backdrop-blur-sm"
          onClick={() => setModalOpen(false)}
        >
          <div
            className="relative w-full max-w-md rounded-2xl border border-border bg-card p-8 shadow-2xl"
            onClick={(e) => e.stopPropagation()}
          >
            <button
              onClick={() => setModalOpen(false)}
              className="absolute right-4 top-4 text-muted-foreground hover:text-foreground"
              aria-label="Close"
            >
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className="h-5 w-5"><path d="M6 6l12 12M6 18L18 6"/></svg>
            </button>
            <div className="text-[11px] font-semibold uppercase tracking-widest text-primary">Free Blueprint</div>
            <h3 className="mt-3 font-display text-3xl leading-tight">One step away.</h3>
            <p className="mt-2 text-sm text-muted-foreground">Enter your details — the PDF downloads instantly.</p>
            <InlineForm
              firstName={firstName}
              email={email}
              setFirstName={setFirstName}
              setEmail={setEmail}
              onSubmit={handleSubmit}
              submitted={submitted}
              compact
            />
          </div>
        </div>
      )}
    </div>
  );
}

function PdfPage({
  className = "",
  label,
  title,
  front = false,
}: { className?: string; label: string; title: string; front?: boolean }) {
  return (
    <div
      className={`aspect-[3/4] w-full rounded-lg border border-border bg-gradient-to-br from-card to-background p-6 shadow-2xl ${className}`}
      style={{ boxShadow: front ? "0 30px 80px -20px oklch(0 0 0 / 0.7), 0 0 0 1px oklch(0.62 0.19 20 / 0.15)" : undefined }}
    >
      <div className="flex h-full flex-col">
        <div className="flex items-start justify-between">
          <div className="text-[9px] font-semibold uppercase tracking-widest text-muted-foreground">The Blueprint</div>
          <div className="text-[9px] font-mono text-primary">/ {label}</div>
        </div>
        <div className="mt-8 h-px w-full bg-border" />
        <div className="mt-6">
          <div className="text-[10px] font-semibold uppercase tracking-widest text-primary">Page {label}</div>
          <div className="mt-2 font-display text-xl leading-tight">{title}</div>
        </div>
        <div className="mt-6 space-y-2">
          <div className="h-1.5 w-full rounded-full bg-muted" />
          <div className="h-1.5 w-11/12 rounded-full bg-muted" />
          <div className="h-1.5 w-4/5 rounded-full bg-muted" />
        </div>
        <div className="mt-5 space-y-2">
          <div className="h-1.5 w-full rounded-full bg-muted/60" />
          <div className="h-1.5 w-3/4 rounded-full bg-muted/60" />
        </div>
        <div className="mt-auto flex items-center gap-2 pt-6">
          <div className="h-6 w-6 rounded border border-primary/50 bg-primary/10" />
          <div className="h-1.5 flex-1 rounded-full bg-primary/40" />
        </div>
      </div>
    </div>
  );
}

function InlineForm({
  firstName, email, setFirstName, setEmail, onSubmit, submitted, compact = false,
}: {
  firstName: string; email: string;
  setFirstName: (s: string) => void; setEmail: (s: string) => void;
  onSubmit: (e: React.FormEvent) => void;
  submitted: boolean; compact?: boolean;
}) {
  if (submitted) {
    return (
      <div className={`${compact ? "mt-6" : "mx-auto mt-10 max-w-lg"} rounded-xl border border-primary/40 bg-primary/5 p-6 text-left`}>
        <div className="flex items-center gap-2 text-primary">
          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" className="h-5 w-5"><path d="M5 12l5 5L20 7"/></svg>
          <span className="text-sm font-semibold uppercase tracking-wider">Your download started</span>
        </div>
        <p className="mt-2 text-sm text-muted-foreground">
          If it didn't open automatically,{" "}
          <a href={PDF_URL} download className="text-primary underline underline-offset-4">click here to download the blueprint</a>.
        </p>
      </div>
    );
  }
  return (
    <form onSubmit={onSubmit} className={`${compact ? "mt-6 space-y-3" : "mx-auto mt-10 max-w-lg space-y-3"}`}>
      <div className={compact ? "space-y-3" : "grid grid-cols-1 gap-3 sm:grid-cols-2"}>
        <input
          required
          value={firstName}
          onChange={(e) => setFirstName(e.target.value)}
          placeholder="First name"
          className="w-full rounded-md border border-border bg-input/50 px-4 py-3.5 text-sm text-foreground placeholder:text-muted-foreground/70 focus:border-primary focus:outline-none focus:ring-1 focus:ring-primary"
        />
        <input
          required
          type="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          placeholder="Email address"
          className="w-full rounded-md border border-border bg-input/50 px-4 py-3.5 text-sm text-foreground placeholder:text-muted-foreground/70 focus:border-primary focus:outline-none focus:ring-1 focus:ring-primary"
        />
      </div>
      <button
        type="submit"
        className="w-full rounded-md bg-primary px-6 py-4 text-sm font-semibold uppercase tracking-wider text-primary-foreground transition-all hover:brightness-110 active:scale-[0.99]"
        style={{ boxShadow: "0 10px 40px -10px oklch(0.62 0.19 20 / 0.5)" }}
      >
        Get the Free Blueprint Instantly →
      </button>
      <p className="pt-1 text-center text-xs text-muted-foreground">
        Your peace is priority. No spam, ever.
      </p>
    </form>
  );
}

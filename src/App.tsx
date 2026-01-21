import { useEffect, useMemo, useState } from "react";
import logo from "./assets/images/logo.svg";

type TimeLeft = {
  totalMs: number;
  days: number;
  hours: number;
  minutes: number;
  seconds: number;
};

function getTimeLeft(target: Date): TimeLeft | null {
  const diff = target.getTime() - Date.now();
  if (diff <= 0) return null;

  const days = Math.floor(diff / (1000 * 60 * 60 * 24));
  const hours = Math.floor((diff / (1000 * 60 * 60)) % 24);
  const minutes = Math.floor((diff / (1000 * 60)) % 60);
  const seconds = Math.floor((diff / 1000) % 60);

  return { totalMs: diff, days, hours, minutes, seconds };
}

function Pad2({ n }: { n: number }) {
  return <span className="tabular-nums">{String(n).padStart(2, "0")}</span>;
}

function TimeCard({
  label,
  value,
  accent,
}: {
  label: string;
  value: React.ReactNode;
  accent: string;
}) {
  return (
    <div
      className={[
        "relative overflow-hidden rounded-3xl border border-white/60 bg-white/60 backdrop-blur",
        "shadow-[0_18px_60px_-30px_rgba(0,0,0,0.35)]",
        "px-5 py-4 sm:px-6 sm:py-5",
      ].join(" ")}
    >
      <div
        className={[
          "absolute -top-10 -right-10 h-24 w-24 rounded-full blur-2xl opacity-70",
          accent,
        ].join(" ")}
      />
      <div className="text-[11px] sm:text-xs font-semibold uppercase tracking-widest text-slate-600/80">
        {label}
      </div>
      <div className="mt-2 text-3xl sm:text-4xl font-black text-slate-900">
        {value}
      </div>
      <div className="mt-2 h-1.5 w-full rounded-full bg-slate-200/70">
        <div className="h-1.5 w-2/3 rounded-full bg-slate-900/80" />
      </div>
    </div>
  );
}

function FloatingEmoji({ children, className }: { children: string; className: string }) {
  return (
    <div
      className={[
        "pointer-events-none absolute select-none text-2xl sm:text-3xl drop-shadow",
        "animate-[floaty_4s_ease-in-out_infinite]",
        className,
      ].join(" ")}
      aria-hidden
    >
      {children}
    </div>
  );
}

export default function App() {
  // ⚠️ Note: ton 'Z' = UTC. Si tu veux l'heure Paris, mets sans Z: '2026-01-23T18:00:00'
  const target = useMemo(() => new Date("2026-01-23T18:00:00Z"), []);

  const [timeLeft, setTimeLeft] = useState<TimeLeft | null>(() => getTimeLeft(target));
  const [spark, setSpark] = useState(0);

  useEffect(() => {
    const t = setInterval(() => {
      setTimeLeft(getTimeLeft(target));
      setSpark((s) => (s + 1) % 1000);
    }, 1000);
    return () => clearInterval(t);
  }, [target]);

  const totalWindowMs = 1000 * 60 * 60 * 24 * 7; // barre “sur 7 jours”, juste pour le fun
  const progress = timeLeft ? Math.max(0, Math.min(1, 1 - timeLeft.totalMs / totalWindowMs)) : 1;

  return (
    <div className="min-h-screen bg-gradient-to-br from-pink-200 via-rose-100 to-purple-200">
      <div className="mx-auto max-w-5xl px-4 py-10 sm:py-14">
        <div className="relative overflow-hidden rounded-[2.5rem] border border-white/60 bg-white/40 backdrop-blur-xl shadow-[0_30px_120px_-60px_rgba(0,0,0,0.55)]">
          {/* décor gaga */}
          <div className="absolute inset-0 opacity-60">
            <div className="absolute -top-24 -left-24 h-80 w-80 rounded-full bg-pink-300 blur-3xl" />
            <div className="absolute -bottom-24 -right-24 h-80 w-80 rounded-full bg-purple-300 blur-3xl" />
            <div className="absolute top-20 right-20 h-48 w-48 rounded-full bg-rose-200 blur-3xl" />
          </div>

          <FloatingEmoji className="top-8 left-8 rotate-[-8deg]">💖</FloatingEmoji>
          <FloatingEmoji className="top-10 right-10 rotate-[10deg]">✨</FloatingEmoji>
          <FloatingEmoji className="bottom-10 left-10 rotate-[6deg]">🎀</FloatingEmoji>
          <FloatingEmoji className="bottom-12 right-12 rotate-[-10deg]">🏡</FloatingEmoji>

          <div className="relative p-6 sm:p-10">
            <header className="flex items-center justify-between gap-4">
              <div className="flex items-center gap-3">
                <img src={logo} alt="NumaTravel Logo" className="h-10 w-10 sm:h-12 sm:w-12" />
                <div>
                  <div className="text-xs font-bold tracking-widest text-slate-700/70">
                    NUMATRAVEL • MODE GAGA ACTIVÉ
                  </div>
                  <h1 className="text-2xl sm:text-3xl font-black text-slate-900">
                    Le grand retour de Lolo 🥹💕
                  </h1>
                </div>
              </div>
            </header>

            <div className="mt-6 rounded-3xl border border-white/70 bg-white/60 px-5 py-4 backdrop-blur">
              <div className="flex items-center justify-between gap-4">
                <p className="text-sm sm:text-base font-semibold text-slate-800">
                  {timeLeft ? (
                    <>
                      Lolo rentre dans sa maison dans{" "}
                      <span className="font-black text-slate-900">un petit moment</span>…
                      <span className="ml-2">🥺👉👈</span>
                    </>
                  ) : (
                    <>
                      Lolo est rentrée ! <span className="font-black">MISSION BISOU</span> ✅💋
                    </>
                  )}
                </p>
              </div>
            </div>

            {/* cards chrono */}
            {timeLeft ? (
              <div className="mt-6 grid grid-cols-2 gap-4 sm:grid-cols-4">
                <TimeCard label="Jours" value={timeLeft.days} accent="bg-pink-400" />
                <TimeCard label="Heures" value={<Pad2 n={timeLeft.hours} />} accent="bg-rose-400" />
                <TimeCard label="Minutes" value={<Pad2 n={timeLeft.minutes} />} accent="bg-purple-400" />
                <TimeCard label="Secondes" value={<Pad2 n={timeLeft.seconds} />} accent="bg-fuchsia-400" />
              </div>
            ) : (
              <div className="mt-6 rounded-3xl border border-white/70 bg-white/60 p-6 text-center backdrop-blur">
                <div className="text-4xl">🏡💖✨</div>
                <div className="mt-2 text-xl font-black text-slate-900">
                  Welcome home, Lolo.
                </div>
                <div className="mt-1 text-sm font-semibold text-slate-700/80">
                  (Et maintenant, on arrête de compter les secondes, on vit. 😌)
                </div>
              </div>
            )}

            <footer className="mt-8 flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">

            </footer>
          </div>
        </div>
      </div>

      {/* animation keyframes */}
      <style>{`
        @keyframes floaty {
          0%, 100% { transform: translateY(0px); }
          50% { transform: translateY(-10px); }
        }
      `}</style>
    </div>
  );
}

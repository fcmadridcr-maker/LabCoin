import { Timer, Zap } from 'lucide-react';
import { formatDuration } from '../hooks/useNow.js';

export function ClaimButton({ remainingMs, cooldownMs, onClaim }) {
  const ready = remainingMs <= 0;
  const progress = ready ? 100 : Math.min(100, 100 - (remainingMs / cooldownMs) * 100);

  return (
    <div className="flex flex-col gap-3">
      <button
        type="button"
        onClick={onClaim}
        disabled={!ready}
        className={`group relative inline-flex h-14 w-full items-center justify-center gap-2 overflow-hidden rounded-xl text-sm font-semibold transition-all duration-200 focus:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:ring-offset-white dark:focus-visible:ring-offset-ink-900 ${
          ready
            ? 'bg-emerald-600 text-white shadow-sm hover:bg-emerald-700 focus-visible:ring-emerald-500 active:scale-[0.98] dark:bg-neon dark:text-ink-950 dark:shadow-[0_0_28px_rgba(61,255,154,0.28)] dark:hover:bg-[#6bffb4] dark:focus-visible:ring-neon'
            : 'cursor-not-allowed bg-zinc-100 text-zinc-500 dark:bg-white/[0.04] dark:text-zinc-400'
        }`}
      >
        {ready ? (
          <>
            <Zap size={18} aria-hidden="true" className="transition-transform group-hover:-rotate-12" />
            Claim Reward
          </>
        ) : (
          <>
            <Timer size={18} aria-hidden="true" />
            <span>Próximo claim en</span>
            <span className="font-mono tabular-nums" aria-live="off">
              {formatDuration(remainingMs)}
            </span>
          </>
        )}
      </button>

      <div
        className="h-1.5 w-full overflow-hidden rounded-full bg-zinc-100 dark:bg-white/[0.06]"
        role="progressbar"
        aria-label="Progreso de recarga del faucet"
        aria-valuemin={0}
        aria-valuemax={100}
        aria-valuenow={Math.round(progress)}
      >
        <div
          className="h-full rounded-full bg-gradient-to-r from-emerald-500 to-cyan-500 transition-[width] duration-1000 ease-linear dark:from-neon dark:to-cyan-400"
          style={{ width: `${progress}%` }}
        />
      </div>
    </div>
  );
}

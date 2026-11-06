import { Droplets, Wallet } from 'lucide-react';
import { ThemeToggle } from './ThemeToggle.jsx';

export function TopBar({ theme, onToggleTheme }) {
  return (
    <header className="sticky top-0 z-30 border-b border-zinc-200/80 bg-white/80 backdrop-blur-md transition-colors duration-300 dark:border-white/[0.06] dark:bg-ink-950/80">
      <div className="mx-auto flex h-16 max-w-6xl items-center justify-between gap-4 px-4 sm:px-6">
        <a href="#" className="flex items-center gap-2.5" aria-label="LabCoin inicio">
          <span className="flex h-9 w-9 items-center justify-center rounded-xl bg-zinc-900 text-white dark:bg-neon dark:text-ink-950">
            <Droplets size={18} aria-hidden="true" />
          </span>
          <span className="text-base font-semibold tracking-tight">
            Lab<span className="text-emerald-600 dark:text-neon">Coin</span>
          </span>
        </a>

        <div className="flex items-center gap-2 sm:gap-3">
          <span className="hidden items-center gap-2 rounded-full border border-zinc-200 px-3 py-1.5 text-xs font-medium text-zinc-600 sm:inline-flex dark:border-white/10 dark:text-zinc-400">
            <span className="relative flex h-2 w-2" aria-hidden="true">
              <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-emerald-500 opacity-60 dark:bg-neon" />
              <span className="relative inline-flex h-2 w-2 rounded-full bg-emerald-500 dark:bg-neon" />
            </span>
            Red activa
          </span>

          <button
            type="button"
            className="inline-flex items-center gap-2 rounded-full border border-zinc-200 px-3 py-1.5 font-mono text-xs font-medium text-zinc-700 transition-colors hover:bg-zinc-100 dark:border-white/10 dark:text-zinc-300 dark:hover:bg-white/5"
          >
            <Wallet size={14} aria-hidden="true" />
            <span>0x7a…3f9c</span>
          </button>

          <ThemeToggle theme={theme} onToggle={onToggleTheme} />
        </div>
      </div>
    </header>
  );
}

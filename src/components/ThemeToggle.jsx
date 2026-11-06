import { Moon, Sun } from 'lucide-react';

export function ThemeToggle({ theme, onToggle }) {
  const isDark = theme === 'dark';

  return (
    <button
      type="button"
      role="switch"
      aria-checked={isDark}
      aria-label={isDark ? 'Cambiar a tema claro' : 'Cambiar a tema oscuro'}
      onClick={onToggle}
      className="relative inline-flex h-9 w-[4.25rem] shrink-0 items-center rounded-full border border-zinc-200 bg-zinc-100 p-1 transition-colors duration-300 hover:border-zinc-300 focus:outline-none focus-visible:ring-2 focus-visible:ring-emerald-500 focus-visible:ring-offset-2 focus-visible:ring-offset-white dark:border-white/10 dark:bg-white/5 dark:hover:border-neon/40 dark:focus-visible:ring-neon dark:focus-visible:ring-offset-ink-950"
    >
      <span
        aria-hidden="true"
        className={`absolute top-1 h-7 w-7 rounded-full shadow-sm transition-all duration-300 ease-out ${
          isDark
            ? 'translate-x-8 bg-neon shadow-[0_0_14px_rgba(61,255,154,0.45)]'
            : 'translate-x-0 bg-white'
        }`}
      />
      <span className="relative z-10 flex w-full items-center justify-between px-1.5">
        <Sun
          size={15}
          aria-hidden="true"
          className={`transition-colors ${isDark ? 'text-zinc-500' : 'text-amber-500'}`}
        />
        <Moon
          size={15}
          aria-hidden="true"
          className={`transition-colors ${isDark ? 'text-ink-950' : 'text-zinc-400'}`}
        />
      </span>
    </button>
  );
}

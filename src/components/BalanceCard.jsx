import { TrendingUp } from 'lucide-react';
import { COINS, COIN_LIST, formatAmount, formatUsd } from '../data/coins.js';
import { CoinIcon } from './CoinIcon.jsx';
import { ClaimButton } from './ClaimButton.jsx';

export function BalanceCard({ balances, earnedUsd, selected, onSelect, remainingMs, onClaim }) {
  const totalUsd = COIN_LIST.reduce(
    (sum, coin) => sum + balances[coin.symbol] * coin.usdPrice,
    0,
  );
  const coin = COINS[selected];

  return (
    <section aria-labelledby="balance-title" className="surface overflow-hidden">
      <div className="grid lg:grid-cols-[minmax(0,1fr)_340px]">
        <div className="p-5 sm:p-6">
          <p id="balance-title" className="text-sm font-medium text-zinc-500 dark:text-zinc-400">
            Balance total
          </p>
          <div className="mt-1 flex flex-wrap items-end gap-x-3 gap-y-1">
            <p className="font-mono text-3xl font-semibold tracking-tight tabular-nums sm:text-4xl">
              {formatUsd(totalUsd)}
            </p>
            <p className="mb-1 inline-flex items-center gap-1 text-sm font-medium text-emerald-600 dark:text-neon">
              <TrendingUp size={15} aria-hidden="true" />
              +{formatUsd(earnedUsd)} esta sesión
            </p>
          </div>

          <div className="mt-6 grid grid-cols-2 gap-2.5 sm:grid-cols-4" role="group" aria-label="Selecciona una criptomoneda">
            {COIN_LIST.map((item) => {
              const active = item.symbol === selected;
              return (
                <button
                  key={item.symbol}
                  type="button"
                  aria-pressed={active}
                  onClick={() => onSelect(item.symbol)}
                  className={`flex flex-col gap-3 rounded-xl border p-3 text-left transition-all duration-200 focus:outline-none focus-visible:ring-2 focus-visible:ring-emerald-500 dark:focus-visible:ring-neon ${
                    active
                      ? 'border-emerald-500/60 bg-emerald-50/60 dark:border-neon/50 dark:bg-neon/[0.06]'
                      : 'border-zinc-200 hover:border-zinc-300 hover:bg-zinc-50 dark:border-white/[0.06] dark:hover:border-white/15 dark:hover:bg-white/[0.02]'
                  }`}
                >
                  <span className="flex items-center gap-2.5">
                    <CoinIcon symbol={item.symbol} size="sm" />
                    <span className="flex flex-col leading-tight">
                      <span className="text-sm font-semibold">{item.symbol}</span>
                      <span className="text-xs text-zinc-500 dark:text-zinc-400">{item.name}</span>
                    </span>
                  </span>
                  <span className="flex flex-col leading-tight">
                    <span className="truncate font-mono text-sm font-medium tabular-nums">
                      {formatAmount(item.symbol, balances[item.symbol])}
                    </span>
                    <span className="font-mono text-xs text-zinc-500 tabular-nums dark:text-zinc-400">
                      {formatUsd(balances[item.symbol] * item.usdPrice)}
                    </span>
                  </span>
                </button>
              );
            })}
          </div>
        </div>

        <div className="flex flex-col justify-between gap-6 border-t border-zinc-200 bg-zinc-50/70 p-5 transition-colors duration-300 sm:p-6 lg:border-l lg:border-t-0 dark:border-white/[0.06] dark:bg-white/[0.015]">
          <div>
            <p className="text-sm font-medium text-zinc-500 dark:text-zinc-400">Reclamo rápido</p>
            <div className="mt-3 flex items-center gap-3">
              <CoinIcon symbol={selected} />
              <div className="min-w-0">
                <p className="truncate font-mono text-xl font-semibold tabular-nums">
                  +{formatAmount(selected, coin.reward)} <span className="text-zinc-500 dark:text-zinc-400">{selected}</span>
                </p>
                <p className="text-xs text-zinc-500 dark:text-zinc-400">
                  {'≈ '}{formatUsd(coin.reward * coin.usdPrice)} · cada {Math.round(coin.cooldownMs / 60000)} min
                </p>
              </div>
            </div>
          </div>

          <ClaimButton remainingMs={remainingMs} cooldownMs={coin.cooldownMs} onClaim={onClaim} />
        </div>
      </div>
    </section>
  );
}

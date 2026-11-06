import { History } from 'lucide-react';
import { COINS, formatAmount } from '../data/coins.js';
import { formatDuration } from '../hooks/useNow.js';
import { CoinIcon } from './CoinIcon.jsx';
import { StatusBadge } from './StatusBadge.jsx';

export function getClaimStatus(claim, now) {
  return now >= claim.claimedAt + COINS[claim.symbol].confirmMs ? 'completed' : 'pending';
}

function TimeRemaining({ claim, status, now }) {
  const coin = COINS[claim.symbol];

  if (status === 'pending') {
    return (
      <span className="text-amber-700 dark:text-amber-300">
        Confirmando · <span className="font-mono tabular-nums">{formatDuration(claim.claimedAt + coin.confirmMs - now)}</span>
      </span>
    );
  }

  const cooldownLeft = claim.claimedAt + coin.cooldownMs - now;
  if (cooldownLeft <= 0) {
    return <span className="font-medium text-emerald-600 dark:text-neon">Disponible</span>;
  }

  return <span className="font-mono tabular-nums">{formatDuration(cooldownLeft)}</span>;
}

export function ClaimsTable({ claims, now }) {
  return (
    <section aria-labelledby="claims-title" className="surface overflow-hidden">
      <div className="flex items-center justify-between gap-4 px-5 py-4 sm:px-6">
        <div className="flex items-center gap-2.5">
          <History size={18} aria-hidden="true" className="text-zinc-400" />
          <h2 id="claims-title" className="text-base font-semibold tracking-tight">
            Reclamaciones recientes
          </h2>
        </div>
        <span className="text-xs text-zinc-500 dark:text-zinc-400">{claims.length} registros</span>
      </div>

      <div className="overflow-x-auto">
        <table className="w-full min-w-[560px] text-sm">
          <thead>
            <tr className="border-y border-zinc-200 bg-zinc-50 text-left text-xs font-medium uppercase tracking-wide text-zinc-500 dark:border-white/[0.06] dark:bg-white/[0.02] dark:text-zinc-400">
              <th scope="col" className="px-5 py-3 font-medium sm:px-6">Criptomoneda</th>
              <th scope="col" className="px-5 py-3 text-right font-medium">Monto reclamado</th>
              <th scope="col" className="px-5 py-3 font-medium">Estado</th>
              <th scope="col" className="px-5 py-3 text-right font-medium sm:px-6">Tiempo restante</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-zinc-100 dark:divide-white/[0.04]">
            {claims.map((claim) => {
              const coin = COINS[claim.symbol];
              const status = getClaimStatus(claim, now);

              return (
                <tr key={claim.id} className="transition-colors hover:bg-zinc-50/80 dark:hover:bg-white/[0.02]">
                  <td className="px-5 py-3.5 sm:px-6">
                    <div className="flex items-center gap-3">
                      <CoinIcon symbol={claim.symbol} size="sm" />
                      <div className="leading-tight">
                        <p className="font-semibold">{coin.symbol}</p>
                        <p className="text-xs text-zinc-500 dark:text-zinc-400">{coin.name}</p>
                      </div>
                    </div>
                  </td>
                  <td className="px-5 py-3.5 text-right font-mono tabular-nums">
                    +{formatAmount(claim.symbol, claim.amount)}
                  </td>
                  <td className="px-5 py-3.5">
                    <StatusBadge status={status} />
                  </td>
                  <td className="px-5 py-3.5 text-right text-zinc-600 sm:px-6 dark:text-zinc-300">
                    <TimeRemaining claim={claim} status={status} now={now} />
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
    </section>
  );
}

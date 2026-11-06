import { useCallback, useMemo, useState } from 'react';
import { COINS, COIN_LIST, createSeedClaims } from '../data/coins.js';
import { useNow } from '../hooks/useNow.js';
import { useTheme } from '../hooks/useTheme.js';
import { BalanceCard } from './BalanceCard.jsx';
import { ClaimsTable, getClaimStatus } from './ClaimsTable.jsx';
import { TopBar } from './TopBar.jsx';

export function Dashboard() {
  const { theme, toggleTheme } = useTheme();
  const now = useNow();
  const [claims, setClaims] = useState(() => createSeedClaims(Date.now()));
  const [selected, setSelected] = useState('SUI');

  const { balances, earnedUsd } = useMemo(() => {
    const totals = Object.fromEntries(COIN_LIST.map((coin) => [coin.symbol, coin.baseBalance]));
    let earned = 0;
    for (const claim of claims) {
      if (claim.fromSession && getClaimStatus(claim, now) === 'completed') {
        totals[claim.symbol] += claim.amount;
        earned += claim.amount * COINS[claim.symbol].usdPrice;
      }
    }
    return { balances: totals, earnedUsd: earned };
  }, [claims, now]);

  const remainingMs = useMemo(() => {
    const { cooldownMs } = COINS[selected];
    const lastClaim = claims.find((claim) => claim.symbol === selected);
    return lastClaim ? Math.max(0, lastClaim.claimedAt + cooldownMs - now) : 0;
  }, [claims, selected, now]);

  const handleClaim = useCallback(() => {
    if (remainingMs > 0) return;
    const claimedAt = Date.now();
    setClaims((current) => [
      {
        id: `${selected}-${claimedAt}`,
        symbol: selected,
        amount: COINS[selected].reward,
        claimedAt,
        fromSession: true,
      },
      ...current,
    ].slice(0, 12));
  }, [remainingMs, selected]);

  return (
    <div className="min-h-screen">
      <TopBar theme={theme} onToggleTheme={toggleTheme} />

      <main className="mx-auto flex max-w-6xl flex-col gap-6 px-4 py-6 sm:px-6 sm:py-10">
        <div>
          <h1 className="text-2xl font-semibold tracking-tight text-balance sm:text-3xl">Dashboard de faucets</h1>
          <p className="mt-1 text-sm text-zinc-500 dark:text-zinc-400">
            Reclama recompensas gratuitas en SUI, SOL, BTC y PEPE.
          </p>
        </div>

        <BalanceCard
          balances={balances}
          earnedUsd={earnedUsd}
          selected={selected}
          onSelect={setSelected}
          remainingMs={remainingMs}
          onClaim={handleClaim}
        />

        <ClaimsTable claims={claims} now={now} />
      </main>
    </div>
  );
}

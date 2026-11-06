import { Bitcoin, Droplet, Layers, Smile } from 'lucide-react';

export const COINS = {
  SUI: {
    symbol: 'SUI',
    name: 'Sui',
    icon: Droplet,
    usdPrice: 1.84,
    decimals: 4,
    reward: 0.0125,
    cooldownMs: 60 * 1000,
    confirmMs: 6 * 1000,
    baseBalance: 12.4831,
    tint: 'bg-sky-500/10 text-sky-600 dark:bg-sky-400/10 dark:text-sky-300',
  },
  SOL: {
    symbol: 'SOL',
    name: 'Solana',
    icon: Layers,
    usdPrice: 142.3,
    decimals: 5,
    reward: 0.00042,
    cooldownMs: 3 * 60 * 1000,
    confirmMs: 8 * 1000,
    baseBalance: 0.38217,
    tint: 'bg-violet-500/10 text-violet-600 dark:bg-violet-400/10 dark:text-violet-300',
  },
  BTC: {
    symbol: 'BTC',
    name: 'Bitcoin',
    icon: Bitcoin,
    usdPrice: 68420,
    decimals: 8,
    reward: 0.00000085,
    cooldownMs: 5 * 60 * 1000,
    confirmMs: 10 * 1000,
    baseBalance: 0.00041260,
    tint: 'bg-amber-500/10 text-amber-600 dark:bg-amber-400/10 dark:text-amber-300',
  },
  PEPE: {
    symbol: 'PEPE',
    name: 'Pepe',
    icon: Smile,
    usdPrice: 0.0000112,
    decimals: 0,
    reward: 2500,
    cooldownMs: 2 * 60 * 1000,
    confirmMs: 5 * 1000,
    baseBalance: 1248000,
    tint: 'bg-emerald-500/10 text-emerald-600 dark:bg-emerald-400/10 dark:text-emerald-300',
  },
};

export const COIN_LIST = Object.values(COINS);

export function formatAmount(symbol, value) {
  const { decimals } = COINS[symbol];
  return value.toLocaleString('en-US', {
    minimumFractionDigits: decimals,
    maximumFractionDigits: decimals,
  });
}

export function formatUsd(value) {
  return value.toLocaleString('en-US', { style: 'currency', currency: 'USD' });
}

export function createSeedClaims(now) {
  const minute = 60 * 1000;
  return [
    { id: 'seed-2', symbol: 'PEPE', amount: COINS.PEPE.reward, claimedAt: now - 3 * 1000 },
    { id: 'seed-1', symbol: 'SOL', amount: COINS.SOL.reward, claimedAt: now - 1.2 * minute },
    { id: 'seed-3', symbol: 'BTC', amount: COINS.BTC.reward, claimedAt: now - 2 * minute },
    { id: 'seed-4', symbol: 'SUI', amount: COINS.SUI.reward, claimedAt: now - 9 * minute },
    { id: 'seed-5', symbol: 'SOL', amount: COINS.SOL.reward, claimedAt: now - 14 * minute },
  ];
}

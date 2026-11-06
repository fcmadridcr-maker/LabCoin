import { COINS } from '../data/coins.js';

const SIZES = {
  sm: { box: 'h-8 w-8 rounded-lg', icon: 16 },
  md: { box: 'h-10 w-10 rounded-xl', icon: 19 },
};

export function CoinIcon({ symbol, size = 'md' }) {
  const coin = COINS[symbol];
  const Icon = coin.icon;
  const { box, icon } = SIZES[size];

  return (
    <span className={`flex shrink-0 items-center justify-center ${box} ${coin.tint}`} aria-hidden="true">
      <Icon size={icon} strokeWidth={2.2} />
    </span>
  );
}

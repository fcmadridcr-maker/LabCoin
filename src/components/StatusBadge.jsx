import { CheckCircle2, Loader2 } from 'lucide-react';

const STATUS = {
  completed: {
    label: 'Completado',
    icon: CheckCircle2,
    className:
      'bg-emerald-50 text-emerald-700 ring-emerald-600/20 dark:bg-neon/10 dark:text-neon dark:ring-neon/20',
  },
  pending: {
    label: 'Pendiente',
    icon: Loader2,
    className:
      'bg-amber-50 text-amber-700 ring-amber-600/20 dark:bg-amber-400/10 dark:text-amber-300 dark:ring-amber-400/20',
    spin: true,
  },
};

export function StatusBadge({ status }) {
  const config = STATUS[status];
  const Icon = config.icon;

  return (
    <span
      className={`inline-flex items-center gap-1.5 rounded-full px-2.5 py-1 text-xs font-medium ring-1 ring-inset ${config.className}`}
    >
      <Icon size={13} aria-hidden="true" className={config.spin ? 'animate-spin' : undefined} />
      {config.label}
    </span>
  );
}

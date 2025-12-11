import { cn } from '@/lib/utils';

type Priority = 'high' | 'medium' | 'low';

const priorityConfig: Record<Priority, { label: string; className: string }> = {
  high: { label: 'High', className: 'bg-red-100 text-red-800 border-red-200' },
  medium: { label: 'Medium', className: 'bg-amber-100 text-amber-800 border-amber-200' },
  low: { label: 'Low', className: 'bg-slate-100 text-slate-800 border-slate-200' },
};

interface PriorityBadgeProps {
  priority: Priority;
  className?: string;
}

export function PriorityBadge({ priority, className }: PriorityBadgeProps) {
  const config = priorityConfig[priority];
  
  return (
    <span
      className={cn(
        'inline-flex items-center px-2 py-0.5 rounded text-xs font-medium border',
        config.className,
        className
      )}
    >
      {config.label}
    </span>
  );
}

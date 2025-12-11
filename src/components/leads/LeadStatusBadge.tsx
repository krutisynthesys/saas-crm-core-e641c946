import { cn } from '@/lib/utils';

type LeadStatus = 'new' | 'cold' | 'engaged' | 'opportunity' | 'won' | 'lost';

const statusConfig: Record<LeadStatus, { label: string; className: string }> = {
  new: { label: 'New Lead', className: 'bg-blue-100 text-blue-800 border-blue-200' },
  cold: { label: 'Cold', className: 'bg-slate-100 text-slate-800 border-slate-200' },
  engaged: { label: 'Engaged', className: 'bg-emerald-100 text-emerald-800 border-emerald-200' },
  opportunity: { label: 'Opportunity', className: 'bg-amber-100 text-amber-800 border-amber-200' },
  won: { label: 'Won', className: 'bg-green-100 text-green-800 border-green-200' },
  lost: { label: 'Lost', className: 'bg-red-100 text-red-800 border-red-200' },
};

interface LeadStatusBadgeProps {
  status: LeadStatus;
  className?: string;
}

export function LeadStatusBadge({ status, className }: LeadStatusBadgeProps) {
  const config = statusConfig[status];
  
  return (
    <span
      className={cn(
        'inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium border',
        config.className,
        className
      )}
    >
      {config.label}
    </span>
  );
}

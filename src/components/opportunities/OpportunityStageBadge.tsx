import { cn } from '@/lib/utils';

type OpportunityStage = 'qualification' | 'proposal' | 'negotiation' | 'closed-won' | 'closed-lost';

const stageConfig: Record<OpportunityStage, { label: string; className: string }> = {
  qualification: { label: 'Qualification', className: 'bg-blue-100 text-blue-800 border-blue-200' },
  proposal: { label: 'Proposal', className: 'bg-amber-100 text-amber-800 border-amber-200' },
  negotiation: { label: 'Negotiation', className: 'bg-purple-100 text-purple-800 border-purple-200' },
  'closed-won': { label: 'Closed Won', className: 'bg-green-100 text-green-800 border-green-200' },
  'closed-lost': { label: 'Closed Lost', className: 'bg-red-100 text-red-800 border-red-200' },
};

interface OpportunityStageBadgeProps {
  stage: OpportunityStage;
  className?: string;
}

export function OpportunityStageBadge({ stage, className }: OpportunityStageBadgeProps) {
  const config = stageConfig[stage];
  
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

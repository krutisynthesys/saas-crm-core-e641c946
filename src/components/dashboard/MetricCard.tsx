import { ReactNode } from 'react';
import { cn } from '@/lib/utils';
import { TrendingUp, TrendingDown } from 'lucide-react';

interface MetricCardProps {
  title: string;
  value: string | number;
  change?: number;
  changeLabel?: string;
  icon: ReactNode;
  iconColor?: string;
  className?: string;
}

export function MetricCard({
  title,
  value,
  change,
  changeLabel,
  icon,
  iconColor = 'bg-primary/10 text-primary',
  className,
}: MetricCardProps) {
  const isPositive = change && change > 0;
  const isNegative = change && change < 0;

  return (
    <div
      className={cn(
        'bg-card rounded-xl border border-border p-6 metric-card',
        className
      )}
    >
      <div className="flex items-start justify-between">
        <div className="space-y-2">
          <p className="text-sm font-medium text-muted-foreground">{title}</p>
          <p className="text-3xl font-bold text-foreground">{value}</p>
          {change !== undefined && (
            <div className="flex items-center gap-1.5">
              {isPositive && (
                <span className="flex items-center text-xs font-medium text-success">
                  <TrendingUp className="h-3 w-3 mr-0.5" />
                  +{change}%
                </span>
              )}
              {isNegative && (
                <span className="flex items-center text-xs font-medium text-destructive">
                  <TrendingDown className="h-3 w-3 mr-0.5" />
                  {change}%
                </span>
              )}
              {changeLabel && (
                <span className="text-xs text-muted-foreground">{changeLabel}</span>
              )}
            </div>
          )}
        </div>
        <div className={cn('h-12 w-12 rounded-lg flex items-center justify-center', iconColor)}>
          {icon}
        </div>
      </div>
    </div>
  );
}

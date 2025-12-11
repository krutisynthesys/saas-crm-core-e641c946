import { teamPerformanceData } from '@/data/mockData';
import { Progress } from '@/components/ui/progress';
import { Avatar, AvatarFallback } from '@/components/ui/avatar';

export function TeamPerformance() {
  const formatCurrency = (value: number) => {
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD',
      notation: 'compact',
      maximumFractionDigits: 0,
    }).format(value);
  };

  return (
    <div className="bg-card rounded-xl border border-border p-6">
      <div className="flex items-center justify-between mb-6">
        <div>
          <h3 className="text-lg font-semibold text-foreground">Team Performance</h3>
          <p className="text-sm text-muted-foreground">Revenue vs target this quarter</p>
        </div>
        <button className="text-sm text-primary hover:text-primary/80 font-medium transition-colors">
          View all
        </button>
      </div>
      <div className="space-y-5">
        {teamPerformanceData.map((member) => {
          const progress = (member.revenue / member.target) * 100;
          const initials = member.name.split(' ').map(n => n[0]).join('');
          
          return (
            <div key={member.name} className="space-y-2">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <Avatar className="h-8 w-8">
                    <AvatarFallback className="bg-primary/10 text-primary text-xs font-medium">
                      {initials}
                    </AvatarFallback>
                  </Avatar>
                  <div>
                    <p className="text-sm font-medium text-foreground">{member.name}</p>
                    <p className="text-xs text-muted-foreground">{member.deals} deals closed</p>
                  </div>
                </div>
                <div className="text-right">
                  <p className="text-sm font-semibold text-foreground">{formatCurrency(member.revenue)}</p>
                  <p className="text-xs text-muted-foreground">of {formatCurrency(member.target)}</p>
                </div>
              </div>
              <Progress value={progress} className="h-2" />
            </div>
          );
        })}
      </div>
    </div>
  );
}

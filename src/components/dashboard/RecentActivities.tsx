import { mockActivities } from '@/data/mockData';
import { Phone, Mail, Calendar, FileText, CheckCircle } from 'lucide-react';
import { cn } from '@/lib/utils';
import { formatDistanceToNow } from 'date-fns';

const activityIcons = {
  call: Phone,
  email: Mail,
  meeting: Calendar,
  note: FileText,
  'task-completed': CheckCircle,
};

const activityColors = {
  call: 'bg-blue-100 text-blue-600',
  email: 'bg-amber-100 text-amber-600',
  meeting: 'bg-purple-100 text-purple-600',
  note: 'bg-slate-100 text-slate-600',
  'task-completed': 'bg-green-100 text-green-600',
};

export function RecentActivities() {
  const recentActivities = mockActivities.slice(0, 5);

  return (
    <div className="bg-card rounded-xl border border-border p-6">
      <div className="flex items-center justify-between mb-6">
        <div>
          <h3 className="text-lg font-semibold text-foreground">Recent Activities</h3>
          <p className="text-sm text-muted-foreground">Latest team interactions</p>
        </div>
        <button className="text-sm text-primary hover:text-primary/80 font-medium transition-colors">
          View all
        </button>
      </div>
      <div className="space-y-4">
        {recentActivities.map((activity, index) => {
          const Icon = activityIcons[activity.type];
          const colorClass = activityColors[activity.type];
          
          return (
            <div
              key={activity.id}
              className={cn(
                'flex items-start gap-3 p-3 rounded-lg hover:bg-muted/50 transition-colors cursor-pointer',
                index === 0 && 'bg-muted/30'
              )}
            >
              <div className={cn('h-9 w-9 rounded-lg flex items-center justify-center shrink-0', colorClass)}>
                <Icon className="h-4 w-4" />
              </div>
              <div className="flex-1 min-w-0">
                <p className="text-sm font-medium text-foreground truncate">{activity.description}</p>
                <div className="flex items-center gap-2 mt-0.5">
                  <span className="text-xs text-muted-foreground">{activity.leadName}</span>
                  <span className="text-xs text-muted-foreground">•</span>
                  <span className="text-xs text-muted-foreground">{activity.user}</span>
                </div>
                {activity.outcome && (
                  <span className="inline-block mt-1 text-xs px-2 py-0.5 rounded-full bg-muted text-muted-foreground">
                    {activity.outcome}
                  </span>
                )}
              </div>
              <span className="text-xs text-muted-foreground shrink-0">
                {formatDistanceToNow(new Date(activity.timestamp), { addSuffix: true })}
              </span>
            </div>
          );
        })}
      </div>
    </div>
  );
}

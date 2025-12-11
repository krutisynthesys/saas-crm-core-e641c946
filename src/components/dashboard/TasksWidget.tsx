import { mockTasks } from '@/data/mockData';
import { CheckCircle, Clock, AlertCircle, Phone, Mail, Calendar, Video, UserCheck } from 'lucide-react';
import { cn } from '@/lib/utils';
import { Checkbox } from '@/components/ui/checkbox';
import { Badge } from '@/components/ui/badge';

const taskTypeIcons = {
  call: Phone,
  email: Mail,
  meeting: Calendar,
  demo: Video,
  'follow-up': UserCheck,
};

const priorityColors = {
  high: 'bg-red-100 text-red-700 border-red-200',
  medium: 'bg-amber-100 text-amber-700 border-amber-200',
  low: 'bg-slate-100 text-slate-700 border-slate-200',
};

const statusIcons = {
  pending: Clock,
  'in-progress': AlertCircle,
  completed: CheckCircle,
  overdue: AlertCircle,
};

export function TasksWidget() {
  const upcomingTasks = mockTasks.filter(t => t.status !== 'completed').slice(0, 5);

  return (
    <div className="bg-card rounded-xl border border-border p-6">
      <div className="flex items-center justify-between mb-6">
        <div>
          <h3 className="text-lg font-semibold text-foreground">Upcoming Tasks</h3>
          <p className="text-sm text-muted-foreground">{upcomingTasks.length} tasks due soon</p>
        </div>
        <button className="text-sm text-primary hover:text-primary/80 font-medium transition-colors">
          View all
        </button>
      </div>
      <div className="space-y-3">
        {upcomingTasks.map((task) => {
          const TypeIcon = taskTypeIcons[task.type];
          const isOverdue = new Date(task.dueDate) < new Date() && task.status !== 'completed';
          
          return (
            <div
              key={task.id}
              className={cn(
                'flex items-start gap-3 p-3 rounded-lg border border-transparent hover:border-border hover:bg-muted/30 transition-all cursor-pointer',
                isOverdue && 'border-destructive/30 bg-destructive/5'
              )}
            >
              <Checkbox className="mt-0.5" />
              <div className="flex-1 min-w-0">
                <div className="flex items-center gap-2">
                  <TypeIcon className="h-3.5 w-3.5 text-muted-foreground" />
                  <p className="text-sm font-medium text-foreground truncate">{task.title}</p>
                </div>
                <div className="flex items-center gap-2 mt-1">
                  <span className="text-xs text-muted-foreground">{task.leadName}</span>
                  <span className="text-xs text-muted-foreground">•</span>
                  <span className={cn('text-xs', isOverdue ? 'text-destructive font-medium' : 'text-muted-foreground')}>
                    {new Date(task.dueDate).toLocaleDateString('en-US', { month: 'short', day: 'numeric' })}
                  </span>
                </div>
              </div>
              <Badge variant="outline" className={cn('shrink-0 text-xs', priorityColors[task.priority])}>
                {task.priority}
              </Badge>
            </div>
          );
        })}
      </div>
    </div>
  );
}

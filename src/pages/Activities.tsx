import { useState } from 'react';
import { DashboardLayout } from '@/components/layout/DashboardLayout';
import { mockActivities, Activity } from '@/data/mockData';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { Avatar, AvatarFallback } from '@/components/ui/avatar';
import {
  Phone,
  Mail,
  Calendar,
  FileText,
  CheckCircle,
  Search,
  Filter,
  Plus,
  Download,
} from 'lucide-react';
import { formatDistanceToNow } from 'date-fns';
import { cn } from '@/lib/utils';

const activityIcons = {
  call: Phone,
  email: Mail,
  meeting: Calendar,
  note: FileText,
  'task-completed': CheckCircle,
};

const activityColors = {
  call: 'bg-blue-100 text-blue-600 border-blue-200',
  email: 'bg-amber-100 text-amber-600 border-amber-200',
  meeting: 'bg-purple-100 text-purple-600 border-purple-200',
  note: 'bg-slate-100 text-slate-600 border-slate-200',
  'task-completed': 'bg-green-100 text-green-600 border-green-200',
};

const activityLabels = {
  call: 'Phone Call',
  email: 'Email',
  meeting: 'Meeting',
  note: 'Note',
  'task-completed': 'Task Completed',
};

export default function Activities() {
  const [searchQuery, setSearchQuery] = useState('');
  const [typeFilter, setTypeFilter] = useState<string>('all');

  const filteredActivities = mockActivities.filter((activity) => {
    const matchesSearch =
      activity.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
      activity.leadName.toLowerCase().includes(searchQuery.toLowerCase()) ||
      activity.user.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesType = typeFilter === 'all' || activity.type === typeFilter;
    return matchesSearch && matchesType;
  });

  // Group activities by date
  const groupedActivities = filteredActivities.reduce((groups, activity) => {
    const date = new Date(activity.timestamp).toLocaleDateString('en-US', {
      weekday: 'long',
      month: 'long',
      day: 'numeric',
    });
    if (!groups[date]) {
      groups[date] = [];
    }
    groups[date].push(activity);
    return groups;
  }, {} as Record<string, Activity[]>);

  return (
    <DashboardLayout>
      <div className="space-y-6">
        {/* Header */}
        <div className="flex items-center justify-between">
          <div>
            <h2 className="text-2xl font-bold text-foreground">Activity Log</h2>
            <p className="text-muted-foreground">Track all team interactions and activities</p>
          </div>
          <div className="flex items-center gap-2">
            <Button variant="outline">
              <Download className="h-4 w-4 mr-1.5" /> Export
            </Button>
            <Button variant="gradient">
              <Plus className="h-4 w-4 mr-1.5" /> Log Activity
            </Button>
          </div>
        </div>

        {/* Stats */}
        <div className="grid grid-cols-2 md:grid-cols-5 gap-4">
          {Object.entries(activityLabels).map(([type, label]) => {
            const count = mockActivities.filter((a) => a.type === type).length;
            const Icon = activityIcons[type as keyof typeof activityIcons];
            const colorClass = activityColors[type as keyof typeof activityColors];
            
            return (
              <div
                key={type}
                className={cn(
                  'bg-card rounded-xl border p-4 cursor-pointer hover:shadow-md transition-shadow',
                  typeFilter === type && 'ring-2 ring-primary'
                )}
                onClick={() => setTypeFilter(typeFilter === type ? 'all' : type)}
              >
                <div className="flex items-center gap-3">
                  <div className={cn('h-10 w-10 rounded-lg flex items-center justify-center', colorClass)}>
                    <Icon className="h-5 w-5" />
                  </div>
                  <div>
                    <p className="text-xl font-bold text-foreground">{count}</p>
                    <p className="text-xs text-muted-foreground">{label}s</p>
                  </div>
                </div>
              </div>
            );
          })}
        </div>

        {/* Filters */}
        <div className="flex items-center gap-4">
          <div className="relative flex-1 max-w-xs">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
            <Input
              placeholder="Search activities..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="pl-9"
            />
          </div>
          <Select value={typeFilter} onValueChange={setTypeFilter}>
            <SelectTrigger className="w-[160px]">
              <Filter className="h-4 w-4 mr-2" />
              <SelectValue placeholder="Filter type" />
            </SelectTrigger>
            <SelectContent className="bg-popover">
              <SelectItem value="all">All Activities</SelectItem>
              <SelectItem value="call">Phone Calls</SelectItem>
              <SelectItem value="email">Emails</SelectItem>
              <SelectItem value="meeting">Meetings</SelectItem>
              <SelectItem value="note">Notes</SelectItem>
              <SelectItem value="task-completed">Tasks Completed</SelectItem>
            </SelectContent>
          </Select>
        </div>

        {/* Activity timeline */}
        <div className="space-y-8">
          {Object.entries(groupedActivities).map(([date, activities]) => (
            <div key={date}>
              <h3 className="text-sm font-medium text-muted-foreground mb-4 sticky top-0 bg-background py-2">
                {date}
              </h3>
              <div className="space-y-4">
                {activities.map((activity) => {
                  const Icon = activityIcons[activity.type];
                  const colorClass = activityColors[activity.type];
                  
                  return (
                    <div
                      key={activity.id}
                      className="bg-card rounded-xl border border-border p-4 hover:shadow-md transition-shadow"
                    >
                      <div className="flex items-start gap-4">
                        <div className={cn('h-10 w-10 rounded-lg flex items-center justify-center shrink-0', colorClass)}>
                          <Icon className="h-5 w-5" />
                        </div>
                        
                        <div className="flex-1 min-w-0">
                          <div className="flex items-start justify-between gap-4">
                            <div>
                              <p className="font-medium text-foreground">{activity.description}</p>
                              <div className="flex items-center gap-2 mt-1">
                                <span className="text-sm text-primary font-medium">{activity.leadName}</span>
                                <span className="text-muted-foreground">•</span>
                                <span className="text-sm text-muted-foreground">
                                  {activityLabels[activity.type]}
                                </span>
                              </div>
                            </div>
                            <span className="text-xs text-muted-foreground shrink-0">
                              {new Date(activity.timestamp).toLocaleTimeString('en-US', {
                                hour: 'numeric',
                                minute: '2-digit',
                              })}
                            </span>
                          </div>
                          
                          {activity.outcome && (
                            <div className="mt-3 p-2 rounded-lg bg-muted/50">
                              <p className="text-sm text-muted-foreground">
                                <span className="font-medium text-foreground">Outcome:</span> {activity.outcome}
                              </p>
                            </div>
                          )}
                          
                          <div className="flex items-center gap-2 mt-3">
                            <Avatar className="h-6 w-6">
                              <AvatarFallback className="text-[10px] bg-primary/10 text-primary">
                                {activity.user.split(' ').map((n) => n[0]).join('')}
                              </AvatarFallback>
                            </Avatar>
                            <span className="text-sm text-muted-foreground">{activity.user}</span>
                          </div>
                        </div>
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>
          ))}
        </div>
      </div>
    </DashboardLayout>
  );
}

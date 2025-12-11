import { useState } from 'react';
import { DashboardLayout } from '@/components/layout/DashboardLayout';
import { mockTasks, Task } from '@/data/mockData';
import { PriorityBadge } from '@/components/leads/PriorityBadge';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Checkbox } from '@/components/ui/checkbox';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Badge } from '@/components/ui/badge';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import {
  Plus,
  Search,
  Filter,
  MoreHorizontal,
  Phone,
  Mail,
  Calendar,
  Video,
  UserCheck,
  Clock,
  CheckCircle,
  AlertCircle,
  CalendarDays,
} from 'lucide-react';
import { cn } from '@/lib/utils';
import { toast } from 'sonner';

const taskTypeIcons = {
  call: Phone,
  email: Mail,
  meeting: Calendar,
  demo: Video,
  'follow-up': UserCheck,
};

const taskTypeColors = {
  call: 'bg-blue-100 text-blue-600',
  email: 'bg-amber-100 text-amber-600',
  meeting: 'bg-purple-100 text-purple-600',
  demo: 'bg-pink-100 text-pink-600',
  'follow-up': 'bg-emerald-100 text-emerald-600',
};

const statusConfig = {
  pending: { label: 'Pending', icon: Clock, color: 'text-amber-600' },
  'in-progress': { label: 'In Progress', icon: AlertCircle, color: 'text-blue-600' },
  completed: { label: 'Completed', icon: CheckCircle, color: 'text-green-600' },
  overdue: { label: 'Overdue', icon: AlertCircle, color: 'text-red-600' },
};

export default function Tasks() {
  const [tasks, setTasks] = useState(mockTasks);
  const [searchQuery, setSearchQuery] = useState('');
  const [statusFilter, setStatusFilter] = useState<string>('all');
  const [activeTab, setActiveTab] = useState('all');

  const filteredTasks = tasks.filter((task) => {
    const matchesSearch =
      task.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      task.leadName.toLowerCase().includes(searchQuery.toLowerCase());
    
    if (activeTab === 'all') return matchesSearch;
    if (activeTab === 'today') {
      const today = new Date().toDateString();
      return matchesSearch && new Date(task.dueDate).toDateString() === today;
    }
    if (activeTab === 'upcoming') {
      return matchesSearch && new Date(task.dueDate) > new Date() && task.status !== 'completed';
    }
    if (activeTab === 'overdue') {
      return matchesSearch && new Date(task.dueDate) < new Date() && task.status !== 'completed';
    }
    if (activeTab === 'completed') {
      return matchesSearch && task.status === 'completed';
    }
    return matchesSearch;
  });

  const handleToggleComplete = (taskId: string) => {
    setTasks((prev) =>
      prev.map((t) =>
        t.id === taskId
          ? { ...t, status: t.status === 'completed' ? 'pending' : 'completed' }
          : t
      )
    );
    toast.success('Task updated');
  };

  const pendingCount = tasks.filter((t) => t.status === 'pending').length;
  const overdueCount = tasks.filter((t) => new Date(t.dueDate) < new Date() && t.status !== 'completed').length;
  const completedCount = tasks.filter((t) => t.status === 'completed').length;

  return (
    <DashboardLayout>
      <div className="space-y-6">
        {/* Header */}
        <div className="flex items-center justify-between">
          <div>
            <h2 className="text-2xl font-bold text-foreground">Tasks & Activities</h2>
            <p className="text-muted-foreground">Manage your tasks and track progress</p>
          </div>
          <Button variant="gradient">
            <Plus className="h-4 w-4 mr-1.5" /> New Task
          </Button>
        </div>

        {/* Stats */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          <div className="bg-card rounded-xl border border-border p-4 flex items-center gap-4">
            <div className="h-12 w-12 rounded-lg bg-blue-100 text-blue-600 flex items-center justify-center">
              <CheckCircle className="h-6 w-6" />
            </div>
            <div>
              <p className="text-2xl font-bold text-foreground">{tasks.length}</p>
              <p className="text-sm text-muted-foreground">Total Tasks</p>
            </div>
          </div>
          <div className="bg-card rounded-xl border border-border p-4 flex items-center gap-4">
            <div className="h-12 w-12 rounded-lg bg-amber-100 text-amber-600 flex items-center justify-center">
              <Clock className="h-6 w-6" />
            </div>
            <div>
              <p className="text-2xl font-bold text-foreground">{pendingCount}</p>
              <p className="text-sm text-muted-foreground">Pending</p>
            </div>
          </div>
          <div className="bg-card rounded-xl border border-border p-4 flex items-center gap-4">
            <div className="h-12 w-12 rounded-lg bg-red-100 text-red-600 flex items-center justify-center">
              <AlertCircle className="h-6 w-6" />
            </div>
            <div>
              <p className="text-2xl font-bold text-foreground">{overdueCount}</p>
              <p className="text-sm text-muted-foreground">Overdue</p>
            </div>
          </div>
          <div className="bg-card rounded-xl border border-border p-4 flex items-center gap-4">
            <div className="h-12 w-12 rounded-lg bg-green-100 text-green-600 flex items-center justify-center">
              <CheckCircle className="h-6 w-6" />
            </div>
            <div>
              <p className="text-2xl font-bold text-foreground">{completedCount}</p>
              <p className="text-sm text-muted-foreground">Completed</p>
            </div>
          </div>
        </div>

        {/* Tabs and filters */}
        <Tabs value={activeTab} onValueChange={setActiveTab} className="space-y-4">
          <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
            <TabsList>
              <TabsTrigger value="all">All Tasks</TabsTrigger>
              <TabsTrigger value="today">Today</TabsTrigger>
              <TabsTrigger value="upcoming">Upcoming</TabsTrigger>
              <TabsTrigger value="overdue" className="relative">
                Overdue
                {overdueCount > 0 && (
                  <span className="ml-1.5 h-4 w-4 rounded-full bg-destructive text-[10px] text-destructive-foreground flex items-center justify-center">
                    {overdueCount}
                  </span>
                )}
              </TabsTrigger>
              <TabsTrigger value="completed">Completed</TabsTrigger>
            </TabsList>
            
            <div className="flex items-center gap-3 w-full sm:w-auto">
              <div className="relative flex-1 sm:w-64">
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                <Input
                  placeholder="Search tasks..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="pl-9"
                />
              </div>
            </div>
          </div>

          <TabsContent value={activeTab} className="mt-0">
            <div className="bg-card rounded-xl border border-border divide-y divide-border">
              {filteredTasks.length === 0 ? (
                <div className="p-12 text-center">
                  <CalendarDays className="h-12 w-12 mx-auto text-muted-foreground/50 mb-4" />
                  <p className="text-muted-foreground">No tasks found</p>
                </div>
              ) : (
                filteredTasks.map((task) => {
                  const TypeIcon = taskTypeIcons[task.type];
                  const typeColor = taskTypeColors[task.type];
                  const isOverdue = new Date(task.dueDate) < new Date() && task.status !== 'completed';
                  const StatusIcon = statusConfig[task.status].icon;
                  
                  return (
                    <div
                      key={task.id}
                      className={cn(
                        'flex items-center gap-4 p-4 hover:bg-muted/30 transition-colors',
                        task.status === 'completed' && 'opacity-60'
                      )}
                    >
                      <Checkbox
                        checked={task.status === 'completed'}
                        onCheckedChange={() => handleToggleComplete(task.id)}
                        className="shrink-0"
                      />
                      
                      <div className={cn('h-10 w-10 rounded-lg flex items-center justify-center shrink-0', typeColor)}>
                        <TypeIcon className="h-5 w-5" />
                      </div>
                      
                      <div className="flex-1 min-w-0">
                        <div className="flex items-center gap-2">
                          <p className={cn(
                            'font-medium text-foreground',
                            task.status === 'completed' && 'line-through'
                          )}>
                            {task.title}
                          </p>
                        </div>
                        <div className="flex items-center gap-2 mt-0.5">
                          <span className="text-sm text-muted-foreground">{task.leadName}</span>
                          <span className="text-muted-foreground">•</span>
                          <span className="text-sm text-muted-foreground">{task.assignee}</span>
                        </div>
                      </div>
                      
                      <div className="flex items-center gap-3 shrink-0">
                        <PriorityBadge priority={task.priority} />
                        
                        <div className={cn(
                          'flex items-center gap-1.5 text-sm',
                          isOverdue ? 'text-destructive font-medium' : 'text-muted-foreground'
                        )}>
                          <CalendarDays className="h-4 w-4" />
                          {new Date(task.dueDate).toLocaleDateString('en-US', {
                            month: 'short',
                            day: 'numeric',
                          })}
                        </div>
                        
                        <DropdownMenu>
                          <DropdownMenuTrigger asChild>
                            <Button variant="ghost" size="icon-sm">
                              <MoreHorizontal className="h-4 w-4" />
                            </Button>
                          </DropdownMenuTrigger>
                          <DropdownMenuContent align="end" className="bg-popover">
                            <DropdownMenuItem className="cursor-pointer">Edit Task</DropdownMenuItem>
                            <DropdownMenuItem className="cursor-pointer">Reschedule</DropdownMenuItem>
                            <DropdownMenuItem className="cursor-pointer">Reassign</DropdownMenuItem>
                            <DropdownMenuItem className="cursor-pointer text-destructive focus:text-destructive">
                              Delete
                            </DropdownMenuItem>
                          </DropdownMenuContent>
                        </DropdownMenu>
                      </div>
                    </div>
                  );
                })
              )}
            </div>
          </TabsContent>
        </Tabs>
      </div>
    </DashboardLayout>
  );
}

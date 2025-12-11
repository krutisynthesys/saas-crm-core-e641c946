import { Lead, mockActivities, mockTasks } from '@/data/mockData';
import { LeadStatusBadge } from './LeadStatusBadge';
import { PriorityBadge } from './PriorityBadge';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Avatar, AvatarFallback } from '@/components/ui/avatar';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog';
import {
  Mail,
  Phone,
  MapPin,
  Building2,
  Calendar,
  Clock,
  Edit,
  Plus,
  ExternalLink,
  Activity,
  CheckSquare,
  FileText,
} from 'lucide-react';
import { formatDistanceToNow } from 'date-fns';

interface LeadDetailModalProps {
  lead: Lead | null;
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

export function LeadDetailModal({ lead, open, onOpenChange }: LeadDetailModalProps) {
  if (!lead) return null;

  const leadActivities = mockActivities.filter((a) => a.leadId === lead.id);
  const leadTasks = mockTasks.filter((t) => t.leadId === lead.id);

  const formatCurrency = (value: number) => {
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD',
    }).format(value);
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-3xl max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <div className="flex items-start justify-between">
            <div className="flex items-center gap-4">
              <Avatar className="h-14 w-14">
                <AvatarFallback className="bg-primary/10 text-primary text-lg font-semibold">
                  {lead.name.split(' ').map((n) => n[0]).join('')}
                </AvatarFallback>
              </Avatar>
              <div>
                <DialogTitle className="text-xl">{lead.name}</DialogTitle>
                <p className="text-muted-foreground">{lead.company}</p>
              </div>
            </div>
            <Button variant="outline" size="sm">
              <Edit className="h-4 w-4 mr-1.5" /> Edit
            </Button>
          </div>
        </DialogHeader>

        <div className="mt-4 space-y-6">
          {/* Status and tags */}
          <div className="flex items-center gap-3 flex-wrap">
            <LeadStatusBadge status={lead.status} />
            <PriorityBadge priority={lead.priority} />
            {lead.tags.map((tag) => (
              <Badge key={tag} variant="secondary" className="text-xs">
                {tag}
              </Badge>
            ))}
          </div>

          {/* Contact info */}
          <div className="grid grid-cols-2 gap-4">
            <div className="flex items-center gap-3 p-3 rounded-lg bg-muted/50">
              <div className="h-10 w-10 rounded-lg bg-blue-100 text-blue-600 flex items-center justify-center">
                <Mail className="h-5 w-5" />
              </div>
              <div>
                <p className="text-xs text-muted-foreground">Email</p>
                <p className="text-sm font-medium">{lead.email}</p>
              </div>
            </div>
            <div className="flex items-center gap-3 p-3 rounded-lg bg-muted/50">
              <div className="h-10 w-10 rounded-lg bg-green-100 text-green-600 flex items-center justify-center">
                <Phone className="h-5 w-5" />
              </div>
              <div>
                <p className="text-xs text-muted-foreground">Phone</p>
                <p className="text-sm font-medium">{lead.phone}</p>
              </div>
            </div>
            <div className="flex items-center gap-3 p-3 rounded-lg bg-muted/50">
              <div className="h-10 w-10 rounded-lg bg-purple-100 text-purple-600 flex items-center justify-center">
                <Building2 className="h-5 w-5" />
              </div>
              <div>
                <p className="text-xs text-muted-foreground">Industry</p>
                <p className="text-sm font-medium">{lead.industry}</p>
              </div>
            </div>
            <div className="flex items-center gap-3 p-3 rounded-lg bg-muted/50">
              <div className="h-10 w-10 rounded-lg bg-amber-100 text-amber-600 flex items-center justify-center">
                <MapPin className="h-5 w-5" />
              </div>
              <div>
                <p className="text-xs text-muted-foreground">Source</p>
                <p className="text-sm font-medium">{lead.source}</p>
              </div>
            </div>
          </div>

          {/* Key metrics */}
          <div className="grid grid-cols-3 gap-4 p-4 rounded-lg bg-gradient-to-r from-primary/5 to-accent/5 border border-border">
            <div className="text-center">
              <p className="text-2xl font-bold text-foreground">{formatCurrency(lead.dealValue)}</p>
              <p className="text-xs text-muted-foreground">Deal Value</p>
            </div>
            <div className="text-center border-x border-border">
              <p className="text-2xl font-bold text-foreground">{lead.owner}</p>
              <p className="text-xs text-muted-foreground">Owner</p>
            </div>
            <div className="text-center">
              <p className="text-2xl font-bold text-foreground">
                {new Date(lead.createdAt).toLocaleDateString('en-US', { month: 'short', day: 'numeric' })}
              </p>
              <p className="text-xs text-muted-foreground">Created</p>
            </div>
          </div>

          {/* Tabs */}
          <Tabs defaultValue="activities" className="w-full">
            <TabsList className="w-full grid grid-cols-3">
              <TabsTrigger value="activities" className="gap-1.5">
                <Activity className="h-4 w-4" /> Activities
              </TabsTrigger>
              <TabsTrigger value="tasks" className="gap-1.5">
                <CheckSquare className="h-4 w-4" /> Tasks
              </TabsTrigger>
              <TabsTrigger value="notes" className="gap-1.5">
                <FileText className="h-4 w-4" /> Notes
              </TabsTrigger>
            </TabsList>
            
            <TabsContent value="activities" className="mt-4">
              <div className="flex items-center justify-between mb-4">
                <p className="text-sm text-muted-foreground">
                  {leadActivities.length} activities
                </p>
                <Button variant="outline" size="sm">
                  <Plus className="h-4 w-4 mr-1.5" /> Log Activity
                </Button>
              </div>
              {leadActivities.length > 0 ? (
                <div className="space-y-3">
                  {leadActivities.map((activity) => (
                    <div
                      key={activity.id}
                      className="flex items-start gap-3 p-3 rounded-lg border border-border hover:bg-muted/30 transition-colors"
                    >
                      <div className="h-8 w-8 rounded-full bg-muted flex items-center justify-center">
                        <Activity className="h-4 w-4 text-muted-foreground" />
                      </div>
                      <div className="flex-1">
                        <p className="text-sm font-medium">{activity.description}</p>
                        <div className="flex items-center gap-2 mt-1">
                          <span className="text-xs text-muted-foreground">{activity.user}</span>
                          <span className="text-xs text-muted-foreground">•</span>
                          <span className="text-xs text-muted-foreground">
                            {formatDistanceToNow(new Date(activity.timestamp), { addSuffix: true })}
                          </span>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              ) : (
                <div className="text-center py-8 text-muted-foreground">
                  <Activity className="h-8 w-8 mx-auto mb-2 opacity-50" />
                  <p>No activities yet</p>
                </div>
              )}
            </TabsContent>

            <TabsContent value="tasks" className="mt-4">
              <div className="flex items-center justify-between mb-4">
                <p className="text-sm text-muted-foreground">
                  {leadTasks.length} tasks
                </p>
                <Button variant="outline" size="sm">
                  <Plus className="h-4 w-4 mr-1.5" /> Add Task
                </Button>
              </div>
              {leadTasks.length > 0 ? (
                <div className="space-y-3">
                  {leadTasks.map((task) => (
                    <div
                      key={task.id}
                      className="flex items-center gap-3 p-3 rounded-lg border border-border hover:bg-muted/30 transition-colors"
                    >
                      <CheckSquare className="h-5 w-5 text-muted-foreground" />
                      <div className="flex-1">
                        <p className="text-sm font-medium">{task.title}</p>
                        <p className="text-xs text-muted-foreground">
                          Due: {new Date(task.dueDate).toLocaleDateString()}
                        </p>
                      </div>
                      <PriorityBadge priority={task.priority} />
                    </div>
                  ))}
                </div>
              ) : (
                <div className="text-center py-8 text-muted-foreground">
                  <CheckSquare className="h-8 w-8 mx-auto mb-2 opacity-50" />
                  <p>No tasks yet</p>
                </div>
              )}
            </TabsContent>

            <TabsContent value="notes" className="mt-4">
              <div className="flex items-center justify-between mb-4">
                <p className="text-sm text-muted-foreground">Notes & Documents</p>
                <Button variant="outline" size="sm">
                  <Plus className="h-4 w-4 mr-1.5" /> Add Note
                </Button>
              </div>
              <div className="text-center py-8 text-muted-foreground">
                <FileText className="h-8 w-8 mx-auto mb-2 opacity-50" />
                <p>No notes yet</p>
              </div>
            </TabsContent>
          </Tabs>

          {/* Action buttons */}
          <div className="flex items-center gap-3 pt-4 border-t border-border">
            <Button variant="gradient" className="flex-1">
              <Mail className="h-4 w-4 mr-1.5" /> Send Email
            </Button>
            <Button variant="outline" className="flex-1">
              <Phone className="h-4 w-4 mr-1.5" /> Log Call
            </Button>
            <Button variant="outline" className="flex-1">
              <Calendar className="h-4 w-4 mr-1.5" /> Schedule Meeting
            </Button>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
}

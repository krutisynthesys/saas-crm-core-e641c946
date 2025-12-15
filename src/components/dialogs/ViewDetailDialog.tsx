import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { Lead, Opportunity, Task } from '@/data/mockData';
import { LeadStatusBadge } from '@/components/leads/LeadStatusBadge';
import { PriorityBadge } from '@/components/leads/PriorityBadge';
import { OpportunityStageBadge } from '@/components/opportunities/OpportunityStageBadge';
import { Badge } from '@/components/ui/badge';
import { Progress } from '@/components/ui/progress';

interface ViewDetailDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  type: 'lead' | 'opportunity' | 'task';
  data: Lead | Opportunity | Task | null;
}

export function ViewDetailDialog({ open, onOpenChange, type, data }: ViewDetailDialogProps) {
  if (!data) return null;

  const formatCurrency = (value: number) => new Intl.NumberFormat('en-US', { style: 'currency', currency: 'USD' }).format(value);

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-lg">
        <DialogHeader>
          <DialogTitle>
            {type === 'lead' && 'Lead Details'}
            {type === 'opportunity' && 'Opportunity Details'}
            {type === 'task' && 'Task Details'}
          </DialogTitle>
        </DialogHeader>
        <div className="mt-4 space-y-4">
          {type === 'lead' && (
            <>
              {(() => { const lead = data as Lead; return (
                <div className="space-y-4">
                  <div className="flex items-center gap-3">
                    <LeadStatusBadge status={lead.status} />
                    <PriorityBadge priority={lead.priority} />
                  </div>
                  <div className="grid grid-cols-2 gap-4 text-sm">
                    <div><span className="text-muted-foreground">Name:</span> <span className="font-medium">{lead.name}</span></div>
                    <div><span className="text-muted-foreground">Email:</span> <span className="font-medium">{lead.email}</span></div>
                    <div><span className="text-muted-foreground">Phone:</span> <span className="font-medium">{lead.phone}</span></div>
                    <div><span className="text-muted-foreground">Company:</span> <span className="font-medium">{lead.company}</span></div>
                    <div><span className="text-muted-foreground">Industry:</span> <span className="font-medium">{lead.industry}</span></div>
                    <div><span className="text-muted-foreground">Source:</span> <span className="font-medium">{lead.source}</span></div>
                    <div><span className="text-muted-foreground">Owner:</span> <span className="font-medium">{lead.owner}</span></div>
                    <div><span className="text-muted-foreground">Deal Value:</span> <span className="font-medium">{formatCurrency(lead.dealValue)}</span></div>
                  </div>
                  <div className="flex gap-2">
                    {lead.tags.map((tag) => <Badge key={tag} variant="secondary">{tag}</Badge>)}
                  </div>
                </div>
              ); })()}
            </>
          )}
          {type === 'opportunity' && (
            <>
              {(() => { const opp = data as Opportunity; return (
                <div className="space-y-4">
                  <OpportunityStageBadge stage={opp.stage} />
                  <div className="grid grid-cols-2 gap-4 text-sm">
                    <div className="col-span-2"><span className="text-muted-foreground">Name:</span> <span className="font-medium">{opp.name}</span></div>
                    <div><span className="text-muted-foreground">Lead:</span> <span className="font-medium">{opp.leadName}</span></div>
                    <div><span className="text-muted-foreground">Owner:</span> <span className="font-medium">{opp.owner}</span></div>
                    <div><span className="text-muted-foreground">Value:</span> <span className="font-medium">{formatCurrency(opp.value)}</span></div>
                    <div><span className="text-muted-foreground">Close Date:</span> <span className="font-medium">{new Date(opp.expectedCloseDate).toLocaleDateString()}</span></div>
                  </div>
                  <div className="space-y-2">
                    <div className="flex justify-between text-sm"><span>Win Probability</span><span>{opp.probability}%</span></div>
                    <Progress value={opp.probability} />
                  </div>
                  {opp.notes && <div className="text-sm p-3 bg-muted/50 rounded-lg"><span className="text-muted-foreground">Notes:</span> {opp.notes}</div>}
                </div>
              ); })()}
            </>
          )}
          {type === 'task' && (
            <>
              {(() => { const task = data as Task; return (
                <div className="space-y-4">
                  <div className="flex items-center gap-3">
                    <PriorityBadge priority={task.priority} />
                    <Badge variant="outline">{task.type}</Badge>
                  </div>
                  <div className="grid grid-cols-2 gap-4 text-sm">
                    <div className="col-span-2"><span className="text-muted-foreground">Title:</span> <span className="font-medium">{task.title}</span></div>
                    <div><span className="text-muted-foreground">Lead:</span> <span className="font-medium">{task.leadName}</span></div>
                    <div><span className="text-muted-foreground">Assignee:</span> <span className="font-medium">{task.assignee}</span></div>
                    <div><span className="text-muted-foreground">Due Date:</span> <span className="font-medium">{new Date(task.dueDate).toLocaleDateString()}</span></div>
                    <div><span className="text-muted-foreground">Status:</span> <span className="font-medium capitalize">{task.status}</span></div>
                  </div>
                  {task.description && <div className="text-sm p-3 bg-muted/50 rounded-lg">{task.description}</div>}
                </div>
              ); })()}
            </>
          )}
        </div>
      </DialogContent>
    </Dialog>
  );
}

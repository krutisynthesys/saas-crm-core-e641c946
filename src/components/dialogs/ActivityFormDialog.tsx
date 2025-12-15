import { useState } from 'react';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Textarea } from '@/components/ui/textarea';
import { Activity } from '@/data/mockData';
import { toast } from 'sonner';

interface ActivityFormDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  onSubmit?: () => void;
}

export function ActivityFormDialog({ open, onOpenChange, onSubmit }: ActivityFormDialogProps) {
  const [formData, setFormData] = useState({
    type: 'call' as Activity['type'],
    leadName: '',
    description: '',
    outcome: '',
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.leadName || !formData.description) {
      toast.error('Please fill in required fields');
      return;
    }
    toast.success('Activity logged successfully!');
    onSubmit?.();
    onOpenChange(false);
    setFormData({ type: 'call', leadName: '', description: '', outcome: '' });
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-lg">
        <DialogHeader>
          <DialogTitle>Log Activity</DialogTitle>
        </DialogHeader>
        <form onSubmit={handleSubmit} className="space-y-4 mt-4">
          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="type">Activity Type *</Label>
              <Select value={formData.type} onValueChange={(v) => setFormData({ ...formData, type: v as Activity['type'] })}>
                <SelectTrigger><SelectValue /></SelectTrigger>
                <SelectContent className="bg-popover">
                  <SelectItem value="call">Phone Call</SelectItem>
                  <SelectItem value="email">Email</SelectItem>
                  <SelectItem value="meeting">Meeting</SelectItem>
                  <SelectItem value="note">Note</SelectItem>
                  <SelectItem value="task-completed">Task Completed</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <div className="space-y-2">
              <Label htmlFor="leadName">Lead/Contact *</Label>
              <Input id="leadName" value={formData.leadName} onChange={(e) => setFormData({ ...formData, leadName: e.target.value })} placeholder="Select or enter lead name" />
            </div>
            <div className="col-span-2 space-y-2">
              <Label htmlFor="description">Description *</Label>
              <Textarea id="description" value={formData.description} onChange={(e) => setFormData({ ...formData, description: e.target.value })} placeholder="Describe the activity..." rows={3} />
            </div>
            <div className="col-span-2 space-y-2">
              <Label htmlFor="outcome">Outcome</Label>
              <Input id="outcome" value={formData.outcome} onChange={(e) => setFormData({ ...formData, outcome: e.target.value })} placeholder="e.g., Positive - Moving forward" />
            </div>
          </div>
          <div className="flex justify-end gap-3 pt-4">
            <Button type="button" variant="outline" onClick={() => onOpenChange(false)}>Cancel</Button>
            <Button type="submit" variant="gradient">Log Activity</Button>
          </div>
        </form>
      </DialogContent>
    </Dialog>
  );
}

import { useState } from 'react';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Textarea } from '@/components/ui/textarea';
import { Task } from '@/data/mockData';
import { toast } from 'sonner';

interface TaskFormDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  task?: Task | null;
  mode: 'create' | 'edit' | 'reschedule' | 'reassign';
}

export function TaskFormDialog({ open, onOpenChange, task, mode }: TaskFormDialogProps) {
  const [formData, setFormData] = useState({
    title: task?.title || '',
    description: task?.description || '',
    leadName: task?.leadName || '',
    assignee: task?.assignee || '',
    dueDate: task?.dueDate || '',
    priority: task?.priority || 'medium',
    type: task?.type || 'call',
  });

  const getTitle = () => {
    switch (mode) {
      case 'create': return 'New Task';
      case 'edit': return 'Edit Task';
      case 'reschedule': return 'Reschedule Task';
      case 'reassign': return 'Reassign Task';
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (mode === 'reschedule' && !formData.dueDate) {
      toast.error('Please select a new date');
      return;
    }
    if (mode === 'reassign' && !formData.assignee) {
      toast.error('Please select an assignee');
      return;
    }
    if ((mode === 'create' || mode === 'edit') && (!formData.title || !formData.dueDate)) {
      toast.error('Please fill in required fields');
      return;
    }
    const messages = { create: 'Task created!', edit: 'Task updated!', reschedule: 'Task rescheduled!', reassign: 'Task reassigned!' };
    toast.success(messages[mode]);
    onOpenChange(false);
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-lg">
        <DialogHeader>
          <DialogTitle>{getTitle()}</DialogTitle>
        </DialogHeader>
        <form onSubmit={handleSubmit} className="space-y-4 mt-4">
          {(mode === 'create' || mode === 'edit') && (
            <div className="grid grid-cols-2 gap-4">
              <div className="col-span-2 space-y-2">
                <Label htmlFor="title">Task Title *</Label>
                <Input id="title" value={formData.title} onChange={(e) => setFormData({ ...formData, title: e.target.value })} placeholder="Follow-up call with client" />
              </div>
              <div className="space-y-2">
                <Label htmlFor="type">Task Type</Label>
                <Select value={formData.type} onValueChange={(v) => setFormData({ ...formData, type: v as Task['type'] })}>
                  <SelectTrigger><SelectValue /></SelectTrigger>
                  <SelectContent className="bg-popover">
                    <SelectItem value="call">Call</SelectItem>
                    <SelectItem value="email">Email</SelectItem>
                    <SelectItem value="meeting">Meeting</SelectItem>
                    <SelectItem value="demo">Demo</SelectItem>
                    <SelectItem value="follow-up">Follow-up</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <div className="space-y-2">
                <Label htmlFor="priority">Priority</Label>
                <Select value={formData.priority} onValueChange={(v) => setFormData({ ...formData, priority: v as Task['priority'] })}>
                  <SelectTrigger><SelectValue /></SelectTrigger>
                  <SelectContent className="bg-popover">
                    <SelectItem value="high">High</SelectItem>
                    <SelectItem value="medium">Medium</SelectItem>
                    <SelectItem value="low">Low</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <div className="space-y-2">
                <Label htmlFor="leadName">Related Lead</Label>
                <Input id="leadName" value={formData.leadName} onChange={(e) => setFormData({ ...formData, leadName: e.target.value })} placeholder="Lead name" />
              </div>
              <div className="space-y-2">
                <Label htmlFor="assignee">Assignee</Label>
                <Select value={formData.assignee} onValueChange={(v) => setFormData({ ...formData, assignee: v })}>
                  <SelectTrigger><SelectValue placeholder="Select assignee" /></SelectTrigger>
                  <SelectContent className="bg-popover">
                    <SelectItem value="John Smith">John Smith</SelectItem>
                    <SelectItem value="Emily Davis">Emily Davis</SelectItem>
                    <SelectItem value="Sarah Wilson">Sarah Wilson</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <div className="space-y-2">
                <Label htmlFor="dueDate">Due Date *</Label>
                <Input id="dueDate" type="date" value={formData.dueDate} onChange={(e) => setFormData({ ...formData, dueDate: e.target.value })} />
              </div>
              <div className="col-span-2 space-y-2">
                <Label htmlFor="description">Description</Label>
                <Textarea id="description" value={formData.description} onChange={(e) => setFormData({ ...formData, description: e.target.value })} placeholder="Task details..." rows={3} />
              </div>
            </div>
          )}
          {mode === 'reschedule' && (
            <div className="space-y-2">
              <Label htmlFor="dueDate">New Due Date *</Label>
              <Input id="dueDate" type="date" value={formData.dueDate} onChange={(e) => setFormData({ ...formData, dueDate: e.target.value })} />
            </div>
          )}
          {mode === 'reassign' && (
            <div className="space-y-2">
              <Label htmlFor="assignee">New Assignee *</Label>
              <Select value={formData.assignee} onValueChange={(v) => setFormData({ ...formData, assignee: v })}>
                <SelectTrigger><SelectValue placeholder="Select assignee" /></SelectTrigger>
                <SelectContent className="bg-popover">
                  <SelectItem value="John Smith">John Smith</SelectItem>
                  <SelectItem value="Emily Davis">Emily Davis</SelectItem>
                  <SelectItem value="Sarah Wilson">Sarah Wilson</SelectItem>
                </SelectContent>
              </Select>
            </div>
          )}
          <div className="flex justify-end gap-3 pt-4">
            <Button type="button" variant="outline" onClick={() => onOpenChange(false)}>Cancel</Button>
            <Button type="submit" variant="gradient">{mode === 'create' ? 'Create Task' : 'Save'}</Button>
          </div>
        </form>
      </DialogContent>
    </Dialog>
  );
}

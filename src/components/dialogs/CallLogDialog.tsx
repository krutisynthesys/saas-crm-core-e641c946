import { useState } from 'react';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Textarea } from '@/components/ui/textarea';
import { toast } from 'sonner';

interface CallLogDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  leadName?: string;
}

export function CallLogDialog({ open, onOpenChange, leadName }: CallLogDialogProps) {
  const [formData, setFormData] = useState({
    duration: '',
    outcome: '',
    notes: '',
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    toast.success('Call logged successfully!');
    onOpenChange(false);
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-md">
        <DialogHeader>
          <DialogTitle>Log Call {leadName && `with ${leadName}`}</DialogTitle>
        </DialogHeader>
        <form onSubmit={handleSubmit} className="space-y-4 mt-4">
          <div className="space-y-2">
            <Label htmlFor="duration">Call Duration (minutes)</Label>
            <Input id="duration" type="number" value={formData.duration} onChange={(e) => setFormData({ ...formData, duration: e.target.value })} placeholder="15" />
          </div>
          <div className="space-y-2">
            <Label htmlFor="outcome">Outcome</Label>
            <Select value={formData.outcome} onValueChange={(v) => setFormData({ ...formData, outcome: v })}>
              <SelectTrigger><SelectValue placeholder="Select outcome" /></SelectTrigger>
              <SelectContent className="bg-popover">
                <SelectItem value="positive">Positive - Interested</SelectItem>
                <SelectItem value="follow-up">Needs Follow-up</SelectItem>
                <SelectItem value="no-answer">No Answer</SelectItem>
                <SelectItem value="not-interested">Not Interested</SelectItem>
              </SelectContent>
            </Select>
          </div>
          <div className="space-y-2">
            <Label htmlFor="notes">Notes</Label>
            <Textarea id="notes" value={formData.notes} onChange={(e) => setFormData({ ...formData, notes: e.target.value })} placeholder="Call summary..." rows={4} />
          </div>
          <div className="flex justify-end gap-3 pt-4">
            <Button type="button" variant="outline" onClick={() => onOpenChange(false)}>Cancel</Button>
            <Button type="submit" variant="gradient">Save Call Log</Button>
          </div>
        </form>
      </DialogContent>
    </Dialog>
  );
}

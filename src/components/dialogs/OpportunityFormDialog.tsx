import { useState, useEffect } from 'react';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Textarea } from '@/components/ui/textarea';
import { Opportunity } from '@/data/mockData';
import { toast } from 'sonner';

interface OpportunityFormDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  opportunity?: Opportunity | null;
  mode?: 'create' | 'edit';
  onSubmit?: () => void;
}

export function OpportunityFormDialog({ open, onOpenChange, opportunity, mode = 'create', onSubmit }: OpportunityFormDialogProps) {
  const [formData, setFormData] = useState({
    name: '',
    leadName: '',
    stage: 'qualification' as Opportunity['stage'],
    value: '',
    probability: '50',
    owner: '',
    expectedCloseDate: '',
    notes: '',
  });

  useEffect(() => {
    if (opportunity) {
      setFormData({
        name: opportunity.name || '',
        leadName: opportunity.leadName || '',
        stage: opportunity.stage || 'qualification',
        value: opportunity.value?.toString() || '',
        probability: opportunity.probability?.toString() || '50',
        owner: opportunity.owner || '',
        expectedCloseDate: opportunity.expectedCloseDate || '',
        notes: opportunity.notes || '',
      });
    } else {
      setFormData({ name: '', leadName: '', stage: 'qualification', value: '', probability: '50', owner: '', expectedCloseDate: '', notes: '' });
    }
  }, [opportunity, open]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.name || !formData.leadName || !formData.value) {
      toast.error('Please fill in required fields');
      return;
    }
    toast.success(mode === 'create' ? 'Opportunity created successfully!' : 'Opportunity updated successfully!');
    onSubmit?.();
    onOpenChange(false);
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-lg">
        <DialogHeader>
          <DialogTitle>{mode === 'create' ? 'New Opportunity' : 'Edit Opportunity'}</DialogTitle>
        </DialogHeader>
        <form onSubmit={handleSubmit} className="space-y-4 mt-4">
          <div className="grid grid-cols-2 gap-4">
            <div className="col-span-2 space-y-2">
              <Label htmlFor="name">Opportunity Name *</Label>
              <Input id="name" value={formData.name} onChange={(e) => setFormData({ ...formData, name: e.target.value })} placeholder="Enterprise License Deal" />
            </div>
            <div className="space-y-2">
              <Label htmlFor="leadName">Lead/Contact Name *</Label>
              <Input id="leadName" value={formData.leadName} onChange={(e) => setFormData({ ...formData, leadName: e.target.value })} placeholder="John Doe" />
            </div>
            <div className="space-y-2">
              <Label htmlFor="owner">Owner</Label>
              <Select value={formData.owner} onValueChange={(v) => setFormData({ ...formData, owner: v })}>
                <SelectTrigger><SelectValue placeholder="Select owner" /></SelectTrigger>
                <SelectContent className="bg-popover">
                  <SelectItem value="John Smith">John Smith</SelectItem>
                  <SelectItem value="Emily Davis">Emily Davis</SelectItem>
                  <SelectItem value="Sarah Wilson">Sarah Wilson</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <div className="space-y-2">
              <Label htmlFor="stage">Stage</Label>
              <Select value={formData.stage} onValueChange={(v) => setFormData({ ...formData, stage: v as Opportunity['stage'] })}>
                <SelectTrigger><SelectValue /></SelectTrigger>
                <SelectContent className="bg-popover">
                  <SelectItem value="qualification">Qualification</SelectItem>
                  <SelectItem value="proposal">Proposal</SelectItem>
                  <SelectItem value="negotiation">Negotiation</SelectItem>
                  <SelectItem value="closed-won">Closed Won</SelectItem>
                  <SelectItem value="closed-lost">Closed Lost</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <div className="space-y-2">
              <Label htmlFor="value">Deal Value ($) *</Label>
              <Input id="value" type="number" value={formData.value} onChange={(e) => setFormData({ ...formData, value: e.target.value })} placeholder="50000" />
            </div>
            <div className="space-y-2">
              <Label htmlFor="probability">Win Probability (%)</Label>
              <Input id="probability" type="number" min="0" max="100" value={formData.probability} onChange={(e) => setFormData({ ...formData, probability: e.target.value })} />
            </div>
            <div className="space-y-2">
              <Label htmlFor="closeDate">Expected Close Date</Label>
              <Input id="closeDate" type="date" value={formData.expectedCloseDate} onChange={(e) => setFormData({ ...formData, expectedCloseDate: e.target.value })} />
            </div>
            <div className="col-span-2 space-y-2">
              <Label htmlFor="notes">Notes</Label>
              <Textarea id="notes" value={formData.notes} onChange={(e) => setFormData({ ...formData, notes: e.target.value })} placeholder="Additional notes..." rows={3} />
            </div>
          </div>
          <div className="flex justify-end gap-3 pt-4">
            <Button type="button" variant="outline" onClick={() => onOpenChange(false)}>Cancel</Button>
            <Button type="submit" variant="gradient">{mode === 'create' ? 'Create Opportunity' : 'Save Changes'}</Button>
          </div>
        </form>
      </DialogContent>
    </Dialog>
  );
}

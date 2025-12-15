import { useState } from 'react';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { toast } from 'sonner';

interface EmailDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  recipientEmail?: string;
  recipientName?: string;
}

export function EmailDialog({ open, onOpenChange, recipientEmail, recipientName }: EmailDialogProps) {
  const [formData, setFormData] = useState({
    to: recipientEmail || '',
    subject: '',
    body: '',
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.to || !formData.subject) {
      toast.error('Please fill in required fields');
      return;
    }
    toast.success('Email sent successfully!');
    onOpenChange(false);
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-lg">
        <DialogHeader>
          <DialogTitle>Send Email {recipientName && `to ${recipientName}`}</DialogTitle>
        </DialogHeader>
        <form onSubmit={handleSubmit} className="space-y-4 mt-4">
          <div className="space-y-2">
            <Label htmlFor="to">To *</Label>
            <Input id="to" type="email" value={formData.to} onChange={(e) => setFormData({ ...formData, to: e.target.value })} placeholder="recipient@email.com" />
          </div>
          <div className="space-y-2">
            <Label htmlFor="subject">Subject *</Label>
            <Input id="subject" value={formData.subject} onChange={(e) => setFormData({ ...formData, subject: e.target.value })} placeholder="Email subject" />
          </div>
          <div className="space-y-2">
            <Label htmlFor="body">Message</Label>
            <Textarea id="body" value={formData.body} onChange={(e) => setFormData({ ...formData, body: e.target.value })} placeholder="Write your message..." rows={6} />
          </div>
          <div className="flex justify-end gap-3 pt-4">
            <Button type="button" variant="outline" onClick={() => onOpenChange(false)}>Cancel</Button>
            <Button type="submit" variant="gradient">Send Email</Button>
          </div>
        </form>
      </DialogContent>
    </Dialog>
  );
}

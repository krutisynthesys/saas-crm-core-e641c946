import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog';

interface ViewDetailDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  title: string;
  data: Record<string, string | undefined>;
}

export function ViewDetailDialog({ open, onOpenChange, title, data }: ViewDetailDialogProps) {
  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-lg">
        <DialogHeader>
          <DialogTitle>{title}</DialogTitle>
        </DialogHeader>
        <div className="mt-4 space-y-3">
          {Object.entries(data).map(([key, value]) => (
            value && (
              <div key={key} className="flex justify-between py-2 border-b border-border last:border-0">
                <span className="text-muted-foreground">{key}</span>
                <span className="font-medium text-foreground">{value}</span>
              </div>
            )
          ))}
        </div>
      </DialogContent>
    </Dialog>
  );
}

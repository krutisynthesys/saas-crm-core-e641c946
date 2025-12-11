import { useState } from 'react';
import { DashboardLayout } from '@/components/layout/DashboardLayout';
import { LeadTable } from '@/components/leads/LeadTable';
import { LeadDetailModal } from '@/components/leads/LeadDetailModal';
import { Button } from '@/components/ui/button';
import { Lead } from '@/data/mockData';
import { Plus, Users, TrendingUp, Target, Clock } from 'lucide-react';

export default function Leads() {
  const [selectedLead, setSelectedLead] = useState<Lead | null>(null);
  const [modalOpen, setModalOpen] = useState(false);

  const handleLeadClick = (lead: Lead) => {
    setSelectedLead(lead);
    setModalOpen(true);
  };

  return (
    <DashboardLayout>
      <div className="space-y-6">
        {/* Header */}
        <div className="flex items-center justify-between">
          <div>
            <h2 className="text-2xl font-bold text-foreground">Lead Management</h2>
            <p className="text-muted-foreground">Manage and track all your leads in one place</p>
          </div>
          <Button variant="gradient">
            <Plus className="h-4 w-4 mr-1.5" /> Add Lead
          </Button>
        </div>

        {/* Quick stats */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          <div className="bg-card rounded-xl border border-border p-4 flex items-center gap-4">
            <div className="h-12 w-12 rounded-lg bg-blue-100 text-blue-600 flex items-center justify-center">
              <Users className="h-6 w-6" />
            </div>
            <div>
              <p className="text-2xl font-bold text-foreground">248</p>
              <p className="text-sm text-muted-foreground">Total Leads</p>
            </div>
          </div>
          <div className="bg-card rounded-xl border border-border p-4 flex items-center gap-4">
            <div className="h-12 w-12 rounded-lg bg-emerald-100 text-emerald-600 flex items-center justify-center">
              <TrendingUp className="h-6 w-6" />
            </div>
            <div>
              <p className="text-2xl font-bold text-foreground">45</p>
              <p className="text-sm text-muted-foreground">New This Month</p>
            </div>
          </div>
          <div className="bg-card rounded-xl border border-border p-4 flex items-center gap-4">
            <div className="h-12 w-12 rounded-lg bg-amber-100 text-amber-600 flex items-center justify-center">
              <Target className="h-6 w-6" />
            </div>
            <div>
              <p className="text-2xl font-bold text-foreground">32</p>
              <p className="text-sm text-muted-foreground">Qualified</p>
            </div>
          </div>
          <div className="bg-card rounded-xl border border-border p-4 flex items-center gap-4">
            <div className="h-12 w-12 rounded-lg bg-purple-100 text-purple-600 flex items-center justify-center">
              <Clock className="h-6 w-6" />
            </div>
            <div>
              <p className="text-2xl font-bold text-foreground">12</p>
              <p className="text-sm text-muted-foreground">Pending Follow-up</p>
            </div>
          </div>
        </div>

        {/* Lead table */}
        <LeadTable onLeadClick={handleLeadClick} />

        {/* Lead detail modal */}
        <LeadDetailModal
          lead={selectedLead}
          open={modalOpen}
          onOpenChange={setModalOpen}
        />
      </div>
    </DashboardLayout>
  );
}

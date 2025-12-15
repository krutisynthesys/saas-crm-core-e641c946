import { useState } from 'react';
import { DashboardLayout } from '@/components/layout/DashboardLayout';
import { mockLeads, Lead } from '@/data/mockData';
import { LeadStatusBadge } from '@/components/leads/LeadStatusBadge';
import { PriorityBadge } from '@/components/leads/PriorityBadge';
import { LeadFormDialog } from '@/components/dialogs/LeadFormDialog';
import { EmailDialog } from '@/components/dialogs/EmailDialog';
import { CallLogDialog } from '@/components/dialogs/CallLogDialog';
import { ConfirmDialog } from '@/components/dialogs/ConfirmDialog';
import { ViewDetailDialog } from '@/components/dialogs/ViewDetailDialog';
import { Button } from '@/components/ui/button';
import { Checkbox } from '@/components/ui/checkbox';
import { Input } from '@/components/ui/input';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuLabel, DropdownMenuSeparator, DropdownMenuTrigger } from '@/components/ui/dropdown-menu';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Avatar, AvatarFallback } from '@/components/ui/avatar';
import { Search, Filter, MoreHorizontal, Mail, Phone, Eye, Edit, Trash2, ChevronLeft, ChevronRight, ArrowUpDown, Download, Upload, Plus, Users, TrendingUp, Target, Clock } from 'lucide-react';
import { cn } from '@/lib/utils';
import { toast } from 'sonner';

export default function Leads() {
  const [leads, setLeads] = useState(mockLeads);
  const [selectedLeads, setSelectedLeads] = useState<string[]>([]);
  const [searchQuery, setSearchQuery] = useState('');
  const [statusFilter, setStatusFilter] = useState<string>('all');
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 8;

  // Dialog states
  const [leadFormOpen, setLeadFormOpen] = useState(false);
  const [leadFormMode, setLeadFormMode] = useState<'create' | 'edit'>('create');
  const [selectedLead, setSelectedLead] = useState<Lead | null>(null);
  const [viewDialogOpen, setViewDialogOpen] = useState(false);
  const [emailDialogOpen, setEmailDialogOpen] = useState(false);
  const [callDialogOpen, setCallDialogOpen] = useState(false);
  const [deleteDialogOpen, setDeleteDialogOpen] = useState(false);

  const filteredLeads = leads.filter((lead) => {
    const matchesSearch = lead.name.toLowerCase().includes(searchQuery.toLowerCase()) || lead.company.toLowerCase().includes(searchQuery.toLowerCase()) || lead.email.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesStatus = statusFilter === 'all' || lead.status === statusFilter;
    return matchesSearch && matchesStatus;
  });

  const totalPages = Math.ceil(filteredLeads.length / itemsPerPage);
  const paginatedLeads = filteredLeads.slice((currentPage - 1) * itemsPerPage, currentPage * itemsPerPage);

  const toggleSelectAll = () => {
    if (selectedLeads.length === paginatedLeads.length) setSelectedLeads([]);
    else setSelectedLeads(paginatedLeads.map((l) => l.id));
  };

  const toggleSelect = (id: string) => setSelectedLeads((prev) => prev.includes(id) ? prev.filter((i) => i !== id) : [...prev, id]);

  const formatCurrency = (value: number) => new Intl.NumberFormat('en-US', { style: 'currency', currency: 'USD', notation: 'compact', maximumFractionDigits: 0 }).format(value);

  const handleAddLead = () => { setSelectedLead(null); setLeadFormMode('create'); setLeadFormOpen(true); };
  const handleEditLead = (lead: Lead) => { setSelectedLead(lead); setLeadFormMode('edit'); setLeadFormOpen(true); };
  const handleViewLead = (lead: Lead) => { setSelectedLead(lead); setViewDialogOpen(true); };
  const handleEmailLead = (lead: Lead) => { setSelectedLead(lead); setEmailDialogOpen(true); };
  const handleCallLead = (lead: Lead) => { setSelectedLead(lead); setCallDialogOpen(true); };
  const handleDeleteLead = (lead: Lead) => { setSelectedLead(lead); setDeleteDialogOpen(true); };
  const confirmDelete = () => { setLeads((prev) => prev.filter((l) => l.id !== selectedLead?.id)); toast.success('Lead deleted'); setDeleteDialogOpen(false); };

  return (
    <DashboardLayout>
      <div className="space-y-6">
        <div className="flex items-center justify-between">
          <div>
            <h2 className="text-2xl font-bold text-foreground">Lead Management</h2>
            <p className="text-muted-foreground">Manage and track all your leads in one place</p>
          </div>
          <Button variant="gradient" onClick={handleAddLead}><Plus className="h-4 w-4 mr-1.5" /> Add Lead</Button>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          <div className="bg-card rounded-xl border border-border p-4 flex items-center gap-4">
            <div className="h-12 w-12 rounded-lg bg-blue-100 text-blue-600 flex items-center justify-center"><Users className="h-6 w-6" /></div>
            <div><p className="text-2xl font-bold text-foreground">{leads.length}</p><p className="text-sm text-muted-foreground">Total Leads</p></div>
          </div>
          <div className="bg-card rounded-xl border border-border p-4 flex items-center gap-4">
            <div className="h-12 w-12 rounded-lg bg-emerald-100 text-emerald-600 flex items-center justify-center"><TrendingUp className="h-6 w-6" /></div>
            <div><p className="text-2xl font-bold text-foreground">{leads.filter(l => l.status === 'new').length}</p><p className="text-sm text-muted-foreground">New Leads</p></div>
          </div>
          <div className="bg-card rounded-xl border border-border p-4 flex items-center gap-4">
            <div className="h-12 w-12 rounded-lg bg-amber-100 text-amber-600 flex items-center justify-center"><Target className="h-6 w-6" /></div>
            <div><p className="text-2xl font-bold text-foreground">{leads.filter(l => l.status === 'opportunity').length}</p><p className="text-sm text-muted-foreground">Qualified</p></div>
          </div>
          <div className="bg-card rounded-xl border border-border p-4 flex items-center gap-4">
            <div className="h-12 w-12 rounded-lg bg-purple-100 text-purple-600 flex items-center justify-center"><Clock className="h-6 w-6" /></div>
            <div><p className="text-2xl font-bold text-foreground">{leads.filter(l => l.status === 'engaged').length}</p><p className="text-sm text-muted-foreground">Engaged</p></div>
          </div>
        </div>

        <div className="flex flex-col sm:flex-row gap-4 items-start sm:items-center justify-between">
          <div className="flex flex-1 items-center gap-3 w-full sm:w-auto">
            <div className="relative flex-1 sm:max-w-xs">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
              <Input placeholder="Search leads..." value={searchQuery} onChange={(e) => setSearchQuery(e.target.value)} className="pl-9" />
            </div>
            <Select value={statusFilter} onValueChange={setStatusFilter}>
              <SelectTrigger className="w-[140px]"><Filter className="h-4 w-4 mr-2" /><SelectValue placeholder="Status" /></SelectTrigger>
              <SelectContent className="bg-popover">
                <SelectItem value="all">All Status</SelectItem>
                <SelectItem value="new">New</SelectItem>
                <SelectItem value="engaged">Engaged</SelectItem>
                <SelectItem value="opportunity">Opportunity</SelectItem>
                <SelectItem value="cold">Cold</SelectItem>
                <SelectItem value="won">Won</SelectItem>
                <SelectItem value="lost">Lost</SelectItem>
              </SelectContent>
            </Select>
          </div>
          <div className="flex items-center gap-2">
            <Button variant="outline" size="sm"><Upload className="h-4 w-4 mr-1.5" />Import</Button>
            <Button variant="outline" size="sm"><Download className="h-4 w-4 mr-1.5" />Export</Button>
          </div>
        </div>

        {selectedLeads.length > 0 && (
          <div className="flex items-center gap-3 p-3 bg-muted/50 rounded-lg animate-fade-in">
            <span className="text-sm font-medium">{selectedLeads.length} lead(s) selected</span>
            <Button variant="outline" size="sm">Assign</Button>
            <Button variant="outline" size="sm">Update Status</Button>
            <Button variant="outline" size="sm" className="text-destructive hover:text-destructive">Delete</Button>
          </div>
        )}

        <div className="bg-card rounded-xl border border-border overflow-hidden">
          <Table>
            <TableHeader>
              <TableRow className="hover:bg-transparent">
                <TableHead className="w-12"><Checkbox checked={selectedLeads.length === paginatedLeads.length && paginatedLeads.length > 0} onCheckedChange={toggleSelectAll} /></TableHead>
                <TableHead><div className="flex items-center gap-1.5 cursor-pointer hover:text-foreground">Lead <ArrowUpDown className="h-3.5 w-3.5" /></div></TableHead>
                <TableHead>Company</TableHead>
                <TableHead>Status</TableHead>
                <TableHead>Priority</TableHead>
                <TableHead>Owner</TableHead>
                <TableHead><div className="flex items-center gap-1.5 cursor-pointer hover:text-foreground">Deal Value <ArrowUpDown className="h-3.5 w-3.5" /></div></TableHead>
                <TableHead>Last Activity</TableHead>
                <TableHead className="w-12"></TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {paginatedLeads.map((lead) => (
                <TableRow key={lead.id} className={cn('cursor-pointer table-row-hover', selectedLeads.includes(lead.id) && 'bg-muted/50')} onClick={() => handleViewLead(lead)}>
                  <TableCell onClick={(e) => e.stopPropagation()}><Checkbox checked={selectedLeads.includes(lead.id)} onCheckedChange={() => toggleSelect(lead.id)} /></TableCell>
                  <TableCell>
                    <div className="flex items-center gap-3">
                      <Avatar className="h-9 w-9"><AvatarFallback className="bg-primary/10 text-primary text-xs font-medium">{lead.name.split(' ').map((n) => n[0]).join('')}</AvatarFallback></Avatar>
                      <div><p className="font-medium text-foreground">{lead.name}</p><p className="text-xs text-muted-foreground">{lead.email}</p></div>
                    </div>
                  </TableCell>
                  <TableCell><div><p className="font-medium text-foreground">{lead.company}</p><p className="text-xs text-muted-foreground">{lead.industry}</p></div></TableCell>
                  <TableCell><LeadStatusBadge status={lead.status} /></TableCell>
                  <TableCell><PriorityBadge priority={lead.priority} /></TableCell>
                  <TableCell><span className="text-sm text-foreground">{lead.owner}</span></TableCell>
                  <TableCell><span className="font-medium text-foreground">{formatCurrency(lead.dealValue)}</span></TableCell>
                  <TableCell><span className="text-sm text-muted-foreground">{new Date(lead.lastActivity).toLocaleDateString('en-US', { month: 'short', day: 'numeric' })}</span></TableCell>
                  <TableCell onClick={(e) => e.stopPropagation()}>
                    <DropdownMenu>
                      <DropdownMenuTrigger asChild><Button variant="ghost" size="icon-sm"><MoreHorizontal className="h-4 w-4" /></Button></DropdownMenuTrigger>
                      <DropdownMenuContent align="end" className="bg-popover">
                        <DropdownMenuLabel>Actions</DropdownMenuLabel>
                        <DropdownMenuSeparator />
                        <DropdownMenuItem className="cursor-pointer" onClick={() => handleViewLead(lead)}><Eye className="h-4 w-4 mr-2" /> View Details</DropdownMenuItem>
                        <DropdownMenuItem className="cursor-pointer" onClick={() => handleEditLead(lead)}><Edit className="h-4 w-4 mr-2" /> Edit Lead</DropdownMenuItem>
                        <DropdownMenuItem className="cursor-pointer" onClick={() => handleEmailLead(lead)}><Mail className="h-4 w-4 mr-2" /> Send Email</DropdownMenuItem>
                        <DropdownMenuItem className="cursor-pointer" onClick={() => handleCallLead(lead)}><Phone className="h-4 w-4 mr-2" /> Log Call</DropdownMenuItem>
                        <DropdownMenuSeparator />
                        <DropdownMenuItem className="cursor-pointer text-destructive focus:text-destructive" onClick={() => handleDeleteLead(lead)}><Trash2 className="h-4 w-4 mr-2" /> Delete</DropdownMenuItem>
                      </DropdownMenuContent>
                    </DropdownMenu>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </div>

        <div className="flex items-center justify-between">
          <p className="text-sm text-muted-foreground">Showing {(currentPage - 1) * itemsPerPage + 1} to {Math.min(currentPage * itemsPerPage, filteredLeads.length)} of {filteredLeads.length} leads</p>
          <div className="flex items-center gap-2">
            <Button variant="outline" size="sm" onClick={() => setCurrentPage((p) => Math.max(1, p - 1))} disabled={currentPage === 1}><ChevronLeft className="h-4 w-4" /></Button>
            {Array.from({ length: totalPages }, (_, i) => i + 1).map((page) => (
              <Button key={page} variant={currentPage === page ? 'default' : 'outline'} size="sm" onClick={() => setCurrentPage(page)} className="w-9">{page}</Button>
            ))}
            <Button variant="outline" size="sm" onClick={() => setCurrentPage((p) => Math.min(totalPages, p + 1))} disabled={currentPage === totalPages}><ChevronRight className="h-4 w-4" /></Button>
          </div>
        </div>
      </div>

      <LeadFormDialog open={leadFormOpen} onOpenChange={setLeadFormOpen} lead={selectedLead} mode={leadFormMode} />
      <ViewDetailDialog open={viewDialogOpen} onOpenChange={setViewDialogOpen} type="lead" data={selectedLead} />
      <EmailDialog open={emailDialogOpen} onOpenChange={setEmailDialogOpen} recipientEmail={selectedLead?.email} recipientName={selectedLead?.name} />
      <CallLogDialog open={callDialogOpen} onOpenChange={setCallDialogOpen} leadName={selectedLead?.name} />
      <ConfirmDialog open={deleteDialogOpen} onOpenChange={setDeleteDialogOpen} title="Delete Lead" description={`Are you sure you want to delete ${selectedLead?.name}? This action cannot be undone.`} onConfirm={confirmDelete} confirmLabel="Delete" variant="destructive" />
    </DashboardLayout>
  );
}

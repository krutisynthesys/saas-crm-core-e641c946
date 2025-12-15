import { useState } from 'react';
import { DashboardLayout } from '@/components/layout/DashboardLayout';
import { mockOpportunities, Opportunity } from '@/data/mockData';
import { OpportunityStageBadge } from '@/components/opportunities/OpportunityStageBadge';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Avatar, AvatarFallback } from '@/components/ui/avatar';
import { Progress } from '@/components/ui/progress';
import { Card, CardContent } from '@/components/ui/card';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import {
  Plus,
  Search,
  Filter,
  LayoutGrid,
  List,
  MoreHorizontal,
  DollarSign,
  TrendingUp,
  Target,
  Calendar,
  Eye,
  Edit,
  Trash2,
} from 'lucide-react';
import { cn } from '@/lib/utils';
import { OpportunityFormDialog } from '@/components/dialogs/OpportunityFormDialog';
import { ViewDetailDialog } from '@/components/dialogs/ViewDetailDialog';
import { ConfirmDialog } from '@/components/dialogs/ConfirmDialog';
import { toast } from 'sonner';

const stages = [
  { key: 'qualification', label: 'Qualification', color: 'bg-blue-500' },
  { key: 'proposal', label: 'Proposal', color: 'bg-amber-500' },
  { key: 'negotiation', label: 'Negotiation', color: 'bg-purple-500' },
  { key: 'closed-won', label: 'Closed Won', color: 'bg-green-500' },
  { key: 'closed-lost', label: 'Closed Lost', color: 'bg-red-500' },
];

export default function Opportunities() {
  const [opportunities, setOpportunities] = useState(mockOpportunities);
  const [viewMode, setViewMode] = useState<'kanban' | 'list'>('kanban');
  const [searchQuery, setSearchQuery] = useState('');
  const [formDialogOpen, setFormDialogOpen] = useState(false);
  const [editingOpp, setEditingOpp] = useState<Opportunity | null>(null);
  const [viewingOpp, setViewingOpp] = useState<Opportunity | null>(null);
  const [deletingOpp, setDeletingOpp] = useState<Opportunity | null>(null);

  const filteredOpportunities = opportunities.filter(
    (opp) =>
      opp.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      opp.leadName.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const formatCurrency = (value: number) => {
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD',
      notation: 'compact',
      maximumFractionDigits: 0,
    }).format(value);
  };

  const getStageOpportunities = (stage: string) => {
    return filteredOpportunities.filter((opp) => opp.stage === stage);
  };

  const getStageValue = (stage: string) => {
    return getStageOpportunities(stage).reduce((sum, opp) => sum + opp.value, 0);
  };

  const totalPipelineValue = filteredOpportunities.reduce((sum, opp) => sum + opp.value, 0);
  const weightedPipelineValue = filteredOpportunities.reduce(
    (sum, opp) => sum + opp.value * (opp.probability / 100),
    0
  );

  const handleAddOpp = () => {
    setEditingOpp(null);
    setFormDialogOpen(true);
  };

  const handleEditOpp = (opp: Opportunity) => {
    setEditingOpp(opp);
    setFormDialogOpen(true);
  };

  const handleDeleteOpp = () => {
    if (deletingOpp) {
      setOpportunities(prev => prev.filter(o => o.id !== deletingOpp.id));
      toast.success('Opportunity deleted');
      setDeletingOpp(null);
    }
  };

  const handleFormSubmit = () => {
    toast.success(editingOpp ? 'Opportunity updated' : 'Opportunity created');
    setFormDialogOpen(false);
    setEditingOpp(null);
  };

  return (
    <DashboardLayout>
      <div className="space-y-6">
        {/* Header */}
        <div className="flex items-center justify-between">
          <div>
            <h2 className="text-2xl font-bold text-foreground">Opportunities</h2>
            <p className="text-muted-foreground">Track and manage your sales pipeline</p>
          </div>
          <Button variant="gradient" onClick={handleAddOpp}>
            <Plus className="h-4 w-4 mr-1.5" /> New Opportunity
          </Button>
        </div>

        {/* Stats */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          <div className="bg-card rounded-xl border border-border p-4 flex items-center gap-4">
            <div className="h-12 w-12 rounded-lg bg-blue-100 text-blue-600 flex items-center justify-center">
              <Target className="h-6 w-6" />
            </div>
            <div>
              <p className="text-2xl font-bold text-foreground">{filteredOpportunities.length}</p>
              <p className="text-sm text-muted-foreground">Total Opportunities</p>
            </div>
          </div>
          <div className="bg-card rounded-xl border border-border p-4 flex items-center gap-4">
            <div className="h-12 w-12 rounded-lg bg-emerald-100 text-emerald-600 flex items-center justify-center">
              <DollarSign className="h-6 w-6" />
            </div>
            <div>
              <p className="text-2xl font-bold text-foreground">{formatCurrency(totalPipelineValue)}</p>
              <p className="text-sm text-muted-foreground">Pipeline Value</p>
            </div>
          </div>
          <div className="bg-card rounded-xl border border-border p-4 flex items-center gap-4">
            <div className="h-12 w-12 rounded-lg bg-amber-100 text-amber-600 flex items-center justify-center">
              <TrendingUp className="h-6 w-6" />
            </div>
            <div>
              <p className="text-2xl font-bold text-foreground">{formatCurrency(weightedPipelineValue)}</p>
              <p className="text-sm text-muted-foreground">Weighted Value</p>
            </div>
          </div>
          <div className="bg-card rounded-xl border border-border p-4 flex items-center gap-4">
            <div className="h-12 w-12 rounded-lg bg-purple-100 text-purple-600 flex items-center justify-center">
              <Calendar className="h-6 w-6" />
            </div>
            <div>
              <p className="text-2xl font-bold text-foreground">
                {filteredOpportunities.filter((o) => o.stage === 'negotiation').length}
              </p>
              <p className="text-sm text-muted-foreground">In Negotiation</p>
            </div>
          </div>
        </div>

        {/* Toolbar */}
        <div className="flex items-center justify-between gap-4">
          <div className="relative flex-1 max-w-xs">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
            <Input
              placeholder="Search opportunities..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="pl-9"
            />
          </div>
          <div className="flex items-center gap-2">
            <Button variant="outline" size="sm">
              <Filter className="h-4 w-4 mr-1.5" /> Filter
            </Button>
            <div className="flex items-center border border-border rounded-lg p-0.5">
              <Button
                variant={viewMode === 'kanban' ? 'secondary' : 'ghost'}
                size="sm"
                onClick={() => setViewMode('kanban')}
              >
                <LayoutGrid className="h-4 w-4" />
              </Button>
              <Button
                variant={viewMode === 'list' ? 'secondary' : 'ghost'}
                size="sm"
                onClick={() => setViewMode('list')}
              >
                <List className="h-4 w-4" />
              </Button>
            </div>
          </div>
        </div>

        {/* Kanban View */}
        {viewMode === 'kanban' && (
          <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-5 gap-4 overflow-x-auto pb-4">
            {stages.map((stage) => {
              const stageOpps = getStageOpportunities(stage.key);
              const stageValue = getStageValue(stage.key);
              
              return (
                <div key={stage.key} className="min-w-[280px]">
                  <div className="bg-muted/50 rounded-xl p-3 space-y-3">
                    {/* Stage header */}
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-2">
                        <div className={cn('h-2.5 w-2.5 rounded-full', stage.color)} />
                        <span className="font-medium text-sm">{stage.label}</span>
                        <span className="text-xs text-muted-foreground bg-background px-1.5 py-0.5 rounded">
                          {stageOpps.length}
                        </span>
                      </div>
                    </div>
                    <p className="text-xs text-muted-foreground">{formatCurrency(stageValue)}</p>

                    {/* Opportunity cards */}
                    <div className="space-y-2">
                      {stageOpps.map((opp) => (
                        <Card
                          key={opp.id}
                          className="cursor-pointer hover:shadow-md transition-shadow bg-card"
                        >
                          <CardContent className="p-3 space-y-3">
                            <div className="flex items-start justify-between">
                              <div className="space-y-1">
                                <p className="font-medium text-sm line-clamp-2">{opp.name}</p>
                                <p className="text-xs text-muted-foreground">{opp.leadName}</p>
                              </div>
                              <DropdownMenu>
                                <DropdownMenuTrigger asChild>
                                  <Button variant="ghost" size="icon-sm" className="h-6 w-6">
                                    <MoreHorizontal className="h-3.5 w-3.5" />
                                  </Button>
                                </DropdownMenuTrigger>
                                <DropdownMenuContent align="end" className="bg-popover">
                                  <DropdownMenuItem className="cursor-pointer" onClick={() => setViewingOpp(opp)}>
                                    <Eye className="h-4 w-4 mr-2" /> View Details
                                  </DropdownMenuItem>
                                  <DropdownMenuItem className="cursor-pointer" onClick={() => handleEditOpp(opp)}>
                                    <Edit className="h-4 w-4 mr-2" /> Edit
                                  </DropdownMenuItem>
                                  <DropdownMenuSeparator />
                                  <DropdownMenuItem className="cursor-pointer text-destructive focus:text-destructive" onClick={() => setDeletingOpp(opp)}>
                                    <Trash2 className="h-4 w-4 mr-2" /> Delete
                                  </DropdownMenuItem>
                                </DropdownMenuContent>
                              </DropdownMenu>
                            </div>
                            
                            <div className="flex items-center justify-between text-xs">
                              <span className="font-semibold text-foreground">
                                {formatCurrency(opp.value)}
                              </span>
                              <span className="text-muted-foreground">{opp.probability}%</span>
                            </div>
                            
                            <Progress value={opp.probability} className="h-1.5" />
                            
                            <div className="flex items-center justify-between">
                              <div className="flex items-center gap-1.5">
                                <Avatar className="h-5 w-5">
                                  <AvatarFallback className="text-[10px] bg-primary/10 text-primary">
                                    {opp.owner.split(' ').map((n) => n[0]).join('')}
                                  </AvatarFallback>
                                </Avatar>
                                <span className="text-xs text-muted-foreground">{opp.owner.split(' ')[0]}</span>
                              </div>
                              <span className="text-xs text-muted-foreground">
                                {new Date(opp.expectedCloseDate).toLocaleDateString('en-US', {
                                  month: 'short',
                                  day: 'numeric',
                                })}
                              </span>
                            </div>
                          </CardContent>
                        </Card>
                      ))}
                    </div>

                    {/* Add opportunity button */}
                    <Button variant="ghost" size="sm" className="w-full text-muted-foreground" onClick={handleAddOpp}>
                      <Plus className="h-4 w-4 mr-1" /> Add Opportunity
                    </Button>
                  </div>
                </div>
              );
            })}
          </div>
        )}

        {/* List View */}
        {viewMode === 'list' && (
          <div className="bg-card rounded-xl border border-border overflow-hidden">
            <Table>
              <TableHeader>
                <TableRow className="hover:bg-transparent">
                  <TableHead>Opportunity</TableHead>
                  <TableHead>Lead</TableHead>
                  <TableHead>Stage</TableHead>
                  <TableHead>Value</TableHead>
                  <TableHead>Probability</TableHead>
                  <TableHead>Owner</TableHead>
                  <TableHead>Close Date</TableHead>
                  <TableHead className="w-12"></TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {filteredOpportunities.map((opp) => (
                  <TableRow key={opp.id} className="cursor-pointer table-row-hover">
                    <TableCell>
                      <p className="font-medium">{opp.name}</p>
                    </TableCell>
                    <TableCell>
                      <p className="text-muted-foreground">{opp.leadName}</p>
                    </TableCell>
                    <TableCell>
                      <OpportunityStageBadge stage={opp.stage} />
                    </TableCell>
                    <TableCell>
                      <span className="font-semibold">{formatCurrency(opp.value)}</span>
                    </TableCell>
                    <TableCell>
                      <div className="flex items-center gap-2">
                        <Progress value={opp.probability} className="w-16 h-1.5" />
                        <span className="text-sm text-muted-foreground">{opp.probability}%</span>
                      </div>
                    </TableCell>
                    <TableCell>{opp.owner}</TableCell>
                    <TableCell>
                      {new Date(opp.expectedCloseDate).toLocaleDateString()}
                    </TableCell>
                    <TableCell>
                      <DropdownMenu>
                        <DropdownMenuTrigger asChild>
                          <Button variant="ghost" size="icon-sm">
                            <MoreHorizontal className="h-4 w-4" />
                          </Button>
                        </DropdownMenuTrigger>
                        <DropdownMenuContent align="end" className="bg-popover">
                          <DropdownMenuItem className="cursor-pointer" onClick={() => setViewingOpp(opp)}>
                            <Eye className="h-4 w-4 mr-2" /> View Details
                          </DropdownMenuItem>
                          <DropdownMenuItem className="cursor-pointer" onClick={() => handleEditOpp(opp)}>
                            <Edit className="h-4 w-4 mr-2" /> Edit
                          </DropdownMenuItem>
                          <DropdownMenuSeparator />
                          <DropdownMenuItem className="cursor-pointer text-destructive focus:text-destructive" onClick={() => setDeletingOpp(opp)}>
                            <Trash2 className="h-4 w-4 mr-2" /> Delete
                          </DropdownMenuItem>
                        </DropdownMenuContent>
                      </DropdownMenu>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </div>
        )}
      </div>

      {/* Dialogs */}
      <OpportunityFormDialog
        open={formDialogOpen}
        onOpenChange={setFormDialogOpen}
        opportunity={editingOpp}
        mode={editingOpp ? 'edit' : 'create'}
      />
      <ViewDetailDialog
        open={!!viewingOpp}
        onOpenChange={() => setViewingOpp(null)}
        title={viewingOpp?.name || 'Opportunity Details'}
        data={viewingOpp ? {
          Lead: viewingOpp.leadName,
          Stage: viewingOpp.stage,
          Value: formatCurrency(viewingOpp.value),
          Probability: `${viewingOpp.probability}%`,
          Owner: viewingOpp.owner,
          'Expected Close': new Date(viewingOpp.expectedCloseDate).toLocaleDateString(),
          Products: viewingOpp.products.join(', '),
          Notes: viewingOpp.notes,
        } : {}}
      />
      <ConfirmDialog
        open={!!deletingOpp}
        onOpenChange={() => setDeletingOpp(null)}
        title="Delete Opportunity"
        description={`Are you sure you want to delete "${deletingOpp?.name}"? This action cannot be undone.`}
        onConfirm={handleDeleteOpp}
        variant="destructive"
      />
    </DashboardLayout>
  );
}

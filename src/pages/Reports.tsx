import { DashboardLayout } from '@/components/layout/DashboardLayout';
import { RevenueChart } from '@/components/dashboard/RevenueChart';
import { PipelineChart } from '@/components/dashboard/PipelineChart';
import { LeadSourcesChart } from '@/components/dashboard/LeadSourcesChart';
import { TeamPerformance } from '@/components/dashboard/TeamPerformance';
import { Button } from '@/components/ui/button';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Download, Calendar } from 'lucide-react';

export default function Reports() {
  return (
    <DashboardLayout>
      <div className="space-y-6">
        <div className="flex items-center justify-between">
          <div>
            <h2 className="text-2xl font-bold text-foreground">Reports & Analytics</h2>
            <p className="text-muted-foreground">Analyze your sales performance</p>
          </div>
          <div className="flex items-center gap-3">
            <Select defaultValue="30">
              <SelectTrigger className="w-[160px]">
                <Calendar className="h-4 w-4 mr-2" />
                <SelectValue />
              </SelectTrigger>
              <SelectContent className="bg-popover">
                <SelectItem value="7">Last 7 days</SelectItem>
                <SelectItem value="30">Last 30 days</SelectItem>
                <SelectItem value="90">Last 90 days</SelectItem>
              </SelectContent>
            </Select>
            <Button variant="outline"><Download className="h-4 w-4 mr-1.5" /> Export</Button>
          </div>
        </div>
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          <RevenueChart />
          <PipelineChart />
          <LeadSourcesChart />
          <TeamPerformance />
        </div>
      </div>
    </DashboardLayout>
  );
}

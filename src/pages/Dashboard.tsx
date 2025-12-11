import { DashboardLayout } from '@/components/layout/DashboardLayout';
import { MetricCard } from '@/components/dashboard/MetricCard';
import { PipelineChart } from '@/components/dashboard/PipelineChart';
import { RevenueChart } from '@/components/dashboard/RevenueChart';
import { LeadSourcesChart } from '@/components/dashboard/LeadSourcesChart';
import { RecentActivities } from '@/components/dashboard/RecentActivities';
import { TasksWidget } from '@/components/dashboard/TasksWidget';
import { TeamPerformance } from '@/components/dashboard/TeamPerformance';
import { dashboardMetrics } from '@/data/mockData';
import { Users, Target, DollarSign, CheckSquare, TrendingUp, Activity } from 'lucide-react';

export default function Dashboard() {
  const formatCurrency = (value: number) => {
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD',
      notation: 'compact',
      maximumFractionDigits: 1,
    }).format(value);
  };

  return (
    <DashboardLayout>
      <div className="space-y-6">
        {/* Welcome section */}
        <div className="flex items-center justify-between">
          <div>
            <h2 className="text-2xl font-bold text-foreground">Good morning! 👋</h2>
            <p className="text-muted-foreground">Here's what's happening with your sales today.</p>
          </div>
        </div>

        {/* Metrics grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-6 gap-4">
          <MetricCard
            title="Total Leads"
            value={dashboardMetrics.totalLeads}
            change={12.5}
            changeLabel="vs last month"
            icon={<Users className="h-6 w-6" />}
            iconColor="bg-blue-100 text-blue-600"
          />
          <MetricCard
            title="New This Month"
            value={dashboardMetrics.newLeadsThisMonth}
            change={8.2}
            changeLabel="vs last month"
            icon={<TrendingUp className="h-6 w-6" />}
            iconColor="bg-emerald-100 text-emerald-600"
          />
          <MetricCard
            title="Active Opportunities"
            value={dashboardMetrics.activeOpportunities}
            change={-2.4}
            changeLabel="vs last month"
            icon={<Target className="h-6 w-6" />}
            iconColor="bg-amber-100 text-amber-600"
          />
          <MetricCard
            title="Total Revenue"
            value={formatCurrency(dashboardMetrics.totalRevenue)}
            change={15.3}
            changeLabel="vs last month"
            icon={<DollarSign className="h-6 w-6" />}
            iconColor="bg-green-100 text-green-600"
          />
          <MetricCard
            title="Conversion Rate"
            value={`${dashboardMetrics.conversionRate}%`}
            change={3.1}
            changeLabel="vs last month"
            icon={<Activity className="h-6 w-6" />}
            iconColor="bg-purple-100 text-purple-600"
          />
          <MetricCard
            title="Tasks Pending"
            value={dashboardMetrics.tasksPending}
            icon={<CheckSquare className="h-6 w-6" />}
            iconColor="bg-rose-100 text-rose-600"
          />
        </div>

        {/* Charts row */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          <RevenueChart />
          <PipelineChart />
        </div>

        {/* Second row */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          <LeadSourcesChart />
          <div className="lg:col-span-2">
            <RecentActivities />
          </div>
        </div>

        {/* Third row */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          <TasksWidget />
          <TeamPerformance />
        </div>
      </div>
    </DashboardLayout>
  );
}

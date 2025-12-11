import { AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';
import { monthlyPerformanceData } from '@/data/mockData';

export function RevenueChart() {
  const formatCurrency = (value: number) => {
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD',
      notation: 'compact',
      maximumFractionDigits: 1,
    }).format(value);
  };

  return (
    <div className="bg-card rounded-xl border border-border p-6">
      <div className="mb-6">
        <h3 className="text-lg font-semibold text-foreground">Revenue Trend</h3>
        <p className="text-sm text-muted-foreground">Monthly revenue performance</p>
      </div>
      <div className="h-[300px]">
        <ResponsiveContainer width="100%" height="100%">
          <AreaChart data={monthlyPerformanceData} margin={{ top: 0, right: 0, left: 0, bottom: 0 }}>
            <defs>
              <linearGradient id="revenueGradient" x1="0" y1="0" x2="0" y2="1">
                <stop offset="0%" stopColor="hsl(221, 83%, 53%)" stopOpacity={0.3} />
                <stop offset="100%" stopColor="hsl(221, 83%, 53%)" stopOpacity={0} />
              </linearGradient>
            </defs>
            <CartesianGrid strokeDasharray="3 3" stroke="hsl(var(--border))" vertical={false} />
            <XAxis 
              dataKey="month" 
              axisLine={false} 
              tickLine={false}
              tick={{ fill: 'hsl(var(--muted-foreground))', fontSize: 12 }}
            />
            <YAxis 
              axisLine={false} 
              tickLine={false}
              tick={{ fill: 'hsl(var(--muted-foreground))', fontSize: 12 }}
              tickFormatter={formatCurrency}
              width={60}
            />
            <Tooltip
              contentStyle={{
                backgroundColor: 'hsl(var(--card))',
                border: '1px solid hsl(var(--border))',
                borderRadius: '8px',
                boxShadow: '0 4px 6px -1px rgb(0 0 0 / 0.1)',
              }}
              formatter={(value: number) => [formatCurrency(value), 'Revenue']}
            />
            <Area
              type="monotone"
              dataKey="revenue"
              stroke="hsl(221, 83%, 53%)"
              strokeWidth={2}
              fill="url(#revenueGradient)"
            />
          </AreaChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
}

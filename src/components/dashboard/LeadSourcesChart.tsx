import { PieChart, Pie, Cell, ResponsiveContainer, Tooltip, Legend } from 'recharts';
import { leadSourcesData } from '@/data/mockData';

const COLORS = [
  'hsl(221, 83%, 53%)',
  'hsl(173, 80%, 40%)',
  'hsl(38, 92%, 50%)',
  'hsl(262, 83%, 58%)',
  'hsl(142, 76%, 36%)',
];

export function LeadSourcesChart() {
  return (
    <div className="bg-card rounded-xl border border-border p-6">
      <div className="mb-6">
        <h3 className="text-lg font-semibold text-foreground">Lead Sources</h3>
        <p className="text-sm text-muted-foreground">Distribution by acquisition channel</p>
      </div>
      <div className="h-[300px]">
        <ResponsiveContainer width="100%" height="100%">
          <PieChart>
            <Pie
              data={leadSourcesData}
              cx="50%"
              cy="50%"
              innerRadius={60}
              outerRadius={90}
              paddingAngle={4}
              dataKey="count"
              nameKey="source"
            >
              {leadSourcesData.map((entry, index) => (
                <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
              ))}
            </Pie>
            <Tooltip
              contentStyle={{
                backgroundColor: 'hsl(var(--card))',
                border: '1px solid hsl(var(--border))',
                borderRadius: '8px',
                boxShadow: '0 4px 6px -1px rgb(0 0 0 / 0.1)',
              }}
              formatter={(value: number, name: string) => [`${value} leads`, name]}
            />
            <Legend
              verticalAlign="bottom"
              height={36}
              formatter={(value) => (
                <span className="text-sm text-muted-foreground">{value}</span>
              )}
            />
          </PieChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
}

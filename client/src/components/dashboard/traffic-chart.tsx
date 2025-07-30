import { useQuery } from "@tanstack/react-query";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Skeleton } from "@/components/ui/skeleton";
import { PieChart, Pie, Cell, ResponsiveContainer, Tooltip } from "recharts";
import { useTheme } from "@/components/ui/theme-provider";
import type { TrafficSource } from "@shared/schema";

export default function TrafficChart() {
  const { theme } = useTheme();
  const { data: trafficSources, isLoading } = useQuery<TrafficSource[]>({
    queryKey: ["/api/traffic-sources"],
  });

  if (isLoading) {
    return (
      <Card className="bg-white dark:bg-gray-800">
        <CardHeader>
          <Skeleton className="h-6 w-32" />
        </CardHeader>
        <CardContent>
          <Skeleton className="h-64 w-full mb-4" />
          <div className="space-y-3">
            {Array.from({ length: 4 }).map((_, i) => (
              <div key={i} className="flex items-center justify-between">
                <div className="flex items-center space-x-2">
                  <Skeleton className="w-3 h-3 rounded-full" />
                  <Skeleton className="h-4 w-24" />
                </div>
                <Skeleton className="h-4 w-12" />
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    );
  }

  if (!trafficSources) return null;

  const chartData = trafficSources.map(source => ({
    name: source.source,
    value: Number(source.percentage),
    color: source.color,
  }));

  const isDark = theme === "dark";

  return (
    <Card className="bg-white dark:bg-gray-800 transition-colors duration-300" data-testid="traffic-chart">
      <CardHeader>
        <CardTitle className="text-lg font-semibold text-gray-900 dark:text-white">Traffic Sources</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="h-64 mb-4">
          <ResponsiveContainer width="100%" height="100%">
            <PieChart>
              <Pie
                data={chartData}
                cx="50%"
                cy="50%"
                innerRadius={60}
                outerRadius={100}
                paddingAngle={2}
                dataKey="value"
              >
                {chartData.map((entry, index) => (
                  <Cell key={`cell-${index}`} fill={entry.color} />
                ))}
              </Pie>
              <Tooltip 
                contentStyle={{
                  backgroundColor: isDark ? "#1f2937" : "#ffffff",
                  border: `1px solid ${isDark ? "#374151" : "#e5e7eb"}`,
                  borderRadius: "8px",
                  color: isDark ? "#d1d5db" : "#6b7280",
                }}
                formatter={(value: number) => [`${value}%`, "Traffic"]}
              />
            </PieChart>
          </ResponsiveContainer>
        </div>
        <div className="space-y-3">
          {trafficSources.map((source) => (
            <div key={source.id} className="flex items-center justify-between" data-testid={`traffic-source-${source.source.toLowerCase().replace(/\s+/g, '-')}`}>
              <div className="flex items-center space-x-2">
                <div 
                  className="w-3 h-3 rounded-full" 
                  style={{ backgroundColor: source.color }}
                />
                <span className="text-sm text-gray-700 dark:text-gray-300">{source.source}</span>
              </div>
              <span className="text-sm font-medium text-gray-900 dark:text-white">{source.percentage}%</span>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  );
}

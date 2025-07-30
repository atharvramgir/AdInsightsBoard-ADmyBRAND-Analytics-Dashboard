import { useQuery } from "@tanstack/react-query";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Skeleton } from "@/components/ui/skeleton";
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Cell } from "recharts";
import { useTheme } from "@/components/ui/theme-provider";
import type { Campaign } from "@shared/schema";

const COLORS = ["#3b82f6", "#10b981", "#8b5cf6", "#f59e0b", "#ef4444"];

export default function CampaignChart() {
  const { theme } = useTheme();
  const { data: campaigns, isLoading } = useQuery<Campaign[]>({
    queryKey: ["/api/campaigns"],
  });

  if (isLoading) {
    return (
      <Card className="bg-white dark:bg-gray-800 mb-8">
        <CardHeader>
          <div className="flex items-center justify-between">
            <Skeleton className="h-6 w-40" />
            <div className="flex items-center space-x-2">
              <Skeleton className="h-6 w-20" />
              <Skeleton className="h-6 w-20" />
            </div>
          </div>
        </CardHeader>
        <CardContent>
          <Skeleton className="h-64 w-full" />
        </CardContent>
      </Card>
    );
  }

  if (!campaigns) return null;

  const chartData = campaigns.slice(0, 5).map((campaign, index) => ({
    name: campaign.name.length > 15 ? campaign.name.substring(0, 15) + "..." : campaign.name,
    conversions: Math.floor(campaign.clicks * 0.1), // Simple conversion estimate
    color: COLORS[index % COLORS.length],
  }));

  const isDark = theme === "dark";

  return (
    <Card className="bg-white dark:bg-gray-800 mb-8 transition-colors duration-300" data-testid="campaign-chart">
      <CardHeader>
        <div className="flex items-center justify-between">
          <CardTitle className="text-lg font-semibold text-gray-900 dark:text-white">Campaign Performance</CardTitle>
          <div className="flex items-center space-x-2">
            <Button size="sm" className="bg-blue-100 dark:bg-blue-900/20 text-blue-700 dark:text-blue-300 hover:bg-blue-200 dark:hover:bg-blue-900/30">
              This Month
            </Button>
            <Button variant="ghost" size="sm" className="text-gray-500 dark:text-gray-400">
              Last Month
            </Button>
          </div>
        </div>
      </CardHeader>
      <CardContent>
        <div className="h-64">
          <ResponsiveContainer width="100%" height="100%">
            <BarChart data={chartData} margin={{ top: 20, right: 30, left: 20, bottom: 5 }}>
              <CartesianGrid 
                strokeDasharray="3 3" 
                stroke={isDark ? "#374151" : "#e5e7eb"}
                strokeOpacity={0.5}
              />
              <XAxis 
                dataKey="name" 
                stroke={isDark ? "#d1d5db" : "#6b7280"}
                fontSize={12}
                tickLine={false}
                axisLine={false}
              />
              <YAxis 
                stroke={isDark ? "#d1d5db" : "#6b7280"}
                fontSize={12}
                tickLine={false}
                axisLine={false}
              />
              <Tooltip 
                contentStyle={{
                  backgroundColor: isDark ? "#1f2937" : "#ffffff",
                  border: `1px solid ${isDark ? "#374151" : "#e5e7eb"}`,
                  borderRadius: "8px",
                  color: isDark ? "#d1d5db" : "#6b7280",
                }}
                formatter={(value: number) => [`${value.toLocaleString()}`, "Conversions"]}
              />
              <Bar 
                dataKey="conversions" 
                radius={[6, 6, 0, 0]}
              >
                {chartData.map((entry, index) => (
                  <Cell key={`cell-${index}`} fill={entry.color} />
                ))}
              </Bar>
            </BarChart>
          </ResponsiveContainer>
        </div>
      </CardContent>
    </Card>
  );
}

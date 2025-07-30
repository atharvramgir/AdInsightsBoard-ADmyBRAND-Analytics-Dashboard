import { useQuery } from "@tanstack/react-query";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Skeleton } from "@/components/ui/skeleton";
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from "recharts";
import { useTheme } from "@/components/ui/theme-provider";
import type { RevenueData } from "@shared/schema";

export default function RevenueChart() {
  const { theme } = useTheme();
  const { data: revenueData, isLoading } = useQuery<RevenueData[]>({
    queryKey: ["/api/revenue-data"],
  });

  if (isLoading) {
    return (
      <Card className="bg-white dark:bg-gray-800">
        <CardHeader>
          <div className="flex items-center justify-between">
            <Skeleton className="h-6 w-32" />
            <div className="flex space-x-4">
              <Skeleton className="h-6 w-16" />
              <Skeleton className="h-6 w-16" />
              <Skeleton className="h-6 w-20" />
            </div>
          </div>
        </CardHeader>
        <CardContent>
          <Skeleton className="h-80 w-full" />
        </CardContent>
      </Card>
    );
  }

  if (!revenueData) return null;

  const chartData = revenueData.map(item => ({
    month: item.month,
    revenue: Number(item.revenue),
  }));

  const isDark = theme === "dark";

  return (
    <Card className="bg-white dark:bg-gray-800 transition-colors duration-300" data-testid="revenue-chart">
      <CardHeader>
        <div className="flex items-center justify-between">
          <CardTitle className="text-lg font-semibold text-gray-900 dark:text-white">Revenue Trends</CardTitle>
          <div className="flex items-center space-x-4">
            <Button variant="ghost" size="sm" className="text-blue-600 dark:text-blue-400 font-medium">
              Revenue
            </Button>
            <Button variant="ghost" size="sm" className="text-gray-500 dark:text-gray-400">
              Users
            </Button>
            <Button variant="ghost" size="sm" className="text-gray-500 dark:text-gray-400">
              Conversions
            </Button>
          </div>
        </div>
      </CardHeader>
      <CardContent>
        <div className="h-80">
          <ResponsiveContainer width="100%" height="100%">
            <LineChart data={chartData}>
              <CartesianGrid 
                strokeDasharray="3 3" 
                stroke={isDark ? "#374151" : "#e5e7eb"}
                strokeOpacity={0.5}
              />
              <XAxis 
                dataKey="month" 
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
                tickFormatter={(value) => `$${(value / 1000).toFixed(0)}k`}
              />
              <Tooltip 
                contentStyle={{
                  backgroundColor: isDark ? "#1f2937" : "#ffffff",
                  border: `1px solid ${isDark ? "#374151" : "#e5e7eb"}`,
                  borderRadius: "8px",
                  color: isDark ? "#d1d5db" : "#6b7280",
                }}
                formatter={(value: number) => [`$${value.toLocaleString()}`, "Revenue"]}
              />
              <Line 
                type="monotone" 
                dataKey="revenue" 
                stroke="#3b82f6" 
                strokeWidth={3}
                dot={{ fill: "#3b82f6", strokeWidth: 2, stroke: "#ffffff", r: 6 }}
                activeDot={{ r: 8, stroke: "#3b82f6", strokeWidth: 2, fill: "#3b82f6" }}
              />
            </LineChart>
          </ResponsiveContainer>
        </div>
      </CardContent>
    </Card>
  );
}

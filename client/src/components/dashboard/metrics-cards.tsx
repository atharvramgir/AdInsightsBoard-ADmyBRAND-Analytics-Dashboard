import { useQuery } from "@tanstack/react-query";
import { Card, CardContent } from "@/components/ui/card";
import { Skeleton } from "@/components/ui/skeleton";
import { DollarSign, Users, TrendingUp, Percent, ArrowUp } from "lucide-react";
import type { Metrics } from "@shared/schema";

const metricIcons = {
  revenue: { icon: DollarSign, color: "emerald" },
  users: { icon: Users, color: "blue" },
  conversions: { icon: TrendingUp, color: "violet" },
  growth: { icon: Percent, color: "amber" },
};

export default function MetricsCards() {
  const { data: metrics, isLoading } = useQuery<Metrics>({
    queryKey: ["/api/metrics"],
  });

  if (isLoading) {
    return (
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
        {Array.from({ length: 4 }).map((_, i) => (
          <Card key={i} className="animate-pulse">
            <CardContent className="p-6">
              <div className="flex items-center justify-between mb-4">
                <Skeleton className="h-8 w-8 rounded-lg" />
                <Skeleton className="h-5 w-16" />
              </div>
              <Skeleton className="h-8 w-24 mb-1" />
              <Skeleton className="h-4 w-20" />
            </CardContent>
          </Card>
        ))}
      </div>
    );
  }

  if (!metrics) return null;

  const metricsData = [
    {
      key: "revenue",
      title: "Total Revenue",
      value: `$${Number(metrics.revenue).toLocaleString()}`,
      growth: `+${metrics.revenueGrowth}%`,
      ...metricIcons.revenue,
    },
    {
      key: "users",
      title: "Active Users", 
      value: metrics.users.toLocaleString(),
      growth: `+${metrics.userGrowth}%`,
      ...metricIcons.users,
    },
    {
      key: "conversions",
      title: "Conversions",
      value: metrics.conversions.toLocaleString(),
      growth: `+${metrics.conversionGrowth}%`,
      ...metricIcons.conversions,
    },
    {
      key: "growth",
      title: "Growth Rate",
      value: `${metrics.growthRate}%`,
      growth: `+3.1%`,
      ...metricIcons.growth,
    },
  ];

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
      {metricsData.map((metric, index) => {
        const Icon = metric.icon;
        return (
          <Card 
            key={metric.key} 
            className="transition-all duration-300 hover:shadow-md animate-fade-in bg-white dark:bg-gray-800"
            style={{ animationDelay: `${index * 0.1}s` }}
            data-testid={`metric-card-${metric.key}`}
          >
            <CardContent className="p-6">
              <div className="flex items-center justify-between mb-4">
                <div className={`p-2 bg-${metric.color}-100 dark:bg-${metric.color}-900/20 rounded-lg`}>
                  <Icon className={`text-${metric.color}-600 dark:text-${metric.color}-400`} size={20} />
                </div>
                <div className={`flex items-center space-x-1 text-${metric.color}-600 dark:text-${metric.color}-400 text-sm font-medium`}>
                  <ArrowUp size={12} />
                  <span>{metric.growth}</span>
                </div>
              </div>
              <h3 className="text-2xl font-bold text-gray-900 dark:text-white mb-1" data-testid={`metric-value-${metric.key}`}>
                {metric.value}
              </h3>
              <p className="text-gray-600 dark:text-gray-400 text-sm">{metric.title}</p>
            </CardContent>
          </Card>
        );
      })}
    </div>
  );
}

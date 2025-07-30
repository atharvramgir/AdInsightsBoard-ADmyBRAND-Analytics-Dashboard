import { Skeleton } from "@/components/ui/skeleton";

interface LoadingSkeletonProps {
  variant: "metric-card" | "chart" | "table" | "donut-chart";
  count?: number;
}

export function LoadingSkeleton({ variant, count = 1 }: LoadingSkeletonProps) {
  const renderSkeleton = () => {
    switch (variant) {
      case "metric-card":
        return (
          <div className="p-6 space-y-4">
            <div className="flex items-center justify-between">
              <Skeleton className="h-8 w-8 rounded-lg" />
              <Skeleton className="h-4 w-12" />
            </div>
            <Skeleton className="h-8 w-24" />
            <Skeleton className="h-4 w-20" />
          </div>
        );
      
      case "chart":
        return (
          <div className="p-6 space-y-4">
            <div className="flex items-center justify-between">
              <Skeleton className="h-6 w-32" />
              <div className="flex space-x-2">
                <Skeleton className="h-6 w-16" />
                <Skeleton className="h-6 w-16" />
              </div>
            </div>
            <Skeleton className="h-80 w-full" />
          </div>
        );
      
      case "donut-chart":
        return (
          <div className="p-6 space-y-4">
            <Skeleton className="h-6 w-32" />
            <div className="flex justify-center">
              <Skeleton className="h-64 w-64 rounded-full" />
            </div>
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
          </div>
        );
      
      case "table":
        return (
          <div className="p-6 space-y-4">
            <div className="flex items-center justify-between">
              <Skeleton className="h-6 w-40" />
              <div className="flex space-x-4">
                <Skeleton className="h-10 w-64" />
                <Skeleton className="h-10 w-32" />
              </div>
            </div>
            <div className="space-y-3">
              {Array.from({ length: 4 }).map((_, i) => (
                <Skeleton key={i} className="h-16 w-full" />
              ))}
            </div>
          </div>
        );
    }
  };

  return (
    <>
      {Array.from({ length: count }).map((_, index) => (
        <div key={index} className="bg-white dark:bg-gray-800 rounded-lg border border-gray-200 dark:border-gray-700 animate-pulse">
          {renderSkeleton()}
        </div>
      ))}
    </>
  );
}
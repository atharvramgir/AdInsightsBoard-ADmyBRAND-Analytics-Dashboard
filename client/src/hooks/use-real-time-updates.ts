import { useEffect, useRef } from "react";
import { useQueryClient } from "@tanstack/react-query";

export function useRealTimeUpdates(enabled: boolean = true) {
  const queryClient = useQueryClient();
  const intervalRef = useRef<NodeJS.Timeout>();

  useEffect(() => {
    if (!enabled) return;

    // Simulate real-time updates every 30 seconds
    intervalRef.current = setInterval(() => {
      // Invalidate and refetch all dashboard data
      queryClient.invalidateQueries({ queryKey: ["/api/metrics"] });
      queryClient.invalidateQueries({ queryKey: ["/api/campaigns"] });
      queryClient.invalidateQueries({ queryKey: ["/api/revenue-data"] });
      queryClient.invalidateQueries({ queryKey: ["/api/traffic-sources"] });
    }, 30000);

    return () => {
      if (intervalRef.current) {
        clearInterval(intervalRef.current);
      }
    };
  }, [enabled, queryClient]);

  const forceUpdate = () => {
    queryClient.invalidateQueries({ queryKey: ["/api/metrics"] });
    queryClient.invalidateQueries({ queryKey: ["/api/campaigns"] });
    queryClient.invalidateQueries({ queryKey: ["/api/revenue-data"] });
    queryClient.invalidateQueries({ queryKey: ["/api/traffic-sources"] });
  };

  return { forceUpdate };
}
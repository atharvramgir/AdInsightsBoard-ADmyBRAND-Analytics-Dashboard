import { useEffect } from "react";
import Sidebar from "@/components/layout/sidebar";
import Header from "@/components/layout/header";
import MetricsCards from "@/components/dashboard/metrics-cards";
import RevenueChart from "@/components/dashboard/revenue-chart";
import TrafficChart from "@/components/dashboard/traffic-chart";
import CampaignChart from "@/components/dashboard/campaign-chart";
import CampaignsTable from "@/components/dashboard/campaigns-table";

export default function Dashboard() {
  useEffect(() => {
    document.title = "ADmyBRAND Insights - Analytics Dashboard";
  }, []);

  return (
    <div className="min-h-screen flex bg-gray-50 dark:bg-gray-900 transition-colors duration-300">
      <Sidebar />
      <main className="flex-1 overflow-hidden">
        <Header />
        <div className="p-6 overflow-y-auto h-full">
          <MetricsCards />
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-8">
            <div className="lg:col-span-2">
              <RevenueChart />
            </div>
            <div>
              <TrafficChart />
            </div>
          </div>
          <CampaignChart />
          <CampaignsTable />
        </div>
      </main>
    </div>
  );
}

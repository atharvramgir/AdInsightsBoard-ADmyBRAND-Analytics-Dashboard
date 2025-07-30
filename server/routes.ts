import type { Express } from "express";
import { createServer, type Server } from "http";
import { storage } from "./storage";

export async function registerRoutes(app: Express): Promise<Server> {
  // Get dashboard metrics
  app.get("/api/metrics", async (req, res) => {
    try {
      const metrics = await storage.getMetrics();
      res.json(metrics);
    } catch (error) {
      res.status(500).json({ message: "Failed to fetch metrics" });
    }
  });

  // Get campaigns
  app.get("/api/campaigns", async (req, res) => {
    try {
      const campaigns = await storage.getCampaigns();
      res.json(campaigns);
    } catch (error) {
      res.status(500).json({ message: "Failed to fetch campaigns" });
    }
  });

  // Get revenue data for chart
  app.get("/api/revenue-data", async (req, res) => {
    try {
      const revenueData = await storage.getRevenueData();
      res.json(revenueData);
    } catch (error) {
      res.status(500).json({ message: "Failed to fetch revenue data" });
    }
  });

  // Get traffic sources for donut chart
  app.get("/api/traffic-sources", async (req, res) => {
    try {
      const trafficSources = await storage.getTrafficSources();
      res.json(trafficSources);
    } catch (error) {
      res.status(500).json({ message: "Failed to fetch traffic sources" });
    }
  });

  // Export data endpoint
  app.get("/api/export", async (req, res) => {
    try {
      const format = req.query.format as string || 'json';
      const campaigns = await storage.getCampaigns();
      const metrics = await storage.getMetrics();
      
      const exportData = {
        metrics,
        campaigns,
        exportedAt: new Date().toISOString()
      };

      if (format === 'csv') {
        // Simple CSV export for campaigns
        const csvHeaders = 'Campaign Name,Category,Status,Impressions,Clicks,CTR,Spend\n';
        const csvData = campaigns.map(c => 
          `"${c.name}","${c.category}","${c.status}",${c.impressions},${c.clicks},${c.ctr},${c.spend}`
        ).join('\n');
        
        res.setHeader('Content-Type', 'text/csv');
        res.setHeader('Content-Disposition', 'attachment; filename=dashboard-export.csv');
        res.send(csvHeaders + csvData);
      } else {
        res.setHeader('Content-Type', 'application/json');
        res.setHeader('Content-Disposition', 'attachment; filename=dashboard-export.json');
        res.json(exportData);
      }
    } catch (error) {
      res.status(500).json({ message: "Failed to export data" });
    }
  });

  const httpServer = createServer(app);
  return httpServer;
}

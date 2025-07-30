import { type User, type InsertUser, type Metrics, type InsertMetrics, type Campaign, type InsertCampaign, type RevenueData, type InsertRevenueData, type TrafficSource, type InsertTrafficSource } from "@shared/schema";
import { randomUUID } from "crypto";

export interface IStorage {
  getUser(id: string): Promise<User | undefined>;
  getUserByUsername(username: string): Promise<User | undefined>;
  createUser(user: InsertUser): Promise<User>;
  
  getMetrics(): Promise<Metrics | undefined>;
  createMetrics(metrics: InsertMetrics): Promise<Metrics>;
  
  getCampaigns(): Promise<Campaign[]>;
  createCampaign(campaign: InsertCampaign): Promise<Campaign>;
  
  getRevenueData(): Promise<RevenueData[]>;
  createRevenueData(data: InsertRevenueData): Promise<RevenueData>;
  
  getTrafficSources(): Promise<TrafficSource[]>;
  createTrafficSource(source: InsertTrafficSource): Promise<TrafficSource>;
}

export class MemStorage implements IStorage {
  private users: Map<string, User>;
  private metrics: Metrics | undefined;
  private campaigns: Map<string, Campaign>;
  private revenueData: Map<string, RevenueData>;
  private trafficSources: Map<string, TrafficSource>;

  constructor() {
    this.users = new Map();
    this.campaigns = new Map();
    this.revenueData = new Map();
    this.trafficSources = new Map();
    
    // Initialize with sample data
    this.initializeSampleData();
  }

  private initializeSampleData() {
    // Initialize metrics
    this.metrics = {
      id: randomUUID(),
      revenue: "847326.00",
      users: 124582,
      conversions: 18247,
      growthRate: "23.8",
      revenueGrowth: "12.5",
      userGrowth: "8.2",
      conversionGrowth: "15.3",
      date: new Date(),
    };

    // Initialize campaigns
    const sampleCampaigns = [
      {
        name: "Summer Sale 2024",
        category: "Fashion & Lifestyle",
        status: "active",
        impressions: 2847392,
        clicks: 142847,
        ctr: "5.02",
        spend: "12847.00",
      },
      {
        name: "Holiday Promotion",
        category: "E-commerce",
        status: "paused",
        impressions: 1524186,
        clicks: 76294,
        ctr: "5.01",
        spend: "8492.00",
      },
      {
        name: "Brand Awareness Q2",
        category: "Technology",
        status: "active",
        impressions: 3924847,
        clicks: 196247,
        ctr: "5.00",
        spend: "18942.00",
      },
      {
        name: "Mobile App Install",
        category: "Mobile Apps",
        status: "completed",
        impressions: 892475,
        clicks: 44624,
        ctr: "5.00",
        spend: "5294.00",
      },
    ];

    sampleCampaigns.forEach(campaign => {
      const id = randomUUID();
      this.campaigns.set(id, {
        id,
        ...campaign,
        createdAt: new Date(),
      });
    });

    // Initialize revenue data
    const revenueDataSample = [
      { month: "Jan", revenue: "65000.00" },
      { month: "Feb", revenue: "72000.00" },
      { month: "Mar", revenue: "68000.00" },
      { month: "Apr", revenue: "74000.00" },
      { month: "May", revenue: "82000.00" },
      { month: "Jun", revenue: "78000.00" },
      { month: "Jul", revenue: "85000.00" },
    ];

    revenueDataSample.forEach(data => {
      const id = randomUUID();
      this.revenueData.set(id, { id, ...data });
    });

    // Initialize traffic sources
    const trafficSourcesData = [
      { source: "Organic Search", percentage: "45.2", color: "#3b82f6" },
      { source: "Social Media", percentage: "28.7", color: "#10b981" },
      { source: "Paid Ads", percentage: "16.8", color: "#8b5cf6" },
      { source: "Direct", percentage: "9.3", color: "#f59e0b" },
    ];

    trafficSourcesData.forEach(source => {
      const id = randomUUID();
      this.trafficSources.set(id, { id, ...source });
    });
  }

  async getUser(id: string): Promise<User | undefined> {
    return this.users.get(id);
  }

  async getUserByUsername(username: string): Promise<User | undefined> {
    return Array.from(this.users.values()).find(
      (user) => user.username === username,
    );
  }

  async createUser(insertUser: InsertUser): Promise<User> {
    const id = randomUUID();
    const user: User = { ...insertUser, id };
    this.users.set(id, user);
    return user;
  }

  async getMetrics(): Promise<Metrics | undefined> {
    return this.metrics;
  }

  async createMetrics(insertMetrics: InsertMetrics): Promise<Metrics> {
    const id = randomUUID();
    const metrics: Metrics = { ...insertMetrics, id, date: new Date() };
    this.metrics = metrics;
    return metrics;
  }

  async getCampaigns(): Promise<Campaign[]> {
    return Array.from(this.campaigns.values());
  }

  async createCampaign(insertCampaign: InsertCampaign): Promise<Campaign> {
    const id = randomUUID();
    const campaign: Campaign = { ...insertCampaign, id, createdAt: new Date() };
    this.campaigns.set(id, campaign);
    return campaign;
  }

  async getRevenueData(): Promise<RevenueData[]> {
    return Array.from(this.revenueData.values());
  }

  async createRevenueData(insertData: InsertRevenueData): Promise<RevenueData> {
    const id = randomUUID();
    const data: RevenueData = { ...insertData, id };
    this.revenueData.set(id, data);
    return data;
  }

  async getTrafficSources(): Promise<TrafficSource[]> {
    return Array.from(this.trafficSources.values());
  }

  async createTrafficSource(insertSource: InsertTrafficSource): Promise<TrafficSource> {
    const id = randomUUID();
    const source: TrafficSource = { ...insertSource, id };
    this.trafficSources.set(id, source);
    return source;
  }
}

export const storage = new MemStorage();

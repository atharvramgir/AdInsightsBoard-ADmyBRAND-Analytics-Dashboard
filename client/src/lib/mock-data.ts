// This file contains mock data for development and testing purposes
// In a real application, this would be replaced with actual API calls

export const mockMetrics = {
  revenue: 847326,
  users: 124582,
  conversions: 18247,
  growthRate: 23.8,
  revenueGrowth: 12.5,
  userGrowth: 8.2,
  conversionGrowth: 15.3,
};

export const mockRevenueData = [
  { month: "Jan", revenue: 65000 },
  { month: "Feb", revenue: 72000 },
  { month: "Mar", revenue: 68000 },
  { month: "Apr", revenue: 74000 },
  { month: "May", revenue: 82000 },
  { month: "Jun", revenue: 78000 },
  { month: "Jul", revenue: 85000 },
];

export const mockTrafficSources = [
  { source: "Organic Search", percentage: 45.2, color: "#3b82f6" },
  { source: "Social Media", percentage: 28.7, color: "#10b981" },
  { source: "Paid Ads", percentage: 16.8, color: "#8b5cf6" },
  { source: "Direct", percentage: 9.3, color: "#f59e0b" },
];

export const mockCampaigns = [
  {
    id: "1",
    name: "Summer Sale 2024",
    category: "Fashion & Lifestyle",
    status: "active",
    impressions: 2847392,
    clicks: 142847,
    ctr: 5.02,
    spend: 12847,
    createdAt: new Date(),
  },
  {
    id: "2", 
    name: "Holiday Promotion",
    category: "E-commerce",
    status: "paused",
    impressions: 1524186,
    clicks: 76294,
    ctr: 5.01,
    spend: 8492,
    createdAt: new Date(),
  },
  {
    id: "3",
    name: "Brand Awareness Q2",
    category: "Technology", 
    status: "active",
    impressions: 3924847,
    clicks: 196247,
    ctr: 5.00,
    spend: 18942,
    createdAt: new Date(),
  },
  {
    id: "4",
    name: "Mobile App Install",
    category: "Mobile Apps",
    status: "completed",
    impressions: 892475,
    clicks: 44624,
    ctr: 5.00,
    spend: 5294,
    createdAt: new Date(),
  },
];

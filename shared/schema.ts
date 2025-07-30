import { sql } from "drizzle-orm";
import { pgTable, text, varchar, integer, decimal, timestamp, boolean } from "drizzle-orm/pg-core";
import { createInsertSchema } from "drizzle-zod";
import { z } from "zod";

export const users = pgTable("users", {
  id: varchar("id").primaryKey().default(sql`gen_random_uuid()`),
  username: text("username").notNull().unique(),
  password: text("password").notNull(),
});

export const metrics = pgTable("metrics", {
  id: varchar("id").primaryKey().default(sql`gen_random_uuid()`),
  revenue: decimal("revenue", { precision: 12, scale: 2 }).notNull(),
  users: integer("users").notNull(),
  conversions: integer("conversions").notNull(),
  growthRate: decimal("growth_rate", { precision: 5, scale: 2 }).notNull(),
  revenueGrowth: decimal("revenue_growth", { precision: 5, scale: 2 }).notNull(),
  userGrowth: decimal("user_growth", { precision: 5, scale: 2 }).notNull(),
  conversionGrowth: decimal("conversion_growth", { precision: 5, scale: 2 }).notNull(),
  date: timestamp("date").notNull().defaultNow(),
});

export const campaigns = pgTable("campaigns", {
  id: varchar("id").primaryKey().default(sql`gen_random_uuid()`),
  name: text("name").notNull(),
  category: text("category").notNull(),
  status: text("status").notNull(), // active, paused, completed
  impressions: integer("impressions").notNull(),
  clicks: integer("clicks").notNull(),
  ctr: decimal("ctr", { precision: 5, scale: 2 }).notNull(),
  spend: decimal("spend", { precision: 10, scale: 2 }).notNull(),
  createdAt: timestamp("created_at").notNull().defaultNow(),
});

export const revenueData = pgTable("revenue_data", {
  id: varchar("id").primaryKey().default(sql`gen_random_uuid()`),
  month: text("month").notNull(),
  revenue: decimal("revenue", { precision: 10, scale: 2 }).notNull(),
});

export const trafficSources = pgTable("traffic_sources", {
  id: varchar("id").primaryKey().default(sql`gen_random_uuid()`),
  source: text("source").notNull(),
  percentage: decimal("percentage", { precision: 5, scale: 2 }).notNull(),
  color: text("color").notNull(),
});

export const insertUserSchema = createInsertSchema(users).pick({
  username: true,
  password: true,
});

export const insertMetricsSchema = createInsertSchema(metrics).omit({
  id: true,
  date: true,
});

export const insertCampaignSchema = createInsertSchema(campaigns).omit({
  id: true,
  createdAt: true,
});

export const insertRevenueDataSchema = createInsertSchema(revenueData).omit({
  id: true,
});

export const insertTrafficSourceSchema = createInsertSchema(trafficSources).omit({
  id: true,
});

export type InsertUser = z.infer<typeof insertUserSchema>;
export type User = typeof users.$inferSelect;
export type InsertMetrics = z.infer<typeof insertMetricsSchema>;
export type Metrics = typeof metrics.$inferSelect;
export type InsertCampaign = z.infer<typeof insertCampaignSchema>;
export type Campaign = typeof campaigns.$inferSelect;
export type InsertRevenueData = z.infer<typeof insertRevenueDataSchema>;
export type RevenueData = typeof revenueData.$inferSelect;
export type InsertTrafficSource = z.infer<typeof insertTrafficSourceSchema>;
export type TrafficSource = typeof trafficSources.$inferSelect;

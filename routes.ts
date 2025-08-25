import type { Express } from "express";
import { createServer, type Server } from "http";
import { storage } from "./storage";

export async function registerRoutes(app: Express): Promise<Server> {
  // GET /api/v2/stores
  app.get("/api/v2/stores", async (req, res) => {
    try {
      const stores = await storage.getStores();
      res.json(stores);
    } catch (error) {
      res.status(500).json({ message: "Failed to fetch stores" });
    }
  });

  // GET /api/v2/products
  app.get("/api/v2/products", async (req, res) => {
    try {
      const products = await storage.getProducts();
      res.json(products);
    } catch (error) {
      res.status(500).json({ message: "Failed to fetch products" });
    }
  });

  // GET /api/v2/kpi
  app.get("/api/v2/kpi", async (req, res) => {
    try {
      const { store_id, product_id } = req.query;
      const kpiData = await storage.getKpiData(
        store_id as string,
        product_id as string
      );
      res.json(kpiData);
    } catch (error) {
      res.status(500).json({ message: "Failed to fetch KPI data" });
    }
  });

  // GET /api/v2/sales-dynamics
  app.get("/api/v2/sales-dynamics", async (req, res) => {
    try {
      const { store_id, product_id, period_days } = req.query;
      const salesDynamics = await storage.getSalesDynamics(
        store_id as string,
        product_id as string,
        period_days ? parseInt(period_days as string) : undefined
      );
      res.json(salesDynamics);
    } catch (error) {
      res.status(500).json({ message: "Failed to fetch sales dynamics" });
    }
  });

  // GET /api/v2/top-products
  app.get("/api/v2/top-products", async (req, res) => {
    try {
      const { store_id, period_days } = req.query;
      const topProducts = await storage.getTopProducts(
        store_id as string,
        period_days ? parseInt(period_days as string) : undefined
      );
      res.json(topProducts);
    } catch (error) {
      res.status(500).json({ message: "Failed to fetch top products" });
    }
  });

  // GET /api/v2/store-comparison
  app.get("/api/v2/store-comparison", async (req, res) => {
    try {
      const { period_days } = req.query;
      const storeComparison = await storage.getStoreComparison(
        period_days ? parseInt(period_days as string) : undefined
      );
      res.json(storeComparison);
    } catch (error) {
      res.status(500).json({ message: "Failed to fetch store comparison" });
    }
  });

  const httpServer = createServer(app);
  return httpServer;
}

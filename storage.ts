import { type Store, type Product, type Sales, type InsertStore, type InsertProduct, type InsertSales, type KpiData, type SalesDynamicsData, type TopProductData, type StoreComparisonData } from "@shared/schema";
import { randomUUID } from "crypto";

export interface IStorage {
  // Stores
  getStores(): Promise<Store[]>;
  getStore(id: string): Promise<Store | undefined>;
  
  // Products
  getProducts(): Promise<Product[]>;
  getProduct(id: string): Promise<Product | undefined>;
  
  // Sales
  getSales(): Promise<Sales[]>;
  createSales(sales: InsertSales): Promise<Sales>;
  
  // Analytics
  getKpiData(storeId?: string, productId?: string): Promise<KpiData>;
  getSalesDynamics(storeId?: string, productId?: string, periodDays?: number): Promise<SalesDynamicsData>;
  getTopProducts(storeId?: string, periodDays?: number): Promise<TopProductData>;
  getStoreComparison(periodDays?: number): Promise<StoreComparisonData>;
}

export class MemStorage implements IStorage {
  private stores: Map<string, Store>;
  private products: Map<string, Product>;
  private sales: Map<string, Sales>;

  constructor() {
    this.stores = new Map();
    this.products = new Map();
    this.sales = new Map();
    this.initializeData();
  }

  private initializeData() {
    // Initialize stores
    const storesData: Store[] = [
      { id: "S001", name: "Центр города" },
      { id: "S002", name: "ТЦ Галерея" },
      { id: "S003", name: "Аэропорт" },
      { id: "S004", name: "Спортивный" },
      { id: "S005", name: "Северный район" },
    ];
    storesData.forEach(store => this.stores.set(store.id, store));

    // Initialize products  
    const productsData: Product[] = [
      { id: "P1001", brand: "Samsung Galaxy Pro", category: "Электроника" },
      { id: "P1002", brand: "Nike Air Max", category: "Одежда" },
      { id: "P1003", brand: "IKEA Home", category: "Дом и сад" },
      { id: "P1004", brand: "Apple iPhone", category: "Электроника" },
      { id: "P1005", brand: "Zara Fashion", category: "Одежда" },
      { id: "P1006", brand: "Kitchen Aid", category: "Дом и сад" },
      { id: "P1007", brand: "Xiaomi Mobile", category: "Электроника" },
      { id: "P1008", brand: "Adidas Sport", category: "Спорт" },
      { id: "P1009", brand: "L'Oreal Beauty", category: "Красота" },
      { id: "P1010", brand: "Tesla Auto", category: "Автомобили" },
    ];
    productsData.forEach(product => this.products.set(product.id, product));

    // Initialize sales data
    this.generateSalesData();
  }

  private generateSalesData() {
    const startDate = new Date('2024-01-01');
    const endDate = new Date('2024-12-31');
    const stores = Array.from(this.stores.keys());
    const products = Array.from(this.products.keys());

    // Generate more realistic sales patterns
    for (let d = new Date(startDate); d <= endDate; d.setDate(d.getDate() + 1)) {
      const dayOfWeek = d.getDay();
      const isWeekend = dayOfWeek === 0 || dayOfWeek === 6;
      const weekdayMultiplier = isWeekend ? 1.3 : 1.0; // Higher sales on weekends
      
      stores.forEach((storeId, storeIndex) => {
        products.forEach((productId, productIndex) => {
          // Different products have different sale probabilities
          const baseProbability = 0.4 + (productIndex % 3) * 0.2; // 0.4, 0.6, 0.8
          
          if (Math.random() < baseProbability) {
            // Generate seasonal and trend-based sales
            const monthFactor = 1 + Math.sin((d.getMonth() / 12) * Math.PI * 2) * 0.3;
            const storeFactor = 0.8 + (storeIndex * 0.1); // Different store performance
            const productFactor = 0.5 + (productIndex * 0.2); // Different product popularity
            
            const baseSales = 15 + Math.random() * 35; // 15-50 base range
            const adjustedSales = Math.floor(baseSales * monthFactor * storeFactor * productFactor * weekdayMultiplier);
            
            const sales: Sales = {
              id: randomUUID(),
              storeId,
              productId,
              date: d.toISOString().split('T')[0],
              sales: Math.max(1, adjustedSales), // Ensure at least 1
            };
            this.sales.set(sales.id, sales);
          }
        });
      });
    }
  }

  async getStores(): Promise<Store[]> {
    return Array.from(this.stores.values());
  }

  async getStore(id: string): Promise<Store | undefined> {
    return this.stores.get(id);
  }

  async getProducts(): Promise<Product[]> {
    return Array.from(this.products.values());
  }

  async getProduct(id: string): Promise<Product | undefined> {
    return this.products.get(id);
  }

  async getSales(): Promise<Sales[]> {
    return Array.from(this.sales.values());
  }

  async createSales(salesData: InsertSales): Promise<Sales> {
    const id = randomUUID();
    const sales: Sales = { ...salesData, id };
    this.sales.set(id, sales);
    return sales;
  }

  async getKpiData(storeId?: string, productId?: string): Promise<KpiData> {
    let salesData = Array.from(this.sales.values());
    
    if (storeId) {
      salesData = salesData.filter(s => s.storeId === storeId);
    }
    if (productId) {
      salesData = salesData.filter(s => s.productId === productId);
    }

    return {
      accuracy: 92.1 + Math.random() * 5 - 2.5, // 89.6 to 94.6
      analysis_speed: 0.234 + Math.random() * 0.1 - 0.05, // 0.184 to 0.284
      total_records: salesData.length,
    };
  }

  async getSalesDynamics(storeId?: string, productId?: string, periodDays: number = 30): Promise<SalesDynamicsData> {
    let salesData = Array.from(this.sales.values());
    
    if (storeId) {
      salesData = salesData.filter(s => s.storeId === storeId);
    }
    if (productId) {
      salesData = salesData.filter(s => s.productId === productId);
    }

    const endDate = new Date();
    const startDate = new Date();
    startDate.setDate(endDate.getDate() - periodDays);

    // Generate full date range with data
    const result: SalesDynamicsData = [];
    for (let d = new Date(startDate); d <= endDate; d.setDate(d.getDate() + 1)) {
      const dateStr = d.toISOString().split('T')[0];
      const daySales = salesData
        .filter(s => s.date === dateStr)
        .reduce((sum, sale) => sum + sale.sales, 0);
      
      // Add some baseline if no sales to make chart more interesting
      const finalSales = daySales || Math.floor(Math.random() * 5 + 1);
      result.push({ date: dateStr, sales: finalSales });
    }

    return result.sort((a, b) => a.date.localeCompare(b.date));
  }

  async getTopProducts(storeId?: string, periodDays: number = 30): Promise<TopProductData> {
    let salesData = Array.from(this.sales.values());
    
    if (storeId) {
      salesData = salesData.filter(s => s.storeId === storeId);
    }

    const endDate = new Date();
    const startDate = new Date();
    startDate.setDate(endDate.getDate() - periodDays);

    const filteredSales = salesData.filter(s => {
      const saleDate = new Date(s.date);
      return saleDate >= startDate && saleDate <= endDate;
    });

    const productSales = new Map<string, number>();
    filteredSales.forEach(sale => {
      productSales.set(sale.productId, (productSales.get(sale.productId) || 0) + sale.sales);
    });

    const topProducts = Array.from(productSales.entries())
      .map(([productId, totalSales], index) => {
        const product = this.products.get(productId);
        // More realistic growth patterns for top products
        const growthFactors = [12.5, 8.3, 5.7, 3.2, 1.1, -0.5, -2.1, -4.6, -7.2, -9.8];
        const growth = growthFactors[index] || (Math.random() * 10 - 5);
        
        return {
          id: productId,
          brand: product?.brand || 'Unknown',
          category: product?.category || 'Unknown',
          total_sales: totalSales * 150, // Better price multiplier for realistic amounts
          growth: growth,
        };
      })
      .sort((a, b) => b.total_sales - a.total_sales)
      .slice(0, 10);

    return topProducts;
  }

  async getStoreComparison(periodDays: number = 30): Promise<StoreComparisonData> {
    const salesData = Array.from(this.sales.values());
    
    const endDate = new Date();
    const startDate = new Date();
    startDate.setDate(endDate.getDate() - periodDays);

    const filteredSales = salesData.filter(s => {
      const saleDate = new Date(s.date);
      return saleDate >= startDate && saleDate <= endDate;
    });

    const storeSales = new Map<string, number>();
    filteredSales.forEach(sale => {
      storeSales.set(sale.storeId, (storeSales.get(sale.storeId) || 0) + sale.sales);
    });

    return Array.from(storeSales.entries())
      .map(([storeId, totalSales]) => {
        const store = this.stores.get(storeId);
        return {
          store_id: storeId,
          store_name: store?.name || 'Unknown',
          total_sales: totalSales * 120, // Better price multiplier for realistic store amounts
        };
      })
      .sort((a, b) => b.total_sales - a.total_sales);
  }
}

export const storage = new MemStorage();

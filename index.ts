import express from "express";
import cors from "cors";

const app = express();

// Разрешаем запросы с любого origin
app.use(cors());
app.use(express.json());

// API endpoints
app.get("/api/v2/stores", (req, res) => {
  res.json([
    { id: "1", name: "Центр города" },
    { id: "2", name: "ТЦ Галерея" },
    { id: "3", name: "Аэропорт" }
  ]);
});

app.get("/api/v2/kpi", (req, res) => {
  res.json({
    accuracy: 95.5,
    analysis_speed: 0.245,
    total_records: 125000
  });
});

app.get("/api/v2/products", (req, res) => {
  res.json([
    { id: "1", brand: "iPhone 15 Pro", category: "Electronics" },
    { id: "2", brand: "Samsung Galaxy S24", category: "Electronics" },
    { id: "3", brand: "MacBook Air M3", category: "Electronics" },
    { id: "4", brand: "Nike Air Max", category: "Clothing" },
    { id: "5", brand: "Adidas Ultraboost", category: "Clothing" },
    { id: "6", brand: "Sony WH-1000XM5", category: "Electronics" },
    { id: "7", brand: "Apple Watch Series 9", category: "Electronics" },
    { id: "8", brand: "Levi's 501 Jeans", category: "Clothing" },
    { id: "9", brand: "Canon EOS R6", category: "Electronics" },
    { id: "10", brand: "Zara Collection", category: "Clothing" },
    { id: "11", brand: "iPad Pro M4", category: "Electronics" },
    { id: "12", brand: "Samsung QLED TV", category: "Electronics" },
    { id: "13", brand: "Puma RS-X", category: "Clothing" },
    { id: "14", brand: "New Balance 990", category: "Clothing" },
    { id: "15", brand: "Bose QuietComfort", category: "Electronics" }
  ]);
});

app.get("/api/v2/sales-dynamics", (req, res) => {
  res.json([
    { date: "2024-01-01", sales: 1000 },
    { date: "2024-01-02", sales: 1200 },
    { date: "2024-01-03", sales: 1100 },
    { date: "2024-01-04", sales: 1350 },
    { date: "2024-01-05", sales: 1400 },
    { date: "2024-01-06", sales: 1250 },
    { date: "2024-01-07", sales: 1600 },
    { date: "2024-01-08", sales: 1550 },
    { date: "2024-01-09", sales: 1700 },
    { date: "2024-01-10", sales: 1800 },
    { date: "2024-01-11", sales: 1750 },
    { date: "2024-01-12", sales: 1900 },
    { date: "2024-01-13", sales: 1850 },
    { date: "2024-01-14", sales: 2000 },
    { date: "2024-01-15", sales: 2100 },
    { date: "2024-01-16", sales: 1950 },
    { date: "2024-01-17", sales: 2200 },
    { date: "2024-01-18", sales: 2300 },
    { date: "2024-01-19", sales: 2250 },
    { date: "2024-01-20", sales: 2400 },
    { date: "2024-01-21", sales: 2500 },
    { date: "2024-01-22", sales: 2450 },
    { date: "2024-01-23", sales: 2600 },
    { date: "2024-01-24", sales: 2700 },
    { date: "2024-01-25", sales: 2650 },
    { date: "2024-01-26", sales: 2800 },
    { date: "2024-01-27", sales: 2900 },
    { date: "2024-01-28", sales: 2850 },
    { date: "2024-01-29", sales: 3000 },
    { date: "2024-01-30", sales: 3100 }
  ]);
});

app.get("/api/v2/top-products", (req, res) => {
  res.json([
    { id: "1", brand: "iPhone 15 Pro", category: "Electronics", total_sales: 85000, growth: 25 },
    { id: "2", brand: "Samsung Galaxy S24", category: "Electronics", total_sales: 72000, growth: 18 },
    { id: "3", brand: "MacBook Air M3", category: "Electronics", total_sales: 68000, growth: 22 },
    { id: "4", brand: "Nike Air Max", category: "Clothing", total_sales: 45000, growth: 12 },
    { id: "5", brand: "Adidas Ultraboost", category: "Clothing", total_sales: 42000, growth: 15 },
    { id: "6", brand: "Sony WH-1000XM5", category: "Electronics", total_sales: 38000, growth: 20 },
    { id: "7", brand: "Apple Watch Series 9", category: "Electronics", total_sales: 35000, growth: 28 },
    { id: "8", brand: "Levi's 501 Jeans", category: "Clothing", total_sales: 32000, growth: 8 },
    { id: "9", brand: "Canon EOS R6", category: "Electronics", total_sales: 28000, growth: 16 },
    { id: "10", brand: "Zara Collection", category: "Clothing", total_sales: 25000, growth: 10 }
  ]);
});

app.get("/api/v2/store-comparison", (req, res) => {
  res.json([
    { store_id: "1", store_name: "Центр города", total_sales: 50000 },
    { store_id: "2", store_name: "ТЦ Галерея", total_sales: 45000 },
    { store_id: "3", store_name: "Аэропорт", total_sales: 30000 }
  ]);
});

// Тестовый маршрут
app.get("/", (req, res) => {
  res.json({ message: "StockSensei API is working!", timestamp: new Date().toISOString() });
});

const port = process.env.PORT || 3000;
app.listen(port, () => {
  console.log(`🚀 StockSensei API running on port ${port}`);
});

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
    { id: "1", brand: "Brand A", category: "Electronics" },
    { id: "2", brand: "Brand B", category: "Clothing" }
  ]);
});

app.get("/api/v2/sales-dynamics", (req, res) => {
  res.json([
    { date: "2024-01-01", sales: 1000 },
    { date: "2024-01-02", sales: 1200 },
    { date: "2024-01-03", sales: 1100 }
  ]);
});

app.get("/api/v2/top-products", (req, res) => {
  res.json([
    { id: "1", brand: "Brand A", category: "Electronics", total_sales: 5000, growth: 15 },
    { id: "2", brand: "Brand B", category: "Clothing", total_sales: 3000, growth: 8 }
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

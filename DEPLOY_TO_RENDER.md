# 🚀 Деплой API на Render

## 📋 **Файлы готовы:**
- ✅ `index.ts` - Express сервер
- ✅ `package.json` - зависимости
- ✅ `storage.ts` - данные
- ✅ `routes.ts` - API маршруты

## 🔧 **Деплой на Render:**

### 1. Зайдите на [render.com](https://render.com)

### 2. Создайте новый Web Service:
- **Name**: `aurorix-api`
- **Environment**: `Node`
- **Build Command**: `npm install && npm run build`
- **Start Command**: `npm start`
- **Root Directory**: `aurorix-api`

### 3. Подключите GitHub:
- **Repository**: `https://github.com/arslan15114/aurorix-apiV2.git`
- **Branch**: `main`

### 4. Environment Variables:
```
NODE_ENV=production
PORT=3000
```

## 🎯 **После деплоя:**

1. **Получите URL** (например: `https://aurorix-api.onrender.com`)
2. **Обновите URL** в `client/src/services/apiService.ts`
3. **Пересоберите фронтенд**: `npm run build`

## 📱 **Тестирование API:**

- **Root**: `https://your-api.onrender.com/`
- **Stores**: `https://your-api.onrender.com/api/v2/stores`
- **KPI**: `https://your-api.onrender.com/api/v2/kpi`

---

**Удачи с деплоем! 🚀**

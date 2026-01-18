# Quick Start Guide

## For Quick Demo - Use MongoDB Atlas (Cloud, Free)

1. **Go to:** https://www.mongodb.com/cloud/atlas/register
2. **Sign up** (free account)
3. **Create a free cluster** (click "Build a Database" → "Free" → "Create")
4. **Set up access:**
   - Click "Database Access" → "Add New Database User"
   - Create username/password (remember these!)
   - Click "Network Access" → "Add IP Address" → "Allow Access from Anywhere"
5. **Get connection string:**
   - Click "Database" → "Connect" → "Connect your application"
   - Copy the connection string (looks like: `mongodb+srv://username:password@cluster0.xxxxx.mongodb.net/`)
6. **Update backend/.env:**
   - Replace `MONGODB_URI=...` with your Atlas connection string
   - Add database name: `mongodb+srv://username:password@cluster0.xxxxx.mongodb.net/bakery-finder`

## Start the Application

### Terminal 1 - Backend:
```powershell
cd backend
npm run dev
```
Wait for: "MongoDB connected" and "Server running on port 5000"

### Terminal 2 - Seed Data:
```powershell
cd backend
npm run seed
```
This adds 3 sample bakeries.

### Terminal 3 - Frontend:
```powershell
cd frontend
npm run dev
```

## View Demo

Open browser: **http://localhost:3000**

You should see bakery cards with semlor information!

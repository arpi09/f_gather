# Quick Setup Guide

## Step 1: Install Node.js
1. Download Node.js from https://nodejs.org/ (LTS version recommended)
2. Run the installer and follow the setup wizard
3. **Important**: Restart VS Code/your terminal after installation

## Step 2: Verify Installation
Open a new terminal and run:
```powershell
node --version
npm --version
```

Both commands should show version numbers.

## Step 3: Install Backend Dependencies
```powershell
cd backend
npm install
```

## Step 4: Setup Backend Environment
Create a `.env` file in the `backend` folder:
```powershell
# In backend folder
Copy-Item env.example .env
```

Then edit `.env` and add your MongoDB connection string (or use local MongoDB).

## Step 5: Install Frontend Dependencies
```powershell
cd ..\frontend
npm install
```

## Step 6: Start the Application

**Terminal 1 - Backend:**
```powershell
cd backend
npm run dev
```

**Terminal 2 - Frontend:**
```powershell
cd frontend
npm run dev
```

## Step 7: Seed Sample Data (Optional)
In a new terminal:
```powershell
cd backend
npm run seed
```

## Access the Application
- Frontend: http://localhost:3000
- Backend API: http://localhost:5000/api/bakeries

## Troubleshooting

### If npm/node commands still don't work after installation:
1. Close and reopen VS Code completely
2. Or restart your computer
3. Check if Node.js is in your PATH: `$env:PATH` should include Node.js installation path

### MongoDB Setup Options:
- **Option 1**: Install MongoDB locally from https://www.mongodb.com/try/download/community
- **Option 2**: Use MongoDB Atlas (free cloud database):
  1. Sign up at https://www.mongodb.com/cloud/atlas
  2. Create a free cluster
  3. Get connection string and update `backend/.env` with `MONGODB_URI`

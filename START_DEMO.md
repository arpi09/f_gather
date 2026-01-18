# How to Start the Demo

## Step 1: Set Up MongoDB

You have two options:

### Option A: MongoDB Atlas (Cloud - Easiest, Recommended)
1. Go to https://www.mongodb.com/cloud/atlas
2. Sign up for free account
3. Create a free cluster (takes 1-2 minutes)
4. Click "Connect" → "Connect your application"
5. Copy the connection string (looks like: `mongodb+srv://username:password@cluster.mongodb.net/`)
6. Update `backend/.env`:
   ```
   MONGODB_URI=mongodb+srv://your-connection-string-here
   ```

### Option B: Local MongoDB
1. Download MongoDB from https://www.mongodb.com/try/download/community
2. Install it
3. Make sure MongoDB service is running
4. The `.env` file already has the local connection string

## Step 2: Start the Backend

Open a terminal in VS Code:
```powershell
cd backend
npm run dev
```

You should see: "Server running on port 5000" and "MongoDB connected"

## Step 3: Seed Sample Data (Optional but Recommended)

In a NEW terminal:
```powershell
cd backend
npm run seed
```

This adds 3 sample bakeries so you can see the demo.

## Step 4: Start the Frontend

In a NEW terminal:
```powershell
cd frontend
npm run dev
```

You should see: "Local: http://localhost:3000"

## Step 5: View the Demo

Open your browser and go to: **http://localhost:3000**

You should see a list of bakeries with cards showing:
- Bakery name
- Location
- Whether they have semlor (highlighted badge)
- Instagram and website links

## Troubleshooting

**Backend won't start:**
- Check if MongoDB is running (if using local)
- Check if port 5000 is available
- Check `backend/.env` file exists

**Frontend shows "Failed to load bakeries":**
- Make sure backend is running on port 5000
- Check browser console for errors

**No bakeries showing:**
- Run `npm run seed` in the backend folder to add sample data

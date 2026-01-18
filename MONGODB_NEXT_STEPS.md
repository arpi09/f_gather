# Next Steps After Creating MongoDB Cluster

## Step 1: Create Database User

1. In MongoDB Atlas, click **"Database Access"** in the left sidebar
2. Click **"Add New Database User"**
3. Choose **"Password"** authentication
4. Create a username (e.g., `bakeryuser`)
5. Create a password (click "Autogenerate Secure Password" or create your own - **SAVE THIS!**)
6. Under "Database User Privileges", select **"Read and write to any database"**
7. Click **"Add User"**

## Step 2: Allow Network Access

1. Click **"Network Access"** in the left sidebar
2. Click **"Add IP Address"**
3. Click **"Allow Access from Anywhere"** (for demo purposes - shows `0.0.0.0/0`)
4. Click **"Confirm"**

**Note:** For production, you'd want to add only your specific IP, but for a quick demo, "Allow Access from Anywhere" is fine.

## Step 3: Get Connection String

1. Go back to **"Database"** in the left sidebar
2. Click **"Connect"** button on your cluster
3. Choose **"Connect your application"**
4. Select **"Node.js"** as the driver
5. Copy the connection string (looks like: `mongodb+srv://username:password@cluster0.xxxxx.mongodb.net/`)

**Important:** Replace `<password>` in the connection string with the password you created in Step 1!

## Step 4: Update backend/.env

1. Open `backend/.env` file in VS Code
2. Replace the `MONGODB_URI` line with your connection string
3. Add `/bakery-finder` at the end (the database name)

Example:
```
MONGODB_URI=mongodb+srv://bakeryuser:yourpassword@cluster0.xxxxx.mongodb.net/bakery-finder
```

## Step 5: Test the Connection

After updating .env, we'll start the backend and it should connect!

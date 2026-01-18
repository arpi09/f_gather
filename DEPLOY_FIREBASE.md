# Firebase Deployment Guide

## Prerequisites

1. **Node.js and npm** (already installed ✓)
2. **Firebase account** - Create at https://firebase.google.com
3. **Firebase CLI** - Install globally

## Step 1: Install Firebase CLI

```bash
npm install -g firebase-tools
```

## Step 2: Login to Firebase

```bash
firebase login
```

This will open your browser - login with your Google account.

## Step 3: Create Firebase Project

1. Go to https://console.firebase.google.com
2. Click "Add project"
3. Name it (e.g., "bakery-finder")
4. Disable Google Analytics (optional)
5. Click "Create project"
6. **Copy your project ID** (you'll need it next)

## Step 4: Link Your Code to Firebase

```bash
firebase use --add
```

- Select your project from the list
- Press Enter to use "default" as alias
- This updates `.firebaserc` with your project ID

## Step 5: Install Dependencies

### Backend (Cloud Functions)
```bash
cd functions
npm install
cd ..
```

### Frontend
```bash
cd frontend
npm install
cd ..
```

## Step 6: Configure MongoDB

Set your MongoDB connection string as a Firebase secret:

```bash
firebase functions:secrets:set MONGODB_URI
```

When prompted, paste your MongoDB Atlas connection string:
```
mongodb+srv://username:password@cluster.mongodb.net/bakery-finder
```

## Step 7: Build Frontend

```bash
cd frontend
npm run build
cd ..
```

This creates the `frontend/dist` folder with your production build.

## Step 8: Deploy Everything

```bash
firebase deploy
```

This deploys:
- ✅ Frontend to Firebase Hosting
- ✅ Backend API to Cloud Functions

## Step 9: Get Your URL

After deployment, Firebase shows you:
- **Hosting URL**: `https://your-project-id.web.app`
- **Functions URL**: `https://us-central1-your-project-id.cloudfunctions.net/api`

Visit your Hosting URL - your app is live!

## Local Testing (Optional)

Test before deploying:

```bash
# Build frontend
cd frontend
npm run build
cd ..

# Start Firebase emulators
firebase emulators:start
```

Visit: http://localhost:5000

## Updating Your App

After making changes:

```bash
# 1. Build frontend
cd frontend
npm run build
cd ..

# 2. Deploy
firebase deploy
```

Or deploy only specific parts:
```bash
firebase deploy --only hosting    # Frontend only
firebase deploy --only functions  # Backend only
```

## Common Issues

### Issue: "Firebase project not found"
**Fix**: Run `firebase use --add` and select your project

### Issue: "MONGODB_URI not defined"
**Fix**: Run `firebase functions:secrets:set MONGODB_URI`

### Issue: "Functions timeout"
**Symptom**: Cards stay in loading state
**Cause**: Scraping takes too long (>60s on free tier)
**Fix**: 
- Reduce number of bakeries
- Optimize scraping code
- Upgrade to Blaze plan (pay-as-you-go, still mostly free)

### Issue: Cold start delays
**Symptom**: First request after 15 min is slow
**Fix**: This is normal on free tier. Blaze plan keeps functions warm.

## Costs

**Free Tier (Spark Plan)**:
- Hosting: 10 GB storage, 360 MB/day bandwidth
- Functions: 125K invocations/month, 40K GB-seconds
- For your app: **Completely free** with normal usage

**If you need more**: Upgrade to Blaze (pay-as-you-go)
- You only pay for what you use beyond free tier
- First few dollars/month for small apps

## Environment Variables

Your app uses:
- **Production**: `.env.production` (points to `/api`)
- **Development**: Vite proxy (points to `localhost:5000`)

No code changes needed!

## Support

Firebase Console: https://console.firebase.google.com
Your project: https://console.firebase.google.com/project/your-project-id

Happy deploying! 🚀

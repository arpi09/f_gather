# Quick Firebase Deploy (For First Time)

## 1. Install Firebase CLI
```bash
npm install -g firebase-tools
```

## 2. Login
```bash
firebase login
```

## 3. Create Project at Firebase Console
https://console.firebase.google.com
- Click "Add project"
- Name it (e.g., "bakery-finder")
- Copy the project ID

## 4. Connect Your Code
```bash
firebase use --add
```
Select your project from the list.

## 5. Install Dependencies
```bash
cd functions
npm install
cd ../frontend
npm install
cd ..
```

## 6. Set MongoDB Secret
```bash
firebase functions:secrets:set MONGODB_URI
```
Paste your MongoDB Atlas connection string when prompted.

## 7. Build & Deploy
```bash
cd frontend
npm run build
cd ..
firebase deploy
```

## Done! 🎉
Your URL: `https://your-project-id.web.app`

---

## Future Updates
```bash
cd frontend
npm run build
cd ..
firebase deploy
```

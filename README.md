# Bakery Finder

A web application to find bakeries and check if they offer semlor (Swedish pastries).

## Tech Stack

- **Frontend**: React with Vite, Material-UI (MUI)
- **Backend**: Node.js with Express
- **Database**: MongoDB with Mongoose
- **Architecture**: SOLID principles, Atomic Design pattern

## Project Structure

```
├── backend/
│   ├── models/          # Database models
│   ├── routes/          # API routes
│   └── server.js        # Express server
├── frontend/
│   ├── src/
│   │   ├── atoms/       # Basic components (not used yet)
│   │   ├── molecules/   # Composite components (BakeryCard)
│   │   ├── organisms/   # Complex components (BakeryList)
│   │   ├── pages/       # Page components
│   │   └── services/    # API services
│   └── package.json
└── README.md
```

## Setup Instructions

### Prerequisites

- Node.js (v18 or higher)
- MongoDB (local or MongoDB Atlas)

### Backend Setup

1. Navigate to backend directory:
```bash
cd backend
```

2. Install dependencies:
```bash
npm install
```

3. Create a `.env` file:
```bash
cp .env.example .env
```

4. Update `.env` with your MongoDB connection string:
```
PORT=5000
MONGODB_URI=mongodb://localhost:27017/bakery-finder
```

5. Start the server:
```bash
npm run dev
```

### Frontend Setup

1. Navigate to frontend directory:
```bash
cd frontend
```

2. Install dependencies:
```bash
npm install
```

3. Create a `.env` file (optional, defaults to localhost):
```
VITE_API_URL=http://localhost:5000/api
```

4. Start the development server:
```bash
npm run dev
```

The frontend will be available at `http://localhost:3000`

## Deployment

### Easy Hosting Options

**Frontend (Vercel/Netlify):**
- Connect your GitHub repo
- Set build command: `cd frontend && npm install && npm run build`
- Set output directory: `frontend/dist`

**Backend (Railway/Render):**
- Connect your GitHub repo
- Set start command: `cd backend && npm install && npm start`
- Add environment variables (MONGODB_URI, PORT)

**Database:**
- Use MongoDB Atlas (free tier available)
- Update MONGODB_URI in backend .env

## API Endpoints

- `GET /api/bakeries` - Get all bakeries
- `GET /api/bakeries/:id` - Get single bakery
- `POST /api/bakeries` - Create bakery
- `PUT /api/bakeries/:id` - Update bakery
- `DELETE /api/bakeries/:id` - Delete bakery

## Adding Sample Data

You can add sample bakeries through the API or directly in MongoDB. Example:

```json
{
  "name": "Example Bakery",
  "instagramHandle": "@examplebakery",
  "website": "https://example.com",
  "hasSemlor": true,
  "location": "Stockholm, Sweden",
  "description": "A wonderful bakery with traditional Swedish pastries"
}
```

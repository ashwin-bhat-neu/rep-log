# RepLog

Gym companion for logging workouts, reviewing which muscle groups your training covers, and browsing an exercise library with custom exercise templates.

**Live app:** https://rep-log-sable.vercel.app

See the [design document](docs/design-document.md) for personas, user stories, the data model, and mockups.

## Running locally

Requires Node.js 22 and a MongoDB connection string (a free MongoDB Atlas cluster works).

```bash
cp backend/.env.example backend/.env   # then fill in MONGODB_URI and SESSION_SECRET
npm install --prefix backend
npm install --prefix frontend
npm run dev --prefix backend           # API at http://localhost:3000
npm run dev --prefix frontend          # app at http://localhost:5173, forwards /api to the API
```

`GET /api/health` confirms the database connection.

To try the production build, keep the API running and run `npm run build --prefix frontend` and then `npm run preview --prefix frontend`. The app runs at http://localhost:4173.

## Deployment

The app deploys to Vercel as one project with two [services](https://vercel.com/docs/services), configured in `vercel.json`: requests under `/api/` go to the Express backend, and everything else goes to the React frontend. Set `MONGODB_URI` and `SESSION_SECRET` in the Vercel project's environment variables.

Before committing, run `npm run lint` and `npm run format` in both `backend/` and `frontend/`.

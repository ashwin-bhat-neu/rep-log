# RepLog

Gym companion for logging workouts, reviewing which muscle groups your training covers, and browsing an exercise library with custom exercise templates.

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

To run the production build locally, run `npm run build --prefix backend` and then `npm start --prefix backend`. Express serves the built app at http://localhost:3000.

Before committing, run `npm run lint` and `npm run format` in both `backend/` and `frontend/`.

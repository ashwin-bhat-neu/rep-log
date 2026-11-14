import { fileURLToPath } from "node:url";
import express from "express";
import { getDatabase } from "./database/databaseConnection.js";
import {
  handleUnexpectedError,
  handleUnknownApiRoute,
} from "./middleware/errorHandlers.js";

const publicDirectoryPath = fileURLToPath(
  new URL("../public", import.meta.url),
);
const indexHtmlPath = fileURLToPath(
  new URL("../public/index.html", import.meta.url),
);

const app = express();

app.use(express.json());
// Vercel ignores this and serves public/ from its CDN; it is for local runs of the built frontend.
app.use(express.static(publicDirectoryPath));

app.get("/api/health", async (request, response) => {
  const database = await getDatabase();
  await database.command({ ping: 1 });
  response.json({ status: "ok" });
});

app.use("/api", handleUnknownApiRoute);
// Client-side routes like /workouts/123 aren't files, so they get the React app and React Router takes over.
app.get("/{*clientRoute}", (request, response) => {
  response.sendFile(indexHtmlPath);
});
app.use(handleUnexpectedError);

export default app;

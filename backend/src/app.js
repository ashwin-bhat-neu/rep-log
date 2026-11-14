import express from "express";
import { getDatabase } from "./database/databaseConnection.js";
import {
  handleUnexpectedError,
  handleUnknownApiRoute,
} from "./middleware/errorHandlers.js";

const app = express();

app.use(express.json());

app.get("/api/health", async (request, response) => {
  const database = await getDatabase();
  await database.command({ ping: 1 });
  response.json({ status: "ok" });
});

app.use("/api", handleUnknownApiRoute);
app.use(handleUnexpectedError);

export default app;

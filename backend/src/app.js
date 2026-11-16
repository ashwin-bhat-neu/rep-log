import express from "express";
import passport from "passport";
import { configurePassport } from "./authentication/configurePassport.js";
import { createSessionMiddleware } from "./authentication/createSessionMiddleware.js";
import { getDatabase } from "./database/databaseConnection.js";
import {
  handleUnexpectedError,
  handleUnknownApiRoute,
} from "./middleware/errorHandlers.js";
import authenticationRouter from "./routes/authenticationRoutes.js";

configurePassport(passport);

const app = express();

// Vercel terminates HTTPS at its proxy; trusting X-Forwarded-Proto lets secure cookies be set.
app.set("trust proxy", true);
app.use(express.json());
app.use(createSessionMiddleware(process.env.SESSION_SECRET));
app.use(passport.initialize());
app.use(passport.session());

app.get("/api/health", async (request, response) => {
  const database = await getDatabase();
  await database.command({ ping: 1 });
  response.json({ status: "ok" });
});

app.use("/api/authentication", authenticationRouter);

app.use("/api", handleUnknownApiRoute);
app.use(handleUnexpectedError);

export default app;

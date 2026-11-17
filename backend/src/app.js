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
import customTemplatesRouter from "./routes/customTemplatesRoutes.js";
import exercisesRouter from "./routes/exercisesRoutes.js";
import trainingBreakdownRouter from "./routes/trainingBreakdownRoutes.js";
import workoutsRouter from "./routes/workoutsRoutes.js";

configurePassport(passport);

const app = express();

// Vercel terminates HTTPS at its proxy; trusting X-Forwarded-Proto lets secure cookies be set.
app.set("trust proxy", true);
app.use(express.json());
// API responses depend on who is logged in, so browsers must not reuse them.
app.use("/api", (request, response, next) => {
  response.set("Cache-Control", "no-store");
  next();
});
app.use(createSessionMiddleware(process.env.SESSION_SECRET));
app.use(passport.initialize());
app.use(passport.session());

app.get("/api/health", async (request, response) => {
  const database = await getDatabase();
  await database.command({ ping: 1 });
  response.json({ status: "ok" });
});

app.use("/api/authentication", authenticationRouter);
app.use("/api/workouts", workoutsRouter);
app.use("/api/training-breakdown", trainingBreakdownRouter);
app.use("/api/exercises", exercisesRouter);
app.use("/api/custom-templates", customTemplatesRouter);

app.use("/api", handleUnknownApiRoute);
app.use(handleUnexpectedError);

export default app;

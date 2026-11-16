import session from "express-session";
import { getSessionsCollection } from "../database/sessionsCollection.js";
import MongoSessionStore from "./MongoSessionStore.js";

const MILLISECONDS_PER_DAY = 24 * 60 * 60 * 1000;
const SESSION_LIFETIME_MILLISECONDS = 7 * MILLISECONDS_PER_DAY;

export function createSessionMiddleware(sessionSecret) {
  if (!sessionSecret) {
    throw new Error(
      "SESSION_SECRET is not set; copy backend/.env.example to backend/.env",
    );
  }
  return session({
    name: "replog.sid",
    secret: sessionSecret,
    store: new MongoSessionStore(getSessionsCollection),
    resave: false,
    saveUninitialized: false,
    cookie: {
      httpOnly: true,
      sameSite: "lax",
      // Secure over HTTPS in production, while still working on http://localhost.
      secure: "auto",
      maxAge: SESSION_LIFETIME_MILLISECONDS,
    },
  });
}

import express from "express";
import passport from "passport";
import { hashPassword } from "../authentication/passwordHashing.js";
import { createUser, toPublicUser } from "../database/usersCollection.js";
import { validateCredentials } from "../validation/credentialsValidation.js";

const router = express.Router();

router.post("/register", async (request, response, next) => {
  const { error, credentials } = validateCredentials(request.body);
  if (error) {
    response.status(400).json({ error });
    return;
  }
  const { passwordHash, passwordSalt } = await hashPassword(
    credentials.password,
  );
  const user = await createUser({
    username: credentials.username,
    passwordHash,
    passwordSalt,
  });
  if (!user) {
    response.status(409).json({ error: "That username is already taken" });
    return;
  }
  request.login(user, (loginError) => {
    if (loginError) {
      next(loginError);
      return;
    }
    response.status(201).json({ user: toPublicUser(user) });
  });
});

router.post("/login", (request, response, next) => {
  passport.authenticate("local", (error, user) => {
    if (error) {
      next(error);
      return;
    }
    if (!user) {
      response.status(401).json({ error: "Incorrect username or password" });
      return;
    }
    request.login(user, (loginError) => {
      if (loginError) {
        next(loginError);
        return;
      }
      response.json({ user: toPublicUser(user) });
    });
  })(request, response, next);
});

router.post("/logout", (request, response, next) => {
  request.logout((error) => {
    if (error) {
      next(error);
      return;
    }
    response.status(204).end();
  });
});

router.get("/current-user", (request, response) => {
  response.json({ user: request.user ?? null });
});

export default router;

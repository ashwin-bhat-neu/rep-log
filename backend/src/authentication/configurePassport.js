import { Strategy as LocalStrategy } from "passport-local";
import {
  findUserById,
  findUserByUsername,
  toPublicUser,
} from "../database/usersCollection.js";
import { authenticateUser } from "./authenticateUser.js";

export function configurePassport(passport) {
  passport.use(
    new LocalStrategy((username, password, done) => {
      authenticateUser(username, password, findUserByUsername).then(
        (user) => done(null, user ?? false),
        done,
      );
    }),
  );

  // Only the user's ID goes into the session; the rest is looked up per request.
  passport.serializeUser((user, done) => {
    done(null, user._id.toString());
  });

  passport.deserializeUser((userId, done) => {
    findUserById(userId).then(
      (user) => done(null, user ? toPublicUser(user) : false),
      done,
    );
  });
}

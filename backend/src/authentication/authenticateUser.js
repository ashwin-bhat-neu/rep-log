import {
  MAXIMUM_PASSWORD_LENGTH,
  normalizeUsername,
} from "../validation/credentialsValidation.js";
import { verifyPassword } from "./passwordHashing.js";

// Returns the stored user when the credentials match, otherwise null.
export async function authenticateUser(username, password, findUserByUsername) {
  if (password.length > MAXIMUM_PASSWORD_LENGTH) {
    return null;
  }
  const user = await findUserByUsername(normalizeUsername(username));
  if (!user) {
    return null;
  }
  return (await verifyPassword(password, user)) ? user : null;
}

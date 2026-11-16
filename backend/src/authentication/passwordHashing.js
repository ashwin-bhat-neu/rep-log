import { randomBytes, scrypt, timingSafeEqual } from "node:crypto";
import { promisify } from "node:util";

const scryptAsync = promisify(scrypt);
const SALT_LENGTH_IN_BYTES = 16;
const DERIVED_KEY_LENGTH_IN_BYTES = 64;

export async function hashPassword(password) {
  const passwordSalt = randomBytes(SALT_LENGTH_IN_BYTES).toString("hex");
  const derivedKey = await scryptAsync(
    password,
    passwordSalt,
    DERIVED_KEY_LENGTH_IN_BYTES,
  );
  return { passwordHash: derivedKey.toString("hex"), passwordSalt };
}

export async function verifyPassword(password, { passwordHash, passwordSalt }) {
  const storedKey = Buffer.from(passwordHash, "hex");
  const derivedKey = await scryptAsync(
    password,
    passwordSalt,
    storedKey.length,
  );
  return timingSafeEqual(storedKey, derivedKey);
}

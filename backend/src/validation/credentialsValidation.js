const USERNAME_PATTERN = /^[A-Za-z0-9_]{3,30}$/;
export const MINIMUM_PASSWORD_LENGTH = 8;
// Caps the scrypt work a single request can trigger.
export const MAXIMUM_PASSWORD_LENGTH = 128;

export function normalizeUsername(username) {
  return username.trim().toLowerCase();
}

export function validateCredentials(body) {
  const username = typeof body?.username === "string" ? body.username : "";
  const password = typeof body?.password === "string" ? body.password : "";

  if (!USERNAME_PATTERN.test(username.trim())) {
    return {
      error: "Username must be 3 to 30 letters, numbers, or underscores",
    };
  }
  if (
    password.length < MINIMUM_PASSWORD_LENGTH ||
    password.length > MAXIMUM_PASSWORD_LENGTH
  ) {
    return {
      error: `Password must be ${MINIMUM_PASSWORD_LENGTH} to ${MAXIMUM_PASSWORD_LENGTH} characters`,
    };
  }
  return { credentials: { username: normalizeUsername(username), password } };
}

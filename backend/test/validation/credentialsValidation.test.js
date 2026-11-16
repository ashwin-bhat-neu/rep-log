import assert from "node:assert/strict";
import { test } from "node:test";
import {
  MAXIMUM_PASSWORD_LENGTH,
  normalizeUsername,
  validateCredentials,
} from "../../src/validation/credentialsValidation.js";

test("valid credentials are returned with the username lowercased and trimmed", () => {
  assert.deepEqual(
    validateCredentials({ username: " Arjun_Lifts ", password: "squat1234" }),
    { credentials: { username: "arjun_lifts", password: "squat1234" } },
  );
});

test("usernames outside 3 to 30 letters, numbers, or underscores are rejected", () => {
  for (const username of ["ab", "a".repeat(31), "has space", "dash-name", ""]) {
    const result = validateCredentials({ username, password: "squat1234" });
    assert.match(result.error, /Username/, `expected "${username}" rejected`);
  }
});

test("passwords shorter than 8 or longer than the maximum are rejected", () => {
  for (const password of ["short", "x".repeat(MAXIMUM_PASSWORD_LENGTH + 1)]) {
    const result = validateCredentials({ username: "arjun", password });
    assert.match(result.error, /Password/);
  }
});

test("missing or non-string fields are rejected instead of throwing", () => {
  assert.ok(validateCredentials(undefined).error);
  assert.ok(validateCredentials({ username: 42, password: ["x"] }).error);
});

test("normalizeUsername makes login case-insensitive", () => {
  assert.equal(normalizeUsername("  Maya "), "maya");
});

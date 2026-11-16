import assert from "node:assert/strict";
import { test } from "node:test";
import {
  hashPassword,
  verifyPassword,
} from "../../src/authentication/passwordHashing.js";

test("the original password verifies against its hash", async () => {
  const storedPassword = await hashPassword("squat1234");

  assert.equal(await verifyPassword("squat1234", storedPassword), true);
});

test("a different password does not verify", async () => {
  const storedPassword = await hashPassword("squat1234");

  assert.equal(await verifyPassword("squat12345", storedPassword), false);
});

test("hashing the same password twice uses different salts and hashes", async () => {
  const first = await hashPassword("squat1234");
  const second = await hashPassword("squat1234");

  assert.notEqual(first.passwordSalt, second.passwordSalt);
  assert.notEqual(first.passwordHash, second.passwordHash);
});

import assert from "node:assert/strict";
import { before, test } from "node:test";
import { authenticateUser } from "../../src/authentication/authenticateUser.js";
import { hashPassword } from "../../src/authentication/passwordHashing.js";
import { MAXIMUM_PASSWORD_LENGTH } from "../../src/validation/credentialsValidation.js";

let storedUser;
const requestedUsernames = [];

async function findUserByUsername(username) {
  requestedUsernames.push(username);
  return username === storedUser.username ? storedUser : null;
}

before(async () => {
  storedUser = { username: "arjun", ...(await hashPassword("squat1234")) };
});

test("matching credentials return the stored user", async () => {
  const user = await authenticateUser("arjun", "squat1234", findUserByUsername);

  assert.equal(user, storedUser);
});

test("the username is looked up trimmed and lowercased", async () => {
  const user = await authenticateUser(
    "  Arjun ",
    "squat1234",
    findUserByUsername,
  );

  assert.equal(user, storedUser);
  assert.equal(requestedUsernames.at(-1), "arjun");
});

test("a wrong password returns null", async () => {
  assert.equal(
    await authenticateUser("arjun", "wrong-password", findUserByUsername),
    null,
  );
});

test("an unknown username returns null", async () => {
  assert.equal(
    await authenticateUser("nobody", "squat1234", findUserByUsername),
    null,
  );
});

test("an overlong password is rejected without a lookup", async () => {
  const lookupsBefore = requestedUsernames.length;

  const user = await authenticateUser(
    "arjun",
    "x".repeat(MAXIMUM_PASSWORD_LENGTH + 1),
    findUserByUsername,
  );

  assert.equal(user, null);
  assert.equal(requestedUsernames.length, lookupsBefore);
});

import assert from "node:assert/strict";
import { promisify } from "node:util";
import { beforeEach, test } from "node:test";
import MongoSessionStore from "../../src/authentication/MongoSessionStore.js";

const MILLISECONDS_PER_HOUR = 60 * 60 * 1000;

// Implements only the collection calls the store makes, keyed by _id.
function createInMemorySessionsCollection() {
  const documentsById = new Map();
  return {
    documentsById,
    async findOne({ _id, expiresAt }) {
      const document = documentsById.get(_id);
      if (!document || document.expiresAt <= expiresAt.$gt) {
        return null;
      }
      return document;
    },
    async updateOne({ _id }, { $set }, options = {}) {
      const existing = documentsById.get(_id);
      if (!existing && !options.upsert) {
        return;
      }
      documentsById.set(_id, { ...existing, _id, ...$set });
    },
    async deleteOne({ _id }) {
      documentsById.delete(_id);
    },
  };
}

function sessionExpiringIn(milliseconds, passportUserId = "user-1") {
  return {
    cookie: { expires: new Date(Date.now() + milliseconds).toISOString() },
    passport: { user: passportUserId },
  };
}

let sessionsCollection;
let store;
let getSession;
let setSession;
let touchSession;
let destroySession;

beforeEach(() => {
  sessionsCollection = createInMemorySessionsCollection();
  store = new MongoSessionStore(async () => sessionsCollection);
  getSession = promisify(store.get.bind(store));
  setSession = promisify(store.set.bind(store));
  touchSession = promisify(store.touch.bind(store));
  destroySession = promisify(store.destroy.bind(store));
});

test("a stored session is read back unchanged", async () => {
  const sessionData = sessionExpiringIn(MILLISECONDS_PER_HOUR);

  await setSession("session-a", sessionData);

  assert.deepEqual(await getSession("session-a"), sessionData);
});

test("expiresAt is taken from the session cookie", async () => {
  const sessionData = sessionExpiringIn(MILLISECONDS_PER_HOUR);

  await setSession("session-a", sessionData);

  assert.deepEqual(
    sessionsCollection.documentsById.get("session-a").expiresAt,
    new Date(sessionData.cookie.expires),
  );
});

test("an unknown session reads as null", async () => {
  assert.equal(await getSession("missing"), null);
});

test("an expired session reads as null before MongoDB deletes it", async () => {
  await setSession("session-a", sessionExpiringIn(-1));

  assert.equal(await getSession("session-a"), null);
});

test("touch moves the expiry without changing the session contents", async () => {
  const sessionData = sessionExpiringIn(MILLISECONDS_PER_HOUR);
  await setSession("session-a", sessionData);
  const laterSessionData = sessionExpiringIn(
    2 * MILLISECONDS_PER_HOUR,
    "ignored",
  );

  await touchSession("session-a", laterSessionData);

  const document = sessionsCollection.documentsById.get("session-a");
  assert.deepEqual(
    document.expiresAt,
    new Date(laterSessionData.cookie.expires),
  );
  assert.deepEqual(await getSession("session-a"), sessionData);
});

test("a destroyed session reads as null", async () => {
  await setSession("session-a", sessionExpiringIn(MILLISECONDS_PER_HOUR));

  await destroySession("session-a");

  assert.equal(await getSession("session-a"), null);
});

test("database errors are passed to the callback", async () => {
  const failingStore = new MongoSessionStore(async () => {
    throw new Error("database unavailable");
  });

  await assert.rejects(promisify(failingStore.get.bind(failingStore))("x"), {
    message: "database unavailable",
  });
});

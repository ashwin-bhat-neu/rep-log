import session from "express-session";

const MILLISECONDS_PER_DAY = 24 * 60 * 60 * 1000;
// Used only for sessions whose cookie has no expiry, which the app never creates.
const FALLBACK_SESSION_LIFETIME_MILLISECONDS = MILLISECONDS_PER_DAY;

function computeExpiresAt(sessionData) {
  const cookieExpires = sessionData.cookie?.expires;
  return cookieExpires
    ? new Date(cookieExpires)
    : new Date(Date.now() + FALLBACK_SESSION_LIFETIME_MILLISECONDS);
}

function runWithCallback(operation, callback) {
  operation().then(
    (result) => callback?.(null, result),
    (error) => callback?.(error),
  );
}

// Sessions live in MongoDB because each Vercel function instance has its own memory.
export default class MongoSessionStore extends session.Store {
  #getSessionsCollection;

  constructor(getSessionsCollection) {
    super();
    this.#getSessionsCollection = getSessionsCollection;
  }

  get(sessionId, callback) {
    runWithCallback(async () => {
      const sessions = await this.#getSessionsCollection();
      // The TTL monitor only runs about once a minute, so expired sessions are filtered here too.
      const storedSession = await sessions.findOne({
        _id: sessionId,
        expiresAt: { $gt: new Date() },
      });
      return storedSession ? JSON.parse(storedSession.session) : null;
    }, callback);
  }

  set(sessionId, sessionData, callback) {
    runWithCallback(async () => {
      const sessions = await this.#getSessionsCollection();
      await sessions.updateOne(
        { _id: sessionId },
        {
          $set: {
            session: JSON.stringify(sessionData),
            expiresAt: computeExpiresAt(sessionData),
          },
        },
        { upsert: true },
      );
    }, callback);
  }

  touch(sessionId, sessionData, callback) {
    runWithCallback(async () => {
      const sessions = await this.#getSessionsCollection();
      await sessions.updateOne(
        { _id: sessionId },
        { $set: { expiresAt: computeExpiresAt(sessionData) } },
      );
    }, callback);
  }

  destroy(sessionId, callback) {
    runWithCallback(async () => {
      const sessions = await this.#getSessionsCollection();
      await sessions.deleteOne({ _id: sessionId });
    }, callback);
  }
}

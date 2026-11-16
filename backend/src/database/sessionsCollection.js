import { getDatabase } from "./databaseConnection.js";

// Prepared once per server instance so the TTL index exists before sessions are stored.
let sessionsCollectionPromise;

async function prepareSessionsCollection() {
  const database = await getDatabase();
  const sessions = database.collection("sessions");
  // MongoDB deletes each session once its expiresAt time has passed.
  await sessions.createIndex({ expiresAt: 1 }, { expireAfterSeconds: 0 });
  return sessions;
}

export function getSessionsCollection() {
  sessionsCollectionPromise ??= prepareSessionsCollection().catch((error) => {
    sessionsCollectionPromise = undefined;
    throw error;
  });
  return sessionsCollectionPromise;
}

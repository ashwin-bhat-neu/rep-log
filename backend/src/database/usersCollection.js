import { ObjectId } from "mongodb";
import { getDatabase } from "./databaseConnection.js";

const DUPLICATE_KEY_ERROR_CODE = 11000;

// Prepared once per server instance so the unique index exists before the first insert.
let usersCollectionPromise;

async function prepareUsersCollection() {
  const database = await getDatabase();
  const users = database.collection("users");
  await users.createIndex({ username: 1 }, { unique: true });
  return users;
}

function getUsersCollection() {
  usersCollectionPromise ??= prepareUsersCollection().catch((error) => {
    usersCollectionPromise = undefined;
    throw error;
  });
  return usersCollectionPromise;
}

export function toPublicUser(user) {
  return { id: user._id.toString(), username: user.username };
}

export async function findUserByUsername(username) {
  const users = await getUsersCollection();
  return users.findOne({ username });
}

export async function findUserById(userId) {
  if (!ObjectId.isValid(userId)) {
    return null;
  }
  const users = await getUsersCollection();
  return users.findOne(
    { _id: new ObjectId(userId) },
    { projection: { username: 1 } },
  );
}

// Returns null when the username is already taken.
export async function createUser({ username, passwordHash, passwordSalt }) {
  const users = await getUsersCollection();
  const user = { username, passwordHash, passwordSalt, createdAt: new Date() };
  try {
    const { insertedId } = await users.insertOne(user);
    return { _id: insertedId, ...user };
  } catch (error) {
    if (error.code === DUPLICATE_KEY_ERROR_CODE) {
      return null;
    }
    throw error;
  }
}

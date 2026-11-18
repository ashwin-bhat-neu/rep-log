// Creates the demo lifters and replaces their workouts with generated history ending today.
// Run with: npm run seed:workouts [-- YYYY-MM-DD] to end the history on a different date.
import { hashPassword } from "../src/authentication/passwordHashing.js";
import {
  closeDatabaseConnection,
  getDatabase,
} from "../src/database/databaseConnection.js";
import { getWorkoutsCollection } from "../src/database/workoutsCollection.js";
import { isCalendarDate } from "../src/validation/isCalendarDate.js";
import { createSeededRandom } from "./createSeededRandom.js";
import { generateSeedWorkouts } from "./generateSeedWorkouts.js";

// Fixed so every run with the same end date produces the same workouts.
const RANDOM_SEED = 20261117;
// Shared and published in the README so graders and teammates can log in to the demo accounts.
const DEMO_PASSWORD = "replog-demo";

function localCalendarDate(date) {
  const year = date.getFullYear();
  const month = String(date.getMonth() + 1).padStart(2, "0");
  const day = String(date.getDate()).padStart(2, "0");
  return `${year}-${month}-${day}`;
}

const endDate = process.argv[2] ?? localCalendarDate(new Date());
if (!isCalendarDate(endDate)) {
  throw new Error(`End date must be YYYY-MM-DD, got "${endDate}"`);
}

try {
  const database = await getDatabase();
  const users = database.collection("users");
  const workouts = await getWorkoutsCollection();
  await users.createIndex({ username: 1 }, { unique: true });

  const seedWorkouts = generateSeedWorkouts(
    createSeededRandom(RANDOM_SEED),
    endDate,
  );
  let insertedWorkoutCount = 0;
  for (const { username, workouts: lifterWorkouts } of seedWorkouts) {
    const { passwordHash, passwordSalt } = await hashPassword(DEMO_PASSWORD);
    const user = await users.findOneAndUpdate(
      { username },
      {
        $set: { passwordHash, passwordSalt },
        $setOnInsert: { username, createdAt: new Date() },
      },
      { upsert: true, returnDocument: "after" },
    );
    await workouts.deleteMany({ userId: user._id });
    await workouts.insertMany(
      lifterWorkouts.map((workout) => ({ userId: user._id, ...workout })),
    );
    insertedWorkoutCount += lifterWorkouts.length;
    console.log(`${username}: ${lifterWorkouts.length} workouts`);
  }
  console.log(
    `Seeded ${insertedWorkoutCount} workouts for ${seedWorkouts.length} demo users, ending ${endDate}. Demo password: ${DEMO_PASSWORD}`,
  );
} finally {
  await closeDatabaseConnection();
}

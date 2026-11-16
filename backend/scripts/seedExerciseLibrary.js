// Replaces the exercises collection with the generated library and creates the indexes
// for the exercise library and custom templates. Run with: npm run seed:exercises
import { CASE_INSENSITIVE_COLLATION } from "../src/database/collations.js";
import {
  closeDatabaseConnection,
  getDatabase,
} from "../src/database/databaseConnection.js";
import { generateExerciseLibrary } from "./generateExerciseLibrary.js";

try {
  const database = await getDatabase();
  const exercises = generateExerciseLibrary();

  const exercisesCollection = database.collection("exercises");
  await exercisesCollection.deleteMany({});
  await exercisesCollection.insertMany(exercises);
  await exercisesCollection.createIndexes([
    {
      key: { name: 1 },
      unique: true,
      collation: CASE_INSENSITIVE_COLLATION,
    },
    { key: { primaryMuscleGroup: 1 } },
    { key: { secondaryMuscleGroups: 1 } },
    { key: { equipment: 1 } },
  ]);

  await database
    .collection("customTemplates")
    .createIndex(
      { userId: 1, name: 1 },
      { unique: true, collation: CASE_INSENSITIVE_COLLATION },
    );

  console.log(`Seeded ${exercises.length} exercises and created indexes.`);
} finally {
  await closeDatabaseConnection();
}

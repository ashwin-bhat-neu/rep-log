import { DIFFICULTY_LEVELS } from "../src/constants/exerciseCategories.js";
import { MOVEMENTS } from "./exerciseMovements.js";

const EQUIPMENT_NAME_WORDS = {
  Barbell: "Barbell",
  Dumbbell: "Dumbbell",
  "EZ bar": "EZ-Bar",
  Kettlebell: "Kettlebell",
  Cable: "Cable",
  Machine: "Machine",
  "Smith machine": "Smith Machine",
  "Resistance band": "Band",
  Bodyweight: "Bodyweight",
};

const EQUIPMENT_NOTES = {
  Barbell:
    "A barbell lets you load the movement heavily and add weight in small steps.",
  Dumbbell:
    "Dumbbells let each side work on its own and allow a more natural path for your joints.",
  "EZ bar":
    "The angled grips of an EZ bar are easier on the wrists and elbows than a straight bar.",
  Kettlebell:
    "A kettlebell's weight sits off-center from its handle, which makes your grip and stabilizers work harder.",
  Cable:
    "The cable keeps tension on the muscle through the whole range of motion.",
  Machine:
    "The machine guides the path of the weight, so you can focus on the target muscle without balancing anything.",
  "Smith machine":
    "The Smith machine runs the bar on fixed rails, giving a steadier path than a free barbell.",
  "Resistance band":
    "A band gets harder as it stretches and is easy to use at home or while traveling.",
  Bodyweight: "It needs no equipment, so you can do it anywhere.",
};

// Applied to every movement whose reps have a lowering phase (not holds, carries, or jumps).
const TEMPO_VARIATIONS = [
  {
    label: "Paused",
    difficultyChange: 1,
    cue: "Pause for two seconds at the hardest point of each rep, which removes momentum and builds control.",
  },
  {
    label: "Tempo",
    difficultyChange: 0,
    cue: "Take three seconds to lower the weight on every rep to spend more time under tension.",
  },
];

// Guided equipment removes the balance demand, so compound lifts on it are a step easier.
const GUIDED_EQUIPMENT = new Set(["Machine", "Smith machine"]);

function buildExerciseName(movement, equipment, variation) {
  const words = [];
  const equipmentWord = EQUIPMENT_NAME_WORDS[equipment];
  // "Bodyweight" only labels the plain version; "Weighted Chest Dip" reads better than "Weighted Bodyweight Chest Dip".
  const isBodyweightVariation = equipment === "Bodyweight" && variation;
  const namesEquipment =
    movement.equipment.length > 1 && !isBodyweightVariation;
  if (variation && variation.placement !== "afterEquipment") {
    words.push(variation.label);
  }
  if (namesEquipment) {
    words.push(equipmentWord);
  }
  if (variation && variation.placement === "afterEquipment") {
    words.push(variation.label);
  }
  words.push(movement.movement);
  return words.join(" ");
}

function findDifficulty(movement, equipment, variation) {
  let difficultyIndex = DIFFICULTY_LEVELS.indexOf(movement.difficulty);
  difficultyIndex += variation?.difficultyChange ?? 0;
  if (GUIDED_EQUIPMENT.has(equipment) && movement.mechanic === "Compound") {
    difficultyIndex -= 1;
  }
  const highestIndex = DIFFICULTY_LEVELS.length - 1;
  const clampedIndex = Math.min(Math.max(difficultyIndex, 0), highestIndex);
  return DIFFICULTY_LEVELS[clampedIndex];
}

function buildExercise(movement, equipment, variation) {
  const primaryMuscleGroup =
    variation?.primaryMuscleGroup ?? movement.primaryMuscleGroup;
  const secondaryMuscleGroups = (
    variation?.secondaryMuscleGroups ?? movement.secondaryMuscleGroups
  ).filter((muscleGroup) => muscleGroup !== primaryMuscleGroup);
  const descriptionSentences = [movement.summary];
  if (variation) {
    descriptionSentences.push(variation.cue);
  }
  descriptionSentences.push(EQUIPMENT_NOTES[equipment]);

  return {
    name: buildExerciseName(movement, equipment, variation),
    primaryMuscleGroup,
    secondaryMuscleGroups,
    equipment,
    difficulty: findDifficulty(movement, equipment, variation),
    mechanic: movement.mechanic,
    description: descriptionSentences.join(" "),
    instructions: movement.steps,
  };
}

function listVariations(movement) {
  const tempoVariations =
    movement.allowsTempoVariations === false ? [] : TEMPO_VARIATIONS;
  return [...movement.variations, ...tempoVariations];
}

// Deterministic, so reseeding always produces the same library.
export function generateExerciseLibrary() {
  const exercises = [];
  for (const movement of MOVEMENTS) {
    for (const equipment of movement.equipment) {
      exercises.push(buildExercise(movement, equipment, null));
      for (const variation of listVariations(movement)) {
        if (!variation.equipment || variation.equipment.includes(equipment)) {
          exercises.push(buildExercise(movement, equipment, variation));
        }
      }
    }
  }
  return exercises;
}

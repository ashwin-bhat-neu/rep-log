// Starting weights are for an average intermediate lifter; each demo lifter scales them.
// Bodyweight exercises have no weight. Weekly increases model slow, steady progress.
export const EXERCISES = {
  "Barbell bench press": {
    targetMuscleGroup: "Chest",
    startingWeightKilograms: 60,
    weeklyIncreaseKilograms: 0.5,
    repetitionRange: [5, 8],
    setCount: 4,
  },
  "Incline dumbbell press": {
    targetMuscleGroup: "Chest",
    startingWeightKilograms: 22,
    weeklyIncreaseKilograms: 0.25,
    repetitionRange: [8, 12],
    setCount: 3,
  },
  "Cable fly": {
    targetMuscleGroup: "Chest",
    startingWeightKilograms: 12,
    weeklyIncreaseKilograms: 0.1,
    repetitionRange: [12, 15],
    setCount: 3,
  },
  "Barbell row": {
    targetMuscleGroup: "Back",
    startingWeightKilograms: 55,
    weeklyIncreaseKilograms: 0.5,
    repetitionRange: [6, 10],
    setCount: 4,
  },
  "Lat pulldown": {
    targetMuscleGroup: "Back",
    startingWeightKilograms: 50,
    weeklyIncreaseKilograms: 0.3,
    repetitionRange: [8, 12],
    setCount: 3,
  },
  "Pull-up": {
    targetMuscleGroup: "Back",
    startingWeightKilograms: null,
    weeklyIncreaseKilograms: 0,
    repetitionRange: [5, 10],
    setCount: 3,
  },
  "Overhead press": {
    targetMuscleGroup: "Shoulders",
    startingWeightKilograms: 40,
    weeklyIncreaseKilograms: 0.25,
    repetitionRange: [5, 8],
    setCount: 4,
  },
  "Lateral raise": {
    targetMuscleGroup: "Shoulders",
    startingWeightKilograms: 8,
    weeklyIncreaseKilograms: 0.05,
    repetitionRange: [12, 15],
    setCount: 3,
  },
  "Barbell curl": {
    targetMuscleGroup: "Biceps",
    startingWeightKilograms: 25,
    weeklyIncreaseKilograms: 0.15,
    repetitionRange: [8, 12],
    setCount: 3,
  },
  "Hammer curl": {
    targetMuscleGroup: "Biceps",
    startingWeightKilograms: 12,
    weeklyIncreaseKilograms: 0.1,
    repetitionRange: [10, 12],
    setCount: 3,
  },
  "Triceps pushdown": {
    targetMuscleGroup: "Triceps",
    startingWeightKilograms: 25,
    weeklyIncreaseKilograms: 0.15,
    repetitionRange: [10, 15],
    setCount: 3,
  },
  "Skull crusher": {
    targetMuscleGroup: "Triceps",
    startingWeightKilograms: 20,
    weeklyIncreaseKilograms: 0.1,
    repetitionRange: [8, 12],
    setCount: 3,
  },
  "Wrist curl": {
    targetMuscleGroup: "Forearms",
    startingWeightKilograms: 10,
    weeklyIncreaseKilograms: 0.05,
    repetitionRange: [12, 20],
    setCount: 3,
  },
  "Cable crunch": {
    targetMuscleGroup: "Core",
    startingWeightKilograms: 30,
    weeklyIncreaseKilograms: 0.2,
    repetitionRange: [12, 15],
    setCount: 3,
  },
  "Hanging leg raise": {
    targetMuscleGroup: "Core",
    startingWeightKilograms: null,
    weeklyIncreaseKilograms: 0,
    repetitionRange: [8, 15],
    setCount: 3,
  },
  "Barbell squat": {
    targetMuscleGroup: "Quadriceps",
    startingWeightKilograms: 80,
    weeklyIncreaseKilograms: 0.75,
    repetitionRange: [5, 8],
    setCount: 4,
  },
  "Leg press": {
    targetMuscleGroup: "Quadriceps",
    startingWeightKilograms: 140,
    weeklyIncreaseKilograms: 1,
    repetitionRange: [8, 12],
    setCount: 3,
  },
  "Romanian deadlift": {
    targetMuscleGroup: "Hamstrings",
    startingWeightKilograms: 70,
    weeklyIncreaseKilograms: 0.5,
    repetitionRange: [6, 10],
    setCount: 3,
  },
  "Lying leg curl": {
    targetMuscleGroup: "Hamstrings",
    startingWeightKilograms: 35,
    weeklyIncreaseKilograms: 0.2,
    repetitionRange: [10, 12],
    setCount: 3,
  },
  "Hip thrust": {
    targetMuscleGroup: "Glutes",
    startingWeightKilograms: 80,
    weeklyIncreaseKilograms: 0.75,
    repetitionRange: [8, 12],
    setCount: 3,
  },
  "Standing calf raise": {
    targetMuscleGroup: "Calves",
    startingWeightKilograms: 60,
    weeklyIncreaseKilograms: 0.3,
    repetitionRange: [12, 15],
    setCount: 4,
  },
};

// Core lifts always happen; optional ones are sometimes skipped for time.
export const SESSIONS = {
  "Full body A": {
    coreExercises: ["Barbell squat", "Barbell bench press", "Barbell row"],
    optionalExercises: ["Cable crunch", "Standing calf raise"],
  },
  "Full body B": {
    coreExercises: ["Romanian deadlift", "Overhead press", "Lat pulldown"],
    optionalExercises: ["Barbell curl", "Hanging leg raise"],
  },
  Push: {
    coreExercises: ["Barbell bench press", "Overhead press"],
    optionalExercises: [
      "Incline dumbbell press",
      "Lateral raise",
      "Triceps pushdown",
      "Cable fly",
    ],
  },
  Pull: {
    coreExercises: ["Barbell row", "Lat pulldown"],
    optionalExercises: ["Pull-up", "Barbell curl", "Hammer curl", "Wrist curl"],
  },
  Legs: {
    coreExercises: ["Barbell squat", "Romanian deadlift"],
    optionalExercises: [
      "Leg press",
      "Lying leg curl",
      "Hip thrust",
      "Standing calf raise",
      "Hanging leg raise",
    ],
  },
  Upper: {
    coreExercises: ["Barbell bench press", "Barbell row", "Overhead press"],
    optionalExercises: [
      "Lat pulldown",
      "Lateral raise",
      "Skull crusher",
      "Hammer curl",
    ],
  },
  Lower: {
    coreExercises: ["Barbell squat", "Romanian deadlift"],
    optionalExercises: [
      "Leg press",
      "Hip thrust",
      "Standing calf raise",
      "Cable crunch",
    ],
  },
};

// Weekdays use Date#getUTCDay numbering: 0 is Sunday.
export const PROGRAMS = {
  fullBody: {
    sessionNames: ["Full body A", "Full body B"],
    trainingWeekdays: [1, 3, 5],
  },
  pushPullLegs: {
    sessionNames: ["Push", "Pull", "Legs"],
    trainingWeekdays: [1, 2, 3, 4, 5, 6],
  },
  upperLower: {
    sessionNames: ["Upper", "Lower"],
    trainingWeekdays: [1, 2, 4, 5],
  },
};

// Arjun and Maya match the design document's personas; the others add volume and variety.
export const DEMO_LIFTERS = [
  {
    username: "arjun_demo",
    programName: "fullBody",
    weeksOfHistory: 16,
    attendanceProbability: 0.8,
    strengthMultiplier: 0.55,
    neglectedMuscleGroups: [],
  },
  {
    username: "maya_demo",
    programName: "pushPullLegs",
    weeksOfHistory: 60,
    attendanceProbability: 0.8,
    strengthMultiplier: 0.75,
    // Maya's story: she suspects these get skipped, and the breakdown confirms it.
    neglectedMuscleGroups: ["Calves", "Forearms"],
  },
  {
    username: "jordan_demo",
    programName: "upperLower",
    weeksOfHistory: 104,
    attendanceProbability: 0.85,
    strengthMultiplier: 1.1,
    neglectedMuscleGroups: [],
  },
  {
    username: "priya_demo",
    programName: "pushPullLegs",
    weeksOfHistory: 80,
    attendanceProbability: 0.7,
    strengthMultiplier: 0.85,
    neglectedMuscleGroups: ["Core"],
  },
  {
    username: "sam_demo",
    programName: "fullBody",
    weeksOfHistory: 90,
    attendanceProbability: 0.75,
    strengthMultiplier: 0.95,
    neglectedMuscleGroups: ["Glutes"],
  },
];

export const SESSION_NOTES = [
  "Felt strong today",
  "Short on sleep, kept it light",
  "Gym was packed, swapped some machines",
  "New personal best on the first lift",
  "Lower back a little tight, went easy",
  "Great pump, good energy",
  "Rushed session before work",
  "Focused on slow negatives",
];

function formatWeightRange(sets) {
  const weights = sets
    .map((set) => set.weightKilograms)
    .filter((weightKilograms) => weightKilograms !== null);
  if (weights.length === 0) {
    return null;
  }
  const lightest = Math.min(...weights);
  const heaviest = Math.max(...weights);
  return lightest === heaviest
    ? `${lightest} kg`
    : `${lightest}–${heaviest} kg`;
}

// "4 × 8 · 60 kg" when every set has the same reps, otherwise "8, 8, 6 reps · 60–65 kg".
export function summarizeSets(sets) {
  const repetitionCounts = sets.map((set) => set.repetitionCount);
  const hasSameRepetitions = repetitionCounts.every(
    (repetitionCount) => repetitionCount === repetitionCounts[0],
  );
  const repetitionSummary = hasSameRepetitions
    ? `${sets.length} × ${repetitionCounts[0]}`
    : `${repetitionCounts.join(", ")} reps`;
  const weightSummary = formatWeightRange(sets);
  return weightSummary
    ? `${repetitionSummary} · ${weightSummary}`
    : repetitionSummary;
}

export function countSets(workout) {
  return workout.exercises.reduce(
    (setCount, exercise) => setCount + exercise.sets.length,
    0,
  );
}

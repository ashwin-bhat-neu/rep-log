import { MUSCLE_GROUPS } from "./muscleGroups.js";

function muscleGroupsWithSetCount(muscleGroupTotals, setCount) {
  return muscleGroupTotals
    .filter((totals) => totals.setCount === setCount)
    .map((totals) => totals.muscleGroup);
}

// Every muscle group is listed, including ones with no sets, so gaps are visible rather than missing.
// Most and least trained only compare groups that were trained; ties list every tied group.
export function computeMuscleGroupBreakdown(workouts) {
  const totalsByMuscleGroup = new Map(
    MUSCLE_GROUPS.map((muscleGroup) => [
      muscleGroup,
      { muscleGroup, exerciseCount: 0, setCount: 0 },
    ]),
  );
  let exerciseCount = 0;
  let setCount = 0;
  for (const workout of workouts) {
    for (const exercise of workout.exercises) {
      const totals = totalsByMuscleGroup.get(exercise.targetMuscleGroup);
      if (!totals) {
        continue;
      }
      totals.exerciseCount += 1;
      totals.setCount += exercise.sets.length;
      exerciseCount += 1;
      setCount += exercise.sets.length;
    }
  }

  const muscleGroupTotals = [...totalsByMuscleGroup.values()];
  const trainedSetCounts = muscleGroupTotals
    .map((totals) => totals.setCount)
    .filter((groupSetCount) => groupSetCount > 0);
  const hasTraining = trainedSetCounts.length > 0;
  return {
    workoutCount: workouts.length,
    exerciseCount,
    setCount,
    muscleGroups: muscleGroupTotals,
    mostTrainedMuscleGroups: hasTraining
      ? muscleGroupsWithSetCount(
          muscleGroupTotals,
          Math.max(...trainedSetCounts),
        )
      : [],
    leastTrainedMuscleGroups: hasTraining
      ? muscleGroupsWithSetCount(
          muscleGroupTotals,
          Math.min(...trainedSetCounts),
        )
      : [],
    untrainedMuscleGroups: muscleGroupsWithSetCount(muscleGroupTotals, 0),
  };
}

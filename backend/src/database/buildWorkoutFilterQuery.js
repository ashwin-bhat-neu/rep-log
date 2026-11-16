function escapeRegularExpression(text) {
  return text.replace(/[.*+?^${}()|[\]\\]/g, "\\$&");
}

// Dates are YYYY-MM-DD strings, so string comparison orders them correctly.
export function buildWorkoutFilterQuery(
  userId,
  { fromDate, toDate, exerciseNameFragment },
) {
  const query = { userId };
  if (fromDate || toDate) {
    query.performedOn = {};
    if (fromDate) {
      query.performedOn.$gte = fromDate;
    }
    if (toDate) {
      query.performedOn.$lte = toDate;
    }
  }
  if (exerciseNameFragment) {
    query["exercises.exerciseName"] = {
      $regex: escapeRegularExpression(exerciseNameFragment),
      $options: "i",
    };
  }
  return query;
}

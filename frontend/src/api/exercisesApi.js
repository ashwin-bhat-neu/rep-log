import { requestJson } from "./requestJson.js";

// queryString uses the API's own parameter names: search, muscleGroup, equipment, difficulty, page.
export function fetchExercises(queryString, signal) {
  return requestJson(`/api/exercises?${queryString}`, { signal });
}

export function fetchExercise(exerciseId, signal) {
  return requestJson(`/api/exercises/${encodeURIComponent(exerciseId)}`, {
    signal,
  });
}

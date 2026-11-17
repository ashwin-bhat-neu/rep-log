import { requestJson } from "./requestJson.js";

const WORKOUTS_PATH = "/api/workouts";

function workoutPath(workoutId) {
  return `${WORKOUTS_PATH}/${encodeURIComponent(workoutId)}`;
}

// filters holds the URL query values (from, to, exercise, page); empty ones are left out.
export function fetchWorkouts(filters, signal) {
  const query = new URLSearchParams(
    Object.entries(filters).filter(([, value]) => value),
  );
  const queryString = query.size > 0 ? `?${query}` : "";
  return requestJson(`${WORKOUTS_PATH}${queryString}`, { signal });
}

export async function fetchWorkout(workoutId, signal) {
  const { workout } = await requestJson(workoutPath(workoutId), { signal });
  return workout;
}

export function createWorkout(workout) {
  return requestJson(WORKOUTS_PATH, { method: "POST", body: workout });
}

export function updateWorkout(workoutId, workout) {
  return requestJson(workoutPath(workoutId), { method: "PUT", body: workout });
}

export function deleteWorkout(workoutId) {
  return requestJson(workoutPath(workoutId), { method: "DELETE" });
}

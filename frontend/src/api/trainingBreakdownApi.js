import { requestJson } from "./requestJson.js";

export function fetchTrainingBreakdown({ fromDate, toDate }, signal) {
  const query = new URLSearchParams({ from: fromDate, to: toDate });
  return requestJson(`/api/training-breakdown?${query}`, { signal });
}

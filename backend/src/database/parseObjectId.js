import { ObjectId } from "mongodb";

const OBJECT_ID_PATTERN = /^[0-9a-f]{24}$/i;

// Returns null for anything that isn't a 24-character hex ID, so bad IDs become 404s instead of errors.
export function parseObjectId(value) {
  return typeof value === "string" && OBJECT_ID_PATTERN.test(value)
    ? new ObjectId(value)
    : null;
}

import express from "express";
import { computeMuscleGroupBreakdown } from "../domain/computeMuscleGroupBreakdown.js";
import { parseObjectId } from "../database/parseObjectId.js";
import { listWorkoutsInRange } from "../database/workoutsCollection.js";
import { requireAuthentication } from "../middleware/requireAuthentication.js";
import { validateTrainingBreakdownQuery } from "../validation/trainingBreakdownQueryValidation.js";

const router = express.Router();

router.use(requireAuthentication);

router.get("/", async (request, response) => {
  const { error, range } = validateTrainingBreakdownQuery(request.query);
  if (error) {
    response.status(400).json({ error });
    return;
  }
  const workouts = await listWorkoutsInRange(
    parseObjectId(request.user.id),
    range,
  );
  response.json({
    from: range.fromDate,
    to: range.toDate,
    ...computeMuscleGroupBreakdown(workouts),
  });
});

export default router;

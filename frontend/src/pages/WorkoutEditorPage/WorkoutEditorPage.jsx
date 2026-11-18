import { useCallback } from "react";
import { Link, useNavigate, useParams } from "react-router";
import {
  createWorkout,
  fetchWorkout,
  updateWorkout,
} from "../../api/workoutsApi.js";
import WorkoutForm from "../../components/WorkoutForm/WorkoutForm.jsx";
import useApiRequest from "../../hooks/useApiRequest.js";
import "../../styles/controls.css";
import "./WorkoutEditorPage.css";

const NOT_FOUND_STATUS = 404;

// One page for both /workouts/new and /workouts/:workoutId/edit.
export default function WorkoutEditorPage() {
  const { workoutId } = useParams();
  const navigate = useNavigate();
  const isEditing = workoutId !== undefined;

  const loadWorkout = useCallback(
    (signal) =>
      isEditing ? fetchWorkout(workoutId, signal) : Promise.resolve(null),
    [isEditing, workoutId],
  );
  const { data: savedWorkout, error, isLoading } = useApiRequest(loadWorkout);

  async function saveWorkout(workout) {
    if (isEditing) {
      await updateWorkout(workoutId, workout);
    } else {
      await createWorkout(workout);
    }
    navigate("/workouts");
  }

  function renderContent() {
    if (isLoading) {
      return <p className="workout-editor-page-message">Loading…</p>;
    }
    if (error?.status === NOT_FOUND_STATUS) {
      return (
        <p className="workout-editor-page-message">
          This workout doesn&apos;t exist anymore.{" "}
          <Link to="/workouts">Go back to your workouts</Link>.
        </p>
      );
    }
    if (error) {
      return (
        <p className="error-message" role="alert">
          Couldn&apos;t load this workout. {error.message}
        </p>
      );
    }
    return (
      <WorkoutForm
        initialWorkout={savedWorkout}
        submitLabel={isEditing ? "Save changes" : "Save workout"}
        onSubmit={saveWorkout}
        onCancel={() => navigate("/workouts")}
      />
    );
  }

  return (
    <main className="workout-editor-page">
      <h1>{isEditing ? "Edit workout" : "Log workout"}</h1>
      {renderContent()}
    </main>
  );
}

WorkoutEditorPage.propTypes = {};

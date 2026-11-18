import PropTypes from "prop-types";
import { useId, useState } from "react";
import {
  createExerciseRow,
  toWorkoutFormState,
  toWorkoutPayload,
} from "../../utilities/workoutFormState.js";
import ExerciseFieldset from "../ExerciseFieldset/ExerciseFieldset.jsx";
import "../../styles/controls.css";
import "./WorkoutForm.css";

const MAXIMUM_NOTES_LENGTH = 500;
const MAXIMUM_EXERCISES_PER_WORKOUT = 20;

// Used for both logging and editing; initialWorkout fills the fields in when editing.
export default function WorkoutForm({
  initialWorkout = null,
  submitLabel,
  onSubmit,
  onCancel,
}) {
  const [formState, setFormState] = useState(() =>
    toWorkoutFormState(initialWorkout),
  );
  const [errorMessage, setErrorMessage] = useState("");
  const [isSaving, setIsSaving] = useState(false);
  const dateInputId = useId();
  const notesInputId = useId();

  function updateField(fieldName, value) {
    setFormState((current) => ({ ...current, [fieldName]: value }));
  }

  function updateExercise(exerciseIndex, updatedExercise) {
    setFormState((current) => ({
      ...current,
      exercises: current.exercises.map((exercise, index) =>
        index === exerciseIndex ? updatedExercise : exercise,
      ),
    }));
  }

  function removeExercise(exerciseIndex) {
    setFormState((current) => ({
      ...current,
      exercises: current.exercises.filter(
        (exercise, index) => index !== exerciseIndex,
      ),
    }));
  }

  function addExercise() {
    setFormState((current) => ({
      ...current,
      exercises: [...current.exercises, createExerciseRow()],
    }));
  }

  async function handleSubmit(event) {
    event.preventDefault();
    setErrorMessage("");
    setIsSaving(true);
    try {
      await onSubmit(toWorkoutPayload(formState));
    } catch (error) {
      setErrorMessage(error.message);
      setIsSaving(false);
    }
  }

  return (
    <form className="workout-form" onSubmit={handleSubmit}>
      <div className="workout-form-fields">
        <div>
          <label className="field-label" htmlFor={dateInputId}>
            Date
          </label>
          <input
            id={dateInputId}
            className="field-input"
            type="date"
            required
            value={formState.performedOn}
            onChange={(event) => updateField("performedOn", event.target.value)}
          />
        </div>
        <div>
          <label className="field-label" htmlFor={notesInputId}>
            Notes
          </label>
          <textarea
            id={notesInputId}
            className="field-input workout-form-notes"
            maxLength={MAXIMUM_NOTES_LENGTH}
            placeholder="Optional, like how the session felt"
            value={formState.notes}
            onChange={(event) => updateField("notes", event.target.value)}
          />
        </div>
      </div>

      {formState.exercises.map((exercise, exerciseIndex) => (
        <ExerciseFieldset
          key={exercise.key}
          exercise={exercise}
          exerciseNumber={exerciseIndex + 1}
          canRemove={formState.exercises.length > 1}
          onChange={(updatedExercise) =>
            updateExercise(exerciseIndex, updatedExercise)
          }
          onRemove={() => removeExercise(exerciseIndex)}
        />
      ))}

      <button
        className="button workout-form-add-exercise"
        type="button"
        disabled={formState.exercises.length >= MAXIMUM_EXERCISES_PER_WORKOUT}
        onClick={addExercise}
      >
        + Add exercise
      </button>

      {errorMessage && (
        <p className="error-message" role="alert">
          {errorMessage}
        </p>
      )}

      <div className="workout-form-actions">
        <button
          className="button button-primary"
          type="submit"
          disabled={isSaving}
        >
          {isSaving ? "Saving…" : submitLabel}
        </button>
        <button className="button" type="button" onClick={onCancel}>
          Cancel
        </button>
      </div>
    </form>
  );
}

WorkoutForm.propTypes = {
  initialWorkout: PropTypes.shape({
    performedOn: PropTypes.string.isRequired,
    notes: PropTypes.string.isRequired,
    exercises: PropTypes.arrayOf(PropTypes.object).isRequired,
  }),
  submitLabel: PropTypes.string.isRequired,
  onSubmit: PropTypes.func.isRequired,
  onCancel: PropTypes.func.isRequired,
};

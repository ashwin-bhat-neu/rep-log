import PropTypes from "prop-types";
import { useId } from "react";
import { MUSCLE_GROUPS } from "../../constants/exerciseCategories.js";
import { createSetRow } from "../../utilities/workoutFormState.js";
import SetRow from "../SetRow/SetRow.jsx";
import "../../styles/controls.css";
import "./ExerciseFieldset.css";

const MAXIMUM_EXERCISE_NAME_LENGTH = 80;
const MAXIMUM_SETS_PER_EXERCISE = 20;

export default function ExerciseFieldset({
  exercise,
  exerciseNumber,
  canRemove,
  onChange,
  onRemove,
}) {
  const nameInputId = useId();
  const muscleGroupSelectId = useId();

  function updateSet(setIndex, updatedSet) {
    onChange({
      ...exercise,
      sets: exercise.sets.map((set, index) =>
        index === setIndex ? updatedSet : set,
      ),
    });
  }

  function removeSet(setIndex) {
    onChange({
      ...exercise,
      sets: exercise.sets.filter((set, index) => index !== setIndex),
    });
  }

  // A new set starts with the previous set's numbers, since most sets repeat them.
  function addSet() {
    onChange({
      ...exercise,
      sets: [...exercise.sets, createSetRow(exercise.sets.at(-1))],
    });
  }

  return (
    <fieldset className="exercise-fieldset">
      <legend className="exercise-fieldset-legend">
        Exercise {exerciseNumber}
      </legend>
      <button
        className="button button-danger exercise-fieldset-remove"
        type="button"
        disabled={!canRemove}
        onClick={onRemove}
      >
        Remove exercise
      </button>
      <div className="exercise-fieldset-fields">
        <div>
          <label className="field-label" htmlFor={nameInputId}>
            Exercise name
          </label>
          {/* review: logging workouts but connecting the form to the library or templates would keep exercise names consistent*/}
          <input
            id={nameInputId}
            className="field-input"
            required
            maxLength={MAXIMUM_EXERCISE_NAME_LENGTH}
            placeholder="Barbell squat"
            value={exercise.exerciseName}
            onChange={(event) =>
              onChange({ ...exercise, exerciseName: event.target.value })
            }
          />
        </div>
        <div>
          <label className="field-label" htmlFor={muscleGroupSelectId}>
            Target muscle group
          </label>
          <select
            id={muscleGroupSelectId}
            className="field-input"
            required
            value={exercise.targetMuscleGroup}
            onChange={(event) =>
              onChange({ ...exercise, targetMuscleGroup: event.target.value })
            }
          >
            <option value="" disabled>
              Choose a muscle group
            </option>
            {MUSCLE_GROUPS.map((muscleGroup) => (
              <option key={muscleGroup} value={muscleGroup}>
                {muscleGroup}
              </option>
            ))}
          </select>
        </div>
      </div>
      <div className="exercise-fieldset-set-header" aria-hidden="true">
        <span>Set</span>
        <span>Reps</span>
        <span>Weight (kg)</span>
      </div>
      <div className="exercise-fieldset-sets">
        {exercise.sets.map((set, setIndex) => (
          <SetRow
            key={set.key}
            set={set}
            setNumber={setIndex + 1}
            exerciseNumber={exerciseNumber}
            canRemove={exercise.sets.length > 1}
            onChange={(updatedSet) => updateSet(setIndex, updatedSet)}
            onRemove={() => removeSet(setIndex)}
          />
        ))}
      </div>
      <button
        className="button exercise-fieldset-add-set"
        type="button"
        disabled={exercise.sets.length >= MAXIMUM_SETS_PER_EXERCISE}
        onClick={addSet}
      >
        + Add set
      </button>
    </fieldset>
  );
}

ExerciseFieldset.propTypes = {
  exercise: PropTypes.shape({
    exerciseName: PropTypes.string.isRequired,
    targetMuscleGroup: PropTypes.string.isRequired,
    sets: PropTypes.arrayOf(PropTypes.shape({ key: PropTypes.number }))
      .isRequired,
  }).isRequired,
  exerciseNumber: PropTypes.number.isRequired,
  canRemove: PropTypes.bool.isRequired,
  onChange: PropTypes.func.isRequired,
  onRemove: PropTypes.func.isRequired,
};

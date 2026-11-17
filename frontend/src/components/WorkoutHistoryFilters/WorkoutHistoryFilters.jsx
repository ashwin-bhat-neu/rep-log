import PropTypes from "prop-types";
import { useId, useState } from "react";
import "../../styles/controls.css";
import "./WorkoutHistoryFilters.css";

const MAXIMUM_EXERCISE_NAME_LENGTH = 80;

// Edits stay local until Apply, so typing doesn't fetch on every keystroke.
export default function WorkoutHistoryFilters({
  appliedFilters,
  onApply,
  onClear,
}) {
  const [fromDate, setFromDate] = useState(appliedFilters.from);
  const [toDate, setToDate] = useState(appliedFilters.to);
  const [exerciseName, setExerciseName] = useState(appliedFilters.exercise);
  const fromInputId = useId();
  const toInputId = useId();
  const exerciseInputId = useId();

  function handleSubmit(event) {
    event.preventDefault();
    onApply({ from: fromDate, to: toDate, exercise: exerciseName.trim() });
  }

  function handleClear() {
    setFromDate("");
    setToDate("");
    setExerciseName("");
    onClear();
  }

  return (
    <form
      className="workout-history-filters"
      role="search"
      aria-label="Filter workouts"
      onSubmit={handleSubmit}
    >
      <div>
        <label className="field-label" htmlFor={fromInputId}>
          From
        </label>
        <input
          id={fromInputId}
          className="field-input"
          type="date"
          max={toDate || undefined}
          value={fromDate}
          onChange={(event) => setFromDate(event.target.value)}
        />
      </div>
      <div>
        <label className="field-label" htmlFor={toInputId}>
          To
        </label>
        <input
          id={toInputId}
          className="field-input"
          type="date"
          min={fromDate || undefined}
          value={toDate}
          onChange={(event) => setToDate(event.target.value)}
        />
      </div>
      <div>
        <label className="field-label" htmlFor={exerciseInputId}>
          Exercise
        </label>
        <input
          id={exerciseInputId}
          className="field-input"
          type="search"
          maxLength={MAXIMUM_EXERCISE_NAME_LENGTH}
          placeholder="Any exercise"
          value={exerciseName}
          onChange={(event) => setExerciseName(event.target.value)}
        />
      </div>
      <div className="workout-history-filters-actions">
        <button className="button button-primary" type="submit">
          Apply
        </button>
        <button className="button" type="button" onClick={handleClear}>
          Clear
        </button>
      </div>
    </form>
  );
}

WorkoutHistoryFilters.propTypes = {
  appliedFilters: PropTypes.shape({
    from: PropTypes.string.isRequired,
    to: PropTypes.string.isRequired,
    exercise: PropTypes.string.isRequired,
  }).isRequired,
  onApply: PropTypes.func.isRequired,
  onClear: PropTypes.func.isRequired,
};

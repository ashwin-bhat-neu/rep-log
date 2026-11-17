import PropTypes from "prop-types";
import { Link } from "react-router";
import { formatCalendarDate } from "../../utilities/calendarDates.js";
import { countSets, summarizeSets } from "../../utilities/summarizeSets.js";
import MuscleGroupTag from "../MuscleGroupTag/MuscleGroupTag.jsx";
import "../../styles/controls.css";
import "./WorkoutCard.css";

function pluralize(count, singular) {
  return `${count} ${singular}${count === 1 ? "" : "s"}`;
}

// With an exercise filter, only the matching exercises are listed so their sets line up across cards.
export default function WorkoutCard({
  workout,
  exerciseNameFragment = "",
  onDeleteRequest,
}) {
  const setCount = countSets(workout);
  const normalizedFragment = exerciseNameFragment.toLowerCase();
  const visibleExercises = normalizedFragment
    ? workout.exercises.filter((exercise) =>
        exercise.exerciseName.toLowerCase().includes(normalizedFragment),
      )
    : workout.exercises;
  const summary =
    visibleExercises.length < workout.exercises.length
      ? `${visibleExercises.length} of ${pluralize(workout.exercises.length, "exercise")} shown`
      : `${pluralize(workout.exercises.length, "exercise")} · ${pluralize(setCount, "set")}`;
  return (
    <li className="workout-card">
      <div className="workout-card-header">
        <div>
          <h2 className="workout-card-date">
            {formatCalendarDate(workout.performedOn)}
          </h2>
          {workout.notes && (
            <p className="workout-card-notes">{workout.notes}</p>
          )}
        </div>
        <div className="workout-card-actions">
          <span className="workout-card-summary">{summary}</span>
          <Link className="button" to={`/workouts/${workout.id}/edit`}>
            Edit
          </Link>
          <button
            className="button button-danger"
            type="button"
            onClick={() => onDeleteRequest(workout)}
          >
            Delete
          </button>
        </div>
      </div>
      <ul className="workout-card-exercises">
        {visibleExercises.map((exercise, exerciseIndex) => (
          <li
            key={`${exerciseIndex}-${exercise.exerciseName}`}
            className="workout-card-exercise"
          >
            <span className="workout-card-exercise-name">
              {exercise.exerciseName}
            </span>
            <span>
              <MuscleGroupTag muscleGroup={exercise.targetMuscleGroup} />
            </span>
            <span className="workout-card-set-summary">
              {summarizeSets(exercise.sets)}
            </span>
          </li>
        ))}
      </ul>
    </li>
  );
}

WorkoutCard.propTypes = {
  workout: PropTypes.shape({
    id: PropTypes.string.isRequired,
    performedOn: PropTypes.string.isRequired,
    notes: PropTypes.string.isRequired,
    exercises: PropTypes.arrayOf(
      PropTypes.shape({
        exerciseName: PropTypes.string.isRequired,
        targetMuscleGroup: PropTypes.string.isRequired,
        sets: PropTypes.arrayOf(
          PropTypes.shape({
            repetitionCount: PropTypes.number.isRequired,
            weightKilograms: PropTypes.number,
          }),
        ).isRequired,
      }),
    ).isRequired,
  }).isRequired,
  exerciseNameFragment: PropTypes.string,
  onDeleteRequest: PropTypes.func.isRequired,
};

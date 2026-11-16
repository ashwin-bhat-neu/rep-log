import PropTypes from "prop-types";
import { Link } from "react-router";
import DifficultyBadge from "../DifficultyBadge/DifficultyBadge.jsx";
import MuscleGroupTag from "../MuscleGroupTag/MuscleGroupTag.jsx";
import "../../styles/controls.css";
import "./ExerciseListItem.css";

// librarySearch is the library's current query string, so the detail page can link back to the same results.
export default function ExerciseListItem({ exercise, librarySearch }) {
  const { secondaryMuscleGroups } = exercise;
  return (
    <li className="exercise-list-item">
      <div className="exercise-list-item-name-cell">
        <Link
          className="exercise-list-item-name"
          to={`/exercises/${exercise._id}`}
          state={{ librarySearch }}
        >
          {exercise.name}
        </Link>
        {secondaryMuscleGroups.length > 0 && (
          <p className="exercise-list-item-secondary">
            Also works {secondaryMuscleGroups.join(", ").toLowerCase()}
          </p>
        )}
      </div>
      <MuscleGroupTag muscleGroup={exercise.primaryMuscleGroup} />
      <span className="exercise-list-item-equipment">{exercise.equipment}</span>
      <DifficultyBadge difficulty={exercise.difficulty} />
    </li>
  );
}

ExerciseListItem.propTypes = {
  exercise: PropTypes.shape({
    _id: PropTypes.string.isRequired,
    name: PropTypes.string.isRequired,
    primaryMuscleGroup: PropTypes.string.isRequired,
    secondaryMuscleGroups: PropTypes.arrayOf(PropTypes.string).isRequired,
    equipment: PropTypes.string.isRequired,
    difficulty: PropTypes.string.isRequired,
  }).isRequired,
  librarySearch: PropTypes.string.isRequired,
};

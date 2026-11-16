import PropTypes from "prop-types";
import "../../styles/controls.css";
import "./MuscleGroupTag.css";

export default function MuscleGroupTag({ muscleGroup, isSecondary = false }) {
  const className = isSecondary
    ? "muscle-group-tag muscle-group-tag-secondary"
    : "muscle-group-tag";
  return <span className={className}>{muscleGroup}</span>;
}

MuscleGroupTag.propTypes = {
  muscleGroup: PropTypes.string.isRequired,
  isSecondary: PropTypes.bool,
};

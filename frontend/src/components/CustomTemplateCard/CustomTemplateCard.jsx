import PropTypes from "prop-types";
import { Link } from "react-router";
import MuscleGroupTag from "../MuscleGroupTag/MuscleGroupTag.jsx";
import "../../styles/controls.css";
import "./CustomTemplateCard.css";

export default function CustomTemplateCard({ template, onDeleteRequest }) {
  const { defaultSetCount, defaultRepetitionCount } = template;
  return (
    <li className="custom-template-card">
      <div className="custom-template-card-header">
        <h2 className="custom-template-card-name">{template.name}</h2>
        <div className="custom-template-card-actions">
          <Link className="button" to={`/templates/${template._id}/edit`}>
            Edit
          </Link>
          <button
            className="button button-danger"
            type="button"
            onClick={() => onDeleteRequest(template)}
          >
            Delete
          </button>
        </div>
      </div>
      <p className="custom-template-card-prescription">
        {defaultSetCount} {defaultSetCount === 1 ? "set" : "sets"} ×{" "}
        {defaultRepetitionCount} {defaultRepetitionCount === 1 ? "rep" : "reps"}
      </p>
      <ul className="custom-template-card-muscle-groups" aria-label="Targets">
        {template.targetMuscleGroups.map((muscleGroup) => (
          <li key={muscleGroup}>
            <MuscleGroupTag muscleGroup={muscleGroup} />
          </li>
        ))}
      </ul>
      {template.notes && (
        <p className="custom-template-card-notes">{template.notes}</p>
      )}
    </li>
  );
}

CustomTemplateCard.propTypes = {
  template: PropTypes.shape({
    _id: PropTypes.string.isRequired,
    name: PropTypes.string.isRequired,
    targetMuscleGroups: PropTypes.arrayOf(PropTypes.string).isRequired,
    defaultSetCount: PropTypes.number.isRequired,
    defaultRepetitionCount: PropTypes.number.isRequired,
    notes: PropTypes.string,
  }).isRequired,
  onDeleteRequest: PropTypes.func.isRequired,
};

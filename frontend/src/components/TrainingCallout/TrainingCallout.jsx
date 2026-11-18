import PropTypes from "prop-types";
import "./TrainingCallout.css";

export default function TrainingCallout({
  label,
  muscleGroups,
  detail,
  emptyText,
  needsAttention = false,
}) {
  const className = needsAttention
    ? "training-callout training-callout-attention"
    : "training-callout";
  return (
    <div className={className}>
      <p className="training-callout-label">{label}</p>
      <p className="training-callout-muscle-groups">
        {muscleGroups.length > 0 ? muscleGroups.join(", ") : emptyText}
      </p>
      {muscleGroups.length > 0 && (
        <p className="training-callout-detail">{detail}</p>
      )}
    </div>
  );
}

TrainingCallout.propTypes = {
  label: PropTypes.string.isRequired,
  muscleGroups: PropTypes.arrayOf(PropTypes.string).isRequired,
  detail: PropTypes.string.isRequired,
  emptyText: PropTypes.string.isRequired,
  needsAttention: PropTypes.bool,
};

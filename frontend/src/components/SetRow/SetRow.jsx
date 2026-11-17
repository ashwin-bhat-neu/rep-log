import PropTypes from "prop-types";
import "../../styles/controls.css";
import "./SetRow.css";

const MAXIMUM_REPETITION_COUNT = 100;
const MAXIMUM_WEIGHT_KILOGRAMS = 1000;

export default function SetRow({
  set,
  setNumber,
  exerciseNumber,
  canRemove,
  onChange,
  onRemove,
}) {
  const setLabel = `Exercise ${exerciseNumber}, set ${setNumber}`;
  return (
    <div className="set-row">
      <span className="set-row-number" aria-hidden="true">
        {setNumber}
      </span>
      <input
        className="field-input"
        type="number"
        inputMode="numeric"
        min="1"
        max={MAXIMUM_REPETITION_COUNT}
        step="1"
        required
        aria-label={`${setLabel} reps`}
        value={set.repetitionCount}
        onChange={(event) =>
          onChange({ ...set, repetitionCount: event.target.value })
        }
      />
      <input
        className="field-input"
        type="number"
        inputMode="decimal"
        min="0"
        max={MAXIMUM_WEIGHT_KILOGRAMS}
        step="any"
        placeholder="Bodyweight"
        aria-label={`${setLabel} weight in kilograms`}
        value={set.weightKilograms}
        onChange={(event) =>
          onChange({ ...set, weightKilograms: event.target.value })
        }
      />
      <button
        className="button set-row-remove"
        type="button"
        disabled={!canRemove}
        aria-label={`Remove ${setLabel.toLowerCase()}`}
        onClick={onRemove}
      >
        Remove
      </button>
    </div>
  );
}

SetRow.propTypes = {
  set: PropTypes.shape({
    repetitionCount: PropTypes.oneOfType([PropTypes.string, PropTypes.number])
      .isRequired,
    weightKilograms: PropTypes.oneOfType([PropTypes.string, PropTypes.number])
      .isRequired,
  }).isRequired,
  setNumber: PropTypes.number.isRequired,
  exerciseNumber: PropTypes.number.isRequired,
  canRemove: PropTypes.bool.isRequired,
  onChange: PropTypes.func.isRequired,
  onRemove: PropTypes.func.isRequired,
};

import PropTypes from "prop-types";
import "./PeriodToggle.css";

export default function PeriodToggle({ periods, selectedPeriod, onChange }) {
  return (
    <div className="period-toggle" role="group" aria-label="Time period">
      {periods.map((period) => (
        <button
          key={period.value}
          type="button"
          className="period-toggle-option"
          aria-pressed={period.value === selectedPeriod}
          onClick={() => onChange(period.value)}
        >
          {period.label}
        </button>
      ))}
    </div>
  );
}

PeriodToggle.propTypes = {
  periods: PropTypes.arrayOf(
    PropTypes.shape({
      value: PropTypes.string.isRequired,
      label: PropTypes.string.isRequired,
    }),
  ).isRequired,
  selectedPeriod: PropTypes.string.isRequired,
  onChange: PropTypes.func.isRequired,
};

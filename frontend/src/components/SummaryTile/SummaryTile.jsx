import PropTypes from "prop-types";
import "./SummaryTile.css";

export default function SummaryTile({ label, value }) {
  return (
    <div className="summary-tile">
      <dt className="summary-tile-label">{label}</dt>
      <dd className="summary-tile-value">{value}</dd>
    </div>
  );
}

SummaryTile.propTypes = {
  label: PropTypes.string.isRequired,
  value: PropTypes.number.isRequired,
};

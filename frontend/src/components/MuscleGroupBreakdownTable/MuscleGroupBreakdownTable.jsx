import PropTypes from "prop-types";
import "./MuscleGroupBreakdownTable.css";

// The same numbers as the chart, readable without it.
export default function MuscleGroupBreakdownTable({ muscleGroups }) {
  return (
    <table className="muscle-group-breakdown-table">
      <caption className="muscle-group-breakdown-table-caption">
        By muscle group
      </caption>
      <thead>
        <tr>
          <th scope="col">Muscle group</th>
          <th scope="col">Exercises</th>
          <th scope="col">Sets</th>
        </tr>
      </thead>
      <tbody>
        {muscleGroups.map((totals) => (
          <tr key={totals.muscleGroup}>
            <th scope="row">{totals.muscleGroup}</th>
            <td>{totals.exerciseCount}</td>
            <td>{totals.setCount}</td>
          </tr>
        ))}
      </tbody>
    </table>
  );
}

MuscleGroupBreakdownTable.propTypes = {
  muscleGroups: PropTypes.arrayOf(
    PropTypes.shape({
      muscleGroup: PropTypes.string.isRequired,
      exerciseCount: PropTypes.number.isRequired,
      setCount: PropTypes.number.isRequired,
    }),
  ).isRequired,
};

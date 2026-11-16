import PropTypes from "prop-types";
import { useState } from "react";
import {
  DIFFICULTY_LEVELS,
  EQUIPMENT_TYPES,
  MUSCLE_GROUPS,
} from "../../constants/exerciseCategories.js";
import "../../styles/controls.css";
import "./ExerciseFilters.css";

const selectFields = [
  {
    name: "muscleGroup",
    label: "Muscle group",
    anyLabel: "Any muscle group",
    options: MUSCLE_GROUPS,
  },
  {
    name: "equipment",
    label: "Equipment",
    anyLabel: "Any equipment",
    options: EQUIPMENT_TYPES,
  },
  {
    name: "difficulty",
    label: "Difficulty",
    anyLabel: "Any difficulty",
    options: DIFFICULTY_LEVELS,
  },
];

// Edits stay local until Apply, so the list doesn't reload on every keystroke.
export default function ExerciseFilters({ initialFilters, onApply, onClear }) {
  const [filters, setFilters] = useState(initialFilters);

  function updateFilter(event) {
    const { name, value } = event.target;
    setFilters((currentFilters) => ({ ...currentFilters, [name]: value }));
  }

  function handleSubmit(event) {
    event.preventDefault();
    onApply({ ...filters, search: filters.search.trim() });
  }

  return (
    <form
      className="exercise-filters"
      role="search"
      aria-label="Filter exercises"
      onSubmit={handleSubmit}
    >
      <div className="exercise-filters-search">
        <label className="field-label" htmlFor="exercise-filters-search">
          Name
        </label>
        <input
          id="exercise-filters-search"
          className="field-input"
          type="search"
          name="search"
          placeholder="Any exercise"
          maxLength={80}
          value={filters.search}
          onChange={updateFilter}
        />
      </div>
      {selectFields.map(({ name, label, anyLabel, options }) => (
        <div key={name}>
          <label className="field-label" htmlFor={`exercise-filters-${name}`}>
            {label}
          </label>
          <select
            id={`exercise-filters-${name}`}
            className="field-input"
            name={name}
            value={filters[name]}
            onChange={updateFilter}
          >
            <option value="">{anyLabel}</option>
            {options.map((option) => (
              <option key={option} value={option}>
                {option}
              </option>
            ))}
          </select>
        </div>
      ))}
      <div className="exercise-filters-actions">
        <button className="button button-primary" type="submit">
          Apply
        </button>
        <button className="button" type="button" onClick={onClear}>
          Clear
        </button>
      </div>
    </form>
  );
}

ExerciseFilters.propTypes = {
  initialFilters: PropTypes.shape({
    search: PropTypes.string.isRequired,
    muscleGroup: PropTypes.string.isRequired,
    equipment: PropTypes.string.isRequired,
    difficulty: PropTypes.string.isRequired,
  }).isRequired,
  onApply: PropTypes.func.isRequired,
  onClear: PropTypes.func.isRequired,
};

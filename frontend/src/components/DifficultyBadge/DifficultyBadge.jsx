import PropTypes from "prop-types";
import { DIFFICULTY_LEVELS } from "../../constants/exerciseCategories.js";
import "../../styles/controls.css";
import "./DifficultyBadge.css";

// Filled bars give a quick read of difficulty; the word is there for screen readers and clarity.
export default function DifficultyBadge({ difficulty }) {
  const level = DIFFICULTY_LEVELS.indexOf(difficulty) + 1;
  return (
    <span className="difficulty-badge">
      <span className="difficulty-badge-bars" aria-hidden="true">
        {DIFFICULTY_LEVELS.map((levelName, index) => (
          <span
            key={levelName}
            className={
              index < level
                ? "difficulty-badge-bar difficulty-badge-bar-filled"
                : "difficulty-badge-bar"
            }
          />
        ))}
      </span>
      {difficulty}
    </span>
  );
}

DifficultyBadge.propTypes = {
  difficulty: PropTypes.oneOf(DIFFICULTY_LEVELS).isRequired,
};

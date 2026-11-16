import PropTypes from "prop-types";
import { useId } from "react";
import "./FormField.css";

export default function FormField({ label, hint, ...inputProperties }) {
  const inputId = useId();
  const hintId = `${inputId}-hint`;
  return (
    <div className="form-field">
      <label className="form-field-label" htmlFor={inputId}>
        {label}
      </label>
      <input
        id={inputId}
        className="form-field-input"
        aria-describedby={hint ? hintId : undefined}
        {...inputProperties}
      />
      {hint && (
        <p id={hintId} className="form-field-hint">
          {hint}
        </p>
      )}
    </div>
  );
}

FormField.propTypes = {
  label: PropTypes.string.isRequired,
  hint: PropTypes.string,
};

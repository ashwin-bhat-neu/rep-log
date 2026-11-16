import PropTypes from "prop-types";
import { useState } from "react";
import { MUSCLE_GROUPS } from "../../constants/exerciseCategories.js";
import "../../styles/controls.css";
import "./CustomTemplateForm.css";

const NAME_MAX_LENGTH = 80;
const NOTES_MAX_LENGTH = 500;
const SET_COUNT_MAX = 20;
const REPETITION_COUNT_MAX = 100;

// Used for both creating and editing; initialTemplate fills the fields in.
export default function CustomTemplateForm({
  initialTemplate = {},
  submitLabel,
  onSubmit,
  onCancel,
}) {
  const [name, setName] = useState(initialTemplate.name ?? "");
  const [targetMuscleGroups, setTargetMuscleGroups] = useState(
    initialTemplate.targetMuscleGroups ?? [],
  );
  const [setCount, setSetCount] = useState(
    String(initialTemplate.defaultSetCount ?? 3),
  );
  const [repetitionCount, setRepetitionCount] = useState(
    String(initialTemplate.defaultRepetitionCount ?? 10),
  );
  const [notes, setNotes] = useState(initialTemplate.notes ?? "");
  const [errorMessage, setErrorMessage] = useState("");
  const [isSaving, setIsSaving] = useState(false);

  function toggleMuscleGroup(muscleGroup) {
    setErrorMessage("");
    setTargetMuscleGroups((selected) =>
      selected.includes(muscleGroup)
        ? selected.filter((selectedGroup) => selectedGroup !== muscleGroup)
        : [...selected, muscleGroup],
    );
  }

  async function handleSubmit(event) {
    event.preventDefault();
    if (targetMuscleGroups.length === 0) {
      setErrorMessage("Pick at least one target muscle group.");
      return;
    }
    setErrorMessage("");
    setIsSaving(true);
    try {
      await onSubmit({
        name: name.trim(),
        targetMuscleGroups: MUSCLE_GROUPS.filter((muscleGroup) =>
          targetMuscleGroups.includes(muscleGroup),
        ),
        defaultSetCount: Number(setCount),
        defaultRepetitionCount: Number(repetitionCount),
        notes: notes.trim(),
      });
    } catch (error) {
      // On success the page navigates away, so the form only needs to reset itself after a failure.
      setErrorMessage(error.message);
      setIsSaving(false);
    }
  }

  return (
    <form className="custom-template-form" onSubmit={handleSubmit}>
      <div>
        <label className="field-label" htmlFor="custom-template-name">
          Name
        </label>
        <input
          id="custom-template-name"
          className="field-input"
          type="text"
          required
          maxLength={NAME_MAX_LENGTH}
          placeholder="e.g. Banded face pull"
          value={name}
          onChange={(event) => setName(event.target.value)}
        />
      </div>

      <fieldset className="custom-template-form-muscle-groups">
        <legend className="field-label">Target muscle groups</legend>
        <div className="custom-template-form-checkboxes">
          {MUSCLE_GROUPS.map((muscleGroup) => (
            <label key={muscleGroup} className="custom-template-form-checkbox">
              <input
                type="checkbox"
                checked={targetMuscleGroups.includes(muscleGroup)}
                onChange={() => toggleMuscleGroup(muscleGroup)}
              />
              {muscleGroup}
            </label>
          ))}
        </div>
      </fieldset>

      <div className="custom-template-form-numbers">
        <div>
          <label className="field-label" htmlFor="custom-template-sets">
            Default sets
          </label>
          <input
            id="custom-template-sets"
            className="field-input"
            type="number"
            inputMode="numeric"
            required
            min={1}
            max={SET_COUNT_MAX}
            step={1}
            value={setCount}
            onChange={(event) => setSetCount(event.target.value)}
          />
        </div>
        <div>
          <label className="field-label" htmlFor="custom-template-reps">
            Default reps
          </label>
          <input
            id="custom-template-reps"
            className="field-input"
            type="number"
            inputMode="numeric"
            required
            min={1}
            max={REPETITION_COUNT_MAX}
            step={1}
            value={repetitionCount}
            onChange={(event) => setRepetitionCount(event.target.value)}
          />
        </div>
      </div>

      <div>
        <label className="field-label" htmlFor="custom-template-notes">
          Notes <span className="custom-template-form-optional">optional</span>
        </label>
        <textarea
          id="custom-template-notes"
          className="field-input"
          rows={4}
          maxLength={NOTES_MAX_LENGTH}
          placeholder="Setup, cues, or anything you want to remember"
          value={notes}
          onChange={(event) => setNotes(event.target.value)}
        />
        <p className="custom-template-form-counter">
          {notes.length} / {NOTES_MAX_LENGTH}
        </p>
      </div>

      {errorMessage && (
        <p className="error-message" role="alert">
          {errorMessage}
        </p>
      )}

      <div className="custom-template-form-actions">
        <button
          className="button button-primary"
          type="submit"
          disabled={isSaving}
        >
          {isSaving ? "Saving…" : submitLabel}
        </button>
        <button className="button" type="button" onClick={onCancel}>
          Cancel
        </button>
      </div>
    </form>
  );
}

CustomTemplateForm.propTypes = {
  initialTemplate: PropTypes.shape({
    name: PropTypes.string,
    targetMuscleGroups: PropTypes.arrayOf(PropTypes.string),
    defaultSetCount: PropTypes.number,
    defaultRepetitionCount: PropTypes.number,
    notes: PropTypes.string,
  }),
  submitLabel: PropTypes.string.isRequired,
  onSubmit: PropTypes.func.isRequired,
  onCancel: PropTypes.func.isRequired,
};

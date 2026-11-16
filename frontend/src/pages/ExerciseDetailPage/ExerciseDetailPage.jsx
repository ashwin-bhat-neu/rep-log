import { useCallback } from "react";
import { Link, useLocation, useNavigate, useParams } from "react-router";
import { fetchExercise } from "../../api/exercisesApi.js";
import DifficultyBadge from "../../components/DifficultyBadge/DifficultyBadge.jsx";
import MuscleGroupTag from "../../components/MuscleGroupTag/MuscleGroupTag.jsx";
import useApiRequest from "../../hooks/useApiRequest.js";
import "../../styles/controls.css";
import "./ExerciseDetailPage.css";

export default function ExerciseDetailPage() {
  const { exerciseId } = useParams();
  const location = useLocation();
  const navigate = useNavigate();
  const loadExercise = useCallback(
    (signal) => fetchExercise(exerciseId, signal),
    [exerciseId],
  );
  const { data: exercise, error, isLoading } = useApiRequest(loadExercise);
  const libraryPath = `/exercises${location.state?.librarySearch ?? ""}`;

  // Starts a new template with this exercise's name and muscles filled in.
  function saveAsTemplate() {
    navigate("/templates/new", {
      state: {
        templateDraft: {
          name: exercise.name,
          targetMuscleGroups: [
            exercise.primaryMuscleGroup,
            ...exercise.secondaryMuscleGroups,
          ],
        },
      },
    });
  }

  return (
    <main className="exercise-detail-page">
      <Link className="exercise-detail-page-back" to={libraryPath}>
        ← Back to exercise library
      </Link>

      {isLoading && <p className="exercise-detail-page-status">Loading…</p>}

      {!isLoading && error && (
        <div className="exercise-detail-page-status">
          <h1>
            {error.status === 404
              ? "Exercise not found"
              : "Couldn't load this exercise"}
          </h1>
          <p className="exercise-detail-page-muted">
            {error.status === 404
              ? "It may have been removed from the library. Search for it again from the library."
              : error.message}
          </p>
        </div>
      )}

      {!isLoading && exercise && (
        <article className="exercise-detail-page-card">
          <div className="exercise-detail-page-header">
            <h1>{exercise.name}</h1>
            <button
              className="button button-primary"
              type="button"
              onClick={saveAsTemplate}
            >
              Save as custom template
            </button>
          </div>

          <dl className="exercise-detail-page-facts">
            <div>
              <dt>Main target</dt>
              <dd>
                <MuscleGroupTag muscleGroup={exercise.primaryMuscleGroup} />
              </dd>
            </div>
            <div>
              <dt>Also works</dt>
              <dd className="exercise-detail-page-tags">
                {exercise.secondaryMuscleGroups.length > 0
                  ? exercise.secondaryMuscleGroups.map((muscleGroup) => (
                      <MuscleGroupTag
                        key={muscleGroup}
                        muscleGroup={muscleGroup}
                        isSecondary
                      />
                    ))
                  : "Nothing else"}
              </dd>
            </div>
            <div>
              <dt>Equipment</dt>
              <dd>{exercise.equipment}</dd>
            </div>
            <div>
              <dt>Difficulty</dt>
              <dd>
                <DifficultyBadge difficulty={exercise.difficulty} />
              </dd>
            </div>
            <div>
              <dt>Type</dt>
              <dd>
                {exercise.mechanic}
                <span className="exercise-detail-page-muted">
                  {exercise.mechanic === "Compound"
                    ? " (several joints)"
                    : " (one joint)"}
                </span>
              </dd>
            </div>
          </dl>

          <section className="exercise-detail-page-section">
            <h2>About this exercise</h2>
            <p>{exercise.description}</p>
          </section>

          <section className="exercise-detail-page-section">
            <h2>How to do it</h2>
            <ol className="exercise-detail-page-steps">
              {exercise.instructions.map((instruction) => (
                <li key={instruction}>{instruction}</li>
              ))}
            </ol>
          </section>
        </article>
      )}
    </main>
  );
}

ExerciseDetailPage.propTypes = {};

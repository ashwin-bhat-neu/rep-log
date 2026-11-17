import { useCallback, useState } from "react";
import { Link, useSearchParams } from "react-router";
import { deleteWorkout, fetchWorkouts } from "../../api/workoutsApi.js";
import ConfirmationDialog from "../../components/ConfirmationDialog/ConfirmationDialog.jsx";
import PaginationControls from "../../components/PaginationControls/PaginationControls.jsx";
import WorkoutCard from "../../components/WorkoutCard/WorkoutCard.jsx";
import WorkoutHistoryFilters from "../../components/WorkoutHistoryFilters/WorkoutHistoryFilters.jsx";
import useApiRequest from "../../hooks/useApiRequest.js";
import { formatCalendarDate } from "../../utilities/calendarDates.js";
import "../../styles/controls.css";
import "./WorkoutHistoryPage.css";

function pluralizeWorkouts(count) {
  return `${count} workout${count === 1 ? "" : "s"}`;
}

function describeFilteredResults(totalWorkoutCount, appliedFilters) {
  const hasDateRange = appliedFilters.from || appliedFilters.to;
  const scope = appliedFilters.exercise
    ? `with “${appliedFilters.exercise}”`
    : "";
  const range = hasDateRange ? "in this date range" : "";
  return `${pluralizeWorkouts(totalWorkoutCount)} ${[scope, range].filter(Boolean).join(" ")}, newest first`;
}

// Filters and the page number live in the URL, so refresh and the back button keep them.
export default function WorkoutHistoryPage() {
  const [searchParameters, setSearchParameters] = useSearchParams();
  const page = Number(searchParameters.get("page") ?? 1);
  const appliedFilters = {
    from: searchParameters.get("from") ?? "",
    to: searchParameters.get("to") ?? "",
    exercise: searchParameters.get("exercise") ?? "",
  };
  const { from, to, exercise } = appliedFilters;
  const hasFilters = Boolean(from || to || exercise);
  // Bumped after a delete so the current page is fetched again with updated counts.
  const [reloadCount, setReloadCount] = useState(0);
  const [workoutPendingDelete, setWorkoutPendingDelete] = useState(null);
  const [isDeleting, setIsDeleting] = useState(false);
  const [deleteErrorMessage, setDeleteErrorMessage] = useState("");

  const loadWorkouts = useCallback(
    (signal) =>
      fetchWorkouts({ from, to, exercise, page: String(page) }, signal),
    // reloadCount isn't sent; listing it gives a new loader, so the hook fetches again after a delete.
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [from, to, exercise, page, reloadCount],
  );
  const { data, error, isLoading } = useApiRequest(loadWorkouts);

  function updateSearchParameters(filters, nextPage) {
    const entries = Object.entries({ ...filters, page: String(nextPage) });
    setSearchParameters(
      entries.filter(
        ([name, value]) => value && !(name === "page" && value === "1"),
      ),
    );
  }

  function goToPage(nextPage) {
    updateSearchParameters(appliedFilters, nextPage);
  }

  function applyFilters(filters) {
    updateSearchParameters(filters, 1);
  }

  async function confirmDelete() {
    setIsDeleting(true);
    setDeleteErrorMessage("");
    try {
      await deleteWorkout(workoutPendingDelete.id);
      const wasLastOnPage = data.workouts.length === 1 && page > 1;
      if (wasLastOnPage) {
        goToPage(page - 1);
      } else {
        setReloadCount((count) => count + 1);
      }
    } catch (deleteError) {
      setDeleteErrorMessage(
        `Couldn't delete this workout. ${deleteError.message}`,
      );
    }
    setIsDeleting(false);
    setWorkoutPendingDelete(null);
  }

  // While a new request runs, data still holds the previous result; empty states wait for the new one.
  const hasNoResults = !isLoading && data?.totalWorkoutCount === 0;
  const hasNoWorkouts = hasNoResults && !hasFilters;
  const hasNoMatches = hasNoResults && hasFilters;

  return (
    <main className="workout-history-page">
      <div className="workout-history-page-heading">
        <h1>Workout history</h1>
        <Link className="button button-primary" to="/workouts/new">
          Log workout
        </Link>
      </div>

      {!hasNoWorkouts && (
        <WorkoutHistoryFilters
          key={`${from}|${to}|${exercise}`}
          appliedFilters={appliedFilters}
          onApply={applyFilters}
          onClear={() => applyFilters({})}
        />
      )}

      {error && (
        <p className="error-message" role="alert">
          Couldn&apos;t load your workouts. {error.message}
        </p>
      )}
      {deleteErrorMessage && (
        <p className="error-message" role="alert">
          {deleteErrorMessage}
        </p>
      )}

      {!data && !error && (
        <p className="workout-history-page-message">Loading workouts…</p>
      )}

      {hasNoWorkouts && (
        <div className="workout-history-page-empty">
          <h2>No workouts yet</h2>
          <p>
            Log a session with its exercises, sets, and reps, and it will show
            up here.
          </p>
          <Link className="button button-primary" to="/workouts/new">
            Log your first workout
          </Link>
        </div>
      )}

      {hasNoMatches && (
        <div className="workout-history-page-empty">
          <h2>No workouts match these filters</h2>
          <p>Try a wider date range or a shorter part of the exercise name.</p>
          <button
            className="button"
            type="button"
            onClick={() => applyFilters({})}
          >
            Clear filters
          </button>
        </div>
      )}

      {data && data.totalWorkoutCount > 0 && (
        <>
          {hasFilters && (
            <p className="workout-history-page-message" aria-live="polite">
              {describeFilteredResults(data.totalWorkoutCount, appliedFilters)}
            </p>
          )}
          <ul
            className="workout-history-page-list"
            aria-busy={isLoading ? "true" : "false"}
          >
            {data.workouts.map((workout) => (
              <WorkoutCard
                key={workout.id}
                workout={workout}
                exerciseNameFragment={exercise}
                onDeleteRequest={setWorkoutPendingDelete}
              />
            ))}
          </ul>
          <PaginationControls
            page={data.page}
            pageCount={data.pageCount}
            onPageChange={goToPage}
          />
        </>
      )}

      <ConfirmationDialog
        isOpen={workoutPendingDelete !== null}
        title="Delete this workout?"
        message={
          workoutPendingDelete
            ? `Your workout from ${formatCalendarDate(workoutPendingDelete.performedOn)} will be removed for good. This can't be undone.`
            : ""
        }
        confirmLabel={isDeleting ? "Deleting…" : "Delete"}
        isConfirming={isDeleting}
        onConfirm={confirmDelete}
        onCancel={() => setWorkoutPendingDelete(null)}
      />
    </main>
  );
}

WorkoutHistoryPage.propTypes = {};

import { useCallback, useState } from "react";
import { Link, useSearchParams } from "react-router";
import { deleteWorkout, fetchWorkouts } from "../../api/workoutsApi.js";
import ConfirmationDialog from "../../components/ConfirmationDialog/ConfirmationDialog.jsx";
import PaginationControls from "../../components/PaginationControls/PaginationControls.jsx";
import WorkoutCard from "../../components/WorkoutCard/WorkoutCard.jsx";
import useApiRequest from "../../hooks/useApiRequest.js";
import { formatCalendarDate } from "../../utilities/calendarDates.js";
import "../../styles/controls.css";
import "./WorkoutHistoryPage.css";

export default function WorkoutHistoryPage() {
  const [searchParameters, setSearchParameters] = useSearchParams();
  const page = Number(searchParameters.get("page") ?? 1);
  // Bumped after a delete so the current page is fetched again with updated counts.
  const [reloadCount, setReloadCount] = useState(0);
  const [workoutPendingDelete, setWorkoutPendingDelete] = useState(null);
  const [isDeleting, setIsDeleting] = useState(false);
  const [deleteErrorMessage, setDeleteErrorMessage] = useState("");

  const loadWorkouts = useCallback(
    (signal) => fetchWorkouts({ page: String(page) }, signal),
    // reloadCount isn't sent; listing it gives a new loader, so the hook fetches again after a delete.
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [page, reloadCount],
  );
  const { data, error, isLoading } = useApiRequest(loadWorkouts);

  function goToPage(nextPage) {
    setSearchParameters(nextPage > 1 ? { page: String(nextPage) } : {});
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

  const hasNoWorkouts = data && data.totalWorkoutCount === 0;

  return (
    <main className="workout-history-page">
      <div className="workout-history-page-heading">
        <h1>Workout history</h1>
        <Link className="button button-primary" to="/workouts/new">
          Log workout
        </Link>
      </div>

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

      {data && !hasNoWorkouts && (
        <>
          <ul
            className="workout-history-page-list"
            aria-busy={isLoading ? "true" : "false"}
          >
            {data.workouts.map((workout) => (
              <WorkoutCard
                key={workout.id}
                workout={workout}
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

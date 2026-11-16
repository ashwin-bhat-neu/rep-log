import { useCallback } from "react";
import { useSearchParams } from "react-router";
import { fetchExercises } from "../../api/exercisesApi.js";
import ExerciseFilters from "../../components/ExerciseFilters/ExerciseFilters.jsx";
import ExerciseListItem from "../../components/ExerciseListItem/ExerciseListItem.jsx";
import PaginationControls from "../../components/PaginationControls/PaginationControls.jsx";
import useApiRequest from "../../hooks/useApiRequest.js";
import "../../styles/controls.css";
import "./ExerciseLibraryPage.css";

const FILTER_NAMES = ["search", "muscleGroup", "equipment", "difficulty"];

function readFilters(searchParams) {
  return Object.fromEntries(
    FILTER_NAMES.map((name) => [name, searchParams.get(name) ?? ""]),
  );
}

// Only non-empty filters go in the address, so a shared link stays short.
function buildSearchParams(filters, page) {
  const searchParams = new URLSearchParams();
  for (const name of FILTER_NAMES) {
    if (filters[name]) {
      searchParams.set(name, filters[name]);
    }
  }
  if (page > 1) {
    searchParams.set("page", String(page));
  }
  return searchParams;
}

// The filters and page live in the address bar, so Back, refresh, and shared links all keep the results.
export default function ExerciseLibraryPage() {
  const [searchParams, setSearchParams] = useSearchParams();
  const queryString = searchParams.toString();
  const loadExercises = useCallback(
    (signal) => fetchExercises(queryString, signal),
    [queryString],
  );
  const { data, error, isLoading } = useApiRequest(loadExercises);
  const filters = readFilters(searchParams);
  const filtersKey = FILTER_NAMES.map((name) => filters[name]).join("|");

  function changePage(page) {
    setSearchParams(buildSearchParams(filters, page));
    window.scrollTo({ top: 0 });
  }

  return (
    <main className="exercise-library-page">
      <div className="exercise-library-page-heading">
        <h1>Exercise library</h1>
        <p className="exercise-library-page-intro">
          Find exercises by name, the muscle group they work, the equipment they
          need, or how hard they are. Open one to see how to do it.
        </p>
      </div>

      <ExerciseFilters
        key={filtersKey}
        initialFilters={filters}
        onApply={(nextFilters) =>
          setSearchParams(buildSearchParams(nextFilters, 1))
        }
        onClear={() => setSearchParams(new URLSearchParams())}
      />

      {error && (
        <p className="error-message exercise-library-page-status" role="alert">
          Couldn&apos;t load exercises. {error.message}
        </p>
      )}

      {!data && !error && (
        <p className="exercise-library-page-status">Loading exercises…</p>
      )}

      {data && (
        <section aria-busy={isLoading} aria-label="Results">
          <p className="exercise-library-page-status" aria-live="polite">
            {data.totalCount === 1
              ? "1 exercise"
              : `${data.totalCount.toLocaleString()} exercises`}
          </p>
          {data.exercises.length > 0 ? (
            <ul
              className={
                isLoading
                  ? "exercise-library-page-list exercise-library-page-list-loading"
                  : "exercise-library-page-list"
              }
            >
              {data.exercises.map((exercise) => (
                <ExerciseListItem
                  key={exercise._id}
                  exercise={exercise}
                  librarySearch={queryString ? `?${queryString}` : ""}
                />
              ))}
            </ul>
          ) : (
            <div className="exercise-library-page-empty">
              <p>No exercises match these filters.</p>
              <p>Try a shorter name or set a filter back to “Any”.</p>
            </div>
          )}
          <PaginationControls
            page={data.page}
            pageCount={data.pageCount}
            onPageChange={changePage}
          />
        </section>
      )}
    </main>
  );
}

ExerciseLibraryPage.propTypes = {};

import { useCallback, useMemo } from "react";
import { Link, useSearchParams } from "react-router";
import { fetchTrainingBreakdown } from "../../api/trainingBreakdownApi.js";
import MuscleGroupBreakdownTable from "../../components/MuscleGroupBreakdownTable/MuscleGroupBreakdownTable.jsx";
import MuscleGroupSetsChart from "../../components/MuscleGroupSetsChart/MuscleGroupSetsChart.jsx";
import PeriodToggle from "../../components/PeriodToggle/PeriodToggle.jsx";
import SummaryTile from "../../components/SummaryTile/SummaryTile.jsx";
import TrainingCallout from "../../components/TrainingCallout/TrainingCallout.jsx";
import useApiRequest from "../../hooks/useApiRequest.js";
import {
  addDaysToCalendarDate,
  todayAsCalendarDate,
} from "../../utilities/calendarDates.js";
import "../../styles/controls.css";
import "./TrainingBreakdownPage.css";

// Rolling windows that include today, as described in the design document.
const PERIODS = [
  { value: "week", label: "Week", dayCount: 7, description: "Last 7 days" },
  { value: "month", label: "Month", dayCount: 30, description: "Last 30 days" },
];
const DEFAULT_PERIOD = "month";

function pluralizeSets(count) {
  return `${count} set${count === 1 ? "" : "s"}`;
}

// Most to least trained, so the gaps sit together at the bottom of both the chart and the table.
function sortBySetCount(muscleGroups) {
  return [...muscleGroups].sort(
    (first, second) => second.setCount - first.setCount,
  );
}

function setCountOf(breakdown, muscleGroup) {
  return breakdown.muscleGroups.find(
    (totals) => totals.muscleGroup === muscleGroup,
  ).setCount;
}

export default function TrainingBreakdownPage() {
  const [searchParameters, setSearchParameters] = useSearchParams();
  const selectedPeriod =
    PERIODS.find((period) => period.value === searchParameters.get("period")) ??
    PERIODS.find((period) => period.value === DEFAULT_PERIOD);
  const { dayCount } = selectedPeriod;

  // Today is read when the request starts, so the range is always relative to the user's current local date.
  const loadBreakdown = useCallback(
    (signal) => {
      const toDate = todayAsCalendarDate();
      const fromDate = addDaysToCalendarDate(toDate, 1 - dayCount);
      return fetchTrainingBreakdown({ fromDate, toDate }, signal);
    },
    [dayCount],
  );
  const { data: breakdown, error, isLoading } = useApiRequest(loadBreakdown);
  // Memoized so the chart is rebuilt only when new data arrives, not on every render.
  const sortedMuscleGroups = useMemo(
    () => (breakdown ? sortBySetCount(breakdown.muscleGroups) : []),
    [breakdown],
  );

  function selectPeriod(periodValue) {
    setSearchParameters(
      periodValue === DEFAULT_PERIOD ? {} : { period: periodValue },
    );
  }

  function renderContent() {
    if (error) {
      return (
        <p className="error-message" role="alert">
          Couldn&apos;t load your training breakdown. {error.message}
        </p>
      );
    }
    if (!breakdown) {
      return <p className="training-breakdown-page-message">Loading…</p>;
    }
    if (breakdown.workoutCount === 0) {
      return (
        <div className="training-breakdown-page-empty">
          <h2>No workouts in the {selectedPeriod.description.toLowerCase()}</h2>
          <p>
            Log a session and its exercises will show up here, grouped by the
            muscle groups they target.
          </p>
          <Link className="button button-primary" to="/workouts/new">
            Log workout
          </Link>
        </div>
      );
    }
    const [firstMostTrained] = breakdown.mostTrainedMuscleGroups;
    const [firstLeastTrained] = breakdown.leastTrainedMuscleGroups;
    return (
      <div aria-busy={isLoading ? "true" : "false"}>
        <dl className="training-breakdown-page-tiles">
          <SummaryTile label="Workouts" value={breakdown.workoutCount} />
          <SummaryTile label="Exercises" value={breakdown.exerciseCount} />
          <SummaryTile label="Sets" value={breakdown.setCount} />
        </dl>
        <section
          className="training-breakdown-page-callouts"
          aria-label="Most and least trained muscle groups"
        >
          <TrainingCallout
            label="Most trained"
            muscleGroups={breakdown.mostTrainedMuscleGroups}
            detail={pluralizeSets(setCountOf(breakdown, firstMostTrained))}
            emptyText="—"
          />
          <TrainingCallout
            label="Least trained"
            muscleGroups={breakdown.leastTrainedMuscleGroups}
            detail={pluralizeSets(setCountOf(breakdown, firstLeastTrained))}
            emptyText="—"
          />
          <TrainingCallout
            label="Not trained"
            muscleGroups={breakdown.untrainedMuscleGroups}
            detail="0 sets"
            emptyText="Every group got some work"
            needsAttention={breakdown.untrainedMuscleGroups.length > 0}
          />
        </section>
        <div className="training-breakdown-page-panels">
          <section className="training-breakdown-page-panel">
            <h2>Sets per muscle group</h2>
            <MuscleGroupSetsChart muscleGroups={sortedMuscleGroups} />
          </section>
          <section className="training-breakdown-page-panel">
            <MuscleGroupBreakdownTable muscleGroups={sortedMuscleGroups} />
          </section>
        </div>
      </div>
    );
  }

  return (
    <main className="training-breakdown-page">
      <div className="training-breakdown-page-heading">
        <div>
          <h1>Training breakdown</h1>
          <p className="training-breakdown-page-message">
            {selectedPeriod.description}
          </p>
        </div>
        <PeriodToggle
          periods={PERIODS}
          selectedPeriod={selectedPeriod.value}
          onChange={selectPeriod}
        />
      </div>
      {renderContent()}
    </main>
  );
}

TrainingBreakdownPage.propTypes = {};

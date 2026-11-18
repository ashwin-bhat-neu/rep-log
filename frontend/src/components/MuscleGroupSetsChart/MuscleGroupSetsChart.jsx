import {
  BarController,
  BarElement,
  CategoryScale,
  Chart,
  LinearScale,
  Tooltip,
} from "chart.js";
import PropTypes from "prop-types";
import { useEffect, useRef } from "react";
import "./MuscleGroupSetsChart.css";

// Registering only what a horizontal bar chart needs keeps the bundle smaller.
Chart.register(BarController, BarElement, CategoryScale, LinearScale, Tooltip);

const BAR_COLOR = "#2f6fde";
// A darker step of the bar color, so hover reads as the same series.
const HOVERED_BAR_COLOR = "#1f56b8";
const INK_COLOR = "#374151";
const UNTRAINED_LABEL_COLOR = "#92400e";
const GRIDLINE_COLOR = "#eef0f3";
const BAR_THICKNESS_PIXELS = 18;
const BAR_CORNER_RADIUS_PIXELS = 4;
const ROW_HEIGHT_PIXELS = 34;
const AXIS_HEIGHT_PIXELS = 40;

function pluralize(count, singular) {
  return `${count} ${singular}${count === 1 ? "" : "s"}`;
}

// Draws groups in the order given; the page sorts them so the chart and table read the same way.
export default function MuscleGroupSetsChart({ muscleGroups }) {
  const canvasRef = useRef(null);
  const chartHeightPixels =
    muscleGroups.length * ROW_HEIGHT_PIXELS + AXIS_HEIGHT_PIXELS;

  useEffect(() => {
    const chart = new Chart(canvasRef.current, {
      type: "bar",
      data: {
        // Untrained groups get a text label, so they aren't marked by an empty space alone.
        labels: muscleGroups.map((totals) =>
          totals.setCount === 0
            ? `${totals.muscleGroup} · not trained`
            : totals.muscleGroup,
        ),
        datasets: [
          {
            label: "Sets",
            // Null draws no bar; a zero would still leave a hairline at the baseline.
            data: muscleGroups.map((totals) => totals.setCount || null),
            backgroundColor: BAR_COLOR,
            hoverBackgroundColor: HOVERED_BAR_COLOR,
            borderRadius: BAR_CORNER_RADIUS_PIXELS,
            borderSkipped: "start",
            barThickness: BAR_THICKNESS_PIXELS,
          },
        ],
      },
      options: {
        indexAxis: "y",
        maintainAspectRatio: false,
        animation: false,
        scales: {
          x: {
            beginAtZero: true,
            ticks: { precision: 0, color: INK_COLOR },
            grid: { color: GRIDLINE_COLOR },
            border: { display: false },
          },
          y: {
            grid: { display: false },
            border: { display: false },
            ticks: {
              color: (context) =>
                muscleGroups[context.index]?.setCount === 0
                  ? UNTRAINED_LABEL_COLOR
                  : INK_COLOR,
              font: { size: 14 },
            },
          },
        },
        plugins: {
          tooltip: {
            displayColors: false,
            callbacks: {
              title: (items) => muscleGroups[items[0].dataIndex].muscleGroup,
              label: (item) => {
                const totals = muscleGroups[item.dataIndex];
                return `${pluralize(totals.setCount, "set")} · ${pluralize(totals.exerciseCount, "exercise")}`;
              },
            },
          },
        },
      },
    });
    return () => chart.destroy();
  }, [muscleGroups]);

  return (
    <div
      className="muscle-group-sets-chart"
      style={{ height: `${chartHeightPixels}px` }}
    >
      <canvas
        ref={canvasRef}
        role="img"
        aria-label="Bar chart of sets per muscle group. The table beside it lists the same numbers."
      />
    </div>
  );
}

MuscleGroupSetsChart.propTypes = {
  muscleGroups: PropTypes.arrayOf(
    PropTypes.shape({
      muscleGroup: PropTypes.string.isRequired,
      exerciseCount: PropTypes.number.isRequired,
      setCount: PropTypes.number.isRequired,
    }),
  ).isRequired,
};

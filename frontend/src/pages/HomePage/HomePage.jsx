import "./HomePage.css";

const usageSteps = [
  "Create an account so your workouts stay private to you.",
  "Log each session with its exercises, sets, reps, and the muscle group each exercise targets.",
  "Filter your history by date or exercise to see how your numbers change.",
  "Open the breakdown to see which muscle groups you trained most and least this week or month.",
];

export default function HomePage() {
  return (
    <main className="home-page">
      <h1 className="home-page-title">RepLog</h1>
      <p className="home-page-tagline">
        Log your workouts and see where your training effort is going.
      </p>
      <section className="home-page-card">
        <h2>How to use RepLog</h2>
        <ol className="home-page-steps">
          {usageSteps.map((usageStep) => (
            <li key={usageStep}>{usageStep}</li>
          ))}
        </ol>
      </section>
    </main>
  );
}

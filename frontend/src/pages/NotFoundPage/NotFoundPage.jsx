import { Link } from "react-router";
import "./NotFoundPage.css";

export default function NotFoundPage() {
  return (
    <main className="not-found-page">
      <h1>Page not found</h1>
      <p className="not-found-page-message">
        There is nothing at this address.
      </p>
      <Link to="/">Go to the home page</Link>
    </main>
  );
}

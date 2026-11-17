import { Link, NavLink, useNavigate } from "react-router";
import { useAuthenticatedUser } from "../../context/useAuthenticatedUser.js";
import "./NavigationBar.css";

function navigationLinkClassName({ isActive }) {
  return isActive
    ? "navigation-bar-link navigation-bar-link-active"
    : "navigation-bar-link";
}

export default function NavigationBar() {
  const { authenticatedUser, isCheckingSession, logOut } =
    useAuthenticatedUser();
  const navigate = useNavigate();

  async function handleLogOut() {
    await logOut();
    navigate("/login");
  }

  return (
    <header className="navigation-bar">
      <Link to="/" className="navigation-bar-brand">
        RepLog
      </Link>
      {!isCheckingSession && (
        <nav className="navigation-bar-links" aria-label="Main">
          <NavLink to="/exercises" className={navigationLinkClassName}>
            Exercises
          </NavLink>
          {authenticatedUser ? (
            <>
              <NavLink to="/templates" className={navigationLinkClassName}>
                Templates
              </NavLink>
              <span className="navigation-bar-username">
                {authenticatedUser.username}
              </span>
              <button
                type="button"
                className="navigation-bar-log-out"
                onClick={handleLogOut}
              >
                Log out
              </button>
            </>
          ) : (
            <>
              <NavLink to="/login" className={navigationLinkClassName}>
                Log in
              </NavLink>
              <NavLink to="/register" className={navigationLinkClassName}>
                Register
              </NavLink>
            </>
          )}
        </nav>
      )}
    </header>
  );
}

NavigationBar.propTypes = {};

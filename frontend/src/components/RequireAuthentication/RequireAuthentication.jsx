import PropTypes from "prop-types";
import { Navigate, useLocation } from "react-router";
import { useAuthenticatedUser } from "../../context/useAuthenticatedUser.js";

// Sends logged-out visitors to the login page, which brings them back here afterwards.
export default function RequireAuthentication({ children }) {
  const { authenticatedUser, isCheckingSession } = useAuthenticatedUser();
  const location = useLocation();

  if (isCheckingSession) {
    return null;
  }
  if (!authenticatedUser) {
    return (
      <Navigate
        to="/login"
        replace
        state={{ from: `${location.pathname}${location.search}` }}
      />
    );
  }
  return children;
}

RequireAuthentication.propTypes = {
  children: PropTypes.node.isRequired,
};

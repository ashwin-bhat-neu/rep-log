import PropTypes from "prop-types";
import { useCallback, useEffect, useMemo, useState } from "react";
import {
  fetchCurrentUser,
  logInUser,
  logOutUser,
  registerUser,
} from "../api/authenticationApi.js";
import { AuthenticatedUserContext } from "./AuthenticatedUserContext.js";

export default function AuthenticatedUserProvider({ children }) {
  const [authenticatedUser, setAuthenticatedUser] = useState(null);
  const [isCheckingSession, setIsCheckingSession] = useState(true);

  useEffect(() => {
    fetchCurrentUser()
      .then(setAuthenticatedUser)
      // An unreachable API leaves the user logged out rather than stuck loading.
      .catch(() => setAuthenticatedUser(null))
      .finally(() => setIsCheckingSession(false));
  }, []);

  const logIn = useCallback(async (credentials) => {
    setAuthenticatedUser(await logInUser(credentials));
  }, []);

  const register = useCallback(async (credentials) => {
    setAuthenticatedUser(await registerUser(credentials));
  }, []);

  const logOut = useCallback(async () => {
    await logOutUser();
    setAuthenticatedUser(null);
  }, []);

  const contextValue = useMemo(
    () => ({ authenticatedUser, isCheckingSession, logIn, register, logOut }),
    [authenticatedUser, isCheckingSession, logIn, register, logOut],
  );

  return (
    <AuthenticatedUserContext.Provider value={contextValue}>
      {children}
    </AuthenticatedUserContext.Provider>
  );
}

AuthenticatedUserProvider.propTypes = {
  children: PropTypes.node.isRequired,
};

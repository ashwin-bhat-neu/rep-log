import { useContext } from "react";
import { AuthenticatedUserContext } from "./AuthenticatedUserContext.js";

export function useAuthenticatedUser() {
  const contextValue = useContext(AuthenticatedUserContext);
  if (!contextValue) {
    throw new Error(
      "useAuthenticatedUser must be used inside AuthenticatedUserProvider",
    );
  }
  return contextValue;
}

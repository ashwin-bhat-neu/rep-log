import { useState } from "react";
import { Link, Navigate, useLocation, useNavigate } from "react-router";
import AuthenticationCard from "../../components/AuthenticationCard/AuthenticationCard.jsx";
import FormField from "../../components/FormField/FormField.jsx";
import { useAuthenticatedUser } from "../../context/useAuthenticatedUser.js";

export default function LoginPage() {
  const { authenticatedUser, logIn } = useAuthenticatedUser();
  const navigate = useNavigate();
  const location = useLocation();
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [errorMessage, setErrorMessage] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  // Pages that require login send the visitor here and expect to be returned afterwards.
  const destinationAfterLogin = location.state?.from ?? "/";

  if (authenticatedUser && !isSubmitting) {
    return <Navigate to={destinationAfterLogin} replace />;
  }

  async function handleSubmit() {
    setIsSubmitting(true);
    setErrorMessage("");
    try {
      await logIn({ username, password });
      navigate(destinationAfterLogin, { replace: true });
    } catch (error) {
      setErrorMessage(error.message);
      setIsSubmitting(false);
    }
  }

  return (
    <AuthenticationCard
      heading="Log in to RepLog"
      introduction="Pick up where you left off with your training log."
      errorMessage={errorMessage}
      submitLabel={isSubmitting ? "Logging in…" : "Log in"}
      isSubmitting={isSubmitting}
      onSubmit={handleSubmit}
      footer={
        <>
          New here? <Link to="/register">Create an account</Link>
        </>
      }
    >
      <FormField
        label="Username"
        name="username"
        autoComplete="username"
        required
        value={username}
        onChange={(event) => setUsername(event.target.value)}
      />
      <FormField
        label="Password"
        name="password"
        type="password"
        autoComplete="current-password"
        required
        value={password}
        onChange={(event) => setPassword(event.target.value)}
      />
    </AuthenticationCard>
  );
}

LoginPage.propTypes = {};

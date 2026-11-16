import { useState } from "react";
import { Link, Navigate, useNavigate } from "react-router";
import AuthenticationCard from "../../components/AuthenticationCard/AuthenticationCard.jsx";
import FormField from "../../components/FormField/FormField.jsx";
import { useAuthenticatedUser } from "../../context/useAuthenticatedUser.js";

// Mirrors the server's rules so most mistakes are caught before submitting.
const USERNAME_PATTERN = "[A-Za-z0-9_]{3,30}";
const MINIMUM_PASSWORD_LENGTH = 8;
const MAXIMUM_PASSWORD_LENGTH = 128;

export default function RegisterPage() {
  const { authenticatedUser, register } = useAuthenticatedUser();
  const navigate = useNavigate();
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [confirmedPassword, setConfirmedPassword] = useState("");
  const [errorMessage, setErrorMessage] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);

  if (authenticatedUser && !isSubmitting) {
    return <Navigate to="/" replace />;
  }

  async function handleSubmit() {
    if (password !== confirmedPassword) {
      setErrorMessage("The passwords don't match");
      return;
    }
    setIsSubmitting(true);
    setErrorMessage("");
    try {
      await register({ username, password });
      navigate("/", { replace: true });
    } catch (error) {
      setErrorMessage(error.message);
      setIsSubmitting(false);
    }
  }

  return (
    <AuthenticationCard
      heading="Create your account"
      introduction="Your workouts are private to your account."
      errorMessage={errorMessage}
      submitLabel={isSubmitting ? "Creating account…" : "Create account"}
      isSubmitting={isSubmitting}
      onSubmit={handleSubmit}
      footer={
        <>
          Already have an account? <Link to="/login">Log in</Link>
        </>
      }
    >
      <FormField
        label="Username"
        name="username"
        autoComplete="username"
        hint="3 to 30 letters, numbers, or underscores"
        required
        pattern={USERNAME_PATTERN}
        value={username}
        onChange={(event) => setUsername(event.target.value)}
      />
      <FormField
        label="Password"
        name="password"
        type="password"
        autoComplete="new-password"
        hint={`At least ${MINIMUM_PASSWORD_LENGTH} characters`}
        required
        minLength={MINIMUM_PASSWORD_LENGTH}
        maxLength={MAXIMUM_PASSWORD_LENGTH}
        value={password}
        onChange={(event) => setPassword(event.target.value)}
      />
      <FormField
        label="Confirm password"
        name="confirmedPassword"
        type="password"
        autoComplete="new-password"
        required
        value={confirmedPassword}
        onChange={(event) => setConfirmedPassword(event.target.value)}
      />
    </AuthenticationCard>
  );
}

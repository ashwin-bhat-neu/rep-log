import PropTypes from "prop-types";
import "./AuthenticationCard.css";

export default function AuthenticationCard({
  heading,
  introduction,
  errorMessage,
  submitLabel,
  isSubmitting,
  onSubmit,
  footer,
  children,
}) {
  function handleSubmit(event) {
    event.preventDefault();
    onSubmit();
  }

  return (
    <main className="authentication-card-page">
      <form className="authentication-card" onSubmit={handleSubmit}>
        <h1 className="authentication-card-heading">{heading}</h1>
        <p className="authentication-card-introduction">{introduction}</p>
        {children}
        {errorMessage && (
          <p className="authentication-card-error" role="alert">
            {errorMessage}
          </p>
        )}
        <button
          type="submit"
          className="button button-primary authentication-card-submit"
          disabled={isSubmitting}
        >
          {submitLabel}
        </button>
        <p className="authentication-card-footer">{footer}</p>
      </form>
    </main>
  );
}

AuthenticationCard.propTypes = {
  heading: PropTypes.string.isRequired,
  introduction: PropTypes.string.isRequired,
  errorMessage: PropTypes.string,
  submitLabel: PropTypes.string.isRequired,
  isSubmitting: PropTypes.bool.isRequired,
  onSubmit: PropTypes.func.isRequired,
  footer: PropTypes.node.isRequired,
  children: PropTypes.node.isRequired,
};

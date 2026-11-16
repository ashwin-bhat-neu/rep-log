import PropTypes from "prop-types";
import "../../styles/controls.css";
import "./PaginationControls.css";

export default function PaginationControls({ page, pageCount, onPageChange }) {
  if (pageCount <= 1) {
    return null;
  }
  return (
    <nav className="pagination-controls" aria-label="Pages">
      <button
        className="button"
        type="button"
        disabled={page <= 1}
        onClick={() => onPageChange(page - 1)}
      >
        Previous
      </button>
      <p className="pagination-controls-status" aria-live="polite">
        Page {page} of {pageCount}
      </p>
      <button
        className="button"
        type="button"
        disabled={page >= pageCount}
        onClick={() => onPageChange(page + 1)}
      >
        Next
      </button>
    </nav>
  );
}

PaginationControls.propTypes = {
  page: PropTypes.number.isRequired,
  pageCount: PropTypes.number.isRequired,
  onPageChange: PropTypes.func.isRequired,
};

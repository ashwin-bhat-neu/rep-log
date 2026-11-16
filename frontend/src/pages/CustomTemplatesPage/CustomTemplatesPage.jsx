import { useState } from "react";
import { Link } from "react-router";
import {
  deleteCustomTemplate,
  fetchCustomTemplates,
} from "../../api/customTemplatesApi.js";
import ConfirmationDialog from "../../components/ConfirmationDialog/ConfirmationDialog.jsx";
import CustomTemplateCard from "../../components/CustomTemplateCard/CustomTemplateCard.jsx";
import useApiRequest from "../../hooks/useApiRequest.js";
import "../../styles/controls.css";
import "./CustomTemplatesPage.css";

const UNAUTHORIZED_STATUS = 401;

export default function CustomTemplatesPage() {
  const { data: templates, error } = useApiRequest(fetchCustomTemplates);
  const [deletedTemplateIds, setDeletedTemplateIds] = useState([]);
  const [templatePendingDelete, setTemplatePendingDelete] = useState(null);
  const [isDeleting, setIsDeleting] = useState(false);
  const [deleteErrorMessage, setDeleteErrorMessage] = useState("");

  const visibleTemplates = (templates ?? []).filter(
    (template) => !deletedTemplateIds.includes(template._id),
  );

  async function confirmDelete() {
    const template = templatePendingDelete;
    setIsDeleting(true);
    setDeleteErrorMessage("");
    try {
      await deleteCustomTemplate(template._id);
      setDeletedTemplateIds((ids) => [...ids, template._id]);
    } catch (deleteError) {
      setDeleteErrorMessage(
        `Couldn't delete “${template.name}”. ${deleteError.message}`,
      );
    }
    setIsDeleting(false);
    setTemplatePendingDelete(null);
  }

  if (error?.status === UNAUTHORIZED_STATUS) {
    return (
      <main className="custom-templates-page">
        <h1>Custom templates</h1>
        <p className="custom-templates-page-message">
          Your templates are private to your account.{" "}
          <Link to="/login">Log in</Link> to see and edit them.
        </p>
      </main>
    );
  }

  return (
    <main className="custom-templates-page">
      <div className="custom-templates-page-heading">
        <div>
          <h1>Custom templates</h1>
          <p className="custom-templates-page-intro">
            Save exercises that aren&apos;t in the library, with the sets and
            reps you usually do.
          </p>
        </div>
        <Link className="button button-primary" to="/templates/new">
          New template
        </Link>
      </div>

      {error && (
        <p className="error-message" role="alert">
          Couldn&apos;t load your templates. {error.message}
        </p>
      )}
      {deleteErrorMessage && (
        <p className="error-message" role="alert">
          {deleteErrorMessage}
        </p>
      )}

      {!templates && !error && (
        <p className="custom-templates-page-message">Loading templates…</p>
      )}

      {templates && visibleTemplates.length === 0 && (
        <div className="custom-templates-page-empty">
          <h2>No templates yet</h2>
          <p>
            Create one from scratch, or open an exercise in the{" "}
            <Link to="/exercises">exercise library</Link> and save it as a
            template.
          </p>
          <Link className="button button-primary" to="/templates/new">
            Create your first template
          </Link>
        </div>
      )}

      {visibleTemplates.length > 0 && (
        <ul className="custom-templates-page-list">
          {visibleTemplates.map((template) => (
            <CustomTemplateCard
              key={template._id}
              template={template}
              onDeleteRequest={setTemplatePendingDelete}
            />
          ))}
        </ul>
      )}

      <ConfirmationDialog
        isOpen={templatePendingDelete !== null}
        title="Delete this template?"
        message={
          templatePendingDelete
            ? `“${templatePendingDelete.name}” will be removed for good. This can't be undone.`
            : ""
        }
        confirmLabel={isDeleting ? "Deleting…" : "Delete"}
        isConfirming={isDeleting}
        onConfirm={confirmDelete}
        onCancel={() => setTemplatePendingDelete(null)}
      />
    </main>
  );
}

CustomTemplatesPage.propTypes = {};

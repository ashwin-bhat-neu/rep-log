import { useCallback } from "react";
import { Link, useLocation, useNavigate, useParams } from "react-router";
import {
  createCustomTemplate,
  fetchCustomTemplate,
  updateCustomTemplate,
} from "../../api/customTemplatesApi.js";
import CustomTemplateForm from "../../components/CustomTemplateForm/CustomTemplateForm.jsx";
import useApiRequest from "../../hooks/useApiRequest.js";
import "../../styles/controls.css";
import "./CustomTemplateEditorPage.css";

const UNAUTHORIZED_STATUS = 401;
const NOT_FOUND_STATUS = 404;

// One page for both /templates/new and /templates/:templateId/edit.
export default function CustomTemplateEditorPage() {
  const { templateId } = useParams();
  const location = useLocation();
  const navigate = useNavigate();
  const isEditing = templateId !== undefined;

  const loadTemplate = useCallback(
    (signal) =>
      isEditing
        ? fetchCustomTemplate(templateId, signal)
        : Promise.resolve(null),
    [isEditing, templateId],
  );
  const { data: savedTemplate, error, isLoading } = useApiRequest(loadTemplate);

  // "Save as custom template" on an exercise page passes its name and muscles here.
  const initialTemplate = isEditing
    ? savedTemplate
    : (location.state?.templateDraft ?? {});

  async function saveTemplate(templateFields) {
    if (isEditing) {
      await updateCustomTemplate(templateId, templateFields);
    } else {
      await createCustomTemplate(templateFields);
    }
    navigate("/templates");
  }

  function renderContent() {
    if (isLoading) {
      return <p className="custom-template-editor-page-message">Loading…</p>;
    }
    if (error?.status === UNAUTHORIZED_STATUS) {
      return (
        <p className="custom-template-editor-page-message">
          <Link to="/login">Log in</Link> to edit your templates.
        </p>
      );
    }
    if (error?.status === NOT_FOUND_STATUS) {
      return (
        <p className="custom-template-editor-page-message">
          This template doesn&apos;t exist anymore.{" "}
          <Link to="/templates">Go back to your templates</Link>.
        </p>
      );
    }
    if (error) {
      return (
        <p className="error-message" role="alert">
          Couldn&apos;t load this template. {error.message}
        </p>
      );
    }
    return (
      <CustomTemplateForm
        initialTemplate={initialTemplate}
        submitLabel={isEditing ? "Save changes" : "Save template"}
        onSubmit={saveTemplate}
        onCancel={() => navigate("/templates")}
      />
    );
  }

  return (
    <main className="custom-template-editor-page">
      <h1>{isEditing ? "Edit template" : "New template"}</h1>
      {renderContent()}
    </main>
  );
}

CustomTemplateEditorPage.propTypes = {};

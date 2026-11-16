import { requestJson } from "./requestJson.js";

const CUSTOM_TEMPLATES_PATH = "/api/custom-templates";

function templatePath(templateId) {
  return `${CUSTOM_TEMPLATES_PATH}/${encodeURIComponent(templateId)}`;
}

export async function fetchCustomTemplates(signal) {
  const { templates } = await requestJson(CUSTOM_TEMPLATES_PATH, { signal });
  return templates;
}

export function fetchCustomTemplate(templateId, signal) {
  return requestJson(templatePath(templateId), { signal });
}

export function createCustomTemplate(templateFields) {
  return requestJson(CUSTOM_TEMPLATES_PATH, {
    method: "POST",
    body: templateFields,
  });
}

export function updateCustomTemplate(templateId, templateFields) {
  return requestJson(templatePath(templateId), {
    method: "PUT",
    body: templateFields,
  });
}

export function deleteCustomTemplate(templateId) {
  return requestJson(templatePath(templateId), { method: "DELETE" });
}

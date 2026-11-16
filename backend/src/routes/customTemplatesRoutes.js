import { Router } from "express";
import {
  deleteCustomTemplate,
  findCustomTemplate,
  insertCustomTemplate,
  isCustomTemplateNameTaken,
  listCustomTemplates,
  replaceCustomTemplate,
} from "../database/customTemplatesCollection.js";
import { parseObjectId } from "../database/parseObjectId.js";
import { requireAuthentication } from "../middleware/requireAuthentication.js";
import { validateCustomTemplateInput } from "../validation/customTemplateInput.js";

const DUPLICATE_KEY_ERROR_CODE = 11000;
const TEMPLATE_NOT_FOUND = { error: "Template not found." };

// Every route only touches the logged-in user's templates; someone else's template looks the same as a missing one.
const customTemplatesRouter = Router();

customTemplatesRouter.use(requireAuthentication);

function getUserId(request) {
  return parseObjectId(request.user.id);
}

function sendNameTaken(response, name) {
  response
    .status(409)
    .json({ error: `You already have a template named "${name}".` });
}

customTemplatesRouter.get("/", async (request, response) => {
  const templates = await listCustomTemplates(getUserId(request));
  response.json({ templates });
});

customTemplatesRouter.get("/:templateId", async (request, response) => {
  const templateId = parseObjectId(request.params.templateId);
  const template = templateId
    ? await findCustomTemplate(getUserId(request), templateId)
    : null;
  if (!template) {
    response.status(404).json(TEMPLATE_NOT_FOUND);
    return;
  }
  response.json(template);
});

customTemplatesRouter.post("/", async (request, response) => {
  const { errors, template } = validateCustomTemplateInput(request.body);
  if (errors.length > 0) {
    response.status(400).json({ error: errors.join(" ") });
    return;
  }
  const userId = getUserId(request);
  if (await isCustomTemplateNameTaken(userId, template.name)) {
    sendNameTaken(response, template.name);
    return;
  }
  try {
    const createdTemplate = await insertCustomTemplate(userId, template);
    response.status(201).json(createdTemplate);
  } catch (error) {
    // The unique index catches two identical saves that arrive at the same moment.
    if (error.code === DUPLICATE_KEY_ERROR_CODE) {
      sendNameTaken(response, template.name);
      return;
    }
    throw error;
  }
});

customTemplatesRouter.put("/:templateId", async (request, response) => {
  const templateId = parseObjectId(request.params.templateId);
  if (!templateId) {
    response.status(404).json(TEMPLATE_NOT_FOUND);
    return;
  }
  const { errors, template } = validateCustomTemplateInput(request.body);
  if (errors.length > 0) {
    response.status(400).json({ error: errors.join(" ") });
    return;
  }
  const userId = getUserId(request);
  if (await isCustomTemplateNameTaken(userId, template.name, templateId)) {
    sendNameTaken(response, template.name);
    return;
  }
  try {
    const updatedTemplate = await replaceCustomTemplate(
      userId,
      templateId,
      template,
    );
    if (!updatedTemplate) {
      response.status(404).json(TEMPLATE_NOT_FOUND);
      return;
    }
    response.json(updatedTemplate);
  } catch (error) {
    if (error.code === DUPLICATE_KEY_ERROR_CODE) {
      sendNameTaken(response, template.name);
      return;
    }
    throw error;
  }
});

customTemplatesRouter.delete("/:templateId", async (request, response) => {
  const templateId = parseObjectId(request.params.templateId);
  const wasDeleted = templateId
    ? await deleteCustomTemplate(getUserId(request), templateId)
    : false;
  if (!wasDeleted) {
    response.status(404).json(TEMPLATE_NOT_FOUND);
    return;
  }
  response.status(204).end();
});

export default customTemplatesRouter;

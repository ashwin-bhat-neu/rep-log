import { CASE_INSENSITIVE_COLLATION } from "./collations.js";
import { getDatabase } from "./databaseConnection.js";

// userId is only used to scope queries, so it's left out of what the API sends back.
const HIDE_OWNER = { userId: 0 };

async function getCustomTemplatesCollection() {
  const database = await getDatabase();
  return database.collection("customTemplates");
}

export async function listCustomTemplates(userId) {
  const customTemplatesCollection = await getCustomTemplatesCollection();
  return customTemplatesCollection
    .find({ userId }, { projection: HIDE_OWNER })
    .collation(CASE_INSENSITIVE_COLLATION)
    .sort({ name: 1 })
    .toArray();
}

export async function findCustomTemplate(userId, templateId) {
  const customTemplatesCollection = await getCustomTemplatesCollection();
  return customTemplatesCollection.findOne(
    { _id: templateId, userId },
    { projection: HIDE_OWNER },
  );
}

// Names are unique per user regardless of case, so a user can't end up with two "Cable Crunch" templates.
export async function isCustomTemplateNameTaken(
  userId,
  name,
  ignoredTemplateId = null,
) {
  const customTemplatesCollection = await getCustomTemplatesCollection();
  const filter = { userId, name };
  if (ignoredTemplateId) {
    filter._id = { $ne: ignoredTemplateId };
  }
  const matchingTemplate = await customTemplatesCollection.findOne(filter, {
    collation: CASE_INSENSITIVE_COLLATION,
    projection: { _id: 1 },
  });
  return matchingTemplate !== null;
}

export async function insertCustomTemplate(userId, templateFields) {
  const customTemplatesCollection = await getCustomTemplatesCollection();
  const now = new Date();
  const newTemplate = {
    userId,
    ...templateFields,
    createdAt: now,
    updatedAt: now,
  };
  const { insertedId } = await customTemplatesCollection.insertOne(newTemplate);
  return findCustomTemplate(userId, insertedId);
}

// Returns the updated template, or null when it doesn't exist or belongs to someone else.
export async function replaceCustomTemplate(
  userId,
  templateId,
  templateFields,
) {
  const customTemplatesCollection = await getCustomTemplatesCollection();
  return customTemplatesCollection.findOneAndUpdate(
    { _id: templateId, userId },
    { $set: { ...templateFields, updatedAt: new Date() } },
    { returnDocument: "after", projection: HIDE_OWNER },
  );
}

export async function deleteCustomTemplate(userId, templateId) {
  const customTemplatesCollection = await getCustomTemplatesCollection();
  const { deletedCount } = await customTemplatesCollection.deleteOne({
    _id: templateId,
    userId,
  });
  return deletedCount === 1;
}

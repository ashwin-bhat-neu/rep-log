// Lets user-typed text be used in a $regex filter as plain text, so "(" or "+" can't break the query.
export function escapeRegularExpression(text) {
  return text.replace(/[.*+?^${}()|[\]\\]/g, "\\$&");
}

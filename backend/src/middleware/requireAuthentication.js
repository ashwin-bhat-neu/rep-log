export function requireAuthentication(request, response, next) {
  if (request.isAuthenticated()) {
    next();
    return;
  }
  response.status(401).json({ error: "Log in to continue" });
}

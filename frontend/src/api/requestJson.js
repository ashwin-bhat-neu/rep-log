const HTTP_NO_CONTENT = 204;

// Sends and receives JSON; non-2xx responses throw an Error carrying the server's message and status.
export async function requestJson(path, { method = "GET", body, signal } = {}) {
  const response = await fetch(path, {
    method,
    signal,
    headers: body === undefined ? {} : { "Content-Type": "application/json" },
    body: body === undefined ? undefined : JSON.stringify(body),
  });
  if (response.status === HTTP_NO_CONTENT) {
    return null;
  }
  const responseBody = await response.json().catch(() => ({}));
  if (!response.ok) {
    const error = new Error(
      responseBody.error ?? `Request failed with status ${response.status}`,
    );
    error.status = response.status;
    throw error;
  }
  return responseBody;
}

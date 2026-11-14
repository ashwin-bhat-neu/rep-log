import assert from "node:assert/strict";
import { after, before, test } from "node:test";
import app from "../src/app.js";

let server;
let baseUrl;

before(async () => {
  // Port 0 lets the OS pick a free port, so tests never collide with a running dev server.
  server = app.listen(0);
  await new Promise((resolve) => server.once("listening", resolve));
  baseUrl = `http://127.0.0.1:${server.address().port}`;
});

after(() => {
  server.close();
});

test("unknown API routes return a JSON 404", async () => {
  const response = await fetch(`${baseUrl}/api/does-not-exist`);

  assert.equal(response.status, 404);
  assert.deepEqual(await response.json(), {
    error: "No API route for GET /api/does-not-exist",
  });
});

test("malformed JSON bodies return a 400 with the parser's message", async () => {
  const response = await fetch(`${baseUrl}/api/does-not-exist`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: "{not json",
  });

  assert.equal(response.status, 400);
  assert.ok((await response.json()).error);
});

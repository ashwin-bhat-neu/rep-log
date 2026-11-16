import { requestJson } from "./requestJson.js";

const AUTHENTICATION_PATH = "/api/authentication";

export async function fetchCurrentUser() {
  const { user } = await requestJson(`${AUTHENTICATION_PATH}/current-user`);
  return user;
}

export async function registerUser(credentials) {
  const { user } = await requestJson(`${AUTHENTICATION_PATH}/register`, {
    method: "POST",
    body: credentials,
  });
  return user;
}

export async function logInUser(credentials) {
  const { user } = await requestJson(`${AUTHENTICATION_PATH}/login`, {
    method: "POST",
    body: credentials,
  });
  return user;
}

export async function logOutUser() {
  await requestJson(`${AUTHENTICATION_PATH}/logout`, { method: "POST" });
}

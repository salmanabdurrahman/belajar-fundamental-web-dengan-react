const BASE_URL = "https://notes-api.dicoding.dev/v1";

function getAccessToken() {
  return localStorage.getItem("accessToken");
}

function putAccessToken(accessToken) {
  localStorage.setItem("accessToken", accessToken);
}

function removeAccessToken() {
  localStorage.removeItem("accessToken");
}

async function fetchWithToken(url, options = {}) {
  return fetch(url, {
    ...options,
    headers: {
      ...options.headers,
      Authorization: `Bearer ${getAccessToken()}`,
    },
  });
}

async function parseResponse(response) {
  const responseJson = await response.json();

  if (responseJson.status !== "success") {
    return {
      error: true,
      data: responseJson.data ?? null,
      message: responseJson.message,
    };
  }

  return {
    error: false,
    data: responseJson.data,
    message: responseJson.message,
  };
}

async function safeRequest(requestFn) {
  try {
    const response = await requestFn();
    return parseResponse(response);
  } catch (error) {
    return {
      error: true,
      data: null,
      message: error.message,
    };
  }
}

function login({ email, password }) {
  return safeRequest(() =>
    fetch(`${BASE_URL}/login`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ email, password }),
    })
  );
}

function register({ name, email, password }) {
  return safeRequest(() =>
    fetch(`${BASE_URL}/register`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ name, email, password }),
    })
  );
}

function getUserLogged() {
  return safeRequest(() => fetchWithToken(`${BASE_URL}/users/me`));
}

function addNote({ title, body }) {
  return safeRequest(() =>
    fetchWithToken(`${BASE_URL}/notes`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ title, body }),
    })
  );
}

function getActiveNotes() {
  return safeRequest(() => fetchWithToken(`${BASE_URL}/notes`));
}

function getArchivedNotes() {
  return safeRequest(() => fetchWithToken(`${BASE_URL}/notes/archived`));
}

function getNote(id) {
  return safeRequest(() => fetchWithToken(`${BASE_URL}/notes/${id}`));
}

function archiveNote(id) {
  return safeRequest(() =>
    fetchWithToken(`${BASE_URL}/notes/${id}/archive`, {
      method: "POST",
    })
  );
}

function unarchiveNote(id) {
  return safeRequest(() =>
    fetchWithToken(`${BASE_URL}/notes/${id}/unarchive`, {
      method: "POST",
    })
  );
}

function deleteNote(id) {
  return safeRequest(() =>
    fetchWithToken(`${BASE_URL}/notes/${id}`, {
      method: "DELETE",
    })
  );
}

export {
  addNote,
  archiveNote,
  deleteNote,
  getAccessToken,
  getActiveNotes,
  getArchivedNotes,
  getNote,
  getUserLogged,
  login,
  putAccessToken,
  register,
  removeAccessToken,
  unarchiveNote,
};

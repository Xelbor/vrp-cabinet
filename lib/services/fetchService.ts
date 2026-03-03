async function refreshToken() {
  const refreshToken = localStorage.getItem("refresh_token");

  const response = await fetch(`/api/auth/refresh`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      refresh_token: refreshToken,
    }),
  });

  if (!response.ok) {
    return false;
  }

  const data = await response.json();
  localStorage.setItem("access_token", data.access_token);

  return true;
}

async function apiFetch(url: string, body: RequestInit = {}) {
  let accessToken = localStorage.getItem("access_token");

  const response = await fetch(url, {
    ...body,
    headers: {
      ...(body.headers || {}),
      Authorization: `Bearer ${accessToken}`,
      "Content-Type": "application/json",
    },
  });

  if (response.status === 401) {
    const refreshed = await refreshToken();
    if (!refreshed) {
      throw new Error("Session expired");
    }

    accessToken = localStorage.getItem("access_token");

    return fetch(url, {
      ...body,
      headers: {
        ...(body.headers || {}),
        Authorization: `Bearer ${accessToken}`,
        "Content-Type": "application/json",
      },
    });
  }

  return response;
}
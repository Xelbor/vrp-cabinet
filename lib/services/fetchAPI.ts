function getToken() {
  if (typeof window === "undefined") return null;
  return localStorage.getItem("access_token");
}

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

async function fetchAPI(
  url: string,
  options: RequestInit & { json?: any } = {}
) {
  let accessToken = localStorage.getItem("access_token");

  const { json, ...rest } = options;

  const makeRequest = async () => {
    return fetch(url, {
      ...rest,
      headers: {
        ...(rest.headers || {}),
        Authorization: `Bearer ${accessToken}`,
        "Content-Type": "application/json",
      },
      body: json ? JSON.stringify(json) : rest.body,
    });
  };

  let response = await makeRequest();

  if (response.status === 401) {
    const refreshed = await refreshToken();
    if (!refreshed) throw new Error("Session expired");

    accessToken = localStorage.getItem("access_token");
    response = await makeRequest();
  }

  if (!response.ok) {
    throw new Error(`HTTP error ${response.status}`);
  }

  return response.json();
}
async function refreshToken(): Promise<boolean> {
  const refreshToken = localStorage.getItem("refresh_token");
  if (!refreshToken) return false;

  const response = await fetch("/api/auth/refresh", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ refresh_token: refreshToken }),
  });

  if (!response.ok) return false;

  const data = await response.json();
  localStorage.setItem("access_token", data.access_token);

  return true;
}

interface ApiFetchOptions extends RequestInit {
  retry?: boolean; // для внутреннего рекурсивного вызова
}

async function apiFetch(url: string, options: ApiFetchOptions = {}): Promise<any> {
  let accessToken = localStorage.getItem("access_token");

  const fetchOptions: RequestInit = {
    method: options.method || "POST",
    headers: {
      "Content-Type": "application/json",
      ...(options.headers || {}),
      Authorization: `Bearer ${accessToken}`,
    },
    body: options.body ? JSON.stringify(options.body) : undefined,
  };

  const response = await fetch(url, fetchOptions);

  if (response.status === 401 && !options.retry) {
    const refreshed = await refreshToken();
    if (!refreshed) throw new Error("Session expired");

    // повторяем запрос с новым токеном
    return apiFetch(url, { ...options, retry: true });
  }

  if (!response.ok) throw new Error(`HTTP error ${response.status}`);

  return response.json();
}
export async function buyKey(userId: string, tariff: string, token: string) {
  const response = await fetch(`/api/buykey`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${token}`
    },
    body: JSON.stringify({ user_id: Number(userId), tariff: tariff }),
  });

  const data = await response.json();

  if (!response.ok) {
    throw new Error(data.detail || `HTTP error ${response.status}`);
  }

  return data;
}
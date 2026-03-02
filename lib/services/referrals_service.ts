export async function fetchReferrals(userId: string, token: string) {
  const response = await fetch(`/api/refferals`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${token}`
    },
    body: JSON.stringify({ user_id: userId }),
  })
  
  if (!response.ok) {
    throw new Error(`HTTP error ${response.status}`);
  }

  return response.json();
}
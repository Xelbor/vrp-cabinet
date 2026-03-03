export async function fetchHome(token: string) {
  const response = await fetch(`/api/home`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${token}`
    },
    body: JSON.stringify({}),
  })
  
  if (!response.ok) {
    throw new Error(`HTTP error ${response.status}`);
  }

  return response.json();
}

export async function deleteDevice(hwid: string, token: string) {
  const response = await fetch(`/api/delete_hwid_user`, {
    method: 'POST',
    headers: {
      "Content-Type": "application/json",
      "Authorization": `Bearer ${token}`
    },
    body: JSON.stringify({ hwid }),
  });

  if (!response.ok) {
    throw new Error(`HTTP error ${response.status}`);
  }
}
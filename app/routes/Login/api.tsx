const api = import.meta.env.VITE_APP_API;

if (!api) throw new Error("API URL is not available in enviroment");

export async function verifyDomain(credentials: { domainName: string }) {
  const response = await fetch(`${api}/api/superuser/check-domain`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(credentials),
  });

  if (!response) {
    alert("Invalid credentials");
    throw new Error(response.message);
  }

  return response.json();
}

export async function loginUser(credentials: {
  domainName: string;
  email: string;
  password: string;
}) {
  const response = await fetch(`${api}/api/superuser/check-credentials`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(credentials),
  });
  if (!response) {
    alert("Invalid credentials");
    throw new Error(response.message);
  }
  return response.json();
}

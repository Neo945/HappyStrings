export default async function lookup(method, data, endpoint) {
  if (method === "GET") {
    console.log("lookup", method, data, endpoint);
    const response = await fetch(`http://localhost:5000/api${endpoint}`, {
      method: method,
      credentials: "include",
      mode: "cors",
      headers: {
        "Content-type": "application/json",
      },
    });
    return [await response.json(), response.status];
    // return response
  }
  console.log("JSON.stringify(data)");
  console.log(JSON.stringify(data));
  const response = await fetch(`http://localhost:5000/api${endpoint}`, {
    method: method,
    body: JSON.stringify(data),
    credentials: "include",
    mode: "cors",
    headers: {
      "Content-type": "application/json",
    },
  });
  return [await response.json(), response.status];
}

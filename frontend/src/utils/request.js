export async function requestPost(url, body) {
  const token = await localStorage.getItem("token");
  const res = await fetch(url, {
    method: "POST",
    body: JSON.stringify(body),
    headers: {
      "content-type": "application/json",
      authorization: `Bearer ${token}`,
    },
  });

  return res.json();
}

export async function requestPut(url, body) {
  const token = await localStorage.getItem("token");
  const res = await fetch(url, {
    method: "PUT",
    body: JSON.stringify(body),
    headers: {
      "content-type": "application/json",
      authorization: `Bearer ${token}`,
    },
  });

  return res.json();
}

export async function requestDelete(url) {
  const token = await localStorage.getItem("token");
  const res = await fetch(url, {
    method: "DELETE",
  });
}

export async function requestGet(url) {
  const token = await localStorage.getItem("token");

  const res = await fetch(url, {
    method: "GET",
    headers: {
      "content-type": "application/json",
      authorization: `Bearer ${token}`,
    },
  });
  return res.json();
}

export async function setToken(token) {
  await window.localStorage.setItem("token", token);
}

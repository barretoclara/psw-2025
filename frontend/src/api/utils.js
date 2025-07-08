const getAuthHeader = () => {
  const token = localStorage.getItem("token");
  return token ? { Authorization: `Bearer ${token}` } : {};
};

export const httpGet = (url, options = {}) =>
  fetch(url, {
    headers: {
      "Content-Type": "application/json",
      ...getAuthHeader(),
      ...(options.headers || {})
    },
    ...options,
  }).then((res) => res.json());

export const httpPost = (url, data, options = {}) =>
  fetch(url, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      ...getAuthHeader(),
      ...(options.headers || {})
    },
    body: JSON.stringify(data),
    ...options,
  }).then((res) => res.json());

export const httpPut = (url, data, options = {}) =>
  fetch(url, {
    method: "PUT",
    headers: {
      "Content-Type": "application/json",
      ...getAuthHeader(),
      ...(options.headers || {})
    },
    body: JSON.stringify(data),
    ...options,
  }).then((res) => res.json());

export const httpDelete = (url, options = {}) =>
  fetch(url, {
    method: "DELETE",
    headers: {
      "Content-Type": "application/json",
      ...getAuthHeader(),
      ...(options.headers || {})
    },
    ...options,
  }).then((res) => res.ok ? res : Promise.reject(res));
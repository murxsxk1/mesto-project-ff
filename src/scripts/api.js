const config = {
  baseUrl: 'https://nomoreparties.co/v1/wff-cohort-37',
  headers: {
    authorization: 'edab2458-d5cb-4f06-95ab-ec7ccf05c210',
    'Content-Type': 'application/json'
  }
}

function checkResponse(res) {
  if (res.ok) {
    return res.json();
  }
    return Promise.reject(`Ошибка: ${res.status}`);
}

export const getProfileInfo = () => {
  return fetch(`${config.baseUrl}/users/me`, {
    headers: config.headers
  })
    .then(checkResponse);
}

export const getInitialCards = () => {
  return fetch(`${config.baseUrl}/cards`, {
    headers: config.headers
  })
    .then(checkResponse);
}

export const saveProfileInfo = (name, about) => {
  return fetch(`${config.baseUrl}/users/me`, {
    method: 'PATCH',
    headers: config.headers,
    body: JSON.stringify({
      name: name,
      about: about,
    })
  })
    .then(checkResponse);
}
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

// Загрузка информации о пользователе с сервера
export const getProfileInfo = () => {
  return fetch(`${config.baseUrl}/users/me`, {
    headers: config.headers
  })
    .then(checkResponse);
}

// Загрузка карточек с сервера
export const getInitialCards = () => {
  return fetch(`${config.baseUrl}/cards`, {
    headers: config.headers
  })
    .then(checkResponse);
}

// Редактирование профиля
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

// Добавление новой карточки
export const postNewCards = (name, link) => {
  return fetch(`${config.baseUrl}/cards`, {
    method: 'POST',
    headers: config.headers,
    body: JSON.stringify({
      name: name,
      link: link,
    })
  })
    .then(checkResponse);
}

// Удаление карточки
export const deleteNewCards = (cardId) => {
  return fetch(`${config.baseUrl}/cards/${cardId}`, {
    method: 'DELETE',
    headers: config.headers,
  })
    .then(checkResponse);
}

// Постановка и снятие лайка
export const toggleLike = (cardId, isLiked) => {
  return fetch(`${config.baseUrl}/cards/likes/${cardId}`, {
    method: isLiked ? 'PUT' : 'DELETE',
    headers: config.headers,
  })
    .then(checkResponse);
}

// Обновление аватара пользователя
export const updateAvatar = (avatar) => {
  return fetch(`${config.baseUrl}/users/me/avatar`, {
    method: 'PATCH',
    headers: config.headers,
  })
    .then(checkResponse);
}
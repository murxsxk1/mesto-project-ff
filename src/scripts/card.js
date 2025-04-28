// ***Скрипт, содержащий функции для работы карточек***

import { deleteNewCards, toggleLike } from './api.js';

// Получаем шаблон карточки из HTML
const cardTemplate = document.querySelector('#card-template').content;

// === Функции ===

// *Функция создания карточки*
function createCard(
  cardData,
  deleteCard,
  handleImageClick,
  likeCard,
  userId
) {
  const cardElement = cardTemplate.querySelector('.card').cloneNode(true);
  
  // Находим и заполняем изображение карточки
  const cardImage = cardElement.querySelector('.card__image');
  cardImage.src = cardData.link; // Устанавливаем URL изображения
  cardImage.alt = cardData.name; // Устанавливаем альтернативный текст
  
  // Добавляем обработчик клика по изображению карточки
  cardImage.addEventListener('click', () => {
    // При клике вызываем переданную функцию handleImageClick с параметрами изображения
    handleImageClick(cardData.link, cardData.name);
  });
  
  // Находим и заполняем заголовок карточки
  const cardTitle = cardElement.querySelector('.card__title'); // Находим элемент заголовка карточки
  cardTitle.textContent = cardData.name; // Устанавливаем текст заголовка
  
  // Находим кнопку удаления и добавляем обработчик
  const cardDeleteButton = cardElement.querySelector('.card__delete-button'); // Находим кнопку удаления карточки
  
  // Проверяем, является ли текущий пользователь владельцем карточки
  if (cardData.owner && cardData.owner._id !== userId) {
    cardDeleteButton.remove(); // Если нет, удаляем кнопку удаления
  } else {
    cardDeleteButton.addEventListener('click', () => {
      deleteCard(cardElement, cardData._id); // При клике вызываем функцию удаления карточки
    });
  }
  
  const cardLikeButton = cardElement.querySelector('.card__like-button'); // Находим кнопку лайка карточки
  const cardLikeCounter = cardElement.querySelector('.card__like-counter'); // Находим элемент счетчика лайков
  
  // Проверяем, есть ли лайк от текущего пользователя
  if (cardData.likes.some((user) => user._id === userId)) {
    cardLikeButton.classList.add('card__like-button_is-active'); // Если есть, добавляем класс активности
  }
  
  // Добавляем обработчик клика по кнопке лайка
  cardLikeButton.addEventListener('click', () => {
    // Передаем непосредственно кнопку, счетчик и ID карточки в функцию лайка
    likeCard(cardLikeButton, cardLikeCounter, cardData._id);
  });
  
  // Устанавливаем количество лайков
  cardLikeCounter.textContent = cardData.likes.length;
  
  // Возвращаем заполненный элемент карточки
  return cardElement;
}

// *Простая функция удаления карточки (без модального окна)*
function deleteCard(cardElement, cardId) {
  deleteNewCards(cardId)
    .then(() => {
      // Удаляем карточку из DOM
      cardElement.remove();
    })
    .catch((err) => {
      console.log(`Ошибка при загрузке данных: ${err}`);
    });
}

// *Функция лайка карточки*
function likeCard(likeButton, likeCounter, cardId) {
  const isLiked = likeButton.classList.contains('card__like-button_is-active'); // Проверяем, есть ли лайк от текущего пользователя
  
  // Отправляем запрос на постановку/снятие лайка
  toggleLike(cardId, !isLiked)
    .then((res) => {
      // Обновляем счетчик лайков
      likeCounter.textContent = res.likes.length; // Устанавливаем новое количество лайков
      likeButton.classList.toggle('card__like-button_is-active'); // Переключаем класс активности
    })
    .catch((err) => {
      console.log(`Ошибка при загрузке данных: ${err}`);
    });
}

export { createCard, likeCard, deleteCard };
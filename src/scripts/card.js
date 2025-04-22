// ***Скрипт, содержащий функции для работы карточек***
import { deleteNewCards } from './api.js';
// Получаем шаблон карточки из HTML
const cardTemplate = document.querySelector("#card-template").content;

// === Функции ===
// *Функция создания карточки
function createCard(cardData,deleteCard,handleImageClick,handleLikeCard, userId) {
  const cardElement = cardTemplate.querySelector(".card").cloneNode(true);
  // Находим и заполняем изображение карточки
  const cardImage = cardElement.querySelector(".card__image");
  cardImage.src = cardData.link; // Устанавливаем URL изображения
  cardImage.alt = cardData.name; // Устанавливаем альтернативный текст
  // Добавляем обработчик клика по изображению карточки
  cardImage.addEventListener("click", () => {
    // При клике вызываем переданную функцию handleImageClick с параметрами изображения
    handleImageClick(cardData.link, cardData.name);
  });
  // Находим и заполняем заголовок карточки
  const cardTitle = cardElement.querySelector(".card__title");
  cardTitle.textContent = cardData.name;

  // Находим кнопку удаления и добавляем обработчик
  const cardDeleteButton = cardElement.querySelector(".card__delete-button");

  if (cardData.owner && cardData.owner._id !== userId) {
    cardDeleteButton.remove();
  } else {
    cardDeleteButton.addEventListener('click', () => {
      deleteCard(cardElement, cardData._id);
    })
  }

  const cardLikeButton = cardElement.querySelector('.card__like-button');

  if (cardData.likes && cardData.likes.some(user => user._id === userId)) {
    cardLikeButton.classList.add('card__like-button_is-active');
  }

  cardLikeButton.addEventListener('click', (evt) => {
    handleLikeCard(evt);
  });

  const cardLikeCounter = cardElement.querySelector('.card__like-counter');
  cardLikeCounter.textContent = cardData.likes.length;

  return cardElement;
}

// *Функция удаления карточки
function deleteCard(cardElement, cardId) {
  deleteNewCards(cardId)
    .then(() => {
      // Удаляем карточку из DOM
      cardElement.remove();
    })
    .catch((err) => {
      console.log(`Ошибка при загрузке данных: ${err}`);
    })
}

// *Функция лайка карточки
function likeCard(evt) {
  // Проверяем, что клик был именно по кнопке лайка
  if (evt.target.classList.contains("card__like-button")) {
    // Переключаем класс, отвечающий за активное состояние лайка
    evt.target.classList.toggle("card__like-button_is-active");
  }
}

export { createCard, likeCard, deleteCard };
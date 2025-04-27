// ***Скрипт, содержащий функции для работы карточек***
import { deleteNewCards, toggleLike } from './api.js';
import { openModal, closeModal } from './modal.js';
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

  if (cardData.likes.some(user => user._id === userId)) {
    cardLikeButton.classList.add('card__like-button_is-active');
  }

  cardLikeButton.addEventListener('click', (evt) => {
    handleLikeCard(evt, cardData._id);
  });

  const cardLikeCounter = cardElement.querySelector('.card__like-counter');
  cardLikeCounter.textContent = cardData.likes.length;

  return cardElement;
}

// *Функция удаления карточки
function deleteCard(cardElement, cardId) {
  const deletionCardPopup = document.querySelector('.popup_type_delete-card');
  const confirmButton = deletionCardPopup.querySelector('.popup__button');
  
  // Открываем попап подтверждения
  openModal(deletionCardPopup);
  
  // Обработчик для кнопки "Да"
  function handleConfirm() {
    deleteNewCards(cardId)
      .then(() => {
        cardElement.remove();
        closeModal(deletionCardPopup);
      })
      .catch(err => console.log(`Ошибка: ${err}`));
    
    // Удаляем обработчик после использования
    confirmButton.removeEventListener('click', handleConfirm);
  }
  
  // Вешаем обработчик на кнопку "Да"
  confirmButton.addEventListener('click', handleConfirm);
}

// *Функция лайка карточки
function likeCard(evt, cardId) {
  
  const likeButton = evt.target;
  const isLiked = likeButton.classList.contains('card__like-button_is-active');

  toggleLike(cardId, !isLiked)
    .then((res) => {
      const cardLikeCounter = likeButton.closest('.card').querySelector('.card__like-counter');
      cardLikeCounter.textContent = res.likes.length;
      likeButton.classList.toggle("card__like-button_is-active");
    })
    .catch((err) => {
      console.log(`Ошибка при загрузке данных: ${err}`);
    })
}

export { createCard, likeCard, deleteCard };
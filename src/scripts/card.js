// ***Скрипт, содержащий функции для работы карточек***
import { deleteNewCards, toggleLike } from "./api.js";
import { openModal, closeModal } from "./modal.js";

// Получаем шаблон карточки из HTML
const cardTemplate = document.querySelector("#card-template").content; 

// === Функции ===
// *Функция создания карточки
function createCard(
  cardData,
  deleteCard,
  handleImageClick,
  handleLikeCard,
  userId
) {
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
  const cardTitle = cardElement.querySelector(".card__title"); // Находим элемент заголовка карточки
  cardTitle.textContent = cardData.name; // Устанавливаем текст заголовка

  // Находим кнопку удаления и добавляем обработчик
  const cardDeleteButton = cardElement.querySelector(".card__delete-button"); // Находим кнопку удаления карточки
  
  // Проверяем, является ли текущий пользователь владельцем карточки
  if (cardData.owner && cardData.owner._id !== userId) {
    cardDeleteButton.remove(); // Если нет, удаляем кнопку удаления
  } else {
    cardDeleteButton.addEventListener("click", () => {
      deleteCard(cardElement, cardData._id); // При клике вызываем функцию удаления карточки
    });
  }

  const cardLikeButton = cardElement.querySelector(".card__like-button"); // Находим кнопку лайка карточки
  
  // Проверяем, есть ли лайк от текущего пользователя
  if (cardData.likes.some((user) => user._id === userId)) { 
    cardLikeButton.classList.add("card__like-button_is-active"); // Если есть, добавляем класс активности
  }

  cardLikeButton.addEventListener("click", (evt) => {
    handleLikeCard(evt, cardData._id); // При клике вызываем функцию лайка карточки
  }); 

  // Находим и заполняем счетчик лайков карточки
  const cardLikeCounter = cardElement.querySelector(".card__like-counter"); // Находим элемент счетчика лайков
  cardLikeCounter.textContent = cardData.likes.length; // Устанавливаем количество лайков

  // Возвращаем заполненный элемент карточки
  return cardElement;
}

// *Функция удаления карточки
function deleteCard(cardElement, cardId) {

  // Получаем попап подтверждения удаления карточки
  const deletionCardPopup = document.querySelector(".popup_type_delete-card"); // Находим попап удаления карточки
  const confirmButton = deletionCardPopup.querySelector(".popup__button"); // Находим кнопку подтверждения удаления

  // Открываем попап подтверждения
  openModal(deletionCardPopup);

  // Обработчик для кнопки 'Да'
  function handleConfirm() {
    deleteNewCards(cardId) // Отправляем запрос на удаление карточки
      .then(() => {
        cardElement.remove(); // Удаляем карточку из DOM
        closeModal(deletionCardPopup); // Закрываем попап
      })
      .catch((err) => console.log(`Ошибка: ${err}`));

    // Удаляем обработчик после использования
    confirmButton.removeEventListener("click", handleConfirm);
  }

  // Вешаем обработчик на кнопку 'Да'
  confirmButton.addEventListener("click", handleConfirm);
}

// *Функция лайка карточки
function likeCard(evt, cardId) {
  const likeButton = evt.target; // Получаем кнопку лайка карточки
  const isLiked = likeButton.classList.contains("card__like-button_is-active"); // Проверяем, есть ли лайк от текущего пользователя

  // Отправляем запрос на постановку/снятие лайка
  toggleLike(cardId, !isLiked) 
    .then((res) => {
      const cardLikeCounter = likeButton.closest(".card").querySelector(".card__like-counter"); // Находим элемент счетчика лайков
      // Обновляем счетчик лайков
      cardLikeCounter.textContent = res.likes.length; // Устанавливаем новое количество лайков
      likeButton.classList.toggle("card__like-button_is-active"); // Переключаем класс активности
    })
    .catch((err) => {
      console.log(`Ошибка при загрузке данных: ${err}`);
    });
}

export { createCard, likeCard, deleteCard };
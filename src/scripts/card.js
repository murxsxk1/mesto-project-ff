// ***Скрипт, содержащий функции для работы карточек***

// Получаем шаблон карточки из HTML
const cardTemplate = document.querySelector("#card-template").content;

// === Функции ===
// *Функция создания карточки
function createCard(
  cardData,
  handleDeleteCard,
  handleImageClick,
  handleLikeCard
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
  // Добавляем обработчик лайка на всю карточку (делегирование событий)
  cardElement.addEventListener("click", handleLikeCard);
  // Находим и заполняем заголовок карточки
  const cardTitle = cardElement.querySelector(".card__title");
  cardTitle.textContent = cardData.name;
  // Находим кнопку удаления и добавляем обработчик
  const cardDeleteButton = cardElement.querySelector(".card__delete-button");
  cardDeleteButton.addEventListener("click", () =>
    handleDeleteCard(cardElement)
  );
  // Возвращаем готовый DOM-элемент карточки
  return cardElement;
}

// *Функция удаления карточки
function deleteCard(cardElement) {
  // Удаляем карточку из DOM
  cardElement.remove();
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
// ***Скрипт, содержащий функции для работы карточек***

// Получаем шаблон карточки из HTML
const cardTemplate = document.querySelector("#card-template").content;

// === Функции ===
// *Функция создания карточки
function createCard(makeCard, deleteProcessing, imageClick, cardLike) {
  const cardElement = cardTemplate.querySelector(".card").cloneNode(true);
  // Находим и заполняем изображение карточки
  const cardImage = cardElement.querySelector(".card__image");
  cardImage.src = makeCard.link; // Устанавливаем URL изображения
  cardImage.alt = makeCard.name; // Устанавливаем альтернативный текст
  // Добавляем обработчик клика по изображению карточки
  cardImage.addEventListener("click", () => {
    // При клике вызываем переданную функцию imageClick с параметрами изображения
    imageClick(makeCard.link, makeCard.name);
  });
  // Добавляем обработчик лайка на всю карточку (делегирование событий)
  cardElement.addEventListener("click", cardLike);
  // Находим и заполняем заголовок карточки
  const cardTitle = cardElement.querySelector(".card__title");
  cardTitle.textContent = makeCard.name;
  // Находим кнопку удаления и добавляем обработчик
  const cardDeleteButton = cardElement.querySelector(".card__delete-button");
  cardDeleteButton.addEventListener("click", () =>
    deleteProcessing(cardElement)
  );
  // Возвращаем готовый DOM-элемент карточки
  return cardElement;
}

// *Функция удаления карточки
function deleteCard(cardElement) {
  // Удаляем карточку из DOM
  cardElement.remove();
}

// *Функция-обработчик события лайка карточки
const cardLike = (evt) => {
  // Проверяем, что клик был именно по кнопке лайка
  if (evt.target.classList.contains("card__like-button")) {
    // Переключаем класс, отвечающий за активное состояние лайка
    evt.target.classList.toggle("card__like-button_is-active");
  }
};

export { createCard, cardLike, deleteCard };
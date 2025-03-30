// ******
//Темплейт карточки
const cardTemplate = document.querySelector("#card-template").content;

//Функция создания карточки
function createCard(makeCard, deleteProcessing, imageClick, cardLike) {
  // Клонирование карточек
  const cardElement = cardTemplate.querySelector(".card").cloneNode(true);

  // Сопоставление данных карточки и массива
  const cardImage = cardElement.querySelector(".card__image");
  cardImage.src = makeCard.link;
  cardImage.alt = makeCard.name;

  // Обработчик клика по картинке
  cardImage.addEventListener("click", () => {
    imageClick(makeCard.link, makeCard.name);
  });

  // Обработчик клика по кнопке лайка
  cardElement.addEventListener("click", cardLike);

  const cardTitle = cardElement.querySelector(".card__title");
  cardTitle.textContent = makeCard.name;

  const cardDeleteButton = cardElement.querySelector(".card__delete-button");
  cardDeleteButton.addEventListener("click", () => deleteCard(cardElement));

  return cardElement;
}

// Функция, обрабатывающая событие лайка
const cardLike = (evt) => {
  if (evt.target.classList.contains("card__like-button")) {
    evt.target.classList.toggle("card__like-button_is-active");
  }
};

// Функция, обрабатывающая удаление карточки
function deleteCard(cardElement) {
  cardElement.remove();
}

export { createCard, cardLike, deleteCard };
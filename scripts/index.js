// @todo: Темплейт карточки
const cardTemplate = document.querySelector("#card-template").content;

// @todo: DOM узлы
const placesList = document.querySelector(".places__list");

// @todo: Функция создания карточки
function makeCards(singleCard, deleteProcessing) {
  const cardElement = cardTemplate.querySelector(".card").cloneNode(true);

  const cardImage = cardElement.querySelector(".card__image");
  cardImage.src = singleCard.link;
  cardImage.alt = singleCard.name;

  const cardTitle = cardElement.querySelector(".card__title");
  cardTitle.textContent = singleCard.name;

  const cardDeleteButton = cardElement.querySelector(".card__delete-button");
  cardDeleteButton.addEventListener("click", deleteProcessing);

  return cardElement;
}

// @todo: Функция удаления карточки
function deleteCards(evt) {
  const deletionButton = evt.target;
  const removedCard = deletionButton.closest(".card");
  removedCard.remove();
}

// @todo: Вывести карточки на страницу
function renderCards() {
  initialCards.forEach(function (item) {
    const card = makeCards(item, deleteCards);
    placesList.append(card);
  });
}

renderCards();
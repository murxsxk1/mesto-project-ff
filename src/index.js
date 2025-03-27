import './pages/index.css';
import { initialCards } from './scripts/cards.js';
// @todo: Темплейт карточки
const cardTemplate = document.querySelector("#card-template").content;

// @todo: DOM узлы
const placesList = document.querySelector(".places__list");

// @todo: Функция создания карточки
function makeCards(createCard, deleteProcessing) {
  const cardElement = cardTemplate.querySelector(".card").cloneNode(true);

  const cardImage = cardElement.querySelector(".card__image");
  cardImage.src = createCard.link;
  cardImage.alt = createCard.name;

  const cardTitle = cardElement.querySelector(".card__title");
  cardTitle.textContent = createCard.name;

  const cardDeleteButton = cardElement.querySelector(".card__delete-button");
  cardDeleteButton.addEventListener("click", () => deleteCard(cardElement));

  return cardElement;
}

// @todo: Функция удаления карточки
function deleteCard(cardElement) {
  cardElement.remove();
}

// @todo: Вывести карточки на страницу
function renderCards() {
  initialCards.forEach(function (item) {
    const card = makeCards(item, deleteCard);
    placesList.append(card);
  });
}

renderCards();
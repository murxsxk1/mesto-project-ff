//***Основной скрипт, собирающий все приложение***
import "./pages/index.css";
import { createCard, cardLike, deleteCard } from "./scripts/card.js";
import { initialCards } from "./scripts/cards.js";
import { openModal, closeModal } from "./scripts/modal.js";

//DOM узлы
const nameInput = document.querySelector(".popup__input_type_name");
const editPopup = document.querySelector(".popup_type_edit");
const jobInput = document.querySelector(".popup__input_type_description");
const placesList = document.querySelector(".places__list");

const popups = document.querySelectorAll(".popup");

const editButton = document.querySelector(".profile__edit-button");

const addButton = document.querySelector(".profile__add-button");
const addPopup = document.querySelector(".popup_type_new-card");

const imagePopup = document.querySelector(".popup_type_image");
const imageElem = document.querySelector(".popup__image");
const imageCaption = document.querySelector(".popup__caption");

const closeButtons = document.querySelectorAll(".popup__close");

const formElement = document.querySelector(".popup__form");

const cardNameInput = document.querySelector(".popup__input_type_card-name");
const urlInput = document.querySelector(".popup__input_type_url");
const newPlace = document.querySelector("[name='new-place']");

// Обработка нажатия на изображение
const imageClick = (imageSrc, imageAlt) => {
  imageElem.src = imageSrc;
  imageElem.alt = imageAlt;
  imageCaption.textContent = imageAlt;
  openModal(imagePopup);
};

//Функция вывода карточки на страницу
function renderCards() {
  initialCards.forEach(function (item) {
    const card = createCard(item, deleteCard, imageClick, cardLike);
    placesList.append(card);
  });
}

renderCards();

// Обработка кнопки редактирования профиля
editButton.addEventListener("click", () => {
  // Заполняем поля перед открытием
  nameInput.value = document.querySelector(".profile__title").textContent;
  jobInput.value = document.querySelector(".profile__description").textContent;
  // Открываем попап
  openModal(editPopup);
});

// Обработка кнопки добавления карточки
addButton.addEventListener("click", () => {
  openModal(addPopup);
});

// Реализация закрытия карточки
closeButtons.forEach((item) => {
  item.addEventListener("click", () => {
    const popup = item.closest(".popup");
    closeModal(popup);
  });
});

// Реализация закрытия карточки при клике по оверлею
popups.forEach((item) => {
  item.addEventListener("click", (evt) => {
    if (evt.target === item) {
      closeModal(item);
    }
  });
});

// Обработчик формы с именем и работой
const handleFormSubmit = (evt) => {
  evt.preventDefault();
  document.querySelector(".profile__title").textContent = nameInput.value;
  document.querySelector(".profile__description").textContent = jobInput.value;
  const openedPopup = document.querySelector(".popup_is-opened");
  closeModal(openedPopup);
};

formElement.addEventListener("submit", handleFormSubmit);

// Обработчик формы с добавлением карточки
const handleCardSubmit = (evt) => {
  evt.preventDefault();

  const newCard = { name: cardNameInput.value, link: urlInput.value };
  initialCards.push(newCard);

  const card = createCard(newCard, deleteCard, imageClick, cardLike);
  placesList.prepend(card);

  const openedPopup = document.querySelector(".popup_is-opened");
  closeModal(openedPopup);

  evt.target.reset();
};

newPlace.addEventListener("submit", handleCardSubmit);
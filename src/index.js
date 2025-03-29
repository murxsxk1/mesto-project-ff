//Основной скрипт, собирающий все приложение
import "./pages/index.css";
import { initialCards } from "./scripts/cards.js";

//Темплейт карточки
const cardTemplate = document.querySelector("#card-template").content;

//DOM узлы
const placesList = document.querySelector(".places__list");

//Функция создания карточки
function createCard(makeCard, deleteProcessing) {
  const cardElement = cardTemplate.querySelector(".card").cloneNode(true);

  const cardImage = cardElement.querySelector(".card__image");
  cardImage.src = makeCard.link;
  cardImage.alt = makeCard.name;

  const cardTitle = cardElement.querySelector(".card__title");
  cardTitle.textContent = makeCard.name;

  const cardDeleteButton = cardElement.querySelector(".card__delete-button");
  cardDeleteButton.addEventListener("click", () => deleteCard(cardElement));

  return cardElement;
}

//Функция удаления карточки
function deleteCard(cardElement) {
  cardElement.remove();
}

//Функция вывода карточки на страницу
function renderCards() {
  initialCards.forEach(function (item) {
    const card = createCard(item, deleteCard);
    placesList.append(card);
  });
}

renderCards();

// Добавление DOM-элементов
const popups = document.querySelectorAll('.popup');

const editButton = document.querySelector('.profile__edit-button');
const editPopup = document.querySelector('.popup_type_edit');

const addButton = document.querySelector('.profile__add-button');
const addPopup = document.querySelector('.popup_type_new-card');

const cardImage = document.querySelectorAll('.card__image');
const imagePopup = document.querySelector('.popup_type_image');
const imageElem = document.querySelector('.popup__image');
const imageCaption = document.querySelector('.popup__caption');

const closeButtons = document.querySelectorAll('.popup__close');

// Функция открытия поп-апа
const openModal = (popup) => {
  popup.classList.add('popup__opened');
}

// Функция закрытия поп-апа
const closeModal = (popup) => {
  popup.classList.remove('popup__opened');
}

// Обработка кнопки редактирования профиля
editButton.addEventListener('click', () => {
  openModal(editPopup);
});

// Обработка кнопки добавления карточки
addButton.addEventListener('click', () => {
  openModal(addPopup);
});

// Обработка нажатия на изображение
cardImage.forEach((item) => {
  item.addEventListener('click', () => {
    openModal(imagePopup);
    imageElem.src = item.src;
    imageElem.alt = item.alt;
    imageCaption.textContent = item.alt;
  })
})

// Реализация закрытия карточки
closeButtons.forEach((item) => {
  item.addEventListener('click', () => {
    const popup = item.closest('.popup');
    closeModal(popup);
  })
})

// Реализация закрытия карточки при клике по оверлею
popups.forEach((item) => {
  item.addEventListener('click', (evt) => {
    if (evt.target === item) {
      closeModal(item);
    }
  })
})

// Реализация закрытия карточки при нажатии ESC
document.addEventListener('keydown', (evt) => {
  if (evt.key === 'Escape') {
    const openedPopup = document.querySelector('.popup__opened');
    if (openedPopup){
      closeModal(openedPopup);
    }
  }

 
})
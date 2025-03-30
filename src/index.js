//Основной скрипт, собирающий все приложение
import "./pages/index.css";
import { initialCards } from "./scripts/cards.js";

//Темплейт карточки
const cardTemplate = document.querySelector("#card-template").content;

//DOM узлы
const placesList = document.querySelector(".places__list");

const popups = document.querySelectorAll('.popup');

const editButton = document.querySelector('.profile__edit-button');
const editPopup = document.querySelector('.popup_type_edit');

const addButton = document.querySelector('.profile__add-button');
const addPopup = document.querySelector('.popup_type_new-card');

const imagePopup = document.querySelector('.popup_type_image');
const imageElem = document.querySelector('.popup__image');
const imageCaption = document.querySelector('.popup__caption');

const closeButtons = document.querySelectorAll('.popup__close');

const formElement = document.querySelector('.popup__form');

const nameInput = document.querySelector('.popup__input_type_name');
const jobInput = document.querySelector('.popup__input_type_description');

const cardNameInput = document.querySelector('.popup__input_type_card-name');
const urlInput = document.querySelector('.popup__input_type_url');
const newPlace = document.querySelector('[name="new-place"]');

//Функция создания карточки
function createCard(makeCard, deleteProcessing, imageClick, cardLike) {
  // Клонирование карточек
  const cardElement = cardTemplate.querySelector(".card").cloneNode(true);

  // Сопоставление данных карточки и массива
  const cardImage = cardElement.querySelector(".card__image");
  cardImage.src = makeCard.link;
  cardImage.alt = makeCard.name;

  // Обработчик клика по картинке
  cardImage.addEventListener('click', () => {
    imageClick(makeCard.link, makeCard.name);
  })
  
  // Обработчик клика по кнопке лайка
  cardElement.addEventListener('click', cardLike);

  const cardTitle = cardElement.querySelector(".card__title");
  cardTitle.textContent = makeCard.name;

  const cardDeleteButton = cardElement.querySelector(".card__delete-button");
  cardDeleteButton.addEventListener("click", () => deleteCard(cardElement));

  return cardElement;
}

// Функция лайка
const cardLike = (evt) => {
  if (evt.target.classList.contains('card__like-button')) {
      evt.target.classList.toggle('card__like-button_is-active')
  }
}

//Функция удаления карточки
function deleteCard(cardElement) {
  cardElement.remove();
}

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

// Функция открытия поп-апа
const openModal = (popup) => {
  if (popup === editPopup) {
    nameInput.value = document.querySelector('.profile__title').textContent;
    jobInput.value = document.querySelector('.profile__description').textContent;
  }
  popup.classList.add('popup__opened');
  document.addEventListener('keydown', escapeModaleClose);
};

// Функция закрытия поп-апа
const closeModal = (popup) => {
  popup.classList.remove('popup__opened');
  document.removeEventListener('keydown', escapeModaleClose);
};

// Обработка кнопки редактирования профиля
editButton.addEventListener('click', () => {
  openModal(editPopup);
});

// Обработка кнопки добавления карточки
addButton.addEventListener('click', () => {
  openModal(addPopup);
});

// Реализация закрытия карточки
closeButtons.forEach((item) => {
  item.addEventListener('click', () => {
    const popup = item.closest('.popup');
    closeModal(popup);
  });
});

// Реализация закрытия карточки при клике по оверлею
popups.forEach((item) => {
  item.addEventListener('click', (evt) => {
    if (evt.target === item) {
      closeModal(item);
    }
  });
});

// Функция закрытия карточки при нажатии ESC
const escapeModaleClose = (evt) => {
  if (evt.key === 'Escape') {
    const openedPopup = document.querySelector('.popup__opened');
    if (openedPopup){
      closeModal(openedPopup);
    };
  };
};

// Обработчик формы с именем и работой
const handleFormSubmit = (evt) => {
    evt.preventDefault(); 
    document.querySelector('.profile__title').textContent = nameInput.value;
    document.querySelector('.profile__description').textContent = jobInput.value;
    const openedPopup = document.querySelector('.popup__opened');
    closeModal(openedPopup);
}

formElement.addEventListener('submit', handleFormSubmit);

// Обработчик формы с добавлением карточки
const handleCardSubmit = (evt) => {
  evt.preventDefault(); 

  const newCard = {name: cardNameInput.value, link: urlInput.value};
  initialCards.push(newCard);

  const card = createCard(newCard, deleteCard, imageClick, cardLike);
  placesList.prepend(card);

  const openedPopup = document.querySelector('.popup__opened');
  closeModal(openedPopup);

  evt.target.reset();
}

newPlace.addEventListener('submit', handleCardSubmit);



//***Основной скрипт, собирающий все приложение***

import "./pages/index.css";
import { createCard, cardLike, deleteCard } from "./scripts/card.js";
import { initialCards } from "./scripts/cards.js";
import { openModal, closeModal } from "./scripts/modal.js";

// === DOM узлы ===
// *Попапы
const editPopup = document.querySelector(".popup_type_edit"); // Попап редактирования профиля
const addPopup = document.querySelector(".popup_type_new-card"); // Попап добавления карточки
const imagePopup = document.querySelector(".popup_type_image"); // Попап с изображением

// *Поля ввода
const nameInput = document.querySelector(".popup__input_type_name"); // Поле ввода имени
const jobInput = document.querySelector(".popup__input_type_description"); // Поле ввода описания работы
const cardNameInput = document.querySelector(".popup__input_type_card-name"); // Поле ввода названия места
const urlInput = document.querySelector(".popup__input_type_url"); // Поле ввода URL изображения

// *Кнопки
const closeButtons = document.querySelectorAll(".popup__close"); // Все кнопки закрытия попапов
const editButton = document.querySelector(".profile__edit-button"); // Кнопка редактирования профиля
const addButton = document.querySelector(".profile__add-button"); // Кнопка добавления новой карточки

// *Формы
const formElement = document.querySelector(".popup__form"); // Форма редактирования профиля
const newPlace = document.querySelector("[name='new-place']"); // Форма добавления нового места

// *Элементы изображений
const imageElem = document.querySelector(".popup__image"); // Элемент изображения в попапе
const imageCaption = document.querySelector(".popup__caption"); // Подпись к изображению

// *Иные DOM узлы
const placesList = document.querySelector(".places__list"); // Список карточек мест

// === Обработчики ===
// *Обработчик нажатия на изображение карточки
const imageClick = (imageSrc, imageAlt) => {
  imageElem.src = imageSrc; // Устанавливаем источник изображения
  imageElem.alt = imageAlt; // Устанавливаем альтернативный текст
  imageCaption.textContent = imageAlt; // Устанавливаем подпись
  openModal(imagePopup); // Открываем попап с изображением
};

// *Обработчик кнопки редактирования профиля
editButton.addEventListener("click", () => {
  // Заполняем поля попапа текущими значениями из профиля
  nameInput.value = document.querySelector(".profile__title").textContent;
  jobInput.value = document.querySelector(".profile__description").textContent;
  // Открываем попап редактирования
  openModal(editPopup);
});

// *Обработчик кнопки добавления карточки
addButton.addEventListener("click", () => {
  openModal(addPopup); // Открываем попап добавления карточки
});

// *Обработчик формы редактирования профиля
const handleFormSubmit = (evt) => {
  evt.preventDefault(); // Предотвращаем стандартное поведение формы
  // Обновляем данные профиля из полей формы
  document.querySelector(".profile__title").textContent = nameInput.value;
  document.querySelector(".profile__description").textContent = jobInput.value;
  // Закрываем открытый попап
  const openedPopup = document.querySelector(".popup_is-opened");
  closeModal(openedPopup);
};

// *Вешаем обработчик на форму редактирования профиля
formElement.addEventListener("submit", handleFormSubmit);

// *Обработчик формы добавления новой карточки
const handleCardSubmit = (evt) => {
  evt.preventDefault(); // Предотвращаем стандартное поведение формы
  // Создаем объект новой карточки из данных формы
  const newCard = { name: cardNameInput.value, link: urlInput.value };
  initialCards.push(newCard); // Добавляем карточку в массив
  // Создаем и добавляем DOM-элемент карточки
  const card = createCard(newCard, deleteCard, imageClick, cardLike);
  placesList.prepend(card); // Добавляем в начало списка
  // Закрываем попап
  const openedPopup = document.querySelector(".popup_is-opened");
  closeModal(openedPopup);
  evt.target.reset(); // Очищаем форму
};

// *Вешаем обработчик на форму добавления новой карточки
newPlace.addEventListener("submit", handleCardSubmit);

// === Реализация закрытия попапов по кнопке закрытия ===
closeButtons.forEach((item) => {
  item.addEventListener("click", () => {
    const popup = item.closest(".popup"); // Находим ближайший попап
    closeModal(popup); // Закрываем его
  });
});

// === Функции ===
// *Функция вывода карточек на страницу
function renderCards() {
  // Для каждой карточки из начального массива
  initialCards.forEach(function (item) {
    // Создаем DOM-элемент карточки
    const card = createCard(item, deleteCard, imageClick, cardLike);
    // Добавляем карточку в список
    placesList.append(card);
  });
}

// *Вызов функции с первоначальной отрисовкой карточек
renderCards();
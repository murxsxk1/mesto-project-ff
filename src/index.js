//***Основной скрипт, собирающий все приложение***

import "./pages/index.css";
import { createCard, likeCard, deleteCard } from "./scripts/card.js";
import { initialCards } from "./scripts/cards.js";
import { openModal, closeModal } from "./scripts/modal.js";

// === DOM узлы ===
// *Попапы
const profileEditPopup = document.querySelector(".popup_type_edit"); // Попап редактирования профиля
const cardAddPopup = document.querySelector(".popup_type_new-card"); // Попап добавления карточки
const imageViewPopup = document.querySelector(".popup_type_image"); // Попап с изображением

// *Поля ввода
const profileNameInput = document.querySelector(".popup__input_type_name"); // Поле ввода имени
const profileJobInput = document.querySelector(".popup__input_type_description"); // Поле ввода описания работы
const cardNameInput = document.querySelector(".popup__input_type_card-name"); // Поле ввода названия места
const cardUrlInput = document.querySelector(".popup__input_type_url"); // Поле ввода URL изображения

// *Кнопки
const popupCloseButtons = document.querySelectorAll(".popup__close"); // Все кнопки закрытия попапов
const profileEditButton = document.querySelector(".profile__edit-button"); // Кнопка редактирования профиля
const cardAddButton = document.querySelector(".profile__add-button"); // Кнопка добавления новой карточки

// *Формы
const profileEditForm = document.querySelector(".popup__form"); // Форма редактирования профиля
const cardAddForm = document.querySelector("[name='new-place']"); // Форма добавления нового места

// *Элементы изображений
const popupImageElement = document.querySelector(".popup__image"); // Элемент изображения в попапе
const popupImageCaption = document.querySelector(".popup__caption"); // Подпись к изображению

// *Элементы профиля
const profileTitleElement = document.querySelector(".profile__title"); // Имя профиля
const profileDescriptionElement = document.querySelector(".profile__description"); // Описание профиля

// *Иные DOM узлы
const cardsContainer = document.querySelector(".places__list"); // Список карточек мест

// === Обработчики ===
// *Обработчик кнопки редактирования профиля
profileEditButton.addEventListener("click", () => {
  // Заполняем поля попапа текущими значениями из профиля
  profileNameInput.value = profileTitleElement.textContent;
  profileJobInput.value = profileDescriptionElement.textContent;
  // Открываем попап редактирования
  openModal(profileEditPopup);
});

// *Обработчик кнопки добавления карточки
cardAddButton.addEventListener("click", () => {
  openModal(cardAddPopup); // Открываем попап добавления карточки
});

// *Обработчик формы редактирования профиля
const handleProfileFormSubmit = (evt) => {
  evt.preventDefault(); // Предотвращаем стандартное поведение формы
  // Обновляем данные профиля из полей формы
  profileTitleElement.textContent = profileNameInput.value;
  profileDescriptionElement.textContent = profileJobInput.value;
  // Закрываем открытый попап
  const openedPopup = document.querySelector(".popup_is-opened");
  closeModal(openedPopup);
};

// *Вешаем обработчик на форму редактирования профиля
profileEditForm.addEventListener("submit", handleProfileFormSubmit);

// *Обработчик формы добавления новой карточки
const handleCardFormSubmit = (evt) => {
  evt.preventDefault(); // Предотвращаем стандартное поведение формы
  // Создаем объект новой карточки из данных формы
  const newCard = { name: cardNameInput.value, link: cardUrlInput.value };
  initialCards.push(newCard); // Добавляем карточку в массив
  // Создаем и добавляем DOM-элемент карточки
  const card = createCard(newCard, deleteCard, openImagePopup, likeCard);
  cardsContainer.prepend(card); // Добавляем в начало списка
  // Закрываем попап
  const openedPopup = document.querySelector(".popup_is-opened");
  closeModal(openedPopup);
  evt.target.reset(); // Очищаем форму
};

// *Вешаем обработчик на форму добавления новой карточки
cardAddForm.addEventListener("submit", handleCardFormSubmit);

// === Реализация закрытия попапов по кнопке закрытия ===
popupCloseButtons.forEach((button) => {
  button.addEventListener("click", () => {
    const popup = button.closest(".popup"); // Находим ближайший попап
    closeModal(popup); // Закрываем его
  });
});

// === Функции ===
// *функция, которая отвечает за открытие попапа с увеличенным изображением карточки и заполнение его данными
const openImagePopup = (imageSrc, imageAlt) => {
  popupImageElement.src = imageSrc; // Устанавливаем источник изображения
  popupImageElement.alt = imageAlt; // Устанавливаем альтернативный текст
  popupImageCaption.textContent = imageAlt; // Устанавливаем подпись
  openModal(imageViewPopup); // Открываем попап с изображением
};

// *Функция вывода карточек на страницу
function renderInitialCards() {
  // Для каждой карточки из начального массива
  initialCards.forEach((item) => {
    // Создаем DOM-элемент карточки
    const card = createCard(item, deleteCard, openImagePopup, likeCard);
    // Добавляем карточку в список
    cardsContainer.append(card);
  });
}

// *Вызов функции с первоначальной отрисовкой карточек
renderInitialCards();
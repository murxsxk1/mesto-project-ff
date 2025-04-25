//***Основной скрипт, собирающий все приложение***

import "./pages/index.css";
import { createCard, likeCard, deleteCard } from "./scripts/card.js";
import { initialCards } from "./scripts/cards.js";
import { openModal, closeModal } from "./scripts/modal.js";
import { enableValidation, clearValidation } from './scripts/validation.js';
import { getProfileInfo, getInitialCards, saveProfileInfo, postNewCards, updateAvatar } from './scripts/api.js'

// === DOM узлы ===
// *Попапы
const profileEditPopup = document.querySelector(".popup_type_edit"); // Попап редактирования профиля
const cardAddPopup = document.querySelector(".popup_type_new-card"); // Попап добавления карточки
const imageViewPopup = document.querySelector(".popup_type_image"); // Попап с изображением
const avatarEditPopup = document.querySelector('.popup_type_new-avatar'); // Попап редактирования аватара

// *Поля ввода
const profileNameInput = document.querySelector(".popup__input_type_name"); // Поле ввода имени
const profileJobInput = document.querySelector(".popup__input_type_description"); // Поле ввода описания работы
const cardNameInput = document.querySelector(".popup__input_type_card-name"); // Поле ввода названия места
const cardUrlInput = document.querySelector(".popup__input_type_url"); // Поле ввода URL изображения
const avatarUrlInput = document.querySelector('.popup__input_type_avatar'); // Поле ввода URL аватара

// *Кнопки
const popupCloseButtons = document.querySelectorAll(".popup__close"); // Все кнопки закрытия попапов
const profileEditButton = document.querySelector(".profile__edit-button"); // Кнопка редактирования профиля
const cardAddButton = document.querySelector(".profile__add-button"); // Кнопка добавления новой карточки
const avatarEditButton = document.querySelector('.profile__avatar-edit-button'); // Кнопка редактирования аватара

// *Формы
const profileEditForm = document.querySelector("[name='edit-profile']"); // Форма редактирования профиля
const cardAddForm = document.querySelector("[name='new-place']"); // Форма добавления нового места
const avatarAddForm = document.querySelector("[name='new-avatar']");

// *Элементы изображений
const popupImageElement = document.querySelector(".popup__image"); // Элемент изображения в попапе
const popupImageCaption = document.querySelector(".popup__caption"); // Подпись к изображению

// *Элементы профиля
const profileTitleElement = document.querySelector(".profile__title"); // Имя профиля
const profileDescriptionElement = document.querySelector(".profile__description"); // Описание профиля
const profileAvatarElement = document.querySelector('.profile__image');

// *Иные DOM узлы
const cardsContainer = document.querySelector(".places__list"); // Список карточек мест

let userId;

// Конфиг валидации
const validationConfig = {
  formSelector: '.popup__form',                  // Селектор форм
  inputSelector: '.popup__input',                // Селектор полей ввода
  submitButtonSelector: '.popup__button',        // Селектор кнопок отправки
  inactiveButtonClass: 'popup__button_disabled', // Класс неактивной кнопки
  inputErrorClass: 'popup__input_type_error',    // Класс невалидного поля
  errorClass: 'popup__error_visible'             // Класс видимого сообщения об ошибке
};

// === Обработчики ===
// *Обработчик кнопки редактирования профиля
profileEditButton.addEventListener("click", () => {
  // Заполняем поля попапа текущими значениями из профиля
  profileNameInput.value = profileTitleElement.textContent;
  profileJobInput.value = profileDescriptionElement.textContent;
  clearValidation(profileEditPopup, validationConfig);
  // Открываем попап редактирования
  openModal(profileEditPopup);
});

// *Обработчик кнопки добавления карточки
cardAddButton.addEventListener("click", () => {
  clearValidation(cardAddPopup, validationConfig);
  openModal(cardAddPopup); // Открываем попап добавления карточки
});

avatarEditButton.addEventListener('click', () => {
  clearValidation(avatarEditPopup, validationConfig);
  openModal(avatarEditPopup); // Открываем попап редактирования аватара
})

// *Обработчик формы редактирования профиля
const handleProfileFormSubmit = (evt) => {
  evt.preventDefault(); // Предотвращаем стандартное поведение формы

  const name = profileNameInput.value;
  const about = profileJobInput.value;
  const profileSubmitButton = profileEditForm.querySelector('.popup__button');

  renderLoading(true, profileSubmitButton); // Показываем индикатор загрузки
  // Обновляем данные профиля из полей формы

  
  saveProfileInfo(name, about)
    .then((userData) => {
      profileTitleElement.textContent = userData.name;
      profileDescriptionElement.textContent = userData.about;
      closeModal(profileEditPopup);
    })
    .catch((err) => {
      console.log(`Ошибка при загрузке данных: ${err}`);
    })
    .finally(() => {
      renderLoading(false, profileSubmitButton);
    })
};

// *Вешаем обработчик на форму редактирования профиля
profileEditForm.addEventListener("submit", handleProfileFormSubmit);

// *Обработчик формы добавления новой карточки
const handleCardFormSubmit = (evt) => {
  evt.preventDefault(); // Предотвращаем стандартное поведение формы

  const name = cardNameInput.value;
  const link = cardUrlInput.value;
  const cardSubmitButton = cardAddForm.querySelector('.popup__button');

  renderLoading(true, cardSubmitButton);
  // Создаем объект новой карточки из данных формы


  postNewCards(name, link)
    .then((cardData) => {
      // Создаем и добавляем DOM-элемент карточки
      const card = createCard(cardData, deleteCard, openImagePopup, likeCard, userId);
      cardsContainer.prepend(card); // Добавляем в начало списка

      // Закрываем попап
      const openedPopup = document.querySelector(".popup_is-opened");
      closeModal(openedPopup);

      // Очищаем форму
      evt.target.reset(); 
    })
    .catch((err) => {
      console.log(`Ошибка при загрузке данных: ${err}`);
    })
    .finally(() => {
      renderLoading(false, cardSubmitButton);
    })
};

// *Вешаем обработчик на форму добавления новой карточки
cardAddForm.addEventListener("submit", handleCardFormSubmit);

const handleAvatarFormSubmit = (evt) => {
  evt.preventDefault();

  const avatar = avatarUrlInput.value;
  const avatarSubmitButton = avatarAddForm.querySelector('.popup__button');

  renderLoading(true, avatarSubmitButton); // Показываем индикатор загрузки



  updateAvatar(avatar)
    .then((avatarData) => {
      profileAvatarElement.style.backgroundImage = `url('${avatarData.avatar}')`;
      closeModal(avatarEditPopup);
      evt.target.reset(); // очищаем форму
    })
    .catch((err) => {
      console.log(`Ошибка при загрузке данных: ${err}`);
    })
    .finally(() => {
      renderLoading(false, avatarSubmitButton);
    })
}

avatarAddForm.addEventListener('submit', handleAvatarFormSubmit);

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
function renderCard(cardData) {
  const card = createCard(cardData, deleteCard, openImagePopup, likeCard, userId);
    // Добавляем карточку в список
    cardsContainer.append(card);
}

function renderLoading(isLoading, button) {
  if (isLoading) {
    button.textContent = "Сохранение..."; // Меняем текст на "Сохранение..."
  } else {
    button.textContent = "Сохранить"; // Возвращаем начальный текст
  }
}

Promise.all([getProfileInfo(), getInitialCards()])
  .then(([userData, cards]) => {
    userId = userData._id
    profileTitleElement.textContent = userData.name;
    profileDescriptionElement.textContent = userData.about;
    profileAvatarElement.style.backgroundImage = `url('${userData.avatar}')`;

  cards.forEach((cardData) => {
    renderCard(cardData);
  });
  })
  .catch((err) => {
    console.log(`Ошибка при загрузке данных: ${err}`);
  })

// Включаем валидацию для всех форм
enableValidation(validationConfig);
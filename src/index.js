//***Основной скрипт, собирающий все приложение***

import './pages/index.css';
import { createCard, likeCard, deleteCard } from './scripts/card.js';
import { openModal, closeModal } from './scripts/modal.js';
import { enableValidation, clearValidation } from './scripts/validation.js';
import { getProfileInfo, getInitialCards, saveProfileInfo, postNewCards, updateAvatar } from './scripts/api.js';

// === DOM узлы ===
// *Попапы
const profileEditPopup = document.querySelector('.popup_type_edit'); // Попап редактирования профиля
const cardAddPopup = document.querySelector('.popup_type_new-card'); // Попап добавления карточки
const imageViewPopup = document.querySelector('.popup_type_image'); // Попап с изображением
const avatarEditPopup = document.querySelector('.popup_type_new-avatar'); // Попап редактирования аватара

// *Поля ввода
const profileNameInput = document.querySelector('.popup__input_type_name'); // Поле ввода имени
const profileJobInput = document.querySelector('.popup__input_type_description'); // Поле ввода описания работы
const cardNameInput = document.querySelector('.popup__input_type_card-name'); // Поле ввода названия места
const cardUrlInput = document.querySelector('.popup__input_type_url'); // Поле ввода URL изображения
const avatarUrlInput = document.querySelector('.popup__input_type_avatar'); // Поле ввода URL аватара

// *Кнопки
const popupCloseButtons = document.querySelectorAll('.popup__close'); // Все кнопки закрытия попапов
const profileEditButton = document.querySelector('.profile__edit-button'); // Кнопка редактирования профиля
const cardAddButton = document.querySelector('.profile__add-button'); // Кнопка добавления новой карточки
const avatarEditButton = document.querySelector('.profile__avatar-edit-button'); // Кнопка редактирования аватара

// *Формы
const profileEditForm = document.querySelector('[name="edit-profile"]'); // Форма редактирования профиля
const cardAddForm = document.querySelector('[name="new-place"]'); // Форма добавления нового места
const avatarAddForm = document.querySelector('[name="new-avatar"]');

// *Элементы изображений
const popupImageElement = document.querySelector('.popup__image'); // Элемент изображения в попапе
const popupImageCaption = document.querySelector('.popup__caption'); // Подпись к изображению

// *Элементы профиля
const profileTitleElement = document.querySelector('.profile__title'); // Имя профиля
const profileDescriptionElement = document.querySelector('.profile__description'); // Описание профиля
const profileAvatarElement = document.querySelector('.profile__image'); // Аватар профиля

// *Иные DOM узлы
const cardsContainer = document.querySelector('.places__list'); // Список карточек мест
let userId; // ID пользователя, получаемый с сервера

// Конфиг валидации
const validationConfig = {
  formSelector: '.popup__form', // Селектор форм
  inputSelector: '.popup__input', // Селектор полей ввода
  submitButtonSelector: '.popup__button', // Селектор кнопок отправки
  inactiveButtonClass: 'popup__button_disabled', // Класс неактивной кнопки
  inputErrorClass: 'popup__input_type_error', // Класс невалидного поля
  errorClass: 'popup__error_visible', // Класс видимого сообщения об ошибке
};

// === Обработчики ===
// *Обработчик кнопки редактирования профиля
profileEditButton.addEventListener('click', () => {
  // Заполняем поля попапа текущими значениями из профиля
  profileNameInput.value = profileTitleElement.textContent; // Имя профиля
  profileJobInput.value = profileDescriptionElement.textContent; // Описание профиля

  // Очищаем ошибки валидации
  clearValidation(profileEditPopup, validationConfig); 

  // Открываем попап редактирования
  openModal(profileEditPopup);
});

// *Обработчик кнопки добавления карточки
cardAddButton.addEventListener('click', () => {
  clearValidation(cardAddPopup, validationConfig); // Очищаем ошибки валидации
  openModal(cardAddPopup); // Открываем попап добавления карточки
});

avatarEditButton.addEventListener('click', () => {
  clearValidation(avatarEditPopup, validationConfig); // Очищаем ошибки валидации
  openModal(avatarEditPopup); // Открываем попап редактирования аватара
});

// *Обработчик формы редактирования профиля
const handleProfileFormSubmit = (evt) => {
  evt.preventDefault(); // Предотвращаем стандартное поведение формы

  // Получаем значения из полей ввода
  const name = profileNameInput.value; // Имя профиля
  const about = profileJobInput.value; // Описание профиля

  // Получаем кнопку отправки формы
  const profileSubmitButton = profileEditForm.querySelector('.popup__button');

  // Показываем индикатор загрузки
  renderLoading(true, profileSubmitButton);

  // Обновляем данные профиля из полей формы
  saveProfileInfo(name, about)
    .then((userData) => {
      profileTitleElement.textContent = userData.name; // Имя профиля
      profileDescriptionElement.textContent = userData.about; // Описание профиля
      closeModal(profileEditPopup); // Закрываем попап редактирования профиля
    })
    .catch((err) => {
      console.log(`Ошибка при загрузке данных: ${err}`);
    })
    .finally(() => {
      renderLoading(false, profileSubmitButton);
    });
};

// *Вешаем обработчик на форму редактирования профиля
profileEditForm.addEventListener('submit', handleProfileFormSubmit);

// *Обработчик формы добавления новой карточки
const handleCardFormSubmit = (evt) => {
  evt.preventDefault(); // Предотвращаем стандартное поведение формы

  const name = cardNameInput.value; // Название места
  const link = cardUrlInput.value; // URL изображения
  const cardSubmitButton = cardAddForm.querySelector('.popup__button'); // Кнопка отправки формы
  
  // Показываем индикатор загрузки
  renderLoading(true, cardSubmitButton);

  // Создаем объект новой карточки из данных формы
  postNewCards(name, link)
    .then((cardData) => {
      // Создаем и добавляем DOM-элемент карточки
      const card = createCard(
        cardData,
        deleteCard,
        openImagePopup,
        likeCard,
        userId
      );
      cardsContainer.prepend(card); // Добавляем в начало списка

      // Закрываем попап
      const openedPopup = document.querySelector('.popup_is-opened'); // Находим открытый попап
      closeModal(openedPopup); // Закрываем его

      // Очищаем форму
      evt.target.reset(); // Очищаем поля ввода
    })
    .catch((err) => {
      console.log(`Ошибка при загрузке данных: ${err}`);
    })
    .finally(() => {
      renderLoading(false, cardSubmitButton); // Возвращаем текст кнопки
    });
};

// *Вешаем обработчик на форму добавления новой карточки
cardAddForm.addEventListener('submit', handleCardFormSubmit);

const handleAvatarFormSubmit = (evt) => {
  evt.preventDefault(); // Предотвращаем стандартное поведение формы
  
  // Получаем URL аватара из поля ввода
  const avatar = avatarUrlInput.value; // Получаем URL аватара из поля ввода
  
  // Получаем кнопку отправки формы
  const avatarSubmitButton = avatarAddForm.querySelector('.popup__button'); // Кнопка отправки формы

  renderLoading(true, avatarSubmitButton); // Показываем индикатор загрузки
  // Обновляем аватар из поля формы
  // Отправляем запрос на сервер с новым аватаром
  updateAvatar(avatar)
    .then((avatarData) => {
      profileAvatarElement.style.backgroundImage = `url('${avatarData.avatar}')`; // Обновляем аватар
      closeModal(avatarEditPopup); // Закрываем попап редактирования аватара
      evt.target.reset(); // очищаем форму
    })
    .catch((err) => {
      console.log(`Ошибка при загрузке данных: ${err}`);
    })
    .finally(() => {
      renderLoading(false, avatarSubmitButton); // Возвращаем текст кнопки
    });
};

avatarAddForm.addEventListener('submit', handleAvatarFormSubmit); // Вешаем обработчик на форму редактирования аватара

// === Реализация закрытия попапов по кнопке закрытия ===
popupCloseButtons.forEach((button) => {
  button.addEventListener('click', () => {
    const popup = button.closest('.popup'); // Находим ближайший попап
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
  const card = createCard(cardData, deleteCard, openImagePopup, likeCard, userId); // Создаем карточку
  // Добавляем карточку в список
  cardsContainer.append(card);
}

// *Функция изменения текста кнопки сохранения в попапе
function renderLoading(isLoading, button) {
  if (isLoading) {
    button.textContent = 'Сохранение...'; // Меняем текст на 'Сохранение...'
  } else {
    button.textContent = 'Сохранить'; // Возвращаем начальный текст
  }
}

// === Получения данных профиля и карточек с сервера ===
Promise.all([getProfileInfo(), getInitialCards()])
  .then(([userData, cards]) => {
    userId = userData._id; // Сохраняем ID пользователя
    // Заполняем профиль данными с сервера
    profileTitleElement.textContent = userData.name; // Имя профиля
    profileDescriptionElement.textContent = userData.about; // Описание профиля
    profileAvatarElement.style.backgroundImage = `url('${userData.avatar}')`; // Аватар
    
    // Заполняем список карточек данными с сервера
    cards.forEach((cardData) => {
      renderCard(cardData); // Создаем и добавляем карточку
    });
  })
  .catch((err) => {
    console.log(`Ошибка при загрузке данных: ${err}`);
  });

// === Включаем валидацию для всех форм ===
enableValidation(validationConfig); // Включаем валидацию для всех форм
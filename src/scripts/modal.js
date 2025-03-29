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
  nameInput.value = document.querySelector('.profile__title').textContent;
  jobInput.value = document.querySelector('.profile__description').textContent;
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

// Обработка нажатия на изображение
cardImage.forEach((item) => {
  item.addEventListener('click', () => {
    imageElem.src = item.src;
    imageElem.alt = item.alt;
    imageCaption.textContent = item.alt;
    openModal(imagePopup);
  });
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

// Находим форму в DOM
const formElement = document.querySelector('.popup__form');
// Находим поля формы в DOM
const nameInput = document.querySelector('.popup__input_type_name');
const jobInput = document.querySelector('.popup__input_type_description');

// Обработчик «отправки» формы
function handleFormSubmit(evt) {
    evt.preventDefault(); 
    document.querySelector('.profile__title').textContent = nameInput.value;
    document.querySelector('.profile__description').textContent = jobInput.value;
    const openedPopup = document.querySelector('.popup__opened');
    closeModal(openedPopup);
}

formElement.addEventListener('submit', handleFormSubmit);
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

const formElement = document.querySelector('.popup__form');

const nameInput = document.querySelector('.popup__input_type_name');
const jobInput = document.querySelector('.popup__input_type_description');

const cardNameInput = document.querySelector('.popup__input_type_card-name');
const urlInput = document.querySelector('.popup__input_type_url');
const newPlace = document.querySelector('[name="new-place"]');

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

// Обработка нажатия на изображение
const imageClick = (imageSrc, imageAlt) => {
    imageElem.src = imageSrc;
    imageElem.alt = imageAlt;
    imageCaption.textContent = imageAlt;
    openModal(imagePopup);
  };

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

  const card = createCard(newCard, deleteCard, imageClick);
  placesList.prepend(card);

  const openedPopup = document.querySelector('.popup__opened');
  closeModal(openedPopup);

  evt.target.reset();
}

newPlace.addEventListener('submit', handleCardSubmit);

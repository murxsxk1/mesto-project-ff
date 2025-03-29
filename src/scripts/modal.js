// Функциональность работы окон

// Выбираем DOM-элементы
const popups = document.querySelectorAll('.popup');
const editButton = document.querySelector('.profile__edit-button');
const addButton = document.querySelector('.profile__add-button');

const editPopup = document.querySelector('.popup_type_edit');
const addPopup = document.querySelector('.popup_type_new-card');
const imagePopup = document.querySelector('.popup_type_image');

const popupImage = imagePopup.querySelector('.popup__image'); 
const popupCaption = imagePopup.querySelector('.popup__caption'); 

// Функция открытия окна
const openModal = (popup) => {
  popup.classList.add('popup__opened');
  document.addEventListener('keydown', closeByEscape);
};

// Функция закрытия окна
const closeModal = (popup) => {
  popup.classList.remove('popup__opened');
  document.removeEventListener('keydown', closeByEscape);
};

// Функция закрытия по нажатию на ESC
function closeByEscape(evt) {
  if (evt.key === 'Escape') {
    const openedPopup = document.querySelector('.popup__opened');
    closeModal(openedPopup);
  }
};

// Закрытие попапа по клику на оверлей или крестик
popups.forEach((popup) => {
  popup.addEventListener('mousedown', (evt) => {
    if (evt.target.classList.contains('popup__opened') || 
        evt.target.classList.contains('popup__close')) {
          closeModal(popup);
    }
  });
});

// Открытие попапа при нажатии на кнопку редактирования
editButton.addEventListener('click', () => {
  openModal(editPopup)
});

// Открытие попапа при нажатии на кнопку добавления
addButton.addEventListener('click', () => {
  openModal(addPopup)
});

document.querySelector('.places__list').addEventListener('click', (evt) => {
  if (evt.target.classList.contains('card__image')) {

    popupImage.src = evt.target.src;
    popupImage.alt = evt.target.alt;
    popupCaption.textContent = evt.target.alt || '';

    openModal(imagePopup);
  }
})






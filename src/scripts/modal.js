// ******
// Функция открытия поп-апа
const openModal = (popup) => {
  popup.classList.add("popup_is-opened");
  document.addEventListener("keydown", escapeModaleClose);
};

// Функция закрытия поп-апа
const closeModal = (popup) => {
  popup.classList.remove("popup_is-opened");
  document.removeEventListener("keydown", escapeModaleClose);
};

// Функция закрытия карточки при нажатии ESC
const escapeModaleClose = (evt) => {
  if (evt.key === "Escape") {
    const openedPopup = document.querySelector(".popup_is-opened");
    if (openedPopup) {
      closeModal(openedPopup);
    }
  }
};

export { openModal, closeModal };
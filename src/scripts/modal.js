// ***Скрипт, содержащий функции для работы модульных окон***

// === Функции ===
// *Функция открытия модального окна (попапа)
const openModal = (popup) => {
  // Добавляем класс 'popup_is-opened' для отображения попапа
  popup.classList.add("popup_is-opened");
  // Добавляем обработчик события нажатия клавиш для закрытия по ESC
  document.addEventListener("keydown", escapeModaleClose);
   
  popup.addEventListener("click", overlayModalClose);
};

// *Функция закрытия модального окна (попапа)
const closeModal = (popup) => {
  // Удаляем класс 'popup_is-opened' для скрытия попапа
  popup.classList.remove("popup_is-opened");
  // Удаляем обработчик события нажатия клавиш (для оптимизации)
  document.removeEventListener("keydown", escapeModaleClose);
  // Удаляем обработчик нажатия по оверлею
  popup.removeEventListener("click", overlayModalClose);
};

// *Функция-обработчик события нажатия Esc
const escapeModaleClose = (evt) => {
  // Проверяем, была ли нажата клавиша Escape
  if (evt.key === "Escape") {
    // Находим текущее открытое модальное окно
    const openedPopup = document.querySelector(".popup_is-opened");
    // Если открытое окно найдено - закрываем его
    if (openedPopup) {
      closeModal(openedPopup);
    }
  }
};

// *Функция-обработчик события клика по оверлею
const overlayModalClose = (evt) => {
  // Проверяем, что клик был именно по оверлею
  if (evt.target.classList.contains("popup")) {
    // Если условие выполняется, вызываем функцию закрытия модального окна
    closeModal(evt.target);
  }
};

export { openModal, closeModal };
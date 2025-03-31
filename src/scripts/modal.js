// ***Скрипт, содержащий функции для работы модульных окон***

// === Функции ===
// *Функция-обработчик события нажатия Esc
function handleEscapeKey(evt) {
  // Проверяем, была ли нажата клавиша Escape
  if (evt.key === "Escape") {
    // Находим текущее открытое модальное окно
    const openedPopup = document.querySelector(".popup_is-opened");
    // Если открытое окно найдено - закрываем его
    if (openedPopup) {
      closeModal(openedPopup);
    }
  }
}

// *Функция-обработчик события клика по оверлею
function handleOverlayClick(evt) {
  // Проверяем, что клик был именно по оверлею
  if (evt.target.classList.contains("popup")) {
    // Если условие выполняется, вызываем функцию закрытия модального окна
    closeModal(evt.target);
  }
}

// *Функция открытия модального окна (попапа)
function openModal(popup) {
  // Добавляем класс 'popup_is-opened' для отображения попапа
  popup.classList.add("popup_is-opened");
  // Добавляем обработчик события нажатия клавиш для закрытия по ESC
  document.addEventListener("keydown", handleEscapeKey);
  // Добавляем обработчик клика по оверлею
  popup.addEventListener("click", handleOverlayClick);
}

// *Функция закрытия модального окна (попапа)
function closeModal(popup) {
  // Удаляем класс 'popup_is-opened' для скрытия попапа
  popup.classList.remove("popup_is-opened");
  // Удаляем обработчик события нажатия клавиш (для оптимизации)
  document.removeEventListener("keydown", handleEscapeKey);
  // Удаляем обработчик клика по оверлею
  popup.removeEventListener("click", handleOverlayClick);
}

export { openModal, closeModal };
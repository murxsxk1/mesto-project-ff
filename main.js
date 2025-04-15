/*
 * ATTENTION: The "eval" devtool has been used (maybe by default in mode: "development").
 * This devtool is neither made for production nor for readable output files.
 * It uses "eval()" calls to create a separate source file in the browser devtools.
 * If you are trying to read the output file, select a different devtool (https://webpack.js.org/configuration/devtool/)
 * or disable the default devtool with "devtool: false".
 * If you are looking for production-ready output files, see mode: "production" (https://webpack.js.org/configuration/mode/).
 */
/******/ (() => { // webpackBootstrap
/******/ 	"use strict";
/******/ 	var __webpack_modules__ = ({

/***/ "./src/index.js":
/*!**********************!*\
  !*** ./src/index.js ***!
  \**********************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

eval("__webpack_require__.r(__webpack_exports__);\n/* harmony import */ var _pages_index_css__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./pages/index.css */ \"./src/pages/index.css\");\n/* harmony import */ var _scripts_card_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./scripts/card.js */ \"./src/scripts/card.js\");\n/* harmony import */ var _scripts_cards_js__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./scripts/cards.js */ \"./src/scripts/cards.js\");\n/* harmony import */ var _scripts_modal_js__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./scripts/modal.js */ \"./src/scripts/modal.js\");\n/* harmony import */ var _scripts_validation_js__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ./scripts/validation.js */ \"./src/scripts/validation.js\");\n//***Основной скрипт, собирающий все приложение***\n\n\n\n\n\n\n\n// === DOM узлы ===\n// *Попапы\nvar profileEditPopup = document.querySelector(\".popup_type_edit\"); // Попап редактирования профиля\nvar cardAddPopup = document.querySelector(\".popup_type_new-card\"); // Попап добавления карточки\nvar imageViewPopup = document.querySelector(\".popup_type_image\"); // Попап с изображением\n\n// *Поля ввода\nvar profileNameInput = document.querySelector(\".popup__input_type_name\"); // Поле ввода имени\nvar profileJobInput = document.querySelector(\".popup__input_type_description\"); // Поле ввода описания работы\nvar cardNameInput = document.querySelector(\".popup__input_type_card-name\"); // Поле ввода названия места\nvar cardUrlInput = document.querySelector(\".popup__input_type_url\"); // Поле ввода URL изображения\n\n// *Кнопки\nvar popupCloseButtons = document.querySelectorAll(\".popup__close\"); // Все кнопки закрытия попапов\nvar profileEditButton = document.querySelector(\".profile__edit-button\"); // Кнопка редактирования профиля\nvar cardAddButton = document.querySelector(\".profile__add-button\"); // Кнопка добавления новой карточки\n\n// *Формы\nvar profileEditForm = document.querySelector(\".popup__form\"); // Форма редактирования профиля\nvar cardAddForm = document.querySelector(\"[name='new-place']\"); // Форма добавления нового места\n\n// *Элементы изображений\nvar popupImageElement = document.querySelector(\".popup__image\"); // Элемент изображения в попапе\nvar popupImageCaption = document.querySelector(\".popup__caption\"); // Подпись к изображению\n\n// *Элементы профиля\nvar profileTitleElement = document.querySelector(\".profile__title\"); // Имя профиля\nvar profileDescriptionElement = document.querySelector(\".profile__description\"); // Описание профиля\n\n// *Иные DOM узлы\nvar cardsContainer = document.querySelector(\".places__list\"); // Список карточек мест\n\n// === Обработчики ===\n// *Обработчик кнопки редактирования профиля\nprofileEditButton.addEventListener(\"click\", function () {\n  // Заполняем поля попапа текущими значениями из профиля\n  profileNameInput.value = profileTitleElement.textContent;\n  profileJobInput.value = profileDescriptionElement.textContent;\n  // Открываем попап редактирования\n  (0,_scripts_modal_js__WEBPACK_IMPORTED_MODULE_3__.openModal)(profileEditPopup);\n});\n\n// *Обработчик кнопки добавления карточки\ncardAddButton.addEventListener(\"click\", function () {\n  (0,_scripts_modal_js__WEBPACK_IMPORTED_MODULE_3__.openModal)(cardAddPopup); // Открываем попап добавления карточки\n});\n\n// *Обработчик формы редактирования профиля\nvar handleProfileFormSubmit = function handleProfileFormSubmit(evt) {\n  evt.preventDefault(); // Предотвращаем стандартное поведение формы\n  // Обновляем данные профиля из полей формы\n  profileTitleElement.textContent = profileNameInput.value;\n  profileDescriptionElement.textContent = profileJobInput.value;\n  // Закрываем открытый попап\n  var openedPopup = document.querySelector(\".popup_is-opened\");\n  (0,_scripts_modal_js__WEBPACK_IMPORTED_MODULE_3__.closeModal)(openedPopup);\n};\n\n// *Вешаем обработчик на форму редактирования профиля\nprofileEditForm.addEventListener(\"submit\", handleProfileFormSubmit);\n\n// *Обработчик формы добавления новой карточки\nvar handleCardFormSubmit = function handleCardFormSubmit(evt) {\n  evt.preventDefault(); // Предотвращаем стандартное поведение формы\n  // Создаем объект новой карточки из данных формы\n  var newCard = {\n    name: cardNameInput.value,\n    link: cardUrlInput.value\n  };\n  _scripts_cards_js__WEBPACK_IMPORTED_MODULE_2__.initialCards.push(newCard); // Добавляем карточку в массив\n  // Создаем и добавляем DOM-элемент карточки\n  var card = (0,_scripts_card_js__WEBPACK_IMPORTED_MODULE_1__.createCard)(newCard, _scripts_card_js__WEBPACK_IMPORTED_MODULE_1__.deleteCard, openImagePopup, _scripts_card_js__WEBPACK_IMPORTED_MODULE_1__.likeCard);\n  cardsContainer.prepend(card); // Добавляем в начало списка\n  // Закрываем попап\n  var openedPopup = document.querySelector(\".popup_is-opened\");\n  (0,_scripts_modal_js__WEBPACK_IMPORTED_MODULE_3__.closeModal)(openedPopup);\n  evt.target.reset(); // Очищаем форму\n};\n\n// *Вешаем обработчик на форму добавления новой карточки\ncardAddForm.addEventListener(\"submit\", handleCardFormSubmit);\n\n// === Реализация закрытия попапов по кнопке закрытия ===\npopupCloseButtons.forEach(function (button) {\n  button.addEventListener(\"click\", function () {\n    var popup = button.closest(\".popup\"); // Находим ближайший попап\n    (0,_scripts_modal_js__WEBPACK_IMPORTED_MODULE_3__.closeModal)(popup); // Закрываем его\n  });\n});\n\n// === Функции ===\n// *функция, которая отвечает за открытие попапа с увеличенным изображением карточки и заполнение его данными\nvar openImagePopup = function openImagePopup(imageSrc, imageAlt) {\n  popupImageElement.src = imageSrc; // Устанавливаем источник изображения\n  popupImageElement.alt = imageAlt; // Устанавливаем альтернативный текст\n  popupImageCaption.textContent = imageAlt; // Устанавливаем подпись\n  (0,_scripts_modal_js__WEBPACK_IMPORTED_MODULE_3__.openModal)(imageViewPopup); // Открываем попап с изображением\n};\n\n// *Функция вывода карточек на страницу\nfunction renderInitialCards() {\n  // Для каждой карточки из начального массива\n  _scripts_cards_js__WEBPACK_IMPORTED_MODULE_2__.initialCards.forEach(function (item) {\n    // Создаем DOM-элемент карточки\n    var card = (0,_scripts_card_js__WEBPACK_IMPORTED_MODULE_1__.createCard)(item, _scripts_card_js__WEBPACK_IMPORTED_MODULE_1__.deleteCard, openImagePopup, _scripts_card_js__WEBPACK_IMPORTED_MODULE_1__.likeCard);\n    // Добавляем карточку в список\n    cardsContainer.append(card);\n  });\n}\n\n// *Вызов функции с первоначальной отрисовкой карточек\nrenderInitialCards();\n\n//# sourceURL=webpack://mesto-project-ff/./src/index.js?");

/***/ }),

/***/ "./src/pages/index.css":
/*!*****************************!*\
  !*** ./src/pages/index.css ***!
  \*****************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

eval("__webpack_require__.r(__webpack_exports__);\n// extracted by mini-css-extract-plugin\n\n\n//# sourceURL=webpack://mesto-project-ff/./src/pages/index.css?");

/***/ }),

/***/ "./src/scripts/card.js":
/*!*****************************!*\
  !*** ./src/scripts/card.js ***!
  \*****************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   createCard: () => (/* binding */ createCard),\n/* harmony export */   deleteCard: () => (/* binding */ deleteCard),\n/* harmony export */   likeCard: () => (/* binding */ likeCard)\n/* harmony export */ });\n// ***Скрипт, содержащий функции для работы карточек***\n\n// Получаем шаблон карточки из HTML\nvar cardTemplate = document.querySelector(\"#card-template\").content;\n\n// === Функции ===\n// *Функция создания карточки\nfunction createCard(cardData, handleDeleteCard, handleImageClick, handleLikeCard) {\n  var cardElement = cardTemplate.querySelector(\".card\").cloneNode(true);\n  // Находим и заполняем изображение карточки\n  var cardImage = cardElement.querySelector(\".card__image\");\n  cardImage.src = cardData.link; // Устанавливаем URL изображения\n  cardImage.alt = cardData.name; // Устанавливаем альтернативный текст\n  // Добавляем обработчик клика по изображению карточки\n  cardImage.addEventListener(\"click\", function () {\n    // При клике вызываем переданную функцию handleImageClick с параметрами изображения\n    handleImageClick(cardData.link, cardData.name);\n  });\n  // Добавляем обработчик лайка на всю карточку (делегирование событий)\n  cardElement.addEventListener(\"click\", handleLikeCard);\n  // Находим и заполняем заголовок карточки\n  var cardTitle = cardElement.querySelector(\".card__title\");\n  cardTitle.textContent = cardData.name;\n  // Находим кнопку удаления и добавляем обработчик\n  var cardDeleteButton = cardElement.querySelector(\".card__delete-button\");\n  cardDeleteButton.addEventListener(\"click\", function () {\n    return handleDeleteCard(cardElement);\n  });\n  // Возвращаем готовый DOM-элемент карточки\n  return cardElement;\n}\n\n// *Функция удаления карточки\nfunction deleteCard(cardElement) {\n  // Удаляем карточку из DOM\n  cardElement.remove();\n}\n\n// *Функция лайка карточки\nfunction likeCard(evt) {\n  // Проверяем, что клик был именно по кнопке лайка\n  if (evt.target.classList.contains(\"card__like-button\")) {\n    // Переключаем класс, отвечающий за активное состояние лайка\n    evt.target.classList.toggle(\"card__like-button_is-active\");\n  }\n}\n\n\n//# sourceURL=webpack://mesto-project-ff/./src/scripts/card.js?");

/***/ }),

/***/ "./src/scripts/cards.js":
/*!******************************!*\
  !*** ./src/scripts/cards.js ***!
  \******************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   initialCards: () => (/* binding */ initialCards)\n/* harmony export */ });\n// ***Массив карточек, отображаемых на странице***\nvar initialCards = [{\n  name: \"Архыз\",\n  link: \"https://pictures.s3.yandex.net/frontend-developer/cards-compressed/arkhyz.jpg\"\n}, {\n  name: \"Челябинская область\",\n  link: \"https://pictures.s3.yandex.net/frontend-developer/cards-compressed/chelyabinsk-oblast.jpg\"\n}, {\n  name: \"Иваново\",\n  link: \"https://pictures.s3.yandex.net/frontend-developer/cards-compressed/ivanovo.jpg\"\n}, {\n  name: \"Камчатка\",\n  link: \"https://pictures.s3.yandex.net/frontend-developer/cards-compressed/kamchatka.jpg\"\n}, {\n  name: \"Холмогорский район\",\n  link: \"https://pictures.s3.yandex.net/frontend-developer/cards-compressed/kholmogorsky-rayon.jpg\"\n}, {\n  name: \"Байкал\",\n  link: \"https://pictures.s3.yandex.net/frontend-developer/cards-compressed/baikal.jpg\"\n}];\n\n//# sourceURL=webpack://mesto-project-ff/./src/scripts/cards.js?");

/***/ }),

/***/ "./src/scripts/modal.js":
/*!******************************!*\
  !*** ./src/scripts/modal.js ***!
  \******************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   closeModal: () => (/* binding */ closeModal),\n/* harmony export */   openModal: () => (/* binding */ openModal)\n/* harmony export */ });\n// ***Скрипт, содержащий функции для работы модульных окон***\n\n// === Функции ===\n// *Функция-обработчик события нажатия Esc\nfunction handleEscapeKey(evt) {\n  // Проверяем, была ли нажата клавиша Escape\n  if (evt.key === \"Escape\") {\n    // Находим текущее открытое модальное окно\n    var openedPopup = document.querySelector(\".popup_is-opened\");\n    // Если открытое окно найдено - закрываем его\n    if (openedPopup) {\n      closeModal(openedPopup);\n    }\n  }\n}\n\n// *Функция-обработчик события клика по оверлею\nfunction handleOverlayClick(evt) {\n  // Проверяем, что клик был именно по оверлею\n  if (evt.target.classList.contains(\"popup\")) {\n    // Если условие выполняется, вызываем функцию закрытия модального окна\n    closeModal(evt.target);\n  }\n}\n\n// *Функция открытия модального окна (попапа)\nfunction openModal(popup) {\n  // Добавляем класс 'popup_is-opened' для отображения попапа\n  popup.classList.add(\"popup_is-opened\");\n  // Добавляем обработчик события нажатия клавиш для закрытия по ESC\n  document.addEventListener(\"keydown\", handleEscapeKey);\n  // Добавляем обработчик клика по оверлею\n  popup.addEventListener(\"click\", handleOverlayClick);\n}\n\n// *Функция закрытия модального окна (попапа)\nfunction closeModal(popup) {\n  // Удаляем класс 'popup_is-opened' для скрытия попапа\n  popup.classList.remove(\"popup_is-opened\");\n  // Удаляем обработчик события нажатия клавиш (для оптимизации)\n  document.removeEventListener(\"keydown\", handleEscapeKey);\n  // Удаляем обработчик клика по оверлею\n  popup.removeEventListener(\"click\", handleOverlayClick);\n}\n\n\n//# sourceURL=webpack://mesto-project-ff/./src/scripts/modal.js?");

/***/ }),

/***/ "./src/scripts/validation.js":
/*!***********************************!*\
  !*** ./src/scripts/validation.js ***!
  \***********************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   clearValidation: () => (/* binding */ clearValidation),\n/* harmony export */   enableValidation: () => (/* binding */ enableValidation)\n/* harmony export */ });\nfunction enableValidation() {}\nfunction clearValidation() {}\n\n\n//# sourceURL=webpack://mesto-project-ff/./src/scripts/validation.js?");

/***/ })

/******/ 	});
/************************************************************************/
/******/ 	// The module cache
/******/ 	var __webpack_module_cache__ = {};
/******/ 	
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/ 		// Check if module is in cache
/******/ 		var cachedModule = __webpack_module_cache__[moduleId];
/******/ 		if (cachedModule !== undefined) {
/******/ 			return cachedModule.exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = __webpack_module_cache__[moduleId] = {
/******/ 			// no module.id needed
/******/ 			// no module.loaded needed
/******/ 			exports: {}
/******/ 		};
/******/ 	
/******/ 		// Execute the module function
/******/ 		__webpack_modules__[moduleId](module, module.exports, __webpack_require__);
/******/ 	
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/ 	
/************************************************************************/
/******/ 	/* webpack/runtime/define property getters */
/******/ 	(() => {
/******/ 		// define getter functions for harmony exports
/******/ 		__webpack_require__.d = (exports, definition) => {
/******/ 			for(var key in definition) {
/******/ 				if(__webpack_require__.o(definition, key) && !__webpack_require__.o(exports, key)) {
/******/ 					Object.defineProperty(exports, key, { enumerable: true, get: definition[key] });
/******/ 				}
/******/ 			}
/******/ 		};
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/hasOwnProperty shorthand */
/******/ 	(() => {
/******/ 		__webpack_require__.o = (obj, prop) => (Object.prototype.hasOwnProperty.call(obj, prop))
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/make namespace object */
/******/ 	(() => {
/******/ 		// define __esModule on exports
/******/ 		__webpack_require__.r = (exports) => {
/******/ 			if(typeof Symbol !== 'undefined' && Symbol.toStringTag) {
/******/ 				Object.defineProperty(exports, Symbol.toStringTag, { value: 'Module' });
/******/ 			}
/******/ 			Object.defineProperty(exports, '__esModule', { value: true });
/******/ 		};
/******/ 	})();
/******/ 	
/************************************************************************/
/******/ 	
/******/ 	// startup
/******/ 	// Load entry module and return exports
/******/ 	// This entry module can't be inlined because the eval devtool is used.
/******/ 	var __webpack_exports__ = __webpack_require__("./src/index.js");
/******/ 	
/******/ })()
;
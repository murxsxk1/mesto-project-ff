// Функция показа ошибки валидации для конкретного поля
function showInputError(formElement, inputElement, errorMessage, config) {
  // Находим элемент ошибки (span) по id поля + суффикс '-error'
  const errorElement = formElement.querySelector(`.${inputElement.id}-error`);
  // Добавляем класс с красной рамкой для невалидного поля
  inputElement.classList.add(config.inputErrorClass);
  // Устанавливаем текст ошибки
  errorElement.textContent = errorMessage;
  // Делаем сообщение об ошибке видимым
  errorElement.classList.add(config.errorClass);
}

// Функция скрытия ошибки валидации
function hideInputError(formElement, inputElement, config) {
  // Находим элемент ошибки
  const errorElement = formElement.querySelector(`.${inputElement.id}-error`);
  // Убираем красную рамку
  inputElement.classList.remove(config.inputErrorClass);
  // Скрываем сообщение об ошибке
  errorElement.classList.remove(config.errorClass);
  // Очищаем текст ошибки
  errorElement.textContent = '';
}

// Основная функция включения валидации
function enableValidation(config) {
  // Получаем все формы по переданному селектору
  const formList = Array.from(document.querySelectorAll(config.formSelector));

  // Функция проверки наличия невалидных полей
  const hasInvalidInput = (inputList) => {
    // Проверяем, есть ли хотя бы одно невалидное поле
    return inputList.some((inputElement) => {
      return !inputElement.validity.valid;
    });
  };

  // Функция переключения состояния кнопки
  const toggleButtonState = (inputList, buttonElement) => {
    if (hasInvalidInput(inputList)) {
      // Если есть невалидные поля - деактивируем кнопку
      buttonElement.disabled = true;
      buttonElement.classList.add(config.inactiveButtonClass);
    } else {
      // Если все поля валидны - активируем кнопку
      buttonElement.disabled = false;
      buttonElement.classList.remove(config.inactiveButtonClass);
    }
  };

  // Функция проверки валидности поля
  const isValid = (formElement, inputElement) => {
    // Проверяем соответствие pattern (если есть)
    if (inputElement.validity.patternMismatch) {
      // Устанавливаем кастомное сообщение из data-атрибута
      inputElement.setCustomValidity(inputElement.dataset.errorMessage);
    } else {
      // Очищаем кастомное сообщение
      inputElement.setCustomValidity('');
    }
    // Проверяем общую валидность поля
    if (!inputElement.validity.valid) {
      // Если невалидно - показываем ошибку
      showInputError(
        formElement,
        inputElement,
        inputElement.validationMessage,
        config
      );
    } else {
      // Если валидно - скрываем ошибку
      hideInputError(formElement, inputElement, config);
    }
  };

  // Функция установки обработчиков событий для формы
  const setEventListeners = (formElement) => {
    // Получаем все поля ввода формы
    const inputList = Array.from(
      formElement.querySelectorAll(config.inputSelector)
    );
    // Получаем кнопку отправки формы
    const buttonElement = formElement.querySelector(
      config.submitButtonSelector
    );
    // Изначально проверяем состояние кнопки
    toggleButtonState(inputList, buttonElement);
    // Добавляем обработчик input для каждого поля
    inputList.forEach((inputElement) => {
      inputElement.addEventListener('input', () => {
        // При каждом вводе проверяем валидность поля
        isValid(formElement, inputElement);
        // И проверяем состояние кнопки
        toggleButtonState(inputList, buttonElement);
      });
    });
  };

  // Для каждой формы устанавливаем обработчики
  formList.forEach((formElement) => {
    setEventListeners(formElement);
  });
}

function clearValidation(formElement, config) {
  const inputList = formElement.querySelectorAll(config.inputSelector);
  const buttonElement = formElement.querySelector(config.submitButtonSelector);

  inputList.forEach((input) => {
    hideInputError(formElement, input, config);
    input.setCustomValidity('');
  });

  buttonElement.classList.add(config.inactiveButtonClass);
  buttonElement.disabled = true;
}

export { enableValidation, clearValidation };
const formElement = document.querySelector('.popup__form');
const formInput = formElement.querySelector('.popup__input')

function enableValidation(element) {
  element.classList.add('popup__input_type_error');
}

function clearValidation(element){
  element.classList.remove('popup__input_type_error');
}

function isValid() {
  if (!formInput.validity.valid) {
    enableValidation(formInput);
  } else {
    clearValidation(formInput);
  }
}

formInput.addEventListener('input', isValid);

export { enableValidation, clearValidation, isValid };
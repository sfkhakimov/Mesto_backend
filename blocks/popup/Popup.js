 export default class Popup  {
  constructor(formValidate, popupClose) {
    this.formValidate = formValidate
    this.popupClose = popupClose;
    this.close = this.close.bind(this);
  }

  open(popup) {
    popup.querySelector('.popup').classList.add(this.formValidate.popupIsOpened);
    this.formValidate.checkInputValidity();
    this.formValidate.setEventListeners();
    popup.querySelector(`.${this.popupClose}`).addEventListener('click', this.close);
  }

  close() {

    document.querySelector(`.${this.formValidate.popupIsOpened}`).
      querySelector(`.${this.popupClose}`).removeEventListener('click', this.close);

    document.querySelector(`.${this.formValidate.popupIsOpened}`).
      classList.remove(this.formValidate.popupIsOpened);
  }
}
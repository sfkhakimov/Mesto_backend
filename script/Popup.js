class Popup  {
  constructor(element, elemClose) {
    this.element = element;
    this.elemClose = elemClose;
    this.openClassName = 'popup_is-opened';
    this.close = this.close.bind(this);
    this.elemClose.addEventListener('click', this.close);
    this.popupTitle = document.querySelector('.popup__title');
    this.popupForm = document.forms.newCard;
    this.formTitle = this.popupForm.elements.name;
    this.formSubtitle = this.popupForm.elements.link;
    this.button = this.popupForm.elements.button;
  }

  open() {
    this.element.classList.add(this.openClassName);
  }

  close() {
    this.popupForm.reset();
    this.popupTitle.textContent = '';
    this.formTitle.removeAttribute('type');
    this.formSubtitle.removeAttribute('type');
    this.formTitle.removeAttribute('placeholder');
    this.formSubtitle.removeAttribute('placeholder');
    this.formTitle.removeAttribute('minlength');
    this.formSubtitle.removeAttribute('minlength');
    this.formTitle.removeAttribute('maxlength');
    this.formSubtitle.removeAttribute('maxlength');
    this.button.textContent = '';
    this.button.removeAttribute('disabled');
    this.button.removeAttribute('id');
    this.button.setAttribute('style', 'background-color: black; color: white');
    this.element.classList.remove(this.openClassName);
  }

}



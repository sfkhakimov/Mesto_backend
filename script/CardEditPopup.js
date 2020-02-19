class CardEditPopup extends Popup {
    constructor(container, cardlist, api) {
      super(container.element, container.elemClose);
      this.cardlist = cardlist;
      this.api = api;
      this.popupTitle = document.querySelector('.popup__title');
      this.popupForm = document.forms.newCard;
      this.formTitle = this.popupForm.elements.name;
      this.formSubtitle = this.popupForm.elements.link;
      this.button = this.popupForm.elements.button;
      this.spanTitle = document.querySelector('.popup__error');
      this.spanSubtitle = document.querySelector('.popup__error_pos');
    }
  
    open() {
      super.open(); 
      this.popupTitle.textContent = 'Новое место';
      this.formTitle.setAttribute('type', 'text');
      this.formSubtitle.setAttribute('type', 'url');
      this.formTitle.setAttribute('placeholder', 'Название');
      this.formSubtitle.setAttribute('placeholder', 'Ссылка на картинку');
      this.formTitle.setAttribute('minlength', '2');
      this.formTitle.setAttribute('maxlength', '30');
      this.button.textContent = '+';
      this.button.setAttribute('disabled', true);
      this.button.setAttribute('id', 'content');
      this.button.removeAttribute('style', 'background-color: black; color: white');
    }
  
    submitHandler() {
      this.api.setCards(this.formTitle.value, this.formSubtitle.value)
      .then((res) => {
        this.cardlist.addCard(res);
      })
      this.popupForm.reset();
      super.close();
    }
  
  }
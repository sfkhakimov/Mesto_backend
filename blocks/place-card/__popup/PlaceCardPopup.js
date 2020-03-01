import Popup from '../../popup/Popup.js';

export default class PlaceCardPopup extends Popup {
    constructor(popup, cardlist, api, popupContent) {
      super(popup.formValidate, popup.popupClose);
      this.cardlist = cardlist;
      this.api = api;
      this.popupContent = popupContent;
      this.submitHandler = this.submitHandler.bind(this);
      this.cardInfo = this.popupContent.querySelector(`.${popup.formValidate.popupForm}`);
    }
  
    open() {
      super.open(this.popupContent);
      this.popupContent.querySelector(`.${this.formValidate.popupForm}`).
        addEventListener('submit', this.submitHandler);
    }
  
    submitHandler(event) {
      event.preventDefault(); 
      this.api.setCards(this.cardInfo.elements.name.value,
        this.cardInfo.elements.link.value)
      .then((res) => {
        this.cardlist.addCard(res);
      })
      this.cardInfo.reset();
      super.close(this.popupContent);
    }
  
  }
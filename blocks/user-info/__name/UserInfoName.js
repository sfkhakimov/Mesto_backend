import Popup from '../../popup/Popup.js';

export default class UserInfoName extends Popup {
    constructor(popup, infoUser, popupAbout) {
      super(popup.formValidate, popup.popupClose);
      this.infoUser = infoUser;
      this.popupAbout = popupAbout;
      this.submitHandler = this.submitHandler.bind(this);
      this.profileInfo = this.popupAbout.querySelector(`.${popup.formValidate.popupForm}`);
    }
  
    open() {
      const profileInfo = this.infoUser.getUserInfo();
      this.profileInfo.elements.name.value = profileInfo.name;
      this.profileInfo.elements.about.value = profileInfo.about;
      super.open(this.popupAbout);
      this.profileInfo.addEventListener('submit', this.submitHandler);
    }

    submitHandler(event) {
      event.preventDefault(); 
      this.infoUser.updateUserInfo(this.profileInfo.elements.name.value,
         this.profileInfo.elements.about.value);
      this.profileInfo.reset();
      super.close(this.popupAbout);
    }
  
  }
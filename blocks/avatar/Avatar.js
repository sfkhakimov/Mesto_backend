import Popup from '../popup/Popup.js';

export default class Avatar extends Popup{
    constructor(popup, popupAvatar, userAvatar, userInfo) {
        super(popup.formValidate, popup.popupClose)
        this.popupAvatar = popupAvatar;
        this.userInfo = userInfo;
        this.userAvatar = userAvatar;
        this.submitAvatar = this.submitAvatar.bind(this);
        this.profileAvatar = this.popupAvatar.querySelector(`.${popup.formValidate.popupForm}`);
    }

    open() {
        super.open(this.popupAvatar);
        this.profileAvatar.addEventListener('submit', this.submitAvatar);
    }

    submitAvatar(event) {
        event.preventDefault();
        this.userInfo.upadeAvatar(this.profileAvatar.elements.link.value);
        this.profileAvatar.reset();
        super.close(this.popupAvatar);
    }
}
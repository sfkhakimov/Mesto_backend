import Api from '../blocks/api/Api.js';
import PlacesList from '../blocks/places-list/PlacesList.js';
import PlaceCard from '../blocks/place-card/PlaceCard.js';
import Image from '../blocks/image/Image.js';
import Popup from '../blocks/popup/Popup.js';
import PlaceCardPopup from '../blocks/place-card/__popup/PlaceCardPopup.js';
import UserInfoName from '../blocks/user-info/__name/UserInfoName.js';
import Avatar from '../blocks/avatar/Avatar.js';
import UserInfo from '../blocks/user-info/UserInfo.js';
import FormValidate from '../blocks/form-validate/FormValidate.js';
import './style.css';

const moduleObj = (function () {
  const dataCardObj = {};
  const createCard = (...args) => new PlaceCard(...args, image.creatImage.bind(image), api);

  const popupContent = document.querySelector('#popup-content');
  const popupAbout = document.querySelector('#popup-about');
  const popupAvatar = document.querySelector('#popup-avatar');

  const infoUser = document.querySelector('.user-info');
  const serverUrl = 'http://localhost:3000/';
  const api = new Api({
    baseUrl: serverUrl,
    headers: {
      authorization: '6e068203-0879-465a-8f7e-859354fab07f',
      'Content-Type': 'application/json',

    },
  });

  const formValidate = (...args) => new FormValidate(...args);
  const image = new Image(document.querySelector('.places-list'));
  const popup = new Popup(formValidate('popup_is-opened', 'popup__form'), 'popup__close');
  const placesList = new PlacesList(document.querySelector('.places-list'), createCard, api);
  const userInfo = new UserInfo(document.querySelector('.user-info__name'),
    document.querySelector('.user-info__job'), api, document.querySelector('.user-info__photo'));

  const userInfoName = new UserInfoName(popup, userInfo, popupAbout);
  const placeCardPopup = new PlaceCardPopup(popup, placesList, api, popupContent);
  const avatar = new Avatar(popup, popupAvatar, document.querySelector('.user-info__photo'), userInfo);

  infoUser.addEventListener('click', function(event) {
    if (event.target.classList.contains('user-info__edit-button')) {
        userInfoName.open();
    }

    if (event.target.classList.contains('user-info__button')) {
        placeCardPopup.open();
    }

    if (event.target.classList.contains('user-info__photo')) {
        avatar.open();
    }
  });

  // Загрузка началных карточек
  placesList.render();

  // Получение данных профиля
  userInfo.setUserInfo();

  return dataCardObj;
}());
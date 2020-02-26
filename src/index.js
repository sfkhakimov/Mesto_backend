import Api from '../blocks/api/Api.js';
import PlacesList from '../blocks/places-list/PlacesList.js';
import PlaceCard from '../blocks/place-card/PlaceCard.js';
import Image from '../blocks/image/Image.js';
import Popup from '../blocks/popup/Popup.js';
import PlaceCardPopup from '../blocks/place-card/__popup/PlaceCardPopup.js';
import UserInfoName from '../blocks/user-info/__name/UserInfoName.js';
import UserInfo from '../blocks/user-info/UserInfo.js';
import FormValidate from '../blocks/form-validate/FormValidate.js';
import './style.css';

const moduleObj = (function () {
    const dataCardObj = {};
    const createCard = (...args) => new PlaceCard(...args, image.creatImage.bind(image), api);

    const infoUser = document.querySelector('.user-info');
    const form = document.forms.newCard;
    const serverUrl = NODE_ENV === 'development' ? 'http://praktikum.tk/cohort7/' : 'https://praktikum.tk/cohort7/';
    const api = new Api({
        baseUrl: serverUrl,
        headers: {
            authorization: '6e068203-0879-465a-8f7e-859354fab07f',
            'Content-Type': 'application/json'
        }
        });

    const image = new Image(document.querySelector('.places-list'));
    const popup = new Popup(document.querySelector('.popup'), document.querySelector('.popup__close'));
    const placesList = new PlacesList(document.querySelector('.places-list'), createCard, api);

    const formValidate = new FormValidate(document.forms.newCard);
    const userInfo = new UserInfo(document.querySelector('.user-info__name'), document.querySelector('.user-info__job'), api);

    const userInfoName = new UserInfoName(popup, userInfo);
    const placeCardPopup = new PlaceCardPopup(popup, placesList, api);

    infoUser.addEventListener('click', function(event) {
        if(event.target.classList.contains('user-info__edit-button')) {
            userInfoName.open();
        }

        if(event.target.classList.contains('user-info__button')) {
            placeCardPopup.open();
        }
    });


    form.addEventListener('submit', function(event) {
        event.preventDefault();
        if(event.target.elements.button === document.querySelector('#content')) {
            placeCardPopup.submitHandler()
        }

        if(event.target.elements.button === document.querySelector('#edit')) {
            userInfoName.submitHandler()
        }
    })

    formValidate.setEventListeners(form);

    // Загрузка началных карточек
    placesList.render();
    
    // Получение данных профиля
    userInfo.setUserInfo();

    return dataCardObj;
}());
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
    const createCard = (...args) => new PlaceCard(...args, openCard.creatImage.bind(openCard), api);

    const userInfo = document.querySelector('.user-info');
    const form = document.forms.newCard;
    const api = new Api({
        baseUrl: 'http://praktikum.tk/cohort7/',
        headers: {
            authorization: '6e068203-0879-465a-8f7e-859354fab07f',
            'Content-Type': 'application/json'
        }
        });

    const openCard = new Image(document.querySelector('.places-list'));
    const popup = new Popup(document.querySelector('.popup'), document.querySelector('.popup__close'));
    const cardlist = new PlacesList(document.querySelector('.places-list'), createCard, api);

    const validateForm = new FormValidate(document.forms.newCard);
    const infoUser = new UserInfo(document.querySelector('.user-info__name'), document.querySelector('.user-info__job'), api);

    const profileEditPopup = new UserInfoName(popup, infoUser);
    const cardEditPopup = new PlaceCardPopup(popup, cardlist, api);

    userInfo.addEventListener('click', function(event) {
        if(event.target.classList.contains('user-info__edit-button')) {
            profileEditPopup.open();
        }

        if(event.target.classList.contains('user-info__button')) {
            cardEditPopup.open();
        }
    });


    form.addEventListener('submit', function(event) {
        event.preventDefault();
        if(event.target.elements.button === document.querySelector('#content')) {
            cardEditPopup.submitHandler()
        }

        if(event.target.elements.button === document.querySelector('#edit')) {
            profileEditPopup.submitHandler()
        }
    })

    validateForm.setEventListeners(form);

    // Загрузка началных карточек
    cardlist.render();
    
    // Получение данных профиля
    infoUser.setUserInfo();

    return dataCardObj;
}());
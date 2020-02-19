const moduleObj = (function () {
    const dataCardObj = {};
    const createCard = (...args) => new Card(...args, openCard.creatImage.bind(openCard), api);

    const userInfo = document.querySelector('.user-info');
    const form = document.forms.newCard;
    const api = new Api({
        baseUrl: 'http://95.216.175.5/cohort7/',
        headers: {
            authorization: '6e068203-0879-465a-8f7e-859354fab07f',
            'Content-Type': 'application/json'
        }
        });

    const openCard = new OpenCard(document.querySelector('.places-list'));
    const popup = new Popup(document.querySelector('.popup'), document.querySelector('.popup__close'));
    const cardlist = new Cardlist(document.querySelector('.places-list'), createCard, api);

    const validateForm = new FormValidator(document.forms.newCard);
    const infoUser = new UserInfo(document.querySelector('.user-info__name'), document.querySelector('.user-info__job'), api);

    const profileEditPopup = new ProfileEditPopup(popup, infoUser);
    const cardEditPopup = new CardEditPopup(popup, cardlist, api);

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
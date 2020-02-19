// Открытие картинки при клике по ней и закрытие по крестику
class OpenCard {
    constructor(container) {
        this.container = container;
    }

    creatImage(elem) {
        const placeList = document.querySelector('.places-list');

        const imagePopup = document.createElement('div');
        imagePopup.classList.add('image');
    
        const imageContainer = document.createElement('div');
        imageContainer.classList.add('image__container');
    
        const imageOpen = document.createElement('img');
        imageOpen.classList.add('image__is-opened');
        imageOpen.setAttribute('src', `${elem}`);
    
        const imageClosed = document.createElement('img');
        imageClosed.classList.add('image__close');
        imageClosed.setAttribute('src', './images/close.svg');

        placeList.appendChild(imagePopup);
        imagePopup.appendChild(imageContainer);
        imageContainer.appendChild(imageOpen);
        imageContainer.appendChild(imageClosed);
        
        imageClosed.addEventListener('click', this.deleteImage);
    }
    // на вход принимает ссылку background-image и делает из нее ссылку для image src

    deleteImage() {
        const imagePopup = document.querySelector('.image')
        imagePopup.parentNode.removeChild(imagePopup);
    }
}
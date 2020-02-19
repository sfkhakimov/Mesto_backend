class Card {
    constructor(cardsArr, openImageCallback, api) {
        this.api = api
        this.cardsArr = cardsArr
        this.name = cardsArr.name;
        this.link = cardsArr.link;
        this.id = cardsArr._id;
        this.like = this.like.bind(this);
        this.remove = this.remove.bind(this);
        this.openImageCallback = openImageCallback
        this.container;
    }

    create(elem) {
        this.container = document.createElement("div");
        this.container.classList.add("place-card");
        const button = document.createElement('button');
        button.classList.add('place-card__delete-icon');
        this.container.insertAdjacentHTML('beforeend', `
        <div class="place-card__image">
        </div>
        <div class="place-card__description">
            <h3 class="place-card__name"></h3>
            <div class="place-card__container">
                <button class="place-card__like-icon"></button>
                <p class="place-card__like-sum">${this.cardsArr.likes.length}</p>
          </div>
        </div>`);
        this.container.querySelector(".place-card__name").textContent = elem.name;
        this.container.querySelector(".place-card__image").style.backgroundImage = `url(${elem.link})`;

        // Если у добавляемой карточки есть мой ID то вешается иконка "Удалить"
        if (this.cardsArr.owner._id === 'bfc80133f74fc67161fb9004') {
            this.container.querySelector(".place-card__image").appendChild(button);
        }

        //Если в массиве лайков нахожу лайк от меня то у добавляемой карточки иконка лайка будет активной
        this.cardsArr.likes.some(elem => {
            if (elem._id === 'bfc80133f74fc67161fb9004') {
                this.container.querySelector(".place-card__like-icon")
                    .classList.add('place-card__like-icon_liked');
            }
        })
    }

    like(event) {
        // если лайка нет то он ставится (else if), если он есть то снимается (if). 
        if (event.target.classList.contains('place-card__like-icon_liked')) {
            this.api.deleteLike(this.id)
                .then((res) => {
                    event.target.classList.remove('place-card__like-icon_liked');
                    event.target.parentNode.querySelector('.place-card__like-sum')
                        .textContent = `${res.likes.length}`;
                })
        } else if (event.target.classList.contains('place-card__like-icon')) {
            this.api.setLike(this.id)
                .then((res) => {
                    event.target.classList.add('place-card__like-icon_liked');
                    event.target.parentNode.querySelector('.place-card__like-sum')
                        .textContent = `${res.likes.length}`;
                })
        }
    }

    remove(event) {
        if (event.target.className === 'place-card__delete-icon') {
            if (window.confirm("Вы действительно хотите удалить эту карточку?")) {
                this.api.deleteCards(this.id)
                    .then((result) => {
                        this.container.parentNode.removeChild(this.container);
                        console.log(result);
                    })
            }
        }
    }

    openImage(link) {
        this.openImageCallback(link);
    }

    listener() {
        this.container.addEventListener('click', this.like);
        this.container.addEventListener('click', this.remove);
        this.container.addEventListener('click', this.creatImage);
        this.container.addEventListener('click', () => {
            if (event.target.classList.contains('place-card__image')) {
                this.openImage(this.link);
            }
        });
    }
}
class Cardlist {
    // cardsArr это первые 10 карточек
    constructor(container, createCard, api) {
        this.api = api;
        this.container = container;
        this.createCard = createCard;
    }

    addCard(elem) {
        const cardElement = this.createCard(elem);
        cardElement.create(elem);
        this.container.appendChild(cardElement.container);
        cardElement.listener();
    }

    render() {
        this.api.getInitialCards()
            .then((res) => {
                res.forEach((elem) => {
                    this.addCard(elem);
                });
            })
    }
}
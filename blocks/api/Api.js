export default class Api {
    constructor(options) {
        this.options = options;
    }

    // Загрузка первых карточек
    getInitialCards() {
        return fetch((this.options.baseUrl + 'cards'), {
            headers: this.options.headers
        })
            .then((res) => {
                if (res.ok) {
                    return res.json();
                }
            })
            .catch((err) => {
                console.log(`Ошибка ${err}`);
            })
    }

    // Добавление карточки
    setCards(nameValue, linkValue) {
        return fetch((this.options.baseUrl + 'cards'), {
            method: 'POST',
            headers: this.options.headers,
            body: JSON.stringify({
                name: nameValue,
                link: linkValue
            })
        })
            .then((res) => {
                if (res.ok) {
                    return res.json();
                }
            })
            .catch((err) => {
                console.log(`Ошибка ${err}`);
            })
    }


    deleteCards(idValue) {
        return fetch((this.options.baseUrl + `cards/${idValue}`), {
            method: 'DELETE',
            headers: this.options.headers,
        })
            .then((res) => {
                if (res.ok) {
                    return res.json();
                }
            })
            .catch((err) => {
                console.log(`Ошибка ${err}`);
            })
    }

    // При загрузке страницы подгружаю с сервера Имя и Фамилию профиля
    setProfile() {
        return fetch((this.options.baseUrl + 'users/8340d0ec33270a25f2413b69'), {
            headers: this.options.headers
        })
            .then(res => {
                if (res.ok) {
                    return res.json();
                }
            })
            .catch((err) => {
                console.log(`Ошибка ${err}`);
            })
    }

    // Отправляю на сервер новые данные профиля и получив результат обновляю их на странице.
    updateProfile(nameValue, aboutValue) {
        return fetch((this.options.baseUrl + 'users/me'), {
            method: 'PATCH',
            headers: this.options.headers,
            body: JSON.stringify({
                name: nameValue,
                about: aboutValue
            })
        })
            .then(res => {
                if (res.ok) {
                    return res.json();
                }
            })
            .catch((err) => {
                console.log(`Ошибка ${err}`);
            });
    }

    updateAvatar(link) {
        return fetch((this.options.baseUrl + 'users/me/avatar'), {
            method: 'PATCH',
            headers: this.options.headers,
            body: JSON.stringify({
                avatar: link
            })
        })
        .then(res => {
            if (res.ok) {
                return res.json();
            }
        })
        .catch((err) => {
            console.log(`Ошибка ${err}`);
        });
    }

    setLike(likeId) {
        return fetch((this.options.baseUrl + `cards/like/${likeId}`), {
            method: 'PUT',
            headers: this.options.headers
        })
            .then((res) => {
                if (res.ok) {
                    return res.json();
                }
            })
            .catch((err) => {
                console.log(`Ошибка ${err}`);
            });
    }

    deleteLike(likeId) {
        return fetch((this.options.baseUrl + `cards/like/${likeId}`), {
            method: 'DELETE',
            headers: this.options.headers
        })
            .then((res) => {
                if (res.ok) {
                    return res.json();
                }
            })
            .catch((err) => {
                console.log(`Ошибка ${err}`);
            });
    }
}

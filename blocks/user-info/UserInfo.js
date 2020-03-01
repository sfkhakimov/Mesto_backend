export default class UserInfo {
    constructor(title, subtitle, api, avatar) {
        this.api = api;
        this.title = title;
        this.subtitle = subtitle;
        this.avatar = avatar;
        this.titleValue;
        this.subtitleValue;
    }

    setUserInfo() {
        this.api.setProfile()
        .then(info => {
            this.title.textContent = info.name;
            this.subtitle.textContent = info.about;
            this.avatar.style.backgroundImage = `url(${info.avatar})`;
        })
    }

    updateUserInfo(name, about) {
        this.api.updateProfile(name, about)
        .then((info) => {
            this.title.textContent = info.name;
            this.subtitle.textContent = info.about;
        })
    }
    getUserInfo() {
        return {
            name: this.title.textContent,
            about: this.subtitle.textContent
        } 
    }

    upadeAvatar(link) {
        this.api.updateAvatar(link)
        .then( (res) => {
            this.avatar.style.backgroundImage = `url(${res.avatar})`;
        })
    }
}
export default class UserInfo {
    constructor(title, subtitle, api) {
        this.api = api;
        this.title = title;
        this.subtitle = subtitle;
        this.titleValue;
        this.subtitleValue;
    }

    setUserInfo() {
        this.api.setProfile()
        .then(info => {
            this.title.textContent = info.name;
            this.subtitle.textContent = info.about;
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
}
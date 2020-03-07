export default class FormValidate {
    constructor(popupIsOpened, popupForm) {
        this.popupIsOpened = popupIsOpened;
        this.popupForm = popupForm;
        this.checkInputValidity = this.checkInputValidity.bind(this);
        this.errorMessage = {
            link: 'Здесь должна быть ссылка',
            required: 'Это обязательное поле',
            length: 'Длина должна быть от 2 до 30 символов',
            noError: ''
        }
    }
// checkInputValidity проверяет на валидность любой input, независимо от того какой попап открыт.
    checkInputValidity() {
        this.isValidForm = false;
        const popup = document.querySelector(`.${this.popupIsOpened}`);

        const arr = Array.from(popup.querySelector(`.${this.popupForm}`).elements).map((elem) => {
            const errorMessages = popup.querySelector(`.${this.popupForm}`).querySelector(`#error-${elem.id}`);
            if (elem.type !== "submit") {
                if (elem.type === "url") {
                    if (!elem.checkValidity()) {
                        errorMessages.textContent = this.errorMessage.link;
                        return true;
                    }
                }
                if (elem.type === "text" && elem.value.length === 0) {
                    errorMessages.textContent = this.errorMessage.required;
                    this.setSubmitButtonState(popup.querySelector(`.${this.popupForm}`).elements.button);
                    return true;
                }
    
                if (!elem.checkValidity()) {
                    errorMessages.textContent = this.errorMessage.length;
                    this.setSubmitButtonState(popup.querySelector(`.${this.popupForm}`).elements.button);
                    return true;
                }
                errorMessages.textContent = this.errorMessage.noError;
                return false;
            } else return false
        });
    
        this.isValidForm = arr.some( (elem) => {
            return elem !== false;
        });
    
        this.setSubmitButtonState(popup.querySelector(`.${this.popupForm}`).elements.button);

    }

    setSubmitButtonState(element) {
        if (!this.isValidForm) {
            element.removeAttribute('disabled');;
            element.setAttribute('style', 'background-color: black; color: white');
        } else {
            element.setAttribute('disabled', true);
            element.removeAttribute('style', 'background-color: black; color: white');
        }
    }

    setEventListeners() {
        document.querySelector(`.${this.popupIsOpened}`).addEventListener('input', this.checkInputValidity)
    }
}
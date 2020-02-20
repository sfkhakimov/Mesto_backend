export default class FormValidate {
    constructor(form) {
        this.form = form;
        this.errorMessage = {
            link: 'Здесь должна быть ссылка',
            required: 'Это обязательное поле',
            length: 'Длина должна быть от 2 до 30 символов',
            noError: ''
        }
    }
// checkInputValidity проверяет на валидность любой input, независимо от того какой попап открыт.
    checkInputValidity(event) {
        this.isValidForm = false;

        const arr = Array.from(event.currentTarget.elements).map((elem) => {
            const errorMessages = document.querySelector(`#error-${elem.id}`);
            if (elem.type !== "submit") {
                if (elem.type === "url") {
                    if (!elem.checkValidity()) {
                        errorMessages.textContent = this.errorMessage.link;
                        return true;
                    }
                }
                if (elem.type === "text" && elem.value.length === 0) {
                    errorMessages.textContent = this.errorMessage.required;
                    this.setSubmitButtonState(event.currentTarget.elements.button);
                    return true;
                }
    
                if (!elem.checkValidity()) {
                    errorMessages.textContent = this.errorMessage.length;
                    this.setSubmitButtonState(event.currentTarget.elements.button);
                    return true;
                }
                errorMessages.textContent = this.errorMessage.noError;
                return false;
            } else return false
        });
    
        this.isValidForm = arr.some( (elem) => {
            if (elem !== false) return true;
        });
    
        if (!this.isValidForm) {
            this.isValidForm = true;
            this.setSubmitButtonState(event.currentTarget.elements.button);
        }
    }

    setSubmitButtonState(element) {
        if (this.isValidForm) {
            element.removeAttribute('disabled');;
            element.setAttribute('style', 'background-color: black; color: white');
        } else {
            element.setAttribute('disabled', true);
            element.removeAttribute('style', 'background-color: black; color: white');
        }
    }

    setEventListeners() {
        this.form.addEventListener('input', (event) => {
            this.checkInputValidity(event);
        });
    }
}
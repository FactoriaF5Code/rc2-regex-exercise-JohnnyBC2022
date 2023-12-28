const expresions = {
    name: /^[A-Za-záéíóúüñÑ\s-]{1,40}$/,
    surname: /^[A-Za-záéíóúüñÑ\s-]{1,80}$/,
    dni: /^\d{8}[A-Za-z]$/,
    user: /^[A-Za-záéíóúüñÑ\s_\-0-9.]{4,16}$/,
    pass: /^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d@$!%*?&]{6,}$/,
    pass2: /^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d@$!%*?&]{6,}$/,
    email: /^[^@\s]+@[^@\.\s]+(\.[^@\.\s]+)+$/,
    phone: /^\d{9,14}$/
}

const fields = {
    name: false,
    surname: false,
    dni: false,
    user: false,
    pass: false,
    email: false,
    phone: false
}

const form = document.getElementById('form');
const inputs = document.querySelectorAll('#form input');
const validateForm = (e) => {
    switch (e.target.name) {
        case "name":
            validateInput(expresions.name, e.target, 'name');
            break;

        case "surname":
            validateInput(expresions.surname, e.target, 'surname');
            break;

        case "dni":
            validateInput(expresions.dni, e.target, 'dni');
            break;

        case "user":
            validateInput(expresions.user, e.target, 'user');
            break;

        case "pass":
            validateInput(expresions.pass, e.target, 'pass');
            validatePass2();
            break;

        case "pass2":
            validateInput(expresions.pass, e.target, 'pass');
            validatePass2();
            break;
        case "email":
            validateInput(expresions.email, e.target, 'email');
            break;

        case "phone":
            validateInput(expresions.phone, e.target, 'phone');
            break;
    }
}

const validateInput = (expresion, input, classText) => {
    if (expresion.test(input.value)) {
        document.getElementById(`${classText}__group`).classList.remove('form__group-nook');
        document.getElementById(`${classText}__group`).classList.add('form__group-ok');
        document.querySelector(`#${classText}__group i`).classList.remove('fa-times-circle');
        document.querySelector(`#${classText}__group i`).classList.add('fa-check-circle');
        document.querySelector(`#${classText}__group .form__input-error`).classList.remove('form__input-error-active');
        fields[classText] = true;

    } else {
        document.getElementById(`${classText}__group`).classList.remove('form__group-ok');
        document.getElementById(`${classText}__group`).classList.add('form__group-nook');
        document.querySelector(`#${classText}__group i`).classList.remove('fa-check-circle');
        document.querySelector(`#${classText}__group i`).classList.add('fa-times-circle');
        document.querySelector(`#${classText}__group .form__input-error`).classList.add('form__input-error-active');
        fields[classText] = false;
    }
}

const validatePass2 = () => {
    const inputPass1 = document.getElementById('pass');
    const inputPass2 = document.getElementById('pass2');

    if (inputPass1.value !== inputPass2.value) {
        document.getElementById(`pass2__group`).classList.add('form__group-nook');
        document.getElementById(`pass2__group`).classList.remove('form__group-ok');
        document.querySelector(`#pass2__group i`).classList.add('fa-times-circle');
        document.querySelector(`#pass2__group i`).classList.remove('fa-check-circle');
        document.querySelector(`#pass2__group .form__input-error`).classList.add('form__input-error-active');
        fields['pass'] = false;
    } else {
        document.getElementById(`pass2__group`).classList.remove('form__group-nook');
        document.getElementById(`pass2__group`).classList.add('form__group-ok');
        document.querySelector(`#pass2__group i`).classList.add('fa-times-circle');
        document.querySelector(`#pass2__group i`).classList.remove('fa-check-circle');
        document.querySelector(`#pass2__group .form__input-error`).classList.remove('form__input-error-active');
        fields['pass'] = true;
    }

}

inputs.forEach((input) => {
    input.addEventListener('keyup', validateForm);
    input.addEventListener('blur', validateForm);
});


form.addEventListener('submit', (e) => {
    e.preventDefault();

    const terms = document.getElementById('terms');



    if (fields.name && fields.surname && fields.dni && fields.user && fields.pass && fields.email && fields.phone && terms.checked) {
        form.reset();

        document.getElementById('form__msg-ok').classList.add('form__msg-ok-active')
        setTimeout(() => {
            document.getElementById('form__msg-ok').classList.remove('form__msg-ok-active')
        }, 5000);

        document.querySelectorAll('.form__group-ok').forEach((icon) => {
            icon.classList.remove('form__group-ok');
        });
        document.getElementById('form__msg').classList.remove('form__msg-active')
    } else {
        document.getElementById('form__msg').classList.add('form__msg-active')
    }
})

const clearForm = document.getElementById('form__btn-clear').addEventListener('click', function (e) {
    e.preventDefault();
    form.reset();
    window.location.reload();
});


const user = document.querySelector('input[name="username"]');
const pass = document.querySelector('input[name="password"]');
if (user) {
    function validateUser() {
        const isInvalidElExists = document.querySelector('.invalid__user');

        function getSecondPart(str, char) {
            return str.split(char)[1];
        }

        if (!user.value.includes('@')) {
            console.log(isInvalidElExists)
            if (isInvalidElExists === null) {
                user.insertAdjacentHTML('afterend', '<p class="invalid__user">Please insert correct email</p>')
            }

        } else {
            const partAfterAt = getSecondPart(user.value, '@')
            const isContainsDot = getSecondPart(partAfterAt, '.')
            if (partAfterAt && isContainsDot) {
                isInvalidElExists.remove()
            }
        }
    }
function validPassword () {
    const isInvalidElExists = document.querySelector('.invalid__password');
    const regex = /^(?=.*?[A-Z])(?=.*?[a-z]).{8,20}$/
    console.log('inside', pass.value.length, pass.value.match(regex))
    if(!pass.value.match(regex)) {
        pass.insertAdjacentHTML('afterend', '<p class="invalid__user">Password its to short, please put at list 8 characters, Capital and lowercase letter</p>')
    }
   
}

    user.addEventListener('change', validateUser)
    pass.addEventListener('change', validPassword)
}
const user = document.querySelector('input[name="username"]');
const pass = document.querySelector('input[name="password"]');
const submit = document.querySelector('input[type="submit"]')
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
                console.log(submit)
                submit.disabled = true ;
                submit.style.background = 'var(--red)';
            }
        } else {
            const partAfterAt = getSecondPart(user.value, '@')
            const isContainsDot = getSecondPart(partAfterAt, '.')
            if (partAfterAt && isContainsDot) {
                isInvalidElExists.remove()
                submit.disabled = false ;
                submit.style.background = 'linear-gradient(var(--lightYellow), var(--darkYellow))';
            }
        }
    }
function validPassword () {
    const isInvalidElExists = document.querySelector('.invalid__password');
    const regex = /^(?=.*?[A-Z])(?=.*?[a-z]).{8,20}$/
    console.log('inside', pass.value.length, pass.value.match(regex))
    if(!pass.value.match(regex)) {
        if(isInvalidElExists === null)
        pass.insertAdjacentHTML('afterend', '<p class="invalid__password">Password its to short or please put at list 8 characters, Capital and lowercase letter</p>')
        submit.disabled = true
        submit.style.background = 'var(--red)';
    }else {
        isInvalidElExists.remove()
        submit.disabled = false ;
        submit.style.background = 'linear-gradient(var(--lightYellow), var(--darkYellow))';
    }
   
} 

    user.addEventListener('change', validateUser)
    pass.addEventListener('change', validPassword)
}
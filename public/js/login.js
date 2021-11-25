const user = document.querySelector('input[name="username"]');
const pass = document.querySelector('input[name="password"]');
if(user){


function validateUser () {
    const isInvalidElExists = document.querySelector('.invalid');
    function getSecondPart(str, char) {
        return str.split(char)[1];
    }

   if(!user.value.includes('@')){
       console.log(isInvalidElExists)
        if(isInvalidElExists === null){
            user.insertAdjacentHTML('afterend', '<p class="invalid">Please insert correct email</p>')
        } 

   }else {
       const partAfterAt = getSecondPart(user.value, '@')
        const isContainsDot  = getSecondPart(partAfterAt, '.')
        if(partAfterAt && isContainsDot){
            isInvalidElExists.remove()
        }
}
}
user.addEventListener('change', validateUser)
}
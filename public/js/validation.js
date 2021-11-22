const ul = document.querySelectorAll('#own-list li').length;
    const add = document.querySelector('#add');

    const inputText = document.querySelectorAll('input[type="submit"]');

    inputText.forEach(int => int.addEventListener('click', (e) => {
        const intValue = int.previousElementSibling
        console.log('ok')
        if (intValue.value == '') {
            e.preventDefault()
            const ifElementExists = document.querySelector('.invalid')
            if( !ifElementExists){
                int.closest('form').insertAdjacentHTML('afterend', '<p class="invalid">Please insert Text or Numbers</p>')
                console.log('inside')
            } else { 
                return 
            }
        }
        console.log('clicken', intValue.value)
    }))

    if (ul > 10) {
        add.disabled = true;
        const p = document.createElement('p')
        p.textContent = 'Limis of Section. Buy Premium'
        document.querySelector('#own-list').appendChild(p)

    }
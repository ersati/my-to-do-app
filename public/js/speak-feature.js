const micro = document.querySelector('.wrapper__micro');
const input = document.querySelector('input[type="text"]')

window.SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;
const recognition = new SpeechRecognition();
recognition.interimResults = true;

recognition.addEventListener('result', e=> {
    const transcript = Array.from(e.results)
      .map(result => result[0])
      .map(result => result.transcript)
      .join('');
    input.value = transcript
})

micro.addEventListener('click', (e) => {
    recognition.start()
})
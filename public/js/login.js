const user = document.querySelector('input[name="username"]');
const pass = document.querySelector('input[name="password"]');

console.log(user, pass)
const all = [user, pass]
user.addEventListener('change', () => console.log('insides'))
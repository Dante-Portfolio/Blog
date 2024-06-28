const data = new URLSearchParams(location.search)
const box = document.getElementById('box')
const user = data.get('user')
const pass = data.get('pass')

box.innerText ='Usuario: ' + user + '\n' + 'Contraseña: ' + pass

const data = new URLSearchParams(location.search)
const box = document.getElementById('box')
const user = data.get('user')
const pass = data.get('pass')

async function getFecth() {
    const response = await fetch('../users.json')
    const usersJson = await response.json()
    if (usersJson.length > 0) {
        return usersJson
    }
}

// llamada asyncrona a fecth
async function getData() {
    const fechtData = await getFecth()
    return fechtData
}

// funcion principal > getData > getFecth
async function info() {
    const dataLogin = await getData()
    console.log(dataLogin)

    for (const userLogin of dataLogin) {
        if (user === userLogin.username && pass === userLogin.password) {
            box.innerText = 'Usuario: ' + user + '\n' + 'Contraseña: ' + pass + '\n' + 'Login: aceptado'
            const login = [{ user: user, pass: pass }]
            localStorage.setItem('userSession', JSON.stringify(login))
            return
        } else {
            box.innerText = 'Usuario: ' + user + '\n' + 'Contraseña: ' + pass + '\n' + 'Login: rechazado'
        }
    }
}

info()
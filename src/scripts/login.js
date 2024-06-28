const user = document.getElementById('user')
const pass = document.getElementById('pass')
const accept = document.getElementById('accept')
const send = document.getElementById('send')

function changeSubmit() {
    let send = document.getElementById('send')
    if (send.classList.contains('disabled')) {
        send.classList.replace('disabled', 'enabled')
    } else {
        send.classList.replace('enabled', 'disabled')
    }
}

function alertLogin() {
    const params = new URLSearchParams(location.search)
    if (params.has('login')) {
        alert('Vuelve a intentarlo\nLos datos introducidos son incorrectos')
    }
}

function testForm(par1, par2) {
    let pass = true
    if (par1.length < 1 || par2.length < 1) {
        alert('Revisa todos los campos, te faltan datos.')
        pass = false
        return
    }
    if (par1.toString().split(' ').length > 1 || par2.toString().split(' ').length > 1) {
        alert('Los espacios no están permitidos')
        pass = false
        return
    }
    if (pass = true) {
        window.open('../html/auth.html?user=' + par1 + '&pass=' + par2, '_self')
    }
}

setTimeout(alertLogin, 500)

accept.addEventListener("click", changeSubmit)
send.addEventListener("click", () => testForm(user.value, pass.value))
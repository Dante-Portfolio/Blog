let accept = document.getElementById('accept')
let send = document.getElementById('send')

function changeSubmit() {
    if (send.hasAttribute('disabled')) {
        send.removeAttribute('disabled');
    } 
    else {
        send.setAttribute('disabled', 'disabled');
    }
}

accept.addEventListener("click", changeSubmit)

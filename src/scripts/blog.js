const userBox = document.getElementById('userBox')
const data = new URLSearchParams(location.search)
const user = data.get('user')
const filters = document.getElementsByName('filter')
const mainContainer = document.getElementById('mainContainer')

userBox.innerHTML = user
console.log(mainContainer)
console.log(filters.length)

function selectFilter(par) {
    let filterTittle = filters[par].nextElementSibling.innerHTML
    mainContainer.innerHTML=filterTittle
}

for (let i = 0; i < filters.length; i++) {
    filters[i].addEventListener('click', function() {selectFilter(i)})
}
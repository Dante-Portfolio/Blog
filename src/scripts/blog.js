const userBox = document.getElementById('userBox')
const data = new URLSearchParams(location.search)
const user = data.get('user')
const filters = document.getElementsByName('filter')
const mainContainer = document.getElementById('mainContainer')

// FILTRADO E INNER
userBox.innerHTML = user

function selectFilter(par) {
    let filterTittle = filters[par].nextElementSibling.innerHTML
    mainContainer.innerHTML = filterTittle
}

for (let i = 0; i < filters.length; i++) {
    filters[i].addEventListener('click', function () { selectFilter(i) })
}
// ...................................................................

// FETCH & ACCESS TO DATA
async function getArticles() {
    const response = await fetch('../articles.json')
    const articlesJson = await response.json()
    return articlesJson
}

async function getObjects(par1, par2) {
    const data = await getArticles()
    console.log(data[par1])
    console.log(data[par1][par2])
}

getObjects(0, 'image')
getObjects(4, 'author')
// ...................................................................
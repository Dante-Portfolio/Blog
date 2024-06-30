const userBox = document.getElementById('userBox')
const data = new URLSearchParams(location.search)
const mainContainer = document.getElementById('sectionTitle')
const filter = document.getElementsByName('filter')
const articlesBox = document.getElementById('articlesBox')
const codeForm = document.getElementById('codeForm')
const levelForm = document.getElementById('levelForm')

codeForm.reset()
levelForm.reset()

// FETCH & ACCESS TO DATA
async function getArticles() {
    const response = await fetch('../articles.json')
    const articlesJson = await response.json()
    return articlesJson
}

let dataList = []
async function getObjects() {
    dataList = []
    const data = await getArticles()
    for (const item of data) {
        dataList.push(item)
    }
}
// ...................................................................

// TITLE INNER

function innerTitle(par) {
    let filterTittle = par.nextElementSibling.innerHTML
    mainContainer.innerHTML = filterTittle
}
// ....................................................................

// FILTER
let codeFilter = []
let levelFilter = []

function select() {
    codeFilter = []
    levelFilter = []
    const filterSelect = document.querySelectorAll('input[name="filter"]:checked')

    codeSelect = filterSelect[0]
    levelSelect = filterSelect[1]
    innerTitle(codeSelect)

    for (let item of dataList)
        if (item.labels[0] === codeSelect.nextElementSibling.innerHTML) {
            codeFilter.push(item)
        }

    if (codeFilter.length === 0) {
        codeFilter = dataList
    }

    for (let item of codeFilter)
        if (item.labels[1] === levelSelect.nextElementSibling.innerHTML) {
            levelFilter.push(item)
        }

    if (levelFilter.length === 0) {
        levelFilter = codeFilter
    }

    console.log('------------------------')
    console.log(codeSelect.nextElementSibling.innerHTML + ' ' + codeFilter.length)
    console.log(levelSelect.nextElementSibling.innerHTML + ' ' + levelFilter.length)
}
// ...................................................................

for (let i = 0; i < filter.length; i++) {
    filter[i].addEventListener('click', function () { select() })
}

getObjects()

import { componente } from '../components/card.js'

const userBox = document.getElementById('userBox')
const data = new URLSearchParams(location.search)
const titleContainer = document.getElementById('sectionTitle')
const filter = document.getElementsByName('filter')
const articlesContainer = document.getElementById('articlesContainer')
const codeForm = document.getElementById('codeForm')
const levelForm = document.getElementById('levelForm')

codeForm.reset()
levelForm.reset()

// TITLE INNER

function innerTitle(par) {
    let filterTittle = par.nextElementSibling.innerHTML
    titleContainer.innerHTML = filterTittle
}
// ....................................................................


// FETCH & ACCESS TO DATA
async function getArticles() {
    const response = await fetch('../articles.json')
    const articlesJson = await response.json()
    return articlesJson
}

let dataList = []

async function getObjects() {

    const data = await getArticles()
    dataList = []
    console.log(data)

    for (const item of data) {
        dataList.push(item)
        console.log('getObject pasa: ' + dataList)
        console.log(dataList)
    }
    return dataList
}
// ...................................................................

// FILTER
let codeFilter = []
let levelFilter = []

async function select() {
    const array = await getObjects()
    console.log('Select recoge :' + array)

    codeFilter = []
    levelFilter = []
    const filterSelect = document.querySelectorAll('input[name="filter"]:checked')

    let codeSelect = filterSelect[0]
    let levelSelect = filterSelect[1]
    innerTitle(codeSelect)

    for (let item of array)
        if (item.labels[0] === codeSelect.nextElementSibling.innerHTML) {
            codeFilter.push(item)
        }

    if (codeFilter.length === 0) {
        codeFilter = array
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
    return levelFilter
}
// ...................................................................

async function arquited() {
    const elements = await select()
    console.log('arquited recoge :' + elements.length)
    const cards4Container = 3
    const containerNeeded = Math.ceil(elements.length / 3)

    console.log('Elementos por contenedor: ' + cards4Container)
    console.log('Número de elementos: ' + elements.length)
    console.log('Contenedores necesarios: ' + containerNeeded)

    articlesContainer.innerHTML = ''
    let z = 0
    for (let i = 0; i < containerNeeded; i++) {
        let container = document.createElement('span')
        container.classList = 'cardContainer'
        articlesContainer.appendChild(container)

        for (let x = 0; x < cards4Container; x++) {
            let card = document.createElement('card-art')
            // card.setAttribute('config', elements[z]) 
            card.setAttribute('config', JSON.stringify(elements[z])) 

            z += 1

            container.appendChild(card)
        }
    }
}

for (let i = 0; i < filter.length; i++) {
    filter[i].addEventListener('click', function () { arquited() })
}

getObjects()
arquited()

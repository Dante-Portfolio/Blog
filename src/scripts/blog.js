import { componente } from '../components/card.js'


const userBox = document.getElementById('userBox')
const data = new URLSearchParams(location.search)
const titleContainer = document.getElementById('sectionTitle')
const filter = document.getElementsByName('filter')
const articlesContainer = document.getElementById('articlesContainer')
const codeForm = document.getElementById('codeForm')
const levelForm = document.getElementById('levelForm')

codeForm.reset()    // reset radios
levelForm.reset()   // reset radios
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

    for (const item of data) {
        dataList.push(item)
    }
    return dataList
}
// ...................................................................

// FILTER
let codeFilter = []
let levelFilter = []

async function select() {
    const array = await getObjects()

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

    console.log('filtro 1: ' + codeSelect.nextElementSibling.innerHTML + ' ' + codeFilter.length)
    console.log('filtro 2: ' +levelSelect.nextElementSibling.innerHTML + ' ' + levelFilter.length)
    return levelFilter
}
// ...................................................................

// ARQUITED calcula, genera contenedores e inserta los elementos
async function arquited() {
    const elements = await select()
    console.log('Arquited recoge: ' + elements.length + ' elementos')
    const cards4Container = 3
    const containerNeeded = Math.ceil(elements.length / 3)

    console.log('   Elementos por contenedor: ' + cards4Container)
    console.log('   Número de elementos: ' + elements.length)
    console.log('   Contenedores necesarios: ' + containerNeeded)

    articlesContainer.innerHTML = ''
    let z = 0 // Contador elementos totales
    for (let i = 0; i < containerNeeded; i++) {
        let container = document.createElement('span')
        container.classList = 'cardContainer'
        articlesContainer.appendChild(container)

        for (let x = 0; x < cards4Container; x++) {
            let card = document.createElement('card-art')
            card.setAttribute('config', JSON.stringify(elements[z])) 
            //
            z += 1
            //
            container.appendChild(card)
        }
    }
    console.log('------------------------')
}
// ..............................................................

for (let i = 0; i < filter.length; i++) {
    filter[i].addEventListener('click', function () { arquited() })
}

userBox.innerHTML = data.get('user')

getObjects()
arquited()

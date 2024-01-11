let data = []

const getData = () => {
    fetch('/roupas.json')
    .then(response => response.json())
    .then(roupas => {
        data.push(roupas)
        update()
    })
}

const perPage = 8
const state = {
  page: 1,
  perPage: perPage,
  totalPage: null
}

const html = {
  get(elementDom){
    return document.querySelector(elementDom)
  },
  getAll(elementDom){
    return document.querySelectorAll(elementDom)
  }
}

const controls = {
  next(){
    state.page++
    if(state.page > state.totalPage) state.page--
  },
  prev(){
    state.page--
    if(state.page <= 0) state.page++
  },
  callListeners(){
    html.get('.next').addEventListener('click', (e) => {
      e.preventDefault()
      this.next()
      update()
    })
    
    html.get('.previus').addEventListener('click', (e) => {
      e.preventDefault()
      this.prev() 
      update()
    })
  }
}

const list = {
  create(item){
    const div = document.createElement('div')
    div.classList.add('card')

    const img = document.createElement('img')
    img.classList.add('img-card')
    img.src = item.imagem
    div.appendChild(img)

    const h1 = document.createElement('h1')
    h1.classList.add('title-card')
    h1.innerHTML = item.nome
    div.appendChild(h1)

    const stars = document.createElement('div')
    stars.classList.add('review')
    stars.innerHTML = `<img src="./src/img/stars.svg" alt="icon review stars">
    <span class="number-review">5.0/<span class="number-review-finaly">5</span></span>`
    div.appendChild(stars)

    const price = document.createElement('h1')
    price.classList.add('price')
    price.innerHTML = item.preco
    div.appendChild(price)

    
    html.get('.column').appendChild(div)
  },
  update(){
    html.get('.column').innerHTML = ""
    
    let page = state.page - 1
    let start = page * state.perPage
    let end = start + state.perPage
    
    let itensPage = data[0].slice(start, end)
    
    itensPage.forEach((item) => this.create(item))

    state.totalPage = Math.ceil(data[0].length / state.perPage);
  }
}

const updateNumber = () => {
  html.get('.number').textContent = state.page
  html.get('.number').classList.add('btn-number-pag')
}

const update = () => {
  list.update()
  updateNumber()
  search()
}

const search = () => {
    let inputSearch = html.get('.inpt-search')
    let cards = html.getAll('.card')

    inputSearch.addEventListener('input', () => {
        if(inputSearch.value !== ""){
            cards.forEach(card => {
                let titleCard = card.querySelector('.title-card')
                titleCard = titleCard.innerHTML.toLowerCase().trim()

                let valueInput = inputSearch.value.toLowerCase().trim()

                if(!titleCard.includes(valueInput)){
                    card.style.display = "none"
                } else {
                    card.style.display = "flex"
                }
            })
        } else {
            cards.forEach(card => {
                card.style.display = "flex"
            })
        }
    })
}

function init(){
  getData()
  controls.callListeners()
}

init()
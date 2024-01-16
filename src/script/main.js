let data = []
let priceUp = 0;

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
    
    const cartItem = document.createElement('button')
    cartItem.classList.add('cart-button')
    cartItem.innerHTML = 'Comprar'
    div.appendChild(cartItem)

    const amount = document.createElement('span')
    amount.innerHTML = item.quantidade
    amount.classList.add('current-amount')
    amount.style.display = 'none'
    div.appendChild(amount)
    
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
  let duplicateNumber = state.page + 1
  let triplicateNumber = duplicateNumber + 1

  html.get('.number').textContent = state.page
  html.get('.btn-number-pag2').textContent = duplicateNumber
  html.get('.btn-number-pag3').textContent = triplicateNumber
  html.get('.number').classList.add('btn-number-pag')
  html.get('.btn-number-pag2').classList.add('btn-number-pag')
  html.get('.btn-number-pag3').classList.add('btn-number-pag')
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

html.get('.cart-btn').addEventListener('click', () => {
  html.get('.cart-content').showModal()
  // if(html.get('.container-products').innerHTML === ""){
  //   html.get('.container-products').innerHTML = `<h1> Não existe produtos no carrinho </h1>`
  // }
})

html.get('.exit-cart').addEventListener('click', () => {
  html.get('.cart-content').close()
})

const modalOpen = () => {
    html.get('.cart-content').showModal()
}

const exitModal = () => {
    html.get('.cart-content').close()
}

document.addEventListener('DOMContentLoaded', () => {
  getCartButtons()
})

const getCartButtons = () => {
  document.addEventListener('click', (e) => {
    let clickDom = e.target

    if(clickDom.classList.contains('cart-button')){
      getItemCart(clickDom.parentElement)
    }
  })
}

const getItemCart = (item) => {
  const svgCode = `
  <svg xmlns='http://www.w3.org/2000/svg' width='20' height='20' viewBox='0 0 20 20' fill='none'>
    <path d='M16.875 3.75003H13.75V3.12503C13.75 2.62775 13.5525 2.15084 13.2008 1.79921C12.8492 1.44757 12.3723 1.25003 11.875 1.25003H8.125C7.62772 1.25003 7.15081 1.44757 6.79917 1.79921C6.44754 2.15084 6.25 2.62775 6.25 3.12503V3.75003H3.125C2.95924 3.75003 2.80027 3.81588 2.68306 3.93309C2.56585 4.0503 2.5 4.20927 2.5 4.37503C2.5 4.54079 2.56585 4.69976 2.68306 4.81697C2.80027 4.93418 2.95924 5.00003 3.125 5.00003H3.75V16.25C3.75 16.5816 3.8817 16.8995 4.11612 17.1339C4.35054 17.3683 4.66848 17.5 5 17.5H15C15.3315 17.5 15.6495 17.3683 15.8839 17.1339C16.1183 16.8995 16.25 16.5816 16.25 16.25V5.00003H16.875C17.0408 5.00003 17.1997 4.93418 17.3169 4.81697C17.4342 4.69976 17.5 4.54079 17.5 4.37503C17.5 4.20927 17.4342 4.0503 17.3169 3.93309C17.1997 3.81588 17.0408 3.75003 16.875 3.75003ZM8.75 13.125C8.75 13.2908 8.68415 13.4498 8.56694 13.567C8.44973 13.6842 8.29076 13.75 8.125 13.75C7.95924 13.75 7.80027 13.6842 7.68306 13.567C7.56585 13.4498 7.5 13.2908 7.5 13.125V8.12503C7.5 7.95927 7.56585 7.8003 7.68306 7.68309C7.80027 7.56588 7.95924 7.50003 8.125 7.50003C8.29076 7.50003 8.44973 7.56588 8.56694 7.68309C8.68415 7.8003 8.75 7.95927 8.75 8.12503V13.125ZM12.5 13.125C12.5 13.2908 12.4342 13.4498 12.3169 13.567C12.1997 13.6842 12.0408 13.75 11.875 13.75C11.7092 13.75 11.5503 13.6842 11.4331 13.567C11.3158 13.4498 11.25 13.2908 11.25 13.125V8.12503C11.25 7.95927 11.3158 7.8003 11.4331 7.68309C11.5503 7.56588 11.7092 7.50003 11.875 7.50003C12.0408 7.50003 12.1997 7.56588 12.3169 7.68309C12.4342 7.8003 12.5 7.95927 12.5 8.12503V13.125ZM12.5 3.75003H7.5V3.12503C7.5 2.95927 7.56585 2.8003 7.68306 2.68309C7.80027 2.56588 7.95924 2.50003 8.125 2.50003H11.875C12.0408 2.50003 12.1997 2.56588 12.3169 2.68309C12.4342 2.8003 12.5 2.95927 12.5 3.12503V3.75003Z'
      fill='#FF3333'
  /></svg>
`;

  const currentAmount = item.querySelector('.current-amount').textContent

  const imageCard = item.querySelector('.img-card')
  const imageCardSrc = imageCard.src
  
  const nameCard = item.querySelector('.title-card').textContent
  
  const priceCard = item.querySelector('.price').textContent

  const areaProducts = document.querySelector('.container-products')

  const div = document.createElement('div')
  div.classList.add('product-cart')

  const sectionImage = document.createElement('section')
  sectionImage.classList.add('image-cart')

  const image = document.createElement('img')
  image.classList.add('img-cart')
  image.src = imageCardSrc

  sectionImage.appendChild(image)
  div.appendChild(sectionImage)

  const sectionDetails = document.createElement('section')
  sectionDetails.classList.add('details-cart')

  const cartHeader = document.createElement('div')
  cartHeader.classList.add('cart-header')

  const titleCard = document.createElement('h1')
  titleCard.innerHTML = nameCard

  const spanDelete = document.createElement('span')
  spanDelete.classList.add('delete-card')
  spanDelete.innerHTML = svgCode

  cartHeader.appendChild(titleCard)
  cartHeader.appendChild(spanDelete)
  sectionDetails.appendChild(cartHeader)

  const size = document.createElement('h1')
  size.classList.add('size')
  const sizeInf = document.createElement('span')
  sizeInf.classList.add('size-inf')
  size.innerHTML = 'Size: '
  sizeInf.innerHTML = 'Medium'
  size.appendChild(sizeInf)
  sectionDetails.appendChild(size)

  const color = document.createElement('h1')
  color.classList.add('color')
  const colorInf = document.createElement('span')
  colorInf.classList.add('color-inf')
  color.innerHTML = 'Color: '
  colorInf.innerHTML = 'Red'
  color.appendChild(colorInf)
  sectionDetails.appendChild(color)

  const priceAmount = document.createElement('div')
  priceAmount.classList.add('price-amount')
  const price = document.createElement('h1')
  price.classList.add('price-cart')
  price.innerHTML = priceCard
  const amountContent = document.createElement('div')
  amountContent.classList.add('amount-content')
  const removeCart = document.createElement('span')
  removeCart.classList.add('remove-cart')
  removeCart.innerHTML = '-'
  const numberCart = document.createElement('span')
  numberCart.classList.add('number-cart')
  numberCart.innerHTML = currentAmount
  const addCart = document.createElement('span')
  addCart.classList.add('add-cart')
  addCart.innerHTML = '+'

  amountContent.appendChild(removeCart)
  amountContent.appendChild(numberCart)
  amountContent.appendChild(addCart)

  priceAmount.appendChild(price)
  priceAmount.appendChild(amountContent)
  sectionDetails.appendChild(priceAmount)

  div.appendChild(sectionDetails)
  areaProducts.appendChild(div)

  controlsCart.listenerAmount(div)
  
  const priceAmountReplace = priceCard.replace("$", "")
  const priceAmountNumber = Number(priceAmountReplace)

  updatePrice(priceAmountNumber)

  modalOpen()
}

const controlsCart = {
  addAmount(card){
    const amount = card.querySelector('.price-cart').textContent
    const amountReplace= amount.replace("$", "")
    const amountNumber = Number(amountReplace)
    let amountCard = card.querySelector('.number-cart')
    let currentAmount = Number(amountCard.textContent)
    amountCard.innerHTML = currentAmount += 1

    updatePriceListener(amountNumber)
  },
  removeAmount(card){
    const amount = card.querySelector('.price-cart').textContent
    const amountReplace= amount.replace("$", "")
    const amountNumber = Number(amountReplace)
    let amountCard = card.querySelector('.number-cart')
    let currentAmount = Number(amountCard.textContent)
    amountCard.innerHTML = currentAmount -= 1

    if(currentAmount <= 0){
      amountCard.innerHTML = currentAmount += 1
      return amountCard
    }

    updatePriceListener(-amountNumber)
  },
  listenerAmount(div){
    const add = div.querySelector('.add-cart')
    const remove = div.querySelector('.remove-cart')
    
    add.addEventListener('click', () => {
      this.addAmount(div)
    })

    remove.addEventListener('click', () => {
      this.removeAmount(div)
    })

    deleteItemCart()
  }
}

const updatePrice = (price) => {
  priceUp += price
  const priceCurrent = html.get('.price-real')
  priceCurrent.innerHTML = `$${priceUp}`
}

const updatePriceListener = (quantity) => {
  const priceAdd = priceUp += quantity

  const priceCurrent = html.get('.price-real')
  priceCurrent.innerHTML = `$${priceAdd}`
}

const deleteItemCart = () => {
  document.addEventListener('click', (e) => {
    let clickArea = e.target;

    if (clickArea.classList.contains('delete-card')) {
      const cartItem = clickArea.parentElement.parentElement.parentElement;

      // const priceElement = cartItem.querySelector('.price-cart');
      // const priceString = priceElement.textContent.replace('$', '');
      // const price = Number(priceString);

      // let newPrice = priceUp - price
      // if(newPrice <= 0){
      //   priceUp = 0
      //   newPrice = 0
      // } 
      // const priceCurrent = html.get('.price-real')
      // priceCurrent.innerHTML = `$${newPrice}`

      cartItem.remove();
      priceUp = 0
      updatePrice(0)
    }
  });
};

function init(){
  getData()
  controls.callListeners()
}

init()
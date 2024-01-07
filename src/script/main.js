let count = 1
const btnNext = document.querySelector('.next')
const btnPrevius = document.querySelector('.previus')
let input = document.querySelector('.inpt-search')
let cards = document.querySelectorAll('.card')
let columnCards = document.querySelector('.column')
    
document.addEventListener('click', (e) =>{
    const elementHtmlClicked = e.target
    const getTagNameElement = elementHtmlClicked.tagName.toLowerCase()

    if(getTagNameElement === "a"){
        e.preventDefault()
        loadPage(elementHtmlClicked)
    }
})

function nextAndPreviusPage(direction){
    count += direction
    if(count < 1) count = 1
    if(count > 3) count = 1

    btnNext.href = `./produtos${count}.html`
    btnPrevius.href = `./produtos${count}.html`
}

function loadPage(clickedElement){
    const getHref = clickedElement.getAttribute('href')

    fetch(getHref)
    .then(respost => respost.text())
    .then(htmlText => viewPage(htmlText))
    .catch(err => console.log(err))
}

function eventSearch(){
    if(input.value !== ""){
         cards.forEach(card => {
             let title = card.querySelector('.title-card')
             title = title.innerHTML.toLowerCase().trim()
             let inputText = input.value.toLowerCase().trim()
     
             if(!title.includes(inputText)){
                 card.style.display = "none"
             } else{
                 card.style.display = "flex"
             }
         })
     } else{
         cards.forEach(card => {
             card.style.display = 'flex'
         })
     } 
}

input.addEventListener('input', eventSearch)

function viewPage(textHtml){
    let areaHtml = document.querySelector('.column')
    areaHtml.innerHTML = textHtml

    input.removeEventListener('input', eventSearch)
    input.addEventListener('input', eventSearch)

    cards = document.querySelectorAll('.card')
}
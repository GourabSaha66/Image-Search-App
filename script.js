const key="F84xItFCfbVW1MneiOX6nHfJ04UpcQqoWU_BTTFLdhI"

const formEl = document.querySelector('form')
const searchInputEl = document.getElementById('searchInp')
const searchResultsEl = document.querySelector('.searchResults')
const showMoreBtn = document.getElementById('showMoreBtn')

let inputData=""
let page= 1

const searchImages = async ()=>{
    inputData = searchInputEl.value
    const url = `https://api.unsplash.com/search/photos?page=${page}&query=${inputData}&client_id=${key}`
    const response = await fetch(url)
    const data = await response.json()
    if(page===1){
        searchResultsEl.innerHTML=""
    }

    const results = data.results;

    results.map((res)=>{
        const imageWrapper = document.createElement("div")
        imageWrapper.classList.add('searchResult')
        const image = document.createElement('img')
        image.src = res.urls.small
        image.alt = res.alt_description
        const imageLink = document.createElement("a")
        imageLink.href = res.links.html
        imageLink.target = "_blank"
        imageLink.textContent = res.alt_description

        imageWrapper.appendChild(image)
        imageWrapper.appendChild(imageLink)

        searchResultsEl.appendChild(imageWrapper)
    })

    page++

    if(page>1){
        showMoreBtn.style.display = "block"
    }

}

formEl.addEventListener('submit', ((e)=>{
    e.preventDefault()
    page=1
    searchImages()
}))

showMoreBtn.addEventListener("click",(()=>{
    searchImages()
}))
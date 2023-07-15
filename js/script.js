//api pour recuperer les donnes
fetch('http://localhost:3000/api/products')
.then((res) => res.json())
.then((data) => addProducts(data))

function addProducts(donnees){

for (let product in donnees){

const _id = donnees[product]._id
const imageUrl = donnees[product].imageUrl
const altTxt = donnees[product].altTxt
const name = donnees[product].name
const description = donnees[product].description

const anchor = makeAnchor(_id)

const article = document.createElement("article")
const image = makeImage(imageUrl, altTxt)
const h3 = makeH3(name)
const p = makeParagraph(description)

appendElemntsToArticle(article, image, h3, p)
appendArticleToAnchor(anchor, article)
//})
}
}

//fonction pour rajouter des elements à l'article
function appendElemntsToArticle(article, image, h3, p){
    article.appendChild(image)
    article.appendChild(h3)
    article.appendChild(p)
}
//fonction pour creer le lien de l'article
function makeAnchor(id){
    const anchor = document.createElement("a")
    anchor.href = "./product.html?id=" + id
    return anchor
}

function appendArticleToAnchor(anchor, article){
    const items = document.querySelector("#items")
    if(items != null)
    items.appendChild(anchor)
    anchor.appendChild(article)
}
//fonction pour creer l'image du produit
function makeImage(imageUrl, altTxt){
    const image = document.createElement("img")
    image.src = imageUrl
    image.alt = altTxt
    return image
}
//fonction pour creer l'article
function makeArticle(){
    const article = document.createElement("article")
    return article
}
//fonction pour creer le nom du produit
function makeH3(name){
    const h3 = document.createElement("h3")
    h3.textContent = name
    h3.classList.add("productName")
    return h3
}
//fonction pour creer la description des produits
function makeParagraph(description){
    const p = document.createElement("p")
    p.textContent = description
    p.classList.add("productDescription")
    return p
}
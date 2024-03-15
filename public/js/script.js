const hamburger = document.querySelector(".hamburger");
const nav = document.querySelector(".nav");

hamburger.addEventListener("click", () => nav.classList.toggle("active"));


const cardPremium = document.getElementById("card_premium");
const cardBest = document.getElementById("card_best");
const cardPro = document.getElementById("card_pro");
const carrossel = document.getElementById("id_carrossel");

let qtd = 0;

let tela = window.innerWidth;

cardBest.addEventListener("click", () => {
    if (tela <= 710) {
        carrossel.style.marginLeft = "150%";
        ocultaCard(cardPremium)
        ocultaCard(cardPro)
        exporCard(cardBest)
    }
})


cardPremium.addEventListener("click", () => {
    if (tela <= 710) {
        carrossel.style.marginRight = "150%";
        ocultaCard(cardBest)
        ocultaCard(cardPro)
        exporCard(cardPremium)
    }
})


cardPro.addEventListener("click", () => {
    if (tela <= 710) {
        carrossel.style.marginLeft = "0";
        carrossel.style.marginRight = "0";
        ocultaCard(cardPremium)
        ocultaCard(cardBest)
        exporCard(cardPro)
    }
})


const verificaTamanho = () => {
    tela = window.innerWidth;
    if (tela > 710) {
        carrossel.style.marginLeft = "0";
        carrossel.style.marginRight = "0";
        exporCard(cardPremium)
        exporCard(cardPro)
        exporCard(cardBest)
        qtd = 0;
    }
    else {
        qtd++
        if (qtd == 1) {
            ocultaCard(cardPremium)
            ocultaCard(cardBest)
            exporCard(cardPro)
        }
    }
}


function ocultaCard(card) {
    card.style.opacity = 0.5
    card.style.filter = "blur(5px)"
    card.style.opacity = "350px"
    card.style.filter = "400px"
    card.style.scale = "0.9"
    card.style.cursor = "pointer"
}

function exporCard(card) {
    card.style.opacity = 1
    card.style.filter = "none"
    card.style.scale = "1"
    card.style.cursor = ""
}


window.addEventListener("resize", verificaTamanho);

window.onload(verificaTamanho);




const hamburger = document.querySelector(".hamburger");
const nav = document.querySelector(".nav");

hamburger.addEventListener("click", () => nav.classList.toggle("active"));

// PRIMEIRO CARROSSEL

const cardPremium = document.getElementById("card_premium");
const cardBest = document.getElementById("card_best");
const cardPro = document.getElementById("card_pro");
const carrossel = document.getElementById("id_carrossel");

let qtd = 0;

let tela = window.innerWidth;

cardBest.addEventListener("click", () => {
    if (tela <= 710) {
        carrossel.style.marginLeft = "150%";
        ocultaCard(cardPremium);
        ocultaCard(cardPro);
        exporCard(cardBest);
    }
});

cardPremium.addEventListener("click", () => {
    if (tela <= 710) {
        carrossel.style.marginRight = "150%";
        ocultaCard(cardBest);
        ocultaCard(cardPro);
        exporCard(cardPremium);
    }
});

cardPro.addEventListener("click", () => {
    if (tela <= 710) {
        carrossel.style.marginLeft = "0";
        carrossel.style.marginRight = "0";
        ocultaCard(cardPremium);
        ocultaCard(cardBest);
        exporCard(cardPro);
    }
});

const verificaTamanho = () => {
    tela = window.innerWidth;
    if (tela > 710) {
        carrossel.style.marginLeft = "0";
        carrossel.style.marginRight = "0";
        exporCard(cardPremium);
        exporCard(cardPro);
        exporCard(cardBest);
        qtd = 0;
    } else {
        qtd++;
        if (qtd === 1) {
            ocultaCard(cardPremium);
            ocultaCard(cardBest);
            exporCard(cardPro);
        }
    }
};

function ocultaCard(card) {
    card.style.opacity = "0.5";
    card.style.filter = "blur(5px)";
    card.style.transform = "scale(0.9)";
    card.style.cursor = "pointer";
}

function exporCard(card) {
    card.style.opacity = "1";
    card.style.filter = "none";
    card.style.transform = "scale(1)";
    card.style.cursor = "";
}

window.addEventListener("resize", verificaTamanho);
window.onload = verificaTamanho;

// CARROSSEL NOSSA EQUIPE

const cardGuilherme = document.getElementById("card_guilherme");
const cardClaudio = document.getElementById("card_claudio");
const cardDiego = document.getElementById("card_diego");
const cardJulia = document.getElementById("card_julia");
const cardMaria = document.getElementById("card_maria");
const cardThiago = document.getElementById("card_thiago");
const carrosselEquipe = document.getElementById("id_carrossel_equipe");


window.onload = () => {
    verificaTamanho();
    exporCardEquipe(cardGuilherme); 
    exporCardEquipe(cardJulia); 
    ocultaCardEquipe(cardClaudio); 
    ocultaCardEquipe(cardDiego);
    ocultaCardEquipe(cardMaria);
    ocultaCardEquipe(cardThiago);
};
carrosselEquipe.style.marginLeft = "0"; 
carrosselEquipe.style.marginRight = "35%"; 





cardClaudio.addEventListener("click", () => {
    if (tela > 1040 || tela < 710) {
        carrosselEquipe.style.marginLeft = "30%";
        carrosselEquipe.style.marginRight = "0";
        ocultaCardEquipe(cardGuilherme);
        exporCardEquipe(cardDiego);
        ocultaCardEquipe(cardJulia);
        ocultaCardEquipe(cardMaria);
        ocultaCardEquipe(cardThiago);
        exporCardEquipe(cardClaudio);
    }
});

cardGuilherme.addEventListener("click", () => {
    if (tela > 1040 || tela < 710) {
        carrosselEquipe.style.marginLeft = "0"; 
        carrosselEquipe.style.marginRight = "35%"; 
        ocultaCardEquipe(cardClaudio);
        ocultaCardEquipe(cardDiego);
        exporCardEquipe(cardJulia);
        ocultaCardEquipe(cardMaria);
        ocultaCardEquipe(cardThiago);
        exporCardEquipe(cardGuilherme);
    }
});

cardDiego.addEventListener("click", () => {
    if (tela > 1040 || tela < 710) { 
        carrosselEquipe.style.marginLeft = "30%";
        carrosselEquipe.style.marginRight = "0";
        ocultaCardEquipe(cardGuilherme);
        exporCardEquipe(cardClaudio);
        ocultaCardEquipe(cardJulia);
        ocultaCardEquipe(cardMaria);
        ocultaCardEquipe(cardThiago);
        exporCardEquipe(cardDiego);
    }
});

cardJulia.addEventListener("click", () => {
    if (tela > 1040 || tela < 710) {
    
        carrosselEquipe.style.marginLeft = "0"; 
        carrosselEquipe.style.marginRight = "35%";  
        exporCardEquipe(cardGuilherme);
        ocultaCardEquipe(cardClaudio);
        ocultaCardEquipe(cardDiego);
        ocultaCardEquipe(cardMaria);
        ocultaCardEquipe(cardThiago);
        exporCardEquipe(cardJulia);

    }
});

cardMaria.addEventListener("click", () => {
    if (tela > 1040 || tela < 710) {
        carrosselEquipe.style.marginLeft = "0";
        carrosselEquipe.style.marginRight = "117%";
        ocultaCardEquipe(cardGuilherme);
        ocultaCardEquipe(cardClaudio);
        ocultaCardEquipe(cardDiego);
        ocultaCardEquipe(cardJulia);
        exporCardEquipe(cardThiago);
        exporCardEquipe(cardMaria);
    }
});

cardThiago.addEventListener("click", () => {
    if (tela > 1040 || tela < 710) {
        carrosselEquipe.style.marginLeft = "0";
        carrosselEquipe.style.marginRight = "117%";
        ocultaCardEquipe(cardGuilherme);
        ocultaCardEquipe(cardClaudio);
        ocultaCardEquipe(cardDiego);
        ocultaCardEquipe(cardJulia);
        exporCardEquipe(cardMaria);
        exporCardEquipe(cardThiago);
    }
});

const verificaTamanhoEquipe = () => {
    if (tela < 1040 && tela > 710) {
        carrosselEquipe.style.marginLeft = "0";
        carrosselEquipe.style.marginRight = "0";
        exporCardEquipe(cardJulia);
        exporCardEquipe(cardMaria);
        exporCardEquipe(cardThiago);
        exporCardEquipe(cardGuilherme);
        exporCardEquipe(cardDiego);
        exporCardEquipe(cardClaudio);

        qtd = 0;
    } else {
        qtd++;
        if (qtd === 1) {
            exporCardEquipe(cardGuilherme);
            ocultaCardEquipe(cardClaudio);
            exporCardEquipe(cardJulia);
            ocultaCardEquipe(cardMaria);
            ocultaCardEquipe(cardThiago);
            ocultaCardEquipe(cardDiego);
        }
    }
};

function ocultaCardEquipe(card) {
    card.style.opacity = "0.5";
    card.style.filter = "blur(5px)";
    card.style.transform = "scale(0.9)";
    card.style.cursor = "pointer";
}

function exporCardEquipe(card) {
    card.style.opacity = "1";
    card.style.filter = "none";
    card.style.transform = "scale(1)";
    card.style.cursor = "";
}

window.addEventListener("resize", verificaTamanhoEquipe);
window.onload = verificaTamanhoEquipe;



// Sobre VisualOps

function mostrarSolucoes(){
    var infos = document.getElementById("aparecerSolucoes");
    
    if(infos.style.display == "flex" || infos.style.display == "block"){
        infos.style.display = "none";
    } else{
        infos.style.display = "flex";
    }

};

function mostrarContatos(){
    var infos = document.getElementById("aparecerContatos");
    
    if(infos.style.display == "flex" || infos.style.display == "block"){
        infos.style.display = "none";
    } else{
        infos.style.display = "flex";
    }
}
const inicio = document.getElementById("inicio");
const carta = document.getElementById("carta");
const final = document.getElementById("final");

const musica = document.getElementById("musica");
const botaoMusica = document.getElementById("botaoMusica");

function mostrarTela(tela) {
    document.querySelectorAll(".tela").forEach(function (elemento) {
        elemento.classList.remove("ativa");
    });

    tela.classList.add("ativa");

    window.scrollTo({
        top: 0,
        behavior: "smooth"
    });
}


// ABRIR A CARTA

document.getElementById("abrirCarta").addEventListener("click", function () {
    mostrarTela(carta);
});


// MÚSICA

botaoMusica.addEventListener("click", async function () {
    if (musica.paused) {
        try {
            await musica.play();
            botaoMusica.textContent = "♫ Música tocando";
        } catch (erro) {
            botaoMusica.textContent = "Não foi possível tocar";
        }
    } else {
        musica.pause();
        botaoMusica.textContent = "♫ Tocar nossa música";
    }
});


// RESPOSTA SIM

document.getElementById("botaoSim").addEventListener("click", function () {
    mostrarTela(final);

    criarExplosaoDeCoracoes();

    // Tenta iniciar a música se ainda estiver pausada.
    if (musica.paused) {
        musica.play().catch(function () {});
    }
});


// RESPOSTA: PRECISO PENSAR

document.getElementById("botaoAgoraNao").addEventListener("click", function () {
    document.getElementById("mensagemResposta").textContent =
        "Tudo bem! Quero que você responda com o coração. ❤️";
});


// SURPRESA DA TELA FINAL

document.getElementById("botaoSurpresa").addEventListener("click", function () {
    const surpresa = document.getElementById("surpresa");

    surpresa.classList.remove("escondida");

    document.getElementById("botaoSurpresa").textContent =
        "Surpresa revelada! ❤️";

    this.disabled = true;
});


// SURPRESA SECRETA

const modal = document.getElementById("surpresaSecreta");

document.getElementById("estrelinha").addEventListener("click", function () {
    modal.classList.remove("escondida");
});

document.getElementById("fecharSurpresa").addEventListener("click", function () {
    modal.classList.add("escondida");
});

modal.addEventListener("click", function (evento) {
    if (evento.target === modal) {
        modal.classList.add("escondida");
    }
});


// CORAÇÕES CAINDO

const areaCoracoes = document.getElementById("coracoes");

function criarCoracao() {
    const coracao = document.createElement("span");

    coracao.classList.add("coracao-caindo");

    const simbolos = ["❤️", "💕", "💗", "💖", "♥"];

    coracao.textContent =
        simbolos[Math.floor(Math.random() * simbolos.length)];

    coracao.style.left = Math.random() * 100 + "vw";

    coracao.style.fontSize =
        (Math.random() * 18 + 12) + "px";

    const duracao = Math.random() * 5 + 5;

    coracao.style.animationDuration = duracao + "s";

    areaCoracoes.appendChild(coracao);

    setTimeout(function () {
        coracao.remove();
    }, duracao * 1000);
}

setInterval(criarCoracao, 450);


// EXPLOSÃO DE CORAÇÕES AO ACEITAR

function criarExplosaoDeCoracoes() {
    for (let i = 0; i < 35; i++) {
        setTimeout(function () {
            const coracao = document.createElement("span");

            coracao.classList.add("coracao-caindo");
            coracao.textContent = "💖";

            coracao.style.left = Math.random() * 100 + "vw";
            coracao.style.fontSize =
                (Math.random() * 25 + 15) + "px";

            coracao.style.animationDuration =
                (Math.random() * 3 + 3) + "s";

            areaCoracoes.appendChild(coracao);

            setTimeout(function () {
                coracao.remove();
            }, 6000);

        }, i * 80);
    }
}
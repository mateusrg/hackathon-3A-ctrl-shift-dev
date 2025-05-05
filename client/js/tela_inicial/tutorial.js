import Usuario from '../funcoes/usuario.js';

async function verificarLogin() {
    const usuarioStorage = JSON.parse(localStorage.getItem('usuario'));

    if (!usuarioStorage || usuarioStorage.length === 0) {
        window.location.href = '../../html/login/pagina_inicial_deslogado.html';
        return;
    }

    try {
        const usuario = await Usuario.selecionarUsuarioPorId(usuarioStorage.id);

        if (!usuario || usuario.email !== usuarioStorage.email) {
            window.location.href = '../../html/login/pagina_inicial_deslogado.html';
        }
    } catch (error) {
        console.error("Erro ao acessar o servidor:", error);
        window.location.href = '../../html/login/pagina_inicial_deslogado.html';
    }
}

localStorage.setItem('isRun', true);

verificarLogin();

const imagensTutorial = [];
for (let i = 1; i <= 17; i++) {
    const img = new Image();
    img.src = `../../assets/tutorial/tutorial${i}.png`;
    imagensTutorial.push(img);
}

let tutorial = 1;

function clicarSetaEsquerda() {
    document.querySelector('#seta-direita')?.remove();
    const game = document.getElementById('game');
    tutorial--;
    game.style.backgroundImage = `url('${imagensTutorial[tutorial - 1].src}')`;

    const setaDireita = document.createElement('div');
    setaDireita.id = 'seta-direita';
    game.appendChild(setaDireita);
    setaDireita.addEventListener('click', clicarSetaDireita);

    if (tutorial === 1) {
        document.querySelector('#seta-esquerda')?.remove();
    }
}

function clicarSetaDireita() {
    document.querySelector('#seta-esquerda')?.remove();
    const game = document.getElementById('game');
    tutorial++;
    game.style.backgroundImage = `url('${imagensTutorial[tutorial - 1].src}')`;

    const setaEsquerda = document.createElement('div');
    setaEsquerda.id = 'seta-esquerda';
    game.appendChild(setaEsquerda);
    setaEsquerda.addEventListener('click', clicarSetaEsquerda);

    if (tutorial === 17) {
        document.querySelector('#seta-direita')?.remove();
    }
}

function mostrarTutorial() {
    document.querySelector('#sim').remove();
    document.querySelector('#nao').remove();

    const game = document.getElementById('game');
    game.style.backgroundImage = `url('${imagensTutorial[0].src}')`;

    const setaDireita = document.createElement('div');
    setaDireita.id = 'seta-direita';
    game.appendChild(setaDireita);
    setaDireita.addEventListener('click', clicarSetaDireita);

    const voltar = document.createElement("div");
    voltar.id = 'voltar';
    game.appendChild(voltar);
    voltar.addEventListener('click', () => {
        window.location.href = '../../html/pc/pc.html';
    });
}

document.querySelector('#sim').addEventListener('click', mostrarTutorial);
document.querySelector('#nao').addEventListener('click', () => {
    window.location.href = '../../html/pc/pc.html';
});
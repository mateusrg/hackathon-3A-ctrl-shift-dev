localStorage.setItem('isRun', true);

const imagensTutorial = [];
for (let i = 1; i <= 17; i++) {
    const img = new Image();
    img.src = `../../assets/tutorial/tutorial${i}.png`;
    imagensTutorial.push(img);
}

let tutorial = 1;

const determinanteTela = localStorage.getItem('iniciarJogo') != 'true';

if (localStorage.getItem('iniciarJogo') != 'true') {
    localStorage.setItem('iniciarJogo', true);
    mostrarTutorial();
    document.querySelector('#voltar').style.backgroundImage = "url('../../assets/dificuldade/vermelho.png')";
    document.querySelector('#voltar').textContent = 'Voltar';
}

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
        localStorage.setItem('iniciarJogo', true);
        window.location.href = `../../html/${determinanteTela ? 'tela_inicial/pagina_inicial.html' : 'pc/pc.html'}`;
    });
}

document.querySelector('#sim')?.addEventListener('click', mostrarTutorial);
document.querySelector('#nao')?.addEventListener('click', () => window.location.href = '../../html/pc/pc.html');

document.addEventListener('keydown', (event) => {
    switch (event.key.toLowerCase()) {
        case 'arrowleft':
        case 'a':
            document.querySelector('#seta-esquerda')?.click();
            break;
        case 'arrowright':
        case 'd':
            document.querySelector('#seta-direita')?.click();
            break;
        case 'enter':
        case ' ':
            localStorage.setItem('iniciarJogo', false);
            window.location.href = `../../html/${determinanteTela ? 'tela_inicial/pagina_inicial.html' : 'pc/pc.html'}`;
            break;
    }
});
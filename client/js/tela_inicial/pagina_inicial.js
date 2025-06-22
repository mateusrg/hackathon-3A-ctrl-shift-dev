const audio = new Audio('../../assets/audios/soundtrack/menu.mp3');
audio.loop = true;
audio.volume = 1;
try { audio.play() } catch { }
const game = document.querySelector('#game');

document.querySelector('#conquistas').addEventListener('click', () => window.location.href = '../tela_inicial/conquistas.html');

document.querySelector('#tutorial').addEventListener('click', () => {
    localStorage.setItem('iniciarJogo', 'false');
    window.location.href = '../../html/tela_inicial/tutorial.html';
});

document.querySelector('#dif-treinamento').addEventListener('click', () => {
    document.querySelector('#dificuldade-selecionada').textContent = 'Treinamento';
    document.querySelector('#dificuldade-selecionada').style.color = '#ddd';
    localStorage.setItem('dificuldadeSelecionada', 0);
    document.querySelector('#ainda-nao-venceu-dif').style.display = 'none';
    document.querySelector('#ja-venceu-dif').style.display = 'none';
});

document.querySelector('#dif-junior').addEventListener('click', () => {
    document.querySelector('#dificuldade-selecionada').textContent = 'Júnior (Fácil)';
    document.querySelector('#dificuldade-selecionada').style.color = '#00d161';
    localStorage.setItem('dificuldadeSelecionada', 1);
    if (localStorage.getItem('conquistas_desbloqueadas')[18] == 1) {
        document.querySelector('#ainda-nao-venceu-dif').style.display = 'none';
        document.querySelector('#ja-venceu-dif').style.display = 'block';
    } else {
        document.querySelector('#ainda-nao-venceu-dif').style.display = 'block';
        document.querySelector('#ja-venceu-dif').style.display = 'none';
    }
});

document.querySelector('#dif-pleno').addEventListener('click', () => {
    document.querySelector('#dificuldade-selecionada').textContent = 'Pleno (Normal)';
    document.querySelector('#dificuldade-selecionada').style.color = '#94d6ff';
    localStorage.setItem('dificuldadeSelecionada', 2);
    if (localStorage.getItem('conquistas_desbloqueadas')[19] == 1) {
        document.querySelector('#ainda-nao-venceu-dif').style.display = 'none';
        document.querySelector('#ja-venceu-dif').style.display = 'block';
    } else {
        document.querySelector('#ainda-nao-venceu-dif').style.display = 'block';
        document.querySelector('#ja-venceu-dif').style.display = 'none';
    }
});

if (localStorage.getItem('dificuldade_maxima_desbloqueada') >= 3) {
    document.querySelector('#bloqueador-senior').style.display = 'none';
    document.querySelector('#dif-senior').addEventListener('click', () => {
        document.querySelector('#dificuldade-selecionada').textContent = 'Sênior (Difícil)';
        document.querySelector('#dificuldade-selecionada').style.color = '#ffd287';
        localStorage.setItem('dificuldadeSelecionada', 3);
        if (localStorage.getItem('conquistas_desbloqueadas')[20] == 1) {
            document.querySelector('#ainda-nao-venceu-dif').style.display = 'none';
            document.querySelector('#ja-venceu-dif').style.display = 'block';
        } else {
            document.querySelector('#ainda-nao-venceu-dif').style.display = 'block';
            document.querySelector('#ja-venceu-dif').style.display = 'none';
        }
    });
}

if (localStorage.getItem('dificuldade_maxima_desbloqueada') >= 4) {
    document.querySelector('#bloqueador-tech-lead').style.display = 'none';
    document.querySelector('#dif-tech-lead').addEventListener('click', () => {
        document.querySelector('#dificuldade-selecionada').textContent = 'Tech Lead (Deus Gam.)';
        document.querySelector('#dificuldade-selecionada').style.color = '#e53130';
        localStorage.setItem('dificuldadeSelecionada', 4);
        if (localStorage.getItem('conquistas_desbloqueadas')[21] == 1) {
            document.querySelector('#ainda-nao-venceu-dif').style.display = 'none';
            document.querySelector('#ja-venceu-dif').style.display = 'block';
        } else {
            document.querySelector('#ainda-nao-venceu-dif').style.display = 'block';
            document.querySelector('#ja-venceu-dif').style.display = 'none';
        }
    });
}

document.querySelector('#checkbox-tutorial').addEventListener('click', () => {
    if (document.querySelector('#check-tutorial').style.display == 'none') {
        document.querySelector('#check-tutorial').style.display = 'block';
        localStorage.setItem('verTutorial', 'true');
    } else {
        document.querySelector('#check-tutorial').style.display = 'none';
        localStorage.setItem('verTutorial', 'false');
    }
});

document.querySelector('#checkbox-premissa').addEventListener('click', () => {
    if (document.querySelector('#check-premissa').style.display == 'none') {
        document.querySelector('#check-premissa').style.display = 'block';
        localStorage.setItem('verPremissa', 'true');
    } else {
        document.querySelector('#check-premissa').style.display = 'none';
        localStorage.setItem('verPremissa', 'false');
    }
});

document.querySelector('#iniciar').addEventListener('click', () => document.querySelector('#iniciar-jogo').style.display = 'block');
document.querySelector('#voltar').addEventListener('click', () => document.querySelector('#iniciar-jogo').style.display = 'none');
document.querySelector('#jogar').addEventListener('click', () => {
    if (localStorage.getItem('nome') === null || localStorage.getItem('nome').trim() === '') {
        const nomeInput = document.querySelector('#nome');
        nomeInput.placeholder = 'Obrigatório';
        nomeInput.focus();
        return;
    }
    localStorage.setItem('isRun', 'true');
    window.location.href = '../../html/pc/pc.html';
});

document.querySelector('#nome').addEventListener('input', (event) => {
    const nome = event.target.value;
    localStorage.setItem('nome', nome);
});

const nomeSalvo = localStorage.getItem('nome');
if (nomeSalvo) {
    document.querySelector('#nome').value = nomeSalvo;
}

if (localStorage.getItem('verTutorial') === 'true') {
    document.querySelector('#check-tutorial').style.display = 'block';
} else {
    document.querySelector('#check-tutorial').style.display = 'none';
}

if (localStorage.getItem('verPremissa') === 'true') {
    document.querySelector('#check-premissa').style.display = 'block';
} else {
    document.querySelector('#check-premissa').style.display = 'none';
}

switch (localStorage.getItem('dificuldadeSelecionada')) {
    case '0':
        document.querySelector('#dif-treinamento').click();
        break;
    case '1':
        document.querySelector('#dif-junior').click();
        break;
    case '2':
        document.querySelector('#dif-pleno').click();
        break;
    case '3':
        document.querySelector('#dif-senior').click();
        break;
    case '4':
        document.querySelector('#dif-tech-lead').click();
        break;
}

document.addEventListener('click', () => audio.play(), { once: true }); // provisório enqt n tem loading
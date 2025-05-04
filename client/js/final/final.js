import Usuario from '../funcoes/usuario.js';

async function verificarLogin() {
    const usuarioStorage = JSON.parse(localStorage.getItem('usuario'));

    if (usuarioStorage == null || usuarioStorage.length == 0) {
        window.location.href = '../../html/login/pagina_inicial_deslogado.html';
    }

    const usuario = await Usuario.selecionarUsuarioPorId(usuarioStorage.id);

    if (usuario.email != usuarioStorage.email) {
        window.location.href = '../../html/login/pagina_inicial_deslogado.html';
    }
}

verificarLogin();

function comoEvitarTela() {
    const game = document.getElementById('game');
    const blur = document.createElement('div');
    blur.id = 'blur';
    game.appendChild(blur);

    const popUp = document.createElement('div');
    popUp.id = 'pop-up-como-evitar';
    game.appendChild(popUp);

    const titulo = document.createElement('h2');
    titulo.id = 'titulo-como-evitar';
    titulo.textContent = 'Como evitar as advertências';
    popUp.appendChild(titulo);

    const divTexto = document.createElement('div');
    divTexto.id = 'div-texto-como-evitar';
    popUp.appendChild(divTexto);

    const finalJSON = localStorage.getItem('final');
    const final = JSON.parse(finalJSON);

    const advertencias = JSON.parse(final.advertencias);

    let numeroAdvertencia = 0;

    advertencias.forEach((advertencia) => {
        numeroAdvertencia += 1;
        switch (advertencia) {
            case 1:
                const advertencia1 = document.createElement('p');
                advertencia1.id = 'advertencia-como-evitar';
                advertencia1.textContent = `${numeroAdvertencia}ª - Quando o chefe solicita, é preciso abrir o microfone antes que o tempo se esgote.`;
                divTexto.appendChild(advertencia1);
                break;
            case 2:
                const advertencia2 = document.createElement('p');
                advertencia2.id = 'advertencia-como-evitar';
                advertencia2.textContent = `${numeroAdvertencia}ª - Enquanto você está falando na reunião, você não deve fechar o microfone, ele fecha automaticamente ao final da ação.`;
                divTexto.appendChild(advertencia2);
                break;
            case 3:
                const advertencia3 = document.createElement('p');
                advertencia3.id = 'advertencia-como-evitar';
                advertencia3.textContent = `${numeroAdvertencia}ª - Quando você desligar a câmera, você precisa ligar ela antes que o tempo se esgote.`;
                divTexto.appendChild(advertencia3);
                break;
            case 4:
                const advertencia4 = document.createElement('p');
                advertencia4.id = 'advertencia-como-evitar';
                advertencia4.textContent = `${numeroAdvertencia}ª - Quando você for até a cefeteira, você sempre deverá desligar a câmera, pois o chefe não pode ver que você saiu.`;
                divTexto.appendChild(advertencia4);
                break;
            case 5:
                const advertencia5 = document.createElement('p');
                advertencia5.id = 'advertencia-como-evitar';
                advertencia5.textContent = `${numeroAdvertencia}ª - Quando o chefe solicita, é preciso compartilhar a tela antes que o tempo se esgote.`;
                divTexto.appendChild(advertencia5);
                break;
            case 6:
                const advertencia6 = document.createElement('p');
                advertencia6.id = 'advertencia-como-evitar';
                advertencia6.textContent = `${numeroAdvertencia}ª - Quando você for compartilhar a tela, deverá deixar aberto o documento solicitado pelo chefe.`;
                divTexto.appendChild(advertencia6);
                break;
            case 7:
                const advertencia7 = document.createElement('p');
                advertencia7.id = 'advertencia-como-evitar';
                advertencia7.textContent = `${numeroAdvertencia}ª - Você precisa compartilhar o documento solicitado pelo chefe.`;
                divTexto.appendChild(advertencia7);
                break;
            case 8:
                const advertencia8 = document.createElement('p');
                advertencia8.id = 'advertencia-como-evitar';
                advertencia8.textContent = `${numeroAdvertencia}ª - Quando você for compartilhar a tela, não esqueça de fechar todas as outras abas.`;
                divTexto.appendChild(advertencia8);
                break;
            case 9:
                const advertencia9 = document.createElement('p');
                advertencia9.id = 'advertencia-como-evitar';
                advertencia9.textContent = `${numeroAdvertencia}ª - Você só deve ligar o microfone quando o chefe solicitar.`;
                divTexto.appendChild(advertencia9);
                break;
            case 10:
                const advertencia10 = document.createElement('p');
                advertencia10.id = 'advertencia-como-evitar';
                advertencia10.textContent = `${numeroAdvertencia}ª - Você só deve compartilhar a tela quando o chefe solicitar.`;
                divTexto.appendChild(advertencia10);
                break;
            case 11:
                const advertencia11 = document.createElement('p');
                advertencia11.id = 'advertencia-como-evitar';
                advertencia11.textContent = `${numeroAdvertencia}ª - Quando você for abrir o microfone, não se esqueça de fehcar ou pausar o jogo, caso contrário, o chefe irá ouvir.`;
                divTexto.appendChild(advertencia11);
                break;
            case 12:
                const advertencia12 = document.createElement('p');
                advertencia12.id = 'advertencia-como-evitar';
                advertencia12.textContent = `${numeroAdvertencia}ª - Enquanto estiver compartilhando a tela, não feche o documento.`;
                divTexto.appendChild(advertencia12);
                break;
        }
    });

    const fechar = document.createElement('fechar');
    fechar.id = 'fechar-como-evitar';
    fechar.textContent = 'X';
    popUp.appendChild(fechar);
    fechar.addEventListener('click', function () {
        blur.remove();
        popUp.remove();
    });
}

function gameOver() {
    document.getElementById('tela-vitoria')?.remove();

    const finalJSON = localStorage.getItem('final');
    const final = JSON.parse(finalJSON);

    const game = document.getElementById('game');
    const frame = document.querySelector('.frame');
    const pontuacao = document.getElementById('pontuacao');
    pontuacao.textContent = `Sua pontuação: ${final.pontuacao}`;

    const voltar = document.getElementById('voltar');
    voltar.addEventListener('click', function () {
        localStorage.removeItem('isGameOver');
        localStorage.removeItem('pontuacao');
        localStorage.removeItem('causaMorte');
        localStorage.removeItem('advertencias');
        window.location.href = '../../html/tela_inicial/pagina_inicial.html';
    });
    const comoEvitar = document.getElementById('como-evitar');
    comoEvitar.addEventListener('click', function () {
        comoEvitarTela();
    });

    frame.style.borderImage = "url('../../assets/entorno/borda/derrota.png') 32 stretch";

    if (final.causaMorte == 1) {
        game.style.backgroundImage = "url('../../assets/final/gameover-adv.png')";
        const advertencias = JSON.parse(final.advertencias);
        const divAdvertencias = document.getElementById('advertencias');

        let numeroAdvertencia = 0;

        advertencias.forEach((advertencia) => {
            numeroAdvertencia += 1;
            switch (advertencia) {
                case 1:
                    const advertencia1 = document.createElement('p');
                    advertencia1.id = 'advertencia';
                    advertencia1.textContent = `${numeroAdvertencia}ª - Não ligou o microfone quando solicitado.`;
                    divAdvertencias.appendChild(advertencia1);
                    break;
                case 2:
                    const advertencia2 = document.createElement('p');
                    advertencia2.id = 'advertencia';
                    advertencia2.textContent = `${numeroAdvertencia}ª - Desligou o microfone enquanto estava falando.`;
                    divAdvertencias.appendChild(advertencia2);
                    break;
                case 3:
                    const advertencia3 = document.createElement('p');
                    advertencia3.id = 'advertencia';
                    advertencia3.textContent = `${numeroAdvertencia}ª - Permaneceu com a câmera desligada.`;
                    divAdvertencias.appendChild(advertencia3);
                    break;
                case 4:
                    const advertencia4 = document.createElement('p');
                    advertencia4.id = 'advertencia';
                    advertencia4.textContent = `${numeroAdvertencia}ª - Saiu do computador e esqueceu a câmera ligada.`;
                    divAdvertencias.appendChild(advertencia4);
                    break;
                case 5:
                    const advertencia5 = document.createElement('p');
                    advertencia5.id = 'advertencia';
                    advertencia5.textContent = `${numeroAdvertencia}ª - Não compartilhou a tela quando solicitado.`;
                    divAdvertencias.appendChild(advertencia5);
                    break;
                case 6:
                    const advertencia6 = document.createElement('p');
                    advertencia6.id = 'advertencia';
                    advertencia6.textContent = `${numeroAdvertencia}ª - Compartilhou a tela sem nenhum documento aberto.`;
                    divAdvertencias.appendChild(advertencia6);
                    break;
                case 7:
                    const advertencia7 = document.createElement('p');
                    advertencia7.id = 'advertencia';
                    advertencia7.textContent = `${numeroAdvertencia}ª - Não compartilhou o documento correto.`;
                    divAdvertencias.appendChild(advertencia7);
                    break;
                case 8:
                    const advertencia8 = document.createElement('p');
                    advertencia8.id = 'advertencia';
                    advertencia8.textContent = `${numeroAdvertencia}ª - Compartilhou a tela com outras abas abertas.`;
                    divAdvertencias.appendChild(advertencia8);
                    break;
                case 9:
                    const advertencia9 = document.createElement('p');
                    advertencia9.id = 'advertencia';
                    advertencia9.textContent = `${numeroAdvertencia}ª - Ligou o microfone sem ser solicitado.`;
                    divAdvertencias.appendChild(advertencia9);
                    break;
                case 10:
                    const advertencia10 = document.createElement('p');
                    advertencia10.id = 'advertencia';
                    advertencia10.textContent = `${numeroAdvertencia}ª - Compartilhou a tela sem ser solicitado.`;
                    divAdvertencias.appendChild(advertencia10);
                    break;
                case 11:
                    const advertencia11 = document.createElement('p');
                    advertencia11.id = 'advertencia';
                    advertencia11.textContent = `${numeroAdvertencia}ª - Abriu o microfone com o jogo aberto ou despausado.`;
                    divAdvertencias.appendChild(advertencia11);
                    break;
                case 12:
                    const advertencia12 = document.createElement('p');
                    advertencia12.id = 'advertencia';
                    advertencia12.textContent = `${numeroAdvertencia}ª - Fechou o documento enquanto estava compartilhando a tela.`;
                    divAdvertencias.appendChild(advertencia12);
                    break;
            }
        });
    } else {
        game.style.backgroundImage = "url('../../assets/final/gameover.png')";
        pontuacao.style.top = 'calc(220 * var(--un))';
        voltar.style.top = 'calc(755 * var(--un))';
        comoEvitar.style.top = 'calc(615 * var(--un))';

        const causaMorte = document.createElement('p');
        causaMorte.id = 'causa-morte';
        game.appendChild(causaMorte);

        switch (final.causaMorte) {
            case 2:
                causaMorte.textContent = 'Você fechou a reunião';
                break;
            case 3:
                causaMorte.textContent = 'Sua energia acabou';
                break;
            case 4:
                causaMorte.textContent = 'Sua felicidade acabou';
                break;
            case 5:
                causaMorte.textContent = 'Sua energia e felicidade acabaram';
                break;
            case 6:
                causaMorte.textContent = 'Você não atingiu a pontuação mínima';
                break;
        }
    }
}

function vitoria() {
    document.getElementById('tela-vitoria')?.remove();
    document.getElementById('voltar')?.remove();
    document.getElementById('como-evitar')?.remove();

    localStorage.removeItem('isGameOver');
    localStorage.removeItem('pontuacao');
    localStorage.removeItem('causaMorte');
    localStorage.removeItem('advertencias');

    const pontuacao = document.getElementById('pontuacao');
    const finalJSON = localStorage.getItem('final');
    const final = JSON.parse(finalJSON);
    pontuacao.textContent = `Sua pontuação: ${final.pontuacao}`;

    const dificuldade = localStorage.getItem('dificuldadeSelecionada');

    const game = document.getElementById('game');

    const promocao = document.createElement('h4');
    promocao.id = 'promocao';
    switch (dificuldade) {
        case '1':
            promocao.textContent = `Parabéns! Você foi promovido(a) para Pleno!`;
            break;
        case '2':
            promocao.textContent = `Parabéns! Você foi promovido(a) para Sênior!`;
            break;
        case '3':
            promocao.textContent = `Parabéns! Você foi promovido(a) para Tech Lead!`;
            break;
    }
    game.appendChild(promocao);

    const tela = document.createElement('div');
    tela.id = 'tela-vitoria';
    game.appendChild(tela);
    tela.addEventListener('click', function () {
        localStorage.removeItem('isGameOver');
        localStorage.removeItem('pontuacao');
        localStorage.removeItem('causaMorte');
        localStorage.removeItem('advertencias');
        window.location.href = '../../html/tela_inicial/pagina_inicial.html';
    });

    if (dificuldade == '4') {
        game.style.backgroundImage = "url('../../assets/final/techlead.png')";
        pontuacao.style.top = 'calc(840 * var(--un))';
        promocao.remove();
    } else {
        game.style.backgroundImage = "url('../../assets/final/promocao.png')";
        pontuacao.style.top = 'calc(820 * var(--un))';
    }
}

function definirTelaFundo () {
    const finalJSON = localStorage.getItem('final');
    const final = JSON.parse(finalJSON);

    if (final.isGameOver == true) {
        gameOver();
    } else {
        vitoria();
    }
}

definirTelaFundo();
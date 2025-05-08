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

verificarLogin();

async function isConquistaJaDesbloqueada(idConquista) {
    const usuario = await Usuario.getUsuarioLogado();
    return usuario.conquistas_desbloqueadas[idConquista - 1] != '0';
}

async function desbloquearConquista(idConquista) {
    const conquistaJaDesbloqueada = await isConquistaJaDesbloqueada(idConquista);
    if (conquistaJaDesbloqueada) {
        return;
    }

    const usuarioId = usuario.id;
    const usuarioAtualizado = await Usuario.desbloquearConquista(usuarioId, idConquista);
    const usuario = await Usuario.getUsuarioLogado();

    const imagem = `url("../../assets/conquistas/icones/conquistas${idConquista < 10 ? `0${idConquista}` : idConquista}.png")`;
    let texto;
    switch (idConquista) {
        case 1:
            texto = 'Mestre do Compartilhamento';
            break;
        case 2:
            texto = 'Relâmpago do Código';
            break;
        case 3:
            texto = 'Task Slayer';
            break;
        case 4:
            texto = 'Sem Condições';
            break;
        case 5:
            texto = 'Café com Leite';
            break;
        case 6:
            texto = 'Barista Desastrado';
            break;
        case 7:
            texto = 'Equilíbrio Tóxico';
            break;
        case 8:
            texto = 'Maratona de Energético';
            break;
        case 9:
            texto = 'Zen Developer';
            break;
        case 10:
            texto = 'Jogador Incansável';
            break;
        case 11:
            texto = 'Dev Relâmpago';
            break;
        case 12:
            texto = 'Testador Implacável';
            break;
        case 13:
            texto = 'Quizmaníaco';
            break;
        case 14:
            texto = 'Microfone Ninja';
            break;
        case 15:
            texto = 'Campeão do Compartilhamento';
            break;
        case 16:
            texto = 'Bebum Profissional';
            break;
        case 17:
            texto = 'Advertência Zero';
            break;
        case 18:
            texto = 'Incompetente';
            break;
        case 19:
            texto = 'Promovido a Pleno';
            break;
        case 20:
            texto = 'Promovido a Sênior';
            break;
        case 21:
            texto = 'Promovido a Tech Lead';
            break;
        case 22:
            texto = 'Sobrevivente Tech Lead';
            break;
        case 23:
            texto = 'Júnior Competente';
            break;
        case 24:
            texto = 'Pleno Superior';
            break;
        case 25:
            texto = 'Easter Eggs';
            break;
        case 26:
            texto = 'Sênior Absoluto';
            break;
        case 27:
            texto = 'Tech Lead Perfeito';
            break;
        case 28:
            texto = 'Amante do Caos';
            break;
        case 29:
            texto = 'Chega';
            break;
        case 30:
            texto = 'Mais café';
            break;
        case 31:
            texto = 'Maratona de Runs';
            break;
        case 32:
            texto = 'Diversão Equilibrada';
            break;
        case 33:
            texto = 'Um Último Suspiro';
            break;
        case 34:
            texto = 'Pós-Depressão';
            break;
        case 35:
            texto = 'O Verdadeiro Deus Gamer';
            break;
        case 36:
            texto = 'Ctrl+Shift+Dev';
            break;
    }

    const conquista = document.createElement('div');
    conquista.className = 'conquista';
    const quantidadeConquistasNaTela = document.querySelectorAll('.conquista').length;
    conquista.style.bottom = `calc(${189 + 140 * quantidadeConquistasNaTela} * var(--un))`;
    conquista.addEventListener('click', () => {
        conquista.remove();
    });
    game.appendChild(conquista);

    const imagemConquista = document.createElement('div');
    imagemConquista.className = 'imagem-conquista';
    imagemConquista.style.backgroundImage = imagem;
    conquista.appendChild(imagemConquista);

    const textoConquista = document.createElement('div');
    textoConquista.className = 'texto-conquista';
    textoConquista.textContent = texto;
    conquista.appendChild(textoConquista);

    setTimeout(() => {
        if (document.body.contains(conquista)) {
            conquista.remove();
        }
    }, 5000);

    if (usuario.conquistas_desbloqueadas == '111111111111111111111111111111111110') {
        await desbloquearConquista(36);
    }
}

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

    const advertencias = final.advertencias;

    if (advertencias.length == 0) {
        const semAdvertencia = document.createElement('p');
        semAdvertencia.id = 'sem-advertencia-como-evitar';
        popUp.appendChild(semAdvertencia);
        semAdvertencia.textContent = 'Você não teve nenhuma advertência';
    } else {
        let numeroAdvertencia = 0;
    
        advertencias.forEach((advertencia) => {
            numeroAdvertencia += 1;
            const advertenciaTipo = document.createElement('p');
            switch (advertencia) {
                case 4:
                    advertenciaTipo.id = 'advertencia-como-evitar';
                    advertenciaTipo.textContent = `${numeroAdvertencia}ª - Quando o chefe solicita, é preciso abrir o microfone antes que o tempo se esgote.`;
                    divTexto.appendChild(advertenciaTipo);
                    break;
                case 5:
                    advertenciaTipo.id = 'advertencia-como-evitar';
                    advertenciaTipo.textContent = `${numeroAdvertencia}ª - Enquanto você está falando na reunião, você não deve fechar o microfone, ele fecha automaticamente ao final da ação.`;
                    divTexto.appendChild(advertenciaTipo);
                    break;
                case 6:
                    advertenciaTipo.id = 'advertencia-como-evitar';
                    advertenciaTipo.textContent = `${numeroAdvertencia}ª - Quando você desligar a câmera, você precisa ligar ela antes que o tempo se esgote.`;
                    divTexto.appendChild(advertenciaTipo);
                    break;
                case 7:
                    advertenciaTipo.id = 'advertencia-como-evitar';
                    advertenciaTipo.textContent = `${numeroAdvertencia}ª - Quando você for até a cafeteira, você sempre deverá desligar a câmera, pois o chefe não pode ver que você saiu.`;
                    divTexto.appendChild(advertenciaTipo);
                    break;
                case 8:
                    advertenciaTipo.id = 'advertencia-como-evitar';
                    advertenciaTipo.textContent = `${numeroAdvertencia}ª - Quando o chefe solicita, é preciso compartilhar a tela antes que o tempo se esgote.`;
                    divTexto.appendChild(advertenciaTipo);
                    break;
                case 9:
                    advertenciaTipo.id = 'advertencia-como-evitar';
                    advertenciaTipo.textContent = `${numeroAdvertencia}ª - Quando você for compartilhar a tela, deverá deixar aberto o documento solicitado pelo chefe.`;
                    divTexto.appendChild(advertenciaTipo);
                    break;
                case 10:
                    advertenciaTipo.id = 'advertencia-como-evitar';
                    advertenciaTipo.textContent = `${numeroAdvertencia}ª - Você precisa compartilhar o documento solicitado pelo chefe.`;
                    divTexto.appendChild(advertenciaTipo);
                    break;
                case 11:
                    advertenciaTipo.id = 'advertencia-como-evitar';
                    advertenciaTipo.textContent = `${numeroAdvertencia}ª - Quando você for compartilhar a tela, não esqueça de fechar todas as outras abas.`;
                    divTexto.appendChild(advertenciaTipo);
                    break;
                case 12:
                    advertenciaTipo.id = 'advertencia-como-evitar';
                    advertenciaTipo.textContent = `${numeroAdvertencia}ª - Você só deve ligar o microfone quando o chefe solicitar.`;
                    divTexto.appendChild(advertenciaTipo);
                    break;
                case 13:
                    advertenciaTipo.id = 'advertencia-como-evitar';
                    advertenciaTipo.textContent = `${numeroAdvertencia}ª - Você só deve compartilhar a tela quando o chefe solicitar.`;
                    divTexto.appendChild(advertenciaTipo);
                    break;
                case 14:
                    advertenciaTipo.id = 'advertencia-como-evitar';
                    advertenciaTipo.textContent = `${numeroAdvertencia}ª - Quando você for abrir o microfone, não se esqueça de fehcar ou pausar o jogo, caso contrário, o chefe irá ouvir.`;
                    divTexto.appendChild(advertenciaTipo);
                    break;
                case 15:
                    advertenciaTipo.id = 'advertencia-como-evitar';
                    advertenciaTipo.textContent = `${numeroAdvertencia}ª - Enquanto estiver compartilhando a tela, não feche o documento.`;
                    divTexto.appendChild(advertenciaTipo);
                    break;
            }
        });
    }

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
        const advertencias = final.advertencias;
        const divAdvertencias = document.getElementById('advertencias');

        let numeroAdvertencia = 0;

        advertencias.forEach((advertencia) => {
            numeroAdvertencia += 1;
            const advertenciaTipo = document.createElement('p');
            switch (advertencia) {
                case 4:
                    advertenciaTipo.id = 'advertencia';
                    advertenciaTipo.textContent = `${numeroAdvertencia}ª - Não ligou o microfone quando solicitado.`;
                    divAdvertencias.appendChild(advertenciaTipo);
                    break;
                case 5:
                    advertenciaTipo.id = 'advertencia';
                    advertenciaTipo.textContent = `${numeroAdvertencia}ª - Desligou o microfone enquanto estava falando.`;
                    divAdvertencias.appendChild(advertenciaTipo);
                    break;
                case 6:
                    advertenciaTipo.id = 'advertencia';
                    advertenciaTipo.textContent = `${numeroAdvertencia}ª - Permaneceu com a câmera desligada.`;
                    divAdvertencias.appendChild(advertenciaTipo);
                    break;
                case 7:
                    advertenciaTipo.id = 'advertencia';
                    advertenciaTipo.textContent = `${numeroAdvertencia}ª - Saiu do computador e esqueceu a câmera ligada.`;
                    divAdvertencias.appendChild(advertenciaTipo);
                    break;
                case 8:
                    advertenciaTipo.id = 'advertencia';
                    advertenciaTipo.textContent = `${numeroAdvertencia}ª - Não compartilhou a tela quando solicitado.`;
                    divAdvertencias.appendChild(advertenciaTipo);
                    break;
                case 9:
                    advertenciaTipo.id = 'advertencia';
                    advertenciaTipo.textContent = `${numeroAdvertencia}ª - Compartilhou a tela sem nenhum documento aberto.`;
                    divAdvertencias.appendChild(advertenciaTipo);
                    break;
                case 10:
                    advertenciaTipo.id = 'advertencia';
                    advertenciaTipo.textContent = `${numeroAdvertencia}ª - Não compartilhou o documento correto.`;
                    divAdvertencias.appendChild(advertenciaTipo);
                    break;
                case 11:
                    advertenciaTipo.id = 'advertencia';
                    advertenciaTipo.textContent = `${numeroAdvertencia}ª - Compartilhou a tela com outras abas abertas.`;
                    divAdvertencias.appendChild(advertenciaTipo);
                    break;
                case 12:
                    advertenciaTipo.id = 'advertencia';
                    advertenciaTipo.textContent = `${numeroAdvertencia}ª - Ligou o microfone sem ser solicitado.`;
                    divAdvertencias.appendChild(advertenciaTipo);
                    break;
                case 13:
                    advertenciaTipo.id = 'advertencia';
                    advertenciaTipo.textContent = `${numeroAdvertencia}ª - Compartilhou a tela sem ser solicitado.`;
                    divAdvertencias.appendChild(advertenciaTipo);
                    break;
                case 14:
                    advertenciaTipo.id = 'advertencia';
                    advertenciaTipo.textContent = `${numeroAdvertencia}ª - Abriu o microfone com o jogo aberto ou despausado.`;
                    divAdvertencias.appendChild(advertenciaTipo);
                    break;
                case 15:
                    advertenciaTipo.id = 'advertencia';
                    advertenciaTipo.textContent = `${numeroAdvertencia}ª - Fechou o documento enquanto estava compartilhando a tela.`;
                    divAdvertencias.appendChild(advertenciaTipo);
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
    if (final.conquistasDesbloqueadas.length != 0) {
        const conquistas = final.conquistasDesbloqueadas;

        conquistas.forEach(async (conquista) => {
            await desbloquearConquista(conquista);
        })
    }
}

async function vitoria() {
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

        const usuarioStorage = localStorage.getItem('usuario')
        const usuario = JSON.parse(usuarioStorage);
        const idUsuario = usuario.id;
        const dificuldadeMaxima = usuario.dificuldade_maxima_desbloqueada;

        if (dificuldade == dificuldadeMaxima && dificuldade > 1) {
            const novoUsuario = await Usuario.aumentarDificuldadeMaximaDesbloqueada(idUsuario);
            const novaDificuldade = dificuldadeMaxima + 1;
            usuario.dificuldade_maxima_desbloqueada = novaDificuldade;
            localStorage.setItem('usuario', JSON.stringify(usuario));
        }
    }

    if (final.conquistasDesbloqueadas.length != 0) {
        const conquistas = final.conquistasDesbloqueadas;

        conquistas.forEach(async (conquista) => {
            await desbloquearConquista(conquista);
        })
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
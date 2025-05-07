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
const setaCimaBtn = document.querySelector('#seta-cima');
const setaBaixoBtn = document.querySelector('#seta-baixo');

function voltar() {
    window.location.href = '../../html/tela_inicial/pagina_inicial.html';
}

let conquistasDescricao;
let easterEggLiberado;

async function main() {
    const usuario = await Usuario.getUsuarioLogado();
    document.querySelector('#voltar').addEventListener('click', voltar);
    const d1 = usuario.quant_tela_compartilhada;
    const d3 = usuario.tarefas_concluidas;
    const d10 = usuario.inimigos_derrotados;
    const d12 = usuario.testes_feitos;
    const d13 = usuario.quizzes_gabaritados;
    const i17 = usuario.conquistas_desbloqueadas[16] == '0';
    const d17 = usuario.runs_consecutivas_sem_advertencia;
    const d31 = usuario.runs_jogadas;

    conquistasDescricao = [
        {
            nome: "Mestre do Compartilhamento",
            descricao: `Compartilhe a tela 30 vezes.${d1 < 30 ? ` (${d1}/30)` : ''}`,
            imagem: "../../assets/conquistas/icones/conquistas01.png"
        },
        {
            nome: "Relâmpago do Código",
            descricao: "Conclua 10 tarefas em menos de 2 minutos de tempo de jogo.",
            imagem: "../../assets/conquistas/icones/conquistas02.png"
        },
        {
            nome: "Task Slayer",
            descricao: `Finalize 50 tarefas no total.${d3 < 50 ? ` (${d3}/50)` : ''}`,
            imagem: "../../assets/conquistas/icones/conquistas03.png"
        },
        {
            nome: "Sem Condições",
            descricao: "Desista de uma tarefa.",
            imagem: "../../assets/conquistas/icones/conquistas04.png"
        },
        {
            nome: "Café com Leite",
            descricao: "Beba café 30 vezes em uma única partida.",
            imagem: "../../assets/conquistas/icones/conquistas05.png"
        },
        {
            nome: "Barista Desastrado",
            descricao: "Deixe a xícara vazar 3 vezes numa única partida.",
            imagem: "../../assets/conquistas/icones/conquistas06.png"
        },
        {
            nome: "Equilíbrio Tóxico",
            descricao: "Religue a câmera com menos de 1 segundo restante do limite de tempo.",
            imagem: "../../assets/conquistas/icones/conquistas07.png"
        },
        {
            nome: "Maratona de Energético",
            descricao: "Ganhe uma partida mantendo energia sempre acima de 75%.",
            imagem: "../../assets/conquistas/icones/conquistas08.png"
        },
        {
            nome: "Zen Developer",
            descricao: "Ganhe uma partida mantendo felicidade sempre acima de 80%.",
            imagem: "../../assets/conquistas/icones/conquistas09.png"
        },
        {
            nome: "Jogador Incansável",
            descricao: `Mate 100 inimigos no Attack Against.${d10 < 100 ? ` (${d10}/100)` : ''}`,
            imagem: "../../assets/conquistas/icones/conquistas10.png"
        },
        {
            nome: "Dev Relâmpago",
            descricao: "Termine uma tarefa em menos de 3 segundos.",
            imagem: "../../assets/conquistas/icones/conquistas11.png"
        },
        {
            nome: "Testador Implacável",
            descricao: `Execute mais de 30 testes em tarefas de preencher valor.${d12 < 30 ? ` (${d12}/30)` : ''}`,
            imagem: "../../assets/conquistas/icones/conquistas12.png"
        },
        {
            nome: "Quizmaníaco",
            descricao: `Acerte 10 quizzes técnicos sem falhas.${d13 < 10 ? ` (${d13}/10)` : ''}`,
            imagem: "../../assets/conquistas/icones/conquistas13.png"
        },
        {
            nome: "Microfone Ninja",
            descricao: "Ative o microfone em menos de 1 segundo em 5 solicitações de uma partida.",
            imagem: "../../assets/conquistas/icones/conquistas14.png"
        },
        {
            nome: "Campeão do Compartilhamento",
            descricao: "Inicie o compartilhamento de tela em menos de 3 s em todas as solicitações de uma partida ganha.",
            imagem: "../../assets/conquistas/icones/conquistas15.png"
        },
        {
            nome: "Bebum Profissional",
            descricao: "Ganhe o máximo de energia possível com uma única xícara de café (210 no Júnior, 150 no Pleno, 120 no Sênior e 90 no Tech Lead).",
            imagem: "../../assets/conquistas/icones/conquistas16.png"
        },
        {
            nome: "Advertência Zero",
            descricao: `Acumule 0 advertências em 10 partidas consecutivas; partidas ganhas valem por 2.${i17 ? ` (${d17}/10)` : ''}`,
            imagem: "../../assets/conquistas/icones/conquistas17.png"
        },
        {
            nome: "Incompetente",
            descricao: "Perca uma partida em menos de 30 segundos.",
            imagem: "../../assets/conquistas/icones/conquistas18.png"
        },
        {
            nome: "Promovido a Pleno",
            descricao: "Ganhe uma partida na dificuldade Júnior e seja promovido a Pleno.",
            imagem: "../../assets/conquistas/icones/conquistas19.png"
        },
        {
            nome: "Promovido a Sênior",
            descricao: "Ganhe uma partida na dificuldade Pleno e seja promovido a Sênior.",
            imagem: "../../assets/conquistas/icones/conquistas20.png"
        },
        {
            nome: "Promovido a Tech Lead",
            descricao: "Ganhe uma partida na dificuldade Sênior e seja promovido a Tech Lead.",
            imagem: "../../assets/conquistas/icones/conquistas21.png"
        },
        {
            nome: "Sobrevivente Tech Lead",
            descricao: "Ganhe uma partida na dificuldade Tech Lead.",
            imagem: "../../assets/conquistas/icones/conquistas22.png"
        },
        {
            nome: "Júnior Competente",
            descricao: "Ganhe uma partida na dificuldade Júnior sem nenhuma advertência e sem falhar em nenhuma tarefa.",
            imagem: "../../assets/conquistas/icones/conquistas23.png"
        },
        {
            nome: "Pleno Superior",
            descricao: "Ganhe uma partida na dificuldade Pleno sem nenhuma advertência e sem falhar em nenhuma tarefa.",
            imagem: "../../assets/conquistas/icones/conquistas24.png"
        },
        {
            nome: "Easter Eggs",
            descricao: "Encontre um easter egg.",
            imagem: "../../assets/conquistas/icones/conquistas25.png"
        },
        {
            nome: "Sênior Absoluto",
            descricao: "Ganhe uma partida na dificuldade Sênior sem nenhuma advertência e sem falhar em nenhuma tarefa.",
            imagem: "../../assets/conquistas/icones/conquistas26.png"
        },
        {
            nome: "Tech Lead Perfeito",
            descricao: "Ganhe uma partida na dificuldade Tech Lead sem falhar em nenhuma tarefa.",
            imagem: "../../assets/conquistas/icones/conquistas27.png"
        },
        {
            nome: "Amante do Caos",
            descricao: "Perca por advertência.",
            imagem: "../../assets/conquistas/icones/conquistas28.png"
        },
        {
            nome: "Chega",
            descricao: "Perca por esgotar sua felicidade e tenha um Burnout.",
            imagem: "../../assets/conquistas/icones/conquistas29.png"
        },
        {
            nome: "Mais café",
            descricao: "Perca por esgotar sua energia e desmaie.",
            imagem: "../../assets/conquistas/icones/conquistas30.png"
        },
        {
            nome: "Maratona de Runs",
            descricao: `Jogue 50 partidas completas.${d31 < 50 ? ` (${d31}/50)` : ''}`,
            imagem: "../../assets/conquistas/icones/conquistas31.png"
        },
        {
            nome: "Diversão Equilibrada",
            descricao: "Mantenha energia e felicidade sincronizados (diferença < 10%) por 5 minutos seguidos.",
            imagem: "../../assets/conquistas/icones/conquistas32.png"
        },
        {
            nome: "Um Último Suspiro",
            descricao: "Tomae café com menos de 5% de energia.",
            imagem: "../../assets/conquistas/icones/conquistas33.png"
        },
        {
            nome: "Pós-Depressão",
            descricao: "Mate um inimigo com menos de 5% de felicidade.",
            imagem: "../../assets/conquistas/icones/conquistas34.png"
        },
        {
            nome: "O Verdadeiro Deus Gamer",
            descricao: "Faça 50 pontos na dificuldade Tech Lead.",
            imagem: "../../assets/conquistas/icones/conquistas35.png"
        },
        {
            nome: "Ctrl+Shift+Dev",
            descricao: "Consiga todas as conquistas.",
            imagem: "../../assets/conquistas/icones/conquistas36.png"
        }
    ];

    easterEggLiberado = usuario.conquistas_desbloqueadas[24] == '1';
    carregarConquistas(secaoConquista);

    setaCimaBtn.addEventListener('click', setaCima);
    if (secaoConquista == 0) {
        setaCimaBtn.style.display = 'none';
    }

    
    setaBaixoBtn.addEventListener('click', setaBaixo);
    if (secaoConquista == 24) {
        setaBaixoBtn.style.display = 'none';
    }
}

let secaoConquista = 0;

async function isConquistaJaDesbloqueada(idConquista) {
    const usuario = await Usuario.getUsuarioLogado();
    return usuario.conquistas_desbloqueadas[idConquista - 1] != '0';
}

async function desbloquearConquista(idConquista) {
    const conquistaJaDesbloqueada = await isConquistaJaDesbloqueada(idConquista);
    if (conquistaJaDesbloqueada) {
        return;
    }

    const usuario = await Usuario.getUsuarioLogado();
    const usuarioId = usuario.id;

    await Usuario.desbloquearConquista(usuarioId, idConquista);

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
    conquista.className = 'conquista-notificacao';
    const quantidadeConquistasNaTela = document.querySelectorAll('.conquista').length;
    conquista.style.bottom = `calc(${189 + 140 * quantidadeConquistasNaTela} * var(--un))`;
    conquista.addEventListener('click', () => {
        conquista.remove();
    });
    game.appendChild(conquista);

    const imagemConquista = document.createElement('div');
    imagemConquista.className = 'imagem-conquista-notificacao';
    imagemConquista.style.backgroundImage = imagem;
    conquista.appendChild(imagemConquista);

    const textoConquista = document.createElement('div');
    textoConquista.className = 'texto-conquista-notificacao';
    textoConquista.textContent = texto;
    conquista.appendChild(textoConquista);

    await carregarConquistas(secaoConquista);

    setTimeout(() => {
        if (document.body.contains(conquista)) {
            conquista.remove();
        }
    }, 5000);

    if (usuario.conquistas_desbloqueadas == '111111111111111111111111111111111110') {
        desbloquearConquista(36);
    }
}

function abrirModalConquista(index, desbloqueada) {
    document.querySelector('.imagem-conquista')?.remove();
    document.querySelector('.nome-conquista')?.remove();
    document.querySelector('.descricao-conquista')?.remove();
    document.querySelector('#clique-aqui')?.remove();

    const tela = document.querySelector('#game');
    tela.style.backgroundImage = `url('../../assets/conquistas/tela-conquista-selecionado.png')`;

    for (let i = 0; i < 12; i++) {
        const caixaConquista = document.querySelector(`.conq-${i + 1}`);
        caixaConquista.style.backgroundImage = `url('../../assets/conquistas/azul.png')`;
    }

    const caixaConquista = document.querySelector(`.conq-${index + 1}`);
    caixaConquista.style.backgroundImage = `url('../../assets/conquistas/amarelo.png')`;

    const setaCima = document.querySelector('#seta-cima');
    const setaBaixo = document.querySelector('#seta-baixo');

    setaCima.style.top = 'calc(70 * var(--un))';
    setaBaixo.style.top = 'calc(535 * var(--un))';

    const secaoConquistaCima = document.querySelector('#conquistas-cima');
    const secaoConquistaBaixo = document.querySelector('#conquistas-baixo');

    secaoConquistaCima.style.top = 'calc(152 * var(--un))';
    secaoConquistaBaixo.style.top = 'calc(352 * var(--un))';

    const voltar = document.querySelector('#voltar');

    voltar.style.top = 'calc(563 * var(--un))';

    const imagemConquista = document.createElement('div');
    if (index == 24 && !easterEggLiberado) {
        const cliqueAqui = document.createElement('div');
        cliqueAqui.id = 'clique-aqui';
        tela.appendChild(cliqueAqui);
        cliqueAqui.addEventListener('click', () => {
            imagemConquista.style.filter = 'none';
            document.querySelector('.descricao-conquista').textContent = conquistasDescricao[index].descricao;
            desbloquearConquista(25);
        });
    }

    imagemConquista.classList.add('imagem-conquista');
    imagemConquista.style.backgroundImage = `url('${conquistasDescricao[index].imagem}')`;
    tela.appendChild(imagemConquista);
    if (!desbloqueada) {
        imagemConquista.style.filter = 'brightness(0)';
    };

    const nomeConquista = document.createElement('h4');
    nomeConquista.classList.add('nome-conquista');
    nomeConquista.innerText = conquistasDescricao[index].nome;
    tela.appendChild(nomeConquista);

    const descricaoConquista = document.createElement('p');
    descricaoConquista.classList.add('descricao-conquista');
    descricaoConquista.innerText = index == 24 && !easterEggLiberado ? 'Clique aqui.' : conquistasDescricao[index].descricao;
    tela.appendChild(descricaoConquista);
}

async function carregarConquistas(nivel) {
    const usuarioStorage = JSON.parse(localStorage.getItem('usuario'));
    const usuario = await Usuario.selecionarUsuarioPorId(usuarioStorage.id);
    const conquistas = usuario.conquistas_desbloqueadas;
    const conquistaIndividual = conquistas.split('');

    document.querySelectorAll(".conquista-item").forEach(el => el.remove());

    for (let i = 0; i < 12; i++) {
        const container = document.querySelector(`.conq-${i + 1 + nivel}`);

        let index = i + nivel;

        const conquista = document.createElement('div');
        conquista.classList.add('conquista-item');
        conquista.style.backgroundImage = `url('${conquistasDescricao[index].imagem}')`;

        let desbloqueada = true;
        if (conquistaIndividual[index] === '0') {
            desbloqueada = false;
            conquista.style.filter = 'brightness(0)';
        }

        conquista.addEventListener('click', () => {
            abrirModalConquista(index, desbloqueada);
        });

        container.appendChild(conquista);
    }
}

function setaCima() {
    for (let i = 0; i < 12; i++) {
        const caixaConquista = document.querySelector(`.conq-${i + 1}`);
        caixaConquista.style.backgroundImage = `url('../../assets/conquistas/azul.png')`;
    }
    secaoConquista -= 12;
    carregarConquistas(secaoConquista);
    if (secaoConquista == 0) {
        setaCimaBtn.style.display = 'none';
    } else {
        setaCimaBtn.style.display = 'flex';
    }
    if (secaoConquista == 24) {
        setaBaixoBtn.style.display = 'none';
    } else {
        setaBaixoBtn.style.display = 'flex';
    }
}

function setaBaixo() {
    for (let i = 0; i < 12; i++) {
        const caixaConquista = document.querySelector(`.conq-${i + 1}`);
        caixaConquista.style.backgroundImage = `url('../../assets/conquistas/azul.png')`;
    }
    secaoConquista += 12;
    carregarConquistas(secaoConquista);
    if (secaoConquista == 0) {
        setaCimaBtn.style.display = 'none';
    } else {
        setaCimaBtn.style.display = 'flex';
    }
    if (secaoConquista == 24) {
        setaBaixoBtn.style.display = 'none';
    } else {
        setaBaixoBtn.style.display = 'flex';
    }
}

main();
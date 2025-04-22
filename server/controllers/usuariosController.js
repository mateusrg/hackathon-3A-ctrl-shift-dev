const bcrypt = require('bcrypt');
const connection = require('../config/db');

exports.criarUsuario = async (req, res) => {
  const { email, senha } = req.body;

  try {
    const hash = await bcrypt.hash(senha, 10);
    const query = 'INSERT INTO usuarios (email, senha) VALUES (?, ?)';
    connection.query(query, [email, hash], (err, results) => {
      if (err) {
        console.error('Erro ao cadastrar usuário:', err);
        return res.status(500).json({ success: false, message: 'Erro ao cadastrar usuário.' });
      }
      res.json({ success: true, message: 'Usuário cadastrado com sucesso!', data: results.insertId });
    });
  } catch (hashErr) {
    console.error('Erro ao gerar hash da senha:', hashErr);
    res.status(500).json({ success: false, message: 'Erro ao processar senha.' });
  }
};

exports.login = (req, res) => {
  const { email, senha } = req.body;

  const selectQuery = 'SELECT * FROM usuarios WHERE email = ?';
  connection.query(selectQuery, [email], async (err, results) => {
    if (err) {
      console.error('Erro ao buscar usuário para login:', err);
      return res.status(500).json({ success: false, message: 'Erro ao buscar usuário.' });
    }
    if (results.length === 0) {
      return res.status(404).json({ success: false, message: 'Usuário não encontrado.' });
    }

    const user = results[0];

    try {
      const senhaValida = await bcrypt.compare(senha, user.senha);
      if (!senhaValida) {
        return res.status(401).json({ success: false, message: 'Senha incorreta.' });
      }

      res.json({
        success: true,
        message: 'Login bem-sucedido!',
        data: { id: user.id, nome: user.nome, dificuldade_maxima_desbloqueada: user.dificuldade_maxima_desbloqueada, email }
      });
    } catch (compareErr) {
      console.error('Erro na comparação de senhas:', compareErr);
      res.status(500).json({ success: false, message: 'Erro ao validar senha.' });
    }
  });
};

exports.atualizarUsuario = (req, res) => {
  const { email, nome, senhaAtual, senhaNova } = req.body;
  const { id } = req.params;

  const selectQuery = 'SELECT senha FROM usuarios WHERE id = ?';
  connection.query(selectQuery, [id], async (err, results) => {
    if (err) {
      console.error('Erro ao buscar usuário:', err);
      return res.status(500).json({ success: false, message: 'Erro ao buscar usuário.' });
    }
    if (results.length === 0) {
      return res.status(404).json({ success: false, message: 'Usuário não encontrado.' });
    }

    const hashAtual = results[0].senha;

    try {
      const senhaValida = await bcrypt.compare(senhaAtual, hashAtual);
      if (!senhaValida) {
        return res.status(401).json({ success: false, message: 'Senha atual incorreta.' });
      }

      const novoHash = await bcrypt.hash(senhaNova, 10);
      const updateQuery = 'UPDATE usuarios SET email = ?, nome = ?, senha = ? WHERE id = ?';
      connection.query(updateQuery, [email, nome, novoHash, id], (err2, results2) => {
        if (err2) {
          console.error('Erro ao atualizar usuário:', err2);
          return res.status(500).json({ success: false, message: 'Erro ao atualizar o usuário.' });
        }
        if (results2.affectedRows === 0) {
          return res.status(500).json({ success: false, message: 'Nenhuma alteração realizada.' });
        }

        res.json({ success: true, message: 'Usuário atualizado com sucesso!' });
      });
    } catch (errCompareHash) {
      console.error('Erro ao processar senha:', errCompareHash);
      res.status(500).json({ success: false, message: 'Erro ao validar ou gerar hash da senha.' });
    }
  });
};

exports.listarUsuarios = (req, res) => {
    const query = 'SELECT * FROM usuarios';
    connection.query(query, (err, results) => {
        if (err) {
            return res.status(500).json({ success: false, message: 'Erro ao selecionar os usuários.' });
        }
        res.json({ success: true, message: 'Usuários selecionados com sucesso!', data: results });
    });
}

exports.selecionarUsuarioPorId = (req, res) => {
    const query = 'SELECT * FROM usuarios WHERE id = ?';
    const params = [req.params.id];

    connection.query(query, params, (err, results) => {
        if (err) {
            return res.status(500).json({ success: false, message: 'Erro ao selecionar o usuário.' });
        }
        res.json({ success: true, message: 'Usuário selecionado com sucesso!', data: results[0] });
    });
}

exports.alterarNomeUsuario = (req, res) => {
    const query = 'UPDATE usuarios SET nome = ? WHERE id = ?';
    const params = [req.body.nome, req.params.id];
    connection.query(query, params, (err, results) => {
        if (err) {
            return res.status(500).json({ success: false, message: 'Erro ao alterar o nome do usuário.' });
        }
        res.json({ success: true, message: 'Nome do usuário alterado com sucesso!', data: req.body.nome });
    });
}

exports.aumentarDificuldadeMaximaDesbloqueada = (req, res) => {
    const query = 'UPDATE usuarios SET dificuldade_maxima_desbloqueada = dificuldade_maxima_desbloqueada + 1 WHERE id = ?';
    const params = [req.params.id];
    connection.query(query, params, (err, results) => {
        if (err) {
            return res.status(500).json({ success: false, message: 'Erro ao aumentar a dificuldade máxima desbloqueada.' });
        }
        res.json({ success: true, message: 'Dificuldade máxima aumentada com sucesso!', data: req.body.dificuldade_maxima_desbloqueada });
    });
}

exports.desbloquearConquista = async (req, res) => {
    const { idUsuario, idConquista } = req.params;

    const queryS = 'SELECT conquistas_desbloqueadas FROM usuarios WHERE id = ?';
    const paramsS = [idUsuario];

    connection.query(queryS, paramsS, (err, results) => {
        if (err) {
            return res.status(500).json({ success: false, message: 'Erro ao selecionar o usuário.' });
        }
        let conquistas_usuario = results[0]['conquistas_desbloqueadas'];
        conquistas_usuario = conquistas_usuario.substring(0, idConquista - 1) + '1' + conquistas_usuario.substring(idConquista);
        const query = 'UPDATE usuarios SET conquistas_desbloqueadas = ? WHERE id = ?';
        const params = [conquistas_usuario, idUsuario];

        connection.query(query, params, (err, results) => {
            if (err || results.length == 0) {
                return res.status(500).json({ success: false, message: 'Erro ao desbloquear a conquista.' });
            }
            res.json({ success: true, message: 'Conquista desbloqueada com sucesso!' });
        });
    });
}

exports.aumentarQuantTelaCompartilhada = (req, res) => {
    const { id, quantidade } = req.params;
    const query = 'UPDATE usuarios SET quant_tela_compartilhada = quant_tela_compartilhada + ? WHERE id = ?';
    const params = [quantidade, id];

    connection.query(query, params, (err, results) => {
        if (err || results.length == 0) {
            return res.status(500).json({ success: false, message: 'Erro ao aumentar a quantidade de vezes que a tela foi compartilhada.' });
        }
        res.json({ success: true, message: 'Quantidade de vezes que a tela foi compartilhada aumentada com sucesso!' });
    });
}

exports.aumentarQuantTarefasConcluidas = (req, res) => {
    const { id, quantidade } = req.params;
    const query = 'UPDATE usuarios SET tarefas_concluidas = tarefas_concluidas + ? WHERE id = ?';
    const params = [quantidade, id];

    connection.query(query, params, (err, results) => {
        if (err || results.length == 0) {
            return res.status(500).json({ success: false, message: 'Erro ao aumentar a quantidade de tarefas concluídas.' });
        }
        res.json({ success: true, message: 'Quantidade de tarefas concluídas aumentada com sucesso!' });
    });
}

exports.aumentarQuantInimigosDerrotados = (req, res) => {
    const { id, quantidade } = req.params;
    const query = 'UPDATE usuarios SET inimigos_derrotados = inimigos_derrotados + ? WHERE id = ?';
    const params = [quantidade, id];

    connection.query(query, params, (err, results) => {
        if (err || results.length == 0) {
            return res.status(500).json({ success: false, message: 'Erro ao aumentar a quantidade de inimigos derrotados.' });
        }
        res.json({ success: true, message: 'Quantidade de inimigos derrotados aumentada com sucesso!' });
    });
}

exports.aumentarQuantTestesFeitos = (req, res) => {
    const { id, quantidade } = req.params;
    const query = 'UPDATE usuarios SET testes_feitos = testes_feitos + ? WHERE id = ?';
    const params = [quantidade, id];

    connection.query(query, params, (err, results) => {
        if (err || results.length == 0) {
            return res.status(500).json({ success: false, message: 'Erro ao aumentar a quantidade de testes feitos.' });
        }
        res.json({ success: true, message: 'Quantidade de testes feitos aumentada com sucesso!' });
    });
}

exports.aumentarQuantQuizzesGabaritados = (req, res) => {
    const { id, quantidade } = req.params;
    const query = 'UPDATE usuarios SET quizzes_gabaritados = quizzes_gabaritados + ? WHERE id = ?';
    const params = [quantidade, id];

    connection.query(query, params, (err, results) => {
        if (err || results.length == 0) {
            return res.status(500).json({ success: false, message: 'Erro ao aumentar a quantidade de quizzes gabaritados.' });
        }
        res.json({ success: true, message: 'Quantidade de quizzes gabaritados aumentada com sucesso!' });
    });
}

exports.aumentarRunsConsecutivasSemAdvertencia = (req, res) => {
    const { id, quantidade } = req.params;
    const query = 'UPDATE usuarios SET runs_consecutivas_sem_advertencia = runs_consecutivas_sem_advertencia + ? WHERE id = ?';
    const params = [quantidade, id];

    connection.query(query, params, (err, results) => {
        if (err || results.length == 0) {
            return res.status(500).json({ success: false, message: 'Erro ao aumentar a quantidade de runs consecutivas sem advertência.' });
        }
        res.json({ success: true, message: 'Quantidade de runs consecutivas sem advertência aumentada com sucesso!' });
    });
}

exports.reiniciarRunsConsecutivasSemAdvertencia = (req, res) => {
    const { id } = req.params;
    const query = 'UPDATE usuarios SET runs_consecutivas_sem_advertencia = 0 WHERE id = ?';
    const params = [id];

    connection.query(query, params, (err, results) => {
        if (err || results.length == 0) {
            return res.status(500).json({ success: false, message: 'Erro ao reiniciar a quantidade de runs consecutivas sem advertência.' });
        }
        res.json({ success: true, message: 'Quantidade de runs consecutivas sem advertência reiniciada com sucesso!' });
    });
}

exports.aumentarRunsJogadas = (req, res) => {
    const { id, quantidade } = req.params;
    const query = 'UPDATE usuarios SET runs_jogadas = runs_jogadas + ? WHERE id = ?';
    const params = [quantidade, id];

    connection.query(query, params, (err, results) => {
        if (err || results.length == 0) {
            return res.status(500).json({ success: false, message: 'Erro ao aumentar a quantidade de runs jogadas.' });
        }
        res.json({ success: true, message: 'Quantidade de runs jogadas aumentada com sucesso!' });
    });
}

exports.deletarUsuario = (req, res) => {
    const query = 'DELETE FROM usuarios WHERE id = ?';
    const params = [req.params.id];

    connection.query(query, params, (err, results) => {
        if (err) {
            return res.status(500).json({ success: false, message: 'Erro ao deletar o usuário.' });
        }
        res.json({ success: true, message: 'Usuário deletado com sucesso!' });
    });
}
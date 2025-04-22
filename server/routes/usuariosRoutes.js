const express = require('express');
const router = express.Router();
const usuariosController = require('../controllers/usuariosController');

router.post('/usuario', usuariosController.criarUsuario);
router.put('/usuario/login', usuariosController.login);
router.get('/usuario', usuariosController.listarUsuarios);
router.get('/usuario/:id', usuariosController.selecionarUsuarioPorId);
router.put('/usuario/:id', usuariosController.atualizarUsuario);
router.put('/usuario/nome/:id', usuariosController.alterarNomeUsuario);
router.put('/usuario/aumentarDificuldadeMaximaDesbloqueada/:id', usuariosController.aumentarDificuldadeMaximaDesbloqueada);
router.put('/usuario/desbloquearConquista/:idUsuario/:idConquista', usuariosController.desbloquearConquista);
router.put('/usuario/aumentarQuantTelaCompartilhada/:id/:quantidade', usuariosController.aumentarQuantTelaCompartilhada);
router.put('/usuario/aumentarQuantTarefasConcluidas/:id/:quantidade', usuariosController.aumentarQuantTarefasConcluidas);
router.put('/usuario/aumentarQuantInimigosDerrotados/:id/:quantidade', usuariosController.aumentarQuantInimigosDerrotados);
router.put('/usuario/aumentarQuantTestesFeitos/:id/:quantidade', usuariosController.aumentarQuantTestesFeitos);
router.put('/usuario/aumentarQuantQuizzesGabaritados/:id/:quantidade', usuariosController.aumentarQuantQuizzesGabaritados);
router.put('/usuario/aumentarRunsConsecutivasSemAdvertencia/:id/:quantidade', usuariosController.aumentarRunsConsecutivasSemAdvertencia);
router.put('/usuario/reiniciarRunsConsecutivasSemAdvertencia/:id', usuariosController.reiniciarRunsConsecutivasSemAdvertencia);
router.put('/usuario/aumentarRunsJogadas/:id/:quantidade', usuariosController.aumentarRunsJogadas);
router.delete('/usuario/:id', usuariosController.deletarUsuario);

module.exports = router;
const urlBase = 'http://localhost:3000';

export async function criarUsuario(email, senha) {
  const res = await fetch(`${urlBase}/usuario`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ email, senha })
  });
  const result = await res.json();
  if (!result.success) alert(result.message);
  return result;
}

export async function login(email, senha) {
  const res = await fetch(`${urlBase}/usuario/login`, {
    method: 'PUT',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ email, senha })
  });
  const result = await res.json();
  if (result.success) {
    localStorage.setItem('usuario', JSON.stringify(result.data));
  } else {
    alert(result.message);
  }
  return result;
}

export function logout() {
  localStorage.removeItem('usuario');
}

export function getUsuarioLogado() {
  const conteudo = localStorage.getItem('usuario');
  return conteudo ? JSON.parse(conteudo) : null;
}

export async function listarUsuarios() {
  const res = await fetch(`${urlBase}/usuario`);
  const result = await res.json();
  if (!result.success) alert(result.message);
  return result.data;
}

export async function selecionarUsuarioPorId(id) {
  const res = await fetch(`${urlBase}/usuario/${id}`);
  const result = await res.json();
  if (!result.success) alert(result.message);
  return result.data;
}

export async function atualizarUsuario({ id, email, nome, senhaAtual, senhaNova }) {
  const res = await fetch(`${urlBase}/usuario/${id}`, {
    method: 'PUT',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ email, nome, senhaAtual, senhaNova })
  });
  const result = await res.json();
  if (!result.success) alert(result.message);
  return result;
}

export async function alterarNomeUsuario(id, nome) {
  const res = await fetch(`${urlBase}/usuario/nome/${id}`, {
    method: 'PUT',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ nome })
  });
  const result = await res.json();
  if (!result.success) alert(result.message);
  return result;
}

export async function deletarUsuario(id) {
  const res = await fetch(`${urlBase}/usuario/${id}`, { method: 'DELETE' });
  const result = await res.json();
  if (!result.success) alert(result.message);
  return result;
}

export async function aumentarDificuldadeMaximaDesbloqueada(id) {
  const res = await fetch(
    `${urlBase}/usuario/aumentarDificuldadeMaximaDesbloqueada/${id}`,
    { method: 'PUT' }
  );
  const result = await res.json();
  if (!result.success) alert(result.message);
  return result;
}

export async function desbloquearConquista(idUsuario, idConquista) {
  const res = await fetch(
    `${urlBase}/usuario/desbloquearConquista/${idUsuario}/${idConquista}`,
    { method: 'PUT' }
  );
  const result = await res.json();
  if (!result.success) alert(result.message);
  return result;
}

export async function aumentarQuantTelaCompartilhada(id, quantidade) {
  const res = await fetch(
    `${urlBase}/usuario/aumentarQuantTelaCompartilhada/${id}/${quantidade}`,
    { method: 'PUT' }
  );
  const result = await res.json();
  if (!result.success) alert(result.message);
  return result;
}

export async function aumentarQuantTarefasConcluidas(id, quantidade) {
  const res = await fetch(
    `${urlBase}/usuario/aumentarQuantTarefasConcluidas/${id}/${quantidade}`,
    { method: 'PUT' }
  );
  const result = await res.json();
  if (!result.success) alert(result.message);
  return result;
}

export async function aumentarQuantInimigosDerrotados(id, quantidade) {
  const res = await fetch(
    `${urlBase}/usuario/aumentarQuantInimigosDerrotados/${id}/${quantidade}`,
    { method: 'PUT' }
  );
  const result = await res.json();
  if (!result.success) alert(result.message);
  return result;
}

export async function aumentarQuantTestesFeitos(id, quantidade) {
  const res = await fetch(
    `${urlBase}/usuario/aumentarQuantTestesFeitos/${id}/${quantidade}`,
    { method: 'PUT' }
  );
  const result = await res.json();
  if (!result.success) alert(result.message);
  return result;
}

export async function aumentarQuantQuizzesGabaritados(id, quantidade) {
  const res = await fetch(
    `${urlBase}/usuario/aumentarQuantQuizzesGabaritados/${id}/${quantidade}`,
    { method: 'PUT' }
  );
  const result = await res.json();
  if (!result.success) alert(result.message);
  return result;
}

export async function aumentarRunsConsecutivasSemAdvertencia(id, quantidade) {
  const res = await fetch(
    `${urlBase}/usuario/aumentarRunsConsecutivasSemAdvertencia/${id}/${quantidade}`,
    { method: 'PUT' }
  );
  const result = await res.json();
  if (!result.success) alert(result.message);
  return result;
}

export async function reiniciarRunsConsecutivasSemAdvertencia(id) {
  const res = await fetch(
    `${urlBase}/usuario/reiniciarRunsConsecutivasSemAdvertencia/${id}`,
    { method: 'PUT' }
  );
  const result = await res.json();
  if (!result.success) alert(result.message);
  return result;
}

export async function aumentarRunsJogadas(id, quantidade) {
  const res = await fetch(
    `${urlBase}/usuario/aumentarRunsJogadas/${id}/${quantidade}`,
    { method: 'PUT' }
  );
  const result = await res.json();
  if (!result.success) alert(result.message);
  return result;
}

export default {
  criarUsuario,
  login,
  logout,
  getUsuarioLogado,
  listarUsuarios,
  selecionarUsuarioPorId,
  atualizarUsuario,
  alterarNomeUsuario,
  deletarUsuario,
  aumentarDificuldadeMaximaDesbloqueada,
  desbloquearConquista,
  aumentarQuantTelaCompartilhada,
  aumentarQuantTarefasConcluidas,
  aumentarQuantInimigosDerrotados,
  aumentarQuantTestesFeitos,
  aumentarQuantQuizzesGabaritados,
  aumentarRunsConsecutivasSemAdvertencia,
  reiniciarRunsConsecutivasSemAdvertencia,
  aumentarRunsJogadas
};
// Credenciales demo
const CREDENTIALS = { entrenador: { password: 'entrenador123' }, deportista: { password: '12345' } };

const openLogin = document.getElementById('openLogin');
const loginSection = document.getElementById('loginSection');
const loginForm = document.getElementById('loginForm');
const btnLogin = document.getElementById('btnLogin');
const btnCancel = document.getElementById('btnCancel');
const dashboard = document.getElementById('dashboard');
const dashTitle = document.getElementById('dashTitle');
const dashContent = document.getElementById('dashContent');
const logoutBtn = document.getElementById('logout');

openLogin && openLogin.addEventListener('click', () => { loginSection.scrollIntoView({behavior: 'smooth'}); });

btnCancel.addEventListener('click', () => { loginForm.reset(); });

btnLogin.addEventListener('click', () => {
  const role = document.getElementById('role').value;
  const username = document.getElementById('username').value.trim();
  const password = document.getElementById('password').value;

  if (role === 'publico') { alert('El público no requiere iniciar sesión — navega por el sitio.'); return; }
  if (!username || !password) { alert('Ingresa usuario y contraseña.'); return; }

  const expected = CREDENTIALS[role] && CREDENTIALS[role].password;
  if (password === expected) { showDashboard(role, username); } else { alert('Credenciales incorrectas.'); }
});

logoutBtn.addEventListener('click', () => {
  dashboard.classList.add('hidden');
  loginForm.classList.remove('hidden');
  loginForm.reset();
  window.scrollTo({top:0,behavior:'smooth'});
});

function showDashboard(role, username) {
  loginForm.classList.add('hidden');
  dashboard.classList.remove('hidden');
  dashTitle.textContent = role === 'entrenador' ? 'Panel del Entrenador' : 'Panel del Deportista';
  if (role === 'entrenador') {
    dashContent.innerHTML = `
      <h4>Bienvenido, ${escapeHtml(username)}</h4>
      <p>Puedes ver la lista de deportistas registrados y sus evaluaciones. Agrega jugadores cuando quieras.</p>
      <table>
        <thead><tr><th>Nombre</th><th>Categoría</th><th>Rendimiento</th></tr></thead>
        <tbody id="playersTableBody"></tbody>
      </table>
      <div style="margin-top:10px"><button id="addPlayerBtn" class="btn btn--primary">Agregar jugador (demo)</button></div>
    `;
    setTimeout(()=>{ const addBtn = document.getElementById('addPlayerBtn'); addBtn && addBtn.addEventListener('click', addDemoPlayer); }, 50);
  } else {
    dashContent.innerHTML = `
      <h4>Hola, ${escapeHtml(username)}</h4>
      <p>Este es tu perfil de jugador — aquí verás tu rendimiento cuando el administrador agregue los datos.</p>
      <div class="card"><p><em>No hay datos aún. Pide a tu entrenador que agregue tu información.</em></p></div>
    `;
  }
}

function addDemoPlayer(){
  const tbody = document.getElementById('playersTableBody');
  if(!tbody) return;
  const tr = document.createElement('tr');
  tr.innerHTML = '<td>Jugador Demo</td><td>Infantil</td><td>Buen rendimiento</td>';
  tbody.appendChild(tr);
}

function escapeHtml(s){ return s.replace(/[&<>"']/g, (m)=>({ '&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":"&#39;"}[m])); }
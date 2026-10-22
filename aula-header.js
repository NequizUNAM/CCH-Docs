/* ============================================================
   aula-header.js — header compartido de Aula Digital (solo JS)
   - Estado BLOQUEADO: solo marca + botón «Desbloquear» (el contenido de la página se ve normal).
   - Estado DESBLOQUEADO: desplegables con todas las páginas + botón «Bloquear».
   - La contraseña está en auth-config.js. El desbloqueo se guarda en sessionStorage,
     así que vale para todas las páginas de la pestaña hasta que se cierre.
   - El menú vive aquí (constante MENU): es la fuente única para el header y las tarjetas del index.
   Uso en cada página:  <script src="auth-config.js"></script><script src="aula-header.js"></script>
   ============================================================ */
(function () {
  const KEY = 'aula-unlocked';
  /* ===== FUENTE ÚNICA DEL MENÚ =====
     Para agregar una página, añade una línea en "items" del grupo que corresponda.
     Todas las páginas y las tarjetas del index leen este objeto. */
  const MENU = {
    brand: { label: 'Aula Digital', icon: 'bi-mortarboard-fill', href: 'index.html' },
    groups: [
      { id: 'matematicas', label: 'Matemáticas', icon: 'bi-calculator', color: 'c-mat', items: [
        { label: 'Los Números', href: 'los_numeros.html', icon: 'bi-hash' },
        { label: 'Fracciones', href: 'fracciones.html', icon: 'bi-pie-chart-fill' },
        { label: 'Variación directamente proporcional', href: 'variacion_proporcional.html', icon: 'bi-graph-up-arrow' },
        { label: 'Exponentes y Radicales', href: 'exponentes_radicales.html', icon: 'bi-superscript' },
        { label: 'Ángulos', href: 'angulos.html', icon: 'bi-compass' },
        { label: 'Teorema de Pitágoras', href: 'pitagoras.html', icon: 'bi-triangle-half' } ] },
      { id: 'cibernetica', label: 'Cibernética', icon: 'bi-cpu', color: 'c-cib', items: [
        { label: 'Precursores', href: 'precursores.html', icon: 'bi-clock-history' },
        { label: 'Circuitos eléctricos', href: 'circuitos.html', icon: 'bi-lightning-charge-fill' },
        { label: 'Protoboard e Interconexiones', href: 'protoboard.html', icon: 'bi-grid-3x3-gap-fill' },
        { label: 'Conversiones numéricas', href: 'conversiones.html', icon: 'bi-123' },
        { label: 'Operaciones básicas binarios', href: 'operaciones_basicas_binarios.html', icon: 'bi-calculator-fill' },
        { label: 'Compuertas lógicas', href: 'compuertas_logicas.html', icon: 'bi-toggles' },
        { label: 'Exámen Cibernética', href: 'examenes_cibernetica.html', icon: 'bi-toggles' } ] },
      { id: 'estadistica', label: 'Estadística', icon: 'bi-bar-chart-line', color: 'c-est', items: [
        { label: 'Distribución Muestral', href: 'distribucion_muestral.html', icon: 'bi-bar-chart-line-fill' },
        { label: 'Medidas de Dispersión', href: 'medidas_dispersion.html', icon: 'bi-arrows-expand' },
        { label: 'Amplitudes', href: 'amplitudes.html', icon: 'bi-distribute-horizontal' },
        { label: 'Cuartiles y Percentiles', href: 'cuartiles_percentiles.html', icon: 'bi-percent' },
        { label: 'Correlación Lineal', href: 'correlacion_lineal.html', icon: 'bi-graph-up' },
        { label: 'Probabilidad', href: 'probabilidad.html', icon: 'bi-dice-5-fill' },
        { label: 'Función de distribución de probabilidad', href: 'funcion_distribucion_probabilidad.html', icon: 'bi-bar-chart-line-fill' },
        { label: 'Distribución Binomial', href: 'distribucion_binomial.html', icon: 'bi-bar-chart-steps' },
        { label: 'Distribución Normal', href: 'distribucion_normal.html', icon: 'bi-activity' },
        { label: 'Proyectos finales EyP', href: 'proyectos_finales_eyp.html', icon: 'bi-journal-check' } ] }
    ]
  };
  const store = {
    get: () => { try { return sessionStorage.getItem(KEY) === '1'; } catch (e) { return false; } },
    set: v => { try { v ? sessionStorage.setItem(KEY, '1') : sessionStorage.removeItem(KEY); } catch (e) { } }
  };
  const PAGE = location.pathname.split('/').pop() || 'index.html';
  const getMenu = () => MENU;

  const brandHTML = b => `<a class="navbar-brand fw-bold" href="${b.href}"><i class="bi ${b.icon} me-2"></i>${b.label}</a>`;

  function render() {
    const box = document.getElementById('app-header'); if (!box) return;
    const unlocked = store.get();
    if (!unlocked) {
      box.innerHTML = `<nav class="navbar navbar-dark app-navbar sticky-top"><div class="container">${brandHTML(MENU.brand)}
        <button class="btn btn-outline-light rounded-pill fw-bold" type="button" data-unlock><i class="bi bi-lock-fill me-1"></i>Desbloquear</button></div></nav>`;
    } else {
      const menu = MENU;
      const groups = menu.groups.map(g => {
        const hasActive = g.items.some(i => i.href === PAGE);
        const items = g.items.map(i => `<li><a class="dropdown-item ${i.href === PAGE ? 'active' : ''} ${i.disabled ? 'disabled' : ''}" href="${i.href}"><i class="bi ${i.icon || 'bi-dot'} me-2"></i>${i.label}</a></li>`).join('');
        return `<li class="nav-item dropdown"><a class="nav-link dropdown-toggle ${hasActive ? 'active-group' : ''}" href="#" role="button" data-bs-toggle="dropdown" aria-expanded="false"><i class="bi ${g.icon} me-1"></i>${g.label}</a><ul class="dropdown-menu">${items}</ul></li>`;
      }).join('');
      box.innerHTML = `<nav class="navbar navbar-expand-lg navbar-dark app-navbar sticky-top"><div class="container">${brandHTML(menu.brand)}
        <button class="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#mainMenu" aria-controls="mainMenu" aria-expanded="false" aria-label="Abrir menú"><span class="navbar-toggler-icon"></span></button>
        <div class="collapse navbar-collapse" id="mainMenu"><ul class="navbar-nav ms-auto mb-2 mb-lg-0">${groups}
          <li class="nav-item ms-lg-2"><button class="btn btn-sm btn-outline-light rounded-pill fw-bold" type="button" data-lock><i class="bi bi-unlock-fill me-1"></i>Bloquear</button></li></ul></div></div></nav>`;
    }
    document.dispatchEvent(new CustomEvent('aula-auth', { detail: { unlocked } }));
  }

  function ensureModal() {
    if (document.getElementById('unlockModal')) return;
    document.body.insertAdjacentHTML('beforeend', `
      <div class="modal fade" id="unlockModal" tabindex="-1" aria-labelledby="unlockTitle" aria-hidden="true"><div class="modal-dialog modal-dialog-centered modal-sm"><div class="modal-content">
        <form id="unlockForm" autocomplete="off">
          <div class="modal-header"><h5 class="modal-title fw-bold" id="unlockTitle"><i class="bi bi-lock-fill me-2 text-primary"></i>Desbloquear</h5><button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Cerrar"></button></div>
          <div class="modal-body"><label for="unlockPass" class="form-label small fw-bold">Contraseña</label>
            <div class="input-group"><input type="password" class="form-control" id="unlockPass" inputmode="numeric" autocomplete="off"><button class="btn btn-outline-secondary" type="button" id="unlockEye" aria-label="Mostrar u ocultar"><i class="bi bi-eye"></i></button></div>
            <div class="text-danger small fw-bold mt-2" id="unlockErr" hidden></div></div>
          <div class="modal-footer"><button type="submit" class="btn btn-primary rounded-pill px-4"><i class="bi bi-unlock-fill me-1"></i>Entrar</button></div>
        </form></div></div></div>`);
    const el = document.getElementById('unlockModal'), form = document.getElementById('unlockForm'), inp = document.getElementById('unlockPass'), err = document.getElementById('unlockErr');
    const modal = () => bootstrap.Modal.getOrCreateInstance(el);
    el.addEventListener('shown.bs.modal', () => inp.focus());
    el.addEventListener('hidden.bs.modal', () => { inp.value = ''; inp.type = 'password'; err.hidden = true; });
    document.getElementById('unlockEye').addEventListener('click', () => { inp.type = inp.type === 'password' ? 'text' : 'password'; });
    form.addEventListener('submit', ev => {
      ev.preventDefault(); const cfg = window.AULA_CONFIG;
      if (!cfg || !cfg.password) { err.textContent = 'No se encontró auth-config.js.'; err.hidden = false; return; }
      if (inp.value === String(cfg.password)) { store.set(true); modal().hide(); render(); }
      else { err.textContent = 'Contraseña incorrecta.'; err.hidden = false; inp.select(); }
    });
  }

  function init() {
    ensureModal(); render();
    document.addEventListener('click', e => {
      if (e.target.closest('[data-unlock]')) { if (window.bootstrap) bootstrap.Modal.getOrCreateInstance(document.getElementById('unlockModal')).show(); }
      if (e.target.closest('[data-lock]')) { store.set(false); render(); }
    });
  }
  window.AulaHeader = { isUnlocked: store.get, getMenu, render };
  if (document.readyState === 'loading') document.addEventListener('DOMContentLoaded', init); else init();
})();

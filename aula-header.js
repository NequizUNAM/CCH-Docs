/* ============================================================
   aula-header.js — header compartido de Aula Digital (solo JS)
   - Estado BLOQUEADO: solo marca + botón «Desbloquear» (el contenido de la página se ve normal).
   - Estado DESBLOQUEADO: desplegables con todas las páginas + botón «Bloquear».
   - La contraseña está en auth-config.js. El desbloqueo se guarda en sessionStorage,
     así que vale para todas las páginas de la pestaña hasta que se cierre.
   - El menú vive aquí (constante MENU): es la fuente única para el header y las tarjetas del index.
   - Campos de cada página: label, href, icon, desc (opcional), ext: true (se abre en otra pestaña),
     pw: 'contraseña' (se muestra con el botón de llave en un popover, con botón Copiar).
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
      { id: 'programas', label: 'Programas de Estudio 2024', short: 'Programas', icon: 'bi-journal-bookmark-fill', color: 'c-com', items: [
        { label: 'Programa Taller de Cómputo', href: 'Programas_2024/programa_taller_computo.html', icon: 'bi-laptop' },
        { label: 'Programa Cibernética 1', href: 'Programas_2024/programa_cibernetica1.html', icon: 'bi-cpu' },
        { label: 'Programa Cibernética 2', href: 'Programas_2024/programa_cibernetica2.html', icon: 'bi-motherboard' },
        { label: 'Programa Estadística 1', href: 'Programas_2024/programa_estadistica1.html', icon: 'bi-bar-chart-line' },
        { label: 'Programa Estadística 2', href: 'Programas_2024/programa_estadistica2.html', icon: 'bi-graph-up' },
        { label: 'Programa Matemáticas 1-4', href: 'Programas_2024/programa_matematicas1-4.html', icon: 'bi-calculator' },
        { label: 'Programa Cálculo 1-2', href: 'Programas_2024/programa_calculo1-2.html', icon: 'bi-infinity' },
        { label: 'Programa TLRIID 1-4', href: 'Programas_2024/programa_tlriid1-4.html', icon: 'bi-book', desc: 'Taller de Lectura, Redacción e Iniciación a la Investigación Documental' } ] },
      { id: 'cuadernillos', label: 'Cuadernillos', short: 'Cuadernillos', icon: 'bi-journal-text', color: 'c-cua', items: [
        { label: 'Cuadernillo Estadística 1', href: 'Cuadernillos/cuadernillo_estadistica1.html', icon: 'bi-bar-chart-line' },
        { label: 'Cuadernillo Estadística 2', href: 'Cuadernillos/cuadernillo_estadistica2.html', icon: 'bi-graph-up' } ] },
      { id: 'matematicas', label: 'Matemáticas', short: 'Matemáticas', icon: 'bi-calculator', color: 'c-mat', items: [
        { label: 'Los Números', href: 'los_numeros.html', icon: 'bi-hash' },
        { label: 'Fracciones', href: 'fracciones.html', icon: 'bi-pie-chart-fill' },
        { label: 'Variación directamente proporcional', href: 'variacion_proporcional.html', icon: 'bi-graph-up-arrow' },
        { label: 'Exponentes y Radicales', href: 'exponentes_radicales.html', icon: 'bi-superscript' },
        { label: 'Ángulos', href: 'angulos.html', icon: 'bi-rulers' },
        { label: 'Teorema de Pitágoras', href: 'pitagoras.html', icon: 'bi-triangle-half' } ] },
      { id: 'cibernetica', label: 'Cibernética', short: 'Cibernética', icon: 'bi-cpu', color: 'c-cib', items: [
        { label: 'Guía Taller de Cómputo', href: 'taller_computo.html', icon: 'bi-pc-display' },
        { label: 'Precursores', href: 'precursores.html', icon: 'bi-clock-history' },
        { label: 'Circuitos eléctricos', href: 'circuitos.html', icon: 'bi-lightning-charge-fill' },
        { label: 'Protoboard e Interconexiones', href: 'protoboard.html', icon: 'bi-grid-3x3-gap-fill' },
        { label: 'Conversiones numéricas', href: 'conversiones.html', icon: 'bi-123' },
        { label: 'Operaciones básicas binarios', href: 'operaciones_basicas_binarios.html', icon: 'bi-calculator-fill' },
        { label: 'Compuertas lógicas', href: 'compuertas_logicas.html', icon: 'bi-diagram-3-fill' },
        { label: 'Paquete Cibernética y Computación 2', href: 'Paquete/cibernetica-computacion2.html', icon: 'bi-box-seam-fill', pw: 'CCH-Ciber2-2026' },
        { label: 'Examen Cibernética', href: 'examenes_cibernetica.html', icon: 'bi-file-earmark-check-fill' } ] },
      { id: 'estadistica', label: 'Estadística', short: 'Estadística', icon: 'bi-bar-chart-line', color: 'c-est', items: [
        { label: 'Distribución Muestral', href: 'distribucion_muestral.html', icon: 'bi-people-fill' },
        { label: 'Medidas de Dispersión', href: 'medidas_dispersion.html', icon: 'bi-arrows-expand' },
        { label: 'Amplitudes', href: 'amplitudes.html', icon: 'bi-distribute-horizontal' },
        { label: 'Cuartiles y Percentiles', href: 'cuartiles_percentiles.html', icon: 'bi-percent' },
        { label: 'Correlación Lineal', href: 'correlacion_lineal.html', icon: 'bi-graph-up' },
        { label: 'Probabilidad', href: 'probabilidad.html', icon: 'bi-dice-5-fill' },
        { label: 'Función de distribución de probabilidad', href: 'funcion_distribucion_probabilidad.html', icon: 'bi-bar-chart-line-fill' },
        { label: 'Distribución Binomial', href: 'distribucion_binomial.html', icon: 'bi-bar-chart-steps' },
        { label: 'Distribución Normal', href: 'distribucion_normal.html', icon: 'bi-activity' },
        { label: 'Proyectos finales EyP', href: 'proyectos_finales_eyp.html', icon: 'bi-journal-check' },
        { label: 'Examen Estadística', href: 'examenes_estadistica.html', icon: 'bi-file-earmark-check-fill' } ] },
      { id: 'extras', label: 'Extras', short: 'Extras', icon: 'bi-stars', color: 'c-ext', items: [
        { label: 'Categorizar trayectoria', href: 'Extras/categorizar_trayectoria.html', icon: 'bi-signpost-split-fill' },
        { label: 'Guía CONAMAT', href: 'Extras/guia_conamat.html', icon: 'bi-trophy-fill' },
        { label: 'LibreOffice', href: 'Extras/libre_office.html', icon: 'bi-file-earmark-richtext-fill' },
        { label: 'Prompts', href: 'Extras/prompts.html', icon: 'bi-chat-square-text-fill' },
        { label: 'Proyecto SILADIN: estrés', href: 'Extras/proyecto_siladin_estres.html', icon: 'bi-heart-pulse-fill' } ] },
      { id: 'apps', label: 'Páginas (Google Apps Script)', short: 'Apps GS', icon: 'bi-google', color: 'c-gs', apps: true, items: [
        { label: 'PAE · Asistencia (formulario CCH)', href: 'https://script.google.com/macros/s/AKfycbyla09kXDSMx6iAQUPcpNaQ816tYYno0qxCJwyF48L88FEWXalIMJZDS0IwyjqtJwSh/exec', icon: 'bi-clipboard-check-fill', ext: true },
        { label: 'Página de equipos (Forms)', href: 'https://script.google.com/macros/s/AKfycbz_ZaVPtNAmCskTjpcOHZMruXkPtxuYfmCcAsR0BtJbzVi3cDYAiJI5jgxK31XciyCpLA/exec', icon: 'bi-people-fill', ext: true, pw: 'K88B88JP' },
        { label: 'Catalogador de trayectoria CCH', href: 'https://script.google.com/macros/s/AKfycbwK58ejKPQCKUdQ5tiiNEYAAvcPlyhciyMGvtV9jk0VaiTzJo2WRft-lPbqfC7S0sII/exec', icon: 'bi-tags-fill', ext: true },
        { label: 'Página de prompts', href: 'https://script.google.com/macros/s/AKfycbxlwk3_YrcEeQUXT3JKhxHTDfZ4ZAXgOHRThvAsXfRHAKQA8ZoivvbStrLoKyMzaKsXcA/exec', icon: 'bi-chat-dots-fill', ext: true },
        { label: 'Base de proyectos SILADIN Jóvenes', href: 'https://script.google.com/macros/s/AKfycbx2StWKh-jvfSTVSyjR3cwRf5q_t4tGpJznwt0p4Jw2kfe9Rg0PB2HWnjawnb9DQi3q9A/exec', icon: 'bi-database-fill', ext: true } ] }
    ]
  };
  const store = {
    get: () => { try { return sessionStorage.getItem(KEY) === '1'; } catch (e) { return false; } },
    set: v => { try { v ? sessionStorage.setItem(KEY, '1') : sessionStorage.removeItem(KEY); } catch (e) { } }
  };
  const PAGE = location.pathname.split('/').pop() || 'index.html';
  const getMenu = () => MENU;
  const esc = s => String(s).replace(/[&<>"']/g, c => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' }[c]));
  const linkAttrs = i => `href="${esc(i.href)}"${i.ext ? ' target="_blank" rel="noopener noreferrer"' : ''}`;
  /* Botón de llave: muestra la contraseña de la página en un popover (con botón Copiar) */
  const keyBtn = (i, cls = '') => i.pw ? `<button type="button" class="aula-key ${cls}" data-aula-pw="${esc(i.pw)}" aria-label="Ver la contraseña de ${esc(i.label)}" title="Contraseña"><i class="bi bi-key-fill"></i></button>` : '';

  const brandHTML = b => `<a class="navbar-brand fw-bold" href="${b.href}"><i class="bi ${b.icon} me-2"></i>${b.label}</a>`;

  function injectStyle() {
    if (document.getElementById('aula-header-style')) return;
    const st = document.createElement('style'); st.id = 'aula-header-style';
    st.textContent = `
      .app-navbar .aula-dd{max-height:75vh;overflow-y:auto}
      .app-navbar .aula-dd li{display:flex;align-items:center;gap:.25rem}
      .app-navbar .aula-dd li > .dropdown-item{display:flex;align-items:center;gap:.5rem;flex:1;min-width:0}
      .app-navbar .aula-dd .ext{margin-left:auto;font-size:.75rem;opacity:.6}
      .app-navbar .aula-dd .dd-head{font-size:.72rem;font-weight:800;text-transform:uppercase;letter-spacing:.06em;color:#64748b;padding:.35rem .8rem .2rem}
      .aula-key{border:0;background:#fff4e0;color:#b45309;border-radius:8px;width:30px;height:30px;display:inline-flex;align-items:center;justify-content:center;flex:0 0 auto}
      .aula-key:hover,.aula-key[aria-describedby]{background:#f08c00;color:#fff}
      .aula-key:focus-visible{outline:3px solid #f08c00;outline-offset:2px}
      .aula-pw-pop{font-size:.85rem}
      .aula-pw-pop .pw{font:700 1rem 'Courier New',monospace;background:#f1f5f9;border-radius:8px;padding:.25rem .5rem;display:inline-block;user-select:all}
      .aula-pw-pop .cp{border:0;background:#1e293b;color:#fff;border-radius:999px;font-size:.75rem;font-weight:700;padding:.2rem .7rem;margin-left:.35rem}
      @media (min-width:1200px){.app-navbar .navbar-nav .nav-link{padding-left:.55rem;padding-right:.55rem}}
    `;
    document.head.appendChild(st);
  }

  /* Activa los popovers de contraseña dentro de un contenedor (header o index) */
  function initKeys(root) {
    if (!window.bootstrap || !bootstrap.Popover) return;
    (root || document).querySelectorAll('[data-aula-pw]').forEach(b => {
      if (bootstrap.Popover.getInstance(b)) return;
      new bootstrap.Popover(b, {
        html: true, sanitize: false, trigger: 'click', placement: 'auto', container: 'body', customClass: 'aula-pw-pop',
        title: '<i class="bi bi-key-fill me-1"></i>Contraseña',
        content: `<span class="pw">${esc(b.dataset.aulaPw)}</span><button type="button" class="cp" data-aula-copy="${esc(b.dataset.aulaPw)}">Copiar</button>`
      });
    });
  }
  function closeKeys(except) {
    if (!window.bootstrap || !bootstrap.Popover) return;
    document.querySelectorAll('[data-aula-pw]').forEach(b => { if (b !== except) { const p = bootstrap.Popover.getInstance(b); if (p) p.hide(); } });
  }

  function render() {
    const box = document.getElementById('app-header'); if (!box) return;
    const unlocked = store.get();
    closeKeys();
    if (!unlocked) {
      box.innerHTML = `<nav class="navbar navbar-dark app-navbar sticky-top"><div class="container">${brandHTML(MENU.brand)}
        <button class="btn btn-outline-light rounded-pill fw-bold" type="button" data-unlock><i class="bi bi-lock-fill me-1"></i>Desbloquear</button></div></nav>`;
    } else {
      const groups = MENU.groups.map(g => {
        const hasActive = g.items.some(i => i.href === PAGE);
        const items = g.items.map(i => `<li><a class="dropdown-item ${i.href === PAGE ? 'active' : ''} ${i.disabled ? 'disabled' : ''}" ${linkAttrs(i)}><i class="bi ${i.icon || 'bi-dot'}"></i><span>${esc(i.label)}</span>${i.ext ? '<i class="bi bi-box-arrow-up-right ext" aria-hidden="true"></i>' : ''}</a>${keyBtn(i)}</li>`).join('');
        const auto = g.items.some(i => i.pw) ? ' data-bs-auto-close="outside"' : '';
        return `<li class="nav-item dropdown"><a class="nav-link dropdown-toggle ${hasActive ? 'active-group' : ''}" href="#" role="button" data-bs-toggle="dropdown"${auto} aria-expanded="false" title="${esc(g.label)}"><i class="bi ${g.icon} me-1"></i><span class="d-xl-none">${esc(g.label)}</span><span class="d-none d-xl-inline">${esc(g.short || g.label)}</span></a><ul class="dropdown-menu dropdown-menu-end aula-dd"><li class="dd-head">${esc(g.label)}</li>${items}</ul></li>`;
      }).join('');
      box.innerHTML = `<nav class="navbar navbar-expand-xl navbar-dark app-navbar sticky-top"><div class="container-fluid px-lg-4">${brandHTML(MENU.brand)}
        <button class="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#mainMenu" aria-controls="mainMenu" aria-expanded="false" aria-label="Abrir menú"><span class="navbar-toggler-icon"></span></button>
        <div class="collapse navbar-collapse" id="mainMenu"><ul class="navbar-nav ms-auto mb-2 mb-xl-0 align-items-xl-center">${groups}
          <li class="nav-item ms-xl-2"><button class="btn btn-sm btn-outline-light rounded-pill fw-bold" type="button" data-lock><i class="bi bi-unlock-fill me-1"></i>Bloquear</button></li></ul></div></div></nav>`;
      initKeys(box);
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

  /* Si la página tiene barra de secciones pegajosa (.sec-nav, top:56px), el header también debe quedarse fijo;
     si no, se va con el scroll y deja un hueco de 56px sobre la barra. */
  function pinHeader() {
    if (!document.querySelector('.sec-nav') || document.getElementById('aula-pin-style')) return;
    const st = document.createElement('style'); st.id = 'aula-pin-style';
    st.textContent = '#app-header{position:sticky;top:0;z-index:1040}';
    document.head.appendChild(st);
  }

  function init() {
    injectStyle(); pinHeader(); ensureModal(); render();
    document.addEventListener('click', e => {
      if (e.target.closest('[data-unlock]')) { if (window.bootstrap) bootstrap.Modal.getOrCreateInstance(document.getElementById('unlockModal')).show(); }
      if (e.target.closest('[data-lock]')) { store.set(false); render(); }
      const k = e.target.closest('[data-aula-pw]');
      if (k) { e.preventDefault(); e.stopPropagation(); closeKeys(k); }
      const c = e.target.closest('[data-aula-copy]');
      if (c) {
        const done = () => { c.textContent = '¡Copiada!'; setTimeout(() => { c.textContent = 'Copiar'; }, 1500); };
        try { navigator.clipboard.writeText(c.dataset.aulaCopy).then(done, () => { }); } catch (err) { }
        return;
      }
      if (!k && !e.target.closest('.popover')) closeKeys();
    });
    document.addEventListener('keydown', e => { if (e.key === 'Escape') closeKeys(); });
  }
  window.AulaHeader = { isUnlocked: store.get, getMenu, render, initKeys };
  if (document.readyState === 'loading') document.addEventListener('DOMContentLoaded', init); else init();
})();

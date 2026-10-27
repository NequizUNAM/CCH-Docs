/* ============================================================
   aula-datos.js — guardado temporal de datos en el navegador (localStorage)
   Las páginas de Estadística arrancan con sus valores de ejemplo. En cuanto el usuario
   escribe o cambia algo, los datos (tablas, listas, controles) se guardan en este navegador
   y se restauran al volver a abrir la página. Un botón «Borrar datos guardados» los elimina.

   API (la usan las páginas; todo es opcional y falla en silencio si no hay localStorage):
     AulaDatos.link(nombre, objeto, [claves])   → restaura objeto[clave] guardado y lo vigila.
                                                  Llamar ANTES del primer render.
     AulaDatos.controls({ skip:'selector', early:true })
                                              → vigila controles con id o data-in y los restaura: con early se
                                                asignan ya (antes del primer render); sin early, al terminar de
                                                cargar la página y disparando sus eventos.
     AulaDatos.dirty()                          → fuerza un guardado (para cambios sin evento).
   ============================================================ */
(function () {
  const PAGE = (location.pathname.split('/').pop() || 'index').replace(/\.html?$/i, '');
  const NS = 'aula-datos:' + PAGE;
  const ok = (() => { try { const k = '__t'; localStorage.setItem(k, '1'); localStorage.removeItem(k); return true; } catch (e) { return false; } })();
  const read = () => { if (!ok) return {}; try { const o = JSON.parse(localStorage.getItem(NS) || '{}'); return o && typeof o === 'object' ? o : {}; } catch (e) { return {}; } };
  const write = o => { if (!ok) return false; try { localStorage.setItem(NS, JSON.stringify(o)); return true; } catch (e) { return false; } };

  let saved = read();           // { st:{nombre:{clave:valor}}, ctl:[[clave,valor,tipo],...] }
  const links = {};             // nombre -> {obj, keys}
  let wiped = false, ctlOn = false, ctlSkip = '', ctlMap = new Map(), touched = false, timer = 0, restoring = false;
  const has = () => !!(saved.st && Object.keys(saved.st).length) || !!(saved.ctl && saved.ctl.length);

  const same = (a, b) => Array.isArray(a) ? Array.isArray(b) : (a && typeof a === 'object') ? (b && typeof b === 'object' && !Array.isArray(b)) : typeof a === typeof b;

  function link(name, obj, keys) {
    if (!obj) return; links[name] = { obj, keys };
    const s = saved.st && saved.st[name];
    if (s) keys.forEach(k => { if (k in s && k in obj && same(obj[k], s[k])) { try { obj[k] = s[k]; } catch (e) { } } });
    ui();
  }

  /* ---------- clave estable de un control ---------- */
  function keyOf(el) {
    if (!el || !el.matches || !el.matches('input,textarea,select')) return null;
    if (el.matches('[data-enter],[type=password],[type=button],[type=submit],[type=file],#man-q,#anim-sw,#unlockPass,.no-save')) return null;
    if (ctlSkip && el.matches(ctlSkip)) return null;
    if (el.id && !/\$\{/.test(el.id)) return '#' + el.id;
    if (el.dataset && el.dataset.in) return '[in=' + el.dataset.in + (el.dataset.i !== undefined ? ':' + el.dataset.i : '') + ']';
    return null;
  }
  const valOf = el => el.type === 'checkbox' || el.type === 'radio' ? (el.checked ? 1 : 0) : el.value;
  const find = k => {
    if (k[0] === '#') return document.getElementById(k.slice(1));
    const m = k.match(/^\[in=([^:\]]+)(?::(\d+))?\]$/); if (!m) return null;
    return document.querySelector('[data-in="' + m[1] + '"]' + (m[2] !== undefined ? '[data-i="' + m[2] + '"]' : ''));
  };

  /* ---------- guardado ---------- */
  function snapshot() {
    const st = {};
    Object.keys(links).forEach(n => { const { obj, keys } = links[n]; st[n] = {}; keys.forEach(k => { try { st[n][k] = JSON.parse(JSON.stringify(obj[k])); } catch (e) { } }); });
    const out = { st, ctl: ctlOn ? Array.from(ctlMap.entries()).map(([k, v]) => [k, v]) : [] };
    return out;
  }
  /* ¿el control tiene un valor distinto al que trae su HTML? (cubre cambios hechos por botones de la página) */
  const changed = el => el.type === 'checkbox' || el.type === 'radio' ? el.checked !== el.defaultChecked
    : el.tagName === 'SELECT' ? el.selectedIndex !== Math.max(0, Array.from(el.options).findIndex(o => o.defaultSelected))
    : el.value !== el.defaultValue;
  function rescan() {
    document.querySelectorAll('input,textarea,select').forEach(el => {
      const k = keyOf(el); if (!k) return;
      if (ctlMap.has(k)) { ctlMap.delete(k); ctlMap.set(k, valOf(el)); }
      else if (changed(el)) ctlMap.set(k, valOf(el));
    });
  }
  function flush() { clearTimeout(timer); if (!touched || restoring || wiped) return; if (ctlOn) rescan(); saved = snapshot(); write(saved); ui(); }
  function later() { clearTimeout(timer); timer = setTimeout(flush, 350); }

  function onUser(e) {
    if (!e.isTrusted || restoring) return;
    const t = e.target;
    if (ctlOn && (e.type === 'input' || e.type === 'change')) { const k = keyOf(t); if (k) { ctlMap.delete(k); ctlMap.set(k, valOf(t)); touched = true; } }
    if (e.type === 'click' || e.type === 'keyup') { if (!t.closest || !t.closest('#aula-datos-chip')) touched = true; }
    if (touched) later();
  }
  ['input', 'change', 'click', 'keyup'].forEach(ev => document.addEventListener(ev, onUser, true));
  window.addEventListener('pagehide', flush);
  document.addEventListener('visibilitychange', () => { if (document.visibilityState === 'hidden') flush(); });

  /* ---------- controles ---------- */
  function controls(opts) {
    ctlOn = true; ctlSkip = (opts && opts.skip) || '';
    ctlMap = new Map((saved.ctl || []).map(r => [r[0], r[1]]));
    const pend = new Set(ctlMap.keys());
    const run = () => {
      if (!pend.size) return; restoring = true;
      try {
        Array.from(pend).forEach(k => {
          const el = find(k), v = ctlMap.get(k); if (!el) return; pend.delete(k);
          if (el.type === 'checkbox' || el.type === 'radio') { const c = !!+v; if (el.checked === c) return; el.checked = c; } else { if (el.value === String(v)) return; el.value = v; if (el.tagName === 'SELECT' && el.value !== String(v)) return; }
          el.dispatchEvent(new Event('input', { bubbles: true })); el.dispatchEvent(new Event('change', { bubbles: true }));
        });
      } catch (e) { console.error(e); }
      restoring = false;
    };
    /* controles que la página dibuja más tarde (pestañas, secciones): se reintenta tras cada clic */
    document.addEventListener('click', () => { if (pend.size) setTimeout(run, 150); }, true);
    if (opts && opts.early) {            // páginas que leen los valores del DOM en su primer render
      pend.clear();
      ctlMap.forEach((v, k) => { const el = find(k); if (!el) return; if (el.type === 'checkbox' || el.type === 'radio') el.checked = !!+v; else el.value = v; });
      return;
    }
    const go = () => { setTimeout(run, 60); setTimeout(run, 900); };
    if (document.readyState === 'complete') go(); else window.addEventListener('load', go);
  }

  /* ---------- botón para borrar ---------- */
  let chip = null, armed = 0;
  function ui() {
    if (!document.body) { document.addEventListener('DOMContentLoaded', ui, { once: true }); return; }
    if (!has()) { if (chip) chip.hidden = true; return; }
    if (!chip) {
      chip = document.createElement('button'); chip.type = 'button'; chip.id = 'aula-datos-chip';
      chip.style.cssText = 'position:fixed;left:12px;bottom:12px;z-index:1030;border:0;border-radius:999px;padding:.4rem .85rem;font:700 .78rem/1.1 system-ui,sans-serif;background:#0f172a;color:#fff;opacity:.88;box-shadow:0 4px 14px rgba(0,0,0,.28);cursor:pointer';
      chip.addEventListener('click', () => {
        if (!armed) { armed = 1; chip.textContent = '¿Seguro? Pulsa otra vez para borrar'; chip.style.background = '#c92a2a'; setTimeout(() => { armed = 0; label(); }, 4000); return; }
        wiped = true; try { localStorage.removeItem(NS); } catch (e) { } location.reload();
      });
      document.body.appendChild(chip);
    }
    chip.hidden = false; if (!armed) label();
  }
  function label() { if (!chip) return; chip.innerHTML = '<span aria-hidden="true">💾</span> Datos guardados en este navegador · <u>Borrar</u>'; chip.style.background = '#0f172a'; }

  window.AulaDatos = { link, controls, dirty: () => { touched = true; later(); }, clear: () => { wiped = true; try { localStorage.removeItem(NS); } catch (e) { } saved = {}; }, key: NS };
  if (document.readyState === 'loading') document.addEventListener('DOMContentLoaded', ui); else ui();
})();

/* Idriss Auto — app logic. Idea & developed by Idriss Romdhani. */
(function () {
  'use strict';
  const $ = (s, r = document) => r.querySelector(s);
  const $$ = (s, r = document) => Array.from(r.querySelectorAll(s));
  const LS = {
    get: (k, d) => { try { const v = localStorage.getItem(k); return v === null ? d : JSON.parse(v); } catch { return d; } },
    set: (k, v) => { try { localStorage.setItem(k, JSON.stringify(v)); } catch {} }
  };
  const esc = (s) => String(s ?? '').replace(/[&<>"']/g, m => ({ '&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;' }[m]));
  const tr = (o) => o ? (o[lang] || o.en) : '';

  let lang = LS.get('ms_lang', null) || (navigator.language || 'en').slice(0, 2);
  if (!window.I18N[lang]) lang = 'en';
  let capturedImage = null;
  const T = () => window.I18N[lang];

  /* ===================== THEME ===================== */
  const mq = window.matchMedia('(prefers-color-scheme: light)');
  function resolvedTheme() {
    const pref = LS.get('ms_theme', 'system');
    if (pref === 'system') return mq.matches ? 'light' : 'dark';
    return pref;
  }
  function applyTheme() {
    const eff = resolvedTheme();
    document.documentElement.setAttribute('data-theme', eff);
    $('#themeColorMeta').setAttribute('content', eff === 'light' ? '#f5f1ea' : '#0c0d10');
    $('#themeToggle').textContent = eff === 'light' ? '◑' : '◐';
    const pref = LS.get('ms_theme', 'system');
    $$('#themeSeg [data-theme-opt]').forEach(b => b.classList.toggle('active', b.dataset.themeOpt === pref));
  }
  $('#themeToggle').addEventListener('click', () => {
    const eff = resolvedTheme();
    LS.set('ms_theme', eff === 'light' ? 'dark' : 'light'); // explicit flip
    applyTheme();
  });
  $$('#themeSeg [data-theme-opt]').forEach(b => b.addEventListener('click', () => {
    LS.set('ms_theme', b.dataset.themeOpt); applyTheme();
  }));
  mq.addEventListener && mq.addEventListener('change', () => { if (LS.get('ms_theme', 'system') === 'system') applyTheme(); });

  /* ===================== i18n ===================== */
  function applyLang() {
    const t = T();
    document.documentElement.lang = lang;
    document.documentElement.dir = t.dir;
    $('#appName').textContent = t.appName;
    { const tg = $('#tagline'); if (tg) tg.textContent = t.tagline; }
    $$('[data-i]').forEach(el => { const k = el.getAttribute('data-i'); if (t[k] != null) el.textContent = t[k]; });
    $$('[data-ph]').forEach(el => { const k = el.getAttribute('data-ph'); if (t[k] != null) el.setAttribute('placeholder', t[k]); });
    $('#langSelect').value = lang;
    renderCatalog(); closeLearnDetail();
  }

  /* ===================== nav ===================== */
  function showTab(name) {
    $$('.view').forEach(v => v.classList.remove('active'));
    $('#view-' + name).classList.add('active');
    $$('#tabbar button').forEach(b => b.classList.toggle('active', b.dataset.tab === name));
    document.body.className = 'tab-' + name;
    const vid = $('#heroVideo');
    if (vid) { if (name === 'scan') { const p = vid.play(); if (p && p.catch) p.catch(() => {}); } else { try { vid.pause(); } catch {} } }
    if (name !== 'learn') closeLearnDetail();
    if (name === 'cars' && typeof runCarSearch === 'function') runCarSearch();
    if (name === 'ask' && typeof renderMessages === 'function') renderMessages();
    try { window.scrollTo({ top: 0, behavior: 'auto' }); } catch {}
  }
  $$('#tabbar button').forEach(b => b.addEventListener('click', () => showTab(b.dataset.tab)));

  /* ===================== toast ===================== */
  let toastTimer;
  function toast(msg) {
    const el = $('#toast'); el.textContent = msg; el.classList.add('show');
    clearTimeout(toastTimer); toastTimer = setTimeout(() => el.classList.remove('show'), 1600);
  }

  /* ===================== render helpers ===================== */
  const partName = (p) => tr(p.name);
  const catMeta = (c) => window.CATEGORIES[c] || { en: c };
  const catName = (c) => tr(catMeta(c));

  const vehicleRow = (v) => {
    const img = carImage(v.make, v.model);
    const thumb = img ? `<img class="veh-thumb" src="${esc(img)}" alt="" loading="lazy" onerror="this.classList.add('ph')">` : '<span class="veh-thumb ph"></span>';
    return `<div class="veh">${thumb}<span class="vname">${esc(v.make)} ${esc(v.model)}</span><span class="yr">${esc(v.years || v.year || '')}</span></div>`;
  };

  function partImgSrc(p) {
    if (p.image) return p.image;
    const cats = window.CATEGORIES || {};
    if (cats[p.category]) return 'images/parts/' + p.category + '.svg';
    return '';
  }
  function partThumb(p) {
    const src = partImgSrc(p);
    if (!src) return '';
    return `<img class="pthumb" src="${esc(src)}" alt="" loading="lazy" onerror="this.classList.add('miss')">`;
  }
  function partCard(p, opts = {}) {
    const t = T();
    const fits = (p.fits || []).map(vehicleRow).join('');
    const saveBtn = '';
    return `<div class="card part">
      <div class="phead">
        ${partThumb(p)}
        <div class="pinfo">
          <div class="top">
            <span class="name">${esc(partName(p))}</span>
            <span class="tag cat">${esc(catName(p.category))}</span>
          </div>
          <div class="kv">${esc(t.cat_partno)}: <b>${esc(p.partNo || '—')}</b></div>
        </div>
      </div>
      <div class="kv">${esc(t.scan_fits)}:</div>
      <div class="fits">${fits}</div>
      ${saveBtn}
    </div>`;
  }
  function bindSave() { /* garage removed — no-op */ }

  function searchParts(q) {
    q = (q || '').trim().toLowerCase();
    if (!q) return [];
    const norm = s => String(s).toLowerCase().replace(/[\s\-_.]/g, '');
    const nq = norm(q);
    return window.PARTS.filter(p => {
      if (norm(p.partNo).includes(nq)) return true;
      if (p.barcode && norm(p.barcode).includes(nq)) return true;
      if (Object.values(p.name).join(' ').toLowerCase().includes(q)) return true;
      return (p.fits || []).map(v => `${v.make} ${v.model}`).join(' ').toLowerCase().includes(q);
    });
  }

  /* ===================== SCAN ===================== */
  $('#takePhoto').addEventListener('click', () => $('#fileInput').click());
  $('#fileInput').addEventListener('change', (e) => {
    const file = e.target.files && e.target.files[0];
    if (!file) return;
    const reader = new FileReader();
    reader.onload = () => {
      const set = (durl) => { capturedImage = { dataUrl: durl }; $('#preview').innerHTML = `<img src="${durl}" alt="part">`; $('#analyzeBtn').disabled = false; };
      const img = new Image();
      img.onload = () => {
        try {
          const max = 1024; let w = img.naturalWidth, h = img.naturalHeight;
          if (w > max || h > max) { const s = Math.min(max / w, max / h); w = Math.round(w * s); h = Math.round(h * s); }
          const c = document.createElement('canvas'); c.width = w; c.height = h;
          c.getContext('2d').drawImage(img, 0, 0, w, h);
          set(c.toDataURL('image/jpeg', 0.82));
        } catch { set(reader.result); }
      };
      img.onerror = () => set(reader.result);
      img.src = reader.result;
    };
    reader.readAsDataURL(file);
  });
  $('#analyzeBtn').addEventListener('click', analyzePhoto);

  // AI runs through a server-side proxy that holds the secret key.
  // The key is NEVER in this front-end code. Override the URL if your
  // backend lives on another domain by setting window.IDRISS_AI_PROXY.
  const PROXY_URL = (typeof window !== 'undefined' && window.IDRISS_AI_PROXY) || './api/analyze';

  /* ===================== SUPABASE COLLECT ===================== */
  const API = { parts: './api/parts', scanLog: './api/scan-log', submit: './api/submit', feedback: './api/feedback' };
  async function loadRemoteParts() {
    try {
      const r = await fetch(API.parts); if (!r.ok) return;
      const remote = await r.json();
      if (!Array.isArray(remote) || !remote.length) return;
      const byId = new Map(window.PARTS.map(p => [p.id, p]));
      remote.forEach(p => { if (p && p.id && p.name && p.category) byId.set(p.id, p); });
      window.PARTS = Array.from(byId.values());
      renderCatalog();
    } catch {}
  }
  function logScan(d) {
    try {
      fetch(API.scanLog, { method: 'POST', headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ partName: d.partName || '', partNumber: d.partNumber || '', vehicles: d.vehicles || [], confidence: d.confidence || '' }) }).catch(() => {});
    } catch {}
  }
  const sendJSON = (u, b) => fetch(u, { method: 'POST', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify(b) }).then(r => r.json());

  async function analyzePhoto() {
    const t = T(), results = $('#scanResults');
    if (!capturedImage) return;
    const pv = $('#preview');
    pv.classList.add('scan');
    if (!pv.querySelector('.img-scan')) pv.insertAdjacentHTML('beforeend', '<i class="img-scan"></i>');
    $('#scanStatus').innerHTML = `<span class="spinner"></span> ${esc(t.scan_analyzing)}`;
    results.innerHTML = `<div class="card"><div class="skel line" style="width:60%"></div>
      <div class="skel line" style="width:90%"></div><div class="skel line" style="width:75%"></div></div>`;
    try {
      const data = await callProxy(capturedImage.dataUrl);
      renderAIResult(data);
      logScan(data);
    } catch (err) {
      results.innerHTML = `<div class="card"><div class="notice"><strong>${esc(t.scan_err_title)}</strong>${esc(t.scan_err_body)}<br><br><span style="opacity:.7">${esc(String(err.message || err))}</span></div></div>`;
    } finally {
      pv.classList.remove('scan');
      const ln = pv.querySelector('.img-scan'); if (ln) ln.remove();
      $('#scanStatus').textContent = '';
    }
  }

  async function callProxy(dataUrl) {
    const res = await fetch(PROXY_URL, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ image: dataUrl })
    });
    const txt = await res.text();
    let data; try { data = JSON.parse(txt); } catch { data = null; }
    if (!res.ok || !data || data.error) {
      const msg = (data && (data.error || data.detail)) || ('HTTP ' + res.status);
      throw new Error(msg);
    }
    return data;
  }

  function renderAIResult(d) {
    const t = T();
    const conf = { high:'#22c55e', medium:'#f59e0b', low:'#ef4444' }[d.confidence] || 'var(--muted)';
    const vehicles = (d.vehicles || []).map(vehicleRow).join('') || `<div class="muted-row">—</div>`;
    let html = `<div class="card part">
      <div class="top"><span class="name">${esc(d.partName || '?')}</span>
        <span class="tag" style="color:${conf};border-color:${conf}55">${esc(d.confidence || '')}</span></div>
      ${d.partNumber ? `<div class="kv">${esc(t.cat_partno)}: <b>${esc(d.partNumber)}</b></div>` : ''}
      ${d.category ? `<div class="kv">${esc(t.cat_category)}: <b>${esc(d.category)}</b></div>` : ''}
      <div class="kv">${esc(t.scan_fits)}:</div>
      <div class="fits">${vehicles}</div>
      ${d.notes ? `<div class="kv" style="margin-top:8px">${esc(d.notes)}</div>` : ''}
    </div>`;
    const matches = d.partNumber ? searchParts(d.partNumber) : [];
    const more = matches.length ? matches : searchParts((d.partName || '').split(' ')[0]);
    if (more.length) html += more.slice(0, 3).map(p => partCard(p, { save: true })).join('');
    const box = $('#scanResults'); box.innerHTML = html; bindSave(box);
  }

  function runLookup() {
    const found = searchParts($('#lookupInput').value);
    const box = $('#scanResults');
    if (!found.length) { box.innerHTML = `<div class="card"><div class="muted-row">${esc(T().scan_nomatch)}</div></div>`; return; }
    box.innerHTML = found.map(p => partCard(p, { save: true })).join(''); bindSave(box);
  }
  $('#lookupBtn').addEventListener('click', runLookup);
  $('#lookupInput').addEventListener('keydown', e => { if (e.key === 'Enter') runLookup(); });

  /* barcode */
  $('#barcodeBtn').addEventListener('click', startBarcode);
  async function startBarcode() {
    const t = T();
    if (!('BarcodeDetector' in window)) { toast('Type the number instead'); $('#lookupInput').focus(); return; }
    const box = $('#scanResults');
    box.innerHTML = `<div class="card"><video id="bcVideo" playsinline style="width:100%;border-radius:14px;background:#000"></video>
      <button class="btn ghost" id="bcStop" style="margin-top:10px">${esc(t.close)}</button></div>`;
    const video = $('#bcVideo'); let stream;
    try { stream = await navigator.mediaDevices.getUserMedia({ video: { facingMode: 'environment' } }); video.srcObject = stream; await video.play(); }
    catch (e) { box.innerHTML = `<div class="card"><div class="notice">${esc(e.message)}</div></div>`; return; }
    const det = new window.BarcodeDetector(); let active = true;
    const stop = () => { active = false; if (stream) stream.getTracks().forEach(tk => tk.stop()); };
    $('#bcStop').addEventListener('click', () => { stop(); box.innerHTML = ''; });
    const tick = async () => {
      if (!active) return;
      try { const codes = await det.detect(video); if (codes && codes.length) { stop(); $('#lookupInput').value = codes[0].rawValue; runLookup(); return; } } catch {}
      requestAnimationFrame(tick);
    };
    requestAnimationFrame(tick);
  }

  /* ===================== CATALOG ===================== */
  let catFilter = 'all';
  function renderCatalog() {
    const t = T(), chips = $('#catChips');
    const cats = ['all', ...Object.keys(window.CATEGORIES)];
    chips.innerHTML = cats.map(c => {
      const label = c === 'all' ? t.cat_all : catName(c);
      return `<button class="chip ${c === catFilter ? 'active' : ''}" data-cat="${c}">${esc(label)}</button>`;
    }).join('');
    $$('[data-cat]', chips).forEach(b => b.addEventListener('click', () => { catFilter = b.dataset.cat; renderCatalog(); }));
    const q = $('#catSearch').value.trim().toLowerCase();
    let list = window.PARTS.slice();
    if (catFilter !== 'all') list = list.filter(p => p.category === catFilter);
    if (q) list = list.filter(p => (Object.values(p.name).join(' ') + ' ' + p.partNo + ' ' +
      (p.fits || []).map(v => v.make + ' ' + v.model).join(' ')).toLowerCase().includes(q));
    let hero = '';
    if (catFilter !== 'all') {
      const cm = catMeta(catFilter);
      hero = `<div class="cat-hero">${cm.img ? `<img src="${esc(cm.img)}" alt="" loading="lazy" onerror="this.remove()">` : ''}
        <div class="ov">${esc(catName(catFilter))}</div></div>`;
    }
    const box = $('#catList');
    box.innerHTML = hero + (list.length
      ? `<div class="kv" style="margin:0 2px 8px">${list.length} ${esc(t.cat_count)}</div>` + list.map(p => partCard(p, { save: true })).join('')
      : `<div class="muted-row">—</div>`);
    bindSave(box);
  }
  $('#catSearch').addEventListener('input', renderCatalog);

  /* ===================== CARS FINDER ===================== */
  let CARS = null;
  async function loadCars() {
    if (CARS) return CARS;
    try { const r = await fetch('data/vehicles-full.json'); if (r.ok) CARS = await r.json(); } catch {}
    return CARS;
  }
  function titleCase(s) { return String(s || '').replace(/\b\w/g, c => c.toUpperCase()); }
  function carResultCard(c) {
    const t = T();
    const name = `${c.make} ${c.model}`;
    const img = carImage(c.make, c.model);
    const photo = img
      ? `<img class="car-photo" src="${esc(img)}" alt="" loading="lazy" onerror="this.remove()">`
      : '';
    const spec = (label, val) => (val == null || val === '' || val === 0)
      ? '' : `<div class="spec"><span class="sk">${esc(label)}</span><span class="sv">${esc(val)}</span></div>`;
    const disp = c.displacement ? c.displacement + ' L' : '';
    return `<div class="card part">
      ${photo}
      <div class="top"><span class="name">${esc(name)}</span>
        ${c.class ? `<span class="tag cat">${esc(c.class)}</span>` : ''}</div>
      <div class="specgrid">
        ${spec(t.spec_years, c.years)}
        ${spec(t.spec_fuel, titleCase(c.fuel))}
        ${spec(t.spec_cyl, c.cylinders)}
        ${spec(t.spec_disp, disp)}
        ${spec(t.spec_drive, c.drive)}
      </div>
    </div>`;
  }
  async function runCarSearch() {
    const t = T(), box = $('#carsList');
    const q = $('#carSearch').value.trim().toLowerCase();
    if (q.length < 2) { box.innerHTML = `<div class="muted-row">${esc(t.cars_hint)}</div>`; return; }
    const list = await loadCars();
    if (!list) { box.innerHTML = `<div class="muted-row">—</div>`; return; }
    const hits = list.filter(c => (c.make + ' ' + c.model).toLowerCase().includes(q)).slice(0, 60);
    if (!hits.length) { box.innerHTML = `<div class="muted-row">${esc(t.cars_none)}</div>`; return; }
    box.innerHTML = `<div class="kv" style="margin:0 2px 8px">${hits.length} ${esc(t.cars_count)}</div>` +
      hits.map(carResultCard).join('');
  }
  let carTimer;
  const carInput = $('#carSearch');
  if (carInput) {
    carInput.addEventListener('focus', loadCars, { once: true });
    carInput.addEventListener('input', () => { clearTimeout(carTimer); carTimer = setTimeout(runCarSearch, 180); });
    carInput.addEventListener('keydown', e => { if (e.key === 'Enter') runCarSearch(); });
  }

  /* ===================== ASK IDRISS (chat) ===================== */
  const CHAT_URL = (typeof window !== 'undefined' && window.IDRISS_CHAT_PROXY) || './api/chat';
  const getChats = () => LS.get('ms_chats', []);
  const saveChats = (c) => LS.set('ms_chats', c);
  let activeChatId = LS.get('ms_chat_active', null);
  let chatBusy = false;

  function activeChat() {
    const chats = getChats();
    let c = chats.find(x => x.id === activeChatId);
    if (!c) {
      c = { id: 'c' + Date.now(), title: '', msgs: [], updated: Date.now() };
      chats.unshift(c); saveChats(chats); activeChatId = c.id; LS.set('ms_chat_active', c.id);
    }
    return c;
  }
  function persistChat(c) {
    c.updated = Date.now();
    const rest = getChats().filter(x => x.id !== c.id);
    rest.unshift(c); saveChats(rest);
  }
  function newChat() {
    const chats = getChats();
    let empty = chats.find(x => !x.msgs.length);
    if (!empty) { empty = { id: 'c' + Date.now(), title: '', msgs: [], updated: Date.now() }; chats.unshift(empty); saveChats(chats); }
    activeChatId = empty.id; LS.set('ms_chat_active', empty.id);
    $('#chatHistory').classList.add('hidden');
    renderMessages(); const i = $('#chatInput'); if (i) i.focus();
  }
  function renderContent(content) {
    if (Array.isArray(content)) {
      return content.map(p => p && p.type === 'image_url'
        ? `<img class="chat-att-img" src="${esc((p.image_url && p.image_url.url) || '')}" alt="">`
        : `<span>${esc((p && p.text) || '')}</span>`).join('');
    }
    return esc(content);
  }
  function bubble(m) {
    const av = m.role === 'assistant' ? '<span class="bav">IR</span>' : '';
    return `<div class="bubble ${m.role}">${av}<div class="btext">${renderContent(m.content)}</div></div>`;
  }
  /* ---- attachments ---- */
  let pendingImg = null, pendingFile = null;
  function renderAtt() {
    const box = $('#chatAtt'); if (!box) return;
    if (!pendingImg && !pendingFile) { box.classList.add('hidden'); box.innerHTML = ''; return; }
    box.classList.remove('hidden');
    box.innerHTML = pendingImg
      ? `<div class="attchip"><img src="${esc(pendingImg.dataUrl)}" alt=""><button class="attx" id="attClear">✕</button></div>`
      : `<div class="attchip file"><span>${esc(pendingFile.name)}</span><button class="attx" id="attClear">✕</button></div>`;
    const x = $('#attClear'); if (x) x.addEventListener('click', () => { pendingImg = null; pendingFile = null; renderAtt(); });
  }
  function downscaleImage(file) {
    return new Promise(resolve => {
      const reader = new FileReader();
      reader.onload = () => {
        const img = new Image();
        img.onload = () => {
          try {
            const max = 1024; let w = img.naturalWidth, h = img.naturalHeight;
            if (w > max || h > max) { const s = Math.min(max / w, max / h); w = Math.round(w * s); h = Math.round(h * s); }
            const c = document.createElement('canvas'); c.width = w; c.height = h;
            c.getContext('2d').drawImage(img, 0, 0, w, h);
            resolve(c.toDataURL('image/jpeg', 0.82));
          } catch { resolve(reader.result); }
        };
        img.onerror = () => resolve(reader.result);
        img.src = reader.result;
      };
      reader.readAsDataURL(file);
    });
  }
  async function handleChatFile(file) {
    if (!file) return;
    if (file.type && file.type.startsWith('image/')) {
      pendingImg = { dataUrl: await downscaleImage(file) }; pendingFile = null; renderAtt();
    } else if ((file.type && file.type.startsWith('text/')) || /\.(txt|csv|log|json|md)$/i.test(file.name)) {
      if (file.size > 300 * 1024) { toast(T().ask_file_err); return; }
      const text = await (file.text ? file.text() : Promise.resolve('')).catch(() => '');
      pendingFile = { name: file.name, text: String(text).slice(0, 8000) }; pendingImg = null; renderAtt();
    } else {
      toast(T().ask_file_err);
    }
  }
  /* ---- voice ---- */
  let mediaRec = null, recChunks = [], recStream = null, recording = false;
  function blobToDataUrl(blob) { return new Promise(r => { const fr = new FileReader(); fr.onload = () => r(fr.result); fr.readAsDataURL(blob); }); }
  async function toggleMic() {
    const mic = $('#chatMic');
    if (recording) { try { mediaRec.stop(); } catch {} return; }
    if (!navigator.mediaDevices || !window.MediaRecorder) { toast(T().ask_voice_err); return; }
    try { recStream = await navigator.mediaDevices.getUserMedia({ audio: true }); }
    catch { toast(T().ask_voice_err); return; }
    recChunks = [];
    let mime = 'audio/webm';
    try { if (!MediaRecorder.isTypeSupported(mime)) mime = MediaRecorder.isTypeSupported('audio/mp4') ? 'audio/mp4' : ''; } catch { mime = ''; }
    try { mediaRec = mime ? new MediaRecorder(recStream, { mimeType: mime }) : new MediaRecorder(recStream); }
    catch { mediaRec = new MediaRecorder(recStream); }
    mediaRec.ondataavailable = e => { if (e.data && e.data.size) recChunks.push(e.data); };
    mediaRec.onstop = async () => {
      recording = false; mic.classList.remove('rec');
      if (recStream) recStream.getTracks().forEach(t => t.stop());
      const blob = new Blob(recChunks, { type: (mediaRec && mediaRec.mimeType) || 'audio/webm' });
      if (!blob.size) return;
      mic.classList.add('busy');
      try {
        const dataUrl = await blobToDataUrl(blob);
        const res = await fetch('./api/transcribe', { method: 'POST', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify({ audio: dataUrl, mime: blob.type, lang }) });
        const data = await res.json().catch(() => null);
        if (res.ok && data && data.text) { const i = $('#chatInput'); i.value = (i.value ? i.value + ' ' : '') + data.text; autoGrow(); i.focus(); }
        else toast((data && data.error) || T().ask_voice_err);
      } catch { toast(T().ask_voice_err); }
      finally { mic.classList.remove('busy'); }
    };
    mediaRec.start();
    recording = true; mic.classList.add('rec'); toast(T().ask_rec);
  }
  function renderMessages() {
    const t = T(), box = $('#chatMessages'); if (!box) return;
    const c = activeChat();
    if (!c.msgs.length && !chatBusy) {
      box.innerHTML = `<div class="chat-empty">
        <div class="av big">IR</div>
        <div class="ce-title">${esc(t.ask_title)}</div>
        <div class="ce-sub">${esc(t.ask_sub)}</div>
        <div class="ce-ex">
          <button class="ex" data-ex="${esc(t.ask_ex1)}">${esc(t.ask_ex1)}</button>
          <button class="ex" data-ex="${esc(t.ask_ex2)}">${esc(t.ask_ex2)}</button>
          <button class="ex" data-ex="${esc(t.ask_ex3)}">${esc(t.ask_ex3)}</button>
        </div></div>`;
      $$('[data-ex]', box).forEach(b => b.addEventListener('click', () => { $('#chatInput').value = b.dataset.ex; sendMessage(); }));
      return;
    }
    box.innerHTML = c.msgs.map(bubble).join('') +
      (chatBusy ? `<div class="bubble assistant"><span class="bav">IR</span><div class="btext typing"><i></i><i></i><i></i></div></div>` : '');
    box.scrollTop = box.scrollHeight;
  }
  function renderHistory() {
    const t = T(), box = $('#chatHistory');
    const chats = getChats().filter(x => x.msgs.length);
    box.innerHTML = (chats.length ? chats.map(c => `<div class="hrow ${c.id === activeChatId ? 'on' : ''}" data-open="${esc(c.id)}">
        <span class="ht">${esc(c.title || (c.msgs[0] && c.msgs[0].content.slice(0, 40)) || '—')}</span>
        <button class="hx" data-del="${esc(c.id)}">✕</button></div>`).join('') : `<div class="muted-row">—</div>`) +
      (chats.length ? `<button class="btn ghost" id="chatClearAll" style="margin-top:8px">${esc(t.ask_clear)}</button>` : '');
    $$('[data-open]', box).forEach(b => b.addEventListener('click', (e) => {
      if (e.target.closest('[data-del]')) return;
      activeChatId = b.dataset.open; LS.set('ms_chat_active', activeChatId);
      box.classList.add('hidden'); renderMessages();
    }));
    $$('[data-del]', box).forEach(b => b.addEventListener('click', () => {
      saveChats(getChats().filter(x => x.id !== b.dataset.del));
      if (b.dataset.del === activeChatId) activeChatId = null;
      renderHistory(); renderMessages();
    }));
    const clr = $('#chatClearAll');
    if (clr) clr.addEventListener('click', () => { saveChats([]); activeChatId = null; renderHistory(); renderMessages(); });
  }
  function outboundMsgs(msgs) {
    // Keep payload small: full image only on the LAST message; older images -> text note.
    const slice = msgs.slice(-16);
    return slice.map((m, i) => {
      if (Array.isArray(m.content) && i < slice.length - 1) {
        const txt = m.content.filter(p => p.type === 'text').map(p => p.text).join(' ');
        return { role: m.role, content: (txt + ' [image]').trim() };
      }
      return m;
    });
  }
  async function sendMessage() {
    if (chatBusy) return;
    const input = $('#chatInput'); const text = (input.value || '').trim();
    if (!text && !pendingImg && !pendingFile) return;
    const c = activeChat();
    let content;
    if (pendingImg) {
      let t2 = text || '';
      if (pendingFile) t2 += (t2 ? '\n\n' : '') + '[File: ' + pendingFile.name + ']\n' + pendingFile.text;
      content = [{ type: 'text', text: t2 || 'Please look at this image.' }, { type: 'image_url', image_url: { url: pendingImg.dataUrl } }];
    } else if (pendingFile) {
      content = (text ? text + '\n\n' : '') + '[File: ' + pendingFile.name + ']\n' + pendingFile.text;
    } else {
      content = text;
    }
    c.msgs.push({ role: 'user', content });
    if (!c.title) c.title = (text || (pendingImg ? 'Image' : pendingFile ? pendingFile.name : '')).slice(0, 40);
    persistChat(c);
    input.value = ''; autoGrow(); pendingImg = null; pendingFile = null; renderAtt();
    chatBusy = true; renderMessages();
    try {
      const res = await fetch(CHAT_URL, { method: 'POST', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify({ messages: outboundMsgs(c.msgs) }) });
      const txt = await res.text(); let data; try { data = JSON.parse(txt); } catch { data = null; }
      if (!res.ok || !data || data.error || !data.reply) throw new Error((data && (data.error || data.detail)) || ('HTTP ' + res.status));
      c.msgs.push({ role: 'assistant', content: data.reply });
    } catch (err) {
      c.msgs.push({ role: 'assistant', content: T().ask_error + '\n\n(' + (err.message || err) + ')' });
    } finally {
      persistChat(c); chatBusy = false; renderMessages();
    }
  }
  function autoGrow() { const i = $('#chatInput'); if (!i) return; i.style.height = 'auto'; i.style.height = Math.min(i.scrollHeight, 140) + 'px'; }
  (function initChat() {
    const send = $('#chatSend'), input = $('#chatInput'), nb = $('#chatNewBtn'), hb = $('#chatHistoryBtn');
    if (send) send.addEventListener('click', sendMessage);
    if (input) {
      input.addEventListener('input', autoGrow);
      input.addEventListener('keydown', e => { if (e.key === 'Enter' && !e.shiftKey) { e.preventDefault(); sendMessage(); } });
    }
    if (nb) nb.addEventListener('click', newChat);
    if (hb) hb.addEventListener('click', () => { const h = $('#chatHistory'); if (h.classList.contains('hidden')) renderHistory(); h.classList.toggle('hidden'); });
    const attach = $('#chatAttach'), fileEl = $('#chatFile'), mic = $('#chatMic');
    if (attach && fileEl) attach.addEventListener('click', () => fileEl.click());
    if (fileEl) fileEl.addEventListener('change', e => { const f = e.target.files && e.target.files[0]; handleChatFile(f); fileEl.value = ''; });
    if (mic) mic.addEventListener('click', toggleMic);
  })();

  /* ===================== LEARN HUB ===================== */
  $$('[data-learn]').forEach(b => b.addEventListener('click', () => openLearn(b.dataset.learn)));
  $('#learnBack').addEventListener('click', closeLearnDetail);

  function closeLearnDetail() { $('#learnDetail').classList.add('hidden'); $('#learnHub').classList.remove('hidden'); }

  function openLearn(section) {
    const t = T();
    let title = '', body = '';
    if (section === 'guides') {
      title = t.learn_guides;
      body = window.GUIDES.map(g => {
        const steps = tr(g.steps).map(s => `<li>${esc(s)}</li>`).join('');
        return `<details><summary><span>${esc(tr(g.title))}</span><span class="arr">▸</span></summary>
          <div class="guide"><div class="meta">
            <span class="tag">${esc(t.guides_interval)}: ${esc(tr(g.interval))}</span>
            <span class="tag">${esc(tr(g.tools))}</span></div>
            <div class="kv"><b>${esc(t.guides_steps)}</b></div><ol>${steps}</ol></div></details>`;
      }).join('');
    } else if (section === 'lights') {
      title = t.learn_lights;
      body = window.WARNING_LIGHTS.map(w => `<div class="krow">
        <div class="body"><div class="t">${esc(tr(w.name))} <span class="sev ${w.sev}">${esc(t['sev_' + w.sev])}</span></div>
        <div class="d">${esc(tr(w.meaning))}</div></div></div>`).join('');
    } else if (section === 'obd') {
      title = t.learn_obd;
      body = window.OBD_CODES.map(o => `<div class="krow">
        <div class="body"><div class="t"><span class="code">${esc(o.code)}</span> ${esc(tr(o.name))}</div>
        <div class="d"><b>${esc(t.obd_fix)}:</b> ${esc(tr(o.fix))}</div></div></div>`).join('');
    } else if (section === 'fluids') {
      title = t.learn_fluids;
      body = window.FLUIDS.map(f => `<div class="krow">
        <div class="body"><div class="t">${esc(tr(f.name))} <span class="tag">${esc(t.fluids_interval)}: ${esc(tr(f.interval))}</span></div>
        <div class="d">${esc(tr(f.use))}</div></div></div>`).join('');
    } else if (section === 'tools') {
      title = t.learn_tools;
      body = window.TOOLS_GLOSSARY.map(x => `<div class="krow">
        <div class="body"><div class="t">${esc(tr(x.name))}</div><div class="d">${esc(tr(x.use))}</div></div></div>`).join('');
    }
    $('#learnDetailTitle').textContent = title;
    $('#learnDetailBody').innerHTML = body;
    $('#learnHub').classList.add('hidden');
    $('#learnDetail').classList.remove('hidden');
    try { window.scrollTo({ top: 0, behavior: 'auto' }); } catch {}
  }

  /* ===================== CAR IMAGES ===================== */
  // Real car photos (from the bundled Cars Dataset) — matched by model, then make.
  const CAR_BY_MODEL = { innova:'toyota-innova', creta:'hyundai-creta', scorpio:'mahindra-scorpio', safari:'tata-safari', swift:'swift', mustang:'ford-mustang' };
  const CAR_BY_MAKE = {
    audi:'audi', bentley:'bentley', mercedes:'benz', 'mercedes-benz':'benz', benz:'benz',
    bmw:'bmw', cadillac:'cadillac', dodge:'dodge', ferrari:'ferrari', ford:'ford',
    kia:'kia', lamborghini:'lamborghini', lexus:'lexus', maserati:'maserati', porsche:'porsche',
    'rolls royce':'rolls-royce', 'rolls-royce':'rolls-royce', rollsroyce:'rolls-royce',
    tesla:'tesla', toyota:'toyota', 'alfa romeo':'alfa-romeo', 'alfa-romeo':'alfa-romeo', alfa:'alfa-romeo',
    hyundai:'hyundai', mahindra:'mahindra-scorpio', tata:'tata-safari', suzuki:'swift', maruti:'swift'
  };
  function carImage(make, model) {
    const md = (model || '').toLowerCase(), mk = (make || '').toLowerCase();
    for (const k in CAR_BY_MODEL) if (md.includes(k)) return 'images/cars/' + CAR_BY_MODEL[k] + '.jpg';
    for (const k in CAR_BY_MAKE) if (mk.includes(k)) return 'images/cars/' + CAR_BY_MAKE[k] + '.jpg';
    return '';
  }
  /* ===================== SETTINGS ===================== */
  function openSettings() { applyTheme(); $('#settingsModal').classList.add('open'); }
  const closeSettings = () => $('#settingsModal').classList.remove('open');
  $('#openSettings').addEventListener('click', openSettings);
  $('#closeSettings').addEventListener('click', closeSettings);
  $('#settingsModal').addEventListener('click', e => { if (e.target.id === 'settingsModal') closeSettings(); });

  /* ===================== language ===================== */
  $('#langSelect').addEventListener('change', e => { lang = e.target.value; LS.set('ms_lang', lang); applyLang(); });

  /* ===================== contribute forms (About) ===================== */
  const fbBtn = $('#fbSend');
  if (fbBtn) fbBtn.addEventListener('click', async () => {
    const message = $('#fbMsg').value.trim();
    if (!message) { $('#fbMsg').focus(); return; }
    fbBtn.disabled = true;
    try {
      const r = await sendJSON(API.feedback, { message, contact: $('#fbContact').value.trim() });
      if (r && r.ok) { $('#fbMsg').value = ''; $('#fbContact').value = ''; toast(T().sent_thanks); }
      else { toast(T().send_fail); }
    } catch { toast(T().send_fail); } finally { fbBtn.disabled = false; }
  });
  const sgBtn = $('#sgSend');
  if (sgBtn) sgBtn.addEventListener('click', async () => {
    const name = $('#sgName').value.trim();
    if (!name) { $('#sgName').focus(); return; }
    sgBtn.disabled = true;
    const payload = { name, partNumber: $('#sgNumber').value.trim(), vehicles: $('#sgVehicles').value.trim() };
    try {
      const r = await sendJSON(API.submit, { kind: 'part', source: 'manual', payload });
      if (r && r.ok) { $('#sgName').value = $('#sgNumber').value = $('#sgVehicles').value = ''; toast(T().sent_thanks); }
      else { toast(T().send_fail); }
    } catch { toast(T().send_fail); } finally { sgBtn.disabled = false; }
  });

  /* ===================== vehicle autocomplete (Garage) ===================== */
  let VEHICLES = null;
  async function loadVehicles() {
    if (VEHICLES) return VEHICLES;
    try {
      const r = await fetch('data/vehicles.json'); if (!r.ok) return null;
      VEHICLES = await r.json();
      const ml = $('#makeList');
      if (ml && VEHICLES.makes) ml.innerHTML = VEHICLES.makes.map(m => `<option value="${esc(m)}"></option>`).join('');
    } catch {}
    return VEHICLES;
  }
  function fillModels(make) {
    const dl = $('#modelList'); if (!dl || !VEHICLES) return;
    const key = (VEHICLES.makes || []).find(m => m.toLowerCase() === (make || '').toLowerCase());
    const models = (key && VEHICLES.byMake[key]) || [];
    dl.innerHTML = models.slice(0, 1500).map(m => `<option value="${esc(m)}"></option>`).join('');
  }
  (function initVehicleAC() {
    const gMakeEl = $('#gMake'), gModelEl = $('#gModel');
    if (gMakeEl) {
      gMakeEl.addEventListener('focus', loadVehicles, { once: true });
      gMakeEl.addEventListener('input', () => { if (VEHICLES) fillModels(gMakeEl.value); });
      gMakeEl.addEventListener('change', () => fillModels(gMakeEl.value));
    }
    if (gModelEl) gModelEl.addEventListener('focus', async () => { await loadVehicles(); fillModels(($('#gMake') || {}).value || ''); }, { once: true });
  })();

  /* ===================== boot ===================== */
  applyTheme();
  applyLang();
  showTab('scan');
  loadRemoteParts();
  if ('serviceWorker' in navigator) window.addEventListener('load', () => navigator.serviceWorker.register('sw.js').catch(() => {}));
})();
/* Idriss Auto — build ok */

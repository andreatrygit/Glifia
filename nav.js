(function () {
  const pages = [
    { file: 'identikit.html',                     num: '',      title: 'Identikit' },
    { file: 'prova-casa-nuova.html',              num: '·',     title: 'La casa è nuova' },
    { file: 'tavola-2-marcatori.html',            num: 'II',    title: 'Articoli e marcatori' },
    { file: 'tavola-3-preposizioni.html',         num: 'III',   title: 'Le preposizioni' },
    { file: 'tavola-4-bambini-parco.html',        num: 'IV',    title: 'I bambini nel parco' },
    { file: 'tavola-5-zaino-bambino.html',        num: 'V',     title: 'Lo zaino del bambino' },
    { file: 'tavola-6-numerali.html',             num: 'VI',    title: 'I numerali' },
    { file: 'tavola-7-pronomi.html',              num: 'VII',   title: 'I pronomi' },
    { file: 'tavola-8-cane-mangiato.html',        num: 'VIII',  title: 'Il mio cane' },
    { file: 'tavola-9-agg-possessivi.html',       num: 'IX',    title: 'Aggettivi possessivi' },
    { file: 'tavola-10-interrogativi.html',       num: 'X',     title: 'Pronomi interrogativi' },
    { file: 'tavola-11-indefiniti-quantita.html', num: 'XI',    title: 'Indefiniti di quantità' },
    { file: 'tavola-12-tuoi-bambini.html',        num: 'XII',   title: 'I tuoi bambini' },
    { file: 'tavola-13-bambino-marco.html',       num: 'XIII',  title: 'Il bambino di Marco' },
    { file: 'tipografia-lateralita.html',         num: '·',     title: 'Tipografia · Lateralità' },
  ];

  const cur = location.pathname.split('/').pop() || pages[0].file;
  const idx = pages.findIndex(p => p.file === cur);
  const prev = idx > 0 ? pages[idx - 1] : null;
  const next = idx < pages.length - 1 ? pages[idx + 1] : null;

  const nav = document.createElement('nav');
  nav.id = 'gnav';
  nav.innerHTML =
    `<a class="gnav-arr" href="${prev ? prev.file : '#'}" ${!prev ? 'aria-disabled="true" tabindex="-1"' : ''} title="${prev ? prev.title : ''}">‹</a>` +
    `<button class="gnav-idx" id="gnav-btn" aria-label="Indice">INDICE</button>` +
    `<a class="gnav-arr" href="${next ? next.file : '#'}" ${!next ? 'aria-disabled="true" tabindex="-1"' : ''} title="${next ? next.title : ''}">›</a>`;

  const overlay = document.createElement('div');
  overlay.id = 'gnav-overlay';
  overlay.innerHTML =
    `<div id="gnav-panel">` +
    `<div id="gnav-panel-header">GLIFIA · INDICE</div>` +
    `<ul>` +
    pages.map((p, i) =>
      `<li${i === idx ? ' class="gnav-cur"' : ''}><a href="${p.file}">` +
      `<span class="gnav-num">${p.num}</span>` +
      `<span class="gnav-title">${p.title}</span></a></li>`
    ).join('') +
    `</ul></div>`;

  document.body.appendChild(nav);
  document.body.appendChild(overlay);

  document.getElementById('gnav-btn').addEventListener('click', () => {
    overlay.classList.toggle('open');
  });
  overlay.addEventListener('click', e => {
    if (e.target === overlay) overlay.classList.remove('open');
  });
  document.addEventListener('keydown', e => {
    if (e.key === 'Escape') overlay.classList.remove('open');
  });
})();

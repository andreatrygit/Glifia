(function () {
  const groups = [
    {
      label: '',
      pages: [
        { file: 'identikit.html', num: '', title: 'Identikit' },
      ]
    },
    {
      label: 'ARTICOLI',
      pages: [
        { file: 'articoli/tavola-2-marcatori.html', num: 'II', title: 'Articoli e marcatori' },
      ]
    },
    {
      label: 'PREPOSIZIONI',
      pages: [
        { file: 'preposizioni/tavola-3-preposizioni.html', num: 'III', title: 'Le preposizioni' },
      ]
    },
    {
      label: 'NUMERALI',
      pages: [
        { file: 'numerali/tavola-6-numerali.html', num: 'VI', title: 'I numerali' },
      ]
    },
    {
      label: 'PRONOMI',
      pages: [
        { file: 'pronomi/tavola-7-pronomi.html',              num: 'VII', title: 'I pronomi personali' },
        { file: 'pronomi/tavola-10-interrogativi.html',       num: 'X',   title: 'Pronomi interrogativi' },
        { file: 'pronomi/tavola-11-indefiniti-quantita.html', num: 'XI',  title: 'Indefiniti di quantità' },
      ]
    },
    {
      label: 'AGGETTIVI',
      pages: [
        { file: 'aggettivi/tavola-9-agg-possessivi.html', num: 'IX', title: 'Aggettivi possessivi' },
      ]
    },
    {
      label: 'FRASI',
      pages: [
        { file: 'frasi/prova-casa-nuova.html',         num: '·',    title: 'La casa è nuova' },
        { file: 'frasi/tavola-4-bambini-parco.html',   num: 'IV',   title: 'I bambini nel parco' },
        { file: 'frasi/tavola-5-zaino-bambino.html',   num: 'V',    title: 'Lo zaino del bambino' },
        { file: 'frasi/tavola-8-cane-mangiato.html',   num: 'VIII', title: 'Il mio cane' },
        { file: 'frasi/tavola-12-tuoi-bambini.html',   num: 'XII',  title: 'I tuoi bambini' },
        { file: 'frasi/tavola-13-bambino-marco.html',  num: 'XIII', title: 'Il bambino di Marco' },
      ]
    },
    {
      label: '',
      pages: [
        { file: 'tipografia-lateralita.html', num: '·', title: 'Tipografia · Lateralità' },
      ]
    },
  ];

  const pages = groups.flatMap(g => g.pages);

  const path = location.pathname;
  const idx = pages.findIndex(p => path.endsWith(p.file.replaceAll('/', '/')));
  const cur = idx >= 0 ? pages[idx] : null;

  function relHref(targetFile) {
    if (!cur) return targetFile;
    const depth = cur.file.includes('/') ? 1 : 0;
    return '../'.repeat(depth) + targetFile;
  }

  const prev = idx > 0 ? pages[idx - 1] : null;
  const next = idx < pages.length - 1 ? pages[idx + 1] : null;

  const nav = document.createElement('nav');
  nav.id = 'gnav';
  nav.innerHTML =
    `<a class="gnav-arr" href="${prev ? relHref(prev.file) : '#'}" ${!prev ? 'aria-disabled="true" tabindex="-1"' : ''} title="${prev ? prev.title : ''}">‹</a>` +
    `<button class="gnav-idx" id="gnav-btn" aria-label="Indice">INDICE</button>` +
    `<a class="gnav-arr" href="${next ? relHref(next.file) : '#'}" ${!next ? 'aria-disabled="true" tabindex="-1"' : ''} title="${next ? next.title : ''}">›</a>`;

  let listHTML = '';
  groups.forEach(group => {
    if (group.label) {
      listHTML += `<li class="gnav-group-label">${group.label}</li>`;
    }
    group.pages.forEach(p => {
      const isCur = cur && p.file === cur.file;
      listHTML +=
        `<li${isCur ? ' class="gnav-cur"' : ''}><a href="${relHref(p.file)}">` +
        `<span class="gnav-num">${p.num}</span>` +
        `<span class="gnav-title">${p.title}</span></a></li>`;
    });
  });

  const overlay = document.createElement('div');
  overlay.id = 'gnav-overlay';
  overlay.innerHTML =
    `<div id="gnav-panel">` +
    `<div id="gnav-panel-header">GLIFIA · INDICE</div>` +
    `<ul>${listHTML}</ul></div>`;

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

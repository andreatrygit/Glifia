(function () {
  const groups = [
    {
      label: '',
      pages: [
        { file: 'index.html',                  title: 'Identikit' },
        { file: 'tipografia-lateralita.html',  title: 'Tipografia · Lateralità' },
      ]
    },
    {
      label: 'ARTICOLI',
      pages: [
        { file: 'articoli/marcatori.html', title: 'Articoli e marcatori' },
      ]
    },
    {
      label: 'PREPOSIZIONI',
      pages: [
        { file: 'preposizioni/preposizioni.html', title: 'Le preposizioni' },
      ]
    },
    {
      label: 'NUMERALI',
      pages: [
        { file: 'numerali/numerali.html', title: 'I numerali' },
      ]
    },
    {
      label: 'PRONOMI',
      pages: [
        { file: 'pronomi/pronomi.html',              title: 'I pronomi personali' },
        { file: 'pronomi/interrogativi.html',         title: 'Pronomi interrogativi' },
        { file: 'pronomi/indefiniti-quantita.html',   title: 'Indefiniti di quantità' },
      ]
    },
    {
      label: 'AGGETTIVI',
      pages: [
        { file: 'aggettivi/agg-possessivi.html', title: 'Aggettivi possessivi' },
      ]
    },
    {
      label: 'FRASI',
      pages: [
        { file: 'frasi/prova-casa-nuova.html',  title: 'La casa è nuova' },
        { file: 'frasi/bambini-parco.html',      title: 'I bambini nel parco' },
        { file: 'frasi/zaino-bambino.html',      title: 'Lo zaino del bambino' },
        { file: 'frasi/cane-mangiato.html',      title: 'Il mio cane' },
        { file: 'frasi/tuoi-bambini.html',       title: 'I tuoi bambini' },
        { file: 'frasi/bambino-marco.html',      title: 'Il bambino di Marco' },
      ]
    },
  ];

  const pages = groups.flatMap(g => g.pages);

  const path = location.pathname;
  const idx = pages.findIndex(p => path.endsWith(p.file));
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

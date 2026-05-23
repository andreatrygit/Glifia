(function () {
  const svg = document.createElementNS('http://www.w3.org/2000/svg', 'svg');
  svg.setAttribute('aria-hidden', 'true');
  svg.style.cssText = 'position:absolute;width:0;height:0;overflow:hidden';
  svg.innerHTML = `

  <!-- ── containers — viewBox 0 0 120 120, interior 12 12 96 96, cells 8×8 ── -->

  <symbol id="container-sostantivo" viewBox="0 0 120 120">
    <rect x="12" y="12" width="96" height="96" fill="none" stroke="#000" stroke-width="3"/>
  </symbol>
  <symbol id="container-verbo" viewBox="0 0 120 120">
    <circle cx="60" cy="60" r="48" fill="none" stroke="#000" stroke-width="3"/>
  </symbol>
  <symbol id="container-aggettivo" viewBox="0 0 120 120">
    <path d="M 12 12 L 108 12 L 108 108 L 12 108" fill="none" stroke="#000" stroke-width="3" stroke-linecap="round"/>
  </symbol>
  <symbol id="container-avverbio" viewBox="0 0 120 120">
    <path d="M 60 12 A 48 48 0 0 1 60 108" fill="none" stroke="#000" stroke-width="3" stroke-linecap="round"/>
  </symbol>
  <symbol id="container-pronome" viewBox="0 0 120 120">
    <path d="M 12 12 L 12 108 L 108 108 L 108 12" fill="none" stroke="#000" stroke-width="3" stroke-linecap="round"/>
  </symbol>

  <!-- RTL variants — opening/direction mirrored -->
  <symbol id="container-aggettivo-rtl" viewBox="0 0 120 120">
    <path d="M 108 12 L 12 12 L 12 108 L 108 108" fill="none" stroke="#000" stroke-width="3" stroke-linecap="round"/>
  </symbol>
  <symbol id="container-avverbio-rtl" viewBox="0 0 120 120">
    <path d="M 60 12 A 48 48 0 0 0 60 108" fill="none" stroke="#000" stroke-width="3" stroke-linecap="round"/>
  </symbol>

  <symbol id="prep-a-rtl" viewBox="0 0 110 80">
    <line x1="100" y1="40" x2="20" y2="40" stroke="#000" stroke-width="3" stroke-linecap="round"/>
    <polygon points="10,40 25,32 25,48" fill="#000"/>
  </symbol>
  <symbol id="prep-da-rtl" viewBox="0 0 110 80">
    <line x1="10" y1="40" x2="90" y2="40" stroke="#000" stroke-width="3" stroke-linecap="round"/>
    <polygon points="100,40 85,32 85,48" fill="#000"/>
  </symbol>
  <symbol id="prep-di-rtl" viewBox="0 0 110 80">
    <path d="M 80 25 Q 55 25 55 40 Q 55 55 30 55" fill="none" stroke="#000" stroke-width="3" stroke-linecap="round"/>
  </symbol>

  <!-- ── figures — viewBox 0 0 100 100 ── -->

  <symbol id="casa" viewBox="0 0 100 100">
    <polygon points="50,8 90,45 10,45" fill="#000"/>
    <rect x="14" y="44" width="72" height="50" fill="none" stroke="#000" stroke-width="3"/>
    <rect x="40" y="62" width="20" height="32" fill="none" stroke="#000" stroke-width="2"/>
  </symbol>

  <symbol id="omino" viewBox="0 0 100 100">
    <circle cx="50" cy="16" r="14" fill="none" stroke="#000" stroke-width="3"/>
    <line x1="50" y1="30" x2="50" y2="63" stroke="#000" stroke-width="2.5" stroke-linecap="round"/>
    <line x1="50" y1="43" x2="22" y2="58" stroke="#000" stroke-width="2.5" stroke-linecap="round"/>
    <line x1="50" y1="43" x2="78" y2="58" stroke="#000" stroke-width="2.5" stroke-linecap="round"/>
    <line x1="50" y1="63" x2="32" y2="93" stroke="#000" stroke-width="2.5" stroke-linecap="round"/>
    <line x1="50" y1="63" x2="68" y2="93" stroke="#000" stroke-width="2.5" stroke-linecap="round"/>
  </symbol>

  <!-- ── diacritics — viewBox 0 0 100 100 ── -->

  <symbol id="diacritic-possessivo" viewBox="0 0 100 100">
    <line x1="50" y1="5" x2="50" y2="58" stroke="#000" stroke-width="4" stroke-linecap="round"/>
    <polygon points="50,82 26,54 74,54" fill="#000"/>
  </symbol>

  <symbol id="diacritic-oggetto" viewBox="0 0 100 100">
    <line x1="95" y1="50" x2="22" y2="50" stroke="#000" stroke-width="4" stroke-linecap="round"/>
    <polygon points="5,50 28,28 28,72" fill="#000"/>
  </symbol>

  <symbol id="diacritic-riflessivo" viewBox="0 0 100 100">
    <path d="M 68 10 A 35 35 0 1 1 12 65" fill="none" stroke="#000" stroke-width="4" stroke-linecap="round"/>
    <polygon points="7,84 2,58 26,66" fill="#000"/>
  </symbol>

  <!-- ── person numbers — viewBox 0 0 100 100 ── -->

  <symbol id="number-1" viewBox="0 0 100 100">
    <text x="50" y="50" text-anchor="middle" dominant-baseline="central"
          font-family="Georgia, serif" font-size="80" fill="#000">1</text>
  </symbol>
  <symbol id="number-2" viewBox="0 0 100 100">
    <text x="50" y="50" text-anchor="middle" dominant-baseline="central"
          font-family="Georgia, serif" font-size="80" fill="#000">2</text>
  </symbol>
  <symbol id="number-3" viewBox="0 0 100 100">
    <text x="50" y="50" text-anchor="middle" dominant-baseline="central"
          font-family="Georgia, serif" font-size="80" fill="#000">3</text>
  </symbol>

  <!-- ── marks — viewBox 0 0 100 100 ── -->

  <symbol id="person-plural-line" viewBox="0 0 1 1" preserveAspectRatio="none">
    <rect width="1" height="1" fill="#000"/>
  </symbol>

  <symbol id="plural-line" viewBox="0 0 1 1" preserveAspectRatio="none">
    <rect width="1" height="1" fill="#000"/>
  </symbol>

  <symbol id="det-line" viewBox="0 0 1 1" preserveAspectRatio="none">
    <rect width="1" height="1" fill="#000"/>
  </symbol>

  <symbol id="indet-line" viewBox="0 0 1 1" preserveAspectRatio="none">
    <rect width="1" height="1" fill="#000"/>
  </symbol>

  <!-- ── prepositions — viewBox 0 0 110 80 ── -->

  <symbol id="prep-a" viewBox="0 0 110 80">
    <line x1="10" y1="40" x2="90" y2="40" stroke="#000" stroke-width="3" stroke-linecap="round"/>
    <polygon points="100,40 85,32 85,48" fill="#000"/>
  </symbol>

  <symbol id="prep-da" viewBox="0 0 110 80">
    <line x1="20" y1="40" x2="100" y2="40" stroke="#000" stroke-width="3" stroke-linecap="round"/>
    <polygon points="10,40 25,32 25,48" fill="#000"/>
  </symbol>

  <symbol id="prep-per" viewBox="0 0 110 80">
    <line x1="10" y1="40" x2="41" y2="40" stroke="#000" stroke-width="3" stroke-linecap="round"/>
    <line x1="59" y1="40" x2="90" y2="40" stroke="#000" stroke-width="3" stroke-linecap="round"/>
    <polygon points="100,40 85,32 85,48" fill="#000"/>
    <circle cx="50" cy="40" r="7" fill="none" stroke="#000" stroke-width="2"/>
  </symbol>

  <symbol id="prep-in" viewBox="0 0 110 80">
    <circle cx="55" cy="40" r="22" fill="none" stroke="#000" stroke-width="2.5"/>
    <circle cx="55" cy="40" r="5" fill="#000"/>
  </symbol>

  <symbol id="prep-su" viewBox="0 0 110 80">
    <line x1="30" y1="52" x2="80" y2="52" stroke="#000" stroke-width="3" stroke-linecap="round"/>
    <line x1="55" y1="52" x2="55" y2="20" stroke="#000" stroke-width="3" stroke-linecap="round"/>
  </symbol>

  <symbol id="prep-di" viewBox="0 0 110 80">
    <path d="M 30 25 Q 55 25 55 40 Q 55 55 80 55" fill="none" stroke="#000" stroke-width="3" stroke-linecap="round"/>
  </symbol>

  <symbol id="prep-tra" viewBox="0 0 110 80">
    <line x1="22" y1="40" x2="42" y2="40" stroke="#000" stroke-width="3" stroke-linecap="round"/>
    <circle cx="55" cy="40" r="4.5" fill="#000"/>
    <line x1="68" y1="40" x2="88" y2="40" stroke="#000" stroke-width="3" stroke-linecap="round"/>
  </symbol>

  <symbol id="prep-con" viewBox="0 0 110 80">
    <line x1="47" y1="18" x2="47" y2="62" stroke="#000" stroke-width="3" stroke-linecap="round"/>
    <line x1="63" y1="18" x2="63" y2="62" stroke="#000" stroke-width="3" stroke-linecap="round"/>
  </symbol>

  `;
  document.body.insertBefore(svg, document.body.firstChild);
})();

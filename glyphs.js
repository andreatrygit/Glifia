(function () {
  const svg = document.createElementNS('http://www.w3.org/2000/svg', 'svg');
  svg.setAttribute('aria-hidden', 'true');
  svg.style.cssText = 'position:absolute;width:0;height:0;overflow:hidden';
  svg.innerHTML = `

  <!-- ── contenitori fondamentali ── -->
  <symbol id="container-sostantivo" viewBox="0 0 60 60">
    <rect x="6" y="6" width="48" height="48" fill="none" stroke="#000" stroke-width="3"/>
  </symbol>
  <symbol id="container-verbo" viewBox="0 0 60 60">
    <circle cx="30" cy="30" r="24" fill="none" stroke="#000" stroke-width="3"/>
  </symbol>
  <symbol id="container-aggettivo" viewBox="0 0 60 60">
    <path d="M 6 6 L 54 6 L 54 54 L 6 54" fill="none" stroke="#000" stroke-width="3" stroke-linecap="round"/>
  </symbol>
  <symbol id="container-avverbio" viewBox="0 0 60 60">
    <path d="M 30 6 A 24 24 0 0 1 30 54" fill="none" stroke="#000" stroke-width="3" stroke-linecap="round"/>
  </symbol>
  <symbol id="container-pronome" viewBox="0 0 60 60">
    <path d="M 6 6 L 6 54 L 54 54 L 54 6" fill="none" stroke="#000" stroke-width="3" stroke-linecap="round"/>
  </symbol>

  `;
  document.body.insertBefore(svg, document.body.firstChild);
})();

;(function () {
  'use strict'

  const NS     = 'http://www.w3.org/2000/svg'
  const BASE   = 120                           // matches container symbol viewBox
  const INNER  = { x: 12, y: 12, w: 96, h: 96 }  // container interior in BASE space
  const CW     = INNER.w / 12                  // cell width  = 8 exactly
  const CH     = INNER.h / 12                  // cell height = 8 exactly
  const STROKE = 3                             // container stroke-width = mark thickness

  // col/row: 1-based; negative or > 12 reaches outside the container
  function cellRect(col, row, cs, rs) {
    return {
      x: INNER.x + (col - 1) * CW,
      y: INNER.y + (row - 1) * CH,
      w: cs * CW,
      h: rs * CH,
    }
  }

  // ── compositor ────────────────────────────────────────────────────────────
  //
  // compose(containerId, slots) → SVGElement
  //
  // containerId: key matching a "container-{id}" symbol in glyphs.js
  // slots: Array of either:
  //   { part, col, row, colSpan?, rowSpan? }  — grid-based placement
  //   { part, x, y, w, h }                   — absolute placement in BASE space
  //
  // Each slot becomes: <use href="#part" x y width height/>
  // SVG maps the symbol's viewBox into that rectangle automatically.

  function compose(containerId, slots) {
    const partsMarkup = slots.map(slot => {
      let x, y, w, h
      if ('x' in slot) {
        ;({ x, y, w, h } = slot)
      } else {
        ;({ x, y, w, h } = cellRect(slot.col, slot.row, slot.colSpan ?? 1, slot.rowSpan ?? 1))
      }
      return `<use href="#${slot.part}" x="${x}" y="${y}" width="${w}" height="${h}"/>`
    }).join('\n')

    const svg = document.createElementNS(NS, 'svg')
    svg.setAttribute('viewBox', `0 0 ${BASE} ${BASE}`)
    svg.setAttribute('width', BASE)
    svg.setAttribute('height', BASE)
    svg.setAttribute('overflow', 'visible')
    svg.innerHTML =
      `<use href="#container-${containerId}" x="0" y="0" width="${BASE}" height="${BASE}"/>\n` +
      partsMarkup
    return svg
  }

  // ── mark helpers — absolute coords so thickness and gap are exact ─────────

  // distance from container edge = STROKE, thickness = STROKE
  const MX = INNER.x - STROKE / 2        // mark x start = container exterior left
  const MW = INNER.w + STROKE            // mark width   = container exterior width
  const MY = INNER.y - STROKE / 2        // mark y start = container exterior top
  const MH = INNER.h + STROKE            // mark height  = container exterior height

  const pluralMark    = { part: 'plural-line', x: MX,                          y: INNER.y + INNER.h + STROKE * 2, w: MW,     h: STROKE }
  const detMark       = { part: 'det-line',    x: MX,                          y: INNER.y - STROKE * 3,           w: MW,     h: STROKE }
  const indetMark     = { part: 'indet-line',  x: INNER.x - STROKE * 3,        y: MY,                             w: STROKE, h: MH }
  const indetMarkRtl  = { part: 'indet-line',  x: INNER.x + INNER.w + STROKE * 2, y: MY,                          w: STROKE, h: MH }

  // ── direction ─────────────────────────────────────────────────────────────

  // Reads the page's computed direction so callers don't have to pass dir
  // explicitly. Explicit dir arguments always override this.
  function getDir() {
    return getComputedStyle(document.documentElement).direction || 'ltr'
  }

  // Containers aggettivo and avverbio have RTL symbol variants; others are symmetric.
  const RTL_CONTAINER_VARIANTS = new Set(['aggettivo', 'avverbio'])

  function resolveContainer(type, dir) {
    return dir === 'rtl' && RTL_CONTAINER_VARIANTS.has(type) ? type + '-rtl' : type
  }

  // ── helpers — grammar lives here, compositor stays dumb ───────────────────

  function container(id) {
    return compose(id, [])
  }

  // Any figure inside sostantivo, optional article / plural
  const NOUN_PAD = 6  // breathing room between figure and container walls

  function noun(figure, { plural = false, article, dir = getDir() } = {}) {
    const slots = [
      { part: figure,
        x: INNER.x + NOUN_PAD, y: INNER.y + NOUN_PAD,
        w: INNER.w - NOUN_PAD * 2, h: INNER.h - NOUN_PAD * 2 },
    ]
    if (plural)              slots.push(pluralMark)
    if (article === 'det')   slots.push(detMark)
    if (article === 'indet') slots.push(dir === 'rtl' ? indetMarkRtl : indetMark)
    return compose('sostantivo', slots)
  }

  // number: NUM_COLS wide, placed immediately left of omino (cols NUM_COL–OMINO_COL-1)
  // left margin (cols 1–NUM_COL-1) keeps the group from hugging the container wall
  const NUM_COLS  = 3
  const OMINO_COL = 6
  const NUM_COL   = OMINO_COL - NUM_COLS   // 3

  // person-plural underline: spans the number zone only
  const personPluralMark = {
    part: 'person-plural-line',
    x: INNER.x + (NUM_COL - 1) * CW + NUM_COLS * CW * 0.25,
    y: INNER.y + INNER.h * 0.65,
    w: NUM_COLS * CW,
    h: STROKE * 0.5,
  }

  // Omino in pronome container, optional diacritic + person number + plurals
  function pronoun(person, { diacritic, personPlural = false, wordPlural = false } = {}) {
    const slots = [
      { part: 'omino',            col: OMINO_COL, row: 1, colSpan: 13 - OMINO_COL, rowSpan: 12 },
      { part: `number-${person}`, col: NUM_COL, row: 1, colSpan: NUM_COLS + 1, rowSpan: 12 },
    ]
    if (diacritic)    slots.push({ part: `diacritic-${diacritic}`, x: INNER.x + (NUM_COL - 1) * CW + NUM_COLS * CW * 0.25, y: INNER.y, w: NUM_COLS * CW, h: 7 * CH })
    if (personPlural) slots.push(personPluralMark)
    if (wordPlural)   slots.push(pluralMark)
    return compose('pronome', slots)
  }

  // Same layout as pronoun but aggettivo container, possessivo diacritic always present
  function possAdj(person, { personPlural = false, wordPlural = false } = {}) {
    const slots = [
      { part: 'omino',                col: OMINO_COL, row: 1, colSpan: 13 - OMINO_COL, rowSpan: 12 },
      { part: 'diacritic-possessivo', x: INNER.x + (NUM_COL - 1) * CW + NUM_COLS * CW * 0.25, y: INNER.y, w: NUM_COLS * CW, h: 7 * CH },
      { part: `number-${person}`,     col: NUM_COL, row: 1, colSpan: NUM_COLS + 1, rowSpan: 12 },
    ]
    if (personPlural) slots.push(personPluralMark)
    if (wordPlural)   slots.push(pluralMark)
    return compose('aggettivo', slots)
  }

  // ── prep — standalone preposition glyph, direction-aware ─────────────────

  const PREP_VB           = '0 0 110 80'
  const RTL_PREP_VARIANTS = new Set(['a', 'da', 'di', 'per'])

  // type: semantic name ('a', 'da', 'di', 'in', …) or explicit full name ('a-rtl').
  // Explicit '-rtl' suffixes pass through unchanged (used in documentation pages
  // that show both variants side by side).
  function prep(type, { dir = getDir() } = {}) {
    const symbol = !type.endsWith('-rtl') && dir === 'rtl' && RTL_PREP_VARIANTS.has(type)
      ? type + '-rtl'
      : type
    const svg = document.createElementNS(NS, 'svg')
    svg.setAttribute('viewBox', PREP_VB)
    svg.setAttribute('width', '110')
    svg.setAttribute('height', '80')
    svg.setAttribute('overflow', 'visible')
    svg.innerHTML = `<use href="#prep-${symbol}"/>`
    return svg
  }

  // ── numeral — digit in a container, optional ordinal or multiplicative diacritic ──

  function numeral(digit, containerType, { diacritic, dir = getDir() } = {}) {
    const str      = String(digit)
    const hasDiac  = !!diacritic
    const rtl      = dir === 'rtl'
    const fontSize = str.length > 1 ? 32 : 40
    // In LTR the diacritic sits to the right → shift digit left.
    // In RTL the diacritic sits to the left  → shift digit right.
    const digitX   = hasDiac
      ? INNER.x + INNER.w * (rtl ? 0.60 : 0.40)
      : INNER.x + INNER.w * 0.5
    const digitY   = INNER.y + INNER.h * 0.63
    const diacChar = diacritic === 'ordinale' ? '°' : '+'
    const diacSize = diacritic === 'moltiplicatore' ? 22 : 20
    const diacW    = diacritic === 'moltiplicatore' ? 'bold' : 'normal'
    const diacX    = digitX + (rtl ? -1 : 1) * fontSize * 0.42
    const diacY    = digitY - fontSize * 0.58

    const svg = document.createElementNS(NS, 'svg')
    svg.setAttribute('viewBox', `0 0 ${BASE} ${BASE}`)
    svg.setAttribute('width', BASE)
    svg.setAttribute('height', BASE)
    svg.setAttribute('overflow', 'visible')
    svg.innerHTML = [
      `<use href="#container-${resolveContainer(containerType, dir)}" x="0" y="0" width="${BASE}" height="${BASE}"/>`,
      `<text x="${digitX}" y="${digitY}" text-anchor="middle" font-family="Georgia, serif" font-size="${fontSize}" fill="#000">${str}</text>`,
      hasDiac ? `<text x="${diacX}" y="${diacY}" text-anchor="middle" font-family="Georgia, serif" font-size="${diacSize}" font-weight="${diacW}" fill="#000">${diacChar}</text>` : '',
    ].join('\n')
    return svg
  }

  window.Glifia = { compose, container, noun, pronoun, possAdj, numeral, prep, getDir }

})()

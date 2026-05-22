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

  const pluralMark  = { part: 'plural-line', x: MX,               y: INNER.y + INNER.h + STROKE * 2, w: MW,  h: STROKE }
  const detMark     = { part: 'det-line',    x: MX,               y: INNER.y - STROKE * 3,           w: MW,  h: STROKE }
  const indetMark   = { part: 'indet-line',  x: INNER.x - STROKE * 3, y: MY,                         w: STROKE, h: MH }

  // ── helpers — grammar lives here, compositor stays dumb ───────────────────

  function container(id) {
    return compose(id, [])
  }

  // Any figure inside sostantivo, optional article / plural
  function noun(figure, { plural = false, article } = {}) {
    const slots = [
      { part: figure, col: 1, row: 1, colSpan: 12, rowSpan: 12 },
    ]
    if (plural)              slots.push(pluralMark)
    if (article === 'det')   slots.push(detMark)
    if (article === 'indet') slots.push(indetMark)
    return compose('sostantivo', slots)
  }

  // Omino in pronome container, optional diacritic + person number + plurals
  function pronoun(person, { diacritic, personPlural = false, wordPlural = false } = {}) {
    const numRow = personPlural ? 7 : 8
    const slots = [
      { part: 'omino',            col: 6, row: 1,      colSpan: 7, rowSpan: 12 },
      { part: `number-${person}`, col: 1, row: numRow, colSpan: 5, rowSpan: 4  },
    ]
    if (diacritic)    slots.push({ part: `diacritic-${diacritic}`, col: 1, row: 1,  colSpan: 5, rowSpan: 7 })
    if (personPlural) slots.push({ part: 'person-plural-line',      col: 1, row: 11, colSpan: 5, rowSpan: 2 })
    if (wordPlural)   slots.push(pluralMark)
    return compose('pronome', slots)
  }

  // Same layout as pronoun but aggettivo container, possessivo diacritic always present
  function possAdj(person, { personPlural = false, wordPlural = false } = {}) {
    const numRow = personPlural ? 7 : 8
    const slots = [
      { part: 'omino',                col: 6, row: 1,      colSpan: 7, rowSpan: 12 },
      { part: 'diacritic-possessivo', col: 1, row: 1,      colSpan: 5, rowSpan: 7  },
      { part: `number-${person}`,     col: 1, row: numRow, colSpan: 5, rowSpan: 4  },
    ]
    if (personPlural) slots.push({ part: 'person-plural-line', col: 1, row: 11, colSpan: 5, rowSpan: 2 })
    if (wordPlural)   slots.push(pluralMark)
    return compose('aggettivo', slots)
  }

  window.Glifia = { compose, container, noun, pronoun, possAdj }

})()

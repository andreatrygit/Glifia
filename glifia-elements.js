;(function () {
  'use strict'

  const G = () => window.Glifia

  function define(tag, render) {
    customElements.define(tag, class extends HTMLElement {
      connectedCallback() { this._render() }
      attributeChangedCallback() { this._render() }
      static get observedAttributes() {
        return ['type', 'figure', 'person', 'diacritic', 'article',
                'plural', 'person-plural', 'word-plural', 'dir']
      }
      _render() {
        const svg = render(this)
        if (!svg) return
        this.innerHTML = ''
        this.appendChild(svg)
      }
    })
  }

  const PREP_VB = '0 0 110 80'

  define('glifia-prep', el => {
    const type = el.getAttribute('type')
    if (!type) return null
    const svg = document.createElementNS('http://www.w3.org/2000/svg', 'svg')
    svg.setAttribute('viewBox', PREP_VB)
    svg.setAttribute('width', '110')
    svg.setAttribute('height', '80')
    svg.innerHTML = `<use href="#prep-${type}"/>`
    return svg
  })

  define('glifia-container', el => {
    const type = el.getAttribute('type')
    if (!type) return null
    return G().container(type)
  })

  define('glifia-noun', el => {
    const figure = el.getAttribute('figure')
    if (!figure) return null
    return G().noun(figure, {
      plural:  el.hasAttribute('plural'),
      article: el.getAttribute('article') ?? undefined,
      dir:     el.getAttribute('dir') ?? 'ltr',
    })
  })

  define('glifia-pronoun', el => {
    const person = el.getAttribute('person')
    if (!person) return null
    return G().pronoun(Number(person), {
      diacritic:    el.getAttribute('diacritic') ?? undefined,
      personPlural: el.hasAttribute('person-plural'),
      wordPlural:   el.hasAttribute('word-plural'),
    })
  })

  define('glifia-poss-adj', el => {
    const person = el.getAttribute('person')
    if (!person) return null
    return G().possAdj(Number(person), {
      personPlural: el.hasAttribute('person-plural'),
      wordPlural:   el.hasAttribute('word-plural'),
    })
  })

})()

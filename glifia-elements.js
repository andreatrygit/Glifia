;(function () {
  'use strict'

  const G = () => window.Glifia

  function define(tag, render) {
    customElements.define(tag, class extends HTMLElement {
      connectedCallback() { this._render() }
      attributeChangedCallback() { this._render() }
      static get observedAttributes() {
        return ['type', 'figure', 'person', 'diacritic', 'article',
                'plural', 'person-plural', 'word-plural', 'dir',
                'digit', 'container', 'referent', 'mode']
      }
      _render() {
        const svg = render(this)
        if (!svg) return
        this.innerHTML = ''
        this.appendChild(svg)
      }
    })
  }

  define('glifia-prep', el => {
    const type = el.getAttribute('type')
    if (!type) return null
    return G().prep(type, {
      dir: el.getAttribute('dir') ?? undefined,
    })
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
      dir:     el.getAttribute('dir') ?? undefined,
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

  define('glifia-interrogative', el => {
    const referent = el.getAttribute('referent')
    if (!referent) return null
    return G().interrogative(referent, {
      mode: el.getAttribute('mode') ?? 'interrogativo',
    })
  })

  define('glifia-numeral', el => {
    const digit     = el.getAttribute('digit')
    const container = el.getAttribute('container')
    if (!digit || !container) return null
    return G().numeral(digit, container, {
      diacritic: el.getAttribute('diacritic') ?? undefined,
      dir:       el.getAttribute('dir') ?? undefined,
    })
  })

})()

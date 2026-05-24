# Glifia — codebase guide

Glifia is a visual constructed language where grammar is geometry. Each part of speech has a geometric container (square = noun, circle = verb, open square = adjective, etc.) and pictograms live inside them. All rendering is SVG, no external dependencies.

---

## Architecture

There are three shared JS files loaded by every page, in this exact order:

```
glyphs.js          → SVG sprite sheet (all <symbol> definitions)
composer.js        → composition engine + grammar helpers
glifia-elements.js → custom HTML elements wrapping the composer
```

### glyphs.js

Injects a hidden `<svg>` into `<body>` with all symbol definitions. Symbols fall into groups:

- **Containers** — `container-sostantivo`, `container-verbo`, `container-aggettivo`, `container-avverbio`, `container-pronome` (+ `-rtl` variants for aggettivo and avverbio)
- **Figures** — `omino`, `casa` (pictograms placed inside containers)
- **Diacritics** — `diacritic-possessivo`, `diacritic-oggetto`, `diacritic-riflessivo`
- **Person numbers** — `number-1`, `number-2`, `number-3`
- **Marks** — `plural-line`, `det-line`, `indet-line`, `person-plural-line` (all `preserveAspectRatio="none"` solid rectangles)
- **Prepositions** — `prep-a`, `prep-da`, `prep-per`, `prep-in`, `prep-su`, `prep-di`, `prep-tra`, `prep-con` (+ `-rtl` variants for directional ones)

All symbols share a coordinate system: containers use `viewBox="0 0 120 120"` with interior `12 12 96 96`. Figures use `viewBox="0 0 100 100"`. Prepositions use `viewBox="0 0 110 80"`.

### composer.js

Exported as `window.Glifia`. Constants:

- `BASE = 120` — the master viewBox size
- `INNER = { x:12, y:12, w:96, h:96 }` — container interior
- `CW = 8`, `CH = 8` — grid cell size (12×12 grid inside the interior)

Public API:

| Function | Description |
|---|---|
| `compose(containerId, slots)` | Core primitive. Renders a container symbol with `<use>` slots placed on top. Slots can be grid-based `{part, col, row, colSpan?, rowSpan?}` or absolute `{part, x, y, w, h}`. |
| `container(id)` | Bare container, no content. |
| `noun(figure, opts)` | Figure inside sostantivo. Opts: `plural`, `article` (`'det'`/`'indet'`), `dir` (`'ltr'`/`'rtl'`). |
| `pronoun(person, opts)` | Omino + person number in pronome. Opts: `diacritic`, `personPlural`, `wordPlural`. |
| `possAdj(person, opts)` | Same layout as pronoun but in aggettivo container, with possessivo diacritic always present. |
| `prep(type, opts)` | Standalone preposition SVG. `type` is the semantic name (`'a'`, `'da'`, `'di'`, `'in'`, …). Directional preps auto-select their `-rtl` variant based on `dir`. Explicit full names like `'a-rtl'` pass through unchanged (for documentation pages showing both variants). |
| `numeral(digit, containerType, opts)` | Digit string in any container. Opts: `diacritic` (`'ordinale'`/`'moltiplicatore'`). Renders `<text>` directly (not via symbols, since digits are parametric). |
| `getDir()` | Reads `getComputedStyle(document.documentElement).direction`. Used as the default `dir` in all direction-aware functions. |

### glifia-elements.js

Defines custom elements that map HTML attributes to composer calls:

| Element | Key attributes |
|---|---|
| `<glifia-container type="…">` | `type` = any container name (including rtl variants) |
| `<glifia-prep type="…">` | `type` = any prep symbol name (e.g. `a`, `da-rtl`) |
| `<glifia-noun figure="…">` | `figure`, `article`, `plural`, `dir` |
| `<glifia-pronoun person="…">` | `person`, `diacritic`, `person-plural`, `word-plural` |
| `<glifia-poss-adj person="…">` | `person`, `person-plural`, `word-plural` |
| `<glifia-numeral digit="…" container="…">` | `digit`, `container`, `diacritic` |

All elements re-render on any attribute change via `attributeChangedCallback`.

---

## What "refactoring a page" means

Old pages (pre-refactor) render glyphs as **raw inline SVG** — hardcoded `<path>`, `<text>`, and `<rect>` elements written directly in the HTML. These:

- duplicate the geometry that already lives in `glyphs.js`
- have no connection to the shared coordinate system
- are hard to maintain (changing a container shape requires editing every page)
- don't load `glyphs.js` / `composer.js` / `glifia-elements.js` at all

**A refactored page** replaces inline SVG blocks with custom elements and loads the three shared scripts. For example:

```html
<!-- before -->
<svg width="90" height="90" viewBox="0 0 90 90">
  <path d="M 10 10 L 80 10 L 80 80 L 10 80" fill="none" stroke="#000" stroke-width="2.5"/>
  <text x="45" y="57" font-family="Georgia, serif" font-size="30" fill="#000">3</text>
</svg>

<!-- after -->
<glifia-numeral digit="3" container="aggettivo"></glifia-numeral>
```

The refactored version reads from the canonical symbol definitions, so any design change propagates everywhere automatically.

---

## Adding a new glyph type

1. Add its `<symbol>` to `glyphs.js`.
2. Add a composer function to `composer.js` and export it via `window.Glifia`.
3. Add a custom element to `glifia-elements.js`. If it uses new attributes, add them to `observedAttributes`.
4. Use the element in HTML pages.

---

## LTR / RTL

The system has first-class RTL support:

- **Neutral glyphs** (sostantivo, verbo, pronome) — identical in both directions.
- **Lateral-opening glyphs** (aggettivo, avverbio, articolo indeterminativo) — RTL variants exist as separate symbols (`container-aggettivo-rtl`, etc.) and the `indetMarkRtl` mark places the vertical line on the right side.
- **Directional glyphs** (preposizioni `a`, `da`, `di`) — RTL variants mirror horizontally (`prep-a-rtl`, etc.).

---

## Pages

Each HTML page is standalone. Pages load the scripts with relative paths (`../glyphs.js` from subdirectories). Sections follow a consistent pattern: `.section-label` → `<hr>` → `.section-text` → glyphs → optional `.note-box`. Layout classes (`.glyphs-row`, `.glyph-item`, `.phrase-glifia`, `.word`) come from `glifia.css`.

Navigation is handled by `nav.js` (fixed bottom pill, previous/next/index).

# Glifia

**Un linguaggio visivo a base geometrica** — *Edizione I, MMXXVI*

> «In Glifia la grammatica è la geometria.  
> Ogni parte del discorso ha la sua forma; ogni parola vive dentro la propria forma.»

---

## Cos'è Glifia

Glifia è una lingua artificiale visuale in cui la struttura grammaticale è codificata nella geometria dei segni. Anziché affidarsi a parole scritte con lettere, Glifia usa **forme geometriche come contenitori**: ogni parte del discorso ha la propria forma, e il concetto (reso con un pittogramma) vive all'interno di quella forma.

Il sistema è indipendente dall'alfabeto e progettato per adattarsi sia alle scritture LTR (sinistra → destra, come l'italiano) che RTL (destra → sinistra, come l'arabo e l'ebraico).

---

## Le forme fondamentali — Tavola I

| Forma | Parte del discorso | Descrizione |
|---|---|---|
| Quadrato chiuso | **Sostantivo** | oggetto, persona, concetto |
| Cerchio | **Verbo** | azione, essere, movimento |
| Quadrato aperto verso il «prima» | **Aggettivo** | qualità del sostantivo |
| Semicerchio aperto verso il «prima» | **Avverbio** | modifica il verbo |
| Quadrato aperto in alto | **Pronome** | sostituto del sostantivo |

Il «prima» è il lato da cui si inizia a leggere: sinistra in LTR, destra in RTL.

---

## Marcatori — Tavola II

I marcatori non sono parole autonome: sono segni accessori che si aggiungono alla forma ospite.

| Posizione | Significato |
|---|---|
| Linea spessa **sopra** | Articolo determinativo (*il, la, i, le*) |
| Linea verticale nel **«prima»** | Articolo indeterminativo (*un, una*) |
| Linea spessa **sotto** | Plurale |

Le tre posizioni sono universali e si applicano a qualsiasi forma del sistema.

---

## Preposizioni — Tavola III

Le preposizioni non abitano una forma: stanno *tra* le forme. Sono segni lineari senza contenitore.

**Famiglia della direzione:** `a` (freccia →), `da` (freccia ←), `per` (freccia → con cerchio)

**Famiglia della posizione:** `in` (cerchio con punto), `su` (T rovesciata), `con` (due linee parallele)

**Famiglia della relazione:** `di` (curva discendente), `tra/fra` (punto tra due tratti)

Le preposizioni direzionali (`a`, `da`, `per`) si **specchiano** in RTL, conservando il significato. Le preposizioni simmetriche (`in`, `su`, `con`, `tra/fra`) restano invariate.

---

## Numerali — Tavola VI

Il numerale non ha un contenitore proprio: eredita quello della funzione che svolge nella frase.

| Tipo | Segno | Esempio |
|---|---|---|
| Cardinale | cifra nuda | *tre, venti* |
| Ordinale | cifra + `°` in alto nel «dopo» | *terzo, quinto* |
| Moltiplicatore | cifra + `+` in alto nel «dopo» | *doppio, triplo* |

---

## Pronomi — Tavola VII

Contenitore: quadrato aperto in alto. All'interno: figura umana + numero di persona (1, 2, 3).

| Diacritico | Tipo |
|---|---|
| nessuno | soggetto (*io, tu, lui…*) |
| `←` sopra il numero | oggetto (*mi, ti, lo…*) |
| `↺` sopra il numero | riflessivo (*mi, ti, si…*) |
| `↓` sopra il numero | possessivo (*mio, tuo, suo…*) |

Lineetta sotto il numero = plurale della persona. Linea sotto il contenitore = plurale del pronome.

---

## Pronomi interrogativi ed esclamativi — Tavola X

Stesso contenitore del pronome (quadrato aperto in alto). Diacritico `?` o `!` nel «prima» interno, pittogramma del referente nel «dopo» interno.

I quattro interrogativi di base: *chi?* (persona), *cosa?* (oggetto), *quale?* (scelta tra alternative), *come/quanto?* (qualità/quantità).

---

## Indefiniti di quantità — Tavola XI

Gli indefiniti di quantità usano una **barra di scala** con un indicatore mobile: la posizione dell'indicatore esprime il grado (da «troppo poco» a «troppo»). Il contenitore varia a seconda della funzione grammaticale (pronome, aggettivo).

---

## Lateralità e direzione — Tipografia

Glifia classifica i propri glifi in tre categorie rispetto alla direzione di lettura:

1. **Glifi neutri** — simmetrici, identici in LTR e RTL (cerchio del verbo, quadrato chiuso del sostantivo, pronome).
2. **Glifi con apertura laterale** — l'apertura punta verso il «prima» della lingua ospite (aggettivo, avverbio, articolo indeterminativo).
3. **Glifi direzionali** — si specchiano in RTL, conservando il significato semantico (preposizioni direzionali `a`, `da`, `per`, `di`).

---

## Struttura del repository

| File | Contenuto |
|---|---|
| `identikit.html` | Presentazione del progetto · Tavola I — le forme |
| `tavola-2-marcatori.html` | Articoli e marcatori (determinativo, indeterminativo, plurale) |
| `tavola-3-preposizioni.html` | Le preposizioni |
| `tavola-4-bambini-parco.html` | Frase di esempio: *I bambini giocano nel parco* |
| `tavola-5-zaino-bambino.html` | Frase di esempio: *Lo zaino del bambino è caduto a terra* |
| `tavola-6-numerali.html` | Numerali cardinali, ordinali, moltiplicatori |
| `tavola-7-pronomi.html` | Pronomi personali |
| `tavola-8-cane-mangiato.html` | Frase di esempio: *Il mio cane ha mangiato tre volte* |
| `tavola-9-agg-possessivi.html` | Aggettivi possessivi |
| `tavola-10-interrogativi.html` | Pronomi interrogativi ed esclamativi |
| `tavola-11-indefiniti-quantita.html` | Indefiniti di quantità |
| `tavola-12-tuoi-bambini.html` | Frase di esempio |
| `tavola-13-bambino-marco.html` | Frase di esempio |
| `tipografia-lateralita.html` | Regole di lateralità LTR/RTL |
| `prova-casa-nuova.html` | Tavola di prova |

Ogni file è autonomo — nessuna dipendenza esterna, nessun framework. I glifi sono tutti SVG inline.

---

## Come visualizzare

Aprire qualsiasi file `.html` direttamente nel browser. Non è richiesto un server web.

---

## Stato del progetto

Edizione I in sviluppo attivo. Le tavole coprono le parti fondamentali del sistema (forme, marcatori, preposizioni, numerali, pronomi, interrogativi, indefiniti). Sono in corso di definizione le tavole sui tempi verbali e sul lessico pittografico di base.

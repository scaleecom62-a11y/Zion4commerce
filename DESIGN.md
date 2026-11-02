---
name: Zion4Commerce
description: Marketplace growth agency site, set as a loud flat street poster held in check by a strict grid.
colors:
  accent-navy: "#002845"
  accent-ink: "#ffffff"
  accent-on-dark: "#9cbccd"
  field-mist: "#dce8ef"
  field-steel: "#9cbccd"
  field-navy: "#002845"
  field-night: "#001a2e"
  paper: "#f5f7f8"
  ink: "#0b1620"
  soft-on-paper: "#44535f"
  soft-on-mist: "#33495a"
  soft-on-steel: "#16344b"
  soft-on-navy: "#b6cbd8"
  soft-on-night: "#a9bfcc"
  input-white: "#ffffff"
  error-red: "#a3112f"
typography:
  display:
    fontFamily: "Big Shoulders, Arial Narrow, sans-serif"
    fontSize: "min(20vw, 30svh)"
    fontWeight: 800
    lineHeight: 0.86
    letterSpacing: "-0.005em"
  headline:
    fontFamily: "Big Shoulders, Arial Narrow, sans-serif"
    fontSize: "clamp(2.5rem, 1.2rem + 5vw, 5.5rem)"
    fontWeight: 800
    lineHeight: 0.9
    letterSpacing: "-0.005em"
  title:
    fontFamily: "Big Shoulders, Arial Narrow, sans-serif"
    fontSize: "clamp(2rem, 1.4rem + 2vw, 3.25rem)"
    fontWeight: 800
    lineHeight: 0.95
  title-text:
    fontFamily: "Public Sans, system-ui, sans-serif"
    fontSize: "clamp(1.5rem, 1.1rem + 1vw, 2rem)"
    fontWeight: 600
    lineHeight: 1.2
  lead:
    fontFamily: "Public Sans, system-ui, sans-serif"
    fontSize: "clamp(1.25rem, 1.1rem + 0.7vw, 1.625rem)"
    fontWeight: 400
    lineHeight: 1.35
  body:
    fontFamily: "Public Sans, system-ui, sans-serif"
    fontSize: "clamp(1.0625rem, 1rem + 0.25vw, 1.1875rem)"
    fontWeight: 400
    lineHeight: 1.5
  label:
    fontFamily: "Public Sans, system-ui, sans-serif"
    fontSize: "0.9375rem"
    fontWeight: 600
    lineHeight: 1.4
  small:
    fontFamily: "Public Sans, system-ui, sans-serif"
    fontSize: "clamp(0.875rem, 0.85rem + 0.1vw, 0.9375rem)"
    fontWeight: 400
    lineHeight: 1.5
rounded:
  none: "0px"
spacing:
  margin: "clamp(1rem, 2vw, 1.75rem)"
  gutter: "clamp(1rem, 2vw, 2rem)"
  section: "clamp(6rem, 12vw, 13rem)"
  panel: "56px"
  tile-gap: "12px"
components:
  button-primary:
    backgroundColor: "{colors.accent-navy}"
    textColor: "{colors.accent-ink}"
    rounded: "{rounded.none}"
    padding: "0 1.5rem"
    height: "3.25rem"
  button-small:
    backgroundColor: "{colors.accent-navy}"
    textColor: "{colors.accent-ink}"
    rounded: "{rounded.none}"
    padding: "0 1.1rem"
    height: "2.75rem"
  button-ink:
    backgroundColor: "{colors.ink}"
    textColor: "{colors.paper}"
    rounded: "{rounded.none}"
    padding: "0 1.5rem"
    height: "3.25rem"
  button-ink-on-night:
    backgroundColor: "{colors.paper}"
    textColor: "{colors.ink}"
    rounded: "{rounded.none}"
  input-field:
    backgroundColor: "{colors.input-white}"
    textColor: "{colors.ink}"
    typography: "{typography.body}"
    rounded: "{rounded.none}"
    padding: "0.7rem 0.9rem"
    height: "3.25rem"
  input-calculator:
    backgroundColor: "{colors.paper}"
    textColor: "{colors.ink}"
    rounded: "{rounded.none}"
    padding: "0.6rem 0.9rem"
    height: "3.25rem"
  menu-panel:
    backgroundColor: "{colors.ink}"
    textColor: "{colors.paper}"
    rounded: "{rounded.none}"
    padding: "0.5rem"
    width: "13rem"
  caption-plate:
    backgroundColor: "{colors.paper}"
    textColor: "{colors.ink}"
    rounded: "{rounded.none}"
    padding: "1.1rem 1.25rem"
    width: "34rem"
  report-card:
    backgroundColor: "{colors.paper}"
    textColor: "{colors.ink}"
    rounded: "{rounded.none}"
    padding: "clamp(1.5rem, 3vw, 2.5rem)"
---

# Design System: Zion4Commerce

## Overview

**Creative North Star: "The Street Poster With a Ledger Underneath"**

The public site talks like a poster pasted on a wall: flat saturated fields, one tall condensed gothic at full weight, and statements short enough to read from across the street. Each section is a single solid panel of colour, and panels meet edge to edge, so the page reads as a stack of posters rather than a document with sections. The volume is the surface. Underneath it the grid is strict (12 columns, one margin, one gutter) and the numbers are exact, because the product is profit: TACoS, margin, organic rank. Loud type carries the claim and quiet text carries the evidence.

Density is low. A panel holds one idea: one verb, one figure, one question, one comparison. Display type is sized to the viewport, not to a scale. Body text stays plain and readable at 17 to 19px. Depth comes only from colour change and from the occasional overlap: the printed card cut off by its panel's bottom edge, a caption plate sitting on a photograph, a folder tab rising off its band.

The direction is "Loud and flat" (taste-skill seed 790916004), type "Big Shoulders / Public Sans". The dealt orange/sky/lime palette was replaced on 2 Nov 2026, at the client's request, by the colours of the Zion4Commerce logo: deep navy, steel blue and near-white, plus two tints. The composition, type and rules are unchanged. Site editors can change every colour in settings, so the roles below matter more than the exact hexes.

**Key Characteristics:**
- Flat colour fields from the logo, one per panel, butted edge to edge
- One condensed heavy uppercase display face at poster scale; one plain grotesk for everything else
- Square corners everywhere; separation by colour and space, never by lines
- Navy is the action colour on light panels; steel is the action colour on dark panels
- No shadows, gradients, glass or outlines on the public site
- Motion is one masked headline reveal plus quiet rise-ins, and every bit of it is optional

## Colors

Two light fields, two dark fields and paper, all taken from the logo badge. Ink type on light fields, paper type on dark fields.

### Primary
- **Logo Navy** (accent-navy, field-navy): the badge outline. Primary buttons on light panels (white text), the hero's lower field and first headline line, the services table panel, the footer.
- **Logo Steel** (field-steel, accent-on-dark): the badge sky. Buttons on navy and night panels (navy text), the second hero line on navy, the printed-list panel, page intros, question bands.

### Secondary
- **Mist** (field-mist): a light tint of steel. The calculator panel, the "sent" message, light folders and team tiles.
- **Night** (field-night): the deepest navy. The big-figure panel and the closing question.

### Neutral
- **Paper** (paper): the near-white of the badge. The site ground, the upper hero field, and every object sitting on a coloured field: the printed card, the caption plate, the case report.
- **Ink** (ink): a navy-black for all type on paper, mist and steel; the focus ring on light fields.
- **Soft inks** (soft-on-*): one quieter tone per field for secondary text such as notes, table heads, list metadata and footer column titles. A field always uses its own soft ink.
- **Input White** (input-white): the contact form's inputs, the only pure white surface.
- **Error Red** (error-red): error text under contact fields only. The one non-logo colour, kept because errors must not look like brand.

### Named Rules
**The One Field, One Ink Rule.** Every panel is one flat colour and its text is one other colour (ink on light fields, paper on navy and night), plus that field's soft ink. No tints or washes inside a panel except a paper object sitting on it.

**The Act Colour Rule.** Navy marks what you press on light panels; steel marks it on dark panels (`.f-navy .btn`, `.f-night .btn`). The hero's navy first line and the navy strike through the rejected word are the only typographic uses of the action colour.

**The Editable Palette Rule.** Field colours come from site settings (`--c-paper`, `--c-mist`, `--c-steel`, `--c-navy`, `--c-night`, `--c-accent`, `--c-ink`). Components reference those variables, never the hex. A new section picks a field by role (paper, mist, steel, navy, night). Old names in stored content (orange, sky, lime) are mapped to navy, steel and mist.

## Typography

**Display Font:** Big Shoulders 800 (with Arial Narrow, sans-serif)
**Body Font:** Public Sans 400 and 600 (with system-ui, sans-serif)

**Character:** A tall civic gothic from city signage, always in capitals and always at 800, over a plain public-service sans that never raises its voice. The gap between them is the point: often 12:1 or more.

### Hierarchy
- **Display** (800, uppercase, sized to the viewport, line-height 0.82 to 0.95, tracking -0.005em): the poster words. Waterline hero at `min(20vw, 30svh)` (about 270px on a 1440 desktop); verb panels `clamp(7rem, 26vw, 24rem)`; the big figure `clamp(11rem, 28vw, 26rem)`; page intros `clamp(5rem, 15vw, 15rem)`; the CTA lines `clamp(5.5rem, 13vw, 12rem)`; the footer wordmark `clamp(3.5rem, 11.4vw, 13rem)`. Phones move to plain vw (19vw to 31vw).
- **Headline** (800, uppercase, `clamp(2.5rem, 1.2rem + 5vw, 5.5rem)`, line-height 0.9, balanced wrap): section heads for the table, the comparison, case results, about and team.
- **Title** (800, uppercase, `clamp(2rem, 1.4rem + 2vw, 3.25rem)`, line-height 0.95): heads inside paper objects (printed card, case report head at up to 4.5rem), the folder tab at 1.6rem, metric values at up to 3.5rem.
- **Title, text face** (Public Sans 600, `clamp(1.5rem, 1.1rem + 1vw, 2rem)`, line-height 1.2): FAQ questions, rich-text subheads (1.375rem), list titles (1rem). Questions and long subheads are sentences, so they are never set in the display face.
- **Lead** (400, `clamp(1.25rem, 1.1rem + 0.7vw, 1.625rem)`, line-height 1.35): the sentence that follows a headline.
- **Body** (400, `clamp(1.0625rem, 1rem + 0.25vw, 1.1875rem)`, line-height 1.5, max 62ch): running text. Emphasis is 600, never italic.
- **Label** (600, 0.9375rem): definition terms, footer column titles, metric names, form labels (at body size). Sentence case.
- **Small** (400, `clamp(0.875rem, 0.85rem + 0.1vw, 0.9375rem)`): notes and table column heads. The table column heads are the one place the text face goes uppercase, because they head columns of data.

Numbers that are compared or computed use tabular lining figures.

### Named Rules
**The Two Faces Rule.** Big Shoulders 800 and Public Sans 400/600. No third face, no other weights, no italics, no monospace on the public site.

**The Two-Line Rule.** No headline runs past two lines at its set size. At poster scale that means three to six words; the copy gets shorter, the type never gets smaller to fit.

**The Shout or Speak Rule.** Big Shoulders is always uppercase and always a statement, a word or a figure. Public Sans is always sentence case (column heads excepted) and carries every sentence, question and label.

## Layout

A 12-column grid with one outer margin (`spacing.margin`, 16 to 28px) and one gutter (`spacing.gutter`, 16 to 32px). Text-led panels pair a heading in columns 1 to 5 with its paragraph in columns 7 to 12, leaving column 6 empty; the calculator, FAQ bands, contact form and rich text all use that split. Page intros take 1 to 8 for the title and 9 to 12 for the lead. Tables use a 28% / rest split.

Panels are full-bleed and stack with no gap. Vertical padding is `spacing.section` (96 to 208px) for content panels; poster panels instead take a viewport height (hero 100svh, verbs 78svh, CTA 86svh, big figure 72svh, FAQ title 40svh) and push their content to the edges with flex. Paper objects use 56px inner padding (`spacing.panel`), 28px on phones. Team tiles sit on a 12px gap, four across, three below 64em, two below 48em.

One breakpoint does most of the work: below 48em every split grid collapses to a single column, display sizes switch to vw, and the nav collapses into the menu.

## Elevation & Depth

The public site is flat. There are no box shadows anywhere, including on the mobile menu, which floats as a solid ink block with no shadow. Depth comes from three things only: a change of field colour, a paper object overlapping or being cut off by its panel (the printed card, the caption plate, the case report), and a 28% black scrim laid over full-bleed photographs so the verb reads in paper.

### Named Rules
**The Flat At Rest Rule.** No shadow, gradient, blur, glass or glow on the public site. A floating menu is the only element allowed to take a shadow, and the current build ships none, so there is no shadow value to reuse.

**The Overlap Not Shadow Rule.** To lift something, put a paper object on a coloured field, or let a panel edge cut it. Never draw a shadow.

## Shapes

Every corner is square (`rounded.none`): buttons, inputs, cards, menu, photographs, tiles. Borders appear only as a control state (a 2px ink border on a focused contact input, error red when invalid), and a 3px ink focus outline, offset 3px, marks keyboard focus everywhere (paper on Night).

Three shapes break the rectangle, and each is tied to the brand or an object:
- **The hexagon mark**: the Zion mountain badge, rebuilt from flat polygons with 4px gaps, set large beside the footer wordmark.
- **The folder tab**: a filing-folder tab cut by `clip-path` with a 14px chamfer on the left and a 26px slope on the right, 44px tall, sitting on its own coloured band.
- **The ridge drawing**: flat night-and-paper mountain silhouettes that stand in for a missing photograph.

Tilt is reserved for objects. The printed card turns -1.5deg (-1deg on phones), as a printed programme lying on the panel, and the direction allows two or three photographs to tilt 3 to 6 degrees. Headlines, paragraphs, buttons and panels never rotate.

## Components

### Buttons
Solid, blunt rectangles with no border and no icon.
- **Shape:** square corners (0px); height 3.25rem, small 2.75rem.
- **Primary:** Logo Navy fill with white Public Sans 600 at 1.0625rem, 1.5rem side padding, on light panels. On navy and night panels the fill is Logo Steel with navy text. One per panel at most.
- **Ink:** Ink fill with paper text on light panels; paper fill with navy text on navy and night. Used as the second choice in the CTA and in the footer.
- **Hover / Active:** fill darkens (navy mixed with 14% black; steel lightens to #b7cfdc; paper goes to white) over 180ms; press scales to 0.97 over 140ms.
- **Links:** text links underline at 0.08em thickness, 0.2em offset; on fine pointers the underline appears only on hover.

### Cards / Containers (paper objects)
- **Corner Style:** square.
- **Background:** Paper on a coloured field; never a card on paper.
- **Shadow Strategy:** none (see Elevation & Depth).
- **Border:** none.
- **Internal Padding:** 56px for the printed card, `clamp(1.5rem, 3vw, 2.5rem)` for the case report, 1.1rem by 1.25rem for the caption plate.

### Inputs / Fields
- **Style:** contact inputs are white, square, 3.25rem tall, with a 2px transparent border; calculator inputs are paper on mist at 1.25rem tabular figures, no border. Range sliders and checkboxes take ink as their accent colour.
- **Focus:** the 2px border turns ink, replacing the outline.
- **Error:** border turns error red; message below in Error Red, 600, 0.9375rem. Focus moves to the first invalid field, and typed values are kept.

### Navigation
- **Header:** sits over the first panel, absolute, with the logo and wordmark (Big Shoulders 1.6rem) top-left and Public Sans 600 links plus a small navy button top-right, on the page margin.
- **Hover:** links underline at 0.25em offset and rise 1px.
- **Mobile:** below 48em the links become a "Menu" summary in an ink block; it opens a 13rem ink panel with paper links, 0.75rem by 0.9rem padding, no shadow. The wordmark text hides, the badge stays.

### Waterline Hero (signature)
Two flat fields meet at half height (46% on phones): paper above, a chosen field below (navy by default). A two-line uppercase headline is centred across the seam, the first line in navy on paper and the second in steel on navy (ink if the lower field is light), with one lead sentence and one steel button centred near the bottom. No image.

### Verb Panels (signature)
Each step of the process is one full-height panel holding one huge verb, centred, over a photograph with a scrim or a flat ridge drawing, with a paper caption plate at the bottom-left margin carrying the explanatory sentence.

### Case Folders (signature)
Each case is a coloured band with a chamfered display-face tab; inside, a paper report card (headline, logo, metric list in display-face figures) sits beside the story and quote in columns 9 to 12.

### Motion
On load, each hero line rises from behind its own baseline (700ms, `cubic-bezier(0.22, 1, 0.36, 1)`, 90ms stagger), then the hero foot fades in. Other blocks rise 24px and fade as they enter (700ms opacity, 900ms transform, 80ms stagger). Photographs in verb panels drift with a slow 22s scale. Everything sits under `prefers-reduced-motion: no-preference` and only applies once the script has run, so content is never hidden without JavaScript.

## Do's and Don'ts

### Do:
- **Do** give every new section exactly one field colour from settings and let it meet its neighbours edge to edge.
- **Do** set statements, single words and big figures in Big Shoulders 800 uppercase at viewport scale, and keep them to two lines.
- **Do** put quiet text in that field's own soft ink, and evidence (numbers) in tabular lining figures.
- **Do** lift content by placing a paper object on a coloured field, or by letting the panel edge cut it.
- **Do** keep the 1 to 5 / 7 to 12 split for heading-plus-text panels, and collapse to one column below 48em.
- **Do** reference colours through the settings variables so site editors can recolour the site.

### Don't:
- **Don't** use the action colour for anything but actions and their states (the hero's first line and the struck word are the only typographic exceptions, and they are not a pattern to extend). Don't add colours from outside the logo palette, except error red for errors.
- **Don't** add eyebrow labels or kickers above headlines.
- **Don't** number sections, steps or items as decoration (01, 02, 03).
- **Don't** draw thin rules, hairlines or divider lines; separate with colour and space.
- **Don't** use gradients, glass, blur or glow, or any shadow at rest.
- **Don't** round a corner. Radius is 0.
- **Don't** add a third typeface, an italic, another weight, or monospace on the public site.
- **Don't** rotate text, buttons or panels; tilt only the printed card and, at most, two or three photographs.
- **Don't** outline type, add offset shadows or scatter stickers.

## Editor (app screen)

The editor at `/admin` (`src/components/editor/*`, Tailwind) is a work tool for site editors and deliberately does not wear the poster. It is quiet so the live preview carries the brand.

- **Type:** Public Sans only (Tailwind `font-sans`), small and dense: 13px for controls, 12px for secondary controls and tabs, 11px for hints, 14px for primary actions. Weights 500 and 600. Hex colour values use a monospace input, the one place monospace appears, because a hex is code.
- **Colour:** neutral greys on white and neutral-100 (`#f5f5f5`) chrome; neutral-900 for primary buttons, active tabs and toasts (hover to black); blue-50 fill with a blue-300 ring for the selected section or field; blue-700 for add actions; red-700 for destructive actions and error toasts; amber-50 and amber-900 for warnings. The publish button is Logo Navy. Field colours appear only inside the preview.
- **Shape:** small rounding (6px on controls, 12px on the media dialog), 1px neutral-200 or neutral-300 borders, dashed borders for "add" targets.
- **Depth:** a small shadow on the selected device toggle and a large shadow on the floating toast; the media dialog uses a 40% black backdrop. No other shadows.
- **Rule:** never import site classes (`.site`, `.btn`, `.f-*`) into editor chrome, and never bring editor rounding, borders or greys into the public site.

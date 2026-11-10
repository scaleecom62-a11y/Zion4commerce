---
name: Zion4Commerce
description: Marketplace growth agency site in a calm, professional B2B SaaS register, built from the logo's navy.
colors:
  paper: "#ffffff"
  mist: "#f3f7fa"
  tint: "#e8f1f7"
  steel: "#9cbccd"
  navy: "#002845"
  navy-hover: "#0a3a60"
  night: "#001a2e"
  accent: "#0e6ba8"
  ink: "#0f1b2a"
  body: "#3d4b5c"
  muted: "#627284"
  line: "#e2e8ee"
  line-strong: "#cfd9e2"
  good: "#137a4d"
  good-bg: "#e7f5ee"
  error: "#b42318"
  chart-amber: "#e0a23a"
typography:
  display:
    fontFamily: "Plus Jakarta Sans, Segoe UI, system-ui, sans-serif"
    fontSize: "clamp(2.25rem, 1.5rem + 2.6vw, 3.5rem)"
    fontWeight: 800
    lineHeight: 1.12
    letterSpacing: "-0.025em"
  headline:
    fontFamily: "Plus Jakarta Sans, Segoe UI, system-ui, sans-serif"
    fontSize: "clamp(1.75rem, 1.3rem + 1.5vw, 2.5rem)"
    fontWeight: 750
    lineHeight: 1.18
    letterSpacing: "-0.02em"
  title:
    fontFamily: "Plus Jakarta Sans, Segoe UI, system-ui, sans-serif"
    fontSize: "1.1875rem"
    fontWeight: 700
    lineHeight: 1.35
    letterSpacing: "-0.01em"
  figure:
    fontFamily: "Plus Jakarta Sans, Segoe UI, system-ui, sans-serif"
    fontSize: "clamp(1.75rem, 1.4rem + 1vw, 2.25rem)"
    fontWeight: 800
    lineHeight: 1.1
    letterSpacing: "-0.02em"
    fontFeature: "\"tnum\", \"lnum\""
  lead:
    fontFamily: "Plus Jakarta Sans, Segoe UI, system-ui, sans-serif"
    fontSize: "1.125rem"
    fontWeight: 400
    lineHeight: 1.65
  body:
    fontFamily: "Plus Jakarta Sans, Segoe UI, system-ui, sans-serif"
    fontSize: "1rem"
    fontWeight: 400
    lineHeight: 1.65
  body-sm:
    fontFamily: "Plus Jakarta Sans, Segoe UI, system-ui, sans-serif"
    fontSize: "0.9375rem"
    fontWeight: 400
    lineHeight: 1.65
  label:
    fontFamily: "Plus Jakarta Sans, Segoe UI, system-ui, sans-serif"
    fontSize: "0.875rem"
    fontWeight: 700
    lineHeight: 1.4
  caption:
    fontFamily: "Plus Jakarta Sans, Segoe UI, system-ui, sans-serif"
    fontSize: "0.8125rem"
    fontWeight: 600
    lineHeight: 1.5
rounded:
  sm: "8px"
  control: "10px"
  md: "12px"
  lg: "20px"
  band: "24px"
  pill: "999px"
spacing:
  gutter: "24px"
  grid-gap: "1.5rem"
  card: "1.75rem"
  section: "clamp(4rem, 3rem + 4vw, 6.5rem)"
  section-tight: "clamp(2.5rem, 2rem + 2vw, 4rem)"
  container: "1200px"
  container-narrow: "760px"
components:
  button-primary:
    backgroundColor: "{colors.navy}"
    textColor: "{colors.paper}"
    typography: "{typography.label}"
    rounded: "{rounded.control}"
    padding: "0 1.375rem"
    height: "3rem"
  button-primary-hover:
    backgroundColor: "{colors.navy-hover}"
  button-secondary:
    backgroundColor: "{colors.paper}"
    textColor: "{colors.ink}"
    rounded: "{rounded.control}"
    padding: "0 1.375rem"
    height: "3rem"
  button-light:
    backgroundColor: "{colors.paper}"
    textColor: "{colors.navy}"
    rounded: "{rounded.control}"
    padding: "0 1.375rem"
    height: "3rem"
  button-light-hover:
    backgroundColor: "{colors.tint}"
  button-sm:
    rounded: "{rounded.control}"
    padding: "0 1rem"
    height: "2.5rem"
  card:
    backgroundColor: "{colors.paper}"
    rounded: "{rounded.lg}"
    padding: "{spacing.card}"
  icon-tile:
    backgroundColor: "{colors.tint}"
    textColor: "{colors.navy}"
    rounded: "{rounded.md}"
    size: "48px"
  chip:
    backgroundColor: "{colors.tint}"
    textColor: "{colors.navy}"
    rounded: "{rounded.pill}"
    padding: "0.2rem 0.6rem"
  pill:
    backgroundColor: "{colors.paper}"
    textColor: "{colors.ink}"
    rounded: "{rounded.pill}"
    padding: "0.5rem 0.875rem"
  input:
    backgroundColor: "{colors.paper}"
    textColor: "{colors.ink}"
    typography: "{typography.body}"
    rounded: "{rounded.control}"
    padding: "0.625rem 0.875rem"
    height: "2.875rem"
  metric:
    backgroundColor: "{colors.good-bg}"
    textColor: "{colors.good}"
    rounded: "{rounded.sm}"
    padding: "0.75rem"
  faq-item:
    backgroundColor: "{colors.paper}"
    textColor: "{colors.ink}"
    rounded: "{rounded.md}"
    padding: "1.125rem 1.25rem"
  cta-band:
    backgroundColor: "{colors.navy}"
    textColor: "{colors.paper}"
    rounded: "{rounded.band}"
    padding: "clamp(2rem, 1.5rem + 2vw, 3.5rem)"
  site-header:
    backgroundColor: "{colors.paper}"
    height: "72px"
  site-footer:
    backgroundColor: "{colors.night}"
    padding: "4rem 0 2rem"
---

# Design System: Zion4Commerce

## Overview

**Creative North Star: "The Navy Ledger"**

The public site reads like the dashboard of a well-run account: calm white and pale blue-grey sections, a centred 1200px column, and content set in bordered cards that sit just above the page on a soft haze of shadow. One colour does the work. The logo's navy (#002845) is the only brand fill and the only action colour; everything else is ink, slate greys and hairline borders, so the navy buttons, the navy CTA band and the navy calculator result are always where the eye goes. The register is professional B2B SaaS (the client's reference is hectorai.live): trustworthy, legible, unhurried, more operations report than advertisement.

Density is moderate. Sections breathe (64 to 104px of vertical padding), cards are generous inside (28px), and copy runs in measured lines (62ch for leads). Plus Jakarta Sans carries everything, from 800-weight headings with tight tracking down to 13px captions, so hierarchy comes from weight and size rather than from a second face. Proof is shown as numbers: a dashboard panel in the hero, a stats row, case-study metric tiles in green. Motion is small and functional: a 16px fade-up reveal, a 3px lift on feature cards, a chevron that turns.

The site's colours are editable. The seven site colours live in site settings (`settings.colors`) and arrive as `--c-paper`, `--c-mist`, `--c-steel`, `--c-navy`, `--c-night`, `--c-accent`, `--c-ink`, which `.site` maps to `--paper`, `--mist`, `--steel`, `--navy`, `--night`, `--accent`, `--ink`. The values in the frontmatter are the shipped defaults. The secondary tokens (`--body`, `--muted`, `--line`, `--line-strong`, `--good`, `--good-bg`, `--tint`) are fixed in `site.css`.

**Key Characteristics:**
- One brand colour: logo navy for every button, band and selected state.
- White and mist (#f3f7fa) sections alternating inside a centred 1200px container.
- Cards with a 20px radius, a 1px #e2e8ee border and a soft two-layer shadow.
- Plus Jakarta Sans throughout; weight 800 headings with negative tracking.
- Lucide line icons set in pale-blue 48px tiles.
- Numbers as proof: tabular figures, green for positive movement.
- A dark night footer and a navy CTA band close every page.

## Colors

A cool, low-chroma palette of white, blue-greys and slate, with the logo navy as the one saturated anchor and a single green reserved for good news.

### Primary
- **Logo Navy** (#002845): the brand and action colour. Primary buttons, the CTA band, the calculator result panel, the final step of the halo diagram, the contact step numbers, checked checkbox borders, chart revenue line, stat values and the wordmark. Hover deepens it to **Navy Hover** (#0a3a60).
- **Night** (#001a2e): the footer field and the `night` section tone. A darker floor under the navy, never a button.

### Secondary
- **Link Blue** (#0e6ba8): text-level accent only. Section labels, text links, the highlighted word in a heading (`.hl`), input focus borders and the 2px focus outline. It is never a fill behind content.
- **Logo Steel** (#9cbccd): the logo's light blue, used as quiet ink on dark fields (labels on navy, the calculator's secondary line) and for decorative glyphs on light fields (halo arrows, quote marks).

### Tertiary
- **Growth Green** (#137a4d) on **Green Wash** (#e7f5ee): positive metrics only. Case-study metric tiles, the dashboard change figures, tick icons in lists and badges, the live dot in the dashboard header.
- **Chart Amber** (#e0a23a): the second data series in the hero chart (the dashed TACoS line and its legend swatch). Data only.

### Neutral
- **Paper** (#ffffff): default section field, card and input fill.
- **Mist** (#f3f7fa): alternate section field, the top of the hero gradient, KPI tiles, quote boxes, halo steps, menu hover.
- **Pale Tint** (#e8f1f7): icon tiles, chips, the hero label chip, the `steel` section tone, checked checkbox fill, image-frame fallback, text selection.
- **Ink** (#0f1b2a): headings, labels, form text, strong UI copy.
- **Slate Body** (#3d4b5c): running text and leads.
- **Muted Slate** (#627284): captions, KPI labels, member roles, chart axis text.
- **Hairline** (#e2e8ee): card borders, header and section dividers, stat separators.
- **Hairline Strong** (#cfd9e2): input and secondary-button borders, hovered card and opened FAQ borders.
- **Error Red** (#b42318): form error text.

### Named Rules
**The One Navy Rule.** Navy is the only colour that fills an action or a band. A second filled brand colour does not exist; if something needs to stand out, it gets navy or it gets a border.

**The Blue Is Ink Rule.** Link Blue (#0e6ba8) colours text, focus rings and nothing else. It never becomes a button, a card fill or a section field.

**The Green Means Up Rule.** Green appears only where a number improved or a promise is ticked. It is never decoration and never a call to action.

**The Settings Rule.** Never hard-code the seven site colours in components. Use `var(--navy)`, `var(--mist)` and the rest, so an editor's colour change reaches every surface.

## Typography

**Display Font:** Plus Jakarta Sans (with Segoe UI, system-ui, sans-serif), loaded at 400, 500, 600, 700 and 800 as `--font-jakarta`.
**Body Font:** the same family.

**Character:** a single geometric-humanist sans used across the range. Heavy, tightly tracked headings give the confidence; open 1.65 line-height in body text keeps long service copy easy.

### Hierarchy
- **Display** (800, `clamp(2.25rem, 1.5rem + 2.6vw, 3.5rem)`, 1.12, -0.025em, `text-wrap: balance`): the one `h1` per page, in the hero and page intros (max 22ch in intros).
- **Headline** (750, `clamp(1.75rem, 1.3rem + 1.5vw, 2.5rem)`, 1.18, -0.02em, balanced): section headings and the CTA band heading.
- **Title** (700, 1.1875rem, 1.35, -0.01em): card titles, step titles. Case headlines use 1.3125rem.
- **Figure** (800, `clamp(1.75rem, 1.4rem + 1vw, 2.25rem)`, 1.1, -0.02em, tabular lining numerals): stat values. The calculator figure scales to `clamp(2.25rem, 1.8rem + 1.5vw, 3rem)` and dashboard values sit at 1.625rem in the same treatment.
- **Lead** (400, 1.125rem, 1.65, max 62ch): the paragraph under a section heading. The hero subtitle runs larger (1.1875rem, 1.6, max 34rem).
- **Body** (400, 1rem, 1.65): default running text. Text inside cards drops to 0.9375rem.
- **Label** (700, 0.875rem): form labels, small buttons, field legends. Buttons use 700 at 0.9375rem.
- **Caption** (600, 0.8125rem): KPI labels, case categories, chart captions, footer base line.
- **Small caps labels** (700, 0.75 to 0.8125rem, uppercase, 0.04 to 0.08em tracking): metric tile labels and footer column headings.

### Named Rules
**The One Family Rule.** Plus Jakarta Sans is the only typeface on the public site. Hierarchy comes from weight (400 to 800), size and tracking.

**The Tabular Proof Rule.** Every figure that claims a result uses tabular lining numerals (`.nums`) at weight 800, so columns of numbers align and read as data.

## Layout

A centred column: `.container` is 1200px wide with 24px side gutters; `.container--narrow` (760px) holds rich text and the contact form context. Every section is full-width with its own tone (`f-paper`, `f-mist`, `f-steel` mapped to Pale Tint, `f-navy`, `f-night`) and the content sits in the container inside it.

Vertical rhythm: standard sections pad `clamp(4rem, 3rem + 4vw, 6.5rem)`; tight sections (stats, CTA wrapper) pad `clamp(2.5rem, 2rem + 2vw, 4rem)`. Section heads are capped at 720px, left-aligned by default or centred with `.sec-head--center`, and sit `clamp(2rem, 1.5rem + 2vw, 3.5rem)` above their content.

Grids: three-column card grids with a 24px gap (two columns under 960px, one under 640px); a two-column hero (1.05fr / 1fr) and split sections (1fr / 1fr, `--flip` swaps the visual to the left) that stack under 960px; calculator and FAQ at 0.8fr / 1.2fr; contact at 0.85fr / 1.15fr; a four-column team grid (three under 1024px, two under 720px); a five-up stats row (two-up under 900px); footer at 1.6fr plus four columns (two under 960px). The FAQ heading is sticky at 104px on wide screens. The header is sticky at 72px tall; anchored sections scroll to 88px below the top.

Breakpoints in use: 480, 640, 720, 899/900, 960, 1024px.

## Elevation & Depth

Layered and soft. Raised surfaces always pair a 1px hairline border with a low, cool, two-layer shadow tinted from ink, so cards sit just off the page without floating. Elevation increases only for things that are meant to lead: the hero dashboard, image frames, the open mobile menu, and feature cards on hover. Section fields themselves are flat; depth between sections comes from alternating paper and mist, plus the mist-to-paper hero gradient.

### Shadow Vocabulary
- **Hairline lift** (`box-shadow: 0 1px 2px rgb(15 27 42 / 0.05)`): defined as `--shadow-sm`; the primary button uses its navy variant `0 1px 2px rgb(0 40 69 / 0.2)`.
- **Card** (`box-shadow: 0 1px 2px rgb(15 27 42 / 0.04), 0 8px 24px rgb(15 27 42 / 0.06)`): every `.card` at rest and the opened FAQ item.
- **Raised** (`box-shadow: 0 2px 4px rgb(15 27 42 / 0.04), 0 24px 48px rgb(15 27 42 / 0.1)`): hero dashboard, image frames, mobile menu panel, feature card hover.
- **Focus halo** (`box-shadow: 0 0 0 3px rgb(14 107 168 / 0.15)`): inputs on focus, with the border turning Link Blue.

### Named Rules
**The Border And Haze Rule.** A raised surface has both a 1px Hairline border and a soft shadow. Never a shadow without the border, never a hard or offset shadow.

**The Earned Lift Rule.** Only the hero dashboard, image frames and menus rest at the Raised level. Cards rise to it on hover (with a 3px translate), not at rest.

## Shapes

Friendly, consistent rounding on a small scale: 8px for small inner tiles (metric tiles, menu links, skip link), 10px for every control (buttons, inputs, checkbox rows, the menu toggle), 12px for nested panels (icon tiles, KPI tiles, FAQ items, quote boxes, halo steps, the menu panel), 20px for cards, image frames and the dashboard, 24px for the CTA band, and full pills for chips, label pills and the hero label chip. Avatars and the contact step numbers are circles. Borders are 1px throughout; there are no heavier strokes, no clipped corners and no decorative geometry. Icons are Lucide line icons at their default 2px stroke.

## Components

### Buttons
Solid, compact, unmistakable.
- **Shape:** gently rounded (10px), 3rem tall, 1.375rem side padding, 700 weight at 0.9375rem, optional leading or trailing icon with a 0.5rem gap.
- **Primary:** Logo Navy fill, white text, navy hairline shadow. Hover deepens to #0a3a60.
- **Secondary:** white fill, Ink text, Hairline Strong border; hover turns the border navy.
- **Light / Outline light (on navy):** white fill with navy text (hover Pale Tint), or transparent with white text and a 40% white border (hover full white border).
- **Small:** 2.5rem tall, 1rem padding, 0.875rem text (header CTA).
- **States:** colour transitions at 160ms; `:active` presses down 1px; disabled drops to 60% opacity. Focus uses the site-wide 2px Link Blue outline at 2px offset.

### Chips and Pills
- **Chip:** Pale Tint fill, navy 700 text at 0.75rem, full pill, used for small tags inside cards.
- **Pill:** white fill, Hairline border, Ink 600 text at 0.875rem, used in the marketplace strip.

### Cards / Containers
- **Corner Style:** 20px.
- **Background:** white on any section tone.
- **Shadow Strategy:** Card level at rest; feature cards lift to Raised and Hairline Strong on hover (200ms, `cubic-bezier(0.22, 1, 0.36, 1)`).
- **Border:** 1px Hairline (#e2e8ee).
- **Internal Padding:** 1.75rem (28px); team members 1.75rem by 1.5rem; the contact card `clamp(1.5rem, 1rem + 2vw, 2.25rem)`.
- **Anatomy:** icon tile, title, 0.9375rem body, then an optional tick list pushed to the bottom behind a Hairline rule.

### Icon Tiles
Lucide line icons in a Pale Tint square (48px, 12px radius; small variant 40px, 10px radius) with navy stroke. Editors choose from a fixed set (`src/components/site/Icon.tsx`). On navy surfaces the tile becomes 12% white with a white icon.

### Inputs / Fields
- **Style:** white fill, 1px Hairline Strong border, 10px radius, 2.875rem minimum height, 1rem Ink text; textareas start at 7rem and resize vertically. Labels sit above in Label style.
- **Focus:** border turns Link Blue with a 3px 15% blue halo; no outline.
- **Choice rows:** checkboxes live in 2.75rem bordered rows (10px radius) in a two-column grid; a checked row turns its border navy and its fill Pale Tint.
- **Error:** invalid fields take a red border; messages in Error Red, 600 at 0.875rem.

### Navigation
- **Header:** sticky, 72px, 96% white with a Hairline bottom border. Wordmark (40px logo plus navy 800 name) at left; text links in Slate Body 600 at 0.9375rem, hovering to navy; a small primary button at the end.
- **Mobile (under 900px):** links collapse into a `<details>` "Menu" toggle styled as a 10px bordered control, opening a white 12px-radius panel with the Raised shadow and Mist hover rows. Under 480px the wordmark drops its text.
- **Footer:** Night field, #a9bccb text at 0.9375rem; brand column plus four link columns with small uppercase white headings; links brighten to white on hover; a 12%-white rule above the base line.

### Hero Dashboard (signature)
A white 20px card at the Raised level showing a live-account view: a green live dot with a green halo ring, a title, a 2x2 grid of Mist KPI tiles (caption label, 800 tabular value, green change), and an SVG line chart with a navy revenue line over an 8% navy area and a dashed amber TACoS line. It sits beside the hero copy on a mist-to-paper gradient, with green-ticked badges under the buttons.

### Stats Row
Five figures in navy Figure style above muted captions, divided by Hairline vertical rules, directly below the hero.

### Case Study Card
A card with a logo or name header (navy 800) above a Hairline rule, a Title-scale headline, a Mist italic quote box with a steel quote icon, and a two-up grid of green metric tiles pinned to the bottom.

### FAQ Accordion
Native `<details>` items: white, 1px Hairline, 12px radius, 0.75rem apart. The summary is Ink 700 with a muted chevron that rotates 180 degrees on open; an open item gains Hairline Strong and the Card shadow. The heading column is sticky beside the list on wide screens.

### Calculator (signature)
A card split in two: a white form (number inputs and a navy-accented range slider with an 800-weight output) and a navy result panel with steel and white figures, the large result in display-weight tabular numerals, and a muted note at the foot.

### CTA Band
A navy block with 24px radius inside a tight paper section: white Headline, #c3d3df supporting line (max 46ch), and Light / Outline-light buttons, wrapping on small screens.

### Motion
Content is visible without JavaScript. With JS and no reduced-motion preference, `[data-reveal]` elements fade up 16px (600ms opacity, 700ms transform, `cubic-bezier(0.22, 1, 0.36, 1)`), staggered by 70ms per index.

## Do's and Don'ts

### Do:
- **Do** use Logo Navy (#002845) for every primary action and every filled band, through `var(--navy)`.
- **Do** put content in white cards with a 20px radius, a 1px #e2e8ee border and the Card shadow.
- **Do** alternate Paper and Mist section tones inside the 1200px container, and close pages with the navy CTA band and the Night footer.
- **Do** use 10px radius on every button and input, and 12px on nested tiles and panels.
- **Do** set results in tabular 800-weight figures, and colour positive movement Growth Green on Green Wash.
- **Do** set card and step icons as Lucide line icons inside Pale Tint icon tiles; bare icons appear only as green ticks in lists and badges.
- **Do** use the 2px Link Blue focus outline and the 3px blue input halo; keep focus visible on every control.

### Don't:
- **Don't** introduce a second filled brand colour; Link Blue is for text and focus only, green for good numbers only, amber for chart data only.
- **Don't** hard-code the seven settings colours in components; they must follow `settings.colors`.
- **Don't** use hard, offset or coloured drop shadows, or a shadow without the hairline border.
- **Don't** mix in other typefaces or use a weight below 400 on the public site.
- **Don't** use square corners on cards or controls, or radii outside the 8 / 10 / 12 / 20 / 24 / pill scale.
- **Don't** apply editor chrome (neutral greys, 6px controls) to the public site.

## Editor (app screen)

The editor at `/admin` (`src/components/editor/*`, Tailwind) is a work tool for site editors and does not wear the site's card system. It stays quiet so the live preview carries the brand.

- **Type:** Plus Jakarta Sans via Tailwind `font-sans` (`--font-jakarta`), small and dense: 13px for controls, 12px for secondary controls and tabs, 11px for hints, 14px for primary actions. Weights 500 and 600. Hex colour values use a monospace input, the one place monospace appears.
- **Colour:** neutral greys on white and neutral-100 chrome; neutral-900 for primary buttons, active tabs and toasts; blue-50 fill with a blue ring for the selected section or field; blue for add actions; red for destructive actions and error toasts; amber for warnings. The publish button is Logo Navy (#002845, hover Night). Site colours otherwise appear only inside the preview.
- **Shape:** small rounding (6px `rounded-md` on controls, 8 to 12px on panels and the media dialog), 1px neutral-200 or neutral-300 borders, dashed borders for "add" targets.
- **Depth:** a small shadow on the selected device toggle and a large shadow on the floating toast; the media dialog uses a 40% black backdrop. No other shadows.
- **Rule:** never import site classes (`.site`, `.btn`, `.card`, `.f-*`) into editor chrome, and never bring editor rounding, borders or greys into the public site.

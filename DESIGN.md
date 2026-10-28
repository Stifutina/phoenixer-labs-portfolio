---
name: Phoenixer Labs
description: Two lights in one sky. A teal-black night studio site where a plexus net holds ice for Sergey and amber for Anastasia.
colors:
  night: "#03080b"
  night-2: "#071319"
  sky-zenith: "#0a2028"
  surface: "rgba(9, 22, 28, 0.84)"
  surface-solid: "#0a1a20"
  line: "rgba(130, 205, 220, 0.15)"
  line-strong: "rgba(130, 205, 220, 0.3)"
  text: "#e9f5f7"
  soft: "#bcd0d5"
  muted: "#8ba5ad"
  ice: "#8fd3ff"
  amber: "#ffc46b"
  teal: "#5fd6c8"
  net-pale: "#b8f1ea"
  invalid: "#ff8f9a"
  logo-upper: "#ffffff"
  logo-lower: "#4a63ff"
typography:
  layer-word:
    fontFamily: "Bricolage Grotesque, system-ui, -apple-system, Segoe UI, sans-serif"
    fontSize: "clamp(4.25rem, 15vw, 12.5rem)"
    fontWeight: 750
    lineHeight: 0.82
    letterSpacing: "-0.04em"
  area-word:
    fontFamily: "Bricolage Grotesque, system-ui, -apple-system, Segoe UI, sans-serif"
    fontSize: "clamp(4.25rem, 17vw, 13rem)"
    fontWeight: 750
    lineHeight: 0.82
    letterSpacing: "-0.04em"
  display:
    fontFamily: "Bricolage Grotesque, system-ui, -apple-system, Segoe UI, sans-serif"
    fontSize: "clamp(2.8rem, 6.5vw + 0.5rem, 6rem)"
    fontWeight: 650
    lineHeight: 0.92
    letterSpacing: "-0.04em"
  display-stage:
    fontFamily: "Bricolage Grotesque, system-ui, sans-serif"
    fontSize: "clamp(2.4rem, 4.2vw + 0.6rem, 4.6rem)"
    fontWeight: 650
    lineHeight: 0.95
    letterSpacing: "-0.04em"
  headline:
    fontFamily: "Bricolage Grotesque, system-ui, sans-serif"
    fontSize: "clamp(2rem, 3vw + 1rem, 3.4rem)"
    fontWeight: 600
    lineHeight: 1
    letterSpacing: "-0.03em"
  headline-soft:
    fontFamily: "Bricolage Grotesque, system-ui, sans-serif"
    fontSize: "clamp(2rem, 3vw + 1rem, 3.4rem)"
    fontWeight: 550
    lineHeight: 1.02
    letterSpacing: "-0.035em"
  title:
    fontFamily: "Bricolage Grotesque, system-ui, sans-serif"
    fontSize: "clamp(1.5rem, 1.4vw + 1rem, 2.1rem)"
    fontWeight: 600
    lineHeight: 1.1
    letterSpacing: "-0.03em"
  card-title-wide:
    fontFamily: "Bricolage Grotesque, system-ui, sans-serif"
    fontSize: "clamp(1.7rem, 2.6vw, 2.3rem)"
    fontWeight: 600
    lineHeight: 1.15
    letterSpacing: "-0.02em"
  portrait-name:
    fontFamily: "Bricolage Grotesque, system-ui, sans-serif"
    fontSize: "clamp(1.15rem, 1.1vw + 0.8rem, 1.6rem)"
    fontWeight: 650
    lineHeight: 1.05
    letterSpacing: "-0.03em"
  card-title:
    fontFamily: "Bricolage Grotesque, system-ui, sans-serif"
    fontSize: "1.35rem"
    fontWeight: 600
    lineHeight: 1.15
    letterSpacing: "-0.02em"
  lead:
    fontFamily: "Bricolage Grotesque, system-ui, sans-serif"
    fontSize: "clamp(1.2rem, 0.6vw + 1rem, 1.4rem)"
    fontWeight: 400
    lineHeight: 1.55
  wordmark:
    fontFamily: "Bricolage Grotesque, system-ui, sans-serif"
    fontSize: "1.1rem"
    fontWeight: 650
    letterSpacing: "-0.02em"
  body:
    fontFamily: "Bricolage Grotesque, system-ui, sans-serif"
    fontSize: "1.0625rem"
    fontWeight: 400
    lineHeight: 1.55
  ui:
    fontFamily: "Bricolage Grotesque, system-ui, sans-serif"
    fontSize: "1rem"
    fontWeight: 400
    lineHeight: 1.55
  control:
    fontFamily: "Bricolage Grotesque, system-ui, sans-serif"
    fontSize: "0.98rem"
    fontWeight: 500
    lineHeight: 1.2
  small:
    fontFamily: "Bricolage Grotesque, system-ui, sans-serif"
    fontSize: "0.95rem"
    fontWeight: 400
    lineHeight: 1.3
  portrait-role:
    fontFamily: "Bricolage Grotesque, system-ui, sans-serif"
    fontSize: "clamp(0.8rem, 0.3vw + 0.72rem, 0.95rem)"
    fontWeight: 400
    lineHeight: 1.3
  caption:
    fontFamily: "Bricolage Grotesque, system-ui, sans-serif"
    fontSize: "0.88rem"
    fontWeight: 400
    lineHeight: 1.4
  label:
    fontFamily: "Bricolage Grotesque, system-ui, sans-serif"
    fontSize: "0.84rem"
    fontWeight: 400
    lineHeight: 1.4
rounded:
  focus: "4px"
  inner: "12px"
  panel: "18px"
  stage: "24px"
  pill: "999px"
spacing:
  gutter: "clamp(16px, 4vw, 48px)"
  column-gap: "1.5rem"
  card-gap: "clamp(14px, 2vw, 28px)"
  section: "clamp(5rem, 13vh, 9rem)"
  strata-gap: "clamp(3.5rem, 9vh, 6.5rem)"
  header: "72px"
  container: "1320px"
components:
  button-primary:
    backgroundColor: "{colors.teal}"
    textColor: "{colors.night}"
    typography: "{typography.control}"
    rounded: "{rounded.pill}"
    padding: "0.7rem 1.25rem"
  button-ghost:
    textColor: "{colors.text}"
    typography: "{typography.control}"
    rounded: "{rounded.pill}"
    padding: "0.7rem 1.25rem"
  tag:
    textColor: "{colors.soft}"
    rounded: "{rounded.pill}"
    padding: "0.28rem 0.7rem"
  card:
    backgroundColor: "{colors.surface}"
    textColor: "{colors.text}"
    rounded: "{rounded.panel}"
    padding: "1.1rem 1.3rem 1.4rem"
  portrait:
    backgroundColor: "{colors.surface-solid}"
    textColor: "{colors.text}"
    rounded: "{rounded.panel}"
  input:
    textColor: "{colors.text}"
    typography: "{typography.ui}"
    rounded: "{rounded.inner}"
    padding: "0.8rem 0.95rem"
  nav-link:
    textColor: "{colors.soft}"
    rounded: "{rounded.pill}"
    padding: "0.5rem 0.7rem"
  header:
    height: "{spacing.header}"
---

# Design System: Phoenixer Labs

## Overview

**Creative North Star: "Two Lights in One Sky"**

The whole site sits under one night sky: a fixed teal-black ground, a radial zenith glow, and a persistent WebGL plexus net that survives page navigation. Glowing nodes drift in a 3D volume and link to their neighbours with thin threads. A focal plane runs through the middle of the volume, so nodes off it soften into bokeh discs and nodes on it burn white-hot inside a coloured halo. Most nodes are pale teal, which is the net itself. The others belong to people: ice is Sergey and amber is Anastasia. The site is organised by technology area (Backend, AI, 3D, Frontend, Design), and each area takes the light of the person who builds it: Backend is ice, 3D, Frontend and Design are amber, and AI belongs to both and stays studio. The page declares that tone on `html[data-owner]` (`studio`, `sergey`, `anastasia`), and that single switch retints everything that can carry light: hairline rules, the sky glow, list markers, focus rings, the selection colour, and the weighting and thread colour of the net. Home, team and contact pages hold both lights in balance, with teal as the shared light and pale teal-white as the neutral accent. Project pages take their builder's tone.

The interface is sparse and dark, with one family (Bricolage Grotesque) carrying every role from the huge layer words to the smallest label. Surfaces are dark translucent panels rimmed with a hairline, and they light up under the cursor: a masked radial rim follows the pointer, and work cards tilt a few degrees toward it. The people are present as photographs, shown untinted and framed by a hairline in their own light, and as small round faces that sign the work they built. Compositions are asymmetric on a 12-column grid: headlines run long on the left, secondary content is pushed right, and paired columns are uneven and staggered.

Motion is slow and eased (one curve, `cubic-bezier(0.2, 0.8, 0.2, 1)`). Display headlines settle in out of a blur, supporting blocks rise 12px, and portraits are revealed upward through a rounded clip. The camera dives into the net on first load and makes a smaller hop forward when the tone changes between pages. The layer words fill with ink as they scroll into view, and an area's own word inks in as its page opens. All of it is switched off under `prefers-reduced-motion`, and the net then draws a single still frame.

**Key Characteristics:**
- Teal-black ground with radial skies and a persistent, owner-weighted plexus net with depth-of-field bokeh
- Ice and amber are the only personal accents, each owned by one person. Each technology area takes the light of whoever builds it through `html[data-owner]`. Teal is the net between them
- One self-hosted variable grotesque for everything, tight negative tracking on headings, sentence case throughout
- Translucent panels with a cursor-lit masked rim. Work cards also tilt slightly in 3D
- Untinted portraits in a hairline of their person's light; round faces sign every project
- Asymmetric 12-column compositions with uneven, staggered columns
- Contact is always one step away: the flowing ice, teal and amber pill in the header on desktop, docked on mobile after the first viewport

## Colors

A teal-black night palette with sea-glass neutrals, lit by two personal accents and a shared teal. The accents fill nothing outside their person's context, except where all three flow together in the primary pill.

### Primary
- **Ice** (`ice`): Sergey's light. On the Backend area and on the projects he built it becomes `--accent`: the hairlines (at 18% / 34% alpha), the sky glow, fact labels, list markers and focus rings. Elsewhere it appears only where something is Sergey's: his person mark, the Backend nav dot, his card rims, faces and meta, his portrait frame and role line on the team page, his layer and area ink, his CV button, his form option.
- **Amber** (`amber`): Anastasia's light, used by exactly the same rules on the 3D, Frontend and Design areas and her projects (hairlines at 17% / 32% alpha).

### Secondary
- **Teal** (`teal`): the net between the two people, and it belongs to both. It is the studio's primary sky glow, Sergey's secondary sky glow, the fade stop inside every card rim, the thread that joins the two portraits (at 60%), the scrollbar thumb (at 30%), the nav dot for AI and Team, the AI area's tone (its "All AI work" link and hover borders), the middle and resting light of the primary pill's gradient, and that pill's bloom. It never fills a control alone.
- **Net Pale** (`net-pale`): the most common node colour in the plexus. It is not used in the DOM.

### Neutral
- **Night** (`night`): the page ground, theme colour, favicon tile, scrollbar track, the text colour on solid pills and filled CV buttons, and the base of every veil and gradient (through `--night-rgb`).
- **Night 2** (`night-2`) and **Sky Zenith** (`sky-zenith`): the deeper teal-blacks. Sky Zenith is the centre stop of the radial sky behind the net.
- **Panel Surface** (`surface`) and **Solid Panel** (`surface-solid`): translucent card and form panels over the sky. The solid variant sits behind portraits, shots and stage walls, where translucency would fail.
- **Hairline** (`line`) and **Strong Hairline** (`line-strong`): sea-glass rules on studio pages, retinted to the tone's accent on toned pages. Strong Hairline is also the outline stroke of the layer and area words and the rim of round faces on area and project pages.
- **Moonlight Text** (`text`): headings and primary text. It is also the studio accent.
- **Soft** (`soft`): leads, prose, secondary links, tag text, and the second tier of the home headline.
- **Muted** (`muted`): meta, the footer, field hints.
- **Invalid** (`invalid`): the border of a field with `aria-invalid`. The error note uses a lighter tint of the same rose.

### Logo
- **Logo Upper** (`logo-upper`) and **Logo Lower** (`logo-lower`): the two swifts of the mark, white over a bright royal blue. The original mark was black and indigo on white; on the night ground it flips. These colours belong to the mark only (header, footer, favicon), are kept apart from ice and amber, and never dim or retint by page.

### Project glow
Each project page carries its own light, set by the frontmatter `glow` field and falling back to its builder's light. It is atmosphere only: the faint aura behind the project header (22%), the lit wall behind stage renders (38%), and the long soft shadows under stage walls (60%) and compare boards (45%). It never carries text or a control.

### Named Rules
**The Two Lights Rule.** Ice and amber are not decoration; each is a person. Use ice only for Sergey's things and amber only for Anastasia's. Teal is the net that joins them: it carries threads, rims and glows, never text or controls. An area takes the light of the person who builds it; an area both build (AI) stays studio. A studio-level element that belongs to both uses Moonlight Text or teal, shows both lights side by side, as the split "AI" word does, or runs all three together, as the primary pill does.

**The One Switch Rule.** Page theming happens by setting `html[data-owner]` and reading `--accent` / `--accent-rgb` / `--line` / `--glow-a` / `--glow-b` / `--sky-a`. An area page sets it from `areas[area].tone` in `src/data/site.ts`; a project page sets it from its builder. Components do not hard-code page colours; they read the variables. The exceptions are elements that name a specific person or area regardless of page (marks, nav dots, portraits and faces, per-owner cards, layers and area words, team members, CV buttons, form options), and those use `--tone` / `--tone-rgb` set from the owner or area. The net listens for the same switch, and also for the contact form's `owner-change` event.

## Typography

**Display Font:** Bricolage Grotesque (self-hosted variable woff, weights 300 to 800, `font-display: swap`; system-ui fallback)
**Body Font:** Bricolage Grotesque
**Label Font:** Bricolage Grotesque

**Character:** A single slightly quirky grotesque with optical sizing does all the work. Weight and tight tracking do the work that a second family would otherwise do.

### Hierarchy
- **Layer Word** (750, `clamp(4.25rem, 15vw, 12.5rem)`, 0.82): the five huge words of "Five layers, two people" on the home page. Always outlined, inked as they scroll in. See the signature component.
- **Area Word** (750, `clamp(4.25rem, 17vw, 13rem)`, 0.82): the area's name as the h1 of its page, the layer word at full size and inked on load.
- **Display** (650, fluid up to 6rem, 0.92 to 0.95): the first tier of the hero, the team title, the contact title, project titles and the contact band. One per page, held to 11 to 16ch, and it settles in from a blur.
- **Display Stage** (650, fluid from 2.4rem to 4.6rem, 0.95): the project title in the stage layout, where it sits in a narrow sticky column.
- **Headline** (600, fluid up to 3.4rem, 1): section titles, team member names and compare part names.
- **Headline Soft** (550, the headline size, 1.02, -0.035em): the second tier of the home headline, in Soft, held to 19ch. It settles in 0.25s after the first tier.
- **Title** (600, fluid up to 2.1rem, 1.1): reason headings, prose h2, the area page's descriptive title, the footer name (at 650).
- **Card Title** (600, 1.35rem, 1.15): work cards. **Card Title Wide** (fluid from 1.7rem to 2.3rem) on wide cards from 720px.
- **Portrait Name** (650, fluid from 1.15rem to 1.6rem, 1.05) over **Portrait Role** (400, fluid from 0.8rem to 0.95rem, in the owner's light): the tag on each home portrait.
- **Lead** (400, fluid up to 1.4rem): intro paragraphs in Soft, around 44 to 54ch. Also the team member role line (in the person's light) and the tool lists.
- **Wordmark** (650, 1.1rem, -0.02em): "Phoenixer Labs" beside the logo in the header.
- **Body** (400, 1.0625rem, 1.55): prose in Soft, capped at 68ch, with `text-wrap: pretty`.
- **UI** (400, 1rem): field text, the stage layout's prose column, and the contact band's secondary link.
- **Control** (500, 0.98rem, 1.2): every pill, and the contact channel list (at 400).
- **Small** (400, 0.95rem): form labels and notes, area link pills, the people beside an area word, team tools and profile links, the back link, tool group names, diagram nodes, and the footer's base size.
- **Caption** (400, 0.88rem): the footer's base row and diagram captions.
- **Label** (400, 0.82 to 0.85rem): card meta, tags, fact labels, the CV button's PDF badge, cover notes, the video toggle, option hints. Sentence case at normal tracking.

### Named Rules
**The One Family Rule.** Every role uses Bricolage Grotesque. Hierarchy comes from size, from weight (400 / 500 / 550 / 600 / 650 / 750) and from tracking (-0.02em to -0.04em on headings), never from a second family.

**The Sentence Case Rule.** The build has no uppercase or letter-spaced labels anywhere. Meta lines, tags and section titles stay in sentence case at normal tracking.

**The Small Steps Rule.** Text below body size uses only the steps above: 1rem, 0.98rem, 0.95rem, 0.88rem and the 0.82 to 0.85rem label band. A new small size snaps to the nearest step.

## Layout

- **Container:** `min(100% - 2 * gutter, 1320px)`, centred, with a fluid gutter.
- **Grid:** from 960px the home hero, area heads and team members use a 12-column grid with a 1.5rem gap. On the home hero the two-tier title spans columns 1 to 7, the lead and actions 1 to 6, and the portrait duo fills 8 to 12. On an area page the word runs the full width over a side block in columns 6 to 12 (title, lead, the people who build it, the primary pill), at least 70svh tall and aligned to the bottom. On the team page each member's photo takes four columns and the text seven, flipping sides from one member to the next. Other sections use asymmetric fractional pairs: 7fr / 5fr for staggered work, 7fr / 4fr for the contact band, 5fr / 7fr for contact, and 1fr / 3fr for tool ledgers.
- **Portrait duo:** from 960px the two portraits are each 52% wide and sit on a diagonal inside a box `min(44rem, 80svh)` tall, Sergey top left and Anastasia bottom right. Below that they sit side by side as two equal cards, with the name and role under each photo instead of over it.
- **Area grid:** an area's work is a dense card grid: one column, two from 720px, three from 1100px. Wide cards span two columns and tall cards two rows, so the grid never reads as a row of equal cards. Projects whose main `area` is this one come first, then those that list it in `also`.
- **Strata:** from 900px each of the five layers is a 12-column row aligned to the baseline. Words swing left (columns 1 to 8) and right (columns 5 to 12, justified to the end), with the proof block in the opposite columns. Short words ("3D", "AI") take fewer columns and pull their proof in close. Layers are spaced `clamp(3.5rem, 9vh, 6.5rem)` apart.
- **Asymmetry devices:** the right work column starts lower (`clamp(4rem, 12vw, 10rem)`). Reasons indent 8% and even reasons drop 4rem. Schema chips step right 8% and then 16%. Stage shots alternate a left and right inset of up to 5rem.
- **Project layouts:** the frontmatter `layout` field picks one of five.
  - **Case:** a 12-column head (title across, summary 1 to 6, facts 8 to 12), one wide hero shot, prose indented two columns, and a 7fr / 5fr gallery with even shots dropped 6rem.
  - **Stage:** a sticky story column (1 to 4) beside a wall of renders (6 to 12), each render hung on a panel lit in the project's glow.
  - **Cinema:** a full-viewport looping video under a night veil with the title at the bottom, then the cuts in a 2.2fr / 1fr pair.
  - **Compare:** each part is a 12-column row with its label alternating left and right and its board spanning 11 columns, offset to alternate sides.
  - **Boards:** a two-column presentation wall; wide boards span both columns.
- **Rhythm:** sections pad only above (`clamp(5rem, 13vh, 9rem)`), so there is more air above a heading than below it. Headline-to-content spacing is `clamp(1.75rem, 4vh, 2.75rem)`.
- **Ledgers:** tool lists are hairline-ruled rows (top rule on the list, bottom rule on each row), not grids of tiles.
- **Header:** sticky, 72px, with a translucent night gradient and a 14px backdrop blur. It gains a bottom hairline once the page is scrolled. Below 900px the brand row drops to 60px and the area links take a second row, for a full height of 106px (`--header-full`). Scroll padding and the team anchors' scroll margin read `--header-full` with `--header-h` as the fallback.
- **Footer:** from 820px the signature block and the people columns sit in a 1fr / auto pair, over a full-width base row.
- **Responsive:** single column below the grid breakpoints. Below 720px the header pill hides and the mobile dock takes over. The footer reserves extra bottom padding for the dock.

## Elevation & Depth

Depth comes from light, not from stacked shadows. The sky is three layered radial gradients behind a fixed plexus canvas whose own depth is optical: nodes off the focal plane blur into faint discs. Panels are translucent so the sky shows through. Panels sit flat at rest. On hover they lift (translateY -4 to -6px) and gain one long, soft drop shadow, and the cursor-lit rim brightens. Pictures are the exception: portraits, stage renders and compare boards rest on a long, soft drop tinted in their owner's or project's light. The primary pill also rests on a soft teal bloom. Glows are always blurred, never hard-edged.

### Shadow Vocabulary
- **Hover drop** (`box-shadow: 0 28px 60px -28px rgba(0, 0, 0, 0.9)`): work card on hover.
- **Portrait drop** (`box-shadow: 0 30px 60px -30px rgba(0, 0, 0, 0.9), 0 18px 50px -30px rgba(var(--tone-rgb), 0.5)`): the home portrait frames and the team photos, at rest.
- **Stage glow** (`box-shadow: 0 40px 80px -50px color-mix(in srgb, var(--glow) 60%, transparent)`): stage walls. Compare boards use the same shape at 45%.
- **Render drop** (`box-shadow: 0 30px 60px -24px rgba(0, 0, 0, 0.85)`): a render hung on a stage wall.
- **Pill bloom** (`box-shadow: 0 10px 26px -12px rgba(var(--teal-rgb), 0.75)`): the primary pill at rest. On hover it deepens to `0 14px 34px -12px rgba(var(--teal-rgb), 0.95), 0 6px 22px -10px rgba(255, 196, 107, 0.7)`.
- **Dock lift** (`box-shadow: 0 12px 32px -8px rgba(0, 0, 0, 0.7)`): the fixed mobile contact pill.
- **Mark glow** (`box-shadow: 0 0 12px 2px <owner at 55%>`): person marks. The nav dot uses `0 0 8px` in the owner's light.
- **Face ring** (`box-shadow: 0 0 0 1px <owner>`): the small round faces in a layer's proof, over a 2px Night border.

### Named Rules
**The Light Not Shadow Rule.** Panels are flat at rest. Elevation appears only as a response to hover or focus, and coloured depth always comes from an owner's or a project's light. Only pictures and the primary pill's bloom rest with depth.

## Shapes

Three corner sizes and a full round. Panels (cards, portraits, the form, shots) use gently rounded 18px corners. Stage walls step out to 24px around their renders. Things nested inside a panel (inputs, form options, schema chips, diagram nodes, brand boards) use 12px. Every control and small token (pills, tags, nav links, layer work links, area link pills, the CV button, cover notes, the video toggle, the skip link) is fully round; the only exception is the CV button's PDF badge, a 6px chip. Person marks are small glowing discs (0.62em). Faces are full circles: 1.5rem on cards, 2rem on project facts, 2.4rem in a layer's proof, 3rem beside an area word. Rules are 1px hairlines. Card media clips to the inner radius, calculated as the panel radius minus 1px. Portraits are revealed through a clip-path inset that carries the 18px round, so the corners hold through the motion.

The logo is the system's one figurative shape: two swifts crossing, drawn as filled paths. The upper bird is Logo Upper (white) and the lower is Logo Lower (royal blue), the same on every page. It appears in the header (1.9rem), the footer (3.5 to 5rem) and the favicon (the same two fills on a Night rounded square).

## Components

### Buttons
- **Shape:** fully round pill (999px), with a 1px Strong Hairline border, Control type (500 at 0.98rem), and a trailing stroked arrow that slides 3px right on hover.
- **Primary:** one pill on every page, whatever its tone: a 105deg gradient of ice, teal, amber, teal and ice, 200% wide, flowing sideways on a 7s linear loop (`flow`, which moves exactly one gradient length so the loop has no seam). Night text at 600, no border, and the pill bloom. On hover it brightens (`brightness(1.08) saturate(1.15)`), the bloom deepens and picks up amber, and it lifts 1px. Under reduced motion the gradient stands still.
- **Ghost:** transparent with a Strong Hairline border. On hover the border shifts to the accent at 60%.
- **CV download:** a pill outlined in the person's light at 60%, Moonlight text at 600, with a stroked download arrow in the person's light and a 6px "PDF" badge (tone at 16%, Label size). On hover it fills with the person's light, the text, arrow and badge turn Night, and the arrow drops 2px. A quiet "View in browser" text link sits beside it.
- **Focus:** a 2px accent outline at a 3px offset (global).

### Tags
- **Style:** fully round, a 1px Hairline border, Soft text at 0.82rem, padding of 0.28rem by 0.7rem, no fill.
- **Layer work links:** the same hairline pill with a trailing arrow, padding 0.4rem by 0.85rem. On hover the border takes the layer's light (teal for the shared AI layer) and the text turns Moonlight. Each layer closes with an "All {area} work" link in its light at 600, with an arrow that slides 4px.
- **Area links:** the same hairline pill without a fill, in Small type. On the home page's work head they hover to Strong Hairline; on the team page each member's areas (with an arrow) hover into that person's light.

### Cards / Containers
- **Corner Style:** 18px.
- **Background:** Panel Surface. Media falls back to a tone-tinted radial over a deep teal gradient.
- **Border:** 1px Hairline, plus the cursor-lit rim (see the signature component below).
- **Shadow Strategy:** flat at rest, hover drop on hover (see Elevation & Depth).
- **Internal Padding:** 1.1rem 1.3rem 1.4rem. Wide cards use 2rem.
- **Variants:** normal (16:10 media), tall (media absorbs extra height, minimum 22rem), and wide (media and body side by side from 720px). Meta line in Muted: the builder's round face (1.5rem, rimmed in the card's tone at 50%) and first name, or the area label where the builder isn't shown, then the date or "Under NDA" in the card's tone.
- **Built by:** on project pages the first fact names the builder: a 2rem round face in a Strong Hairline rim beside their full name in Moonlight at 600, linking to their team entry and hovering into the accent. Fact labels sit above in the accent at 0.85rem.

### Inputs / Fields
- **Style:** 12px corners, a 1px Hairline border, a translucent night fill (`rgba(var(--night-rgb), 0.6)`), and UI text. Labels sit above in Soft at Small size.
- **Hover:** border moves to Strong Hairline.
- **Focus:** border becomes the accent, plus a 3px accent halo at 18%. The surrounding form panel border warms to the accent.
- **Error / Disabled:** Invalid border on `aria-invalid`. A disabled submit drops to 60% opacity with a progress cursor.
- **Person choice:** radio cards with 12px corners. When checked, the border takes that person's light and the panel gets a 7% wash of it. "Both" uses Moonlight Text. Picking a person retints the net.

### Navigation
- **Header:** the swift logo and "Phoenixer Labs" in Wordmark type at the left, then the five area links (Backend, AI, 3D, Frontend, Design) in Soft, then Team, set apart by a hairline divider, and the primary pill at the far right. On hover the two birds pull apart by 3%.
- **States:** hover or `aria-current` turns the link Moonlight Text and lights a 5px glowing dot beneath it in the area's tone: ice for Backend, amber for 3D, Frontend and Design, teal for AI and Team.
- **Mobile:** below 900px the area links move to a second row that scrolls sideways, edge to edge, with no scrollbar and its ends faded by a gutter-wide mask. Below 720px the header pill hides.

### Footer
A top hairline over a gradient that deepens to Night at 85%, in Muted at Small size. The signature block puts the logo beside "Phoenixer Labs" (Title size, 650) and a one-line note. The people columns each lead with the person's mark and name in Moonlight (linking to their team entry), with their profile links and CV indented to the mark; links hover into that person's light. A base row under its own hairline, in Caption size, holds the year and a "Start a project" arrow link.

### Cursor-Lit Rim (signature)
A pseudo-element covers the border box (inset -1px, 1px padding) and fills it with a radial gradient of the element's tone, centred at the pointer (`--mx`, `--my`). On cards it fades from the tone at full strength, through the tone at 50%, to teal at 25%, then transparent; on portraits it fades from the tone to the tone at 35%, then transparent. A content-box mask exclude cuts it down to a 1px rim. On cards a second, softer radial wash (tone at 8%) fills the interior. The rim rests at 30% opacity on cards (hidden on portraits) and goes to 100% on hover or keyboard focus. A single delegated pointer listener sets the variables and tilts work cards up to about 2.5 degrees on each axis; portraits light up but do not tilt. It is active only with `(hover: hover)` and no reduced-motion preference.

### Portrait Duo (signature)
The home hero's two people, each linking to their entry on the team page. Each is a 4:5 photograph in its own colours (no tint, a touch of extra contrast) in an 18px frame with a 1px border in the person's light at 30% and the portrait drop. A Night gradient rises from the bottom under the name and role tag and an arrow in the person's light. On hover the photo scales to 1.045 and brightens, the rim lights, and the arrow slides 4px. On load each portrait is revealed upward through a rounded clip (1.4s, Anastasia 0.2s later), and a 1px teal thread then draws itself between them (2.4s after a 1s delay). Below 960px the gradient and thread drop away and the name and role sit under each photo.

### Team Member
The team page gives each person a section anchored by their slug (`/team#sergey`, `/team#anastasia`, where the old person URLs redirect). A 4:5 untinted photo in an 18px frame, rimmed in the person's light at 35% with the portrait drop, sits beside the name (Headline), a role line in the person's light (Lead), the intro in Soft, pills to the areas they cover, their tools in Muted, the CV download button and their profile links, which hover into their light. Sections alternate photo left and photo right.

### Layer Words (signature)
"Five layers, two people" is one huge word per area (Layer Word type), swinging left and right down the page beside a proof block: the owners' round faces and names, a line of text, work links, and a link to the area page. The word's outline is always present as a 1px Strong Hairline text stroke. Its ink, in the owner's light, fills in by a scroll-driven animation (`animation-timeline: view()`, range `entry 30%` to `cover 50%`), wiping from the left on left words and from the right on right words. "AI" is split: the A in ice, the I in amber. Where scroll timelines are unsupported, or motion is reduced, the ink is simply full. On its own page the area word grows to Area Word size, its outline offset 0.04em down and right, and its ink wipes in from the left over 1.4s on load.

### Plexus Net (signature)
The background canvas, persisted across navigation. About 150 nodes (80 on small screens) and dust drift in a slowly turning volume, linked by threads when they are close. Nodes are weighted by the page's tone: studio pages (home, AI, team, contact) balance pale teal, ice and amber with teal-cyan threads; Sergey's tone (Backend, his projects) mutes amber and threads go ice-blue; Anastasia's tone (3D, Frontend, Design, her projects) mutes ice and threads go warm gold. On first load the camera dives in from far out; when the tone changes it hops forward and eases back, and the weights and thread colour blend over about half a second. The cursor tilts the view slightly. It fades in over 1.4s, stops while the tab is hidden, and draws a single still frame under reduced motion.

### Mobile Contact Dock (signature)
A solid primary pill fixed at the bottom right (16px plus the safe-area inset), shown only below 720px. It stays hidden until the page has scrolled past 70% of the viewport, and steps aside whenever another solid pill inside main is in view. It slides up on the shared ease curve and is not rendered on the contact page.

### Person Mark
A 0.62em disc in ice or amber with a 12px glow. It tags who did what in the footer, the platform diagram, the contact channels and form options. On cards and project pages the builder is shown by a round face instead.

## Do's and Don'ts

### Do:
- **Do** organise by technology area, set each page's tone on `html[data-owner]` from the area (or the project's builder), and let `--accent`, `--line`, `--glow-a/b` and `--sky-a` carry the theme.
- **Do** mark authorship with the builder's round face, the glowing person mark, or a hairline in that person's light. Show photographs in their own colours.
- **Do** keep panels translucent over the sky (Panel Surface, 1px Hairline, 18px corners) and give interactive panels the cursor-lit rim.
- **Do** compose asymmetrically: uneven fractional columns, a staggered second column, and the display headline left-weighted across most of the grid.
- **Do** give each project a `layout` that fits the work and a `glow` that lights it, and keep that glow in the atmosphere.
- **Do** keep contact one step away: the flowing primary pill in the header on desktop, the dock on mobile, and a contact band at the end of content pages.
- **Do** use the single ease curve `cubic-bezier(0.2, 0.8, 0.2, 1)` and disable all animation and transitions under reduced motion.

### Don't:
- **Don't** use ice on Anastasia's things or amber on Sergey's, and don't add an accent hue beyond ice, amber and teal for controls or text. The logo's white and royal blue stay in the mark.
- **Don't** split pages by person again, tint portraits, or retint or dim the logo per page.
- **Don't** introduce a second typeface or uppercase, letter-spaced labels.
- **Don't** put resting shadows on panels. Depth comes from the sky, translucency and hover light.
- **Don't** lay work out as a row of equal cards or capabilities as an icon grid. Use staggered columns, hairline ledgers and the layer words.
- **Don't** add icon sets. The vocabulary is the person mark, the round face, the swift logo and the single stroked arrow (turned down onto a baseline for downloads).

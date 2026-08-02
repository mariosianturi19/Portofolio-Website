# Portfolio Design System

## Product intent

The portfolio should help a recruiter understand Togar Anthony Mario Sianturi's developer positioning, project evidence, and work history quickly. Visual treatments support the content hierarchy and must not imply production, deployment, ownership, or measured outcomes that the source cannot prove.

## Visual foundation — Cinematic Dark Editorial + Engineering Spec Details

The direction is a **cinematic dark editorial** base (studio-grade, elegant, motion-rich) with two borrowed "engineering" accents: mono spec-sheet metadata and firm numeric indexing. The result should read as *premium studio craft built by an engineer* — luxurious to every audience, credibly technical to technical reviewers.

### Color

- **Dark-only.** There is no light theme; the theme toggle is removed.
- Background `#0A0A0F`, elevated surface `#0E0E14`, ink `#EDEDF2`, muted `#8B8B99`.
- Single accent: lime `#D4FF4F` (`primary`). Used sparingly — active states, key highlights, status dots, spec values. Never as large fills except the primary CTA.
- Separators are 1px lines at `rgba(237,237,242,.08)` (`border`). No thick borders, no hard shadows, no saturated secondary palette.
- Text on the lime accent is always `#0A0A0F`.
- Semantic Tailwind tokens map to these: `background`, `foreground`, `card`, `muted`, `primary`, `border`, `ring` (focus = lime).

### Typography

- Display: `Syne` 700–800 (`--font-display`), uppercase, tight tracking (`-0.02em` to `-0.03em`). Used for h1–h3, case-study titles, the footer name wall, and large index numbers.
- Body/UI: `Inter Tight` 300–500 (`--font-sans`). Long copy uses light weight with generous line-height (1.7–1.8).
- Mono: `JetBrains Mono` (`--font-mono`) for spec-sheet labels/values, kickers, metadata, counters, and nav numbering. Uppercase with wide letter-spacing (0.1–0.2em) for labels.
- One borrowed display trick: a headline line may render as outline stroke (`-webkit-text-stroke: 1.5px`) with transparent fill.

### Shape and depth

- Radius: generous — pills for primary CTAs and status chips, 12–16px for cards/modals/images.
- Depth comes from translucency, 1px lines, and soft focus glows — **never** hard offset shadows or thick outlines.
- No gradients except the single restrained accent treatment (text gradient on special words, aurora-free). No blur-heavy decorations.

### Engineering accents (borrowed, small dose)

1. **Spec-sheet blocks** — mono, uppercase, `LABEL` in muted + value in ink, optionally separated by a 1px left rule. Used in the Hero (ROLE/STACK/BASE/STATUS), case-study rows (`WEB / Next.js · TS / 2025`), and the project modal (ROLE/STACK/STATUS).
2. **Firm numbering** — sections indexed `01 /`, case studies numbered `01–05` in large Syne (idle at low opacity, lime on hover), counters like `05 CASE STUDIES` and `CASE STUDY — 01 / 05`.
- Not borrowed (deliberately): technical grid backgrounds, crosshairs, orange accent, zero-radius boxes, stepped transitions.

## Content hierarchy

1. Role positioning and availability.
2. Five source-backed case studies.
3. Additional projects, which remain visible but secondary.
4. Evidence-based skills linked to named projects.
5. Experience achievements, education, and contact.

## Language and navigation

- The public portfolio is English-only.
- Desktop nav: thin fixed bar, transparent at top, gaining a translucent blurred background after ~80px scroll. Links are small uppercase mono with `01 /` index prefixes; the active section gets a sliding lime underline. CTA is a pill outline that fills lime on hover.
- Mobile nav: full-screen overlay with large staggered Syne links indexed `01–06`.
- A custom cursor (lime dot, `mix-blend-mode: difference`, grows over interactive elements) is active on pointer-fine devices only; it is disabled on touch and under `prefers-reduced-motion`.
- Theme controls are removed (single dark theme). Language controls remain omitted.

## Case-study pattern

- List: full-width editorial rows — large index number, Syne title, mono spec line (`CATEGORY / stack / year`), circular arrow button. Hover: row indents, title and index turn lime, arrow fills and rotates 45°.
- Floating preview: on row hover (pointer-fine only), the project screenshot floats and follows the cursor with lag and a slight scale-in.
- Additional projects: 2-column image grid; images render grayscale and colorize + slight zoom on hover.
- Detail modal: full-width bottom sheet over a dimmed blurred backdrop. Fixed top bar carries `CASE STUDY — NN / 05`, prev/next, and close. Body: screenshot gallery with slider/thumbnails on one side; spec sheet, challenge, delivered work, engineering decisions (numbered), outcome, highlights, tech tags, and action links on the other.
- Status copy must distinguish current source availability from production deployment.
- Premier League must state that its teammate-owned external API is no longer available.
- Telkomsel and Hermes must distinguish original internship work from later local modernization or preservation.

## Skills pattern

- No proficiency percentages or Expert/Advanced labels.
- Group headers use Syne titles with mono group codes (`SK-01`); each capability keeps its concise definition, named project evidence, and tools.
- Evidence links return the reader to Projects and render as underline-accent text links with an arrow, not chips.
- The Working toolkit stays as two continuously moving logo rows; logos sit unboxed at low opacity and colorize on hover. Names remain available to assistive technology.

## Brand and sharing assets

- Brand mark: `MARIO.SIANTURI` wordmark with a lime dot; compact form `MS.` set in Syne with the lime dot. Legible at favicon size, no ornament.
- Social preview: 1200 x 630 dark card — Syne headline, mono spec rows, single lime accent block.
- Assets must not imply company affiliation or deployed project status.

## Responsive behavior

- Mobile preserves the same hierarchy in one column.
- The custom cursor and floating project preview are pointer-fine only; on touch, rows simply open the modal.
- The project modal becomes a full-height sheet; its top bar keeps close and navigation controls fixed while the body scrolls independently.
- Back to Top hides on mobile and while the modal is open; the footer retains a text action (`BACK TO TOP ↑`).
- Minimum 44px touch targets on primary mobile controls.

## Motion and accessibility

- Motion character: **weighted and cinematic** — 0.5–1s durations, `cubic-bezier(.16,1,.3,1)` easing, mask/translate reveals, no springs, no bounce, no blur-spam.
- Hero headline reveals per line with an overflow mask; sections fade/slide subtly with stagger; interactive elements respond with smooth transforms only.
- Magnetic effect on primary CTAs (pointer-fine only).
- Marquee strips (tech stack, footer) move linearly and loop seamlessly.
- `prefers-reduced-motion` disables the preloader, cursor, marquee, and non-essential animation.
- Preserve visible keyboard focus (lime outline), semantic dialog behavior, focus trapping, Escape-to-close.
- Contrast targets WCAG AA: ink/muted on background, `#0A0A0F` on lime.

## Preloader

- Concept stays a short boot sequence, restyled to the direction: ink background, Syne monogram, mono counter, thin lime progress line, staggered mono tech labels. No confetti shapes, no sticker tiles.

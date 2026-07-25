# PPT-Style Draw.io Visual System

## 1. Design Character

Aim for five qualities:

- Calm: use off-white backgrounds and low-noise decoration.
- Clear: make reading order obvious without explanation.
- Friendly: use rounded cards, soft tints, and plain language.
- Precise: align every object to a consistent grid.
- Editable: construct visuals from native Draw.io shapes and text.

## 2. Canvas and Grid

Use these defaults unless the destination requires another format:

| Use | Canvas | Safe area | Grid |
|---|---:|---:|---:|
| Presentation / landscape | 1600 × 900 | 80 px | 10 px |
| Document / portrait | 1200 × 1600 | 70 px | 10 px |
| Wide architecture | 1920 × 1080 | 90 px | 10 px |

- Use an outer page background of `#F7F8FC`.
- Keep the main diagram within the safe area.
- Use an 8/10 px spacing rhythm.
- Prefer gaps of 24, 30, 40, 60, or 80 px.

## 3. Color Tokens

### Neutral palette

| Token | Hex | Use |
|---|---|---|
| Canvas | `#F7F8FC` | Page background |
| Surface | `#FFFFFF` | Cards |
| Ink | `#1F2340` | Titles and dark panels |
| Body | `#3F435E` | Primary body text |
| Muted | `#747995` | Descriptions |
| Quiet | `#9A9EB5` | Dates and secondary labels |
| Border | `#E7E8F2` | Card borders |
| Connector | `#D9DCEF` | Structural lines |
| Dark surface | `#303552` | Items on dark panels |

### Stage palette

Use one accent family per stage. Do not use all colors unless the stages are distinct.

| Accent | Strong | Tint | Dark text |
|---|---|---|---|
| Violet | `#6C63FF` | `#EEEAFE` | `#5B52E6` |
| Teal | `#22B8A7` | `#E5F8F5` | `#159889` |
| Amber | `#FFB547` | `#FFF2DD` | `#D98A14` |
| Coral | `#FF6B7A` | `#FFE9EC` | `#E94F60` |
| Blue | `#4F8BFF` | `#EAF1FF` | `#316DD9` |

Use strong colors for thin bars, small badges, current states, or key milestones. Use tints for number circles and secondary chips. Keep large areas neutral.

## 4. Typography

Use system-safe fonts:

`Helvetica, Arial, PingFang SC, Microsoft YaHei, sans-serif`

| Level | Size | Weight | Color |
|---|---:|---:|---|
| Eyebrow | 13–15 | 700 | Accent |
| Main title | 32–40 | 700 | Ink |
| Subtitle | 16–18 | 400 | Muted |
| Card title | 21–24 | 700 | Ink |
| Body / task | 14–16 | 400–500 | Body |
| Metadata | 12–14 | 600–700 | Quiet |
| Chip / milestone | 12–14 | 600–700 | Accent dark |

- Use sentence case.
- Avoid centered paragraphs; center only short labels, badges, and numbers.
- Keep paragraphs left-aligned.
- Use no more than three type sizes within one card.

## 5. Core Components

### Stage card

- Width: 280–340 px.
- Height: 300–380 px.
- Radius: 16–20 px.
- Fill: Surface.
- Border: 1–2 px Border.
- Internal padding: 28–40 px.
- Add a 12–16 px accent strip at the top.
- Place a 48–56 px tinted number circle near the upper left.
- Place time metadata at the upper right.
- Put the milestone in a full-width tinted chip at the bottom.

### Section panel

- Use Ink as the background.
- Radius: 16–20 px.
- Place small Dark surface items inside.
- Reserve the main accent for the current or concluding item.

### Badge

- Height: 34–48 px.
- Use a pill radius.
- Keep text to one short phrase.
- Use Ink for primary goals and a tint for secondary status.

### Connectors

- Use 3–4 px Connector strokes for major flow.
- Use 2 px strokes for secondary relations.
- Use rounded elbows or simple straight paths.
- Use small block arrows; do not use oversized arrowheads.
- Route connectors through open space and behind content.

## 6. Layout Patterns

### Horizontal learning road

Place 3–5 equal stage cards in a row. Connect card centers. Add a dark weekly-rhythm or summary panel below. Use the supplied learning-roadmap asset as the base.

### Vertical process

Place the title at top left. Stack nodes on one central guide. Put inputs on the left and outputs or evidence on the right. Use accent only for current or critical steps.

### Hub and spoke

Use one larger neutral center node. Arrange 4–6 category cards around it at equal distances. Give categories distinct accents only when they represent different semantics.

### Comparison grid

Use equal columns with a shared header row. Align repeated fields exactly. Use ticks and brief labels rather than paragraphs.

### Architecture layers

Use broad neutral containers for layers. Keep services white. Color by semantic domain, not by arbitrary component identity. Put external systems outside the primary boundary.

## 7. Style Guardrails

Avoid:

- Saturated page backgrounds.
- More than five accents on one page.
- Gradients unless the user explicitly asks for them.
- Heavy shadows, glossy effects, or 3D shapes.
- Mixed corner radii.
- Long sentences inside nodes.
- Crossed connectors.
- Icons with inconsistent line weights.
- Decorative arrows that duplicate obvious reading order.

Prefer:

- Soft borders over shadows.
- Larger whitespace over separators.
- Position and alignment over extra labels.
- Short measurable milestones over vague outcomes.
- One strong focal element per page.

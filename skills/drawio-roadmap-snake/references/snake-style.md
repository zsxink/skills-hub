# Snake Roadmap Style Specification

## Route Model

Treat each lane in a paired turn as one native Draw.io arc vertex. Match the two arcs by tangent line, vertical center, stroke thickness, and radius offset.

For a lane thickness `T`:

- Use `T = 60 px` for a 1800–2200 px wide canvas.
- Separate paired centerlines by `T - 2 px` to create a 2 px overlap.
- Use an outer turn radius of at least `2.5T`.
- Use `inner radius = outer radius - centerline separation`.
- Keep both lanes on the same turn center.

Example:

- Outer centerline: `y = 40`, stroke `62`.
- Inner centerline: `y = 100`, stroke `62`.
- Centerline separation: `60`.
- Effective overlap: `2`.

## Smooth U-turn Construction

Use Draw.io's native `mxgraph.basic.arc` vertex. Desktop Draw.io and diagrams.net render this geometry consistently:

```xml
<mxCell id="right-outer-turn" value=""
  style="shape=mxgraph.basic.arc;html=1;shadow=0;dashed=0;startAngle=0;endAngle=0.5;strokeWidth=62;strokeColor=#FF6208;startArrow=none;endArrow=none;"
  vertex="1" parent="1">
  <mxGeometry x="1600" y="40" width="380" height="430" as="geometry"/>
</mxCell>

<mxCell id="right-inner-turn" value=""
  style="shape=mxgraph.basic.arc;html=1;shadow=0;dashed=0;startAngle=0;endAngle=0.5;strokeWidth=62;strokeColor=#FF8B68;startArrow=none;endArrow=none;"
  vertex="1" parent="1">
  <mxGeometry x="1660" y="100" width="260" height="310" as="geometry"/>
</mxCell>
```

For this pair:

- Both tangent endpoints lie on `x = 1790`.
- Both vertical centers lie on `y = 255`.
- The outer bulge reaches `x = 1980`.
- The inner bulge reaches `x = 1920`.
- The 60 px radius difference matches the lane-center separation.

Use these angle pairs:

- Right U-turn: `startAngle=0;endAngle=0.5`.
- Left U-turn: `startAngle=0.5;endAngle=1`.

Never construct a turn from:

- Draw.io edges with `curved=1` and several control points.
- Embedded SVG image cells; Draw.io desktop export may omit them.
- Nested rounded rectangles.
- White cutout shapes.
- Masks covering half of an oval.
- Independent arcs with different centers.

Those methods can create slopes, steps, flat spots, and visible seams in Draw.io even when a separate SVG preview looks correct.

## Stacking Order

Use this order:

1. Canvas background.
2. Native Draw.io arc cells.
3. Straight colored bands.
4. Section labels.
5. Knowledge items.
6. Legend.

Align each straight band centerline exactly with the arc endpoint. Place the band after the arc in XML so it covers any sub-pixel cap artifact.

## Information Layout

Use a two-level band:

- Outer lane: major stage such as 基础、设计、架构、环境.
- Inner lane: category such as 编程基础、后端语言、版本控制.

Place knowledge items in columns inside the white corridor. Use the same column width as the corresponding category band.

Recommended column widths:

- 260–320 px on a 2000 px canvas.
- 4–5 columns per run.
- 40–55 px left padding.

Recommended row spacing:

- 44–54 px per item.
- 20–30 px gap below the category band.

## Priority Markers

Use 28–32 px circles:

- A / required: `#D80816` with white text.
- B / awareness: `#929292` with white text.
- Optional C: `#C8A035` with white text.

Keep marker semantics global. Do not use the same letter or color for different meanings.

## Color Pairs

| Stage | Outer lane | Inner lane |
|---|---|---|
| Foundation | `#F2BA23` | `#FFE38F` |
| Design | `#FF6208` | `#FF8B68` |
| Architecture | `#82F1F2` | `#20B7E8` |
| Environment | `#1EC38D` | `#83F47D` |

Choose one pair per major stage. Preserve lane brightness relationships across the full route.

## Canvas

Default to `2000 × 900` for a three-run roadmap. Increase height by 340–440 px for each additional run. Keep at least 60 px outside each turn and avoid placing labels on the curved portion.

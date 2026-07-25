# Draw.io XML Patterns

## Minimal Editable Document

Use uncompressed XML for generated files:

```xml
<mxfile host="app.diagrams.net">
  <diagram id="page-1" name="Page-1">
    <mxGraphModel grid="1" gridSize="10" page="1" pageWidth="1600" pageHeight="900">
      <root>
        <mxCell id="0"/>
        <mxCell id="1" parent="0"/>
        <!-- cells -->
      </root>
    </mxGraphModel>
  </diagram>
</mxfile>
```

## Native Card

```xml
<mxCell id="stage-1-card" value=""
  style="rounded=1;arcSize=8;whiteSpace=wrap;html=1;fillColor=#FFFFFF;strokeColor=#E7E8F2;strokeWidth=2;"
  vertex="1" parent="1">
  <mxGeometry x="100" y="250" width="320" height="350" as="geometry"/>
</mxCell>
```

Use separate text cells over the card so users can reposition or edit them independently.

## Text Cell

```xml
<mxCell id="stage-1-title" value="定位与诊断"
  style="text;html=1;strokeColor=none;fillColor=none;align=left;verticalAlign=middle;fontFamily=Helvetica;fontSize=23;fontStyle=1;fontColor=#1F2340;"
  vertex="1" parent="1">
  <mxGeometry x="130" y="380" width="240" height="36" as="geometry"/>
</mxCell>
```

Use `fontStyle=1` for bold. Encode rich line breaks as `&lt;br&gt;`.

## Connector

```xml
<mxCell id="flow-1-2" value=""
  style="edgeStyle=orthogonalEdgeStyle;rounded=1;html=1;strokeWidth=4;strokeColor=#D9DCEF;endArrow=block;endFill=1;endSize=10;"
  edge="1" parent="1" source="stage-1-card" target="stage-2-card">
  <mxGeometry relative="1" as="geometry"/>
</mxCell>
```

Define connectors before foreground cards when the connection should render behind them.

## Geometry and Ordering

- Give every cell a unique descriptive ID.
- Keep page-sized backgrounds first.
- Put connectors before nodes if they must appear behind nodes.
- Put containers before their internal text and chips.
- Use absolute geometry for presentation-like diagrams.
- Use relative edge geometry only for connected edges.
- Keep repeated dimensions and coordinates mechanically consistent.

## Escaping

Escape:

- `&` as `&amp;`
- `<` as `&lt;`
- `>` as `&gt;` when used inside attribute values
- `"` as `&quot;` inside quoted attribute values

Prefer Chinese punctuation and short phrases over HTML-heavy content. Use only simple tags such as `<b>` and `<br>` after XML escaping.

## Preview

Prefer Draw.io CLI export when installed:

```bash
drawio --export --format svg --output preview.svg diagram.drawio
drawio --export --format png --scale 2 --output preview.png diagram.drawio
```

If Draw.io CLI is unavailable, create a matching SVG preview from the same geometry and text. Treat the `.drawio` source as authoritative and keep both artifacts synchronized.

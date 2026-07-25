# design-spec.md — Shared visual spec for both drawio-roadmap-* skills

## Color palette (exact hex)

### Snake style

| Role | Fill | Stroke | Text |
|---|---|---|---|
| Title plaque | `#1A1A1A` | — | White `#FFFFFF` |
| Sub-title (官网) | `#8C8C8C` | — | White `#FFFFFF` |
| Stage 1 基础 pipe | `#F5C518` | `#E6B800` | — |
| Stage 1 基础 bg | `#FDF3CE` | — | Black `#000000` |
| Stage 2 设计 pipe | `#F5842C` | `#E07720` | — |
| Stage 2 设计 bg | `#FBD9BC` | — | Black `#000000` |
| Stage 3 架构 pipe | `#12B5E5` | `#0FA0CD` | — |
| Stage 3 架构 bg | `#BEE9F7` | — | Black `#000000` |
| Stage 4 环境 pipe | `#12C08B` | `#0FAD7A` | — |
| Stage 4 环境 bg | `#BCE9D8` | — | Black `#000000` |
| Stage 5 开发 pipe | `#1ED6A0` | `#1AC290` | — |
| Stage 5 开发 bg | `#C6F2E4` | — | Black `#000000` |
| Badge A | `#E8352E` | — | White `#FFFFFF` |
| Badge B | `#8C8C8C` | — | White `#FFFFFF` |

### Swimlane style

| Role | Fill | Stroke | Text |
|---|---|---|---|
| Lane 1 Foundation | `#E3F2FD` | `#1565C0` | — |
| Lane 1 chip | `#1565C0` | — | White |
| Lane 2 Sub-Agents | `#E8F5E9` | `#2E7D32` | — |
| Lane 2 chip | `#2E7D32` | — | White |
| Lane 3 Skills | `#FFF3E0` | `#E65100` | — |
| Lane 3 chip | `#E65100` | — | White |
| Lane 4 Core Mechanisms | `#F3E5F5` | `#6A1B9A` | — |
| Lane 4 chip | `#6A1B9A` | — | White |
| Lane 5 Engineering | `#E0F7FA` | `#00838F` | — |
| Lane 5 chip | `#00838F` | — | White |
| Lane 6 Closing | `#FCE4EC` | `#AD1457` | — |
| Lane 6 chip | `#AD1457` | — | White |
| Side-branch | `#FFFDE7` dashed | `#F9A825` | — |

## draw.io shape patterns

### Snake pipe row
```
<mxCell id="..." value="" style="rounded=1;whiteSpace=wrap;html=1;fillColor=#F5C518;strokeColor=#E6B800;strokeWidth=44;arcSize=20;container=1;collapsible=0;" vertex="1" parent="1">
  <mxGeometry x="40" y="Y" width="1820" height="320" as="geometry" />
</mxCell>
```

### U-turn connector (end of row → start of next)
```
<mxCell id="..." value="" style="rounded=1;whiteSpace=wrap;html=1;fillColor=#F5C518;strokeColor=#E6B800;strokeWidth=44;arcSize=50;curved=1;" vertex="1" parent="1">
  <mxGeometry x="1790" y="Y+320" width="200" height="200" as="geometry" />
</mxCell>
```

### Stage-title band
```
<mxCell id="..." value="基础" style="text;html=1;fontSize=42;fontStyle=1;align=center;verticalAlign=middle;fillColor=#F5C518;fontColor=#FFFFFF;rounded=1;" vertex="1" parent="1">
  <mxGeometry x="55" y="Y+40" width="160" height="240" as="geometry" />
</mxCell>
```

### Column header
```
<mxCell id="..." value="计算机基础" style="text;html=1;fontSize=18;fontStyle=1;align=center;verticalAlign=middle;fillColor=none;fontColor=#F5C518;" vertex="1" parent="1">
  <mxGeometry x="260" y="Y+30" width="220" height="30" as="geometry" />
</mxCell>
```

### Item (badge + text, no icon shape — use mxgraph stencil for real icon)
```
<mxCell id="..." value="<font style='font-size:11px'>A &nbsp; 计算机网络</font>" style="text;html=1;fontSize=11;align=left;verticalAlign=middle;fontColor=#000000;" vertex="1" parent="1">
  <mxGeometry x="265" y="Y+80" width="210" height="20" as="geometry" />
</mxCell>
```
For the A badge circle, overlay a tiny ellipse cell:
```
<mxCell id="..." value="A" style="ellipse;whiteSpace=wrap;html=1;fillColor=#E8352E;fontColor=#FFFFFF;fontSize=10;fontStyle=1;align=center;verticalAlign=middle;" vertex="1" parent="1">
  <mxGeometry x="260" y="Y+81" width="16" height="16" as="geometry" />
</mxCell>
```

### Swimlane card
```
<mxCell id="..." value="01 登台远览&#10;全景技术导览" style="rounded=1;whiteSpace=wrap;html=1;fillColor=#FFFFFF;strokeColor=#1565C0;fontSize=12;fontStyle=1;" vertex="1" parent="1">
  <mxGeometry x="200" y="Y+10" width="200" height="70" as="geometry" />
</mxCell>
```

### Arrow (flexArrow style)
```
<mxCell id="..." edge="1" parent="1" source="last_card_id" target="next_lane_id" value=""
  style="shape=flexArrow;endArrow=classic;html=1;rounded=0;fillColor=#dae8fc;strokeColor=#6c8ebf;exitX=0.5;exitY=1;exitDx=0;exitDy=0;entryX=0.25;entryY=0;entryDx=0;entryDy=0;">
  <mxGeometry width="50" height="50" relative="1" as="geometry">
    <Array as="points">
      <mxPoint x="1000" y="MID_Y" />
      <mxPoint x="330" y="MID_Y" />
    </Array>
    <mxPoint x="1000" y="CARD_BOTTOM" as="sourcePoint" />
    <mxPoint x="330" y="LANE_TOP" as="targetPoint" />
  </mxGeometry>
</mxCell>
```
Route: card bottom center → down to midpoint → left to x=330 → up to lane top. `fillColor` uses a light tint of the source lane color.

## draw.io opening instructions

Tell the user:
- **VS Code**: install "Draw.io Integration" extension, open the .drawio file.
- **Web**: go to https://app.diagrams.net → "Open Existing Diagram" → select file.
- **Desktop**: download draw.io desktop from https://github.com/jgraph/drawio-desktop/releases

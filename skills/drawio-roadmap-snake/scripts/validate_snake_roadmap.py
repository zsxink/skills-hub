#!/usr/bin/env python3
"""Validate editable Draw.io snake-roadmap structure and turn construction."""

from __future__ import annotations

import argparse
import re
import sys
import xml.etree.ElementTree as ET
from pathlib import Path


def style_map(style: str) -> dict[str, str]:
    result: dict[str, str] = {}
    for part in style.split(";"):
        if "=" in part:
            key, value = part.split("=", 1)
            result[key] = value
    return result


def validate(path: Path) -> int:
    errors: list[str] = []

    try:
        root = ET.parse(path).getroot()
    except (OSError, ET.ParseError) as exc:
        print(f"ERROR: cannot parse {path}: {exc}")
        return 1

    if root.tag != "mxfile":
        errors.append("root element must be <mxfile>")

    cells = root.findall(".//mxCell")
    ids = [cell.get("id", "") for cell in cells]
    duplicate_ids = sorted({cell_id for cell_id in ids if cell_id and ids.count(cell_id) > 1})
    if duplicate_ids:
        errors.append(f"duplicate cell ids: {', '.join(duplicate_ids)}")

    forbidden = [cell_id for cell_id in ids if re.search(r"(turn-)?(mask|cutout)", cell_id, re.I)]
    if forbidden:
        errors.append(
            "turns must not use masks or cutouts: " + ", ".join(forbidden)
        )

    turns = [cell for cell in cells if "turn" in cell.get("id", "").lower()]
    if len(turns) < 2:
        errors.append("expected at least two cells whose ids contain 'turn'")

    for cell in turns:
        cell_id = cell.get("id", "<unknown>")
        style = style_map(cell.get("style", ""))
        if cell.get("vertex") != "1":
            errors.append(f"{cell_id} must be a native arc vertex")
        if style.get("shape") != "mxgraph.basic.arc":
            errors.append(f"{cell_id} must use shape=mxgraph.basic.arc")
        try:
            stroke_width = float(style.get("strokeWidth", "0"))
        except ValueError:
            stroke_width = 0
        if stroke_width < 40:
            errors.append(f"{cell_id} strokeWidth must be at least 40")
        start_angle = style.get("startAngle")
        end_angle = style.get("endAngle")
        valid_angles = {("0", "0.5"), ("0.5", "1")}
        if (start_angle, end_angle) not in valid_angles:
            errors.append(
                f"{cell_id} must use right-turn angles 0→0.5 or left-turn angles 0.5→1"
            )

        geometry = cell.find("mxGeometry")
        if geometry is None:
            errors.append(f"{cell_id} is missing mxGeometry")
            continue
        if not all(geometry.get(key) for key in ("x", "y", "width", "height")):
            errors.append(f"{cell_id} needs absolute x, y, width, and height")

    if errors:
        for error in errors:
            print(f"ERROR: {error}")
        return 1

    vertices = sum(cell.get("vertex") == "1" for cell in cells)
    print(f"OK: {path} — {vertices} vertices, {len(turns)} native arc turns")
    return 0


def main() -> int:
    parser = argparse.ArgumentParser(description=__doc__)
    parser.add_argument("file", type=Path)
    args = parser.parse_args()
    return validate(args.file)


if __name__ == "__main__":
    sys.exit(main())

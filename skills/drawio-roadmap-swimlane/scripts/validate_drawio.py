#!/usr/bin/env python3
"""Validate the basic structure and editability of a Draw.io XML file."""

from __future__ import annotations

import argparse
import sys
import xml.etree.ElementTree as ET
from pathlib import Path


def fail(message: str) -> None:
    print(f"ERROR: {message}")


def validate(path: Path) -> int:
    errors: list[str] = []
    warnings: list[str] = []

    try:
        tree = ET.parse(path)
    except (OSError, ET.ParseError) as exc:
        fail(f"cannot parse {path}: {exc}")
        return 1

    root = tree.getroot()
    if root.tag != "mxfile":
        errors.append("root element must be <mxfile>")

    diagrams = root.findall("diagram")
    if not diagrams:
        errors.append("file must contain at least one <diagram>")

    total_cells = 0
    total_vertices = 0
    total_edges = 0

    for index, diagram in enumerate(diagrams, start=1):
        model = diagram.find("mxGraphModel")
        if model is None:
            errors.append(
                f"diagram {index} is compressed or missing <mxGraphModel>; "
                "generated files should use editable uncompressed XML"
            )
            continue

        graph_root = model.find("root")
        if graph_root is None:
            errors.append(f"diagram {index} is missing <root>")
            continue

        cells = graph_root.findall("mxCell")
        total_cells += len(cells)
        ids: set[str] = set()

        for cell in cells:
            cell_id = cell.get("id")
            if not cell_id:
                errors.append(f"diagram {index} contains a cell without an id")
            elif cell_id in ids:
                errors.append(f"diagram {index} contains duplicate id {cell_id!r}")
            else:
                ids.add(cell_id)

            if cell.get("vertex") == "1":
                total_vertices += 1
                geometry = cell.find("mxGeometry")
                if geometry is None:
                    errors.append(f"vertex {cell_id!r} has no <mxGeometry>")
                elif not all(geometry.get(key) is not None for key in ("x", "y", "width", "height")):
                    warnings.append(f"vertex {cell_id!r} has incomplete absolute geometry")

            if cell.get("edge") == "1":
                total_edges += 1
                if cell.find("mxGeometry") is None:
                    errors.append(f"edge {cell_id!r} has no <mxGeometry>")

        if "0" not in ids or "1" not in ids:
            errors.append(f"diagram {index} must contain root cells with ids '0' and '1'")

    for warning in warnings:
        print(f"WARNING: {warning}")

    if errors:
        for error in errors:
            fail(error)
        return 1

    print(
        f"OK: {path} — {len(diagrams)} diagram(s), "
        f"{total_cells} cells, {total_vertices} vertices, {total_edges} edges"
    )
    return 0


def main() -> int:
    parser = argparse.ArgumentParser(description=__doc__)
    parser.add_argument("file", type=Path, help="Path to an uncompressed .drawio file")
    args = parser.parse_args()
    return validate(args.file)


if __name__ == "__main__":
    sys.exit(main())

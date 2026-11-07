#!/usr/bin/env python3
"""Generate a local Material Symbols variable WOFF2 subset from the pinned npm font.

The authoritative ligature list is MaterialIconName in src/shared/ui/MaterialIcon.tsx.
This script never fetches a font from an external host. It requires:
    python -m pip install -r requirements-fonts.txt
"""
from __future__ import annotations

import hashlib
import io
import json
import os
from pathlib import Path
import re
import sys

try:
    import uharfbuzz as hb
    from fontTools import subset
    from fontTools.ttLib import TTFont
except ImportError as exc:
    raise SystemExit(
        "Faltan herramientas de fuentes. Ejecutá "
        "'python -m pip install -r requirements-fonts.txt'."
    ) from exc

ROOT = Path(__file__).resolve().parents[2]
SOURCE = ROOT / "node_modules/material-symbols/material-symbols-outlined.woff2"
TYPES = ROOT / "src/shared/ui/MaterialIcon.tsx"
OUTPUT = ROOT / "src/assets/fonts/material-symbols-outlined-subset.woff2"
STAMP = ROOT / "src/assets/fonts/.material-symbols-subset.json"
GENERATOR_VERSION = "1"
MAX_OUTPUT_BYTES = 1_000_000


def icon_names() -> list[str]:
    typescript = TYPES.read_text(encoding="utf-8")
    declared = re.search(r"export type MaterialIconName\s*=\s*(.*?);", typescript, re.S)
    if declared is None:
        raise RuntimeError("No se encontró MaterialIconName en el componente institucional")
    names = re.findall(r"\|\s*'([a-z0-9_]+)'", declared.group(1))
    if len(names) < 10 or len(set(names)) != len(names):
        raise RuntimeError("Listado de MaterialIconName vacío, duplicado o incompleto")
    return sorted(names)


def sfnt_bytes(font: TTFont) -> bytes:
    font.flavor = None
    stream = io.BytesIO()
    font.save(stream, reorderTables=True)
    return stream.getvalue()


def shaper(sfnt: bytes):
    face = hb.Face(sfnt)
    font = hb.Font(face)
    font.scale = (face.upem, face.upem)

    def shape(text: str) -> tuple[int, ...]:
        buffer = hb.Buffer()
        buffer.add_str(text)
        buffer.guess_segment_properties()
        hb.shape(font, buffer, {"liga": True})
        return tuple(info.codepoint for info in buffer.glyph_infos)

    return shape


def axes(font: TTFont) -> tuple:
    if "fvar" not in font:
        raise RuntimeError("Material Symbols dejó de ser una fuente variable")
    return tuple(
        (axis.axisTag, axis.minValue, axis.defaultValue, axis.maxValue)
        for axis in font["fvar"].axes
    )


def build_subset(names: list[str]) -> int:
    original = TTFont(SOURCE, recalcTimestamp=False)
    original_axes = axes(original)
    full_shaper = shaper(sfnt_bytes(original))
    glyph_order = original.getGlyphOrder()

    # Guardar los glifos presentes en cada subcadena permite conservar los pasos
    # intermedios de las ligaduras de nombres largos sin incluir miles de íconos.
    needed_glyphs: set[str] = set()
    for icon in names:
        glyph_ids = full_shaper(icon)
        if len(glyph_ids) != 1 or glyph_ids[0] == 0:
            raise RuntimeError(f"Ícono sin ligadura válida en la fuente de origen: {icon!r}")
        for start in range(len(icon)):
            for end in range(start + 1, len(icon) + 1):
                for gid in full_shaper(icon[start:end]):
                    if gid >= len(glyph_order):
                        raise RuntimeError(f"ID de glifo inválido en {icon!r}")
                    needed_glyphs.add(glyph_order[gid])

    font = TTFont(SOURCE, recalcTimestamp=False)
    options = subset.Options()
    options.flavor = "woff2"
    options.layout_closure = False
    # Algunas ligaduras de Material Symbols requieren lookups OpenType auxiliares.
    # Se retienen las features originales, pero no se expande el conjunto de glifos.
    options.layout_features = ["*"]
    options.glyph_names = True
    options.recalc_timestamp = False

    subsetter = subset.Subsetter(options=options)
    subsetter.populate(glyphs=sorted(needed_glyphs), text="".join(names))
    subsetter.subset(font)

    OUTPUT.parent.mkdir(parents=True, exist_ok=True)
    temporary = OUTPUT.with_suffix(".woff2.tmp")
    font.flavor = "woff2"
    try:
        font.save(temporary, reorderTables=True)
        optimized = TTFont(temporary, recalcTimestamp=False)
        if axes(optimized) != original_axes:
            raise RuntimeError("El subset alteró los ejes o rangos de la fuente variable")
        optimized_shaper = shaper(sfnt_bytes(optimized))
        optimized_order = optimized.getGlyphOrder()

        for icon in names:
            before_ids = full_shaper(icon)
            after_ids = optimized_shaper(icon)
            if len(after_ids) != 1 or after_ids[0] == 0:
                raise RuntimeError(f"La ligadura {icon!r} desapareció al generar el subset")
            before = glyph_order[before_ids[0]]
            after = optimized_order[after_ids[0]]
            if before != after:
                raise RuntimeError(
                    f"El subset cambió el glifo de {icon!r}: {before!r} -> {after!r}"
                )

        output_bytes = temporary.stat().st_size
        if output_bytes >= MAX_OUTPUT_BYTES:
            raise RuntimeError(
                f"Subset demasiado grande ({output_bytes:,} B): se exige menos "
                f"de {MAX_OUTPUT_BYTES:,} B para evitar una optimización ficticia"
            )
        os.replace(temporary, OUTPUT)
    finally:
        temporary.unlink(missing_ok=True)

    print(
        f"Material Symbols: {len(names)} ligaduras, {len(needed_glyphs)} glifos "
        f"auxiliares, {SOURCE.stat().st_size:,} -> {OUTPUT.stat().st_size:,} bytes "
        f"({100 * (1 - OUTPUT.stat().st_size / SOURCE.stat().st_size):.1f}% menos)"
    )
    return OUTPUT.stat().st_size


def main() -> None:
    if not SOURCE.is_file():
        raise SystemExit(
            "No se encontró la fuente original. Ejecutá 'npm ci' primero: "
            f"{SOURCE.relative_to(ROOT)}"
        )
    names = icon_names()
    signature = hashlib.sha256(
        SOURCE.read_bytes() + TYPES.read_bytes()
        + Path(__file__).read_bytes() + GENERATOR_VERSION.encode("ascii")
    ).hexdigest()
    if OUTPUT.is_file() and STAMP.is_file():
        try:
            old_stamp = json.loads(STAMP.read_text(encoding="utf-8"))
            if (old_stamp.get("signature") == signature
                    and old_stamp.get("outputBytes") == OUTPUT.stat().st_size):
                print(f"Material Symbols: subset ya generado ({OUTPUT.stat().st_size:,} bytes)")
                return
        except (OSError, ValueError):
            pass
    byte_count = build_subset(names)
    STAMP.write_text(
        json.dumps({"signature": signature, "outputBytes": byte_count, "icons": names},
                   ensure_ascii=False, indent=2) + "\n",
        encoding="utf-8",
    )


if __name__ == "__main__":
    try:
        main()
    except Exception as exc:
        raise SystemExit(f"No se pudo generar Material Symbols subset: {exc}") from exc

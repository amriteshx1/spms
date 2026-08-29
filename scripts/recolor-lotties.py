"""
Recolor SPMS .lottie assets to the site theme tokens.

Does not change timing, geometry, composition, or playback data —
only fill/stroke/solid/gradient colors and embedded PNG palettes.
"""

from __future__ import annotations

import colorsys
import io
import json
import shutil
import sys
import zipfile
from pathlib import Path

from PIL import Image

ROOT = Path(__file__).resolve().parents[1]
PUBLIC = ROOT / "public"

# Exact values from app/globals.css
INK = (0x0B, 0x0A, 0x09)
RAISED = (0x16, 0x14, 0x12)
BRONZE = (0x7A, 0x62, 0x38)
GOLD = (0xC6, 0xA4, 0x5A)
GILT = (0xE6, 0xD3, 0xA1)
DUST = (0x9C, 0x94, 0x88)
BONE = (0xED, 0xE6, 0xD8)

# Lightness ramps in HLS L (0–1). Cool = vehicles/buildings; warm = cargo/lights.
# Lightest stop is gilt, not bone — avoids washed near-white gold on the ink page.
COOL_RAMP = (
    (0.00, INK),
    (0.08, RAISED),
    (0.28, BRONZE),
    (0.50, GOLD),
    (0.74, GILT),
    (1.00, GILT),
)
WARM_RAMP = (
    (0.00, INK),
    (0.12, BRONZE),
    (0.38, GOLD),
    (0.64, GILT),
    (1.00, GILT),
)
NEUTRAL_RAMP = (
    (0.00, INK),
    (0.10, RAISED),
    (0.38, DUST),
    (0.66, GILT),
    (1.00, GILT),
)


def _lerp_channel(a: int, b: int, t: float) -> int:
    return int(round(a + (b - a) * t))


def _lerp_rgb(a: tuple[int, int, int], b: tuple[int, int, int], t: float) -> tuple[int, int, int]:
    t = 0.0 if t < 0 else 1.0 if t > 1 else t
    return (
        _lerp_channel(a[0], b[0], t),
        _lerp_channel(a[1], b[1], t),
        _lerp_channel(a[2], b[2], t),
    )


def _sample_ramp(ramp: tuple[tuple[float, tuple[int, int, int]], ...], lightness: float) -> tuple[int, int, int]:
    l = 0.0 if lightness < 0 else 1.0 if lightness > 1 else lightness
    for i in range(len(ramp) - 1):
        l0, c0 = ramp[i]
        l1, c1 = ramp[i + 1]
        if l <= l1:
            span = l1 - l0
            t = 0.0 if span == 0 else (l - l0) / span
            return _lerp_rgb(c0, c1, t)
    return ramp[-1][1]


def remap_rgb(r: float, g: float, b: float) -> tuple[float, float, float]:
    """Map an sRGB 0–1 color onto the SPMS ink/gold/bone ramps."""
    h, lightness, sat = colorsys.rgb_to_hls(
        max(0.0, min(1.0, r)),
        max(0.0, min(1.0, g)),
        max(0.0, min(1.0, b)),
    )
    hue = h * 360.0
    if sat < 0.10:
        out = _sample_ramp(NEUTRAL_RAMP, lightness)
    elif 70.0 <= hue <= 300.0:
        out = _sample_ramp(COOL_RAMP, lightness)
    elif hue <= 15.0 or hue >= 345.0:
        # Saturated reds → bronze/gold, never leftover primary red
        out = _sample_ramp(WARM_RAMP, min(lightness, 0.42))
    else:
        out = _sample_ramp(WARM_RAMP, lightness)
    return out[0] / 255.0, out[1] / 255.0, out[2] / 255.0


def _is_unit_or_byte_color(seq: list[object]) -> bool:
    if not (3 <= len(seq) <= 4):
        return False
    if not all(isinstance(x, (int, float)) and not isinstance(x, bool) for x in seq):
        return False
    return all(0 <= float(x) <= 255 for x in seq)


def remap_color_list(values: list[object]) -> list[object]:
    nums = [float(x) for x in values]
    scaled = any(n > 1.0 for n in nums[:3])
    if scaled:
        r, g, b = remap_rgb(nums[0] / 255.0, nums[1] / 255.0, nums[2] / 255.0)
        out: list[object] = [r * 255.0, g * 255.0, b * 255.0]
    else:
        r, g, b = remap_rgb(nums[0], nums[1], nums[2])
        out = [r, g, b]
    if len(nums) > 3:
        out.append(nums[3])
    return out


def remap_gradient_stops(values: list[object], points: int | None) -> list[object]:
    nums = [float(x) for x in values]
    n = len(nums)
    p = points if points and points > 0 else None
    if p and n == p * 4:
        color_len, has_alpha = p * 4, False
    elif p and n == p * 6:
        color_len, has_alpha = p * 4, True
    elif n % 4 == 0:
        color_len, has_alpha = n, False
    elif n % 6 == 0:
        p = n // 6
        color_len, has_alpha = p * 4, True
    else:
        return values

    out = nums[:]
    i = 0
    while i + 3 < color_len:
        r, g, b = remap_rgb(out[i + 1], out[i + 2], out[i + 3])
        out[i + 1], out[i + 2], out[i + 3] = r, g, b
        i += 4
    if has_alpha:
        return out
    return out[:color_len]


def remap_hex(value: str) -> str:
    raw = value.strip()
    if not raw.startswith("#"):
        return value
    hex_body = raw[1:]
    if len(hex_body) == 8:
        rgb, alpha = hex_body[:6], hex_body[6:]
    elif len(hex_body) == 6:
        rgb, alpha = hex_body, ""
    elif len(hex_body) == 3:
        rgb, alpha = "".join(ch * 2 for ch in hex_body), ""
    else:
        return value
    r = int(rgb[0:2], 16) / 255.0
    g = int(rgb[2:4], 16) / 255.0
    b = int(rgb[4:6], 16) / 255.0
    nr, ng, nb = remap_rgb(r, g, b)
    mapped = f"#{round(nr * 255):02X}{round(ng * 255):02X}{round(nb * 255):02X}"
    return mapped + alpha


def remap_color_prop(node: object) -> object:
    """Rewrite a Lottie color property (`c`) without touching easing or other fields."""
    if isinstance(node, dict):
        out = {}
        for key, value in node.items():
            if key == "k" and isinstance(value, list) and value and isinstance(value[0], (int, float)):
                out[key] = remap_color_list(value)
            elif key in ("s", "e") and isinstance(value, list) and _is_unit_or_byte_color(value):
                out[key] = remap_color_list(value)
            else:
                out[key] = remap_color_prop(value)
        return out
    if isinstance(node, list):
        return [remap_color_prop(item) for item in node]
    return node


def remap_gradient_prop(node: object, points: int | None) -> object:
    if isinstance(node, dict):
        out = {}
        for key, value in node.items():
            if key == "k" and isinstance(value, list) and value and isinstance(value[0], (int, float)):
                out[key] = remap_gradient_stops(value, points)
            elif key in ("s", "e") and isinstance(value, list) and value and isinstance(value[0], (int, float)):
                out[key] = remap_gradient_stops(value, points)
            else:
                out[key] = remap_gradient_prop(value, points)
        return out
    if isinstance(node, list):
        return [remap_gradient_prop(item, points) for item in node]
    return node


def remap_animation(node: object) -> object:
    if isinstance(node, dict):
        if node.get("ty") in ("gf", "gs") and isinstance(node.get("g"), dict):
            g = dict(node["g"])
            points = g.get("p") if isinstance(g.get("p"), int) else None
            g["k"] = remap_gradient_prop(g.get("k"), points)
            rest = {key: remap_animation(value) for key, value in node.items() if key != "g"}
            return {**rest, "g": g}

        out = {}
        for key, value in node.items():
            if key == "c" and isinstance(value, dict):
                out[key] = remap_color_prop(value)
            elif key == "sc" and isinstance(value, str):
                out[key] = remap_hex(value)
            else:
                out[key] = remap_animation(value)
        return out

    if isinstance(node, list):
        return [remap_animation(item) for item in node]
    return node


def remap_png(data: bytes) -> bytes:
    image = Image.open(io.BytesIO(data)).convert("RGBA")
    pixels = list(image.getdata())
    mapped = []
    for r, g, b, a in pixels:
        if a == 0:
            mapped.append((r, g, b, a))
            continue
        nr, ng, nb = remap_rgb(r / 255.0, g / 255.0, b / 255.0)
        mapped.append((round(nr * 255), round(ng * 255), round(nb * 255), a))
    image.putdata(mapped)
    buf = io.BytesIO()
    image.save(buf, format="PNG", optimize=True)
    return buf.getvalue()


INK_COLOR = [INK[0] / 255.0, INK[1] / 255.0, INK[2] / 255.0, 1.0]
GILT_COLOR = [GILT[0] / 255.0, GILT[1] / 255.0, GILT[2] / 255.0]
# One step deeper than gilt so warehouse highlights stay gold, not washed, still above midtones.
RICH_HIGHLIGHT = [0xE0 / 255.0, 0xC6 / 255.0, 0x8C / 255.0, 1.0]

# 1-based shape groups in warehouse "BG 1 Outlines": Ideal 360 badge + lettering.
IDEAL_360_GROUPS = frozenset(range(5, 20)) | {33, 34}


def _is_close_rgb(values: list[object], target: tuple[float, float, float], eps: float = 1e-4) -> bool:
    if not (isinstance(values, list) and len(values) >= 3):
        return False
    if not all(isinstance(x, (int, float)) and not isinstance(x, bool) for x in values[:3]):
        return False
    return all(abs(float(values[i]) - target[i]) <= eps for i in range(3))


def _set_fill_stroke_color(node: object, rgba: list[float]) -> None:
    if isinstance(node, dict):
        if node.get("ty") in ("fl", "st") and isinstance(node.get("c"), dict):
            color = node["c"]
            if color.get("a") == 0 and isinstance(color.get("k"), list) and color["k"]:
                alpha = float(color["k"][3]) if len(color["k"]) > 3 else rgba[3]
                color["k"] = [rgba[0], rgba[1], rgba[2], alpha]
            return
        for value in node.values():
            _set_fill_stroke_color(value, rgba)
    elif isinstance(node, list):
        for item in node:
            _set_fill_stroke_color(item, rgba)


def _hide_shape_group(group: dict) -> None:
    group["hd"] = True
    for item in group.get("it") or []:
        if item.get("ty") == "tr" and isinstance(item.get("o"), dict):
            item["o"]["a"] = 0
            item["o"]["k"] = 0


def _replace_gilt_fills(node: object) -> None:
    if isinstance(node, dict):
        if node.get("ty") in ("fl", "st") and isinstance(node.get("c"), dict):
            k = node["c"].get("k")
            if isinstance(k, list) and _is_close_rgb(k, tuple(GILT_COLOR)):
                alpha = float(k[3]) if len(k) > 3 else 1.0
                node["c"]["k"] = [RICH_HIGHLIGHT[0], RICH_HIGHLIGHT[1], RICH_HIGHLIGHT[2], alpha]
            else:
                _replace_gilt_fills(node["c"])
        else:
            for value in node.values():
                _replace_gilt_fills(value)
    elif isinstance(node, list):
        for item in node:
            _replace_gilt_fills(item)


def refine_second_initial_frame(animation: dict) -> None:
    """Warehouse scene only: drop Ideal 360, ink the first-frame field, deepen leftover pale gold.

    Transport composition, timing, geometry, and the circular wipe matte are left untouched.
    """
    warehouse = next((asset for asset in animation.get("assets") or [] if asset.get("id") == "comp_0"), None)
    if not warehouse:
        return

    for layer in warehouse.get("layers") or []:
        name = layer.get("nm")
        if name == "BG 1 Outlines":
            for index, group in enumerate(layer.get("shapes") or [], start=1):
                if index in IDEAL_360_GROUPS:
                    _hide_shape_group(group)
                elif index == 39:
                    _set_fill_stroke_color(group.get("it"), INK_COLOR)
        elif name == "Shape Layer 2":
            _set_fill_stroke_color(layer.get("shapes"), INK_COLOR)

    for layer in warehouse.get("layers") or []:
        if layer.get("nm") == "Shape Layer 2":
            continue
        if layer.get("nm") == "BG 1 Outlines":
            for index, group in enumerate(layer.get("shapes") or [], start=1):
                if index in IDEAL_360_GROUPS or index == 39:
                    continue
                _replace_gilt_fills(group)
        else:
            _replace_gilt_fills(layer)


def recolor_archive(src_name: str, dest_name: str) -> None:
    src = PUBLIC / src_name
    dest = PUBLIC / dest_name
    tmp = dest.with_suffix(".lottie.tmp")

    with zipfile.ZipFile(src, "r") as zin, zipfile.ZipFile(tmp, "w", compression=zipfile.ZIP_DEFLATED) as zout:
        for info in zin.infolist():
            payload = zin.read(info.filename)
            name = info.filename.replace("\\", "/")
            if name.endswith(".json") and not name.endswith("manifest.json"):
                animation = json.loads(payload.decode("utf-8"))
                remapped = remap_animation(animation)
                if dest_name == "secondOne-spms.lottie" and isinstance(remapped, dict):
                    refine_second_initial_frame(remapped)
                if remapped != animation:
                    payload = json.dumps(remapped, separators=(",", ":")).encode("utf-8")
            elif name.lower().endswith(".png"):
                payload = remap_png(payload)
            out_info = zipfile.ZipInfo(filename=info.filename, date_time=info.date_time)
            out_info.compress_type = zipfile.ZIP_DEFLATED
            zout.writestr(out_info, payload)

    shutil.move(tmp, dest)
    print(f"wrote {dest.relative_to(ROOT)} ({dest.stat().st_size} bytes)")


def main() -> None:
    recolor_archive("firstOne.lottie", "firstOne-spms.lottie")
    recolor_archive("secondOne.lottie", "secondOne-spms.lottie")
    recolor_archive("thirdOne.lottie", "thirdOne-spms.lottie")


if __name__ == "__main__":
    if len(sys.argv) > 1 and sys.argv[1] == "--second-only":
        recolor_archive("secondOne.lottie", "secondOne-spms.lottie")
    else:
        main()

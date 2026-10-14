#!/usr/bin/env python3
"""Regenerate products.html (the price list) from tools/price-list.json.

The site itself has no build step — the generated products.html is committed and
served directly. This script exists so repricing 115 line items is an edit to one
JSON file rather than 115 edits to HTML.

    python3 tools/build-price-list.py

Supplier cost is not stored in this repo. price-list.json holds selling prices
only, so the margin can't be read off the page or recovered from git history.
"""

import html
import json
import pathlib
import re

ROOT = pathlib.Path(__file__).resolve().parent.parent
DATA = ROOT / "tools" / "price-list.json"
PAGE = ROOT / "products.html"

START = "<!-- PRICE-LIST:START -->"
END = "<!-- PRICE-LIST:END -->"


def money(value):
    """Format a price for display. None means quote-only; 0 means no charge."""
    if value is None:
        return '<span class="price-quote">Quoted</span>'
    if value == 0:
        return '<span class="price-free">No charge</span>'
    whole = float(value).is_integer()
    return "${:,.0f}".format(value) if whole else "${:,.2f}".format(value)


def render(data):
    cats = data["categories"]
    out = []

    # Category jump links. Plain anchors, so they work without JavaScript.
    out.append('<nav class="cat-nav" aria-label="Price list categories">')
    for c in cats:
        out.append(
            '  <a href="#%s">%s <span>%d</span></a>'
            % (c["id"], html.escape(c["name"]), len(c["items"]))
        )
    out.append("</nav>")

    total = sum(len(c["items"]) for c in cats)

    # Filter box. Hidden unless JS is running, since it does nothing without it.
    out.append('<div class="price-filter" data-needs-js hidden>')
    out.append('  <label class="sr-only" for="price-search">Search the price list</label>')
    out.append(
        '  <input type="search" id="price-search" placeholder="Search %d items — '
        'try zirconia, denture, implant…" autocomplete="off">' % total
    )
    out.append('  <p class="price-filter__count" id="price-count" role="status"></p>')
    out.append("</div>")

    for c in cats:
        out.append('<section class="price-group" id="%s" data-group>' % c["id"])
        out.append("  <h2>%s</h2>" % html.escape(c["name"]))
        out.append('  <div class="table-scroll">')
        out.append("    <table>")
        out.append(
            "      <caption class=\"sr-only\">%s price list</caption>"
            % html.escape(c["name"])
        )
        out.append("      <thead><tr>")
        out.append('        <th scope="col">Item</th>')
        out.append('        <th scope="col">Detail</th>')
        out.append('        <th scope="col" class="price-col">Price</th>')
        out.append("      </tr></thead>")
        out.append("      <tbody>")
        for item in c["items"]:
            search = "%s %s %s" % (item["name"], item["note"], c["name"])
            out.append(
                '        <tr data-row data-search="%s">' % html.escape(search.lower())
            )
            out.append(
                '          <th scope="row">%s</th>' % html.escape(item["name"])
            )
            out.append("          <td>%s</td>" % html.escape(item["note"]))
            out.append('          <td class="price-col">%s</td>' % money(item["price"]))
            out.append("        </tr>")
        out.append("      </tbody>")
        out.append("    </table>")
        out.append("  </div>")
        out.append("</section>")

    out.append('<p class="price-empty" id="price-empty" hidden>No items match that search.</p>')
    return "\n".join(out)


def main():
    data = json.loads(DATA.read_text(encoding="utf-8"))
    page = PAGE.read_text(encoding="utf-8")

    if START not in page or END not in page:
        raise SystemExit("markers %s / %s not found in %s" % (START, END, PAGE.name))

    block = "%s\n%s\n%s" % (START, render(data), END)
    page = re.sub(
        re.escape(START) + r".*?" + re.escape(END), lambda _: block, page, flags=re.S
    )
    PAGE.write_text(page, encoding="utf-8")

    total = sum(len(c["items"]) for c in data["categories"])
    print("wrote %s — %d items in %d categories"
          % (PAGE.name, total, len(data["categories"])))


if __name__ == "__main__":
    main()

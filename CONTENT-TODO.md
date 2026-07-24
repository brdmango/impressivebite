# Content to replace before launch

Everything below is **placeholder content written to make the site look and read like a
finished product**. The numbers are plausible for the VPS category, but none of them were
measured on your material, and none of the business claims were verified against your
actual operations. Replace each item with real, verified values before this site is
public.

Items marked ⚠️ are advertising, regulatory or safety claims. In the U.S., false or
unsubstantiated claims about a medical device are an FTC and FDA problem, not just a
marketing one. Do not ship those without confirming them.

---

## 1. Contact details

| Where | Placeholder | Needs |
| --- | --- | --- |
| `contact.html` sidebar | `(800) 555-0142` | Real phone. `555-01xx` is the reserved fictional range — it will not connect. |
| `contact.html`, `assets/js/site.js` | `orders@impressivebite.com` | Real mailbox, or change the address |
| `contact.html` | `support@impressivebite.com` | Real mailbox |
| `contact.html` | `groups@impressivebite.com` | Real mailbox |
| `contact.html` | "Monday–Friday, 8:00 AM – 6:00 PM ET" | Real support hours |
| Footer, all pages | No business address | Add your legal entity name and address if you want one shown |

Also: `assets/js/site.js` has `FORM_ENDPOINT = null`, so the form falls back to opening
the visitor's mail client. Wire up a real endpoint (see README) before launch.

## 2. ⚠️ Product specifications

Every number in the `technical.html` specification table and on each product card in
`products.html` is a category-typical value, **not a measurement of your product**:

- Working times and intraoral set times (all six materials, fast and regular)
- Shore A hardness values
- Detail reproduction (`20 µm`)
- Linear dimensional change (`< 0.20%`, `< 0.10%` for bite registration)
- Recovery from deformation (`> 99.5%`)
- Strain in compression
- Contact angle values
- 24-month shelf life

Replace these with your manufacturer's certificate of analysis / technical data sheet
values. If your material differs from these figures, the tables must change — a customer
who times a set against a published number and finds it wrong has a legitimate complaint.

## 3. ⚠️ Regulatory and quality claims

Stated on `index.html` and `technical.html#regulatory`. Each needs documentation on file
before it stays on the site:

- "ISO 4823 compliant" / "Tested to ISO 4823"
- "Manufactured in an ISO 13485 certified facility" — you need the certificate, including
  whether it covers *your* contract manufacturer for *this* product
- "Biocompatibility evaluated per ISO 10993"
- "Latex-free — no natural rubber latex in the material or its packaging"
- "Every lot batch-tested before release"
- "Full lot traceability"
- FDA status is **not currently mentioned anywhere.** Dental impression material is a
  regulated device in the U.S. Confirm your registration/listing obligations with a
  regulatory consultant and decide what, if anything, to state.

## 4. Product line and SKUs

- SKU codes (`IB-PUT-SR`, `IB-HB-F2`, …) are invented. Replace with your real catalog numbers.
- Pack configurations (jar sizes, cartridge counts, tips included) are assumptions.
- Product names — Putty / Heavy Body / Monophase / Light Body / Extra-Light Wash /
  Bite Registration — are generic category names. If you have brand names for the
  individual materials, swap them in.
- Confirm the 50 mL cartridges really are the standard 1:1 format before repeating the
  "fits the guns you already own" claim on `index.html`.

## 5. ⚠️ Commercial promises

These appear as firm commitments and create real obligations:

- **"Free shipping over $250"** (home hero, FAQ) — confirm the threshold
- **"Orders placed by 2:00 PM ET ship same day"** (home, contact) — confirm you can meet this
- **"Free sample kits, one per practice, no card"** — confirm the program and its limits
- **"Net-30 terms for established practices"** and "approval usually takes two business
  days" — confirm terms and turnaround
- **The remake promise** on `index.html` ("if our material caused the remake, we cover the
  material") — this is a warranty. Have someone review the wording and decide what it
  actually covers.
- **"We reply within one business day"** (contact page, stated twice)
- **"Ships to all 50 states"** and "we don't ship internationally"
- **DSO volume pricing, educational pricing** — confirm both programs exist

## 6. About page narrative

`about.html` tells a founding story ("we kept hearing the same thing from clinicians…"),
describes a direct-to-practice supply chain, and claims a single U.S. distribution center
with inventory held in stock. Rewrite it with your real story, structure and facilities.
It reads well but it is fiction.

## 7. Deliberately left out

Things a real medical-device commerce site usually needs, which are **not** in this repo:

- Privacy policy and terms of sale — the contact form collects names, emails, phone
  numbers and practice details, so a privacy policy is the minimum
- Cookie/analytics notice — only needed if you add analytics, which the site currently
  does not have
- Customer testimonials — omitted on purpose. Fabricated reviews of a medical product are
  an FTC violation. Add them only when they are real and you have permission.
- Prices — the site says "request pricing" everywhere rather than displaying invented
  numbers. Add a price list or e-commerce when you have real pricing.
- Product photography — the site is illustrated with CSS and inline SVG only. Real
  cartridge and packaging photos would lift it considerably.
- Open Graph share image (`og:image`) — add one once you have product photography.

## 8. Domain and metadata

- Canonical URLs and the sitemap assume `https://impressivebite.com/` with `.html`
  extensions. If your host strips extensions or you use a different domain, update
  `<link rel="canonical">` on all five pages, `sitemap.xml`, and `robots.txt`.

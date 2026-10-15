# Before this is fully real

Much shorter than it used to be. Cutting the site back to Home / Price list / Contact
removed most of the marketing claims that needed verifying, and the price list is now
your own data rather than anything invented.

---

## 1. ⚠️ Confirm the currency

Prices are published as **US dollars**. The source price list had no currency symbol —
USD was inferred from the magnitudes (an All-on-X hybrid at $1,360 and a zirconia crown
at $24 are both plausible US lab prices; the same numbers in RMB would not be).

**Check this before you take an order.** If the source was in another currency, every
one of the 115 prices is wrong, and they're published.

## 2. The markup

Every price is exactly **supplier cost × 2.10 (110% markup)**. Verified item by item
against the source list; 114 of 115 match exactly, and the gold / high-noble crown has
no cost in the source so it shows as "Quoted".

Worth sanity-checking the result as a *business* decision rather than arithmetic:

- A full contour zirconia crown lands at **$31.50**, a PFM at **$31.50**, an e.max press
  crown at **$58.80**. US labs commonly charge well above this, so there may still be
  room — 110% doubles your money but the absolute prices remain low for the US market.
- A flat rate still leaves the cheap items thin: a **$4.20** printed model earns $2.20
  gross, which barely covers handling and packaging.
- The expensive end moves a long way: the All-on-X titanium hybrid is now **$1,785**.
  That is a credible US price, but check it against what you can deliver it for
  including remakes.
- Consider a floor price, or different markups by category, rather than one flat rate.

To reprice: edit `tools/price-list.json`, run `python3 tools/build-price-list.py`,
commit.

## 3. Contact details

| Item | Status |
| --- | --- |
| `hello@impressivebite.com` | Needs creating (also set in `assets/js/site.js`) |
| `cases@impressivebite.com` | Needs creating |
| Phone number | Deliberately absent. Add a real one when you have it — never a placeholder. |
| Business address | Not shown. Add if you want one in the footer. |
| Netlify Forms notifications | Still needs an email set in the Netlify dashboard, or submissions pile up unread |

## 4. ⚠️ Promises still on the site

Short list now, but they're still commitments:

- "No shade fees, no rush fees, no surcharges — the quote is the invoice" (Home, Price list)
- "No minimum, no contract" (Home, Contact)
- "We reply within one business day" (Contact, twice)
- "Your account is set up the same day you say go" (Contact)
- "Shipping is quoted separately" (Price list)
- Turnaround times are **no longer stated anywhere.** If you advertise them later, make
  sure they hold on your worst week, not your best.

## 5. Digital intake only — two leftovers in the price list

The site is now scan-only: it states plainly that you don't take impressions. Two items
in the price list sit oddly against that, and both are yours to keep or cut:

- **Custom Impression Tray** ($21) — a tray is for taking a physical impression. If you
  never handle them, this has no buyer.
- **Putty Matrix / Index** ($10.50) — a physical matrix, usually chairside.

Neither is wrong to sell; a scan-only lab can still fabricate physical items a dentist
uses in the operatory. But if they're there by inheritance rather than intent, remove
them from `tools/price-list.json` and rerun the generator.

Also worth checking: the contact form now assumes every practice has a scanner, with
"Shopping for one now" as the only alternative. A practice still on impressions has no
way to say so — which is correct if you genuinely won't serve them, and a lost lead if
you would.

## 6. Capability

The price list says you make all 115 items. Anything you can't actually produce at
launch should come out of `tools/price-list.json` — it's one line each. The most
demanding entries are the All-on-X hybrids, the milled titanium bar, and the full-arch
surgical guides.

## 7. How cases actually reach you

The site says "upload an intraoral scan in STL, PLY or DCM — or post us a PVS
impression". There is **no upload portal**. Until there is one, either build/adopt one,
or change that line to say how cases really reach you — email, a shared drive, a lab
platform.

## 8. HIPAA

If you handle patient scans, you are likely a business associate of every practice you
serve: Business Associate Agreements and real safeguards. The contact form asks people
not to send patient-identifying information, which covers the form itself but not the
case workflow. Get advice before the first real case.

## 9. Still deliberately omitted

- **Testimonials and case photos** — fabricated reviews of a medical service are an FTC
  violation. Add real ones with permission.
- **Statistics** ("98% on time", "50,000 units shipped") — nothing like this appears
  anywhere. Don't add it until you can prove it.
- **Certifications** — no ISO, FDA or accreditation claims appear anywhere on the site.
  Add them only with the certificate on file.
- **Lab photography** — the site is CSS and inline SVG only. Real photos would lift it
  more than any copy change.
- **Open Graph share image** (`og:image`) — add once you have photography.

# Content to replace before this is a real business

The site reads as a finished dental lab. It describes a lab that doesn't exist yet. This
file lists what has to become true, or be changed, before the claims on these pages are
accurate.

It is deliberately shorter and less alarming than the version for the old impression-material
site. That is because the lab site was written to avoid the dangerous class of claim:
**there are no invented certifications, no fabricated phone number, no made-up test data,
and no testimonials anywhere on this site.** What remains is operational — promises about
how your lab will run.

Items marked ⚠️ are promises a customer could hold you to.

---

## 1. ⚠️ Operational promises

These are stated as commitments across the site. Each one needs to be something your lab
can actually do on its worst week, not its best:

| Promise | Where |
| --- | --- |
| Crown & bridge in **5 lab days**, bridge 6, implant crown 7 | Home, Restorations, How it works |
| Night guards and retainers in **3 days**, models in 2 | Restorations, How it works |
| Physical impressions add **1 day** to digitize | How it works |
| **Same business day** case review, with problems flagged that day | How it works |
| **Design approval before milling** on every prep-seated case | Home, How it works |
| Unlimited free design revisions before milling | How it works |
| You hear about a delay **before** the delivery date | Home, About, How it works |
| Reply to inquiries within **one business day** | Contact (stated twice) |
| Account and portal live the **same day** you say go | Contact |

If any of these is wrong, change the number rather than hoping nobody notices. A lab that
publishes 5 days and delivers in 8 has created the exact problem this site says it solves.

## 2. ⚠️ The remake policy

Stated on the home page, About, and How it works:

- Remake free when the fault is the lab's, shipping covered both ways, prioritized over new work
- Remake at a **reduced rate** when the fault is the practice's scan or prep
- No requirement to return the original restoration before the remake starts

This is a warranty. Decide what it actually covers, write the limits down, and make sure
the site matches the policy rather than the other way around.

## 3. ⚠️ Pricing and billing

- "One price per unit, the quote is the invoice, no surcharges" — appears on Home, About
  and Contact. It rules out shade fees, rush fees and custom-abutment upcharges. Make sure
  your price list is actually built this way.
- "No minimum, no contract" — Home, About, Contact
- "Monthly invoicing on net terms for established practices" — Contact
- "Free inbound shipping, prepaid labels, free models when a case needs them" — How it works
- No prices appear anywhere on the site. That's deliberate: the site asks people to request
  a list. Add published pricing only when it's real.

## 4. Capability claims

Things the site says the lab can do. All plausible for a digital lab; none verified:

- **Case types**: crown & bridge, implant restorations (including full-arch hybrids),
  dentures and partials, night guards and splints, clear retainers, veneers, models, dies,
  surgical guides, diagnostic wax-ups
- **Materials**: monolithic and multilayer zirconia, lithium disilicate, layered ceramics,
  PFM, full cast, titanium and zirconia custom abutments, chrome-cobalt and flexible partials
- **Scanner compatibility**: STL, PLY and DCM. The contact form lists 3Shape TRIOS, iTero,
  Medit, Primescan/Omnicam, Carestream, Planmeca and Shining 3D by name — that's a list of
  scanners you accept files from, not a partnership claim, but remove any you can't support.
- **Implant systems**: the site says you confirm components before starting rather than
  listing systems. Keep it that way until you know exactly what you stock.
- **Full-arch and surgical guides** are the most demanding things listed. Drop them from
  the catalog if they're not in scope at launch.

## 5. Staffing and facility

- "Licensed dental technicians" design and finish every case — About, How it works, FAQ
- "A named technician on your account who you can reach directly" — Home, About
- Cases reviewed by a person the day they land — How it works
- Design and case files retained for remakes, reorders and replacements — Home, About,
  Restorations, How it works. This one is load-bearing: the About page argues it's the main
  reason to use a digital lab. It requires real file storage and retention discipline.

## 6. Contact details

| Item | Status |
| --- | --- |
| `hello@impressivebite.com` | Needs creating (also set in `assets/js/site.js`) |
| `cases@impressivebite.com` | Needs creating |
| `groups@impressivebite.com` | Needs creating |
| Phone number | **Deliberately absent.** Add a real one when you have it — never a placeholder. |
| Business address | Not shown. Add if you want one in the footer. |
| Netlify Forms notifications | Still needs an email set in the Netlify dashboard, or submissions pile up unread |

## 7. The case portal

The site refers throughout to a "case portal" where practices upload scans, fill the Rx and
approve designs. **This does not exist.** It is the single biggest gap between the site and
reality.

Until it's built, either:
- change the copy to describe how cases actually reach you (email, a shared drive, a
  third-party service), or
- adopt an existing lab management platform and describe that

The design approval step, the stored-design reorder promise, and the two-minute submission
claim all depend on it.

## 8. HIPAA

The contact page asks people not to send patient-identifying information through the form,
and How it works says patient information is handled in line with your practice's HIPAA
obligations. If you handle protected health information, you are likely a business associate
of every practice you serve, which means Business Associate Agreements and real safeguards.
Get advice on this before taking the first case, not after.

## 9. Still deliberately omitted

- **Testimonials and case photos** — fabricated reviews are an FTC violation. Add real ones
  with permission.
- **Before/after clinical photography** — needs patient consent and should be your own work.
- **Turnaround or volume statistics** ("98% on time", "50,000 units shipped") — nothing like
  this appears anywhere. Don't add it until you can prove it.
- **Lab photography** — the site is illustrated with CSS and inline SVG only. Real photos of
  the lab, the technicians and finished work would lift it more than any copy change.
- **Open Graph share image** (`og:image`) — add once you have photography.

# impressivebite.com

Marketing and new-account website for **ImpressiveBite** — a digital dental lab serving
practices across the United States. Crown and bridge, implant restorations, removables,
night guards and retainers.

Static HTML, CSS and vanilla JavaScript. No build step, no framework, no dependencies —
the files in this repo are the site that gets deployed.

## Pages

| File | Purpose |
| --- | --- |
| `index.html` | Home — positioning, why switch, how it works, case types, remake policy, FAQ |
| `products.html` | Case list: crown & bridge, implants, removables, appliances, retainers, esthetics, models |
| `how-it-works.html` | Scanner compatibility, case submission, design approval, turnaround, scan quality, shipping, remakes |
| `about.html` | Company story, commitments, who we work with |
| `contact.html` | New-account form, contact routes, getting-started FAQ |
| `assets/css/site.css` | The whole design system in one stylesheet |
| `assets/js/site.js` | Nav, scroll reveal, FAQ, form validation and submission |
| `404.html` | Not-found page (root-absolute asset paths, `noindex`) |
| `netlify.toml` | Publish settings, security headers, cache policy |
| `robots.txt`, `sitemap.xml` | Search engine basics |

## Running it locally

Any static file server works:

```bash
python3 -m http.server 8000
# then open http://localhost:8000
```

Opening `index.html` directly with `file://` also works, though relative links behave
better through a server.

## Deploying

The repository root **is** the site root — there is no build step.

**Netlify (what this repo is configured for).** `netlify.toml` sets `publish = "."`,
an empty build command, security headers and cache policy. Connect the repo in the
Netlify UI; no other setup is needed. `404.html` is picked up automatically.

DNS, once the site is connected — in Netlify, Domain settings → Add custom domain
→ `impressivebite.com`, then at your registrar:

| Type | Name | Value |
| --- | --- | --- |
| A | `@` | `75.2.60.5` (Netlify's load balancer) |
| CNAME | `www` | `<your-site>.netlify.app` |

Or point the nameservers at Netlify DNS and it handles both. Netlify provisions the
Let's Encrypt certificate once DNS resolves — usually minutes, up to 24h. Set the
primary domain in Netlify so the other host redirects to it rather than serving
duplicate content.

`netlify.toml` also holds a 301 from `/technical.html` (the old impression-material spec
sheet) to `/how-it-works.html`.

Other hosts work too (Vercel, Cloudflare Pages, GitHub Pages, S3+CloudFront) — point
them at the repo root — but they ignore `netlify.toml`, so the headers, the redirect and
the form backend would need reconfiguring.

## The contact form

The form is wired to **Netlify Forms** and needs no third-party service. `contact.html`
carries `data-netlify="true"`, `name="request"` and a hidden `form-name` input, which
Netlify's deploy bot parses out of the static HTML to register the form. Submissions
land under **Forms** in the Netlify dashboard; add notification emails there so they
reach a person. The free tier covers 100 submissions/month.

`site.js` submits over AJAX so the inline validation and status message survive — it
posts a URL-encoded body back to the same path, which is the shape Netlify expects.
Submission mode is chosen automatically, in this order:

1. Form has `data-netlify` → Netlify Forms (current setup)
2. `FORM_ENDPOINT` is set in `assets/js/site.js` → posts `FormData` there
   (Formspree, Basin, Getform, or your own API)
3. Neither → opens the visitor's mail client with the request pre-filled, so the form
   is never a dead end, including on local `file://` previews

The Netlify form is named `lab-inquiry`. Field names sent: `name`, `role`, `practice`,
`email`, `phone`, `state`, `locations`, `reason`, `services` (repeated, one per checked
box), `scanner`, `volume`, `message`. The
`company_website` field is a honeypot — hidden from people, dropped client-side by
`site.js` and server-side by Netlify via `netlify-honeypot`.

### Content Security Policy

`netlify.toml` ships a strict CSP that allows no external origins. It pins a
**sha256 hash of the one inline `<head>` snippet** (`classList.add("js")`). If you edit
that snippet by even a character, recompute the hash or the browser will block it —
which stops the scroll-reveal from ever un-hiding content:

```bash
printf '%s' 'document.documentElement.classList.add("js");' \
  | openssl dgst -sha256 -binary | openssl base64
```

`style-src` needs `'unsafe-inline'` because the pages use `style=""` attributes, which
cannot be hashed. Adding any external script, font or analytics tag means widening the
CSP to match.

Catalog links deep-link into the form: `contact.html?service=implant` pre-checks that case
type. The values match the checkbox `value` attributes on the contact form.

## Before this goes live

`CONTENT-TODO.md` lists every piece of placeholder content — phone number, email
addresses, product specifications, claims and policies — that needs to be replaced
with real, verified values. Several of those are regulatory or advertising claims,
so read that file before pointing the domain at this.

## Conventions

- Design tokens (color, spacing, shadow, radius) live in `:root` at the top of
  `site.css`. Change the brand there and the whole site follows.
- Header and footer are duplicated across the five pages plus `404.html`. Editing one
  means editing all six — if the page count grows much beyond this, move to a static site
  generator instead. Note that `404.html` uses root-absolute paths (`/assets/...`) because
  it can be served from any URL depth; the other pages use relative paths.
- No external requests: no CDN, no web fonts, no analytics. Everything renders from
  files in this repo, which keeps the site fast and avoids a third-party privacy
  surface on a healthcare-adjacent site. Adding analytics later means adding a
  privacy notice.
- Accessibility: skip link, labelled form fields with inline errors, visible focus
  rings, keyboard-operable nav, `prefers-reduced-motion` respected.

# impressivebite.com

Website for **ImpressiveBite** — a digital dental lab serving practices across the
United States.

Static HTML, CSS and vanilla JavaScript. No build step for the site itself, no
framework, no dependencies, no external requests — the files in this repo are what
gets deployed.

## Pages

| File | Purpose |
| --- | --- |
| `index.html` | Home — deliberately brief: what we make, how to send a case, what it costs |
| `products.html` | The price list — 115 items in 8 categories, with a search filter |
| `contact.html` | Open-an-account form |
| `404.html` | Not-found page (root-absolute asset paths, `noindex`) |
| `assets/css/site.css` | The whole design system in one stylesheet |
| `assets/js/site.js` | Nav, scroll reveal, price-list filter, form validation and submission |
| `netlify.toml` | Publish settings, redirects, security headers, cache policy |
| `tools/` | Price-list data and generator (see below) |

## The price list

`products.html` is **generated**. Don't hand-edit the table — edit the data and
regenerate:

```bash
# 1. edit tools/price-list.json
# 2. regenerate the table inside products.html
python3 tools/build-price-list.py
```

The script replaces everything between the `<!-- PRICE-LIST:START -->` and
`<!-- PRICE-LIST:END -->` markers in `products.html`. Everything outside those markers
is hand-written and is left alone. The generated HTML is committed, so the deployed
site still has no build step.

**Supplier cost is deliberately not stored in this repo.** `price-list.json` holds
selling prices only, so the margin can't be read off the page or recovered from git
history. Keep your cost sheet somewhere else.

A `price` of `null` renders as "Quoted" (used for gold / high-noble, which tracks the
metal market); `0` renders as "No charge".

## Running it locally

```bash
python3 -m http.server 8000
# then open http://localhost:8000
```

## Deploying

The repository root **is** the site root. `netlify.toml` sets `publish = "."` with no
build command, plus redirects, security headers and cache policy. Connect the repo in
the Netlify UI; nothing else is needed.

Live at impressivebite.com, with DNS at GoDaddy: an `A` record on `@` → `75.2.60.5`
and a `CNAME` on `www` → `impressivebite.netlify.app`. Netlify holds the Let's Encrypt
certificate and redirects `www` to the apex.

`netlify.toml` also 301s `/technical.html`, `/how-it-works.html` and `/about.html` to
`/` — pages that existed in earlier versions of the site.

## The contact form

Wired to **Netlify Forms**, so it needs no third-party service. `contact.html` carries
`data-netlify="true"`, `name="lab-inquiry"` and a hidden `form-name` input, which
Netlify's deploy bot parses out of the static HTML to register the form. Submissions
land under **Forms** in the Netlify dashboard — add notification emails there so they
reach a person.

`site.js` submits over AJAX so inline validation and the status message survive. It
picks its mode automatically:

1. Form has `data-netlify` → Netlify Forms (current setup)
2. `FORM_ENDPOINT` is set in `assets/js/site.js` → posts `FormData` there
3. Neither → opens the visitor's mail client with the request pre-filled

Fields sent: `name`, `practice`, `email`, `phone`, `state`, `scanner`,
`services` (repeated, one per checked box), `message`. `company_website` is a honeypot
— hidden from people, dropped client-side by `site.js` and server-side by Netlify.

## Content Security Policy

`netlify.toml` ships a strict CSP that allows no external origins. It pins a **sha256
hash of the one inline `<head>` snippet** (`classList.add("js")`). If you edit that
snippet by even a character, recompute the hash or the browser will block it:

```bash
printf '%s' 'document.documentElement.classList.add("js");' \
  | openssl dgst -sha256 -binary | openssl base64
```

`style-src` needs `'unsafe-inline'` because the pages use `style=""` attributes, which
cannot be hashed. Adding any external script, font or analytics tag means widening the
CSP to match.

## Conventions

- Design tokens (color, spacing, shadow, radius) live in `:root` at the top of
  `site.css`. Change the brand there and the whole site follows.
- Header and footer are duplicated across the four pages. `404.html` uses
  root-absolute paths (`/assets/...`) because it can be served from any URL depth; the
  other pages use relative paths.
- No external requests: no CDN, no web fonts, no analytics. Adding analytics later
  means adding a privacy notice.
- Progressive enhancement: the scroll reveal and the price-list filter are both gated
  on JavaScript actually running, so blocked or failed JS never leaves the page with
  empty sections or a search box that does nothing.
- Accessibility: skip link, labelled form fields with inline errors, visible focus
  rings, keyboard-operable nav, `prefers-reduced-motion` respected.

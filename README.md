# impressivebite.com

Marketing and sample-request website for **ImpressiveBite** — VPS (vinyl polysiloxane)
dental impression material sold direct to dental practices across the United States.

Static HTML, CSS and vanilla JavaScript. No build step, no framework, no dependencies —
the files in this repo are the site that gets deployed.

## Pages

| File | Purpose |
| --- | --- |
| `index.html` | Home — positioning, why-us, product overview, how buying works, FAQ |
| `products.html` | Full catalog: six materials with specs, SKUs, pack sizes, accessories |
| `technical.html` | ISO 4823 data table, technique guide, chairside sequence, storage, disinfection, troubleshooting, regulatory |
| `about.html` | Company story, commitments, who we sell to |
| `contact.html` | Sample-request / quote form, contact routes, ordering FAQ |
| `assets/css/site.css` | The whole design system in one stylesheet |
| `assets/js/site.js` | Nav, scroll reveal, FAQ, form validation and submission |
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

The repository root **is** the site root. Point any static host at it:

- **Netlify / Vercel / Cloudflare Pages** — connect the repo, no build command,
  publish directory `/`
- **GitHub Pages** — Settings → Pages → deploy from branch, root folder
- **S3 + CloudFront** — sync the repo contents to the bucket

Then point `impressivebite.com` at the host and enable HTTPS.

## Wiring up the contact form

The form works out of the box: with no backend configured it opens the visitor's mail
client with the request pre-filled. That's a usable fallback, but a real endpoint is
better — mail-client handoff loses visitors who use webmail.

To connect one, edit the config block at the top of `assets/js/site.js`:

```js
var FORM_ENDPOINT = "https://formspree.io/f/YOUR_ID";  // or your own handler
var CONTACT_EMAIL = "orders@impressivebite.com";
```

The form POSTs `FormData` with `Accept: application/json` and expects a 2xx response.
That shape works directly with Formspree, Basin, Getform and Formsubmit; any custom
handler that accepts multipart form data works too.

Field names sent: `name`, `role`, `practice`, `email`, `phone`, `state`, `locations`,
`reason`, `products` (repeated), `technique`, `message`. The `company_website` field is
a honeypot — it is hidden from people, so any submission that fills it is dropped
client-side. Reject it server-side too.

**On Netlify** you can skip the JS endpoint entirely by adding `netlify` and
`name="request"` attributes to the `<form>` tag, but then remove or bypass the
`e.preventDefault()` submit handler so the browser posts natively.

Product links can deep-link into the form: `contact.html?product=light-body`
pre-checks that material's box. The values match the checkbox `value` attributes.

## Before this goes live

`CONTENT-TODO.md` lists every piece of placeholder content — phone number, email
addresses, product specifications, claims and policies — that needs to be replaced
with real, verified values. Several of those are regulatory or advertising claims,
so read that file before pointing the domain at this.

## Conventions

- Design tokens (color, spacing, shadow, radius) live in `:root` at the top of
  `site.css`. Change the brand there and the whole site follows.
- Header and footer are duplicated across the five pages. Editing one means editing
  all five — if the page count grows much beyond this, move to a static site
  generator instead.
- No external requests: no CDN, no web fonts, no analytics. Everything renders from
  files in this repo, which keeps the site fast and avoids a third-party privacy
  surface on a healthcare-adjacent site. Adding analytics later means adding a
  privacy notice.
- Accessibility: skip link, labelled form fields with inline errors, visible focus
  rings, keyboard-operable nav, `prefers-reduced-motion` respected.

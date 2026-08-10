# the Knot and Narratives — Website

A lead-generation focused wedding photography & cinematic video website for
**the Knot and Narratives**, Agartala. Plain HTML/CSS/JS — no build step, no
framework, easy to edit directly.

This README is written for the specific things you asked about: **how to
change text**, and **exactly what size each image should be** so you can
drop in your real photography without anything looking stretched, cropped
oddly, or blurry.

---

## 1. How to change text

There's no CMS — text lives directly inside the HTML files, which keeps
things simple and free to run. To change any text:

1. Open the relevant `.html` file (see the page list below) in any text
   editor, or edit it directly on GitHub (pencil icon → edit → commit).
2. Find the text (Ctrl+F / Cmd+F works well since it's plain text).
3. Change it, save, commit, push. Cloudflare redeploys automatically.

| Page | File |
|---|---|
| Home | `index.html` (or `home.html` in `/build/templates` if editing source) |
| Portfolio | `portfolio.html` |
| Services | `services.html` |
| Pricing | `pricing.html` |
| About | `about.html` |
| Client Gallery | `gallery.html` |
| Privacy Policy | `privacy.html` |
| Terms & Conditions | `terms.html` |

**Text that appears on every page** (logo, nav, footer, WhatsApp number,
address, contact modal) lives once in `build/templates/base.html` if you're
editing source templates — but since the shipped site is plain HTML, easier
in practice is: it's repeated at the top/bottom of every single `.html`
file. If you change your phone number or address, use **find-and-replace
across all files** in your code editor (VS Code, Sublime, etc. all support
"replace in all files") rather than editing each page one by one.

Things you'll most likely want to personalize further:
- **Recent Work names** on the homepage (`Riya & Aniket`, etc.) — currently
  placeholder names. Replace with real couples' names (with their
  permission) once you have real work to feature.
- **Testimonial quotes** — currently placeholder text. See section 5 below.

---

## 2. Image replacement guide — exact sizes

Every image on the site right now is **original generated abstract art**
(soft gradients + light, in the site's colour palette) — not real
photographs. This was a deliberate choice: using unrelated stock photos on
a *photographer's own site* would misrepresent someone else's work as his.
They're safe placeholders, but they all need replacing with real photography.

**General rule:** images are set to fill their container and crop to fit
(`object-fit: cover`), so they don't need to be pixel-perfect — but matching
the aspect ratio (width÷height) below means nothing important in your photo
gets cropped off awkwardly. Where exact pixel size is given, that's the
ideal export size for sharpness without unnecessary file bloat.

### Homepage hero (rotating background)
Folder: `images/gallery/`
| File | Size | Notes |
|---|---|---|
| `hero-home.jpg` | 1920 × 1200px | Background slide 1 |
| `hero-home-2.jpg` | 1920 × 1200px | Background slide 2 |
| `hero-home-3.jpg` | 1920 × 1200px | Background slide 3 |
| `hero-home-4.jpg` | 1920 × 1200px | Background slide 4 |

The 5th slide is a video, not an image — see the video section below.
Keep these landscape and fairly simple/uncluttered in the center, since
your headline text sits on top.

### Page header banners (dark strip behind each page's title)
| File | Size | Used on |
|---|---|---|
| `hero-portfolio.jpg` | 1920 × 900px | Portfolio page header |
| `hero-services.jpg` | 1920 × 900px | Services page header |
| `hero-pricing.jpg` | 1920 × 900px | Pricing page header |
| `hero-about.jpg` | 1920 × 900px | About, Privacy, Terms page headers |
| `hero-gallery.jpg` | 1920 × 900px | Client Gallery page header |

These render at low opacity behind dark text, so avoid anything with
important detail in the middle — it'll be faded and partially covered.

### Portfolio images (homepage glimpse + full Portfolio page use the same 15 files)
All in `images/gallery/`, all 900px wide, heights vary (mix of portrait/
landscape/square so the grid looks natural — match these heights or the
masonry grid will have gaps):

| File | Size |
|---|---|
| `portfolio-01.jpg` | 900 × 1200px (portrait) |
| `portfolio-02.jpg` | 900 × 700px (landscape) |
| `portfolio-03.jpg` | 900 × 1100px (portrait) |
| `portfolio-04.jpg` | 900 × 900px (square) |
| `portfolio-05.jpg` | 900 × 1300px (tall portrait) |
| `portfolio-06.jpg` | 900 × 700px (landscape) |
| `portfolio-07.jpg` | 900 × 1150px (portrait) |
| `portfolio-08.jpg` | 900 × 900px (square) |
| `portfolio-09.jpg` | 900 × 1250px (portrait) |
| `portfolio-10.jpg` | 900 × 700px (landscape) |
| `portfolio-11.jpg` | 900 × 1100px (portrait) |
| `portfolio-12.jpg` | 900 × 950px (portrait) |
| `portfolio-13.jpg` | 900 × 1200px (portrait) |
| `portfolio-14.jpg` | 900 × 750px (landscape) |
| `portfolio-15.jpg` | 900 × 1150px (portrait) |

Tip: you don't have to match these exactly — any similar portrait/landscape
mix works. Just try to keep a similar ratio of tall-to-wide images so the
grid doesn't look lopsided.

### About page
| File | Size | Notes |
|---|---|---|
| `about-portrait.jpg` | 1000 × 1250px | Photo of Nilanjan Das |

### Social sharing preview image
| File | Size | Notes |
|---|---|---|
| `og-cover.jpg` | 1200 × 630px | Shows up when the site is shared on WhatsApp/Facebook/etc. Pick your single best photo. |

### Icons (small, only replace if rebranding further)
| File | Size |
|---|---|
| `favicon.svg` | Vector, any size |
| `apple-touch-icon.png` | 180 × 180px |

---

## 3. Video replacement guide

All 4 videos are original generated motion graphics (a slow zoom through
abstract art), standing in for real wedding films. Each has a matching
**poster image** (the thumbnail shown before playback starts).

| Video files | Poster image | Used |
|---|---|---|
| `hero-film-sample.mp4` / `.webm` | `hero-film-poster.jpg` (1280×720) | Hero's 5th slide + large video tile |
| `portfolio-film-sample.mp4` / `.webm` | `portfolio-film-poster.jpg` (1280×720) | Portfolio page featured film + small tile |
| `showcase-c.mp4` / `.webm` | `showcase-c-poster.jpg` (1280×720) | Small video tile |
| `showcase-d.mp4` / `.webm` | `showcase-d-poster.jpg` (1280×720) | Small video tile |

**When you replace these:**
- Aim for **1920×1080 or 1280×720, 16:9 landscape**, MP4 (H.264) format.
- Keep clips short for the homepage — 15–30 seconds loops well; the large
  tile autoplays muted on loop, so avoid anything that needs sound to make
  sense there.
- For best browser compatibility and smaller file size, also export a
  `.webm` (VP9) version of each — most video editors (Premiere, DaVinci
  Resolve, Handbrake) can export both. The site automatically picks
  whichever the visitor's browser prefers.
- Generate a poster image by taking a screenshot of a good-looking frame,
  or export one directly from your editing software.
- File names must match exactly (or update the `src=` and `poster=`
  references in `index.html` and `portfolio.html` if you rename them).

---

## 4. Client Gallery — how it works, and how to add clients

The Client Gallery page lets clients type a short code to find their
private Google Drive folder. This is documented in detail, with the exact
place to add each new client, in:

**`js/clients-data.js`**

Open that file — it has step-by-step comments. Short version: create the
client's Drive folder, set sharing to "Anyone with the link — Viewer", pick
a short code for them, add one line to that file, push.

**Important to understand:** this is a friendly convenience system, not a
secure login. The full code list technically ships to every visitor's
browser. For wedding photos this is a normal, low-risk trade-off (the same
trust level as sending someone an unlisted link) — just don't use it for
anything more sensitive than that.

---

## 5. Testimonials — swap in your real Google reviews

The homepage testimonial section currently has 3 placeholder quotes marked
"— Google Review". I wasn't able to pull your actual review text
automatically (Google blocks that), so:

1. Go to your [Google Business reviews](https://share.google/cgbawdFWJofl4pnKY)
2. Copy 3 short, genuine reviews (one sentence each works best)
3. In `index.html`, find `<div class="testimonial-slider"` and replace the
   text inside each `<blockquote>` tag with real quotes

The "Read Our Google Reviews" button already links to your real profile.

---

## 6. Contact form — activate Formspree

The contact form (both the popup modal and the homepage inline version)
posts to Formspree, a free form backend. To activate it:

1. Go to [formspree.io](https://formspree.io) → sign up free → create a form
2. Copy your form ID
3. Find **every** occurrence of `YOUR_FORM_ID` across the site (it appears
   in `index.html` and the contact modal markup on every page) and replace
   it with your real ID
4. First submission triggers a confirmation email from Formspree — click
   it to activate

---

## 7. Privacy Policy & Terms — important

The Privacy Policy and Terms & Conditions pages are **drafts** covering the
basics (client photo/video usage consent, data collection, copyright,
booking terms). You mentioned you'll replace these with a proper policy —
a couple of notes for when you do:

- I'm not a lawyer, and this isn't legal advice — please have a
  professional review whatever policy you settle on before relying on it.
- Pay particular attention to the photo/video usage section, since you're
  publishing real client images — most photographers get written consent
  at booking time specifically for portfolio/marketing use, separate from
  the general booking contract.

---

## 8. What changed in this rebuild

- New brand: **the Knot and Narratives** (previously a different name),
  new tagline "Photography, Cinematic Video"
- Real business details throughout: Agartala address, phone/WhatsApp
  (70055 34706), email
- Trimmed to 4 core pages (Portfolio, Services, Pricing, About) plus Client
  Gallery, Privacy Policy, and Terms & Conditions — Stories/journal and the
  old separate Contact page were removed
- Contact is now a slide-in popup (button in header) plus an inline form
  on the homepage, backed by Formspree
- Persistent floating WhatsApp button on every page
- Homepage rebuilt in this order: hero (with manual prev/next arrows) →
  portfolio glimpse → cinematic video showcase (1 large autoplay + 3 small
  click-to-play) → recent work → testimonials → contact → single-row
  scrolling filmstrip
- Services reordered to lead with Pre-Wedding, Wedding Photography, and
  Wedding Videography/Cinematic Video; Baby Shower and Birthday
  Photography added as additional offerings; Choreography removed
  entirely (no longer an offered service)
- Client Gallery rebuilt around a real code-to-Google-Drive lookup (see
  section 4)

---

## Local preview

```bash
npm run dev
# or: npx serve .
```

## Deployment

This project is already set up on Cloudflare Pages/Workers (see prior
conversation for the full setup, including the `public/` folder
restructuring and `.assetsignore`/`wrangler.jsonc` fixes). Push changes to
your connected GitHub repo and it redeploys automatically.

## File structure

```
public/                      (or repo root, depending on your Cloudflare setup)
├── index.html, portfolio.html, services.html, pricing.html,
│   about.html, gallery.html, privacy.html, terms.html, 404.html
├── css/
│   ├── style.css            — design tokens, typography, base components
│   ├── components.css       — hero, video showcase, modal, filmstrip, etc.
│   └── animations.css       — keyframes + scroll-reveal motion
├── js/
│   ├── main.js               — all site interactivity
│   └── clients-data.js       — client gallery codes (edit this to add clients)
├── images/gallery/           — all placeholder photography (see section 2)
├── videos/                   — placeholder cinematic clips (see section 3)
├── manifest.json, robots.txt, sitemap.xml, vercel.json
└── build/                    — Jinja2 source templates (optional, for editing via templates instead of raw HTML)
```

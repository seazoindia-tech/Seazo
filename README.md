# Seazo website

Plain HTML + CSS + JavaScript. No build step and nothing to install. Open `index.html` in a browser to preview.

```
index.html  services.html  portfolio.html  about.html  contact.html
styles.css   all design: colours, fonts, spacing
main.js      phone number, menu, animations, portfolio filter/pop-up, contact form
assets/      logo, transparent logo, favicon
```

## Logo files (assets/)

- `seazo_logo.svg`: the master logo (brush S + SEAZO), vector, any size. Use this for print, Canva, etc.
- `seazo_mark.svg` / `favicon.svg`: the brush S on its own
- `seazo_logo_nav.png` / `seazo_logo_nav@2x.png`: small PNGs used in the website header (the @2x one is for sharp retina/4K screens)
- `seazo_logo_footer.png`: medium PNG used in the footer and About page
- `seazo_logo.png` (white background) / `seazo_logo_transparent.png`: large PNGs for social media, WhatsApp DP, documents
- `favicon.png`: browser tab icon
- `og-image.png`: the preview image shown when the link is shared on WhatsApp/Instagram

The website uses the PNG versions on purpose: the detailed brush SVG is slower for phones to draw.
To swap in a different logo, replace `seazo_logo_nav.png` and `seazo_logo_footer.png`, keeping the same names.

## Project images (assets/work/)

Each project has `name.jpg` (1200px), `name-md.jpg` (960px) and `name-sm.jpg` (720px). The browser picks the right size for each screen, so when you add or replace an image, make all three sizes. These are **concept designs** made for Seazo's portfolio. They are original mockups, not real client sites. `hero.jpg` is used at the top of the Home page and `collage.jpg` in the "Why Seazo" section.

## Fonts (assets/fonts/)

Inter and Montserrat are stored in `assets/fonts/` instead of loading from Google Fonts, which makes the site noticeably faster on phones. They are set up at the top of `styles.css`.

## Change contact details (phone, WhatsApp, email, Instagram)

All contact details live in ONE place: the `CONTACT` object at the top of `main.js`.

```js
const CONTACT = {
  phoneDisplay: "+91 93631 99319",   // how the number is shown on the page
  phoneLink: "919363199319",         // country code + number, no + and no spaces
  email: "seazoindia@gmail.com",
  instagram: "https://www.instagram.com/seazo.india/",
  instagramHandle: "@seazo.india"
};
```

Every WhatsApp button (hero, floating button, footer icon, "Reach us directly" card), the "Send on WhatsApp" contact form, every call link, every email link and every Instagram link reads from this object.

- **Email links** open Gmail in a new browser tab on desktop, and the phone's mail app (`mailto:`) on mobile or touch devices.
- **Studio** on the Contact page opens Perambalur in Google Maps.

The HTML also has the same values written into each link's `href` and text, so links still work if JavaScript is off. If you change a detail, search the `.html` files for the old value and update those fallbacks too.

After changing `main.js` or `styles.css`, bump the `?v=4` number in the `<script src="main.js?v=4">` and `<link href="styles.css?v=4">` tags on every page (e.g. to `?v=5`). That forces browsers to load the new file instead of an old saved copy.

## Change prices

Open `services.html` and search for `class="price"`. Edit the numbers (for example `₹4,999`). Add-on prices are just below, inside `class="addon"`. Each "Choose …" button also has a pre-filled WhatsApp message in `data-wa="…"` that mentions the price, so update that as well.

## Change colours

All brand colours are at the top of `styles.css` under `:root`. Change them there and the whole site updates.

`--rose-text` is a slightly darker rose used for small text, so it stays readable (accessible contrast).

## Add real portfolio work

In `portfolio.html`, each project card has a `<!-- REPLACE WITH REAL SCREENSHOT -->` comment above a `<span class="shot">…</span>` block.

1. Save the screenshot in `assets/`, e.g. `assets/work-spice-route.jpg` (about 1200×900, compressed; use squoosh.app).
2. Replace the whole `<span class="shot">…</span>` block with:
   ```html
   <img class="shot" src="assets/work-spice-route.jpg" alt="Spice Route Biryani website on a laptop and phone" width="1200" height="900" loading="lazy" style="object-fit:cover">
   ```
3. Change the `Concept` tag to the client's town (or remove it).
4. Edit the matching `<template id="p-…">` further down. That's the text shown in the pop-up (Problem / What Seazo did / Goal → change "Goal" to "Result" only for real clients with real results).
5. `data-cat` on the `<li>` controls the filters: any of `websites`, `instagram`, `google`, separated by spaces.

Do the same for the 3 cards in the "Recent work" section of `index.html`.

For the founder photo on `about.html`, save a square photo as `assets/vivek.jpg` (about 400×400, compressed). Until that file exists, the round "V" placeholder shows.

## Deploy to Netlify (free)

1. Go to https://app.netlify.com/drop and log in.
2. Drag the whole website folder onto the page.
3. That's it: you get a live link like `something.netlify.app`. Rename it under **Site configuration → Change site name**.
4. To update later: open the site in Netlify → **Deploys** → drag the folder in again.
5. Custom domain (e.g. seazo.in): **Domain management → Add a domain** and follow the steps. HTTPS is free and automatic.

After you have a domain, update the `og:image` tag in each page's `<head>` to the full URL (e.g. `https://seazo.in/assets/og-image.png`) so link previews on WhatsApp look right.

## Before going live

- When you get real clients, swap concept images for real screenshots as above.

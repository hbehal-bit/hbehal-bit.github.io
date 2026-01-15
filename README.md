# Watchdog Accounting — Landing Site

This repository contains a Jekyll-based marketing site for Watchdog Accounting (WA). It's built as a static site (HTML/CSS/JS) and is ready to be published via GitHub Pages.

## Files
- `_layouts/default.html` — The Jekyll default layout (header/footer + modal + scripts)
- `index.md` — The homepage content that uses the default layout
- `css/styles.css` — Styles for the site
- `js/script.js` — Minimal interactive behavior (live feed simulation, form modal, toggles)
- `assets/logo.svg` — Lightweight SVG logo

## Local preview
1. Clone the repo.
2. Install Ruby and Jekyll (if you want to build locally):
   - `gem install bundler jekyll`
   - `bundle exec jekyll serve`
3. Open `http://localhost:4000`.

For a simpler local preview, you can also open `index.md` rendered via a Markdown viewer, but the full site is best viewed via `jekyll serve`.

## Deploy to GitHub Pages
This repo includes a GitHub Actions workflow that builds the Jekyll site and deploys to GitHub Pages on pushes to `main`.

## Customization
- Replace copy in `index.md` with updated messaging.
- Styles: `css/styles.css`
- Interactivity: `js/script.js`
- Replace `assets/logo.svg` with your official logo.
- For real form handling, wire the contact form to your CRM or a secure backend. The present form is a demo that shows a modal.

## Notes & Next Steps
- Add analytics after compliance review.
- Integrate a secure demo-request backend for real requests.
- Consider adding blog/case-study pages and a small CMS.

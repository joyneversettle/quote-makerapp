# Quotation Maker Pro V16

Professional hotel quotation PWA with responsive A4 preview and email-safe quotation output.

## V16 fixes
- Desktop A4 preview is readable and centered instead of stretching across the screen.
- Mobile preview auto-fits to device width without zoom controls.
- Accommodation & Tariff uses the full document width.
- Summary rows align labels and amounts cleanly.
- Phone, email, and website output is black and non-underlined.
- Payment section includes Payment Method and Branch in addition to existing details.
- Rate editing no longer re-renders the row on every keystroke, so the cursor/focus is not lost.
- Service worker cache version bumped for V16 updates.
- Line-item amounts are always calculated fresh as Rooms × Nights × Rate, so displayed row amounts cannot become stale.
- Phone, email, and website contact text is protected against automatic link styling.
- Tariff breakdown uses explicit full-width left-label/right-amount rows.

## Files
- index.html
- styles.css
- app.js
- email-template.js
- manifest.webmanifest
- sw.js
- icon-192.png
- icon-512.png
- favicon-64.png
- apple-touch-icon.png

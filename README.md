# Quotation Maker — Cloudflare Pages

Based on the supplied quotation HTML. The quotation document sizing/layout is preserved while adding the requested app-level features.

## Included
- Orange professional app shell
- Settings for property/payment/terms
- Promo banner upload
- Authorized signature upload
- Separate Note section
- Local settings + draft persistence
- PWA manifest and service worker
- Mobile responsive shell
- Correct Rooms × Nights × Rate line-item calculation
- Favicon/PWA icons

## Deploy with GitHub + Cloudflare Pages
1. Create a new GitHub repository.
2. Upload everything in this folder.
3. Cloudflare Dashboard → Workers & Pages → Create application → Pages → Connect to Git.
4. Select the GitHub repository.
5. Production branch: `main`.
6. Because this is plain static HTML, use build command `exit 0` and set the build output directory to the repository root (the folder containing `index.html`).
7. Save and Deploy.

Cloudflare's current documentation says Git integration automatically rebuilds/deploys when you push changes. For a Vite version, use `npm run build` and `dist` instead.

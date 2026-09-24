# Payment & Booking Templates

This folder is an isolated document-template module. It does not modify the existing quotation files.

Open `templates/index.html` (or `/templates/` on the deployed site) to use:
- Payment Received
- Booking Confirmed

The module reads the existing Quotation Maker localStorage state (`qm_pro_v6_state`) so property settings, banner, signature and the latest quotation can be reused. It does not write changes to the existing quotation state.

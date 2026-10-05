# DelighTech client email template

This is a local, reusable HTML email template, not a website redesign. It uses inline styles, presentation tables, system fonts, and readable text independent of the logo. It contains no tracking pixels, scripts, invented credentials, or outcome claims. Default signature: Olaoluwa, CEO, DelighTech, ola@delightech.net.

## Save in Zoho Mail

1. Open `delightech-client-template.html` in Chrome or Safari. Select the rendered email content and copy it, not the HTML source.
2. In Zoho Mail, open Templates and choose Create Template (or New Mail → Insert Template → New template).
3. Name it “DelighTech — Client correspondence” and paste the rendered content into the rich-text message editor. Browser clipboard handling may simplify some formatting.
4. IMPORTANT: Delete the pasted logo and use Zoho's Insert Image → Upload from Disk to upload `public/delightech-logo.png`. The preview uses a local image path that recipients cannot access. Resize the inserted image to approximately 48 × 48 pixels. Do not send with the local image link.
5. If sending as hello@delightech.net, replace the signature email text and its mailto link with hello@delightech.net. Use your actual From address. Avoid a duplicate automatic signature.
6. Save the template. This does not send a message.
7. For each email, insert the saved template, update the subject, recipient and ALL bracketed placeholders, and send a test to yourself first.
8. Check the received test in Gmail on desktop and mobile: logo visible when images are allowed, readable text, no placeholders, correct reply address, functioning links, and no horizontal overflow. Outlook/other clients and dark modes may render differently; cross-client rendering has not been verified.

Recipients may block images. The DelighTech name remains visible as text, but the logo cannot be guaranteed to display when images are disabled. This template does not change the sender avatar, BIMI, DNS, or `.env.local`.

## Official instructions

- Templates: https://www.zoho.com/mail/help/using-templates.html
- Image upload: https://www.zoho.com/mail/help/insert-images.html

/**
 * Shared newsletter HTML builder.
 * Used by the send API route AND by the admin preview component.
 * Styles are 100% inline (email clients strip <style> tags).
 */
export function buildNewsletterHtml(
  subject: string,
  body: string,
  baseUrl: string,
  ctaText?: string,
  ctaLink?: string,
): string {
  // ── Helpers ─────────────────────────────────────────────────────────────

  const escapeHtml = (s: string): string =>
    s.replace(/[&<>"']/g, (c) => ({
      '&': '&amp;',
      '<': '&lt;',
      '>': '&gt;',
      '"': '&quot;',
      "'": '&#39;',
    }[c]!))

  // ── Haurus logo SVG → base64 data URI ───────────────────────────────────
  // Extrait de src/components/layout/Navbar.tsx (lignes 39-50)
  // Minifié + encodé pour éviter toute dépendance réseau dans les clients email.
  const logoSvg = `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 122 110" width="24" height="24" fill="none"><path fill="#f2cb38" d="M66.68 9.92c2.15 1.49 3.96 3.12 5.25 5.38l34.14 59.88c5.06 8.87 2.55 20.18-4.92 26.71-8.61 7.53-21.36 6.81-29.45-1.16-1.57-1.55-4.23-.7-5.26.93-1.21 1.93-.49 3.85 1.11 5.31 9.01 8.23 22.26 9.97 33.06 4.27 2.82-1.49 5.2-3.39 7.41-5.71 4.51-4.74 7.16-10.82 7.8-17.35.68-6.84-1.28-13.25-4.64-19.12L78.53 11.95c-7.59-13.26-25.14-15.81-36.15-6.05l-3.15 3.13 13.66 23.9c.64 1.12.47 2.14-.14 3.21l-22.12 38.66c-1.75 3.06-2.08 6.5-.25 9.68 1.54 2.69 4.51 4.68 7.88 4.56 2.15-.08 3.74-1.72 3.69-3.76s-1.57-3.61-3.66-3.63c-.66 0-1.3-.46-1.53-.91-.33-.65-.29-1.24.07-1.88l25.42-44.46-13.7-23.97c5.46-3.83 12.5-4.03 18.14-.54ZM65.72 55.42l13.4 23.43c.37.64.45 1.23.13 1.87-.21.41-.82.97-1.49.97h-21.94s-8.51 14.86-8.51 14.86c-6.69 11.69-22.83 14.2-32.85 5.05-7.65-6.99-9.33-18.27-4.19-27.28l26.46-46.27c1.09-1.91.28-4.18-1.47-5.13-1.89-1.02-3.93-.27-4.99 1.58L4.36 69.68c-7.23 12.27-5.43 27.78 5.19 37.47 13.41 12.25 35.13 8.78 43.89-6.43l6.68-11.6h17.36c3.27 0 6.16-1.51 7.82-4.1 1.74-2.72 2.18-6.37.54-9.25l-13.84-24.28c-1.05-1.84-3.38-2.33-5.08-1.3-1.78 1.08-2.3 3.29-1.19 5.23Z"/></svg>`

  const logoDataUri = `data:image/svg+xml;base64,${Buffer.from(logoSvg).toString('base64')}`

  // ── Content ─────────────────────────────────────────────────────────────

  const escapedSubject = escapeHtml(subject)
  const escapedBody    = escapeHtml(body)
  const escapedCtaText = ctaText ? escapeHtml(ctaText) : ''

  // ── CTA block (only if both ctaText AND ctaLink are provided) ───────────
  const hasCta = ctaText?.trim() && ctaLink?.trim()
  const ctaBlock = hasCta ? `
          <tr>
            <td style="padding:0 32px 24px;text-align:center;">
              <a href="${ctaLink?.trim()}"
                 style="display:inline-block;padding:12px 28px;background-color:#f2cb38;color:#09090b;font-size:14px;font-weight:600;text-decoration:none;border-radius:6px;letter-spacing:-0.01em;">
                ${escapedCtaText}
              </a>
            </td>
          </tr>` : ''

  // ── X/Twitter link in footer ─────────────────────────────────────────────
  const twitterUrl = 'https://x.com/your-account'
  const xIconSvg = `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width="14" height="14" fill="currentColor"><path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-4.714-6.231-5.401 6.231H2.747l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z"/></svg>`

  return `<!DOCTYPE html>
<html lang="fr">
<head>
  <meta charset="UTF-8" />
  <title>${escapedSubject}</title>
</head>
<body style="margin:0;padding:0;background-color:#f6f9fc;font-family:Arial,Helvetica,sans-serif;">
  <table width="100%" cellpadding="0" cellspacing="0" border="0" style="background-color:#f6f9fc;">
    <tr>
      <td align="center" style="padding:32px 16px;">
        <table width="600" cellpadding="0" cellspacing="0" border="0"
               style="max-width:600px;width:100%;background-color:#ffffff;border-radius:8px;overflow:hidden;
                      box-shadow:0 1px 3px rgba(0,0,0,0.1);">
          <!-- Header -->
          <tr>
            <td style="background-color:#0a0a0a;padding:24px 32px;text-align:center;">
              <img src="${logoDataUri}" alt="Haurus" width="24" height="24" style="display:inline-block;vertical-align:middle;margin-right:8px;" />
              <p style="margin:0;display:inline;font-size:18px;font-weight:700;color:#f0f0f0;letter-spacing:-0.02em;vertical-align:middle;">
                Haurus
              </p>
            </td>
          </tr>
          <!-- Body -->
          <tr>
            <td style="padding:32px;text-align:left;">
              <div style="font-size:15px;color:#3f3f46;line-height:1.6;white-space:pre-wrap;">
                ${escapedBody}
              </div>
            </td>
          </tr>${ctaBlock}
          <!-- Footer -->
          <tr>
            <td style="padding:24px 32px;border-top:1px solid #e4e4e7;background-color:#fafafa;text-align:center;">
              <p style="margin:0 0 8px;font-size:12px;color:#71717a;text-align:center;">
                Tu reçois cet email parce que tu es inscrit à la newsletter Haurus.
              </p>
              <p style="margin:0 0 10px;font-size:12px;text-align:center;">
                <a href="${baseUrl}/unsubscribe"
                   style="font-size:12px;color:#6366f1;text-decoration:none;">
                  Se désabonner
                </a>
              </p>
              <p style="margin:0;font-size:12px;text-align:center;">
                <a href="${twitterUrl}"
                   target="_blank"
                   rel="noopener noreferrer"
                   style="display:inline-flex;align-items:center;gap:4px;font-size:12px;color:#71717a;text-decoration:none;">
                  ${xIconSvg}
                  <span>X / Twitter</span>
                </a>
              </p>
            </td>
          </tr>
        </table>
      </td>
    </tr>
  </table>
</body>
</html>`
}

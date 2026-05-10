/**
 * Shared newsletter HTML builder.
 * Used by the send API route AND by the admin preview component.
 * Styles are 100% inline (email clients strip <style> tags).
 */
export function buildNewsletterHtml(
  subject: string,
  body: string,
  baseUrl: string,
  ctaLabel?: string,
  ctaHref?: string,
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
  // Extrait de src/components/layout/Navbar.tsx
  // Minifié + encodé pour éviter toute dépendance réseau dans les clients email.
  const logoSvg = `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 122 110" width="24" height="24" fill="none"><path fill="#f2cb38" d="M66.68 9.92c2.15 1.49 3.96 3.12 5.25 5.38l34.14 59.88c5.06 8.87 2.55 20.18-4.92 26.71-8.61 7.53-21.36 6.81-29.45-1.16-1.57-1.55-4.23-.7-5.26.93-1.21 1.93-.49 3.85 1.11 5.31 9.01 8.23 22.26 9.97 33.06 4.27 2.82-1.49 5.2-3.39 7.41-5.71 4.51-4.74 7.16-10.82 7.8-17.35.68-6.84-1.28-13.25-4.64-19.12L78.53 11.95c-7.59-13.26-25.14-15.81-36.15-6.05l-3.15 3.13 13.66 23.9c.64 1.12.47 2.14-.14 3.21l-22.12 38.66c-1.75 3.06-2.08 6.5-.25 9.68 1.54 2.69 4.51 4.68 7.88 4.56 2.15-.08 3.74-1.72 3.69-3.76s-1.57-3.61-3.66-3.63c-.66 0-1.3-.46-1.53-.91-.33-.65-.29-1.24.07-1.88l25.42-44.46-13.7-23.97c5.46-3.83 12.5-4.03 18.14-.54ZM65.72 55.42l13.4 23.43c.37.64.45 1.23.13 1.87-.21.41-.82.97-1.49.97h-21.94s-8.51 14.86-8.51 14.86c-6.69 11.69-22.83 14.2-32.85 5.05-7.65-6.99-9.33-18.27-4.19-27.28l26.46-46.27c1.09-1.91.28-4.18-1.47-5.13-1.89-1.02-3.93-.27-4.99 1.58L4.36 69.68c-7.23 12.27-5.43 27.78 5.19 37.47 13.41 12.25 35.13 8.78 43.89-6.43l6.68-11.6h17.36c3.27 0 6.16-1.51 7.82-4.1 1.74-2.72 2.18-6.37.54-9.25l-13.84-24.28c-1.05-1.84-3.38-2.33-5.08-1.3-1.78 1.08-2.3 3.29-1.19 5.23Z"/></svg>`

  const logoDataUri = `data:image/svg+xml;base64,${Buffer.from(logoSvg).toString('base64')}`

  // ── Content ─────────────────────────────────────────────────────────────

  const escapedSubject = escapeHtml(subject)
  const escapedBody    = escapeHtml(body)
  const escapedCtaLabel = ctaLabel ? escapeHtml(ctaLabel) : ''
  const escapedCtaHref = ctaHref ? escapeHtml(ctaHref) : ''

  // ── CTA block (conditional) ─────────────────────────────────────────────
  const showCta = Boolean(escapedCtaLabel && escapedCtaHref)
  const ctaBlock = showCta
    ? `<tr>
         <td style="padding:0 40px 32px;">
           <a href="${escapedCtaHref}" target="_blank" rel="noopener"
              style="display:inline-block;background:#F2CB38;color:#09090b;
                     padding:13px 28px;border-radius:8px;text-decoration:none;
                     font-weight:600;font-size:15px;letter-spacing:-0.01em;
                     line-height:1;text-align:center;">
             ${escapedCtaLabel}
           </a>
         </td>
       </tr>`
    : ''

  // ── X (Twitter) logo SVG inline ─────────────────────────────────────────
  // Path SVG statique — pas de requête réseau, compatible tous clients email.
  const xLogoSvg = `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width="20" height="20" fill="currentColor">
    <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z"/>
  </svg>`

  const xLogoDataUri = `data:image/svg+xml;base64,${Buffer.from(xLogoSvg).toString('base64')}`

  return `<!DOCTYPE html>
<html lang="fr">
<head>
  <meta charset="UTF-8" />
  <title>${escapedSubject}</title>
</head>
<body style="margin:0;padding:0;background-color:#f4f4f5;font-family:Arial,Helvetica,sans-serif;">
  <table width="100%" cellpadding="0" cellspacing="0" border="0" style="background-color:#f4f4f5;">
    <tr>
      <td align="center" style="padding:48px 16px 40px;">
        <table width="600" cellpadding="0" cellspacing="0" border="0"
               style="max-width:600px;width:100%;background-color:#ffffff;border-radius:12px;overflow:hidden;
                      box-shadow:0 2px 8px rgba(0,0,0,0.08);">

          <!-- Header — fond sombre #09090b -->
          <tr>
            <td style="background-color:#09090b;padding:32px 40px;text-align:center;">
              <a href="${baseUrl}" target="_blank" rel="noopener"
                 style="text-decoration:none;display:inline-block;">
                <img src="${logoDataUri}" alt="Haurus" width="28" height="28"
                     style="display:inline-block;vertical-align:middle;margin-right:10px;" />
                <span style="display:inline;font-size:20px;font-weight:700;
                             color:#ffffff;letter-spacing:-0.03em;vertical-align:middle;">
                  Haurus
                </span>
              </a>
            </td>
          </tr>

          <!-- Body — fond blanc, spacing généreux -->
          <tr>
            <td style="padding:40px 40px 0;">
              <h1 style="margin:0 0 20px;font-size:22px;font-weight:700;
                         color:#09090b;letter-spacing:-0.03em;line-height:1.3;">
                ${escapedSubject}
              </h1>
              <div style="font-size:16px;color:#3f3f46;line-height:1.7;white-space:pre-wrap;">
                ${escapedBody}
              </div>
            </td>
          </tr>

          <!-- CTA button (conditional) -->
          ${ctaBlock}

          <!-- Footer — fond sombre #09090b -->
          <tr>
            <td style="background-color:#09090b;padding:32px 40px;">

              <!-- Ligne supérieur : logo + liens -->
              <table width="100%" cellpadding="0" cellspacing="0" border="0">
                <tr>
                  <!-- Logo Haurus cliquable (gauche) -->
                  <td style="vertical-align:middle;">
                    <a href="${baseUrl}" target="_blank" rel="noopener"
                       style="text-decoration:none;display:inline-block;">
                      <img src="${logoDataUri}" alt="Haurus" width="22" height="22"
                           style="display:inline-block;vertical-align:middle;margin-right:6px;" />
                      <span style="display:inline;font-size:13px;font-weight:700;
                                   color:#ffffff;letter-spacing:-0.02em;vertical-align:middle;">
                        Haurus
                      </span>
                    </a>
                  </td>

                  <!-- Liens centre + X (droite) -->
                  <td align="right" style="vertical-align:middle;">
                    <table cellpadding="0" cellspacing="0" border="0"
                           style="display:inline-table;">
                      <tr>
                        <!-- Lien Se désabonner -->
                        <td style="padding:0 16px 0 0;border-right:1px solid rgba(255,255,255,0.15);">
                          <a href="${baseUrl}/unsubscribe"
                             style="font-size:12px;color:#a1a1aa;text-decoration:none;">
                            Se désabonner
                          </a>
                        </td>
                        <!-- X logo -->
                        <td style="padding:0 0 0 16px;">
                          <a href="https://x.com/HaurusApp" target="_blank" rel="noopener"
                             style="text-decoration:none;display:inline-block;vertical-align:middle;">
                            <img src="${xLogoDataUri}" alt="X (Twitter)"
                                 width="18" height="18" />
                          </a>
                        </td>
                      </tr>
                    </table>
                  </td>
                </tr>
              </table>

              <!-- Ligne inférieur : mention légale -->
              <table width="100%" cellpadding="0" cellspacing="0" border="0"
                     style="margin-top:16px;">
                <tr>
                  <td style="text-align:center;">
                    <p style="margin:0;font-size:11px;color:#52525b;line-height:1.5;">
                      Tu reçois cet email parce que tu es inscrit à la newsletter Haurus.
                    </p>
                  </td>
                </tr>
              </table>
            </td>
          </tr>
        </table>
      </td>
    </tr>
  </table>
</body>
</html>`
}

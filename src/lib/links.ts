// Central place for outbound contact config.
export const CONTACT_EMAIL = 'hello@pivotaltimes.io'

// Where the booking form sends leads. Leave empty to fall back to a mailto:
// draft to CONTACT_EMAIL. Set to a form endpoint (Formspree, Basin, your CRM
// webhook, etc.) to capture submissions directly — the form POSTs JSON to it.
export const FORM_ENDPOINT = ''

// Kept for any direct scheduling link (e.g. a Calendly/Cal.com URL); unused
// while the on-site booking modal is the primary CTA.
export const BOOKING_URL = '#'

export const GA_TRACKING_ID: string = process.env.NEXT_PUBLIC_G ?? ""
// https://github.com/vercel/next.js/tree/canary/examples/with-google-analytics
// https://developers.google.com/analytics/devguides/collection/gtagjs/pages
export const pageview = (url :URL) => {
  window.gtag('config', GA_TRACKING_ID, {
    page_path: url,
  })
}


// https://developers.google.com/analytics/devguides/collection/gtagjs/events
export const event = (
    action: Gtag.EventNames,
    { event_category, event_label, value }: Gtag.EventParams
) => {
    window.gtag('event', action, {
        event_category,
        event_label,
        value
    });
};
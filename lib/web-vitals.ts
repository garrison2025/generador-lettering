import type { NextWebVitalsMetric } from "next/app"

export function reportWebVitals(metric: NextWebVitalsMetric) {
  const { id, name, label, value } = metric

  // Log to console in development
  if (process.env.NODE_ENV === "development") {
    console.log(`Web Vital: ${name} (${label}) - ${value}`)
  }

  // In production you would send to your analytics service
  // Example for sending to Google Analytics:
  // if (window.gtag) {
  //   window.gtag('event', name, {
  //     event_category: 'Web Vitals',
  //     event_label: id,
  //     value: Math.round(name === 'CLS' ? value * 1000 : value),
  //     non_interaction: true,
  //   })
  // }
}

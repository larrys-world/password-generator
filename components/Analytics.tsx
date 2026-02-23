'use client';

import Script from 'next/script';

export default function Analytics() {
  // Only load in production
  if (process.env.NODE_ENV !== 'production') {
    return null;
  }

  // Use environment variable for domain, fallback to empty string during build
  const domain = process.env.NEXT_PUBLIC_PLAUSIBLE_DOMAIN || '';

  // Don't render if no domain is set
  if (!domain) {
    return null;
  }

  return (
    <Script
      defer
      data-domain={domain}
      src="https://plausible.io/js/script.js"
      strategy="afterInteractive"
    />
  );
}
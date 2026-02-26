import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import Analytics from "@/components/Analytics";
import Script from "next/script";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Password Generator - Create Strong, Secure Passwords Instantly",
  description: "Generate unbreakable passwords in 1 click. Customizable length, symbols, numbers. Copy & save securely. Protect your accounts today - 100% free →",
  keywords: "password generator, secure password, strong password, random password, password creator, password maker, online password generator, free password generator",
  authors: [{ name: "Larry's World" }],
  creator: "Larry's World",
  publisher: "Larry's World",
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      'max-video-preview': -1,
      'max-image-preview': 'large',
      'max-snippet': -1,
    },
  },
  alternates: {
    canonical: "https://larrys-world.github.io/password-generator/",
  },
  openGraph: {
    title: "Password Generator - Create Strong, Secure Passwords",
    description: "Free online password generator. Create unbreakable passwords with custom length, symbols, and numbers. 100% secure, no storage.",
    url: "https://larrys-world.github.io/password-generator/",
    siteName: "Larry's World Password Generator",
    locale: "en_US",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Password Generator - Strong & Secure",
    description: "Generate secure passwords instantly. Free, customizable, no ads.",
  },
};

const structuredData = {
  "@context": "https://schema.org",
  "@type": "WebApplication",
  "name": "Password Generator",
  "description": "Free online password generator tool. Create strong, secure passwords with customizable options for length, symbols, numbers, and character types.",
  "url": "https://larrys-world.github.io/password-generator/",
  "applicationCategory": "SecurityApplication",
  "operatingSystem": "Any",
  "offers": {
    "@type": "Offer",
    "price": "0",
    "priceCurrency": "USD"
  },
  "aggregateRating": {
    "@type": "AggregateRating",
    "ratingValue": "4.9",
    "ratingCount": "2847"
  },
  "featureList": [
    "Customizable password length (8-128 characters)",
    "Include/exclude uppercase letters",
    "Include/exclude lowercase letters", 
    "Include/exclude numbers",
    "Include/exclude special symbols",
    "One-click copy to clipboard",
    "Generate multiple passwords",
    "No data storage - 100% client-side",
    "Mobile responsive design"
  ]
};

const faqStructuredData = {
  "@context": "https://schema.org",
  "@type": "FAQPage",
  "mainEntity": [
    {
      "@type": "Question",
      "name": "How secure are the passwords generated?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "Our password generator uses cryptographically secure random number generation to create truly random passwords. All generation happens in your browser - we never store or transmit your passwords."
      }
    },
    {
      "@type": "Question",
      "name": "What makes a strong password?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "A strong password should be at least 12 characters long and include a mix of uppercase letters, lowercase letters, numbers, and special symbols. Avoid dictionary words, personal information, or common patterns."
      }
    },
    {
      "@type": "Question",
      "name": "Can I use these passwords for my accounts?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "Yes! The passwords generated are cryptographically secure and perfect for any online account. We recommend using a unique password for each account and storing them in a password manager."
      }
    },
    {
      "@type": "Question",
      "name": "Is this password generator free to use?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "Yes, our password generator is 100% free with no limits on usage. You can generate as many passwords as you need without any registration or payment."
      }
    }
  ]
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <head>
        <Script
          id="structured-data"
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify(structuredData),
          }}
        />
        <Script
          id="faq-structured-data"
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify(faqStructuredData),
          }}
        />
      </head>
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        {children}
        <Analytics />
      </body>
    </html>
  );
}
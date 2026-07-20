import type { Metadata } from "next";

import {
  Cormorant_Garamond,
  Manrope,
} from "next/font/google";

import "./globals.css";

import Schema from "./schema";


const manrope = Manrope({
  subsets: ["latin"],
  variable: "--font-manrope",
  display: "swap",
});


const cormorant = Cormorant_Garamond({
  subsets: ["latin"],
  variable: "--font-cormorant",
  weight: [
    "400",
    "500",
    "600",
    "700",
  ],
  display: "swap",
});


export const metadata: Metadata = {
  metadataBase: new URL(
    "https://setarehsalehabadi.com"
  ),

  title: {
    default:
      "Setareh Salehabadi | Digital Growth Strategist",

    template:
      "%s | Setareh Salehabadi",
  },

  description:
    "Setareh Salehabadi is a Digital Growth Strategist helping ambitious businesses grow through SEO, digital strategy, consumer psychology, AI and data-driven marketing systems.",

  keywords: [
    "Setareh Salehabadi",
    "Digital Growth Strategist",
    "SEO Specialist",
    "SEO Consultant",
    "Growth Marketing",
    "Digital Strategy",
    "AI Marketing",
    "Marketing Automation",
    "Consumer Psychology",
    "Business Growth",
  ],

  authors: [
    {
      name:
        "Setareh Salehabadi",
    },
  ],

  creator:
    "Setareh Salehabadi",

  category:
    "Digital Marketing",

  openGraph: {
    title:
      "Setareh Salehabadi | Digital Growth Strategist",

    description:
      "Building measurable growth systems through SEO, AI, consumer psychology and digital strategy.",

    url:
      "https://setarehsalehabadi.com",

    siteName:
      "Setareh Salehabadi",

    locale:
      "en_US",

    type:
      "website",

    images: [
      {
        url:
          "/og-image.png",

        width:
          1200,

        height:
          630,

        alt:
          "Setareh Salehabadi - Digital Growth Strategist",
      },
    ],
  },

  twitter: {
    card:
      "summary_large_image",

    title:
      "Setareh Salehabadi | Digital Growth Strategist",

    description:
      "SEO, AI and digital growth systems for ambitious businesses.",

    images: [
      "/og-image.png",
    ],
  },

  robots: {
    index:
      true,

    follow:
      true,
  },
};


export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      className={`${manrope.variable} ${cormorant.variable}`}
    >
      <body>
        <Schema />

        {children}
      </body>
    </html>
  );
}
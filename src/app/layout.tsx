import type { Metadata } from "next";

import { Inter, Manrope } from "next/font/google";

import "./globals.css";

import Schema from "./schema";



const inter = Inter({

  subsets: ["latin"],

  variable: "--font-inter",

});



const manrope = Manrope({

  subsets: ["latin"],

  variable: "--font-manrope",

});





export const metadata: Metadata = {


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

  ],



  authors: [

    {

      name:
        "Setareh Salehabadi",

    },

  ],



  creator:
    "Setareh Salehabadi",



  metadataBase:

    new URL(

      "https://setarehsalehabadi.com"

    ),




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


  },




  twitter: {


    card:
      "summary_large_image",


    title:
      "Setareh Salehabadi | Digital Growth Strategist",


    description:
      "SEO, AI and digital growth systems for ambitious businesses.",


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


    <html lang="en">


      <body

        className={`${inter.variable} ${manrope.variable}`}

      >


        <Schema />


        {children}


      </body>


    </html>


  );

}
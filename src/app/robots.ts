import { MetadataRoute } from "next";


export default function robots(): MetadataRoute.Robots {

  return {

    rules: {

      userAgent: "*",

      allow: "/",

    },


    sitemap:

      "https://setarehsalehabadi.com/sitemap.xml",

  };

}
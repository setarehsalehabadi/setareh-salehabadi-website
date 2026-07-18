export default function Schema() {

  const schema = {

    "@context": "https://schema.org",

    "@type": "Person",

    "name":
      "Setareh Salehabadi",

    "url":
      "https://setarehsalehabadi.com",

    "jobTitle":
      "Digital Growth Strategist",

    "description":
      "Digital Growth Strategist specializing in SEO, digital strategy, consumer psychology, AI marketing and growth systems.",


    "sameAs": [

      "https://www.linkedin.com",

      "https://www.instagram.com",

      "https://github.com"

    ],


    "knowsAbout": [

      "SEO",

      "Digital Marketing",

      "Growth Strategy",

      "Artificial Intelligence",

      "Marketing Automation",

      "Consumer Psychology"

    ]

  };



  return (

    <script

      type="application/ld+json"

      dangerouslySetInnerHTML={{

        __html:
          JSON.stringify(schema),

      }}

    />

  );

}
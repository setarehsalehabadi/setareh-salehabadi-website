import type { Locale } from "@/i18n/config";

export const expertiseSlugs = [
  "seo-organic-growth",
  "digital-growth-strategy",
  "consumer-psychology",
  "data-analytics",
  "ai-automation",
] as const;

export type ExpertiseSlug =
  (typeof expertiseSlugs)[number];

export type ExpertiseCapability = {
  title: string;
  description: string;
};

export type ExpertiseStep = {
  number: string;
  title: string;
  description: string;
};

export type ExpertisePageContent = {
  slug: ExpertiseSlug;

  metaTitle: string;
  metaDescription: string;

  eyebrow: string;

  title: {
    first: string;
    highlighted: string;
  };

  introduction: string;
  imageAlt: string;

  overview: {
    label: string;
    title: string;
    description: string;
  };

  capabilities: {
    label: string;
    title: string;
    items: ExpertiseCapability[];
  };

  approach: {
    label: string;
    title: string;
    introduction: string;
    steps: ExpertiseStep[];
  };

  questions: {
    label: string;
    title: string;
    items: string[];
  };

  principle: {
    label: string;
    statement: string;
  };

  relatedLabel: string;
  relatedSlugs: ExpertiseSlug[];

  cta: {
    primary: {
      label: string;
      href: string;
    };

    secondary: {
      label: string;
      href: string;
    };
  };
};

export const expertisePages = {
  en: {
    "seo-organic-growth": {
      slug: "seo-organic-growth",

      metaTitle:
        "SEO & Organic Growth Strategy",

      metaDescription:
        "A strategic approach to technical SEO, search intent, content architecture and sustainable organic growth.",

      eyebrow:
        "SEO & Organic Growth",

      title: {
        first:
          "Organic visibility built through",
        highlighted:
          "search clarity and structure.",
      },

      introduction:
        "SEO becomes more valuable when technical foundations, search demand, content structure and business priorities operate as one connected growth system.",

      imageAlt:
        "Editorial representation of SEO research, search intent analysis and organic growth planning",

      overview: {
        label:
          "Strategic overview",

        title:
          "Search growth begins with understanding what deserves to be discovered.",

        description:
          "The work starts by identifying how people search, what information they need and where the current website creates technical, structural or content-related barriers. The goal is not simply to increase rankings, but to build a clearer path between genuine search demand and useful business content.",
      },

      capabilities: {
        label:
          "Core capabilities",

        title:
          "Connected areas of SEO work",

        items: [
          {
            title:
              "Technical SEO",

            description:
              "Reviewing crawlability, indexing, site architecture, internal linking and technical barriers that may limit organic visibility.",
          },
          {
            title:
              "Search intent analysis",

            description:
              "Understanding the questions, expectations and decision stages behind relevant search queries.",
          },
          {
            title:
              "Content architecture",

            description:
              "Organising pages and topics into a structure that supports user understanding, discoverability and long-term authority.",
          },
          {
            title:
              "Organic measurement",

            description:
              "Connecting search performance, landing-page behaviour and business priorities through practical measurement frameworks.",
          },
        ],
      },

      approach: {
        label:
          "Working approach",

        title:
          "From search diagnosis to continuous improvement",

        introduction:
          "The exact priorities change according to the website, audience and available evidence, but the strategic sequence remains consistent.",

        steps: [
          {
            number: "01",
            title:
              "Review",

            description:
              "Examine the current technical foundation, search visibility, content structure and performance signals.",
          },
          {
            number: "02",
            title:
              "Map demand",

            description:
              "Identify relevant topics, search intent, audience questions and gaps between existing content and real demand.",
          },
          {
            number: "03",
            title:
              "Prioritise",

            description:
              "Select improvements according to strategic value, feasibility and their relationship with business objectives.",
          },
          {
            number: "04",
            title:
              "Measure and learn",

            description:
              "Track visibility, engagement and search behaviour to refine the system over time.",
          },
        ],
      },

      questions: {
        label:
          "Questions this area addresses",

        title:
          "The decisions behind sustainable search growth",

        items: [
          "Which technical issues are preventing important pages from being discovered or indexed?",
          "What does the audience actually expect when searching for relevant topics?",
          "Which content gaps have the strongest strategic value?",
          "How should organic performance be measured beyond isolated keyword positions?",
        ],
      },

      principle: {
        label:
          "SEO principle",

        statement:
          "Sustainable organic growth is built by making useful information easier to discover, understand and trust.",
      },

      relatedLabel:
        "Related expertise",

      relatedSlugs: [
        "digital-growth-strategy",
        "data-analytics",
      ],

      cta: {
        primary: {
          label:
            "View selected projects",
          href:
            "/case-studies",
        },

        secondary: {
          label:
            "Explore research",
          href:
            "/research",
        },
      },
    },

    "digital-growth-strategy": {
      slug: "digital-growth-strategy",

      metaTitle:
        "Digital Growth Strategy",

      metaDescription:
        "A structured approach to digital priorities, connected channels, audience needs and measurable long-term growth.",

      eyebrow:
        "Digital Growth Strategy",

      title: {
        first:
          "Clearer priorities for",
        highlighted:
          "connected digital growth.",
      },

      introduction:
        "Digital growth becomes more focused when business objectives, audience needs, channel decisions and measurement operate within one coherent strategic direction.",

      imageAlt:
        "Editorial representation of digital strategy, growth priorities and connected marketing systems",

      overview: {
        label:
          "Strategic overview",

        title:
          "Strategy creates a reason for every channel, action and measurement.",

        description:
          "Instead of treating SEO, content, analytics, customer experience and automation as separate activities, a growth strategy connects them around a defined business problem. It clarifies what matters now, what can wait and how each decision should contribute to a measurable direction.",
      },

      capabilities: {
        label:
          "Core capabilities",

        title:
          "The building blocks of a connected strategy",

        items: [
          {
            title:
              "Growth diagnosis",

            description:
              "Reviewing the business context, current performance, audience needs and barriers before selecting tactics.",
          },
          {
            title:
              "Strategic priorities",

            description:
              "Identifying which opportunities deserve attention according to value, evidence, resources and timing.",
          },
          {
            title:
              "Channel alignment",

            description:
              "Defining how search, content, campaigns, customer experience and technology should support one another.",
          },
          {
            title:
              "Measurement direction",

            description:
              "Creating clear indicators that connect activity with learning, customer behaviour and business outcomes.",
          },
        ],
      },

      approach: {
        label:
          "Working approach",

        title:
          "From complexity to a practical growth roadmap",

        introduction:
          "The purpose of the process is to reduce disconnected activity and create a sequence of decisions that can be understood, executed and improved.",

        steps: [
          {
            number: "01",
            title:
              "Define the problem",

            description:
              "Clarify the current business challenge, intended audience and the outcome the strategy needs to support.",
          },
          {
            number: "02",
            title:
              "Evaluate the system",

            description:
              "Review existing channels, journeys, content, data and operational limitations as one connected environment.",
          },
          {
            number: "03",
            title:
              "Set priorities",

            description:
              "Translate evidence into a focused roadmap with clear strategic choices and realistic sequencing.",
          },
          {
            number: "04",
            title:
              "Create a learning loop",

            description:
              "Use measurement and customer evidence to refine priorities rather than treating the roadmap as fixed.",
          },
        ],
      },

      questions: {
        label:
          "Questions this area addresses",

        title:
          "The decisions that create strategic focus",

        items: [
          "What is the real growth problem behind the requested marketing activity?",
          "Which audiences, channels and opportunities deserve priority?",
          "Where are resources being distributed across disconnected actions?",
          "How should progress be evaluated and strategic decisions improved?",
        ],
      },

      principle: {
        label:
          "Strategy principle",

        statement:
          "A strong growth strategy does not add more activity; it creates clearer choices about what should happen and why.",
      },

      relatedLabel:
        "Related expertise",

      relatedSlugs: [
        "consumer-psychology",
        "data-analytics",
      ],

      cta: {
        primary: {
          label:
            "Explore the growth system",
          href:
            "/growth-system",
        },

        secondary: {
          label:
            "View selected projects",
          href:
            "/case-studies",
        },
      },
    },

    "consumer-psychology": {
      slug: "consumer-psychology",

      metaTitle:
        "Consumer Psychology & Customer Behaviour",

      metaDescription:
        "Using behavioural insight to understand trust, decision-making, customer journeys and digital experience.",

      eyebrow:
        "Consumer Psychology",

      title: {
        first:
          "Better digital decisions begin with",
        highlighted:
          "understanding human behaviour.",
      },

      introduction:
        "Consumer psychology helps explain how people notice information, evaluate options, experience uncertainty, build trust and move toward or away from a decision.",

      imageAlt:
        "Editorial representation of consumer psychology, customer behaviour and digital decision-making",

      overview: {
        label:
          "Strategic overview",

        title:
          "Growth is shaped by what people understand, feel and trust.",

        description:
          "Digital performance is not determined only by channels or technology. It is also influenced by cognitive effort, perceived risk, expectations, previous experience and the clarity of the customer journey. Behavioural insight helps identify where communication or experience creates confidence and where it creates hesitation.",
      },

      capabilities: {
        label:
          "Core capabilities",

        title:
          "Behavioural insight across the digital journey",

        items: [
          {
            title:
              "Decision behaviour",

            description:
              "Examining how people compare alternatives, interpret information and make choices under uncertainty.",
          },
          {
            title:
              "Trust and credibility",

            description:
              "Identifying the signals that reduce perceived risk and help users feel more confident in a digital environment.",
          },
          {
            title:
              "Journey friction",

            description:
              "Finding moments of confusion, unnecessary effort or uncertainty that may interrupt engagement and conversion.",
          },
          {
            title:
              "Audience understanding",

            description:
              "Connecting behavioural patterns, needs and motivations with clearer communication and experience decisions.",
          },
        ],
      },

      approach: {
        label:
          "Working approach",

        title:
          "From behavioural observation to practical improvement",

        introduction:
          "Behavioural analysis is used to improve strategic clarity, not to manipulate people or create artificial pressure.",

        steps: [
          {
            number: "01",
            title:
              "Observe",

            description:
              "Review customer journeys, language, interaction patterns and available behavioural evidence.",
          },
          {
            number: "02",
            title:
              "Identify friction",

            description:
              "Locate points where users may experience confusion, effort, risk or a lack of trust.",
          },
          {
            number: "03",
            title:
              "Interpret behaviour",

            description:
              "Connect observed patterns with possible psychological and contextual explanations.",
          },
          {
            number: "04",
            title:
              "Improve responsibly",

            description:
              "Translate insight into clearer information, lower-friction journeys and more trustworthy experiences.",
          },
        ],
      },

      questions: {
        label:
          "Questions this area addresses",

        title:
          "The behavioural questions behind digital performance",

        items: [
          "What makes an audience trust or question the information they encounter?",
          "Where does the customer journey create unnecessary cognitive effort?",
          "Which perceived risks may delay or prevent a decision?",
          "How can communication become clearer without using pressure or manipulation?",
        ],
      },

      principle: {
        label:
          "Behavioural principle",

        statement:
          "Ethical behavioural insight should make decisions clearer and experiences more trustworthy, not exploit uncertainty.",
      },

      relatedLabel:
        "Related expertise",

      relatedSlugs: [
        "digital-growth-strategy",
        "data-analytics",
      ],

      cta: {
        primary: {
          label:
            "Explore research",
          href:
            "/research",
        },

        secondary: {
          label:
            "View selected projects",
          href:
            "/case-studies",
        },
      },
    },

    "data-analytics": {
      slug: "data-analytics",

      metaTitle:
        "Data & Digital Analytics",

      metaDescription:
        "Turning digital performance data into practical insight, clearer measurement and better growth decisions.",

      eyebrow:
        "Data & Analytics",

      title: {
        first:
          "Data becomes valuable when it creates",
        highlighted:
          "clearer decisions.",
      },

      introduction:
        "Analytics should connect activity, audience behaviour and business priorities so that performance information can support learning instead of creating more reporting noise.",

      imageAlt:
        "Editorial representation of digital analytics, performance measurement and strategic interpretation",

      overview: {
        label:
          "Strategic overview",

        title:
          "Measurement is useful only when it changes what we understand or decide.",

        description:
          "Dashboards and metrics can describe activity, but strategic analysis goes further. It asks whether the right questions are being measured, whether the data is reliable and how performance signals should influence priorities, experiments and resource decisions.",
      },

      capabilities: {
        label:
          "Core capabilities",

        title:
          "From measurement foundations to interpretation",

        items: [
          {
            title:
              "Measurement frameworks",

            description:
              "Defining useful indicators according to business questions, audience journeys and strategic priorities.",
          },
          {
            title:
              "Performance analysis",

            description:
              "Reviewing patterns across acquisition, engagement, content and customer behaviour.",
          },
          {
            title:
              "Dashboard structure",

            description:
              "Organising information so that important signals can be understood without unnecessary complexity.",
          },
          {
            title:
              "Strategic interpretation",

            description:
              "Translating data patterns into practical questions, decisions and areas for further investigation.",
          },
        ],
      },

      approach: {
        label:
          "Working approach",

        title:
          "A clearer path from information to learning",

        introduction:
          "The process begins with decisions and questions, not with collecting every available metric.",

        steps: [
          {
            number: "01",
            title:
              "Define the question",

            description:
              "Clarify which business or customer decision the measurement system needs to support.",
          },
          {
            number: "02",
            title:
              "Review the evidence",

            description:
              "Assess available data, tracking quality, definitions and important limitations.",
          },
          {
            number: "03",
            title:
              "Find meaningful patterns",

            description:
              "Examine relationships, changes and anomalies instead of relying on isolated numbers.",
          },
          {
            number: "04",
            title:
              "Translate into action",

            description:
              "Use interpretation to refine priorities, improve journeys and identify the next useful test or question.",
          },
        ],
      },

      questions: {
        label:
          "Questions this area addresses",

        title:
          "The questions that make measurement useful",

        items: [
          "Which metrics genuinely reflect progress toward the intended objective?",
          "Where is data quality limiting confidence in current decisions?",
          "What patterns can be seen across acquisition, behaviour and outcomes?",
          "What should be tested, investigated or changed based on the evidence?",
        ],
      },

      principle: {
        label:
          "Analytics principle",

        statement:
          "The purpose of analytics is not to report more numbers; it is to reduce uncertainty around important decisions.",
      },

      relatedLabel:
        "Related expertise",

      relatedSlugs: [
        "seo-organic-growth",
        "ai-automation",
      ],

      cta: {
        primary: {
          label:
            "View selected projects",
          href:
            "/case-studies",
        },

        secondary: {
          label:
            "Explore the growth system",
          href:
            "/growth-system",
        },
      },
    },

    "ai-automation": {
      slug: "ai-automation",

      metaTitle:
        "AI & Marketing Automation",

      metaDescription:
        "Practical AI and automation systems designed to reduce repetitive work and support more consistent digital decisions.",

      eyebrow:
        "AI & Automation",

      title: {
        first:
          "Practical systems for",
        highlighted:
          "more focused human decisions.",
      },

      introduction:
        "Artificial intelligence and automation create the most value when they support a clearly defined process, preserve human judgement and reduce repetitive operational work.",

      imageAlt:
        "Editorial representation of artificial intelligence workflows and practical marketing automation",

      overview: {
        label:
          "Strategic overview",

        title:
          "Technology should strengthen the system, not replace strategic thinking.",

        description:
          "The purpose of AI is not to add more tools or automate every task. It is to identify repeatable processes where structured inputs, appropriate safeguards and human review can improve speed, consistency and access to useful information.",
      },

      capabilities: {
        label:
          "Core capabilities",

        title:
          "Practical applications of AI and automation",

        items: [
          {
            title:
              "Workflow design",

            description:
              "Mapping repeatable processes and deciding which stages can be supported responsibly by automation.",
          },
          {
            title:
              "Research assistance",

            description:
              "Using structured AI workflows to organise information, compare sources and support initial analysis.",
          },
          {
            title:
              "Content operations",

            description:
              "Improving consistency across briefs, reviews, classification and repetitive content-management tasks.",
          },
          {
            title:
              "Decision support",

            description:
              "Creating systems that surface relevant signals while keeping interpretation and final decisions under human control.",
          },
        ],
      },

      approach: {
        label:
          "Working approach",

        title:
          "From repetitive work to a controlled system",

        introduction:
          "Automation should be introduced only after the process, responsibility and required quality standards are understood.",

        steps: [
          {
            number: "01",
            title:
              "Map the process",

            description:
              "Document the current workflow, inputs, decisions, outputs and points where human judgement is essential.",
          },
          {
            number: "02",
            title:
              "Select the right task",

            description:
              "Prioritise repetitive, structured and reviewable activities rather than automating uncertain strategic decisions.",
          },
          {
            number: "03",
            title:
              "Build safeguards",

            description:
              "Define validation, review, privacy and error-handling requirements before regular use.",
          },
          {
            number: "04",
            title:
              "Evaluate value",

            description:
              "Assess whether the workflow genuinely improves consistency, time use and decision quality.",
          },
        ],
      },

      questions: {
        label:
          "Questions this area addresses",

        title:
          "The decisions behind responsible automation",

        items: [
          "Which repetitive processes consume time without requiring continuous strategic judgement?",
          "Where should human review remain mandatory?",
          "What information, privacy or quality risks need to be controlled?",
          "Does the system improve the process or simply add another layer of technology?",
        ],
      },

      principle: {
        label:
          "Automation principle",

        statement:
          "AI should reduce repetitive effort while keeping responsibility, context and important decisions human-led.",
      },

      relatedLabel:
        "Related expertise",

      relatedSlugs: [
        "data-analytics",
        "digital-growth-strategy",
      ],

      cta: {
        primary: {
          label:
            "Explore research",
          href:
            "/research",
        },

        secondary: {
          label:
            "Explore the growth system",
          href:
            "/growth-system",
        },
      },
    },
  },

  de: {
    "seo-organic-growth": {
      slug: "seo-organic-growth",

      metaTitle:
        "SEO & organisches Wachstum",

      metaDescription:
        "Ein strategischer Ansatz für technisches SEO, Suchintention, Content-Architektur und nachhaltiges organisches Wachstum.",

      eyebrow:
        "SEO & organisches Wachstum",

      title: {
        first:
          "Organische Sichtbarkeit durch",
        highlighted:
          "Suchklarheit und Struktur.",
      },

      introduction:
        "SEO wird wertvoller, wenn technische Grundlagen, Suchnachfrage, Content-Struktur und Unternehmensprioritäten als ein verbundenes Wachstumssystem funktionieren.",

      imageAlt:
        "Editoriale Darstellung von SEO-Recherche, Suchintention und Planung für organisches Wachstum",

      overview: {
        label:
          "Strategischer Überblick",

        title:
          "Suchwachstum beginnt mit dem Verständnis dessen, was gefunden werden sollte.",

        description:
          "Die Arbeit beginnt mit der Analyse, wie Menschen suchen, welche Informationen sie benötigen und wo die aktuelle Website technische, strukturelle oder inhaltliche Barrieren erzeugt. Das Ziel ist nicht nur eine bessere Positionierung, sondern eine klarere Verbindung zwischen realer Suchnachfrage und nützlichen Unternehmensinhalten.",
      },

      capabilities: {
        label:
          "Kernkompetenzen",

        title:
          "Verbundene Bereiche der SEO-Arbeit",

        items: [
          {
            title:
              "Technisches SEO",

            description:
              "Analyse von Crawlbarkeit, Indexierung, Website-Architektur, interner Verlinkung und technischen Sichtbarkeitshürden.",
          },
          {
            title:
              "Analyse der Suchintention",

            description:
              "Verstehen der Fragen, Erwartungen und Entscheidungsphasen hinter relevanten Suchanfragen.",
          },
          {
            title:
              "Content-Architektur",

            description:
              "Strukturierung von Seiten und Themen für bessere Verständlichkeit, Auffindbarkeit und langfristige Autorität.",
          },
          {
            title:
              "Organische Messung",

            description:
              "Verbindung von Suchperformance, Landingpage-Verhalten und Unternehmensprioritäten durch praktische Messkonzepte.",
          },
        ],
      },

      approach: {
        label:
          "Arbeitsansatz",

        title:
          "Von der Suchdiagnose zur kontinuierlichen Verbesserung",

        introduction:
          "Die genauen Prioritäten ändern sich je nach Website, Zielgruppe und verfügbarer Evidenz. Die strategische Reihenfolge bleibt jedoch konsistent.",

        steps: [
          {
            number: "01",
            title:
              "Analysieren",

            description:
              "Technische Grundlagen, Suchsichtbarkeit, Content-Struktur und vorhandene Performance-Signale untersuchen.",
          },
          {
            number: "02",
            title:
              "Nachfrage abbilden",

            description:
              "Relevante Themen, Suchintentionen, Zielgruppenfragen und Content-Lücken identifizieren.",
          },
          {
            number: "03",
            title:
              "Priorisieren",

            description:
              "Verbesserungen nach strategischem Wert, Umsetzbarkeit und Unternehmenszielen auswählen.",
          },
          {
            number: "04",
            title:
              "Messen und lernen",

            description:
              "Sichtbarkeit, Interaktion und Suchverhalten nutzen, um das System kontinuierlich zu verbessern.",
          },
        ],
      },

      questions: {
        label:
          "Zentrale Fragen",

        title:
          "Die Entscheidungen hinter nachhaltigem Suchwachstum",

        items: [
          "Welche technischen Probleme verhindern die Auffindbarkeit oder Indexierung wichtiger Seiten?",
          "Was erwartet die Zielgruppe tatsächlich bei relevanten Suchanfragen?",
          "Welche Content-Lücken besitzen den höchsten strategischen Wert?",
          "Wie sollte organische Performance über einzelne Keyword-Positionen hinaus gemessen werden?",
        ],
      },

      principle: {
        label:
          "SEO-Prinzip",

        statement:
          "Nachhaltiges organisches Wachstum entsteht, wenn nützliche Informationen leichter gefunden, verstanden und vertraut werden können.",
      },

      relatedLabel:
        "Verwandte Expertise",

      relatedSlugs: [
        "digital-growth-strategy",
        "data-analytics",
      ],

      cta: {
        primary: {
          label:
            "Ausgewählte Projekte ansehen",
          href:
            "/case-studies",
        },

        secondary: {
          label:
            "Forschung entdecken",
          href:
            "/research",
        },
      },
    },

    "digital-growth-strategy": {
      slug: "digital-growth-strategy",

      metaTitle:
        "Digitale Wachstumsstrategie",

      metaDescription:
        "Ein strukturierter Ansatz für digitale Prioritäten, vernetzte Kanäle, Zielgruppenbedürfnisse und messbares langfristiges Wachstum.",

      eyebrow:
        "Digitale Wachstumsstrategie",

      title: {
        first:
          "Klarere Prioritäten für",
        highlighted:
          "verbundenes digitales Wachstum.",
      },

      introduction:
        "Digitales Wachstum wird fokussierter, wenn Unternehmensziele, Zielgruppenbedürfnisse, Kanalentscheidungen und Messung einer gemeinsamen strategischen Richtung folgen.",

      imageAlt:
        "Editoriale Darstellung von digitaler Strategie, Wachstumsprioritäten und vernetzten Marketingsystemen",

      overview: {
        label:
          "Strategischer Überblick",

        title:
          "Strategie gibt jedem Kanal, jeder Aktivität und jeder Messung einen Grund.",

        description:
          "Anstatt SEO, Content, Analytics, Customer Experience und Automatisierung als getrennte Aktivitäten zu behandeln, verbindet eine Wachstumsstrategie diese Bereiche mit einem klar definierten Geschäftsproblem. Sie zeigt, was jetzt wichtig ist, was warten kann und wie jede Entscheidung zu einer messbaren Richtung beitragen soll.",
      },

      capabilities: {
        label:
          "Kernkompetenzen",

        title:
          "Bausteine einer verbundenen Strategie",

        items: [
          {
            title:
              "Wachstumsdiagnose",

            description:
              "Analyse von Geschäftskontext, aktueller Performance, Zielgruppenbedürfnissen und Barrieren vor der Auswahl von Taktiken.",
          },
          {
            title:
              "Strategische Prioritäten",

            description:
              "Identifikation der Chancen, die aufgrund von Wert, Evidenz, Ressourcen und Timing Aufmerksamkeit verdienen.",
          },
          {
            title:
              "Kanalausrichtung",

            description:
              "Definition, wie Suche, Content, Kampagnen, Customer Experience und Technologie einander unterstützen.",
          },
          {
            title:
              "Messrichtung",

            description:
              "Entwicklung klarer Indikatoren, die Aktivitäten mit Lernen, Kundenverhalten und Geschäftsergebnissen verbinden.",
          },
        ],
      },

      approach: {
        label:
          "Arbeitsansatz",

        title:
          "Von Komplexität zu einer praktischen Wachstums-Roadmap",

        introduction:
          "Der Prozess reduziert unverbundene Aktivitäten und schafft eine verständliche, umsetzbare und verbesserbare Reihenfolge von Entscheidungen.",

        steps: [
          {
            number: "01",
            title:
              "Problem definieren",

            description:
              "Geschäftliche Herausforderung, Zielgruppe und gewünschtes Ergebnis klar bestimmen.",
          },
          {
            number: "02",
            title:
              "System bewerten",

            description:
              "Bestehende Kanäle, Journeys, Inhalte, Daten und operative Grenzen als verbundenes Umfeld untersuchen.",
          },
          {
            number: "03",
            title:
              "Prioritäten setzen",

            description:
              "Evidenz in eine fokussierte Roadmap mit klaren Entscheidungen und realistischer Reihenfolge übersetzen.",
          },
          {
            number: "04",
            title:
              "Lernschleife schaffen",

            description:
              "Messung und Kundenevidenz nutzen, um Prioritäten weiterzuentwickeln.",
          },
        ],
      },

      questions: {
        label:
          "Zentrale Fragen",

        title:
          "Die Entscheidungen hinter strategischem Fokus",

        items: [
          "Welches tatsächliche Wachstumsproblem steckt hinter der gewünschten Marketingaktivität?",
          "Welche Zielgruppen, Kanäle und Chancen sollten priorisiert werden?",
          "Wo werden Ressourcen auf unverbundene Aktivitäten verteilt?",
          "Wie sollten Fortschritt und strategische Entscheidungen bewertet und verbessert werden?",
        ],
      },

      principle: {
        label:
          "Strategieprinzip",

        statement:
          "Eine starke Wachstumsstrategie schafft nicht mehr Aktivität, sondern klarere Entscheidungen darüber, was geschehen soll und warum.",
      },

      relatedLabel:
        "Verwandte Expertise",

      relatedSlugs: [
        "consumer-psychology",
        "data-analytics",
      ],

      cta: {
        primary: {
          label:
            "Wachstumssystem entdecken",
          href:
            "/growth-system",
        },

        secondary: {
          label:
            "Ausgewählte Projekte ansehen",
          href:
            "/case-studies",
        },
      },
    },

    "consumer-psychology": {
      slug: "consumer-psychology",

      metaTitle:
        "Konsumentenpsychologie & Kundenverhalten",

      metaDescription:
        "Verhaltenswissen zu Vertrauen, Entscheidungsfindung, Customer Journeys und digitalen Erfahrungen.",

      eyebrow:
        "Konsumentenpsychologie",

      title: {
        first:
          "Bessere digitale Entscheidungen beginnen mit",
        highlighted:
          "dem Verständnis menschlichen Verhaltens.",
      },

      introduction:
        "Konsumentenpsychologie erklärt, wie Menschen Informationen wahrnehmen, Optionen bewerten, Unsicherheit erleben, Vertrauen aufbauen und Entscheidungen treffen oder vermeiden.",

      imageAlt:
        "Editoriale Darstellung von Konsumentenpsychologie, Kundenverhalten und digitaler Entscheidungsfindung",

      overview: {
        label:
          "Strategischer Überblick",

        title:
          "Wachstum wird davon geprägt, was Menschen verstehen, empfinden und vertrauen.",

        description:
          "Digitale Performance wird nicht nur von Kanälen oder Technologie bestimmt. Auch kognitiver Aufwand, wahrgenommenes Risiko, Erwartungen, frühere Erfahrungen und die Klarheit der Customer Journey beeinflussen Entscheidungen. Verhaltenswissen zeigt, wo Kommunikation Vertrauen schafft und wo sie Unsicherheit erzeugt.",
      },

      capabilities: {
        label:
          "Kernkompetenzen",

        title:
          "Verhaltenswissen entlang der digitalen Journey",

        items: [
          {
            title:
              "Entscheidungsverhalten",

            description:
              "Analyse, wie Menschen Alternativen vergleichen, Informationen interpretieren und unter Unsicherheit entscheiden.",
          },
          {
            title:
              "Vertrauen und Glaubwürdigkeit",

            description:
              "Identifikation der Signale, die wahrgenommenes Risiko reduzieren und Vertrauen fördern.",
          },
          {
            title:
              "Journey-Reibung",

            description:
              "Erkennen von Verwirrung, unnötigem Aufwand oder Unsicherheit, die Interaktion und Conversion unterbrechen können.",
          },
          {
            title:
              "Zielgruppenverständnis",

            description:
              "Verbindung von Verhaltensmustern, Bedürfnissen und Motivation mit klareren Kommunikations- und Experience-Entscheidungen.",
          },
        ],
      },

      approach: {
        label:
          "Arbeitsansatz",

        title:
          "Von der Verhaltensbeobachtung zur praktischen Verbesserung",

        introduction:
          "Verhaltensanalyse dient der strategischen Klarheit und nicht der Manipulation oder künstlichen Druckerzeugung.",

        steps: [
          {
            number: "01",
            title:
              "Beobachten",

            description:
              "Customer Journeys, Sprache, Interaktionsmuster und verfügbare Verhaltensevidenz untersuchen.",
          },
          {
            number: "02",
            title:
              "Reibung erkennen",

            description:
              "Punkte identifizieren, an denen Nutzer Verwirrung, Aufwand, Risiko oder mangelndes Vertrauen erleben.",
          },
          {
            number: "03",
            title:
              "Verhalten interpretieren",

            description:
              "Beobachtete Muster mit möglichen psychologischen und kontextbezogenen Erklärungen verbinden.",
          },
          {
            number: "04",
            title:
              "Verantwortungsvoll verbessern",

            description:
              "Erkenntnisse in klarere Informationen, reibungsärmere Journeys und vertrauenswürdigere Erfahrungen übersetzen.",
          },
        ],
      },

      questions: {
        label:
          "Zentrale Fragen",

        title:
          "Die Verhaltensfragen hinter digitaler Performance",

        items: [
          "Was stärkt oder schwächt das Vertrauen der Zielgruppe?",
          "Wo erzeugt die Customer Journey unnötigen kognitiven Aufwand?",
          "Welche wahrgenommenen Risiken verzögern oder verhindern eine Entscheidung?",
          "Wie kann Kommunikation klarer werden, ohne Druck oder Manipulation einzusetzen?",
        ],
      },

      principle: {
        label:
          "Verhaltensprinzip",

        statement:
          "Ethisches Verhaltenswissen sollte Entscheidungen verständlicher und Erfahrungen vertrauenswürdiger machen, nicht Unsicherheit ausnutzen.",
      },

      relatedLabel:
        "Verwandte Expertise",

      relatedSlugs: [
        "digital-growth-strategy",
        "data-analytics",
      ],

      cta: {
        primary: {
          label:
            "Forschung entdecken",
          href:
            "/research",
        },

        secondary: {
          label:
            "Ausgewählte Projekte ansehen",
          href:
            "/case-studies",
        },
      },
    },

    "data-analytics": {
      slug: "data-analytics",

      metaTitle:
        "Daten & digitale Analytics",

      metaDescription:
        "Digitale Performance-Daten in praktische Erkenntnisse, klarere Messung und bessere Wachstumsentscheidungen übersetzen.",

      eyebrow:
        "Daten & Analytics",

      title: {
        first:
          "Daten werden wertvoll, wenn sie",
        highlighted:
          "klarere Entscheidungen ermöglichen.",
      },

      introduction:
        "Analytics sollte Aktivitäten, Zielgruppenverhalten und Unternehmensprioritäten verbinden, damit Performance-Informationen Lernen unterstützen, statt mehr Reporting-Lärm zu erzeugen.",

      imageAlt:
        "Editoriale Darstellung von digitaler Analytics, Performance-Messung und strategischer Interpretation",

      overview: {
        label:
          "Strategischer Überblick",

        title:
          "Messung ist nur dann nützlich, wenn sie Verständnis oder Entscheidungen verändert.",

        description:
          "Dashboards und Kennzahlen können Aktivitäten beschreiben. Strategische Analyse geht weiter und fragt, ob die richtigen Fragen gemessen werden, ob die Daten verlässlich sind und wie Performance-Signale Prioritäten, Experimente und Ressourcenentscheidungen beeinflussen sollten.",
      },

      capabilities: {
        label:
          "Kernkompetenzen",

        title:
          "Von Messgrundlagen zur Interpretation",

        items: [
          {
            title:
              "Messkonzepte",

            description:
              "Definition sinnvoller Indikatoren anhand von Geschäftsfragen, Customer Journeys und strategischen Prioritäten.",
          },
          {
            title:
              "Performance-Analyse",

            description:
              "Analyse von Mustern in Akquisition, Interaktion, Content und Kundenverhalten.",
          },
          {
            title:
              "Dashboard-Struktur",

            description:
              "Organisation von Informationen, damit wichtige Signale ohne unnötige Komplexität verständlich werden.",
          },
          {
            title:
              "Strategische Interpretation",

            description:
              "Übersetzung von Datenmustern in praktische Fragen, Entscheidungen und weitere Untersuchungsbereiche.",
          },
        ],
      },

      approach: {
        label:
          "Arbeitsansatz",

        title:
          "Ein klarerer Weg von Information zu Lernen",

        introduction:
          "Der Prozess beginnt mit Entscheidungen und Fragen, nicht mit dem Sammeln jeder verfügbaren Kennzahl.",

        steps: [
          {
            number: "01",
            title:
              "Frage definieren",

            description:
              "Klären, welche geschäftliche oder kundenbezogene Entscheidung das Messsystem unterstützen soll.",
          },
          {
            number: "02",
            title:
              "Evidenz prüfen",

            description:
              "Verfügbare Daten, Tracking-Qualität, Definitionen und wichtige Einschränkungen bewerten.",
          },
          {
            number: "03",
            title:
              "Muster erkennen",

            description:
              "Zusammenhänge, Veränderungen und Anomalien statt isolierter Zahlen untersuchen.",
          },
          {
            number: "04",
            title:
              "In Handlung übersetzen",

            description:
              "Interpretation nutzen, um Prioritäten zu verbessern und den nächsten sinnvollen Test zu bestimmen.",
          },
        ],
      },

      questions: {
        label:
          "Zentrale Fragen",

        title:
          "Die Fragen, die Messung nützlich machen",

        items: [
          "Welche Kennzahlen spiegeln den Fortschritt zum gewünschten Ziel tatsächlich wider?",
          "Wo begrenzt die Datenqualität das Vertrauen in aktuelle Entscheidungen?",
          "Welche Muster zeigen sich zwischen Akquisition, Verhalten und Ergebnissen?",
          "Was sollte aufgrund der Evidenz getestet, untersucht oder verändert werden?",
        ],
      },

      principle: {
        label:
          "Analytics-Prinzip",

        statement:
          "Der Zweck von Analytics ist nicht, mehr Zahlen zu berichten, sondern Unsicherheit bei wichtigen Entscheidungen zu reduzieren.",
      },

      relatedLabel:
        "Verwandte Expertise",

      relatedSlugs: [
        "seo-organic-growth",
        "ai-automation",
      ],

      cta: {
        primary: {
          label:
            "Ausgewählte Projekte ansehen",
          href:
            "/case-studies",
        },

        secondary: {
          label:
            "Wachstumssystem entdecken",
          href:
            "/growth-system",
        },
      },
    },

    "ai-automation": {
      slug: "ai-automation",

      metaTitle:
        "KI & Marketing-Automatisierung",

      metaDescription:
        "Praxisnahe KI- und Automatisierungssysteme zur Reduzierung wiederkehrender Arbeit und Unterstützung konsistenter Entscheidungen.",

      eyebrow:
        "KI & Automatisierung",

      title: {
        first:
          "Praxisnahe Systeme für",
        highlighted:
          "fokussiertere menschliche Entscheidungen.",
      },

      introduction:
        "Künstliche Intelligenz und Automatisierung schaffen den größten Wert, wenn sie einen klar definierten Prozess unterstützen, menschliches Urteilsvermögen erhalten und wiederkehrende operative Arbeit reduzieren.",

      imageAlt:
        "Editoriale Darstellung von KI-Workflows und praxisnaher Marketing-Automatisierung",

      overview: {
        label:
          "Strategischer Überblick",

        title:
          "Technologie sollte das System stärken und strategisches Denken nicht ersetzen.",

        description:
          "Der Zweck von KI besteht nicht darin, mehr Tools einzuführen oder jede Aufgabe zu automatisieren. Entscheidend ist, wiederholbare Prozesse zu identifizieren, in denen strukturierte Inputs, angemessene Schutzmaßnahmen und menschliche Prüfung Geschwindigkeit und Konsistenz verbessern können.",
      },

      capabilities: {
        label:
          "Kernkompetenzen",

        title:
          "Praktische Anwendungen von KI und Automatisierung",

        items: [
          {
            title:
              "Workflow-Design",

            description:
              "Abbildung wiederholbarer Prozesse und Entscheidung, welche Schritte verantwortungsvoll automatisiert werden können.",
          },
          {
            title:
              "Forschungsunterstützung",

            description:
              "Strukturierte KI-Workflows zur Organisation von Informationen, zum Quellenvergleich und zur ersten Analyse.",
          },
          {
            title:
              "Content Operations",

            description:
              "Verbesserung der Konsistenz bei Briefings, Prüfungen, Klassifizierung und wiederkehrenden Content-Aufgaben.",
          },
          {
            title:
              "Entscheidungsunterstützung",

            description:
              "Systeme zur Hervorhebung relevanter Signale bei menschlicher Kontrolle über Interpretation und finale Entscheidungen.",
          },
        ],
      },

      approach: {
        label:
          "Arbeitsansatz",

        title:
          "Von wiederkehrender Arbeit zu einem kontrollierten System",

        introduction:
          "Automatisierung sollte erst eingeführt werden, wenn Prozess, Verantwortung und erforderliche Qualitätsstandards verstanden sind.",

        steps: [
          {
            number: "01",
            title:
              "Prozess abbilden",

            description:
              "Workflow, Inputs, Entscheidungen, Outputs und unverzichtbare menschliche Beurteilungen dokumentieren.",
          },
          {
            number: "02",
            title:
              "Geeignete Aufgabe wählen",

            description:
              "Wiederkehrende, strukturierte und überprüfbare Tätigkeiten priorisieren.",
          },
          {
            number: "03",
            title:
              "Schutzmaßnahmen entwickeln",

            description:
              "Validierung, Prüfung, Datenschutz und Fehlerbehandlung vor der regelmäßigen Nutzung definieren.",
          },
          {
            number: "04",
            title:
              "Wert bewerten",

            description:
              "Prüfen, ob der Workflow Konsistenz, Zeitnutzung und Entscheidungsqualität tatsächlich verbessert.",
          },
        ],
      },

      questions: {
        label:
          "Zentrale Fragen",

        title:
          "Die Entscheidungen hinter verantwortungsvoller Automatisierung",

        items: [
          "Welche wiederkehrenden Prozesse verbrauchen Zeit, ohne kontinuierliches strategisches Urteil zu benötigen?",
          "Wo sollte menschliche Prüfung verpflichtend bleiben?",
          "Welche Informations-, Datenschutz- oder Qualitätsrisiken müssen kontrolliert werden?",
          "Verbessert das System den Prozess oder fügt es nur eine weitere Technologieschicht hinzu?",
        ],
      },

      principle: {
        label:
          "Automatisierungsprinzip",

        statement:
          "KI sollte wiederkehrenden Aufwand reduzieren, während Verantwortung, Kontext und wichtige Entscheidungen menschlich geführt bleiben.",
      },

      relatedLabel:
        "Verwandte Expertise",

      relatedSlugs: [
        "data-analytics",
        "digital-growth-strategy",
      ],

      cta: {
        primary: {
          label:
            "Forschung entdecken",
          href:
            "/research",
        },

        secondary: {
          label:
            "Wachstumssystem entdecken",
          href:
            "/growth-system",
        },
      },
    },
  },

  fa: {
    "seo-organic-growth": {
      slug: "seo-organic-growth",

      metaTitle:
        "سئو و استراتژی رشد ارگانیک",

      metaDescription:
        "رویکردی استراتژیک به سئوی فنی، هدف جست‌وجو، معماری محتوا و رشد ارگانیک پایدار.",

      eyebrow:
        "سئو و رشد ارگانیک",

      title: {
        first:
          "ساخت دیده‌شدن پایدار با",
        highlighted:
          "شفافیت و ساختار جست‌وجو",
      },

      introduction:
        "سئو زمانی ارزش بیشتری ایجاد می‌کند که زیرساخت فنی، تقاضای جست‌وجو، ساختار محتوا و اولویت‌های کسب‌وکار به‌عنوان یک سیستم رشد یکپارچه عمل کنند.",

      imageAlt:
        "نمایی مفهومی از پژوهش سئو، تحلیل هدف جست‌وجو و برنامه‌ریزی رشد ارگانیک",

      overview: {
        label:
          "نگاه استراتژیک",

        title:
          "رشد در جست‌وجو با درک درست آنچه باید دیده شود آغاز می‌شود.",

        description:
          "کار با بررسی نحوه جست‌وجوی مخاطبان، اطلاعات موردنیاز آن‌ها و موانع فنی، ساختاری یا محتوایی سایت آغاز می‌شود. هدف فقط افزایش رتبه نیست؛ بلکه ایجاد مسیری روشن میان تقاضای واقعی جست‌وجو و محتوای مفید کسب‌وکار است.",
      },

      capabilities: {
        label:
          "قابلیت‌های اصلی",

        title:
          "حوزه‌های به‌هم‌پیوسته در سئو",

        items: [
          {
            title:
              "سئوی فنی",

            description:
              "بررسی خزش، ایندکس، معماری سایت، لینک‌سازی داخلی و موانع فنی مؤثر بر دیده‌شدن ارگانیک.",
          },
          {
            title:
              "تحلیل هدف جست‌وجو",

            description:
              "شناخت پرسش‌ها، انتظارات و مراحل تصمیم‌گیری پشت جست‌وجوهای مرتبط.",
          },
          {
            title:
              "معماری محتوا",

            description:
              "سازمان‌دهی صفحات و موضوعات برای افزایش درک، کشف‌پذیری و اعتبار بلندمدت.",
          },
          {
            title:
              "اندازه‌گیری رشد ارگانیک",

            description:
              "پیوند عملکرد جست‌وجو، رفتار صفحات ورودی و اولویت‌های کسب‌وکار در یک چارچوب سنجش کاربردی.",
          },
        ],
      },

      approach: {
        label:
          "رویکرد کاری",

        title:
          "از شناخت وضعیت جست‌وجو تا بهبود مستمر",

        introduction:
          "اولویت‌های دقیق براساس سایت، مخاطب و شواهد موجود تغییر می‌کنند؛ اما ترتیب استراتژیک فرایند ثابت می‌ماند.",

        steps: [
          {
            number: "۰۱",
            title:
              "بررسی وضعیت",

            description:
              "ارزیابی زیرساخت فنی، دیده‌شدن در جست‌وجو، ساختار محتوا و سیگنال‌های عملکرد.",
          },
          {
            number: "۰۲",
            title:
              "ترسیم تقاضا",

            description:
              "شناسایی موضوعات، هدف جست‌وجو، پرسش‌های مخاطبان و فاصله میان محتوای موجود و نیاز واقعی.",
          },
          {
            number: "۰۳",
            title:
              "اولویت‌بندی",

            description:
              "انتخاب اقدامات براساس ارزش استراتژیک، امکان اجرا و ارتباط با اهداف کسب‌وکار.",
          },
          {
            number: "۰۴",
            title:
              "اندازه‌گیری و یادگیری",

            description:
              "تحلیل دیده‌شدن، تعامل و رفتار جست‌وجو برای اصلاح مستمر سیستم.",
          },
        ],
      },

      questions: {
        label:
          "پرسش‌های کلیدی",

        title:
          "تصمیم‌های پشت رشد پایدار در جست‌وجو",

        items: [
          "کدام مشکلات فنی مانع کشف یا ایندکس‌شدن صفحات مهم هستند؟",
          "مخاطب هنگام جست‌وجوی موضوعات مرتبط واقعاً چه انتظاری دارد؟",
          "کدام خلأهای محتوایی بیشترین ارزش استراتژیک را دارند؟",
          "عملکرد ارگانیک فراتر از رتبه چند کلمه کلیدی چگونه باید سنجیده شود؟",
        ],
      },

      principle: {
        label:
          "اصل سئو",

        statement:
          "رشد ارگانیک پایدار با آسان‌ترکردن کشف، درک و اعتماد به اطلاعات مفید ساخته می‌شود.",
      },

      relatedLabel:
        "تخصص‌های مرتبط",

      relatedSlugs: [
        "digital-growth-strategy",
        "data-analytics",
      ],

      cta: {
        primary: {
          label:
            "مشاهده پروژه‌های منتخب",
          href:
            "/case-studies",
        },

        secondary: {
          label:
            "مطالعه پژوهش‌ها",
          href:
            "/research",
        },
      },
    },

    "digital-growth-strategy": {
      slug: "digital-growth-strategy",

      metaTitle:
        "استراتژی رشد دیجیتال",

      metaDescription:
        "رویکردی ساختاریافته برای تعیین اولویت‌های دیجیتال، هماهنگی کانال‌ها و ساخت رشد بلندمدت قابل‌اندازه‌گیری.",

      eyebrow:
        "استراتژی رشد دیجیتال",

      title: {
        first:
          "اولویت‌های روشن‌تر برای",
        highlighted:
          "رشد دیجیتال یکپارچه",
      },

      introduction:
        "رشد دیجیتال زمانی هدفمندتر می‌شود که اهداف کسب‌وکار، نیازهای مخاطب، تصمیم‌های کانالی و اندازه‌گیری در یک مسیر استراتژیک مشترک قرار بگیرند.",

      imageAlt:
        "نمایی مفهومی از استراتژی دیجیتال، اولویت‌های رشد و سیستم‌های یکپارچه بازاریابی",

      overview: {
        label:
          "نگاه استراتژیک",

        title:
          "استراتژی برای هر کانال، اقدام و معیار، دلیل مشخصی ایجاد می‌کند.",

        description:
          "به‌جای اینکه سئو، محتوا، تحلیل داده، تجربه مشتری و اتوماسیون به‌صورت فعالیت‌هایی جداگانه اجرا شوند، استراتژی رشد آن‌ها را حول یک مسئله واقعی کسب‌وکار به هم متصل می‌کند. این مسیر مشخص می‌کند اکنون چه چیزی مهم است، چه چیزی می‌تواند منتظر بماند و هر تصمیم چگونه باید به یک جهت قابل‌اندازه‌گیری کمک کند.",
      },

      capabilities: {
        label:
          "قابلیت‌های اصلی",

        title:
          "اجزای یک استراتژی رشد یکپارچه",

        items: [
          {
            title:
              "شناخت مسئله رشد",

            description:
              "بررسی شرایط کسب‌وکار، عملکرد فعلی، نیاز مخاطب و موانع پیش از انتخاب تاکتیک‌ها.",
          },
          {
            title:
              "اولویت‌های استراتژیک",

            description:
              "شناسایی فرصت‌هایی که براساس ارزش، شواهد، منابع و زمان‌بندی باید در اولویت قرار بگیرند.",
          },
          {
            title:
              "هماهنگی کانال‌ها",

            description:
              "تعیین نقش جست‌وجو، محتوا، کمپین‌ها، تجربه مشتری و فناوری در حمایت از یکدیگر.",
          },
          {
            title:
              "مسیر اندازه‌گیری",

            description:
              "تعریف شاخص‌هایی که فعالیت‌ها را به یادگیری، رفتار مشتری و اهداف کسب‌وکار متصل می‌کنند.",
          },
        ],
      },

      approach: {
        label:
          "رویکرد کاری",

        title:
          "از پیچیدگی تا نقشه راه عملی رشد",

        introduction:
          "هدف فرایند، کاهش فعالیت‌های پراکنده و ایجاد ترتیبی از تصمیم‌هاست که قابل‌درک، قابل‌اجرا و قابل‌بهبود باشند.",

        steps: [
          {
            number: "۰۱",
            title:
              "تعریف مسئله",

            description:
              "مشخص‌کردن چالش کسب‌وکار، مخاطب هدف و نتیجه‌ای که استراتژی باید از آن پشتیبانی کند.",
          },
          {
            number: "۰۲",
            title:
              "ارزیابی سیستم",

            description:
              "بررسی کانال‌ها، مسیرهای مشتری، محتوا، داده و محدودیت‌های اجرایی به‌عنوان یک محیط یکپارچه.",
          },
          {
            number: "۰۳",
            title:
              "تعیین اولویت‌ها",

            description:
              "تبدیل شواهد به نقشه راهی متمرکز با انتخاب‌های روشن و ترتیب اجرایی واقع‌بینانه.",
          },
          {
            number: "۰۴",
            title:
              "ساخت چرخه یادگیری",

            description:
              "استفاده از داده و شواهد رفتاری برای اصلاح و بهبود اولویت‌ها.",
          },
        ],
      },

      questions: {
        label:
          "پرسش‌های کلیدی",

        title:
          "تصمیم‌هایی که تمرکز استراتژیک ایجاد می‌کنند",

        items: [
          "مسئله واقعی رشد پشت فعالیت بازاریابی درخواستی چیست؟",
          "کدام مخاطبان، کانال‌ها و فرصت‌ها باید در اولویت قرار بگیرند؟",
          "منابع در کدام فعالیت‌های پراکنده توزیع شده‌اند؟",
          "پیشرفت و تصمیم‌های استراتژیک چگونه باید ارزیابی و اصلاح شوند؟",
        ],
      },

      principle: {
        label:
          "اصل استراتژی",

        statement:
          "استراتژی رشد قوی فعالیت بیشتری ایجاد نمی‌کند؛ بلکه انتخاب‌های روشن‌تری درباره آنچه باید انجام شود و دلیل آن می‌سازد.",
      },

      relatedLabel:
        "تخصص‌های مرتبط",

      relatedSlugs: [
        "consumer-psychology",
        "data-analytics",
      ],

      cta: {
        primary: {
          label:
            "مشاهده سیستم رشد",
          href:
            "/growth-system",
        },

        secondary: {
          label:
            "مشاهده پروژه‌های منتخب",
          href:
            "/case-studies",
        },
      },
    },

    "consumer-psychology": {
      slug: "consumer-psychology",

      metaTitle:
        "روان‌شناسی مصرف‌کننده و رفتار مشتری",

      metaDescription:
        "استفاده از بینش رفتاری برای شناخت اعتماد، تصمیم‌گیری، مسیر مشتری و تجربه‌های دیجیتال.",

      eyebrow:
        "روان‌شناسی مصرف‌کننده",

      title: {
        first:
          "تصمیم‌های دیجیتال بهتر با",
        highlighted:
          "شناخت رفتار انسان آغاز می‌شوند",
      },

      introduction:
        "روان‌شناسی مصرف‌کننده کمک می‌کند درک کنیم مردم چگونه اطلاعات را می‌بینند، گزینه‌ها را ارزیابی می‌کنند، با عدم‌قطعیت مواجه می‌شوند، اعتماد می‌سازند و به یک تصمیم نزدیک یا از آن دور می‌شوند.",

      imageAlt:
        "نمایی مفهومی از روان‌شناسی مصرف‌کننده، رفتار مشتری و تصمیم‌گیری دیجیتال",

      overview: {
        label:
          "نگاه استراتژیک",

        title:
          "رشد تحت‌تأثیر چیزهایی است که مردم درک می‌کنند، احساس می‌کنند و به آن اعتماد دارند.",

        description:
          "عملکرد دیجیتال فقط توسط کانال‌ها یا فناوری تعیین نمی‌شود. میزان تلاش ذهنی، ریسک ادراک‌شده، انتظارات، تجربه‌های قبلی و شفافیت مسیر مشتری نیز بر تصمیم‌ها اثر می‌گذارند. بینش رفتاری نشان می‌دهد ارتباطات و تجربه در کجا اعتماد ایجاد می‌کنند و در کجا باعث تردید می‌شوند.",
      },

      capabilities: {
        label:
          "قابلیت‌های اصلی",

        title:
          "بینش رفتاری در مسیر دیجیتال مشتری",

        items: [
          {
            title:
              "رفتار تصمیم‌گیری",

            description:
              "بررسی نحوه مقایسه گزینه‌ها، تفسیر اطلاعات و انتخاب در شرایط عدم‌قطعیت.",
          },
          {
            title:
              "اعتماد و اعتبار",

            description:
              "شناسایی نشانه‌هایی که ریسک ادراک‌شده را کاهش می‌دهند و اعتماد را تقویت می‌کنند.",
          },
          {
            title:
              "اصطکاک مسیر مشتری",

            description:
              "یافتن نقاط سردرگمی، تلاش غیرضروری یا تردید که ممکن است تعامل و تبدیل را متوقف کنند.",
          },
          {
            title:
              "شناخت مخاطب",

            description:
              "پیوند الگوهای رفتاری، نیازها و انگیزه‌ها با تصمیم‌های روشن‌تر در ارتباطات و تجربه مشتری.",
          },
        ],
      },

      approach: {
        label:
          "رویکرد کاری",

        title:
          "از مشاهده رفتار تا بهبود کاربردی",

        introduction:
          "تحلیل رفتار برای افزایش شفافیت استراتژیک استفاده می‌شود، نه برای دست‌کاری مخاطب یا ایجاد فشار مصنوعی.",

        steps: [
          {
            number: "۰۱",
            title:
              "مشاهده",

            description:
              "بررسی مسیرهای مشتری، زبان، الگوهای تعامل و شواهد رفتاری موجود.",
          },
          {
            number: "۰۲",
            title:
              "شناسایی اصطکاک",

            description:
              "یافتن نقاطی که کاربر در آن‌ها با سردرگمی، تلاش، ریسک یا کمبود اعتماد مواجه می‌شود.",
          },
          {
            number: "۰۳",
            title:
              "تفسیر رفتار",

            description:
              "پیوند الگوهای مشاهده‌شده با توضیحات احتمالی روان‌شناختی و زمینه‌ای.",
          },
          {
            number: "۰۴",
            title:
              "بهبود مسئولانه",

            description:
              "تبدیل بینش‌ها به اطلاعات روشن‌تر، مسیرهای ساده‌تر و تجربه‌های قابل‌اعتمادتر.",
          },
        ],
      },

      questions: {
        label:
          "پرسش‌های کلیدی",

        title:
          "پرسش‌های رفتاری پشت عملکرد دیجیتال",

        items: [
          "چه عواملی باعث اعتماد یا تردید مخاطب نسبت به اطلاعات می‌شوند؟",
          "مسیر مشتری در کجا تلاش ذهنی غیرضروری ایجاد می‌کند؟",
          "کدام ریسک‌های ادراک‌شده تصمیم را به تأخیر می‌اندازند یا متوقف می‌کنند؟",
          "ارتباطات چگونه می‌توانند بدون فشار یا دست‌کاری روشن‌تر شوند؟",
        ],
      },

      principle: {
        label:
          "اصل رفتاری",

        statement:
          "بینش رفتاری اخلاقی باید تصمیم‌ها را روشن‌تر و تجربه‌ها را قابل‌اعتمادتر کند، نه اینکه از عدم‌قطعیت سوءاستفاده کند.",
      },

      relatedLabel:
        "تخصص‌های مرتبط",

      relatedSlugs: [
        "digital-growth-strategy",
        "data-analytics",
      ],

      cta: {
        primary: {
          label:
            "مطالعه پژوهش‌ها",
          href:
            "/research",
        },

        secondary: {
          label:
            "مشاهده پروژه‌های منتخب",
          href:
            "/case-studies",
        },
      },
    },

    "data-analytics": {
      slug: "data-analytics",

      metaTitle:
        "داده و تحلیل دیجیتال",

      metaDescription:
        "تبدیل داده‌های عملکرد دیجیتال به بینش کاربردی، اندازه‌گیری روشن‌تر و تصمیم‌های بهتر برای رشد.",

      eyebrow:
        "داده و تحلیل",

      title: {
        first:
          "داده زمانی ارزشمند می‌شود که",
        highlighted:
          "تصمیم‌ها را روشن‌تر کند",
      },

      introduction:
        "تحلیل داده باید فعالیت‌ها، رفتار مخاطب و اولویت‌های کسب‌وکار را به هم متصل کند تا اطلاعات عملکرد به یادگیری کمک کنند، نه اینکه فقط حجم گزارش‌ها را افزایش دهند.",

      imageAlt:
        "نمایی مفهومی از تحلیل دیجیتال، اندازه‌گیری عملکرد و تفسیر استراتژیک داده",

      overview: {
        label:
          "نگاه استراتژیک",

        title:
          "اندازه‌گیری زمانی مفید است که درک یا تصمیم ما را تغییر دهد.",

        description:
          "داشبوردها و شاخص‌ها می‌توانند فعالیت‌ها را توصیف کنند؛ اما تحلیل استراتژیک فراتر می‌رود و می‌پرسد آیا پرسش‌های درستی اندازه‌گیری می‌شوند، داده‌ها تا چه اندازه قابل‌اعتماد هستند و سیگنال‌های عملکرد چگونه باید بر اولویت‌ها، آزمایش‌ها و تخصیص منابع اثر بگذارند.",
      },

      capabilities: {
        label:
          "قابلیت‌های اصلی",

        title:
          "از زیرساخت اندازه‌گیری تا تفسیر داده",

        items: [
          {
            title:
              "چارچوب‌های اندازه‌گیری",

            description:
              "تعریف شاخص‌های کاربردی براساس پرسش‌های کسب‌وکار، مسیر مشتری و اولویت‌های استراتژیک.",
          },
          {
            title:
              "تحلیل عملکرد",

            description:
              "بررسی الگوهای جذب، تعامل، محتوا و رفتار مشتری.",
          },
          {
            title:
              "ساختار داشبورد",

            description:
              "سازمان‌دهی اطلاعات برای درک سیگنال‌های مهم بدون پیچیدگی غیرضروری.",
          },
          {
            title:
              "تفسیر استراتژیک",

            description:
              "تبدیل الگوهای داده به پرسش‌ها، تصمیم‌ها و حوزه‌های بررسی بیشتر.",
          },
        ],
      },

      approach: {
        label:
          "رویکرد کاری",

        title:
          "مسیری روشن‌تر از اطلاعات تا یادگیری",

        introduction:
          "فرایند با تصمیم‌ها و پرسش‌ها آغاز می‌شود، نه با جمع‌آوری تمام معیارهای در دسترس.",

        steps: [
          {
            number: "۰۱",
            title:
              "تعریف پرسش",

            description:
              "مشخص‌کردن تصمیم کسب‌وکار یا مشتری که سیستم اندازه‌گیری باید از آن پشتیبانی کند.",
          },
          {
            number: "۰۲",
            title:
              "بررسی شواهد",

            description:
              "ارزیابی داده‌های موجود، کیفیت ردیابی، تعاریف و محدودیت‌های مهم.",
          },
          {
            number: "۰۳",
            title:
              "یافتن الگوهای معنادار",

            description:
              "بررسی ارتباط‌ها، تغییرات و ناهنجاری‌ها به‌جای اتکا به اعداد جداگانه.",
          },
          {
            number: "۰۴",
            title:
              "تبدیل به اقدام",

            description:
              "استفاده از تفسیر برای اصلاح اولویت‌ها و تعیین آزمایش یا پرسش بعدی.",
          },
        ],
      },

      questions: {
        label:
          "پرسش‌های کلیدی",

        title:
          "پرسش‌هایی که اندازه‌گیری را کاربردی می‌کنند",

        items: [
          "کدام شاخص‌ها واقعاً پیشرفت به‌سوی هدف موردنظر را نشان می‌دهند؟",
          "کیفیت داده در کجا اطمینان به تصمیم‌های فعلی را محدود می‌کند؟",
          "چه الگوهایی میان جذب، رفتار و نتایج دیده می‌شوند؟",
          "براساس شواهد چه چیزی باید آزمایش، بررسی یا تغییر داده شود؟",
        ],
      },

      principle: {
        label:
          "اصل تحلیل داده",

        statement:
          "هدف تحلیل داده گزارش‌کردن اعداد بیشتر نیست؛ بلکه کاهش عدم‌قطعیت درباره تصمیم‌های مهم است.",
      },

      relatedLabel:
        "تخصص‌های مرتبط",

      relatedSlugs: [
        "seo-organic-growth",
        "ai-automation",
      ],

      cta: {
        primary: {
          label:
            "مشاهده پروژه‌های منتخب",
          href:
            "/case-studies",
        },

        secondary: {
          label:
            "مشاهده سیستم رشد",
          href:
            "/growth-system",
        },
      },
    },

    "ai-automation": {
      slug: "ai-automation",

      metaTitle:
        "هوش مصنوعی و اتوماسیون بازاریابی",

      metaDescription:
        "سیستم‌های کاربردی هوش مصنوعی و اتوماسیون برای کاهش کارهای تکراری و پشتیبانی از تصمیم‌های دیجیتال منسجم‌تر.",

      eyebrow:
        "هوش مصنوعی و اتوماسیون",

      title: {
        first:
          "سیستم‌های کاربردی برای",
        highlighted:
          "تصمیم‌های انسانی متمرکزتر",
      },

      introduction:
        "هوش مصنوعی و اتوماسیون زمانی بیشترین ارزش را ایجاد می‌کنند که از یک فرایند مشخص پشتیبانی کنند، قضاوت انسانی را حفظ کنند و کارهای تکراری اجرایی را کاهش دهند.",

      imageAlt:
        "نمایی مفهومی از جریان‌های هوش مصنوعی و اتوماسیون کاربردی بازاریابی",

      overview: {
        label:
          "نگاه استراتژیک",

        title:
          "فناوری باید سیستم را تقویت کند، نه اینکه جای تفکر استراتژیک را بگیرد.",

        description:
          "هدف استفاده از هوش مصنوعی افزودن ابزارهای بیشتر یا خودکارکردن تمام وظایف نیست. ارزش واقعی در شناسایی فرایندهای تکرارشونده‌ای است که ورودی‌های ساختاریافته، کنترل‌های مناسب و بازبینی انسانی می‌توانند سرعت، ثبات و دسترسی به اطلاعات مفید را در آن‌ها بهبود دهند.",
      },

      capabilities: {
        label:
          "قابلیت‌های اصلی",

        title:
          "کاربردهای عملی هوش مصنوعی و اتوماسیون",

        items: [
          {
            title:
              "طراحی جریان کار",

            description:
              "ترسیم فرایندهای تکرارشونده و تعیین مراحلی که می‌توانند به‌شکل مسئولانه با اتوماسیون پشتیبانی شوند.",
          },
          {
            title:
              "پشتیبانی پژوهش",

            description:
              "استفاده از جریان‌های ساختاریافته هوش مصنوعی برای سازمان‌دهی اطلاعات، مقایسه منابع و تحلیل اولیه.",
          },
          {
            title:
              "عملیات محتوا",

            description:
              "افزایش ثبات در بریف‌ها، بازبینی‌ها، دسته‌بندی و وظایف تکراری مدیریت محتوا.",
          },
          {
            title:
              "پشتیبانی تصمیم‌گیری",

            description:
              "ساخت سیستم‌هایی برای نمایش سیگنال‌های مرتبط با حفظ کنترل انسانی بر تفسیر و تصمیم نهایی.",
          },
        ],
      },

      approach: {
        label:
          "رویکرد کاری",

        title:
          "از کار تکراری تا یک سیستم کنترل‌شده",

        introduction:
          "اتوماسیون فقط زمانی باید وارد فرایند شود که مسئولیت‌ها، استاندارد کیفیت و نقاط نیازمند قضاوت انسانی مشخص شده باشند.",

        steps: [
          {
            number: "۰۱",
            title:
              "ترسیم فرایند",

            description:
              "ثبت جریان فعلی، ورودی‌ها، تصمیم‌ها، خروجی‌ها و نقاطی که قضاوت انسانی در آن‌ها ضروری است.",
          },
          {
            number: "۰۲",
            title:
              "انتخاب وظیفه مناسب",

            description:
              "اولویت‌دادن به فعالیت‌های تکراری، ساختاریافته و قابل‌بازبینی به‌جای تصمیم‌های استراتژیک نامطمئن.",
          },
          {
            number: "۰۳",
            title:
              "ساخت کنترل‌ها",

            description:
              "تعریف اعتبارسنجی، بازبینی، حریم خصوصی و مدیریت خطا پیش از استفاده منظم.",
          },
          {
            number: "۰۴",
            title:
              "ارزیابی ارزش",

            description:
              "بررسی اینکه جریان کار واقعاً ثبات، استفاده از زمان و کیفیت تصمیم را بهبود می‌دهد یا خیر.",
          },
        ],
      },

      questions: {
        label:
          "پرسش‌های کلیدی",

        title:
          "تصمیم‌های پشت اتوماسیون مسئولانه",

        items: [
          "کدام فرایندهای تکراری زمان زیادی مصرف می‌کنند اما به قضاوت استراتژیک مستمر نیاز ندارند؟",
          "در کدام مراحل بازبینی انسانی باید الزامی باقی بماند؟",
          "چه ریسک‌های اطلاعاتی، حریم خصوصی یا کیفیتی باید کنترل شوند؟",
          "آیا سیستم فرایند را بهبود می‌دهد یا فقط یک لایه فناوری دیگر اضافه می‌کند؟",
        ],
      },

      principle: {
        label:
          "اصل اتوماسیون",

        statement:
          "هوش مصنوعی باید تلاش تکراری را کاهش دهد، درحالی‌که مسئولیت، زمینه و تصمیم‌های مهم همچنان تحت هدایت انسان باقی می‌مانند.",
      },

      relatedLabel:
        "تخصص‌های مرتبط",

      relatedSlugs: [
        "data-analytics",
        "digital-growth-strategy",
      ],

      cta: {
        primary: {
          label:
            "مطالعه پژوهش‌ها",
          href:
            "/research",
        },

        secondary: {
          label:
            "مشاهده سیستم رشد",
          href:
            "/growth-system",
        },
      },
    },
  },
} satisfies Record<
  Locale,
  Record<
    ExpertiseSlug,
    ExpertisePageContent
  >
>;

export function isExpertiseSlug(
  value: string,
): value is ExpertiseSlug {
  return expertiseSlugs.includes(
    value as ExpertiseSlug,
  );
}

export function getExpertisePage(
  locale: Locale,
  slug: ExpertiseSlug,
): ExpertisePageContent {
  return expertisePages[locale][slug];
}

export function getAllExpertisePages(
  locale: Locale,
): ExpertisePageContent[] {
  return expertiseSlugs.map(
    (slug) =>
      expertisePages[locale][slug],
  );
}
import type { Metadata } from "next";
import { notFound } from "next/navigation";

import Header from "@/components/Header";
import Footer from "@/components/sections/Footer";

import de from "@/i18n/dictionaries/de";
import en from "@/i18n/dictionaries/en";
import fa from "@/i18n/dictionaries/fa";

import {
  isLocale,
  type Locale,
} from "@/i18n/config";

import type { Dictionary } from "@/i18n/get-dictionary";

const siteUrl =
  "https://setarehsalehabadi.com";

const legalEmail =
  "salehabadi.setareh@gmail.com";

type PolicySection = {
  id: string;
  number: string;
  title: string;
  paragraphs: string[];
  items?: string[];
};

type CookieRow = {
  name: string;
  type: string;
  purpose: string;
  duration: string;
};

type PrivacyContent = {
  metaTitle: string;
  metaDescription: string;

  eyebrow: string;
  title: string;
  highlightedTitle: string;
  introduction: string;

  updatedLabel: string;
  updatedDate: string;

  quickFactsLabel: string;

  quickFacts: {
    label: string;
    value: string;
  }[];

  navigationLabel: string;

  sectionsBeforeCookies: PolicySection[];

  cookiesSection: {
    id: string;
    number: string;
    title: string;
    introduction: string;
    headers: {
      name: string;
      type: string;
      purpose: string;
      duration: string;
    };
    rows: CookieRow[];
    note: string;
  };

  sectionsAfterCookies: PolicySection[];

  googleInformationLabel: string;
  googleInformationText: string;
  googlePrivacyLabel: string;

  contactTitle: string;
  contactDescription: string;
  contactRestriction: string;

  legalReviewNote: string;
  termsLabel: string;
};

const dictionaries = {
  en,
  de,
  fa,
} as const;

const privacyContent: Record<
  Locale,
  PrivacyContent
> = {
  en: {
    metaTitle:
      "Privacy Policy",

    metaDescription:
      "Learn how setarehsalehabadi.com handles privacy, Google Analytics consent, cookies, technical information and privacy requests.",

    eyebrow:
      "Legal information",

    title:
      "Privacy handled",

    highlightedTitle:
      "with clarity and choice.",

    introduction:
      "This policy explains how information may be processed when you visit setarehsalehabadi.com, how consent-based analytics works and how you can manage your privacy choices.",

    updatedLabel:
      "Last updated",

    updatedDate:
      "22 July 2026",

    quickFactsLabel:
      "At a glance",

    quickFacts: [
      {
        label: "Website owner",
        value:
          "Setareh Salehabadi — based in Iran",
      },
      {
        label: "Analytics",
        value:
          "Google Analytics 4, only after consent",
      },
      {
        label: "Privacy contact",
        value: legalEmail,
      },
    ],

    navigationLabel:
      "Privacy policy sections",

    sectionsBeforeCookies: [
      {
        id: "controller",
        number: "01",
        title:
          "Who is responsible for the website?",
        paragraphs: [
          "Setareh Salehabadi is the owner and operator of this website and is responsible for decisions about the personal information processed through it.",
          "The website owner is based in Iran. The website is intended for an international audience and may be accessed from countries with different privacy and data-protection rules.",
        ],
      },
      {
        id: "scope",
        number: "02",
        title:
          "Current website services",
        paragraphs: [
          "The current website primarily provides public information, research, selected project material and educational content.",
          "At present, the website does not operate an active public contact form, newsletter subscription system, user account system or online checkout.",
          "If you voluntarily send a privacy or legal request to the email address listed in this policy, the information in your message will be processed only as reasonably necessary to review and answer that request.",
        ],
      },
      {
        id: "technical-data",
        number: "03",
        title:
          "Technical and hosting information",
        paragraphs: [
          "When you access the website, hosting, infrastructure and security providers may automatically process technical information needed to deliver and protect the website.",
        ],
        items: [
          "IP address and approximate network location",
          "Date and time of access",
          "Requested page or file",
          "Browser, device and operating-system information",
          "Referring page",
          "Server errors, security events and diagnostic logs",
        ],
      },
      {
        id: "analytics",
        number: "04",
        title:
          "Google Analytics 4",
        paragraphs: [
          "This website uses Google Analytics 4 only after you select “Accept analytics” in the privacy banner. If you reject analytics, the Google Analytics tag is not intentionally loaded by the website.",
          "Analytics is used to understand how pages and content are used, identify technical or usability issues and make evidence-based improvements.",
          "Depending on the enabled measurement settings, Analytics may process page views, session statistics, scrolling, outbound-link clicks, traffic sources, approximate location and browser or device information.",
          "Google states that IP addresses are used during collection to derive approximate location information and are discarded before being logged or stored in Google Analytics.",
          "The current website tag denies advertising storage, advertising user data and advertising personalisation. The website does not intentionally use GA4 for personalised advertising or remarketing.",
        ],
        items: [
          "Page views and navigation paths",
          "Session and engagement information",
          "Scroll interactions",
          "Outbound-link clicks",
          "Approximate geographic information",
          "Browser, device, language and operating-system information",
          "Traffic source or campaign information",
        ],
      },
    ],

    cookiesSection: {
      id: "cookies",
      number: "05",
      title:
        "Cookies and browser storage",

      introduction:
        "The website stores your analytics choice locally. Analytics cookies may be created only after analytics has been accepted.",

      headers: {
        name: "Name",
        type: "Type",
        purpose: "Purpose",
        duration: "Duration",
      },

      rows: [
        {
          name:
            "setareh-analytics-consent-v1",
          type:
            "Local browser storage",
          purpose:
            "Remembers whether analytics was accepted or rejected.",
          duration:
            "Until the choice is changed or browser data is cleared.",
        },
        {
          name: "_ga",
          type:
            "First-party analytics cookie",
          purpose:
            "Used by GA4 to distinguish pseudonymous users.",
          duration:
            "Google default: up to 2 years, subject to browser and tag settings.",
        },
        {
          name:
            "_ga_<container-id>",
          type:
            "First-party analytics cookie",
          purpose:
            "Used by GA4 to maintain session state.",
          duration:
            "Google default: up to 2 years, subject to browser and tag settings.",
        },
      ],

      note:
        "Browser restrictions, user settings and future configuration changes may shorten these durations. Rejecting analytics prevents the website from intentionally loading GA4 and attempts to remove existing _ga cookies for this domain.",
    },

    sectionsAfterCookies: [
      {
        id: "purpose",
        number: "06",
        title:
          "Purpose and legal basis",
        paragraphs: [
          "Analytics information is used to understand website performance, improve content, evaluate usability and identify technical problems.",
          "Where the GDPR or a similar consent-based rule applies, analytics processing is based on your consent. Refusing analytics does not prevent you from using the public content of the website.",
          "You may withdraw or change your choice at any time by using the “Cookie settings” control displayed on the website after a choice has been saved.",
        ],
      },
      {
        id: "sharing",
        number: "07",
        title:
          "Service providers and international processing",
        paragraphs: [
          "Analytics information is sent to Google for processing and reporting. Technical information may also be processed by hosting, infrastructure, security and content-delivery providers used to operate the website.",
          "These providers may process information in countries other than the country from which you access the website. Their own contractual terms, privacy documentation and applicable safeguards govern their processing.",
          "Information may also be disclosed when reasonably required to comply with applicable law, protect the website or respond to a valid legal request.",
        ],
      },
      {
        id: "retention",
        number: "08",
        title:
          "How long information is kept",
        paragraphs: [
          "The browser preference recording your analytics choice remains until you change the choice or clear local browser data.",
          "GA4 cookie durations are described in the cookie section above. User-level and event-level Analytics retention is controlled through the Google Analytics property settings and Google’s applicable retention rules.",
          "Aggregated statistical reports may remain available separately from user-level or event-level retention settings.",
          "Legal or privacy correspondence may be retained only for as long as reasonably necessary to answer the request, maintain an appropriate record or comply with an applicable obligation.",
        ],
      },
      {
        id: "rights",
        number: "09",
        title:
          "Your privacy rights",
        paragraphs: [
          "Depending on the law that applies to you and the circumstances of the processing, you may have rights concerning your personal information.",
        ],
        items: [
          "Request access to relevant personal information",
          "Request correction of inaccurate information",
          "Request deletion where legally applicable",
          "Request restriction of processing",
          "Object to certain processing",
          "Request data portability where applicable",
          "Withdraw analytics consent at any time",
          "Submit a complaint to a competent data-protection authority",
        ],
      },
      {
        id: "security",
        number: "10",
        title:
          "Security",
        paragraphs: [
          "Reasonable technical and organisational measures are used to reduce the risk of unauthorised access, misuse, loss or alteration.",
          "No internet transmission, hosting environment or storage method can be guaranteed to be completely secure.",
        ],
      },
      {
        id: "future-services",
        number: "11",
        title:
          "Future accounts, payments and digital products",
        paragraphs: [
          "The website may later introduce self-service educational products, Iranian and international payment options, user accounts or other digital services.",
          "Before those services become active, this policy and the Terms of Use should be updated to explain the additional information, service providers, payment processing, retention rules and user choices involved.",
          "The introduction of paid products or international checkout should also receive appropriate professional legal review before launch.",
        ],
      },
      {
        id: "children",
        number: "12",
        title:
          "Children",
        paragraphs: [
          "This website is not intentionally designed to collect personal information from children. A parent or guardian who believes that a child has provided personal information may use the privacy email below to request a review.",
        ],
      },
      {
        id: "updates",
        number: "13",
        title:
          "Policy updates",
        paragraphs: [
          "This policy may be updated when the website, analytics configuration, hosting arrangements or legal requirements change.",
          "The latest revision date will be displayed near the top of this page.",
        ],
      },
    ],

    googleInformationLabel:
      "Google Analytics information",

    googleInformationText:
      "Google provides additional information about how Analytics safeguards and processes information.",

    googlePrivacyLabel:
      "Read Google’s privacy information",

    contactTitle:
      "Privacy and legal requests",

    contactDescription:
      "For a privacy request, data-protection question or legal notice, write to:",

    contactRestriction:
      "This address is reserved for privacy and legal matters. It is not a coaching, project-support or general customer-service channel.",

    legalReviewNote:
      "This policy is intended to document the website’s current technical setup. It is not a substitute for professional legal advice.",

    termsLabel:
      "Read the Terms of Use",
  },

  de: {
    metaTitle:
      "Datenschutzerklärung",

    metaDescription:
      "Informationen zum Datenschutz auf setarehsalehabadi.com, zur Einwilligung in Google Analytics, zu Cookies und zu Datenschutzanfragen.",

    eyebrow:
      "Rechtliche Informationen",

    title:
      "Datenschutz mit",

    highlightedTitle:
      "Klarheit und Wahlfreiheit.",

    introduction:
      "Diese Datenschutzerklärung erläutert, wie Informationen beim Besuch von setarehsalehabadi.com verarbeitet werden können, wie einwilligungsbasierte Analyse funktioniert und wie Sie Ihre Auswahl verwalten können.",

    updatedLabel:
      "Zuletzt aktualisiert",

    updatedDate:
      "22. Juli 2026",

    quickFactsLabel:
      "Auf einen Blick",

    quickFacts: [
      {
        label:
          "Website-Inhaberin",
        value:
          "Setareh Salehabadi — mit Sitz im Iran",
      },
      {
        label: "Analytics",
        value:
          "Google Analytics 4, nur nach Einwilligung",
      },
      {
        label:
          "Datenschutzkontakt",
        value: legalEmail,
      },
    ],

    navigationLabel:
      "Abschnitte der Datenschutzerklärung",

    sectionsBeforeCookies: [
      {
        id: "controller",
        number: "01",
        title:
          "Wer ist für die Website verantwortlich?",
        paragraphs: [
          "Setareh Salehabadi ist Inhaberin und Betreiberin dieser Website und verantwortlich für Entscheidungen über die Verarbeitung personenbezogener Informationen.",
          "Die Website-Inhaberin hat ihren Sitz im Iran. Die Website richtet sich an ein internationales Publikum und kann aus Ländern mit unterschiedlichen Datenschutzregelungen aufgerufen werden.",
        ],
      },
      {
        id: "scope",
        number: "02",
        title:
          "Derzeitige Website-Dienste",
        paragraphs: [
          "Die Website stellt derzeit vor allem öffentliche Informationen, Forschung, ausgewählte Projektinhalte und Lernmaterialien bereit.",
          "Aktuell gibt es kein aktives öffentliches Kontaktformular, kein Newsletter-Anmeldesystem, keine Benutzerkonten und keinen Online-Checkout.",
          "Wenn Sie freiwillig eine Datenschutz- oder Rechtsanfrage an die in dieser Erklärung genannte E-Mail-Adresse senden, werden die darin enthaltenen Informationen nur verarbeitet, soweit dies zur Prüfung und Beantwortung der Anfrage erforderlich ist.",
        ],
      },
      {
        id: "technical-data",
        number: "03",
        title:
          "Technische und hostingbezogene Informationen",
        paragraphs: [
          "Beim Zugriff auf die Website können Hosting-, Infrastruktur- und Sicherheitsanbieter automatisch technische Informationen verarbeiten, die zur Bereitstellung und zum Schutz der Website erforderlich sind.",
        ],
        items: [
          "IP-Adresse und ungefähre Netzwerkregion",
          "Datum und Uhrzeit des Zugriffs",
          "Aufgerufene Seite oder Datei",
          "Browser-, Geräte- und Betriebssysteminformationen",
          "Verweisende Seite",
          "Serverfehler, Sicherheitsereignisse und Diagnoseprotokolle",
        ],
      },
      {
        id: "analytics",
        number: "04",
        title:
          "Google Analytics 4",
        paragraphs: [
          "Diese Website verwendet Google Analytics 4 nur, nachdem Sie im Datenschutzbanner „Analytics akzeptieren“ gewählt haben. Bei Ablehnung wird das Google-Analytics-Tag von der Website nicht absichtlich geladen.",
          "Analytics dient dazu, die Nutzung von Seiten und Inhalten zu verstehen, technische oder benutzerbezogene Probleme zu erkennen und evidenzbasierte Verbesserungen vorzunehmen.",
          "Abhängig von den aktivierten Messeinstellungen können unter anderem Seitenaufrufe, Sitzungsstatistiken, Scrollvorgänge, Klicks auf externe Links, Zugriffsquellen, ungefähre Standortdaten sowie Browser- und Geräteinformationen verarbeitet werden.",
          "Google erklärt, dass IP-Adressen während der Erfassung zur Ableitung ungefährer Standortinformationen verwendet und anschließend verworfen werden, bevor sie in Google Analytics protokolliert oder gespeichert werden.",
          "Die derzeitige Tag-Konfiguration verweigert Werbespeicherung, Werbenutzerdaten und personalisierte Werbung. Die Website verwendet GA4 nicht absichtlich für personalisierte Werbung oder Remarketing.",
        ],
        items: [
          "Seitenaufrufe und Navigationspfade",
          "Sitzungs- und Interaktionsinformationen",
          "Scrollinteraktionen",
          "Klicks auf externe Links",
          "Ungefähre geografische Informationen",
          "Browser, Gerät, Sprache und Betriebssystem",
          "Zugriffsquelle oder Kampagneninformation",
        ],
      },
    ],

    cookiesSection: {
      id: "cookies",
      number: "05",
      title:
        "Cookies und Browser-Speicher",

      introduction:
        "Die Website speichert Ihre Analytics-Auswahl lokal. Analytics-Cookies können erst nach Ihrer Zustimmung erstellt werden.",

      headers: {
        name: "Name",
        type: "Typ",
        purpose: "Zweck",
        duration: "Dauer",
      },

      rows: [
        {
          name:
            "setareh-analytics-consent-v1",
          type:
            "Lokaler Browser-Speicher",
          purpose:
            "Speichert, ob Analytics akzeptiert oder abgelehnt wurde.",
          duration:
            "Bis die Auswahl geändert oder die Browserdaten gelöscht werden.",
        },
        {
          name: "_ga",
          type:
            "First-Party-Analytics-Cookie",
          purpose:
            "Wird von GA4 zur Unterscheidung pseudonymer Nutzer verwendet.",
          duration:
            "Google-Standard: bis zu 2 Jahre, abhängig von Browser- und Tag-Einstellungen.",
        },
        {
          name:
            "_ga_<container-id>",
          type:
            "First-Party-Analytics-Cookie",
          purpose:
            "Wird von GA4 zur Speicherung des Sitzungsstatus verwendet.",
          duration:
            "Google-Standard: bis zu 2 Jahre, abhängig von Browser- und Tag-Einstellungen.",
        },
      ],

      note:
        "Browserbeschränkungen, Nutzereinstellungen und spätere Konfigurationsänderungen können diese Zeiträume verkürzen. Bei Ablehnung wird GA4 nicht absichtlich geladen und die Website versucht, vorhandene _ga-Cookies dieser Domain zu entfernen.",
    },

    sectionsAfterCookies: [
      {
        id: "purpose",
        number: "06",
        title:
          "Zweck und Rechtsgrundlage",
        paragraphs: [
          "Analytics-Informationen werden verwendet, um die Leistung der Website zu verstehen, Inhalte zu verbessern, die Benutzerfreundlichkeit zu bewerten und technische Probleme zu erkennen.",
          "Soweit die DSGVO oder eine vergleichbare einwilligungsbasierte Regelung gilt, erfolgt die Analytics-Verarbeitung auf Grundlage Ihrer Einwilligung. Eine Ablehnung beeinträchtigt den Zugriff auf die öffentlichen Inhalte nicht.",
          "Sie können Ihre Auswahl jederzeit über die nach der Entscheidung eingeblendete Schaltfläche „Cookie-Einstellungen“ ändern oder widerrufen.",
        ],
      },
      {
        id: "sharing",
        number: "07",
        title:
          "Dienstleister und internationale Verarbeitung",
        paragraphs: [
          "Analytics-Informationen werden zur Verarbeitung und Berichterstellung an Google übermittelt. Technische Informationen können außerdem von Hosting-, Infrastruktur-, Sicherheits- und Content-Delivery-Anbietern verarbeitet werden.",
          "Diese Anbieter können Informationen in anderen Ländern als Ihrem Aufenthaltsland verarbeiten. Maßgeblich sind deren Vertragsbedingungen, Datenschutzinformationen und anwendbare Schutzmaßnahmen.",
          "Informationen können außerdem offengelegt werden, wenn dies zur Erfüllung anwendbarer Gesetze, zum Schutz der Website oder zur Beantwortung einer gültigen rechtlichen Anfrage erforderlich ist.",
        ],
      },
      {
        id: "retention",
        number: "08",
        title:
          "Speicherdauer",
        paragraphs: [
          "Die im Browser gespeicherte Analytics-Auswahl bleibt bestehen, bis Sie sie ändern oder die lokalen Browserdaten löschen.",
          "Die Dauer der GA4-Cookies wird im Cookie-Abschnitt beschrieben. Die Aufbewahrung nutzer- und ereignisbezogener Analytics-Daten wird durch die Einstellungen der Google-Analytics-Property und die anwendbaren Google-Regelungen gesteuert.",
          "Aggregierte statistische Berichte können unabhängig von den Einstellungen für nutzer- oder ereignisbezogene Daten verfügbar bleiben.",
          "Datenschutz- oder Rechtskorrespondenz wird nur so lange gespeichert, wie dies zur Beantwortung, angemessenen Dokumentation oder Erfüllung einer anwendbaren Verpflichtung erforderlich ist.",
        ],
      },
      {
        id: "rights",
        number: "09",
        title:
          "Ihre Datenschutzrechte",
        paragraphs: [
          "Abhängig vom anwendbaren Recht und den Umständen der Verarbeitung können Ihnen Rechte in Bezug auf Ihre personenbezogenen Informationen zustehen.",
        ],
        items: [
          "Auskunft über relevante personenbezogene Informationen",
          "Berichtigung unrichtiger Informationen",
          "Löschung, soweit rechtlich anwendbar",
          "Einschränkung der Verarbeitung",
          "Widerspruch gegen bestimmte Verarbeitungen",
          "Datenübertragbarkeit, soweit anwendbar",
          "Widerruf der Analytics-Einwilligung",
          "Beschwerde bei einer zuständigen Datenschutzaufsichtsbehörde",
        ],
      },
      {
        id: "security",
        number: "10",
        title: "Sicherheit",
        paragraphs: [
          "Es werden angemessene technische und organisatorische Maßnahmen eingesetzt, um das Risiko unbefugten Zugriffs, Missbrauchs, Verlusts oder einer Veränderung zu reduzieren.",
          "Keine Internetübertragung, Hosting-Umgebung oder Speichermethode kann vollständig sicher garantiert werden.",
        ],
      },
      {
        id: "future-services",
        number: "11",
        title:
          "Zukünftige Konten, Zahlungen und digitale Produkte",
        paragraphs: [
          "Die Website kann später selbstgesteuerte Lernprodukte, iranische und internationale Zahlungsoptionen, Benutzerkonten oder weitere digitale Dienste einführen.",
          "Vor deren Aktivierung muss diese Datenschutzerklärung aktualisiert werden, um zusätzliche Informationen, Dienstleister, Zahlungsprozesse, Aufbewahrungsregeln und Nutzerentscheidungen zu erläutern.",
          "Bezahlte Produkte oder ein internationaler Checkout sollten vor der Veröffentlichung außerdem professionell rechtlich geprüft werden.",
        ],
      },
      {
        id: "children",
        number: "12",
        title: "Kinder",
        paragraphs: [
          "Diese Website ist nicht darauf ausgerichtet, personenbezogene Informationen von Kindern zu erheben. Eltern oder Erziehungsberechtigte können über die unten genannte Datenschutzadresse eine Prüfung anfordern.",
        ],
      },
      {
        id: "updates",
        number: "13",
        title:
          "Aktualisierungen",
        paragraphs: [
          "Diese Datenschutzerklärung kann geändert werden, wenn sich die Website, die Analytics-Konfiguration, die Hosting-Struktur oder rechtliche Anforderungen ändern.",
          "Das Datum der letzten Überarbeitung wird am Anfang dieser Seite angezeigt.",
        ],
      },
    ],

    googleInformationLabel:
      "Informationen zu Google Analytics",

    googleInformationText:
      "Google stellt zusätzliche Informationen darüber bereit, wie Analytics Informationen verarbeitet und schützt.",

    googlePrivacyLabel:
      "Datenschutzinformationen von Google lesen",

    contactTitle:
      "Datenschutz- und Rechtsanfragen",

    contactDescription:
      "Für eine Datenschutzanfrage, eine datenschutzrechtliche Frage oder einen rechtlichen Hinweis schreiben Sie an:",

    contactRestriction:
      "Diese Adresse ist ausschließlich für Datenschutz- und Rechtsangelegenheiten vorgesehen. Sie ist kein Kanal für Coaching, Projektbetreuung oder allgemeinen Kundendienst.",

    legalReviewNote:
      "Diese Erklärung dokumentiert die derzeitige technische Konfiguration der Website und ersetzt keine professionelle Rechtsberatung.",

    termsLabel:
      "Nutzungsbedingungen lesen",
  },

  fa: {
    metaTitle:
      "سیاست حریم خصوصی",

    metaDescription:
      "اطلاعات مربوط به حریم خصوصی، رضایت برای گوگل آنالیتیکس، کوکی‌ها، داده‌های فنی و درخواست‌های حقوقی در setarehsalehabadi.com.",

    eyebrow:
      "اطلاعات حقوقی",

    title:
      "حریم خصوصی با",

    highlightedTitle:
      "شفافیت و حق انتخاب",

    introduction:
      "این سیاست توضیح می‌دهد هنگام بازدید از setarehsalehabadi.com چه اطلاعاتی ممکن است پردازش شود، گوگل آنالیتیکس چگونه فقط با رضایت شما فعال می‌شود و چطور می‌توانید انتخاب خود را مدیریت کنید.",

    updatedLabel:
      "آخرین به‌روزرسانی",

    updatedDate:
      "۳۱ تیر ۱۴۰۵",

    quickFactsLabel:
      "خلاصه وضعیت",

    quickFacts: [
      {
        label:
          "مالک وب‌سایت",
        value:
          "ستاره صالح‌آبادی — مستقر در ایران",
      },
      {
        label:
          "ابزار تحلیل",
        value:
          "گوگل آنالیتیکس ۴، فقط پس از رضایت",
      },
      {
        label:
          "ایمیل حریم خصوصی",
        value: legalEmail,
      },
    ],

    navigationLabel:
      "بخش‌های سیاست حریم خصوصی",

    sectionsBeforeCookies: [
      {
        id: "controller",
        number: "۰۱",
        title:
          "مسئول این وب‌سایت چه کسی است؟",
        paragraphs: [
          "ستاره صالح‌آبادی مالک و مدیر این وب‌سایت است و درباره نحوه پردازش اطلاعات شخصی در این وب‌سایت تصمیم‌گیری می‌کند.",
          "مالک وب‌سایت در ایران مستقر است. این وب‌سایت برای مخاطبان بین‌المللی طراحی شده و ممکن است از کشورهایی با قوانین متفاوت حریم خصوصی و حفاظت از داده بازدید شود.",
        ],
      },
      {
        id: "scope",
        number: "۰۲",
        title:
          "خدمات فعال فعلی سایت",
        paragraphs: [
          "این وب‌سایت در وضعیت فعلی عمدتاً اطلاعات عمومی، پژوهش‌ها، پروژه‌های منتخب و محتوای آموزشی را نمایش می‌دهد.",
          "در حال حاضر فرم تماس عمومی، عضویت فعال خبرنامه، حساب کاربری و پرداخت آنلاین در سایت فعال نیست.",
          "چنانچه داوطلبانه درخواست حقوقی یا مرتبط با حریم خصوصی را به ایمیل درج‌شده در این صفحه ارسال کنید، اطلاعات پیام فقط به‌اندازه‌ای پردازش می‌شود که برای بررسی و پاسخ‌دادن به درخواست لازم باشد.",
        ],
      },
      {
        id: "technical-data",
        number: "۰۳",
        title:
          "اطلاعات فنی و میزبانی",
        paragraphs: [
          "هنگام بازدید از سایت، ارائه‌دهندگان میزبانی، زیرساخت و امنیت ممکن است اطلاعات فنی موردنیاز برای نمایش، نگهداری و محافظت از سایت را به‌صورت خودکار پردازش کنند.",
        ],
        items: [
          "نشانی IP و موقعیت تقریبی شبکه",
          "تاریخ و زمان دسترسی",
          "صفحه یا فایل درخواست‌شده",
          "نوع مرورگر، دستگاه و سیستم‌عامل",
          "صفحه ارجاع‌دهنده",
          "خطاهای سرور، رویدادهای امنیتی و گزارش‌های فنی",
        ],
      },
      {
        id: "analytics",
        number: "۰۴",
        title:
          "گوگل آنالیتیکس ۴",
        paragraphs: [
          "این وب‌سایت فقط زمانی گوگل آنالیتیکس ۴ را فعال می‌کند که در بنر حریم خصوصی گزینه «پذیرش آنالیتیکس» را انتخاب کرده باشید. در صورت ردکردن، تگ گوگل آنالیتیکس عمداً توسط سایت بارگذاری نمی‌شود.",
          "از آنالیتیکس برای درک نحوه استفاده از صفحات و محتوا، شناسایی مشکلات فنی یا تجربه کاربری و انجام بهبودهای مبتنی بر شواهد استفاده می‌شود.",
          "بسته به تنظیمات اندازه‌گیری فعال، اطلاعاتی مانند مشاهده صفحات، آمار نشست، اسکرول، کلیک روی لینک‌های خروجی، منبع ورود، موقعیت تقریبی و مشخصات مرورگر یا دستگاه ممکن است پردازش شود.",
          "گوگل اعلام می‌کند نشانی IP هنگام جمع‌آوری برای استخراج موقعیت تقریبی استفاده می‌شود و پیش از ثبت یا ذخیره در گوگل آنالیتیکس کنار گذاشته می‌شود.",
          "تنظیم فعلی تگ سایت، ذخیره‌سازی تبلیغاتی، داده کاربر تبلیغاتی و شخصی‌سازی تبلیغات را رد می‌کند. سایت عمداً از GA4 برای تبلیغات شخصی‌سازی‌شده یا بازاریابی مجدد استفاده نمی‌کند.",
        ],
        items: [
          "مشاهده صفحات و مسیر حرکت در سایت",
          "اطلاعات نشست و تعامل",
          "میزان اسکرول",
          "کلیک روی لینک‌های خروجی",
          "موقعیت جغرافیایی تقریبی",
          "مرورگر، دستگاه، زبان و سیستم‌عامل",
          "منبع ورود یا اطلاعات کمپین",
        ],
      },
    ],

    cookiesSection: {
      id: "cookies",
      number: "۰۵",
      title:
        "کوکی‌ها و حافظه مرورگر",

      introduction:
        "سایت انتخاب شما درباره آنالیتیکس را در مرورگر ذخیره می‌کند. کوکی‌های تحلیلی فقط پس از پذیرش آنالیتیکس ایجاد می‌شوند.",

      headers: {
        name: "نام",
        type: "نوع",
        purpose: "کاربرد",
        duration: "مدت",
      },

      rows: [
        {
          name:
            "setareh-analytics-consent-v1",
          type:
            "حافظه محلی مرورگر",
          purpose:
            "ثبت می‌کند که آنالیتیکس پذیرفته یا رد شده است.",
          duration:
            "تا زمان تغییر انتخاب یا پاک‌کردن اطلاعات مرورگر.",
        },
        {
          name: "_ga",
          type:
            "کوکی تحلیلی شخص اول",
          purpose:
            "برای تشخیص کاربران با شناسه مستعار در GA4 استفاده می‌شود.",
          duration:
            "پیش‌فرض گوگل تا ۲ سال؛ وابسته به تنظیمات مرورگر و تگ.",
        },
        {
          name:
            "_ga_<container-id>",
          type:
            "کوکی تحلیلی شخص اول",
          purpose:
            "برای نگهداری وضعیت نشست در GA4 استفاده می‌شود.",
          duration:
            "پیش‌فرض گوگل تا ۲ سال؛ وابسته به تنظیمات مرورگر و تگ.",
        },
      ],

      note:
        "محدودیت‌های مرورگر، تنظیمات کاربر و تغییرات آینده ممکن است این مدت‌ها را کوتاه‌تر کنند. ردکردن آنالیتیکس مانع بارگذاری عمدی GA4 می‌شود و سایت تلاش می‌کند کوکی‌های موجود _ga مربوط به این دامنه را حذف کند.",
    },

    sectionsAfterCookies: [
      {
        id: "purpose",
        number: "۰۶",
        title:
          "هدف و مبنای پردازش",
        paragraphs: [
          "اطلاعات تحلیلی برای بررسی عملکرد سایت، بهبود محتوا، ارزیابی تجربه کاربری و شناسایی مشکلات فنی استفاده می‌شود.",
          "در مواردی که مقررات GDPR یا قواعد مشابه مبتنی بر رضایت قابل اجرا باشد، پردازش آنالیتیکس بر پایه رضایت شما انجام می‌شود. ردکردن آنالیتیکس مانع استفاده از محتوای عمومی سایت نمی‌شود.",
          "پس از ثبت انتخاب، می‌توانید هر زمان از دکمه «تنظیمات کوکی» در پایین سایت برای تغییر یا پس‌گرفتن رضایت استفاده کنید.",
        ],
      },
      {
        id: "sharing",
        number: "۰۷",
        title:
          "ارائه‌دهندگان خدمات و پردازش بین‌المللی",
        paragraphs: [
          "اطلاعات تحلیلی برای پردازش و تهیه گزارش به گوگل ارسال می‌شود. اطلاعات فنی نیز ممکن است توسط ارائه‌دهندگان میزبانی، زیرساخت، امنیت و تحویل محتوا پردازش شود.",
          "این ارائه‌دهندگان ممکن است اطلاعات را در کشورهایی غیر از کشور محل بازدید شما پردازش کنند. شرایط قراردادی، سیاست‌های حریم خصوصی و سازوکارهای حفاظتی آن‌ها بر این پردازش حاکم است.",
          "در صورت وجود الزام قانونی معتبر، محافظت از سایت یا پاسخ به یک درخواست حقوقی معتبر، ممکن است اطلاعات لازم افشا شود.",
        ],
      },
      {
        id: "retention",
        number: "۰۸",
        title:
          "مدت نگهداری اطلاعات",
        paragraphs: [
          "انتخاب آنالیتیکس در مرورگر تا زمانی باقی می‌ماند که آن را تغییر دهید یا اطلاعات محلی مرورگر را پاک کنید.",
          "مدت کوکی‌های GA4 در بخش کوکی‌ها توضیح داده شده است. نگهداری داده‌های سطح کاربر و رویداد براساس تنظیمات Property در گوگل آنالیتیکس و قواعد نگهداری قابل‌اجرای گوگل کنترل می‌شود.",
          "گزارش‌های آماری تجمیع‌شده ممکن است مستقل از تنظیمات نگهداری داده‌های سطح کاربر یا رویداد در دسترس باقی بمانند.",
          "مکاتبات حقوقی یا حریم خصوصی فقط تا زمانی نگهداری می‌شوند که برای پاسخ، ثبت متناسب درخواست یا رعایت یک الزام قابل اجرا لازم باشد.",
        ],
      },
      {
        id: "rights",
        number: "۰۹",
        title:
          "حقوق مرتبط با حریم خصوصی",
        paragraphs: [
          "با توجه به قانون قابل اجرا و شرایط پردازش، ممکن است در ارتباط با اطلاعات شخصی خود از حقوقی برخوردار باشید.",
        ],
        items: [
          "درخواست دسترسی به اطلاعات مرتبط",
          "درخواست اصلاح اطلاعات نادرست",
          "درخواست حذف در موارد قابل اجرا",
          "درخواست محدودکردن پردازش",
          "اعتراض به برخی پردازش‌ها",
          "درخواست انتقال‌پذیری داده در موارد قابل اجرا",
          "پس‌گرفتن رضایت آنالیتیکس در هر زمان",
          "ثبت شکایت نزد مرجع صالح حفاظت از داده",
        ],
      },
      {
        id: "security",
        number: "۱۰",
        title:
          "امنیت",
        paragraphs: [
          "برای کاهش خطر دسترسی غیرمجاز، سوءاستفاده، ازبین‌رفتن یا تغییر اطلاعات از اقدامات فنی و سازمانی متناسب استفاده می‌شود.",
          "هیچ انتقال اینترنتی، محیط میزبانی یا روش ذخیره‌سازی را نمی‌توان کاملاً بدون خطر تضمین کرد.",
        ],
      },
      {
        id: "future-services",
        number: "۱۱",
        title:
          "حساب کاربری، پرداخت و محصولات دیجیتال آینده",
        paragraphs: [
          "ممکن است در آینده محصولات آموزشی خودآموز، روش‌های پرداخت ایرانی و بین‌المللی، حساب کاربری یا خدمات دیجیتال دیگری به سایت اضافه شود.",
          "پیش از فعال‌شدن این خدمات، این سیاست باید به‌روزرسانی شود تا اطلاعات جدید، ارائه‌دهندگان پرداخت، شیوه پردازش، مدت نگهداری و انتخاب‌های کاربران را توضیح دهد.",
          "فعال‌سازی محصولات پولی یا پرداخت بین‌المللی باید پیش از انتشار نهایی تحت بررسی حقوقی حرفه‌ای قرار گیرد.",
        ],
      },
      {
        id: "children",
        number: "۱۲",
        title:
          "اطلاعات کودکان",
        paragraphs: [
          "این وب‌سایت عمداً برای جمع‌آوری اطلاعات شخصی کودکان طراحی نشده است. والد یا سرپرستی که تصور می‌کند کودکی اطلاعات شخصی ارسال کرده است، می‌تواند از ایمیل حریم خصوصی درخواست بررسی کند.",
        ],
      },
      {
        id: "updates",
        number: "۱۳",
        title:
          "به‌روزرسانی سیاست",
        paragraphs: [
          "در صورت تغییر امکانات سایت، تنظیمات آنالیتیکس، زیرساخت میزبانی یا الزامات قانونی، ممکن است این سیاست به‌روزرسانی شود.",
          "تاریخ آخرین بازنگری در ابتدای همین صفحه نمایش داده خواهد شد.",
        ],
      },
    ],

    googleInformationLabel:
      "اطلاعات گوگل آنالیتیکس",

    googleInformationText:
      "گوگل اطلاعات بیشتری درباره نحوه پردازش و محافظت از اطلاعات در گوگل آنالیتیکس منتشر کرده است.",

    googlePrivacyLabel:
      "مطالعه اطلاعات حریم خصوصی گوگل",

    contactTitle:
      "درخواست‌های حقوقی و حریم خصوصی",

    contactDescription:
      "برای درخواست مرتبط با حریم خصوصی، سؤال حفاظت از داده یا ابلاغ حقوقی، به این نشانی ایمیل بزنید:",

    contactRestriction:
      "این ایمیل فقط برای امور حقوقی و حریم خصوصی است و مسیر مشاوره، پشتیبانی پروژه، آموزش یا خدمات عمومی مشتریان نیست.",

    legalReviewNote:
      "این سیاست برای مستندسازی وضعیت فنی فعلی سایت تهیه شده و جایگزین مشاوره حقوقی حرفه‌ای نیست.",

    termsLabel:
      "مطالعه شرایط استفاده",
  },
};

type PrivacyPageProps = {
  params: Promise<{
    locale: string;
  }>;
};

function getDictionary(
  locale: Locale
) {
  return dictionaries[
    locale
  ] as unknown as Dictionary;
}

function getAllSections(
  content: PrivacyContent
) {
  return [
    ...content.sectionsBeforeCookies,
    {
      id:
        content.cookiesSection.id,
      number:
        content.cookiesSection.number,
      title:
        content.cookiesSection.title,
    },
    ...content.sectionsAfterCookies,
  ];
}

export async function generateMetadata({
  params,
}: PrivacyPageProps): Promise<Metadata> {
  const {
    locale: localeParam,
  } = await params;

  if (!isLocale(localeParam)) {
    notFound();
  }

  const locale: Locale =
    localeParam;

  const content =
    privacyContent[locale];

  const canonical =
    `${siteUrl}/${locale}/privacy`;

  return {
    title:
      `${content.metaTitle} | Setareh Salehabadi`,

    description:
      content.metaDescription,

    alternates: {
      canonical,

      languages: {
        en:
          `${siteUrl}/en/privacy`,

        de:
          `${siteUrl}/de/privacy`,

        fa:
          `${siteUrl}/fa/privacy`,

        "x-default":
          `${siteUrl}/en/privacy`,
      },
    },

    openGraph: {
      type: "website",
      url: canonical,

      title:
        `${content.metaTitle} | Setareh Salehabadi`,

      description:
        content.metaDescription,
    },

    robots: {
      index: true,
      follow: true,
    },
  };
}

function PolicySectionBlock({
  section,
  isPersian,
}: {
  section: PolicySection;
  isPersian: boolean;
}) {
  return (
    <section
      id={section.id}
      aria-labelledby={`${section.id}-heading`}
      className="
        scroll-mt-[112px]
        border-b
        border-[#302d29]/15
        py-10
        first:pt-0
        last:border-b-0
        last:pb-0
        sm:py-12
      "
    >
      <div
        className="
          grid
          gap-5
          md:grid-cols-[64px_minmax(0,1fr)]
          md:gap-8
        "
      >
        <span
          aria-hidden="true"
          className="
            pt-1
            font-sans
            text-[11px]
            font-semibold
            tracking-[0.18em]
            text-[#9a9187]
          "
        >
          {section.number}
        </span>

        <div>
          <h2
            id={`${section.id}-heading`}
            className={`
              max-w-[800px]
              text-[#25211d]
              ${
                isPersian
                  ? "font-sans text-[clamp(1.45rem,3vw,2.15rem)] font-[700] leading-[1.65]"
                  : "font-serif text-[clamp(2rem,3.2vw,3rem)] font-medium leading-[1.08] tracking-[-0.035em]"
              }
            `}
          >
            {section.title}
          </h2>

          <div
            className={`
              mt-6
              max-w-[820px]
              space-y-5
              font-sans
              text-[#625d56]
              ${
                isPersian
                  ? "text-[15px] leading-[2.15] sm:text-[16px]"
                  : "text-[16px] leading-[1.95] sm:text-[17px]"
              }
            `}
          >
            {section.paragraphs.map(
              (paragraph) => (
                <p key={paragraph}>
                  {paragraph}
                </p>
              )
            )}
          </div>

          {section.items?.length ? (
            <ul
              className="
                mt-7
                grid
                gap-3
                sm:grid-cols-2
              "
            >
              {section.items.map(
                (item) => (
                  <li
                    key={item}
                    className={`
                      flex
                      items-start
                      gap-3
                      rounded-[18px]
                      border
                      border-[#302d29]/12
                      bg-white/35
                      px-4
                      py-4
                      font-sans
                      text-[#514b45]
                      ${
                        isPersian
                          ? "text-[14px] leading-7"
                          : "text-[14px] leading-6"
                      }
                    `}
                  >
                    <span
                      aria-hidden="true"
                      className="
                        mt-[0.65rem]
                        h-1.5
                        w-1.5
                        shrink-0
                        rounded-full
                        bg-[#b4853b]
                      "
                    />

                    <span>
                      {item}
                    </span>
                  </li>
                )
              )}
            </ul>
          ) : null}
        </div>
      </div>
    </section>
  );
}

export default async function PrivacyPage({
  params,
}: PrivacyPageProps) {
  const {
    locale: localeParam,
  } = await params;

  if (!isLocale(localeParam)) {
    notFound();
  }

  const locale: Locale =
    localeParam;

  const dictionary =
    getDictionary(locale);

  const content =
    privacyContent[locale];

  const isPersian =
    locale === "fa";

  const allSections =
    getAllSections(content);

  return (
    <>
      <Header
        locale={locale}
        dictionary={
          dictionary.header
        }
        common={
          dictionary.common
        }
      />

      <main
        id="main-content"
        className="
          bg-[#f4efe8]
          text-[#211f1c]
        "
      >
        <section
          className="
            overflow-hidden
            border-b
            border-[#302d29]/15
            bg-[#ebe4da]
          "
        >
          <div
            className="
              mx-auto
              max-w-[1480px]
              px-5
              py-16
              sm:px-8
              sm:py-20
              lg:px-12
              lg:py-24
              xl:px-16
            "
          >
            <div
              className="
                grid
                gap-10
                lg:grid-cols-[minmax(0,1fr)_minmax(300px,0.48fr)]
                lg:items-end
                lg:gap-16
              "
            >
              <div>
                <p
                  className={`
                    font-sans
                    font-semibold
                    text-[#8a672f]
                    ${
                      isPersian
                        ? "text-[11px] leading-6"
                        : "text-[10px] uppercase tracking-[0.3em]"
                    }
                  `}
                >
                  {content.eyebrow}
                </p>

                <h1
                  className={`
                    mt-5
                    max-w-[900px]
                    text-[#211f1c]
                    ${
                      isPersian
                        ? "font-sans text-[clamp(2.25rem,5vw,4.5rem)] font-[750] leading-[1.5]"
                        : "font-serif text-[clamp(3.4rem,6vw,6.4rem)] font-medium leading-[0.94] tracking-[-0.05em]"
                    }
                  `}
                >
                  <span>
                    {content.title}
                  </span>

                  <span
                    className={`
                      block
                      text-[#2e5d91]
                      ${
                        isPersian
                          ? "mt-1"
                          : "italic"
                      }
                    `}
                  >
                    {
                      content.highlightedTitle
                    }
                  </span>
                </h1>

                <p
                  className={`
                    mt-7
                    max-w-[820px]
                    font-sans
                    text-[#625d56]
                    ${
                      isPersian
                        ? "text-[16px] leading-[2.1] sm:text-[17px]"
                        : "text-[18px] leading-[2.05rem] lg:text-[19px]"
                    }
                  `}
                >
                  {
                    content.introduction
                  }
                </p>
              </div>

              <div
                className="
                  rounded-[28px]
                  border
                  border-[#302d29]/12
                  bg-[#f7f3ed]/70
                  p-6
                  shadow-[0_20px_50px_rgba(57,48,40,0.06)]
                  sm:p-7
                "
              >
                <p
                  className={`
                    font-sans
                    font-semibold
                    text-[#8a672f]
                    ${
                      isPersian
                        ? "text-[11px]"
                        : "text-[10px] uppercase tracking-[0.24em]"
                    }
                  `}
                >
                  {
                    content.updatedLabel
                  }
                </p>

                <p
                  className={`
                    mt-3
                    text-[#282521]
                    ${
                      isPersian
                        ? "font-sans text-[22px] font-[700]"
                        : "font-serif text-[30px] font-medium"
                    }
                  `}
                >
                  {
                    content.updatedDate
                  }
                </p>

                <div
                  className="
                    mt-6
                    border-t
                    border-[#302d29]/12
                    pt-5
                  "
                >
                  <p
                    className="
                      font-sans
                      text-[13px]
                      leading-6
                      text-[#716a61]
                    "
                  >
                    {
                      content.legalReviewNote
                    }
                  </p>
                </div>
              </div>
            </div>

            <div
              className="
                mt-12
                border-t
                border-[#302d29]/15
                pt-8
              "
            >
              <p
                className={`
                  font-sans
                  font-semibold
                  text-[#8a672f]
                  ${
                    isPersian
                      ? "text-[11px]"
                      : "text-[10px] uppercase tracking-[0.26em]"
                  }
                `}
              >
                {
                  content.quickFactsLabel
                }
              </p>

              <div
                className="
                  mt-5
                  grid
                  border
                  border-[#302d29]/12
                  bg-[#f7f3ed]/35
                  sm:grid-cols-3
                "
              >
                {content.quickFacts.map(
                  (item) => (
                    <div
                      key={
                        item.label
                      }
                      className="
                        min-w-0
                        border-b
                        border-[#302d29]/12
                        p-5
                        last:border-b-0
                        sm:border-b-0
                        sm:border-e
                        sm:last:border-e-0
                        sm:p-6
                      "
                    >
                      <p
                        className={`
                          font-sans
                          font-semibold
                          text-[#8a672f]
                          ${
                            isPersian
                              ? "text-[11px]"
                              : "text-[10px] uppercase tracking-[0.2em]"
                          }
                        `}
                      >
                        {item.label}
                      </p>

                      <p
                        dir="auto"
                        className={`
                          mt-3
                          break-words
                          font-sans
                          font-semibold
                          text-[#302b26]
                          ${
                            isPersian
                              ? "text-[14px] leading-7"
                              : "text-[14px] leading-6"
                          }
                        `}
                      >
                        {item.value}
                      </p>
                    </div>
                  )
                )}
              </div>
            </div>
          </div>
        </section>

        <section
          className="
            mx-auto
            grid
            max-w-[1280px]
            gap-12
            px-5
            py-16
            sm:px-8
            sm:py-20
            lg:grid-cols-[250px_minmax(0,1fr)]
            lg:gap-16
            lg:px-12
            lg:py-24
          "
        >
          <aside
            className="
              hidden
              lg:block
            "
          >
            <div
              className="
                sticky
                top-[116px]
                rounded-[24px]
                border
                border-[#302d29]/12
                bg-[#ebe4da]/55
                p-6
              "
            >
              <p
                className={`
                  font-sans
                  font-semibold
                  text-[#8a672f]
                  ${
                    isPersian
                      ? "text-[11px]"
                      : "text-[10px] uppercase tracking-[0.23em]"
                  }
                `}
              >
                {
                  content.navigationLabel
                }
              </p>

              <nav
                aria-label={
                  content.navigationLabel
                }
                className="mt-6"
              >
                <ol className="space-y-4">
                  {allSections.map(
                    (section) => (
                      <li
                        key={
                          section.id
                        }
                      >
                        <a
                          href={`#${section.id}`}
                          className="
                            group
                            grid
                            grid-cols-[34px_minmax(0,1fr)]
                            gap-2
                            font-sans
                            text-[12px]
                            leading-5
                            text-[#625d56]
                            transition-colors
                            hover:text-[#2e5d91]
                          "
                        >
                          <span
                            className="
                              text-[#9a9187]
                              transition-colors
                              group-hover:text-[#8a672f]
                            "
                          >
                            {
                              section.number
                            }
                          </span>

                          <span>
                            {
                              section.title
                            }
                          </span>
                        </a>
                      </li>
                    )
                  )}
                </ol>
              </nav>
            </div>
          </aside>

          <article className="min-w-0">
            {content.sectionsBeforeCookies.map(
              (section) => (
                <PolicySectionBlock
                  key={section.id}
                  section={section}
                  isPersian={
                    isPersian
                  }
                />
              )
            )}

            <section
              id={
                content.cookiesSection.id
              }
              aria-labelledby="cookies-heading"
              className="
                scroll-mt-[112px]
                border-b
                border-[#302d29]/15
                py-10
                sm:py-12
              "
            >
              <div
                className="
                  grid
                  gap-5
                  md:grid-cols-[64px_minmax(0,1fr)]
                  md:gap-8
                "
              >
                <span
                  aria-hidden="true"
                  className="
                    pt-1
                    font-sans
                    text-[11px]
                    font-semibold
                    tracking-[0.18em]
                    text-[#9a9187]
                  "
                >
                  {
                    content
                      .cookiesSection
                      .number
                  }
                </span>

                <div className="min-w-0">
                  <h2
                    id="cookies-heading"
                    className={`
                      max-w-[800px]
                      text-[#25211d]
                      ${
                        isPersian
                          ? "font-sans text-[clamp(1.45rem,3vw,2.15rem)] font-[700] leading-[1.65]"
                          : "font-serif text-[clamp(2rem,3.2vw,3rem)] font-medium leading-[1.08] tracking-[-0.035em]"
                      }
                    `}
                  >
                    {
                      content
                        .cookiesSection
                        .title
                    }
                  </h2>

                  <p
                    className={`
                      mt-6
                      max-w-[820px]
                      font-sans
                      text-[#625d56]
                      ${
                        isPersian
                          ? "text-[15px] leading-[2.15] sm:text-[16px]"
                          : "text-[16px] leading-[1.95] sm:text-[17px]"
                      }
                    `}
                  >
                    {
                      content
                        .cookiesSection
                        .introduction
                    }
                  </p>

                  <div
                    className="
                      mt-8
                      overflow-x-auto
                      rounded-[22px]
                      border
                      border-[#302d29]/12
                    "
                  >
                    <table
                      className="
                        min-w-[780px]
                        w-full
                        border-collapse
                        bg-[#f7f3ed]/55
                        text-start
                      "
                    >
                      <thead>
                        <tr
                          className="
                            border-b
                            border-[#302d29]/12
                            bg-[#e6ddd1]
                          "
                        >
                          {Object.values(
                            content
                              .cookiesSection
                              .headers
                          ).map(
                            (header) => (
                              <th
                                key={
                                  header
                                }
                                scope="col"
                                className="
                                  px-5
                                  py-4
                                  text-start
                                  font-sans
                                  text-[11px]
                                  font-semibold
                                  text-[#554f48]
                                "
                              >
                                {
                                  header
                                }
                              </th>
                            )
                          )}
                        </tr>
                      </thead>

                      <tbody>
                        {content.cookiesSection.rows.map(
                          (row) => (
                            <tr
                              key={
                                row.name
                              }
                              className="
                                border-b
                                border-[#302d29]/10
                                last:border-b-0
                              "
                            >
                              <td
                                dir="ltr"
                                className="
                                  px-5
                                  py-5
                                  text-start
                                  font-mono
                                  text-[12px]
                                  font-semibold
                                  text-[#183655]
                                "
                              >
                                {
                                  row.name
                                }
                              </td>

                              <td
                                className="
                                  px-5
                                  py-5
                                  font-sans
                                  text-[13px]
                                  leading-6
                                  text-[#514b45]
                                "
                              >
                                {
                                  row.type
                                }
                              </td>

                              <td
                                className="
                                  px-5
                                  py-5
                                  font-sans
                                  text-[13px]
                                  leading-6
                                  text-[#625d56]
                                "
                              >
                                {
                                  row.purpose
                                }
                              </td>

                              <td
                                className="
                                  px-5
                                  py-5
                                  font-sans
                                  text-[13px]
                                  leading-6
                                  text-[#625d56]
                                "
                              >
                                {
                                  row.duration
                                }
                              </td>
                            </tr>
                          )
                        )}
                      </tbody>
                    </table>
                  </div>

                  <p
                    className="
                      mt-5
                      border-s-2
                      border-[#b4853b]
                      ps-4
                      font-sans
                      text-[13px]
                      leading-7
                      text-[#716a61]
                    "
                  >
                    {
                      content
                        .cookiesSection
                        .note
                    }
                  </p>
                </div>
              </div>
            </section>

            {content.sectionsAfterCookies.map(
              (section) => (
                <PolicySectionBlock
                  key={section.id}
                  section={section}
                  isPersian={
                    isPersian
                  }
                />
              )
            )}

            <section
              className="
                mt-12
                rounded-[28px]
                border
                border-[#302d29]/12
                bg-[#ebe4da]
                p-6
                shadow-[0_20px_50px_rgba(57,48,40,0.06)]
                sm:p-8
              "
            >
              <p
                className={`
                  font-sans
                  font-semibold
                  text-[#8a672f]
                  ${
                    isPersian
                      ? "text-[11px]"
                      : "text-[10px] uppercase tracking-[0.23em]"
                  }
                `}
              >
                {
                  content
                    .googleInformationLabel
                }
              </p>

              <p
                className={`
                  mt-4
                  max-w-[760px]
                  font-sans
                  text-[#5f5952]
                  ${
                    isPersian
                      ? "text-[15px] leading-8"
                      : "text-[16px] leading-7"
                  }
                `}
              >
                {
                  content
                    .googleInformationText
                }
              </p>

              <a
                href="https://support.google.com/analytics/answer/6004245"
                target="_blank"
                rel="noreferrer"
                className="
                  mt-6
                  inline-flex
                  min-h-[46px]
                  items-center
                  justify-center
                  rounded-full
                  border
                  border-[#183655]
                  bg-[#183655]
                  px-6
                  font-sans
                  text-[12px]
                  font-semibold
                  text-white
                  transition-all
                  hover:-translate-y-0.5
                  hover:border-[#2e5d91]
                  hover:bg-[#2e5d91]
                  focus-visible:outline-none
                  focus-visible:ring-4
                  focus-visible:ring-[#2e5d91]/20
                "
              >
                {
                  content
                    .googlePrivacyLabel
                }
              </a>
            </section>

            <section
              className="
                mt-8
                rounded-[28px]
                border
                border-[#183655]/16
                bg-[#183655]
                p-6
                text-white
                shadow-[0_22px_55px_rgba(24,54,85,0.2)]
                sm:p-8
              "
            >
              <h2
                className={`
                  text-white
                  ${
                    isPersian
                      ? "font-sans text-[24px] font-[700] leading-[1.7]"
                      : "font-serif text-[34px] font-medium"
                  }
                `}
              >
                {
                  content.contactTitle
                }
              </h2>

              <p
                className={`
                  mt-4
                  max-w-[760px]
                  font-sans
                  text-white/78
                  ${
                    isPersian
                      ? "text-[15px] leading-8"
                      : "text-[16px] leading-7"
                  }
                `}
              >
                {
                  content
                    .contactDescription
                }
              </p>

              <a
                href={`mailto:${legalEmail}`}
                dir="ltr"
                className="
                  mt-6
                  inline-flex
                  min-h-[48px]
                  max-w-full
                  items-center
                  rounded-full
                  border
                  border-white/25
                  bg-white/10
                  px-5
                  font-sans
                  text-[13px]
                  font-semibold
                  text-white
                  transition-all
                  hover:border-white
                  hover:bg-white
                  hover:text-[#183655]
                  focus-visible:outline-none
                  focus-visible:ring-4
                  focus-visible:ring-white/20
                "
              >
                <span className="break-all">
                  {legalEmail}
                </span>
              </a>

              <p
                className="
                  mt-5
                  max-w-[760px]
                  font-sans
                  text-[12px]
                  leading-6
                  text-white/65
                "
              >
                {
                  content
                    .contactRestriction
                }
              </p>

              <div
                className="
                  mt-7
                  border-t
                  border-white/15
                  pt-6
                "
              >
                <a
                  href={`/${locale}/terms`}
                  className="
                    font-sans
                    text-[12px]
                    font-semibold
                    text-white
                    underline
                    decoration-white/40
                    underline-offset-4
                    transition-colors
                    hover:text-white/75
                  "
                >
                  {
                    content.termsLabel
                  }
                </a>
              </div>
            </section>
          </article>
        </section>
      </main>

      <Footer
        locale={locale}
        dictionary={
          dictionary.footer
        }
        common={
          dictionary.common
        }
      />
    </>
  );
}
import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";

import Header from "@/components/Header";
import Footer from "@/components/sections/Footer";

import {
  isLocale,
  type Locale,
} from "@/i18n/config";

import {
  getDictionary,
  type Dictionary,
} from "@/i18n/get-dictionary";

const siteUrl =
  "https://setarehsalehabadi.com";

const legalEmail =
  "salehabadi.setareh@gmail.com";

type TermsPageProps = {
  params: Promise<{
    locale: string;
  }>;
};

type TermsSection = {
  title: string;
  paragraphs: string[];
  bullets?: string[];
};

type TermsPageContent = {
  metadataTitle: string;
  metadataDescription: string;

  homeLabel: string;
  pageLabel: string;

  eyebrow: string;

  title: {
    first: string;
    highlighted: string;
  };

  introduction: string;

  lastUpdatedLabel: string;
  lastUpdated: string;

  status: {
    label: string;
    title: string;
    description: string;
    items: string[];
  };

  contentsLabel: string;

  sections: TermsSection[];

  contact: {
    eyebrow: string;
    title: string;
    description: string;
    emailLabel: string;
    limitation: string;
  };

  notice: string;
};

const pageContent: Record<
  Locale,
  TermsPageContent
> = {
  en: {
    metadataTitle:
      "Terms of Use | Setareh Salehabadi",

    metadataDescription:
      "Terms governing access to and use of setarehsalehabadi.com, including website content, intellectual property, planned educational products and future payment services.",

    homeLabel: "Home",
    pageLabel: "Terms of Use",

    eyebrow:
      "Website terms",

    title: {
      first:
        "Clear conditions for",
      highlighted:
        "using this website and its content",
    },

    introduction:
      "These terms govern access to and use of setarehsalehabadi.com. The website currently provides informational, research, portfolio and educational-planning content. No paid course, checkout, user account or active subscription service is currently available.",

    lastUpdatedLabel:
      "Last updated",

    lastUpdated:
      "22 July 2026",

    status: {
      label:
        "Current service status",

      title:
        "An informational website without active sales",

      description:
        "Viewing the current website does not create a purchase, coaching, consulting, employment or project-support relationship.",

      items: [
        "No active paid course",
        "No active checkout",
        "No active user account",
        "No promised direct support",
      ],
    },

    contentsLabel:
      "Terms sections",

    sections: [
      {
        title:
          "Acceptance of these terms",

        paragraphs: [
          "By accessing or using this website, you agree to use it in accordance with these terms and applicable law.",

          "If you do not agree with these terms, you should stop using the website. These terms apply only to the current website and do not replace any separate written agreement that may later apply to a specific product or transaction.",
        ],
      },

      {
        title:
          "Website owner",

        paragraphs: [
          "This website is operated by Setareh Salehabadi as an individual website owner based in Iran.",

          "Legal questions concerning these terms may be sent to salehabadi.setareh@gmail.com. This address is not presented as a general coaching, project-support or customer-service channel.",
        ],
      },

      {
        title:
          "Current purpose of the website",

        paragraphs: [
          "The current website presents professional information, selected projects, research themes, strategic frameworks and information about planned self-guided educational resources.",

          "Content published on the website is provided for general informational and educational purposes. It does not create an obligation to provide consulting, implementation, coaching, personal feedback or ongoing support.",
        ],
      },

      {
        title:
          "No professional advice",

        paragraphs: [
          "Website content should not be treated as legal, financial, tax, medical or other regulated professional advice.",

          "Business, marketing, SEO, analytics, consumer-behavior and artificial-intelligence content is general in nature. Decisions should be evaluated according to the circumstances, available evidence, applicable law and appropriate professional advice where necessary.",
        ],
      },

      {
        title:
          "No guaranteed results",

        paragraphs: [
          "No article, framework, project example or future educational resource guarantees traffic growth, rankings, revenue, conversion, employment, business success or any other specific result.",

          "Past project outcomes do not guarantee similar results in another context. Results may depend on market conditions, competition, resources, implementation quality, technical limitations, customer behavior and external platforms.",
        ],
      },

      {
        title:
          "Accuracy and updates",

        paragraphs: [
          "Reasonable care may be taken to present accurate and useful information, but the website does not guarantee that every item will always be complete, current or free from error.",

          "Search engines, digital platforms, software, regulations, pricing and industry practices can change. Users should verify time-sensitive information before relying on it.",

          "Content may be corrected, expanded, replaced or removed without prior notice.",
        ],
      },

      {
        title:
          "Intellectual property",

        paragraphs: [
          "Unless otherwise stated, original text, research summaries, frameworks, page designs, graphics, educational structures, downloadable resources and other original materials on this website belong to Setareh Salehabadi or are used with appropriate permission.",

          "Access to the website does not transfer ownership of its content or grant permission to reproduce, distribute, sell, publish, translate, modify or commercially exploit it except as expressly permitted.",
        ],
      },

      {
        title:
          "Permitted personal use",

        paragraphs: [
          "Visitors may read and use publicly available content for lawful personal, educational or internal business reference.",

          "A short quotation may be used where permitted by law, provided that the quotation is accurate, limited, properly attributed and does not suggest endorsement or partnership.",
        ],

        bullets: [
          "Reading public pages",
          "Saving ordinary browser bookmarks",
          "Sharing a direct link to a public page",
          "Using limited quotations with clear attribution",
        ],
      },

      {
        title:
          "Prohibited use",

        paragraphs: [
          "The website and its content must not be used unlawfully, deceptively, abusively or in a way that harms the website, its owner, other users or third parties.",
        ],

        bullets: [
          "Copying or republishing substantial content without permission",
          "Selling, sublicensing or redistributing educational materials",
          "Removing copyright, attribution or ownership notices",
          "Presenting website content as another person’s original work",
          "Attempting unauthorised access to systems or accounts",
          "Introducing malware, automated abuse or disruptive code",
          "Using the website for fraud, impersonation or misleading claims",
          "Using automated extraction in a way that damages the service or violates applicable law",
        ],
      },

      {
        title:
          "Artificial intelligence and automated use",

        paragraphs: [
          "Website content may not be copied in bulk for unauthorised model training, commercial dataset creation, automated republishing or the production of derivative paid products.",

          "Ordinary search-engine indexing and lawful accessibility tools are not prohibited. Any broader automated use should respect technical restrictions, intellectual-property rights, attribution requirements and applicable law.",
        ],
      },

      {
        title:
          "External links and third-party services",

        paragraphs: [
          "The website may link to external sources, research, platforms, software or third-party services for reference.",

          "External websites are controlled by their own operators. Their availability, security, accuracy, privacy practices, pricing and terms are not controlled or guaranteed by this website.",

          "A link does not automatically constitute endorsement, partnership or responsibility for the external service.",
        ],
      },

      {
        title:
          "Future educational products",

        paragraphs: [
          "The website may later offer self-guided courses, downloadable files, templates or other digital learning resources.",

          "Future educational products are intended to be used independently. Unless a product page expressly states otherwise, a purchase will not include live teaching, coaching, project review, personal feedback, consultation, recurring meetings or direct instructional support.",

          "The content, format, language, access period, technical requirements and included files of each product will be described on its product page before purchase.",
        ],
      },

      {
        title:
          "Formation of a future purchase",

        paragraphs: [
          "No purchase contract is currently available through this website because no checkout or paid product is active.",

          "When sales become active, a purchase will be formed only after the buyer receives clear product information, accepts the applicable terms, completes the required payment process and receives confirmation through the website or payment provider.",

          "Placing an item in a future cart or beginning payment will not by itself guarantee acceptance where payment fails, the product is unavailable, the transaction is unlawful or additional verification is reasonably required.",
        ],
      },

      {
        title:
          "Future prices, currencies and payments",

        paragraphs: [
          "Future products may support Iranian and international payment methods. Available currencies, payment providers, taxes, fees and exchange-rate treatment will be shown before payment where applicable.",

          "Payment processing may be performed by third-party providers. Buyers may also be subject to the provider’s terms, technical limitations and verification requirements.",

          "The website owner does not intend to directly store complete bank-card credentials.",
        ],
      },

      {
        title:
          "Future digital delivery",

        paragraphs: [
          "When digital products become active, the applicable product page will explain whether access is provided by download, account access, email delivery or another automated method.",

          "The buyer will be responsible for providing accurate information, maintaining access to the stated email address and using a compatible device and software.",

          "Delivery times, download limits, access duration and technical requirements will be stated before purchase where relevant.",
        ],
      },

      {
        title:
          "Future cancellation and refund terms",

        paragraphs: [
          "No active refund or cancellation policy currently applies because no paid product is being sold.",

          "Before sales begin, each product or checkout flow will provide the applicable cancellation, withdrawal and refund terms in a clear form. Those terms will take account of the product format, delivery status, applicable mandatory law and the consumer’s non-waivable rights.",

          "Nothing in these terms is intended to remove a consumer right that cannot lawfully be excluded.",
        ],
      },

      {
        title:
          "Future accounts and access credentials",

        paragraphs: [
          "User accounts are not currently active.",

          "If accounts are introduced later, users will be responsible for accurate registration information, reasonable password security and activity carried out through their credentials.",

          "Access may be suspended where reasonably necessary for security, non-payment, unlawful conduct, unauthorised sharing or a material violation of applicable terms.",
        ],
      },

      {
        title:
          "User responsibilities",

        paragraphs: [
          "Users are responsible for deciding whether website content or a future product is suitable for their goals, level of knowledge, technical environment and legal context.",

          "Users are also responsible for their own implementation decisions, data, backups, accounts, advertising spend, software configuration and compliance obligations.",
        ],
      },

      {
        title:
          "Availability and technical changes",

        paragraphs: [
          "The website may be temporarily unavailable because of maintenance, hosting problems, security measures, updates, technical failure or events outside reasonable control.",

          "Features, routes, files, interfaces and third-party integrations may be changed, limited or discontinued where reasonably necessary.",
        ],
      },

      {
        title:
          "Limitation of responsibility",

        paragraphs: [
          "To the extent permitted by applicable law, the website owner is not responsible for indirect losses, lost profits, lost rankings, lost data, business interruption or decisions made solely in reliance on general website content.",

          "This limitation does not exclude responsibility that cannot legally be excluded, including mandatory consumer protections or responsibility arising from intentional misconduct where applicable.",
        ],
      },

      {
        title:
          "Governing law and disputes",

        paragraphs: [
          "These terms are governed by the laws of the Islamic Republic of Iran, subject to any mandatory rights that may apply to a consumer in another jurisdiction.",

          "The parties should first attempt to resolve a concern through clear written communication. Where a dispute cannot be resolved, it may be referred to a court or competent authority with jurisdiction under applicable law.",
        ],
      },

      {
        title:
          "Changes to these terms",

        paragraphs: [
          "These terms may be updated when the website introduces paid products, Iranian or international payments, accounts, downloads, subscriptions or additional services.",

          "The revised version and update date will be published on this page. Material transactional changes should be presented before they apply to a new purchase.",
        ],
      },
    ],

    contact: {
      eyebrow:
        "Legal questions",

      title:
        "Questions about these website terms",

      description:
        "Use the address below for legal questions concerning these terms, intellectual-property concerns or a formal notice related to the website.",

      emailLabel:
        "Send a legal request",

      limitation:
        "This email is not offered as a channel for coaching, project delivery, educational support or general customer service.",
    },

    notice:
      "These terms describe the website before active sales begin. They should be reviewed and updated before launching paid products, Iranian or international checkout, user accounts or subscription services.",
  },

  de: {
    metadataTitle:
      "Nutzungsbedingungen | Setareh Salehabadi",

    metadataDescription:
      "Bedingungen für die Nutzung von setarehsalehabadi.com, einschließlich Website-Inhalten, geistigem Eigentum, geplanten Lernprodukten und zukünftigen Zahlungen.",

    homeLabel: "Startseite",
    pageLabel: "Nutzungsbedingungen",

    eyebrow:
      "Bedingungen der Website",

    title: {
      first:
        "Klare Bedingungen für",
      highlighted:
        "die Nutzung dieser Website und ihrer Inhalte",
    },

    introduction:
      "Diese Bedingungen regeln den Zugriff auf setarehsalehabadi.com und dessen Nutzung. Die Website bietet derzeit Informationen, Forschung, Portfolio-Inhalte und Hinweise zu geplanten Lernressourcen. Kostenpflichtige Kurse, Checkout, Benutzerkonten oder Abonnements sind noch nicht aktiv.",

    lastUpdatedLabel:
      "Letzte Aktualisierung",

    lastUpdated:
      "22. Juli 2026",

    status: {
      label:
        "Aktueller Servicestatus",

      title:
        "Informationswebsite ohne aktiven Verkauf",

      description:
        "Das Aufrufen der aktuellen Website begründet keinen Kauf-, Beratungs-, Coaching-, Arbeits- oder Projektbetreuungsvertrag.",

      items: [
        "Kein aktiver kostenpflichtiger Kurs",
        "Kein aktiver Checkout",
        "Kein aktives Benutzerkonto",
        "Keine zugesagte direkte Betreuung",
      ],
    },

    contentsLabel:
      "Abschnitte der Bedingungen",

    sections: [
      {
        title:
          "Annahme dieser Bedingungen",

        paragraphs: [
          "Durch den Zugriff auf diese Website erklären Sie sich damit einverstanden, sie gemäß diesen Bedingungen und dem anwendbaren Recht zu nutzen.",

          "Wenn Sie nicht einverstanden sind, sollten Sie die Nutzung beenden. Separate schriftliche Bedingungen eines zukünftigen Produkts oder einer Transaktion bleiben vorrangig.",
        ],
      },

      {
        title:
          "Betreiber der Website",

        paragraphs: [
          "Diese Website wird von Setareh Salehabadi als persönlicher Websitebetreiber mit Sitz im Iran betrieben.",

          "Rechtliche Fragen können an salehabadi.setareh@gmail.com gesendet werden. Diese Adresse ist kein allgemeiner Coaching-, Projekt- oder Supportkanal.",
        ],
      },

      {
        title:
          "Aktueller Zweck der Website",

        paragraphs: [
          "Die Website stellt berufliche Informationen, ausgewählte Projekte, Forschungsthemen, strategische Frameworks und Informationen zu geplanten selbstständigen Lernressourcen bereit.",

          "Die Inhalte dienen allgemeinen Informations- und Lernzwecken und begründen keine Pflicht zu Beratung, Umsetzung, Coaching, persönlichem Feedback oder laufender Betreuung.",
        ],
      },

      {
        title:
          "Keine regulierte Fachberatung",

        paragraphs: [
          "Die Inhalte sind keine Rechts-, Finanz-, Steuer-, Medizin- oder sonstige regulierte Fachberatung.",

          "Geschäftliche und technische Entscheidungen sollten anhand der individuellen Situation, aktueller Belege, geltenden Rechts und gegebenenfalls qualifizierter Beratung bewertet werden.",
        ],
      },

      {
        title:
          "Keine Ergebnisgarantie",

        paragraphs: [
          "Artikel, Frameworks, Projektbeispiele und zukünftige Lernressourcen garantieren keine Rankings, Umsätze, Conversions, Beschäftigung oder sonstigen Ergebnisse.",

          "Frühere Ergebnisse sind nicht automatisch auf andere Situationen übertragbar.",
        ],
      },

      {
        title:
          "Richtigkeit und Aktualisierung",

        paragraphs: [
          "Die Website bemüht sich um nützliche und korrekte Informationen, garantiert jedoch nicht, dass alle Inhalte jederzeit vollständig, aktuell oder fehlerfrei sind.",

          "Suchmaschinen, Plattformen, Software, Vorschriften und Branchenpraktiken können sich ändern. Zeitkritische Informationen sollten vor der Nutzung geprüft werden.",
        ],
      },

      {
        title:
          "Geistiges Eigentum",

        paragraphs: [
          "Soweit nicht anders angegeben, gehören originale Texte, Frameworks, Designs, Grafiken und Lernmaterialien Setareh Salehabadi oder werden mit entsprechender Erlaubnis verwendet.",

          "Der Zugriff überträgt kein Eigentum und erlaubt keine unerlaubte Vervielfältigung, Veröffentlichung, Übersetzung, Veränderung oder kommerzielle Nutzung.",
        ],
      },

      {
        title:
          "Zulässige persönliche Nutzung",

        paragraphs: [
          "Öffentlich zugängliche Inhalte dürfen rechtmäßig für persönliche, pädagogische oder interne geschäftliche Zwecke gelesen und verwendet werden.",

          "Kurze Zitate sind im gesetzlich zulässigen Rahmen mit korrekter Quellenangabe möglich.",
        ],

        bullets: [
          "Öffentliche Seiten lesen",
          "Browser-Lesezeichen speichern",
          "Direkte Links teilen",
          "Begrenzte Zitate mit Quellenangabe verwenden",
        ],
      },

      {
        title:
          "Unzulässige Nutzung",

        paragraphs: [
          "Die Website darf nicht rechtswidrig, irreführend, missbräuchlich oder schädlich verwendet werden.",
        ],

        bullets: [
          "Umfangreiche Inhalte ohne Erlaubnis kopieren",
          "Lernmaterialien verkaufen oder weiterverteilen",
          "Urheber- oder Herkunftshinweise entfernen",
          "Inhalte als eigene Originalarbeit ausgeben",
          "Unbefugten Systemzugang versuchen",
          "Schadsoftware oder störenden Code übertragen",
          "Betrug, Identitätstäuschung oder irreführende Aussagen",
          "Schädliche oder rechtswidrige automatisierte Extraktion",
        ],
      },

      {
        title:
          "Künstliche Intelligenz und automatisierte Nutzung",

        paragraphs: [
          "Inhalte dürfen nicht ohne Erlaubnis massenhaft für Modelltraining, kommerzielle Datensätze, automatische Wiederveröffentlichung oder abgeleitete kostenpflichtige Produkte kopiert werden.",

          "Gewöhnliche Suchmaschinenindexierung und rechtmäßige Hilfstechnologien bleiben zulässig.",
        ],
      },

      {
        title:
          "Externe Links und Dienste",

        paragraphs: [
          "Die Website kann auf externe Forschung, Plattformen, Software oder Dienste verweisen.",

          "Für Verfügbarkeit, Sicherheit, Richtigkeit, Datenschutz, Preise oder Bedingungen externer Anbieter wird keine Kontrolle oder Garantie übernommen.",
        ],
      },

      {
        title:
          "Zukünftige Lernprodukte",

        paragraphs: [
          "Später können selbstständige Kurse, Downloads, Vorlagen oder digitale Lernressourcen angeboten werden.",

          "Soweit eine Produktseite nichts anderes ausdrücklich erklärt, umfasst ein Kauf keinen Live-Unterricht, kein Coaching, keine Projektprüfung, kein persönliches Feedback und keine laufende Betreuung.",

          "Umfang, Format, Sprache, Zugang und enthaltene Dateien werden vor dem Kauf beschrieben.",
        ],
      },

      {
        title:
          "Zustandekommen eines zukünftigen Kaufs",

        paragraphs: [
          "Derzeit kann kein Kaufvertrag abgeschlossen werden, da kein aktiver Checkout oder kostenpflichtiges Produkt besteht.",

          "Nach Aktivierung kommt ein Kauf erst nach klarer Produktinformation, Annahme der Bedingungen, erfolgreicher Zahlung und Bestätigung zustande.",
        ],
      },

      {
        title:
          "Zukünftige Preise und Zahlungen",

        paragraphs: [
          "Zukünftige Produkte können iranische und internationale Zahlungsmethoden unterstützen.",

          "Währung, Preis, Gebühren, Steuern und Zahlungsanbieter werden vor der Zahlung angezeigt, soweit sie anwendbar sind.",

          "Vollständige Kartendaten sollen nicht direkt durch den Websitebetreiber gespeichert werden.",
        ],
      },

      {
        title:
          "Zukünftige digitale Bereitstellung",

        paragraphs: [
          "Die jeweilige Produktseite wird erklären, ob Dateien per Download, Benutzerkonto, E-Mail oder auf andere Weise bereitgestellt werden.",

          "Käufer sind für korrekte Angaben, den Zugang zur angegebenen E-Mail-Adresse und kompatible Geräte verantwortlich.",
        ],
      },

      {
        title:
          "Zukünftige Stornierungs- und Erstattungsbedingungen",

        paragraphs: [
          "Derzeit gilt keine aktive Erstattungsregel, da keine kostenpflichtigen Produkte verkauft werden.",

          "Vor Verkaufsbeginn werden die anwendbaren Stornierungs-, Widerrufs- und Erstattungsbedingungen klar dargestellt.",

          "Zwingende Verbraucherrechte werden durch diese Bedingungen nicht ausgeschlossen.",
        ],
      },

      {
        title:
          "Zukünftige Benutzerkonten",

        paragraphs: [
          "Benutzerkonten sind derzeit nicht aktiv.",

          "Werden sie eingeführt, sind Nutzer für korrekte Angaben, sichere Zugangsdaten und die Nutzung ihrer Konten verantwortlich.",
        ],
      },

      {
        title:
          "Verantwortung der Nutzer",

        paragraphs: [
          "Nutzer müssen selbst beurteilen, ob Inhalte oder zukünftige Produkte für ihre Ziele, Kenntnisse, Technik und rechtlichen Anforderungen geeignet sind.",

          "Die Verantwortung für Umsetzung, Daten, Sicherungen, Konten, Werbeausgaben und Konfiguration bleibt beim Nutzer.",
        ],
      },

      {
        title:
          "Verfügbarkeit und technische Änderungen",

        paragraphs: [
          "Die Website kann wegen Wartung, Hostingproblemen, Sicherheitsmaßnahmen, Updates oder technischen Fehlern zeitweise nicht verfügbar sein.",

          "Funktionen, Routen, Dateien und Integrationen können geändert oder eingestellt werden.",
        ],
      },

      {
        title:
          "Haftungsbegrenzung",

        paragraphs: [
          "Soweit gesetzlich zulässig, besteht keine Haftung für indirekte Schäden, entgangenen Gewinn, verlorene Rankings, Datenverlust oder Entscheidungen, die ausschließlich auf allgemeinen Website-Inhalten beruhen.",

          "Zwingende gesetzliche Haftung und Verbraucherrechte bleiben unberührt.",
        ],
      },

      {
        title:
          "Anwendbares Recht und Streitigkeiten",

        paragraphs: [
          "Diese Bedingungen unterliegen dem Recht der Islamischen Republik Iran, vorbehaltlich zwingender Verbraucherrechte anderer Rechtsordnungen.",

          "Bedenken sollten zunächst schriftlich geklärt werden. Nicht lösbare Streitigkeiten können einer zuständigen Behörde oder einem zuständigen Gericht vorgelegt werden.",
        ],
      },

      {
        title:
          "Änderungen dieser Bedingungen",

        paragraphs: [
          "Diese Bedingungen können bei Einführung von Zahlungen, Konten, Downloads, Abonnements oder weiteren Diensten aktualisiert werden.",

          "Die neue Fassung und das Aktualisierungsdatum werden auf dieser Seite veröffentlicht.",
        ],
      },
    ],

    contact: {
      eyebrow:
        "Rechtliche Fragen",

      title:
        "Fragen zu diesen Nutzungsbedingungen",

      description:
        "Verwenden Sie die folgende Adresse für rechtliche Fragen, Hinweise zum geistigen Eigentum oder formelle Mitteilungen zur Website.",

      emailLabel:
        "Rechtliche Anfrage senden",

      limitation:
        "Diese Adresse ist kein Kanal für Coaching, Projektbetreuung, Lernsupport oder allgemeinen Kundenservice.",
    },

    notice:
      "Diese Bedingungen beschreiben die Website vor Beginn aktiver Verkäufe. Vor der Einführung von Zahlungen, Konten oder kostenpflichtigen Produkten ist eine erneute rechtliche Prüfung erforderlich.",
  },

  fa: {
    metadataTitle:
      "شرایط استفاده از وب‌سایت | ستاره صالح‌آبادی",

    metadataDescription:
      "شرایط دسترسی و استفاده از setarehsalehabadi.com، شامل محتوای سایت، مالکیت فکری، محصولات آموزشی آینده و خدمات پرداخت ایرانی و بین‌المللی.",

    homeLabel: "صفحه اصلی",
    pageLabel: "شرایط استفاده",

    eyebrow:
      "شرایط استفاده از وب‌سایت",

    title: {
      first:
        "شرایطی روشن برای",
      highlighted:
        "استفاده از وب‌سایت و محتوای آن",
    },

    introduction:
      "این شرایط، دسترسی و استفاده از setarehsalehabadi.com را تنظیم می‌کند. وب‌سایت در حال حاضر محتوای اطلاعاتی، پژوهشی، نمونه‌پروژه و توضیحات مربوط به منابع آموزشی برنامه‌ریزی‌شده ارائه می‌دهد و هنوز دوره پولی، حساب کاربری، اشتراک یا فرایند پرداخت فعالی ندارد.",

    lastUpdatedLabel:
      "آخرین به‌روزرسانی",

    lastUpdated:
      "۳۱ تیر ۱۴۰۵",

    status: {
      label:
        "وضعیت فعلی خدمات",

      title:
        "وب‌سایت اطلاعاتی بدون فروش فعال",

      description:
        "مشاهده نسخه فعلی وب‌سایت به‌تنهایی رابطه خرید، مشاوره، کوچینگ، استخدام، اجرای پروژه یا پشتیبانی مستقیم ایجاد نمی‌کند.",

      items: [
        "بدون دوره پولی فعال",
        "بدون فرایند پرداخت فعال",
        "بدون حساب کاربری فعال",
        "بدون تعهد پشتیبانی مستقیم",
      ],
    },

    contentsLabel:
      "بخش‌های شرایط استفاده",

    sections: [
      {
        title:
          "پذیرش این شرایط",

        paragraphs: [
          "با دسترسی یا استفاده از این وب‌سایت، می‌پذیرید که آن را مطابق این شرایط و قوانین قابل‌اعمال استفاده کنید.",

          "در صورت نپذیرفتن این شرایط، باید استفاده از وب‌سایت را متوقف کنید. شرایط جداگانه‌ای که در آینده برای یک محصول یا تراکنش مشخص ارائه می‌شوند، بر همان محصول یا تراکنش حاکم خواهند بود.",
        ],
      },

      {
        title:
          "مالک و اداره‌کننده وب‌سایت",

        paragraphs: [
          "این وب‌سایت توسط ستاره صالح‌آبادی، به‌عنوان مالک شخصی وب‌سایت و مستقر در ایران، اداره می‌شود.",

          "پرسش‌های حقوقی مربوط به این شرایط را می‌توان به salehabadi.setareh@gmail.com ارسال کرد. این نشانی به‌عنوان مسیر عمومی کوچینگ، اجرای پروژه یا پشتیبانی ارائه نشده است.",
        ],
      },

      {
        title:
          "هدف فعلی وب‌سایت",

        paragraphs: [
          "نسخه فعلی وب‌سایت اطلاعات حرفه‌ای، پروژه‌های منتخب، موضوعات پژوهشی، چارچوب‌های استراتژیک و توضیحات مربوط به منابع آموزشی خودآموز آینده را ارائه می‌دهد.",

          "محتوای سایت برای اطلاع‌رسانی و آموزش عمومی است و تعهدی برای ارائه مشاوره، اجرا، کوچینگ، بررسی پروژه، بازخورد شخصی یا پشتیبانی مستمر ایجاد نمی‌کند.",
        ],
      },

      {
        title:
          "محتوا جایگزین مشاوره تخصصی نیست",

        paragraphs: [
          "محتوای وب‌سایت نباید به‌عنوان مشاوره حقوقی، مالی، مالیاتی، پزشکی یا سایر خدمات تخصصی تحت نظارت تلقی شود.",

          "تصمیم‌های کسب‌وکار، بازاریابی، سئو، داده، رفتار مصرف‌کننده و هوش مصنوعی باید براساس شرایط واقعی، شواهد موجود، قوانین مربوط و در صورت نیاز نظر متخصص واجدصلاحیت ارزیابی شوند.",
        ],
      },

      {
        title:
          "نبود تضمین نتیجه",

        paragraphs: [
          "هیچ مقاله، چارچوب، نمونه پروژه یا محصول آموزشی آینده، افزایش رتبه، ترافیک، درآمد، فروش، نرخ تبدیل، استخدام یا موفقیت مشخصی را تضمین نمی‌کند.",

          "نتایج گذشته در یک پروژه، تضمین‌کننده نتیجه مشابه در شرایط دیگر نیستند. نتیجه ممکن است به بازار، رقابت، منابع، کیفیت اجرا، محدودیت‌های فنی، رفتار مشتری و پلتفرم‌های خارجی وابسته باشد.",
        ],
      },

      {
        title:
          "دقت و به‌روزرسانی اطلاعات",

        paragraphs: [
          "برای ارائه اطلاعات دقیق و کاربردی تلاش می‌شود، اما کامل، به‌روز یا بدون خطابودن دائمی تمام مطالب تضمین نمی‌شود.",

          "موتورهای جست‌وجو، پلتفرم‌ها، نرم‌افزارها، مقررات، قیمت‌ها و روش‌های صنعت تغییر می‌کنند. اطلاعات حساس به زمان باید پیش از استفاده دوباره بررسی شوند.",

          "مطالب ممکن است بدون اطلاع قبلی اصلاح، تکمیل، جایگزین یا حذف شوند.",
        ],
      },

      {
        title:
          "مالکیت فکری",

        paragraphs: [
          "مگر آنکه خلاف آن اعلام شده باشد، متن‌های اصلی، خلاصه‌های پژوهشی، چارچوب‌ها، طراحی صفحات، گرافیک‌ها، ساختارهای آموزشی و منابع تولیدشده در این وب‌سایت متعلق به ستاره صالح‌آبادی هستند یا با اجازه مناسب استفاده شده‌اند.",

          "دسترسی به وب‌سایت، مالکیت محتوا را منتقل نمی‌کند و مجوز تکثیر، انتشار، فروش، ترجمه، تغییر یا بهره‌برداری تجاری از آن را ایجاد نمی‌کند.",
        ],
      },

      {
        title:
          "استفاده شخصی مجاز",

        paragraphs: [
          "بازدیدکنندگان می‌توانند محتوای عمومی سایت را برای استفاده قانونی شخصی، آموزشی یا ارجاع داخلی کسب‌وکار مطالعه کنند.",

          "استفاده از نقل‌قول کوتاه در حدود مجاز قانونی، با انتساب روشن و بدون ایجاد تصور همکاری یا تأیید رسمی امکان‌پذیر است.",
        ],

        bullets: [
          "مطالعه صفحات عمومی",
          "ذخیره نشانی صفحات در مرورگر",
          "اشتراک‌گذاری لینک مستقیم صفحه",
          "استفاده از نقل‌قول محدود همراه با ذکر منبع",
        ],
      },

      {
        title:
          "استفاده‌های ممنوع",

        paragraphs: [
          "وب‌سایت و محتوای آن نباید به‌صورت غیرقانونی، فریبنده، مخرب یا به‌شکلی استفاده شوند که به سایت، مالک آن، کاربران یا اشخاص ثالث آسیب وارد کند.",
        ],

        bullets: [
          "کپی یا بازنشر بخش قابل‌توجهی از محتوا بدون اجازه",
          "فروش یا توزیع مجدد منابع آموزشی",
          "حذف نشانه‌های مالکیت یا انتساب",
          "معرفی محتوا به‌عنوان اثر اصلی شخص دیگر",
          "تلاش برای دسترسی غیرمجاز به سیستم‌ها",
          "انتقال بدافزار یا کد مخرب",
          "استفاده برای تقلب، جعل هویت یا ادعای گمراه‌کننده",
          "استخراج خودکار مخرب یا مغایر قانون",
        ],
      },

      {
        title:
          "هوش مصنوعی و استفاده خودکار",

        paragraphs: [
          "کپی انبوه محتوا برای آموزش بدون‌اجازه مدل، ساخت دیتاست تجاری، بازنشر خودکار یا تولید محصولات پولی مشتق‌شده مجاز نیست.",

          "ایندکس معمول موتورهای جست‌وجو و ابزارهای قانونی دسترس‌پذیری ممنوع نیستند. استفاده خودکار گسترده باید محدودیت‌های فنی، حقوق مالکیت فکری و قوانین قابل‌اعمال را رعایت کند.",
        ],
      },

      {
        title:
          "لینک‌ها و خدمات اشخاص ثالث",

        paragraphs: [
          "وب‌سایت ممکن است برای ارجاع به پژوهش، پلتفرم، نرم‌افزار یا خدمات بیرونی لینک دهد.",

          "وب‌سایت‌های بیرونی توسط اپراتورهای خود اداره می‌شوند و دسترسی، امنیت، دقت، سیاست حریم خصوصی، قیمت و شرایط آن‌ها تحت کنترل این وب‌سایت نیست.",

          "وجود لینک به‌معنای تأیید رسمی، شراکت یا پذیرش مسئولیت خدمات بیرونی نیست.",
        ],
      },

      {
        title:
          "محصولات آموزشی آینده",

        paragraphs: [
          "در آینده ممکن است دوره‌های خودآموز، فایل‌های قابل‌دریافت، قالب‌ها یا سایر منابع آموزشی دیجیتال ارائه شوند.",

          "مگر آنکه صفحه محصول صریحاً خلاف آن را اعلام کند، خرید شامل تدریس زنده، کوچینگ، بررسی پروژه، بازخورد شخصی، مشاوره، جلسات مداوم یا پشتیبانی آموزشی مستقیم نخواهد بود.",

          "موضوع، دامنه، فرمت، زبان، مدت دسترسی، الزامات فنی و فایل‌های هر محصول پیش از خرید در صفحه همان محصول توضیح داده خواهند شد.",
        ],
      },

      {
        title:
          "شکل‌گیری خرید آینده",

        paragraphs: [
          "در حال حاضر قرارداد خریدی از طریق سایت شکل نمی‌گیرد، زیرا محصول پولی و فرایند پرداخت فعالی وجود ندارد.",

          "پس از فعال‌شدن فروش، خرید زمانی شکل می‌گیرد که اطلاعات روشن محصول ارائه شود، خریدار شرایط مربوط را بپذیرد، پرداخت لازم را تکمیل کند و تأیید تراکنش را از سایت یا ارائه‌دهنده پرداخت دریافت کند.",

          "افزودن محصول به سبد یا آغاز پرداخت، در صورت ناموفق‌بودن پرداخت، عدم‌دسترسی محصول، ممنوعیت قانونی یا نیاز معقول به تأیید بیشتر، به‌تنهایی پذیرش قطعی سفارش نیست.",
        ],
      },

      {
        title:
          "قیمت، ارز و پرداخت آینده",

        paragraphs: [
          "محصولات آینده ممکن است از روش‌های پرداخت ایرانی و بین‌المللی پشتیبانی کنند. ارز، قیمت، مالیات، کارمزد، نحوه تبدیل ارز و ارائه‌دهنده پرداخت، در صورت کاربرد، پیش از پرداخت نمایش داده می‌شوند.",

          "پرداخت ممکن است توسط ارائه‌دهندگان ثالث انجام شود و خریدار مشمول شرایط و الزامات فنی و احراز هویت همان ارائه‌دهنده نیز باشد.",

          "هدف این است که اطلاعات کامل کارت بانکی مستقیماً توسط مالک سایت ذخیره نشود.",
        ],
      },

      {
        title:
          "تحویل دیجیتال آینده",

        paragraphs: [
          "پس از فعال‌شدن محصولات، صفحه هر محصول توضیح خواهد داد که دسترسی از طریق دانلود، حساب کاربری، ایمیل یا روش خودکار دیگری ارائه می‌شود.",

          "خریدار مسئول ارائه اطلاعات صحیح، دسترسی به ایمیل اعلام‌شده و استفاده از دستگاه و نرم‌افزار سازگار خواهد بود.",

          "زمان تحویل، محدودیت دانلود، مدت دسترسی و الزامات فنی در صورت نیاز پیش از خرید اعلام می‌شوند.",
        ],
      },

      {
        title:
          "لغو و بازپرداخت آینده",

        paragraphs: [
          "در حال حاضر سیاست فعال بازپرداخت یا لغو وجود ندارد، زیرا محصول پولی فروخته نمی‌شود.",

          "پیش از شروع فروش، شرایط لغو، انصراف و بازپرداخت هر محصول یا فرایند پرداخت به‌صورت روشن ارائه خواهد شد و نوع محصول، وضعیت تحویل، قانون الزامی و حقوق غیرقابل‌اسقاط مصرف‌کننده را در نظر خواهد گرفت.",

          "هیچ بخشی از این شرایط برای حذف حقوقی که قانوناً قابل‌حذف نیستند تنظیم نشده است.",
        ],
      },

      {
        title:
          "حساب کاربری و اطلاعات ورود آینده",

        paragraphs: [
          "حساب کاربری در حال حاضر فعال نیست.",

          "در صورت فعال‌شدن، کاربر مسئول ارائه اطلاعات صحیح، حفظ امنیت رمز عبور و فعالیت انجام‌شده با اطلاعات ورود خود خواهد بود.",

          "در صورت خطر امنیتی، پرداخت‌نشدن هزینه، رفتار غیرقانونی، اشتراک‌گذاری غیرمجاز یا نقض اساسی شرایط، دسترسی ممکن است به‌طور متناسب محدود شود.",
        ],
      },

      {
        title:
          "مسئولیت کاربران",

        paragraphs: [
          "کاربر مسئول است تشخیص دهد محتوای سایت یا محصول آینده با هدف، سطح دانش، شرایط فنی و وضعیت قانونی او تناسب دارد.",

          "تصمیم‌های اجرایی، اطلاعات، نسخه پشتیبان، حساب‌ها، هزینه تبلیغات، تنظیمات نرم‌افزار و رعایت مقررات بر عهده خود کاربر هستند.",
        ],
      },

      {
        title:
          "دسترسی و تغییرات فنی",

        paragraphs: [
          "وب‌سایت ممکن است به‌دلیل نگهداری، مشکل میزبانی، اقدامات امنیتی، به‌روزرسانی، خطای فنی یا رویدادهای خارج از کنترل معقول موقتاً در دسترس نباشد.",

          "قابلیت‌ها، مسیرها، فایل‌ها، رابط‌ها و اتصال به خدمات بیرونی ممکن است در صورت نیاز تغییر، محدود یا متوقف شوند.",
        ],
      },

      {
        title:
          "محدودیت مسئولیت",

        paragraphs: [
          "تا حدی که قانون اجازه می‌دهد، مالک وب‌سایت مسئول زیان غیرمستقیم، سود ازدست‌رفته، کاهش رتبه، ازدست‌رفتن داده، توقف کسب‌وکار یا تصمیمی که صرفاً براساس محتوای عمومی سایت گرفته شده باشد نخواهد بود.",

          "این محدودیت، مسئولیت‌هایی را که قانوناً قابل‌حذف نیستند، حقوق الزامی مصرف‌کننده یا مسئولیت ناشی از رفتار عمدی را کنار نمی‌گذارد.",
        ],
      },

      {
        title:
          "قانون حاکم و رسیدگی به اختلاف",

        paragraphs: [
          "این شرایط تابع قوانین جمهوری اسلامی ایران است؛ با حفظ حقوق الزامی‌ای که ممکن است براساس قانون محل اقامت یک مصرف‌کننده قابل‌اعمال باشند.",

          "در صورت بروز مسئله، ابتدا باید برای حل آن از طریق ارتباط کتبی روشن تلاش شود. در صورت حل‌نشدن، موضوع می‌تواند به مرجع یا دادگاه صالح براساس قانون قابل‌اعمال ارجاع شود.",
        ],
      },

      {
        title:
          "تغییرات شرایط استفاده",

        paragraphs: [
          "در صورت فعال‌شدن محصول پولی، پرداخت ایرانی یا بین‌المللی، حساب کاربری، دانلود، اشتراک یا خدمات دیگر، این شرایط به‌روزرسانی خواهند شد.",

          "نسخه جدید و تاریخ بازبینی در همین صفحه منتشر می‌شوند. تغییرات مهم تراکنشی باید پیش از اعمال بر خرید جدید در اختیار خریدار قرار گیرند.",
        ],
      },
    ],

    contact: {
      eyebrow:
        "درخواست‌های حقوقی",

      title:
        "پرسش درباره شرایط استفاده از وب‌سایت",

      description:
        "نشانی زیر برای پرسش حقوقی مربوط به این شرایط، گزارش نقض مالکیت فکری یا ارسال اخطار رسمی مرتبط با وب‌سایت در نظر گرفته شده است.",

      emailLabel:
        "ارسال درخواست حقوقی",

      limitation:
        "این ایمیل به‌عنوان مسیر کوچینگ، تحویل پروژه، پشتیبانی آموزشی یا خدمات عمومی مشتریان ارائه نشده است.",
    },

    notice:
      "این شرایط، وضعیت وب‌سایت پیش از آغاز فروش را توضیح می‌دهد. پیش از فعال‌شدن محصولات پولی، پرداخت ایرانی یا بین‌المللی، حساب کاربری یا اشتراک، متن باید دوباره از نظر حقوقی بررسی و به‌روزرسانی شود.",
  },
};

function prefixHomeHash(
  href: string,
  locale: Locale
) {
  if (!href.startsWith("#")) {
    return href;
  }

  return `/${locale}${href}`;
}

function createInternalPageHeader(
  dictionary: Dictionary,
  locale: Locale
) {
  return {
    ...dictionary.header,

    navigation:
      dictionary.header.navigation.map(
        (item) => ({
          ...item,
          href: prefixHomeHash(
            item.href,
            locale
          ),
        })
      ),
  } as unknown as Dictionary["header"];
}

function createInternalPageFooter(
  dictionary: Dictionary,
  locale: Locale
) {
  return {
    ...dictionary.footer,

    primaryCta: {
      ...dictionary.footer.primaryCta,
      href: `/${locale}/research`,
    },

    secondaryCta: {
      ...dictionary.footer.secondaryCta,
      href: `/${locale}/case-studies`,
    },

    navigation:
      dictionary.footer.navigation.map(
        (item) => ({
          ...item,
          href: prefixHomeHash(
            item.href,
            locale
          ),
        })
      ),
  } as unknown as Dictionary["footer"];
}

function formatSectionNumber(
  index: number,
  locale: Locale
) {
  return new Intl.NumberFormat(
    locale === "fa"
      ? "fa-IR"
      : locale,
    {
      minimumIntegerDigits: 2,
      useGrouping: false,
    }
  ).format(index + 1);
}

export async function generateMetadata({
  params,
}: TermsPageProps): Promise<Metadata> {
  const { locale: localeParam } =
    await params;

  if (!isLocale(localeParam)) {
    notFound();
  }

  const locale: Locale =
    localeParam;

  const content =
    pageContent[locale];

  const canonicalUrl =
    `${siteUrl}/${locale}/terms`;

  return {
    title:
      content.metadataTitle,

    description:
      content.metadataDescription,

    alternates: {
      canonical: canonicalUrl,

      languages: {
        en: `${siteUrl}/en/terms`,
        de: `${siteUrl}/de/terms`,
        fa: `${siteUrl}/fa/terms`,

        "x-default":
          `${siteUrl}/en/terms`,
      },
    },

    openGraph: {
      type: "website",
      url: canonicalUrl,
      title: content.metadataTitle,
      description:
        content.metadataDescription,
      siteName:
        "Setareh Salehabadi",
    },

    robots: {
      index: true,
      follow: true,
    },
  };
}

export default async function TermsPage({
  params,
}: TermsPageProps) {
  const { locale: localeParam } =
    await params;

  if (!isLocale(localeParam)) {
    notFound();
  }

  const locale: Locale =
    localeParam;

  const isPersian =
    locale === "fa";

  const dictionary =
    await getDictionary(locale);

  const content =
    pageContent[locale];

  const headerDictionary =
    createInternalPageHeader(
      dictionary,
      locale
    );

  const footerDictionary =
    createInternalPageFooter(
      dictionary,
      locale
    );

  return (
    <div
      id="top"
      className="
        min-h-screen
        bg-[#f4efe8]
        text-[#211f1c]
      "
    >
      <Header
        locale={locale}
        dictionary={headerDictionary}
        common={dictionary.common}
      />

      <main
        id="main-content"
        tabIndex={-1}
        className="
          min-w-0
          outline-none
        "
      >
        <section
          aria-labelledby="terms-page-heading"
          className="
            border-b
            border-[#302d29]/15
            bg-[#f4efe8]
          "
        >
          <div
            className="
              mx-auto
              max-w-[1480px]
              px-5
              pb-20
              pt-10
              sm:px-8
              sm:pb-24
              sm:pt-12
              lg:px-12
              lg:pb-28
              lg:pt-16
              xl:px-16
            "
          >
            <nav
              aria-label={
                isPersian
                  ? "مسیر صفحه"
                  : "Breadcrumb"
              }
              className="
                flex
                flex-wrap
                items-center
                gap-3
                border-b
                border-[#302d29]/12
                pb-6
              "
            >
              <Link
                href={`/${locale}`}
                className={`
                  font-sans
                  font-semibold
                  text-[#6e675f]
                  transition-colors
                  duration-300
                  hover:text-[#2e5d91]
                  ${
                    isPersian
                      ? "text-[12px] leading-6"
                      : "text-[11px] uppercase tracking-[0.14em]"
                  }
                `}
              >
                {content.homeLabel}
              </Link>

              <span
                aria-hidden="true"
                className="
                  h-px
                  w-6
                  bg-[#b48a52]
                "
              />

              <span
                aria-current="page"
                className={`
                  font-sans
                  font-semibold
                  text-[#8a672f]
                  ${
                    isPersian
                      ? "text-[12px] leading-6"
                      : "text-[11px] uppercase tracking-[0.14em]"
                  }
                `}
              >
                {content.pageLabel}
              </span>
            </nav>

            <div
              className="
                mt-10
                grid
                gap-10
                lg:mt-14
                lg:grid-cols-[minmax(0,1.08fr)_minmax(360px,0.72fr)]
                lg:items-end
                lg:gap-16
              "
            >
              <div className="min-w-0">
                <p
                  className={`
                    font-sans
                    font-semibold
                    text-[#8a672f]
                    ${
                      isPersian
                        ? "text-[11px] leading-6 sm:text-[12px]"
                        : "text-[10px] uppercase tracking-[0.28em]"
                    }
                  `}
                >
                  {content.eyebrow}
                </p>

                <h1
                  id="terms-page-heading"
                  className={`
                    mt-5
                    max-w-[940px]
                    text-[#211f1c]
                    ${
                      isPersian
                        ? "font-sans text-[clamp(2rem,3.4vw,3.4rem)] font-[650] leading-[1.58] tracking-normal"
                        : "font-serif text-[clamp(3.2rem,5.8vw,5.8rem)] font-medium leading-[0.98] tracking-[-0.045em]"
                    }
                  `}
                >
                  <span className="block">
                    {content.title.first}
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
                    {content.title.highlighted}
                  </span>
                </h1>

                <p
                  className={`
                    mt-7
                    max-w-[820px]
                    font-sans
                    text-[#5f5a53]
                    ${
                      isPersian
                        ? "text-[16px] leading-[2.1] sm:text-[17px]"
                        : "text-[18px] leading-[2.1rem] lg:text-[19px]"
                    }
                  `}
                >
                  {content.introduction}
                </p>

                <p
                  className={`
                    mt-6
                    font-sans
                    font-semibold
                    text-[#8a672f]
                    ${
                      isPersian
                        ? "text-[12px] leading-7"
                        : "text-[11px] uppercase tracking-[0.12em]"
                    }
                  `}
                >
                  {content.lastUpdatedLabel}:{" "}
                  {content.lastUpdated}
                </p>
              </div>

              <aside
                aria-label={
                  content.status.label
                }
                className="
                  rounded-[26px]
                  border
                  border-[#302d29]/13
                  bg-[#ebe4da]/70
                  p-6
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
                        ? "text-[11px] leading-6"
                        : "text-[10px] uppercase tracking-[0.22em]"
                    }
                  `}
                >
                  {content.status.label}
                </p>

                <h2
                  className={`
                    mt-5
                    text-[#24211e]
                    ${
                      isPersian
                        ? "font-sans text-[clamp(1.4rem,2vw,1.85rem)] font-[650] leading-[1.75]"
                        : "font-serif text-[clamp(1.8rem,2.7vw,2.6rem)] font-medium leading-[1.12]"
                    }
                  `}
                >
                  {content.status.title}
                </h2>

                <p
                  className={`
                    mt-4
                    font-sans
                    text-[#625d56]
                    ${
                      isPersian
                        ? "text-[14.5px] leading-[2.05]"
                        : "text-[16px] leading-8"
                    }
                  `}
                >
                  {content.status.description}
                </p>

                <ul
                  className="
                    mt-6
                    space-y-3
                    border-t
                    border-[#302d29]/14
                    pt-5
                  "
                >
                  {content.status.items.map(
                    (item) => (
                      <li
                        key={item}
                        className={`
                          flex
                          items-start
                          gap-3
                          font-sans
                          text-[#625d56]
                          ${
                            isPersian
                              ? "text-[12px] leading-7"
                              : "text-[13px] leading-6"
                          }
                        `}
                      >
                        <span
                          aria-hidden="true"
                          className="
                            mt-2.5
                            h-1.5
                            w-1.5
                            shrink-0
                            rounded-full
                            bg-[#b48a52]
                          "
                        />

                        <span>{item}</span>
                      </li>
                    )
                  )}
                </ul>
              </aside>
            </div>
          </div>
        </section>

        <section
          className="
            border-b
            border-[#302d29]/15
            bg-[#f7f3ed]
          "
        >
          <div
            className="
              mx-auto
              grid
              max-w-[1480px]
              gap-12
              px-5
              py-20
              sm:px-8
              sm:py-24
              lg:grid-cols-[250px_minmax(0,1fr)]
              lg:gap-16
              lg:px-12
              lg:py-28
              xl:px-16
            "
          >
            <aside className="hidden lg:block">
              <div className="sticky top-[120px]">
                <p
                  className={`
                    font-sans
                    font-semibold
                    text-[#8a672f]
                    ${
                      isPersian
                        ? "text-[12px] leading-7"
                        : "text-[10px] uppercase tracking-[0.22em]"
                    }
                  `}
                >
                  {content.contentsLabel}
                </p>

                <ol
                  className="
                    mt-6
                    space-y-3
                    border-t
                    border-[#302d29]/14
                    pt-5
                  "
                >
                  {content.sections.map(
                    (section, index) => (
                      <li
                        key={section.title}
                        className="
                          flex
                          gap-3
                          border-b
                          border-[#302d29]/10
                          pb-3
                        "
                      >
                        <span
                          className="
                            shrink-0
                            font-sans
                            text-[10px]
                            font-semibold
                            text-[#9a8170]
                          "
                        >
                          {formatSectionNumber(
                            index,
                            locale
                          )}
                        </span>

                        <span
                          className={`
                            font-sans
                            text-[#625d56]
                            ${
                              isPersian
                                ? "text-[12px] leading-7"
                                : "text-[12px] leading-5"
                            }
                          `}
                        >
                          {section.title}
                        </span>
                      </li>
                    )
                  )}
                </ol>
              </div>
            </aside>

            <div
              className="
                border-t
                border-[#302d29]/15
              "
            >
              {content.sections.map(
                (section, index) => (
                  <article
                    key={section.title}
                    className="
                      grid
                      gap-5
                      border-b
                      border-[#302d29]/15
                      py-9
                      sm:grid-cols-[52px_minmax(0,1fr)]
                      sm:gap-7
                      lg:py-11
                    "
                  >
                    <span
                      className="
                        pt-1
                        font-sans
                        text-[11px]
                        font-semibold
                        text-[#9a8170]
                      "
                    >
                      {formatSectionNumber(
                        index,
                        locale
                      )}
                    </span>

                    <div>
                      <h2
                        className={`
                          text-[#24211e]
                          ${
                            isPersian
                              ? "font-sans text-[clamp(1.4rem,2vw,1.9rem)] font-[650] leading-[1.7]"
                              : "font-serif text-[clamp(1.8rem,2.5vw,2.5rem)] font-medium leading-[1.08]"
                          }
                        `}
                      >
                        {section.title}
                      </h2>

                      <div className="mt-5 space-y-4">
                        {section.paragraphs.map(
                          (paragraph) => (
                            <p
                              key={paragraph}
                              className={`
                                max-w-[860px]
                                font-sans
                                text-[#625d56]
                                ${
                                  isPersian
                                    ? "text-[15px] leading-[2.1] sm:text-[16px]"
                                    : "text-[17px] leading-8"
                                }
                              `}
                            >
                              {paragraph}
                            </p>
                          )
                        )}
                      </div>

                      {section.bullets && (
                        <ul
                          className="
                            mt-6
                            grid
                            gap-3
                            sm:grid-cols-2
                          "
                        >
                          {section.bullets.map(
                            (item) => (
                              <li
                                key={item}
                                className={`
                                  flex
                                  items-start
                                  gap-3
                                  rounded-[16px]
                                  border
                                  border-[#302d29]/12
                                  bg-[#ebe4da]/35
                                  px-4
                                  py-3
                                  font-sans
                                  text-[#625d56]
                                  ${
                                    isPersian
                                      ? "text-[13px] leading-7"
                                      : "text-[14px] leading-6"
                                  }
                                `}
                              >
                                <span
                                  aria-hidden="true"
                                  className="
                                    mt-2.5
                                    h-1.5
                                    w-1.5
                                    shrink-0
                                    rounded-full
                                    bg-[#2e5d91]
                                  "
                                />

                                <span>{item}</span>
                              </li>
                            )
                          )}
                        </ul>
                      )}
                    </div>
                  </article>
                )
              )}
            </div>
          </div>
        </section>

        <section
          aria-labelledby="terms-contact-heading"
          className="
            border-b
            border-[#302d29]/15
            bg-[#183655]
            text-white
          "
        >
          <div
            className="
              mx-auto
              max-w-[1480px]
              px-5
              py-20
              sm:px-8
              sm:py-24
              lg:px-12
              lg:py-28
              xl:px-16
            "
          >
            <p
              className={`
                font-sans
                font-semibold
                text-[#d3b47a]
                ${
                  isPersian
                    ? "text-[11px] leading-6 sm:text-[12px]"
                    : "text-[10px] uppercase tracking-[0.28em]"
                }
              `}
            >
              {content.contact.eyebrow}
            </p>

            <div
              className="
                mt-5
                grid
                gap-10
                lg:grid-cols-[minmax(0,1fr)_minmax(340px,0.62fr)]
                lg:items-end
                lg:gap-16
              "
            >
              <h2
                id="terms-contact-heading"
                className={`
                  max-w-[900px]
                  text-white
                  ${
                    isPersian
                      ? "font-sans text-[clamp(1.9rem,3.2vw,3.2rem)] font-[650] leading-[1.62]"
                      : "font-serif text-[clamp(2.5rem,4.4vw,4.35rem)] font-medium leading-[1.04]"
                  }
                `}
              >
                {content.contact.title}
              </h2>

              <div>
                <p
                  className={`
                    font-sans
                    text-white/72
                    ${
                      isPersian
                        ? "text-[16px] leading-[2.1]"
                        : "text-[18px] leading-[2.1rem]"
                    }
                  `}
                >
                  {content.contact.description}
                </p>

                <a
                  href={`mailto:${legalEmail}?subject=Legal%20Request`}
                  className={`
                    mt-7
                    inline-flex
                    min-h-[56px]
                    items-center
                    justify-center
                    rounded-full
                    bg-white
                    px-8
                    font-sans
                    font-semibold
                    text-[#183655]
                    transition-all
                    duration-300
                    hover:-translate-y-0.5
                    hover:bg-[#f4efe8]
                    ${
                      isPersian
                        ? "text-[14px] sm:text-[15px]"
                        : "text-[15px]"
                    }
                  `}
                >
                  {content.contact.emailLabel}
                </a>

                <p
                  dir="ltr"
                  className="
                    mt-4
                    break-all
                    font-sans
                    text-[13px]
                    text-white/65
                  "
                >
                  {legalEmail}
                </p>

                <p
                  className={`
                    mt-5
                    font-sans
                    text-white/55
                    ${
                      isPersian
                        ? "text-[12px] leading-7"
                        : "text-[12px] leading-6"
                    }
                  `}
                >
                  {content.contact.limitation}
                </p>
              </div>
            </div>

            <div
              className="
                mt-12
                rounded-[20px]
                border
                border-white/15
                bg-white/5
                px-5
                py-5
                sm:px-7
                sm:py-6
              "
            >
              <p
                className={`
                  max-w-[1100px]
                  font-sans
                  text-white/65
                  ${
                    isPersian
                      ? "text-[12px] leading-8 sm:text-[13px]"
                      : "text-[13px] leading-7"
                  }
                `}
              >
                {content.notice}
              </p>
            </div>
          </div>
        </section>
      </main>

      <Footer
        locale={locale}
        dictionary={footerDictionary}
        common={dictionary.common}
      />
    </div>
  );
}
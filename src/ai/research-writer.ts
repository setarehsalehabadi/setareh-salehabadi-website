import type { ResearchArticle } from "@/types/research";

import {
  analyzeResearch,
  type ResearchInsights,
} from "./research-analyzer";

export interface ResearchDocument {
  خلاصه_علمی_پژوهش: string;

  تحلیل_روانشناسی_مصرف_کننده: string;

  تفسیر_کسب_وکاری: string;

  چارچوب_استراتژیک: string;

  چک_لیست_اقدام: string[];

  محدودیت_های_پژوهش: string;

  دیدگاه_من: string;
}

function normalizeText(
  value?: string,
): string {
  return value
    ?.replace(/\r\n?/g, "\n")
    .trim() || "";
}

function normalizeItems(
  items?: readonly string[],
): string[] {
  if (!items) {
    return [];
  }

  return items
    .map((item) =>
      normalizeText(item),
    )
    .filter(Boolean);
}

function createBulletList(
  items: readonly string[],
  fallback: string,
): string {
  const normalizedItems =
    normalizeItems(items);

  if (
    normalizedItems.length === 0
  ) {
    return fallback;
  }

  return normalizedItems
    .map((item) => `- ${item}`)
    .join("\n");
}

function getTextOrFallback(
  value: string | undefined,
  fallback: string,
): string {
  const normalizedValue =
    normalizeText(value);

  return normalizedValue ||
    fallback;
}

function createScientificSummary(
  research: ResearchArticle,
  insights: ResearchInsights,
): string {
  const researchQuestion =
    getTextOrFallback(
      insights.researchQuestion,
      "در اطلاعات موجود، سؤال اصلی پژوهش به‌صورت شفاف ثبت نشده است.",
    );

  const methodology =
    getTextOrFallback(
      insights.methodology,
      "جزئیات کافی درباره روش‌شناسی پژوهش در اطلاعات موجود ثبت نشده است.",
    );

  const mainFindings =
    createBulletList(
      insights.mainFindings,
      "یافته مستقیم و قابل‌استخراجی در اطلاعات موجود ثبت نشده است.",
    );

  const scientificContribution =
    getTextOrFallback(
      insights.scientificContribution,
      "برای مشخص‌کردن سهم علمی پژوهش، بررسی مستقیم مقاله اصلی ضروری است.",
    );

  return `
## خلاصه علمی پژوهش

### عنوان پژوهش

${research.title}

### سؤال یا مسئله اصلی پژوهش

${researchQuestion}

### روش‌شناسی پژوهش

${methodology}

### یافته‌های مستقیم گزارش‌شده

${mainFindings}

### سهم علمی پژوهش

${scientificContribution}
  `.trim();
}

function createConsumerPsychologyAnalysis(
  insights: ResearchInsights,
): string {
  const consumerInsights =
    createBulletList(
      insights.consumerBehaviorInsights,
      "در اطلاعات موجود، بینش مشخصی درباره رفتار یا روان‌شناسی مصرف‌کننده ثبت نشده است.",
    );

  return `
## تحلیل روان‌شناسی مصرف‌کننده

> این بخش تحلیل تکمیلی است و باید از یافته‌های مستقیم مقاله اصلی تفکیک شود.

### بینش‌های رفتاری قابل‌استخراج

${consumerInsights}

### نکته تفسیری

این بینش‌ها باید با توجه به جامعه آماری، زمینه مطالعه، نوع محصول یا خدمت و شرایط بازار تفسیر شوند. تعمیم مستقیم نتایج به تمام مخاطبان یا کسب‌وکارها بدون بررسی زمینه پژوهش توصیه نمی‌شود.
  `.trim();
}

function createBusinessInterpretation(
  insights: ResearchInsights,
): string {
  const businessImplications =
    createBulletList(
      insights.businessImplications,
      "در اطلاعات موجود، کاربرد کسب‌وکاری مشخصی ثبت نشده است.",
    );

  return `
## تفسیر کسب‌وکاری

> این بخش ترجمه مدیریتی یافته‌های پژوهش است و به‌عنوان نتیجه مستقیم مقاله ارائه نمی‌شود.

### کاربردهای احتمالی برای کسب‌وکار

${businessImplications}

### مرز استفاده

هر کاربرد باید ابتدا در مقیاس محدود آزمایش شود و سپس براساس داده واقعی، رفتار مخاطب و شاخص‌های عملکرد ارزیابی شود.
  `.trim();
}

function createStrategicFramework(
  insights: ResearchInsights,
): string {
  const frameworkInputs =
    createBulletList(
      insights.businessImplications,
      "برای ساخت چارچوب اختصاصی، ابتدا باید کاربردهای مرتبط با مسئله کسب‌وکار مشخص شوند.",
    );

  return `
## چارچوب استراتژیک

> این چارچوب پیشنهادی است و بخشی از یافته مستقیم مقاله محسوب نمی‌شود.

### ورودی‌های قابل‌بررسی

${frameworkInputs}

### مدل تبدیل پژوهش به اقدام

1. **استخراج شواهد:** مشخص‌کردن یافته‌هایی که مستقیماً توسط پژوهش پشتیبانی می‌شوند.
2. **تعیین ارتباط:** بررسی ارتباط هر یافته با مسئله واقعی کسب‌وکار یا رفتار مخاطب.
3. **ساخت فرضیه:** تبدیل بینش مرتبط به یک فرضیه روشن و قابل‌آزمون.
4. **طراحی آزمایش:** اجرای محدود با دامنه، مخاطب و شاخص‌های مشخص.
5. **اندازه‌گیری:** مقایسه نتیجه با وضعیت پایه یا گروه کنترل.
6. **تصمیم‌گیری:** ادامه، اصلاح یا توقف اقدام براساس شواهد به‌دست‌آمده.
7. **ثبت یادگیری:** مستندسازی نتیجه برای تصمیم‌ها و آزمایش‌های آینده.

### اصل راهنما

پژوهش علمی → تحلیل زمینه → فرضیه اجرایی → آزمایش محدود → اندازه‌گیری → تصمیم
  `.trim();
}

function createActionChecklist(): string[] {
  return [
    "مقاله اصلی و بخش روش‌شناسی آن را پیش از استفاده اجرایی مرور کنید.",

    "یافته‌های مستقیم پژوهش را از تحلیل‌ها و برداشت‌های تکمیلی جدا کنید.",

    "مشخص کنید کدام یافته با مسئله واقعی کسب‌وکار یا رفتار مخاطب ارتباط دارد.",

    "فقط یک بینش را به یک فرضیه روشن و قابل‌آزمون تبدیل کنید.",

    "برای آزمایش، مخاطب، دامنه اجرا، بازه زمانی و شاخص موفقیت را مشخص کنید.",

    "نتیجه آزمایش را با وضعیت پایه یا گروه مقایسه مناسب ارزیابی کنید.",

    "محدودیت‌ها، نتایج و یادگیری‌های حاصل را برای تصمیم‌های آینده ثبت کنید.",
  ];
}

function createLimitationsSection(
  research: ResearchArticle,
): string {
  const sourceText =
    research.source
      ? `منبع ثبت‌شده برای این پرونده: ${research.source}`
      : "منبع کامل پژوهش در اطلاعات این پرونده ثبت نشده است.";

  return `
## محدودیت‌های پژوهش

این تحلیل یک تفسیر ساختاریافته از اطلاعات موجود است و جایگزین مطالعه مقاله اصلی نیست.

${sourceText}

پیش از استفاده از نتایج، موارد زیر باید در منبع اصلی بررسی شوند:

- اندازه و ترکیب نمونه پژوهش
- روش گردآوری و تحلیل داده‌ها
- زمینه جغرافیایی، فرهنگی و صنعتی مطالعه
- تعریف متغیرها و معیارهای اندازه‌گیری
- تفاوت میان همبستگی و رابطه علّی
- امکان تعمیم نتایج به بازار یا مخاطب دیگر
- محدودیت‌های اعلام‌شده توسط نویسندگان مقاله
- تاریخ انتشار و ارتباط یافته‌ها با شرایط فعلی بازار
  `.trim();
}

function createDraftPerspective(
  insights: ResearchInsights,
): string {
  const findings =
    normalizeItems(
      insights.mainFindings,
    );

  const implications =
    normalizeItems(
      insights.businessImplications,
    );

  const evidenceSummary =
    findings.length > 0
      ? findings[0]
      : "برای تدوین برداشت نهایی، بررسی دقیق‌تر یافته‌های اصلی ضروری است.";

  const businessSummary =
    implications.length > 0
      ? implications[0]
      : "کاربرد کسب‌وکاری باید براساس زمینه واقعی سازمان و مخاطب تعیین شود.";

  return `
## دیدگاه من

> این بخش یک پیش‌نویس تحلیلی است و پیش از انتشار نهایی باید توسط نویسنده بازبینی و تأیید شود.

نکته محوری قابل‌بررسی در این پژوهش:

${evidenceSummary}

برداشت استراتژیک اولیه:

${businessSummary}

ارزش واقعی این پژوهش زمانی مشخص می‌شود که یافته‌های آن بدون اغراق، در زمینه درست و از طریق یک آزمایش قابل‌اندازه‌گیری بررسی شوند. تصمیم اجرایی نباید تنها براساس جذابیت یک نتیجه علمی گرفته شود؛ کیفیت شواهد، محدودیت‌های مطالعه و تناسب آن با مسئله واقعی کسب‌وکار نیز باید در نظر گرفته شوند.
  `.trim();
}

export function generateResearchDocument(
  research: ResearchArticle,
): ResearchDocument {
  const insights =
    analyzeResearch(research);

  return {
    خلاصه_علمی_پژوهش:
      createScientificSummary(
        research,
        insights,
      ),

    تحلیل_روانشناسی_مصرف_کننده:
      createConsumerPsychologyAnalysis(
        insights,
      ),

    تفسیر_کسب_وکاری:
      createBusinessInterpretation(
        insights,
      ),

    چارچوب_استراتژیک:
      createStrategicFramework(
        insights,
      ),

    چک_لیست_اقدام:
      createActionChecklist(),

    محدودیت_های_پژوهش:
      createLimitationsSection(
        research,
      ),

    دیدگاه_من:
      createDraftPerspective(
        insights,
      ),
  };
}
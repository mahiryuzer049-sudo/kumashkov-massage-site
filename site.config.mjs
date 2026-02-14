const SITE = {
  baseUrl: "https://pavelkumashkov.ru",
  brandRu: "Павел Кумашков",
  brandEn: "Pavel Kumashkov",
  city: "Москва",
  regionCode: "RU-MOW",
  phoneDigits: "79260899019",
  phoneDisplay: "+7 926 089 9019",
  telegram: "https://t.me/Pasho_chekk",
  ogImagePath: "/assets/images/og.jpg",
};

const HOME_FAQ = {
  "@context": "https://schema.org",
  "@type": "FAQPage",
  mainEntity: [
    {
      "@type": "Question",
      name: "Сколько длится сеанс и где проходит?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "Сеанс обычно длится около 60 минут и проходит в формате выезда на дом по Москве.",
      },
    },
    {
      "@type": "Question",
      name: "Как записаться?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "Лучше всего написать в WhatsApp или Telegram: укажите цель, зоны запроса и удобное время.",
      },
    },
    {
      "@type": "Question",
      name: "Как понять, какой формат мне подходит?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "Начинаем с первого визита, после которого фиксируем отклик тела и при необходимости собираем курс или поддерживающий ритм.",
      },
    },
  ],
};

const PERSON_SCHEMA = (site) => ({
  "@context": "https://schema.org",
  "@type": "Person",
  name: site.brandRu,
  jobTitle: "Массажист",
  telephone: site.phoneDisplay,
  url: `${site.baseUrl}/`,
  address: {
    "@type": "PostalAddress",
    addressLocality: site.city,
    addressCountry: "RU",
  },
  sameAs: [site.telegram],
});

const BUSINESS_SCHEMA = (site) => ({
  "@context": "https://schema.org",
  "@type": ["HealthAndBeautyBusiness", "LocalBusiness"],
  name: `${site.brandRu} - массаж на дому в Москве`,
  image: `${site.baseUrl}${site.ogImagePath}`,
  telephone: site.phoneDisplay,
  url: `${site.baseUrl}/`,
  priceRange: "$$",
  address: {
    "@type": "PostalAddress",
    addressLocality: site.city,
    addressCountry: "RU",
  },
  areaServed: site.city,
  serviceArea: {
    "@type": "Place",
    name: site.city,
  },
  availableLanguage: ["ru"],
  contactPoint: [
    {
      "@type": "ContactPoint",
      telephone: site.phoneDisplay,
      contactType: "Запись",
      areaServed: site.regionCode,
      availableLanguage: "ru",
    },
  ],
  sameAs: [site.telegram],
});

const SERVICE_SCHEMA = (site, { name, description, canonicalPath }) => ({
  "@context": "https://schema.org",
  "@type": "Service",
  serviceType: name,
  name,
  description,
  provider: {
    "@type": "Person",
    name: site.brandRu,
  },
  areaServed: {
    "@type": "City",
    name: site.city,
  },
  url: new URL(canonicalPath, `${site.baseUrl}/`).toString(),
});

const PAGES = {
  "/index.html": {
    title: "Павел Кумашков - массаж на дому в Москве | персональный формат",
    description:
      "Персональный массаж на дому в Москве: восстановление, антистресс, лимфодренаж и работа с осанкой. Запись через WhatsApp и Telegram.",
    canonicalPath: "/",
    pageType: "home",
    robots: "index,follow",
    geo: true,
    preloadImage: "/assets/images/og.jpg",
    preconnectUnsplash: false,
    structuredData: (site) => [PERSON_SCHEMA(site), BUSINESS_SCHEMA(site), HOME_FAQ],
  },
  "/privacy.html": {
    title: "Политика конфиденциальности | Павел Кумашков",
    description:
      "Политика конфиденциальности и обработки персональных данных сайта pavelkumashkov.ru.",
    canonicalPath: "/privacy.html",
    pageType: "legal",
    robots: "noindex,follow",
  },
  "/landing-classic.html": {
    title: "Классический массаж на дому в Москве | Павел Кумашков",
    description:
      "Классический массаж на дому в Москве: снятие мышечной усталости, восстановление тонуса и легкость в теле.",
    canonicalPath: "/landing-classic.html",
    pageType: "landing",
    robots: "index,follow",
    structuredData: (site) => [
      SERVICE_SCHEMA(site, {
        name: "Классический массаж на дому",
        description: "Восстановительный формат для спины, плеч и общего тонуса.",
        canonicalPath: "/landing-classic.html",
      }),
    ],
  },
  "/landing-lymph.html": {
    title: "Лимфодренажный массаж на дому в Москве | Павел Кумашков",
    description:
      "Лимфодренажный массаж на дому в Москве: легкость в ногах, деликатная работа с отечностью и гидробалансом.",
    canonicalPath: "/landing-lymph.html",
    pageType: "landing",
    robots: "index,follow",
    structuredData: (site) => [
      SERVICE_SCHEMA(site, {
        name: "Лимфодренажный массаж на дому",
        description: "Мягкий дренажный формат для легкости и уменьшения отечности.",
        canonicalPath: "/landing-lymph.html",
      }),
    ],
  },
  "/landing-relax.html": {
    title: "Релакс-массаж на дому в Москве | Павел Кумашков",
    description:
      "Релакс-массаж на дому в Москве: мягкое антистресс-воздействие, расслабление нервной системы и спокойный ритм.",
    canonicalPath: "/landing-relax.html",
    pageType: "landing",
    robots: "index,follow",
    structuredData: (site) => [
      SERVICE_SCHEMA(site, {
        name: "Релакс-массаж на дому",
        description: "Антистресс-формат для глубокой разгрузки и восстановления спокойствия.",
        canonicalPath: "/landing-relax.html",
      }),
    ],
  },
  "/landing-posture.html": {
    title: "Массаж для осанки на дому в Москве | Павел Кумашков",
    description:
      "Формат для осанки и мышечного баланса на дому в Москве: снижение зажимов, выравнивание нагрузки, стабильный тонус.",
    canonicalPath: "/landing-posture.html",
    pageType: "landing",
    robots: "index,follow",
    structuredData: (site) => [
      SERVICE_SCHEMA(site, {
        name: "Массаж для осанки на дому",
        description: "Работа с мышечным балансом, шеей, плечами и поясницей.",
        canonicalPath: "/landing-posture.html",
      }),
    ],
  },
};

const toAbsoluteUrl = (baseUrl, path) => new URL(path, `${baseUrl}/`).toString();

const normalizePagePath = (pagePath) => {
  const normalized = (pagePath || "/index.html").replace(/\\/g, "/");
  return normalized.startsWith("/") ? normalized : `/${normalized}`;
};

export const getTemplateContext = (pagePath) => {
  const normalizedPath = normalizePagePath(pagePath);
  const pageConfig = PAGES[normalizedPath] || PAGES["/index.html"];
  const canonicalPath = pageConfig.canonicalPath || normalizedPath;
  const canonical = toAbsoluteUrl(SITE.baseUrl, canonicalPath);
  const pageType = pageConfig.pageType || (normalizedPath === "/index.html" ? "home" : "landing");
  const anchorPrefix = pageType === "home" ? "#" : "/#";
  const structuredData =
    typeof pageConfig.structuredData === "function"
      ? pageConfig.structuredData(SITE)
      : pageConfig.structuredData || [];

  return {
    page: {
      type: pageType,
      isHome: pageType === "home",
      isLanding: pageType === "landing",
      isLegal: pageType === "legal",
      anchorPrefix,
    },
    site: SITE,
    seo: {
      title: pageConfig.title,
      description: pageConfig.description,
      robots: pageConfig.robots || "index,follow",
      canonical,
      geo: Boolean(pageConfig.geo),
      ogType: pageConfig.ogType || "website",
      ogSiteName: pageConfig.ogSiteName || SITE.brandEn,
      ogTitle: pageConfig.ogTitle || pageConfig.title,
      ogDescription: pageConfig.ogDescription || pageConfig.description,
      ogImage: toAbsoluteUrl(SITE.baseUrl, pageConfig.ogImagePath || SITE.ogImagePath),
      ogLocale: pageConfig.ogLocale || "ru_RU",
      ogUrl: pageConfig.ogUrl || canonical,
      twitterCard: pageConfig.twitterCard || "summary_large_image",
      twitterTitle: pageConfig.twitterTitle || pageConfig.title,
      twitterDescription: pageConfig.twitterDescription || pageConfig.description,
      twitterImage: toAbsoluteUrl(SITE.baseUrl, pageConfig.twitterImagePath || SITE.ogImagePath),
      preloadImage: pageConfig.preloadImage || "",
      preconnectUnsplash: Boolean(pageConfig.preconnectUnsplash),
      structuredDataScripts: structuredData.map((item) => JSON.stringify(item)),
    },
  };
};

export { SITE };

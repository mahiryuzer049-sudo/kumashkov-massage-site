import { PRICING_SECTION, PACKAGES_SECTION } from "./src/features/pricing/model/packages.config.js";
import {
  BUSINESS_SCHEMA,
  FAQ_SCHEMA,
  PERSON_SCHEMA,
  REVIEW_SCHEMA,
  SERVICE_SCHEMA,
} from "./src/shared/seo/schema-registry.js";

const SITE = {
  baseUrl: "https://pavelkumashkov.ru",
  brandRu: "Павел Кумашков",
  brandEn: "Pavel Kumashkov",
  city: "Москва",
  regionCode: "RU-MOW",
  phoneDigits: "79260899019",
  phoneDisplay: "+7 926 089 9019",
  telegram: "https://t.me/Pasho_chekk",
  metrikaId: "",
  ogImagePath: "/assets/images/og.jpg",
};

const HOME_FAQ_ITEMS = [
  {
    question: "Сколько длится сеанс и где проходит?",
    answer: "Сеанс обычно длится около 60 минут и проходит в формате выезда на дом по Москве.",
  },
  {
    question: "Как записаться?",
    answer: "Лучше всего написать в WhatsApp или Telegram: укажите цель, зоны запроса и удобное время.",
  },
  {
    question: "Как понять, какой формат мне подходит?",
    answer:
      "Начинаем с первого визита, после которого фиксируем отклик тела и при необходимости собираем курс или поддерживающий ритм.",
  },
];
const HOME_FAQ = FAQ_SCHEMA(HOME_FAQ_ITEMS);

const HOME_SERVICES = [
  {
    name: "Классический массаж на дому",
    description: "Восстановительный формат для спины, плеч и общего тонуса.",
    canonicalPath: "/landing-classic.html",
  },
  {
    name: "Релакс-массаж на дому",
    description: "Антистресс-формат для глубокой разгрузки и восстановления спокойствия.",
    canonicalPath: "/landing-relax.html",
  },
  {
    name: "Лимфодренажный массаж на дому",
    description: "Мягкий дренажный формат для легкости и уменьшения отечности.",
    canonicalPath: "/landing-lymph.html",
  },
  {
    name: "Массаж для осанки на дому",
    description: "Работа с мышечным балансом, шеей, плечами и поясницей.",
    canonicalPath: "/landing-posture.html",
  },
];

const HOME_REVIEWS = [
  {
    author: "Клиентка, 27",
    reviewBody:
      "Перед первым визитом переживала, но уже в начале стало спокойно. Очень аккуратная коммуникация и понятный темп. После сеанса — легкая спина и больше энергии.",
  },
  {
    author: "Клиентка, 31",
    reviewBody:
      "Понравилось, что все согласовали заранее: зоны, интенсивность, длительность. Без давления и без неловкости. Формат комфортный, хочу продолжить регулярные встречи.",
  },
  {
    author: "Клиентка, 24",
    reviewBody:
      "Для меня важно было чувство приватности и четкие границы. Здесь это соблюдается спокойно и профессионально. После встречи ощущение, что тело «дышит» свободнее.",
  },
];

const PAGES = {
  "/index.html": {
    title: "Павел Кумашков - массаж на дому в Москве | персональный формат",
    description:
      "Персональный массаж на дому в Москве: восстановление, антистресс, лимфодренаж и работа с осанкой. Запись через WhatsApp и Telegram.",
    canonicalPath: "/",
    pageType: "home",
    robots: "index,follow",
    geo: true,
    preloadImage: "/assets/images/hero/hero-mobile.avif",
    preloadImageType: "image/avif",
    preloadImageSrcset: "",
    preloadImageSizes: "",
    preconnectUnsplash: false,
    structuredData: (site) => [PERSON_SCHEMA(site), BUSINESS_SCHEMA(site), HOME_FAQ, ...HOME_SERVICES.map((service) => SERVICE_SCHEMA(site, service)), ...HOME_REVIEWS.map((review) => REVIEW_SCHEMA(site, review))],
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
  "/landing-recovery.html": {
    title: "Recovery Massage at Home | Pavel Kumashkov",
    description:
      "Recovery massage at home in Moscow with calm rhythm, gentle release, and focused support.",
    canonicalPath: "/landing-recovery.html",
    pageType: "landing",
    robots: "index,follow",
    structuredData: (site) => [
      SERVICE_SCHEMA(site, {
        name: "Recovery massage at home",
        description: "Calm recovery massage format with gentle release and support.",
        canonicalPath: "/landing-recovery.html",
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
      preloadImageType: pageConfig.preloadImageType || "",
      preloadImageSrcset: pageConfig.preloadImageSrcset || "",
      preloadImageSizes: pageConfig.preloadImageSizes || "",
      preconnectUnsplash: Boolean(pageConfig.preconnectUnsplash),
      structuredDataScripts: structuredData.map((item) => JSON.stringify(item)),
    },
    pricing: PRICING_SECTION,
    packages: PACKAGES_SECTION,
  };
};

export { SITE };



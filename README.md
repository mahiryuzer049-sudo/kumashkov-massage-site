# Pavel Kumashkov — Private Body Architecture

Промо‑сайт частного массажного сервиса.

## Стек

- HTML5
- Tailwind CSS (build через Vite)
- Vanilla JavaScript
- Font Awesome
- Local fonts via `@fontsource` (Cormorant Garamond, Manrope)

## Структура проекта

```text
kumashkov-massage-website-main/
├── src/
│   ├── index.html                  # Главная страница
│   ├── privacy.html                # Политика
│   ├── landing-*.html              # Посадочные страницы
│   ├── partials/                   # Секции (Handlebars partials)
│   ├── styles/
│   │   ├── main.css                # Tailwind entry
│   │   └── custom.css              # Кастомные стили
│   └── scripts/
│       └── main.js                 # Интерактив
├── public/
│   └── assets/                     # Изображения, фавиконы, manifest
├── scripts/
│   ├── perf-budget.mjs             # Performance budget
│   ├── qa-anchors.mjs              # Проверка hash-якорей
│   └── qa-assets.mjs               # Проверка локальных ассетов
├── tailwind.config.js
├── postcss.config.cjs
├── vite.config.mjs
├── package.json
└── README.md
```

## Запуск

```bash
npm install
npm run dev
```

Откроется `http://localhost:8000`.

## Сборка

```bash
npm run build
npm run preview
```

## Где редактировать

- Контент и структура: `src/index.html`, `src/partials/`
- Стили: `src/styles/custom.css`, `src/styles/main.css`
- Логика: `src/scripts/main.js`
- Медиа и фавиконы: `public/assets/`

## Изображения

Карты слотов и требования:

- `IMAGE_UPLOAD_MAP_V3.md` — полный перечень слотов, имена файлов и пути.
- `IMAGE_BRIEF_PLACEHOLDERS.md` — бриф для подготовки реальных фото.

## Посадочные страницы

- `src/landing-classic.html`
- `src/landing-lymph.html`
- `src/landing-relax.html`
- `src/landing-posture.html`

## SEO файлы

- `public/robots.txt`
- `public/sitemap.xml` (обновляй `lastmod` при релизе)

## Проверки

- `npm run lint` — ESLint + Stylelint
- `npm run qa:anchors` — проверка hash‑якорей
- `npm run qa:assets` — проверка локальных ассетов
- `npm run qa:nav` — проверка cross-page якорей
- `npm run perf:budget` — performance budget check (gzip)
- `npm run check` — полный набор проверок (lint + build + html + anchors + assets + budget)

## Аналитика (Yandex)

Yandex Webmaster / Metrika сейчас не подключены. Если нужно:

1. Добавь мета‑тег Webmaster в `src/partials/head-seo.html`.
2. Добавь скрипт Metrika туда же.
3. При необходимости вынеси ключи в `site.config.mjs`.

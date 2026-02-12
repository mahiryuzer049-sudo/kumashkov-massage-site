# Pavel Kumashkov - Private Body Architecture

Промо-сайт частного массажного сервиса.

## Стек

- HTML5
- Tailwind CSS (build через Vite)
- Vanilla JavaScript
- Font Awesome
- Google Fonts (Cinzel, Manrope)

## Текущая структура проекта

```text
kumashkov-massage-website-main/
├── src/
│   ├── index.html              # Разметка страницы
│   ├── partials/               # Секции (Handlebars partials)
│   ├── styles/
│   │   ├── main.css            # Tailwind entry + импорт кастомных стилей
│   │   └── custom.css          # Кастомные стили
│   └── scripts/
│       └── main.js             # Весь интерактив сайта
├── public/
│   └── assets/                 # Изображения, фавиконы и др.
├── dist/                       # Сборка (после npm run build)
├── tailwind.config.js
├── postcss.config.cjs
├── vite.config.js
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

- Контент и секции: `src/index.html`
- Секции-части: `src/partials/`
- Стили: `src/styles/custom.css`
- Tailwind entry: `src/styles/main.css`
- Логика: `src/scripts/main.js`
- Изображения и фавиконы: `public/assets/`

## Изображения (плейсхолдеры)

Пока используются внешние картинки. Когда будут свои, положи их сюда:

`public/assets/images/`

Рекомендуемые имена и размеры:

- `hero.jpg` — 1920x1080 (фон первого экрана)
- `master.jpg` — 1000x1400 (портрет, вертикаль 3:4)
- `og.jpg` — 1200x630 (превью для соцсетей)

Сейчас используется `public/assets/images/og.jpg`.

## Посадочные страницы (Phase 4)

- `src/landing-classic.html`
- `src/landing-lymph.html`
- `src/landing-relax.html`
- `src/landing-posture.html`

## SEO файлы

- `public/robots.txt`
- `public/sitemap.xml` (обновляй `lastmod` при крупных изменениях)

## Проверки

- `npm run lint` — ESLint + Stylelint
- `npm run format` — Prettier
- `npm run check` — lint + build + html validation

## Аналитика (Яндекс)

Где вставлять:

1. **Yandex Webmaster**
   - В `src/index.html` в `<head>` есть комментарий `TODO: Yandex Webmaster verification meta here`.
   - Вставь туда мета‑тег вида:
     `\<meta name="yandex-verification" content="..."\>`

2. **Yandex Metrika**
   - В `src/index.html` перед закрытием `</head>` есть комментарий `TODO: Yandex Metrika counter (place script here)`.
   - Вставь туда скрипт счетчика Метррики.

## Важное

- Все ссылки WhatsApp находятся в `src/index.html` (поиск по `wa.me`).
- Интерактивные действия переведены на `data-action` атрибуты (без inline `onclick`).
- Фавиконы ожидаются в `public/assets/`:
  - `favicon-32x32.png` (32x32)
  - `favicon-16x16.png` (16x16)
  - `apple-touch-icon.png` (180x180)
  - `site.webmanifest`

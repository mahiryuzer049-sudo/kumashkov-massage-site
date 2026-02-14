# Project Structure

Проект: `pavelkumashkov.ru`  
Назначение: карта ключевых файлов и зон ответственности.

## Entry pages

- `src/index.html` — главная
- `src/privacy.html` — политика
- `src/landing-classic.html`
- `src/landing-relax.html`
- `src/landing-lymph.html`
- `src/landing-posture.html`

## Partials

- `src/partials/` — все секции главной и общие блоки (`header`, `footer`, `sticky`, `head-*`).
- `src/partials/_archive/` — архивные/неиспользуемые partials.

## Styles

- `src/styles/main.css` — Tailwind entry
- `src/styles/custom.css` — кастомные стили и токены

## Scripts

- `src/scripts/main.js` — интерактив и UI‑логика
- `scripts/perf-budget.mjs` — performance budget
- `scripts/qa-anchors.mjs` — проверка якорей
- `scripts/qa-assets.mjs` — проверка локальных ассетов

## Assets

- `public/assets/` — все статические ассеты (images, favicons, manifest)
- `public/assets/images/` — папка изображений
- `public/assets/site.webmanifest` — манифест

## Docs

- `QUALITY_GATES.md` — quality gates
- `RUNBOOK.md` — запуск/сборка/инциденты
- `RELEASE_CHECKLIST.md` — чек‑лист релиза
- `IMAGE_UPLOAD_MAP_V3.md` — карта медиа‑слотов
- `IMAGE_BRIEF_PLACEHOLDERS.md` — бриф по фото

## Config

- `site.config.mjs` — контент, SEO, pageType, structured data
- `vite.config.mjs`, `tailwind.config.js`, `postcss.config.cjs` — сборка и стили

# SEO Runbook

Проект: `pavelkumashkov.ru`

## Где править

- `site.config.mjs` — title/description/robots/canonical/OG
- `src/partials/head-seo.html` — общая SEO‑разметка
- `public/sitemap.xml` — карта сайта (`lastmod`)
- `public/robots.txt` — правила индексации

## Перед релизом

1. Проверить `title/description` для главной и landing.
2. Убедиться, что `og:image` указывает на актуальный файл.
3. Обновить `sitemap.xml` (`lastmod`).
4. Проверить `robots` для `privacy` (noindex или index по решению).

## После релиза

1. Убедиться, что страницы открываются по `canonical`.
2. Проверить `robots.txt` и `sitemap.xml`.
3. При необходимости добавить/обновить structured data.

## Yandex

Сейчас не подключено. Если нужно:

1. Добавить мета‑тег Webmaster в `head-seo.html`.
2. Добавить скрипт Metrika в `head-seo.html`.
3. По возможности вынести ключи/ID в `site.config.mjs`.

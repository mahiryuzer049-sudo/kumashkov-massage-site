# Фаза 8: SEO-машина и контент-воронка

Дата: 2026-02-12  
Проект: `pavelkumashkov.ru`  
Статус: `completed` (2026-02-13): требуется повторная валидация после изменений V3.
## Что сделано

- Усилена on-page SEO база:
  - полностью обновлен `site.config.mjs` (title/description/canonical/OG/Twitter);
  - устранены некорректные/искаженные SEO-строки;
  - добавлены `Service` schema-блоки для `landing-*` страниц.
- Усилен контентный путь на главной:
  - добавлен блок `Гид по выбору техники`;
  - добавлен блок `Маршруты по задачам`;
  - переработан `blog` в короткий экспертный формат с контентными CTA.
- Усилены посадочные страницы `landing-*`:
  - расширены H1+контент под поисковый интент;
  - добавлены внутренние ссылки между лендингами и на ключевые блоки главной;
  - добавлены целевые CTA на запись и подбор курса.
- Подготовлен контент-план на 3 месяца:
  - файл `CONTENT_PLAN_3_MONTHS.md`.

## Затронутые файлы

- `site.config.mjs`
- `src/index.html`
- `src/partials/blog.html`
- `src/partials/technique-guide.html`
- `src/partials/goal-routes.html`
- `src/landing-classic.html`
- `src/landing-lymph.html`
- `src/landing-relax.html`
- `src/landing-posture.html`
- `CONTENT_PLAN_3_MONTHS.md`

## Валидация

- `npm run check` — успешно.


# Quality Gates

Дата: 2026-02-14  
Проект: `pavelkumashkov.ru`

## Основные проверки перед релизом

1. `npm run lint`  
Проверяет JS и CSS (`eslint` + `stylelint`).

2. `npm run build`  
Собирает production-версию через Vite.

3. `npm run lint:html`  
Валидирует HTML сборки (`dist/**/*.html`).

4. `npm run qa:anchors`  
Проверяет, что `href="#..."` указывает на существующий `id` в текущем HTML.

5. `npm run qa:assets`  
Проверяет локальные `src/href` (favicon, images, css, js) в `dist`.

6. `npm run qa:scanner`  
Проверяет обязательные scanner-узлы и сценарии popup/open/close.

7. `npm run qa:nav`  
Проверяет cross-page якоря (`/#section`) на landing-страницах.

8. `npm run perf:budget`  
Проверяет performance budget по gzip-размеру критичных файлов.

9. `npm run check`  
Полный quality gate: lint + build + html validation + anchors + assets + scanner + nav + performance budget.

## Performance Budget (gzip)

- `dist/index.html` <= `30 KiB`
- `dist/landing-*.html` <= `7 KiB` каждый
- `dist/privacy.html` <= `5 KiB`
- `dist/assets/main-*.css` <= `13 KiB`
- `dist/assets/main-*.js` <= `7 KiB`
- Суммарный critical payload <= `73 KiB`
- Hero image (`/assets/images/hero/hero-main.jpg`) <= `900 KiB`
- Total images (all formats) <= `6 MB`
- Total fonts (all formats) <= `600 KiB`

## CI

Workflow `CI` запускается для:

- push в `main` и `master`
- pull request в `main` и `master`
- ручного запуска (`workflow_dispatch`)

В CI выполняется `npm run check`.

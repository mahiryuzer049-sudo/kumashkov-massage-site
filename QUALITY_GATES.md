# Quality Gates

Дата: 2026-02-12  
Проект: `pavelkumashkov.ru`

## Основные проверки перед релизом

1. `npm run lint`  
Проверяет JS и CSS (`eslint` + `stylelint`).

2. `npm run build`  
Собирает production-версию через Vite.

3. `npm run lint:html`  
Валидирует HTML сборки (`dist/**/*.html`).

4. `npm run perf:budget`  
Проверяет performance budget по gzip-размеру критичных файлов.

5. `npm run check`  
Полный quality gate: lint + build + html validation + performance budget.

## Performance Budget (gzip)

- `dist/index.html` <= `28 KiB`
- `dist/landing-*.html` <= `7 KiB` каждый
- `dist/privacy.html` <= `5 KiB`
- `dist/assets/main-*.css` <= `12 KiB`
- `dist/assets/main-*.js` <= `7 KiB`
- Суммарный critical payload <= `65 KiB`

## CI

Workflow `CI` запускается для:

- push в `main` и `master`
- pull request в `main` и `master`
- ручного запуска (`workflow_dispatch`)

В CI выполняется `npm run check`.

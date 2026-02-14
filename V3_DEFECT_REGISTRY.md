# V3 Defect Registry

Дата обновления: 2026-02-14  
Проект: `pavelkumashkov.ru`  
Связь с планом: закрывает `SUPER_FIX_PLAN_V3_SMART.md` задачи `1.1`, `1.2`, `1.3`, `1.4`, `1.5`.

## 1. Реестр дефектов V3 (верифицированная очередь)

| ID | Область | Файл/зона | Сценарий | Severity | Owner | Статус |
| --- | --- | --- | --- | --- | --- | --- |
| NAV-01 | Header IA | `src/partials/header.html` | Пункт `Политика` в quick-pages перегружал верхнее меню | medium | frontend | done |
| NAV-02 | Cross-page anchors | `src/partials/header.html` | Переходы с `landing-*`/`privacy` в секции главной | critical | frontend | done |
| NAV-03 | Footer links | `src/partials/footer.html` | Невалидные якоря на secondary pages | critical | frontend | done |
| NAV-04 | Sticky nav | `src/partials/sticky.html` | Рассинхрон целевых входов со шапкой | high | frontend | done |
| NAV-05 | Nav test coverage | `scripts/qa-nav.mjs` | Отсутствовала защита от регрессии cross-page переходов | high | qa | done |
| NAV-06 | Active section | `src/scripts/main.js` | Не подсвечивался текущий раздел при скролле | medium | frontend | done |
| NAV-07 | Mobile focus | `src/scripts/main.js` | Риск focus-loss в mobile menu | high | frontend | manual-pending |
| NAV-08 | Manual matrix | `MANUAL_CHECKLIST_V3.md` | Не пройден smoke 20/20 маршрутов | high | qa | manual-pending |
| SCN-01 | Scanner RCA | `SCANNER_RCA_V3.md` | Не было формализованного root-cause | high | frontend | done |
| SCN-02 | Zone triggers | `src/scripts/main.js`, `src/partials/scanner.html` | Нестабильные клики по зонам и shortcut-кнопкам | critical | frontend | done |
| SCN-03 | Scroll jump | `src/scripts/main.js` | Смещение вьюпорта при открытии popup | critical | frontend | done |
| SCN-04 | Popup UX | `src/partials/scanner.html`, `src/styles/custom.css` | Неполный сценарий close/keyboard/outside | high | frontend | done |
| SCN-05 | Scanner gate | `scripts/qa-scanner.mjs` | Не было автоматического smoke для 5 зон | high | qa | done |
| VIS-01 | Section seams | `src/styles/custom.css`, `src/partials/*.html` | Горизонтальные «швы» между секциями | critical | frontend | done |
| VIS-02 | Unified canvas | `src/styles/custom.css` | Несвязанные фоновые системы блоков | high | frontend | done |
| VIS-03 | Transition motifs | `src/styles/custom.css` | Жесткие стыки между соседними секциями | medium | frontend | done |
| VIS-04 | Pixel verification | `recovery/screenshots/screen_for_update/*` | Не подтверждено устранение проблемных зон по скринам | high | qa | manual-pending |
| VIS-05 | No-seams regression | `MANUAL_CHECKLIST_V3.md` | Нет ручного PASS по чек-листу 15 переходов | medium | qa | manual-pending |
| CARD-01 | Private access block | `src/partials/private-access.html`, `src/index.html` | Фирменный блок отсутствовал | high | frontend | done |
| CARD-02 | 3D behavior | `src/scripts/main.js`, `src/styles/custom.css` | Не было полноценных tilt/glare/depth реакций | medium | frontend | done |
| CARD-03 | Fallback safety | `src/styles/custom.css` | Риск артефактов на mobile/reduced-motion | high | frontend | done |
| CARD-04 | CTA binding | `src/partials/private-access.html` | Блок без конверсионного сценария | high | frontend | done |
| CARD-05 | Card QA | `MANUAL_CHECKLIST_V3.md` | Не пройден финальный визуально-поведенческий smoke | medium | qa | manual-pending |
| MEDIA-01 | Favicon 404 | `public/assets/*`, `src/partials/head-core.html` | Отсутствовали системные favicon-файлы | critical | frontend | done |
| MEDIA-02 | Asset existence | `scripts/qa-assets.mjs` | Не ловились missing local assets в `dist` | critical | qa | done |
| MEDIA-03 | Responsive images | `src/partials/*` | Недостаточное покрытие `srcset/sizes` | high | frontend | done |
| MEDIA-04 | Production photo pack | `public/assets/images/*` | Часть контента требует финальных реальных фото | high | content-owner | blocked-external |
| MEDIA-05 | Upload map | `IMAGE_UPLOAD_MAP_V3.md` | Отсутствовала централизованная карта загрузки | high | content-owner | done |
| COPY-01 | Placeholder copy | `src/partials/professional-profile.html`, `src/partials/space-gallery.html` | Технические подписи в клиентском UI | medium | content-owner | done |
| COPY-02 | TODO leakage | `src/partials/*` | Незакрытые TODO в пользовательских partials | high | frontend | done |
| TYPO-01 | Micro fonts | `src/partials/*`, `src/styles/custom.css` | `text-[8/9/10px]` в активных блоках | high | frontend | done |
| A11Y-01 | Skip-link coverage | `src/privacy.html`, entry pages | На `privacy` отсутствовал skip-link | high | frontend | done |
| A11Y-02 | Contrast floor | `src/styles/custom.css` | Слабый контраст в части текстовых лейблов | high | frontend | done |
| A11Y-03 | Keyboard flow | `MANUAL_CHECKLIST_V3.md` | Не завершен ручной tab-order smoke | high | qa | manual-pending |
| SEO-01 | Yandex placeholders | `src/partials/head-seo.html`, `site.config.mjs` | Незавершенные TODO по Metrika/Webmaster | medium | seo | done |
| SEO-02 | Robots policy | `site.config.mjs`, `public/sitemap.xml` | Нужна согласованность `privacy` и индексации | medium | seo | done |
| SEO-03 | Structured data validation | external validator | Не выполнен внешний schema-валидатор | medium | seo | manual-pending |
| PERF-01 | Budget drift | `scripts/perf-budget.mjs` | Старые пороги не соответствовали расширенному V3 | high | frontend | done |
| PERF-02 | Low-power effects | `src/scripts/main.js`, `src/styles/custom.css` | Нужен ручной smoke fallback-сценариев | medium | qa | manual-pending |
| PERF-03 | Before/after perf report | `MANUAL_CHECKLIST_V3.md` | Не оформлен итоговый сравнительный perf-отчет | medium | qa | manual-pending |
| DOC-01 | README sync | `README.md` | Устаревшие инструкции по архитектуре и QA-командам | medium | frontend | done |
| DOC-02 | Runbook/Checklist sync | `RUNBOOK.md`, `RELEASE_CHECKLIST.md`, `QUALITY_GATES.md` | Расхождение процесса и фактических команд | medium | qa | done |
| DOC-03 | Project structure map | `PROJECT_STRUCTURE.md` | Не было карты entry/partials/scripts/docs | low | frontend | done |

## 2. Definition of Done по приоритетам

### P0 DoD

- `npm run check` = `PASS` локально и в CI.
- Нет broken anchors и missing local assets (`qa:anchors`, `qa:assets`, `qa:nav`, `qa:scanner` = `PASS`).
- Нет активных критичных дефектов навигации/scanner/ассетов.
- Ручные P0 smoke-пункты переведены в `PASS` в `MANUAL_CHECKLIST_V3.md`.

### P1 DoD

- Автоматические quality gates стабильны минимум в двух последовательных прогонах.
- Для каждого P1-пункта есть либо кодовый фикс, либо явный внешний блокер.
- UI не содержит `TODO/placeholder` в пользовательских секциях.
- Завершены ручные UX/a11y проверки, влияющие на доверие/конверсию.

### P2 DoD

- Документы синхронизированы с фактическим кодом и командами.
- Нет orphan-частей в активной структуре (`src/partials/_archive` допустим как архив).
- Поддерживающие артефакты (runbook, структура проекта, регламенты) обновлены и применимы.

## 3. Baseline-метрики (после фиксов, 2026-02-14)

| Метрика | Значение | Источник |
| --- | --- | --- |
| Полный pipeline | `PASS` | `npm run check` |
| Якоря | `PASS (6 files)` | `npm run qa:anchors` |
| Локальные ассеты | `PASS (6 files)` | `npm run qa:assets` |
| Scanner smoke | `PASS` | `npm run qa:scanner` |
| Cross-page навигация | `PASS (5 files)` | `npm run qa:nav` |
| `index.html` gzip | `29.18 KiB / 30.00 KiB` | `npm run perf:budget` |
| `main.css` gzip | `12.05 KiB / 13.00 KiB` | `npm run perf:budget` |
| `main.js` gzip | `6.33 KiB / 7.00 KiB` | `npm run perf:budget` |
| Total critical payload | `72.25 KiB / 73.00 KiB` | `npm run perf:budget` |
| Total images | `1951.30 KiB / 6144.00 KiB` | `npm run perf:budget` |
| Total fonts | `263.89 KiB / 600.00 KiB` | `npm run perf:budget` |
| Hero image | `42.36 KiB / 900.00 KiB` | `npm run perf:budget` |
| Микрошрифты `text-[8/9/10px]` (active) | `0` | `rg` (без `src/partials/_archive`) |
| `TODO/placeholder` в active UI | `0` | `rg` (без `src/partials/_archive`) |
| Skip-link coverage entry pages | `6/6` | `src/index.html`, `src/privacy.html`, `src/landing-*.html` |

## 4. Cadence и шаблоны отчётности

### Daily Triage (15 мин)

- Время: ежедневно, фиксированное окно (рекомендуемо 10:00 локально).
- Участники: frontend owner, content owner, QA owner.
- Выход:
  - список новых дефектов за сутки;
  - изменение severity/owner;
  - статус блокеров (`manual`, `external`, `tech`).

Шаблон daily-отчета:

```md
Дата:
Новые дефекты:
Изменения severity/owner:
Закрыто сегодня:
Блокеры:
План до следующего triage:
```

### Weekly QA Review (30–45 мин)

- Время: 1 раз в неделю (рекомендуемо понедельник, 12:00).
- Вход: `npm run check`, `MANUAL_CHECKLIST_V3.md`, release checklist.
- Выход:
  - P0/P1/P2 burn-down;
  - список ручных проверок к закрытию;
  - решение по релизной готовности (`go/no-go`).

Шаблон weekly-отчета:

```md
Неделя:
P0 статус:
P1 статус:
P2 статус:
Automation gates:
Manual QA:
Go/No-Go:
Риски следующей недели:
```

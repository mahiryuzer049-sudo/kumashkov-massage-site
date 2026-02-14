# MANUAL CHECKLIST V3

Проект: `pavelkumashkov.ru`  
Назначение: ручные проверки, отложенные по просьбе не запускать тесты/смоуки.

## Подготовка

- Запуск: `npm run dev`.
- Базовый URL: `http://localhost:8000`.
- Страницы: `/`, `/landing-classic.html`, `/landing-relax.html`, `/landing-lymph.html`, `/landing-posture.html`, `/privacy.html`.
- Вьюпорты: desktop `1440x900`, mobile `390x844`.

## P0/P1 ручные проверки

- [ ] `2.5` Навигационный smoke (desktop/mobile) на 6 страницах.
- [ ] `3.5` Favicon smoke в Chrome/Safari/Firefox.
- [ ] `4.5` Визуальный QA медиаслоя (desktop/mobile, 100%/125%).
- [ ] `5.4` Типографика: 100%/125% и 320–430px без overflow/overlap.
- [ ] `5.5` Быстрая валидация читаемости (3 сценария).
- [ ] `6.2` Tab-order/focus-visible для header/menu/scanner/sticky.
- [ ] `6.3` Lighthouse/Axe accessibility (главная + 1 landing).
- [ ] `7.4` Structured data validation (FAQ/Service/Person/Business).
- [ ] `8.4` Low-power effects smoke (слабое устройство/энергосбережение).
- [ ] `8.5` Perf сравнение before/after (LCP/CLS/INP/Total payload).
Примечание: payload-часть заполнена в `PERF_REPORT_V3.md`, LCP/CLS/INP требуют ручного Lighthouse прогона.
- [ ] `10.3` Визуальный regression smoke (6 страниц, desktop+mobile).
- [ ] `10.4` Релиз-кандидат V3 по чек-листу.
- [ ] `10.5` Hypercare 7 дней после релиза.
- [ ] `11.5` User-path матрица (landing/privacy -> разделы главной).
- [ ] `12.5` UX-аудит «first-time visitor» (10 сценариев).
- [ ] `14.5` No-seams регрессионный чек (15 переходов).
- [ ] `15.5` Private access card QA (анимация/hover/tab/mobile/perf).
- [ ] `16.5` Creative QA: уникальность 8 ключевых блоков.

## Навигационная матрица (11.5)

Фиксируем клики с `landing-*` и `privacy` на ключевые разделы главной.

| Source page | Target anchor | Ожидание | Result | Notes |
| --- | --- | --- | --- | --- |
| `/landing-classic.html` | `/#trust` | Переход к разделу `#trust` на главной |  |  |
| `/landing-classic.html` | `/#services` | Переход к `#services` |  |  |
| `/landing-classic.html` | `/#scanner` | Переход к `#scanner` |  |  |
| `/landing-classic.html` | `/#goal-routes` | Переход к `#goal-routes` |  |  |
| `/landing-classic.html` | `/#results` | Переход к `#results` |  |  |
| `/landing-classic.html` | `/#blog` | Переход к `#blog` |  |  |
| `/landing-classic.html` | `/#how-to-book` | Переход к `#how-to-book` |  |  |
| `/landing-relax.html` | `/#trust` | Переход к `#trust` |  |  |
| `/landing-relax.html` | `/#services` | Переход к `#services` |  |  |
| `/landing-relax.html` | `/#scanner` | Переход к `#scanner` |  |  |
| `/landing-relax.html` | `/#goal-routes` | Переход к `#goal-routes` |  |  |
| `/landing-relax.html` | `/#results` | Переход к `#results` |  |  |
| `/landing-relax.html` | `/#blog` | Переход к `#blog` |  |  |
| `/landing-relax.html` | `/#how-to-book` | Переход к `#how-to-book` |  |  |
| `/landing-lymph.html` | `/#trust` | Переход к `#trust` |  |  |
| `/landing-lymph.html` | `/#services` | Переход к `#services` |  |  |
| `/landing-lymph.html` | `/#scanner` | Переход к `#scanner` |  |  |
| `/landing-lymph.html` | `/#goal-routes` | Переход к `#goal-routes` |  |  |
| `/landing-lymph.html` | `/#results` | Переход к `#results` |  |  |
| `/landing-lymph.html` | `/#blog` | Переход к `#blog` |  |  |
| `/landing-lymph.html` | `/#how-to-book` | Переход к `#how-to-book` |  |  |
| `/landing-posture.html` | `/#trust` | Переход к `#trust` |  |  |
| `/landing-posture.html` | `/#services` | Переход к `#services` |  |  |
| `/landing-posture.html` | `/#scanner` | Переход к `#scanner` |  |  |
| `/landing-posture.html` | `/#goal-routes` | Переход к `#goal-routes` |  |  |
| `/landing-posture.html` | `/#results` | Переход к `#results` |  |  |
| `/landing-posture.html` | `/#blog` | Переход к `#blog` |  |  |
| `/landing-posture.html` | `/#how-to-book` | Переход к `#how-to-book` |  |  |
| `/privacy.html` | `/#trust` | Переход к `#trust` |  |  |
| `/privacy.html` | `/#services` | Переход к `#services` |  |  |
| `/privacy.html` | `/#scanner` | Переход к `#scanner` |  |  |
| `/privacy.html` | `/#goal-routes` | Переход к `#goal-routes` |  |  |
| `/privacy.html` | `/#results` | Переход к `#results` |  |  |
| `/privacy.html` | `/#blog` | Переход к `#blog` |  |  |
| `/privacy.html` | `/#how-to-book` | Переход к `#how-to-book` |  |  |

## Focus/Tab order (6.2) — чек-лист

- Header: логотип, пункты `Формат/Услуги/Сканер/Маршруты/Результат/Блог/Запись`.
- Mobile menu: toggle, первый пункт, последний пункт, выход фокуса.
- Scanner: точки, shortcut-кнопки, close, Esc.
- Sticky bar: `Сканер`, `Пакеты`, `Блог`, `Запись`.

## Low-power effects (8.4)

- Включить энергосбережение или `prefers-reduced-motion`.
- Проверить: нет курсора/spotlight, нет «дрожания» блоков, popup сканера стабильный.

## Lighthouse/Axe (6.3)

- Прогон на `/` и одной `landing-*`.
- Записать LCP/CLS/INP в `PERF_REPORT_V3.md`.

## Примечание

Пока ручные проверки отложены, соответствующие задачи остаются в статусе `blocked`.

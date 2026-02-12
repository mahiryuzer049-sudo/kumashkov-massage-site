# Фаза 2: Информационная Архитектура и Сценарий Страницы

Дата: 2026-02-12  
Проект: `pavelkumashkov.ru`  
Статус: `completed`

## Что сделано

- Пересобран порядок секций в `src/index.html` под сценарий воронки.
- Добавлены два новых блока:
  - `src/partials/how-to-book.html` — «Как записаться за 3 шага».
  - `src/partials/after-request.html` — «Что будет после заявки».
- Упрощена навигация в `src/partials/header.html` до 6 якорей с понятной логикой.
- Добавлены/выравнены якоря ключевых секций:
  - `id="trust"` в `src/partials/trust.html`
  - `id="pricing"` в `src/partials/pricing.html`
- В блоке trust CTA переведен в secondary-режим, primary CTA закреплен в pricing/booking.

## Новая последовательность секций

1. `hero`
2. `usp`
3. `fit`
4. `trust`
5. `master`
6. `services`
7. `scanner`
8. `results`
9. `voices`
10. `safety`
11. `suitability`
12. `expectations`
13. `pricing`
14. `how-to-book`
15. `after-request`
16. `booking`
17. `ritual`
18. `atmosphere`
19. `philosophy`
20. `life`
21. `blog`

## Навигация (desktop/mobile)

- Формат
- Техники
- Результат
- Цена
- Запись
- Контакт

## Валидация

- `npm run check` — успешно (lint + build + html validation).

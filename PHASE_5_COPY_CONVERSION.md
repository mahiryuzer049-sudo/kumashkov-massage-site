# Фаза 5: Контент и копирайт под конверсию

Дата: 2026-02-12  
Проект: `pavelkumashkov.ru`  
Статус: `completed`

## Что сделано

- Полностью переписан copy в ключевых конверсионных секциях:
  - `safety` — спокойная профессиональная коммуникация, правила, FAQ;
  - `suitability` — понятный fit/не-fit, когда переносить, как уточнить заранее;
  - `pricing` — прозрачный оффер первого визита, что входит в стоимость, primary/secondary CTA;
  - `booking` — прямой сценарий записи, мини-опрос в 4 шага.
- Добавлен новый блок `request-scenarios`:
  - 4 коротких сценария запроса;
  - готовые WhatsApp-сообщения в один клик для снижения трения.
- Внесена точечная корректировка CTA-ссылок Telegram:
  - исправлен формат ссылки в `booking` и `protocol` (используется `{{site.telegram}}` как готовый URL).
- Добавлены новые стили под copy-блоки:
  - `faq-panel`, `faq-summary`, `safety-item`, `booking-checklist` и связанные элементы.

## Затронутые файлы

- `src/partials/safety.html`
- `src/partials/suitability.html`
- `src/partials/pricing.html`
- `src/partials/booking.html`
- `src/partials/request-scenarios.html`
- `src/partials/protocol.html`
- `src/index.html`
- `src/styles/custom.css`

## Результат фазы

- Сообщения стали короче и конкретнее: меньше абстракций, больше понятных действий.
- CTA-иерархия стала читаемой: основной шаг — старт чата, вторичный — уточнение деталей.
- Пользователю проще начать диалог: доступны готовые сценарии обращения.

## Валидация

- `npm run check` — успешно (JS/CSS lint + build + HTML validation).

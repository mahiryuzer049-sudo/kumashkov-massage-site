# Фаза 6: Доверие, доказательства и репутационная упаковка

Дата: 2026-02-12  
Проект: `pavelkumashkov.ru`  
Статус: `completed`

## Что сделано

- Усилен trust-блок:
  - четко описан формат первого визита;
  - структурировано «что входит» и почему это снижает тревогу;
  - сохранена понятная CTA-логика в чат.
- Полностью обновлен блок отзывов:
  - короткие, читаемые кейсы «после встречи»;
  - акцент на тактичность, прозрачность и комфорт.
- Добавлены 3 новых доказательных секции:
  - `professional-profile` — профиль мастера + блок сертификатов (placeholders);
  - `space-gallery` — фото пространства/материалов (placeholders);
  - `transparent-rules` — правила до/во время/после визита.
- В `index.html` обновлен сценарий:
  - устаревший `master` заменен на новые секции доверия:
    - `professional-profile`
    - `space-gallery`
    - `transparent-rules`

## Placeholders под реальные материалы

- Сертификаты:
  - `public/assets/images/certs/cert-01.jpg` (1600x1200)
  - `public/assets/images/certs/cert-02.jpg` (1600x1200)
  - `public/assets/images/certs/cert-03.jpg` (1600x1200)
- Фото пространства:
  - `public/assets/images/space/room-01.jpg` (2000x1300)
  - `public/assets/images/space/room-02.jpg` (2000x1300)
  - `public/assets/images/space/materials-01.jpg` (1600x1200)

## Затронутые файлы

- `src/partials/trust.html`
- `src/partials/voices.html`
- `src/partials/professional-profile.html`
- `src/partials/space-gallery.html`
- `src/partials/transparent-rules.html`
- `src/index.html`

## Валидация

- `npm run check` — успешно (JS/CSS lint + build + HTML validation).

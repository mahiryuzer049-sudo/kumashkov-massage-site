# Release Checklist

## Перед релизом

1. `npm run check`
2. Проверить загрузку:
   - `src/index.html`
   - `src/landing-classic.html`
   - `src/landing-lymph.html`
   - `src/landing-relax.html`
   - `src/landing-posture.html`
   - `src/privacy.html`
3. Проверить клики CTA (WhatsApp/Telegram).
4. Проверить мобильное меню и сканер.
5. Проверить SEO:
   - title/description/og
   - sitemap/robots

## Деплой

1. Выполнить `npm run build`
2. Залить `dist/` на хостинг
3. Проверить `public/_headers` в хостинге (Netlify/CF Pages)

## После релиза

1. Быстрый чек Lighthouse (mobile).
2. Проверить доступность страниц по прямым URL.

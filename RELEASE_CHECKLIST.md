# Release Checklist

## Перед релизом

1. `npm run check`
2. Проверить загрузку страниц:
   - `src/index.html`
   - `src/landing-classic.html`
   - `src/landing-lymph.html`
   - `src/landing-relax.html`
   - `src/landing-posture.html`
   - `src/privacy.html`
3. Проверить клики CTA (WhatsApp/Telegram).
4. Проверить мобильное меню и сканер.
5. A11y smoke:
   - skip-link на главной и privacy
   - видимость фокуса на кнопках/ссылках
   - навигация клавиатурой по меню и сканеру
6. Проверить SEO:
   - title/description/og
   - sitemap/robots
7. Проверить favicon на 1 странице в браузере.

## Деплой

1. Выполнить `npm run build`
2. Залить `dist/` на хостинг
3. Проверить `public/_headers` в хостинге (Netlify/CF Pages)

## После релиза

1. Быстрый чек Lighthouse (mobile)
2. Проверить доступность страниц по прямым URL

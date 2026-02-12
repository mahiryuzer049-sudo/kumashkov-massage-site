# Image Brief (Phase 2)

Дата: 2026-02-12  
Статус: `ready` (слоты уже встроены в сайт, пока стоят временные placeholders)

## Что уже сделано

- В ключевые секции добавлены image-slots с готовыми путями.
- В `public/assets/images/...` созданы временные файлы-заглушки.
- Когда будут ваши фото, просто заменяете файлы с теми же именами.

## Список файлов для замены

1. Hero
- `public/assets/images/hero/hero-main.jpg`
- Рекомендовано: 2560x1440, минимум 1920x1080
- Сюжет: интерьер, мягкий теплый свет, без крупного лица

2. Trust / Process
- `public/assets/images/trust/process-01.jpg`
- `public/assets/images/trust/process-02.jpg`
- Рекомендовано: 1600x1000
- Сюжет: подготовка пространства, материалы, чистая рабочая зона

3. Services (4 карточки)
- `public/assets/images/services/classic.jpg`
- `public/assets/images/services/relax.jpg`
- `public/assets/images/services/lymph.jpg`
- `public/assets/images/services/posture.jpg`
- Рекомендовано: 1400x1050 (4:3)
- Сюжет: абстрактные или предметные кадры под каждую услугу

4. Results
- `public/assets/images/results/results-main.jpg`
- Рекомендовано: 2000x900 (wide)
- Сюжет: спокойный lifestyle-кадр после сеанса

5. Blog covers (6 карточек)
- `public/assets/images/blog/blog-01.jpg`
- `public/assets/images/blog/blog-02.jpg`
- `public/assets/images/blog/blog-03.jpg`
- `public/assets/images/blog/blog-04.jpg`
- `public/assets/images/blog/blog-05.jpg`
- `public/assets/images/blog/blog-06.jpg`
- Рекомендовано: 1200x750 (16:10)
- Сюжет: простые атмосферные иллюстрации под темы мини-статей

6. Space gallery (6 кадров)
- `public/assets/images/space/space-01.jpg`
- `public/assets/images/space/space-02.jpg`
- `public/assets/images/space/space-03.jpg`
- `public/assets/images/space/space-04.jpg`
- `public/assets/images/space/space-05.jpg`
- `public/assets/images/space/space-06.jpg`
- Рекомендовано: 1600x1200
- Сюжет: интерьер, текстиль, свет, детали атмосферы

7. Certificates
- `public/assets/images/certs/cert-01.jpg`
- `public/assets/images/certs/cert-02.jpg`
- `public/assets/images/certs/cert-03.jpg`
- Рекомендовано: 1600x1200
- Сюжет: фото сертификатов без искажений, ровный свет, читаемые данные

## Как быстро заменить

1. Подготовить фото в нужных пропорциях.
2. Сохранить под теми же именами и путями.
3. Выполнить:
```powershell
npm run build
git add .
git commit -m "Update real photos"
git push
git subtree push --prefix dist origin gh-pages
```


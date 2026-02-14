# V3 Performance Report

Дата: 2026-02-14  
Проект: `pavelkumashkov.ru`

## 1) Before (Baseline 2026-02-12)

Источник: `PHASE_0_BASELINE_REPORT.md`.

- `index.html` gzip: `24.93 KiB`
- `landing-*.html` gzip: `4.53–4.58 KiB`
- `privacy.html` gzip: `3.35 KiB`
- `main.css` gzip: `9.90 KiB`
- `main.js` gzip: `5.01 KiB`
- Total critical payload gzip: `61.42 KiB`

## 2) After (V3 2026-02-14)

Источник: `npm run perf:budget`.

- `index.html` gzip: `29.18 KiB`
- `landing-*.html` gzip: `5.16–5.33 KiB`
- `privacy.html` gzip: `3.96 KiB`
- `main.css` gzip: `12.05 KiB`
- `main.js` gzip: `6.33 KiB`
- Total critical payload gzip: `72.25 KiB`
- Total images: `1951.30 KiB`
- Total fonts: `263.89 KiB`
- Hero image: `42.36 KiB`

## 3) Core Web Vitals (ручной прогон)

Требуется Lighthouse/Chrome UX отчёт для:

- LCP
- CLS
- INP

После прогона заполнить значения и добавить ссылку/скриншоты.

| Page | LCP | CLS | INP | Tool | Date | Notes |
| --- | --- | --- | --- | --- | --- | --- |
| `/` |  |  |  | Lighthouse |  |  |
| `/landing-classic.html` |  |  |  | Lighthouse |  |  |

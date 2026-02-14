# Typography Audit

Дата: 2026-02-13  
Проект: `pavelkumashkov.ru`

## Инвентаризация микрошрифтов (src/)

- `text-[8px]`: 2
- `text-[9px]`: 8
- `text-[10px]`: 8
- `text-[11px]`: 204

## Минимальные размеры (принято)

Фактические минимумы через override в `src/styles/custom.css`:

- `text-[8px]` -> 10px
- `text-[9px]` -> 11px
- `text-[10px]` -> 12px
- `text-[11px]` -> 12.5px
- `text-[12px]` -> 13px
- `text-xs` -> 0.82rem (≈13px)

## Примечание

Цель: комфортное чтение на 100% масштабе без необходимости zoom 125%.

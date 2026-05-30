# Карточный Аналитик — AI-анализатор карточек Ozon / WB

Инструмент на базе Claude AI для анализа и оптимизации товарных карточек на Ozon и Wildberries.

## Что делает

Вставляешь заголовок, описание, отзывы и конкурентов — получаешь:

- **SEO-оценку** карточки от 0 до 100
- **SEO-анализ** — конкретные проблемы и упущенные ключевые слова
- **3 варианта нового заголовка** — под характеристики, боль покупателя, уникальность
- **Улучшенное описание** — готовый текст для замены
- **Гипотезы для CTR** — фото, бейджи, акции
- **Идеи для инфографики** — 4–5 слайдов с тезисами
- **Анализ отзывов** — причины негатива и что усилить в описании

## Стек

- Frontend: HTML / CSS / Vanilla JS (один файл, без фреймворков)
- Backend: Vercel Serverless Functions (Node.js)
- AI: Anthropic Claude claude-sonnet-4-20250514

## Деплой на Vercel (5 минут)

### 1. Клонируй репозиторий

```bash
git clone https://github.com/YOUR_USERNAME/ozon-analyzer.git
cd ozon-analyzer
```

### 2. Установи Vercel CLI

```bash
npm install -g vercel
```

### 3. Задеплой

```bash
vercel
```

При первом запуске Vercel спросит настройки — всё оставь по умолчанию.

### 4. Добавь API ключ

В [dashboard.vercel.com](https://dashboard.vercel.com) → твой проект → **Settings → Environment Variables**:

```
ANTHROPIC_API_KEY = sk-ant-...
```

Затем передеплой:

```bash
vercel --prod
```

Готово. Получишь ссылку вида `https://ozon-analyzer.vercel.app`

## Структура проекта

```
ozon-analyzer/
├── index.html      # весь фронтенд
├── api/
│   └── analyze.js  # serverless-функция, вызывает Claude API
└── README.md
```

## Скриншоты

> _Добавь сюда скриншоты до/после по реальному товару_

## Лицензия

MIT

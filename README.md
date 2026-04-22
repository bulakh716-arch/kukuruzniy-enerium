# Enerium Rebuild Handoff

## Что происходит сейчас

Текущий лендинг выведен в облегчённый режим.

Что сохраняем как основу проекта:

- весь продуктовый смысл и тексты из `src/lib/constants.ts`
- цветовую систему из `tailwind.config.ts`
- базовые UI-токены и типографические утилиты из `src/app/globals.css`

Что больше не считаем обязательным:

- старую композицию секций
- старые фоновые FX
- persistent 3D-сцену на весь сайт
- fluid cursor
- audio-reactive слой

Новая цель: пересобрать лендинг с нуля, сохранив продуктовый смысл, тексты и палитру, но сделать сайт заметно легче, чище и быстрее.

## Главные правила проекта

Эти правила нельзя нарушать ни одной из нейронок:

- бренд: Enerium
- tagline: Your Health, Reimagined by AI
- все тексты и продуктовые смыслы берутся из `src/lib/constants.ts`
- фирменная палитра строится вокруг `#050505`, `#B7F46B`, `#6DAE2C`
- максимум 5 основных секций на лендинге
- один главный 3D-момент на сайте
- 3D используется только в hero или как очень точечный акцент
- никакого кастомного курсора
- никакой full-page persistent 3D-сцены
- никаких always-on particles на весь сайт
- никаких audio-reactive эффектов
- мобильная версия должна быть сильно легче десктопной

## Источники правды

Перед любой работой обе нейронки должны опираться на эти файлы:

- `src/lib/constants.ts`
- `tailwind.config.ts`
- `src/app/globals.css`
- этот `README.md`

Нельзя:

- переписывать продуктовые тексты на свой вкус
- придумывать новые фичи без явной причины
- менять палитру в сторону другого бренда
- раздувать структуру лендинга больше 5 секций

## Структура нового лендинга

Новый лендинг должен состоять максимум из 5 секций.

### 1. Hero

Смысл:

- показать бренд
- дать один сильный wow-момент
- раскрыть AI value proposition
- использовать Instagram reel как mood/video layer
- показать 3D reveal логотипа Enerium

Контент:

- `BRAND.name`
- `BRAND.tagline`
- `BRAND.description`
- `STATS`

### 2. Plate Balance Mini-Game

Смысл:

- показать геймификацию продукта
- дать понятный интерактив
- привязать награду к `3 days free trial`

Контент:

- логика здоровой тарелки
- reward flow после победы

### 3. AI Superpowers

Смысл:

- вынести 3 главные AI-функции в чистую подачу

Контент:

- Vision AI
- Smart Meal Planning
- Adaptive Intelligence

Источник:

- `AI_FEATURES`

### 4. Ecosystem

Смысл:

- показать, что Enerium это единая health-система, а не одна узкая функция

Контент:

- Nutrition
- Fitness
- Hydration
- Kitchen
- Analytics

Источник:

- `ECOSYSTEM_PILLARS`

### 5. Pricing / CTA

Смысл:

- замкнуть путь пользователя
- показать download / app store actions
- связать CTA с trial reward

## Порядок работы, чтобы ошибки не наслаивались

Работа идёт строго по фазам.

Следующая фаза не начинается, пока предыдущая не утверждена.

### Фаза 1. Gemini делает только дизайн-концепт

Gemini не пишет production code.

Gemini не занимается backend.

Gemini не занимается performance optimization как финальной задачей.

Результат фазы:

- дизайн-система лендинга
- структура 5 секций
- визуальная логика mini-game
- правила mobile fallback
- hero 3D direction

### Фаза 2. Утверждение дизайн-направления

До начала кодинга должно быть зафиксировано:

- какие именно 5 секций остаются
- как выглядит hero
- как выглядит mini-game
- где именно есть 3D и где его нет
- как выглядит mobile fallback

### Фаза 3. Claude делает реализацию

Claude не меняет утверждённый контентовый каркас без причины.

Claude переводит утверждённый дизайн в Next.js-реализацию.

### Фаза 4. Claude делает backend и performance pass

Backend и оптимизация делаются после того, как фронтенд-структура уже понятна.

Нельзя смешивать все задачи в один проход.

## Gemini 3.1 Pro — зона ответственности

### Роль

Gemini отвечает только за визуальное направление и UX-концепт.

### Что Gemini получает на вход

- этот `README.md`
- референсы пользователя
- текущие тексты из `src/lib/constants.ts`
- ограничение по палитре
- ограничение по производительности

### Что Gemini должен сделать

Gemini должен:

- собрать новую визуальную концепцию лендинга с нуля
- уложить всё в 5 секций максимум
- сохранить ощущение premium tech / AI health brand
- предложить hero с 3D-лого и видео-слоем
- предложить layout mini-game Plate Balance
- показать, как упаковать AI, ecosystem и CTA без перегруза
- описать mobile fallback
- описать motion system без тяжёлых бесконечных эффектов

### Что Gemini не должен делать

Gemini не должен:

- писать production React code
- принимать архитектурные backend-решения
- предлагать persistent 3D background на весь сайт
- предлагать custom cursor
- предлагать много параллельных shader/fx слоёв
- выходить за предел 5 секций
- переписывать copy от себя

### Что Gemini должен отдать на выходе

Gemini должен вернуть строго структурированный результат:

1. общее арт-направление
2. структура из 5 секций
3. описание каждой секции
4. hero concept
5. mini-game concept
6. motion rules
7. mobile adaptation rules
8. список запретов для реализации

### Критерии приёмки для Gemini

Результат Gemini принимается только если:

- секций не больше 5
- hero действительно один главный wow-момент
- 3D не размазан по всему сайту
- mini-game выглядит интересно, но может быть реализована легко
- mobile версия не повторяет тяжёлую desktop-логику
- контент проекта не потерян

## Готовый промпт для Gemini 3.1 Pro

```text
You are designing a new landing page for Enerium from scratch.

Context:
- The current site is visually overloaded and feels laggy.
- We want to keep the product meaning, copy, and brand palette, but rebuild the visual system from zero.
- The result must feel premium, cinematic, and modern, but much lighter and more controlled.

Source of truth:
- Keep the existing product meaning and feature hierarchy.
- Keep the brand name Enerium.
- Keep the tagline: "Your Health, Reimagined by AI".
- Keep the dark palette built around #050505, #B7F46B, and #6DAE2C.

Strict constraints:
- Maximum 5 major sections.
- No custom cursor.
- No persistent full-page 3D scene.
- No always-on particle background.
- No audio-reactive effects.
- Only one major 3D moment on the site.
- Mobile must be much lighter than desktop.

References:
- kinem.studio/projects for premium pacing and composition
- Joe Hitch references for 3D logo treatment
- Instagram reel supplied by the user for the hero mood/video layer

Required section structure:
1. Hero
2. Plate Balance mini-game
3. AI Superpowers
4. Ecosystem
5. Pricing / CTA

Content meaning to preserve:
- Hero introduces the AI health app and brand
- Mini-game rewards the user with 3 free trial days
- AI section covers Vision AI, Smart Meal Planning, Adaptive Intelligence
- Ecosystem section covers Nutrition, Fitness, Hydration, Kitchen, Analytics
- CTA section converts to store download / trial activation

Your task:
- Create a fresh visual concept for all 5 sections
- Keep the interface elegant and restrained
- Reduce clutter, reduce simultaneous effects, increase clarity
- Design a hero with a 3D Enerium logo reveal and video mood layer
- Design Plate Balance as a lightweight-looking 2.5D game, not a heavy game engine scene
- Define typography, spacing, color usage, materials, and motion behavior
- Define how the design adapts on mobile

Output format:
1. Art direction summary
2. Section-by-section breakdown
3. Hero visual concept
4. Plate Balance visual concept
5. Motion rules
6. Mobile adaptation rules
7. Things the implementation must avoid

Do not generate code.
Do not redesign the content model.
Do not add extra sections.
```

## Claude Code 4.6 Opus — зона ответственности

### Роль

Claude отвечает за реализацию, backend skeleton и performance discipline.

### Что Claude получает на вход

- этот `README.md`
- утверждённый результат Gemini
- текущий Next.js проект
- тексты из `src/lib/constants.ts`

### Что Claude должен сделать

Claude должен:

- реализовать новый лендинг в текущем Next.js проекте
- сохранить весь утверждённый контентовый смысл
- не перегрузить сайт runtime-эффектами
- построить hero с контролируемым 3D
- реализовать Plate Balance как лёгкую 2.5D механику
- добавить backend skeleton для trial flow
- провести оптимизацию после реализации

### Что Claude не должен делать

Claude не должен:

- возвращать persistent scene на весь сайт
- возвращать fluid cursor
- делать вторую тяжёлую WebGL-сцену для mini-game
- тянуть physics engine без критической необходимости
- плодить бесконечные фоновые эффекты
- менять брендовый copywriting без причины
- одновременно переписывать дизайн и backend без утверждённого дизайна

### Что Claude должен отдать на выходе

Claude должен отдать:

1. новую архитектуру homepage
2. новые секции по утверждённой структуре
3. lightweight mini-game
4. API route scaffold
5. trial activation flow
6. lazy-loading strategy
7. performance pass

### Критерии приёмки для Claude

Результат Claude принимается только если:

- сайт визуально чище старой версии
- сайт ощущается быстрее старой версии
- тексты и продуктовые смыслы сохранены
- 3D не ломает мобильную версию
- mini-game не создаёт вторую тяжёлую графическую систему
- backend trial flow можно подключить без переделки фронта

## Готовый промпт для Claude Code 4.6 Opus

```text
Rebuild the Enerium landing page in the existing Next.js project.

Inputs:
- Use README.md in the repo root as the main handoff document.
- Use src/lib/constants.ts as the content source of truth.
- Use the approved Gemini design direction as the visual target.

Goals:
- Rebuild the landing page from scratch while preserving content meaning and brand palette.
- Keep the site much lighter than the previous version.
- Implement a maximum of 5 sections.
- Keep only one major 3D moment, ideally in the hero.
- Build Plate Balance as a lightweight 2.5D interaction.
- Add backend scaffolding for free-trial activation.

Strict constraints:
- No custom cursor.
- No persistent full-page 3D scene.
- No always-on particles.
- No audio-reactive effects.
- No second heavy WebGL scene for the mini-game.
- Mobile must have simplified graphics.

Implementation expectations:
- Use Next.js App Router.
- Preserve content meaning from src/lib/constants.ts.
- Use lazy loading for any non-critical heavy component.
- Keep animations mostly to transforms and opacity.
- Prefer pre-rendered assets or posters when real-time graphics are unnecessary.

Mini-game expectations:
- One short round of 20 to 30 seconds.
- Lightweight drag or tap interaction.
- Local score calculation.
- One backend call only after victory.
- Reward flow: 3-day free trial.

Backend expectations:
- Add POST /api/game/validate
- Add POST /api/trial/activate
- Add POST /api/waitlist
- Prepare token helpers and persistence scaffold

Output expectations:
- New homepage implementation
- Lightweight interactive sections
- API scaffold
- Clear separation between design implementation and optimization pass
```

## Mini-game: Plate Balance

### Что это

Игрок собирает сбалансированную тарелку из продуктов и получает score за близость к целевым макросам.

### Почему именно эта игра

- напрямую связана с продуктом
- понятна за несколько секунд
- не требует тяжёлой физики
- хорошо завязывается на reward flow

### Как делать правильно

Использовать:

- React state
- pointer events
- Framer Motion
- SVG rings
- sprite assets или подготовленные PNG/WebP

Не использовать:

- physics engine
- отдельную Three.js-сцену
- canvas loop ради всей игры
- сложные drag-and-drop фреймворки без необходимости

### Игровой цикл

1. секция вошла в viewport
2. игра lazy-loadится
3. пользователь видит короткий onboarding
4. идёт один раунд 20–30 секунд
5. score считается локально
6. после победы идёт один запрос на backend
7. пользователь активирует 3-day trial

### Mobile fallback

Desktop:

- drag food item into plate zone

Mobile:

- tap food item
- tap target plate zone

## Backend skeleton

Backend делается только после утверждения фронтенд-структуры.

### Обязательные маршруты

- `POST /api/game/validate`
- `POST /api/trial/activate`
- `POST /api/waitlist`

### Что должен делать каждый маршрут

`POST /api/game/validate`

- принимает score payload
- валидирует структуру запроса
- возвращает signed short-lived token

`POST /api/trial/activate`

- принимает email и token
- валидирует token
- пишет trial activation в storage
- возвращает expiration timestamp

`POST /api/waitlist`

- сохраняет email для захвата лида

### Рекомендуемый стек

- Supabase
- `jose`
- Upstash Redis

## Performance guardrails

Claude обязан соблюдать эти правила при реализации:

- не больше одного активного WebGL context одновременно
- hero 3D загружается лениво
- всё ниже первого экрана не должно тянуть тяжёлую гидратацию сразу
- все тяжёлые части монтируются только по viewport visibility
- mobile должен получать упрощённую графику
- анимации по умолчанию строятся на transform и opacity

Желаемые метрики:

- Lighthouse Performance 85+
- Total Blocking Time < 200ms
- LCP < 2.5s на desktop
- INP < 200ms

## Что считать завершением задачи

Задача считается выполненной, когда:

- есть утверждённый дизайн-концепт от Gemini
- есть реализованный фронтенд от Claude
- есть работающий trial-flow scaffold
- сайт стал чище, легче и понятнее старой версии
- бренд, тексты и цветовая система узнаются сразу

## Короткая версия handoff

### Gemini

Делает:

- дизайн
- композицию
- секции
- hero concept
- mini-game concept
- motion rules
- mobile rules

Не делает:

- код
- backend
- performance implementation

### Claude

Делает:

- реализацию
- frontend architecture
- mini-game implementation
- backend skeleton
- optimization pass

Не делает:

- новый продуктовый смысл
- перегруженный визуал
- тяжёлый realtime-фон

## Финальная идея

Старая версия доказывала, что проект может быть зрелищным.

Новая версия должна доказать, что Enerium может выглядеть дорого без лишней нагрузки на браузер.
@AGENTS.md

# Портфоліо Світлани

## Стек

- Next.js (App Router)
- TypeScript
- Tailwind CSS v4
- Деплой: Vercel, підключений до GitHub-репозиторію `portfolio-demo`

## Робота з Git

- Уся робота йде в гілці `main`.
- Нових гілок не створюй, поки я прямо не попрошу.
- Пуш у `main` публікує сайт (Vercel деплоїть кожен пуш), тому перед кожним пушем питай мене.

## Токени

Єдине джерело значень: блок `@theme` у `src/app/globals.css`. Огляд: Storybook → Foundations → Tokens. Стандартні кольори, розміри тексту, радіуси, пропорції й шрифти Tailwind скинуто: працюють лише токени нижче.

- **Кольори:** `canvas` (фон сторінки), `surface` (картки й поля), `line` (декоративні лінії, рамки карток), `accent` (декор: лінії, зірочки, стрілки; не для тексту), `accent-ink` (золотий текст), `ink` (основний текст, темні кнопки), `ink-muted` (приглушений текст, межа поля й кнопки без заливки), `danger` (текст і межа поля з помилкою), `sage` (смуга послуг, підкладка портрета; текст на ній лише `canvas` або `surface`).
- **Шрифти:** `font-serif` (Cormorant Garamond, основний, з кирилицею), `font-script` (Allura, лише латиниця). Підключення в `src/app/fonts.ts`.
- **Текст:** `text-caption`, `text-body`, `text-heading`, `text-lead`, `text-script`, `text-display`; для вузького екрана `text-script-sm` і `text-display-sm` (вмикай звичайний розмір з `md:`). Висота рядка, трекінг і жирність задані разом із розміром.
- **Радіуси:** `rounded-control` і `rounded-card` (прямі кути), `rounded-t-arch` (арка над портретом).
- **Пропорції:** `aspect-cover` (обкладинка роботи), `aspect-portrait` (портрет).
- **Відступи:** 2, 3, 4, 6, 8 у класах (8–32 px) і `section` між великими секціями.
- **Ширина контенту:** `max-w-content`.
- **Анімація:** `animate-emerge` (випливає знизу з прозорості, потім погойдується), `animate-float` (повільне погойдування), `animate-spin-slow` (повільне обертання). Завжди з `motion-safe:`.

## Компоненти

Кожен компонент лежить у `src/components/<Назва>/` разом з історією `<Назва>.stories.tsx`. Опис, параметри й стани — на сторінці Docs у Storybook.

- **Button** (`src/components/Button/Button.tsx`, Storybook: Components/Button). Кнопка або посилання (`href`). Варіанти `primary` (на `accent`, текст `ink`) і `secondary` (без заливки, межа `ink-muted`); розміри `md` і `lg`; `arrow` для стрілки. Вимкнена через `aria-disabled` (лишається у фокусі), пояснення в `disabledReason`. Не ставити на фон `sage`.
- **FormField** (`src/components/FormField/FormField.tsx`, Storybook: Components/FormField). Текстове поле з підписом над ним (`label`). Заливка `surface`, межа `ink-muted`; помилка через `error` і `errorMessage` (межа, іконка й текст `danger`, зв'язані через `aria-describedby`); `required` додає зірочку; `disabled` — звичайний атрибут, поле не у фокусі. Значення задається `defaultValue`.
- **WorkCard** (`src/components/WorkCard/WorkCard.tsx`, Storybook: Components/WorkCard). Картка роботи: обкладинка `aspect-cover`, назва, короткий опис; уся картка — посилання (`href`). Обкладинку імпортуй з `src/assets` і передавай в `image`, опис картинки в `imageAlt`. Зараз у `src/assets/work-cover-example.jpg` лише заглушка.
- **Navigation** (`src/components/Navigation/Navigation.tsx`, Storybook: Components/Navigation). Головне меню в шапці. Пункти в `items` (за замовчуванням п'ять розділів сайту), поточний задається `activeHref` (`aria-current="page"`, підкреслення `accent`). До 768 px меню згортається в кнопку «Menu»: список відкривається поверх контенту, закривається Escape, кліком поза меню або вибором пункту. Не ставити на фон `sage`.
- **Badge** (`src/components/Badge/Badge.tsx`, Storybook: Components/Badge). Кругла декоративна плашка зі словами в колонку (`words`) і зірочкою, заливка `line` з прозорістю 60 %. `animated` вмикає `animate-emerge` і обертання зірочки. До 768 px зменшена до 75 %. Позиціонування передавай через `className`. Прихована від скрінрідера; не став над темним строкатим фото.

## Правила

Заповнимо далі.

## Посилання

- План сайту: [docs/site-plan.md](docs/site-plan.md)
- Сайт: https://portfolio-demo-khaki-seven.vercel.app
- Storybook (токени й компоненти): https://portfolio-demo-khaki-seven.vercel.app/storybook, локально `npm run storybook` → http://localhost:6006. Збирається в `public/storybook` командою `npm run build`; тека в `.gitignore`, вручну не редагуй.

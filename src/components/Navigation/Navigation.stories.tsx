import type { Meta, StoryObj } from "@storybook/nextjs-vite";
import { defaultNavItems, Navigation } from "./Navigation";

const description = `
Головне меню сайту в шапці: перехід між розділами Home, About me, Services, Works, Contacts.

**Параметри (за замовчуванням).**
- \`items\` — пункти меню, масив \`{ label, href }\` (п'ять розділів сайту).
- \`activeHref\` — \`href\` поточного пункту; він стає активним і отримує \`aria-current="page"\` (немає).
- \`ariaLabel\` — назва меню для скрінрідера (\`Main\`).

**Варіанти.**
- Широкий екран (від 768 px) — пункти в рядок з проміжком 32 px.
- Вузький екран (до 768 px) — кнопка «Menu» з іконкою. Вона відкриває список **поверх** контенту (сторінка не зсувається) у правому куті під кнопкою. Список закривається клавішею Escape (фокус повертається на кнопку), кліком поза меню або вибором пункту. Кнопка має \`aria-expanded\` і \`aria-controls\`.

**Стани пункту.**
- Default — текст \`ink\` (10,69:1 до \`canvas\`), \`text-caption\` великими літерами.
- Hover — текст \`accent-ink\` (4,60:1).
- Focus (Tab) — контур 2 px \`ink\` з відступом 2 px (10,69:1).
- Активний — текст \`ink\` з підкресленням \`accent\` товщиною 2 px і відступом 8 px; \`aria-current="page"\`. Підкреслення лише прикраса: активність передається й атрибутом для скрінрідера.

**Кнопка «Menu».** Без заливки, межа \`ink-muted\` (5,28:1), текст \`ink\`; при наведенні заливка \`surface\`; фокус як у пунктів. Відкритий список: заливка \`canvas\`, рамка \`line\`, відступ 16 px, пункти з відступами 8 px.

**Токени.** Кольори \`ink\`, \`ink-muted\`, \`accent-ink\`, \`accent\`, \`canvas\`, \`surface\`, \`line\`; радіуси \`rounded-control\` (кнопка), \`rounded-card\` (список); текст \`text-caption\`; шрифт \`font-serif\`; відступи 2, 4, 8 (8, 16, 32 px).

**Коли використовувати.** Один раз у шапці кожної сторінки.
**Коли ні.** Для посилань у тексті, футері чи всередині кейсу: там звичайні посилання. Не став меню на фон \`sage\`: контраст тексту й контуру там недостатній.

**Як брати в код.**
\`\`\`tsx
import { Navigation } from "@/components/Navigation/Navigation";

<header className="relative flex items-center justify-between gap-6">
  <a href="#home">Svitlana Design</a>
  <Navigation activeHref="#works" />
</header>
\`\`\`
`;

const meta = {
  title: "Components/Navigation",
  component: Navigation,
  tags: ["autodocs"],
  parameters: {
    docs: { description: { component: description } },
  },
  argTypes: {
    activeHref: {
      control: "select",
      options: [undefined, ...defaultNavItems.map((item) => item.href)],
      labels: Object.fromEntries([["undefined", "немає"], ...defaultNavItems.map((item) => [item.href, item.label])]),
    },
    items: { control: false },
    ariaLabel: { control: "text" },
  },
  args: {
    activeHref: "#home",
  },
  // Шапка й текст під нею показують, що відкритий список не зсуває сторінку.
  render: (args) => (
    <div className="flex flex-col gap-6">
      <header className="flex items-center justify-between gap-6">
        <span className="text-caption uppercase">Svitlana Design</span>
        <Navigation {...args} />
      </header>
      <p className="text-body text-ink-muted">
        Контент сторінки. На вузькому екрані відкрите меню лягає поверх цього тексту, а не зсуває його вниз.
      </p>
    </div>
  ),
} satisfies Meta<typeof Navigation>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Playground: Story = {};

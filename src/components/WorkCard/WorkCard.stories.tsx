import type { Meta, StoryObj } from "@storybook/nextjs-vite";
import cover from "../../assets/work-cover-example.jpg";
import { WorkCard } from "./WorkCard";

const description = `
Картка роботи в розділі «Роботи»: обкладинка, назва й короткий опис задачі. Уся картка — одне посилання на сторінку кейсу.

**Параметри (за замовчуванням).** Значень за замовчуванням немає: усі параметри обов'язкові.
- \`title\` — назва роботи.
- \`description\` — короткий опис задачі, одне-два речення.
- \`href\` — адреса сторінки кейсу.
- \`image\` — обкладинка, **імпортована** з \`src/assets\`, а не шлях із \`public\`.
- \`imageAlt\` — що зображено на обкладинці, для скрінрідера.

**Варіанти.** Один варіант. Картка займає всю ширину своєї колонки; обкладинка завжди \`aspect-cover\` і обрізається по краях, якщо пропорція картинки інша.

**Стани.**
- Default — заливка \`surface\`, рамка \`line\`, назва \`ink\` (9,67:1), опис \`ink-muted\` (4,77:1).
- Hover — рамка темнішає до \`ink-muted\`, назва підкреслюється.
- Focus (Tab) — контур 2 px \`ink\` з відступом 2 px навколо всієї картки (10,69:1 до \`canvas\`).

**Токени.** Кольори \`surface\`, \`line\`, \`ink\`, \`ink-muted\`; радіус \`rounded-card\` (прямі кути); пропорція \`aspect-cover\`; текст \`text-heading\` (назва), \`text-body\` (опис); відступи \`p-6\`, \`gap-2\` (24 і 8 px).

**Коли використовувати.** Для списку робіт на головній і на сторінці «Роботи», коли кожна картка веде на окремий кейс.
**Коли ні.** Для послуг без посилання (там не потрібна обкладинка й стан наведення) і для великої обкладинки в самому кейсі. Не став кнопку всередину картки: картка вже посилання.

**Як брати в код.**
\`\`\`tsx
import cover from "@/assets/work-cover-example.jpg"; // заміни на справжню обкладинку роботи
import { WorkCard } from "@/components/WorkCard/WorkCard";

<WorkCard
  title="Clinic360"
  description="Сторінка адміністратора медичного сайту: розклад, записи, статистика."
  href="/works/clinic360"
  image={cover}
  imageAlt="Дашборд адміністратора з показниками й графіком"
/>
\`\`\`
`;

const meta = {
  title: "Components/WorkCard",
  component: WorkCard,
  tags: ["autodocs"],
  parameters: {
    docs: { description: { component: description } },
  },
  argTypes: {
    title: { control: "text" },
    description: { control: "text" },
    href: { control: "text" },
    imageAlt: { control: "text" },
    image: { control: false },
  },
  args: {
    title: "Clinic360",
    description: "Сторінка адміністратора медичного сайту: розклад, записи, статистика завантаженості.",
    href: "#clinic360",
    image: cover,
    imageAlt: "Приклад обкладинки: дашборд з показниками, графіком і таблицею",
  },
  render: (args) => (
    <div className="grid grid-cols-3 gap-6">
      <WorkCard {...args} />
    </div>
  ),
} satisfies Meta<typeof WorkCard>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Playground: Story = {};

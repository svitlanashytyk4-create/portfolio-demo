import type { Meta, StoryObj } from "@storybook/nextjs-vite";
import { Button } from "./Button";

const description = `
Кнопка для дій на сайті: перейти до робіт, написати мені, надіслати форму.

**Параметри (за замовчуванням).**
- \`children\` — текст кнопки, набирається звичайними літерами.
- \`variant\` — \`primary\` | \`secondary\` (\`primary\`).
- \`size\` — \`md\` | \`lg\` (\`md\`).
- \`arrow\` — стрілка праворуч у колір тексту (\`false\`).
- \`href\` — якщо задано, кнопка стає посиланням (немає).
- \`disabled\` — вимкнена кнопка (\`false\`).
- \`disabledReason\` — пояснення під вимкненою кнопкою (немає).
- \`type\` — тип у формі (\`button\`).
- \`onClick\` — обробник натискання; у вимкненій кнопці не викликається.

**Варіанти.**
- \`primary\` — основна дія: заливка й межа \`accent\`, текст \`ink\` (контраст 4,89:1). Одна на екран.
- \`secondary\` — другорядна дія поруч: без заливки, межа \`ink-muted\` (5,28:1 до \`canvas\`), текст \`ink\` (10,69:1).

**Розміри.**
- \`md\` — текст \`text-body\`, відступи \`px-4\` \`py-2\`, проміжок \`gap-3\`.
- \`lg\` — текст \`text-heading\`, відступи \`px-6\` \`py-3\`, проміжок \`gap-4\`. Для першого екрана й заклику написати.

**Стани.**
- Default — як у варіантах вище.
- Hover — \`primary\`: заливка \`accent-ink\`, текст \`canvas\` (4,60:1), стрілка зсувається праворуч. \`secondary\`: заливка \`surface\`, текст \`ink\` (9,67:1).
- Focus (клавіатура, Tab) — контур 2 px \`ink\` з відступом 2 px: 10,69:1 до \`canvas\`, 4,89:1 до \`accent\`. На фоні \`sage\` контраст контуру лише 2,35:1, тому кнопку на \`sage\` не став.
- Disabled — \`aria-disabled\`, а не атрибут \`disabled\`: кнопка лишається у фокусі, але не натискається. Заливка \`surface\`, межа \`line\`, текст \`ink-muted\`, курсор «заборонено». Пояснення з \`disabledReason\` стоїть під кнопкою (\`text-caption\`, \`ink-muted\`, 5,28:1) і зв'язане з нею через \`aria-describedby\`: його зачитує скрінрідер.

**Токени.** Кольори \`accent\`, \`accent-ink\`, \`ink\`, \`ink-muted\`, \`canvas\`, \`surface\`, \`line\`; радіус \`rounded-control\`; текст \`text-body\`, \`text-heading\`, \`text-caption\`; шрифт \`font-serif\`; відступи 2, 3, 4, 6 (8, 12, 16, 24 px).

**Коли використовувати.** Для дії або переходу, який людина має помітити: «View my work», «Let's work together», «Надіслати». Основна — одна на екран, другорядна — поруч з нею.
**Коли ні.** Для посилань у тексті й пунктів меню: там звичайне посилання. Не став дві основні поруч і не став кнопку на фон \`sage\`.

**Як брати в код.**
\`\`\`tsx
import { Button } from "@/components/Button/Button";

<Button href="#works" size="lg" arrow>View my work</Button>
<Button href="#contacts" variant="secondary" size="lg">Let's work together</Button>
<Button type="submit" disabled disabledReason="Заповніть email, щоб надіслати">Надіслати</Button>
\`\`\`
`;

const meta = {
  title: "Components/Button",
  component: Button,
  tags: ["autodocs"],
  parameters: {
    docs: { description: { component: description } },
  },
  argTypes: {
    variant: { control: "select", options: ["primary", "secondary"] },
    size: { control: "select", options: ["md", "lg"] },
    disabled: { control: "boolean" },
    disabledReason: { control: "text" },
    arrow: { control: "boolean" },
    href: { control: "text" },
    type: { control: "select", options: ["button", "submit", "reset"] },
    onClick: { control: false },
  },
  args: {
    children: "View my work",
    variant: "primary",
    size: "md",
    disabled: false,
    disabledReason: "Робота з'явиться тут найближчим часом",
    arrow: true,
  },
} satisfies Meta<typeof Button>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Playground: Story = {};

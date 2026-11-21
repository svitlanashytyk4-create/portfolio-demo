import type { Meta, StoryObj } from "@storybook/nextjs-vite";
import { FormField } from "./FormField";

const description = `
Текстове поле з підписом: ім'я, email, телефон у формі «Написати мені».

**Параметри (за замовчуванням).**
- \`label\` — підпис над полем (обов'язковий).
- \`name\` — ім'я поля у формі (немає).
- \`type\` — \`text\` | \`email\` | \`tel\` | \`url\` (\`text\`).
- \`placeholder\` — підказка в порожньому полі; не замінює підпис (немає).
- \`defaultValue\` — початкове значення; якщо задане, поле заповнене (немає).
- \`error\` — стан помилки (\`false\`).
- \`errorMessage\` — текст помилки під полем (немає).
- \`required\` — обов'язкове поле, зірочка \`danger\` у підписі (\`false\`).
- \`disabled\` — вимкнене поле (\`false\`).
- \`onChange\` — обробник зміни значення.

**Варіанти.** Один варіант. Підпис завжди над полем, поле на всю ширину контейнера.

**Стани.**
- Default — заливка \`surface\`, межа \`ink-muted\` (4,77:1 до \`surface\`, 5,28:1 до \`canvas\`), підказка \`ink-muted\` (4,77:1).
- Hover — межа темнішає до \`ink\`.
- Focus (Tab або клік) — межа \`ink\` і контур 2 px \`ink\` з відступом 2 px (10,69:1 до \`canvas\`).
- Заповнене — значення текстом \`ink\` (9,67:1 до \`surface\`).
- Помилка — межа \`danger\` (5,22:1 до \`surface\`), під полем іконка й текст \`danger\` (5,77:1 до \`canvas\`). Поле має \`aria-invalid\`, текст помилки зв'язаний через \`aria-describedby\`, тож скрінрідер його зачитує.
- Disabled — межа \`line\`, текст і підпис \`ink-muted\`, курсор «заборонено». Поле не редагується і не потрапляє у фокус; помилка у вимкненому полі не показується.

**Токени.** Кольори \`surface\`, \`canvas\`, \`ink\`, \`ink-muted\`, \`line\`, \`danger\`; радіус \`rounded-control\`; текст \`text-caption\` (підпис, помилка), \`text-body\` (значення); шрифт \`font-serif\`; відступи \`px-4\`, \`py-3\`, \`gap-2\` (16, 12, 8 px).

**Коли використовувати.** Для короткого тексту в один рядок: ім'я, email, телефон, посилання.
**Коли ні.** Для довгого повідомлення (потрібне багаторядкове поле), вибору з варіантів і пошуку в шапці. Не використовуй \`placeholder\` замість підпису.

**Як брати в код.**
\`\`\`tsx
import { FormField } from "@/components/FormField/FormField";

<FormField label="Email" name="email" type="email" placeholder="name@example.com" required />
<FormField label="Email" name="email" defaultValue="name@" error errorMessage="Введіть повну адресу email" />
\`\`\`
`;

const meta = {
  title: "Components/FormField",
  component: FormField,
  tags: ["autodocs"],
  parameters: {
    docs: { description: { component: description } },
  },
  argTypes: {
    defaultValue: { control: "text" },
    error: { control: "boolean" },
    errorMessage: { control: "text" },
    disabled: { control: "boolean" },
    required: { control: "boolean" },
    type: { control: "select", options: ["text", "email", "tel", "url"] },
    onChange: { control: false },
  },
  args: {
    label: "Email",
    name: "email",
    type: "email",
    placeholder: "name@example.com",
    defaultValue: "",
    error: false,
    errorMessage: "Введіть повну адресу email",
    required: false,
    disabled: false,
  },
  // key перемальовує поле, коли змінюється значення в Controls:
  // так перемикається стан «заповнене».
  render: (args) => (
    <div className="max-w-content">
      <FormField key={args.defaultValue} {...args} />
    </div>
  ),
} satisfies Meta<typeof FormField>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Playground: Story = {};

import type { Meta, StoryObj } from "@storybook/nextjs-vite";
import { FormField } from "./FormField";

const description = `
Текстове поле з підписом для форми заявки: ім'я, контакт, повідомлення про задачу.

**Параметри (за замовчуванням).**
- \`label\` — підпис над полем (обов'язковий).
- \`name\` — ім'я поля у формі (немає).
- \`id\` — власний id поля, щоб на нього можна було послатися, наприклад зі зведення помилок над формою (\`<a href="#message">\`). Текст помилки отримує id \`<id>-error\` (генерується).
- \`type\` — \`text\` | \`email\` | \`tel\` | \`url\`; не діє з \`multiline\` (\`text\`).
- \`multiline\` — багаторядкове поле (textarea) для довгого тексту; користувач може тягнути його вниз (\`false\`).
- \`rows\` — висота багаторядкового поля в рядках (\`5\`).
- \`autoComplete\` — підказка для автозаповнення браузером: \`name\`, \`email\`, \`tel\`, \`off\`… (немає).
- \`placeholder\` — підказка в порожньому полі; не замінює підпис (немає).
- \`defaultValue\` — початкове значення; якщо задане, поле заповнене (немає).
- \`error\` — стан помилки (\`false\`).
- \`errorMessage\` — текст помилки під полем (немає).
- \`required\` — обов'язкове поле, зірочка \`danger\` у підписі (\`false\`).
- \`disabled\` — вимкнене поле (\`false\`).
- \`lang\` — мова сторінки: \`en\` | \`uk\`; від неї залежить прихований префікс помилки (\`en\`).
- \`onChange\` — обробник зміни значення.

**Варіанти.**
- Однорядкове — ім'я, email, телефон, посилання.
- Багаторядкове (\`multiline\`) — повідомлення. Ті самі стани, заливка, межі й шрифт.

Підпис завжди над полем, поле на всю ширину контейнера.

**Стани.**
- Default — заливка \`surface\`, межа \`ink-muted\` (4,77:1 до \`surface\`, 5,28:1 до \`canvas\`), підказка \`ink-muted\` (4,77:1).
- Hover — межа темнішає до \`ink\`.
- Focus (Tab або клік) — межа \`ink\` і контур 2 px \`ink\` з відступом 2 px (10,69:1 до \`canvas\`).
- Заповнене — значення текстом \`ink\` (9,67:1 до \`surface\`).
- Помилка — межа \`danger\` (5,22:1 до \`surface\`), під полем іконка й текст \`danger\` (5,77:1 до \`canvas\`). Поле має \`aria-invalid\`, текст помилки зв'язаний через \`aria-describedby\`. Перед текстом стоїть візуально прихований префікс мовою сторінки (\`lang\`): «Error:» для англійської, «Помилка:» для української. Скрінрідер зачитує «Error: Enter a full email address», а на екрані лише сам текст. Текст помилки пиши тією самою мовою, що й \`lang\`.
- Disabled — межа \`line\`, текст і підпис \`ink-muted\`, курсор «заборонено». Поле не редагується і не потрапляє у фокус; помилка у вимкненому полі не показується.

**Токени.** Кольори \`surface\`, \`canvas\`, \`ink\`, \`ink-muted\`, \`line\`, \`danger\`; радіус \`rounded-control\`; текст \`text-caption\` (підпис, помилка), \`text-body\` (значення); шрифт \`font-serif\`; відступи \`px-4\`, \`py-3\`, \`gap-2\` (16, 12, 8 px).

**Коли використовувати.** Для полів форми заявки: короткий текст в один рядок або повідомлення в кілька рядків. Ставте \`autoComplete\` на ім'я, email і телефон.
**Коли ні.** Для вибору з варіантів і пошуку в шапці. Не використовуй \`placeholder\` замість підпису.

**Як брати в код.**
\`\`\`tsx
import { FormField } from "@/components/FormField/FormField";

<FormField label="Name" name="name" autoComplete="name" required />
<FormField label="Email" name="email" type="email" autoComplete="email" placeholder="name@example.com" required />
<FormField id="message" label="About your task" name="message" multiline rows={6} required />
<FormField id="email" label="Email" name="email" defaultValue="name@" error errorMessage="Enter a full email address" />
<FormField lang="uk" id="email" label="Email" name="email" defaultValue="name@" error errorMessage="Введіть повну адресу email" />

// Посилання зі зведення помилок над формою веде на поле за його id:
<a href="#email">Enter a full email address</a>
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
    id: { control: "text" },
    defaultValue: { control: "text" },
    error: { control: "boolean" },
    errorMessage: { control: "text" },
    disabled: { control: "boolean" },
    required: { control: "boolean" },
    type: { control: "select", options: ["text", "email", "tel", "url"] },
    multiline: { control: "boolean" },
    rows: { control: { type: "number", min: 2, max: 12 } },
    autoComplete: { control: "select", options: [undefined, "name", "email", "tel", "url", "off"] },
    lang: { control: "inline-radio", options: ["en", "uk"] },
    onChange: { control: false },
  },
  args: {
    label: "Email",
    name: "email",
    type: "email",
    autoComplete: "email",
    placeholder: "name@example.com",
    defaultValue: "",
    error: false,
    errorMessage: "Enter a full email address",
    required: false,
    disabled: false,
    multiline: false,
    rows: 5,
    lang: "en",
  },
  // key перемальовує поле, коли змінюється значення, вигляд чи висота в Controls:
  // так перемикаються стан «заповнене» і варіант multiline.
  render: (args) => (
    <div className="max-w-content">
      <FormField key={`${args.defaultValue}-${args.multiline}-${args.rows}`} {...args} />
    </div>
  ),
} satisfies Meta<typeof FormField>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Playground: Story = {};

/** Багаторядкове поле для повідомлення про задачу. */
export const Message: Story = {
  args: {
    id: "message",
    label: "About your task",
    name: "message",
    type: undefined,
    autoComplete: undefined,
    placeholder: "What are you building, and what do you need from a designer?",
    multiline: true,
    rows: 6,
    required: true,
    errorMessage: "Tell me briefly about your task",
  },
};

/** Помилка англійською: на екрані лише текст, скрінрідер чує «Error: …». Поле має id для посилання зі зведення помилок. */
export const WithError: Story = {
  args: {
    id: "email",
    defaultValue: "name@",
    error: true,
    required: true,
  },
};

/** Помилка українською: скрінрідер чує «Помилка: …». */
export const WithErrorUk: Story = {
  args: {
    ...WithError.args,
    lang: "uk",
    label: "Email",
    errorMessage: "Введіть повну адресу email",
  },
};

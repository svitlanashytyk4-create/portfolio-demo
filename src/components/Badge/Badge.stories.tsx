import type { Meta, StoryObj } from "@storybook/nextjs-vite";
import { Badge } from "./Badge";

const description = `
Кругла напівпрозора плашка зі словами в колонку, тонкими золотими лініями між ними й зірочкою. На головній вона лежить краєм на портреті.

**Параметри (за замовчуванням).**
- \`words\` — слова в колонку (\`["Design", "Creativity", "Strategy"]\`).
- \`animated\` — анімація появи й погойдування та обертання зірочки (\`true\`).
- \`className\` — класи позиціонування ззовні, наприклад \`absolute bottom-8 right-0\` (немає).

**Варіанти.** Один варіант. На вузькому екрані (до 768 px) плашка зменшена до 75 % (124 px замість 165) від правого нижнього кута — перевір через Viewport у тулбарі.

**Стани.**
- Заливка \`line\` з прозорістю 60 %: крізь неї видно фон або фото. Рамка 1 px \`accent\`, слова \`ink\`, лінії й зірочка \`accent\`.
- Анімація (\`animated\`): \`animate-emerge\` — випливає знизу з прозорості за 1 с, потім м'яко погойдується; зірочка — \`animate-spin-slow\`. Обидві з \`motion-safe:\`: якщо людина вимкнула анімацію в системі, плашка стоїть.
- Інтерактивних станів немає: плашка декоративна, прихована від скрінрідера (\`aria-hidden\`), не у фокусі.

**Контраст.** Текст \`ink\` на плашці залежить від фону під нею: на \`canvas\` 8,71:1, на \`sage\` 4,93:1. Над темним фото може впасти нижче 4,5:1, тож став плашку над світлою або однорідною частиною.

**Токени.** Кольори \`line\` (заливка, 60 %), \`accent\`, \`ink\`; текст \`text-caption\` великими літерами; відступ \`gap-2\` (8 px); анімація \`animate-emerge\`, \`animate-spin-slow\`.

**Коли використовувати.** Як акцент на портреті чи великій картинці першого екрана, один раз на сторінці.
**Коли ні.** Для важливої інформації (скрінрідер її не прочитає), для кнопок і посилань, і над темним строкатим фото.

**Як брати в код.**
\`\`\`tsx
import { Badge } from "@/components/Badge/Badge";

<div className="relative">
  {/* портрет */}
  <Badge className="absolute bottom-8 right-0 lg:-right-6" />
</div>
\`\`\`
`;

const meta = {
  title: "Components/Badge",
  component: Badge,
  tags: ["autodocs"],
  parameters: {
    docs: { description: { component: description } },
  },
  argTypes: {
    words: { control: "object" },
    animated: { control: "boolean" },
    className: { control: false },
  },
  args: {
    words: ["Design", "Creativity", "Strategy"],
    animated: true,
  },
  // Два фони поруч показують, як просвічує напівпрозора заливка.
  render: (args) => (
    <div className="grid grid-cols-2">
      <div className="flex justify-center bg-sage p-8">
        <Badge {...args} />
      </div>
      <div className="flex justify-center bg-canvas p-8">
        <Badge {...args} />
      </div>
    </div>
  ),
} satisfies Meta<typeof Badge>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Playground: Story = {};

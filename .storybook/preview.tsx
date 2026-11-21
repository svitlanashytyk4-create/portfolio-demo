import type { Preview } from "@storybook/nextjs-vite";
import { fontVariables } from "../src/app/fonts";
import "../src/app/globals.css";

// Сторінки docs (зокрема «Токени») декоратори не обгортають,
// тому змінні шрифтів ставимо ще й на <html> превʼю, як у layout сайту.
document.documentElement.classList.add(...fontVariables.split(" "));

const preview: Preview = {
  parameters: {
    controls: {
      matchers: {
        color: /(background|color)$/i,
        date: /Date$/i,
      },
    },
  },
  // Змінні шрифтів, які на сайті стоять на <html> у layout.
  decorators: [
    (Story) => (
      <div className={`${fontVariables} font-serif text-ink`}>
        <Story />
      </div>
    ),
  ],
};

export default preview;

import { Allura, Cormorant_Garamond } from "next/font/google";

/** Основний шрифт сайту, з кирилицею. */
export const cormorant = Cormorant_Garamond({
  variable: "--font-cormorant",
  subsets: ["latin", "cyrillic"],
  weight: ["300", "400", "500", "600", "700"],
});

/**
 * Рукописний шрифт для привітання.
 * У Allura немає кирилиці: українські тексти ним не набирай.
 */
export const allura = Allura({
  variable: "--font-allura",
  subsets: ["latin"],
  weight: "400",
});

/** Класи зі змінними шрифтів: для <html> у layout і для Storybook. */
export const fontVariables = `${cormorant.variable} ${allura.variable}`;

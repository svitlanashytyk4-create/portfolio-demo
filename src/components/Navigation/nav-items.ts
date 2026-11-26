/*
 * Пункти головного меню. Окремий файл без "use client", щоб їх могли брати
 * і клієнтське меню (Navigation), і серверні компоненти (футер).
 */

export interface NavItem {
  /** Текст пункту. Набирай звичайними літерами: великими їх робить меню. */
  label: string;
  /** Адреса розділу або сторінки. */
  href: string;
}

export const defaultNavItems: NavItem[] = [
  { label: "Home", href: "#home" },
  { label: "About me", href: "#about" },
  { label: "Services", href: "#services" },
  { label: "Works", href: "#works" },
  { label: "Contacts", href: "#contacts" },
];

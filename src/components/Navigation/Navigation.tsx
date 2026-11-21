"use client";

import { useEffect, useId, useRef, useState } from "react";

export interface NavItem {
  /** Текст пункту. Набирай звичайними літерами: великими їх робить меню. */
  label: string;
  /** Адреса розділу або сторінки. */
  href: string;
}

export const defaultNavItems: NavItem[] = [
  { label: "Home", href: "#home" },
  { label: "Works", href: "#works" },
  { label: "Services", href: "#services" },
  { label: "About me", href: "#about" },
  { label: "Contacts", href: "#contacts" },
];

export interface NavigationProps {
  /** Пункти меню. За замовчуванням — п'ять розділів сайту. */
  items?: NavItem[];
  /** `href` пункту поточної сторінки або розділу. Він отримує `aria-current="page"`. */
  activeHref?: string;
  /** Назва меню для скрінрідера. */
  ariaLabel?: string;
}

const linkBase =
  "uppercase transition-colors hover:text-accent-ink " +
  "focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-ink";

const activeClasses = "text-ink underline decoration-accent decoration-2 underline-offset-8";

function MenuIcon({ open }: { open: boolean }) {
  return (
    <svg aria-hidden="true" width="20" height="20" viewBox="0 0 20 20" fill="none" className="shrink-0">
      {open ? (
        <path d="M4 4L16 16M16 4L4 16" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
      ) : (
        <path d="M3 5H17M3 10H17M3 15H17" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
      )}
    </svg>
  );
}

/**
 * Головне меню сайту. На широкому екрані пункти в рядок, на вузькому
 * (до 768 px) — кнопка «Menu», яка відкриває список поверх контенту.
 * Відкритий список закривається клавішею Escape, кліком поза ним або вибором пункту.
 */
export function Navigation({ items = defaultNavItems, activeHref, ariaLabel = "Main" }: NavigationProps) {
  const [open, setOpen] = useState(false);
  const panelId = useId();
  const rootRef = useRef<HTMLElement>(null);
  const toggleRef = useRef<HTMLButtonElement>(null);

  useEffect(() => {
    if (!open) return;
    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        setOpen(false);
        toggleRef.current?.focus();
      }
    };
    const onPointerDown = (event: PointerEvent) => {
      if (!rootRef.current?.contains(event.target as Node)) setOpen(false);
    };
    document.addEventListener("keydown", onKeyDown);
    document.addEventListener("pointerdown", onPointerDown);
    return () => {
      document.removeEventListener("keydown", onKeyDown);
      document.removeEventListener("pointerdown", onPointerDown);
    };
  }, [open]);

  const link = (item: NavItem, extra: string) => {
    const active = item.href === activeHref;
    return (
      <a
        href={item.href}
        aria-current={active ? "page" : undefined}
        className={`${linkBase} ${extra} ${active ? activeClasses : "text-ink"}`}
        onClick={() => setOpen(false)}
      >
        {item.label}
      </a>
    );
  };

  return (
    <nav ref={rootRef} aria-label={ariaLabel} className="relative font-serif text-caption">
      {/* Широкий екран: пункти в рядок */}
      <ul className="hidden items-center gap-8 md:flex">
        {items.map((item) => (
          <li key={item.href}>{link(item, "")}</li>
        ))}
      </ul>

      {/* Вузький екран: кнопка й список поверх контенту */}
      <div className="md:hidden">
        <button
          ref={toggleRef}
          type="button"
          aria-expanded={open}
          aria-controls={panelId}
          onClick={() => setOpen((value) => !value)}
          className={
            "inline-flex cursor-pointer items-center gap-2 rounded-control border border-ink-muted px-4 py-2 uppercase text-ink " +
            "transition-colors hover:bg-surface " +
            "focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-ink"
          }
        >
          <MenuIcon open={open} />
          {open ? "Close" : "Menu"}
        </button>

        <ul
          id={panelId}
          hidden={!open}
          className="absolute right-0 top-full z-10 mt-2 flex w-max flex-col gap-2 rounded-card border border-line bg-canvas p-4"
        >
          {items.map((item) => (
            <li key={item.href}>{link(item, "block px-2 py-2")}</li>
          ))}
        </ul>
      </div>
    </nav>
  );
}

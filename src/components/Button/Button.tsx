"use client";

import { useId, type MouseEvent, type ReactNode } from "react";

export type ButtonVariant = "primary" | "secondary";
export type ButtonSize = "md" | "lg";

export interface ButtonProps {
  /** Текст кнопки. Набирай звичайними літерами: великими їх робить сама кнопка. */
  children: ReactNode;
  /** `primary` — головна дія (заливка `accent`). `secondary` — другорядна дія (без заливки, межа `ink-muted`). */
  variant?: ButtonVariant;
  /** `md` — звичайна, `lg` — велика (для першого екрана й заклику написати). */
  size?: ButtonSize;
  /** Стрілка праворуч від тексту, колір як у тексту. Для переходу далі. */
  arrow?: boolean;
  /** Адреса переходу. Якщо задана, кнопка стає посиланням `<a>`, інакше це `<button>`. */
  href?: string;
  /**
   * Вимкнена кнопка. Робиться через `aria-disabled`, а не атрибут `disabled`:
   * кнопка лишається у фокусі клавіатури, але не натискається.
   */
  disabled?: boolean;
  /** Пояснення під вимкненою кнопкою, чому вона недоступна. Зв'язане з кнопкою через `aria-describedby`. */
  disabledReason?: string;
  /** Тип кнопки у формі. Ігнорується, якщо задано `href`. */
  type?: "button" | "submit" | "reset";
  /** Обробник натискання. Не викликається, коли кнопка вимкнена. */
  onClick?: (event: MouseEvent<HTMLElement>) => void;
}

const base =
  "group inline-flex items-center justify-center whitespace-nowrap rounded-control border font-serif uppercase " +
  "transition-colors focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-ink";

const sizes: Record<ButtonSize, string> = {
  md: "gap-3 px-4 py-2 text-body",
  lg: "gap-4 px-6 py-3 text-heading",
};

const variants: Record<ButtonVariant, string> = {
  primary: "cursor-pointer border-accent bg-accent text-ink hover:border-accent-ink hover:bg-accent-ink hover:text-canvas",
  secondary: "cursor-pointer border-ink-muted text-ink hover:bg-surface",
};

const disabledClasses = "cursor-not-allowed border-line bg-surface text-ink-muted";

function Arrow({ size, disabled }: { size: ButtonSize; disabled: boolean }) {
  const width = size === "lg" ? 34 : 26;
  return (
    <svg
      aria-hidden="true"
      width={width}
      height={Math.round((width * 14.7279) / 34)}
      viewBox="0 0 34 14.7279"
      fill="none"
      className={`shrink-0 ${disabled ? "" : "transition-transform group-hover:translate-x-2"}`}
    >
      <path
        d="M0 7.36396V8.36396H33V7.36396V6.36396H0V7.36396ZM33.7071 8.07107C34.0976 7.68054 34.0976 7.04738 33.7071 6.65685L27.3431 0.292893C26.9526 -0.097631 26.3195 -0.097631 25.9289 0.292893C25.5384 0.683418 25.5384 1.31658 25.9289 1.70711L31.5858 7.36396L25.9289 13.0208C25.5384 13.4113 25.5384 14.0445 25.9289 14.435C26.3195 14.8256 26.9526 14.8256 27.3431 14.435L33.7071 8.07107Z"
        fill="currentColor"
      />
    </svg>
  );
}

/**
 * Кнопка сайту: основна (`primary`, на `accent`) або другорядна (`secondary`, без заливки).
 * Два розміри, прямі кути `rounded-control`, текст великими літерами.
 * Вимкнена кнопка лишається у фокусі й може мати пояснення під собою.
 */
export function Button({
  children,
  variant = "primary",
  size = "md",
  arrow = false,
  href,
  disabled = false,
  disabledReason,
  type = "button",
  onClick,
}: ButtonProps) {
  const reasonId = useId();
  const showReason = disabled && Boolean(disabledReason);
  const className = `${base} ${sizes[size]} ${disabled ? disabledClasses : variants[variant]}`;

  const handleClick = (event: MouseEvent<HTMLElement>) => {
    if (disabled) {
      event.preventDefault();
      return;
    }
    onClick?.(event);
  };

  const a11y = {
    "aria-disabled": disabled || undefined,
    "aria-describedby": showReason ? reasonId : undefined,
  };

  const content = (
    <>
      {children}
      {arrow && <Arrow size={size} disabled={disabled} />}
    </>
  );

  const control =
    href !== undefined ? (
      <a href={disabled ? undefined : href} role={disabled ? "link" : undefined} tabIndex={disabled ? 0 : undefined} className={className} onClick={handleClick} {...a11y}>
        {content}
      </a>
    ) : (
      <button type={type} className={className} onClick={handleClick} {...a11y}>
        {content}
      </button>
    );

  if (!showReason) return control;

  return (
    <span className="inline-flex flex-col items-start gap-2">
      {control}
      <span id={reasonId} className="text-caption text-ink-muted">
        {disabledReason}
      </span>
    </span>
  );
}

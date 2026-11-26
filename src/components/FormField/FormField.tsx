import { useId, type ChangeEventHandler, type HTMLInputAutoCompleteAttribute } from "react";

export interface FormFieldProps {
  /** Підпис поля. Завжди стоїть над полем. */
  label: string;
  /** Ім'я поля у формі. */
  name?: string;
  /**
   * Власний id поля. Потрібен, щоб послатися на поле ззовні, наприклад зі
   * зведення помилок над формою (`href="#message"`). Без нього id генерується.
   */
  id?: string;
  /** Тип текстового поля. Не діє, коли увімкнено `multiline`. */
  type?: "text" | "email" | "tel" | "url";
  /** Багаторядкове поле (textarea) для довгого тексту, наприклад повідомлення. */
  multiline?: boolean;
  /** Висота багаторядкового поля в рядках. Діє лише з `multiline`. */
  rows?: number;
  /**
   * Підказка браузеру для автозаповнення: `name`, `email`, `tel`, `off` тощо.
   * Допомагає людям із моторними й когнітивними труднощами (WCAG 1.3.5).
   */
  autoComplete?: HTMLInputAutoCompleteAttribute;
  /** Підказка всередині порожнього поля. Не замінює підпис. */
  placeholder?: string;
  /** Початкове значення. Якщо задане, поле показується заповненим. */
  defaultValue?: string;
  /** Поле з помилкою: межа й текст `danger`, іконка помилки. */
  error?: boolean;
  /** Текст помилки під полем. Показується, коли `error` увімкнено. */
  errorMessage?: string;
  /** Обов'язкове поле: у підписі з'являється зірочка. */
  required?: boolean;
  /** Вимкнене поле: не редагується і не потрапляє у фокус. */
  disabled?: boolean;
  /**
   * Мова сторінки, на якій стоїть поле. Від неї залежить прихований для очей
   * префікс перед текстом помилки: `en` — «Error:», `uk` — «Помилка:».
   */
  lang?: "en" | "uk";
  /** Обробник зміни значення. */
  onChange?: ChangeEventHandler<HTMLInputElement | HTMLTextAreaElement>;
}

/** Префікс, який скрінрідер зачитує перед текстом помилки. */
const errorPrefix = { en: "Error:", uk: "Помилка:" } as const;

function ErrorIcon() {
  return (
    <svg aria-hidden="true" width="16" height="16" viewBox="0 0 16 16" fill="none" className="shrink-0">
      <circle cx="8" cy="8" r="7" stroke="currentColor" strokeWidth="1.5" />
      <path d="M8 4.5V9" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
      <circle cx="8" cy="11.5" r="1" fill="currentColor" />
    </svg>
  );
}

const inputBase =
  "w-full rounded-control border bg-surface px-4 py-3 font-serif text-body text-ink placeholder:text-ink-muted " +
  "transition-colors focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-ink";

const inputState = {
  default: "border-ink-muted hover:border-ink focus-visible:border-ink",
  error: "border-danger",
  disabled: "cursor-not-allowed border-line text-ink-muted",
};

/**
 * Текстове поле з підписом над ним: однорядкове або багаторядкове (`multiline`).
 * Стани: звичайний, наведення, фокус, заповнене, помилка (межа, іконка й текст
 * `danger`) і вимкнене.
 */
export function FormField({
  label,
  name,
  id: idProp,
  type = "text",
  multiline = false,
  rows = 5,
  autoComplete,
  placeholder,
  defaultValue,
  error = false,
  errorMessage,
  required = false,
  disabled = false,
  lang = "en",
  onChange,
}: FormFieldProps) {
  const generatedId = useId();
  const id = idProp ?? generatedId;
  const errorId = `${id}-error`;
  const showError = error && !disabled;
  const state = disabled ? "disabled" : showError ? "error" : "default";

  const shared = {
    id,
    name,
    autoComplete,
    placeholder,
    defaultValue,
    required,
    disabled,
    onChange,
    "aria-invalid": showError || undefined,
    "aria-describedby": showError && errorMessage ? errorId : undefined,
  };

  return (
    <div className="flex w-full flex-col gap-2">
      <label htmlFor={id} className={`text-caption ${disabled ? "text-ink-muted" : "text-ink"}`}>
        {label}
        {required && (
          <span aria-hidden="true" className="text-danger">
            {" "}
            *
          </span>
        )}
      </label>
      {multiline ? (
        <textarea {...shared} rows={rows} className={`${inputBase} ${inputState[state]} resize-y`} />
      ) : (
        <input {...shared} type={type} className={`${inputBase} ${inputState[state]}`} />
      )}
      {showError && errorMessage && (
        <p id={errorId} className="flex items-center gap-2 text-caption text-danger">
          <ErrorIcon />
          <span>
            <span className="sr-only">{errorPrefix[lang]} </span>
            {errorMessage}
          </span>
        </p>
      )}
    </div>
  );
}

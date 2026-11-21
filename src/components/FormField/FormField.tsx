import { useId, type ChangeEventHandler } from "react";

export interface FormFieldProps {
  /** Підпис поля. Завжди стоїть над полем. */
  label: string;
  /** Ім'я поля у формі. */
  name?: string;
  /** Тип текстового поля. */
  type?: "text" | "email" | "tel" | "url";
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
  /** Обробник зміни значення. */
  onChange?: ChangeEventHandler<HTMLInputElement>;
}

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
 * Текстове поле з підписом над ним. Стани: звичайний, наведення, фокус,
 * заповнене, помилка (межа, іконка й текст `danger`) і вимкнене.
 */
export function FormField({
  label,
  name,
  type = "text",
  placeholder,
  defaultValue,
  error = false,
  errorMessage,
  required = false,
  disabled = false,
  onChange,
}: FormFieldProps) {
  const id = useId();
  const errorId = `${id}-error`;
  const showError = error && !disabled;
  const state = disabled ? "disabled" : showError ? "error" : "default";

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
      <input
        id={id}
        name={name}
        type={type}
        placeholder={placeholder}
        defaultValue={defaultValue}
        required={required}
        disabled={disabled}
        onChange={onChange}
        aria-invalid={showError || undefined}
        aria-describedby={showError && errorMessage ? errorId : undefined}
        className={`${inputBase} ${inputState[state]}`}
      />
      {showError && errorMessage && (
        <p id={errorId} className="flex items-center gap-2 text-caption text-danger">
          <ErrorIcon />
          {errorMessage}
        </p>
      )}
    </div>
  );
}

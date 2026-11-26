"use client";

import { useActionState, useEffect, useRef, useState, type FormEvent, type MouseEvent } from "react";
import { Button } from "@/components/Button/Button";
import { FormField } from "@/components/FormField/FormField";
import { sendContactRequest } from "./contact-actions";
import {
  CONTACT_EMAIL,
  HONEYPOT_FIELD,
  contactCopy,
  contactFields,
  emptyValues,
  hasErrors,
  validateContact,
  type ContactErrors,
  type ContactField,
  type ContactState,
} from "./contact-validation";

const initialState: ContactState = { status: "idle", values: emptyValues, errors: {} };

/** id полів: на них ведуть посилання зі зведення помилок. */
const fieldIds: Record<ContactField, string> = {
  name: "contact-name",
  email: "contact-email",
  message: "contact-message",
};

/**
 * Результат перевірки в браузері. Прив'язаний до стану сервера, для якого його
 * зробили: щойно сервер поверне новий стан, показуються вже його помилки.
 */
interface ClientCheck {
  errors: ContactErrors;
  forState: ContactState;
}

export function ContactForm() {
  const [state, formAction, pending] = useActionState(sendContactRequest, initialState);
  const [clientCheck, setClientCheck] = useState<ClientCheck | null>(null);
  const summaryRef = useRef<HTMLDivElement>(null);

  const errors = clientCheck && clientCheck.forState === state ? clientCheck.errors : state.errors;
  const showSummary = hasErrors(errors);

  // Після кожного натискання з помилками фокус переходить на зведення.
  useEffect(() => {
    if (showSummary) summaryRef.current?.focus();
  }, [clientCheck, state, showSummary]);

  function handleSubmit(event: FormEvent<HTMLFormElement>) {
    // Повторне надсилання, поки триває попереднє, скасовується.
    if (pending) {
      event.preventDefault();
      return;
    }
    const data = new FormData(event.currentTarget);
    const read = (key: string) => {
      const value = data.get(key);
      return typeof value === "string" ? value : "";
    };
    const found = validateContact({ name: read("name"), email: read("email"), message: read("message") });
    setClientCheck({ errors: found, forState: state });
    // Є помилки — не надсилаємо; введене лишається в полях.
    if (hasErrors(found)) event.preventDefault();
  }

  function focusField(event: MouseEvent<HTMLAnchorElement>, field: ContactField) {
    const target = document.getElementById(fieldIds[field]);
    if (!target) return;
    event.preventDefault();
    target.focus();
    target.scrollIntoView({ block: "center" });
  }

  const succeeded = state.status === "success";
  // Збій показуємо лише для відповіді сервера, а не поки йде нове надсилання.
  const failed = state.status === "failed" && !pending;

  return (
    <div className="flex flex-col gap-6">
      {/* Контейнер для повідомлень є на сторінці завжди; текст з'являється після надсилання: успіх або збій. */}
      <div
        role="status"
        className={
          succeeded
            ? "border border-sage bg-surface p-6 text-body text-ink"
            : failed
              ? "border-2 border-danger bg-surface p-6 text-body text-danger"
              : ""
        }
      >
        {succeeded && contactCopy.success}
        {failed && (
          <>
            {contactCopy.sendFailed}{" "}
            <a
              href={`mailto:${CONTACT_EMAIL}`}
              className="underline underline-offset-2 hover:no-underline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-ink"
            >
              {CONTACT_EMAIL}
            </a>
            .
          </>
        )}
      </div>

      {!succeeded && (
        <>
          {showSummary && (
            <div
              ref={summaryRef}
              tabIndex={-1}
              aria-labelledby="contact-summary-title"
              className="flex flex-col gap-3 border-2 border-danger bg-surface p-6 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-ink"
            >
              <h3 id="contact-summary-title" className="text-heading text-danger">
                {contactCopy.summaryTitle}
              </h3>
              <ul className="flex flex-col gap-2">
                {contactFields.map(
                  (field) =>
                    errors[field] && (
                      <li key={field}>
                        <a
                          href={`#${fieldIds[field]}`}
                          onClick={(event) => focusField(event, field)}
                          className="text-body text-danger underline underline-offset-2 hover:no-underline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-ink"
                        >
                          {errors[field]}
                        </a>
                      </li>
                    ),
                )}
              </ul>
            </div>
          )}

          <form action={formAction} onSubmit={handleSubmit} noValidate className="flex flex-col gap-6">
            <div className="grid gap-6 lg:grid-cols-2">
              <FormField
                id={fieldIds.name}
                label="Name"
                name="name"
                autoComplete="name"
                defaultValue={state.values.name}
                error={Boolean(errors.name)}
                errorMessage={errors.name}
              />
              <FormField
                id={fieldIds.email}
                label="Email"
                name="email"
                type="email"
                autoComplete="email"
                placeholder="name@example.com"
                defaultValue={state.values.email}
                error={Boolean(errors.email)}
                errorMessage={errors.email}
              />
            </div>
            <FormField
              id={fieldIds.message}
              label="About your task"
              name="message"
              multiline
              rows={6}
              hint={contactCopy.hintMessage}
              defaultValue={state.values.message}
              error={Boolean(errors.message)}
              errorMessage={errors.message}
            />

            {/* Пастка для ботів: прихована з екрана й від скрінрідерів, без Tab і автозаповнення. */}
            <div aria-hidden="true" className="sr-only">
              <label htmlFor="contact-topic-ref">Не заповнюйте це поле</label>
              <input id="contact-topic-ref" type="text" name={HONEYPOT_FIELD} tabIndex={-1} autoComplete="off" defaultValue="" />
            </div>

            <div>
              <Button type="submit" size="lg" arrow={!pending} disabled={pending}>
                {pending ? contactCopy.submitting : contactCopy.submit}
              </Button>
            </div>
          </form>
        </>
      )}
    </div>
  );
}

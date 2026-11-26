"use server";

import {
  HONEYPOT_FIELD,
  emptyValues,
  hasErrors,
  validateContact,
  type ContactState,
  type ContactValues,
} from "./contact-validation";

function readText(formData: FormData, key: string): string {
  const value = formData.get(key);
  return typeof value === "string" ? value : "";
}

/**
 * Серверна функція форми заявки. Поки лише перевіряє поля й повертає
 * успіх; лист не надсилається (це наступний крок).
 */
export async function sendContactRequest(_prev: ContactState, formData: FormData): Promise<ContactState> {
  // Пастка заповнена — це бот. Відповідаємо як на успіх і нічого не робимо.
  if (readText(formData, HONEYPOT_FIELD).trim() !== "") {
    return { status: "success", values: emptyValues, errors: {} };
  }

  const values: ContactValues = {
    name: readText(formData, "name"),
    email: readText(formData, "email"),
    message: readText(formData, "message"),
  };

  const errors = validateContact(values);
  if (hasErrors(errors)) {
    // Повертаємо введене: React скидає некеровані поля після кожного action.
    return { status: "error", values, errors };
  }

  // TODO: надіслати лист (наступний крок).
  return { status: "success", values: emptyValues, errors: {} };
}

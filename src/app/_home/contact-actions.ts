"use server";

import { Resend } from "resend";
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

/** Опис помилки для логів: лише назва, текст і код, без ключа й заголовків запиту. */
function describeError(error: unknown): string {
  if (error && typeof error === "object") {
    const { name, message, statusCode } = error as { name?: unknown; message?: unknown; statusCode?: unknown };
    return [name, statusCode, message].filter((part) => part !== undefined && part !== null).join(" | ");
  }
  return String(error);
}

/**
 * Серверна функція форми заявки: перевіряє поля й пастку для ботів, потім
 * надсилає лист через Resend. Ключ — у змінній RESEND_API_KEY (.env.local і Vercel).
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

  const name = values.name.trim();
  const email = values.email.trim();
  const message = values.message.trim();

  try {
    const apiKey = process.env.RESEND_API_KEY;
    if (!apiKey) throw new Error("RESEND_API_KEY is not set");
    // Куди приходять заявки: пошта акаунта Resend. Зберігається в змінній, а не в коді.
    const to = process.env.CONTACT_TO_EMAIL;
    if (!to) throw new Error("CONTACT_TO_EMAIL is not set");

    // Клієнт створюється тут, а не на рівні файлу: ключ читається під час виклику.
    const resend = new Resend(apiKey);
    const { error } = await resend.emails.send({
      from: "Портфоліо <onboarding@resend.dev>",
      to,
      replyTo: email,
      // Переноси рядків з імені прибираємо, щоб тема лишалась одним рядком.
      subject: `Заявка з сайту від ${name.replace(/\s+/g, " ")}`,
      text: `Ім'я: ${name}\nПошта: ${email}\n\nПовідомлення:\n${message}`,
    });
    if (error) throw error;
  } catch (error) {
    console.error("[contact form] Request was not sent:", describeError(error));
    // Форма лишається з усім введеним, над нею — повідомлення про збій.
    return { status: "failed", values, errors: {} };
  }

  return { status: "success", values: emptyValues, errors: {} };
}

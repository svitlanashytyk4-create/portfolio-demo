/*
 * Перевірки форми заявки. Спільні для браузера (до надсилання) і серверної
 * функції (sendContactRequest), щоб правила й тексти не розходились.
 */

export const MESSAGE_MAX_LENGTH = 1000;

/** Назва поля-пастки для ботів. Нейтральна, щоб браузер не автозаповнював її. */
export const HONEYPOT_FIELD = "topic_ref";

export type ContactField = "name" | "email" | "message";
export type ContactValues = Record<ContactField, string>;
export type ContactErrors = Partial<Record<ContactField, string>>;

/** Публічна пошта: показуємо в повідомленні про збій. Заявки приходять на CONTACT_TO_EMAIL з .env. */
export const CONTACT_EMAIL = "svitlanashytyk4@gmail.com";

export interface ContactState {
  /** `error` — помилки в полях; `failed` — поля правильні, але лист не надіслався. */
  status: "idle" | "error" | "failed" | "success";
  /** Введені значення: повертаються з сервера, щоб поля не очищались після помилки. */
  values: ContactValues;
  errors: ContactErrors;
}

/** Тексти форми. TODO: звірити з таблицею текстів, коли вона буде в проєкті. */
export const contactCopy = {
  summaryTitle: "There is a problem with your request",
  hintMessage: `Up to ${MESSAGE_MAX_LENGTH} characters`,
  nameEmpty: "Enter your name",
  emailEmpty: "Enter your email address",
  emailFormat: "Enter an email address in the format name@example.com",
  messageEmpty: "Tell me about your task",
  messageTooLong: `Your message must be ${MESSAGE_MAX_LENGTH} characters or fewer`,
  submit: "Send request",
  submitting: "Sending…",
  success: "Thank you, your request has been sent. I will get back to you soon.",
  /** Перед адресою пошти, яка йде посиланням. */
  sendFailed: "Your request wasn't sent. Please try again or email me at",
} as const;

export const emptyValues: ContactValues = { name: "", email: "", message: "" };

/** Порядок полів: у такому ж порядку йдуть помилки у зведенні. */
export const contactFields: ContactField[] = ["name", "email", "message"];

const EMAIL_FORMAT = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

/** Перевіряє значення. Пробіли на початку й у кінці не враховуються. */
export function validateContact(values: ContactValues): ContactErrors {
  const name = values.name.trim();
  const email = values.email.trim();
  const message = values.message.trim();
  const errors: ContactErrors = {};

  if (!name) errors.name = contactCopy.nameEmpty;

  if (!email) errors.email = contactCopy.emailEmpty;
  else if (!EMAIL_FORMAT.test(email)) errors.email = contactCopy.emailFormat;

  if (!message) errors.message = contactCopy.messageEmpty;
  else if (message.length > MESSAGE_MAX_LENGTH) errors.message = contactCopy.messageTooLong;

  return errors;
}

export function hasErrors(errors: ContactErrors): boolean {
  return contactFields.some((field) => errors[field]);
}

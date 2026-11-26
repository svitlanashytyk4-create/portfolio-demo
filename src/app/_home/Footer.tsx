import { defaultNavItems } from "@/components/Navigation/nav-items";
import { Branch, Star } from "./decor";

/**
 * Прямі контакти. Якщо `href` порожній, контакт показується текстом без посилання.
 * Месенджери відкриваються в новій вкладці, пошта — у поштовій програмі.
 */
const contacts: { label: string; href: string }[] = [
  { label: "WhatsApp", href: "https://wa.me/491754909291" },
  { label: "Telegram", href: "https://t.me/SvitlanaShytyk" },
  { label: "Email", href: "mailto:svitlanashytyk4@gmail.com" },
];

const linkClass =
  "text-canvas underline-offset-4 hover:underline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-canvas";

/** Рік для копірайту. Кешується й час від часу оновлюється (а також з кожним деплоєм). */
async function getYear() {
  "use cache";
  return new Date().getFullYear();
}

export async function Footer() {
  const year = await getYear();

  return (
    <footer className="relative mt-section overflow-hidden bg-sage p-8 text-canvas">
      <Branch className="pointer-events-none absolute bottom-16 right-2 hidden h-auto w-20 rotate-45 text-line opacity-60 md:block" />

      <div className="relative grid gap-8 md:grid-cols-3">
        <div className="flex flex-col gap-3">
          <a href="#home" className={`${linkClass} text-caption uppercase`}>
            Svitlana Design
          </a>
          <p className="font-script text-script-sm text-surface">Design that makes sense</p>
          <p className="flex items-center gap-2 text-body text-surface">
            Clients in Ukraine and worldwide
            <Star />
          </p>
        </div>

        <nav aria-label="Footer">
          <ul className="flex flex-col gap-2">
            {defaultNavItems.map((item) => (
              <li key={item.href}>
                <a href={item.href} className={`${linkClass} text-body`}>
                  {item.label}
                </a>
              </li>
            ))}
          </ul>
        </nav>

        <div className="flex flex-col gap-2">
          <p className="text-caption uppercase text-surface">Contacts</p>
          <ul className="flex flex-col gap-2">
            {contacts.map((contact) => (
              <li key={contact.label}>
                {contact.href ? (
                  <a
                    href={contact.href}
                    {...(contact.href.startsWith("http") ? { target: "_blank", rel: "noopener noreferrer" } : {})}
                    className={`${linkClass} text-body`}
                  >
                    {contact.label}
                    {contact.href.startsWith("http") && <span className="sr-only"> (opens in a new tab)</span>}
                  </a>
                ) : (
                  <span className="text-body text-canvas">{contact.label} [TBD]</span>
                )}
              </li>
            ))}
          </ul>
        </div>
      </div>

      <div className="relative mt-8 flex flex-col gap-4 border-t border-canvas/30 pt-6 md:flex-row md:items-center md:justify-between">
        <p className="text-caption text-surface">© {year} Svitlana Design</p>
        <a href="#home" className={`${linkClass} inline-flex items-center gap-2 text-caption uppercase`}>
          <Star />
          Back to top
        </a>
      </div>
    </footer>
  );
}

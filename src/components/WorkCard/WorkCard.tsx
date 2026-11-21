import Image, { type StaticImageData } from "next/image";

export interface WorkCardProps {
  /** Назва роботи. */
  title: string;
  /** Короткий опис задачі: одне-два речення. */
  description: string;
  /** Адреса сторінки кейсу. Уся картка — одне посилання. */
  href: string;
  /** Обкладинка, імпортована з `src/assets` (`import cover from "@/assets/…"`). */
  image: StaticImageData;
  /** Опис обкладинки для скрінрідера: що на ній зображено. */
  imageAlt: string;
}

/**
 * Картка роботи: обкладинка `aspect-cover`, назва й короткий опис.
 * Уся картка — посилання на кейс.
 */
export function WorkCard({ title, description, href, image, imageAlt }: WorkCardProps) {
  return (
    <a
      href={href}
      className={
        "group flex flex-col overflow-hidden rounded-card border border-line bg-surface text-ink " +
        "transition-colors hover:border-ink-muted " +
        "focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-ink"
      }
    >
      <Image
        src={image}
        alt={imageAlt}
        sizes="(max-width: 768px) 100vw, 33vw"
        className="aspect-cover w-full object-cover"
      />
      <div className="flex flex-col gap-2 p-6">
        <h3 className="text-heading group-hover:underline">{title}</h3>
        <p className="text-body text-ink-muted">{description}</p>
      </div>
    </a>
  );
}

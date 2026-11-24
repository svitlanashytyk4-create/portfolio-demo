export interface BadgeProps {
  /** Слова в колонку, між ними тонкі золоті лінії. */
  words?: string[];
  /** Анімація: випливає знизу, потім погойдується, зірочка обертається. Лише якщо людина не вимкнула анімацію в системі. */
  animated?: boolean;
  /** Класи позиціонування ззовні, наприклад `absolute bottom-8 right-0`. */
  className?: string;
}

function Star({ spin }: { spin: boolean }) {
  return (
    <svg
      aria-hidden="true"
      width="20"
      height="20"
      viewBox="0 0 20 20"
      fill="none"
      className={`shrink-0 text-accent ${spin ? "motion-safe:animate-spin-slow" : ""}`}
    >
      <path d="M10 0L12.1708 7.82918L20 10L12.1708 12.1708L10 20L7.82918 12.1708L0 10L7.82918 7.82918L10 0Z" fill="currentColor" />
    </svg>
  );
}

function Rule() {
  return (
    <svg aria-hidden="true" width="55" height="1" viewBox="0 0 55 1" className="shrink-0 text-accent">
      <rect width="55" height="1" fill="currentColor" />
    </svg>
  );
}

/**
 * Кругла напівпрозора плашка зі словами в колонку й зірочкою.
 * Декоративна: прихована від скрінрідера. На вузькому екрані зменшена до 75 %.
 */
export function Badge({ words = ["Design", "Creativity", "Strategy"], animated = true, className = "" }: BadgeProps) {
  return (
    <div
      aria-hidden="true"
      className={`grid origin-bottom-right scale-75 place-items-center md:scale-100 ${animated ? "motion-safe:animate-emerge" : ""} ${className}`}
    >
      <svg width="165" height="165" viewBox="0 0 165 165" className="col-start-1 row-start-1 fill-line/60 stroke-accent">
        <circle cx="82.5" cy="82.5" r="81.5" strokeWidth="1" />
      </svg>
      <div className="col-start-1 row-start-1 flex flex-col items-center gap-2 text-caption uppercase text-ink">
        {words.map((word, index) => (
          <div key={`${word}-${index}`} className="flex flex-col items-center gap-2">
            <span>{word}</span>
            {index < words.length - 1 && <Rule />}
          </div>
        ))}
        <Star spin={animated} />
      </div>
    </div>
  );
}

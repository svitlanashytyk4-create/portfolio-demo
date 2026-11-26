import Image from "next/image";
import portrait from "@/assets/portrait.png";
import { Badge } from "@/components/Badge/Badge";
import { Button } from "@/components/Button/Button";
import { Navigation } from "@/components/Navigation/Navigation";
import {
  Branch,
  IconCalendar,
  IconClock,
  IconComputer,
  IconFolder,
  IconLayers,
  IconLotus,
  IconMessage,
  IconPackage,
  IconPalette,
  IconPencil,
  IconSparkles,
  IconTarget,
  Rule,
  Star,
} from "./_home/decor";

const services = [
  { icon: <IconComputer />, title: "UX/UI design", text: "Websites & web products" },
  { icon: <IconPalette />, title: "Dashboards", text: "Admin panels & data views" },
  { icon: <IconSparkles />, title: "AI-assisted design", text: "Faster ideas, my decisions" },
  { icon: <IconLotus />, title: "Design systems", text: "Consistent & scalable UI" },
];

/* TODO: замінити [TBD] на реальні строки (питання 24 у docs/site-plan.md) перед публікацією. */
const processSteps = [
  { icon: <IconMessage />, title: "Message", text: "You tell me about the task. I reply within [TBD]." },
  { icon: <IconTarget />, title: "Brief", text: "Goals, users, scope. I estimate the hours and timeline." },
  { icon: <IconPencil />, title: "Design", text: "Structure, visuals, layouts. Review rounds with you.", highlight: true },
  { icon: <IconPackage />, title: "Handoff", text: "Figma files with components and states, ready for developers." },
];

const terms = [
  { icon: <IconClock />, title: "Hourly", text: "Rate after we discuss the task" },
  { icon: <IconLayers />, title: "Up to 2 projects", text: "So yours gets real focus" },
  { icon: <IconCalendar />, title: "Timelines", text: "Screen [TBD] · project [TBD] · reply [TBD]" },
];

export default function Home() {
  return (
    <div id="home" className="mx-auto max-w-content px-4 pb-section md:px-8">
      {/* ---------- Шапка ---------- */}
      <header className="relative flex items-center justify-between gap-6 pt-8">
        <a
          href="#home"
          className="whitespace-nowrap text-caption uppercase focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-ink"
        >
          Svitlana Design
        </a>
        <span aria-hidden="true" className="hidden flex-1 border-t border-accent lg:block" />
        <Navigation activeHref="#home" />
        <span aria-hidden="true" className="hidden flex-1 border-t border-accent lg:block" />
        <Star className="hidden lg:block" />
      </header>

      <main>
        {/* ---------- Hero ---------- */}
        <section className="mt-section grid items-end gap-8 md:grid-cols-5">
          <div className="flex flex-col self-start md:col-span-3">
            <p className="font-script text-script-sm text-accent-ink md:text-script">Hello, I&apos;m Svitlana</p>
            <div className="flex items-center gap-2">
              <Rule width={81} strokeWidth={2} />
              <Star />
              <span className="ml-4 text-lead">UI/UX Designer</span>
            </div>
            <h1 className="mt-4 text-display-sm uppercase md:text-display">
              <span className="block">Design</span>
              <span className="block">that</span>
              <span className="block">makes sense.</span>
            </h1>
            <p className="mt-3 text-lead">
              I design interfaces for websites and web products, including admin panels and dashboards. AI helps me
              explore options faster; the decisions and the final design are mine.
            </p>
            <div className="mt-8 flex flex-wrap items-center gap-6">
              <Button href="#works" size="lg" arrow>
                View my work
              </Button>
              <Button href="#contacts" variant="secondary" size="lg">
                Let&apos;s work together
              </Button>
            </div>
          </div>

          <div className="relative w-full md:col-span-2">
            <div className="rounded-t-arch border-2 border-b-0 border-sage px-4 pt-3">
              <div className="rounded-t-arch bg-sage pt-6">
                <Image
                  src={portrait}
                  alt="Svitlana, UI/UX designer"
                  priority
                  sizes="(max-width: 768px) 90vw, 40vw"
                  className="aspect-portrait w-full rounded-t-arch object-cover"
                />
              </div>
            </div>
            <Badge className="absolute bottom-8 right-0 lg:-right-6" />
          </div>
        </section>

        {/* ---------- Послуги ---------- */}
        <section
          aria-label="What I do"
          className="grid gap-8 bg-sage p-8 md:grid-cols-2 lg:flex lg:items-start lg:justify-between"
        >
          {services.map((service, index) => (
            <div key={service.title} className="contents">
              {index > 0 && <span aria-hidden="true" className="hidden self-stretch border-l border-canvas lg:block" />}
              <div className="flex flex-col items-center gap-3 text-center">
                <span className="text-line">{service.icon}</span>
                <h2 className="text-heading uppercase text-canvas">{service.title}</h2>
                <p className="text-body text-canvas">{service.text}</p>
              </div>
            </div>
          ))}
        </section>

        {/* ---------- Про мене ---------- */}
        <section
          id="about"
          aria-labelledby="about-title"
          className="mt-section grid items-center gap-8 pt-8 md:grid-cols-12"
        >
          {/* Фото з гілкою. TODO: замінити портрет на фото за роботою, тоді дати йому alt. */}
          <div className="relative mx-auto w-full max-w-sm md:col-span-4 md:max-w-none">
            <svg aria-hidden="true" viewBox="0 0 100 100" className="absolute -bottom-6 -left-6 w-2/3 fill-line/60">
              <circle cx="50" cy="50" r="50" />
            </svg>
            <div className="relative overflow-hidden rounded-tl-arch rounded-br-arch bg-surface">
              <Image
                src={portrait}
                alt=""
                sizes="(max-width: 768px) 90vw, 30vw"
                className="aspect-portrait w-full object-cover object-top"
              />
            </div>
            <Branch className="absolute -bottom-8 -left-6 h-auto w-28 text-sage motion-safe:animate-float md:-left-14 md:w-32" />
          </div>

          <div className="flex flex-col md:col-span-5">
            <p className="font-script text-script-sm text-accent-ink md:text-script">Nice to meet you</p>
            <div className="flex items-center gap-2">
              <Rule width={81} strokeWidth={2} />
              <Star />
              <span className="ml-4 text-caption uppercase">About me</span>
            </div>
            <h2 id="about-title" className="mt-4 text-display-sm">
              From learning to <span className="text-accent-ink">real projects</span>
            </h2>
            <p className="mt-3 text-body text-ink-muted">
              A UI/UX designer at the start of my career. I studied UI/UX design at GoIT, and my work so far is
              learning and personal projects — no client work yet.
            </p>
            <p className="mt-6 text-caption uppercase text-accent-ink">What I did myself</p>
            <ul className="mt-3 flex flex-col gap-2 text-body">
              {[
                "Clinic360 admin page, end to end: tables, dashboard, charts",
                "Visual direction: colors and typography",
                "Page structure and block ideas",
              ].map((item) => (
                <li key={item} className="flex items-start gap-3">
                  <Star className="mt-0.5 size-4" />
                  {item}
                </li>
              ))}
            </ul>
            <div className="mt-8">
              <Button href="#services" variant="secondary" arrow>
                How I work
              </Button>
            </div>
          </div>

          <dl className="flex flex-col divide-y divide-canvas/30 bg-sage p-8 text-canvas md:col-span-3">
            {[
              { icon: <IconFolder />, value: "3", label: "learning and personal projects" },
              { icon: <IconLayers />, value: "2", label: "projects at a time, max" },
            ].map((fact) => (
              <div key={fact.label} className="flex items-center gap-4 py-6 first:pt-0 last:pb-0">
                <span className="text-line">{fact.icon}</span>
                <div className="flex flex-col-reverse">
                  <dt className="text-body">{fact.label}</dt>
                  <dd className="text-display-sm lining-nums">{fact.value}</dd>
                </div>
              </div>
            ))}
          </dl>
        </section>

        {/* ---------- Послуги й процес ---------- */}
        <section id="services" aria-labelledby="services-title" className="mt-section pt-8">
          <div className="flex flex-col gap-6 md:flex-row md:items-end md:justify-between">
            <div className="flex flex-col">
              <p className="font-script text-script-sm text-accent-ink md:text-script">How I work</p>
              <div className="flex items-center gap-2">
                <Rule width={81} strokeWidth={2} />
                <Star />
                <span className="ml-4 text-caption uppercase">Services and process</span>
              </div>
              <h2 id="services-title" className="mt-4 text-display-sm">
                From first message to ready <span className="text-accent-ink">layouts</span>
              </h2>
            </div>
            <p className="text-body text-ink-muted md:max-w-xs">
              Clear steps, no surprises: you always know what happens next.
            </p>
          </div>

          <div className="relative mt-8">
            {/* Пунктир, що з'єднує кроки: вертикальний на вузькому екрані, горизонтальний на широкому. */}
            <span aria-hidden="true" className="absolute inset-y-0 left-1/2 border-l border-dashed border-accent lg:hidden" />
            <span aria-hidden="true" className="absolute inset-x-[12%] top-12 hidden border-t border-dashed border-accent lg:block" />
            <ol className="relative grid gap-6 md:grid-cols-2 lg:grid-cols-4 lg:gap-4">
              {processSteps.map((step, index) => (
                <li
                  key={step.title}
                  className={`flex flex-col items-center rounded-t-arch border px-4 pb-6 pt-8 text-center ${
                    step.highlight ? "border-sage bg-sage text-canvas" : "border-line bg-surface"
                  }`}
                >
                  <span
                    className={`grid size-12 place-items-center rounded-full ${
                      step.highlight ? "bg-canvas text-sage" : "border border-accent bg-canvas text-accent-ink"
                    }`}
                  >
                    {step.icon}
                  </span>
                  <span
                    aria-hidden="true"
                    className={`mt-3 text-display-sm lining-nums ${step.highlight ? "" : "text-accent-ink"}`}
                  >
                    {String(index + 1).padStart(2, "0")}
                  </span>
                  <h3 className="text-heading">{step.title}</h3>
                  <p className={`mt-2 text-body ${step.highlight ? "text-surface" : "text-ink-muted"}`}>{step.text}</p>
                  {step.highlight && (
                    <p className="mt-4 inline-flex items-center gap-2 border border-line px-3 py-1 text-caption text-surface">
                      <span className="size-4 [&>svg]:size-4">
                        <IconSparkles />
                      </span>
                      AI: faster variants
                    </p>
                  )}
                </li>
              ))}
            </ol>
          </div>

          <dl className="mt-8 grid border-y border-line md:grid-cols-3">
            {terms.map((term, index) => (
              <div
                key={term.title}
                className={`flex items-start gap-3 p-4 ${index > 0 ? "border-t border-line md:border-t-0 md:border-l" : ""}`}
              >
                <span className="text-accent">{term.icon}</span>
                <div>
                  <dt className="text-heading">{term.title}</dt>
                  <dd className="text-body text-ink-muted">{term.text}</dd>
                </div>
              </div>
            ))}
          </dl>

          <div className="mt-8 flex justify-center">
            <Button href="#contacts" size="lg" arrow>
              Discuss your project
            </Button>
          </div>
        </section>
      </main>
    </div>
  );
}

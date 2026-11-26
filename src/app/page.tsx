import Image from "next/image";
import portrait from "@/assets/portrait.png";
import { Badge } from "@/components/Badge/Badge";
import { Button } from "@/components/Button/Button";
import { Navigation } from "@/components/Navigation/Navigation";
import { IconComputer, IconLotus, IconPalette, IconSparkles, Rule, Star } from "./_home/decor";

const services = [
  { icon: <IconComputer />, title: "UX/UI design", text: "Websites & web products" },
  { icon: <IconPalette />, title: "Dashboards", text: "Admin panels & data views" },
  { icon: <IconSparkles />, title: "AI-assisted design", text: "Faster ideas, my decisions" },
  { icon: <IconLotus />, title: "Design systems", text: "Consistent & scalable UI" },
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
          id="services"
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
      </main>
    </div>
  );
}

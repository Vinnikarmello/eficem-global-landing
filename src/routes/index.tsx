import { createFileRoute } from "@tanstack/react-router";
import { useEffect, useRef, useState, type FormEvent } from "react";
import {
  Menu,
  X,
  Ruler,
  MoveVertical,
  Weight,
  Instagram,
  Mail,
  MapPin,
  ArrowRight,
  ChevronLeft,
  ChevronRight,
  Sun,
  Moon,
} from "lucide-react";
import { I18nProvider, LANGS, useI18n } from "@/lib/i18n";
import TextBlockAnimation from "@/components/ui/text-block-animation";
import inspection from "@/assets/inspection.jpg.asset.json";
import track1 from "@/assets/track-1.jpg.asset.json";
import track3 from "@/assets/track-3.jpg.asset.json";
import teamCar from "@/assets/team-car.jpg.asset.json";
import fourth from "@/assets/fourth-place.jpg.asset.json";
import video from "@/assets/eficem.mp4.asset.json";

const EMAIL = "comunicacaoeficem@gmail.com";
const ADDRESS = "R. Dona Francisca, 8300 - Distrito Industrial, Joinville - SC, 89219-600";
const MAPS_Q = encodeURIComponent("UFSC Campus Joinville, " + ADDRESS);

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "EFICEM UFSC Joinville — Eficiência energética veicular" },
      {
        name: "description",
        content:
          "Equipe de eficiência energética veicular da UFSC Joinville. Protótipos elétricos na Shell Eco-marathon. Seja patrocinador.",
      },
      { property: "og:title", content: "EFICEM UFSC Joinville — Eficiência energética veicular" },
      {
        property: "og:description",
        content:
          "Protótipos que percorrem a maior distância com o mínimo de energia. 4º lugar na Shell Eco-marathon Brasil 2026.",
      },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
  }),
  component: () => (
    <I18nProvider>
      <Landing />
    </I18nProvider>
  ),
});

export function LanguageSwitch() {
  const { lang, setLang } = useI18n();

  return (
    <div className="flex items-center gap-1 sm:gap-1.5">
      {LANGS.map((l) => (
        <button
          key={l.code}
          type="button"
          onClick={() => setLang(l.code)}
          aria-pressed={lang === l.code}
          aria-label={l.code.toUpperCase()}
          title={l.code.toUpperCase()}
          className={`rounded-full transition ${
            lang === l.code ? "ring-2 ring-green ring-offset-2" : "opacity-90 hover:opacity-100"
          }`}
        >
          <img src={l.img} alt={l.code} className="block h-7 w-7 rounded-full object-cover" />
        </button>
      ))}
    </div>
  );
}
function Logo({ className = "" }: { className?: string }) {
  return <img src="/logo.png" alt="EFICEM" className={`object-contain ${className}`} />;
}

function Kicker({ children, dark = false }: { children: React.ReactNode; dark?: boolean }) {
  return (
    <p
      className={`flex items-center gap-2 font-mono text-xs font-bold uppercase tracking-[0.2em] ${dark ? "text-green" : "text-purple"}`}
    >
      <span className="clip-v inline-block h-3 w-3 shrink-0 bg-green" />
      {children}
    </p>
  );
}

const btn =
  "clip-btn inline-flex items-center justify-center gap-2 px-6 py-3 font-display text-sm font-bold uppercase tracking-wide transition-colors";
const btnGreen = `${btn} bg-green text-carbon hover:bg-green-deep`;
const btnPurpleOutline = `${btn} border-2 border-purple bg-purple text-purple-foreground hover:bg-purple/85`;

function useTheme() {
  const [dark, setDark] = useState(false);
  useEffect(() => {
    let d = false;
    try {
      d = localStorage.getItem("eficem-theme") === "dark";
    } catch {
      d = false;
    }
    setDark(d);
    document.documentElement.dataset["theme"] = d ? "dark" : "light";
  }, []);
  const toggle = () => {
    setDark((prev) => {
      const next = !prev;
      document.documentElement.dataset["theme"] = next ? "dark" : "light";
      try {
        localStorage.setItem("eficem-theme", next ? "dark" : "light");
      } catch {
        /* ignore */
      }
      return next;
    });
  };
  return { dark, toggle };
}

function ThemeIcon({ dark }: { dark: boolean }) {
  return dark ? <Sun className="h-4 w-4" /> : <Moon className="h-4 w-4" />;
}

/* Botão flutuante: logo abaixo do "Seja Patrocinador" no cabeçalho */
function ThemeFab({
  dark,
  toggle,
  label,
}: {
  dark: boolean;
  toggle: () => void;
  label: string;
}) {
  return (
    <div className="pointer-events-none fixed right-2 top-[88px] z-40 hidden md:block">
      <div className="pointer-events-auto drop-shadow-lg">
        <button
          type="button"
          onClick={toggle}
          aria-label={label}
          title={label}
          aria-pressed={dark}
          className="clip-btn flex h-10 w-10 items-center justify-center border border-border bg-surface text-carbon transition-colors hover:border-purple hover:bg-purple hover:text-carbon"
        >
          <ThemeIcon dark={dark} />
        </button>
      </div>
    </div>
  );
}

/* Versão compacta, usada dentro do menu aberto no celular */
function ThemeButton({
  dark,
  toggle,
  label,
}: {
  dark: boolean;
  toggle: () => void;
  label: string;
}) {
  return (
    <button
      type="button"
      onClick={toggle}
      aria-label={label}
      title={label}
      aria-pressed={dark}
      className="flex h-10 w-10 shrink-0 items-center justify-center border border-border bg-surface text-carbon transition-colors hover:border-green hover:text-green"
    >
      <ThemeIcon dark={dark} />
    </button>
  );
}

function Header() {
  const { t } = useI18n();
  const { dark, toggle } = useTheme();
  const [open, setOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  useEffect(() => {
    const f = () => setScrolled(window.scrollY > 20);
    f();
    window.addEventListener("scroll", f);
    return () => window.removeEventListener("scroll", f);
  }, []);

  const links: [string, string][] = [
    ["#sobre", t.nav.about],
    ["#projeto", t.nav.project],
    ["#conquistas", t.nav.achievements],
    ["#galeria", t.nav.gallery],
    ["#patrocinio", t.nav.sponsor],
  ];

  return (
    <header
      className={`fixed inset-x-0 top-0 z-50 bg-surface transition-shadow duration-300 ${
        scrolled ? "shadow-md" : "shadow-sm"
      }`}
    >
      {/* Placa escura angular atrás da logo + wordmark EFICEM, para contraste */}
      <div
        className="pointer-events-none absolute left-0 top-0 h-20 bg-purple"
        style={{
          width: "max(180px, calc((100vw - 1280px) / 2 + 167px))",
          clipPath: "polygon(0 0, 100% 0, calc(100% - 12px) 100%, 0 100%)",
        }}
      />
      <div className="rise-in relative z-10 mx-auto flex h-20 max-w-7xl items-center justify-between gap-3 px-4 sm:px-6">
        <div className="flex items-center gap-8">
          <a
            href="#inicio"
            className="flex shrink-0 items-center gap-2.5 text-green"
            style={{ transform: "translateX(min(-4px, calc((1280px - 100vw) / 4 - 4px)))" }}
          >
            <Logo className="h-9 w-9" />
            <span className="font-display text-2xl font-black tracking-tight text-carbon-foreground">
              EFICEM
            </span>
          </a>
          <nav className="hidden items-center gap-8 lg:flex">
            {links.map(([h, l]) => (
              <a
                key={h}
                href={h}
                className="rounded-sm px-2 py-1 font-display text-sm font-bold uppercase tracking-wide text-carbon/90 transition-colors hover:bg-purple hover:text-purple-foreground"
              >
                {l}
              </a>
            ))}
          </nav>
        </div>

        <div className="relative z-10 flex min-w-0 items-center gap-3">
          <div className="hidden md:block">
            <LanguageSwitch />{" "}
          </div>
          <div className="hidden md:block">
            <a href="#patrocinio" className={`${btnGreen} px-5 py-2.5`}>
              {t.nav.sponsorBtn} <ArrowRight className="h-4 w-4" />
            </a>
          </div>
          <button
            className="p-2 text-carbon lg:hidden"
            onClick={() => setOpen(!open)}
            aria-label={t.nav.menu}
            aria-expanded={open}
          >
            {open ? <X /> : <Menu />}
          </button>
        </div>
      </div>

      <ThemeFab dark={dark} toggle={toggle} label={t.nav.theme} />

      {open && (
        <div className="relative z-50 border-t border-border bg-surface px-4 pb-6 pt-2 lg:hidden shadow-lg">
          <nav className="flex flex-col">
            {links.map(([h, l]) => (
              <a
                key={h}
                href={h}
                onClick={() => setOpen(false)}
                className="flex items-center gap-3 border-b border-border py-3 font-display font-semibold uppercase text-carbon"
              >
                <span className="clip-v h-2.5 w-2.5 bg-green" />
                {l}
              </a>
            ))}
          </nav>
          <div className="mt-4 flex flex-col items-start gap-3 md:hidden">
            <a href="#patrocinio" onClick={() => setOpen(false)} className={btnGreen}>
              {t.nav.sponsorBtn} <ArrowRight className="h-4 w-4" />
            </a>
            <div className="flex w-full items-center justify-between gap-3">
              <LanguageSwitch />
              <ThemeButton dark={dark} toggle={toggle} label={t.nav.theme} />
            </div>
          </div>
        </div>
      )}
    </header>
  );
}

function Hero() {
  const { t } = useI18n();
  return (
    <section
      id="inicio"
      className="relative flex min-h-[480px] sm:min-h-[520px] md:min-h-[560px] lg:min-h-[580px] xl:min-h-[640px] w-full items-center overflow-hidden bg-ice"
    >
      <div
        className="absolute inset-y-0 -right-5 lg:block z-0 bg-ice"
        style={{ width: "60%", height: "100%" }}
      >
        <div
          className="absolute inset-0 bg-green"
          style={{
            clipPath: "polygon(270px 0%, 100% 0%, 100% 50px, 65px 350px)",
          }}
        />

        <div
          className="absolute inset-0"
          style={{
            clipPath: "polygon(140px 0%, 100% 0%, 100% 100%, 0% 100%)",
          }}
        >
          <img
            src="/eficem/hero.jpg"
            alt="EFICEM UFSC Joinville — protótipo na pista"
            className="h-full w-full object-cover"
            style={{
              clipPath: "polygon(300px 0, 100% 0, 100% 100%, 0 100%)",
              objectPosition: "center",
            }}
          />
          <div className="pointer-events-none absolute inset-0 bg-gradient-to-r from-surface via-surface/90 to-transparent sm:via-surface/40 md:hidden" />
        </div>
      </div>
      <div className="relative z-10 mx-auto w-full max-w-7xl px-4 pt-24 pb-12 sm:px-6 md:pt-28 lg:pt-28 lg:pb-16">
        <div className="max-w-md sm:max-w-lg lg:max-w-xl">
          <div className="rise-in rise-d1 flex items-center gap-2.5 font-mono text-xs font-bold uppercase tracking-[0.2em] text-muted-foreground">
            <span className="h-1.5 w-6 bg-green shrink-0" />
            <span>{t.hero.kicker}</span>
          </div>

          <h1 className="rise-in rise-d2 mt-4 font-display text-5xl font-black uppercase leading-none tracking-tight text-carbon sm:text-6xl md:text-7xl lg:text-8xl">
            EFICEM
          </h1>

          <p className="rise-in rise-d3 mt-4 max-w-lg font-sans text-xl font-bold leading-snug text-carbon sm:text-2xl">
            {t.hero.title}
          </p>

          <p className="rise-in rise-d4 mt-4 max-w-md text-base leading-relaxed text-muted-foreground sm:text-lg">
            {t.hero.sub}
          </p>

          <div className="rise-in rise-d5 mt-8 flex flex-wrap items-center gap-4">
            <a href="#projeto" className={btnGreen}>
              {t.hero.cta} <ArrowRight className="h-4 w-4" />
            </a>
            <a href="#patrocinio" className={btnPurpleOutline}>
              {t.hero.cta2}
            </a>
          </div>
        </div>
      </div>
    </section>
  );
}

function About() {
  const { t } = useI18n();
  return (
    <section id="sobre" className="relative overflow-hidden bg-surface py-20 md:py-28">
      <div className="clip-v pointer-events-none absolute -left-20 top-10 h-64 w-64 bg-purple/5" />
      <div className="clip-v pointer-events-none absolute bottom-0 right-10 h-40 w-40 rotate-180 bg-green/10" />
      <div className="relative mx-auto grid max-w-7xl gap-12 px-4 sm:px-6 lg:grid-cols-2 lg:items-center">
        <div className="min-w-0">
          <Kicker>{t.about.kicker}</Kicker>
          <TextBlockAnimation>
            <h2 className="mt-4 text-3xl font-bold uppercase tracking-tight sm:text-4xl lg:text-5xl">
              {t.about.title}
            </h2>
          </TextBlockAnimation>
          <p className="mt-6 text-lg leading-relaxed text-muted-foreground">{t.about.text}</p>
          <dl className="mt-10 grid grid-cols-2 border-y border-border">
            {t.about.stats.map(([v, l]) => (
              <div
                key={l}
                className="border-r border-border py-5 pr-2 last:border-r-0 [&:not(:first-child)]:pl-4"
              >
                <dt className="font-mono text-2xl font-bold text-purple sm:text-3xl">{v}</dt>
                <dd className="mt-1 text-xs uppercase tracking-wider text-muted-foreground">{l}</dd>
              </div>
            ))}
          </dl>
        </div>
        <figure className="min-w-0">
          <img
            src="/eficem/equipe2025.jpg"
            alt={t.about.cap2}
            loading="lazy"
            className="clip-poly-a aspect-[4/3] w-full object-cover"
          />
          <figcaption className="mt-2 font-mono text-xs uppercase text-muted-foreground">
            ▼ {t.about.cap2}
          </figcaption>
        </figure>
      </div>
    </section>
  );
}

function Project() {
  const { t } = useI18n();
  const specs = [
    { v: "2300", u: "mm", l: t.project.length, I: Ruler },
    { v: "700", u: "mm", l: t.project.height, I: MoveVertical },
    { v: "35", u: "kg", l: t.project.weight, I: Weight },
  ];
  return (
    <section id="projeto" className="clip-section-both bg-ice py-24 md:py-32">
      <div className="mx-auto grid max-w-7xl gap-12 px-4 sm:px-6 lg:grid-cols-[1fr_1.1fr] lg:items-center">
        <figure className="relative order-2 min-w-0 lg:order-1">
          <img
            src="/eficem/projeto.jpg"
            alt={t.project.cap}
            loading="lazy"
            className="clip-card aspect-[4/5] max-h-[620px] w-full object-cover"
          />
          <figcaption className="absolute left-0 top-0 bg-carbon px-3 py-2 font-mono text-xs uppercase text-carbon-foreground">
            {t.project.cap}
          </figcaption>
        </figure>
        <div className="order-1 min-w-0 lg:order-2">
          <Kicker>{t.project.kicker}</Kicker>
          <span className="clip-btn mt-5 inline-block bg-purple px-4 py-1.5 font-mono text-sm font-bold text-purple-foreground">
            {t.project.badge}
          </span>
          <TextBlockAnimation blockColor="#3B1E77">
            <h2 className="mt-4 text-3xl font-bold uppercase tracking-tight sm:text-4xl lg:text-5xl">
              {t.project.title}
            </h2>
          </TextBlockAnimation>
          <p className="mt-4 text-lg text-muted-foreground">{t.project.text}</p>
          <div className="mt-10 grid grid-cols-3 gap-4">
            {specs.map(({ v, u, l, I }) => (
              <div key={l} className="clip-card border-l-4 border-green bg-surface p-5">
                <I className="h-5 w-5 text-purple" />
                <p className="mt-3 font-mono text-4xl font-bold leading-none text-carbon">
                  {v}
                  <span className="ml-1 text-lg text-green-deep">{u}</span>
                </p>
                <p className="mt-2 text-xs uppercase tracking-widest text-muted-foreground">{l}</p>
                <p className="chevrons mt-3 text-sm" aria-hidden>
                  {">>>>"}
                </p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

// Imagens por marco (mesma ordem de ach.items). As fotos reais da combustão e
// do protótipo elétrico vêm do site oficial; os demais anos usam fotos da equipe
// até termos as fotos históricas específicas de cada época.
const ACH_IMAGES = [
  "/eficem/logo2012.jpg", // 2012 — logo da equipe
  "/eficem/combustao.jpg", // 2013 — protótipo à combustão (site oficial)
  "/eficem/setta2016.jpg", // 2016 — Setta nº 312 na Shell Eco-marathon
  "/eficem/setta2017.jpg", // 2017 — equipe com o Setta nº 304 (SEM Americas)
  inspection.url, // 2019
  "/eficem/virtual2021.jpg", // 2021 — Virtual League 2020-2021
  "/eficem/safety2022.jpg", // 2022 — Safety Award na Shell Eco-marathon Brasil
  "/eficem/eletropig2023.jpg", // 2023 — 3º lugar, Eletropig na SEMB
  fourth.url, // 2026
];

function Achievements() {
  const { t } = useI18n();
  const items = t.ach.items;
  const scroller = useRef<HTMLDivElement>(null);
  const nudge = (dir: number) => {
    const el = scroller.current;
    if (!el) return;
    const card = el.querySelector<HTMLElement>("[data-card]");
    const step = card ? card.offsetWidth + 24 : el.clientWidth * 0.8;
    el.scrollBy({ left: dir * step, behavior: "smooth" });
  };
  return (
    <section
      id="conquistas"
      className="relative overflow-hidden bg-carbon pb-0 pt-20 text-carbon-foreground md:pt-28"
    >
      <div className="tri-mesh pointer-events-none absolute inset-0 opacity-10" />
      <div className="relative mx-auto max-w-7xl px-4 sm:px-6">
        <Kicker dark>{t.ach.kicker}</Kicker>
        <TextBlockAnimation>
          <h2 className="mt-4 max-w-3xl text-3xl font-bold uppercase tracking-tight sm:text-4xl lg:text-5xl">
            {t.ach.title}
          </h2>
        </TextBlockAnimation>
      </div>

      <div className="relative mx-auto mt-12 max-w-7xl md:mt-16">
        <button
          type="button"
          onClick={() => nudge(-1)}
          aria-label={t.ach.prev}
          className="absolute left-2 top-1/2 z-20 hidden -translate-y-1/2 items-center justify-center rounded-full border border-green/50 bg-carbon/80 p-2.5 text-green backdrop-blur-sm transition hover:bg-green hover:text-carbon sm:flex lg:left-4"
        >
          <ChevronLeft className="h-5 w-5" />
        </button>
        <button
          type="button"
          onClick={() => nudge(1)}
          aria-label={t.ach.next}
          className="absolute right-2 top-1/2 z-20 hidden -translate-y-1/2 items-center justify-center rounded-full border border-green/50 bg-carbon/80 p-2.5 text-green backdrop-blur-sm transition hover:bg-green hover:text-carbon sm:flex lg:right-4"
        >
          <ChevronRight className="h-5 w-5" />
        </button>

        <div
          ref={scroller}
          className="no-scrollbar flex snap-x snap-mandatory scroll-px-4 gap-6 overflow-x-auto scroll-smooth px-4 pb-10 sm:scroll-px-6 sm:px-6"
        >
          {items.map(([year, title, text], i) => (
            <article
              key={year}
              data-card
              className="group relative flex w-[85vw] max-w-[380px] shrink-0 snap-start flex-col sm:w-[360px] sm:max-w-none lg:w-[400px]"
            >
              <span
                className="pointer-events-none absolute left-0 right-[-24px] top-6 h-px bg-green/25"
                aria-hidden
              />
              <div className="relative z-10 flex h-12 items-center gap-3">
                <span
                  className={`clip-tri-node h-5 w-6 shrink-0 ${i === items.length - 1 ? "bg-green" : "bg-purple"}`}
                />
                <span className="font-mono text-3xl font-bold text-green">{year}</span>
              </div>
              <div className="clip-card overflow-hidden border border-green/20">
                <img
                  src={ACH_IMAGES[i % ACH_IMAGES.length]}
                  alt={title}
                  loading="lazy"
                  className="aspect-[4/3] w-full object-cover transition-transform duration-500 group-hover:scale-105"
                />
              </div>
              <h3 className="mt-4 text-lg font-bold uppercase leading-tight">{title}</h3>
              <p className="mt-2 text-sm leading-relaxed text-carbon-foreground/70">{text}</p>
            </article>
          ))}
        </div>
      </div>

      <div className="relative mt-4 overflow-hidden border-t border-green/30 py-4" aria-hidden>
        <div className="marquee chevrons flex w-max whitespace-nowrap text-xl">
          {Array.from({ length: 40 }).map((_, i) => (
            <span key={i} className="px-4">
              {">>>>"}
            </span>
          ))}
        </div>
      </div>
    </section>
  );
}

function Gallery() {
  const { t } = useI18n();
  const a = t.gallery.alts;
  return (
    <section id="galeria" className="bg-ice py-20 md:py-28">
      <div className="mx-auto max-w-7xl px-4 sm:px-6">
        <Kicker>{t.gallery.kicker}</Kicker>
        <div className="mt-4 flex flex-col gap-3 md:flex-col">
          <TextBlockAnimation blockColor="#3B1E77">
            <h2 className="text-3xl font-bold uppercase tracking-tight sm:text-4xl lg:text-5xl">
              {t.gallery.title}
            </h2>
          </TextBlockAnimation>
          <p className="max-w-md text-muted-foreground">{t.gallery.sub}</p>
        </div>
        <div className="mt-8 grid auto-rows-[180px] grid-cols-2 gap-3 sm:auto-rows-[220px] md:grid-cols-4">
          <video
            src={video.url}
            aria-label={a[3]}
            className="col-span-2 row-span-2 h-full w-full bg-carbon object-cover"
            autoPlay
            muted
            loop
            playsInline
          />
          <img
            src={track3.url}
            alt={a[2]}
            loading="lazy"
            className="col-span-1 h-full w-full object-cover md:col-span-2 hidden md:block lg:col-span-1"
          />
          <img
            src={track1.url}
            alt={a[5]}
            loading="lazy"
            className="col-span-1 h-full w-full object-cover md:col-span-1 hidden lg:block"
          />
          <img
            src={inspection.url}
            alt={a[4]}
            loading="lazy"
            className="col-span-1 h-full w-full object-cover md:col-span-2 hidden md:block"
          />
          <img
            src={teamCar.url}
            alt={a[1]}
            loading="lazy"
            className="clip-card col-span-2 md:col-span-4 row-span-2 h-full w-full object-cover"
          />
        </div>
      </div>
    </section>
  );
}

function Partners() {
  const { t } = useI18n();
  const names = ["/ufsc.png", "/crea.png", "/poial.png", "/fablab.png"];
  return (
    <section className="bg-purple text-purple-foreground md:grid md:grid-cols-3">
      <div className="col-span-2 mx-auto max-w-9xl px-4 py-12 sm:px-6">
        <p className="font-mono uppercase tracking-[0.2em] text-green">{t.partners.title}</p>
        <ul className="mt-5 flex justify-center gap-8">
          {names.map((n) => (
            <li
              key={n}
              className=""
            >
              <img src={n} alt="" className="h-15 "/>
            </li>
          ))}
        </ul>
      </div>
      <div className="bg-green text-carbon flex items-center ">
        <p className="mx-auto max-w-7xl px-4 py-6 md:py-0 font-display text-xl font-bold uppercase sm:px-6 sm:text-2xl">
          {t.partners.quote}<br /> <span className="text-purple">{t.partners.quote2}</span>
        </p>
      </div>
    </section>
  );
}

function Sponsor() {
  const { t } = useI18n();
  const [sent, setSent] = useState(false);
  const onSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const d = new FormData(e.currentTarget);
    const name = String(d.get("name") || "")
      .trim()
      .slice(0, 100);
    const company = String(d.get("company") || "")
      .trim()
      .slice(0, 100);
    const contact = String(d.get("contact") || "")
      .trim()
      .slice(0, 150);
    if (!name || !company || !contact) return;
    const body = `${t.sponsor.name}: ${name}\n${t.sponsor.company}: ${company}\n${t.sponsor.contact}: ${contact}`;
    window.location.href = `mailto:${EMAIL}?subject=${encodeURIComponent(t.sponsor.subject)}&body=${encodeURIComponent(body)}`;
    setSent(true);
  };
  const input =
    "w-full border-0 border-b-2 border-input bg-ice px-4 py-3 text-carbon outline-none focus:border-green";
  return (
    <section id="patrocinio" className="bg-surface py-20 md:py-28">
      <div className="mx-auto grid max-w-7xl gap-10 px-4 sm:px-6 lg:grid-cols-2">
        <div className="min-w-0">
          <Kicker>{t.sponsor.kicker}</Kicker>
          <TextBlockAnimation>
            <h2 className="mt-4 text-3xl font-bold uppercase tracking-tight sm:text-4xl lg:text-5xl">
              {t.sponsor.title}
            </h2>
          </TextBlockAnimation>
          <p className="mt-5 max-w-lg text-lg text-muted-foreground">{t.sponsor.text}</p>
        </div>
        <form
          onSubmit={onSubmit}
          className="clip-card min-w-0 border-t-4 border-green bg-carbon p-6 sm:p-10"
        >
          <div className="grid gap-5">
            {(
              [
                ["name", t.sponsor.name, "text"],
                ["company", t.sponsor.company, "text"],
                ["contact", t.sponsor.contact, "text"],
              ] as const
            ).map(([n, l, ty]) => (
              <label key={n} className="block">
                <span className="font-mono text-xs uppercase tracking-widest text-green">{l}</span>
                <input name={n} type={ty} required maxLength={150} className={`${input} mt-2`} />
              </label>
            ))}
            <button
              type="submit"
              className={`${btnGreen} mt-2 w-full sm:w-auto sm:justify-self-start`}
            >
              {t.sponsor.submit} <ArrowRight className="h-4 w-4" />
            </button>
            {sent && (
              <p className="text-sm text-green" role="status">
                {t.sponsor.thanks}
              </p>
            )}
          </div>
        </form>
      </div>
    </section>
  );
}

function Footer() {
  const { t } = useI18n();
  const links: [string, string][] = [
    ["#inicio", t.nav.home],
    ["#sobre", t.nav.about],
    ["#projeto", t.nav.project],
    ["#conquistas", t.nav.achievements],
    ["#galeria", t.nav.gallery],
    ["#patrocinio", t.nav.sponsor],
  ];
  return (
    <footer className="relative bg-carbon text-carbon-foreground">
      <div className="clip-v mx-auto h-6 w-24 bg-green" aria-hidden />
      <div className="mx-auto grid max-w-7xl gap-10 px-4 py-14 sm:grid-cols-2 sm:px-6 lg:grid-cols-[1fr_0.6fr_1fr_1.6fr]">
        <div className="min-w-0">
          <div className="flex items-center gap-2 text-green">
            <Logo className="h-9 w-9" />
            <span className="font-display text-2xl font-bold text-carbon-foreground">EFICEM</span>
          </div>
          <p className="mt-4 text-sm text-carbon-foreground/70">{t.footer.tagline}</p>
        </div>
        <div className="sm:flex  sm:justify-center sm:row-span-2 md:row-span-1 md:justify-start">
          <div className="sm:text-start w-max">
            <h3 className="font-mono text-xs uppercase tracking-widest text-green">
              {t.footer.links}
            </h3>
            <ul className="mt-4 space-y-2 text-sm">
              {links.map(([h, l]) => (
                <li key={h}>
                  <a href={h} className="text-carbon-foreground/80 hover:text-green">
                    {l}
                  </a>
                </li>
              ))}
            </ul>
          </div>
        </div>
        <div className="min-w-0 sm:mt-5 md:mt-0">
          <h3 className="font-mono text-xs uppercase tracking-widest text-green">
            {t.footer.social}
          </h3>
          <ul className="mt-4 space-y-3 text-sm text-carbon-foreground/80">
            <li>
              <a
                href="https://www.instagram.com/eficemufsc/"
                target="_blank"
                rel="noreferrer"
                className="flex items-center gap-2 hover:text-green"
              >
                <Instagram className="h-4 w-4 shrink-0" />
                Instagram
              </a>
            </li>
            <li>
              <a
                href={`mailto:${EMAIL}`}
                className="flex items-center gap-2 break-all hover:text-green"
              >
                <Mail className="h-4 w-4 shrink-0" />
                {EMAIL}
              </a>
            </li>
            <li className="flex gap-2">
              <MapPin className="mt-0.5 h-4 w-4 shrink-0" />
              <span>
                {t.footer.place}
                <br />
                {ADDRESS}
              </span>
            </li>
          </ul>
        </div>
        <div className="min-w-0 sm:col-span-2 lg:col-span-1">
          <h3 className="font-mono text-xs uppercase tracking-widest text-green">
            {t.footer.where}
          </h3>
          <div className="mt-4 aspect-video w-full overflow-hidden border-2 border-green/40">
            <iframe
              title={t.footer.where}
              src={`https://www.google.com/maps?q=${MAPS_Q}&output=embed`}
              className="h-full w-full border-0"
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
            />
          </div>
          <a
            href={`https://www.google.com/maps/search/?api=1&query=${MAPS_Q}`}
            target="_blank"
            rel="noreferrer"
            className="mt-3 inline-flex items-center gap-1 text-sm text-green hover:underline"
          >
            {t.footer.open} <ArrowRight className="h-3 w-3" />
          </a>
        </div>
      </div>
      <div className="border-t border-carbon-foreground/10">
        <div className="mx-auto flex max-w-7xl flex-col gap-2 px-4 py-5 text-xs text-carbon-foreground/50 sm:flex-row sm:justify-between sm:px-6">
          <p>© 2026 EFICEM UFSC Joinville. {t.footer.rights}</p>
          <p className="chevrons" aria-hidden>
            {">>>>"}
          </p>
        </div>
      </div>
    </footer>
  );
}

function Landing() {
  return (
    <div className="overflow-x-clip">
      <Header />
      <main>
        <Hero />
        <About />
        <Project />
        <Achievements />
        <Gallery />
        <Partners />
        <Sponsor />
      </main>
      <Footer />
    </div>
  );
}

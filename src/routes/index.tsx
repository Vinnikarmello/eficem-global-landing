import { createFileRoute } from "@tanstack/react-router";
import { useEffect, useState, type FormEvent } from "react";
import { Menu, X, Ruler, MoveVertical, Weight, Instagram, Mail, MapPin, Download, ArrowRight } from "lucide-react";
import { I18nProvider, LANGS, useI18n } from "@/lib/i18n";
import hero from "@/assets/hero.png.asset.json";
import inspection from "@/assets/inspection.jpg.asset.json";
import track1 from "@/assets/track-1.jpg.asset.json";
import track2 from "@/assets/track-2.jpg.asset.json";
import track3 from "@/assets/track-3.jpg.asset.json";
import team from "@/assets/team.jpg.asset.json";
import teamCar from "@/assets/team-car.jpg.asset.json";
import fourth from "@/assets/fourth-place.jpg.asset.json";
import chassis from "@/assets/chassis.jpg.asset.json";
import video from "@/assets/eficem.mp4.asset.json";

const EMAIL = "comunicacaoeficem@gmail.com";
const ADDRESS = "R. Dona Francisca, 8300 - Distrito Industrial, Joinville - SC, 89219-600";
const MAPS_Q = encodeURIComponent("UFSC Campus Joinville, " + ADDRESS);

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "EFICEM UFSC Joinville — Eficiência energética veicular" },
      { name: "description", content: "Equipe de eficiência energética veicular da UFSC Joinville. Protótipos elétricos na Shell Eco-marathon. Seja patrocinador." },
      { property: "og:title", content: "EFICEM UFSC Joinville — Eficiência energética veicular" },
      { property: "og:description", content: "Protótipos que percorrem a maior distância com o mínimo de energia. 4º lugar na Shell Eco-marathon Brasil 2026." },
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

function Logo({ className = "" }: { className?: string }) {
  return (
    <svg viewBox="0 0 100 100" className={className} fill="none" stroke="currentColor" strokeWidth="7" strokeLinejoin="miter" aria-hidden>
      <path d="M8 10 H92 L50 92 Z" />
      <path d="M50 92 L50 46 L8 10 M50 46 L71 51" />
    </svg>
  );
}

function Kicker({ children, dark = false }: { children: React.ReactNode; dark?: boolean }) {
  return (
    <p className={`flex items-center gap-2 font-mono text-xs font-bold uppercase tracking-[0.2em] ${dark ? "text-green" : "text-purple"}`}>
      <span className="clip-v inline-block h-3 w-3 shrink-0 bg-green" />
      {children}
    </p>
  );
}

const btn = "clip-btn inline-flex items-center justify-center gap-2 px-6 py-3 font-display text-sm font-bold uppercase tracking-wide transition-colors";
const btnGreen = `${btn} bg-green text-carbon hover:bg-green-deep`;
const btnOutline = `${btn} border-2 border-carbon text-carbon hover:bg-carbon hover:text-carbon-foreground`;

function Header() {
  const { t, lang, setLang } = useI18n();
  const [open, setOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  useEffect(() => {
    const f = () => setScrolled(window.scrollY > 10);
    f();
    window.addEventListener("scroll", f);
    return () => window.removeEventListener("scroll", f);
  }, []);
  const links: [string, string][] = [["#inicio", t.nav.home], ["#sobre", t.nav.about], ["#projeto", t.nav.project], ["#conquistas", t.nav.achievements], ["#galeria", t.nav.gallery]];
  const Switch = (
    <div role="group" aria-label={t.nav.lang} className="flex border border-carbon/20">
      {LANGS.map((l) => (
        <button key={l.code} onClick={() => setLang(l.code)} aria-pressed={lang === l.code}
          className={`px-2 py-1 font-mono text-xs font-bold ${lang === l.code ? "bg-purple text-purple-foreground" : "text-carbon hover:bg-muted"}`}>
          {l.label}
        </button>
      ))}
    </div>
  );
  return (
    <header className={`fixed inset-x-0 top-0 z-50 transition-shadow ${scrolled ? "header-glass shadow-md" : "bg-surface/90"}`}>
      <div className="mx-auto flex h-16 max-w-7xl items-center justify-between gap-3 px-4 sm:px-6">
        <a href="#inicio" className="flex shrink-0 items-center gap-2 text-green">
          <Logo className="h-8 w-8" />
          <span className="font-display text-xl font-bold tracking-tight text-carbon">EFICEM</span>
        </a>
        <nav className="hidden items-center gap-6 lg:flex">
          {links.map(([h, l]) => (
            <a key={h} href={h} className="font-display text-sm font-semibold uppercase text-carbon hover:text-purple">{l}</a>
          ))}
        </nav>
        <div className="flex min-w-0 items-center gap-3">
          <div className="hidden sm:block">{Switch}</div>
          <a href="#patrocinio" className={`${btnGreen} hidden px-4 py-2 md:inline-flex`}>{t.nav.sponsor}</a>
          <button className="p-2 text-carbon lg:hidden" onClick={() => setOpen(!open)} aria-label={t.nav.menu} aria-expanded={open}>
            {open ? <X /> : <Menu />}
          </button>
        </div>
      </div>
      {open && (
        <div className="border-t border-border bg-surface px-4 pb-6 pt-2 lg:hidden">
          <nav className="flex flex-col">
            {links.map(([h, l]) => (
              <a key={h} href={h} onClick={() => setOpen(false)} className="flex items-center gap-3 border-b border-border py-3 font-display font-semibold uppercase text-carbon">
                <span className="clip-v h-2.5 w-2.5 bg-green" />{l}
              </a>
            ))}
          </nav>
          <div className="mt-4 flex flex-wrap items-center gap-3">
            <div className="sm:hidden">{Switch}</div>
            <a href="#patrocinio" onClick={() => setOpen(false)} className={btnGreen}>{t.nav.sponsor}</a>
          </div>
        </div>
      )}
    </header>
  );
}

function Hero() {
  const { t } = useI18n();
  return (
    <section id="inicio" className="relative overflow-hidden bg-ice pt-16">
      <div className="clip-slash-thin pointer-events-none absolute inset-y-0 right-0 hidden w-full bg-purple lg:block" />
      <div className="pointer-events-none absolute right-0 top-16 hidden h-40 w-40 clip-v bg-green/80 lg:block" />
      <div className="relative mx-auto grid max-w-7xl gap-10 px-4 py-14 sm:px-6 md:py-20 lg:grid-cols-[1.05fr_1fr] lg:items-center">
        <div className="min-w-0">
          <Kicker>{t.hero.kicker}</Kicker>
          <h1 className="mt-4 text-5xl font-bold uppercase leading-none tracking-tight text-carbon sm:text-6xl lg:text-7xl">
            EFICEM <span className="text-green">—</span>
          </h1>
          <p className="mt-3 max-w-xl font-display text-xl font-semibold uppercase leading-tight text-purple sm:text-2xl">{t.hero.title}</p>
          <p className="mt-5 max-w-lg text-base text-muted-foreground sm:text-lg">{t.hero.sub}</p>
          <div className="mt-8 flex flex-wrap gap-3">
            <a href="#patrocinio" className={btnGreen}>{t.hero.cta} <ArrowRight className="h-4 w-4" /></a>
            <a href="#projeto" className={btnOutline}>{t.hero.cta2}</a>
          </div>
          <p className="chevrons mt-10 text-2xl" aria-hidden>{">>>>"}</p>
        </div>
        <div className="relative min-w-0">
          <img src={hero.url} alt="EFICEM" className="clip-poly-b relative z-10 aspect-[16/7] w-full object-cover lg:aspect-[4/3]" />
          <div className="absolute -bottom-3 -left-3 z-0 h-full w-full border-2 border-green" aria-hidden />
        </div>
      </div>
      <div className="h-6 bg-carbon clip-section-top" />
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
          <h2 className="mt-4 text-3xl font-bold uppercase tracking-tight sm:text-4xl lg:text-5xl">{t.about.title}</h2>
          <p className="mt-6 text-lg leading-relaxed text-muted-foreground">{t.about.text}</p>
          <dl className="mt-10 grid grid-cols-3 border-y border-border">
            {t.about.stats.map(([v, l]) => (
              <div key={l} className="border-r border-border py-5 pr-2 last:border-r-0 [&:not(:first-child)]:pl-4">
                <dt className="font-mono text-2xl font-bold text-purple sm:text-3xl">{v}</dt>
                <dd className="mt-1 text-xs uppercase tracking-wider text-muted-foreground">{l}</dd>
              </div>
            ))}
          </dl>
        </div>
        <div className="grid min-w-0 grid-cols-5 gap-3">
          <figure className="col-span-5 sm:col-span-3">
            <img src={inspection.url} alt={t.about.cap1} loading="lazy" className="clip-poly-a aspect-[4/3] w-full object-cover" />
            <figcaption className="mt-2 font-mono text-xs uppercase text-muted-foreground">▼ {t.about.cap1}</figcaption>
          </figure>
          <figure className="col-span-5 sm:col-span-2 sm:mt-16">
            <img src={team.url} alt={t.about.cap2} loading="lazy" className="clip-poly-b aspect-[4/3] w-full object-cover sm:aspect-[3/4]" />
            <figcaption className="mt-2 font-mono text-xs uppercase text-muted-foreground">▼ {t.about.cap2}</figcaption>
          </figure>
        </div>
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
          <img src={chassis.url} alt={t.project.cap} loading="lazy" className="clip-card aspect-[4/5] max-h-[620px] w-full object-cover" />
          <figcaption className="absolute left-0 top-0 bg-carbon px-3 py-2 font-mono text-xs uppercase text-carbon-foreground">{t.project.cap}</figcaption>
        </figure>
        <div className="order-1 min-w-0 lg:order-2">
          <Kicker>{t.project.kicker}</Kicker>
          <span className="clip-btn mt-5 inline-block bg-purple px-4 py-1.5 font-mono text-sm font-bold text-purple-foreground">{t.project.badge}</span>
          <h2 className="mt-4 text-3xl font-bold uppercase tracking-tight sm:text-4xl lg:text-5xl">{t.project.title}</h2>
          <p className="mt-4 text-lg text-muted-foreground">{t.project.text}</p>
          <div className="mt-10 grid gap-4 sm:grid-cols-3">
            {specs.map(({ v, u, l, I }) => (
              <div key={l} className="clip-card border-l-4 border-green bg-surface p-5">
                <I className="h-5 w-5 text-purple" />
                <p className="mt-3 font-mono text-4xl font-bold leading-none text-carbon">{v}<span className="ml-1 text-lg text-green-deep">{u}</span></p>
                <p className="mt-2 text-xs uppercase tracking-widest text-muted-foreground">{l}</p>
                <p className="chevrons mt-3 text-sm" aria-hidden>{">>>>"}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

function Achievements() {
  const { t } = useI18n();
  const items = t.ach.items;
  return (
    <section id="conquistas" className="relative overflow-hidden bg-carbon pb-0 pt-20 text-carbon-foreground md:pt-28">
      <div className="tri-mesh pointer-events-none absolute inset-0 opacity-10" />
      <div className="relative mx-auto max-w-7xl px-4 sm:px-6">
        <Kicker dark>{t.ach.kicker}</Kicker>
        <h2 className="mt-4 max-w-3xl text-3xl font-bold uppercase tracking-tight sm:text-4xl lg:text-5xl">{t.ach.title}</h2>
        <div className="mt-14 grid gap-12 lg:grid-cols-[1.4fr_1fr]">
          <ol className="relative min-w-0 border-l-2 border-green/60 pl-8 sm:pl-10">
            {items.map(([y, title, text], i) => (
              <li key={y} className="relative pb-10 last:pb-0">
                <span className={`clip-tri-node absolute -left-[43px] top-1 h-5 w-6 sm:-left-[51px] ${i === items.length - 1 ? "bg-green" : "bg-purple ring-0"}`} />
                <span className="font-mono text-3xl font-bold text-green">{y}</span>
                <h3 className="mt-1 text-xl font-bold uppercase">{title}</h3>
                <p className="mt-2 max-w-xl text-carbon-foreground/70">{text}</p>
              </li>
            ))}
          </ol>
          <figure className="min-w-0 self-start lg:sticky lg:top-24">
            <img src={fourth.url} alt={items[items.length - 1][2]} loading="lazy" className="clip-card mx-auto w-full max-w-sm border-4 border-green object-cover" />
          </figure>
        </div>
      </div>
      <div className="relative mt-16 overflow-hidden border-t border-green/30 py-4" aria-hidden>
        <div className="marquee chevrons flex w-max whitespace-nowrap text-xl">
          {Array.from({ length: 40 }).map((_, i) => <span key={i} className="px-4">{">>>>"}</span>)}
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
        <div className="mt-4 flex flex-col gap-3 md:flex-row md:items-end md:justify-between">
          <h2 className="text-3xl font-bold uppercase tracking-tight sm:text-4xl lg:text-5xl">{t.gallery.title}</h2>
          <p className="max-w-md text-muted-foreground">{t.gallery.sub}</p>
        </div>
        <div className="mt-10 grid auto-rows-[180px] grid-cols-2 gap-3 sm:auto-rows-[220px] md:grid-cols-4">
          <img src={track2.url} alt={a[0]} loading="lazy" className="col-span-2 row-span-2 h-full w-full object-cover" />
          <img src={track3.url} alt={a[1]} loading="lazy" className="col-span-1 h-full w-full object-cover" />
          <video src={video.url} aria-label={a[3]} className="col-span-1 row-span-2 h-full w-full bg-carbon object-cover" autoPlay muted loop playsInline />
          <img src={teamCar.url} alt={a[2]} loading="lazy" className="col-span-1 h-full w-full object-cover" />
          <img src={inspection.url} alt={a[4]} loading="lazy" className="clip-card col-span-1 h-full w-full object-cover md:col-span-2" />
          <img src={track1.url} alt={a[5]} loading="lazy" className="col-span-1 h-full w-full object-cover md:col-span-2" />
        </div>
      </div>
    </section>
  );
}

function Partners() {
  const { t } = useI18n();
  const names = ["Shell", "UFSC", "CREA-SC", "Polal", "Tropeiro", "Schmid"];
  return (
    <section className="bg-purple text-purple-foreground">
      <div className="mx-auto max-w-7xl px-4 py-12 sm:px-6">
        <p className="font-mono text-xs uppercase tracking-[0.2em] text-green">{t.partners.title}</p>
        <ul className="mt-5 grid grid-cols-2 gap-3 sm:grid-cols-3 lg:grid-cols-6">
          {names.map((n) => (
            <li key={n} className="clip-btn border border-purple-foreground/25 bg-purple-foreground/5 px-4 py-4 text-center font-display text-lg font-bold uppercase">{n}</li>
          ))}
        </ul>
      </div>
      <div className="bg-green text-carbon">
        <p className="mx-auto max-w-7xl px-4 py-6 font-display text-xl font-bold uppercase sm:px-6 sm:text-2xl">
          {t.partners.quote} <span className="text-purple">{t.partners.quote2}</span>
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
    const name = String(d.get("name") || "").trim().slice(0, 100);
    const company = String(d.get("company") || "").trim().slice(0, 100);
    const contact = String(d.get("contact") || "").trim().slice(0, 150);
    if (!name || !company || !contact) return;
    const body = `${t.sponsor.name}: ${name}\n${t.sponsor.company}: ${company}\n${t.sponsor.contact}: ${contact}`;
    window.location.href = `mailto:${EMAIL}?subject=${encodeURIComponent(t.sponsor.subject)}&body=${encodeURIComponent(body)}`;
    setSent(true);
  };
  const input = "w-full border-0 border-b-2 border-input bg-ice px-4 py-3 text-carbon outline-none focus:border-green";
  return (
    <section id="patrocinio" className="bg-surface py-20 md:py-28">
      <div className="mx-auto grid max-w-7xl gap-10 px-4 sm:px-6 lg:grid-cols-2">
        <div className="min-w-0">
          <Kicker>{t.sponsor.kicker}</Kicker>
          <h2 className="mt-4 text-3xl font-bold uppercase tracking-tight sm:text-4xl lg:text-5xl">{t.sponsor.title}</h2>
          <p className="mt-5 max-w-lg text-lg text-muted-foreground">{t.sponsor.text}</p>
          <a href={`mailto:${EMAIL}?subject=${encodeURIComponent(t.sponsor.kitSubject)}`} className={`${btnOutline} mt-8`}>
            <Download className="h-4 w-4" /> {t.sponsor.kit}
          </a>
        </div>
        <form onSubmit={onSubmit} className="clip-card min-w-0 border-t-4 border-green bg-carbon p-6 sm:p-10">
          <div className="grid gap-5">
            {([["name", t.sponsor.name, "text"], ["company", t.sponsor.company, "text"], ["contact", t.sponsor.contact, "text"]] as const).map(([n, l, ty]) => (
              <label key={n} className="block">
                <span className="font-mono text-xs uppercase tracking-widest text-green">{l}</span>
                <input name={n} type={ty} required maxLength={150} className={`${input} mt-2`} />
              </label>
            ))}
            <button type="submit" className={`${btnGreen} mt-2 w-full sm:w-auto sm:justify-self-start`}>{t.sponsor.submit} <ArrowRight className="h-4 w-4" /></button>
            {sent && <p className="text-sm text-green" role="status">{t.sponsor.thanks}</p>}
          </div>
        </form>
      </div>
    </section>
  );
}

function Footer() {
  const { t } = useI18n();
  const links: [string, string][] = [["#inicio", t.nav.home], ["#sobre", t.nav.about], ["#projeto", t.nav.project], ["#conquistas", t.nav.achievements], ["#galeria", t.nav.gallery], ["#patrocinio", t.nav.sponsor]];
  return (
    <footer className="relative bg-carbon text-carbon-foreground">
      <div className="clip-v mx-auto h-6 w-24 bg-green" aria-hidden />
      <div className="mx-auto grid max-w-7xl gap-10 px-4 py-14 sm:grid-cols-2 sm:px-6 lg:grid-cols-[1fr_0.8fr_1fr_1.6fr]">
        <div className="min-w-0">
          <div className="flex items-center gap-2 text-green"><Logo className="h-9 w-9" /><span className="font-display text-2xl font-bold text-carbon-foreground">EFICEM</span></div>
          <p className="mt-4 text-sm text-carbon-foreground/70">{t.footer.tagline}</p>
        </div>
        <div>
          <h3 className="font-mono text-xs uppercase tracking-widest text-green">{t.footer.links}</h3>
          <ul className="mt-4 space-y-2 text-sm">
            {links.map(([h, l]) => <li key={h}><a href={h} className="text-carbon-foreground/80 hover:text-green">{l}</a></li>)}
          </ul>
        </div>
        <div className="min-w-0">
          <h3 className="font-mono text-xs uppercase tracking-widest text-green">{t.footer.social}</h3>
          <ul className="mt-4 space-y-3 text-sm text-carbon-foreground/80">
            <li><a href="https://www.instagram.com/eficemufsc/" target="_blank" rel="noreferrer" className="flex items-center gap-2 hover:text-green"><Instagram className="h-4 w-4 shrink-0" />Instagram</a></li>
            <li><a href={`mailto:${EMAIL}`} className="flex items-center gap-2 break-all hover:text-green"><Mail className="h-4 w-4 shrink-0" />{EMAIL}</a></li>
            <li className="flex gap-2"><MapPin className="mt-0.5 h-4 w-4 shrink-0" /><span>{t.footer.place}<br />{ADDRESS}</span></li>
          </ul>
        </div>
        <div className="min-w-0 sm:col-span-2 lg:col-span-1">
          <h3 className="font-mono text-xs uppercase tracking-widest text-green">{t.footer.where}</h3>
          <div className="mt-4 aspect-video w-full overflow-hidden border-2 border-green/40">
            <iframe title={t.footer.where} src={`https://www.google.com/maps?q=${MAPS_Q}&output=embed`} className="h-full w-full border-0" loading="lazy" referrerPolicy="no-referrer-when-downgrade" />
          </div>
          <a href={`https://www.google.com/maps/search/?api=1&query=${MAPS_Q}`} target="_blank" rel="noreferrer" className="mt-3 inline-flex items-center gap-1 text-sm text-green hover:underline">{t.footer.open} <ArrowRight className="h-3 w-3" /></a>
        </div>
      </div>
      <div className="border-t border-carbon-foreground/10">
        <div className="mx-auto flex max-w-7xl flex-col gap-2 px-4 py-5 text-xs text-carbon-foreground/50 sm:flex-row sm:justify-between sm:px-6">
          <p>© 2026 EFICEM UFSC Joinville. {t.footer.rights}</p>
          <p className="chevrons" aria-hidden>{">>>>"}</p>
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

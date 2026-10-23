import { createContext, useContext, useEffect, useState, type ReactNode } from "react";

export type Lang = "pt" | "es" | "en" | "de";
export const LANGS: { code: Lang; label: string; html: string }[] = [
  { code: "pt", label: "PT", html: "pt-BR" },
  { code: "es", label: "ES", html: "es" },
  { code: "en", label: "EN", html: "en" },
  { code: "de", label: "DE", html: "de" },
];

const pt = {
  nav: { home: "Início", about: "Sobre", project: "Projeto", achievements: "Conquistas", gallery: "Galeria", sponsor: "Patrocínio", sponsorBtn: "Seja Patrocinador", menu: "Menu", lang: "Idioma" },
  hero: {
    kicker: "Engenharia / Inovação / Sustentabilidade",
    title: "Equipe de eficiência energética veicular da UFSC Joinville.",
    sub: "Projetamos, construímos e evoluímos protótipos que percorrem a maior distância com o mínimo de energia.",
    cta: "Conhecer Protótipo",
    cta2: "Apoiar a Equipe",
  },
  about: {
    kicker: "Sobre nós",
    title: "Mais que uma equipe, um propósito.",
    text: "A EFICEM é uma equipe de eficiência energética criada em 2012, a partir da união das equipes Catarina e Feneco, por estudantes de Engenharia Automotiva do Centro Tecnológico de Joinville (UFSC). Atualmente participa principalmente da Shell Eco-marathon, nas edições do Brasil e dos Estados Unidos.",
    stats: [["2012", "fundação"], ["2", "edições SEM"], ["4º", "lugar 2026"]],
    cap1: "Inspeção técnica",
    cap2: "Equipe 2025",
  },
  project: {
    kicker: "Projeto",
    badge: "01 · Elétrico",
    title: "Protótipo elétrico.",
    text: "Monocoque em fibra de carbono — cerca de 2300 mm de comprimento, 700 mm de altura e 35 kg.",
    length: "comprimento", height: "altura", weight: "peso",
    cap: "Monocoque no laboratório",
  },
  ach: {
    kicker: "Conquistas",
    title: "Nossa trajetória é feita de grandes marcos.",
    items: [
      ["2012", "Fundação da equipe", "A EFICEM nasce da união das equipes Catarina e Feneco. 3º melhor projeto na MUEE com o protótipo elétrico Milliwatt I."],
      ["2013", "Combustão", "10º na MUEE com o V12 a gasolina (~119,6 km/l) e prêmio de 3º melhor projeto."],
      ["2015", "Mais leve", "O Setta é o protótipo mais leve da Shell Eco-marathon Brasil, com 24 kg."],
      ["2016", "Primeira SEMB", "Setta: protótipo mais leve da edição de estreia (21,5 kg) e 5º lugar geral."],
      ["2026", "Shell Eco-marathon Brasil", "4º lugar geral na categoria Protótipo Elétrico."],
    ],
  },
  gallery: {
    kicker: "Galeria",
    title: "Do projeto à pista.",
    sub: "Da oficina à Shell Eco-marathon: o protótipo, a equipe e os bastidores.",
    alts: ["Protótipo na pista", "Protótipo em curva", "Equipe com o protótipo", "Vídeo da equipe", "Inspeção técnica", "Protótipo no circuito"],
  },
  partners: { title: "Nossos parceiros", quote: "Sua empresa pode fazer parte dessa trajetória.", quote2: "Seja patrocinador." },
  sponsor: {
    kicker: "Patrocínio",
    title: "Torne-se patrocinador",
    text: "Empresas que acreditam em inovação, tecnologia e eficiência energética fazem parte dessa jornada. Junte-se à EFICEM e impulsione o futuro.",
    kit: "Solicitar Media Kit",
    name: "Nome", company: "Empresa", contact: "E-mail ou WhatsApp",
    submit: "Seja Patrocinador",
    thanks: "Obrigado! Seu e-mail está pronto para envio: confirme no seu aplicativo de e-mail.",
    subject: "Interesse em patrocínio — EFICEM",
    kitSubject: "Solicitação de Media Kit — EFICEM",
  },
  footer: {
    tagline: "Equipe de eficiência energética veicular da UFSC Joinville.",
    links: "Links rápidos", social: "Redes e contato", where: "Onde estamos",
    place: "Universidade Federal de Santa Catarina — Campus Joinville",
    open: "Abrir no Google Maps",
    rights: "Todos os direitos reservados.",
  },
};
export type Dict = typeof pt;

const es: Dict = {
  nav: { home: "Inicio", about: "Sobre", project: "Proyecto", achievements: "Logros", gallery: "Galería", sponsor: "Patrocinio", sponsorBtn: "Sé Patrocinador", menu: "Menú", lang: "Idioma" },
  hero: {
    kicker: "Ingeniería / Innovación / Sostenibilidad",
    title: "Equipo de eficiencia energética vehicular de la UFSC Joinville.",
    sub: "Diseñamos, construimos y evolucionamos prototipos que recorren la mayor distancia con el mínimo de energía.",
    cta: "Conocer el Prototipo", cta2: "Apoyar al Equipo",
  },
  about: {
    kicker: "Nosotros", title: "Más que un equipo, un propósito.",
    text: "EFICEM es un equipo de eficiencia energética creado en 2012, a partir de la unión de los equipos Catarina y Feneco, por estudiantes de Ingeniería Automotriz del Centro Tecnológico de Joinville (UFSC). Actualmente participa principalmente en la Shell Eco-marathon, en las ediciones de Brasil y Estados Unidos.",
    stats: [["2012", "fundación"], ["2", "ediciones SEM"], ["4º", "lugar 2026"]],
    cap1: "Inspección técnica", cap2: "Equipo 2025",
  },
  project: {
    kicker: "Proyecto", badge: "01 · Eléctrico", title: "Prototipo eléctrico.",
    text: "Monocasco de fibra de carbono — aproximadamente 2300 mm de largo, 700 mm de alto y 35 kg.",
    length: "largo", height: "alto", weight: "peso", cap: "Monocasco en el laboratorio",
  },
  ach: {
    kicker: "Logros", title: "Nuestra trayectoria está hecha de grandes hitos.",
    items: [
      ["2012", "Fundación del equipo", "EFICEM nace de la unión de los equipos Catarina y Feneco. 3.er mejor proyecto en la MUEE con el prototipo eléctrico Milliwatt I."],
      ["2013", "Combustión", "10.º en la MUEE con el V12 a gasolina (~119,6 km/l) y premio al 3.er mejor proyecto."],
      ["2015", "Más ligero", "El Setta es el prototipo más ligero de la Shell Eco-marathon Brasil, con 24 kg."],
      ["2016", "Primera SEMB", "Setta: prototipo más ligero de la edición de estreno (21,5 kg) y 5.º lugar general."],
      ["2026", "Shell Eco-marathon Brasil", "4.º lugar general en la categoría Prototipo Eléctrico."],
    ],
  },
  gallery: {
    kicker: "Galería", title: "Del proyecto a la pista.",
    sub: "Del taller a la Shell Eco-marathon: el prototipo, el equipo y los bastidores.",
    alts: ["Prototipo en la pista", "Prototipo en curva", "Equipo con el prototipo", "Video del equipo", "Inspección técnica", "Prototipo en el circuito"],
  },
  partners: { title: "Nuestros socios", quote: "Tu empresa puede ser parte de esta trayectoria.", quote2: "Sé patrocinador." },
  sponsor: {
    kicker: "Patrocinio", title: "Conviértete en patrocinador",
    text: "Las empresas que creen en la innovación, la tecnología y la eficiencia energética forman parte de este viaje. Únete a EFICEM e impulsa el futuro.",
    kit: "Solicitar Media Kit", name: "Nombre", company: "Empresa", contact: "E-mail o WhatsApp",
    submit: "Sé Patrocinador",
    thanks: "¡Gracias! Tu e-mail está listo para enviar: confírmalo en tu aplicación de correo.",
    subject: "Interés en patrocinio — EFICEM", kitSubject: "Solicitud de Media Kit — EFICEM",
  },
  footer: {
    tagline: "Equipo de eficiencia energética vehicular de la UFSC Joinville.",
    links: "Enlaces rápidos", social: "Redes y contacto", where: "Dónde estamos",
    place: "Universidad Federal de Santa Catarina — Campus Joinville",
    open: "Abrir en Google Maps", rights: "Todos los derechos reservados.",
  },
};

const en: Dict = {
  nav: { home: "Home", about: "About", project: "Project", achievements: "Achievements", gallery: "Gallery", sponsor: "Sponsorship", sponsorBtn: "Become a Sponsor", menu: "Menu", lang: "Language" },
  hero: {
    kicker: "Engineering / Innovation / Sustainability",
    title: "UFSC Joinville's vehicle energy-efficiency team.",
    sub: "We design, build and evolve prototypes that travel the farthest distance on the least energy.",
    cta: "Meet Prototype", cta2: "Support the Team",
  },
  about: {
    kicker: "About us", title: "More than a team, a purpose.",
    text: "EFICEM is an energy-efficiency team founded in 2012 through the merger of the Catarina and Feneco teams, by Automotive Engineering students at the Joinville Technology Center (UFSC). Today it competes mainly in the Shell Eco-marathon, in both the Brazil and United States editions.",
    stats: [["2012", "founded"], ["2", "SEM editions"], ["4th", "place 2026"]],
    cap1: "Technical inspection", cap2: "2025 team",
  },
  project: {
    kicker: "Project", badge: "01 · Electric", title: "Electric prototype.",
    text: "Carbon-fiber monocoque — about 2300 mm long, 700 mm high and 35 kg.",
    length: "length", height: "height", weight: "weight", cap: "Monocoque in the lab",
  },
  ach: {
    kicker: "Achievements", title: "Our journey is made of major milestones.",
    items: [
      ["2012", "Team founded", "EFICEM is born from the merger of the Catarina and Feneco teams. 3rd best project at MUEE with the Milliwatt I electric prototype."],
      ["2013", "Combustion", "10th at MUEE with the gasoline V12 (~119.6 km/l) and the 3rd best project award."],
      ["2015", "Lightest", "Setta is the lightest prototype at Shell Eco-marathon Brazil, at 24 kg."],
      ["2016", "First SEMB", "Setta: lightest prototype of the debut edition (21.5 kg) and 5th overall."],
      ["2026", "Shell Eco-marathon Brazil", "4th overall in the Electric Prototype category."],
    ],
  },
  gallery: {
    kicker: "Gallery", title: "From design to track.",
    sub: "From the workshop to the Shell Eco-marathon: the prototype, the team and behind the scenes.",
    alts: ["Prototype on track", "Prototype cornering", "Team with the prototype", "Team video", "Technical inspection", "Prototype on the circuit"],
  },
  partners: { title: "Our partners", quote: "Your company can be part of this journey.", quote2: "Become a sponsor." },
  sponsor: {
    kicker: "Sponsorship", title: "Become a sponsor",
    text: "Companies that believe in innovation, technology and energy efficiency are part of this journey. Join EFICEM and drive the future.",
    kit: "Request Media Kit", name: "Name", company: "Company", contact: "E-mail or WhatsApp",
    submit: "Become a Sponsor",
    thanks: "Thank you! Your e-mail is ready to send: confirm it in your e-mail app.",
    subject: "Sponsorship interest — EFICEM", kitSubject: "Media Kit request — EFICEM",
  },
  footer: {
    tagline: "UFSC Joinville's vehicle energy-efficiency team.",
    links: "Quick links", social: "Social & contact", where: "Where we are",
    place: "Federal University of Santa Catarina — Joinville Campus",
    open: "Open in Google Maps", rights: "All rights reserved.",
  },
};

const de: Dict = {
  nav: { home: "Start", about: "Über uns", project: "Projekt", achievements: "Erfolge", gallery: "Galerie", sponsor: "Sponsoring", sponsorBtn: "Sponsor werden", menu: "Menü", lang: "Sprache" },
  hero: {
    kicker: "Ingenieurwesen / Innovation / Nachhaltigkeit",
    title: "Das Fahrzeug-Energieeffizienzteam der UFSC Joinville.",
    sub: "Wir entwerfen, bauen und entwickeln Prototypen, die mit minimaler Energie die größte Distanz zurücklegen.",
    cta: "Prototyp entdecken", cta2: "Team unterstützen",
  },
  about: {
    kicker: "Über uns", title: "Mehr als ein Team – eine Mission.",
    text: "EFICEM ist ein Energieeffizienzteam, das 2012 aus dem Zusammenschluss der Teams Catarina und Feneco von Studierenden der Fahrzeugtechnik am Technologiezentrum Joinville (UFSC) gegründet wurde. Heute nimmt es hauptsächlich am Shell Eco-marathon teil – in Brasilien und den USA.",
    stats: [["2012", "gegründet"], ["2", "SEM-Ausgaben"], ["4.", "Platz 2026"]],
    cap1: "Technische Abnahme", cap2: "Team 2025",
  },
  project: {
    kicker: "Projekt", badge: "01 · Elektrisch", title: "Elektrischer Prototyp.",
    text: "Kohlefaser-Monocoque – etwa 2300 mm lang, 700 mm hoch und 35 kg schwer.",
    length: "Länge", height: "Höhe", weight: "Gewicht", cap: "Monocoque im Labor",
  },
  ach: {
    kicker: "Erfolge", title: "Unser Weg besteht aus großen Meilensteinen.",
    items: [
      ["2012", "Teamgründung", "EFICEM entsteht aus dem Zusammenschluss der Teams Catarina und Feneco. Drittbestes Projekt bei der MUEE mit dem Elektro-Prototyp Milliwatt I."],
      ["2013", "Verbrenner", "10. Platz bei der MUEE mit dem Benzin-V12 (~119,6 km/l) und Preis für das drittbeste Projekt."],
      ["2015", "Am leichtesten", "Der Setta ist mit 24 kg der leichteste Prototyp des Shell Eco-marathon Brasilien."],
      ["2016", "Erster SEMB", "Setta: leichtester Prototyp der Premierenausgabe (21,5 kg) und 5. Platz gesamt."],
      ["2026", "Shell Eco-marathon Brasilien", "4. Platz gesamt in der Kategorie Elektro-Prototyp."],
    ],
  },
  gallery: {
    kicker: "Galerie", title: "Vom Entwurf auf die Strecke.",
    sub: "Von der Werkstatt zum Shell Eco-marathon: der Prototyp, das Team und hinter den Kulissen.",
    alts: ["Prototyp auf der Strecke", "Prototyp in der Kurve", "Team mit dem Prototyp", "Teamvideo", "Technische Abnahme", "Prototyp auf dem Kurs"],
  },
  partners: { title: "Unsere Partner", quote: "Ihr Unternehmen kann Teil dieses Weges sein.", quote2: "Werden Sie Sponsor." },
  sponsor: {
    kicker: "Sponsoring", title: "Sponsor werden",
    text: "Unternehmen, die an Innovation, Technologie und Energieeffizienz glauben, sind Teil dieser Reise. Schließen Sie sich EFICEM an und gestalten Sie die Zukunft.",
    kit: "Media Kit anfordern", name: "Name", company: "Unternehmen", contact: "E-Mail oder WhatsApp",
    submit: "Sponsor werden",
    thanks: "Danke! Ihre E-Mail ist versandbereit: Bestätigen Sie sie in Ihrer E-Mail-App.",
    subject: "Sponsoring-Interesse — EFICEM", kitSubject: "Media-Kit-Anfrage — EFICEM",
  },
  footer: {
    tagline: "Das Fahrzeug-Energieeffizienzteam der UFSC Joinville.",
    links: "Schnellzugriff", social: "Netzwerke & Kontakt", where: "Standort",
    place: "Bundesuniversität Santa Catarina — Campus Joinville",
    open: "In Google Maps öffnen", rights: "Alle Rechte vorbehalten.",
  },
};

export const DICTS: Record<Lang, Dict> = { pt, es, en, de };

const Ctx = createContext<{ lang: Lang; setLang: (l: Lang) => void; t: Dict }>({ lang: "pt", setLang: () => {}, t: pt });

export function I18nProvider({ children }: { children: ReactNode }) {
  const [lang, setLangState] = useState<Lang>("pt");
  useEffect(() => {
    const saved = localStorage.getItem("eficem-lang") as Lang | null;
    if (saved && saved in DICTS) setLangState(saved);
  }, []);
  useEffect(() => {
    document.documentElement.lang = LANGS.find((l) => l.code === lang)!.html;
  }, [lang]);
  const setLang = (l: Lang) => {
    setLangState(l);
    localStorage.setItem("eficem-lang", l);
  };
  return <Ctx.Provider value={{ lang, setLang, t: DICTS[lang] }}>{children}</Ctx.Provider>;
}

export const useI18n = () => useContext(Ctx);

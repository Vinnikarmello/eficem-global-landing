import { createContext, useContext, useEffect, useState, type ReactNode } from "react";

export type Lang = "pt" | "es" | "en" | "de";
export const LANGS: { code: Lang; img: string; html: string }[] = [
  { code: "pt", img: "/pt.png", html: "pt-BR" },
  { code: "es", img: "/es.png", html: "es" },
  { code: "en", img: "/en.png", html: "en" },
  { code: "de", img: "/de.png", html: "de" },
];

const pt = {
  nav: {
    home: "Início",
    about: "Sobre",
    project: "Projeto",
    achievements: "Conquistas",
    gallery: "Galeria",
    sponsor: "Patrocínio",
    sponsorBtn: "Seja Patrocinador",
    menu: "Menu",
    lang: "Idioma",
  },
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
    stats: [
      ["2012", "fundação"],
      ["2", "edições SEM"],
      ["4º", "lugar 2026"],
    ],
    cap1: "Inspeção técnica",
    cap2: "Equipe 2025",
  },
  project: {
    kicker: "Projeto",
    badge: "01 · Elétrico",
    title: "Protótipo elétrico.",
    text: "Monocoque em fibra de carbono — cerca de 2300 mm de comprimento, 700 mm de altura e 35 kg.",
    length: "comprimento",
    height: "altura",
    weight: "peso",
    cap: "Monocoque no laboratório",
  },
  ach: {
    kicker: "Conquistas",
    title: "Nossa trajetória é feita de grandes marcos.",
    prev: "Anterior",
    next: "Próximo",
    items: [
      [
        "2012",
        "Fundação & Miliwatt I",
        "A EFICEM nasce da união das equipes Catarina e Feneco. O protótipo elétrico Miliwatt I é 3º melhor projeto na MUEE e destaque do Discovery Turbo.",
      ],
      [
        "2013",
        "Combustão V12",
        "Protótipo a gasolina V12: 10º na MUEE, prêmio de 3º melhor projeto e cerca de 119,6 km/l.",
      ],
      ["2016", "Primeira SEMB", "Setta: o mais leve da edição (21,5 kg) e 5º lugar geral."],
      [
        "2017",
        "Recorde latino-americano",
        "Setta vence a categoria Bateria Elétrica na SEMB com recorde latino-americano de 363,6 km/kWh — e o mais leve das Américas (21 kg).",
      ],
      ["2019", "Economia circular", "Vitória no off-track de Economia Circular."],
      [
        "2021",
        "1º das Américas",
        "1º lugar das Américas no desafio Virtual Technical Inspection, na Liga Virtual da pandemia.",
      ],
      ["2022", "Segurança em 1º", "Vitória no off-track de Segurança."],
      [
        "2023",
        "Eletropig na SEMB",
        "O protótipo Eletropig fica em 3º lugar na SEMB, com 344 km/kWh.",
      ],
      [
        "2026",
        "4º lugar na SEMB",
        "4º lugar geral na categoria Protótipo Elétrico da Shell Eco-marathon Brasil.",
      ],
    ],
  },
  gallery: {
    kicker: "Galeria",
    title: "Do projeto à pista.",
    sub: "Da oficina à Shell Eco-marathon: o protótipo, a equipe e os bastidores.",
    alts: [
      "Protótipo na pista",
      "Protótipo em curva",
      "Equipe com o protótipo",
      "Vídeo da equipe",
      "Inspeção técnica",
      "Protótipo no circuito",
    ],
  },
  partners: {
    title: "Nossos parceiros",
    quote: "Sua empresa pode fazer parte dessa trajetória.",
    quote2: "Seja patrocinador.",
  },
  sponsor: {
    kicker: "Patrocínio",
    title: "Torne-se patrocinador",
    text: "Empresas que acreditam em inovação, tecnologia e eficiência energética fazem parte dessa jornada. Junte-se à EFICEM e impulsione o futuro.",
    kit: "Solicitar Media Kit",
    name: "Nome",
    company: "Empresa",
    contact: "E-mail ou WhatsApp",
    submit: "Seja Patrocinador",
    thanks: "Obrigado! Seu e-mail está pronto para envio: confirme no seu aplicativo de e-mail.",
    subject: "Interesse em patrocínio — EFICEM",
    kitSubject: "Solicitação de Media Kit — EFICEM",
  },
  footer: {
    tagline: "Equipe de eficiência energética veicular da UFSC Joinville.",
    links: "Links rápidos",
    social: "Redes e contato",
    where: "Onde estamos",
    place: "Universidade Federal de Santa Catarina — Campus Joinville",
    open: "Abrir no Google Maps",
    rights: "Todos os direitos reservados.",
  },
};
export type Dict = typeof pt;

const es: Dict = {
  nav: {
    home: "Inicio",
    about: "Sobre",
    project: "Proyecto",
    achievements: "Logros",
    gallery: "Galería",
    sponsor: "Patrocinio",
    sponsorBtn: "Sé Patrocinador",
    menu: "Menú",
    lang: "Idioma",
  },
  hero: {
    kicker: "Ingeniería / Innovación / Sostenibilidad",
    title: "Equipo de eficiencia energética vehicular de la UFSC Joinville.",
    sub: "Diseñamos, construimos y evolucionamos prototipos que recorren la mayor distancia con el mínimo de energía.",
    cta: "Conocer el Prototipo",
    cta2: "Apoyar al Equipo",
  },
  about: {
    kicker: "Nosotros",
    title: "Más que un equipo, un propósito.",
    text: "EFICEM es un equipo de eficiencia energética creado en 2012, a partir de la unión de los equipos Catarina y Feneco, por estudiantes de Ingeniería Automotriz del Centro Tecnológico de Joinville (UFSC). Actualmente participa principalmente en la Shell Eco-marathon, en las ediciones de Brasil y Estados Unidos.",
    stats: [
      ["2012", "fundación"],
      ["2", "ediciones SEM"],
      ["4º", "lugar 2026"],
    ],
    cap1: "Inspección técnica",
    cap2: "Equipo 2025",
  },
  project: {
    kicker: "Proyecto",
    badge: "01 · Eléctrico",
    title: "Prototipo eléctrico.",
    text: "Monocasco de fibra de carbono — aproximadamente 2300 mm de largo, 700 mm de alto y 35 kg.",
    length: "largo",
    height: "alto",
    weight: "peso",
    cap: "Monocasco en el laboratorio",
  },
  ach: {
    kicker: "Logros",
    title: "Nuestra trayectoria está hecha de grandes hitos.",
    prev: "Anterior",
    next: "Siguiente",
    items: [
      [
        "2012",
        "Fundación y Miliwatt I",
        "EFICEM nace de la unión de los equipos Catarina y Feneco. El prototipo eléctrico Miliwatt I es 3.er mejor proyecto en la MUEE y destacado por Discovery Turbo.",
      ],
      [
        "2013",
        "Combustión V12",
        "Prototipo a gasolina V12: 10.º en la MUEE, premio al 3.er mejor proyecto y cerca de 119,6 km/l.",
      ],
      ["2016", "Primera SEMB", "Setta: el más ligero de la edición (21,5 kg) y 5.º lugar general."],
      [
        "2017",
        "Récord latinoamericano",
        "El Setta gana la categoría Batería Eléctrica en la SEMB con récord latinoamericano de 363,6 km/kWh — y el más ligero de las Américas (21 kg).",
      ],
      ["2019", "Economía circular", "Victoria en el off-track de Economía Circular."],
      [
        "2021",
        "1.º de las Américas",
        "1.er lugar de las Américas en el desafío Virtual Technical Inspection, en la Liga Virtual de la pandemia.",
      ],
      ["2022", "Seguridad en 1.º", "Victoria en el off-track de Seguridad."],
      [
        "2023",
        "Eletropig en la SEMB",
        "El prototipo Eletropig logra el 3.er lugar en la SEMB, con 344 km/kWh.",
      ],
      [
        "2026",
        "4.º lugar en la SEMB",
        "4.º lugar general en la categoría Prototipo Eléctrico de la Shell Eco-marathon Brasil.",
      ],
    ],
  },
  gallery: {
    kicker: "Galería",
    title: "Del proyecto a la pista.",
    sub: "Del taller a la Shell Eco-marathon: el prototipo, el equipo y los bastidores.",
    alts: [
      "Prototipo en la pista",
      "Prototipo en curva",
      "Equipo con el prototipo",
      "Video del equipo",
      "Inspección técnica",
      "Prototipo en el circuito",
    ],
  },
  partners: {
    title: "Nuestros socios",
    quote: "Tu empresa puede ser parte de esta trayectoria.",
    quote2: "Sé patrocinador.",
  },
  sponsor: {
    kicker: "Patrocinio",
    title: "Conviértete en patrocinador",
    text: "Las empresas que creen en la innovación, la tecnología y la eficiencia energética forman parte de este viaje. Únete a EFICEM e impulsa el futuro.",
    kit: "Solicitar Media Kit",
    name: "Nombre",
    company: "Empresa",
    contact: "E-mail o WhatsApp",
    submit: "Sé Patrocinador",
    thanks: "¡Gracias! Tu e-mail está listo para enviar: confírmalo en tu aplicación de correo.",
    subject: "Interés en patrocinio — EFICEM",
    kitSubject: "Solicitud de Media Kit — EFICEM",
  },
  footer: {
    tagline: "Equipo de eficiencia energética vehicular de la UFSC Joinville.",
    links: "Enlaces rápidos",
    social: "Redes y contacto",
    where: "Dónde estamos",
    place: "Universidad Federal de Santa Catarina — Campus Joinville",
    open: "Abrir en Google Maps",
    rights: "Todos los derechos reservados.",
  },
};

const en: Dict = {
  nav: {
    home: "Home",
    about: "About",
    project: "Project",
    achievements: "Achievements",
    gallery: "Gallery",
    sponsor: "Sponsorship",
    sponsorBtn: "Become a Sponsor",
    menu: "Menu",
    lang: "Language",
  },
  hero: {
    kicker: "Engineering / Innovation / Sustainability",
    title: "UFSC Joinville's vehicle energy-efficiency team.",
    sub: "We design, build and evolve prototypes that travel the farthest distance on the least energy.",
    cta: "Meet Prototype",
    cta2: "Support the Team",
  },
  about: {
    kicker: "About us",
    title: "More than a team, a purpose.",
    text: "EFICEM is an energy-efficiency team founded in 2012 through the merger of the Catarina and Feneco teams, by Automotive Engineering students at the Joinville Technology Center (UFSC). Today it competes mainly in the Shell Eco-marathon, in both the Brazil and United States editions.",
    stats: [
      ["2012", "founded"],
      ["2", "SEM editions"],
      ["4th", "place 2026"],
    ],
    cap1: "Technical inspection",
    cap2: "2025 team",
  },
  project: {
    kicker: "Project",
    badge: "01 · Electric",
    title: "Electric prototype.",
    text: "Carbon-fiber monocoque — about 2300 mm long, 700 mm high and 35 kg.",
    length: "length",
    height: "height",
    weight: "weight",
    cap: "Monocoque in the lab",
  },
  ach: {
    kicker: "Achievements",
    title: "Our journey is made of major milestones.",
    prev: "Previous",
    next: "Next",
    items: [
      [
        "2012",
        "Founding & Miliwatt I",
        "EFICEM is born from the merger of the Catarina and Feneco teams. The Miliwatt I electric prototype is 3rd best project at MUEE and featured by Discovery Turbo.",
      ],
      [
        "2013",
        "V12 Combustion",
        "Gasoline V12 prototype: 10th at MUEE, 3rd best project award and about 119.6 km/l.",
      ],
      ["2016", "First SEMB", "Setta: lightest of the edition (21.5 kg) and 5th overall."],
      [
        "2017",
        "Latin-American record",
        "Setta wins the Battery Electric category at SEMB with a Latin-American record of 363.6 km/kWh — and the lightest in the Americas (21 kg).",
      ],
      ["2019", "Circular economy", "Win in the Circular Economy off-track."],
      [
        "2021",
        "1st in the Americas",
        "1st in the Americas in the Virtual Technical Inspection challenge, during the pandemic Virtual League.",
      ],
      ["2022", "Safety first", "Win in the Safety off-track."],
      [
        "2023",
        "Eletropig at SEMB",
        "The Eletropig prototype takes 3rd place at SEMB, with 344 km/kWh.",
      ],
      [
        "2026",
        "4th at SEMB",
        "4th overall in the Electric Prototype category at Shell Eco-marathon Brazil.",
      ],
    ],
  },
  gallery: {
    kicker: "Gallery",
    title: "From design to track.",
    sub: "From the workshop to the Shell Eco-marathon: the prototype, the team and behind the scenes.",
    alts: [
      "Prototype on track",
      "Prototype cornering",
      "Team with the prototype",
      "Team video",
      "Technical inspection",
      "Prototype on the circuit",
    ],
  },
  partners: {
    title: "Our partners",
    quote: "Your company can be part of this journey.",
    quote2: "Become a sponsor.",
  },
  sponsor: {
    kicker: "Sponsorship",
    title: "Become a sponsor",
    text: "Companies that believe in innovation, technology and energy efficiency are part of this journey. Join EFICEM and drive the future.",
    kit: "Request Media Kit",
    name: "Name",
    company: "Company",
    contact: "E-mail or WhatsApp",
    submit: "Become a Sponsor",
    thanks: "Thank you! Your e-mail is ready to send: confirm it in your e-mail app.",
    subject: "Sponsorship interest — EFICEM",
    kitSubject: "Media Kit request — EFICEM",
  },
  footer: {
    tagline: "UFSC Joinville's vehicle energy-efficiency team.",
    links: "Quick links",
    social: "Social & contact",
    where: "Where we are",
    place: "Federal University of Santa Catarina — Joinville Campus",
    open: "Open in Google Maps",
    rights: "All rights reserved.",
  },
};

const de: Dict = {
  nav: {
    home: "Start",
    about: "Über uns",
    project: "Projekt",
    achievements: "Erfolge",
    gallery: "Galerie",
    sponsor: "Sponsoring",
    sponsorBtn: "Sponsor werden",
    menu: "Menü",
    lang: "Sprache",
  },
  hero: {
    kicker: "Ingenieurwesen / Innovation / Nachhaltigkeit",
    title: "Das Fahrzeug-Energieeffizienzteam der UFSC Joinville.",
    sub: "Wir entwerfen, bauen und entwickeln Prototypen, die mit minimaler Energie die größte Distanz zurücklegen.",
    cta: "Prototyp entdecken",
    cta2: "Team unterstützen",
  },
  about: {
    kicker: "Über uns",
    title: "Mehr als ein Team – eine Mission.",
    text: "EFICEM ist ein Energieeffizienzteam, das 2012 aus dem Zusammenschluss der Teams Catarina und Feneco von Studierenden der Fahrzeugtechnik am Technologiezentrum Joinville (UFSC) gegründet wurde. Heute nimmt es hauptsächlich am Shell Eco-marathon teil – in Brasilien und den USA.",
    stats: [
      ["2012", "gegründet"],
      ["2", "SEM-Ausgaben"],
      ["4.", "Platz 2026"],
    ],
    cap1: "Technische Abnahme",
    cap2: "Team 2025",
  },
  project: {
    kicker: "Projekt",
    badge: "01 · Elektrisch",
    title: "Elektrischer Prototyp.",
    text: "Kohlefaser-Monocoque – etwa 2300 mm lang, 700 mm hoch und 35 kg schwer.",
    length: "Länge",
    height: "Höhe",
    weight: "Gewicht",
    cap: "Monocoque im Labor",
  },
  ach: {
    kicker: "Erfolge",
    title: "Unser Weg besteht aus großen Meilensteinen.",
    prev: "Zurück",
    next: "Weiter",
    items: [
      [
        "2012",
        "Gründung & Miliwatt I",
        "EFICEM entsteht aus dem Zusammenschluss der Teams Catarina und Feneco. Der Elektro-Prototyp Miliwatt I ist drittbestes Projekt bei der MUEE und wird von Discovery Turbo vorgestellt.",
      ],
      [
        "2013",
        "V12-Verbrenner",
        "Benzin-V12-Prototyp: 10. Platz bei der MUEE, Preis für das drittbeste Projekt und rund 119,6 km/l.",
      ],
      ["2016", "Erste SEMB", "Setta: der leichteste der Ausgabe (21,5 kg) und 5. Platz gesamt."],
      [
        "2017",
        "Lateinamerika-Rekord",
        "Der Setta gewinnt die Kategorie Batterie-Elektrisch bei der SEMB mit einem lateinamerikanischen Rekord von 363,6 km/kWh — und der leichteste Amerikas (21 kg).",
      ],
      ["2019", "Kreislaufwirtschaft", "Sieg im Off-Track Kreislaufwirtschaft."],
      [
        "2021",
        "1. Amerikas",
        "1. Platz Amerikas bei der Virtual Technical Inspection in der virtuellen Liga der Pandemie.",
      ],
      ["2022", "Sicherheit zuerst", "Sieg im Off-Track Sicherheit."],
      [
        "2023",
        "Eletropig bei der SEMB",
        "Der Prototyp Eletropig belegt den 3. Platz bei der SEMB, mit 344 km/kWh.",
      ],
      [
        "2026",
        "4. Platz bei der SEMB",
        "4. Platz gesamt in der Kategorie Elektro-Prototyp beim Shell Eco-marathon Brasilien.",
      ],
    ],
  },
  gallery: {
    kicker: "Galerie",
    title: "Vom Entwurf auf die Strecke.",
    sub: "Von der Werkstatt zum Shell Eco-marathon: der Prototyp, das Team und hinter den Kulissen.",
    alts: [
      "Prototyp auf der Strecke",
      "Prototyp in der Kurve",
      "Team mit dem Prototyp",
      "Teamvideo",
      "Technische Abnahme",
      "Prototyp auf dem Kurs",
    ],
  },
  partners: {
    title: "Unsere Partner",
    quote: "Ihr Unternehmen kann Teil dieses Weges sein.",
    quote2: "Werden Sie Sponsor.",
  },
  sponsor: {
    kicker: "Sponsoring",
    title: "Sponsor werden",
    text: "Unternehmen, die an Innovation, Technologie und Energieeffizienz glauben, sind Teil dieser Reise. Schließen Sie sich EFICEM an und gestalten Sie die Zukunft.",
    kit: "Media Kit anfordern",
    name: "Name",
    company: "Unternehmen",
    contact: "E-Mail oder WhatsApp",
    submit: "Sponsor werden",
    thanks: "Danke! Ihre E-Mail ist versandbereit: Bestätigen Sie sie in Ihrer E-Mail-App.",
    subject: "Sponsoring-Interesse — EFICEM",
    kitSubject: "Media-Kit-Anfrage — EFICEM",
  },
  footer: {
    tagline: "Das Fahrzeug-Energieeffizienzteam der UFSC Joinville.",
    links: "Schnellzugriff",
    social: "Netzwerke & Kontakt",
    where: "Standort",
    place: "Bundesuniversität Santa Catarina — Campus Joinville",
    open: "In Google Maps öffnen",
    rights: "Alle Rechte vorbehalten.",
  },
};

export const DICTS: Record<Lang, Dict> = { pt, es, en, de };

const Ctx = createContext<{ lang: Lang; setLang: (l: Lang) => void; t: Dict }>({
  lang: "pt",
  setLang: () => {},
  t: pt,
});

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

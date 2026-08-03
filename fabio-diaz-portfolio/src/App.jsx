import React, { useEffect, useRef, useState } from "react";
import { Instagram, ImageOff, X, Maximize2 } from "lucide-react";

/* ============================================================ */
/* TOKENS — mismo sistema visual editorial, refinado             */
/* ============================================================ */
const SERIF = { fontFamily: "'Playfair Display', Georgia, 'Times New Roman', serif" };
const SERIF_ITALIC = { ...SERIF, fontStyle: "italic" };
const KICKER = { letterSpacing: "0.18em" };
const INK = "#111111";
const HAIRLINE = "#E4E2DC";
const MUTED = "#5C5C57";
const ACCENT = "#8A1330";
const CREAM = "#FAF8F4";

const CONTAINER = "max-w-6xl mx-auto px-6 md:px-10";

const WHATSAPP_NUMBER = "5351026844";
const INSTAGRAM_HANDLE = "fabio.photoedit";
const EMAIL = "fabio.retouching@gmail.com";
const MAILTO = `mailto:${EMAIL}?subject=Nuevo%20proyecto`;
const WHATSAPP_URL = `https://wa.me/${WHATSAPP_NUMBER}`;
const INSTAGRAM_URL = `https://instagram.com/${INSTAGRAM_HANDLE}`;

/* ============================================================ */
/* DATOS — Portafolio                                            */
/* Reemplaza estas URLs por las fotos reales que quieras mostrar  */
/* ============================================================ */
const portfolioProjects = [
  { id: 1, category: "Retrato", title: "Quinceañera — Jardín", image: "https://res.cloudinary.com/hkzgatvw/image/upload/v1785619898/1_c8xwcu.jpg" },
  { id: 2, category: "Editorial", title: "Editorial urbano", image: "https://res.cloudinary.com/hkzgatvw/image/upload/v1785619953/fsafas_nhmp3f.jpg" },
  { id: 3, category: "Retrato", title: "Quinceañera — Palacio", image: "https://res.cloudinary.com/hkzgatvw/image/upload/v1785619940/mdbvs_bv7u7g.jpg" },
  { id: 4, category: "Retrato", title: "Retrato", image: "https://res.cloudinary.com/hkzgatvw/image/upload/v1785619902/fbdfbdf_ciwht5.jpg" },
  { id: 5, category: "Retrato", title: "Quinceañera — Bosque", image: "https://res.cloudinary.com/hkzgatvw/image/upload/v1785619913/3_m93i7x.jpg" },
  { id: 6, category: "Retrato", title: "Quinceañera — Raíces", image: "https://res.cloudinary.com/hkzgatvw/image/upload/v1785616167/5_m0lpnl.jpg" },
  { id: 7, category: "Editorial", title: "Editorial urbano — Sombrero", image: "https://res.cloudinary.com/hkzgatvw/image/upload/v1785619931/cvxbf_cx854v.jpg" },
];

/* Foto que abre el hero — la primera impresión debe ser una fotografía */
const heroImage = portfolioProjects[1];

const testimonial = {
  quote:
    "Cada fotografía tiene una intención. Mi trabajo es encontrarla, potenciarla y convertirla en una imagen que conecte.",
  author: "Fabio Diaz",
  role: "Fotógrafo y retocador digital",
};

/* ============================================================ */
/* DATOS — Antes y Después (pares para el comparador deslizante)  */
/* Reemplaza estas URLs por tus propios pares de antes/después    */
/* ============================================================ */
const transformationPairs = [
  {
    id: 101,
    title: "Retoque de piel y color",
    before: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=1200&q=80",
    after: "https://images.unsplash.com/photo-1524504388940-b1c1722653e1?w=1200&q=80",
  },
  {
    id: 102,
    title: "Grading editorial",
    before: "https://images.unsplash.com/photo-1519085360753-af0119f7cbe7?w=1200&q=80",
    after: "https://images.unsplash.com/photo-1441984904996-e0b6ba687e04?w=1200&q=80",
  },
];

const services = [
  { n: "01", title: "Piel y Belleza", text: "Separación de frecuencias, dodge & burn y preservación de la textura. Limpio pero creíble — sin caras plásticas." },
  { n: "02", title: "Color y Tono", text: "Gradación completa, balance de blancos y atmósfera. Del editorial limpio a la calidez cinematográfica." },
  { n: "03", title: "Detalle y Composición", text: "Limpieza de fondo, eliminación de distracciones y composición de múltiples cuadros para campañas." },
];

const process = [
  { n: "01", title: "Envías tus fotos", text: "Archivos en alta resolución, por WhatsApp, email o enlace de descarga." },
  { n: "02", title: "Retoco cada detalle", text: "Piel, color y composición con criterio editorial — sin perder tu estilo." },
  { n: "03", title: "Recibes el resultado", text: "Entrega en 48–72h, en la resolución lista para publicar o imprimir." },
];

/* ============================================================ */
/* UTILIDADES                                                    */
/* ============================================================ */

/** Revela contenido con fade + desplazamiento suave al entrar en viewport. */
function Reveal({ children, className = "", delay = 0, as: Tag = "div", style = {} }) {
  const ref = useRef(null);
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const io = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setVisible(true);
            io.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.12, rootMargin: "0px 0px -8% 0px" }
    );
    io.observe(el);
    return () => io.disconnect();
  }, []);

  return (
    <Tag
      ref={ref}
      className={`reveal ${visible ? "reveal-visible" : ""} ${className}`}
      style={{ ...style, transitionDelay: `${delay}ms` }}
    >
      {children}
    </Tag>
  );
}

/** Agrupa una lista en filas de tamaño variable (1 / 2 / 3) para una retícula editorial. */
function groupIntoRows(items, pattern = [1, 2, 3]) {
  const rows = [];
  let i = 0;
  let p = 0;
  while (i < items.length) {
    const size = pattern[p % pattern.length];
    rows.push(items.slice(i, i + size));
    i += size;
    p += 1;
  }
  return rows;
}

/* ============================================================ */
/* NAVEGACIÓN                                                    */
/* ============================================================ */
function Nav() {
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 8);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const links = [
    { href: "#work", label: "Portafolio" },
    { href: "#transformation", label: "Antes y Después" },
    { href: "#services", label: "Servicios" },
  ];

  return (
    <div
      className="sticky top-0 z-30 backdrop-blur-md transition-shadow duration-300"
      style={{
        backgroundColor: "rgba(255,255,255,0.88)",
        borderBottom: `1px solid ${HAIRLINE}`,
        boxShadow: scrolled ? "0 6px 20px -18px rgba(17,17,17,0.4)" : "none",
      }}
    >
      <div className={`${CONTAINER} h-16 flex items-center justify-between`}>
        <a href="#top" className="text-lg" style={{ ...SERIF_ITALIC, color: INK }} aria-label="Fabio Diaz — Inicio">
          FD.
        </a>

        <nav className="hidden md:flex items-center gap-8">
          {links.map((l) => (
            <a
              key={l.href}
              href={l.href}
              className="text-xs uppercase nav-link"
              style={{ ...KICKER, color: MUTED }}
            >
              {l.label}
            </a>
          ))}
        </nav>

        <a
          href={MAILTO}
          className="btn-primary text-xs uppercase px-4 py-2 rounded-full"
          style={{ ...KICKER, backgroundColor: INK, color: "#fff" }}
        >
          Iniciar Proyecto
        </a>
      </div>
    </div>
  );
}

/* ============================================================ */
/* HERO                                                          */
/* ============================================================ */
function Hero() {
  return (
    <header id="top" className={`${CONTAINER} pt-10 md:pt-14`}>
      <div className="flex items-center justify-between mb-6 text-xs" style={{ color: MUTED }}>
        <span style={KICKER} className="uppercase">Portfolio Editorial</span>
        <span className="flex items-center gap-2">
          <span className="relative flex h-1.5 w-1.5">
            <span className="animate-ping absolute inline-flex h-full w-full rounded-full opacity-75" style={{ backgroundColor: ACCENT }} />
            <span className="relative inline-flex rounded-full h-1.5 w-1.5" style={{ backgroundColor: ACCENT }} />
          </span>
          <span style={KICKER} className="uppercase hidden sm:inline">Disponible para nuevos proyectos</span>
        </span>
      </div>

      <Reveal className="text-center">
        <h1
          className="text-5xl md:text-7xl leading-[0.95] mb-3"
          style={{ ...SERIF, color: INK, letterSpacing: "0.01em", fontWeight: 600 }}
        >
          Fabio Diaz
        </h1>

        <p className="text-xs md:text-sm uppercase mb-6" style={{ ...KICKER, color: ACCENT }}>
          Retoque Editorial · Retratos · Fotografía Comercial
        </p>

        <p className="max-w-xl mx-auto text-base leading-relaxed mb-8" style={{ color: "#3A3A38" }}>
          Transformo fotografías en imágenes con carácter — piel real, color con intención y una estética que no pasa desapercibida.
        </p>

        <div className="flex flex-wrap justify-center items-center gap-x-6 gap-y-3 mb-12 md:mb-16">
          <a
            href={MAILTO}
            className="btn-primary text-xs uppercase px-6 py-3 rounded-full"
            style={{ ...KICKER, backgroundColor: INK, color: "#fff" }}
          >
            Iniciar Proyecto
          </a>
          <a
            href={WHATSAPP_URL}
            target="_blank"
            rel="noopener noreferrer"
            className="text-xs uppercase inline-flex items-center gap-2 group"
            style={{ ...KICKER, color: MUTED }}
          >
            Let's Chat
            <span className="inline-block transition-transform duration-300 group-hover:translate-x-1">→</span>
          </a>
        </div>
      </Reveal>

      {/* La fotografía como protagonista, desde el primer segundo */}
      <Reveal delay={120}>
        <div className="relative overflow-hidden rounded-sm aspect-[4/5] sm:aspect-[16/9] md:aspect-[21/9]">
          <img
            src={heroImage.image}
            alt={heroImage.title}
            fetchpriority="high"
            decoding="async"
            className="absolute inset-0 w-full h-full object-cover hero-zoom"
          />
        </div>
      </Reveal>

      <div className="mt-10 md:mt-14" style={{ borderTop: `1px solid ${HAIRLINE}` }} />
    </header>
  );
}

/* ============================================================ */
/* ENCABEZADO DE SECCIÓN (reutilizable)                          */
/* ============================================================ */
function SectionIntro({ kicker, heading, children, tight = false }) {
  return (
    <div className={`pt-10 md:pt-14 ${tight ? "mb-8" : "mb-10 md:mb-12"}`} style={{ borderTop: `1px solid ${HAIRLINE}` }}>
      <Reveal>
        <p className="text-xs uppercase mb-3" style={{ ...KICKER, color: MUTED }}>{kicker}</p>
        <h2 className="text-3xl md:text-5xl mb-2" style={{ ...SERIF, color: INK, letterSpacing: "-0.01em", fontWeight: 600 }}>
          {heading}
        </h2>
        {children}
      </Reveal>
    </div>
  );
}

/* ============================================================ */
/* PORTAFOLIO — retícula editorial de tamaños variables           */
/* ============================================================ */
const ROW_STYLES = {
  1: { row: "md:h-[56vh] md:max-h-[600px] md:min-h-[420px]", card: "aspect-[4/5] sm:aspect-[16/9] md:aspect-auto" },
  2: { row: "md:h-[420px] lg:h-[460px]", card: "aspect-[4/5] md:aspect-auto" },
  3: { row: "md:h-[300px] lg:h-[340px]", card: "aspect-square md:aspect-auto" },
};

function PortfolioSection({ onView }) {
  const categories = ["Todos", ...Array.from(new Set(portfolioProjects.map((p) => p.category)))];
  const [activeCategory, setActiveCategory] = useState("Todos");

  const visible =
    activeCategory === "Todos" ? portfolioProjects : portfolioProjects.filter((p) => p.category === activeCategory);

  const rows = groupIntoRows(visible);

  return (
    <section id="work" className={`${CONTAINER} pb-20 md:pb-28`}>
      <SectionIntro kicker="Trabajo seleccionado" heading="Portafolio">
        <div className="flex flex-wrap gap-x-6 gap-y-2 mt-4">
          {categories.map((cat) => (
            <button
              key={cat}
              onClick={() => setActiveCategory(cat)}
              aria-current={activeCategory === cat}
              className="text-xs uppercase pb-1 transition-colors duration-300"
              style={{
                ...KICKER,
                color: activeCategory === cat ? INK : MUTED,
                borderBottom: activeCategory === cat ? `1px solid ${INK}` : "1px solid transparent",
              }}
            >
              {cat}
            </button>
          ))}
        </div>
      </SectionIntro>

      {rows.map((row, rowIndex) => {
        const style = ROW_STYLES[row.length] || ROW_STYLES[1];
        return (
          <div key={row.map((p) => p.id).join("-")} className={`flex flex-col md:flex-row gap-4 md:gap-6 mb-4 md:mb-6 ${style.row}`}>
            {row.map((project, i) => (
              <Reveal
                key={project.id}
                delay={Math.min((rowIndex * row.length + i) * 60, 300)}
                className="w-full md:h-full"
                style={{ flex: row.length === 2 ? (i === 0 ? "1.35 1.35 0%" : "1 1 0%") : "1 1 0%" }}
              >
                <PortfolioCard project={project} aspectClass={style.card} onView={onView} />
              </Reveal>
            ))}
          </div>
        );
      })}
    </section>
  );
}

function PortfolioCard({ project, aspectClass, onView }) {
  const [hasError, setHasError] = useState(false);

  if (hasError) {
    return (
      <div
        className={`relative w-full h-full ${aspectClass} flex flex-col items-center justify-center gap-2`}
        style={{ backgroundColor: "#F5F4F1", color: MUTED }}
      >
        <ImageOff className="w-6 h-6" strokeWidth={1.25} />
        <span className="text-xs text-center px-4">Imagen no disponible</span>
      </div>
    );
  }

  const view = () => onView && onView(project.image);

  return (
    <div
      className={`relative w-full h-full ${aspectClass} overflow-hidden group cursor-pointer`}
      onClick={view}
      role="button"
      tabIndex={0}
      aria-label={`Ver en grande: ${project.title || "proyecto"}`}
      onKeyDown={(e) => {
        if (e.key === "Enter" || e.key === " ") {
          e.preventDefault();
          view();
        }
      }}
    >
      <img
        src={project.image}
        alt={project.title || "Proyecto"}
        loading="lazy"
        decoding="async"
        onError={() => setHasError(true)}
        className="absolute inset-0 w-full h-full object-cover transition-transform duration-700 ease-out group-hover:scale-[1.045]"
        draggable={false}
      />
      <div
        className="absolute inset-0 pointer-events-none transition-opacity duration-300 opacity-80 group-hover:opacity-100"
        style={{ background: "linear-gradient(to top, rgba(0,0,0,0.5), rgba(0,0,0,0) 45%)" }}
      />
      <div className="absolute bottom-0 left-0 right-0 p-4 pointer-events-none">
        {project.category && (
          <p className="text-xs uppercase text-white/85 mb-1" style={KICKER}>{project.category}</p>
        )}
        <p className="text-sm text-white/95" style={SERIF}>{project.title || ""}</p>
      </div>
      <div className="absolute top-3 right-3 w-8 h-8 rounded-full bg-white/0 group-hover:bg-white flex items-center justify-center opacity-0 group-hover:opacity-100 transition-all duration-300 pointer-events-none">
        <Maximize2 className="w-4 h-4" strokeWidth={1.5} style={{ color: INK }} />
      </div>
    </div>
  );
}

/* ============================================================ */
/* ANTES Y DESPUÉS — comparador deslizante                        */
/* ============================================================ */
function BeforeAfterSlider({ before, after, title }) {
  const containerRef = useRef(null);
  const [pos, setPos] = useState(50);
  const dragging = useRef(false);

  const updateFromClientX = (clientX) => {
    const el = containerRef.current;
    if (!el) return;
    const rect = el.getBoundingClientRect();
    const percent = ((clientX - rect.left) / rect.width) * 100;
    setPos(Math.min(100, Math.max(0, percent)));
  };

  useEffect(() => {
    const onMove = (e) => {
      if (!dragging.current) return;
      const clientX = e.touches ? e.touches[0].clientX : e.clientX;
      updateFromClientX(clientX);
    };
    const stop = () => { dragging.current = false; };
    window.addEventListener("mousemove", onMove);
    window.addEventListener("mouseup", stop);
    window.addEventListener("touchmove", onMove, { passive: true });
    window.addEventListener("touchend", stop);
    return () => {
      window.removeEventListener("mousemove", onMove);
      window.removeEventListener("mouseup", stop);
      window.removeEventListener("touchmove", onMove);
      window.removeEventListener("touchend", stop);
    };
  }, []);

  const start = (clientX) => {
    dragging.current = true;
    updateFromClientX(clientX);
  };

  const onKeyDown = (e) => {
    if (e.key === "ArrowLeft") setPos((p) => Math.max(0, p - 3));
    if (e.key === "ArrowRight") setPos((p) => Math.min(100, p + 3));
    if (e.key === "Home") setPos(0);
    if (e.key === "End") setPos(100);
  };

  return (
    <div className="mb-4 last:mb-0">
      <div
        ref={containerRef}
        className="relative w-full aspect-[4/5] md:aspect-[16/10] overflow-hidden select-none rounded-sm ba-slider"
        onMouseDown={(e) => start(e.clientX)}
        onTouchStart={(e) => start(e.touches[0].clientX)}
      >
        <img src={after} alt={`${title} — después`} loading="lazy" decoding="async" className="absolute inset-0 w-full h-full object-cover pointer-events-none" draggable={false} />
        <div className="absolute inset-0 pointer-events-none" style={{ clipPath: `inset(0 ${100 - pos}% 0 0)` }}>
          <img src={before} alt={`${title} — antes`} loading="lazy" decoding="async" className="absolute inset-0 w-full h-full object-cover" draggable={false} />
        </div>

        <p className="absolute top-4 left-4 text-xs uppercase text-white/90 pointer-events-none" style={{ ...KICKER, textShadow: "0 1px 6px rgba(0,0,0,0.5)" }}>Antes</p>
        <p className="absolute top-4 right-4 text-xs uppercase text-white/90 pointer-events-none" style={{ ...KICKER, textShadow: "0 1px 6px rgba(0,0,0,0.5)" }}>Después</p>

        <div className="absolute top-0 bottom-0 pointer-events-none" style={{ left: `${pos}%`, width: 1, backgroundColor: "rgba(255,255,255,0.9)" }} />

        <div
          role="slider"
          tabIndex={0}
          aria-label={`Comparar antes y después: ${title}`}
          aria-valuenow={Math.round(pos)}
          aria-valuemin={0}
          aria-valuemax={100}
          onKeyDown={onKeyDown}
          className="absolute top-1/2 w-10 h-10 rounded-full bg-white shadow-lg flex items-center justify-center cursor-ew-resize"
          style={{ left: `${pos}%`, transform: "translate(-50%, -50%)" }}
        >
          <span className="flex items-center gap-0.5" style={{ color: INK }}>
            <span className="block w-px h-4" style={{ backgroundColor: HAIRLINE }} />
            <svg width="10" height="10" viewBox="0 0 10 10" fill="none"><path d="M3 1L0.5 5L3 9M7 1L9.5 5L7 9" stroke={INK} strokeWidth="1" /></svg>
            <span className="block w-px h-4" style={{ backgroundColor: HAIRLINE }} />
          </span>
        </div>
      </div>
      <p className="mt-3 text-sm" style={{ ...SERIF, color: INK }}>{title}</p>
    </div>
  );
}

function TransformationSection() {
  return (
    <section id="transformation" className={`${CONTAINER} pb-20 md:pb-28`}>
      <SectionIntro kicker="La Transformación" heading="Antes y Después" tight>
        <p className="text-sm mt-3 max-w-md" style={{ color: MUTED }}>Desliza para ver el retoque en tiempo real.</p>
      </SectionIntro>

      <div className="grid md:grid-cols-2 gap-6 md:gap-8">
        {transformationPairs.map((pair, i) => (
          <Reveal key={pair.id} delay={i * 100}>
            <BeforeAfterSlider before={pair.before} after={pair.after} title={pair.title} />
          </Reveal>
        ))}
      </div>
    </section>
  );
}

/* ============================================================ */
/* CITA EDITORIAL                                                */
/* ============================================================ */
function AboutQuote() {
  return (
    <section style={{ backgroundColor: CREAM }}>
      <div className={`${CONTAINER} py-16 md:py-24`}>
        <Reveal className="max-w-3xl mx-auto text-center px-4">
          <span className="block text-5xl md:text-6xl leading-none mb-2" style={{ ...SERIF, color: ACCENT }}>“</span>
          <p className="text-xl md:text-3xl leading-snug mb-6" style={{ ...SERIF_ITALIC, color: INK }}>
            {testimonial.quote}
          </p>
          <p className="text-xs uppercase" style={{ ...KICKER, color: MUTED }}>
            {testimonial.author} — {testimonial.role}
          </p>
        </Reveal>
      </div>
    </section>
  );
}

/* ============================================================ */
/* SERVICIOS                                                     */
/* ============================================================ */
function ServicesSection() {
  return (
    <section id="services" className={`${CONTAINER} pb-20 md:pb-28`}>
      <SectionIntro kicker="Qué hacemos" heading="Tres cosas, bien hechas." />
      <div className="grid md:grid-cols-3 gap-6">
        {services.map((s, i) => (
          <Reveal key={s.n} delay={i * 90}>
            <div className="p-8 h-full service-card transition-colors duration-300" style={{ border: `1px solid ${HAIRLINE}` }}>
              <p className="text-sm mb-3" style={{ ...SERIF_ITALIC, color: ACCENT }}>{s.n}</p>
              <h3 className="text-xl mb-3" style={{ ...SERIF, color: INK, fontWeight: 600 }}>{s.title}</h3>
              <p className="text-sm leading-relaxed" style={{ color: MUTED }}>{s.text}</p>
            </div>
          </Reveal>
        ))}
      </div>
    </section>
  );
}

/* ============================================================ */
/* CÓMO TRABAJO — confianza + conversión                          */
/* ============================================================ */
function ProcessSection() {
  return (
    <section className={`${CONTAINER} pb-20 md:pb-28`}>
      <SectionIntro kicker="Cómo trabajo" heading="De tu archivo a la imagen final." />
      <div className="grid md:grid-cols-3 gap-8 mb-12">
        {process.map((s, i) => (
          <Reveal key={s.n} delay={i * 90}>
            <p className="text-xs mb-3" style={{ ...KICKER, color: ACCENT }}>{s.n}</p>
            <h3 className="text-lg mb-2" style={{ ...SERIF, color: INK, fontWeight: 600 }}>{s.title}</h3>
            <p className="text-sm leading-relaxed" style={{ color: MUTED }}>{s.text}</p>
          </Reveal>
        ))}
      </div>

      <Reveal>
        <div className="flex flex-col sm:flex-row items-center justify-between gap-6 p-8" style={{ border: `1px solid ${HAIRLINE}` }}>
          <p className="text-base text-center sm:text-left" style={{ ...SERIF_ITALIC, color: INK }}>
            Respondo en menos de 24h. Entrega en 48–72h.
          </p>
          <a
            href={MAILTO}
            className="btn-primary text-xs uppercase px-6 py-3 rounded-full whitespace-nowrap"
            style={{ ...KICKER, backgroundColor: INK, color: "#fff" }}
          >
            Iniciar Proyecto
          </a>
        </div>
      </Reveal>
    </section>
  );
}

/* ============================================================ */
/* LIGHTBOX                                                      */
/* ============================================================ */
function Lightbox({ src, onClose }) {
  useEffect(() => {
    if (!src) return;
    const onKey = (e) => { if (e.key === "Escape") onClose(); };
    window.addEventListener("keydown", onKey);
    const prevOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    return () => {
      window.removeEventListener("keydown", onKey);
      document.body.style.overflow = prevOverflow;
    };
  }, [src, onClose]);

  if (!src) return null;

  return (
    <div
      role="dialog"
      aria-modal="true"
      aria-label="Vista ampliada de imagen"
      className="fixed inset-0 flex items-center justify-center p-6 lightbox-fade"
      style={{ backgroundColor: "rgba(17,17,17,0.94)", zIndex: 60 }}
      onClick={onClose}
    >
      <button
        onClick={onClose}
        aria-label="Cerrar"
        className="absolute top-6 right-6 w-10 h-10 rounded-full bg-white flex items-center justify-center shadow-sm transition-transform duration-200 hover:scale-105"
      >
        <X className="w-5 h-5" strokeWidth={1.5} style={{ color: INK }} />
      </button>
      <img
        src={src}
        alt="Vista ampliada"
        className="max-h-[90vh] max-w-[90vw] object-contain"
        onClick={(e) => e.stopPropagation()}
      />
    </div>
  );
}

/* ============================================================ */
/* FOOTER                                                        */
/* ============================================================ */
function WhatsAppIcon({ className }) {
  return (
    <svg viewBox="0 0 24 24" fill="currentColor" className={className}>
      <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.872.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347z" />
      <path d="M12.001 2.003c-5.514 0-9.997 4.483-9.997 9.997 0 1.762.462 3.485 1.34 5.003l-1.423 5.197a1 1 0 0 0 1.227 1.227l5.197-1.423a9.96 9.96 0 0 0 3.656.703c5.514 0 9.997-4.483 9.997-9.997s-4.483-9.997-9.997-9.997zm0 17.994a7.955 7.955 0 0 1-4.052-1.109 1 1 0 0 0-.75-.09l-3.176.87.87-3.176a1 1 0 0 0-.09-.75 7.955 7.955 0 0 1-1.109-4.052c0-4.411 3.588-7.998 7.997-7.998s7.997 3.587 7.997 7.997-3.586 7.997-7.997 7.997z" />
    </svg>
  );
}

function Footer() {
  const socials = [
    { icon: WhatsAppIcon, label: "WhatsApp", href: WHATSAPP_URL },
    { icon: Instagram, label: "Instagram", href: INSTAGRAM_URL },
  ];
  return (
    <footer className={`${CONTAINER} pb-16`}>
      <div style={{ borderTop: `1px solid ${HAIRLINE}` }} className="pt-10 flex flex-col items-center gap-6">
        <a href="#top" style={{ ...SERIF_ITALIC, color: INK }} className="text-2xl">FD.</a>
        <div className="flex items-center gap-8">
          {socials.map(({ icon: Icon, label, href }, i) => (
            <a
              key={i}
              href={href}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-2 text-xs uppercase transition-opacity duration-300 hover:opacity-60"
              style={{ ...KICKER, color: "#3A3A38" }}
            >
              <Icon className="w-4 h-4" strokeWidth={1.25} />
              {label}
            </a>
          ))}
        </div>
        <p className="text-xs uppercase" style={{ ...KICKER, color: "#B9B7AF" }}>Fabio Diaz — Portfolio</p>
      </div>
    </footer>
  );
}

/* ============================================================ */
/* APP                                                           */
/* ============================================================ */
export default function App() {
  const [lightboxSrc, setLightboxSrc] = useState(null);

  useEffect(() => {
    if (!document.getElementById("portfolio-fonts-link")) {
      const fontLink = document.createElement("link");
      fontLink.id = "portfolio-fonts-link";
      fontLink.rel = "stylesheet";
      fontLink.href =
        "https://fonts.googleapis.com/css2?family=Playfair+Display:ital,wght@0,400;0,600;0,700;1,400;1,600&family=Inter:wght@300;400;500;600&display=swap";
      document.head.appendChild(fontLink);
    }

    if (!document.getElementById("portfolio-global-style")) {
      const globalStyle = document.createElement("style");
      globalStyle.id = "portfolio-global-style";
      globalStyle.innerHTML = `
        html { scroll-behavior: smooth; }
        ::selection { background: ${ACCENT}; color: #fff; }
        a:focus-visible, button:focus-visible, [tabindex]:focus-visible {
          outline: 2px solid ${ACCENT};
          outline-offset: 2px;
        }

        .reveal {
          opacity: 0;
          transform: translateY(20px);
          transition: opacity 0.85s cubic-bezier(0.22,0.61,0.36,1), transform 0.85s cubic-bezier(0.22,0.61,0.36,1);
        }
        .reveal-visible { opacity: 1; transform: translateY(0); }

        .nav-link { position: relative; padding-bottom: 2px; }
        .nav-link::after {
          content: ""; position: absolute; left: 0; right: 0; bottom: -2px; height: 1px;
          background: ${INK}; transform: scaleX(0); transform-origin: right;
          transition: transform 0.35s cubic-bezier(0.22,0.61,0.36,1);
        }
        .nav-link:hover::after { transform: scaleX(1); transform-origin: left; }

        .btn-primary { transition: transform 0.3s cubic-bezier(0.22,0.61,0.36,1), opacity 0.3s ease; display: inline-block; }
        .btn-primary:hover { transform: translateY(-2px); opacity: 0.9; }

        .service-card:hover { border-color: ${ACCENT} !important; }

        @keyframes heroZoom { from { transform: scale(1.08); } to { transform: scale(1); } }
        .hero-zoom { animation: heroZoom 7s cubic-bezier(0.22,0.61,0.36,1) forwards; }

        .ba-slider { cursor: ew-resize; }

        .lightbox-fade { animation: fadeIn 0.25s ease-out; }
        @keyframes fadeIn { from { opacity: 0; } to { opacity: 1; } }

        @media (prefers-reduced-motion: reduce) {
          html { scroll-behavior: auto; }
          .reveal { opacity: 1 !important; transform: none !important; transition: none !important; }
          .hero-zoom { animation: none !important; }
          .btn-primary:hover { transform: none !important; }
        }
      `;
      document.head.appendChild(globalStyle);
    }
  }, []);

  return (
    <div className="min-h-screen w-full bg-white" style={{ fontFamily: "'Inter', system-ui, sans-serif" }}>
      <Nav />
      <Hero />
      <PortfolioSection onView={setLightboxSrc} />
      <TransformationSection />
      <AboutQuote />
      <ServicesSection />
      <ProcessSection />
      <Footer />
      <Lightbox src={lightboxSrc} onClose={() => setLightboxSrc(null)} />
    </div>
  );
}

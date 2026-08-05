import React, { useEffect, useRef, useState } from "react";
import { Instagram, ImageOff, X, Maximize2 } from "lucide-react";

/* ============================================================ */
/* TOKENS — same editorial visual system, refined                */
/* ============================================================ */
const SERIF = { fontFamily: "'Playfair Display', Georgia, 'Times New Roman', serif" };
const SERIF_ITALIC = { ...SERIF, fontStyle: "italic" };
const KICKER = { letterSpacing: "0.18em" };
const INK = "#111111";
const HAIRLINE = "#E4E2DC";
const MUTED = "#5C5C57";
const ACCENT = "#8A1330";
const CREAM = "#FAF8F5";

const CONTAINER = "max-w-6xl mx-auto px-6 md:px-10";

const WHATSAPP_NUMBER = "5351026844";
const INSTAGRAM_HANDLE = "fabio.photoedit";
const EMAIL = "fabio.retouching@gmail.com";
const MAILTO = `mailto:${EMAIL}?subject=Nuevo%20proyecto`;
const WHATSAPP_URL = `https://wa.me/${WHATSAPP_NUMBER}`;
const INSTAGRAM_URL = `https://instagram.com/${INSTAGRAM_HANDLE}`;

/* ============================================================ */
/* DATA — Portfolio                                              */
/* Replace these URLs with the real photos you want to display   */
/* ============================================================ */
const portfolioProjects = [
  // Quinceañera
  { id: 1, category: "Quinceañera", title: "Carriage Arrival", image: "https://res.cloudinary.com/hkzgatvw/image/upload/v1785953285/Carro1_lvnbzh.jpg" },
  { id: 2, category: "Quinceañera", title: "Forest Shadows", image: "https://res.cloudinary.com/hkzgatvw/image/upload/v1785953315/Color_Grading_Bosque2_vrcd0x.jpg" },
  { id: 3, category: "Quinceañera", title: "Among the Oaks", image: "https://res.cloudinary.com/hkzgatvw/image/upload/v1785953315/Color_Grading_Bosque_qkrtlh.jpg" },
  { id: 4, category: "Quinceañera", title: "Filtered Light", image: "https://res.cloudinary.com/hkzgatvw/image/upload/v1785953320/Color_Grading_Bosque_5_udth2h.jpg" },
  { id: 5, category: "Quinceañera", title: "Royal Staircase", image: "https://res.cloudinary.com/hkzgatvw/image/upload/v1785953326/Color_Grading_Palacio_cibdwo.jpg" },
  { id: 6, category: "Quinceañera", title: "Palace Echoes", image: "https://res.cloudinary.com/hkzgatvw/image/upload/v1785953341/Color_Grading_Palacio2_xfxywq.jpg" },
  { id: 7, category: "Quinceañera", title: "Golden Tide", image: "https://res.cloudinary.com/hkzgatvw/image/upload/v1785953342/Playa1_rirh0y.jpg" },
  { id: 8, category: "Quinceañera", title: "Autumn Leaves", image: "https://res.cloudinary.com/hkzgatvw/image/upload/v1785953342/Otono_bdki1o.jpg" },
  { id: 9, category: "Quinceañera", title: "October Sunset", image: "https://res.cloudinary.com/hkzgatvw/image/upload/v1785953351/Color_Gradng_Oto_dduyab.jpg" },
  { id: 10, category: "Quinceañera", title: "Spring Bloom", image: "https://res.cloudinary.com/hkzgatvw/image/upload/v1785953353/Primavera1_tusyka.jpg" },
  { id: 17, category: "Quinceañera", title: "Painted Fans", image: "https://res.cloudinary.com/hkzgatvw/image/upload/v1785958129/_DSC5499_w97py0.jpg" },
  // Retrato
  { id: 11, category: "Portrait", title: "Natural Light", image: "https://res.cloudinary.com/hkzgatvw/image/upload/v1785953533/Retrato_3_rm3zl5.jpg" },
  { id: 12, category: "Portrait", title: "Gaze", image: "https://res.cloudinary.com/hkzgatvw/image/upload/v1785953534/Retrato_2_ygyaj5.jpg" },
  { id: 13, category: "Portrait", title: "Moment", image: "https://res.cloudinary.com/hkzgatvw/image/upload/v1785953535/Retrato_4_zuhml6.jpg" },
  { id: 14, category: "Portrait", title: "Presence", image: "https://res.cloudinary.com/hkzgatvw/image/upload/v1785953538/Retrato_6_cwwfgb.jpg" },
  { id: 15, category: "Portrait", title: "Confidence", image: "https://res.cloudinary.com/hkzgatvw/image/upload/v1785953540/Retrato_1_cqvgsw.jpg" },
  { id: 16, category: "Portrait", title: "Silence", image: "https://res.cloudinary.com/hkzgatvw/image/upload/v1785953541/Reatro_5_qus7d0.jpg" },
];

/* ============================================================ */
/* DATA — Before & After (pairs for the slider comparator)         */
/* ============================================================ */
const transformationPairs = [
  { id: 101, title: "Skin & Color Retouch", orientation: "horizontal", before: "https://res.cloudinary.com/hkzgatvw/image/upload/v1785953904/Antes_y97akx.jpg", after: "https://res.cloudinary.com/hkzgatvw/image/upload/v1785953538/Retrato_6_cwwfgb.jpg" },
  { id: 102, title: "Portrait Retouch", orientation: "vertical", before: "https://res.cloudinary.com/hkzgatvw/image/upload/v1785954182/Antes2_copy_wstnqe.jpg", after: "https://res.cloudinary.com/hkzgatvw/image/upload/v1785953541/Reatro_5_qus7d0.jpg" },
];

const services = [
  { n: "01", title: "Beauty & Skin Retouch", text: "Frequency separation, dodge & burn, and texture preservation. Clean but believable — no plastic faces." },
  { n: "02", title: "Color Correction", text: "White balance, exposure, and skin correction under any lighting condition." },
  { n: "03", title: "Tone Matching", text: "One consistent color and mood across the whole session — every photo looks part of the same set." },
  { n: "04", title: "Detail Enhancement", text: "Background cleanup, distraction removal, and fine composition adjustments." },
  { n: "05", title: "Compositing", text: "Combining multiple shots when the final result calls for it — groups, campaigns, technical portraits." },
  { n: "06", title: "Volume Editing", text: "Consistency maintained across large batches — weddings, quinceañeras, and full events, not just single photos." },
];

const process = [
  { n: "01", title: "You Send Your Photos", text: "High-resolution files, via WhatsApp, email, or a download link." },
  { n: "02", title: "I Retouch Every Detail", text: "Skin, color, and composition with editorial judgment — without losing your style." },
  { n: "03", title: "You Receive the Result", text: "Delivered at a resolution ready to publish or print. Turnaround depends on the volume and complexity of the project." },
];

/* ============================================================ */
/* UTILITIES                                                     */
/* ============================================================ */

/** Reveals content with a fade + gentle upward shift on viewport entry. */
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

/* ============================================================ */
/* NAVIGATION                                                    */
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
    { href: "#work", label: "Portfolio" },
    { href: "#transformation", label: "Before & After" },
    { href: "#services", label: "Services" },
  ];

  return (
    <div
      className="sticky top-0 z-30 backdrop-blur-md transition-shadow duration-300"
      style={{
        backgroundColor: "rgba(250,248,245,0.88)",
        borderBottom: `1px solid ${HAIRLINE}`,
        boxShadow: scrolled ? "0 6px 20px -18px rgba(17,17,17,0.4)" : "none",
      }}
    >
      <div className={`${CONTAINER} h-16 flex items-center justify-between`}>
        <a href="#top" className="text-lg" style={{ ...SERIF_ITALIC, color: INK }} aria-label="Fabio Diaz — Home">
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
          Start a Project
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
        <span style={KICKER} className="uppercase">Editorial Portfolio</span>
        <span className="flex items-center gap-2">
          <span className="relative flex h-1.5 w-1.5">
            <span className="animate-ping absolute inline-flex h-full w-full rounded-full opacity-75" style={{ backgroundColor: ACCENT }} />
            <span className="relative inline-flex rounded-full h-1.5 w-1.5" style={{ backgroundColor: ACCENT }} />
          </span>
          <span style={KICKER} className="uppercase hidden sm:inline">Available for new projects</span>
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
          Digital Retoucher · Skin · Color · Composition
        </p>

        <p className="max-w-xl mx-auto text-base leading-relaxed mb-8" style={{ color: "#3A3A38" }}>
          Photo post-production for photographers and studios: natural retouching, intentional color, and consistent editing that keeps your style and elevates every image.
        </p>

        <div className="flex flex-wrap justify-center items-center gap-x-6 gap-y-3 mb-12 md:mb-16">
          <a
            href={MAILTO}
            className="btn-primary text-xs uppercase px-6 py-3 rounded-full"
            style={{ ...KICKER, backgroundColor: INK, color: "#fff" }}
          >
            Start a Project
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

      <div className="mt-10 md:mt-14" style={{ borderTop: `1px solid ${HAIRLINE}` }} />
    </header>
  );
}

/* ============================================================ */
/* SECTION INTRO (reusable)                                      */
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
/* PORTFOLIO — column mosaic, no photo is ever cropped            */
/* Each image is shown at its real proportion (w-full h-auto);    */
/* CSS columns build the mosaic without forcing heights or crops. */
/* ============================================================ */
function PortfolioSection({ onView }) {
  const categories = ["All", ...Array.from(new Set(portfolioProjects.map((p) => p.category)))];
  const [activeCategory, setActiveCategory] = useState("All");

  const visible =
    activeCategory === "All" ? portfolioProjects : portfolioProjects.filter((p) => p.category === activeCategory);

  return (
    <section id="work" className={`${CONTAINER} pb-20 md:pb-28`}>
      <SectionIntro kicker="Selected Work" heading="Portfolio">
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

      <div className="columns-1 sm:columns-2 lg:columns-3 gap-4 md:gap-6">
        {visible.map((project, i) => (
          <Reveal
            key={project.id}
            delay={Math.min(i * 60, 300)}
            className="break-inside-avoid mb-4 md:mb-6"
          >
            <PortfolioCard project={project} onView={onView} />
          </Reveal>
        ))}
      </div>
    </section>
  );
}

function PortfolioCard({ project, onView }) {
  const [hasError, setHasError] = useState(false);

  if (hasError) {
    return (
      <div
        className="relative w-full aspect-[4/5] flex flex-col items-center justify-center gap-2"
        style={{ backgroundColor: "#F5F4F1", color: MUTED }}
      >
        <ImageOff className="w-6 h-6" strokeWidth={1.25} />
        <span className="text-xs text-center px-4">Image unavailable</span>
      </div>
    );
  }

  const view = () => onView && onView(project.image);

  return (
    <div
      className="relative w-full overflow-hidden group cursor-pointer"
      onClick={view}
      role="button"
      tabIndex={0}
      aria-label={`View larger: ${project.title || "project"}`}
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
        className="block w-full h-auto transition-transform duration-700 ease-out group-hover:scale-[1.03]"
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
/* BEFORE & AFTER — slider comparator                             */
/* ============================================================ */
function BeforeAfterSlider({ before, after, title, orientation = "horizontal" }) {
  const containerRef = useRef(null);
  const [pos, setPos] = useState(50);
  const dragging = useRef(false);

  const aspectClass = orientation === "vertical" ? "aspect-[4/5]" : "aspect-[4/5] md:aspect-[16/10]";

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
        className={`relative w-full ${aspectClass} overflow-hidden select-none rounded-sm ba-slider`}
        onMouseDown={(e) => start(e.clientX)}
        onTouchStart={(e) => start(e.touches[0].clientX)}
      >
        <img src={after} alt={`${title} — after`} loading="lazy" decoding="async" className="absolute inset-0 w-full h-full object-cover pointer-events-none" draggable={false} />
        <div className="absolute inset-0 pointer-events-none" style={{ clipPath: `inset(0 ${100 - pos}% 0 0)` }}>
          <img src={before} alt={`${title} — before`} loading="lazy" decoding="async" className="absolute inset-0 w-full h-full object-cover" draggable={false} />
        </div>

        <p className="absolute top-4 left-4 text-xs uppercase text-white/90 pointer-events-none" style={{ ...KICKER, textShadow: "0 1px 6px rgba(0,0,0,0.5)" }}>Before</p>
        <p className="absolute top-4 right-4 text-xs uppercase text-white/90 pointer-events-none" style={{ ...KICKER, textShadow: "0 1px 6px rgba(0,0,0,0.5)" }}>After</p>

        <div className="absolute top-0 bottom-0 pointer-events-none" style={{ left: `${pos}%`, width: 1, backgroundColor: "rgba(255,255,255,0.9)" }} />

        <div
          role="slider"
          tabIndex={0}
          aria-label={`Compare before and after: ${title}`}
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
  if (transformationPairs.length === 0) {
    return (
      <section id="transformation" className={`${CONTAINER} pb-20 md:pb-28`}>
        <SectionIntro kicker="The Transformation" heading="Before & After" tight>
          <p className="text-sm mt-3 max-w-md" style={{ color: MUTED }}>Drag to see the retouch in real time.</p>
        </SectionIntro>
      </section>
    );
  }

  return (
    <section id="transformation" className={`${CONTAINER} pb-20 md:pb-28`}>
      <SectionIntro kicker="The Transformation" heading="Before & After" tight>
        <p className="text-sm mt-3 max-w-md" style={{ color: MUTED }}>Drag to see the retouch in real time.</p>
      </SectionIntro>

      <div className="grid md:grid-cols-2 gap-6 md:gap-8">
        {transformationPairs.map((pair, i) => (
          <Reveal key={pair.id} delay={i * 100}>
            <BeforeAfterSlider before={pair.before} after={pair.after} title={pair.title} orientation={pair.orientation} />
          </Reveal>
        ))}
      </div>
    </section>
  );
}

/* ============================================================ */
/* SERVICES                                                      */
/* ============================================================ */
function ServicesSection() {
  return (
    <section id="services" className={`${CONTAINER} pb-20 md:pb-28`}>
      <SectionIntro kicker="What I Do" heading="Professional retouching, ready for your client." />
      <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
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
/* HOW I WORK — trust + conversion                                */
/* ============================================================ */
function ProcessSection() {
  return (
    <section className={`${CONTAINER} pb-20 md:pb-28`}>
      <SectionIntro kicker="How I Work" heading="From your file to the final image." />
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
            Shall we work together?
          </p>
          <a
            href={MAILTO}
            className="btn-primary text-xs uppercase px-6 py-3 rounded-full whitespace-nowrap"
            style={{ ...KICKER, backgroundColor: INK, color: "#fff" }}
          >
            Start a Project
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
      aria-label="Enlarged image view"
      className="fixed inset-0 flex items-center justify-center p-6 lightbox-fade"
      style={{ backgroundColor: "rgba(17,17,17,0.94)", zIndex: 60 }}
      onClick={onClose}
    >
      <button
        onClick={onClose}
        aria-label="Close"
        className="absolute top-6 right-6 w-10 h-10 rounded-full bg-white flex items-center justify-center shadow-sm transition-transform duration-200 hover:scale-105"
      >
        <X className="w-5 h-5" strokeWidth={1.5} style={{ color: INK }} />
      </button>
      <img
        src={src}
        alt="Enlarged view"
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
    <div className="min-h-screen w-full" style={{ backgroundColor: CREAM, fontFamily: "'Inter', system-ui, sans-serif" }}>
      <Nav />
      <Hero />
      <PortfolioSection onView={setLightboxSrc} />
      <TransformationSection />
      <ServicesSection />
      <ProcessSection />
      <Footer />
      <Lightbox src={lightboxSrc} onClose={() => setLightboxSrc(null)} />
    </div>
  );
}

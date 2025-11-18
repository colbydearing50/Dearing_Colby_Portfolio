import { useEffect, useMemo, useState, useCallback } from "react";
import { ArrowRight, ArrowLeft, ExternalLink, Github } from "lucide-react";
import { AnimatePresence, motion } from "framer-motion";

// === Your projects (from your message) ===
const projects = [
  {
    id: 1,
    title: "SaaS Landing Page",
    description: "A beautiful landing page app using React and Tailwind.",
    image: "/projects/project1.JPG",
    tags: ["React", "TailwindCSS", "Supabase"],
    demoURL: "#",
    githubUrl: "#",
  },
  {
    id: 2,
    title: "Orbit Analytics Dashboard",
    description:
      "Interactive analytics dashboard with data visualization and filtering capabilities",
    image: "/projects/project2.JPG",
    tags: ["TypeScript", "D3.js", "Next.js"],
    demoURL: "#",
    githubUrl: "#",
  },
  {
    id: 3,
    title: "E-commerce Platform",
    description:
      "Full-featured ecommerce platform with user authentication and payment processing",
    image: "/projects/project3.JPG",
    tags: ["React", "Node.js", "Stripe"],
    demoURL: "#",
    githubUrl: "#",
  },
  {
    id: 4,
    title: "Example Project",
    description: "A beautiful landing page app using React and Tailwind.",
    image: "/projects/project1.JPG",
    tags: ["React", "TailwindCSS", "Supabase"],
    demoURL: "#",
    githubUrl: "#",
  },
  {
    id: 5,
    title: "Example Project",
    description:
      "Interactive analytics dashboard with data visualization and filtering capabilities",
    image: "/projects/project2.JPG",
    tags: ["TypeScript", "D3.js", "Next.js"],
    demoURL: "#",
    githubUrl: "#",
  },
  {
    id: 6,
    title: "Example Project",
    description:
      "Full-featured ecommerce platform with user authentication and payment processing",
    image: "/projects/project3.JPG",
    tags: ["React", "Node.js", "Stripe"],
    demoURL: "#",
    githubUrl: "#",
  },
];

// Clamp modulo for negatives
const mod = (n, m) => ((n % m) + m) % m;

export const ProjectSection = () => {
  const [start, setStart] = useState(0);
  const [itemsPerPage, setItemsPerPage] = useState(3);
  const [direction, setDirection] = useState(1); // 1 = next, -1 = prev

  // If true, pressing → brings new cards IN from the LEFT (as requested)
  const slideIncomingFromLeft = false;

  // Responsiveness
  useEffect(() => {
    const compute = () => {
      if (typeof window === "undefined") return;
      const w = window.innerWidth;
      if (w < 768) setItemsPerPage(1);
      else if (w < 1024) setItemsPerPage(2);
      else setItemsPerPage(3);
    };
    compute();
    window.addEventListener("resize", compute);
    return () => window.removeEventListener("resize", compute);
  }, []);

  // Navigation handlers set direction first
  const goLeft = useCallback(() => {
    setDirection(-1);
    setStart((s) => mod(s - itemsPerPage, projects.length));
  }, [itemsPerPage]);

  const goRight = useCallback(() => {
    setDirection(1);
    setStart((s) => mod(s + itemsPerPage, projects.length));
  }, [itemsPerPage]);

  // Keyboard
  useEffect(() => {
    const onKey = (e) => {
      if (e.key === "ArrowLeft") goLeft();
      if (e.key === "ArrowRight") goRight();
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [goLeft, goRight]);

  // Visible group
  const visible = useMemo(() => {
    const out = [];
    for (let i = 0; i < itemsPerPage; i++) {
      out.push(projects[mod(start + i, projects.length)]);
    }
    return out;
  }, [start, itemsPerPage]);

  const pageCount = Math.ceil(projects.length / itemsPerPage);
  const currentPage = Math.floor(start / itemsPerPage) % pageCount;

  // Framer Motion variants
  const variants = {
    enter: (dir) => {
      const from = slideIncomingFromLeft && dir === 1 ? -100 : dir === 1 ? 100 : -100;
      return { x: `${from}%`, opacity: 0 };
    },
    center: { x: "0%", opacity: 1 },
    exit: (dir) => {
      const to = slideIncomingFromLeft && dir === 1 ? -100 : dir === 1 ? -100 : 100;
      return { x: `${to}%`, opacity: 0 };
    },
  };

  return (
    <section id="projects" className="py-24 px-4 relative">
      <div className="container mx-auto max-w-5xl">
        <h2 className="text-3xl md:text-4xl font-bold mb-4 text-center">
          Featured <span className="text-primary">Projects</span>
        </h2>

        <p className="text-center text-muted-foreground mb-12 max-w-2xl mx-auto">
          Here are some of my recent projects. Each project was carefully crafted
          with attention to detail, performance, and user experience.
        </p>

        {/* Carousel wrapper */}
        <div className="relative pb-8">
          {/* Controls */}
          <button
            aria-label="Previous projects"
            onClick={goLeft}
            className="absolute -left-3 md:-left-15 top-1/2 -translate-y-1/2 z-10 rounded-full border bg-background/80 backdrop-blur p-2 shadow hover:scale-105 transition"
          >
            <ArrowLeft size={24} />
          </button>
          <button
            aria-label="Next projects"
            onClick={goRight}
            className="absolute -right-3 md:-right-15 top-1/2 -translate-y-1/2 z-10 rounded-full border bg-background/80 backdrop-blur p-2 shadow hover:scale-105 transition"
          >
            <ArrowRight size={24} />
          </button>

          {/* Viewport */}
          <div className="overflow-hidden relative">
            <AnimatePresence custom={direction} mode="popLayout" initial={false}>
              <motion.div
                key={`${currentPage}-${itemsPerPage}`}
                custom={direction}
                variants={variants}
                initial="enter"
                animate="center"
                exit="exit"
                transition={{ type: "tween", duration: 0.5, ease: "easeInOut" }}
              >
                <div
                  className="grid gap-8"
                  style={{
                    gridTemplateColumns:
                      itemsPerPage === 1
                        ? "1fr"
                        : itemsPerPage === 2
                        ? "1fr 1fr"
                        : "1fr 1fr 1fr",
                  }}
                >
                  {visible.map((project) => (
                    <div
                      key={project.id}
                      className="group bg-card rounded-lg overflow-hidden shadow-sm border hover:shadow-md transition card-hover"
                    >
                      <div className="h-48 overflow-hidden">
                        <img
                          src={project.image}
                          alt={project.title}
                          className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                          loading="lazy"
                        />
                      </div>
                      <div className="p-6">
                        <div className="flex flex-wrap gap-2 mb-4">
                          {project.tags.map((tag) => (
                            <span
                              key={`${project.id}-${tag}`}
                              className="px-2 py-1 text-xs font-medium border rounded-full bg-primary/10 text-secondary-foreground"
                            >
                              {tag}
                            </span>
                          ))}
                        </div>

                        <h3 className="text-lg font-semibold mb-1">{project.title}</h3>
                        <p className="text-muted-foreground text-sm mb-4">
                          {project.description}
                        </p>
                        <div className="flex justify-between items-center">
                          <div className="flex space-x-3">
                            <a
                              href={project.demoURL}
                              target="_blank"
                              rel="noopener noreferrer"
                              className="text-foreground/80 hover:text-primary transition-colors duration-300"
                            >
                              <ExternalLink />
                            </a>
                            <a
                              href={project.githubUrl}
                              target="_blank"
                              rel="noopener noreferrer"
                              className="text-foreground/80 hover:text-primary transition-colors duration-300"
                            >
                              <Github />
                            </a>
                          </div>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </motion.div>
            </AnimatePresence>
          </div>

          {/* Dots */}
          <div className="flex justify-center gap-2 mt-8">
            {Array.from({ length: pageCount }).map((_, i) => (
              <button
                key={i}
                onClick={() => {
                  const nextStart = i * itemsPerPage;
                  const dir = nextStart > start ? 1 : -1;
                  setDirection(dir);
                  setStart(nextStart);
                }}
                className={`h-2 w-2 rounded-full transition ${
                  i === currentPage ? "bg-primary scale-110" : "bg-gray-400"
                }`}
                aria-label={`Go to project group ${i + 1}`}
              />
            ))}
          </div>
        </div>

        <div className="text-center mt-12">
          <a
            className="cosmic-button w-fit flex items-center mx-auto gap-2"
            target="_blank"
            rel="noopener noreferrer"
            href="#"
          >
            Check My Github <ArrowRight size={16} />
          </a>
        </div>
      </div>
    </section>
  );
};

export default ProjectSection;

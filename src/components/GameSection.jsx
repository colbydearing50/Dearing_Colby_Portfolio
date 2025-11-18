import { useEffect, useMemo, useState, useCallback } from "react";
import { ArrowRight, ArrowLeft, ExternalLink, Github } from "lucide-react";
import { AnimatePresence, motion } from "framer-motion";

const games = [
{
  id:1,
  title: "Code-Breakers: Virus Wars",
  description: "Couch co-op, first person shooter, sci-fi adventure",
  image: "/games/game1.JPG",
  tags: ["Unity", "C#", "Blender"],
  githubURL: "#",
  itchIO : "#",
},

{
  id:2,
  title: "Don't Be Late",
  description: "Runner game where players dodge obstacles to catch the bus",
  image: "/games/game2.JPG",
  tags: ["Unity", "C#", "Blender"],
  githubURL: "#",
  itchIO : "#",
},

{
  id:3,
  title: "Slash and Grab",
  description: "Arcade game where players slice groceries and grab the right items",
  image: "/games/game3.png",
  tags: ["Unity", "C#", "Blender"],
  githubURL: "#",
  itchIO : "#",
},
{
  id: 4,
  title: "Wild Snap",
  description: "An exploration game where players photograph wildlife to complete their nature journal.",
  image: "/games/game5.png",
  tags: ["Unity", "C#", "Blender"],
  githubURL: "#",
  itchIO : "#",
},
{
  id: 5,
  title: "Interstellar Invasion",
  description: "A space shooter where players pilot a spaceship and fight alien forces to defend humanity.                            ",
  image: "/games/game6.JPG",
  tags: ["Unity", "C#", "Blender"],
  githubURL: "#",
  itchIO : "#",
},
{
  id: 6,
  title: "Time Unbound",
  description: "a platformer where players manipulate time to overcome obstacles and reach the end of each level.",
  image: "/games/game7.JPG",
  tags: ["Unity", "C#", "Blender"],
  githubURL: "#",
  itchIO : "#",
},
];


// Clamp modulo for negatives
const mod = (n, m) => ((n % m) + m) % m;

export const GameSection = () => {
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
    setStart((s) => mod(s - itemsPerPage, games.length));
  }, [itemsPerPage]);

  const goRight = useCallback(() => {
    setDirection(1);
    setStart((s) => mod(s + itemsPerPage, games.length));
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
      out.push(games[mod(start + i, games.length)]);
    }
    return out;
  }, [start, itemsPerPage]);

  const pageCount = Math.ceil(games.length / itemsPerPage);
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
    <section id="games" className="py-24 px-4 relative">
      <div className="container mx-auto max-w-5xl">
        <h2 className="text-3xl md:text-4xl font-bold mb-4 text-center">
          Featured <span className="text-primary">Games</span>
        </h2>

        <p className="text-center text-muted-foreground mb-12 max-w-2xl mx-auto">
          Here are some of my recent Games. Each project was carefully crafted
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
                  {visible.map((game) => (
                    <div
                      key={game.id}
                      className="group bg-card rounded-lg overflow-hidden shadow-sm border hover:shadow-md transition card-hover"
                    >
                      <div className="h-48 overflow-hidden">
                        <img
                          src={game.image}
                          alt={game.title}
                          className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                          loading="lazy"
                        />
                      </div>
                      <div className="p-6">
                        <div className="flex flex-wrap gap-2 mb-4">
                          {game.tags.map((tag) => (
                            <span
                              key={`${game.id}-${tag}`}
                              className="px-2 py-1 text-xs font-medium border rounded-full bg-primary/10 text-secondary-foreground"
                            >
                              {tag}
                            </span>
                          ))}
                        </div>

                        <h3 className="text-lg font-semibold mb-1">{game.title}</h3>
                        <p className="text-muted-foreground text-sm mb-4">
                          {game.description}
                        </p>
                        <div className="flex justify-between items-center">
                          <div className="flex space-x-3">
                            <a
                              href={game.demoURL}
                              target="_blank"
                              rel="noopener noreferrer"
                              className="text-foreground/80 hover:text-primary transition-colors duration-300"
                            >
                              <ExternalLink />
                            </a>
                            <a
                              href={game.githubUrl}
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

export default GameSection;

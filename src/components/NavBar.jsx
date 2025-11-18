import { cn } from "@/lib/utils";
import { Menu, X } from "lucide-react";
import { useEffect, useRef, useState } from "react";

const navItems = [
  { name: "Home", href: "#hero" },
  { name: "About", href: "#about" },
  { name: "Skills", href: "#skills" },
  { name: "Projects", href: "#projects" },
  { name: "Games", href: "#games" },
  { name: "Contact", href: "#contact" },
];

export const NavBar = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [hiddenOnScroll, setHiddenOnScroll] = useState(false);
  const lastY = useRef(0);
  const ticking = useRef(false);

  // Detect scroll direction
  useEffect(() => {
    lastY.current = window.scrollY;

    const onScroll = () => {
      if (!ticking.current) {
        window.requestAnimationFrame(() => {
          const y = window.scrollY;
          const dy = y - lastY.current;

          setIsScrolled(y > 10);

          const THRESHOLD = 6;
          if (!isMenuOpen && Math.abs(dy) > THRESHOLD) {
            setHiddenOnScroll(dy > 0 && y > 80);
            lastY.current = y;
          }

          ticking.current = false;
        });
        ticking.current = true;
      }
    };

    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, [isMenuOpen]);

  // Disable scroll when menu open
  useEffect(() => {
    document.body.style.overflow = isMenuOpen ? "hidden" : "";
    return () => (document.body.style.overflow = "");
  }, [isMenuOpen]);

  return (
    <>
      {/* NAVBAR */}
      <nav
        className={cn(
          "fixed inset-x-0 top-0 z-40 transition-all duration-300 will-change-transform",
          isScrolled ? "py-3 bg-background/80 backdrop-blur-md shadow-sm" : "py-5",
          hiddenOnScroll ? "-translate-y-full" : "translate-y-0"
        )}
      >
        <div className="container mx-auto flex items-center justify-between px-4">
          {/* Logo */}
          <a className="text-xl font-bold text-primary flex items-center" href="#hero">
            <span className="relative z-10">
              <span className="text-glow text-foreground">Colby Dearing</span> Portfolio
            </span>
          </a>

          {/* Desktop Nav */}
          <div className="hidden md:flex space-x-8">
            {navItems.map((item, key) => (
              <a
                key={key}
                href={item.href}
                className="text-foreground/80 hover:text-primary transition-colors duration-300"
              >
                {item.name}
              </a>
            ))}
          </div>

          {/* Mobile Button */}
          <button
            onClick={() => setIsMenuOpen((prev) => !prev)}
            className="md:hidden p-2 text-foreground z-50"
            aria-label={isMenuOpen ? "Close Menu" : "Open Menu"}
          >
            {isMenuOpen ? <X size={26} /> : <Menu size={26} />}
          </button>
        </div>
      </nav>

      {/* MOBILE MENU OVERLAY */}
      <div
        role="dialog"
        aria-hidden={!isMenuOpen}
        className={cn(
          "fixed inset-0 z-50 md:hidden flex flex-col items-center justify-center",
          "bg-background/95 backdrop-blur-md transition-all duration-300",
          isMenuOpen ? "opacity-100 pointer-events-auto" : "opacity-0 pointer-events-none"
        )}
      >
        {/* Close Button (X) */}
        <button
          onClick={() => setIsMenuOpen(false)}
          className="absolute top-6 right-6 p-2 text-foreground"
          aria-label="Close Menu"
        >
          <X size={28} />
        </button>

        <div className="flex flex-col space-y-8 text-xl text-center">
          {navItems.map((item, key) => (
            <a
              key={key}
              href={item.href}
              className="text-foreground/90 hover:text-primary transition-colors duration-300"
              onClick={() => setIsMenuOpen(false)}
            >
              {item.name}
            </a>
          ))}
        </div>
      </div>
    </>
  );
};

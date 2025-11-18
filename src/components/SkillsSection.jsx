import { useState } from "react";
import { cn } from "@/lib/utils"; // if you don't have this, replace cn(...) with template strings
import blueprint from "@/assets/Blueprint.png";
import GDScript from "@/assets/gdScript.png";

// ------- Data (Devicon SVGs) -------
const WEB_SKILLS = [
  // Front-end
  { name: "HTML/CSS",   level: 95, category: "front-end", icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/html5/html5-original.svg" },
  { name: "JavaScript", level: 90, category: "front-end", icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/javascript/javascript-original.svg" },
  { name: "React",      level: 90, category: "front-end", icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/react/react-original.svg" },
  { name: "TypeScript", level: 85, category: "front-end", icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/typescript/typescript-original.svg" },
  { name: "Tailwind CSS", level: 85, category: "front-end", icon: "https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/tailwindcss/tailwindcss-original.svg" },
  { name: "Next.js",    level: 85, category: "front-end", icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/nextjs/nextjs-original.svg" },

  // Back-end
  { name: "Node.js",    level: 75, category: "back-end", icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/nodejs/nodejs-original.svg" },
  { name: "Express",    level: 75, category: "back-end", icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/express/express-original.svg" },
  { name: "MongoDB",    level: 70, category: "back-end", icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/mongodb/mongodb-original.svg" },
  { name: "MySQL",      level: 85, category: "back-end", icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/mysql/mysql-original.svg" },

  // Tools
  { name: "Git/GitHub", level: 90, category: "tools", icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/github/github-original.svg" },
  { name: "VS Code",    level: 95, category: "tools", icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/vscode/vscode-original.svg" },
  { name: "Docker",     level: 70, category: "tools", icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/docker/docker-original.svg" },
  { name: "Figma",      level: 80, category: "tools", icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/figma/figma-original.svg" },
];

const GAME_SKILLS = [
  { name: "Unity",         level: 90, category: "engine",      icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/unity/unity-original.svg" },
  { name: "Unreal Engine", level: 70, category: "engine",      icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/unrealengine/unrealengine-original.svg" },
  { name: "Godot",         level: 60, category: "engine",      icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/godot/godot-original.svg" },

  { name: "C#",            level: 90, category: "programming", icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/csharp/csharp-original.svg" },
  { name: "C++",           level: 80, category: "programming", icon: "https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/cplusplus/cplusplus-original.svg" },
  { name: "Blueprint VS",  level: 60, category: "programming", icon: blueprint },
  { name: "GDScript",      level: 65, category: "programming", icon: GDScript },

  { name: "Blender",       level: 75, category: "tools",       icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/blender/blender-original.svg" },
  { name: "Maya",          level: 70, category: "tools",       icon: "https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/maya/maya-original.svg" },
  { name: "Git LFS",       level: 70, category: "tools",       icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/git/git-original.svg" },
];

const DOMAIN_BUTTONS = [
  { id: "all",  label: "All" },
  { id: "web",  label: "Web design" },
  { id: "game", label: "Game design" },
];

const WEB_CATEGORIES  = ["all", "front-end", "back-end", "tools"];
const GAME_CATEGORIES = ["all", "engine", "programming", "tools"];

export const SkillsSection= ()  => {
  const [activeDomain, setActiveDomain] = useState("all");  // 'all' | 'web' | 'game'
  const [activeCategory, setActiveCategory] = useState("all");

  const domainSkills =
    activeDomain === "web"  ? WEB_SKILLS
  : activeDomain === "game" ? GAME_SKILLS
  : [...WEB_SKILLS, ...GAME_SKILLS];

  const domainCategories =
    activeDomain === "web"  ? WEB_CATEGORIES
  : activeDomain === "game" ? GAME_CATEGORIES
  : ["all"]; // hide chips when 'all' (we'll conditionally render)

  const handleDomainChange = (domain) => {
    setActiveDomain(domain);
    setActiveCategory("all");
  };

  const filteredSkills = domainSkills.filter(
    (skill) => activeCategory === "all" || skill.category === activeCategory
  );

  return (
    <section id="skills" className="py-24 px-4 relative bg-secondary/30">
      <div className="container mx-auto max-w-5xl">
        <h2 className="text-3xl md:text-4xl font-bold mb-10 text-center">
          My <span className="text-primary">Skills</span>
        </h2>

        {/* Domain Switcher */}
        <div className="flex flex-wrap justify-center gap-3 mb-6">
          {DOMAIN_BUTTONS.map((d) => (
            <button
              key={d.id}
              type="button"
              onClick={() => handleDomainChange(d.id)}
              className={cn(
                "px-4 py-2 rounded-full transition-colors duration-300",
                activeDomain === d.id
                  ? "bg-primary text-primary-foreground"
                  : "bg-secondary/70 text-foreground hover:bg-secondary"
              )}
              aria-pressed={activeDomain === d.id}
            >
              {d.label}
            </button>
          ))}
        </div>

        {/* Category Chips (only for web/game) */}
        {activeDomain !== "all" && (
          <div className="flex flex-wrap justify-center gap-3 mb-10">
            {domainCategories.map((category) => (
              <button
                key={category}
                type="button"
                onClick={() => setActiveCategory(category)}
                className={cn(
                  "px-4 py-2 rounded-full transition-colors duration-300 capitalize",
                  activeCategory === category
                    ? "bg-primary text-primary-foreground"
                    : "bg-secondary/70 text-foreground hover:bg-secondary"
                )}
                aria-pressed={activeCategory === category}
              >
                {category}
              </button>
            ))}
          </div>
        )}

        {/* Skills Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredSkills.map((skill) => (
            <div
              key={`${skill.name}-${skill.category}`}
              className="bg-card p-6 rounded-lg shadow-sm"
            >
              <div className="mb-4 flex items-center gap-3 text-left">
                <img
                  src={skill.icon}
                  alt={`${skill.name} logo`}
                  className="w-8 h-8 object-contain shrink-0"
                  loading="lazy"
                />
                <h3 className="font-semibold text-lg">{skill.name}</h3>
              </div>

              <div className="w-full bg-secondary/50 h-2 rounded-full overflow-hidden">
                <div
                  className="bg-primary h-2 rounded-full origin-left animate-[grow_1.5s_ease-out]"
                  style={{ width: `${skill.level}%` }}
                />
              </div>
              <div className="text-right mt-1">
                <span className="text-sm text-muted-foreground">
                  {skill.level}%
                </span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

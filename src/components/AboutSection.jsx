import profilePic from "@/assets/Initials.jpg";
import { Briefcase, Code, User } from "lucide-react";

export const AboutSection = () => {
  return (
    <section
      id="about"
      className="
        relative
        py-16 md:py-24
        px-6 sm:px-10 md:px-24
      "
    >
      {/* Centered outer container */}
      <div className="mx-auto w-full max-w-screen-xl">
        <h2 className="text-3xl md:text-4xl font-bold mb-12 text-center">
          About<span className="text-primary"> Me </span>
        </h2>

        {/* First Row (centered row, keeps md 3-cols) */}
        <div className="mx-auto w-full max-w-6xl grid grid-cols-1 md:grid-cols-3 gap-8 md:gap-5 mb-8">
          {/* Left text card */}
          <div
            className="
              text-muted-foreground
              p-4 md:p-6
              text-center md:text-center
              text-sm md:text-base
              leading-relaxed md:leading-7
              text-balance
            "
          >
            <p>
              I’m a recent Computer Science graduate from Cal State LA with a 3.7 GPA and a
              passion for designing clean, user-focused software. My time at university taught me
              how to approach complex problems, collaborate effectively, and create projects that
              combine functionality with creativity.
            </p>
          </div>

          {/* Middle card */}
          <div className="p-4 md:p-6 rounded-lg bg-card shadow-md flex flex-col items-center">
            <img
              src={profilePic}
              alt="Colby Dearing"
              className="w-28 h-28 md:w-40 md:h-32 object-cover rounded-full"
            />
            <p className="mt-4 md:mt-6 text-sm md:text-base">Developer fueled by creativity</p>
          </div>

          {/* Right text card */}
          <div
            className="
              text-muted-foreground
              p-4 md:p-6
              text-center md:text-center
              text-sm md:text-base
              leading-relaxed md:leading-7
              text-balance
            "
          >
            <p>
              My goal is to build a career in front-end development, focusing on crafting
              responsive and user-friendly digital experiences. I also plan to continue developing
              my skills in game design, blending storytelling and interactivity to create meaningful
              player experiences.
            </p>
          </div>
        </div>

        {/* Second Row (centered row, same md layout) */}
        <div className="mx-auto w-full max-w-6xl grid grid-cols-1 md:grid-cols-3 gap-6 md:gap-4 mb-10">
          <div className="gradient-border card-hover p-4 md:p-6">
            <div className="flex items-start gap-4">
              <div className="p-3 rounded-full bg-primary/10">
                <Code className="h-6 w-6 text-primary" />
              </div>
              <div className="text-left">
                <h4 className="font-semibold text-base md:text-lg mb-2 md:mb-3">Web Development</h4>
                <p className="text-muted-foreground text-sm md:text-base leading-snug">
                  Creating responsive websites and web applications with modern frameworks
                </p>
              </div>
            </div>
          </div>

          <div className="gradient-border card-hover p-4 md:p-6">
            <div className="flex items-start gap-4">
              <div className="p-3 rounded-full bg-primary/10">
                <User className="h-6 w-6 text-primary" />
              </div>
              <div className="text-left">
                <h4 className="font-semibold text-base md:text-lg mb-2 md:mb-3">UI/UX Design</h4>
                <p className="text-muted-foreground text-sm md:text-base leading-snug">
                  Designing intuitive user interfaces and seamless user experiences
                </p>
              </div>
            </div>
          </div>

          <div className="gradient-border card-hover p-4 md:p-6">
            <div className="flex items-start gap-4">
              <div className="p-3 rounded-full bg-primary/10">
                <Briefcase className="h-6 w-6 text-primary" />
              </div>
              <div className="text-left">
                <h4 className="font-semibold text-base md:text-lg mb-2 md:mb-3">Project Management</h4>
                <p className="text-muted-foreground text-sm md:text-base leading-snug">
                  Leading projects from conception to completion with agile methodologies
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* Third Row (centered and aligned to the same width) */}
        <div className="mx-auto w-full max-w-6xl grid grid-cols-1 md:grid-cols-6 gap-8 mt-8">
          <div className="md:col-span-2 md:col-start-2 flex justify-center">
            <a href="#contact" className="cosmic-button w-40">Contact Me</a>
          </div>
          <div className="md:col-span-2 md:col-start-4 flex justify-center">
            <button className="cosmic-button w-40">Resume</button>
          </div>
        </div>
      </div>
    </section>
  );
};

import { AboutSection } from "../components/AboutSection"
import { HeroSection } from "../components/HeroSection"
import { SkillsSection } from "../components/SkillsSection"
import { NavBar } from "../components/NavBar"
import { ThemeToggle } from "../components/ThemeToggle"
import { StarBackground } from "@/components/StarBackground"
import { ProjectSection } from "../components/ProjectSection"
import { ContactSection } from "../components/ContactSection"
import { Footer } from "../components/Footer"
import GameSection from "../components/GameSection"

export const Home = () => {

    return <div className="min-h-screeen bg-background text-foreground overflow-x-hidden">
        {/* Theme Toggle */}
        <ThemeToggle/>

        {/* Background Effects */}
        <StarBackground/>

        {/* NavBar */}
        <NavBar />

        {/* Main Content */}
        <main>
            <HeroSection/>
            <AboutSection/>
            <SkillsSection/>
            <ProjectSection/>
            <GameSection/>
            <ContactSection/>
        </main>

        {/* Footer*/}
            <Footer/>
    </div>
}
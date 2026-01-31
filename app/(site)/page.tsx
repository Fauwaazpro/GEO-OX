import { HeroSection } from "@/components/hero-section"
import { SiteFooter } from "@/components/site-footer"
import { Navbar } from "@/components/navbar"
import { ToolsShowcase } from "@/components/tools-showcase"
import { ToolBenefits } from "@/components/tool-benefits"
import { ParticleBackground } from "@/components/particle-background"

export default function SitePage() {
    return (
        <div className="flex min-h-screen flex-col bg-[#F8FAFC]">
            <ParticleBackground />
            <Navbar />
            <main className="flex-1 relative z-10 w-full overflow-hidden">
                <HeroSection />
                <ToolsShowcase />
                <ToolBenefits />
            </main>
            <SiteFooter />
        </div>
    )
}

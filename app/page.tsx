import Navbar from "../app/components/Navbar";
import HeroSection from "../app/components/HeroSection";
import FeaturedProjects from "../app/components/FeaturedProjects";
import OngoingProjects from "../app/components/OngoingProjects";
import NewlyLaunched from "../app/components/NewlyLaunched";
import Testimonials from "../app/components/Testimonials";
import ProjectGallery from "../app/components/ProjectGallery";
import FAQ from "../app/components/FAQ";
import ExploreByLocation from "../app/components/ExploreByLocation";
import DeveloperPartners from "../app/components/DeveloperPartners";
import CallToAction from "../app/components/CallToAction";
import Footer from "./components/Footer";

export default function Home() {
  return (
    <div className="min-h-screen bg-[#FBF9F4] text-[#2C2C2C] font-sans antialiased">
      {/* <Navbar /> */}
      <main>
        <HeroSection />
        <FeaturedProjects />
        <OngoingProjects />
      
         <DeveloperPartners />
        <ExploreByLocation />
        <NewlyLaunched />
         <Testimonials />
        {/* <ProjectGallery /> */}
        <FAQ />
        <CallToAction />
      </main>
      
    </div>
  );
}
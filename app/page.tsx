import { Navbar } from '@/components/ui/Navbar';
import { SolarSystem } from '@/components/solar-system/SolarSystem';
import { ScienceSection } from '@/components/sections/ScienceSection';
import { FooterSection } from '@/components/sections/FooterSection';

export default function Page() {
  return (
    <main id="contenuto-principale" className="relative overflow-hidden">
      <Navbar />

      {/* Full solar system scroll journey (replaces Hero + PlanetsSection) */}
      <SolarSystem />

      {/* Glow divider */}
      <div className="section-divider" aria-hidden="true" />

      {/* Remaining sections — solid bg covers the 3D canvas */}
      <div className="relative z-20 bg-space">
        <ScienceSection />
        <FooterSection />
      </div>
    </main>
  );
}

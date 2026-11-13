"use client";

import PillarTransition from "@/components/PillarTransition";
import HeaderMiles from "@/components/templates/brand-marketing-designer-landing-page-miles/Header Miles";
import AboutMiles from "@/components/templates/brand-marketing-designer-landing-page-miles/About Miles";
import ServicesMiles from "@/components/templates/brand-marketing-designer-landing-page-miles/Services Miles";
import PortfolioMiles from "@/components/templates/brand-marketing-designer-landing-page-miles/Portfolio Miles";
import CaseStudyMiles from "@/components/templates/brand-marketing-designer-landing-page-miles/Case Study Miles";
import ProcessMiles from "@/components/templates/brand-marketing-designer-landing-page-miles/Process Miles";
import CTAMiles from "@/components/templates/brand-marketing-designer-landing-page-miles/CTA Miles";
import FooterMiles from "@/components/templates/brand-marketing-designer-landing-page-miles/Footer Miles";

export default function Home() {
  return (
    <main className="min-h-screen">
      <HeaderMiles />
      <AboutMiles />
      <ServicesMiles />
      <div className="relative">
        <PillarTransition from="#e83f21" to="#0e0301">
          <PortfolioMiles />
        </PillarTransition>
      </div>
      <div className="relative">
        <PillarTransition from="#0e0301" to="#ffffff">
          <CaseStudyMiles />
        </PillarTransition>
      </div>
      <div className="relative">
        <PillarTransition from="#ffffff" to="#0e0301">
          <ProcessMiles />
        </PillarTransition>
      </div>
      <div className="relative">
        <PillarTransition from="#0e0301" to="#e83f21">
          <CTAMiles />
        </PillarTransition>
      </div>
      <div className="relative">
        <FooterMiles />
      </div>
    </main>
  );
}

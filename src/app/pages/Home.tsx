import { useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import HomeFeatureSlider from '../components/home/HomeFeatureSlider';
import TrustedBySection from '../components/home/TrustedBySection';
import WhyChooseSection from '../components/home/WhyChooseSection';
import ServicesOverview from '../components/home/ServicesOverview';
import IndustriesSection from '../components/home/IndustriesSection';
import TechStack from '../components/home/TechStack';
import ProcessTimeline from '../components/home/ProcessTimeline';
import CaseStudiesSection from '../components/home/CaseStudiesSection';
import TestimonialsSection from '../components/home/TestimonialsSection';
import BlogSection from '../components/home/BlogSection';
import FinalCTASection from '../components/home/FinalCTASection';
import TrustSection from '../components/TrustSection';

export default function Home() {
    const location = useLocation();

    useEffect(() => {
        window.scrollTo(0, 0);
    }, [location]);

    return (
        <main className="bg-background min-h-screen overflow-hidden">
            {/* 1. Autonomous Revenue OS 6-Slider Hero Section */}
            <HomeFeatureSlider />
            {/* 2. Client Logos */}
            <TrustedBySection />
            {/* 3. Company Overview */}
            <WhyChooseSection />
            {/* 4. Featured Capabilities & 5. Featured Solutions */}
            <ServicesOverview />
            {/* 6. Industry Expertise */}
            <IndustriesSection />
            {/* 7. Technology Stack */}
            <TechStack />
            {/* 8. Business Outcomes */}
            <ProcessTimeline />
            {/* 9. Trust Stats */}
            <TrustSection />
            {/* 10. Case Studies */}
            <CaseStudiesSection />
            {/* 10. Testimonials */}
            <TestimonialsSection />
            {/* 11. Latest Insights */}
            <BlogSection />
            {/* 12. Contact CTA */}
            <FinalCTASection />
        </main>
    );
}

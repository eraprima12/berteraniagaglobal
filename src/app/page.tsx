
import type { Metadata } from 'next';
import { ParallaxHomeSection } from '../components/sections/parallax-home-section';
import { ProductShowcaseSection } from '../components/sections/product-showcase-section';
import { OurStorySection } from '../components/sections/our-story-section';
import { OurTeamSection } from '../components/sections/our-team-section';
import { ContactUsSection } from '../components/sections/contact-us-section';
import { AnimatedSection } from '../components/common/AnimatedSection';

export const metadata: Metadata = {
  title: 'Bertera Niaga Global - Premium Indonesian Coffee Export',
  description: 'Discover premium Indonesian coffee beans from Bertera Niaga Global. We are a leading producer and wholesaler specializing in Arabica, Robusta, and Liberica coffee for export. Beyond Border, Beyond Expectations.',
  openGraph: {
    title: 'Bertera Niaga Global - Premium Indonesian Coffee Export',
    description: 'Your trusted partner for high-quality Indonesian coffee. Explore our range of Arabica, Robusta, and Liberica beans.',
    images: [
      {
        url: '/images/logo/bertera-logo.png', 
        width: 1200,
        height: 200, 
        alt: 'Bertera Niaga Global Logo',
      },
    ],
  },
};

export default function HomePage() {
  return (
    <div className="flex flex-col">
      <AnimatedSection
        initialClass="opacity-0"
        animateInClass="opacity-100"
        transitionDuration="duration-1000"
      >
        <ParallaxHomeSection />
      </AnimatedSection>

      <AnimatedSection delay="delay-100">
        <ProductShowcaseSection />
      </AnimatedSection>

      <AnimatedSection delay="delay-100">
        <OurStorySection />
      </AnimatedSection>

      <AnimatedSection delay="delay-100">
        <OurTeamSection />
      </AnimatedSection>

      <AnimatedSection delay="delay-100">
        <ContactUsSection />
      </AnimatedSection>
    </div>
  );
}

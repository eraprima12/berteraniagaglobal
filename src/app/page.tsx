
import { ParallaxHomeSection } from '@/components/sections/parallax-home-section';
import { ProductShowcaseSection } from '@/components/sections/product-showcase-section';
import { OurStorySection } from '@/components/sections/our-story-section';
import { OurTeamSection } from '@/components/sections/our-team-section';
import { ContactUsSection } from '@/components/sections/contact-us-section';

export default function HomePage() {
  return (
    <div className="flex flex-col">
      <ParallaxHomeSection />
      <ProductShowcaseSection />
      <OurStorySection />
      <OurTeamSection />
      <ContactUsSection />
    </div>
  );
}

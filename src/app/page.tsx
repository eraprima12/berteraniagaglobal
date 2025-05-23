
import type { Metadata } from 'next';
import { ParallaxHomeSection } from '../components/sections/parallax-home-section';
import { ProductShowcaseSection } from '../components/sections/product-showcase-section';
import { OurStorySection } from '../components/sections/our-story-section';
import { OurTeamSection } from '../components/sections/our-team-section';
import { ContactUsSection } from '../components/sections/contact-us-section';

export const metadata: Metadata = {
  title: 'Bertera Niaga Global - Premium Indonesian Coffee Export',
  description: 'Discover premium Indonesian coffee beans from Bertera Niaga Global. We are a leading producer and wholesaler specializing in Arabica, Robusta, and Liberica coffee for export. Beyond Border, Beyond Expectations.',
  openGraph: {
    title: 'Bertera Niaga Global - Premium Indonesian Coffee Export',
    description: 'Your trusted partner for high-quality Indonesian coffee. Explore our range of Arabica, Robusta, and Liberica beans.',
    images: [
      {
        url: '/images/logo/bertera-logo.png', // Replace with an absolute URL to a hero image or logo if available
        width: 1200,
        height: 200, // Adjusted to match logo aspect ratio, or use a more general OG image aspect ratio
        alt: 'Bertera Niaga Global Logo',
      },
    ],
  },
};

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

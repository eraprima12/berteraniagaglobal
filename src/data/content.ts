
export interface CoffeeOrigin {
  id: string;
  name: string;
  description: string;
  imageUrl: string;
  imageHint: string;
}

export interface CoffeeType {
  id: string;
  name: string;
  description: string;
  origins: CoffeeOrigin[];
}

export const coffeeData: CoffeeType[] = [
  {
    id: 'arabica',
    name: 'Arabica',
    description: 'Arabica coffee is known for its aromatic and complex flavor profile, often with notes of fruit, flowers, chocolate, nuts, or caramel. It has a higher acidity and lower caffeine content compared to Robusta.',
    origins: [
      { id: 'mandheling', name: 'Mandheling (Sumatra)', description: 'Rich, earthy, and full-bodied with low acidity and notes of chocolate and spice.', imageUrl: 'https://placehold.co/400x300.png', imageHint: 'coffee beans sumatra' },
      { id: 'gayo', name: 'Gayo (Aceh, Sumatra)', description: 'Smooth, clean cup with medium body, bright acidity, and complex fruity and floral notes.', imageUrl: 'https://placehold.co/400x300.png', imageHint: 'coffee beans gayo' },
      { id: 'toraja', name: 'Toraja (Sulawesi)', description: 'Deep, rich flavor with a full body, low acidity, and notes of dark chocolate and ripe fruit.', imageUrl: 'https://placehold.co/400x300.png', imageHint: 'coffee beans toraja' },
      { id: 'java', name: 'Java Ijen', description: 'Classic Indonesian coffee with a heavy body, syrupy mouthfeel, and often spicy or nutty notes.', imageUrl: 'https://placehold.co/400x300.png', imageHint: 'coffee beans java' },
    ],
  },
  {
    id: 'robusta',
    name: 'Robusta',
    description: 'Robusta coffee has a stronger, bolder, and more bitter flavor, often described as rubbery or chocolatey. It has a higher caffeine content and lower acidity than Arabica, producing a rich crema.',
    origins: [
      { id: 'lampung', name: 'Lampung (Sumatra)', description: 'Known for its strong, bold flavor, heavy body, and often a rubbery or chocolatey taste.', imageUrl: 'https://placehold.co/400x300.png', imageHint: 'robusta coffee lampung' },
      { id: 'java-robusta', name: 'Java Robusta', description: 'Typically has a clean cup, good body, and a classic bitter Robusta profile.', imageUrl: 'https://placehold.co/400x300.png', imageHint: 'robusta beans java' },
    ],
  },
  {
    id: 'liberica',
    name: 'Liberica',
    description: 'Liberica coffee is a less common species with a unique flavor profile that can be smoky, woody, floral, or fruity. It has large, irregular-shaped beans and a distinct aroma.',
    origins: [
      { id: 'borneo-liberica', name: 'Borneo Liberica', description: 'Offers a unique taste often with smoky, woody notes and a bold aroma.', imageUrl: 'https://placehold.co/400x300.png', imageHint: 'liberica coffee borneo' },
      { id: 'jambi-liberica', name: 'Jambi Liberica (Sumatra)', description: 'Known for its distinct fruity and sometimes jackfruit-like notes.', imageUrl: 'https://placehold.co/400x300.png', imageHint: 'liberica beans jambi' },
    ],
  },
];

export interface TeamMember {
  id: string;
  name: string;
  title: string;
  bio: string;
  imageUrl: string;
  imageHint: string;
}

export const teamMembers: TeamMember[] = [
  { id: '1', name: 'Ahmad Yani', title: 'Founder & CEO', bio: 'Visionary leader with 20+ years in the coffee industry, passionate about quality and sustainability.', imageUrl: 'https://placehold.co/300x300.png', imageHint: 'professional headshot man' },
  { id: '2', name: 'Siti Aminah', title: 'Head of Operations', bio: 'Ensures smooth operations from bean to cup, focusing on efficiency and excellence.', imageUrl: 'https://placehold.co/300x300.png', imageHint: 'professional headshot woman' },
  { id: '3', name: 'Budi Santoso', title: 'Export Manager', bio: 'Connects Bertera Global with international markets, fostering strong partnerships.', imageUrl: 'https://placehold.co/300x300.png', imageHint: 'professional headshot person' },
  { id: '4', name: 'Dewi Lestari', title: 'Quality Control Lead', bio: 'Meticulously oversees coffee quality, ensuring every batch meets our high standards.', imageUrl: 'https://placehold.co/300x300.png', imageHint: 'professional headshot asian woman' },
];

export interface StoryEvent {
  id: string;
  year: string;
  title: string;
  description: string;
  imageUrl: string;
  imageHint: string;
}

export const storyEvents: StoryEvent[] = [
  { id: '1', year: '2005', title: 'The Seed of an Idea', description: 'Our founder, Ahmad Yani, envisioned a company that would share Indonesia\'s finest coffees with the world.', imageUrl: 'https://placehold.co/500x300.png', imageHint: 'coffee beans idea' },
  { id: '2', year: '2008', title: 'First Export', description: 'Bertera Niaga Global made its first international shipment, marking a significant milestone.', imageUrl: 'https://placehold.co/500x300.png', imageHint: 'shipping container coffee' },
  { id: '3', year: '2015', title: 'Expanding Horizons', description: 'We expanded our network of local farmers, ensuring fair trade practices and sustainable sourcing.', imageUrl: 'https://placehold.co/500x300.png', imageHint: 'coffee farmers group' },
  { id: '4', year: '2023', title: 'Commitment to Quality', description: 'Implemented advanced quality control measures, reinforcing our "Beyond Expectations" promise.', imageUrl: 'https://placehold.co/500x300.png', imageHint: 'coffee quality control lab' },
];


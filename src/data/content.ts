
export interface CoffeeOrigin {
  id: string;
  name: string;
  description: string;
  imageUrl: string;
  imageHint: string;
  price: number;
  priceUnit: string; // e.g., "USD / kg" or "IDR / kg"
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
      { id: 'mandheling', name: 'Mandheling (Sumatra)', description: 'Rich, earthy, and full-bodied with low acidity and notes of chocolate and spice. Sourced from the highlands of Sumatra, Mandheling coffee is renowned for its smooth, heavy body and complex flavor profile. It often exhibits earthy notes, hints of dark chocolate, and a touch of spice, making it a favorite among those who appreciate a bold and satisfying cup.', imageUrl: 'https://placehold.co/400x300.png', imageHint: 'coffee beans sumatra', price: 15, priceUnit: 'USD / kg' },
      { id: 'gayo', name: 'Gayo (Aceh, Sumatra)', description: 'Smooth, clean cup with medium body, bright acidity, and complex fruity and floral notes. From the Gayo highlands in Aceh, this coffee is celebrated for its clean taste and vibrant acidity. It delights the palate with a balanced medium body and an intricate dance of fruity and floral aromas, offering a truly sophisticated coffee experience.', imageUrl: 'https://placehold.co/400x300.png', imageHint: 'coffee beans gayo', price: 18, priceUnit: 'USD / kg' },
      { id: 'toraja', name: 'Toraja (Sulawesi)', description: 'Deep, rich flavor with a full body, low acidity, and notes of dark chocolate and ripe fruit. Cultivated in the mountainous regions of Tana Toraja, Sulawesi, this coffee boasts a deep, rich flavor profile. Its full body and low acidity are complemented by distinct notes of dark chocolate and sweet ripe fruit, creating a luxurious and memorable brew.', imageUrl: 'https://placehold.co/400x300.png', imageHint: 'coffee beans toraja', price: 17, priceUnit: 'USD / kg' },
      { id: 'arjuno', name: 'Arjuno (Java)', description: 'Classic Indonesian coffee with a heavy body, syrupy mouthfeel, and often spicy or nutty notes. Grown on the slopes of Mount Arjuno in Java, this coffee is a quintessential example of Indonesian excellence. It features a heavy body, a satisfyingly syrupy mouthfeel, and is often characterized by warm spicy or nutty undertones.', imageUrl: 'https://placehold.co/400x300.png', imageHint: 'coffee beans java', price: 16, priceUnit: 'USD / kg' },
    ],
  },
  {
    id: 'robusta',
    name: 'Robusta',
    description: 'Robusta coffee has a stronger, bolder, and more bitter flavor, often described as rubbery or chocolatey. It has a higher caffeine content and lower acidity than Arabica, producing a rich crema.',
    origins: [
      { id: 'arjuno-robusta', name: 'Arjuno Robusta (Green Series)', description: 'Typically has a clean cup, good body, and a classic bitter Robusta profile, perfect for strong espresso. Sourced from Java, our Arjuno Robusta Green Series offers a consistently clean cup with a substantial body. Its hallmark is the classic, invigorating bitterness that Robusta lovers seek, making it an excellent base for powerful espresso shots.', imageUrl: 'https://placehold.co/400x300.png', imageHint: 'robusta beans java', price: 10, priceUnit: 'USD / kg' },
      { id: 'arjuno-robusta-roasted', name: 'Arjuno Robusta (Roasted Series)', description: 'Expertly roasted to enhance its bold flavors, this Robusta offers a rich, intense experience. Our Roasted Series of Arjuno Robusta takes the inherent boldness of these Javanese beans and elevates it through expert roasting. The result is a rich, intense coffee experience with a satisfyingly bitter kick and a full body.', imageUrl: 'https://placehold.co/400x300.png', imageHint: 'robusta beans java', price: 12, priceUnit: 'USD / kg' },
    ],
  },
  {
    id: 'liberica',
    name: 'Liberica',
    description: 'Liberica coffee is a less common species with a unique flavor profile that can be smoky, woody, floral, or fruity. It has large, irregular-shaped beans and a distinct aroma.',
    origins: [
      { id: 'borneo-liberica', name: 'Borneo Liberica', description: 'Offers a unique taste often with smoky, woody notes and a bold aroma, a rare and exotic choice. Hailing from the island of Borneo, Liberica coffee is a rare find. It presents a truly unique taste adventure, often characterized by intriguing smoky and woody notes, a bold, captivating aroma, and a lingering finish.', imageUrl: 'https://placehold.co/400x300.png', imageHint: 'liberica coffee borneo', price: 20, priceUnit: 'USD / kg' },
      { id: 'jambi-liberica', name: 'Jambi Liberica (Sumatra)', description: 'Known for its distinct fruity and sometimes jackfruit-like notes, providing a truly unique cup. This Sumatran Liberica from Jambi is prized for its distinctive flavor profile. Expect an array of fruity notes, sometimes reminiscent of jackfruit, along with a unique aromatic complexity that sets it apart from more common coffee varieties.', imageUrl: 'https://placehold.co/400x300.png', imageHint: 'liberica beans jambi', price: 22, priceUnit: 'USD / kg' },
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
  { id: '1', name: 'Era Prima S', title: 'Founder & CEO', bio: 'Visionary leader with 10+ years in the coffee industry, passionate about quality and sustainability.', imageUrl: 'https://placehold.co/300x300.png', imageHint: 'professional headshot man' },
  { id: '2', name: 'Bobby Ishak', title: 'CTO', bio: 'Ensures smooth operations from bean to cup, focusing on efficiency and excellence.', imageUrl: 'https://placehold.co/300x300.png', imageHint: 'professional headshot man' },
  { id: '3', name: 'Gilbert Yoshua', title: 'CBO', bio: 'Connects Bertera Global with international markets, fostering strong partnerships.', imageUrl: 'https://placehold.co/300x300.png', imageHint: 'professional headshot person' },
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
  { id: '1', year: '2023', title: 'The Seed of an Idea', description: 'Our founder, Era Prima S, envisioned a company that would share Indonesia\'s finest coffees with the world.', imageUrl: '/images/journey/seed-of-an-idea.jpeg', imageHint: 'coffee beans idea' },
  { id: '2', year: '2024', title: 'First Export', description: 'Bertera Niaga Global made its first international shipment, marking a significant milestone.', imageUrl: '/images/journey/first-export.jpeg', imageHint: 'shipping container coffee' },
  { id: '3', year: '2025', title: 'Expanding Horizons', description: 'We expanded our network of local farmers, ensuring fair trade practices and sustainable sourcing.', imageUrl: '/images/journey/expanding-horizons.jpeg', imageHint: 'coffee farmers group' },
  { id: '4', year: '2025', title: 'Commitment to Quality', description: 'Implemented advanced quality control measures, reinforcing our "Beyond Expectations" promise.', imageUrl: '/images/journey/commitment-to-quality.jpeg', imageHint: 'coffee quality control lab' },
];


export interface ProductDetails extends CoffeeOrigin {
  coffeeTypeName: string;
  coffeeTypeDescription: string;
}

export function getProductDetails(id: string): ProductDetails | undefined {
  for (const coffeeType of coffeeData) {
    const foundOrigin = coffeeType.origins.find(origin => origin.id === id);
    if (foundOrigin) {
      return {
        ...foundOrigin,
        coffeeTypeName: coffeeType.name,
        coffeeTypeDescription: coffeeType.description,
      };
    }
  }
  return undefined;
}

export function getAllCoffeeOrigins(): ProductDetails[] {
  return coffeeData.flatMap(type =>
    type.origins.map(origin => ({
      ...origin,
      coffeeTypeName: type.name,
      coffeeTypeDescription: type.description,
    }))
  );
}

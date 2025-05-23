
"use client";
import Image from 'next/image';
import { useState, useEffect } from 'react';
import { Tabs, TabsContent, TabsList, TabsTrigger } from "../ui/tabs";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "../ui/card";
import { Input } from "../ui/input";
import { coffeeData, CoffeeType, CoffeeOrigin } from '../../data/content';
import { Package, Search as SearchIcon } from 'lucide-react'; // Renamed Search to SearchIcon to avoid conflict

export function ProductShowcaseSection() {
  const [searchTerm, setSearchTerm] = useState('');
  const [activeTab, setActiveTab] = useState(coffeeData[0]?.id || 'arabica');
  const [hydrated, setHydrated] = useState(false);

  useEffect(() => {
    setHydrated(true);
  }, []);

  const handleTabChange = (value: string) => {
    setActiveTab(value);
    // Optionally, you could clear the search term when changing tabs:
    // setSearchTerm(''); 
  };

  const formatPrice = (price: number, priceUnit: string) => {
    if (!hydrated) return `${priceUnit.startsWith('USD') ? '$' : 'Rp'}${price} / kg`; // Basic SSR fallback

    const parts = priceUnit.split(' ');
    const currencyCode = parts[0];
    const unit = parts.slice(1).join(' ');
    
    try {
      return `${new Intl.NumberFormat(undefined, { style: 'currency', currency: currencyCode, minimumFractionDigits: 2, maximumFractionDigits: 2 }).format(price)}${unit ? ` ${unit}` : ''}`;
    } catch (e) {
      // Fallback for invalid currency codes or environments
      return `${currencyCode} ${price.toFixed(2)}${unit ? ` ${unit}` : ''}`;
    }
  };


  return (
    <section id="products" className="py-16 md:py-24 bg-card">
      <div className="container mx-auto px-4 md:px-6">
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold text-primary mb-4">Our Finest Coffees</h2>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            Discover the rich aromas and unique flavors of Indonesian coffee, sourced with care and passion.
          </p>
        </div>

        <Tabs defaultValue={activeTab} onValueChange={handleTabChange} className="w-full">
          <TabsList className="grid w-full grid-cols-1 sm:grid-cols-3 mb-8 max-w-2xl mx-auto bg-secondary">
            {coffeeData.map((type: CoffeeType) => (
              <TabsTrigger key={type.id} value={type.id} className="text-secondary-foreground data-[state=active]:bg-primary data-[state=active]:text-primary-foreground">
                {type.name}
              </TabsTrigger>
            ))}
          </TabsList>

          <div className="relative my-6 mx-auto max-w-lg">
            <SearchIcon className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-muted-foreground" />
            <Input
              type="search"
              placeholder="Search by name or description..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="pl-10 w-full bg-background/80 border-border focus:ring-primary"
              aria-label="Search coffee products"
            />
          </div>

          {coffeeData.map((type: CoffeeType) => {
            const filteredOrigins = type.origins.filter(origin =>
              searchTerm === '' ||
              origin.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
              origin.description.toLowerCase().includes(searchTerm.toLowerCase())
            );

            return (
              <TabsContent key={type.id} value={type.id}>
                <div className="mb-8 p-6 bg-background rounded-lg shadow">
                  <h3 className="text-2xl font-semibold text-primary mb-3">{type.name}</h3>
                  <p className="text-muted-foreground">{type.description}</p>
                </div>
                
                {filteredOrigins.length > 0 ? (
                  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                    {filteredOrigins.map((origin: CoffeeOrigin) => (
                      <Card key={origin.id} className="overflow-hidden shadow-lg hover:shadow-xl transition-shadow duration-300 flex flex-col bg-background">
                        <div className="relative w-full h-56">
                          <Image
                            src={origin.imageUrl}
                            alt={`Image of ${origin.name} - ${type.name} coffee`}
                            layout="fill"
                            objectFit="cover"
                            data-ai-hint={origin.imageHint}
                          />
                        </div>
                        <CardHeader>
                          <CardTitle className="text-xl text-primary flex items-center gap-2">
                            <Package size={24} /> {origin.name}
                          </CardTitle>
                        </CardHeader>
                        <CardContent className="flex-grow flex flex-col justify-between">
                          <CardDescription>{origin.description}</CardDescription>
                          {hydrated && (
                             <p className="text-lg font-semibold text-accent mt-4">
                              {formatPrice(origin.price, origin.priceUnit)}
                            </p>
                          )}
                          {!hydrated && ( // SSR fallback or pre-hydration display
                             <p className="text-lg font-semibold text-accent mt-4 animate-pulse">
                               Loading price...
                             </p>
                          )}
                        </CardContent>
                      </Card>
                    ))}
                  </div>
                ) : (
                  <div className="text-center py-10">
                    <p className="text-lg text-muted-foreground">
                      No {type.name} products found matching "{searchTerm}".
                    </p>
                  </div>
                )}
              </TabsContent>
            );
          })}
        </Tabs>
      </div>
    </section>
  );
}

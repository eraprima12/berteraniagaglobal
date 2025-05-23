
"use client";
import Image from 'next/image';
import { Tabs, TabsContent, TabsList, TabsTrigger } from "../ui/tabs";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "../ui/card";
import { coffeeData, CoffeeType, CoffeeOrigin } from '../../data/content';
import { Package } from 'lucide-react';

export function ProductShowcaseSection() {
  return (
    <section id="products" className="py-16 md:py-24 bg-card">
      <div className="container mx-auto px-4 md:px-6">
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold text-primary mb-4">Our Finest Coffees</h2>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            Discover the rich aromas and unique flavors of Indonesian coffee, sourced with care and passion.
          </p>
        </div>

        <Tabs defaultValue={coffeeData[0]?.id || 'arabica'} className="w-full">
          <TabsList className="grid w-full grid-cols-1 sm:grid-cols-3 mb-8 max-w-2xl mx-auto bg-secondary">
            {coffeeData.map((type: CoffeeType) => (
              <TabsTrigger key={type.id} value={type.id} className="text-secondary-foreground data-[state=active]:bg-primary data-[state=active]:text-primary-foreground">
                {type.name}
              </TabsTrigger>
            ))}
          </TabsList>

          {coffeeData.map((type: CoffeeType) => (
            <TabsContent key={type.id} value={type.id}>
              <div className="mb-8 p-6 bg-background rounded-lg shadow">
                <h3 className="text-2xl font-semibold text-primary mb-3">{type.name}</h3>
                <p className="text-muted-foreground">{type.description}</p>
              </div>
              
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                {type.origins.map((origin: CoffeeOrigin) => (
                  <Card key={origin.id} className="overflow-hidden shadow-lg hover:shadow-xl transition-shadow duration-300 flex flex-col bg-background">
                    <div className="relative w-full h-56">
                      <Image
                        src={origin.imageUrl}
                        alt={origin.name}
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
                    <CardContent className="flex-grow">
                      <CardDescription>{origin.description}</CardDescription>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </TabsContent>
          ))}
        </Tabs>
      </div>
    </section>
  );
}

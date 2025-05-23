
"use client";
import Image from 'next/image';
import { useState, useEffect } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "../ui/card";
import { Input } from "../ui/input";
import { Button } from "../ui/button";
import { coffeeData, CoffeeType, CoffeeOrigin } from '../../data/content';
import { Package, Search as SearchIcon } from 'lucide-react';

const ALL_PRODUCTS_CATEGORY_ID = 'all-products';

interface ProductOriginDisplay extends CoffeeOrigin {
  coffeeTypeName?: string;
}

export function ProductShowcaseSection() {
  const [searchTerm, setSearchTerm] = useState('');
  const [hydrated, setHydrated] = useState(false);

  const categoryDefinitions: Array<CoffeeType | { id: string; name: string; description: string; origins?: never }> = [
    { id: ALL_PRODUCTS_CATEGORY_ID, name: 'All Products', description: 'Browse all our available coffee varieties.' },
    ...coffeeData,
  ];

  const [activeCategory, setActiveCategory] = useState(categoryDefinitions[0]?.id || ALL_PRODUCTS_CATEGORY_ID);

  useEffect(() => {
    setHydrated(true);
  }, []);

  const handleCategoryChange = (categoryId: string) => {
    setActiveCategory(categoryId);
    setSearchTerm(''); // Clear search term when changing categories
  };

  const formatPrice = (price: number, priceUnit: string) => {
    if (!hydrated) return `Loading price...`;

    const parts = priceUnit.split(' ');
    const currencyCode = parts[0];
    const unit = parts.slice(1).join(' ');
    
    try {
      return `${new Intl.NumberFormat(undefined, { style: 'currency', currency: currencyCode, minimumFractionDigits: 2, maximumFractionDigits: 2 }).format(price)}${unit ? ` ${unit}` : ''}`;
    } catch (e) {
      return `${currencyCode} ${price.toFixed(2)}${unit ? ` ${unit}` : ''}`;
    }
  };

  const allCoffeeOrigins: ProductOriginDisplay[] = coffeeData.flatMap(type =>
    type.origins.map(origin => ({
      ...origin,
      coffeeTypeName: type.name,
    }))
  );

  const getFilteredProducts = (): ProductOriginDisplay[] => {
    const sourceProducts = activeCategory === ALL_PRODUCTS_CATEGORY_ID
      ? allCoffeeOrigins
      : coffeeData.find(type => type.id === activeCategory)?.origins || [];

    if (searchTerm === '') {
      return sourceProducts;
    }

    return sourceProducts.filter(origin =>
      origin.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      origin.description.toLowerCase().includes(searchTerm.toLowerCase()) ||
      (activeCategory === ALL_PRODUCTS_CATEGORY_ID && origin.coffeeTypeName && origin.coffeeTypeName.toLowerCase().includes(searchTerm.toLowerCase()))
    );
  };

  const filteredProducts = getFilteredProducts();
  const currentCategoryInfo = categoryDefinitions.find(cat => cat.id === activeCategory);

  return (
    <section id="products" className="py-16 md:py-24 bg-card">
      <div className="container mx-auto px-4 md:px-6">
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold text-primary mb-4">Our Finest Coffees</h2>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            Discover the rich aromas and unique flavors of Indonesian coffee, sourced with care and passion.
          </p>
        </div>

        <div className="flex flex-col md:flex-row gap-8">
          {/* Left Sidebar: Categories */}
          <aside className="md:w-1/4 lg:w-1/5 space-y-4">
            <h3 className="text-xl font-semibold text-primary px-2">Categories</h3>
            <div className="flex flex-col space-y-1">
              {categoryDefinitions.map((cat) => (
                <Button
                  key={cat.id}
                  variant={activeCategory === cat.id ? "default" : "ghost"}
                  className="w-full justify-start text-left h-auto py-2 px-3"
                  onClick={() => handleCategoryChange(cat.id)}
                >
                  {cat.name}
                </Button>
              ))}
            </div>
          </aside>

          {/* Right Content: Search and Products */}
          <main className="md:w-3/4 lg:w-4/5 space-y-6">
            <div className="relative">
              <SearchIcon className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-muted-foreground" />
              <Input
                type="search"
                placeholder={`Search in ${currentCategoryInfo?.name || 'products'}...`}
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="pl-10 w-full bg-background/80 border-border focus:ring-primary"
                aria-label={`Search coffee products in ${currentCategoryInfo?.name}`}
              />
            </div>
            
            {currentCategoryInfo && (
              <div className="mb-8 p-6 bg-background rounded-lg shadow">
                <h3 className="text-2xl font-semibold text-primary mb-3">{currentCategoryInfo.name}</h3>
                <p className="text-muted-foreground">{currentCategoryInfo.description}</p>
              </div>
            )}
              
            {filteredProducts.length > 0 ? (
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                {filteredProducts.map((origin: ProductOriginDisplay) => (
                  <Card key={origin.id + (origin.coffeeTypeName || '')} className="overflow-hidden shadow-lg hover:shadow-xl transition-shadow duration-300 flex flex-col bg-background">
                    <div className="relative w-full h-56">
                      <Image
                        src={origin.imageUrl}
                        alt={`Image of ${origin.name}${activeCategory === ALL_PRODUCTS_CATEGORY_ID && origin.coffeeTypeName ? ` (${origin.coffeeTypeName})` : ''} coffee`}
                        layout="fill"
                        objectFit="cover"
                        data-ai-hint={origin.imageHint}
                      />
                    </div>
                    <CardHeader>
                      <CardTitle className="text-xl text-primary flex items-center gap-2">
                        <Package size={24} /> 
                        {origin.name}
                        {activeCategory === ALL_PRODUCTS_CATEGORY_ID && origin.coffeeTypeName && (
                          <span className="text-xs text-muted-foreground ml-1 whitespace-nowrap">({origin.coffeeTypeName})</span>
                        )}
                      </CardTitle>
                    </CardHeader>
                    <CardContent className="flex-grow flex flex-col justify-between">
                      <CardDescription className="text-sm">{origin.description}</CardDescription>
                      {hydrated && (
                         <p className="text-lg font-semibold text-accent mt-4">
                          {formatPrice(origin.price, origin.priceUnit)}
                        </p>
                      )}
                      {!hydrated && (
                         <p className="text-lg font-semibold text-accent mt-4 animate-pulse">
                           Loading price...
                         </p>
                      )}
                    </CardContent>
                  </Card>
                ))}
              </div>
            ) : (
              <div className="text-center py-10 bg-background rounded-lg shadow">
                <p className="text-lg text-muted-foreground">
                  No {currentCategoryInfo?.name.toLowerCase()} products found matching "{searchTerm}".
                </p>
              </div>
            )}
          </main>
        </div>
      </div>
    </section>
  );
}

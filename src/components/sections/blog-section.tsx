
"use client";

import Image from 'next/image';
import Link from 'next/link';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { getAllBlogPostPreviews, type BlogPostPreview } from '@/data/content';
import { CalendarDays, UserCircle, ArrowRight } from 'lucide-react';
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";

export function BlogSection() {
  const posts = getAllBlogPostPreviews();

  if (!posts || posts.length === 0) {
    return null; 
  }

  return (
    <section id="blog" className="py-16 md:py-24 bg-background">
      <div className="container mx-auto px-4 md:px-6">
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold text-primary mb-4">From Our Blog</h2>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            Insights, stories, and the latest news from the world of Bertera Niaga Global coffee.
          </p>
        </div>

        <Carousel
          opts={{
            align: "start",
            loop: posts.length > 1, // Loop only if there's more than one post
          }}
          className="w-full max-w-xs sm:max-w-xl md:max-w-2xl lg:max-w-4xl xl:max-w-6xl mx-auto" // Adjusted max-width for better responsiveness
        >
          <CarouselContent className="-ml-2 md:-ml-4">
            {posts.map((post) => (
              <CarouselItem key={post.id} className="pl-2 md:pl-4 basis-full sm:basis-1/2 lg:basis-1/3">
                <div className="p-1 h-full">
                  <article className="h-full">
                    <Card className="h-full flex flex-col overflow-hidden shadow-lg hover:shadow-xl transition-shadow duration-300 bg-card">
                      <Link href={`/blog/${post.slug}`} passHref legacyBehavior>
                        <a className="block">
                          <div className="relative w-full h-56">
                            <Image
                              src={post.imageUrl}
                              alt={`Blog post image for ${post.title}`}
                              layout="fill"
                              objectFit="cover"
                              data-ai-hint={post.imageHint}
                              className="transition-transform duration-300 group-hover:scale-105"
                            />
                          </div>
                        </a>
                      </Link>
                      <CardHeader>
                        <Link href={`/blog/${post.slug}`} passHref legacyBehavior>
                          <a>
                            <CardTitle className="text-xl lg:text-2xl text-primary hover:underline line-clamp-2">{post.title}</CardTitle>
                          </a>
                        </Link>
                        <div className="flex items-center gap-4 text-xs text-muted-foreground mt-2">
                          <span className="flex items-center gap-1.5">
                            <CalendarDays size={14} />
                            {post.date}
                          </span>
                          <span className="flex items-center gap-1.5">
                            <UserCircle size={14} />
                            {post.author}
                          </span>
                        </div>
                      </CardHeader>
                      <CardContent className="flex-grow">
                        <CardDescription className="line-clamp-3">{post.excerpt}</CardDescription>
                      </CardContent>
                      <CardFooter>
                        <Link href={`/blog/${post.slug}`} passHref legacyBehavior>
                          <Button variant="link" className="p-0 text-accent hover:text-accent/80">
                            Read More <ArrowRight size={16} className="ml-1" />
                          </Button>
                        </Link>
                      </CardFooter>
                    </Card>
                  </article>
                </div>
              </CarouselItem>
            ))}
          </CarouselContent>
          {posts.length > 1 && ( // Show arrows only if there's more than one post
            <>
              <CarouselPrevious className="hidden sm:flex" /> 
              <CarouselNext className="hidden sm:flex" />
            </>
          )}
        </Carousel>
        
        {posts.length > 3 && ( // This button might need rethinking in a carousel context if all posts are shown
           <div className="text-center mt-12">
            <Link href="/blog" passHref legacyBehavior>
                <Button size="lg" variant="outline" className="bg-primary text-primary-foreground hover:bg-primary/90">
                    View All Posts
                </Button>
            </Link>
           </div>
        )}
      </div>
    </section>
  );
}

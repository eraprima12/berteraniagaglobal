
"use client";

import Image from 'next/image';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogClose } from "@/components/ui/dialog";
import type { BlogPostFull } from '@/data/content';
import { CalendarDays, UserCircle, X } from 'lucide-react';
import { ScrollArea } from '@/components/ui/scroll-area';

interface BlogDetailModalProps {
  post: BlogPostFull | null;
  isOpen: boolean;
  onClose: () => void;
}

export function BlogDetailModal({ post, isOpen, onClose }: BlogDetailModalProps) {
  if (!post) {
    return null;
  }

  return (
    <Dialog open={isOpen} onOpenChange={(open) => { if (!open) onClose(); }}>
      <DialogContent className="sm:max-w-3xl md:max-w-4xl lg:max-w-5xl w-[95vw] p-0 bg-background/90 dark:bg-neutral-900/90 backdrop-blur-lg shadow-2xl rounded-2xl border-border overflow-hidden max-h-[90vh] flex flex-col">
        <DialogHeader className="p-4 sm:p-6 pb-2 relative flex-shrink-0 border-b">
          <DialogTitle className="text-2xl sm:text-3xl font-bold text-primary mb-1 sm:mb-2 line-clamp-3 text-center">{post.title}</DialogTitle>
          <div className="flex flex-wrap items-center justify-center gap-x-4 gap-y-1 text-xs sm:text-sm text-muted-foreground">
            <span className="flex items-center gap-1.5">
              <CalendarDays size={14} />
              {post.date}
            </span>
            <span className="flex items-center gap-1.5">
              <UserCircle size={14} />
              By {post.author}
            </span>
          </div>
          <DialogClose asChild>
            <button 
              onClick={onClose}
              className="absolute right-3 top-3 sm:right-4 sm:top-4 rounded-full p-1.5 text-muted-foreground hover:bg-muted/80 transition-colors"
              aria-label="Close blog post modal"
            >
              <X size={20} />
            </button>
          </DialogClose>
        </DialogHeader>
        
        <ScrollArea className="flex-grow">
          <article className="p-4 sm:p-6 md:p-8">
            <div className="relative w-full h-64 sm:h-72 md:h-80 lg:h-96 mb-6 sm:mb-8 rounded-lg overflow-hidden shadow-md">
              <Image
                src={post.imageUrl}
                alt={`Main image for ${post.title}`}
                layout="fill"
                objectFit="cover"
                data-ai-hint={post.imageHint}
                priority
              />
            </div>

            <div
              className="prose prose-base sm:prose-lg dark:prose-invert max-w-none text-foreground/90 
                         prose-headings:text-primary prose-a:text-accent prose-strong:text-foreground
                         prose-ul:list-disc prose-ul:pl-6 prose-ol:list-decimal prose-ol:pl-6
                         prose-li:my-1"
              dangerouslySetInnerHTML={{ __html: post.content }}
            />
          </article>
        </ScrollArea>
      </DialogContent>
    </Dialog>
  );
}

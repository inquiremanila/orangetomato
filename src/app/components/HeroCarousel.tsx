import { useState, useEffect } from 'react';
import { ChevronLeft, ChevronRight, Star } from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';
import { Story } from '../types';

interface HeroCarouselProps {
  stories: Story[];
  onStoryClick: (storyId: string) => void;
}

export function HeroCarousel({ stories, onStoryClick }: HeroCarouselProps) {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [direction, setDirection] = useState(0);

  // Auto-advance carousel
  useEffect(() => {
    const timer = setInterval(() => {
      handleNext();
    }, 5000);

    return () => clearInterval(timer);
  }, [currentIndex]);

  const handleNext = () => {
    setDirection(1);
    setCurrentIndex((prev) => (prev + 1) % stories.length);
  };

  const handlePrev = () => {
    setDirection(-1);
    setCurrentIndex((prev) => (prev - 1 + stories.length) % stories.length);
  };

  const handleDotClick = (index: number) => {
    setDirection(index > currentIndex ? 1 : -1);
    setCurrentIndex(index);
  };

  const variants = {
    enter: (direction: number) => ({
      x: direction > 0 ? 1000 : -1000,
      opacity: 0,
    }),
    center: {
      x: 0,
      opacity: 1,
    },
    exit: (direction: number) => ({
      x: direction < 0 ? 1000 : -1000,
      opacity: 0,
    }),
  };

  const currentStory = stories[currentIndex];

  return (
    <div className="relative mb-12 overflow-hidden rounded-2xl border border-border bg-card">
      <div className="relative h-[400px] md:h-[500px]">
        <AnimatePresence initial={false} custom={direction}>
          <motion.div
            key={currentIndex}
            custom={direction}
            variants={variants}
            initial="enter"
            animate="center"
            exit="exit"
            transition={{
              x: { type: 'spring', stiffness: 300, damping: 30 },
              opacity: { duration: 0.2 },
            }}
            className="absolute inset-0"
          >
            <div className="relative h-full w-full">
              {/* Background Image */}
              <img
                src={currentStory.coverImage}
                alt={currentStory.title}
                className="h-full w-full object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-r from-black/90 via-black/60 to-transparent"></div>

              {/* Content */}
              <div className="absolute inset-0 flex items-center">
                <div className="container mx-auto px-4">
                  <div className="max-w-2xl">
                    <motion.div
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: 0.2 }}
                    >
                      <div className="mb-4 flex flex-wrap gap-2">
                        {currentStory.genres.map((genre) => (
                          <span
                            key={genre}
                            className="rounded-full bg-orange-500/20 px-3 py-1 text-sm text-orange-500 border border-orange-500/30"
                          >
                            {genre}
                          </span>
                        ))}
                      </div>

                      <h1 className="mb-4 text-4xl md:text-6xl font-bold text-white">
                        {currentStory.title}
                      </h1>

                      <p className="mb-4 text-lg text-gray-300">
                        by {currentStory.author}
                      </p>

                      <p className="mb-6 line-clamp-3 text-gray-200">
                        {currentStory.description}
                      </p>

                      <div className="mb-6 flex items-center gap-4 text-white">
                        <div className="flex items-center gap-1">
                          <Star className="h-5 w-5 fill-orange-500 text-orange-500" />
                          <span className="font-semibold">{currentStory.rating}</span>
                        </div>
                        <div className="h-4 w-px bg-gray-400"></div>
                        <span>{currentStory.totalChapters} Chapters</span>
                        <div className="h-4 w-px bg-gray-400"></div>
                        <span className={`capitalize ${
                          currentStory.status === 'ongoing'
                            ? 'text-green-400'
                            : currentStory.status === 'completed'
                            ? 'text-blue-400'
                            : 'text-yellow-400'
                        }`}>
                          {currentStory.status}
                        </span>
                      </div>

                      <motion.button
                        whileHover={{ scale: 1.05 }}
                        whileTap={{ scale: 0.95 }}
                        onClick={() => onStoryClick(currentStory.id)}
                        className="rounded-lg bg-gradient-to-r from-orange-500 to-red-600 px-8 py-3 text-white hover:from-orange-600 hover:to-red-700 shadow-lg"
                      >
                        Read Now
                      </motion.button>
                    </motion.div>
                  </div>
                </div>
              </div>
            </div>
          </motion.div>
        </AnimatePresence>

        {/* Navigation Arrows */}
        <button
          onClick={handlePrev}
          className="absolute left-4 top-1/2 -translate-y-1/2 rounded-full bg-black/50 p-2 text-white backdrop-blur-sm hover:bg-black/70 transition-colors"
        >
          <ChevronLeft className="h-6 w-6" />
        </button>
        <button
          onClick={handleNext}
          className="absolute right-4 top-1/2 -translate-y-1/2 rounded-full bg-black/50 p-2 text-white backdrop-blur-sm hover:bg-black/70 transition-colors"
        >
          <ChevronRight className="h-6 w-6" />
        </button>

        {/* Dots Indicator */}
        <div className="absolute bottom-4 left-1/2 -translate-x-1/2 flex gap-2">
          {stories.map((_, index) => (
            <button
              key={index}
              onClick={() => handleDotClick(index)}
              className={`h-2 rounded-full transition-all ${
                index === currentIndex
                  ? 'w-8 bg-orange-500'
                  : 'w-2 bg-white/50 hover:bg-white/75'
              }`}
            />
          ))}
        </div>
      </div>
    </div>
  );
}

import { useRef } from 'react';
import { ChevronLeft, ChevronRight, Star, BookOpen } from 'lucide-react';
import { motion } from 'motion/react';
import { Story, UserProgress } from '../types';

interface ScrollableStoryRowProps {
  stories: Story[];
  progress?: UserProgress[];
  onStoryClick: (storyId: string) => void;
}

export function ScrollableStoryRow({ stories, progress, onStoryClick }: ScrollableStoryRowProps) {
  const scrollContainerRef = useRef<HTMLDivElement>(null);

  const scroll = (direction: 'left' | 'right') => {
    if (scrollContainerRef.current) {
      const scrollAmount = 300;
      scrollContainerRef.current.scrollBy({
        left: direction === 'left' ? -scrollAmount : scrollAmount,
        behavior: 'smooth',
      });
    }
  };

  const getProgress = (storyId: string) =>
    progress?.find((p) => p.storyId === storyId);

  return (
    <div className="relative group">
      {/* Scroll Buttons */}
      <button
        onClick={() => scroll('left')}
        className="absolute left-0 top-1/2 -translate-y-1/2 z-10 rounded-full bg-black/50 p-2 text-white backdrop-blur-sm opacity-0 group-hover:opacity-100 transition-opacity hover:bg-black/70 disabled:opacity-0"
      >
        <ChevronLeft className="h-5 w-5" />
      </button>
      <button
        onClick={() => scroll('right')}
        className="absolute right-0 top-1/2 -translate-y-1/2 z-10 rounded-full bg-black/50 p-2 text-white backdrop-blur-sm opacity-0 group-hover:opacity-100 transition-opacity hover:bg-black/70"
      >
        <ChevronRight className="h-5 w-5" />
      </button>

      {/* Scrollable Container */}
      <div
        ref={scrollContainerRef}
        className="flex gap-4 overflow-x-auto scrollbar-hide pb-4 snap-x snap-mandatory"
        style={{
          scrollbarWidth: 'none',
          msOverflowStyle: 'none',
        }}
      >
        {stories.map((story, index) => {
          const progressData = getProgress(story.id);
          const progressPercentage = progressData
            ? Math.round((progressData.currentChapter / progressData.totalChapters) * 100)
            : 0;

          return (
            <motion.div
              key={story.id}
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: index * 0.05 }}
              className="flex-shrink-0 w-[180px] snap-start"
            >
              <motion.div
                whileHover={{ y: -8, transition: { duration: 0.2 } }}
                onClick={() => onStoryClick(story.id)}
                className="group/card cursor-pointer"
              >
                <div className="relative overflow-hidden rounded-lg border border-border bg-card transition-all hover:border-orange-500/50 hover:shadow-lg hover:shadow-orange-500/10">
                  {/* Cover Image */}
                  <div className="relative aspect-[2/3] overflow-hidden bg-secondary">
                    <img
                      src={story.coverImage}
                      alt={story.title}
                      className="h-full w-full object-cover transition-transform duration-300 group-hover/card:scale-110"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent"></div>

                    {/* Status Badge */}
                    <div className="absolute right-2 top-2">
                      <span className={`rounded-full px-2 py-0.5 text-xs ${
                        story.status === 'ongoing'
                          ? 'bg-green-500/20 text-green-400 border border-green-500/30'
                          : story.status === 'completed'
                          ? 'bg-blue-500/20 text-blue-400 border border-blue-500/30'
                          : 'bg-yellow-500/20 text-yellow-400 border border-yellow-500/30'
                      }`}>
                        {story.status}
                      </span>
                    </div>

                    {/* Progress Bar */}
                    {progressData && (
                      <div className="absolute bottom-0 left-0 right-0 p-2">
                        <div className="mb-1 flex items-center justify-between text-xs text-white">
                          <span>{progressPercentage}%</span>
                        </div>
                        <div className="h-1 overflow-hidden rounded-full bg-black/50">
                          <motion.div
                            initial={{ width: 0 }}
                            animate={{ width: `${progressPercentage}%` }}
                            transition={{ delay: index * 0.05 + 0.3, duration: 0.8 }}
                            className="h-full bg-gradient-to-r from-orange-500 to-red-600"
                          ></motion.div>
                        </div>
                      </div>
                    )}
                  </div>

                  {/* Content */}
                  <div className="p-3">
                    <h3 className="mb-1 line-clamp-2 text-sm font-medium">{story.title}</h3>
                    <p className="mb-2 text-xs text-muted-foreground line-clamp-1">{story.author}</p>

                    {/* Stats */}
                    <div className="flex items-center gap-3 text-xs text-muted-foreground">
                      <div className="flex items-center gap-1">
                        <Star className="h-3 w-3 fill-orange-500 text-orange-500" />
                        <span>{story.rating}</span>
                      </div>
                      <div className="flex items-center gap-1">
                        <BookOpen className="h-3 w-3" />
                        <span>{story.totalChapters}</span>
                      </div>
                    </div>
                  </div>
                </div>
              </motion.div>
            </motion.div>
          );
        })}
      </div>

      <style>{`
        .scrollbar-hide::-webkit-scrollbar {
          display: none;
        }
      `}</style>
    </div>
  );
}

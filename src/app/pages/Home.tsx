import { TrendingUp, Clock, Sparkles, ChevronLeft, ChevronRight } from 'lucide-react';
import { motion } from 'motion/react';
import { Story, UserProgress } from '../types';
import { StoryCard } from '../components/StoryCard';
import { HeroCarousel } from '../components/HeroCarousel';
import { ScrollableStoryRow } from '../components/ScrollableStoryRow';
import { useState, useMemo } from 'react';

interface HomeProps {
  stories: Story[];
  userProgress: UserProgress[];
  onStoryClick: (storyId: string) => void;
}

export function Home({ stories, userProgress, onStoryClick }: HomeProps) {
  const [currentPage, setCurrentPage] = useState(1);
  const storiesPerPage = 10;

  // Featured stories for carousel (top 5 rated)
  const featuredStories = useMemo(
    () => stories.sort((a, b) => b.rating - a.rating).slice(0, 5),
    [stories]
  );

  const continueReading = useMemo(
    () =>
      stories
        .filter((story) => userProgress.some((p) => p.storyId === story.id))
        .slice(0, 10),
    [stories, userProgress]
  );

  // Randomize all stories for recommended
  const recommended = useMemo(() => {
    const shuffled = [...stories].sort(() => Math.random() - 0.5);
    return shuffled;
  }, [stories]);

  const totalPages = Math.ceil(recommended.length / storiesPerPage);
  const startIndex = (currentPage - 1) * storiesPerPage;
  const endIndex = startIndex + storiesPerPage;
  const currentStories = recommended.slice(startIndex, endIndex);

  const trending = useMemo(
    () =>
      stories
        .sort((a, b) => b.totalRatings - a.totalRatings)
        .slice(0, 10),
    [stories]
  );

  const getProgress = (storyId: string) =>
    userProgress.find((p) => p.storyId === storyId);

  const handlePageChange = (page: number) => {
    setCurrentPage(page);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  // Generate page numbers for pagination
  const getPageNumbers = () => {
    const pages = [];
    const maxVisible = 5;

    if (totalPages <= maxVisible) {
      for (let i = 1; i <= totalPages; i++) {
        pages.push(i);
      }
    } else {
      if (currentPage <= 3) {
        for (let i = 1; i <= 4; i++) {
          pages.push(i);
        }
        pages.push('...');
        pages.push(totalPages);
      } else if (currentPage >= totalPages - 2) {
        pages.push(1);
        pages.push('...');
        for (let i = totalPages - 3; i <= totalPages; i++) {
          pages.push(i);
        }
      } else {
        pages.push(1);
        pages.push('...');
        pages.push(currentPage - 1);
        pages.push(currentPage);
        pages.push(currentPage + 1);
        pages.push('...');
        pages.push(totalPages);
      }
    }

    return pages;
  };

  return (
    <div className="container mx-auto px-4 py-8">
      {/* Hero Carousel */}
      <HeroCarousel stories={featuredStories} onStoryClick={onStoryClick} />

      {/* Continue Reading - Only show if user has progress */}
      {continueReading.length > 0 && (
        <section className="mb-12">
          <div className="mb-6 flex items-center gap-2">
            <Clock className="h-6 w-6 text-orange-500" />
            <h2>Continue Reading</h2>
          </div>
          <ScrollableStoryRow
            stories={continueReading}
            progress={userProgress}
            onStoryClick={onStoryClick}
          />
        </section>
      )}

      {/* Trending */}
      <section className="mb-12">
        <div className="mb-6 flex items-center gap-2">
          <TrendingUp className="h-6 w-6 text-orange-500" />
          <h2>Trending Now</h2>
        </div>
        <ScrollableStoryRow
          stories={trending}
          progress={userProgress}
          onStoryClick={onStoryClick}
        />
      </section>

      {/* Recommended */}
      <section className="mb-12">
        <div className="mb-6 flex items-center gap-2">
          <Sparkles className="h-6 w-6 text-orange-500" />
          <h2>Recommended for You</h2>
        </div>
        <div className="grid grid-cols-2 gap-4 sm:gap-6 md:grid-cols-4 lg:grid-cols-5">
          {currentStories.map((story, index) => (
            <StoryCard
              key={story.id}
              story={story}
              progress={getProgress(story.id)}
              onClick={() => onStoryClick(story.id)}
              index={index}
            />
          ))}
        </div>

        {/* Pagination */}
        {totalPages > 1 && (
          <div className="mt-8 flex items-center justify-center gap-2">
            {/* Previous Button */}
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={() => handlePageChange(currentPage - 1)}
              disabled={currentPage === 1}
              className="flex items-center gap-1 rounded-lg border border-border px-3 py-2 text-sm hover:border-orange-500 hover:text-orange-500 disabled:opacity-50 disabled:cursor-not-allowed disabled:hover:border-border disabled:hover:text-foreground transition-colors"
            >
              <ChevronLeft className="h-4 w-4" />
              <span className="hidden sm:inline">Previous</span>
            </motion.button>

            {/* Page Numbers */}
            <div className="flex gap-2">
              {getPageNumbers().map((page, index) =>
                page === '...' ? (
                  <span key={`ellipsis-${index}`} className="px-3 py-2 text-sm">
                    ...
                  </span>
                ) : (
                  <motion.button
                    key={page}
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    onClick={() => handlePageChange(page as number)}
                    className={`min-w-[2.5rem] rounded-lg px-3 py-2 text-sm transition-colors ${
                      currentPage === page
                        ? 'bg-gradient-to-r from-orange-500 to-red-600 text-white'
                        : 'border border-border hover:border-orange-500 hover:text-orange-500'
                    }`}
                  >
                    {page}
                  </motion.button>
                )
              )}
            </div>

            {/* Next Button */}
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={() => handlePageChange(currentPage + 1)}
              disabled={currentPage === totalPages}
              className="flex items-center gap-1 rounded-lg border border-border px-3 py-2 text-sm hover:border-orange-500 hover:text-orange-500 disabled:opacity-50 disabled:cursor-not-allowed disabled:hover:border-border disabled:hover:text-foreground transition-colors"
            >
              <span className="hidden sm:inline">Next</span>
              <ChevronRight className="h-4 w-4" />
            </motion.button>
          </div>
        )}
      </section>
    </div>
  );
}
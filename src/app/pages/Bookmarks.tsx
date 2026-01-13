import { Bookmark as BookmarkIcon } from 'lucide-react';
import { motion } from 'motion/react';
import { Story, UserProgress } from '../types';
import { StoryCard } from '../components/StoryCard';

interface BookmarksProps {
  bookmarkedStories: Story[];
  userProgress: UserProgress[];
  onStoryClick: (storyId: string) => void;
}

export function Bookmarks({ bookmarkedStories, userProgress, onStoryClick }: BookmarksProps) {
  const getProgress = (storyId: string) =>
    userProgress.find((p) => p.storyId === storyId);

  return (
    <div className="container mx-auto px-4 py-8">
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        className="mb-8"
      >
        <div className="flex items-center gap-2 mb-2">
          <BookmarkIcon className="h-8 w-8 text-orange-500" />
          <h1>My Bookmarks</h1>
        </div>
        <p className="text-muted-foreground">
          {bookmarkedStories.length} {bookmarkedStories.length === 1 ? 'story' : 'stories'} saved
        </p>
      </motion.div>

      {bookmarkedStories.length > 0 ? (
        <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
          {bookmarkedStories.map((story, index) => (
            <StoryCard
              key={story.id}
              story={story}
              progress={getProgress(story.id)}
              onClick={() => onStoryClick(story.id)}
              index={index}
            />
          ))}
        </div>
      ) : (
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          className="flex flex-col items-center justify-center py-20 text-center"
        >
          <div className="mb-4 flex h-20 w-20 items-center justify-center rounded-full bg-secondary">
            <BookmarkIcon className="h-10 w-10 text-muted-foreground" />
          </div>
          <h2 className="mb-2">No bookmarks yet</h2>
          <p className="text-muted-foreground">
            Start bookmarking stories to keep track of your favorites!
          </p>
        </motion.div>
      )}
    </div>
  );
}

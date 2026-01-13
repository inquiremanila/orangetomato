import { Star, BookOpen, Eye } from 'lucide-react';
import { motion } from 'motion/react';
import { Story, UserProgress } from '../types';

interface StoryCardProps {
  story: Story;
  progress?: UserProgress;
  onClick: () => void;
  index: number;
}

export function StoryCard({ story, progress, onClick, index = 0 }: StoryCardProps) {
  const progressPercentage = progress
    ? Math.round((progress.currentChapter / progress.totalChapters) * 100)
    : 0;

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: index * 0.05 }}
      className="h-full"
    >
      <motion.div
        whileHover={{ y: -8, transition: { duration: 0.2 } }}
        onClick={onClick}
        className="group cursor-pointer h-full flex flex-col"
      >
        <div className="relative overflow-hidden rounded-lg border border-border bg-card transition-all hover:border-orange-500/50 hover:shadow-lg hover:shadow-orange-500/10 flex flex-col h-full">
          {/* Cover Image */}
          <div className="relative aspect-[2/3] overflow-hidden bg-secondary flex-shrink-0">
            <img
              src={story.coverImage}
              alt={story.title}
              className="h-full w-full object-cover transition-transform duration-300 group-hover:scale-110"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent"></div>

            {/* Status Badge */}
            <div className="absolute right-2 top-2">
              <span
                className={`rounded-full px-2 py-0.5 text-xs ${
                  story.status === 'ongoing'
                    ? 'bg-green-500/20 text-green-400 border border-green-500/30'
                    : story.status === 'completed'
                    ? 'bg-blue-500/20 text-blue-400 border border-blue-500/30'
                    : 'bg-yellow-500/20 text-yellow-400 border border-yellow-500/30'
                }`}
              >
                {story.status}
              </span>
            </div>

            {/* Progress Bar */}
            {progress && (
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
          <div className="p-3 flex-grow flex flex-col">
            <h3 className="mb-1 line-clamp-2 text-sm font-medium min-h-[2.5rem]">{story.title}</h3>
            <p className="mb-2 text-xs text-muted-foreground line-clamp-1">{story.author}</p>

            {/* Stats */}
            <div className="flex items-center gap-3 text-xs text-muted-foreground mt-auto">
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
}
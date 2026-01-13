import { useState } from 'react';
import { Star, Bookmark, BookOpen, Calendar, User as UserIcon, ArrowLeft } from 'lucide-react';
import { motion } from 'motion/react';
import { Story, Comment, UserProgress } from '../types';
import { CommentSection } from '../components/CommentSection';
import { ShareButtons } from '../components/ShareButtons';

interface StoryDetailProps {
  story: Story;
  isBookmarked: boolean;
  userRating?: number;
  comments: Comment[];
  progress?: UserProgress;
  onBack: () => void;
  onToggleBookmark: () => void;
  onRate: (rating: number) => void;
  onReadChapter: (chapterNum: number) => void;
  onAddComment: (content: string) => void;
}

export function StoryDetail({
  story,
  isBookmarked,
  userRating,
  comments,
  progress,
  onBack,
  onToggleBookmark,
  onRate,
  onReadChapter,
  onAddComment,
}: StoryDetailProps) {
  const [hoveredRating, setHoveredRating] = useState(0);

  const chapters = Array.from({ length: Math.min(story.totalChapters, 20) }, (_, i) => ({
    number: i + 1,
    title: `Chapter ${i + 1}`,
  }));

  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <div className="relative h-[400px] overflow-hidden">
        <img
          src={story.coverImage}
          alt={story.title}
          className="h-full w-full object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-background via-background/80 to-background/20"></div>

        <div className="absolute inset-0 flex items-end">
          <div className="container mx-auto px-4 pb-8">
            <motion.button
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              whileHover={{ scale: 1.05 }}
              onClick={onBack}
              className="mb-4 flex items-center gap-2 text-muted-foreground hover:text-foreground"
            >
              <ArrowLeft className="h-4 w-4" />
              Back
            </motion.button>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="flex flex-col gap-4 md:flex-row md:items-end"
            >
              <img
                src={story.coverImage}
                alt={story.title}
                className="h-48 w-32 rounded-lg border-2 border-border object-cover shadow-lg"
              />

              <div className="flex-1">
                <h1 className="mb-2">{story.title}</h1>
                <p className="mb-3 text-muted-foreground">by {story.author}</p>

                <div className="flex flex-wrap gap-2 mb-4">
                  {story.genres.map((genre) => (
                    <span
                      key={genre}
                      className="rounded-full bg-orange-500/20 px-3 py-1 text-sm text-orange-500 border border-orange-500/30"
                    >
                      {genre}
                    </span>
                  ))}
                </div>

                <div className="flex flex-wrap items-center gap-4">
                  <div className="flex items-center gap-1">
                    <Star className="h-5 w-5 fill-orange-500 text-orange-500" />
                    <span>{story.rating}</span>
                    <span className="text-sm text-muted-foreground">
                      ({story.totalRatings} ratings)
                    </span>
                  </div>
                  <div className="flex items-center gap-1">
                    <BookOpen className="h-5 w-5 text-muted-foreground" />
                    <span>{story.totalChapters} chapters</span>
                  </div>
                  <div className="flex items-center gap-1">
                    <span className={`rounded-full px-2 py-1 text-sm ${
                      story.status === 'ongoing'
                        ? 'bg-green-500/20 text-green-400'
                        : story.status === 'completed'
                        ? 'bg-blue-500/20 text-blue-400'
                        : 'bg-yellow-500/20 text-yellow-400'
                    }`}>
                      {story.status}
                    </span>
                  </div>
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </div>

      <div className="container mx-auto px-4 py-8">
        <div className="grid grid-cols-1 gap-8 lg:grid-cols-3">
          {/* Main Content */}
          <div className="lg:col-span-2 space-y-8">
            {/* Actions */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="flex gap-4"
            >
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={() => onReadChapter(progress?.currentChapter || 1)}
                className="flex-1 rounded-lg bg-gradient-to-r from-orange-500 to-red-600 py-3 text-white hover:from-orange-600 hover:to-red-700"
              >
                {progress ? `Continue Reading (Ch. ${progress.currentChapter})` : 'Start Reading'}
              </motion.button>
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={onToggleBookmark}
                className={`rounded-lg border p-3 ${
                  isBookmarked
                    ? 'border-orange-500 bg-orange-500/10 text-orange-500'
                    : 'border-border hover:bg-secondary'
                }`}
              >
                <Bookmark className={isBookmarked ? 'fill-current' : ''} />
              </motion.button>
            </motion.div>

            {/* Description */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.1 }}
              className="rounded-lg border border-border bg-card p-6"
            >
              <h3 className="mb-4">Synopsis</h3>
              <p className="text-foreground/90 leading-relaxed">{story.description}</p>
            </motion.div>

            {/* Rate this story */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 }}
              className="rounded-lg border border-border bg-card p-6"
            >
              <h3 className="mb-4">Rate this story</h3>
              <div className="flex gap-2">
                {[1, 2, 3, 4, 5].map((rating) => (
                  <motion.button
                    key={rating}
                    whileHover={{ scale: 1.2 }}
                    whileTap={{ scale: 0.9 }}
                    onMouseEnter={() => setHoveredRating(rating)}
                    onMouseLeave={() => setHoveredRating(0)}
                    onClick={() => onRate(rating)}
                  >
                    <Star
                      className={`h-8 w-8 transition-colors ${
                        rating <= (hoveredRating || userRating || 0)
                          ? 'fill-orange-500 text-orange-500'
                          : 'text-muted-foreground'
                      }`}
                    />
                  </motion.button>
                ))}
                {userRating && (
                  <span className="ml-2 text-muted-foreground">
                    You rated this {userRating} stars
                  </span>
                )}
              </div>
            </motion.div>

            {/* Comments */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3 }}
            >
              <CommentSection
                comments={comments.filter((c) => c.storyId === story.id)}
                onAddComment={onAddComment}
                title={`Comments (${comments.filter((c) => c.storyId === story.id).length})`}
              />
            </motion.div>
          </div>

          {/* Sidebar */}
          <div className="space-y-6">
            {/* Story Info */}
            <motion.div
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.1 }}
              className="rounded-lg border border-border bg-card p-6"
            >
              <h3 className="mb-4">Story Info</h3>
              <div className="space-y-3 text-sm">
                <div className="flex items-center gap-2">
                  <UserIcon className="h-4 w-4 text-muted-foreground" />
                  <span className="text-muted-foreground">Author:</span>
                  <span>{story.author}</span>
                </div>
                <div className="flex items-center gap-2">
                  <Calendar className="h-4 w-4 text-muted-foreground" />
                  <span className="text-muted-foreground">Published:</span>
                  <span>{new Date(story.createdAt).toLocaleDateString()}</span>
                </div>
                <div className="flex items-center gap-2">
                  <Calendar className="h-4 w-4 text-muted-foreground" />
                  <span className="text-muted-foreground">Updated:</span>
                  <span>{new Date(story.updatedAt).toLocaleDateString()}</span>
                </div>
              </div>
            </motion.div>

            {/* Chapters List */}
            <motion.div
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.2 }}
              className="rounded-lg border border-border bg-card p-6"
            >
              <h3 className="mb-4">Chapters</h3>
              <div className="space-y-2 max-h-96 overflow-y-auto">
                {chapters.map((chapter, index) => (
                  <motion.button
                    key={chapter.number}
                    initial={{ opacity: 0, x: -10 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: index * 0.02 }}
                    whileHover={{ x: 4 }}
                    onClick={() => onReadChapter(chapter.number)}
                    className={`w-full rounded-lg border p-3 text-left transition-colors ${
                      progress?.currentChapter === chapter.number
                        ? 'border-orange-500 bg-orange-500/10 text-orange-500'
                        : 'border-border hover:bg-secondary'
                    }`}
                  >
                    <div className="flex items-center justify-between">
                      <span>{chapter.title}</span>
                      {progress && chapter.number <= progress.currentChapter && (
                        <span className="text-xs text-muted-foreground">Read</span>
                      )}
                    </div>
                  </motion.button>
                ))}
                {story.totalChapters > 20 && (
                  <div className="pt-2 text-center text-sm text-muted-foreground">
                    + {story.totalChapters - 20} more chapters
                  </div>
                )}
              </div>
            </motion.div>

            {/* Share Buttons */}
            <motion.div
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.3 }}
              className="rounded-lg border border-border bg-card p-6"
            >
              <h3 className="mb-4">Share</h3>
              <ShareButtons story={story} />
            </motion.div>
          </div>
        </div>
      </div>
    </div>
  );
}
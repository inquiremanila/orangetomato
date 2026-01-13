import { ArrowLeft, ChevronLeft, ChevronRight, Settings as SettingsIcon, Star, Eye, EyeOff, AlertCircle } from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';
import { Chapter, Comment, Story, User, ParagraphHighlight } from '../types';
import { CommentSection } from '../components/CommentSection';
import { ShareButtons } from '../components/ShareButtons';
import { SEOHead } from '../components/SEOHead';
import { useState, useRef, useEffect } from 'react';
import { toast } from 'sonner';
import { playCommentSound } from '../utils/sounds';

interface ReaderProps {
  chapter: Chapter;
  story: Story;
  totalChapters: number;
  comments: Comment[];
  user: User | null;
  paragraphHighlights: ParagraphHighlight[];
  onBack: () => void;
  onNavigateChapter: (chapterNum: number) => void;
  onAddComment: (content: string) => void;
  onAddParagraphHighlight: (highlight: Omit<ParagraphHighlight, 'id' | 'createdAt'>) => void;
  onRemoveParagraphHighlight: (highlightId: string) => void;
}

interface ParagraphCommentData {
  paragraphIndex: number;
  paragraphText: string;
}

export function Reader({
  chapter,
  story,
  totalChapters,
  comments,
  user,
  paragraphHighlights,
  onBack,
  onNavigateChapter,
  onAddComment,
  onAddParagraphHighlight,
  onRemoveParagraphHighlight,
}: ReaderProps) {
  const [fontSize, setFontSize] = useState(18);
  const [showSettings, setShowSettings] = useState(false);
  const [showHighlights, setShowHighlights] = useState(true);
  const [paragraphCommentModal, setParagraphCommentModal] = useState<ParagraphCommentData | null>(null);
  const [paragraphComment, setParagraphComment] = useState('');
  const [isCorrection, setIsCorrection] = useState(false);
  const [showBugReport, setShowBugReport] = useState(false);
  const [bugReportText, setBugReportText] = useState('');
  const contentRef = useRef<HTMLDivElement>(null);

  // Disable text selection copy and right-click for protection
  useEffect(() => {
    const handleCopy = (e: ClipboardEvent) => {
      e.preventDefault();
      toast.error('Copying text is disabled to protect content');
    };

    const handleContextMenu = (e: MouseEvent) => {
      e.preventDefault();
      toast.error('Right-click is disabled to protect content');
    };

    const handleKeyDown = (e: KeyboardEvent) => {
      // Prevent Ctrl+C, Ctrl+U, F12, and other shortcuts
      if (
        (e.ctrlKey && (e.key === 'c' || e.key === 'u' || e.key === 's')) ||
        e.key === 'F12' ||
        (e.ctrlKey && e.shiftKey && (e.key === 'I' || e.key === 'J' || e.key === 'C'))
      ) {
        e.preventDefault();
        toast.error('This action is disabled to protect content');
      }
    };

    const handleDragStart = (e: DragEvent) => {
      e.preventDefault();
    };

    document.addEventListener('copy', handleCopy);
    document.addEventListener('contextmenu', handleContextMenu);
    document.addEventListener('keydown', handleKeyDown);
    document.addEventListener('dragstart', handleDragStart);

    return () => {
      document.removeEventListener('copy', handleCopy);
      document.removeEventListener('contextmenu', handleContextMenu);
      document.removeEventListener('keydown', handleKeyDown);
      document.removeEventListener('dragstart', handleDragStart);
    };
  }, []);

  const handleParagraphCommentSubmit = () => {
    if (!paragraphCommentModal || !paragraphComment.trim() || !user) {
      toast.error('Please enter a comment');
      return;
    }

    onAddParagraphHighlight({
      chapterId: chapter.id,
      userId: user.id,
      username: user.username,
      paragraphIndex: paragraphCommentModal.paragraphIndex,
      paragraphText: paragraphCommentModal.paragraphText,
      comment: paragraphComment.trim(),
      isCorrection,
    });

    setParagraphComment('');
    setIsCorrection(false);
    setParagraphCommentModal(null);
    playCommentSound();
    toast.success('Thank you for your feedback!');
  };

  const handleStarClick = (paragraphIndex: number, event: React.MouseEvent) => {
    event.stopPropagation();
    if (!user) {
      toast.error('Please sign in to highlight paragraphs');
      return;
    }

    const paragraphText = chapter.content.split('\n\n')[paragraphIndex];
    const existingHighlight = paragraphHighlights.find(
      h => h.chapterId === chapter.id && h.userId === user.id && h.paragraphIndex === paragraphIndex
    );

    if (existingHighlight) {
      onRemoveParagraphHighlight(existingHighlight.id);
      toast.success('Highlight removed!');
    } else {
      setParagraphCommentModal({ paragraphIndex, paragraphText });
    }
  };

  const isParagraphHighlighted = (paragraphIndex: number) => {
    if (!user) return false;
    return paragraphHighlights.some(
      h => h.chapterId === chapter.id && h.userId === user.id && h.paragraphIndex === paragraphIndex
    );
  };

  const handleBugReportSubmit = () => {
    if (!bugReportText.trim()) {
      toast.error('Please describe the bug');
      return;
    }

    // In a real app, this would send to backend/dashboard
    console.log('Bug report:', bugReportText);
    toast.success('Bug report submitted! Thank you for helping us improve.');
    setBugReportText('');
    setShowBugReport(false);
    playCommentSound();
  };

  // Generate canonical URL for SEO
  const generateSlug = (title: string) => {
    return title.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/(^-|-$)/g, '');
  };

  const storySlug = generateSlug(story.title);
  const chapterSlug = generateSlug(chapter.title);
  const canonical = `${window.location.origin}/${storySlug}/${chapterSlug}`;

  return (
    <div className="min-h-screen select-none">
      {/* SEO Head */}
      <SEOHead
        title={`${chapter.title} - ${story.title}`}
        description={`Read Chapter ${chapter.chapterNumber}: ${chapter.title} from ${story.title} by ${story.author} on Orange Tomato`}
        keywords={`${story.genre}, light novel, ${story.title}, ${story.author}, chapter ${chapter.chapterNumber}`}
        author={story.author}
        canonical={canonical}
        ogType="article"
        publishedTime={chapter.publishedAt}
      />

      {/* Header */}
      <motion.div
        initial={{ y: -100 }}
        animate={{ y: 0 }}
        className="sticky top-0 z-50 border-b border-border/40 bg-background/95 backdrop-blur"
      >
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-4">
              <motion.button
                whileHover={{ scale: 1.05 }}
                onClick={onBack}
                className="flex items-center gap-2 text-muted-foreground hover:text-foreground"
              >
                <ArrowLeft className="h-4 w-4" />
                <span className="hidden sm:inline">Back</span>
              </motion.button>
              <div>
                <div className="text-sm text-muted-foreground">{story.title}</div>
                <div>{chapter.title}</div>
              </div>
            </div>

            <div className="flex items-center gap-2">
              <motion.button
                whileHover={{ scale: 1.05 }}
                onClick={() => setShowHighlights(!showHighlights)}
                className="rounded-lg p-2 hover:bg-secondary"
                title={showHighlights ? 'Hide highlights' : 'Show highlights'}
              >
                {showHighlights ? <Eye className="h-5 w-5" /> : <EyeOff className="h-5 w-5" />}
              </motion.button>
              <motion.button
                whileHover={{ scale: 1.05 }}
                onClick={() => setShowSettings(!showSettings)}
                className="rounded-lg p-2 hover:bg-secondary"
              >
                <SettingsIcon className="h-5 w-5" />
              </motion.button>
            </div>
          </div>

          {/* Settings Panel */}
          {showSettings && (
            <motion.div
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: 'auto' }}
              className="mt-4 rounded-lg border border-border bg-card p-4"
            >
              <div className="flex items-center justify-between">
                <span>Font Size</span>
                <div className="flex items-center gap-2">
                  <button
                    onClick={() => setFontSize(Math.max(14, fontSize - 2))}
                    className="rounded-lg bg-secondary px-3 py-1 hover:bg-secondary/80"
                  >
                    A-
                  </button>
                  <span className="w-12 text-center">{fontSize}px</span>
                  <button
                    onClick={() => setFontSize(Math.min(24, fontSize + 2))}
                    className="rounded-lg bg-secondary px-3 py-1 hover:bg-secondary/80"
                  >
                    A+
                  </button>
                </div>
              </div>
            </motion.div>
          )}
        </div>
      </motion.div>

      {/* Content */}
      <div className="container mx-auto max-w-4xl px-4 py-12">
        <motion.article
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="rounded-lg border border-border bg-card p-8 md:p-12"
        >
          <div className="mb-4 text-center">
            <div className="mb-2 text-sm text-muted-foreground">
              Chapter {chapter.chapterNumber} of {totalChapters}
            </div>
            <h1 className="mb-8">{chapter.title}</h1>
          </div>

          <div
            ref={contentRef}
            className="prose prose-invert max-w-none leading-relaxed"
            style={{ fontSize: `${fontSize}px`, userSelect: 'none' }}
          >
            {chapter.content.split('\n\n').map((paragraph, index) => {
              const isHighlighted = isParagraphHighlighted(index);
              return (
                <div key={index} className="relative group mb-6 pr-8">
                  <motion.p
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: index * 0.05 }}
                    className={`${
                      showHighlights && isHighlighted 
                        ? 'bg-orange-500/10 border-l-4 border-orange-500 pl-4 -ml-4 py-2' 
                        : ''
                    }`}
                  >
                    {paragraph}
                  </motion.p>
                  <motion.button
                    whileHover={{ scale: 1.2 }}
                    whileTap={{ scale: 0.9 }}
                    onClick={(e) => handleStarClick(index, e)}
                    className="absolute -right-6 top-0 opacity-0 group-hover:opacity-100 transition-opacity"
                    title={isHighlighted ? "Click to remove highlight" : "Click to highlight paragraph"}
                  >
                    <Star
                      className={`h-4 w-4 ${
                        isHighlighted 
                          ? 'fill-orange-500 text-orange-500' 
                          : 'text-muted-foreground hover:text-orange-500'
                      }`}
                    />
                  </motion.button>
                </div>
              );
            })}
          </div>
        </motion.article>

        {/* Inline Bug Report Button */}
        <div className="mt-4 flex justify-end">
          <button
            onClick={() => setShowBugReport(true)}
            className="text-sm text-muted-foreground hover:text-orange-500 underline decoration-dotted flex items-center gap-1"
          >
            <AlertCircle className="h-3 w-3" />
            Report a bug
          </button>
        </div>

        {/* Bug Report Modal */}
        <AnimatePresence>
          {showBugReport && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 p-4"
              onClick={() => setShowBugReport(false)}
            >
              <motion.div
                initial={{ scale: 0.9, y: 20 }}
                animate={{ scale: 1, y: 0 }}
                exit={{ scale: 0.9, y: 20 }}
                className="w-full max-w-md rounded-lg border border-border bg-card p-6"
                onClick={(e) => e.stopPropagation()}
              >
                <h3 className="mb-4 text-xl font-semibold flex items-center gap-2">
                  <AlertCircle className="h-5 w-5 text-orange-500" />
                  Report a Bug
                </h3>
                <p className="text-sm text-muted-foreground mb-4">
                  Help us improve! Describe the issue you encountered.
                </p>
                <textarea
                  value={bugReportText}
                  onChange={(e) => setBugReportText(e.target.value)}
                  placeholder="Describe the bug you found..."
                  className="w-full rounded-lg border border-border bg-background p-3 outline-none focus:border-orange-500"
                  rows={5}
                  autoFocus
                />
                <div className="mt-4 flex gap-2">
                  <motion.button
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    onClick={handleBugReportSubmit}
                    className="flex-1 rounded-lg bg-orange-500 py-2 text-white hover:bg-orange-600"
                  >
                    Submit Report
                  </motion.button>
                  <motion.button
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    onClick={() => {
                      setShowBugReport(false);
                      setBugReportText('');
                    }}
                    className="rounded-lg border border-border px-4 py-2 hover:bg-secondary"
                  >
                    Cancel
                  </motion.button>
                </div>
              </motion.div>
            </motion.div>
          )}
        </AnimatePresence>

        {/* Paragraph Comment Modal */}
        <AnimatePresence>
          {paragraphCommentModal && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 p-4"
              onClick={() => setParagraphCommentModal(null)}
            >
              <motion.div
                initial={{ scale: 0.9, y: 20 }}
                animate={{ scale: 1, y: 0 }}
                exit={{ scale: 0.9, y: 20 }}
                className="w-full max-w-md rounded-lg border border-border bg-card p-6"
                onClick={(e) => e.stopPropagation()}
              >
                <h3 className="mb-4 text-xl font-semibold">Add Paragraph Comment</h3>
                <div className="mb-4 rounded-lg bg-secondary p-3 text-sm max-h-32 overflow-y-auto">
                  <span className="text-muted-foreground">Selected paragraph:</span>
                  <p className="mt-1 italic text-xs">"{paragraphCommentModal.paragraphText.substring(0, 150)}..."</p>
                </div>
                <textarea
                  value={paragraphComment}
                  onChange={(e) => setParagraphComment(e.target.value)}
                  placeholder="Enter your comment..."
                  className="w-full rounded-lg border border-border bg-background p-3 outline-none focus:border-orange-500"
                  rows={4}
                  autoFocus
                />
                <div className="mt-3 flex items-center gap-2">
                  <input
                    type="checkbox"
                    id="is-correction"
                    checked={isCorrection}
                    onChange={(e) => setIsCorrection(e.target.checked)}
                    className="h-4 w-4 rounded border-border accent-orange-500"
                  />
                  <label htmlFor="is-correction" className="text-sm cursor-pointer">
                    This is a correction suggestion
                  </label>
                </div>
                <div className="mt-4 flex gap-2">
                  <motion.button
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    onClick={handleParagraphCommentSubmit}
                    className="flex-1 rounded-lg bg-orange-500 py-2 text-white hover:bg-orange-600"
                  >
                    Submit
                  </motion.button>
                  <motion.button
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    onClick={() => {
                      setParagraphCommentModal(null);
                      setParagraphComment('');
                      setIsCorrection(false);
                    }}
                    className="rounded-lg border border-border px-4 py-2 hover:bg-secondary"
                  >
                    Cancel
                  </motion.button>
                </div>
              </motion.div>
            </motion.div>
          )}
        </AnimatePresence>

        {/* Chapter Navigation */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3 }}
          className="mt-8 flex items-center justify-between"
        >
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={() => onNavigateChapter(chapter.chapterNumber - 1)}
            disabled={chapter.chapterNumber === 1}
            className="flex items-center gap-2 rounded-lg border border-border px-6 py-3 hover:bg-secondary disabled:cursor-not-allowed disabled:opacity-50"
          >
            <ChevronLeft className="h-4 w-4" />
            Previous
          </motion.button>

          <div className="text-sm text-muted-foreground">
            {chapter.chapterNumber} / {totalChapters}
          </div>

          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={() => onNavigateChapter(chapter.chapterNumber + 1)}
            disabled={chapter.chapterNumber === totalChapters}
            className="flex items-center gap-2 rounded-lg border border-border px-6 py-3 hover:bg-secondary disabled:cursor-not-allowed disabled:opacity-50"
          >
            Next
            <ChevronRight className="h-4 w-4" />
          </motion.button>
        </motion.div>

        {/* Comments Section */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4 }}
          className="mt-12"
        >
          <CommentSection
            comments={comments.filter((c) => c.chapterId === chapter.id)}
            onAddComment={onAddComment}
            title={`Chapter Comments (${comments.filter((c) => c.chapterId === chapter.id).length})`}
          />
        </motion.div>

        {/* Share Buttons */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.5 }}
          className="mt-12"
        >
          <ShareButtons story={story} chapterNumber={chapter.chapterNumber} />
        </motion.div>
      </div>
    </div>
  );
}

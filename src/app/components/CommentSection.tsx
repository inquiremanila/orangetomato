import { useState } from 'react';
import { Heart, Send } from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';
import { Comment } from '../types';

interface CommentSectionProps {
  comments: Comment[];
  onAddComment: (content: string) => void;
  title: string;
}

export function CommentSection({ comments, onAddComment, title }: CommentSectionProps) {
  const [newComment, setNewComment] = useState('');
  const [likedComments, setLikedComments] = useState<Set<string>>(new Set());

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (newComment.trim()) {
      onAddComment(newComment);
      setNewComment('');
    }
  };

  const toggleLike = (commentId: string) => {
    setLikedComments((prev) => {
      const next = new Set(prev);
      if (next.has(commentId)) {
        next.delete(commentId);
      } else {
        next.add(commentId);
      }
      return next;
    });
  };

  return (
    <div className="rounded-lg border border-border bg-card p-6">
      <h3 className="mb-6">{title}</h3>

      {/* Comment Form */}
      <form onSubmit={handleSubmit} className="mb-6">
        <div className="flex gap-3">
          <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-gradient-to-br from-orange-500 to-red-600">
            <span className="text-white">A</span>
          </div>
          <div className="flex-1">
            <textarea
              value={newComment}
              onChange={(e) => setNewComment(e.target.value)}
              placeholder="Share your thoughts..."
              className="w-full rounded-lg border border-border bg-secondary/50 p-3 outline-none transition-colors focus:border-orange-500/50 focus:bg-secondary resize-none"
              rows={3}
            />
            <div className="mt-2 flex justify-end">
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                type="submit"
                disabled={!newComment.trim()}
                className="flex items-center gap-2 rounded-lg bg-gradient-to-r from-orange-500 to-red-600 px-4 py-2 text-white disabled:opacity-50 disabled:cursor-not-allowed"
              >
                <Send className="h-4 w-4" />
                Post Comment
              </motion.button>
            </div>
          </div>
        </div>
      </form>

      {/* Comments List */}
      <div className="space-y-4">
        <AnimatePresence>
          {comments.map((comment, index) => (
            <motion.div
              key={comment.id}
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: 20 }}
              transition={{ delay: index * 0.05 }}
              className="flex gap-3 rounded-lg border border-border/50 p-4 hover:border-border transition-colors"
            >
              <img
                src={comment.userAvatar || 'https://api.dicebear.com/7.x/avataaars/svg?seed=default'}
                alt={comment.username}
                className="h-10 w-10 rounded-full"
              />
              <div className="flex-1">
                <div className="mb-1 flex items-center gap-2">
                  <span className="font-medium">{comment.username}</span>
                  <span className="text-xs text-muted-foreground">
                    {new Date(comment.createdAt).toLocaleDateString()}
                  </span>
                </div>
                <p className="mb-2 text-sm text-foreground/90">{comment.content}</p>
                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  onClick={() => toggleLike(comment.id)}
                  className={`flex items-center gap-1 text-sm transition-colors ${
                    likedComments.has(comment.id)
                      ? 'text-orange-500'
                      : 'text-muted-foreground hover:text-orange-500'
                  }`}
                >
                  <Heart
                    className={`h-4 w-4 ${likedComments.has(comment.id) ? 'fill-current' : ''}`}
                  />
                  <span>{comment.likes + (likedComments.has(comment.id) ? 1 : 0)}</span>
                </motion.button>
              </div>
            </motion.div>
          ))}
        </AnimatePresence>

        {comments.length === 0 && (
          <div className="py-8 text-center text-muted-foreground">
            No comments yet. Be the first to share your thoughts!
          </div>
        )}
      </div>
    </div>
  );
}

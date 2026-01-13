import { useState } from 'react';
import { motion } from 'motion/react';
import { WishlistItem, WishlistComment, User } from '../types';
import { ThumbsUp, MessageCircle, Upload, X, Send } from 'lucide-react';
import { toast } from 'sonner';

interface WishlistProps {
  wishlistItems: WishlistItem[];
  wishlistComments: WishlistComment[];
  user: User | null;
  isAuthenticated: boolean;
  onAddWishlistItem: (item: Omit<WishlistItem, 'id' | 'upvotes' | 'upvotedBy' | 'commentCount' | 'createdAt' | 'status'>) => void;
  onUpvoteWishlistItem: (itemId: string) => void;
  onAddWishlistComment: (wishlistItemId: string, content: string) => void;
}

export function Wishlist({
  wishlistItems,
  wishlistComments,
  user,
  isAuthenticated,
  onAddWishlistItem,
  onUpvoteWishlistItem,
  onAddWishlistComment
}: WishlistProps) {
  const [showAddForm, setShowAddForm] = useState(false);
  const [selectedItem, setSelectedItem] = useState<string | null>(null);
  const [newComment, setNewComment] = useState('');
  
  // Form fields
  const [title, setTitle] = useState('');
  const [author, setAuthor] = useState('');
  const [description, setDescription] = useState('');
  const [coverImage, setCoverImage] = useState<string | null>(null);
  const [imagePreview, setImagePreview] = useState<string | null>(null);

  const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        const result = reader.result as string;
        setCoverImage(result);
        setImagePreview(result);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleSubmitSuggestion = (e: React.FormEvent) => {
    e.preventDefault();
    if (!isAuthenticated || !user) {
      toast.error('Please sign in to submit a suggestion');
      return;
    }

    if (!title.trim() || !description.trim()) {
      toast.error('Please fill in all required fields');
      return;
    }

    onAddWishlistItem({
      userId: user.id,
      username: user.username,
      userAvatar: user.avatar,
      title: title.trim(),
      author: author.trim() || undefined,
      description: description.trim(),
      coverImage: coverImage || undefined,
    });

    // Reset form
    setTitle('');
    setAuthor('');
    setDescription('');
    setCoverImage(null);
    setImagePreview(null);
    setShowAddForm(false);
    toast.success('Suggestion submitted successfully!');
  };

  const handleUpvote = (itemId: string) => {
    if (!isAuthenticated) {
      toast.error('Please sign in to upvote');
      return;
    }
    onUpvoteWishlistItem(itemId);
  };

  const handleAddComment = (wishlistItemId: string) => {
    if (!isAuthenticated || !user) {
      toast.error('Please sign in to comment');
      return;
    }

    if (!newComment.trim()) {
      return;
    }

    onAddWishlistComment(wishlistItemId, newComment.trim());
    setNewComment('');
    toast.success('Comment added!');
  };

  const sortedItems = [...wishlistItems].sort((a, b) => b.upvotes - a.upvotes);

  return (
    <div className="min-h-screen pt-20 pb-12 px-4">
      <div className="max-w-4xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="mb-8"
        >
          <h1 className="text-4xl font-bold mb-2 bg-gradient-to-r from-orange-500 to-red-500 bg-clip-text text-transparent">
            Story Wishlist
          </h1>
          <p className="text-muted-foreground mb-6">
            Suggest stories you'd like to see translated and vote for your favorites
          </p>

          {!showAddForm && (
            <button
              onClick={() => {
                if (!isAuthenticated) {
                  toast.error('Please sign in to submit a suggestion');
                  return;
                }
                setShowAddForm(true);
              }}
              className="px-6 py-3 bg-orange-600 hover:bg-orange-700 text-white rounded-lg transition-colors"
            >
              Suggest a Story
            </button>
          )}
        </motion.div>

        {/* Add Suggestion Form */}
        {showAddForm && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            className="bg-card border border-border rounded-lg p-6 mb-8"
          >
            <div className="flex justify-between items-center mb-4">
              <h2 className="text-xl font-bold">Submit New Suggestion</h2>
              <button
                onClick={() => setShowAddForm(false)}
                className="p-2 hover:bg-muted rounded-lg transition-colors"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <form onSubmit={handleSubmitSuggestion} className="space-y-4">
              <div>
                <label className="block text-sm font-medium mb-2">
                  Story Title <span className="text-red-500">*</span>
                </label>
                <input
                  type="text"
                  value={title}
                  onChange={(e) => setTitle(e.target.value)}
                  className="w-full px-4 py-2 bg-background border border-border rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-500"
                  placeholder="Enter the story title"
                  required
                />
              </div>

              <div>
                <label className="block text-sm font-medium mb-2">Author (Optional)</label>
                <input
                  type="text"
                  value={author}
                  onChange={(e) => setAuthor(e.target.value)}
                  className="w-full px-4 py-2 bg-background border border-border rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-500"
                  placeholder="Enter the author name"
                />
              </div>

              <div>
                <label className="block text-sm font-medium mb-2">
                  Description <span className="text-red-500">*</span>
                </label>
                <textarea
                  value={description}
                  onChange={(e) => setDescription(e.target.value)}
                  className="w-full px-4 py-2 bg-background border border-border rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-500 min-h-[120px]"
                  placeholder="Describe the story and why you'd like it translated"
                  required
                />
              </div>

              <div>
                <label className="block text-sm font-medium mb-2">Cover Image (Optional)</label>
                <div className="flex items-center gap-4">
                  <label className="flex items-center gap-2 px-4 py-2 bg-muted hover:bg-muted/80 rounded-lg cursor-pointer transition-colors">
                    <Upload className="w-5 h-5" />
                    Upload Image
                    <input
                      type="file"
                      accept="image/*"
                      onChange={handleImageUpload}
                      className="hidden"
                    />
                  </label>
                  {imagePreview && (
                    <div className="relative w-20 h-28 rounded-lg overflow-hidden">
                      <img src={imagePreview} alt="Preview" className="w-full h-full object-cover" />
                    </div>
                  )}
                </div>
              </div>

              <div className="flex gap-3">
                <button
                  type="submit"
                  className="px-6 py-2 bg-orange-600 hover:bg-orange-700 text-white rounded-lg transition-colors"
                >
                  Submit Suggestion
                </button>
                <button
                  type="button"
                  onClick={() => setShowAddForm(false)}
                  className="px-6 py-2 bg-muted hover:bg-muted/80 rounded-lg transition-colors"
                >
                  Cancel
                </button>
              </div>
            </form>
          </motion.div>
        )}

        {/* Wishlist Items */}
        <div className="space-y-4">
          {sortedItems.map((item, index) => {
            const isUpvoted = user && item.upvotedBy.includes(user.id);
            const itemComments = wishlistComments.filter(c => c.wishlistItemId === item.id);
            const isExpanded = selectedItem === item.id;

            return (
              <motion.div
                key={item.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.05 }}
                className="bg-card border border-border rounded-lg p-6 hover:border-orange-500/50 transition-colors"
              >
                <div className="flex gap-4">
                  {/* Ranking */}
                  <div className="flex flex-col items-center">
                    <div className={`text-2xl font-bold ${index < 3 ? 'text-orange-500' : 'text-muted-foreground'}`}>
                      #{index + 1}
                    </div>
                    <button
                      onClick={() => handleUpvote(item.id)}
                      className={`flex flex-col items-center gap-1 p-2 rounded-lg transition-colors ${
                        isUpvoted ? 'text-orange-500 bg-orange-500/10' : 'hover:bg-muted'
                      }`}
                    >
                      <ThumbsUp className={`w-5 h-5 ${isUpvoted ? 'fill-current' : ''}`} />
                      <span className="text-sm font-medium">{item.upvotes}</span>
                    </button>
                  </div>

                  {/* Content */}
                  <div className="flex-1">
                    <div className="flex gap-4">
                      {item.coverImage && (
                        <img
                          src={item.coverImage}
                          alt={item.title}
                          className="w-20 h-28 object-cover rounded-lg"
                        />
                      )}
                      <div className="flex-1">
                        <h3 className="text-xl font-bold mb-1">{item.title}</h3>
                        {item.author && (
                          <p className="text-sm text-muted-foreground mb-2">by {item.author}</p>
                        )}
                        <p className="text-sm text-muted-foreground mb-3">{item.description}</p>
                        
                        <div className="flex items-center gap-4 text-sm text-muted-foreground">
                          <span>Suggested by {item.username}</span>
                          <span>•</span>
                          <span>{new Date(item.createdAt).toLocaleDateString()}</span>
                          {item.status !== 'pending' && (
                            <>
                              <span>•</span>
                              <span className={`px-2 py-0.5 rounded-full text-xs ${
                                item.status === 'approved' ? 'bg-blue-500/20 text-blue-400' :
                                item.status === 'completed' ? 'bg-green-500/20 text-green-400' :
                                'bg-red-500/20 text-red-400'
                              }`}>
                                {item.status}
                              </span>
                            </>
                          )}
                        </div>

                        <button
                          onClick={() => setSelectedItem(isExpanded ? null : item.id)}
                          className="flex items-center gap-2 mt-3 text-orange-500 hover:text-orange-400 transition-colors"
                        >
                          <MessageCircle className="w-4 h-4" />
                          {item.commentCount} {item.commentCount === 1 ? 'comment' : 'comments'}
                        </button>
                      </div>
                    </div>

                    {/* Comments Section */}
                    {isExpanded && (
                      <motion.div
                        initial={{ opacity: 0, height: 0 }}
                        animate={{ opacity: 1, height: 'auto' }}
                        className="mt-4 pt-4 border-t border-border"
                      >
                        <h4 className="font-medium mb-3">Comments</h4>
                        
                        {/* Add Comment */}
                        {isAuthenticated && (
                          <div className="flex gap-2 mb-4">
                            <input
                              type="text"
                              value={selectedItem === item.id ? newComment : ''}
                              onChange={(e) => setNewComment(e.target.value)}
                              placeholder="Add a comment..."
                              className="flex-1 px-4 py-2 bg-background border border-border rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-500"
                              onKeyPress={(e) => {
                                if (e.key === 'Enter') {
                                  handleAddComment(item.id);
                                }
                              }}
                            />
                            <button
                              onClick={() => handleAddComment(item.id)}
                              className="p-2 bg-orange-600 hover:bg-orange-700 text-white rounded-lg transition-colors"
                            >
                              <Send className="w-5 h-5" />
                            </button>
                          </div>
                        )}

                        {/* Comments List */}
                        <div className="space-y-3">
                          {itemComments.map((comment) => (
                            <div key={comment.id} className="flex gap-3 p-3 bg-background rounded-lg">
                              {comment.userAvatar && (
                                <img
                                  src={comment.userAvatar}
                                  alt={comment.username}
                                  className="w-8 h-8 rounded-full"
                                />
                              )}
                              <div className="flex-1">
                                <div className="flex items-center gap-2 mb-1">
                                  <span className="font-medium text-sm">{comment.username}</span>
                                  <span className="text-xs text-muted-foreground">
                                    {new Date(comment.createdAt).toLocaleDateString()}
                                  </span>
                                </div>
                                <p className="text-sm">{comment.content}</p>
                              </div>
                            </div>
                          ))}
                          {itemComments.length === 0 && (
                            <p className="text-sm text-muted-foreground text-center py-4">
                              No comments yet. Be the first to comment!
                            </p>
                          )}
                        </div>
                      </motion.div>
                    )}
                  </div>
                </div>
              </motion.div>
            );
          })}

          {sortedItems.length === 0 && (
            <div className="text-center py-12 text-muted-foreground">
              <p className="text-lg">No suggestions yet.</p>
              <p className="text-sm mt-2">Be the first to suggest a story!</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

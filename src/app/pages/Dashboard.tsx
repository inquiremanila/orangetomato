import { useState } from 'react';
import { motion } from 'motion/react';
import { WishlistItem, CorrectionSuggestion, DevNotice, StoryAnalytics, Story, Chapter } from '../types';
import { Check, X, Eye, TrendingUp, MessageSquare, Bell, Send, Plus, BookOpen } from 'lucide-react';
import { toast } from 'sonner';

interface DashboardProps {
  wishlistItems: WishlistItem[];
  corrections: CorrectionSuggestion[];
  notices: DevNotice[];
  analytics: StoryAnalytics[];
  stories: Story[];
  onUpdateWishlistStatus: (itemId: string, status: WishlistItem['status']) => void;
  onUpdateCorrectionStatus: (correctionId: string, status: CorrectionSuggestion['status'], userId: string, username: string) => void;
  onCreateNotice: (notice: Omit<DevNotice, 'id' | 'createdAt'>) => void;
  onAddStory: (story: Omit<Story, 'id' | 'createdAt' | 'updatedAt'>) => void;
  onAddChapter: (chapter: Omit<Chapter, 'id' | 'publishedAt'>) => void;
}

export function Dashboard({
  wishlistItems,
  corrections,
  notices,
  analytics,
  stories,
  onUpdateWishlistStatus,
  onUpdateCorrectionStatus,
  onCreateNotice,
  onAddStory,
  onAddChapter,
}: DashboardProps) {
  const [activeTab, setActiveTab] = useState<'wishlist' | 'corrections' | 'analytics' | 'notices' | 'content'>('wishlist');
  const [showNoticeForm, setShowNoticeForm] = useState(false);
  const [noticeTitle, setNoticeTitle] = useState('');
  const [noticeMessage, setNoticeMessage] = useState('');
  const [noticeType, setNoticeType] = useState<DevNotice['type']>('info');
  
  // Content management state
  const [showStoryForm, setShowStoryForm] = useState(false);
  const [showChapterForm, setShowChapterForm] = useState(false);
  const [storyTitle, setStoryTitle] = useState('');
  const [storyAuthor, setStoryAuthor] = useState('');
  const [storyDescription, setStoryDescription] = useState('');
  const [storyGenres, setStoryGenres] = useState('');
  const [storyStatus, setStoryStatus] = useState<'ongoing' | 'completed' | 'hiatus'>('ongoing');
  const [storyCoverImage, setStoryCoverImage] = useState('');
  const [chapterStoryId, setChapterStoryId] = useState('');
  const [chapterNumber, setChapterNumber] = useState(1);
  const [chapterTitle, setChapterTitle] = useState('');
  const [chapterContent, setChapterContent] = useState('');

  const pendingWishlist = wishlistItems.filter(i => i.status === 'pending');
  const pendingCorrections = corrections.filter(c => c.status === 'pending');

  const handleSubmitNotice = (e: React.FormEvent) => {
    e.preventDefault();
    if (!noticeTitle.trim() || !noticeMessage.trim()) {
      toast.error('Please fill in all fields');
      return;
    }

    onCreateNotice({
      title: noticeTitle.trim(),
      message: noticeMessage.trim(),
      type: noticeType,
    });

    setNoticeTitle('');
    setNoticeMessage('');
    setNoticeType('info');
    setShowNoticeForm(false);
    toast.success('Notice published!');
  };

  const getStoryTitle = (storyId: string) => {
    return stories.find(s => s.id === storyId)?.title || 'Unknown Story';
  };

  const handleSubmitStory = (e: React.FormEvent) => {
    e.preventDefault();
    if (!storyTitle.trim() || !storyAuthor.trim() || !storyDescription.trim() || !storyGenres.trim() || !storyCoverImage.trim()) {
      toast.error('Please fill in all fields');
      return;
    }

    onAddStory({
      title: storyTitle.trim(),
      author: storyAuthor.trim(),
      description: storyDescription.trim(),
      genres: storyGenres.trim().split(',').map(g => g.trim()),
      status: storyStatus,
      coverImage: storyCoverImage.trim(),
    });

    setStoryTitle('');
    setStoryAuthor('');
    setStoryDescription('');
    setStoryGenres('');
    setStoryStatus('ongoing');
    setStoryCoverImage('');
    setShowStoryForm(false);
    toast.success('Story added!');
  };

  const handleSubmitChapter = (e: React.FormEvent) => {
    e.preventDefault();
    if (!chapterStoryId.trim() || !chapterTitle.trim() || !chapterContent.trim()) {
      toast.error('Please fill in all fields');
      return;
    }

    onAddChapter({
      storyId: chapterStoryId.trim(),
      chapterNumber,
      title: chapterTitle.trim(),
      content: chapterContent.trim(),
    });

    setChapterStoryId('');
    setChapterNumber(1);
    setChapterTitle('');
    setChapterContent('');
    setShowChapterForm(false);
    toast.success('Chapter added!');
  };

  return (
    <div className="min-h-screen pt-20 pb-12 px-4">
      <div className="max-w-7xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="mb-8"
        >
          <h1 className="text-4xl font-bold mb-2 bg-gradient-to-r from-orange-500 to-red-500 bg-clip-text text-transparent">
            Developer Dashboard
          </h1>
          <p className="text-muted-foreground">
            Manage suggestions, corrections, notices, and analytics
          </p>
        </motion.div>

        {/* Stats Overview */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="bg-card border border-border rounded-lg p-6"
          >
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-muted-foreground">Pending Wishlist</p>
                <p className="text-3xl font-bold text-orange-500">{pendingWishlist.length}</p>
              </div>
              <MessageSquare className="w-8 h-8 text-orange-500/50" />
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="bg-card border border-border rounded-lg p-6"
          >
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-muted-foreground">Pending Corrections</p>
                <p className="text-3xl font-bold text-blue-500">{pendingCorrections.length}</p>
              </div>
              <Check className="w-8 h-8 text-blue-500/50" />
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3 }}
            className="bg-card border border-border rounded-lg p-6"
          >
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-muted-foreground">Total Views</p>
                <p className="text-3xl font-bold text-green-500">
                  {analytics.reduce((sum, a) => sum + a.viewCount, 0).toLocaleString()}
                </p>
              </div>
              <Eye className="w-8 h-8 text-green-500/50" />
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4 }}
            className="bg-card border border-border rounded-lg p-6"
          >
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-muted-foreground">Active Notices</p>
                <p className="text-3xl font-bold text-purple-500">{notices.length}</p>
              </div>
              <Bell className="w-8 h-8 text-purple-500/50" />
            </div>
          </motion.div>
        </div>

        {/* Tabs */}
        <div className="flex gap-2 mb-6 border-b border-border overflow-x-auto">
          {[
            { id: 'wishlist', label: 'Wishlist Suggestions', count: pendingWishlist.length },
            { id: 'corrections', label: 'Corrections', count: pendingCorrections.length },
            { id: 'analytics', label: 'Story Analytics' },
            { id: 'notices', label: 'Notices' },
            { id: 'content', label: 'Content Management' }
          ].map((tab) => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id as any)}
              className={`px-4 py-2 font-medium transition-colors relative whitespace-nowrap ${
                activeTab === tab.id
                  ? 'text-orange-500'
                  : 'text-muted-foreground hover:text-foreground'
              }`}
            >
              {tab.label}
              {tab.count !== undefined && tab.count > 0 && (
                <span className="ml-2 px-2 py-0.5 bg-orange-500 text-white text-xs rounded-full">
                  {tab.count}
                </span>
              )}
              {activeTab === tab.id && (
                <motion.div
                  layoutId="activeTab"
                  className="absolute bottom-0 left-0 right-0 h-0.5 bg-orange-500"
                />
              )}
            </button>
          ))}
        </div>

        {/* Tab Content */}
        <motion.div
          key={activeTab}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
        >
          {/* Wishlist Tab */}
          {activeTab === 'wishlist' && (
            <div className="space-y-4">
              {wishlistItems.map((item) => (
                <div key={item.id} className="bg-card border border-border rounded-lg p-6">
                  <div className="flex gap-4">
                    {item.coverImage && (
                      <img
                        src={item.coverImage}
                        alt={item.title}
                        className="w-20 h-28 object-cover rounded-lg"
                      />
                    )}
                    <div className="flex-1">
                      <div className="flex items-start justify-between mb-2">
                        <div>
                          <h3 className="text-lg font-bold">{item.title}</h3>
                          {item.author && <p className="text-sm text-muted-foreground">by {item.author}</p>}
                        </div>
                        <span className={`px-3 py-1 rounded-full text-xs font-medium ${
                          item.status === 'pending' ? 'bg-yellow-500/20 text-yellow-400' :
                          item.status === 'approved' ? 'bg-blue-500/20 text-blue-400' :
                          item.status === 'completed' ? 'bg-green-500/20 text-green-400' :
                          'bg-red-500/20 text-red-400'
                        }`}>
                          {item.status}
                        </span>
                      </div>
                      <p className="text-sm mb-3">{item.description}</p>
                      <div className="flex items-center gap-4 text-sm text-muted-foreground mb-4">
                        <span>👍 {item.upvotes} upvotes</span>
                        <span>💬 {item.commentCount} comments</span>
                        <span>By {item.username}</span>
                        <span>{new Date(item.createdAt).toLocaleDateString()}</span>
                      </div>
                      <div className="flex gap-2">
                        {item.status === 'pending' && (
                          <>
                            <button
                              onClick={() => onUpdateWishlistStatus(item.id, 'approved')}
                              className="px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white text-sm rounded-lg transition-colors flex items-center gap-2"
                            >
                              <Check className="w-4 h-4" />
                              Approve
                            </button>
                            <button
                              onClick={() => onUpdateWishlistStatus(item.id, 'rejected')}
                              className="px-4 py-2 bg-red-600 hover:bg-red-700 text-white text-sm rounded-lg transition-colors flex items-center gap-2"
                            >
                              <X className="w-4 h-4" />
                              Reject
                            </button>
                          </>
                        )}
                        {item.status === 'approved' && (
                          <button
                            onClick={() => onUpdateWishlistStatus(item.id, 'completed')}
                            className="px-4 py-2 bg-green-600 hover:bg-green-700 text-white text-sm rounded-lg transition-colors flex items-center gap-2"
                          >
                            <Check className="w-4 h-4" />
                            Mark as Completed
                          </button>
                        )}
                      </div>
                    </div>
                  </div>
                </div>
              ))}
              {wishlistItems.length === 0 && (
                <div className="text-center py-12 text-muted-foreground">
                  No wishlist items yet
                </div>
              )}
            </div>
          )}

          {/* Corrections Tab */}
          {activeTab === 'corrections' && (
            <div className="space-y-4">
              {corrections.map((correction) => (
                <div key={correction.id} className="bg-card border border-border rounded-lg p-6">
                  <div className="flex items-start justify-between mb-3">
                    <div>
                      <p className="text-sm text-muted-foreground mb-1">
                        Chapter: {correction.chapterId} • By {correction.username}
                      </p>
                      <p className="text-sm text-muted-foreground">
                        {new Date(correction.createdAt).toLocaleDateString()}
                      </p>
                    </div>
                    <span className={`px-3 py-1 rounded-full text-xs font-medium ${
                      correction.status === 'pending' ? 'bg-yellow-500/20 text-yellow-400' :
                      correction.status === 'approved' ? 'bg-green-500/20 text-green-400' :
                      'bg-red-500/20 text-red-400'
                    }`}>
                      {correction.status}
                    </span>
                  </div>
                  
                  <div className="grid grid-cols-2 gap-4 mb-3">
                    <div className="p-3 bg-red-500/10 border border-red-500/30 rounded-lg">
                      <p className="text-xs text-red-400 mb-1">Original Text:</p>
                      <p className="text-sm">{correction.originalText}</p>
                    </div>
                    <div className="p-3 bg-green-500/10 border border-green-500/30 rounded-lg">
                      <p className="text-xs text-green-400 mb-1">Suggested Text:</p>
                      <p className="text-sm">{correction.suggestedText}</p>
                    </div>
                  </div>
                  
                  {correction.reason && (
                    <p className="text-sm text-muted-foreground mb-3">
                      <strong>Reason:</strong> {correction.reason}
                    </p>
                  )}
                  
                  {correction.status === 'pending' && (
                    <div className="flex gap-2">
                      <button
                        onClick={() => onUpdateCorrectionStatus(correction.id, 'approved', correction.userId, correction.username)}
                        className="px-4 py-2 bg-green-600 hover:bg-green-700 text-white text-sm rounded-lg transition-colors flex items-center gap-2"
                      >
                        <Check className="w-4 h-4" />
                        Approve
                      </button>
                      <button
                        onClick={() => onUpdateCorrectionStatus(correction.id, 'rejected', correction.userId, correction.username)}
                        className="px-4 py-2 bg-red-600 hover:bg-red-700 text-white text-sm rounded-lg transition-colors flex items-center gap-2"
                      >
                        <X className="w-4 h-4" />
                        Reject
                      </button>
                    </div>
                  )}
                </div>
              ))}
              {corrections.length === 0 && (
                <div className="text-center py-12 text-muted-foreground">
                  No correction suggestions yet
                </div>
              )}
            </div>
          )}

          {/* Analytics Tab */}
          {activeTab === 'analytics' && (
            <div className="space-y-4">
              {analytics
                .sort((a, b) => b.viewCount - a.viewCount)
                .map((analytic, index) => {
                  const story = stories.find(s => s.id === analytic.storyId);
                  if (!story) return null;

                  return (
                    <div key={analytic.storyId} className="bg-card border border-border rounded-lg p-6">
                      <div className="flex items-start gap-4">
                        <div className={`text-2xl font-bold ${index < 3 ? 'text-orange-500' : 'text-muted-foreground'}`}>
                          #{index + 1}
                        </div>
                        <img
                          src={story.coverImage}
                          alt={story.title}
                          className="w-16 h-22 object-cover rounded-lg"
                        />
                        <div className="flex-1">
                          <h3 className="text-lg font-bold mb-1">{story.title}</h3>
                          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-3">
                            <div>
                              <p className="text-xs text-muted-foreground">Total Views</p>
                              <p className="text-xl font-bold text-orange-500">{analytic.viewCount.toLocaleString()}</p>
                            </div>
                            <div>
                              <p className="text-xs text-muted-foreground">Unique Viewers</p>
                              <p className="text-xl font-bold text-blue-500">{analytic.uniqueViewers.length}</p>
                            </div>
                            <div>
                              <p className="text-xs text-muted-foreground">Chapters Read</p>
                              <p className="text-xl font-bold text-green-500">
                                {Object.keys(analytic.chapterViews).length}
                              </p>
                            </div>
                            <div>
                              <p className="text-xs text-muted-foreground">Last Viewed</p>
                              <p className="text-sm font-medium">
                                {new Date(analytic.lastViewed).toLocaleDateString()}
                              </p>
                            </div>
                          </div>
                          <div className="flex items-center gap-2 text-sm text-muted-foreground">
                            <TrendingUp className="w-4 h-4" />
                            <span>Most viewed chapter: {Object.entries(analytic.chapterViews).sort(([,a], [,b]) => b - a)[0]?.[0] || 'N/A'}</span>
                          </div>
                        </div>
                      </div>
                    </div>
                  );
                })}
              {analytics.length === 0 && (
                <div className="text-center py-12 text-muted-foreground">
                  No analytics data yet
                </div>
              )}
            </div>
          )}

          {/* Notices Tab */}
          {activeTab === 'notices' && (
            <div>
              {!showNoticeForm && (
                <button
                  onClick={() => setShowNoticeForm(true)}
                  className="mb-6 px-6 py-3 bg-orange-600 hover:bg-orange-700 text-white rounded-lg transition-colors"
                >
                  Create New Notice
                </button>
              )}

              {showNoticeForm && (
                <div className="bg-card border border-border rounded-lg p-6 mb-6">
                  <h3 className="text-lg font-bold mb-4">Create Notice</h3>
                  <form onSubmit={handleSubmitNotice} className="space-y-4">
                    <div>
                      <label className="block text-sm font-medium mb-2">Notice Type</label>
                      <select
                        value={noticeType}
                        onChange={(e) => setNoticeType(e.target.value as DevNotice['type'])}
                        className="w-full px-4 py-2 bg-background border border-border rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-500"
                      >
                        <option value="info">Info</option>
                        <option value="warning">Warning</option>
                        <option value="update">Update</option>
                      </select>
                    </div>
                    <div>
                      <label className="block text-sm font-medium mb-2">Title</label>
                      <input
                        type="text"
                        value={noticeTitle}
                        onChange={(e) => setNoticeTitle(e.target.value)}
                        className="w-full px-4 py-2 bg-background border border-border rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-500"
                        required
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium mb-2">Message</label>
                      <textarea
                        value={noticeMessage}
                        onChange={(e) => setNoticeMessage(e.target.value)}
                        className="w-full px-4 py-2 bg-background border border-border rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-500 min-h-[100px]"
                        required
                      />
                    </div>
                    <div className="flex gap-2">
                      <button
                        type="submit"
                        className="px-6 py-2 bg-orange-600 hover:bg-orange-700 text-white rounded-lg transition-colors flex items-center gap-2"
                      >
                        <Send className="w-4 h-4" />
                        Publish Notice
                      </button>
                      <button
                        type="button"
                        onClick={() => setShowNoticeForm(false)}
                        className="px-6 py-2 bg-muted hover:bg-muted/80 rounded-lg transition-colors"
                      >
                        Cancel
                      </button>
                    </div>
                  </form>
                </div>
              )}

              <div className="space-y-4">
                {notices.map((notice) => (
                  <div key={notice.id} className="bg-card border border-border rounded-lg p-6">
                    <div className="flex items-start justify-between mb-2">
                      <h3 className="text-lg font-bold">{notice.title}</h3>
                      <span className={`px-3 py-1 rounded-full text-xs font-medium ${
                        notice.type === 'info' ? 'bg-blue-500/20 text-blue-400' :
                        notice.type === 'warning' ? 'bg-yellow-500/20 text-yellow-400' :
                        'bg-green-500/20 text-green-400'
                      }`}>
                        {notice.type}
                      </span>
                    </div>
                    <p className="text-sm mb-3">{notice.message}</p>
                    <p className="text-xs text-muted-foreground">
                      Published: {new Date(notice.createdAt).toLocaleString()}
                    </p>
                  </div>
                ))}
                {notices.length === 0 && (
                  <div className="text-center py-12 text-muted-foreground">
                    No notices yet
                  </div>
                )}
              </div>
            </div>
          )}

          {/* Content Management Tab */}
          {activeTab === 'content' && (
            <div>
              {!showStoryForm && (
                <button
                  onClick={() => setShowStoryForm(true)}
                  className="mb-6 px-6 py-3 bg-orange-600 hover:bg-orange-700 text-white rounded-lg transition-colors"
                >
                  Add New Story
                </button>
              )}

              {showStoryForm && (
                <div className="bg-card border border-border rounded-lg p-6 mb-6">
                  <h3 className="text-lg font-bold mb-4">Add Story</h3>
                  <form onSubmit={handleSubmitStory} className="space-y-4">
                    <div>
                      <label className="block text-sm font-medium mb-2">Title</label>
                      <input
                        type="text"
                        value={storyTitle}
                        onChange={(e) => setStoryTitle(e.target.value)}
                        className="w-full px-4 py-2 bg-background border border-border rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-500"
                        required
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium mb-2">Author</label>
                      <input
                        type="text"
                        value={storyAuthor}
                        onChange={(e) => setStoryAuthor(e.target.value)}
                        className="w-full px-4 py-2 bg-background border border-border rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-500"
                        required
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium mb-2">Description</label>
                      <textarea
                        value={storyDescription}
                        onChange={(e) => setStoryDescription(e.target.value)}
                        className="w-full px-4 py-2 bg-background border border-border rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-500 min-h-[100px]"
                        required
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium mb-2">Genres</label>
                      <input
                        type="text"
                        value={storyGenres}
                        onChange={(e) => setStoryGenres(e.target.value)}
                        className="w-full px-4 py-2 bg-background border border-border rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-500"
                        required
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium mb-2">Status</label>
                      <select
                        value={storyStatus}
                        onChange={(e) => setStoryStatus(e.target.value as 'ongoing' | 'completed' | 'hiatus')}
                        className="w-full px-4 py-2 bg-background border border-border rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-500"
                      >
                        <option value="ongoing">Ongoing</option>
                        <option value="completed">Completed</option>
                        <option value="hiatus">Hiatus</option>
                      </select>
                    </div>
                    <div>
                      <label className="block text-sm font-medium mb-2">Cover Image URL</label>
                      <input
                        type="text"
                        value={storyCoverImage}
                        onChange={(e) => setStoryCoverImage(e.target.value)}
                        className="w-full px-4 py-2 bg-background border border-border rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-500"
                        required
                      />
                    </div>
                    <div className="flex gap-2">
                      <button
                        type="submit"
                        className="px-6 py-2 bg-orange-600 hover:bg-orange-700 text-white rounded-lg transition-colors flex items-center gap-2"
                      >
                        <Send className="w-4 h-4" />
                        Add Story
                      </button>
                      <button
                        type="button"
                        onClick={() => setShowStoryForm(false)}
                        className="px-6 py-2 bg-muted hover:bg-muted/80 rounded-lg transition-colors"
                      >
                        Cancel
                      </button>
                    </div>
                  </form>
                </div>
              )}

              {!showChapterForm && (
                <button
                  onClick={() => setShowChapterForm(true)}
                  className="mb-6 px-6 py-3 bg-orange-600 hover:bg-orange-700 text-white rounded-lg transition-colors"
                >
                  Add New Chapter
                </button>
              )}

              {showChapterForm && (
                <div className="bg-card border border-border rounded-lg p-6 mb-6">
                  <h3 className="text-lg font-bold mb-4">Add Chapter</h3>
                  <form onSubmit={handleSubmitChapter} className="space-y-4">
                    <div>
                      <label className="block text-sm font-medium mb-2">Story ID</label>
                      <input
                        type="text"
                        value={chapterStoryId}
                        onChange={(e) => setChapterStoryId(e.target.value)}
                        className="w-full px-4 py-2 bg-background border border-border rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-500"
                        required
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium mb-2">Chapter Number</label>
                      <input
                        type="number"
                        value={chapterNumber}
                        onChange={(e) => setChapterNumber(parseInt(e.target.value))}
                        className="w-full px-4 py-2 bg-background border border-border rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-500"
                        required
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium mb-2">Title</label>
                      <input
                        type="text"
                        value={chapterTitle}
                        onChange={(e) => setChapterTitle(e.target.value)}
                        className="w-full px-4 py-2 bg-background border border-border rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-500"
                        required
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium mb-2">Content</label>
                      <textarea
                        value={chapterContent}
                        onChange={(e) => setChapterContent(e.target.value)}
                        className="w-full px-4 py-2 bg-background border border-border rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-500 min-h-[100px]"
                        required
                      />
                    </div>
                    <div className="flex gap-2">
                      <button
                        type="submit"
                        className="px-6 py-2 bg-orange-600 hover:bg-orange-700 text-white rounded-lg transition-colors flex items-center gap-2"
                      >
                        <Send className="w-4 h-4" />
                        Add Chapter
                      </button>
                      <button
                        type="button"
                        onClick={() => setShowChapterForm(false)}
                        className="px-6 py-2 bg-muted hover:bg-muted/80 rounded-lg transition-colors"
                      >
                        Cancel
                      </button>
                    </div>
                  </form>
                </div>
              )}
            </div>
          )}
        </motion.div>
      </div>
    </div>
  );
}
import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { User, Story, UserProgress, Bookmark, Rating, Comment, Activity, Notification, WishlistItem, WishlistComment, CorrectionSuggestion, DevNotice, StoryAnalytics, Chapter, ParagraphHighlight } from './types';
import * as api from './utils/api';
import { registerServiceWorker, cacheChapterForOffline } from './utils/offline';
import { Toaster, toast } from 'sonner';
import { 
  mockUser, 
  mockStories, 
  mockChapters, 
  mockUserProgress, 
  mockBookmarks, 
  mockRatings, 
  mockComments, 
  mockActivities, 
  mockNotifications,
  mockWishlistItems,
  mockWishlistComments,
  mockCorrections,
  mockNotices,
  mockAnalytics
} from './data/mockData';
import { LoadingScreen } from './components/LoadingScreen';
import { Header } from './components/Header';
import { SignIn } from './pages/SignIn';
import { SignUp } from './pages/SignUp';
import { ForgotPassword } from './pages/ForgotPassword';
import { Home } from './pages/Home';
import { StoryDetail } from './pages/StoryDetail';
import { Reader } from './pages/Reader';
import { Bookmarks } from './pages/Bookmarks';
import { Profile } from './pages/Profile';
import { Settings } from './pages/Settings';
import { Notifications } from './pages/Notifications';
import { Wishlist } from './pages/Wishlist';
import { Dashboard } from './pages/Dashboard';

type Page =
  | 'signin'
  | 'signup'
  | 'forgot-password'
  | 'home'
  | 'story'
  | 'reader'
  | 'bookmarks'
  | 'profile'
  | 'settings'
  | 'notifications'
  | 'wishlist'
  | 'dashboard';

function App() {
  const [isLoading, setIsLoading] = useState(true);
  const [currentPage, setCurrentPage] = useState<Page>('home');
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [user, setUser] = useState<User | null>(null);
  const [selectedStoryId, setSelectedStoryId] = useState<string | null>(null);
  const [selectedChapter, setSelectedChapter] = useState<number>(1);
  const [theme, setTheme] = useState<'light' | 'dark'>('dark');
  
  // Mock state management
  const [stories] = useState<Story[]>(mockStories);
  const [userProgress, setUserProgress] = useState<UserProgress[]>(mockUserProgress);
  const [bookmarks, setBookmarks] = useState<Bookmark[]>(mockBookmarks);
  const [ratings, setRatings] = useState<Rating[]>(mockRatings);
  const [comments, setComments] = useState<Comment[]>(mockComments);
  const [activities, setActivities] = useState<Activity[]>(mockActivities);
  const [notifications, setNotifications] = useState<Notification[]>(mockNotifications);
  const [wishlistItems, setWishlistItems] = useState<WishlistItem[]>(mockWishlistItems);
  const [wishlistComments, setWishlistComments] = useState<WishlistComment[]>(mockWishlistComments);
  const [corrections, setCorrections] = useState<CorrectionSuggestion[]>(mockCorrections);
  const [notices, setNotices] = useState<DevNotice[]>(mockNotices);
  const [analytics, setAnalytics] = useState<StoryAnalytics[]>(mockAnalytics);
  const [chapters, setChapters] = useState<Chapter[]>(mockChapters);
  const [paragraphHighlights, setParagraphHighlights] = useState<ParagraphHighlight[]>([]);

  // Simulate loading
  useEffect(() => {
    const timer = setTimeout(() => {
      setIsLoading(false);
    }, 2000); // 2 second loading screen

    // Register service worker for offline support
    registerServiceWorker();

    return () => clearTimeout(timer);
  }, []);

  // Apply theme to document root
  useEffect(() => {
    const root = document.documentElement;
    if (theme === 'dark') {
      root.classList.add('dark');
    } else {
      root.classList.remove('dark');
    }
  }, [theme]);

  const handleSignIn = (email: string, password: string) => {
    // Mock authentication
    setUser(mockUser);
    setIsAuthenticated(true);
    setCurrentPage('home');
  };

  const handleSignUp = (email: string, password: string, username: string) => {
    // Mock registration
    const newUser: User = {
      id: 'user-new',
      email,
      username,
      joinedDate: new Date().toISOString().split('T')[0],
    };
    setUser(newUser);
    setIsAuthenticated(true);
    setCurrentPage('home');
  };

  const handleLogout = () => {
    setUser(null);
    setIsAuthenticated(false);
    setCurrentPage('signin');
  };

  const handleNavigate = (page: string) => {
    setCurrentPage(page as Page);
  };

  const handleStoryClick = (storyId: string) => {
    setSelectedStoryId(storyId);
    setCurrentPage('story');
  };

  const handleReadChapter = (chapterNum: number) => {
    setSelectedChapter(chapterNum);
    setCurrentPage('reader');

    // Update progress
    if (selectedStoryId && user) {
      const existingProgress = userProgress.find((p) => p.storyId === selectedStoryId);
      const story = stories.find((s) => s.id === selectedStoryId);

      if (existingProgress) {
        setUserProgress(
          userProgress.map((p) =>
            p.storyId === selectedStoryId
              ? { ...p, currentChapter: chapterNum, lastReadAt: new Date().toISOString() }
              : p
          )
        );
      } else if (story) {
        setUserProgress([
          ...userProgress,
          {
            storyId: selectedStoryId,
            currentChapter: chapterNum,
            totalChapters: story.totalChapters,
            lastReadAt: new Date().toISOString(),
          },
        ]);
      }

      // Add activity
      if (story) {
        setActivities([
          {
            id: `activity-${Date.now()}`,
            userId: user.id,
            type: 'read',
            storyId: selectedStoryId,
            storyTitle: story.title,
            chapterNumber: chapterNum,
            timestamp: new Date().toISOString(),
            details: `Read Chapter ${chapterNum}`,
          },
          ...activities,
        ]);
      }
    }
  };

  const handleToggleBookmark = () => {
    if (!selectedStoryId || !user) return;

    const isBookmarked = bookmarks.some(
      (b) => b.storyId === selectedStoryId && b.userId === user.id
    );

    if (isBookmarked) {
      setBookmarks(bookmarks.filter((b) => b.storyId !== selectedStoryId));
    } else {
      const newBookmark: Bookmark = {
        id: `bookmark-${Date.now()}`,
        userId: user.id,
        storyId: selectedStoryId,
        addedAt: new Date().toISOString().split('T')[0],
      };
      setBookmarks([...bookmarks, newBookmark]);

      // Add activity
      const story = stories.find((s) => s.id === selectedStoryId);
      if (story) {
        setActivities([
          {
            id: `activity-${Date.now()}`,
            userId: user.id,
            type: 'bookmark',
            storyId: selectedStoryId,
            storyTitle: story.title,
            timestamp: new Date().toISOString(),
            details: 'Added to bookmarks',
          },
          ...activities,
        ]);
      }
    }
  };

  const handleRate = (rating: number) => {
    if (!selectedStoryId || !user) return;

    const existingRating = ratings.find(
      (r) => r.storyId === selectedStoryId && r.userId === user.id
    );

    if (existingRating) {
      setRatings(
        ratings.map((r) =>
          r.storyId === selectedStoryId && r.userId === user.id ? { ...r, rating } : r
        )
      );
    } else {
      const newRating: Rating = {
        id: `rating-${Date.now()}`,
        userId: user.id,
        storyId: selectedStoryId,
        rating,
        createdAt: new Date().toISOString(),
      };
      setRatings([...ratings, newRating]);

      // Add activity
      const story = stories.find((s) => s.id === selectedStoryId);
      if (story) {
        setActivities([
          {
            id: `activity-${Date.now()}`,
            userId: user.id,
            type: 'rate',
            storyId: selectedStoryId,
            storyTitle: story.title,
            timestamp: new Date().toISOString(),
            details: `Rated ${rating} stars`,
          },
          ...activities,
        ]);
      }
    }
  };

  const handleAddComment = (content: string) => {
    if (!user) return;

    const newComment: Comment = {
      id: `comment-${Date.now()}`,
      userId: user.id,
      username: user.username,
      userAvatar: user.avatar,
      storyId: currentPage === 'story' ? selectedStoryId || undefined : undefined,
      chapterId: currentPage === 'reader' ? `chapter-${selectedStoryId}-${selectedChapter}` : undefined,
      content,
      createdAt: new Date().toISOString(),
      likes: 0,
    };
    setComments([newComment, ...comments]);

    // Add activity
    if (selectedStoryId) {
      const story = stories.find((s) => s.id === selectedStoryId);
      if (story) {
        setActivities([
          {
            id: `activity-${Date.now()}`,
            userId: user.id,
            type: 'comment',
            storyId: selectedStoryId,
            storyTitle: story.title,
            timestamp: new Date().toISOString(),
            details: 'Posted a comment',
          },
          ...activities,
        ]);
      }
    }
  };

  const handleMarkNotificationAsRead = (id: string) => {
    setNotifications(
      notifications.map((n) => (n.id === id ? { ...n, read: true } : n))
    );
  };

  const handleMarkAllNotificationsAsRead = () => {
    setNotifications(notifications.map((n) => ({ ...n, read: true })));
  };

  const handleDeleteNotification = (id: string) => {
    setNotifications(notifications.filter((n) => n.id !== id));
  };

  const handleNotificationClick = (notification: Notification) => {
    // Mark as read
    handleMarkNotificationAsRead(notification.id);
    
    // Navigate based on notification type and content
    if (notification.chapterNumber && notification.storyId) {
      // Navigate to specific chapter
      setSelectedStoryId(notification.storyId);
      setSelectedChapter(notification.chapterNumber);
      setCurrentPage('reader');
    } else if (notification.storyId) {
      // Navigate to story detail
      handleStoryClick(notification.storyId);
    }
  };

  const handleResetPassword = async (email: string) => {
    try {
      await api.resetPassword(email);
      toast.success('Password reset email sent!');
    } catch (error: any) {
      toast.error(error.message || 'Failed to send reset email');
      throw error;
    }
  };

  const handleUpdateProfile = async (username: string, password?: string) => {
    try {
      await api.updateProfile(username, password);
      
      // Update local user state
      if (user) {
        setUser({ ...user, username });
        toast.success('Profile updated successfully!');
      }
    } catch (error: any) {
      toast.error(error.message || 'Failed to update profile');
      throw error;
    }
  };

  // Wishlist handlers
  const handleAddWishlistItem = (item: Omit<WishlistItem, 'id' | 'upvotes' | 'upvotedBy' | 'commentCount' | 'createdAt' | 'status'>) => {
    const newItem: WishlistItem = {
      ...item,
      id: `wish-${Date.now()}`,
      upvotes: 0,
      upvotedBy: [],
      commentCount: 0,
      createdAt: new Date().toISOString(),
      status: 'pending',
    };
    setWishlistItems([newItem, ...wishlistItems]);
  };

  const handleUpvoteWishlistItem = (itemId: string) => {
    if (!user) return;

    setWishlistItems(wishlistItems.map(item => {
      if (item.id === itemId) {
        const hasUpvoted = item.upvotedBy.includes(user.id);
        return {
          ...item,
          upvotes: hasUpvoted ? item.upvotes - 1 : item.upvotes + 1,
          upvotedBy: hasUpvoted 
            ? item.upvotedBy.filter(id => id !== user.id)
            : [...item.upvotedBy, user.id],
        };
      }
      return item;
    }));
  };

  const handleAddWishlistComment = (wishlistItemId: string, content: string) => {
    if (!user) return;

    const newComment: WishlistComment = {
      id: `wish-comment-${Date.now()}`,
      wishlistItemId,
      userId: user.id,
      username: user.username,
      userAvatar: user.avatar,
      content,
      createdAt: new Date().toISOString(),
      likes: 0,
    };
    setWishlistComments([newComment, ...wishlistComments]);

    // Update comment count
    setWishlistItems(wishlistItems.map(item => 
      item.id === wishlistItemId 
        ? { ...item, commentCount: item.commentCount + 1 }
        : item
    ));
  };

  // Dashboard handlers
  const handleUpdateWishlistStatus = (itemId: string, status: WishlistItem['status']) => {
    setWishlistItems(wishlistItems.map(item =>
      item.id === itemId ? { ...item, status } : item
    ));
    toast.success(`Wishlist item ${status}!`);
  };

  const handleUpdateCorrectionStatus = (correctionId: string, status: CorrectionSuggestion['status'], userId: string, username: string) => {
    setCorrections(corrections.map(correction =>
      correction.id === correctionId ? { ...correction, status } : correction
    ));
    
    // If approved, send thank you notification to the user
    if (status === 'approved') {
      const newNotification: Notification = {
        id: `notif-${Date.now()}`,
        userId,
        type: 'correction_accepted',
        title: 'Correction Accepted!',
        message: `Thank you ${username}! Your correction suggestion has been accepted and the content has been updated.`,
        createdAt: new Date().toISOString(),
        read: false,
      };
      setNotifications([newNotification, ...notifications]);
    }
    
    toast.success(`Correction ${status}!`);
  };

  const handleCreateNotice = (notice: Omit<DevNotice, 'id' | 'createdAt'>) => {
    const newNotice: DevNotice = {
      ...notice,
      id: `notice-${Date.now()}`,
      createdAt: new Date().toISOString(),
    };
    setNotices([newNotice, ...notices]);
  };

  const handleAddCorrectionSuggestion = (correction: Omit<CorrectionSuggestion, 'id' | 'status' | 'createdAt'>) => {
    if (!user) return;

    const newCorrection: CorrectionSuggestion = {
      ...correction,
      id: `correction-${Date.now()}`,
      status: 'pending',
      createdAt: new Date().toISOString(),
    };
    setCorrections([newCorrection, ...corrections]);
    toast.success('Correction submitted for review!');
  };

  // Paragraph highlight handlers
  const handleAddParagraphHighlight = (highlight: Omit<ParagraphHighlight, 'id' | 'createdAt'>) => {
    if (!user) return;

    const newHighlight: ParagraphHighlight = {
      ...highlight,
      id: `highlight-${Date.now()}`,
      createdAt: new Date().toISOString(),
    };
    setParagraphHighlights([newHighlight, ...paragraphHighlights]);
  };

  const handleRemoveParagraphHighlight = (highlightId: string) => {
    setParagraphHighlights(paragraphHighlights.filter(h => h.id !== highlightId));
  };

  // Content management handlers
  const handleAddStory = (storyData: Omit<Story, 'id' | 'createdAt' | 'updatedAt' | 'rating' | 'totalRatings' | 'totalChapters'>) => {
    const newStory: Story = {
      ...storyData,
      id: `story-${Date.now()}`,
      rating: 0,
      totalRatings: 0,
      totalChapters: 0,
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
    };
    
    // Note: stories is const, so in a real app we'd use setStories here
    // For now, just send notifications to all users
    const newNotification: Notification = {
      id: `notif-${Date.now()}`,
      userId: 'all', // In real implementation, create one for each user
      type: 'new_story',
      title: 'New Story Added!',
      message: `Check out the new story: "${newStory.title}" by ${newStory.author}`,
      storyId: newStory.id,
      storyTitle: newStory.title,
      createdAt: new Date().toISOString(),
      read: false,
    };
    setNotifications([newNotification, ...notifications]);
    toast.success('Story added and notifications sent!');
  };

  const handleAddChapter = (chapterData: Omit<Chapter, 'id' | 'publishedAt'>) => {
    const newChapter: Chapter = {
      ...chapterData,
      id: `chapter-${Date.now()}`,
      publishedAt: new Date().toISOString(),
    };
    setChapters([...chapters, newChapter]);
    
    // Send notifications to all users
    const story = stories.find(s => s.id === chapterData.storyId);
    if (story) {
      const newNotification: Notification = {
        id: `notif-${Date.now()}`,
        userId: 'all', // In real implementation, create one for each user
        type: 'new_chapter',
        title: 'New Chapter Published!',
        message: `${story.title} - Chapter ${chapterData.chapterNumber}: ${chapterData.title}`,
        storyId: story.id,
        storyTitle: story.title,
        chapterNumber: chapterData.chapterNumber,
        createdAt: new Date().toISOString(),
        read: false,
      };
      setNotifications([newNotification, ...notifications]);
      toast.success('Chapter added and notifications sent!');
    }
  };

  const handleToggleTheme = () => {
    setTheme(theme === 'dark' ? 'light' : 'dark');
  };

  const unreadNotificationCount = notifications.filter((n) => !n.read).length;

  const selectedStory = selectedStoryId ? stories.find((s) => s.id === selectedStoryId) : null;
  const isBookmarked = selectedStoryId
    ? bookmarks.some((b) => b.storyId === selectedStoryId)
    : false;
  const userRating = selectedStoryId
    ? ratings.find((r) => r.storyId === selectedStoryId && r.userId === user?.id)?.rating
    : undefined;
  const bookmarkedStories = stories.filter((s) =>
    bookmarks.some((b) => b.storyId === s.id)
  );

  const currentChapter = chapters.find(
    (c) => c.storyId === selectedStoryId && c.chapterNumber === selectedChapter
  ) || chapters[0];

  return (
    <div className={`min-h-screen bg-background text-foreground ${theme}`}>
      <AnimatePresence mode="wait">
        {isLoading ? (
          <LoadingScreen />
        ) : (
          <>
            <Header
              currentPage={currentPage}
              onNavigate={handleNavigate}
              isAuthenticated={isAuthenticated}
              onLogout={handleLogout}
              username={user?.username}
              unreadNotificationCount={unreadNotificationCount}
              theme={theme}
              onToggleTheme={handleToggleTheme}
            />

            <motion.div
              key={currentPage}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              transition={{ duration: 0.3 }}
            >
              {currentPage === 'signin' && (
                <SignIn onSignIn={handleSignIn} onNavigate={handleNavigate} />
              )}

              {currentPage === 'signup' && (
                <SignUp onSignUp={handleSignUp} onNavigate={handleNavigate} />
              )}

              {currentPage === 'forgot-password' && (
                <ForgotPassword 
                  onNavigate={handleNavigate}
                  onResetPassword={handleResetPassword}
                />
              )}

              {currentPage === 'home' && (
                <Home
                  stories={stories}
                  userProgress={userProgress}
                  onStoryClick={handleStoryClick}
                />
              )}

              {currentPage === 'story' && selectedStory && (
                <StoryDetail
                  story={selectedStory}
                  isBookmarked={isBookmarked}
                  userRating={userRating}
                  comments={comments}
                  progress={userProgress.find((p) => p.storyId === selectedStoryId) || undefined}
                  onBack={() => setCurrentPage('home')}
                  onToggleBookmark={handleToggleBookmark}
                  onRate={handleRate}
                  onReadChapter={handleReadChapter}
                  onAddComment={handleAddComment}
                />
              )}

              {currentPage === 'reader' && selectedStory && (
                <Reader
                  chapter={currentChapter}
                  story={selectedStory}
                  totalChapters={selectedStory.totalChapters}
                  comments={comments}
                  user={user}
                  paragraphHighlights={paragraphHighlights}
                  onBack={() => setCurrentPage('story')}
                  onNavigateChapter={handleReadChapter}
                  onAddComment={handleAddComment}
                  onAddCorrectionSuggestion={handleAddCorrectionSuggestion}
                  onAddParagraphHighlight={handleAddParagraphHighlight}
                  onRemoveParagraphHighlight={handleRemoveParagraphHighlight}
                />
              )}

              {currentPage === 'bookmarks' && (
                <Bookmarks
                  bookmarkedStories={bookmarkedStories}
                  userProgress={userProgress}
                  onStoryClick={handleStoryClick}
                />
              )}

              {currentPage === 'profile' && user && (
                <Profile
                  user={user}
                  activities={activities}
                  totalStoriesRead={userProgress.length}
                  totalRatingsGiven={ratings.length}
                  totalComments={comments.filter((c) => c.userId === user.id).length}
                  onNavigate={(page, storyId, chapter) => {
                    if (page === 'chapter' && storyId && chapter) {
                      setSelectedStoryId(storyId);
                      setSelectedChapter(chapter);
                      setCurrentPage('reader');
                    } else if (page === 'story' && storyId) {
                      setSelectedStoryId(storyId);
                      setCurrentPage('story');
                    }
                  }}
                  onUpdateProfile={handleUpdateProfile}
                />
              )}

              {currentPage === 'settings' && (
                <Settings onSave={() => setCurrentPage('home')} />
              )}

              {currentPage === 'notifications' && (
                <Notifications
                  notifications={notifications}
                  onMarkAsRead={handleMarkNotificationAsRead}
                  onMarkAllAsRead={handleMarkAllNotificationsAsRead}
                  onDelete={handleDeleteNotification}
                  onNotificationClick={handleNotificationClick}
                />
              )}

              {currentPage === 'wishlist' && (
                <Wishlist
                  wishlistItems={wishlistItems}
                  wishlistComments={wishlistComments}
                  user={user}
                  isAuthenticated={isAuthenticated}
                  onAddWishlistItem={handleAddWishlistItem}
                  onUpvoteWishlistItem={handleUpvoteWishlistItem}
                  onAddWishlistComment={handleAddWishlistComment}
                />
              )}

              {currentPage === 'dashboard' && (
                <Dashboard
                  wishlistItems={wishlistItems}
                  corrections={corrections}
                  notices={notices}
                  analytics={analytics}
                  stories={stories}
                  onUpdateWishlistStatus={handleUpdateWishlistStatus}
                  onUpdateCorrectionStatus={handleUpdateCorrectionStatus}
                  onCreateNotice={handleCreateNotice}
                  onAddStory={handleAddStory}
                  onAddChapter={handleAddChapter}
                />
              )}
            </motion.div>
          </>
        )}
      </AnimatePresence>
      <Toaster />
    </div>
  );
}

export default App;
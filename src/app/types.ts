// Type definitions for Orange Tomato

export interface User {
  id: string;
  email: string;
  username: string;
  avatar?: string;
  bio?: string;
  joinedDate: string;
}

export interface Story {
  id: string;
  title: string;
  author: string;
  coverImage: string;
  description: string;
  genres: string[];
  rating: number;
  totalRatings: number;
  totalChapters: number;
  status: 'ongoing' | 'completed' | 'hiatus';
  createdAt: string;
  updatedAt: string;
}

export interface Chapter {
  id: string;
  storyId: string;
  chapterNumber: number;
  title: string;
  content: string;
  publishedAt: string;
}

export interface UserProgress {
  storyId: string;
  currentChapter: number;
  totalChapters: number;
  lastReadAt: string;
}

export interface Bookmark {
  id: string;
  userId: string;
  storyId: string;
  addedAt: string;
}

export interface Rating {
  id: string;
  userId: string;
  storyId: string;
  rating: number;
  createdAt: string;
}

export interface Comment {
  id: string;
  userId: string;
  username: string;
  userAvatar?: string;
  storyId?: string;
  chapterId?: string;
  content: string;
  createdAt: string;
  likes: number;
}

export interface Activity {
  id: string;
  userId: string;
  type: 'read' | 'bookmark' | 'rate' | 'comment';
  storyId: string;
  storyTitle: string;
  chapterNumber?: number; // For read activities
  timestamp: string;
  details?: string;
}

export interface Notification {
  id: string;
  userId: string;
  type: 'new_chapter' | 'comment_reply' | 'like' | 'follow' | 'system' | 'correction_accepted' | 'new_story';
  title: string;
  message: string;
  storyId?: string;
  storyTitle?: string;
  chapterNumber?: number;
  createdAt: string;
  read: boolean;
}

export interface WishlistItem {
  id: string;
  userId: string;
  username: string;
  userAvatar?: string;
  title: string;
  author?: string;
  description: string;
  coverImage?: string;
  upvotes: number;
  upvotedBy: string[]; // Array of user IDs who upvoted
  commentCount: number;
  createdAt: string;
  status: 'pending' | 'approved' | 'rejected' | 'completed';
}

export interface WishlistComment {
  id: string;
  wishlistItemId: string;
  userId: string;
  username: string;
  userAvatar?: string;
  content: string;
  createdAt: string;
  likes: number;
}

export interface TextHighlight {
  id: string;
  chapterId: string;
  userId: string;
  username: string;
  text: string;
  startOffset: number;
  endOffset: number;
  comment?: string;
  createdAt: string;
}

export interface ParagraphHighlight {
  id: string;
  chapterId: string;
  userId: string;
  username: string;
  paragraphIndex: number;
  paragraphText: string;
  comment?: string;
  isCorrection: boolean;
  createdAt: string;
}

export interface CorrectionSuggestion {
  id: string;
  chapterId: string;
  userId: string;
  username: string;
  originalText: string;
  suggestedText: string;
  startOffset: number;
  endOffset: number;
  reason?: string;
  status: 'pending' | 'approved' | 'rejected';
  createdAt: string;
}

export interface DevNotice {
  id: string;
  title: string;
  message: string;
  type: 'info' | 'warning' | 'update';
  createdAt: string;
  expiresAt?: string;
}

export interface StoryAnalytics {
  storyId: string;
  viewCount: number;
  uniqueViewers: string[]; // Array of user IDs
  chapterViews: { [chapterNumber: number]: number };
  lastViewed: string;
}
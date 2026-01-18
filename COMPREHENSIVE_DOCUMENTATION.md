# Orange Tomato - Comprehensive Project Documentation

## Table of Contents
1. [Project Overview](#project-overview)
2. [Technology Stack](#technology-stack)
3. [Project Architecture](#project-architecture)
4. [File Structure](#file-structure)
5. [Core Systems](#core-systems)
6. [Feature Documentation](#feature-documentation)
7. [Database Schema](#database-schema)
8. [Component Relationships](#component-relationships)
9. [API Integration](#api-integration)
10. [Development Guidelines](#development-guidelines)

---

## Project Overview

**Orange Tomato** is a modern light novel reading platform with comprehensive user engagement features including:
- User authentication and profile management
- Story browsing with progress tracking
- Chapter reading with content protection
- User-generated content (comments, ratings, corrections)
- Notification system
- Wishlist/suggestion system
- Developer dashboard for content management
- Dark/Light theme toggle
- SEO optimization with react-router-dom

### Key Features
- 📚 Story library with card-based UI
- 📖 Reader with paragraph-level commenting
- ⭐ 5-star rating system
- 🔖 Bookmarking functionality
- 🔔 Real-time notifications
- 💬 Comment sections for stories and chapters
- ✏️ Text correction suggestions
- 📊 Analytics dashboard
- 🎨 Theme customization (dark/light mode)
- 🔊 Sound notifications
- 🔗 Social sharing (Twitter, Reddit)
- 🛡️ Content protection (copy/right-click disabled)

---

## Technology Stack

### Frontend
- **React 18.3.1** - UI framework
- **TypeScript** - Type safety
- **Tailwind CSS 4.1.12** - Styling
- **Motion (Framer Motion) 12.23.24** - Animations
- **React Router DOM 7.12.0** - Routing

### UI Components
- **Radix UI** - Accessible component primitives
- **Lucide React** - Icon library
- **Sonner** - Toast notifications
- **Recharts** - Charts and graphs

### Backend & Database
- **Supabase** - Backend as a Service (BaaS)
  - PostgreSQL database
  - Authentication
  - Real-time subscriptions
  - Edge Functions

### Build Tools
- **Vite 6.3.5** - Build tool and dev server
- **PostCSS** - CSS processing

---

## Project Architecture

```
Orange Tomato Application
│
├── Authentication Layer (Supabase Auth)
│   └── User sessions, JWT tokens
│
├── Frontend Application (React + TypeScript)
│   ├── Pages (Routes)
│   ├── Components (Reusable UI)
│   ├── Utils (Helper functions)
│   └── Data Management (State + API)
│
├── API Layer (Supabase Functions)
│   ├── REST endpoints
│   └── Real-time listeners
│
└── Database Layer (PostgreSQL)
    └── User data, stories, comments, etc.
```

### Data Flow Architecture
```
User Interaction
    ↓
React Component
    ↓
State Management (useState/useEffect)
    ↓
API Utils (/src/app/utils/api.ts)
    ↓
Supabase Client
    ↓
Backend Functions (/supabase/functions)
    ↓
PostgreSQL Database
    ↓
Real-time Updates (WebSocket)
    ↓
React Component Re-render
```

---

## File Structure

### Root Directory
```
/
├── guidelines/                    # Project documentation
│   ├── Guidelines.md             # Original guidelines
│   └── COMPREHENSIVE_DOCUMENTATION.md
├── public/
│   └── sw.js                     # Service worker for offline support
├── src/
│   ├── app/                      # Main application code
│   │   ├── App.tsx              # Root component & routing
│   │   ├── types.ts             # TypeScript type definitions
│   │   ├── components/          # Reusable React components
│   │   ├── pages/               # Page components
│   │   ├── data/                # Mock/static data
│   │   └── utils/               # Utility functions
│   └── styles/                   # Global styles
├── supabase/                     # Backend functions
│   └── functions/
│       └── server/               # API endpoints
├── utils/
│   └── supabase/                # Supabase configuration
├── package.json                  # Dependencies
├── vite.config.ts               # Vite configuration
└── postcss.config.mjs           # PostCSS configuration
```

### Detailed File Tree

#### `/src/app/` - Application Core
```
/src/app/
├── App.tsx                       # Main app component, state management, routing
├── types.ts                      # All TypeScript interfaces
│
├── components/                   # Reusable components
│   ├── CommentSection.tsx       # Comment display and input
│   ├── EditProfileDialog.tsx    # Profile editing modal
│   ├── Header.tsx               # Navigation header
│   ├── HeroCarousel.tsx         # Homepage carousel
│   ├── LoadingScreen.tsx        # Initial loading animation
│   ├── SEOHead.tsx              # SEO meta tags component
│   ├── ScrollableStoryRow.tsx  # Horizontal story scroller
│   ├── ShareButtons.tsx         # Social sharing buttons
│   ├── StoryCard.tsx            # Story preview card
│   ├── ThemeToggle.tsx          # Dark/Light mode toggle
│   └── ui/                      # Radix UI component wrappers
│       ├── accordion.tsx
│       ├── alert-dialog.tsx
│       ├── button.tsx
│       ├── card.tsx
│       ├── dialog.tsx
│       ├── input.tsx
│       ├── select.tsx
│       ├── tabs.tsx
│       └── ... (30+ UI components)
│
├── pages/                        # Page components (routes)
│   ├── Home.tsx                 # Homepage with story listings
│   ├── StoryDetail.tsx          # Individual story page
│   ├── Reader.tsx               # Chapter reading interface
│   ├── ReaderClean.tsx          # Alternative reader (experimental)
│   ├── Bookmarks.tsx            # User's bookmarked stories
│   ├── Profile.tsx              # User profile and activity
│   ├── Settings.tsx             # User settings
│   ├── Notifications.tsx        # Notification center
│   ├── Wishlist.tsx             # Story suggestion/voting
│   ├── Dashboard.tsx            # Developer/admin dashboard
│   ├── SignIn.tsx               # Login page
│   ├── SignUp.tsx               # Registration page
│   └── ForgotPassword.tsx       # Password reset page
│
├── data/
│   └── mockData.ts              # Sample/fallback data
│
└── utils/                        # Utility modules
    ├── api.ts                   # API functions & Supabase client
    ├── sounds.ts                # Sound notification utilities
    └── offline.ts               # Service worker & offline support
```

#### `/supabase/functions/` - Backend
```
/supabase/functions/
└── server/
    ├── index.tsx                # Main API endpoint handler
    └── kv_store.tsx            # Key-value storage utilities
```

#### `/src/styles/` - Styling
```
/src/styles/
├── fonts.css                    # Font imports
├── index.css                    # Main entry stylesheet
├── tailwind.css                 # Tailwind base imports
└── theme.css                    # Theme variables (colors, spacing)
```

---

## Core Systems

### 1. Authentication System

**Files Involved:**
- `/src/app/utils/api.ts` - API functions
- `/src/app/pages/SignIn.tsx` - Login UI
- `/src/app/pages/SignUp.tsx` - Registration UI
- `/src/app/pages/ForgotPassword.tsx` - Password reset UI
- `/supabase/functions/server/index.tsx` - Backend auth logic

**Flow:**
```
User enters credentials
    ↓
SignIn/SignUp component validates input
    ↓
api.signIn() or api.signUp() called
    ↓
Request sent to Supabase Edge Function
    ↓
Supabase Auth verifies credentials
    ↓
JWT token + user data returned
    ↓
App.tsx updates user state
    ↓
User redirected to Home page
```

**Key Functions:**
- `signIn(email, password)` - Authenticate user
- `signUp(email, password, username)` - Register new user
- `signOut()` - End user session
- `resetPassword(email)` - Send password reset email
- `getSession()` - Retrieve current session
- `setAccessToken(token)` - Store auth token

**State Management (in App.tsx):**
```typescript
const [isAuthenticated, setIsAuthenticated] = useState(false);
const [user, setUser] = useState<User | null>(null);
```

### 2. Navigation & Routing System

**Files Involved:**
- `/src/app/App.tsx` - Main routing logic
- `/src/app/components/Header.tsx` - Navigation UI
- `/src/app/components/SEOHead.tsx` - SEO meta tags

**Page Types:**
```typescript
type Page =
  | 'signin'      // Login page
  | 'signup'      // Registration
  | 'forgot-password'
  | 'home'        // Story listings
  | 'story'       // Story detail
  | 'reader'      // Chapter reader
  | 'bookmarks'   // Saved stories
  | 'profile'     // User profile
  | 'settings'    // Account settings
  | 'notifications'
  | 'wishlist'    // Story suggestions
  | 'dashboard';  // Admin panel
```

**Navigation Functions:**
```typescript
handleNavigate(page: string)
handleStoryClick(storyId: string)
handleReadChapter(chapterNum: number)
handleNotificationClick(notification)
```

**URL Structure (SEO-friendly):**
```
/                          → Home
/story/:storyId           → Story Detail
/story/:storyId/chapter/:chapterNum  → Reader
/profile                  → User Profile
/bookmarks               → Bookmarks
/notifications           → Notifications
/wishlist               → Wishlist
/dashboard              → Developer Dashboard
```

### 3. Story Management System

**Files Involved:**
- `/src/app/data/mockData.ts` - Story data
- `/src/app/pages/Home.tsx` - Story listing
- `/src/app/pages/StoryDetail.tsx` - Story detail view
- `/src/app/components/StoryCard.tsx` - Story card UI
- `/src/app/components/ScrollableStoryRow.tsx` - Horizontal scroll

**Story Data Structure:**
```typescript
interface Story {
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
```

**Key Features:**
- Story browsing by genre
- Progress tracking per story
- Bookmarking
- Rating (1-5 stars)
- Comments per story

### 4. Reader System

**Files Involved:**
- `/src/app/pages/Reader.tsx` - Main reader component
- `/src/app/pages/ReaderClean.tsx` - Alternative reader
- `/src/app/utils/offline.ts` - Offline reading support

**Reader Features:**
1. **Content Display**
   - Adjustable font size
   - Protected content (no copy/paste)
   - Paragraph numbering

2. **Paragraph Comments** (Star Icon System)
   - Click star icon next to paragraph
   - Add comment or correction
   - View existing highlights
   - Toggle highlight visibility

3. **Chapter Navigation**
   - Previous/Next buttons
   - Chapter selector dropdown
   - Progress auto-save

4. **Reader Settings**
   - Font size adjustment (14-24px)
   - Theme toggle (inherited from global)
   - Show/hide highlights

5. **Content Protection**
   - Disabled right-click
   - Disabled text selection copy
   - Disabled Ctrl+C, Ctrl+U, F12
   - Disabled drag-and-drop

**Reader Functions:**
```typescript
handleTextSelection()
handleParagraphComment(paragraphIndex, paragraphText)
handleSubmitParagraphComment()
handleToggleHighlights()
handleFontSizeChange(size: number)
```

**Paragraph Highlight Structure:**
```typescript
interface ParagraphHighlight {
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
```

### 5. Comment System

**Files Involved:**
- `/src/app/components/CommentSection.tsx` - Comment UI
- `/src/app/utils/api.ts` - Comment API calls
- `/src/app/utils/sounds.ts` - Comment sound effects

**Comment Types:**
1. **Story Comments** - Attached to story detail page
2. **Chapter Comments** - Attached to reader page
3. **Paragraph Comments** - Attached to specific paragraphs (via star icons)
4. **Wishlist Comments** - Attached to wishlist items

**Comment Structure:**
```typescript
interface Comment {
  id: string;
  userId: string;
  username: string;
  userAvatar?: string;
  storyId?: string;      // For story comments
  chapterId?: string;    // For chapter comments
  content: string;
  createdAt: string;
  likes: number;
}
```

**Comment Flow:**
```
User types comment
    ↓
onAddComment(content) called
    ↓
playCommentSound() triggered
    ↓
New comment added to state
    ↓
Activity logged
    ↓
UI updates with new comment
```

### 6. Notification System

**Files Involved:**
- `/src/app/pages/Notifications.tsx` - Notification center
- `/src/app/components/Header.tsx` - Notification badge
- `/src/app/utils/sounds.ts` - Notification sounds

**Notification Types:**
```typescript
type NotificationType = 
  | 'new_chapter'           // New chapter published
  | 'new_story'             // New story added
  | 'comment_reply'         // Reply to user's comment
  | 'like'                  // Comment liked
  | 'follow'                // New follower
  | 'system'                // System message
  | 'correction_accepted';  // User's correction approved
```

**Notification Structure:**
```typescript
interface Notification {
  id: string;
  userId: string;
  type: NotificationType;
  title: string;
  message: string;
  storyId?: string;
  storyTitle?: string;
  chapterNumber?: number;
  createdAt: string;
  read: boolean;
}
```

**Notification Actions:**
- Mark as read (individual)
- Mark all as read (bulk)
- Delete notification
- Click to navigate to story/chapter

### 7. Bookmarking System

**Files Involved:**
- `/src/app/pages/Bookmarks.tsx` - Bookmarks page
- `/src/app/pages/StoryDetail.tsx` - Bookmark toggle button
- `/src/app/utils/api.ts` - Bookmark API

**Bookmark Structure:**
```typescript
interface Bookmark {
  id: string;
  userId: string;
  storyId: string;
  addedAt: string;
}
```

**Bookmark Functions:**
```typescript
handleToggleBookmark()       // Add/remove bookmark
getBookmarks()              // Fetch user bookmarks
isBookmarked(storyId)       // Check if bookmarked
```

### 8. Rating System

**Files Involved:**
- `/src/app/pages/StoryDetail.tsx` - Star rating UI
- `/src/app/components/StoryCard.tsx` - Display average rating

**Rating Structure:**
```typescript
interface Rating {
  id: string;
  userId: string;
  storyId: string;
  rating: number;          // 1-5 stars
  createdAt: string;
}
```

**Rating Calculation:**
```typescript
// Average rating displayed on story cards
averageRating = totalRatingValue / totalRatings;
```

### 9. Progress Tracking System

**Files Involved:**
- `/src/app/App.tsx` - Progress state management
- `/src/app/components/StoryCard.tsx` - Progress display
- `/src/app/utils/api.ts` - Progress API

**Progress Structure:**
```typescript
interface UserProgress {
  storyId: string;
  currentChapter: number;
  totalChapters: number;
  lastReadAt: string;
}
```

**Progress Features:**
- Auto-save on chapter read
- Progress bar on story cards
- "Continue Reading" functionality
- Last read timestamp

### 10. Activity Tracking System

**Files Involved:**
- `/src/app/pages/Profile.tsx` - Activity feed display
- `/src/app/App.tsx` - Activity logging

**Activity Types:**
```typescript
type ActivityType = 'read' | 'bookmark' | 'rate' | 'comment';
```

**Activity Structure:**
```typescript
interface Activity {
  id: string;
  userId: string;
  type: ActivityType;
  storyId: string;
  storyTitle: string;
  chapterNumber?: number;
  timestamp: string;
  details?: string;
}
```

**Tracked Activities:**
- Chapter reads
- Bookmarks added
- Ratings given
- Comments posted

### 11. Wishlist/Suggestion System

**Files Involved:**
- `/src/app/pages/Wishlist.tsx` - Wishlist page
- `/src/app/App.tsx` - Wishlist state management

**Wishlist Item Structure:**
```typescript
interface WishlistItem {
  id: string;
  userId: string;
  username: string;
  userAvatar?: string;
  title: string;
  author?: string;
  description: string;
  coverImage?: string;
  upvotes: number;
  upvotedBy: string[];     // User IDs who upvoted
  commentCount: number;
  createdAt: string;
  status: 'pending' | 'approved' | 'rejected' | 'completed';
}
```

**Wishlist Features:**
- Users suggest new stories
- Upvoting system
- Comment on suggestions
- Status tracking
- Ranking by upvotes

### 12. Developer Dashboard System

**Files Involved:**
- `/src/app/pages/Dashboard.tsx` - Admin interface

**Dashboard Sections:**

1. **Wishlist Management**
   - View all suggestions
   - Update status (pending/approved/rejected/completed)
   - Sort by upvotes/date

2. **Correction Review**
   - Review user-submitted corrections
   - Approve/Reject corrections
   - Send thank-you notifications to users

3. **Content Management**
   - Add new stories
   - Add new chapters
   - Auto-notify all users

4. **Analytics**
   - Story view counts
   - Chapter-level analytics
   - Unique viewers
   - Last viewed timestamps

**Correction Structure:**
```typescript
interface CorrectionSuggestion {
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
```

### 13. Theme System

**Files Involved:**
- `/src/app/App.tsx` - Theme state
- `/src/app/components/ThemeToggle.tsx` - Toggle UI
- `/src/styles/theme.css` - Theme variables

**Theme Implementation:**
```typescript
const [theme, setTheme] = useState<'light' | 'dark'>('dark');

useEffect(() => {
  const root = document.documentElement;
  if (theme === 'dark') {
    root.classList.add('dark');
  } else {
    root.classList.remove('dark');
  }
}, [theme]);
```

**CSS Variables (theme.css):**
```css
:root {
  --background: 0 0% 100%;
  --foreground: 0 0% 9%;
  --primary: 24 100% 50%;      /* Orange accent */
  /* ... */
}

.dark {
  --background: 0 0% 9%;
  --foreground: 0 0% 98%;
  --primary: 24 100% 50%;
  /* ... */
}
```

### 14. Sound System

**Files Involved:**
- `/src/app/utils/sounds.ts` - Sound utilities

**Sound Functions:**
```typescript
playNotificationSound()      // For general notifications
playCommentSound()           // For comment actions
playBeep(frequency, duration) // Custom beep sound
```

**Implementation:**
- Uses Web Audio API
- Base64 encoded WAV files
- Volume control
- Cross-browser compatible

### 15. Offline Support System

**Files Involved:**
- `/src/app/utils/offline.ts` - Service worker registration
- `/public/sw.js` - Service worker logic

**Offline Features:**
- Cache chapters for offline reading
- Service worker registration
- Background sync
- Cache management

**Functions:**
```typescript
registerServiceWorker()
cacheChapterForOffline(chapterId, content)
```

### 16. SEO System

**Files Involved:**
- `/src/app/components/SEOHead.tsx` - Meta tags component

**SEO Features:**
```typescript
<SEOHead
  title="Story Title - Orange Tomato"
  description="Story description"
  url="/story/story-id"
  image="/cover-image.jpg"
  type="article"
/>
```

**Meta Tags Generated:**
- Open Graph tags (Facebook)
- Twitter Card tags
- Canonical URL
- JSON-LD structured data

### 17. Sharing System

**Files Involved:**
- `/src/app/components/ShareButtons.tsx` - Social share buttons

**Share Platforms:**
- Twitter
- Reddit
- Generic link copy

**Share Functions:**
```typescript
handleShareTwitter(url, title)
handleShareReddit(url, title)
handleCopyLink(url)
```

---

## Feature Documentation

### Feature 1: User Registration & Login

**Purpose:** Allow users to create accounts and authenticate

**Components:**
- `SignUp.tsx` - Registration form
- `SignIn.tsx` - Login form
- `ForgotPassword.tsx` - Password reset

**Flow:**
1. User fills out form
2. Client-side validation
3. API call to Supabase
4. Session token stored
5. Redirect to home

**Related Files:**
- `/src/app/pages/SignUp.tsx`
- `/src/app/pages/SignIn.tsx`
- `/src/app/pages/ForgotPassword.tsx`
- `/src/app/utils/api.ts` (signUp, signIn, resetPassword functions)
- `/supabase/functions/server/index.tsx` (backend auth)

### Feature 2: Story Browsing

**Purpose:** Display available stories with filtering

**Components:**
- `Home.tsx` - Main listing page
- `StoryCard.tsx` - Individual story card
- `ScrollableStoryRow.tsx` - Horizontal scroll container
- `HeroCarousel.tsx` - Featured stories carousel

**Key Data:**
- Story list from `mockData.ts` or API
- User progress for "Continue Reading"
- Bookmarks for bookmarked indicator
- Ratings for star display

**Related Files:**
- `/src/app/pages/Home.tsx`
- `/src/app/components/StoryCard.tsx`
- `/src/app/components/ScrollableStoryRow.tsx`
- `/src/app/components/HeroCarousel.tsx`
- `/src/app/data/mockData.ts`

### Feature 3: Story Detail Page

**Purpose:** Show full story information and allow interactions

**Components:**
- `StoryDetail.tsx` - Story detail page
- `CommentSection.tsx` - Comments display
- `ShareButtons.tsx` - Social sharing

**Features:**
- Full description
- Genre tags
- Chapter list
- Bookmark toggle
- Star rating
- Comments section
- Share buttons
- Progress bar

**Related Files:**
- `/src/app/pages/StoryDetail.tsx`
- `/src/app/components/CommentSection.tsx`
- `/src/app/components/ShareButtons.tsx`

### Feature 4: Chapter Reader

**Purpose:** Display chapter content with interactive features

**Components:**
- `Reader.tsx` - Main reader
- `ReaderClean.tsx` - Alternative version

**Key Features:**

#### A. Paragraph Comments (Star Icon System)
**Files:** `Reader.tsx` (lines 1-100+)
**Implementation:**
```typescript
// Star icon appears on hover next to each paragraph
<div className="paragraph-container">
  <Star className="star-icon" onClick={handleParagraphComment} />
  <p>{paragraphText}</p>
</div>
```

#### B. Content Protection
**Files:** `Reader.tsx` (lines 56-94)
**Prevents:**
- Right-click context menu
- Text selection and copy (Ctrl+C)
- View source (Ctrl+U)
- Developer tools (F12)
- Drag and drop

#### C. Reader Settings
- Font size adjustment
- Highlight visibility toggle
- Chapter navigation

#### D. Correction Submission
- Users can submit text corrections
- Corrections sent to dashboard for review

**Related Files:**
- `/src/app/pages/Reader.tsx`
- `/src/app/pages/ReaderClean.tsx`
- `/src/app/utils/sounds.ts` (sound notifications)
- `/src/app/utils/offline.ts` (offline caching)

### Feature 5: Bookmarks

**Purpose:** Save stories for quick access

**Components:**
- `Bookmarks.tsx` - Bookmarks page
- Bookmark toggle in `StoryDetail.tsx`

**Flow:**
1. User clicks bookmark icon
2. `handleToggleBookmark()` in App.tsx
3. Add/remove from bookmarks array
4. Log activity
5. UI updates

**Related Files:**
- `/src/app/pages/Bookmarks.tsx`
- `/src/app/pages/StoryDetail.tsx` (toggle button)
- `/src/app/App.tsx` (handleToggleBookmark)

### Feature 6: User Profile

**Purpose:** Display user information and activity

**Components:**
- `Profile.tsx` - Profile page
- `EditProfileDialog.tsx` - Profile editor

**Profile Sections:**
1. **User Info**
   - Username
   - Email
   - Avatar
   - Join date
   - Bio

2. **Stats**
   - Stories read (clickable)
   - Ratings given (clickable)
   - Comments posted (clickable)
   - Bookmarks

3. **Recent Activity**
   - Filtered by stat clicked
   - Chronological list
   - Clickable to navigate to story/chapter

4. **Edit Profile**
   - Change username
   - Change password
   - Update via Supabase

**Related Files:**
- `/src/app/pages/Profile.tsx`
- `/src/app/components/EditProfileDialog.tsx`
- `/src/app/utils/api.ts` (updateProfile function)

### Feature 7: Notifications

**Purpose:** Inform users of new content and interactions

**Components:**
- `Notifications.tsx` - Notification center
- Header badge in `Header.tsx`

**Notification Sources:**
- New chapter published
- New story added
- Correction accepted
- Comment replies (future)
- Likes (future)

**Actions:**
- Mark as read
- Mark all as read
- Delete notification
- Click to navigate

**Related Files:**
- `/src/app/pages/Notifications.tsx`
- `/src/app/components/Header.tsx` (notification badge)
- `/src/app/App.tsx` (notification handlers)

### Feature 8: Wishlist/Suggestions

**Purpose:** Allow users to suggest and vote on new stories

**Components:**
- `Wishlist.tsx` - Wishlist page

**Features:**
- Submit new suggestion
- Upvote existing suggestions
- Comment on suggestions
- View status (pending/approved/rejected/completed)
- Sort by upvotes/date

**Related Files:**
- `/src/app/pages/Wishlist.tsx`
- `/src/app/App.tsx` (wishlist handlers)

### Feature 9: Developer Dashboard

**Purpose:** Admin interface for content management

**Components:**
- `Dashboard.tsx` - Admin dashboard

**Dashboard Tabs:**

#### Tab 1: Wishlist Management
- View all user suggestions
- Change status
- Sort and filter

#### Tab 2: Correction Review
- Review user-submitted corrections
- Approve/reject
- Send thank-you notifications

#### Tab 3: Content Management
- Add new stories
- Add new chapters
- Auto-send notifications to all users

#### Tab 4: Analytics
- View counts per story
- Chapter-level stats
- Unique viewers
- Engagement metrics

**Related Files:**
- `/src/app/pages/Dashboard.tsx`
- `/src/app/App.tsx` (dashboard handlers)

### Feature 10: Theme Toggle

**Purpose:** Switch between dark and light mode

**Components:**
- `ThemeToggle.tsx` - Toggle button
- Theme logic in `App.tsx`

**Implementation:**
```typescript
const handleToggleTheme = () => {
  setTheme(theme === 'dark' ? 'light' : 'dark');
};
```

**Related Files:**
- `/src/app/components/ThemeToggle.tsx`
- `/src/app/App.tsx` (theme state and effect)
- `/src/styles/theme.css` (CSS variables)

### Feature 11: Social Sharing

**Purpose:** Share stories on social media

**Components:**
- `ShareButtons.tsx` - Share button component

**Platforms:**
- Twitter (tweet with link and title)
- Reddit (submit to subreddit)
- Copy link (clipboard)

**Related Files:**
- `/src/app/components/ShareButtons.tsx`
- Used in `StoryDetail.tsx` and `Reader.tsx`

### Feature 12: Sound Notifications

**Purpose:** Audio feedback for user actions

**Sounds:**
- Comment posted
- Notification received
- General beep

**Implementation:**
- Web Audio API
- Base64 encoded WAV files
- Configurable volume

**Related Files:**
- `/src/app/utils/sounds.ts`
- Called in `Reader.tsx`, `CommentSection.tsx`, etc.

### Feature 13: Bug Reporting (Inline)

**Purpose:** Allow users to report bugs while reading

**Location:** Reader page (bug icon button)

**Flow:**
1. User clicks bug icon
2. Modal opens with text input
3. User describes bug
4. Submitted (would send to admin)

**Related Files:**
- `/src/app/pages/Reader.tsx` (bug report modal)

### Feature 14: Username Validation

**Purpose:** Ensure usernames are valid and available

**Validation Rules:**
- 3-20 characters
- Alphanumeric + underscores only
- No profanity
- Unique (checked against database)

**Implementation Location:**
- `SignUp.tsx` - On registration
- `EditProfileDialog.tsx` - On profile update

**Related Files:**
- `/src/app/pages/SignUp.tsx`
- `/src/app/components/EditProfileDialog.tsx`
- `/src/app/utils/api.ts` (validation functions - to be implemented)

---

## Database Schema

### Supabase Tables

#### 1. `users` Table
```sql
CREATE TABLE users (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  email TEXT UNIQUE NOT NULL,
  username TEXT UNIQUE NOT NULL,
  avatar TEXT,
  bio TEXT,
  joined_date DATE DEFAULT CURRENT_DATE,
  created_at TIMESTAMP DEFAULT NOW()
);
```

#### 2. `stories` Table
```sql
CREATE TABLE stories (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  title TEXT NOT NULL,
  author TEXT NOT NULL,
  cover_image TEXT,
  description TEXT,
  genres TEXT[],
  rating DECIMAL(2,1) DEFAULT 0,
  total_ratings INTEGER DEFAULT 0,
  total_chapters INTEGER DEFAULT 0,
  status TEXT CHECK (status IN ('ongoing', 'completed', 'hiatus')),
  created_at TIMESTAMP DEFAULT NOW(),
  updated_at TIMESTAMP DEFAULT NOW()
);
```

#### 3. `chapters` Table
```sql
CREATE TABLE chapters (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  story_id UUID REFERENCES stories(id) ON DELETE CASCADE,
  chapter_number INTEGER NOT NULL,
  title TEXT NOT NULL,
  content TEXT NOT NULL,
  published_at TIMESTAMP DEFAULT NOW(),
  UNIQUE(story_id, chapter_number)
);
```

#### 4. `user_progress` Table
```sql
CREATE TABLE user_progress (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  user_id UUID REFERENCES users(id) ON DELETE CASCADE,
  story_id UUID REFERENCES stories(id) ON DELETE CASCADE,
  current_chapter INTEGER NOT NULL,
  total_chapters INTEGER NOT NULL,
  last_read_at TIMESTAMP DEFAULT NOW(),
  UNIQUE(user_id, story_id)
);
```

#### 5. `bookmarks` Table
```sql
CREATE TABLE bookmarks (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  user_id UUID REFERENCES users(id) ON DELETE CASCADE,
  story_id UUID REFERENCES stories(id) ON DELETE CASCADE,
  added_at TIMESTAMP DEFAULT NOW(),
  UNIQUE(user_id, story_id)
);
```

#### 6. `ratings` Table
```sql
CREATE TABLE ratings (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  user_id UUID REFERENCES users(id) ON DELETE CASCADE,
  story_id UUID REFERENCES stories(id) ON DELETE CASCADE,
  rating INTEGER CHECK (rating >= 1 AND rating <= 5),
  created_at TIMESTAMP DEFAULT NOW(),
  UNIQUE(user_id, story_id)
);
```

#### 7. `comments` Table
```sql
CREATE TABLE comments (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  user_id UUID REFERENCES users(id) ON DELETE CASCADE,
  username TEXT NOT NULL,
  user_avatar TEXT,
  story_id UUID REFERENCES stories(id) ON DELETE CASCADE,
  chapter_id UUID REFERENCES chapters(id) ON DELETE CASCADE,
  content TEXT NOT NULL,
  likes INTEGER DEFAULT 0,
  created_at TIMESTAMP DEFAULT NOW()
);
```

#### 8. `activities` Table
```sql
CREATE TABLE activities (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  user_id UUID REFERENCES users(id) ON DELETE CASCADE,
  activity_type TEXT CHECK (activity_type IN ('read', 'bookmark', 'rate', 'comment')),
  story_id UUID REFERENCES stories(id) ON DELETE CASCADE,
  story_title TEXT NOT NULL,
  chapter_number INTEGER,
  details TEXT,
  timestamp TIMESTAMP DEFAULT NOW()
);
```

#### 9. `notifications` Table
```sql
CREATE TABLE notifications (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  user_id UUID REFERENCES users(id) ON DELETE CASCADE,
  notification_type TEXT CHECK (notification_type IN (
    'new_chapter', 'comment_reply', 'like', 'follow', 
    'system', 'correction_accepted', 'new_story'
  )),
  title TEXT NOT NULL,
  message TEXT NOT NULL,
  story_id UUID REFERENCES stories(id) ON DELETE SET NULL,
  story_title TEXT,
  chapter_number INTEGER,
  read BOOLEAN DEFAULT FALSE,
  created_at TIMESTAMP DEFAULT NOW()
);
```

#### 10. `wishlist_items` Table
```sql
CREATE TABLE wishlist_items (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  user_id UUID REFERENCES users(id) ON DELETE CASCADE,
  username TEXT NOT NULL,
  user_avatar TEXT,
  title TEXT NOT NULL,
  author TEXT,
  description TEXT NOT NULL,
  cover_image TEXT,
  upvotes INTEGER DEFAULT 0,
  upvoted_by UUID[],
  comment_count INTEGER DEFAULT 0,
  status TEXT CHECK (status IN ('pending', 'approved', 'rejected', 'completed')),
  created_at TIMESTAMP DEFAULT NOW()
);
```

#### 11. `wishlist_comments` Table
```sql
CREATE TABLE wishlist_comments (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  wishlist_item_id UUID REFERENCES wishlist_items(id) ON DELETE CASCADE,
  user_id UUID REFERENCES users(id) ON DELETE CASCADE,
  username TEXT NOT NULL,
  user_avatar TEXT,
  content TEXT NOT NULL,
  likes INTEGER DEFAULT 0,
  created_at TIMESTAMP DEFAULT NOW()
);
```

#### 12. `paragraph_highlights` Table
```sql
CREATE TABLE paragraph_highlights (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  chapter_id UUID REFERENCES chapters(id) ON DELETE CASCADE,
  user_id UUID REFERENCES users(id) ON DELETE CASCADE,
  username TEXT NOT NULL,
  paragraph_index INTEGER NOT NULL,
  paragraph_text TEXT NOT NULL,
  comment TEXT,
  is_correction BOOLEAN DEFAULT FALSE,
  created_at TIMESTAMP DEFAULT NOW()
);
```

#### 13. `correction_suggestions` Table
```sql
CREATE TABLE correction_suggestions (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  chapter_id UUID REFERENCES chapters(id) ON DELETE CASCADE,
  user_id UUID REFERENCES users(id) ON DELETE CASCADE,
  username TEXT NOT NULL,
  original_text TEXT NOT NULL,
  suggested_text TEXT NOT NULL,
  start_offset INTEGER NOT NULL,
  end_offset INTEGER NOT NULL,
  reason TEXT,
  status TEXT CHECK (status IN ('pending', 'approved', 'rejected')),
  created_at TIMESTAMP DEFAULT NOW()
);
```

#### 14. `story_analytics` Table
```sql
CREATE TABLE story_analytics (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  story_id UUID REFERENCES stories(id) ON DELETE CASCADE,
  view_count INTEGER DEFAULT 0,
  unique_viewers UUID[],
  chapter_views JSONB DEFAULT '{}',
  last_viewed TIMESTAMP DEFAULT NOW(),
  UNIQUE(story_id)
);
```

### Database Relationships

```
users (1) ───────── (Many) user_progress
users (1) ───────── (Many) bookmarks
users (1) ───────── (Many) ratings
users (1) ───────── (Many) comments
users (1) ───────── (Many) activities
users (1) ───────── (Many) notifications
users (1) ───────── (Many) wishlist_items
users (1) ───────── (Many) paragraph_highlights
users (1) ───────── (Many) correction_suggestions

stories (1) ─────── (Many) chapters
stories (1) ─────── (Many) user_progress
stories (1) ─────── (Many) bookmarks
stories (1) ─────── (Many) ratings
stories (1) ─────── (Many) comments
stories (1) ─────── (1) story_analytics

chapters (1) ────── (Many) comments
chapters (1) ────── (Many) paragraph_highlights
chapters (1) ────── (Many) correction_suggestions

wishlist_items (1) ─ (Many) wishlist_comments
```

---

## Component Relationships

### Parent-Child Component Tree

```
App.tsx (Root)
│
├── LoadingScreen
│   └── (displays during initial load)
│
├── Header
│   ├── Navigation links
│   ├── ThemeToggle
│   ├── Notification badge
│   └── User menu
│
└── Page Components (routed)
    │
    ├── SignIn
    │   └── Form inputs
    │
    ├── SignUp
    │   └── Form inputs
    │
    ├── ForgotPassword
    │   └── Form inputs
    │
    ├── Home
    │   ├── HeroCarousel
    │   │   └── StoryCard (multiple)
    │   └── ScrollableStoryRow (multiple)
    │       └── StoryCard (multiple)
    │
    ├── StoryDetail
    │   ├── ShareButtons
    │   ├── CommentSection
    │   └── Progress bar
    │
    ├── Reader
    │   ├── SEOHead
    │   ├── ShareButtons
    │   ├── CommentSection
    │   ├── Settings panel
    │   ├── Paragraph highlight modal
    │   └── Bug report modal
    │
    ├── Bookmarks
    │   └── StoryCard (multiple)
    │
    ├── Profile
    │   ├── EditProfileDialog
    │   └── Activity list
    │
    ├── Settings
    │   └── Settings form
    │
    ├── Notifications
    │   └── Notification list items
    │
    ├── Wishlist
    │   └── Wishlist items with comments
    │
    └── Dashboard
        ├── Wishlist management tab
        ├── Correction review tab
        ├── Content management tab
        └── Analytics tab
```

### Data Flow Between Components

#### Example: Reading a Chapter

```
User clicks "Read Chapter" in StoryDetail
    ↓
StoryDetail calls onReadChapter(chapterNum)
    ↓
App.tsx handleReadChapter() function
    ↓
- Updates selectedChapter state
- Updates user progress
- Logs activity
- Changes currentPage to 'reader'
    ↓
Reader component renders with chapter data
    ↓
User interacts with paragraph star icon
    ↓
Reader calls onAddParagraphHighlight()
    ↓
App.tsx adds highlight to state
    ↓
Reader re-renders with new highlight
```

#### Example: Adding a Comment

```
User types comment in CommentSection
    ↓
CommentSection calls onAddComment(content)
    ↓
App.tsx handleAddComment() function
    ↓
- Creates new comment object
- Adds to comments state
- Logs activity
- Plays comment sound
    ↓
CommentSection re-renders with new comment
```

### Shared State (Props Drilling)

Many components receive shared state from App.tsx:

**Common Props Passed:**
- `user` - Current user object
- `stories` - All stories
- `userProgress` - Reading progress
- `bookmarks` - Bookmarked stories
- `comments` - All comments
- `notifications` - User notifications
- Event handlers (onNavigate, onStoryClick, etc.)

---

## API Integration

### API Structure

**Base URL:**
```
https://{projectId}.supabase.co/functions/v1/make-server-fb38c803
```

### Authentication Flow

1. **Sign Up**
```typescript
POST /signup
Body: { email, password, username }
Response: { user, session }
```

2. **Sign In**
```typescript
POST /signin
Body: { email, password }
Response: { user, session }
```

3. **Sign Out**
```typescript
POST /signout
Headers: { Authorization: Bearer {token} }
Response: { success: true }
```

4. **Password Reset**
```typescript
POST /auth/reset-password
Body: { email }
Response: { message: "Reset email sent" }
```

### Data Endpoints

#### Progress
```typescript
GET /progress
Headers: { Authorization: Bearer {token} }
Response: UserProgress[]

POST /progress
Headers: { Authorization: Bearer {token} }
Body: { storyId, currentChapter, totalChapters }
Response: UserProgress
```

#### Bookmarks
```typescript
GET /bookmarks
Headers: { Authorization: Bearer {token} }
Response: Bookmark[]

POST /bookmarks
Headers: { Authorization: Bearer {token} }
Body: { storyId }
Response: Bookmark

DELETE /bookmarks/:storyId
Headers: { Authorization: Bearer {token} }
Response: { success: true }
```

#### Ratings
```typescript
GET /ratings
Headers: { Authorization: Bearer {token} }
Response: Rating[]

POST /ratings
Headers: { Authorization: Bearer {token} }
Body: { storyId, rating }
Response: Rating
```

#### Comments
```typescript
GET /comments/:storyId
Response: Comment[]

GET /comments/chapter/:chapterId
Response: Comment[]

POST /comments
Headers: { Authorization: Bearer {token} }
Body: { content, storyId?, chapterId? }
Response: Comment
```

#### Activities
```typescript
GET /activities
Headers: { Authorization: Bearer {token} }
Response: Activity[]

POST /activities
Headers: { Authorization: Bearer {token} }
Body: { type, storyId, storyTitle, details? }
Response: Activity
```

#### Analytics
```typescript
GET /analytics
Response: StoryAnalytics[]
```

#### Profile
```typescript
POST /profile/update
Headers: { Authorization: Bearer {token} }
Body: { username, password? }
Response: { user, message }
```

### API Helper Functions (api.ts)

**Authentication:**
- `signUp(email, password, username)`
- `signIn(email, password)`
- `signOut()`
- `resetPassword(email)`
- `getSession()`
- `setAccessToken(token)`

**Data Operations:**
- `getProgress()`
- `updateProgress(storyId, currentChapter, totalChapters)`
- `getBookmarks()`
- `addBookmark(storyId)`
- `deleteBookmark(storyId)`
- `getRatings()`
- `addRating(storyId, rating)`
- `getStoryComments(storyId)`
- `getChapterComments(chapterId)`
- `addComment(content, storyId?, chapterId?)`
- `getActivities()`
- `addActivity(type, storyId, storyTitle, details?)`
- `getAnalytics()`
- `updateProfile(username, password?)`

### Supabase Client

```typescript
import { createClient } from '@supabase/supabase-js';

export const supabase = createClient(
  `https://${projectId}.supabase.co`,
  publicAnonKey
);
```

**Real-time Subscriptions Example:**
```typescript
supabase
  .channel('notifications')
  .on('postgres_changes', {
    event: 'INSERT',
    schema: 'public',
    table: 'notifications',
    filter: `user_id=eq.${userId}`
  }, payload => {
    // Handle new notification
    playNotificationSound();
    addNotificationToState(payload.new);
  })
  .subscribe();
```

---

## Development Guidelines

### Code Organization

1. **Component Naming**
   - PascalCase for components: `StoryCard.tsx`
   - camelCase for utilities: `api.ts`, `sounds.ts`

2. **File Structure**
   - Pages go in `/src/app/pages/`
   - Reusable components in `/src/app/components/`
   - Utilities in `/src/app/utils/`
   - Types in `/src/app/types.ts`

3. **Import Aliases**
   ```typescript
   import { Component } from '@/app/components/Component';
   // @ maps to /src directory
   ```

### State Management

**Current Approach:** useState + Props drilling from App.tsx

**Future Consideration:** Context API or state management library (Redux, Zustand)

### TypeScript Guidelines

1. **Define Types First**
   - All interfaces in `types.ts`
   - Use descriptive names

2. **Type Everything**
   - Function parameters
   - Component props
   - State variables
   - Return types

3. **Avoid `any`**
   - Use specific types or `unknown`

### Styling Guidelines

1. **Tailwind CSS**
   - Use utility classes
   - Custom classes in theme.css for reusable styles
   - Dark mode: use `dark:` prefix

2. **Motion Animations**
   ```typescript
   <motion.div
     initial={{ opacity: 0, y: 20 }}
     animate={{ opacity: 1, y: 0 }}
     exit={{ opacity: 0, y: -20 }}
     transition={{ duration: 0.3 }}
   >
   ```

3. **Responsive Design**
   - Mobile-first approach
   - Use `sm:`, `md:`, `lg:` breakpoints

### API Call Guidelines

1. **Always Use Try-Catch**
   ```typescript
   try {
     const data = await api.signIn(email, password);
     // Handle success
   } catch (error: any) {
     toast.error(error.message || 'Operation failed');
   }
   ```

2. **Loading States**
   ```typescript
   const [isLoading, setIsLoading] = useState(false);
   
   const handleSubmit = async () => {
     setIsLoading(true);
     try {
       await api.doSomething();
     } finally {
       setIsLoading(false);
     }
   };
   ```

3. **Error Handling**
   - Show user-friendly messages
   - Use toast notifications
   - Log errors for debugging

### Testing Guidelines (Future)

1. **Unit Tests**
   - Test utility functions
   - Test API calls
   - Test data transformations

2. **Component Tests**
   - Test rendering
   - Test user interactions
   - Test state changes

3. **E2E Tests**
   - Test critical user flows
   - Test authentication
   - Test data persistence

### Performance Optimization

1. **Code Splitting**
   - Lazy load pages
   - Dynamic imports

2. **Memoization**
   - Use `useMemo` for expensive calculations
   - Use `useCallback` for event handlers passed as props
   - Use `React.memo` for pure components

3. **Image Optimization**
   - Use appropriate formats (WebP)
   - Lazy load images
   - Compress images

4. **API Optimization**
   - Implement caching
   - Batch requests
   - Use pagination

### Accessibility Guidelines

1. **Semantic HTML**
   - Use proper heading hierarchy
   - Use semantic tags (`nav`, `main`, `article`)

2. **ARIA Labels**
   - Add labels to interactive elements
   - Use `aria-label` for icon buttons

3. **Keyboard Navigation**
   - Ensure all interactive elements are keyboard accessible
   - Implement focus management

4. **Color Contrast**
   - Ensure sufficient contrast ratios
   - Don't rely on color alone

### Security Guidelines

1. **Authentication**
   - Never store passwords in state
   - Use JWT tokens
   - Implement token refresh

2. **Input Validation**
   - Validate on client and server
   - Sanitize user input
   - Prevent XSS attacks

3. **Content Protection**
   - Disable copy/paste in reader (implemented)
   - Watermark images (future)
   - Rate limiting (future)

### Git Workflow (Future)

1. **Branch Naming**
   - `feature/feature-name`
   - `bugfix/bug-description`
   - `hotfix/critical-issue`

2. **Commit Messages**
   - Use conventional commits
   - Be descriptive

3. **Pull Requests**
   - Request code reviews
   - Run tests before merging
   - Update documentation

---

## Quick Reference

### Common Tasks

#### Add a New Story
```typescript
// In Dashboard.tsx
const handleAddStory = () => {
  const storyData = {
    title: "New Story",
    author: "Author Name",
    coverImage: "/images/cover.jpg",
    description: "Story description",
    genres: ["Fantasy", "Adventure"],
    status: "ongoing"
  };
  onAddStory(storyData);
};
```

#### Add a New Chapter
```typescript
// In Dashboard.tsx
const handleAddChapter = () => {
  const chapterData = {
    storyId: "story-id",
    chapterNumber: 1,
    title: "Chapter 1: The Beginning",
    content: "Chapter content..."
  };
  onAddChapter(chapterData);
};
```

#### Add a Comment
```typescript
// In any component
const handleSubmitComment = () => {
  onAddComment(commentText);
  playCommentSound();
};
```

#### Track Reading Progress
```typescript
// Automatically handled in App.tsx handleReadChapter()
// Manual update:
updateProgress(storyId, currentChapter, totalChapters);
```

#### Send Notification
```typescript
const newNotification: Notification = {
  id: `notif-${Date.now()}`,
  userId: targetUserId,
  type: 'new_chapter',
  title: 'New Chapter Published!',
  message: `${story.title} - Chapter ${chapterNumber}`,
  storyId: story.id,
  storyTitle: story.title,
  chapterNumber: chapterNumber,
  createdAt: new Date().toISOString(),
  read: false
};
setNotifications([newNotification, ...notifications]);
```

### Key State Variables (in App.tsx)

```typescript
// User & Auth
const [isAuthenticated, setIsAuthenticated] = useState(false);
const [user, setUser] = useState<User | null>(null);

// Navigation
const [currentPage, setCurrentPage] = useState<Page>('home');
const [selectedStoryId, setSelectedStoryId] = useState<string | null>(null);
const [selectedChapter, setSelectedChapter] = useState<number>(1);

// Theme
const [theme, setTheme] = useState<'light' | 'dark'>('dark');

// Data
const [stories] = useState<Story[]>(mockStories);
const [userProgress, setUserProgress] = useState<UserProgress[]>(...);
const [bookmarks, setBookmarks] = useState<Bookmark[]>(...);
const [ratings, setRatings] = useState<Rating[]>(...);
const [comments, setComments] = useState<Comment[]>(...);
const [activities, setActivities] = useState<Activity[]>(...);
const [notifications, setNotifications] = useState<Notification[]>(...);
const [wishlistItems, setWishlistItems] = useState<WishlistItem[]>(...);
const [corrections, setCorrections] = useState<CorrectionSuggestion[]>(...);
const [chapters, setChapters] = useState<Chapter[]>(...);
const [paragraphHighlights, setParagraphHighlights] = useState<ParagraphHighlight[]>(...);
```

### Important Handler Functions (in App.tsx)

```typescript
handleSignIn(email, password)
handleSignUp(email, password, username)
handleLogout()
handleNavigate(page)
handleStoryClick(storyId)
handleReadChapter(chapterNum)
handleToggleBookmark()
handleRate(rating)
handleAddComment(content)
handleMarkNotificationAsRead(id)
handleNotificationClick(notification)
handleResetPassword(email)
handleUpdateProfile(username, password?)
handleAddWishlistItem(item)
handleUpvoteWishlistItem(itemId)
handleAddWishlistComment(wishlistItemId, content)
handleUpdateWishlistStatus(itemId, status)
handleUpdateCorrectionStatus(correctionId, status, userId, username)
handleAddCorrectionSuggestion(correction)
handleAddParagraphHighlight(highlight)
handleRemoveParagraphHighlight(highlightId)
handleAddStory(storyData)
handleAddChapter(chapterData)
handleToggleTheme()
```

---

## Deployment & Production

### Environment Variables

Create `.env` file (not committed to git):
```
VITE_SUPABASE_PROJECT_ID=your-project-id
VITE_SUPABASE_ANON_KEY=your-anon-key
```

### Build for Production

```bash
npm run build
# Output in /dist directory
```

### Cloudflare Pages Deployment (Future)

1. Connect GitHub repository
2. Set build command: `npm run build`
3. Set output directory: `dist`
4. Add environment variables in Cloudflare dashboard

### Supabase Setup

1. Create Supabase project
2. Create database tables (see Database Schema)
3. Set up authentication
4. Deploy edge functions
5. Configure storage buckets for images

---

## Troubleshooting

### Common Issues

**Issue: Components not rendering**
- Check if page is in currentPage state
- Verify props are being passed correctly
- Check console for errors

**Issue: API calls failing**
- Verify Supabase credentials
- Check network tab for error responses
- Ensure user is authenticated for protected routes

**Issue: Theme not applying**
- Check if dark class is on `<html>` element
- Verify theme state in App.tsx
- Check theme.css for CSS variables

**Issue: Sounds not playing**
- Check browser console for audio errors
- Verify sound utility functions are imported
- Ensure user has interacted with page (browser autoplay policy)

**Issue: Offline features not working**
- Verify service worker is registered
- Check service worker in DevTools > Application
- Ensure HTTPS or localhost

---

## Future Enhancements

### Planned Features

1. **Advanced Search**
   - Full-text search
   - Filters by genre, status, rating
   - Search history

2. **Reading Lists**
   - Custom collections
   - Public/private lists
   - Share lists

3. **Social Features**
   - Follow users
   - User profiles
   - Direct messaging

4. **Monetization**
   - Premium chapters
   - Ad-free subscription
   - Author donations

5. **Mobile App**
   - React Native version
   - Offline sync
   - Push notifications

6. **Advanced Analytics**
   - Reading time tracking
   - Engagement heatmaps
   - Retention metrics

7. **Localization**
   - Multi-language support
   - RTL language support
   - Translation management

8. **Accessibility**
   - Screen reader optimization
   - High contrast mode
   - Font size presets

### Technical Debt

1. Implement proper state management (Context/Redux)
2. Add unit and integration tests
3. Implement proper routing with React Router
4. Add loading skeletons
5. Optimize bundle size
6. Implement code splitting
7. Add error boundaries
8. Implement proper logging

---

## Contact & Support

For questions or support:
- GitHub Issues: [repository-url]
- Developer: [contact-email]
- Documentation: This file

---

**Last Updated:** January 18, 2026
**Version:** 1.0.0
**Maintained by:** Orange Tomato Dev Team

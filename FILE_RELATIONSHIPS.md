# Orange Tomato - File Relationships & Dependencies

## Visual File Relationship Map

```
┌─────────────────────────────────────────────────────────────────┐
│                          App.tsx (ROOT)                          │
│  • All state management                                          │
│  • All handler functions                                         │
│  • Routing logic                                                 │
│  • Theme management                                              │
└─────────────────────────────────────────────────────────────────┘
         │
         ├──imports──> types.ts (TypeScript Interfaces)
         ├──imports──> utils/api.ts (Supabase Client & API calls)
         ├──imports──> utils/offline.ts (Service Worker)
         ├──imports──> utils/sounds.ts (Audio notifications)
         ├──imports──> data/mockData.ts (Sample data)
         │
         ├──renders──> components/LoadingScreen.tsx
         ├──renders──> components/Header.tsx
         │                  │
         │                  └──imports──> components/ThemeToggle.tsx
         │
         └──renders──> Page Components (based on currentPage state)
                │
                ├──> pages/SignIn.tsx
                │         └──uses──> utils/api.ts (signIn)
                │
                ├──> pages/SignUp.tsx
                │         └──uses──> utils/api.ts (signUp)
                │
                ├──> pages/ForgotPassword.tsx
                │         └──uses──> utils/api.ts (resetPassword)
                │
                ├──> pages/Home.tsx
                │         │
                │         ├──imports──> components/HeroCarousel.tsx
                │         │                  └──imports──> components/StoryCard.tsx
                │         │
                │         └──imports──> components/ScrollableStoryRow.tsx
                │                      └──imports──> components/StoryCard.tsx
                │
                ├──> pages/StoryDetail.tsx
                │         │
                │         ├──imports──> components/CommentSection.tsx
                │         ├──imports──> components/ShareButtons.tsx
                │         └──uses──> types.ts (Story, Comment, UserProgress)
                │
                ├──> pages/Reader.tsx
                │         │
                │         ├──imports──> components/CommentSection.tsx
                │         ├──imports──> components/ShareButtons.tsx
                │         ├──imports──> components/SEOHead.tsx
                │         ├──imports──> utils/sounds.ts (playCommentSound)
                │         └──uses──> types.ts (Chapter, Comment, ParagraphHighlight)
                │
                ├──> pages/Bookmarks.tsx
                │         │
                │         └──imports──> components/StoryCard.tsx
                │
                ├──> pages/Profile.tsx
                │         │
                │         ├──imports──> components/EditProfileDialog.tsx
                │         │                  └──uses──> utils/api.ts (updateProfile)
                │         │
                │         └──uses──> types.ts (User, Activity)
                │
                ├──> pages/Settings.tsx
                │         └──uses──> types.ts (User)
                │
                ├──> pages/Notifications.tsx
                │         │
                │         └──uses──> types.ts (Notification)
                │
                ├──> pages/Wishlist.tsx
                │         │
                │         └──uses──> types.ts (WishlistItem, WishlistComment)
                │
                └──> pages/Dashboard.tsx
                          │
                          └──uses──> types.ts (WishlistItem, CorrectionSuggestion, 
                                                 DevNotice, StoryAnalytics)

```

## Dependency Chains by Feature

### Feature: User Authentication

```
SignIn.tsx
    ↓ calls
api.signIn(email, password)
    ↓ sends request to
/supabase/functions/server/index.tsx
    ↓ queries
Supabase Auth
    ↓ returns
JWT token + User data
    ↓ updates
App.tsx state (isAuthenticated, user)
    ↓ triggers
Header.tsx re-render (shows user menu)
```

**Files Involved:**
1. `/src/app/pages/SignIn.tsx` - UI
2. `/src/app/utils/api.ts` - signIn() function
3. `/supabase/functions/server/index.tsx` - Backend
4. `/src/app/App.tsx` - State update
5. `/src/app/components/Header.tsx` - UI update

---

### Feature: Reading a Chapter

```
Home.tsx - User clicks story
    ↓ calls
App.handleStoryClick(storyId)
    ↓ updates
selectedStoryId state
    ↓ navigates to
StoryDetail.tsx
    ↓ User clicks "Read Chapter X"
    ↓ calls
App.handleReadChapter(chapterNum)
    ↓ updates
- selectedChapter state
- userProgress state
- activities state
    ↓ navigates to
Reader.tsx
    ↓ displays
Chapter content from mockData.ts
    ↓ User clicks star icon
    ↓ calls
App.handleAddParagraphHighlight()
    ↓ updates
paragraphHighlights state
    ↓ triggers
Reader.tsx re-render with highlights
```

**Files Involved:**
1. `/src/app/pages/Home.tsx`
2. `/src/app/pages/StoryDetail.tsx`
3. `/src/app/pages/Reader.tsx`
4. `/src/app/App.tsx` (state + handlers)
5. `/src/app/data/mockData.ts` (chapter content)
6. `/src/app/types.ts` (Chapter, ParagraphHighlight)
7. `/src/app/utils/sounds.ts` (playCommentSound)

---

### Feature: Adding a Comment

```
User types in CommentSection.tsx
    ↓ clicks submit
    ↓ calls
onAddComment(content) prop
    ↓ executes
App.handleAddComment(content)
    ↓ creates
New Comment object
    ↓ updates
- comments state
- activities state
    ↓ calls
playCommentSound() from utils/sounds.ts
    ↓ triggers
CommentSection.tsx re-render
    ↓ displays
New comment in list
```

**Files Involved:**
1. `/src/app/components/CommentSection.tsx` - UI
2. `/src/app/App.tsx` - handleAddComment()
3. `/src/app/types.ts` - Comment interface
4. `/src/app/utils/sounds.ts` - playCommentSound()
5. `/src/app/data/mockData.ts` - existing comments

---

### Feature: Notifications

```
Dashboard.tsx - Admin adds new chapter
    ↓ calls
App.handleAddChapter(chapterData)
    ↓ creates
New Chapter + Notification objects
    ↓ updates
- chapters state
- notifications state
    ↓ triggers
Header.tsx notification badge update
    ↓ User clicks notification icon
    ↓ navigates to
Notifications.tsx
    ↓ displays
List of notifications
    ↓ User clicks notification
    ↓ calls
App.handleNotificationClick(notification)
    ↓ marks as read
    ↓ navigates to
Reader.tsx (if chapter notification)
```

**Files Involved:**
1. `/src/app/pages/Dashboard.tsx` - Notification creation
2. `/src/app/App.tsx` - handleAddChapter(), handleNotificationClick()
3. `/src/app/components/Header.tsx` - Notification badge
4. `/src/app/pages/Notifications.tsx` - Notification list
5. `/src/app/pages/Reader.tsx` - Navigation target
6. `/src/app/types.ts` - Notification interface

---

### Feature: Wishlist

```
Wishlist.tsx - User submits suggestion
    ↓ calls
App.handleAddWishlistItem(item)
    ↓ creates
New WishlistItem object
    ↓ updates
wishlistItems state
    ↓ triggers
Wishlist.tsx re-render
    ↓ Other users upvote
    ↓ calls
App.handleUpvoteWishlistItem(itemId)
    ↓ updates
upvotes + upvotedBy in wishlistItems
    ↓ Admin in Dashboard.tsx views
    ↓ changes status
    ↓ calls
App.handleUpdateWishlistStatus(itemId, status)
    ↓ updates
status in wishlistItems
    ↓ triggers
Wishlist.tsx re-render with status badge
```

**Files Involved:**
1. `/src/app/pages/Wishlist.tsx` - User interface
2. `/src/app/pages/Dashboard.tsx` - Admin interface
3. `/src/app/App.tsx` - All wishlist handlers
4. `/src/app/types.ts` - WishlistItem, WishlistComment
5. `/src/app/data/mockData.ts` - Sample wishlist items

---

### Feature: Correction Submission & Review

```
Reader.tsx - User highlights paragraph
    ↓ marks as correction
    ↓ calls
App.handleAddParagraphHighlight() with isCorrection=true
OR
App.handleAddCorrectionSuggestion()
    ↓ creates
New CorrectionSuggestion object
    ↓ updates
corrections state
    ↓ Admin in Dashboard.tsx reviews
    ↓ approves correction
    ↓ calls
App.handleUpdateCorrectionStatus(correctionId, 'approved', userId, username)
    ↓ updates
- corrections state (status)
- notifications state (thank you notification)
    ↓ triggers
Notifications.tsx update for user
```

**Files Involved:**
1. `/src/app/pages/Reader.tsx` - Correction submission UI
2. `/src/app/pages/Dashboard.tsx` - Correction review UI
3. `/src/app/App.tsx` - Correction handlers
4. `/src/app/pages/Notifications.tsx` - Thank you notification
5. `/src/app/types.ts` - CorrectionSuggestion, ParagraphHighlight

---

## State Dependencies Map

### App.tsx State Variables and Their Consumers

```
┌─────────────────────────────────────────────────────────────────┐
│                       App.tsx STATE                              │
└─────────────────────────────────────────────────────────────────┘

[isAuthenticated]
  ├──> Header.tsx (show/hide user menu)
  ├──> SignIn.tsx (redirect if already authenticated)
  ├──> SignUp.tsx (redirect if already authenticated)
  └──> Wishlist.tsx (enable/disable features)

[user]
  ├──> Header.tsx (display username)
  ├──> Profile.tsx (display user info)
  ├──> EditProfileDialog.tsx (pre-fill form)
  ├──> Reader.tsx (check permissions)
  ├──> CommentSection.tsx (display as comment author)
  └──> Dashboard.tsx (admin check - future)

[currentPage]
  └──> App.tsx (controls which page component renders)

[selectedStoryId]
  ├──> StoryDetail.tsx (fetch story data)
  ├──> Reader.tsx (fetch chapter data)
  └──> App.tsx (calculate isBookmarked, userRating)

[selectedChapter]
  ├──> Reader.tsx (display chapter content)
  └──> App.tsx (fetch chapter data)

[theme]
  ├──> App.tsx (apply dark class to root)
  ├──> Header.tsx (pass to ThemeToggle)
  └──> ThemeToggle.tsx (display current theme)

[stories]
  ├──> Home.tsx (display story list)
  ├──> StoryDetail.tsx (display story details)
  ├──> Reader.tsx (display story title)
  ├──> Bookmarks.tsx (filter bookmarked stories)
  └──> Dashboard.tsx (content management)

[userProgress]
  ├──> Home.tsx (display progress bars)
  ├──> StoryCard.tsx (display progress)
  ├──> StoryDetail.tsx (show current chapter)
  ├──> Bookmarks.tsx (display progress)
  └──> Profile.tsx (calculate stats)

[bookmarks]
  ├──> Bookmarks.tsx (display bookmarked stories)
  ├──> StoryDetail.tsx (show bookmark status)
  └──> Profile.tsx (calculate stats)

[ratings]
  ├──> StoryDetail.tsx (display user rating)
  └──> Profile.tsx (calculate stats)

[comments]
  ├──> StoryDetail.tsx (display story comments)
  ├──> Reader.tsx (display chapter comments)
  ├──> CommentSection.tsx (render comments)
  └──> Profile.tsx (calculate stats)

[activities]
  ├──> Profile.tsx (display activity feed)
  └──> Dashboard.tsx (analytics - future)

[notifications]
  ├──> Header.tsx (unread count badge)
  ├──> Notifications.tsx (display notifications)
  └──> App.tsx (calculate unreadNotificationCount)

[wishlistItems]
  ├──> Wishlist.tsx (display suggestions)
  └──> Dashboard.tsx (manage suggestions)

[wishlistComments]
  └──> Wishlist.tsx (display comments on suggestions)

[corrections]
  ├──> Dashboard.tsx (correction review)
  └──> Reader.tsx (display existing corrections - future)

[chapters]
  ├──> Reader.tsx (display chapter content)
  ├──> StoryDetail.tsx (display chapter list)
  └──> Dashboard.tsx (content management)

[paragraphHighlights]
  └──> Reader.tsx (display highlights on paragraphs)

[notices] (DevNotice)
  └──> Dashboard.tsx (developer notices)

[analytics] (StoryAnalytics)
  └──> Dashboard.tsx (analytics display)
```

---

## API Function Usage Map

### utils/api.ts Functions and Their Callers

```
┌─────────────────────────────────────────────────────────────────┐
│                       utils/api.ts                               │
└─────────────────────────────────────────────────────────────────┘

[signUp(email, password, username)]
  └──> SignUp.tsx (onSignUp handler)

[signIn(email, password)]
  └──> SignIn.tsx (onSignIn handler)

[signOut()]
  └──> Header.tsx (logout button)
       └──> App.tsx (handleLogout)

[resetPassword(email)]
  └──> ForgotPassword.tsx (onResetPassword handler)
       └──> App.tsx (handleResetPassword)

[getSession()]
  └──> App.tsx (useEffect on mount)

[setAccessToken(token)]
  └──> api.ts (internal - after signIn, getSession)

[updateProfile(username, password?)]
  └──> EditProfileDialog.tsx (save button)
       └──> Profile.tsx (onUpdateProfile)
            └──> App.tsx (handleUpdateProfile)

[getProgress()]
  └──> App.tsx (future - fetch from backend)

[updateProgress(storyId, currentChapter, totalChapters)]
  └──> App.tsx (handleReadChapter - future backend sync)

[getBookmarks()]
  └──> App.tsx (future - fetch from backend)

[addBookmark(storyId)]
  └──> App.tsx (handleToggleBookmark - future backend sync)

[deleteBookmark(storyId)]
  └──> App.tsx (handleToggleBookmark - future backend sync)

[getRatings()]
  └──> App.tsx (future - fetch from backend)

[addRating(storyId, rating)]
  └──> App.tsx (handleRate - future backend sync)

[getStoryComments(storyId)]
  └──> StoryDetail.tsx (future - fetch comments)

[getChapterComments(chapterId)]
  └──> Reader.tsx (future - fetch comments)

[addComment(content, storyId?, chapterId?)]
  └──> App.tsx (handleAddComment - future backend sync)

[getActivities()]
  └──> App.tsx (future - fetch activities)

[addActivity(type, storyId, storyTitle, details?)]
  └──> App.tsx (handleReadChapter, handleToggleBookmark, etc. - future)

[getAnalytics()]
  └──> Dashboard.tsx (future - fetch analytics)
```

---

## Component Import Chains

### Example: Home Page

```
App.tsx
  └──> pages/Home.tsx
        │
        ├──import──> components/HeroCarousel.tsx
        │                 │
        │                 ├──import──> components/StoryCard.tsx
        │                 │                 │
        │                 │                 └──import──> types.ts (Story, UserProgress)
        │                 │
        │                 └──import──> embla-carousel-react (3rd party)
        │
        └──import──> components/ScrollableStoryRow.tsx
                          │
                          ├──import──> components/StoryCard.tsx
                          │                 │
                          │                 └──import──> types.ts
                          │
                          └──import──> lucide-react (icons)
```

### Example: Reader Page

```
App.tsx
  └──> pages/Reader.tsx
        │
        ├──import──> components/SEOHead.tsx
        │
        ├──import──> components/ShareButtons.tsx
        │                 │
        │                 └──import──> lucide-react (icons)
        │
        ├──import──> components/CommentSection.tsx
        │                 │
        │                 ├──import──> types.ts (Comment)
        │                 └──import──> sonner (toast)
        │
        ├──import──> utils/sounds.ts
        │                 │
        │                 └──uses──> Web Audio API
        │
        └──import──> types.ts (Chapter, Story, User, ParagraphHighlight, 
                                 CorrectionSuggestion)
```

---

## Data Flow Diagrams

### Creating a New Story (Content Management)

```
┌─────────────────────┐
│  Dashboard.tsx      │
│  (Admin UI)         │
│  • Fill form        │
│  • Upload cover     │
│  • Add metadata     │
└─────────┬───────────┘
          │ Click "Add Story"
          ↓
┌─────────────────────┐
│  App.tsx            │
│  handleAddStory()   │
│  • Create Story obj │
│  • Add to state     │
│  • Create notif     │
└─────────┬───────────┘
          │
          ↓ (Future: API call)
┌─────────────────────┐
│  api.addStory()     │
│  (Not implemented)  │
└─────────┬───────────┘
          │
          ↓
┌─────────────────────┐
│  Supabase           │
│  • Insert story     │
│  • Return story ID  │
└─────────┬───────────┘
          │
          ↓
┌─────────────────────┐
│  Notifications      │
│  • Send to all users│
│  • Real-time update │
└─────────────────────┘
```

### User Reads Chapter and Comments

```
┌─────────────────────┐
│  StoryDetail.tsx    │
│  User clicks        │
│  "Read Chapter 5"   │
└─────────┬───────────┘
          │
          ↓
┌─────────────────────┐
│  App.tsx            │
│  handleReadChapter  │
│  • Set selectedCh   │
│  • Update progress  │
│  • Log activity     │
│  • Change page      │
└─────────┬───────────┘
          │
          ↓
┌─────────────────────┐
│  Reader.tsx         │
│  • Fetch chapter    │
│  • Display content  │
│  • Show highlights  │
└─────────┬───────────┘
          │ User clicks star
          ↓
┌─────────────────────┐
│  Reader.tsx         │
│  • Open modal       │
│  • User types       │
│  • Submit           │
└─────────┬───────────┘
          │
          ↓
┌─────────────────────┐
│  App.tsx            │
│  handleAddPara...   │
│  • Create highlight │
│  • Add to state     │
│  • Play sound       │
└─────────┬───────────┘
          │
          ↓
┌─────────────────────┐
│  Reader.tsx         │
│  • Re-render        │
│  • Show highlight   │
└─────────────────────┘
```

---

## Critical File Relationships

### Must-Know Dependencies

1. **App.tsx depends on EVERYTHING**
   - All page components
   - All types
   - All utilities
   - Mock data

2. **types.ts is used by EVERYTHING**
   - All pages
   - Most components
   - API utilities

3. **api.ts is the gateway to backend**
   - Called by App.tsx handlers
   - Used by page components for direct calls
   - Manages Supabase client

4. **Reader.tsx is the most complex component**
   - Uses 5+ types
   - Imports 3+ components
   - Handles multiple features

5. **Dashboard.tsx manages content**
   - Uses 7+ types
   - Handles CRUD operations
   - Sends notifications

---

## Quick Function Lookup

### "I want to..." → "Look at this file"

| Task | Primary File | Related Files |
|------|-------------|---------------|
| Add authentication | `utils/api.ts` | `SignIn.tsx`, `SignUp.tsx` |
| Create new page | `pages/NewPage.tsx` | `App.tsx` (add route) |
| Add new component | `components/NewComponent.tsx` | Parent page |
| Define new type | `types.ts` | All files using the type |
| Add API endpoint | `supabase/functions/server/index.tsx` | `utils/api.ts` |
| Change theme colors | `styles/theme.css` | - |
| Add notification sound | `utils/sounds.ts` | Component triggering sound |
| Modify reader features | `pages/Reader.tsx` | `App.tsx` (handlers) |
| Update database | `supabase/functions/server/index.tsx` | `utils/api.ts` |
| Add mock data | `data/mockData.ts` | Components consuming data |

---

## Version Control Recommendations

### Files to Watch for Conflicts

High-traffic files (likely to have merge conflicts):
1. `/src/app/App.tsx` - Central state management
2. `/src/app/types.ts` - Shared type definitions
3. `/src/app/utils/api.ts` - API functions
4. `/src/styles/theme.css` - Theme variables

### Files Safe to Modify

Low-risk files (isolated changes):
1. Individual page components (`pages/*.tsx`)
2. Individual UI components (`components/*.tsx`)
3. Utility functions (`utils/sounds.ts`, `utils/offline.ts`)

---

**Last Updated:** January 18, 2026
**Maintained by:** Orange Tomato Dev Team

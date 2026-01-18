# Orange Tomato - Developer Quick Start Guide

## 🚀 Getting Started

### Prerequisites
- Node.js 18+ installed
- npm or pnpm package manager
- Git
- Code editor (VS Code recommended)
- Supabase account (for backend)

### Initial Setup

```bash
# 1. Install dependencies
npm install

# 2. Create environment file
cp .env.example .env

# 3. Add Supabase credentials to .env
VITE_SUPABASE_PROJECT_ID=your-project-id
VITE_SUPABASE_ANON_KEY=your-anon-key

# 4. Start development server
npm run dev

# 5. Open browser
# http://localhost:5173
```

---

## 📁 Project Structure - 30 Second Overview

```
/src/app/
├── App.tsx              ← Main app (state + routing)
├── types.ts             ← All TypeScript interfaces
├── components/          ← Reusable UI components
├── pages/               ← Page components (routes)
├── data/mockData.ts     ← Sample data
└── utils/               ← Helper functions
    ├── api.ts           ← Supabase & API calls
    ├── sounds.ts        ← Audio notifications
    └── offline.ts       ← Service worker
```

---

## 🎯 Common Tasks

### 1. Add a New Page

**Step 1:** Create page component
```typescript
// /src/app/pages/NewPage.tsx
import { motion } from 'motion/react';

interface NewPageProps {
  // Define props
}

export function NewPage(props: NewPageProps) {
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      className="container mx-auto p-6"
    >
      <h1>New Page</h1>
    </motion.div>
  );
}
```

**Step 2:** Add to App.tsx routing
```typescript
// In App.tsx

// 1. Add to Page type
type Page = 
  | 'home'
  | 'newpage'  // ← Add this
  | ...;

// 2. Import component
import { NewPage } from './pages/NewPage';

// 3. Add render condition
{currentPage === 'newpage' && (
  <NewPage />
)}
```

**Step 3:** Add navigation link in Header.tsx
```typescript
// In Header.tsx
<button onClick={() => onNavigate('newpage')}>
  New Page
</button>
```

---

### 2. Add a New Feature to Reader

**Example: Add a "Reading Time" display**

**Step 1:** Add state to Reader.tsx
```typescript
const [readingTime, setReadingTime] = useState(0);

useEffect(() => {
  const interval = setInterval(() => {
    setReadingTime(prev => prev + 1);
  }, 1000);
  
  return () => clearInterval(interval);
}, []);
```

**Step 2:** Display in UI
```typescript
<div className="reading-stats">
  Reading time: {Math.floor(readingTime / 60)}:{readingTime % 60}
</div>
```

**Step 3:** (Optional) Track in database
```typescript
// When user finishes chapter
await api.updateReadingTime(chapterId, readingTime);
```

---

### 3. Create a New API Endpoint

**Step 1:** Add function to utils/api.ts
```typescript
export async function getLeaderboard() {
  return authFetch('/leaderboard');
}
```

**Step 2:** Create backend endpoint (supabase/functions/server/index.tsx)
```typescript
// Add route handler
if (pathname === '/leaderboard' && method === 'GET') {
  const { data } = await supabase
    .from('users')
    .select('username, points')
    .order('points', { ascending: false })
    .limit(10);
    
  return new Response(JSON.stringify(data), {
    headers: { 'Content-Type': 'application/json' }
  });
}
```

**Step 3:** Use in component
```typescript
useEffect(() => {
  const fetchLeaderboard = async () => {
    const data = await api.getLeaderboard();
    setLeaderboard(data);
  };
  
  fetchLeaderboard();
}, []);
```

---

### 4. Add a New Type/Interface

**Step 1:** Define in types.ts
```typescript
export interface Achievement {
  id: string;
  userId: string;
  title: string;
  description: string;
  icon: string;
  unlockedAt: string;
}
```

**Step 2:** Add to state in App.tsx
```typescript
const [achievements, setAchievements] = useState<Achievement[]>([]);
```

**Step 3:** Create handler function
```typescript
const handleUnlockAchievement = (achievement: Omit<Achievement, 'id' | 'unlockedAt'>) => {
  const newAchievement: Achievement = {
    ...achievement,
    id: `achievement-${Date.now()}`,
    unlockedAt: new Date().toISOString(),
  };
  setAchievements([newAchievement, ...achievements]);
  toast.success(`Achievement unlocked: ${newAchievement.title}!`);
};
```

**Step 4:** Use in component
```typescript
// In Profile.tsx
<div className="achievements">
  {achievements.map(achievement => (
    <AchievementCard key={achievement.id} achievement={achievement} />
  ))}
</div>
```

---

### 5. Add a Comment to a New Entity

**Example: Add comments to user profiles**

**Step 1:** Update Comment type (types.ts)
```typescript
export interface Comment {
  id: string;
  userId: string;
  username: string;
  storyId?: string;
  chapterId?: string;
  profileId?: string;  // ← Add this
  content: string;
  createdAt: string;
  likes: number;
}
```

**Step 2:** Update handleAddComment in App.tsx
```typescript
const handleAddComment = (content: string, profileId?: string) => {
  const newComment: Comment = {
    id: `comment-${Date.now()}`,
    userId: user.id,
    username: user.username,
    storyId: currentPage === 'story' ? selectedStoryId || undefined : undefined,
    chapterId: currentPage === 'reader' ? `chapter-${selectedStoryId}-${selectedChapter}` : undefined,
    profileId,  // ← Add this
    content,
    createdAt: new Date().toISOString(),
    likes: 0,
  };
  setComments([newComment, ...comments]);
};
```

**Step 3:** Use in Profile.tsx
```typescript
<CommentSection
  comments={comments.filter(c => c.profileId === user.id)}
  onAddComment={(content) => onAddComment(content, user.id)}
/>
```

---

### 6. Add Notification for New Event

**Example: Send notification when user gets a follower**

**Step 1:** Create notification in handler
```typescript
const handleFollowUser = (targetUserId: string, targetUsername: string) => {
  // ... follow logic ...
  
  // Send notification
  const newNotification: Notification = {
    id: `notif-${Date.now()}`,
    userId: targetUserId,
    type: 'follow',
    title: 'New Follower!',
    message: `${user.username} started following you`,
    createdAt: new Date().toISOString(),
    read: false,
  };
  setNotifications([newNotification, ...notifications]);
  
  // Play sound
  playNotificationSound();
};
```

**Step 2:** Handle in Notifications.tsx (already handled)
```typescript
// Notifications automatically display all notification types
```

---

### 7. Customize Theme Colors

**Edit /src/styles/theme.css**

```css
:root {
  /* Change primary color (orange) */
  --primary: 30 100% 60%;  /* Lighter orange */
  
  /* Change background */
  --background: 0 0% 98%;  /* Slightly off-white */
  
  /* Change text color */
  --foreground: 0 0% 10%;
}

.dark {
  /* Dark mode colors */
  --primary: 30 100% 55%;
  --background: 0 0% 5%;    /* Darker black */
  --foreground: 0 0% 95%;
}
```

**Preview changes:** Save file and theme updates automatically

---

### 8. Add Sound Effect

**Step 1:** Add function to utils/sounds.ts
```typescript
export const playSuccessSound = (): void => {
  playBeep(1000, 200);  // High-pitched beep
};
```

**Step 2:** Use in component
```typescript
import { playSuccessSound } from '@/app/utils/sounds';

const handleSuccess = () => {
  // ... success logic ...
  playSuccessSound();
  toast.success('Success!');
};
```

---

### 9. Create Mock Data

**Add to /src/app/data/mockData.ts**

```typescript
export const mockLeaderboard: Leaderboard[] = [
  {
    id: 'lb-1',
    userId: 'user-1',
    username: 'TopReader',
    points: 10000,
    rank: 1,
  },
  // ... more entries
];
```

**Use in component:**
```typescript
import { mockLeaderboard } from './data/mockData';

const [leaderboard] = useState(mockLeaderboard);
```

---

### 10. Debug Common Issues

#### Issue: Component Not Rendering

**Check:**
1. Is currentPage set correctly?
```typescript
console.log('Current page:', currentPage);
```

2. Is the page condition in App.tsx?
```typescript
{currentPage === 'mypage' && <MyPage />}
```

3. Any errors in console?
```
Open DevTools > Console
```

#### Issue: State Not Updating

**Check:**
1. Are you updating state correctly?
```typescript
// ❌ Wrong
state.push(newItem);

// ✅ Correct
setState([...state, newItem]);
```

2. Is the handler being called?
```typescript
const handleClick = () => {
  console.log('Handler called');  // ← Add this
  setState(newValue);
};
```

#### Issue: API Call Failing

**Check:**
1. Network tab in DevTools
2. Check response status and error message
3. Verify authentication token
```typescript
const session = await api.getSession();
console.log('Session:', session);
```

#### Issue: Styling Not Applied

**Check:**
1. Tailwind class names correct?
2. Dark mode prefix used?
```typescript
className="bg-white dark:bg-gray-900"
```

3. Custom CSS in theme.css?

---

## 🔧 Development Workflow

### Daily Development

```bash
# 1. Pull latest changes
git pull origin main

# 2. Install new dependencies (if any)
npm install

# 3. Start dev server
npm run dev

# 4. Make changes
# ... edit files ...

# 5. Test changes
# Check browser, console, network tab

# 6. Commit changes
git add .
git commit -m "feat: add new feature"
git push origin your-branch
```

### Before Committing

**Checklist:**
- [ ] No console errors
- [ ] No TypeScript errors
- [ ] Tested in browser
- [ ] Dark mode works
- [ ] Mobile responsive
- [ ] Animations smooth
- [ ] Sounds work (if applicable)

---

## 🐛 Common Patterns

### Pattern 1: Create → Store → Display

```typescript
// 1. CREATE - Handler in App.tsx
const handleCreateItem = (data) => {
  const newItem = {
    id: `item-${Date.now()}`,
    ...data,
    createdAt: new Date().toISOString(),
  };
  
  // 2. STORE - Update state
  setItems([newItem, ...items]);
  
  // Optional: Persist to backend
  api.addItem(newItem);
};

// 3. DISPLAY - In component
{items.map(item => (
  <ItemCard key={item.id} item={item} />
))}
```

### Pattern 2: Filter → Map → Render

```typescript
// Filter data
const myComments = comments.filter(c => c.userId === user.id);

// Map to components
const commentComponents = myComments.map(comment => (
  <CommentCard key={comment.id} comment={comment} />
));

// Render
return <div>{commentComponents}</div>;

// Or in one line:
return (
  <div>
    {comments
      .filter(c => c.userId === user.id)
      .map(comment => (
        <CommentCard key={comment.id} comment={comment} />
      ))
    }
  </div>
);
```

### Pattern 3: Fetch → Load → Display → Error

```typescript
const [data, setData] = useState(null);
const [isLoading, setIsLoading] = useState(true);
const [error, setError] = useState(null);

useEffect(() => {
  const fetchData = async () => {
    try {
      setIsLoading(true);
      const result = await api.getData();
      setData(result);
    } catch (err) {
      setError(err.message);
      toast.error('Failed to load data');
    } finally {
      setIsLoading(false);
    }
  };
  
  fetchData();
}, []);

// Render
if (isLoading) return <LoadingSpinner />;
if (error) return <ErrorMessage message={error} />;
return <DataDisplay data={data} />;
```

### Pattern 4: Toggle Boolean

```typescript
// Simple toggle
const [isOpen, setIsOpen] = useState(false);
const toggleOpen = () => setIsOpen(!isOpen);

// Toggle with callback
const toggleOpen = () => setIsOpen(prev => !prev);

// Conditional toggle
const toggleIfAllowed = () => {
  if (user) {
    setIsOpen(!isOpen);
  } else {
    toast.error('Please sign in');
  }
};
```

### Pattern 5: Navigation with Data

```typescript
// Navigate and pass data
const handleItemClick = (itemId: string) => {
  setSelectedItemId(itemId);  // Store ID
  setCurrentPage('detail');    // Navigate
};

// Or navigate with state
const handleItemClick = (itemId: string, additionalData?: any) => {
  setSelectedItemId(itemId);
  setAdditionalData(additionalData);
  setCurrentPage('detail');
};

// In detail page
const item = items.find(i => i.id === selectedItemId);
```

---

## 📚 Code Snippets Library

### Snippet: Motion Fade In
```typescript
<motion.div
  initial={{ opacity: 0 }}
  animate={{ opacity: 1 }}
  transition={{ duration: 0.5 }}
>
  {children}
</motion.div>
```

### Snippet: Motion Slide Up
```typescript
<motion.div
  initial={{ opacity: 0, y: 20 }}
  animate={{ opacity: 1, y: 0 }}
  transition={{ duration: 0.3 }}
>
  {children}
</motion.div>
```

### Snippet: List Animation
```typescript
{items.map((item, index) => (
  <motion.div
    key={item.id}
    initial={{ opacity: 0, x: -20 }}
    animate={{ opacity: 1, x: 0 }}
    transition={{ delay: index * 0.1 }}
  >
    {item.name}
  </motion.div>
))}
```

### Snippet: Toast Notification
```typescript
import { toast } from 'sonner';

// Success
toast.success('Operation successful!');

// Error
toast.error('Operation failed!');

// Info
toast.info('Here is some info');

// Custom
toast('Custom message', {
  description: 'Additional details',
  action: {
    label: 'Undo',
    onClick: () => console.log('Undo'),
  },
});
```

### Snippet: Loading Button
```typescript
<button
  onClick={handleSubmit}
  disabled={isLoading}
  className="btn"
>
  {isLoading ? (
    <>
      <Loader2 className="animate-spin" />
      Loading...
    </>
  ) : (
    'Submit'
  )}
</button>
```

### Snippet: Conditional Rendering
```typescript
// If-else
{isAuthenticated ? (
  <UserMenu />
) : (
  <SignInButton />
)}

// Multiple conditions
{loading ? (
  <Spinner />
) : error ? (
  <Error message={error} />
) : (
  <Content data={data} />
)}

// Logical AND
{hasPermission && <AdminPanel />}

// Nullish coalescing
{user?.name ?? 'Guest'}
```

### Snippet: Form Handling
```typescript
const [formData, setFormData] = useState({ name: '', email: '' });

const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
  setFormData({
    ...formData,
    [e.target.name]: e.target.value,
  });
};

const handleSubmit = (e: React.FormEvent) => {
  e.preventDefault();
  // Submit logic
  console.log(formData);
};

return (
  <form onSubmit={handleSubmit}>
    <input
      name="name"
      value={formData.name}
      onChange={handleChange}
    />
    <button type="submit">Submit</button>
  </form>
);
```

---

## 🎨 Styling Quick Reference

### Common Tailwind Classes

```typescript
// Layout
className="flex items-center justify-between"
className="grid grid-cols-3 gap-4"
className="container mx-auto px-4"

// Spacing
className="p-4 m-2"        // padding, margin
className="px-6 py-3"      // horizontal, vertical
className="space-y-4"      // gap between children

// Colors
className="bg-orange-500 text-white"
className="bg-gray-100 dark:bg-gray-900"

// Typography
className="text-2xl font-bold"
className="text-sm text-gray-600"

// Borders & Rounded
className="border border-gray-300 rounded-lg"
className="rounded-full"

// Shadows
className="shadow-md hover:shadow-lg"

// Transitions
className="transition-all duration-300"
className="hover:scale-105"

// Responsive
className="w-full md:w-1/2 lg:w-1/3"
className="hidden md:block"
```

---

## 🚨 Important Notes

### DO ✅
- Use TypeScript types for everything
- Handle errors with try-catch
- Show loading states
- Use Motion for animations
- Keep components small and focused
- Comment complex logic
- Use meaningful variable names

### DON'T ❌
- Mutate state directly
- Ignore TypeScript errors
- Use `any` type
- Forget error handling
- Create giant components
- Hardcode values
- Use inline styles (use Tailwind)

---

## 📞 Help & Resources

### Where to Look

**TypeScript error?**
→ Check `/src/app/types.ts` for interface definition

**API not working?**
→ Check `/src/app/utils/api.ts` and browser Network tab

**Styling issue?**
→ Check `/src/styles/theme.css` and Tailwind classes

**Component not rendering?**
→ Check `/src/app/App.tsx` routing logic

**State not updating?**
→ Check handler functions in `/src/app/App.tsx`

### Documentation Files
1. `COMPREHENSIVE_DOCUMENTATION.md` - Full project docs
2. `FILE_RELATIONSHIPS.md` - File dependencies
3. `QUICK_START_GUIDE.md` - This file

---

## 🎯 Next Steps

After setup, try these tasks to get familiar:

1. **Add a new page** - Create "About" page
2. **Modify theme** - Change primary color
3. **Add mock data** - Create sample achievement
4. **Add sound** - Create new notification sound
5. **Customize reader** - Add word count display

---

**Happy Coding! 🎉**

**Last Updated:** January 18, 2026
**Version:** 1.0.0

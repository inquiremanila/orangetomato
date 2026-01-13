// Mock data for Orange Tomato

import { Story, Chapter, User, UserProgress, Bookmark, Rating, Comment, Activity, Notification, WishlistItem, WishlistComment, CorrectionSuggestion, DevNotice, StoryAnalytics } from '../types';

export const mockUser: User = {
  id: 'user-1',
  email: 'reader@orangetomato.com',
  username: 'AvidReader',
  avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=AvidReader',
  bio: 'Passionate light novel reader and aspiring writer. Love fantasy and isekai genres!',
  joinedDate: '2024-01-15',
};

export const mockStories: Story[] = [
  {
    id: 'story-1',
    title: 'The Crimson Chronicles',
    author: 'Akira Tanaka',
    coverImage: 'https://images.unsplash.com/photo-1621155346337-1d19249f5348?w=400&q=80',
    description: 'A young warrior discovers an ancient power that could save or destroy the realm. As kingdoms fall and rise, the fate of the world rests in unexpected hands.',
    genres: ['Fantasy', 'Action', 'Adventure'],
    rating: 4.7,
    totalRatings: 2341,
    totalChapters: 156,
    status: 'ongoing',
    createdAt: '2023-06-10',
    updatedAt: '2024-12-15',
  },
  {
    id: 'story-2',
    title: 'Reborn as a Shadow Mage',
    author: 'Yuki Shimizu',
    coverImage: 'https://images.unsplash.com/photo-1618172193622-ae2d025f4032?w=400&q=80',
    description: 'After dying in a mundane accident, I found myself reincarnated in a world of magic. But instead of being a hero, I became a shadow mage—feared, misunderstood, and incredibly powerful.',
    genres: ['Isekai', 'Fantasy', 'Magic'],
    rating: 4.9,
    totalRatings: 4523,
    totalChapters: 203,
    status: 'ongoing',
    createdAt: '2023-03-20',
    updatedAt: '2024-12-18',
  },
  {
    id: 'story-3',
    title: 'Academy of the Forgotten',
    author: 'Hana Kobayashi',
    coverImage: 'https://images.unsplash.com/photo-1497633762265-9d179a990aa6?w=400&q=80',
    description: 'In an elite academy where memories are currency, a scholarship student must navigate deadly politics and uncover the truth behind her forgotten past.',
    genres: ['Mystery', 'Fantasy', 'School Life'],
    rating: 4.5,
    totalRatings: 1876,
    totalChapters: 89,
    status: 'ongoing',
    createdAt: '2023-09-05',
    updatedAt: '2024-12-10',
  },
  {
    id: 'story-4',
    title: 'The Last Dungeon Master',
    author: 'Kenji Sato',
    coverImage: 'https://images.unsplash.com/photo-1518770660439-4636190af475?w=400&q=80',
    description: 'When all dungeon masters were hunted to extinction, one survived. Now he must rebuild his dungeon and defend against waves of heroes.',
    genres: ['Fantasy', 'Strategy', 'Comedy'],
    rating: 4.8,
    totalRatings: 3102,
    totalChapters: 142,
    status: 'completed',
    createdAt: '2022-11-01',
    updatedAt: '2024-08-30',
  },
  {
    id: 'story-5',
    title: 'Celestial Sword Chronicles',
    author: 'Rina Takahashi',
    coverImage: 'https://images.unsplash.com/photo-1451187580459-43490279c0fa?w=400&q=80',
    description: 'Seven legendary swords scattered across the cosmos. A lone wanderer seeking redemption. An empire that will stop at nothing to claim ultimate power.',
    genres: ['Sci-Fi', 'Action', 'Adventure'],
    rating: 4.6,
    totalRatings: 2789,
    totalChapters: 178,
    status: 'ongoing',
    createdAt: '2023-04-18',
    updatedAt: '2024-12-16',
  },
  {
    id: 'story-6',
    title: 'My Quiet Life as a Necromancer',
    author: 'Takeshi Yamamoto',
    coverImage: 'https://images.unsplash.com/photo-1509023464722-18d996393ca8?w=400&q=80',
    description: 'I just wanted to live a peaceful life in the countryside, raising crops and the occasional undead minion. Why does everyone think I\'m the demon lord?',
    genres: ['Comedy', 'Fantasy', 'Slice of Life'],
    rating: 4.4,
    totalRatings: 1654,
    totalChapters: 67,
    status: 'ongoing',
    createdAt: '2023-11-22',
    updatedAt: '2024-12-14',
  },
];

export const mockChapters: Chapter[] = [
  {
    id: 'chapter-1-1',
    storyId: 'story-1',
    chapterNumber: 1,
    title: 'The Awakening',
    content: `The morning sun cast long shadows across the training grounds as Kai raised his wooden sword for the thousandth time that week. Sweat dripped from his brow, but he didn't stop. He couldn't stop.

"Again!" Master Hiroshi's voice cut through the still air like the blade Kai hoped to one day wield.

Kai pivoted, bringing the practice sword down in a perfect arc. It was the same movement he'd been drilling for months, yet somehow it felt different today. The air seemed to shimmer around the blade, and for just a moment, he could have sworn he saw crimson light trailing in its wake.

"Did you see that?" Kai asked, excitement building in his chest.

Master Hiroshi's expression remained impassive, but his eyes betrayed a flicker of something—concern? Fear?

"I saw nothing. Continue your forms."

But Kai had seen it. And in that moment, everything changed.

The power that had slumbered within him for sixteen years was beginning to wake. The Crimson Chronicles were about to begin.`,
    publishedAt: '2023-06-10',
  },
  {
    id: 'chapter-1-2',
    storyId: 'story-1',
    chapterNumber: 2,
    title: 'Whispers of the Past',
    content: `That night, Kai couldn't sleep. The crimson light haunted his thoughts, dancing behind his closed eyelids whenever he tried to rest.

He found himself drawn to the old library at the edge of the compound—a place Master Hiroshi had forbidden him to enter. The heavy wooden door creaked as he pushed it open, revealing rows upon rows of ancient texts.

In the dim moonlight filtering through the windows, Kai noticed a particular book seemed to glow with a faint red aura. His hand moved of its own accord, pulling the tome from the shelf.

"The Chronicle of the Crimson Blade," he read aloud, dust falling from the leather cover.

As he opened the first page, the words began to shimmer and rearrange themselves, forming a message clearly meant for him alone:

"When the crimson light awakens, so too shall the ancient war. Bearer of the flame, your destiny awaits..."`,
    publishedAt: '2023-06-12',
  },
];

export const mockUserProgress: UserProgress[] = [
  {
    storyId: 'story-1',
    currentChapter: 23,
    totalChapters: 156,
    lastReadAt: '2024-12-18T14:30:00Z',
  },
  {
    storyId: 'story-2',
    currentChapter: 87,
    totalChapters: 203,
    lastReadAt: '2024-12-17T20:15:00Z',
  },
  {
    storyId: 'story-3',
    currentChapter: 15,
    totalChapters: 89,
    lastReadAt: '2024-12-15T09:45:00Z',
  },
];

export const mockBookmarks: Bookmark[] = [
  {
    id: 'bookmark-1',
    userId: 'user-1',
    storyId: 'story-1',
    addedAt: '2024-11-20',
  },
  {
    id: 'bookmark-2',
    userId: 'user-1',
    storyId: 'story-2',
    addedAt: '2024-11-15',
  },
  {
    id: 'bookmark-3',
    userId: 'user-1',
    storyId: 'story-4',
    addedAt: '2024-12-01',
  },
];

export const mockRatings: Rating[] = [
  {
    id: 'rating-1',
    userId: 'user-1',
    storyId: 'story-1',
    rating: 5,
    createdAt: '2024-12-10',
  },
  {
    id: 'rating-2',
    userId: 'user-1',
    storyId: 'story-2',
    rating: 5,
    createdAt: '2024-12-08',
  },
];

export const mockComments: Comment[] = [
  {
    id: 'comment-1',
    userId: 'user-2',
    username: 'MangaFan123',
    userAvatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=MangaFan123',
    storyId: 'story-1',
    content: 'This story is absolutely amazing! The world-building is incredible and the character development is top-notch. Can\'t wait for the next chapter!',
    createdAt: '2024-12-17T10:30:00Z',
    likes: 24,
  },
  {
    id: 'comment-2',
    userId: 'user-3',
    username: 'NovelAddict',
    userAvatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=NovelAddict',
    storyId: 'story-1',
    content: 'The plot twist in chapter 22 blew my mind! I did not see that coming at all.',
    createdAt: '2024-12-16T15:20:00Z',
    likes: 18,
  },
  {
    id: 'comment-3',
    userId: 'user-4',
    username: 'IsekaiLover',
    userAvatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=IsekaiLover',
    chapterId: 'chapter-1-1',
    content: 'What a great opening chapter! The pacing is perfect and it immediately draws you in.',
    createdAt: '2024-12-18T08:15:00Z',
    likes: 12,
  },
];

export const mockActivities: Activity[] = [
  {
    id: 'activity-1',
    userId: 'user-1',
    type: 'read',
    storyId: 'story-1',
    storyTitle: 'The Crimson Chronicles',
    chapterNumber: 23,
    timestamp: '2024-12-18T14:30:00Z',
    details: 'Read Chapter 23',
  },
  {
    id: 'activity-2',
    userId: 'user-1',
    type: 'rate',
    storyId: 'story-2',
    storyTitle: 'Reborn as a Shadow Mage',
    timestamp: '2024-12-17T20:30:00Z',
    details: 'Rated 5 stars',
  },
  {
    id: 'activity-3',
    userId: 'user-1',
    type: 'bookmark',
    storyId: 'story-4',
    storyTitle: 'The Last Dungeon Master',
    timestamp: '2024-12-17T18:20:00Z',
    details: 'Added to bookmarks',
  },
  {
    id: 'activity-4',
    userId: 'user-1',
    type: 'read',
    storyId: 'story-2',
    storyTitle: 'Reborn as a Shadow Mage',
    chapterNumber: 87,
    timestamp: '2024-12-17T20:15:00Z',
    details: 'Read Chapter 87',
  },
];

export const mockNotifications: Notification[] = [
  {
    id: 'notification-1',
    userId: 'user-1',
    type: 'new_chapter',
    title: 'New Chapter Available',
    message: 'Chapter 157 of "The Crimson Chronicles" has been released!',
    storyId: 'story-1',
    storyTitle: 'The Crimson Chronicles',
    createdAt: '2024-01-06T10:00:00Z',
    read: false,
  },
  {
    id: 'notification-2',
    userId: 'user-1',
    type: 'comment_reply',
    title: 'New Reply',
    message: 'MangaFan123 replied to your comment on "Reborn as a Shadow Mage"',
    storyId: 'story-2',
    storyTitle: 'Reborn as a Shadow Mage',
    createdAt: '2024-01-05T18:30:00Z',
    read: false,
  },
  {
    id: 'notification-3',
    userId: 'user-1',
    type: 'new_chapter',
    title: 'New Chapter Available',
    message: 'Chapter 204 of "Reborn as a Shadow Mage" has been released!',
    storyId: 'story-2',
    storyTitle: 'Reborn as a Shadow Mage',
    createdAt: '2024-01-05T14:00:00Z',
    read: false,
  },
  {
    id: 'notification-4',
    userId: 'user-1',
    type: 'like',
    title: 'Comment Liked',
    message: 'Your comment on "The Crimson Chronicles" received 5 new likes',
    storyId: 'story-1',
    storyTitle: 'The Crimson Chronicles',
    createdAt: '2024-01-04T22:15:00Z',
    read: true,
  },
  {
    id: 'notification-5',
    userId: 'user-1',
    type: 'system',
    title: 'Welcome to Orange Tomato!',
    message: 'Thank you for joining our community of light novel readers. Start exploring today!',
    createdAt: '2024-01-03T12:00:00Z',
    read: true,
  },
  {
    id: 'notification-6',
    userId: 'user-1',
    type: 'new_chapter',
    title: 'New Chapter Available',
    message: 'Chapter 68 of \"My Quiet Life as a Necromancer\" has been released!',
    storyId: 'story-6',
    storyTitle: 'My Quiet Life as a Necromancer',
    createdAt: '2024-01-02T09:00:00Z',
    read: true,
  },
];

export const mockWishlistItems: WishlistItem[] = [
  {
    id: 'wish-1',
    userId: 'user-2',
    username: 'NovelFan99',
    userAvatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=NovelFan99',
    title: 'Overgeared',
    author: 'Park Saenal',
    description: 'This is an amazing Korean light novel about a blacksmith in a VR game. The character development and world-building are incredible. Would love to see it here!',
    coverImage: 'https://images.unsplash.com/photo-1589829085413-56de8ae18c73?w=400&q=80',
    upvotes: 147,
    upvotedBy: ['user-1', 'user-3', 'user-4'],
    commentCount: 23,
    createdAt: '2024-12-01T10:00:00Z',
    status: 'approved',
  },
  {
    id: 'wish-2',
    userId: 'user-3',
    username: 'ReadingAddict',
    title: 'The Beginning After The End',
    author: 'TurtleMe',
    description: 'A king reincarnated into a world of magic. Epic fantasy with amazing plot twists!',
    upvotes: 98,
    upvotedBy: ['user-1', 'user-2'],
    commentCount: 15,
    createdAt: '2024-12-05T14:30:00Z',
    status: 'pending',
  },
  {
    id: 'wish-3',
    userId: 'user-1',
    username: 'AvidReader',
    title: 'Omniscient Reader\'s Viewpoint',
    author: 'Sing Shong',
    description: 'The only person who finished reading a web novel suddenly finds himself inside that story. Absolutely mind-blowing narrative!',
    coverImage: 'https://images.unsplash.com/photo-1524995997946-a1c2e315a42f?w=400&q=80',
    upvotes: 203,
    upvotedBy: ['user-2', 'user-3', 'user-4', 'user-5'],
    commentCount: 34,
    createdAt: '2024-11-28T09:00:00Z',
    status: 'completed',
  },
];

export const mockWishlistComments: WishlistComment[] = [
  {
    id: 'wish-comment-1',
    wishlistItemId: 'wish-1',
    userId: 'user-1',
    username: 'AvidReader',
    userAvatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=AvidReader',
    content: 'I totally agree! Overgeared is one of the best Korean light novels out there.',
    createdAt: '2024-12-02T11:00:00Z',
    likes: 12,
  },
  {
    id: 'wish-comment-2',
    wishlistItemId: 'wish-3',
    userId: 'user-2',
    username: 'NovelFan99',
    content: 'Yes! ORV is a masterpiece. Can\'t wait to see it here!',
    createdAt: '2024-11-29T15:30:00Z',
    likes: 8,
  },
];

export const mockCorrections: CorrectionSuggestion[] = [
  {
    id: 'correction-1',
    chapterId: 'chapter-story-1-12',
    userId: 'user-1',
    username: 'AvidReader',
    originalText: 'The sword gleamed brightly in the son.',
    suggestedText: 'The sword gleamed brightly in the sun.',
    startOffset: 450,
    endOffset: 498,
    reason: 'Typo: "son" should be "sun"',
    status: 'pending',
    createdAt: '2024-12-18T10:30:00Z',
  },
  {
    id: 'correction-2',
    chapterId: 'chapter-story-2-45',
    userId: 'user-3',
    username: 'ReadingAddict',
    originalText: 'He casted a powerful spell.',
    suggestedText: 'He cast a powerful spell.',
    startOffset: 234,
    endOffset: 262,
    reason: 'Grammar: "casted" should be "cast" (irregular verb)',
    status: 'approved',
    createdAt: '2024-12-17T14:20:00Z',
  },
];

export const mockNotices: DevNotice[] = [
  {
    id: 'notice-1',
    title: 'New Stories Coming Soon!',
    message: 'We are excited to announce that 5 new light novel series will be added this month based on your wishlist votes!',
    type: 'update',
    createdAt: '2024-12-15T12:00:00Z',
  },
  {
    id: 'notice-2',
    title: 'Server Maintenance',
    message: 'We will be performing scheduled maintenance on December 25th from 2:00 AM to 4:00 AM EST. The site may be temporarily unavailable during this time.',
    type: 'warning',
    createdAt: '2024-12-10T09:00:00Z',
  },
];

export const mockAnalytics: StoryAnalytics[] = [
  {
    storyId: 'story-1',
    viewCount: 15234,
    uniqueViewers: ['user-1', 'user-2', 'user-3', 'user-4', 'user-5'],
    chapterViews: { 1: 2500, 12: 1800, 45: 1200, 156: 3400 },
    lastViewed: '2024-12-18T22:30:00Z',
  },
  {
    storyId: 'story-2',
    viewCount: 28456,
    uniqueViewers: ['user-1', 'user-2', 'user-3', 'user-4'],
    chapterViews: { 1: 4200, 87: 2100, 150: 1800, 203: 5600 },
    lastViewed: '2024-12-18T23:15:00Z',
  },
  {
    storyId: 'story-3',
    viewCount: 9823,
    uniqueViewers: ['user-1', 'user-3', 'user-5'],
    chapterViews: { 1: 1500, 23: 800, 67: 1200 },
    lastViewed: '2024-12-17T19:45:00Z',
  },
];
import { Hono } from 'npm:hono';
import { cors } from 'npm:hono/cors';
import { logger } from 'npm:hono/logger';
import { createClient } from 'npm:@supabase/supabase-js@2';
import * as kv from './kv_store.tsx';

const app = new Hono();

app.use('*', cors());
app.use('*', logger(console.log));

// Supabase client with service role key for auth operations
const getSupabaseAdmin = () => {
  return createClient(
    Deno.env.get('SUPABASE_URL') ?? '',
    Deno.env.get('SUPABASE_SERVICE_ROLE_KEY') ?? ''
  );
};

// Supabase client with anon key for regular operations
const getSupabaseClient = () => {
  return createClient(
    Deno.env.get('SUPABASE_URL') ?? '',
    Deno.env.get('SUPABASE_ANON_KEY') ?? ''
  );
};

// Middleware to verify authenticated user
const requireAuth = async (request: Request) => {
  const accessToken = request.headers.get('Authorization')?.split(' ')[1];
  if (!accessToken) {
    return { error: 'No authorization token provided', userId: null };
  }

  const supabase = getSupabaseClient();
  const { data: { user }, error } = await supabase.auth.getUser(accessToken);
  
  if (error || !user) {
    return { error: 'Unauthorized', userId: null };
  }

  return { error: null, userId: user.id };
};

// Auth routes
app.post('/make-server-fb38c803/signup', async (c) => {
  try {
    const { email, password, username } = await c.req.json();

    const supabase = getSupabaseAdmin();
    const { data, error } = await supabase.auth.admin.createUser({
      email,
      password,
      user_metadata: { username },
      // Automatically confirm the user's email since an email server hasn't been configured.
      email_confirm: true,
    });

    if (error) {
      console.log('Signup error:', error);
      return c.json({ error: error.message }, 400);
    }

    // Store user profile
    await kv.set(`user:${data.user.id}`, {
      id: data.user.id,
      email,
      username,
      joinedDate: new Date().toISOString().split('T')[0],
    });

    return c.json({ user: data.user });
  } catch (error) {
    console.log('Signup exception:', error);
    return c.json({ error: 'Failed to sign up' }, 500);
  }
});

app.post('/make-server-fb38c803/signin', async (c) => {
  try {
    const { email, password } = await c.req.json();

    const supabase = getSupabaseClient();
    const { data, error } = await supabase.auth.signInWithPassword({
      email,
      password,
    });

    if (error) {
      console.log('Sign in error:', error);
      return c.json({ error: error.message }, 400);
    }

    // Get user profile
    const userProfile = await kv.get(`user:${data.user.id}`);

    return c.json({ 
      session: data.session,
      user: userProfile || {
        id: data.user.id,
        email: data.user.email,
        username: data.user.user_metadata?.username || 'Reader',
        joinedDate: new Date().toISOString().split('T')[0],
      }
    });
  } catch (error) {
    console.log('Sign in exception:', error);
    return c.json({ error: 'Failed to sign in' }, 500);
  }
});

// User progress routes
app.get('/make-server-fb38c803/progress', async (c) => {
  const auth = await requireAuth(c.req.raw);
  if (auth.error) {
    return c.json({ error: auth.error }, 401);
  }

  try {
    const progressList = await kv.getByPrefix(`progress:${auth.userId}:`);
    return c.json({ progress: progressList });
  } catch (error) {
    console.log('Get progress error:', error);
    return c.json({ error: 'Failed to get progress' }, 500);
  }
});

app.post('/make-server-fb38c803/progress', async (c) => {
  const auth = await requireAuth(c.req.raw);
  if (auth.error) {
    return c.json({ error: auth.error }, 401);
  }

  try {
    const { storyId, currentChapter, totalChapters } = await c.req.json();
    
    const progressData = {
      storyId,
      currentChapter,
      totalChapters,
      lastReadAt: new Date().toISOString(),
    };

    await kv.set(`progress:${auth.userId}:${storyId}`, progressData);
    return c.json({ progress: progressData });
  } catch (error) {
    console.log('Update progress error:', error);
    return c.json({ error: 'Failed to update progress' }, 500);
  }
});

// Bookmarks routes
app.get('/make-server-fb38c803/bookmarks', async (c) => {
  const auth = await requireAuth(c.req.raw);
  if (auth.error) {
    return c.json({ error: auth.error }, 401);
  }

  try {
    const bookmarks = await kv.getByPrefix(`bookmark:${auth.userId}:`);
    return c.json({ bookmarks });
  } catch (error) {
    console.log('Get bookmarks error:', error);
    return c.json({ error: 'Failed to get bookmarks' }, 500);
  }
});

app.post('/make-server-fb38c803/bookmarks', async (c) => {
  const auth = await requireAuth(c.req.raw);
  if (auth.error) {
    return c.json({ error: auth.error }, 401);
  }

  try {
    const { storyId } = await c.req.json();
    
    const bookmark = {
      id: `bookmark-${Date.now()}`,
      userId: auth.userId,
      storyId,
      addedAt: new Date().toISOString().split('T')[0],
    };

    await kv.set(`bookmark:${auth.userId}:${storyId}`, bookmark);
    return c.json({ bookmark });
  } catch (error) {
    console.log('Add bookmark error:', error);
    return c.json({ error: 'Failed to add bookmark' }, 500);
  }
});

app.delete('/make-server-fb38c803/bookmarks/:storyId', async (c) => {
  const auth = await requireAuth(c.req.raw);
  if (auth.error) {
    return c.json({ error: auth.error }, 401);
  }

  try {
    const storyId = c.req.param('storyId');
    await kv.del(`bookmark:${auth.userId}:${storyId}`);
    return c.json({ success: true });
  } catch (error) {
    console.log('Delete bookmark error:', error);
    return c.json({ error: 'Failed to delete bookmark' }, 500);
  }
});

// Ratings routes
app.get('/make-server-fb38c803/ratings', async (c) => {
  const auth = await requireAuth(c.req.raw);
  if (auth.error) {
    return c.json({ error: auth.error }, 401);
  }

  try {
    const ratings = await kv.getByPrefix(`rating:${auth.userId}:`);
    return c.json({ ratings });
  } catch (error) {
    console.log('Get ratings error:', error);
    return c.json({ error: 'Failed to get ratings' }, 500);
  }
});

app.post('/make-server-fb38c803/ratings', async (c) => {
  const auth = await requireAuth(c.req.raw);
  if (auth.error) {
    return c.json({ error: auth.error }, 401);
  }

  try {
    const { storyId, rating } = await c.req.json();
    
    const ratingData = {
      id: `rating-${Date.now()}`,
      userId: auth.userId,
      storyId,
      rating,
      createdAt: new Date().toISOString(),
    };

    await kv.set(`rating:${auth.userId}:${storyId}`, ratingData);
    return c.json({ rating: ratingData });
  } catch (error) {
    console.log('Add rating error:', error);
    return c.json({ error: 'Failed to add rating' }, 500);
  }
});

// Comments routes
app.get('/make-server-fb38c803/comments/:storyId', async (c) => {
  try {
    const storyId = c.req.param('storyId');
    const comments = await kv.getByPrefix(`comment:story:${storyId}:`);
    return c.json({ comments });
  } catch (error) {
    console.log('Get comments error:', error);
    return c.json({ error: 'Failed to get comments' }, 500);
  }
});

app.get('/make-server-fb38c803/comments/chapter/:chapterId', async (c) => {
  try {
    const chapterId = c.req.param('chapterId');
    const comments = await kv.getByPrefix(`comment:chapter:${chapterId}:`);
    return c.json({ comments });
  } catch (error) {
    console.log('Get chapter comments error:', error);
    return c.json({ error: 'Failed to get comments' }, 500);
  }
});

app.post('/make-server-fb38c803/comments', async (c) => {
  const auth = await requireAuth(c.req.raw);
  if (auth.error) {
    return c.json({ error: auth.error }, 401);
  }

  try {
    const { storyId, chapterId, content } = await c.req.json();
    
    // Get user info
    const userProfile = await kv.get(`user:${auth.userId}`);
    
    const commentId = `comment-${Date.now()}`;
    const comment = {
      id: commentId,
      userId: auth.userId,
      username: userProfile?.username || 'Reader',
      userAvatar: userProfile?.avatar,
      storyId,
      chapterId,
      content,
      createdAt: new Date().toISOString(),
      likes: 0,
    };

    // Store by story or chapter
    if (chapterId) {
      await kv.set(`comment:chapter:${chapterId}:${commentId}`, comment);
    } else if (storyId) {
      await kv.set(`comment:story:${storyId}:${commentId}`, comment);
    }

    return c.json({ comment });
  } catch (error) {
    console.log('Add comment error:', error);
    return c.json({ error: 'Failed to add comment' }, 500);
  }
});

// Activities routes
app.get('/make-server-fb38c803/activities', async (c) => {
  const auth = await requireAuth(c.req.raw);
  if (auth.error) {
    return c.json({ error: auth.error }, 401);
  }

  try {
    const activities = await kv.getByPrefix(`activity:${auth.userId}:`);
    // Sort by timestamp descending
    const sortedActivities = activities.sort((a: any, b: any) => 
      new Date(b.timestamp).getTime() - new Date(a.timestamp).getTime()
    );
    return c.json({ activities: sortedActivities });
  } catch (error) {
    console.log('Get activities error:', error);
    return c.json({ error: 'Failed to get activities' }, 500);
  }
});

app.post('/make-server-fb38c803/activities', async (c) => {
  const auth = await requireAuth(c.req.raw);
  if (auth.error) {
    return c.json({ error: auth.error }, 401);
  }

  try {
    const { type, storyId, storyTitle, details } = await c.req.json();
    
    const activityId = `activity-${Date.now()}`;
    const activity = {
      id: activityId,
      userId: auth.userId,
      type,
      storyId,
      storyTitle,
      timestamp: new Date().toISOString(),
      details,
    };

    await kv.set(`activity:${auth.userId}:${activityId}`, activity);
    
    // Track analytics for trending
    await trackAnalytics(type, storyId, storyTitle);
    
    return c.json({ activity });
  } catch (error) {
    console.log('Add activity error:', error);
    return c.json({ error: 'Failed to add activity' }, 500);
  }
});

// Analytics tracking function
async function trackAnalytics(type: string, storyId: string, storyTitle: string) {
  try {
    const analyticsKey = `analytics:${storyId}`;
    const analytics = await kv.get(analyticsKey) || {
      storyId,
      storyTitle,
      reads: 0,
      bookmarks: 0,
      ratings: 0,
      comments: 0,
      lastUpdated: new Date().toISOString(),
    };

    // Increment the appropriate counter
    if (type === 'read') analytics.reads++;
    if (type === 'bookmark') analytics.bookmarks++;
    if (type === 'rate') analytics.ratings++;
    if (type === 'comment') analytics.comments++;

    analytics.lastUpdated = new Date().toISOString();
    await kv.set(analyticsKey, analytics);
  } catch (error) {
    console.log('Analytics tracking error:', error);
  }
}

// Get analytics/trending data
app.get('/make-server-fb38c803/analytics', async (c) => {
  try {
    const analytics = await kv.getByPrefix('analytics:');
    
    // Calculate trending score (reads * 2 + bookmarks * 3 + ratings * 1.5 + comments * 2)
    const trending = analytics.map((item: any) => ({
      ...item,
      trendingScore: (item.reads * 2) + (item.bookmarks * 3) + (item.ratings * 1.5) + (item.comments * 2)
    })).sort((a: any, b: any) => b.trendingScore - a.trendingScore);
    
    return c.json({ analytics: trending });
  } catch (error) {
    console.log('Get analytics error:', error);
    return c.json({ error: 'Failed to get analytics' }, 500);
  }
});

// Update profile (username and password)
app.post('/make-server-fb38c803/profile/update', async (c) => {
  const auth = await requireAuth(c.req.raw);
  if (auth.error) {
    return c.json({ error: auth.error }, 401);
  }

  try {
    const { username, password } = await c.req.json();
    const supabase = getSupabaseAdmin();

    // Update user metadata with new username
    if (username) {
      await supabase.auth.admin.updateUserById(auth.userId, {
        user_metadata: { username }
      });

      // Update stored user profile
      const userProfile = await kv.get(`user:${auth.userId}`);
      if (userProfile) {
        userProfile.username = username;
        await kv.set(`user:${auth.userId}`, userProfile);
      }
    }

    // Update password if provided
    if (password) {
      await supabase.auth.admin.updateUserById(auth.userId, {
        password
      });
    }

    return c.json({ success: true, message: 'Profile updated successfully' });
  } catch (error) {
    console.log('Update profile error:', error);
    return c.json({ error: 'Failed to update profile' }, 500);
  }
});

// Password reset request
app.post('/make-server-fb38c803/auth/reset-password', async (c) => {
  try {
    const { email } = await c.req.json();
    const supabase = getSupabaseClient();

    const { error } = await supabase.auth.resetPasswordForEmail(email, {
      redirectTo: `${Deno.env.get('SUPABASE_URL')}/auth/v1/verify`,
    });

    if (error) {
      console.log('Password reset error:', error);
      return c.json({ error: error.message }, 400);
    }

    return c.json({ success: true, message: 'Password reset email sent' });
  } catch (error) {
    console.log('Password reset exception:', error);
    return c.json({ error: 'Failed to send reset email' }, 500);
  }
});

Deno.serve(app.fetch);
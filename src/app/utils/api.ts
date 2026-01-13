import { projectId, publicAnonKey } from '../../../utils/supabase/info';
import { createClient } from '@supabase/supabase-js';

const API_URL = `https://${projectId}.supabase.co/functions/v1/make-server-fb38c803`;

let accessToken: string | null = null;

// Create Supabase client
export const supabase = createClient(
  `https://${projectId}.supabase.co`,
  publicAnonKey
);

// Set access token for authenticated requests
export function setAccessToken(token: string | null) {
  accessToken = token;
}

// Get current session
export async function getSession() {
  const { data: { session } } = await supabase.auth.getSession();
  if (session?.access_token) {
    setAccessToken(session.access_token);
  }
  return session;
}

// Helper function for authenticated requests
async function authFetch(endpoint: string, options: RequestInit = {}) {
  const headers: HeadersInit = {
    'Content-Type': 'application/json',
    ...options.headers,
  };

  if (accessToken) {
    headers['Authorization'] = `Bearer ${accessToken}`;
  }

  const response = await fetch(`${API_URL}${endpoint}`, {
    ...options,
    headers,
  });

  if (!response.ok) {
    const error = await response.json().catch(() => ({ error: 'Request failed' }));
    throw new Error(error.error || 'Request failed');
  }

  return response.json();
}

// Auth API
export async function signUp(email: string, password: string, username: string) {
  const response = await fetch(`${API_URL}/signup`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ email, password, username }),
  });

  if (!response.ok) {
    const error = await response.json();
    throw new Error(error.error || 'Sign up failed');
  }

  return response.json();
}

export async function signIn(email: string, password: string) {
  const response = await fetch(`${API_URL}/signin`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ email, password }),
  });

  if (!response.ok) {
    const error = await response.json();
    throw new Error(error.error || 'Sign in failed');
  }

  const data = await response.json();
  if (data.session?.access_token) {
    setAccessToken(data.session.access_token);
  }
  return data;
}

export async function signOut() {
  await supabase.auth.signOut();
  setAccessToken(null);
}

// Progress API
export async function getProgress() {
  return authFetch('/progress');
}

export async function updateProgress(storyId: string, currentChapter: number, totalChapters: number) {
  return authFetch('/progress', {
    method: 'POST',
    body: JSON.stringify({ storyId, currentChapter, totalChapters }),
  });
}

// Bookmarks API
export async function getBookmarks() {
  return authFetch('/bookmarks');
}

export async function addBookmark(storyId: string) {
  return authFetch('/bookmarks', {
    method: 'POST',
    body: JSON.stringify({ storyId }),
  });
}

export async function deleteBookmark(storyId: string) {
  return authFetch(`/bookmarks/${storyId}`, {
    method: 'DELETE',
  });
}

// Ratings API
export async function getRatings() {
  return authFetch('/ratings');
}

export async function addRating(storyId: string, rating: number) {
  return authFetch('/ratings', {
    method: 'POST',
    body: JSON.stringify({ storyId, rating }),
  });
}

// Comments API
export async function getStoryComments(storyId: string) {
  const response = await fetch(`${API_URL}/comments/${storyId}`);
  return response.json();
}

export async function getChapterComments(chapterId: string) {
  const response = await fetch(`${API_URL}/comments/chapter/${chapterId}`);
  return response.json();
}

export async function addComment(content: string, storyId?: string, chapterId?: string) {
  return authFetch('/comments', {
    method: 'POST',
    body: JSON.stringify({ content, storyId, chapterId }),
  });
}

// Activities API
export async function getActivities() {
  return authFetch('/activities');
}

export async function addActivity(type: string, storyId: string, storyTitle: string, details?: string) {
  return authFetch('/activities', {
    method: 'POST',
    body: JSON.stringify({ type, storyId, storyTitle, details }),
  });
}

// Analytics API
export async function getAnalytics() {
  const response = await fetch(`${API_URL}/analytics`);
  return response.json();
}

// Profile API
export async function updateProfile(username: string, password?: string) {
  return authFetch('/profile/update', {
    method: 'POST',
    body: JSON.stringify({ username, password }),
  });
}

// Password Reset API
export async function resetPassword(email: string) {
  const response = await fetch(`${API_URL}/auth/reset-password`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ email }),
  });

  if (!response.ok) {
    const error = await response.json();
    throw new Error(error.error || 'Password reset failed');
  }

  return response.json();
}
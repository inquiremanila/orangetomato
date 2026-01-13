import { Calendar, BookOpen, Star, MessageSquare, Edit } from 'lucide-react';
import { motion } from 'motion/react';
import { User, Activity } from '../types';
import { useState } from 'react';
import { EditProfileDialog } from '../components/EditProfileDialog';

interface ProfileProps {
  user: User;
  activities: Activity[];
  totalStoriesRead: number;
  totalRatingsGiven: number;
  totalComments: number;
  onNavigate: (page: string, storyId?: string, chapter?: number) => void;
  onUpdateProfile: (username: string, password?: string) => Promise<void>;
}

export function Profile({
  user,
  activities,
  totalStoriesRead,
  totalRatingsGiven,
  totalComments,
  onNavigate,
  onUpdateProfile,
}: ProfileProps) {
  const [activeFilter, setActiveFilter] = useState<'read' | 'rate' | 'comment' | null>(null);
  const [isEditDialogOpen, setIsEditDialogOpen] = useState(false);

  const stats = [
    { icon: BookOpen, label: 'Stories Read', value: totalStoriesRead, filter: 'read' as const },
    { icon: Star, label: 'Ratings Given', value: totalRatingsGiven, filter: 'rate' as const },
    { icon: MessageSquare, label: 'Comments', value: totalComments, filter: 'comment' as const },
  ];

  const filteredActivities = activeFilter
    ? activities.filter((activity) => activity.type === activeFilter)
    : activities;

  const handleFilterClick = (filter: 'read' | 'rate' | 'comment') => {
    setActiveFilter(activeFilter === filter ? null : filter);
  };

  const handleActivityClick = (activity: Activity) => {
    if (activity.type === 'read' && activity.chapterNumber) {
      // Navigate to the specific chapter
      onNavigate('chapter', activity.storyId, activity.chapterNumber);
    } else if (activity.type === 'bookmark' || activity.type === 'rate') {
      // Navigate to the story page
      onNavigate('story', activity.storyId);
    } else if (activity.type === 'comment') {
      // Navigate to the story page where comments are shown
      onNavigate('story', activity.storyId);
    }
  };

  const getActivityIcon = (type: string) => {
    switch (type) {
      case 'read':
        return '📖';
      case 'bookmark':
        return '🔖';
      case 'rate':
        return '⭐';
      case 'comment':
        return '💬';
      default:
        return '📝';
    }
  };

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="grid grid-cols-1 gap-8 lg:grid-cols-3">
        {/* Profile Card */}
        <div className="lg:col-span-1">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="rounded-lg border border-border bg-card p-6"
          >
            <div className="text-center">
              <div className="mx-auto mb-4 flex h-24 w-24 items-center justify-center rounded-full bg-gradient-to-br from-orange-500 to-red-600">
                <span className="text-4xl text-white">
                  {user.username.charAt(0).toUpperCase()}
                </span>
              </div>

              <h2 className="mb-1">{user.username}</h2>
              <p className="mb-4 text-sm text-muted-foreground">{user.email}</p>

              {user.bio && (
                <p className="mb-6 text-sm text-foreground/80">{user.bio}</p>
              )}

              <div className="flex items-center justify-center gap-2 text-sm text-muted-foreground">
                <Calendar className="h-4 w-4" />
                <span>Joined {new Date(user.joinedDate).toLocaleDateString()}</span>
              </div>

              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="mt-6 flex w-full items-center justify-center gap-2 rounded-lg border border-border py-2 hover:bg-secondary"
                onClick={() => setIsEditDialogOpen(true)}
              >
                <Edit className="h-4 w-4" />
                Edit Profile
              </motion.button>
            </div>
          </motion.div>

          {/* Stats */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="mt-6 space-y-3"
          >
            {stats.map((stat, index) => (
              <motion.button
                key={stat.label}
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.2 + index * 0.1 }}
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                onClick={() => handleFilterClick(stat.filter)}
                className={`flex w-full items-center justify-between rounded-lg border p-4 transition-colors ${
                  activeFilter === stat.filter
                    ? 'border-orange-500 bg-orange-500/10'
                    : 'border-border bg-card hover:bg-secondary'
                }`}
              >
                <div className="flex items-center gap-3">
                  <div className={`flex h-10 w-10 items-center justify-center rounded-lg ${
                    activeFilter === stat.filter ? 'bg-orange-500/20' : 'bg-orange-500/10'
                  }`}>
                    <stat.icon className="h-5 w-5 text-orange-500" />
                  </div>
                  <span className="text-sm text-muted-foreground">{stat.label}</span>
                </div>
                <span className="text-xl">{stat.value}</span>
              </motion.button>
            ))}
          </motion.div>
        </div>

        {/* Activity Feed */}
        <div className="lg:col-span-2">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
          >
            <h2 className="mb-6">Recent Activity</h2>

            <div className="space-y-4">
              {filteredActivities.map((activity, index) => (
                <motion.button
                  key={activity.id}
                  initial={{ opacity: 0, x: 20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 0.3 + index * 0.05 }}
                  whileHover={{ scale: 1.01 }}
                  whileTap={{ scale: 0.99 }}
                  onClick={() => handleActivityClick(activity)}
                  className="flex w-full gap-4 rounded-lg border border-border bg-card p-4 text-left transition-colors hover:bg-secondary"
                >
                  <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-secondary text-xl">
                    {getActivityIcon(activity.type)}
                  </div>

                  <div className="flex-1">
                    <div className="mb-1">
                      <span className="text-foreground/90">
                        {activity.type === 'read' && 'Read a chapter of '}
                        {activity.type === 'bookmark' && 'Bookmarked '}
                        {activity.type === 'rate' && 'Rated '}
                        {activity.type === 'comment' && 'Commented on '}
                      </span>
                      <span className="text-orange-500 hover:text-orange-400">{activity.storyTitle}</span>
                    </div>

                    {activity.details && (
                      <p className="text-sm text-muted-foreground">{activity.details}</p>
                    )}

                    <div className="mt-2 text-xs text-muted-foreground">
                      {new Date(activity.timestamp).toLocaleString()}
                    </div>
                  </div>
                </motion.button>
              ))}

              {filteredActivities.length === 0 && (
                <div className="py-12 text-center text-muted-foreground">
                  {activeFilter
                    ? `No ${activeFilter === 'read' ? 'reading' : activeFilter === 'rate' ? 'rating' : 'comment'} activity yet.`
                    : 'No activity yet. Start reading to see your activity here!'}
                </div>
              )}
            </div>
          </motion.div>
        </div>
      </div>

      <EditProfileDialog
        isOpen={isEditDialogOpen}
        onClose={() => setIsEditDialogOpen(false)}
        user={user}
        onUpdateProfile={onUpdateProfile}
      />
    </div>
  );
}
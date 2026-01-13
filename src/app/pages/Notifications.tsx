import { motion } from 'motion/react';
import { Bell, BookOpen, MessageCircle, Heart, Info, Check, X } from 'lucide-react';
import { Notification } from '../types';

interface NotificationsProps {
  notifications: Notification[];
  onMarkAsRead: (id: string) => void;
  onMarkAllAsRead: () => void;
  onDelete: (id: string) => void;
  onNotificationClick: (notification: Notification) => void;
}

export function Notifications({
  notifications,
  onMarkAsRead,
  onMarkAllAsRead,
  onDelete,
  onNotificationClick,
}: NotificationsProps) {
  const unreadCount = notifications.filter((n) => !n.read).length;

  const getNotificationIcon = (type: Notification['type']) => {
    switch (type) {
      case 'new_chapter':
        return <BookOpen className="h-5 w-5 text-orange-500" />;
      case 'comment_reply':
        return <MessageCircle className="h-5 w-5 text-blue-500" />;
      case 'like':
        return <Heart className="h-5 w-5 text-pink-500" />;
      case 'system':
        return <Info className="h-5 w-5 text-purple-500" />;
      default:
        return <Bell className="h-5 w-5 text-muted-foreground" />;
    }
  };

  const formatTime = (dateString: string) => {
    const date = new Date(dateString);
    const now = new Date();
    const diffMs = now.getTime() - date.getTime();
    const diffMins = Math.floor(diffMs / 60000);
    const diffHours = Math.floor(diffMs / 3600000);
    const diffDays = Math.floor(diffMs / 86400000);

    if (diffMins < 60) return `${diffMins}m ago`;
    if (diffHours < 24) return `${diffHours}h ago`;
    if (diffDays < 7) return `${diffDays}d ago`;
    return date.toLocaleDateString();
  };

  return (
    <div className="min-h-screen bg-background py-8">
      <div className="container mx-auto max-w-4xl px-4">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          className="mb-6"
        >
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-3xl font-bold">Notifications</h1>
              {unreadCount > 0 && (
                <p className="text-sm text-muted-foreground mt-1">
                  You have {unreadCount} unread notification{unreadCount !== 1 ? 's' : ''}
                </p>
              )}
            </div>
            {unreadCount > 0 && (
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={onMarkAllAsRead}
                className="flex items-center gap-2 rounded-lg bg-orange-500/10 px-4 py-2 text-orange-500 hover:bg-orange-500/20 transition-colors"
              >
                <Check className="h-4 w-4" />
                Mark all as read
              </motion.button>
            )}
          </div>
        </motion.div>

        {/* Notifications List */}
        <div className="space-y-2">
          {notifications.length === 0 ? (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className="text-center py-16"
            >
              <Bell className="h-16 w-16 mx-auto mb-4 text-muted-foreground/50" />
              <h3 className="text-xl font-semibold mb-2">No notifications yet</h3>
              <p className="text-muted-foreground">
                When you get notifications, they'll show up here
              </p>
            </motion.div>
          ) : (
            notifications.map((notification, index) => (
              <motion.div
                key={notification.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.05 }}
                className={`group relative rounded-lg border border-border p-4 transition-all hover:border-orange-500/50 hover:shadow-lg ${
                  !notification.read ? 'bg-orange-500/5 border-orange-500/30' : 'bg-card'
                }`}
              >
                <div className="flex gap-4">
                  {/* Icon */}
                  <div className="flex-shrink-0 mt-1">
                    {getNotificationIcon(notification.type)}
                  </div>

                  {/* Content */}
                  <div
                    className="flex-1 cursor-pointer"
                    onClick={() => onNotificationClick(notification)}
                  >
                    <div className="flex items-start justify-between gap-4">
                      <div>
                        <h3 className="font-semibold mb-1">
                          {notification.title}
                        </h3>
                        <p className="text-sm text-muted-foreground mb-2">
                          {notification.message}
                        </p>
                        <div className="flex items-center gap-2 text-xs text-muted-foreground">
                          <span>{formatTime(notification.createdAt)}</span>
                          {!notification.read && (
                            <span className="flex h-2 w-2 rounded-full bg-orange-500"></span>
                          )}
                        </div>
                      </div>

                      {/* Actions */}
                      <div className="flex gap-2 opacity-0 group-hover:opacity-100 transition-opacity">
                        {!notification.read && (
                          <motion.button
                            whileHover={{ scale: 1.1 }}
                            whileTap={{ scale: 0.9 }}
                            onClick={(e) => {
                              e.stopPropagation();
                              onMarkAsRead(notification.id);
                            }}
                            className="rounded-lg p-1.5 hover:bg-secondary"
                            title="Mark as read"
                          >
                            <Check className="h-4 w-4" />
                          </motion.button>
                        )}
                        <motion.button
                          whileHover={{ scale: 1.1 }}
                          whileTap={{ scale: 0.9 }}
                          onClick={(e) => {
                            e.stopPropagation();
                            onDelete(notification.id);
                          }}
                          className="rounded-lg p-1.5 hover:bg-secondary text-red-500"
                          title="Delete"
                        >
                          <X className="h-4 w-4" />
                        </motion.button>
                      </div>
                    </div>
                  </div>
                </div>
              </motion.div>
            ))
          )}
        </div>
      </div>
    </div>
  );
}
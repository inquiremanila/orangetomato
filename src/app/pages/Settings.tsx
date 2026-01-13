import { Bell, Lock, User as UserIcon, Palette, Globe } from 'lucide-react';
import { motion } from 'motion/react';
import { useState } from 'react';

interface SettingsProps {
  onSave: () => void;
}

export function Settings({ onSave }: SettingsProps) {
  const [emailNotifications, setEmailNotifications] = useState(true);
  const [pushNotifications, setPushNotifications] = useState(true);
  const [newChapters, setNewChapters] = useState(true);
  const [comments, setComments] = useState(false);

  const settingsSections = [
    {
      title: 'Notifications',
      icon: Bell,
      settings: [
        {
          label: 'Email Notifications',
          description: 'Receive notifications via email',
          value: emailNotifications,
          onChange: setEmailNotifications,
        },
        {
          label: 'Push Notifications',
          description: 'Receive push notifications in browser',
          value: pushNotifications,
          onChange: setPushNotifications,
        },
        {
          label: 'New Chapters',
          description: 'Notify me when new chapters are released',
          value: newChapters,
          onChange: setNewChapters,
        },
        {
          label: 'Comment Replies',
          description: 'Notify me when someone replies to my comment',
          value: comments,
          onChange: setComments,
        },
      ],
    },
  ];

  return (
    <div className="container mx-auto max-w-4xl px-4 py-8">
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        className="mb-8"
      >
        <h1 className="mb-2">Settings</h1>
        <p className="text-muted-foreground">Manage your account preferences</p>
      </motion.div>

      <div className="space-y-6">
        {/* Account Settings */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="rounded-lg border border-border bg-card p-6"
        >
          <div className="mb-4 flex items-center gap-2">
            <UserIcon className="h-5 w-5 text-orange-500" />
            <h3>Account</h3>
          </div>

          <div className="space-y-4">
            <div>
              <label className="mb-2 block text-sm">Username</label>
              <input
                type="text"
                defaultValue="AvidReader"
                className="w-full rounded-lg border border-border bg-secondary/50 px-4 py-2 outline-none transition-colors focus:border-orange-500/50 focus:bg-secondary"
              />
            </div>

            <div>
              <label className="mb-2 block text-sm">Email</label>
              <input
                type="email"
                defaultValue="reader@orangetomato.com"
                className="w-full rounded-lg border border-border bg-secondary/50 px-4 py-2 outline-none transition-colors focus:border-orange-500/50 focus:bg-secondary"
              />
            </div>

            <div>
              <label className="mb-2 block text-sm">Bio</label>
              <textarea
                placeholder="Tell us about yourself..."
                rows={3}
                className="w-full rounded-lg border border-border bg-secondary/50 px-4 py-2 outline-none transition-colors focus:border-orange-500/50 focus:bg-secondary resize-none"
              />
            </div>
          </div>
        </motion.div>

        {/* Security */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
          className="rounded-lg border border-border bg-card p-6"
        >
          <div className="mb-4 flex items-center gap-2">
            <Lock className="h-5 w-5 text-orange-500" />
            <h3>Security</h3>
          </div>

          <div className="space-y-4">
            <div>
              <label className="mb-2 block text-sm">Current Password</label>
              <input
                type="password"
                placeholder="Enter current password"
                className="w-full rounded-lg border border-border bg-secondary/50 px-4 py-2 outline-none transition-colors focus:border-orange-500/50 focus:bg-secondary"
              />
            </div>

            <div>
              <label className="mb-2 block text-sm">New Password</label>
              <input
                type="password"
                placeholder="Enter new password"
                className="w-full rounded-lg border border-border bg-secondary/50 px-4 py-2 outline-none transition-colors focus:border-orange-500/50 focus:bg-secondary"
              />
            </div>

            <div>
              <label className="mb-2 block text-sm">Confirm New Password</label>
              <input
                type="password"
                placeholder="Confirm new password"
                className="w-full rounded-lg border border-border bg-secondary/50 px-4 py-2 outline-none transition-colors focus:border-orange-500/50 focus:bg-secondary"
              />
            </div>
          </div>
        </motion.div>

        {/* Notifications */}
        {settingsSections.map((section, index) => (
          <motion.div
            key={section.title}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 + index * 0.1 }}
            className="rounded-lg border border-border bg-card p-6"
          >
            <div className="mb-4 flex items-center gap-2">
              <section.icon className="h-5 w-5 text-orange-500" />
              <h3>{section.title}</h3>
            </div>

            <div className="space-y-4">
              {section.settings.map((setting) => (
                <div key={setting.label} className="flex items-center justify-between">
                  <div className="flex-1">
                    <div className="mb-1">{setting.label}</div>
                    <p className="text-sm text-muted-foreground">{setting.description}</p>
                  </div>
                  <button
                    onClick={() => setting.onChange(!setting.value)}
                    className={`relative h-6 w-11 rounded-full transition-colors ${
                      setting.value ? 'bg-orange-500' : 'bg-secondary'
                    }`}
                  >
                    <motion.div
                      animate={{ x: setting.value ? 20 : 2 }}
                      className="absolute top-1 h-4 w-4 rounded-full bg-white"
                    />
                  </button>
                </div>
              ))}
            </div>
          </motion.div>
        ))}

        {/* Appearance */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3 }}
          className="rounded-lg border border-border bg-card p-6"
        >
          <div className="mb-4 flex items-center gap-2">
            <Palette className="h-5 w-5 text-orange-500" />
            <h3>Appearance</h3>
          </div>

          <div className="space-y-4">
            <div>
              <label className="mb-2 block text-sm">Theme</label>
              <select className="w-full rounded-lg border border-border bg-secondary/50 px-4 py-2 outline-none transition-colors focus:border-orange-500/50 focus:bg-secondary">
                <option value="dark">Dark</option>
                <option value="light">Light</option>
                <option value="auto">Auto</option>
              </select>
            </div>

            <div>
              <label className="mb-2 block text-sm">Reading Font Size</label>
              <select className="w-full rounded-lg border border-border bg-secondary/50 px-4 py-2 outline-none transition-colors focus:border-orange-500/50 focus:bg-secondary">
                <option value="small">Small</option>
                <option value="medium">Medium</option>
                <option value="large">Large</option>
              </select>
            </div>
          </div>
        </motion.div>

        {/* Language */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4 }}
          className="rounded-lg border border-border bg-card p-6"
        >
          <div className="mb-4 flex items-center gap-2">
            <Globe className="h-5 w-5 text-orange-500" />
            <h3>Language & Region</h3>
          </div>

          <div className="space-y-4">
            <div>
              <label className="mb-2 block text-sm">Language</label>
              <select className="w-full rounded-lg border border-border bg-secondary/50 px-4 py-2 outline-none transition-colors focus:border-orange-500/50 focus:bg-secondary">
                <option value="en">English</option>
                <option value="ja">日本語</option>
                <option value="ko">한국어</option>
                <option value="zh">中文</option>
              </select>
            </div>
          </div>
        </motion.div>

        {/* Save Button */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.5 }}
          className="flex justify-end gap-4"
        >
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            className="rounded-lg border border-border px-6 py-2 hover:bg-secondary"
          >
            Cancel
          </motion.button>
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={onSave}
            className="rounded-lg bg-gradient-to-r from-orange-500 to-red-600 px-6 py-2 text-white hover:from-orange-600 hover:to-red-700"
          >
            Save Changes
          </motion.button>
        </motion.div>
      </div>
    </div>
  );
}
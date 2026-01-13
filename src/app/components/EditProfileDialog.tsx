import { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { X, User, Lock, Loader } from 'lucide-react';
import { User as UserType } from '../types';

interface EditProfileDialogProps {
  isOpen: boolean;
  onClose: () => void;
  user: UserType;
  onUpdateProfile: (username: string, password?: string) => Promise<void>;
}

export function EditProfileDialog({
  isOpen,
  onClose,
  user,
  onUpdateProfile,
}: EditProfileDialogProps) {
  const [username, setUsername] = useState(user.username);
  const [currentPassword, setCurrentPassword] = useState('');
  const [newPassword, setNewPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    setSuccess('');

    if (!username.trim()) {
      setError('Username cannot be empty');
      return;
    }

    if (newPassword) {
      if (!currentPassword) {
        setError('Current password is required to set a new password');
        return;
      }
      if (newPassword.length < 6) {
        setError('New password must be at least 6 characters');
        return;
      }
      if (newPassword !== confirmPassword) {
        setError('New passwords do not match');
        return;
      }
    }

    setIsLoading(true);
    try {
      await onUpdateProfile(username, newPassword || undefined);
      setSuccess('Profile updated successfully!');
      setTimeout(() => {
        onClose();
        setSuccess('');
        setCurrentPassword('');
        setNewPassword('');
        setConfirmPassword('');
      }, 1500);
    } catch (err: any) {
      setError(err.message || 'Failed to update profile');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <>
          {/* Backdrop */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 bg-black/80"
            onClick={onClose}
          />

          {/* Dialog */}
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.95 }}
              className="relative w-full max-w-md rounded-lg border border-border bg-card p-6 shadow-xl"
              onClick={(e) => e.stopPropagation()}
            >
              {/* Close button */}
              <button
                onClick={onClose}
                className="absolute right-4 top-4 rounded-lg p-1 hover:bg-secondary"
              >
                <X className="h-5 w-5" />
              </button>

              {/* Header */}
              <h2 className="mb-6 text-2xl font-bold">Edit Profile</h2>

              {/* Form */}
              <form onSubmit={handleSubmit} className="space-y-4">
                {/* Username */}
                <div>
                  <label className="mb-2 flex items-center gap-2 text-sm font-medium">
                    <User className="h-4 w-4" />
                    Username
                  </label>
                  <input
                    type="text"
                    value={username}
                    onChange={(e) => setUsername(e.target.value)}
                    className="w-full rounded-lg border border-border bg-secondary/50 px-4 py-2 outline-none transition-colors focus:border-orange-500/50 focus:bg-secondary"
                    placeholder="Enter username"
                  />
                </div>

                {/* Current Password */}
                <div>
                  <label className="mb-2 flex items-center gap-2 text-sm font-medium">
                    <Lock className="h-4 w-4" />
                    Current Password (required to change password)
                  </label>
                  <input
                    type="password"
                    value={currentPassword}
                    onChange={(e) => setCurrentPassword(e.target.value)}
                    className="w-full rounded-lg border border-border bg-secondary/50 px-4 py-2 outline-none transition-colors focus:border-orange-500/50 focus:bg-secondary"
                    placeholder="Enter current password"
                  />
                </div>

                {/* New Password */}
                <div>
                  <label className="mb-2 flex items-center gap-2 text-sm font-medium">
                    <Lock className="h-4 w-4" />
                    New Password (optional)
                  </label>
                  <input
                    type="password"
                    value={newPassword}
                    onChange={(e) => setNewPassword(e.target.value)}
                    className="w-full rounded-lg border border-border bg-secondary/50 px-4 py-2 outline-none transition-colors focus:border-orange-500/50 focus:bg-secondary"
                    placeholder="Enter new password"
                  />
                </div>

                {/* Confirm Password */}
                {newPassword && (
                  <div>
                    <label className="mb-2 flex items-center gap-2 text-sm font-medium">
                      <Lock className="h-4 w-4" />
                      Confirm New Password
                    </label>
                    <input
                      type="password"
                      value={confirmPassword}
                      onChange={(e) => setConfirmPassword(e.target.value)}
                      className="w-full rounded-lg border border-border bg-secondary/50 px-4 py-2 outline-none transition-colors focus:border-orange-500/50 focus:bg-secondary"
                      placeholder="Confirm new password"
                    />
                  </div>
                )}

                {/* Error/Success Messages */}
                {error && (
                  <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    className="rounded-lg bg-red-500/10 p-3 text-sm text-red-500"
                  >
                    {error}
                  </motion.div>
                )}

                {success && (
                  <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    className="rounded-lg bg-green-500/10 p-3 text-sm text-green-500"
                  >
                    {success}
                  </motion.div>
                )}

                {/* Buttons */}
                <div className="flex gap-3 pt-4">
                  <motion.button
                    type="button"
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                    onClick={onClose}
                    className="flex-1 rounded-lg border border-border py-2 hover:bg-secondary"
                    disabled={isLoading}
                  >
                    Cancel
                  </motion.button>
                  <motion.button
                    type="submit"
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                    className="flex flex-1 items-center justify-center gap-2 rounded-lg bg-orange-500 py-2 text-white hover:bg-orange-600"
                    disabled={isLoading}
                  >
                    {isLoading && <Loader className="h-4 w-4 animate-spin" />}
                    Save Changes
                  </motion.button>
                </div>
              </form>
            </motion.div>
          </div>
        </>
      )}
    </AnimatePresence>
  );
}

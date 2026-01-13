import { useState } from 'react';
import { motion } from 'motion/react';
import { Mail, ArrowLeft, Loader, Check } from 'lucide-react';

interface ForgotPasswordProps {
  onNavigate: (page: string) => void;
  onResetPassword: (email: string) => Promise<void>;
}

export function ForgotPassword({ onNavigate, onResetPassword }: ForgotPasswordProps) {
  const [email, setEmail] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');

    if (!email) {
      setError('Please enter your email');
      return;
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      setError('Please enter a valid email');
      return;
    }

    setIsLoading(true);
    try {
      await onResetPassword(email);
      setSuccess(true);
    } catch (err: any) {
      setError(err.message || 'Failed to send reset email');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="flex min-h-screen items-center justify-center bg-background px-4">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="w-full max-w-md"
      >
        <div className="mb-8 text-center">
          <motion.div
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            transition={{ delay: 0.2, type: 'spring' }}
            className="mx-auto mb-4 flex h-16 w-16 items-center justify-center rounded-full bg-gradient-to-br from-orange-500 to-red-600"
          >
            <Mail className="h-8 w-8 text-white" />
          </motion.div>
          <h1 className="mb-2 text-3xl font-bold">Reset Password</h1>
          <p className="text-muted-foreground">
            {success
              ? 'Check your email for reset instructions'
              : 'Enter your email to receive password reset instructions'}
          </p>
        </div>

        {!success ? (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.3 }}
            className="rounded-lg border border-border bg-card p-8"
          >
            <form onSubmit={handleSubmit} className="space-y-6">
              <div>
                <label className="mb-2 block text-sm font-medium">Email</label>
                <div className="relative">
                  <Mail className="absolute left-3 top-1/2 h-5 w-5 -translate-y-1/2 text-muted-foreground" />
                  <input
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="your@email.com"
                    className="w-full rounded-lg border border-border bg-secondary/50 py-3 pl-10 pr-4 outline-none transition-colors focus:border-orange-500/50 focus:bg-secondary"
                  />
                </div>
              </div>

              {error && (
                <motion.div
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  className="rounded-lg bg-red-500/10 p-3 text-sm text-red-500"
                >
                  {error}
                </motion.div>
              )}

              <motion.button
                type="submit"
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                className="flex w-full items-center justify-center gap-2 rounded-lg bg-orange-500 py-3 text-white hover:bg-orange-600"
                disabled={isLoading}
              >
                {isLoading && <Loader className="h-5 w-5 animate-spin" />}
                Send Reset Link
              </motion.button>
            </form>
          </motion.div>
        ) : (
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            className="rounded-lg border border-border bg-card p-8 text-center"
          >
            <div className="mx-auto mb-4 flex h-16 w-16 items-center justify-center rounded-full bg-green-500/10">
              <Check className="h-8 w-8 text-green-500" />
            </div>
            <h2 className="mb-2 text-xl font-bold">Email Sent!</h2>
            <p className="mb-6 text-muted-foreground">
              We've sent password reset instructions to <strong>{email}</strong>
            </p>
            <motion.button
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              onClick={() => onNavigate('signin')}
              className="w-full rounded-lg bg-orange-500 py-3 text-white hover:bg-orange-600"
            >
              Back to Sign In
            </motion.button>
          </motion.div>
        )}

        <motion.button
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.4 }}
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          onClick={() => onNavigate('signin')}
          className="mt-6 flex w-full items-center justify-center gap-2 text-sm text-muted-foreground hover:text-foreground"
        >
          <ArrowLeft className="h-4 w-4" />
          Back to Sign In
        </motion.button>
      </motion.div>
    </div>
  );
}

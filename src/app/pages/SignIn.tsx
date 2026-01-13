import { useState } from 'react';
import { Mail, Lock, Eye, EyeOff } from 'lucide-react';
import { motion } from 'motion/react';

interface SignInProps {
  onSignIn: (email: string, password: string) => void;
  onNavigate: (page: string) => void;
}

export function SignIn({ onSignIn, onNavigate }: SignInProps) {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSignIn(email, password);
  };

  return (
    <div className="flex min-h-screen items-center justify-center p-4">
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
            className="mx-auto mb-4 flex h-16 w-16 items-center justify-center rounded-2xl bg-gradient-to-br from-orange-500 to-red-600"
          >
            <span className="text-2xl">🍊</span>
          </motion.div>
          <h1 className="mb-2">Welcome Back</h1>
          <p className="text-muted-foreground">Sign in to continue your reading journey</p>
        </div>

        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.3 }}
          className="rounded-lg border border-border bg-card p-8 shadow-lg"
        >
          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <label className="mb-2 block">Email</label>
              <div className="relative">
                <Mail className="absolute left-3 top-1/2 h-5 w-5 -translate-y-1/2 text-muted-foreground" />
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="you@example.com"
                  className="w-full rounded-lg border border-border bg-secondary/50 py-3 pl-11 pr-4 outline-none transition-colors focus:border-orange-500/50 focus:bg-secondary"
                  required
                />
              </div>
            </div>

            <div>
              <label className="mb-2 block">Password</label>
              <div className="relative">
                <Lock className="absolute left-3 top-1/2 h-5 w-5 -translate-y-1/2 text-muted-foreground" />
                <input
                  type={showPassword ? 'text' : 'password'}
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="••••••••"
                  className="w-full rounded-lg border border-border bg-secondary/50 py-3 pl-11 pr-11 outline-none transition-colors focus:border-orange-500/50 focus:bg-secondary"
                  required
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground"
                >
                  {showPassword ? <EyeOff className="h-5 w-5" /> : <Eye className="h-5 w-5" />}
                </button>
              </div>
            </div>

            <div className="flex items-center justify-between text-sm">
              <label className="flex items-center gap-2">
                <input type="checkbox" className="rounded border-border" />
                <span className="text-muted-foreground">Remember me</span>
              </label>
              <button 
                type="button" 
                onClick={() => onNavigate('forgot-password')}
                className="text-orange-500 hover:underline"
              >
                Forgot password?
              </button>
            </div>

            <motion.button
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              type="submit"
              className="w-full rounded-lg bg-gradient-to-r from-orange-500 to-red-600 py-3 text-white hover:from-orange-600 hover:to-red-700"
            >
              Sign In
            </motion.button>
          </form>

          <div className="mt-6 text-center text-sm">
            <span className="text-muted-foreground">Don't have an account? </span>
            <button
              onClick={() => onNavigate('signup')}
              className="text-orange-500 hover:underline"
            >
              Sign Up
            </button>
          </div>
        </motion.div>
      </motion.div>
    </div>
  );
}
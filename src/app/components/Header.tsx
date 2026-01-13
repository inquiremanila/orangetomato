import { Book, Search, User, Bookmark, Bell, LogOut, Settings, Heart, Layout } from 'lucide-react';
import { motion } from 'motion/react';
import { ThemeToggle } from './ThemeToggle';

interface HeaderProps {
  currentPage: string;
  onNavigate: (page: string) => void;
  isAuthenticated: boolean;
  onLogout: () => void;
  username?: string;
  unreadNotificationCount?: number;
  theme: 'light' | 'dark';
  onToggleTheme: () => void;
}

export function Header({ currentPage, onNavigate, isAuthenticated, onLogout, username, unreadNotificationCount, theme, onToggleTheme }: HeaderProps) {
  return (
    <motion.header
      initial={{ y: -100 }}
      animate={{ y: 0 }}
      className="sticky top-0 z-50 border-b border-border/40 bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60"
    >
      <div className="container mx-auto px-4 py-4">
        <div className="flex items-center justify-between">
          {/* Logo */}
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={() => onNavigate('home')}
            className="flex items-center gap-2"
          >
            <div className="flex flex-col items-start">
              <span className="bg-gradient-to-r from-orange-500 to-red-600 bg-clip-text text-transparent text-lg sm:text-xl font-semibold">
                Orange Tomato
              </span>
              <span className="text-xs text-muted-foreground">Light Novels</span>
            </div>
          </motion.button>

          {/* Search Bar */}
          {isAuthenticated && (
            <div className="hidden md:flex flex-1 max-w-md mx-8">
              <div className="relative w-full">
                <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
                <input
                  type="text"
                  placeholder="Search light novels..."
                  className="w-full rounded-lg border border-border bg-secondary/50 py-2 pl-10 pr-4 outline-none transition-colors focus:border-orange-500/50 focus:bg-secondary"
                />
              </div>
            </div>
          )}

          {/* Navigation */}
          <nav className="flex items-center gap-2">
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={() => onNavigate('wishlist')}
              className={`flex items-center gap-2 rounded-lg px-3 py-2 transition-colors ${
                currentPage === 'wishlist'
                  ? 'bg-orange-500/10 text-orange-500'
                  : 'hover:bg-secondary'
              }`}
            >
              <Heart className="h-4 w-4" />
              <span className="hidden lg:inline">Wishlist</span>
            </motion.button>
            
            {isAuthenticated ? (
              <>
                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  onClick={() => onNavigate('bookmarks')}
                  className={`flex items-center gap-2 rounded-lg px-4 py-2 transition-colors ${
                    currentPage === 'bookmarks'
                      ? 'bg-orange-500/10 text-orange-500'
                      : 'hover:bg-secondary'
                  }`}
                >
                  <Bookmark className="h-4 w-4" />
                  <span className="hidden sm:inline">Bookmarks</span>
                </motion.button>

                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  onClick={() => onNavigate('notifications')}
                  className={`relative rounded-lg p-2 transition-colors ${
                    currentPage === 'notifications'
                      ? 'bg-orange-500/10 text-orange-500'
                      : 'hover:bg-secondary'
                  }`}
                >
                  <Bell className="h-5 w-5" />
                  {unreadNotificationCount !== undefined && unreadNotificationCount > 0 && (
                    <span className="absolute -right-1 -top-1 flex h-5 w-5 items-center justify-center rounded-full bg-orange-500 text-[10px] font-bold text-white">
                      {unreadNotificationCount > 9 ? '9+' : unreadNotificationCount}
                    </span>
                  )}
                </motion.button>

                <div className="relative group">
                  <motion.button
                    whileHover={{ scale: 1.05 }}
                    className="flex items-center gap-2 rounded-lg p-2 hover:bg-secondary"
                  >
                    <div className="flex h-8 w-8 items-center justify-center rounded-full bg-gradient-to-br from-orange-500 to-red-600">
                      <User className="h-4 w-4 text-white" />
                    </div>
                    <span className="hidden sm:inline">{username}</span>
                  </motion.button>

                  {/* Dropdown */}
                  <motion.div
                    initial={{ opacity: 0, y: -10 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    className="absolute right-0 mt-2 w-48 rounded-lg border border-border bg-popover p-2 shadow-lg opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all"
                  >
                    <button
                      onClick={() => onNavigate('profile')}
                      className="flex w-full items-center gap-2 rounded-lg px-3 py-2 text-left hover:bg-secondary"
                    >
                      <User className="h-4 w-4" />
                      Profile
                    </button>
                    <button
                      onClick={() => onNavigate('settings')}
                      className="flex w-full items-center gap-2 rounded-lg px-3 py-2 text-left hover:bg-secondary"
                    >
                      <Settings className="h-4 w-4" />
                      Settings
                    </button>
                    <button
                      onClick={() => onNavigate('dashboard')}
                      className="flex w-full items-center gap-2 rounded-lg px-3 py-2 text-left hover:bg-secondary"
                    >
                      <Layout className="h-4 w-4" />
                      Dashboard
                    </button>
                    <div className="my-1 h-px bg-border"></div>
                    <button
                      onClick={onLogout}
                      className="flex w-full items-center gap-2 rounded-lg px-3 py-2 text-left text-red-500 hover:bg-secondary"
                    >
                      <LogOut className="h-4 w-4" />
                      Logout
                    </button>
                  </motion.div>
                </div>
              </>
            ) : (
              <>
                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  onClick={() => onNavigate('signin')}
                  className="rounded-lg px-4 py-2 hover:bg-secondary"
                >
                  Sign In
                </motion.button>
                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  onClick={() => onNavigate('signup')}
                  className="rounded-lg bg-gradient-to-r from-orange-500 to-red-600 px-4 py-2 text-white hover:from-orange-600 hover:to-red-700"
                >
                  Sign Up
                </motion.button>
              </>
            )}
            <ThemeToggle theme={theme} onToggleTheme={onToggleTheme} />
          </nav>
        </div>
      </div>
    </motion.header>
  );
}
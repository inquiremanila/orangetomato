import { Sun, Moon } from 'lucide-react';
import { motion } from 'motion/react';

interface ThemeToggleProps {
  theme: 'light' | 'dark';
  onToggleTheme: () => void;
}

export function ThemeToggle({ theme, onToggleTheme }: ThemeToggleProps) {
  return (
    <button
      onClick={onToggleTheme}
      className="relative w-14 h-7 bg-muted rounded-full p-1 transition-colors hover:bg-muted/80"
      aria-label="Toggle theme"
    >
      <motion.div
        className="w-5 h-5 bg-orange-500 rounded-full flex items-center justify-center"
        animate={{ x: theme === 'dark' ? 0 : 24 }}
        transition={{ type: 'spring', stiffness: 500, damping: 30 }}
      >
        {theme === 'dark' ? (
          <Moon className="w-3 h-3 text-white" />
        ) : (
          <Sun className="w-3 h-3 text-white" />
        )}
      </motion.div>
    </button>
  );
}
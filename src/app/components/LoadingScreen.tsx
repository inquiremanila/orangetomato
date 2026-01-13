import Lottie from 'lottie-react';
import { motion } from 'motion/react';

export function LoadingScreen() {
  // Using a simple book/reading animation data
  const bookAnimation = {
    v: '5.7.4',
    fr: 60,
    ip: 0,
    op: 120,
    w: 200,
    h: 200,
    nm: 'Book Animation',
    ddd: 0,
    assets: [],
    layers: [
      {
        ddd: 0,
        ind: 1,
        ty: 4,
        nm: 'Book',
        sr: 1,
        ks: {
          o: { a: 0, k: 100 },
          r: {
            a: 1,
            k: [
              { t: 0, s: [0], e: [10] },
              { t: 30, s: [10], e: [-10] },
              { t: 60, s: [-10], e: [10] },
              { t: 90, s: [10], e: [0] },
              { t: 120, s: [0] },
            ],
          },
          p: { a: 0, k: [100, 100, 0] },
          a: { a: 0, k: [0, 0, 0] },
          s: { a: 0, k: [100, 100, 100] },
        },
        ao: 0,
        shapes: [
          {
            ty: 'gr',
            it: [
              {
                ty: 'rc',
                d: 1,
                s: { a: 0, k: [60, 80] },
                p: { a: 0, k: [0, 0] },
                r: { a: 0, k: 4 },
              },
              {
                ty: 'fl',
                c: { a: 0, k: [1, 0.549, 0.2, 1] },
                o: { a: 0, k: 100 },
              },
              {
                ty: 'tr',
                p: { a: 0, k: [0, 0] },
                a: { a: 0, k: [0, 0] },
                s: { a: 0, k: [100, 100] },
                r: { a: 0, k: 0 },
                o: { a: 0, k: 100 },
              },
            ],
          },
        ],
        ip: 0,
        op: 120,
        st: 0,
      },
    ],
  };

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.5 }}
      className="fixed inset-0 z-50 flex flex-col items-center justify-center bg-gradient-to-br from-background via-background to-orange-950/20"
    >
      <div className="relative">
        {/* Orange glow effect */}
        <div className="absolute inset-0 animate-pulse blur-3xl">
          <div className="h-48 w-48 rounded-full bg-orange-500/30" />
        </div>

        {/* Lottie animation */}
        <div className="relative z-10">
          <Lottie
            animationData={bookAnimation}
            loop={true}
            style={{ width: 200, height: 200 }}
          />
        </div>
      </div>

      {/* Brand name with animation */}
      <motion.div
        initial={{ y: 20, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ delay: 0.2, duration: 0.6 }}
        className="mt-8 text-center"
      >
        <h1 className="mb-2 bg-gradient-to-r from-orange-500 to-red-600 bg-clip-text text-5xl font-bold text-transparent">
          Orange Tomato
        </h1>
        <p className="text-sm text-muted-foreground">Loading your stories...</p>
      </motion.div>

      {/* Loading bar */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.4 }}
        className="mt-12 w-64"
      >
        <div className="h-1 overflow-hidden rounded-full bg-secondary">
          <motion.div
            initial={{ x: '-100%' }}
            animate={{ x: '100%' }}
            transition={{
              repeat: Infinity,
              duration: 1.5,
              ease: 'easeInOut',
            }}
            className="h-full w-1/2 bg-gradient-to-r from-orange-500 to-red-600"
          />
        </div>
      </motion.div>
    </motion.div>
  );
}

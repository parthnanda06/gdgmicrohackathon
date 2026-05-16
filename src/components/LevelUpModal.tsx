import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useApp } from '../AppContext';

export default function LevelUpModal() {
  const { showLevelUp, levelUpLevel, dismissLevelUp } = useApp();

  return (
    <AnimatePresence>
      {showLevelUp && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="levelup-overlay"
          onClick={dismissLevelUp}
        >
          <motion.div
            initial={{ scale: 0.3, rotate: -10 }}
            animate={{ scale: 1, rotate: 0 }}
            exit={{ scale: 0.3, opacity: 0 }}
            transition={{ type: 'spring', stiffness: 260, damping: 20 }}
            onClick={e => e.stopPropagation()}
            style={{
              background: 'linear-gradient(135deg, #151B2E, #1a2240)',
              border: '2px solid rgba(124,92,255,0.6)',
              borderRadius: 24,
              padding: '40px 48px',
              textAlign: 'center',
              position: 'relative',
              overflow: 'hidden',
              boxShadow: '0 0 60px rgba(124,92,255,0.5)',
              maxWidth: 380,
              width: '90%',
            }}
          >
            {/* BG shimmer */}
            <div style={{
              position: 'absolute', inset: 0,
              background: 'radial-gradient(circle at 50% 30%, rgba(124,92,255,0.2) 0%, transparent 60%)',
              pointerEvents: 'none',
            }} />

            {/* Stars */}
            {[...Array(6)].map((_, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, scale: 0 }}
                animate={{ opacity: [0, 1, 0], scale: [0, 1, 0], x: (Math.random() - 0.5) * 200, y: (Math.random() - 0.5) * 200 }}
                transition={{ delay: i * 0.1, duration: 1.5, repeat: Infinity, repeatDelay: 1 }}
                style={{
                  position: 'absolute',
                  top: '50%', left: '50%',
                  width: 8, height: 8,
                  background: 'var(--accent)',
                  borderRadius: '50%',
                  boxShadow: '0 0 10px var(--accent)',
                }}
              />
            ))}

            <motion.div
              animate={{ scale: [1, 1.2, 1] }}
              transition={{ duration: 0.8, repeat: Infinity }}
              style={{ fontSize: 64, marginBottom: 16, position: 'relative', zIndex: 1 }}
            >
              ⚡
            </motion.div>

            <div style={{ position: 'relative', zIndex: 1 }}>
              <p style={{ color: 'var(--accent)', fontSize: 13, fontWeight: 700, letterSpacing: '0.2em', marginBottom: 8 }}>
                LEVEL UP!
              </p>
              <h2 style={{
                fontSize: 56, fontWeight: 900,
                background: 'linear-gradient(135deg, #7C5CFF, #00D9FF)',
                WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent',
                lineHeight: 1, marginBottom: 8,
              }}>
                {levelUpLevel}
              </h2>
              <p style={{ color: 'var(--text)', fontSize: 20, fontWeight: 700, marginBottom: 4 }}>
                You reached Level {levelUpLevel}!
              </p>
              <p style={{ color: 'var(--text-muted)', fontSize: 14, marginBottom: 28 }}>
                Your discipline grows stronger, warrior 🗡️
              </p>

              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={dismissLevelUp}
                style={{
                  padding: '12px 32px',
                  background: 'linear-gradient(135deg, var(--primary), var(--accent))',
                  border: 'none', borderRadius: 12,
                  color: 'white', fontSize: 15, fontWeight: 700,
                  cursor: 'pointer', fontFamily: 'inherit',
                  boxShadow: '0 0 20px rgba(124,92,255,0.4)',
                }}
              >
                Keep Going! 🚀
              </motion.button>
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}

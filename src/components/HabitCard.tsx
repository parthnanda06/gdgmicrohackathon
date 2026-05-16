import React, { useCallback } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useApp } from '../AppContext';
import type { Habit, Difficulty } from '../types';
import { isCompletedToday } from '../data';
import confetti from 'canvas-confetti';

const DIFF_COLORS: Record<Difficulty, string> = {
  Easy: '#00FF88',
  Medium: '#FFB800',
  Hard: '#FF4D6D',
};

interface HabitCardProps {
  habit: Habit;
}

export default function HabitCard({ habit }: HabitCardProps) {
  const { toggleHabit, deleteHabit } = useApp();
  const done = isCompletedToday(habit);

  const handleToggle = useCallback(() => {
    if (!done) {
      confetti({
        particleCount: 60,
        spread: 70,
        origin: { y: 0.7 },
        colors: ['#7C5CFF', '#00D9FF', '#00FF88'],
        gravity: 1.2,
        scalar: 0.8,
      });
    }
    toggleHabit(habit.id);
  }, [done, habit.id, toggleHabit]);

  return (
    <motion.div
      layout
      initial={{ opacity: 0, x: -20 }}
      animate={{ opacity: 1, x: 0 }}
      exit={{ opacity: 0, x: 20 }}
      whileHover={{ scale: 1.01 }}
      style={{
        background: done
          ? 'linear-gradient(135deg, rgba(0,255,136,0.08), rgba(0,217,255,0.05))'
          : 'var(--card)',
        border: done
          ? '1px solid rgba(0,255,136,0.25)'
          : '1px solid var(--border)',
        borderRadius: 14,
        padding: '14px 16px',
        display: 'flex',
        alignItems: 'center',
        gap: 12,
        cursor: 'pointer',
        position: 'relative',
        overflow: 'hidden',
        transition: 'background 0.3s, border-color 0.3s',
      }}
      onClick={handleToggle}
    >
      {/* Done shimmer */}
      {done && (
        <div className="shimmer" style={{ position: 'absolute', inset: 0, pointerEvents: 'none' }} />
      )}

      {/* Icon */}
      <div style={{
        width: 40, height: 40, borderRadius: 10,
        background: done ? 'rgba(0,255,136,0.15)' : 'rgba(124,92,255,0.1)',
        display: 'flex', alignItems: 'center', justifyContent: 'center',
        fontSize: 20, flexShrink: 0,
        border: `1px solid ${done ? 'rgba(0,255,136,0.2)' : 'rgba(124,92,255,0.15)'}`,
      }}>
        {habit.icon || '⭐'}
      </div>

      {/* Info */}
      <div style={{ flex: 1, minWidth: 0 }}>
        <div style={{
          fontWeight: 600, fontSize: 14,
          color: done ? 'rgba(255,255,255,0.5)' : 'var(--text)',
          textDecoration: done ? 'line-through' : 'none',
          whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis',
        }}>
          {habit.name}
        </div>
        <div style={{ display: 'flex', alignItems: 'center', gap: 8, marginTop: 4 }}>
          {/* Difficulty badge */}
          <span style={{
            fontSize: 10, fontWeight: 700, padding: '2px 8px', borderRadius: 20,
            background: `${DIFF_COLORS[habit.difficulty]}20`,
            color: DIFF_COLORS[habit.difficulty],
            border: `1px solid ${DIFF_COLORS[habit.difficulty]}40`,
            letterSpacing: '0.05em',
          }}>
            {habit.difficulty.toUpperCase()}
          </span>

          {/* XP */}
          <span style={{ fontSize: 11, color: '#7C5CFF', fontWeight: 600 }}>
            +{habit.xpReward} XP
          </span>

          {/* Streak */}
          {habit.streak > 0 && (
            <span style={{ fontSize: 11, color: '#FFB800' }}>
              🔥 {habit.streak}d
            </span>
          )}
        </div>
      </div>

      {/* Checkbox */}
      <motion.div
        animate={done ? { scale: [1, 1.3, 1] } : { scale: 1 }}
        transition={{ duration: 0.3 }}
        onClick={e => { e.stopPropagation(); handleToggle(); }}
        style={{
          width: 28, height: 28, borderRadius: 8, flexShrink: 0,
          border: done ? 'none' : '2px solid rgba(124,92,255,0.4)',
          background: done ? 'linear-gradient(135deg, #00FF88, #00D9FF)' : 'transparent',
          display: 'flex', alignItems: 'center', justifyContent: 'center',
          cursor: 'pointer',
          boxShadow: done ? '0 0 12px rgba(0,255,136,0.4)' : 'none',
          transition: 'all 0.3s ease',
        }}
      >
        {done && <span style={{ color: '#0B0F1A', fontSize: 14, fontWeight: 900 }}>✓</span>}
      </motion.div>

      {/* Delete btn */}
      <motion.button
        whileHover={{ scale: 1.2 }}
        whileTap={{ scale: 0.9 }}
        onClick={e => { e.stopPropagation(); deleteHabit(habit.id); }}
        style={{
          background: 'none', border: 'none', cursor: 'pointer',
          color: 'rgba(255,77,109,0.4)', fontSize: 14, padding: 4,
          transition: 'color 0.2s',
          flexShrink: 0,
        }}
        onMouseEnter={e => (e.currentTarget.style.color = '#FF4D6D')}
        onMouseLeave={e => (e.currentTarget.style.color = 'rgba(255,77,109,0.4)')}
      >
        ×
      </motion.button>
    </motion.div>
  );
}

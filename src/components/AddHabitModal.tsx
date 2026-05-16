import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useApp } from '../AppContext';
import type { Difficulty, Frequency } from '../types';
import { XP_TABLE, HABIT_ICONS, DIFFICULTY_OPTIONS, FREQUENCY_OPTIONS } from '../data';

const DIFF_COLORS: Record<Difficulty, string> = {
  Easy: '#00FF88',
  Medium: '#FFB800',
  Hard: '#FF4D6D',
};

interface AddHabitModalProps {
  onClose: () => void;
}

export default function AddHabitModal({ onClose }: AddHabitModalProps) {
  const { addHabit } = useApp();
  const [name, setName] = useState('');
  const [difficulty, setDifficulty] = useState<Difficulty>('Easy');
  const [frequency, setFrequency] = useState<Frequency>('Daily');
  const [icon, setIcon] = useState('⭐');

  const xpReward = XP_TABLE[difficulty];

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!name.trim()) return;
    addHabit({ name: name.trim(), difficulty, frequency, xpReward, icon });
    onClose();
  };

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="modal-backdrop"
      onClick={onClose}
    >
      <motion.div
        initial={{ scale: 0.9, y: 40 }}
        animate={{ scale: 1, y: 0 }}
        exit={{ scale: 0.9, y: 40 }}
        transition={{ type: 'spring', damping: 25 }}
        onClick={e => e.stopPropagation()}
        style={{
          background: '#151B2E',
          border: '1px solid rgba(124,92,255,0.3)',
          borderRadius: 20,
          padding: 28,
          width: '100%', maxWidth: 440,
          boxShadow: '0 0 40px rgba(124,92,255,0.2)',
        }}
      >
        {/* Header */}
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 24 }}>
          <div>
            <h2 style={{ fontSize: 20, fontWeight: 800, marginBottom: 2 }}>New Quest</h2>
            <p style={{ color: 'var(--text-muted)', fontSize: 13 }}>Add a habit to your daily routine</p>
          </div>
          <button
            onClick={onClose}
            style={{
              background: 'rgba(255,255,255,0.05)', border: '1px solid var(--border)',
              borderRadius: 8, width: 32, height: 32,
              color: 'var(--text-muted)', cursor: 'pointer', fontSize: 18,
              display: 'flex', alignItems: 'center', justifyContent: 'center',
            }}
          >×</button>
        </div>

        <form onSubmit={handleSubmit}>
          {/* Habit name */}
          <div style={{ marginBottom: 20 }}>
            <label style={{ fontSize: 13, fontWeight: 600, color: 'var(--text-muted)', marginBottom: 8, display: 'block' }}>
              HABIT NAME
            </label>
            <input
              autoFocus
              className="input-field"
              placeholder="e.g. Morning Meditation..."
              value={name}
              onChange={e => setName(e.target.value)}
            />
          </div>

          {/* Icon picker */}
          <div style={{ marginBottom: 20 }}>
            <label style={{ fontSize: 13, fontWeight: 600, color: 'var(--text-muted)', marginBottom: 8, display: 'block' }}>
              ICON
            </label>
            <div style={{ display: 'flex', flexWrap: 'wrap', gap: 8 }}>
              {HABIT_ICONS.map(i => (
                <button
                  key={i}
                  type="button"
                  onClick={() => setIcon(i)}
                  style={{
                    width: 36, height: 36, borderRadius: 8, fontSize: 18,
                    background: icon === i ? 'rgba(124,92,255,0.2)' : 'rgba(255,255,255,0.04)',
                    border: icon === i ? '2px solid var(--primary)' : '1px solid var(--border)',
                    cursor: 'pointer',
                    transition: 'all 0.2s',
                  }}
                >
                  {i}
                </button>
              ))}
            </div>
          </div>

          {/* Difficulty */}
          <div style={{ marginBottom: 20 }}>
            <label style={{ fontSize: 13, fontWeight: 600, color: 'var(--text-muted)', marginBottom: 8, display: 'block' }}>
              DIFFICULTY
            </label>
            <div style={{ display: 'flex', gap: 8 }}>
              {DIFFICULTY_OPTIONS.map(d => (
                <motion.button
                  key={d}
                  type="button"
                  whileHover={{ scale: 1.04 }}
                  whileTap={{ scale: 0.96 }}
                  onClick={() => setDifficulty(d)}
                  style={{
                    flex: 1, padding: '10px 0', borderRadius: 10,
                    background: difficulty === d ? `${DIFF_COLORS[d]}20` : 'rgba(255,255,255,0.04)',
                    border: difficulty === d ? `2px solid ${DIFF_COLORS[d]}` : '1px solid var(--border)',
                    color: difficulty === d ? DIFF_COLORS[d] : 'var(--text-muted)',
                    cursor: 'pointer', fontFamily: 'inherit',
                    fontSize: 13, fontWeight: 700,
                    transition: 'all 0.2s',
                    boxShadow: difficulty === d ? `0 0 12px ${DIFF_COLORS[d]}40` : 'none',
                  }}
                >
                  {d}
                </motion.button>
              ))}
            </div>
          </div>

          {/* Frequency */}
          <div style={{ marginBottom: 24 }}>
            <label style={{ fontSize: 13, fontWeight: 600, color: 'var(--text-muted)', marginBottom: 8, display: 'block' }}>
              FREQUENCY
            </label>
            <div style={{ display: 'flex', gap: 8 }}>
              {FREQUENCY_OPTIONS.map(f => (
                <button
                  key={f}
                  type="button"
                  onClick={() => setFrequency(f)}
                  style={{
                    flex: 1, padding: '10px 0', borderRadius: 10,
                    background: frequency === f ? 'rgba(0,217,255,0.15)' : 'rgba(255,255,255,0.04)',
                    border: frequency === f ? '2px solid rgba(0,217,255,0.5)' : '1px solid var(--border)',
                    color: frequency === f ? 'var(--accent)' : 'var(--text-muted)',
                    cursor: 'pointer', fontFamily: 'inherit',
                    fontSize: 13, fontWeight: 700,
                    transition: 'all 0.2s',
                  }}
                >
                  {f}
                </button>
              ))}
            </div>
          </div>

          {/* XP Preview */}
          <div style={{
            background: 'linear-gradient(135deg, rgba(124,92,255,0.1), rgba(0,217,255,0.05))',
            border: '1px solid rgba(124,92,255,0.2)',
            borderRadius: 12, padding: '14px 16px',
            display: 'flex', alignItems: 'center', justifyContent: 'space-between',
            marginBottom: 20,
          }}>
            <div>
              <p style={{ fontSize: 12, color: 'var(--text-muted)', marginBottom: 2 }}>XP Reward per completion</p>
              <p style={{ fontSize: 22, fontWeight: 900, color: 'var(--primary)' }}>+{xpReward} XP</p>
            </div>
            <div style={{ fontSize: 32 }}>{icon}</div>
          </div>

          {/* Submit */}
          <motion.button
            type="submit"
            whileHover={{ scale: 1.02, boxShadow: '0 0 30px rgba(124,92,255,0.5)' }}
            whileTap={{ scale: 0.98 }}
            style={{
              width: '100%', padding: '14px',
              background: 'linear-gradient(135deg, var(--primary), #5a3dcc)',
              border: 'none', borderRadius: 12,
              color: 'white', fontSize: 15, fontWeight: 700,
              cursor: 'pointer', fontFamily: 'inherit',
              boxShadow: '0 0 20px rgba(124,92,255,0.3)',
            }}
          >
            ⚡ Add Quest
          </motion.button>
        </form>
      </motion.div>
    </motion.div>
  );
}

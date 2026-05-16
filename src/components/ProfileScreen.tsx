import React from 'react';
import { motion } from 'framer-motion';
import { useApp } from '../AppContext';
import { defaultAchievements } from '../data';

const INVENTORY = [
  { id: 'i1', name: 'Streak Freeze', icon: '🧊', description: 'Protect your streak for 1 day', owned: 2, rarity: 'Rare' },
  { id: 'i2', name: 'XP Boost', icon: '⚡', description: '2x XP for 24 hours', owned: 1, rarity: 'Epic' },
  { id: 'i3', name: 'Warrior Armor', icon: '🛡️', description: 'Cosmetic armor for your avatar', owned: 1, rarity: 'Common' },
  { id: 'i4', name: 'Dark Theme', icon: '🌑', description: 'Unlock midnight theme', owned: 0, rarity: 'Rare' },
];

const AVATAR_STAGES = [
  { level: 1, emoji: '🧑', name: 'Novice' },
  { level: 5, emoji: '⚔️', name: 'Warrior' },
  { level: 10, emoji: '🧙', name: 'Mage' },
  { level: 20, emoji: '🦸', name: 'Hero' },
  { level: 50, emoji: '👑', name: 'Legend' },
];

export default function ProfileScreen() {
  const { user, habits, achievements, logout } = useApp();

  const currentStage = AVATAR_STAGES.filter(s => user.level >= s.level).pop() || AVATAR_STAGES[0];
  const nextStage = AVATAR_STAGES.find(s => s.level > user.level);

  const unlockedAchievements = achievements.filter(a => a.unlocked).length;

  return (
    <div style={{ paddingBottom: 80, minHeight: '100vh', background: 'var(--bg)' }}>
      {/* Header */}
      <div style={{
        padding: '20px 16px',
        background: 'linear-gradient(180deg, rgba(124,92,255,0.08) 0%, transparent 100%)',
        borderBottom: '1px solid var(--border)',
      }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 24 }}>
          <h2 style={{ fontSize: 20, fontWeight: 800 }}>Profile</h2>
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={logout}
            style={{
              padding: '6px 16px', background: 'rgba(255,77,109,0.1)',
              border: '1px solid rgba(255,77,109,0.3)', borderRadius: 8,
              color: '#FF4D6D', fontSize: 12, fontWeight: 700,
              cursor: 'pointer', fontFamily: 'inherit',
            }}
          >
            Sign Out
          </motion.button>
        </div>

        {/* Avatar Evolution */}
        <motion.div
          style={{
            background: 'linear-gradient(135deg, #1a1040 0%, #0f1a2e 100%)',
            border: '1px solid rgba(124,92,255,0.3)',
            borderRadius: 20, padding: '24px',
            textAlign: 'center', position: 'relative', overflow: 'hidden',
            boxShadow: '0 0 30px rgba(124,92,255,0.15)',
          }}
        >
          {/* Rings */}
          {[100, 80, 60].map((size, i) => (
            <motion.div
              key={i}
              animate={{ rotate: i % 2 === 0 ? 360 : -360, scale: [1, 1.02, 1] }}
              transition={{ duration: 8 + i * 2, repeat: Infinity, ease: 'linear' }}
              style={{
                position: 'absolute',
                top: '50%', left: '50%',
                width: size, height: size,
                border: `1px dashed rgba(124,92,255,${0.2 - i * 0.05})`,
                borderRadius: '50%',
                transform: 'translate(-50%, -50%)',
                pointerEvents: 'none',
              }}
            />
          ))}

          {/* Avatar */}
          <motion.div
            animate={{ y: [0, -8, 0] }}
            transition={{ duration: 3, repeat: Infinity, ease: 'easeInOut' }}
            style={{
              width: 90, height: 90, borderRadius: '50%',
              background: 'linear-gradient(135deg, rgba(124,92,255,0.4), rgba(0,217,255,0.3))',
              border: '3px solid rgba(124,92,255,0.6)',
              display: 'flex', alignItems: 'center', justifyContent: 'center',
              fontSize: 44, margin: '0 auto 12px',
              boxShadow: '0 0 30px rgba(124,92,255,0.5)',
              position: 'relative', zIndex: 1,
            }}
          >
            {currentStage.emoji}
          </motion.div>

          <h3 style={{ fontSize: 22, fontWeight: 900, marginBottom: 2 }}>{user.name}</h3>
          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 8, marginBottom: 4 }}>
            <span style={{
              background: 'linear-gradient(135deg, var(--primary), var(--accent))',
              borderRadius: 6, padding: '2px 10px', fontSize: 11, fontWeight: 800, color: 'white',
            }}>LVL {user.level}</span>
            <span style={{ fontSize: 14, color: 'var(--text-muted)' }}>{user.rank}</span>
          </div>
          <p style={{ fontSize: 12, color: 'rgba(124,92,255,0.8)', fontWeight: 600 }}>
            {currentStage.name} Form
          </p>

          {nextStage && (
            <div style={{
              marginTop: 16,
              background: 'rgba(255,255,255,0.04)',
              borderRadius: 10, padding: '10px 14px',
            }}>
              <p style={{ fontSize: 11, color: 'var(--text-muted)' }}>
                Next evolution at <strong style={{ color: 'var(--accent)' }}>Level {nextStage.level}</strong> → {nextStage.emoji} {nextStage.name}
              </p>
            </div>
          )}
        </motion.div>
      </div>

      {/* Stats Cards */}
      <div style={{ padding: '16px' }}>
        <p style={{ fontSize: 13, fontWeight: 700, color: 'var(--text-muted)', marginBottom: 12 }}>
          STATISTICS
        </p>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(2, 1fr)', gap: 10, marginBottom: 24 }}>
          {[
            { label: 'Total XP', value: user.totalXp.toLocaleString(), icon: '⚡', color: 'var(--primary)' },
            { label: 'Habits Done', value: user.habitsCompleted, icon: '✅', color: 'var(--success)' },
            { label: 'Best Streak', value: `${user.longestStreak} days`, icon: '🔥', color: '#FFB800' },
            { label: 'Achievements', value: `${unlockedAchievements}/${achievements.length}`, icon: '🏆', color: 'var(--accent)' },
            { label: 'Current Level', value: user.level, icon: '🎮', color: 'var(--primary)' },
            { label: 'Active Habits', value: habits.length, icon: '📋', color: 'var(--accent)' },
          ].map(s => (
            <motion.div
              key={s.label}
              whileHover={{ scale: 1.02 }}
              style={{
                background: 'var(--card)',
                border: '1px solid var(--border)',
                borderRadius: 14, padding: '16px',
              }}
            >
              <p style={{ fontSize: 22, marginBottom: 6 }}>{s.icon}</p>
              <p style={{ fontSize: 20, fontWeight: 900, color: s.color, marginBottom: 2 }}>{s.value}</p>
              <p style={{ fontSize: 11, color: 'var(--text-muted)' }}>{s.label}</p>
            </motion.div>
          ))}
        </div>

        {/* Avatar Evolution Tracker */}
        <p style={{ fontSize: 13, fontWeight: 700, color: 'var(--text-muted)', marginBottom: 12 }}>
          AVATAR EVOLUTION
        </p>
        <div style={{
          display: 'flex', gap: 8, marginBottom: 24,
          overflowX: 'auto', paddingBottom: 4,
        }} className="scroll-row">
          {AVATAR_STAGES.map((stage, i) => {
            const unlocked = user.level >= stage.level;
            const isCurrent = stage === currentStage;
            return (
              <motion.div
                key={stage.name}
                whileHover={unlocked ? { scale: 1.05 } : {}}
                style={{
                  flexShrink: 0, width: 90,
                  background: isCurrent
                    ? 'linear-gradient(135deg, rgba(124,92,255,0.2), rgba(0,217,255,0.1))'
                    : unlocked ? 'rgba(255,255,255,0.04)' : 'rgba(255,255,255,0.02)',
                  border: isCurrent ? '2px solid rgba(124,92,255,0.5)' :
                    unlocked ? '1px solid rgba(255,255,255,0.1)' : '1px solid var(--border)',
                  borderRadius: 14, padding: '14px 8px', textAlign: 'center',
                  filter: unlocked ? 'none' : 'grayscale(1) brightness(0.4)',
                  boxShadow: isCurrent ? '0 0 15px rgba(124,92,255,0.2)' : 'none',
                }}
              >
                <div style={{ fontSize: 28, marginBottom: 6 }}>{stage.emoji}</div>
                <p style={{ fontSize: 11, fontWeight: 700, marginBottom: 2 }}>{stage.name}</p>
                <p style={{ fontSize: 10, color: 'var(--text-muted)' }}>Lv.{stage.level}</p>
                {isCurrent && (
                  <p style={{ fontSize: 9, color: 'var(--primary)', fontWeight: 700, marginTop: 2 }}>ACTIVE</p>
                )}
              </motion.div>
            );
          })}
        </div>

        {/* Inventory */}
        <p style={{ fontSize: 13, fontWeight: 700, color: 'var(--text-muted)', marginBottom: 12 }}>
          INVENTORY
        </p>
        <div style={{ display: 'flex', flexDirection: 'column', gap: 10, marginBottom: 24 }}>
          {INVENTORY.map(item => (
            <motion.div
              key={item.id}
              whileHover={{ scale: 1.01 }}
              style={{
                background: 'var(--card)',
                border: '1px solid var(--border)',
                borderRadius: 14, padding: '14px 16px',
                display: 'flex', alignItems: 'center', gap: 14,
                opacity: item.owned === 0 ? 0.5 : 1,
              }}
            >
              <div style={{
                width: 46, height: 46, borderRadius: 12,
                background: 'rgba(124,92,255,0.1)', border: '1px solid rgba(124,92,255,0.15)',
                display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 24,
                flexShrink: 0,
              }}>{item.icon}</div>
              <div style={{ flex: 1 }}>
                <p style={{ fontSize: 14, fontWeight: 700, marginBottom: 2 }}>{item.name}</p>
                <p style={{ fontSize: 12, color: 'var(--text-muted)' }}>{item.description}</p>
              </div>
              <div style={{ textAlign: 'right' }}>
                <span style={{
                  fontSize: 10, padding: '2px 8px', borderRadius: 20, fontWeight: 700, display: 'block', marginBottom: 4,
                  background: item.rarity === 'Epic' ? 'rgba(124,92,255,0.15)' : item.rarity === 'Rare' ? 'rgba(0,217,255,0.15)' : 'rgba(255,255,255,0.05)',
                  color: item.rarity === 'Epic' ? '#7C5CFF' : item.rarity === 'Rare' ? '#00D9FF' : 'var(--text-muted)',
                  border: `1px solid ${item.rarity === 'Epic' ? 'rgba(124,92,255,0.3)' : item.rarity === 'Rare' ? 'rgba(0,217,255,0.3)' : 'var(--border)'}`,
                }}>{item.rarity}</span>
                <span style={{
                  fontSize: 12, fontWeight: 700,
                  color: item.owned > 0 ? 'var(--success)' : 'var(--text-muted)',
                }}>
                  {item.owned > 0 ? `×${item.owned}` : 'Locked'}
                </span>
              </div>
            </motion.div>
          ))}
        </div>

        {/* Motivational message */}
        <motion.div
          animate={{ borderColor: ['rgba(124,92,255,0.2)', 'rgba(0,217,255,0.2)', 'rgba(124,92,255,0.2)'] }}
          transition={{ duration: 4, repeat: Infinity }}
          style={{
            background: 'linear-gradient(135deg, rgba(124,92,255,0.08), rgba(0,217,255,0.05))',
            border: '1px solid rgba(124,92,255,0.2)',
            borderRadius: 16, padding: '20px',
            textAlign: 'center',
          }}
        >
          <p style={{ fontSize: 20, marginBottom: 8 }}>💬</p>
          <p style={{ fontSize: 14, fontStyle: 'italic', color: 'var(--text-muted)', lineHeight: 1.6 }}>
            "Every level up begins with a single completed habit. Your discipline is your superpower."
          </p>
        </motion.div>
      </div>
    </div>
  );
}

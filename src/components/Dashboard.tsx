import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useApp } from '../AppContext';
import HabitCard from './HabitCard';
import AddHabitModal from './AddHabitModal';
import { isCompletedToday, bossBattle } from '../data';

export default function Dashboard() {
  const { user, habits, achievements } = useApp();
  const [showAdd, setShowAdd] = useState(false);
  const [activeTab, setActiveTab] = useState<'quests' | 'achievements' | 'boss'>('quests');

  const todayHabits = habits.filter(h => h.frequency === 'Daily' || h.frequency === 'Weekdays');
  const completedToday = todayHabits.filter(isCompletedToday).length;
  const totalToday = todayHabits.length;
  const progressPct = totalToday > 0 ? (completedToday / totalToday) * 100 : 0;
  const xpPct = Math.min((user.xp / user.xpToNextLevel) * 100, 100);

  const bossHpPct = (bossBattle.hpCurrent / bossBattle.hpMax) * 100;

  return (
    <div style={{ paddingBottom: 80, minHeight: '100vh', background: 'var(--bg)' }}>
      {/* Header */}
      <div style={{
        padding: '20px 16px 0',
        background: 'linear-gradient(180deg, rgba(124,92,255,0.08) 0%, transparent 100%)',
        borderBottom: '1px solid var(--border)',
        paddingBottom: 20,
      }}>
        {/* Top row */}
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 20 }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
            {/* Avatar */}
            <motion.div
              whileHover={{ scale: 1.05 }}
              style={{
                width: 48, height: 48, borderRadius: '50%',
                background: 'linear-gradient(135deg, rgba(124,92,255,0.3), rgba(0,217,255,0.2))',
                border: '2px solid rgba(124,92,255,0.5)',
                display: 'flex', alignItems: 'center', justifyContent: 'center',
                fontSize: 24, cursor: 'pointer',
                boxShadow: '0 0 15px rgba(124,92,255,0.3)',
              }}
            >
              {user.avatar}
            </motion.div>
            <div>
              <p style={{ fontSize: 12, color: 'var(--text-muted)', marginBottom: 1 }}>Welcome back,</p>
              <p style={{ fontSize: 16, fontWeight: 700 }}>{user.name}</p>
            </div>
          </div>

          {/* Streak */}
          <motion.div
            animate={{ scale: [1, 1.05, 1] }}
            transition={{ duration: 2, repeat: Infinity }}
            style={{
              background: 'rgba(255,184,0,0.12)',
              border: '1px solid rgba(255,184,0,0.3)',
              borderRadius: 12, padding: '8px 14px',
              display: 'flex', alignItems: 'center', gap: 6,
            }}
          >
            <span className="fire-icon" style={{ fontSize: 20 }}>🔥</span>
            <div>
              <p style={{ fontSize: 18, fontWeight: 900, color: '#FFB800', lineHeight: 1 }}>{user.currentStreak}</p>
              <p style={{ fontSize: 10, color: 'rgba(255,184,0,0.6)' }}>day streak</p>
            </div>
          </motion.div>
        </div>

        {/* Level + XP */}
        <div style={{
          background: 'rgba(124,92,255,0.08)',
          border: '1px solid rgba(124,92,255,0.15)',
          borderRadius: 16, padding: '14px 16px',
        }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: 10 }}>
            <div>
              <div style={{ display: 'flex', alignItems: 'center', gap: 8, marginBottom: 2 }}>
                <span style={{
                  background: 'linear-gradient(135deg, var(--primary), var(--accent))',
                  borderRadius: 6, padding: '2px 10px', fontSize: 11, fontWeight: 800, color: 'white',
                }}>LVL {user.level}</span>
                <span style={{ fontSize: 12, color: 'var(--text-muted)' }}>{user.rank}</span>
              </div>
              <p style={{ fontSize: 11, color: 'var(--text-muted)' }}>
                {user.xp} / {user.xpToNextLevel} XP to Level {user.level + 1}
              </p>
            </div>
            <div style={{ textAlign: 'right' }}>
              <p style={{ fontSize: 11, color: 'var(--text-muted)' }}>Total XP</p>
              <p style={{ fontSize: 16, fontWeight: 800, color: 'var(--primary)' }}>{user.totalXp.toLocaleString()}</p>
            </div>
          </div>

          {/* XP Bar */}
          <div className="xp-track">
            <motion.div
              className="progress-bar-fill"
              initial={{ width: 0 }}
              animate={{ width: `${xpPct}%` }}
              transition={{ duration: 1, ease: 'easeOut' }}
              style={{ height: '100%', borderRadius: 100 }}
            />
          </div>
        </div>
      </div>

      {/* Character Card */}
      <div style={{ padding: '16px 16px 0' }}>
        <motion.div
          whileHover={{ scale: 1.01 }}
          style={{
            background: 'linear-gradient(135deg, #1a1040 0%, #0f1a2e 50%, #0B1529 100%)',
            border: '1px solid rgba(124,92,255,0.3)',
            borderRadius: 20, padding: '20px',
            position: 'relative', overflow: 'hidden',
            boxShadow: '0 0 30px rgba(124,92,255,0.15)',
          }}
        >
          {/* BG radial */}
          <div style={{
            position: 'absolute', top: -30, right: -30,
            width: 180, height: 180,
            background: 'radial-gradient(circle, rgba(0,217,255,0.12) 0%, transparent 70%)',
            pointerEvents: 'none',
          }} />
          <div style={{
            position: 'absolute', bottom: -20, left: -20,
            width: 140, height: 140,
            background: 'radial-gradient(circle, rgba(124,92,255,0.15) 0%, transparent 70%)',
            pointerEvents: 'none',
          }} />

          <div style={{ display: 'flex', alignItems: 'center', gap: 16, position: 'relative', zIndex: 1 }}>
            {/* Big animated avatar */}
            <motion.div
              animate={{ y: [0, -8, 0] }}
              transition={{ duration: 2.5, repeat: Infinity, ease: 'easeInOut' }}
              style={{
                width: 72, height: 72, borderRadius: '50%',
                background: 'linear-gradient(135deg, rgba(124,92,255,0.4), rgba(0,217,255,0.3))',
                border: '2px solid rgba(124,92,255,0.6)',
                display: 'flex', alignItems: 'center', justifyContent: 'center',
                fontSize: 38,
                boxShadow: '0 0 25px rgba(124,92,255,0.4)',
                flexShrink: 0,
              }}
            >
              ⚔️
            </motion.div>

            <div style={{ flex: 1 }}>
              <p style={{ fontSize: 11, color: 'var(--accent)', fontWeight: 700, letterSpacing: '0.15em', marginBottom: 4 }}>
                CURRENT RANK
              </p>
              <h2 style={{
                fontSize: 22, fontWeight: 900,
                background: 'linear-gradient(135deg, #fff 30%, #7C5CFF)',
                WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent',
                marginBottom: 4,
              }}>
                {user.rank}
              </h2>
              <div style={{ display: 'flex', gap: 8 }}>
                <span style={{ fontSize: 12, color: 'var(--text-muted)' }}>
                  🏆 {user.habitsCompleted} completed
                </span>
                <span style={{ fontSize: 12, color: 'var(--text-muted)' }}>
                  ⚡ {user.totalXp.toLocaleString()} XP
                </span>
              </div>
            </div>
          </div>

          {/* Daily progress */}
          <div style={{ marginTop: 16, position: 'relative', zIndex: 1 }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: 6 }}>
              <span style={{ fontSize: 12, color: 'var(--text-muted)' }}>Daily Progress</span>
              <span style={{ fontSize: 12, fontWeight: 700, color: progressPct === 100 ? 'var(--success)' : 'var(--text)' }}>
                {completedToday}/{totalToday}
              </span>
            </div>
            <div style={{ background: 'rgba(255,255,255,0.06)', borderRadius: 100, height: 6, overflow: 'hidden' }}>
              <motion.div
                initial={{ width: 0 }}
                animate={{ width: `${progressPct}%` }}
                transition={{ duration: 1, ease: 'easeOut', delay: 0.2 }}
                style={{
                  height: '100%', borderRadius: 100,
                  background: progressPct === 100
                    ? 'linear-gradient(90deg, var(--success), #00D9FF)'
                    : 'linear-gradient(90deg, var(--primary), var(--accent))',
                  boxShadow: `0 0 8px ${progressPct === 100 ? 'rgba(0,255,136,0.5)' : 'rgba(124,92,255,0.5)'}`,
                }}
              />
            </div>
          </div>
        </motion.div>
      </div>

      {/* Tabs */}
      <div style={{ padding: '16px 16px 0' }}>
        <div style={{
          display: 'flex', gap: 4,
          background: 'rgba(255,255,255,0.04)',
          borderRadius: 12, padding: 4,
          marginBottom: 16,
        }}>
          {[
            { id: 'quests', label: '⚔️ Quests' },
            { id: 'achievements', label: '🏆 Badges' },
            { id: 'boss', label: '💀 Boss' },
          ].map(tab => (
            <motion.button
              key={tab.id}
              whileTap={{ scale: 0.97 }}
              onClick={() => setActiveTab(tab.id as any)}
              style={{
                flex: 1, padding: '8px 0',
                background: activeTab === tab.id
                  ? 'linear-gradient(135deg, rgba(124,92,255,0.3), rgba(0,217,255,0.15))'
                  : 'transparent',
                border: activeTab === tab.id ? '1px solid rgba(124,92,255,0.3)' : '1px solid transparent',
                borderRadius: 8, cursor: 'pointer',
                fontFamily: 'inherit', fontSize: 12, fontWeight: 600,
                color: activeTab === tab.id ? 'white' : 'var(--text-muted)',
                transition: 'all 0.2s',
              }}
            >
              {tab.label}
            </motion.button>
          ))}
        </div>

        <AnimatePresence mode="wait">
          {activeTab === 'quests' && (
            <motion.div
              key="quests"
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: 20 }}
              transition={{ duration: 0.2 }}
            >
              {/* Stats row */}
              <div style={{ display: 'flex', gap: 8, marginBottom: 16 }}>
                {[
                  { label: 'Completed', value: user.habitsCompleted, icon: '✅' },
                  { label: 'Best Streak', value: `${user.longestStreak}d`, icon: '🔥' },
                  { label: 'Total XP', value: user.totalXp.toLocaleString(), icon: '⚡' },
                ].map(s => (
                  <div key={s.label} style={{
                    flex: 1, background: 'var(--card)',
                    border: '1px solid var(--border)', borderRadius: 12,
                    padding: '12px 10px', textAlign: 'center',
                  }}>
                    <p style={{ fontSize: 18, marginBottom: 2 }}>{s.icon}</p>
                    <p style={{ fontSize: 14, fontWeight: 800, color: 'var(--text)' }}>{s.value}</p>
                    <p style={{ fontSize: 10, color: 'var(--text-muted)' }}>{s.label}</p>
                  </div>
                ))}
              </div>

              {/* Habit list */}
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 12 }}>
                <p style={{ fontSize: 13, fontWeight: 700, color: 'var(--text-muted)' }}>DAILY QUESTS</p>
                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  onClick={() => setShowAdd(true)}
                  style={{
                    padding: '6px 14px',
                    background: 'linear-gradient(135deg, var(--primary), #5a3dcc)',
                    border: 'none', borderRadius: 8,
                    color: 'white', fontSize: 12, fontWeight: 700,
                    cursor: 'pointer', fontFamily: 'inherit',
                    boxShadow: '0 0 12px rgba(124,92,255,0.3)',
                  }}
                >
                  + Add Quest
                </motion.button>
              </div>

              {habits.length === 0 ? (
                <div style={{
                  textAlign: 'center', padding: '48px 20px',
                  background: 'var(--card)', borderRadius: 14,
                  border: '1px dashed rgba(124,92,255,0.2)',
                }}>
                  <p style={{ fontSize: 32, marginBottom: 12 }}>⚔️</p>
                  <p style={{ fontWeight: 700, marginBottom: 8 }}>No quests yet!</p>
                  <p style={{ color: 'var(--text-muted)', fontSize: 14 }}>Add your first habit to begin your journey</p>
                </div>
              ) : (
                <AnimatePresence>
                  <div style={{ display: 'flex', flexDirection: 'column', gap: 8 }}>
                    {habits.map(h => <HabitCard key={h.id} habit={h} />)}
                  </div>
                </AnimatePresence>
              )}
            </motion.div>
          )}

          {activeTab === 'achievements' && (
            <motion.div
              key="achievements"
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: 20 }}
              transition={{ duration: 0.2 }}
            >
              <p style={{ fontSize: 13, fontWeight: 700, color: 'var(--text-muted)', marginBottom: 12 }}>
                ACHIEVEMENT BADGES
              </p>
              <div style={{
                display: 'grid', gridTemplateColumns: 'repeat(2, 1fr)', gap: 10,
              }}>
                {achievements.map(a => (
                  <motion.div
                    key={a.id}
                    whileHover={a.unlocked ? { scale: 1.03 } : {}}
                    style={{
                      background: a.unlocked
                        ? 'linear-gradient(135deg, rgba(124,92,255,0.12), rgba(0,217,255,0.06))'
                        : 'var(--card)',
                      border: a.unlocked ? '1px solid rgba(124,92,255,0.3)' : '1px solid var(--border)',
                      borderRadius: 14, padding: '16px 12px',
                      textAlign: 'center',
                      filter: a.unlocked ? 'none' : 'grayscale(1) brightness(0.5)',
                      transition: 'all 0.3s',
                      position: 'relative', overflow: 'hidden',
                    }}
                  >
                    {a.unlocked && (
                      <div className="shimmer" style={{ position: 'absolute', inset: 0, pointerEvents: 'none' }} />
                    )}
                    <div style={{ fontSize: 32, marginBottom: 8 }}>{a.icon}</div>
                    <p style={{ fontSize: 12, fontWeight: 700, marginBottom: 4 }}>{a.name}</p>
                    <p style={{ fontSize: 10, color: 'var(--text-muted)', marginBottom: 8 }}>{a.description}</p>
                    <div style={{ display: 'flex', justifyContent: 'center', gap: 6 }}>
                      <span style={{
                        fontSize: 10, padding: '2px 8px', borderRadius: 20, fontWeight: 700,
                        background: a.rarity === 'Legendary' ? 'rgba(255,184,0,0.15)' :
                          a.rarity === 'Epic' ? 'rgba(124,92,255,0.15)' :
                          a.rarity === 'Rare' ? 'rgba(0,217,255,0.15)' : 'rgba(255,255,255,0.05)',
                        color: a.rarity === 'Legendary' ? '#FFB800' :
                          a.rarity === 'Epic' ? '#7C5CFF' :
                          a.rarity === 'Rare' ? '#00D9FF' : 'var(--text-muted)',
                        border: `1px solid ${a.rarity === 'Legendary' ? 'rgba(255,184,0,0.3)' :
                          a.rarity === 'Epic' ? 'rgba(124,92,255,0.3)' :
                          a.rarity === 'Rare' ? 'rgba(0,217,255,0.3)' : 'var(--border)'}`,
                      }}>
                        {a.rarity}
                      </span>
                      {a.unlocked && (
                        <span style={{ fontSize: 10, color: 'var(--primary)', fontWeight: 600 }}>
                          +{a.xpReward} XP
                        </span>
                      )}
                    </div>
                    {!a.unlocked && (
                      <div style={{
                        position: 'absolute', top: 8, right: 8,
                        fontSize: 14, color: 'rgba(255,255,255,0.2)',
                      }}>🔒</div>
                    )}
                  </motion.div>
                ))}
              </div>
            </motion.div>
          )}

          {activeTab === 'boss' && (
            <motion.div
              key="boss"
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: 20 }}
              transition={{ duration: 0.2 }}
            >
              <BossBattleCard />
            </motion.div>
          )}
        </AnimatePresence>
      </div>

      {/* Add Habit Modal */}
      <AnimatePresence>
        {showAdd && <AddHabitModal onClose={() => setShowAdd(false)} />}
      </AnimatePresence>
    </div>
  );
}

function BossBattleCard() {
  const bossHpPct = (bossBattle.hpCurrent / bossBattle.hpMax) * 100;
  const daysLeft = Math.ceil((new Date(bossBattle.expiresAt).getTime() - Date.now()) / 86400000);

  return (
    <div>
      <p style={{ fontSize: 13, fontWeight: 700, color: 'var(--text-muted)', marginBottom: 12 }}>
        WEEKLY BOSS BATTLE
      </p>
      <motion.div
        style={{
          background: 'linear-gradient(135deg, rgba(255,77,109,0.1), rgba(124,92,255,0.1))',
          border: '1px solid rgba(255,77,109,0.3)',
          borderRadius: 20, padding: 20,
          position: 'relative', overflow: 'hidden',
        }}
        animate={{ boxShadow: ['0 0 20px rgba(255,77,109,0.2)', '0 0 40px rgba(255,77,109,0.4)', '0 0 20px rgba(255,77,109,0.2)'] }}
        transition={{ duration: 2, repeat: Infinity }}
      >
        <div style={{
          position: 'absolute', top: -20, right: -20,
          width: 120, height: 120,
          background: 'radial-gradient(circle, rgba(255,77,109,0.15) 0%, transparent 70%)',
        }} />

        {/* Boss info */}
        <div style={{ display: 'flex', alignItems: 'center', gap: 16, marginBottom: 20 }}>
          <motion.div
            animate={{ rotate: [0, -5, 5, -5, 0], scale: [1, 1.05, 1] }}
            transition={{ duration: 3, repeat: Infinity }}
            style={{ fontSize: 56 }}
          >
            🐉
          </motion.div>
          <div>
            <h3 style={{ fontSize: 18, fontWeight: 900, marginBottom: 4 }}>{bossBattle.name}</h3>
            <p style={{ fontSize: 12, color: 'var(--text-muted)', marginBottom: 6 }}>{bossBattle.description}</p>
            <span style={{
              fontSize: 11, padding: '2px 10px', borderRadius: 20,
              background: 'rgba(255,77,109,0.15)', color: '#FF4D6D',
              border: '1px solid rgba(255,77,109,0.3)', fontWeight: 700,
            }}>
              ⏳ {daysLeft} days left
            </span>
          </div>
        </div>

        {/* HP Bar */}
        <div style={{ marginBottom: 16 }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: 6 }}>
            <span style={{ fontSize: 12, color: '#FF4D6D', fontWeight: 700 }}>BOSS HP</span>
            <span style={{ fontSize: 12, color: 'var(--text-muted)' }}>{bossBattle.hpCurrent} / {bossBattle.hpMax}</span>
          </div>
          <div style={{ background: 'rgba(255,255,255,0.06)', borderRadius: 100, height: 10, overflow: 'hidden' }}>
            <motion.div
              initial={{ width: '100%' }}
              animate={{ width: `${bossHpPct}%` }}
              transition={{ duration: 1.5, ease: 'easeOut' }}
              style={{
                height: '100%', borderRadius: 100,
                background: 'linear-gradient(90deg, #FF4D6D, #FFB800)',
                boxShadow: '0 0 10px rgba(255,77,109,0.5)',
              }}
            />
          </div>
        </div>

        {/* Reward */}
        <div style={{
          background: 'rgba(255,184,0,0.08)',
          border: '1px solid rgba(255,184,0,0.2)',
          borderRadius: 12, padding: '12px 16px',
          display: 'flex', justifyContent: 'space-between', alignItems: 'center',
          marginBottom: 16,
        }}>
          <div>
            <p style={{ fontSize: 11, color: 'var(--text-muted)', marginBottom: 2 }}>Victory Reward</p>
            <p style={{ fontSize: 14, fontWeight: 700, color: '#FFB800' }}>🏅 {bossBattle.reward}</p>
          </div>
          <p style={{ fontSize: 18, fontWeight: 900, color: 'var(--primary)' }}>+{bossBattle.rewardXp} XP</p>
        </div>

        <p style={{ fontSize: 12, color: 'var(--text-muted)', textAlign: 'center' }}>
          Complete daily habits to damage the boss! Each habit deals damage based on difficulty.
        </p>
      </motion.div>
    </div>
  );
}

import React from 'react';
import { motion } from 'framer-motion';
import { useApp } from '../AppContext';

const NAV_ITEMS = [
  { id: 'dashboard', icon: '⚔️', label: 'Quests' },
  { id: 'profile', icon: '👤', label: 'Profile' },
];

export default function BottomNav() {
  const { screen, setScreen } = useApp();

  return (
    <nav className="bottom-nav">
      <div style={{
        display: 'flex', justifyContent: 'center', gap: 0,
        maxWidth: 320, margin: '0 auto',
      }}>
        {NAV_ITEMS.map(item => {
          const active = screen === item.id;
          return (
            <motion.button
              key={item.id}
              whileTap={{ scale: 0.9 }}
              onClick={() => setScreen(item.id as any)}
              style={{
                flex: 1, padding: '4px 0',
                background: 'none', border: 'none',
                cursor: 'pointer', fontFamily: 'inherit',
                display: 'flex', flexDirection: 'column',
                alignItems: 'center', gap: 2,
              }}
            >
              <motion.div
                animate={active ? { scale: [1, 1.2, 1] } : { scale: 1 }}
                transition={{ duration: 0.3 }}
                style={{
                  width: 40, height: 36, borderRadius: 10,
                  background: active ? 'rgba(124,92,255,0.15)' : 'transparent',
                  display: 'flex', alignItems: 'center', justifyContent: 'center',
                  fontSize: 20,
                  transition: 'background 0.2s',
                }}
              >
                {item.icon}
              </motion.div>
              <span style={{
                fontSize: 10, fontWeight: active ? 700 : 500,
                color: active ? 'var(--primary)' : 'var(--text-muted)',
                transition: 'color 0.2s',
              }}>
                {item.label}
              </span>
              {active && (
                <motion.div
                  layoutId="nav-dot"
                  style={{
                    width: 4, height: 4, borderRadius: '50%',
                    background: 'var(--primary)',
                    boxShadow: '0 0 8px var(--primary)',
                  }}
                />
              )}
            </motion.button>
          );
        })}
      </div>
    </nav>
  );
}

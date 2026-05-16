import React from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import { AppProvider, useApp } from './AppContext';
import LoginScreen from './components/LoginScreen';
import Dashboard from './components/Dashboard';
import ProfileScreen from './components/ProfileScreen';
import BottomNav from './components/BottomNav';
import LevelUpModal from './components/LevelUpModal';

const pageVariants = {
  initial: { opacity: 0, x: 30 },
  animate: { opacity: 1, x: 0 },
  exit: { opacity: 0, x: -30 },
};

function AppInner() {
  const { screen } = useApp();

  if (screen === 'login') {
    return (
      <AnimatePresence mode="wait">
        <motion.div key="login" {...pageVariants} transition={{ duration: 0.3 }}>
          <LoginScreen />
        </motion.div>
      </AnimatePresence>
    );
  }

  return (
    <div style={{ position: 'relative', minHeight: '100vh', background: 'var(--bg)' }}>
      <AnimatePresence mode="wait">
        {screen === 'dashboard' && (
          <motion.div key="dashboard" {...pageVariants} transition={{ duration: 0.25 }}>
            <Dashboard />
          </motion.div>
        )}
        {screen === 'profile' && (
          <motion.div key="profile" {...pageVariants} transition={{ duration: 0.25 }}>
            <ProfileScreen />
          </motion.div>
        )}
      </AnimatePresence>
      <BottomNav />
      <LevelUpModal />
    </div>
  );
}

export default function App() {
  return (
    <AppProvider>
      <AppInner />
    </AppProvider>
  );
}

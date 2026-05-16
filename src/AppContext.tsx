import React, { createContext, useContext, useState, useCallback, ReactNode } from 'react';
import type { User, Habit, Achievement, Screen } from './types';
import { defaultUser, defaultHabits, defaultAchievements, XP_TABLE, getXpForLevel, getRank, getTodayString } from './data';

interface AppState {
  user: User;
  habits: Habit[];
  achievements: Achievement[];
  screen: Screen;
  showLevelUp: boolean;
  levelUpLevel: number;
  totalXpEarned: number;
}

interface AppContextType extends AppState {
  setScreen: (s: Screen) => void;
  login: (name: string) => void;
  logout: () => void;
  toggleHabit: (id: string) => void;
  addHabit: (habit: Omit<Habit, 'id' | 'completedDates' | 'streak' | 'createdAt'>) => void;
  deleteHabit: (id: string) => void;
  dismissLevelUp: () => void;
}

const AppContext = createContext<AppContextType | null>(null);

export function AppProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<User>(defaultUser);
  const [habits, setHabits] = useState<Habit[]>(defaultHabits);
  const [achievements, setAchievements] = useState<Achievement[]>(defaultAchievements);
  const [screen, setScreen] = useState<Screen>('login');
  const [showLevelUp, setShowLevelUp] = useState(false);
  const [levelUpLevel, setLevelUpLevel] = useState(1);
  const [totalXpEarned, setTotalXpEarned] = useState(0);

  const login = useCallback((name: string) => {
    setUser(u => ({ ...u, name }));
    setScreen('dashboard');
  }, []);

  const logout = useCallback(() => {
    setScreen('login');
  }, []);

  const dismissLevelUp = useCallback(() => setShowLevelUp(false), []);

  const toggleHabit = useCallback((id: string) => {
    const today = getTodayString();
    setHabits(prev => prev.map(h => {
      if (h.id !== id) return h;
      const done = h.completedDates.includes(today);
      if (done) {
        // Uncomplete
        const newDates = h.completedDates.filter(d => d !== today);
        return { ...h, completedDates: newDates, streak: Math.max(0, h.streak - 1) };
      } else {
        // Complete
        const newDates = [...h.completedDates, today];
        const xpGain = XP_TABLE[h.difficulty];
        setTotalXpEarned(t => t + xpGain);
        setUser(u => {
          let newXp = u.xp + xpGain;
          let newLevel = u.level;
          let newTotal = u.totalXp + xpGain;
          let didLevelUp = false;
          while (newXp >= getXpForLevel(newLevel)) {
            newXp -= getXpForLevel(newLevel);
            newLevel += 1;
            didLevelUp = true;
          }
          if (didLevelUp) {
            setLevelUpLevel(newLevel);
            setShowLevelUp(true);
          }
          return {
            ...u,
            xp: newXp,
            xpToNextLevel: getXpForLevel(newLevel),
            level: newLevel,
            totalXp: newTotal,
            rank: getRank(newLevel),
            habitsCompleted: u.habitsCompleted + 1,
          };
        });
        // Check achievements
        setAchievements(prev => prev.map(a => {
          if (a.unlocked) return a;
          if (a.id === 'a1') return { ...a, unlocked: true, unlockedAt: today };
          return a;
        }));
        return { ...h, completedDates: newDates, streak: h.streak + 1 };
      }
    }));
  }, []);

  const addHabit = useCallback((habit: Omit<Habit, 'id' | 'completedDates' | 'streak' | 'createdAt'>) => {
    const newHabit: Habit = {
      ...habit,
      id: 'h' + Date.now(),
      completedDates: [],
      streak: 0,
      createdAt: getTodayString(),
    };
    setHabits(prev => [...prev, newHabit]);
  }, []);

  const deleteHabit = useCallback((id: string) => {
    setHabits(prev => prev.filter(h => h.id !== id));
  }, []);

  return (
    <AppContext.Provider value={{
      user, habits, achievements, screen, showLevelUp, levelUpLevel, totalXpEarned,
      setScreen, login, logout, toggleHabit, addHabit, deleteHabit, dismissLevelUp,
    }}>
      {children}
    </AppContext.Provider>
  );
}

export function useApp() {
  const ctx = useContext(AppContext);
  if (!ctx) throw new Error('useApp must be used within AppProvider');
  return ctx;
}

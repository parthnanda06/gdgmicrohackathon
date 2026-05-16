import type { Habit, User, Achievement, BossBattle, Difficulty, Frequency } from './types';

const today = new Date().toISOString().split('T')[0];
const yesterday = new Date(Date.now() - 86400000).toISOString().split('T')[0];
const twoDaysAgo = new Date(Date.now() - 172800000).toISOString().split('T')[0];

export const XP_TABLE: Record<Difficulty, number> = {
  Easy: 25,
  Medium: 50,
  Hard: 100,
};

export const RANKS = [
  { level: 1, name: 'Rookie Wanderer', min: 0 },
  { level: 5, name: 'Iron Apprentice', min: 500 },
  { level: 10, name: 'Silver Scout', min: 1500 },
  { level: 15, name: 'Focus Warrior', min: 3000 },
  { level: 20, name: 'Discipline Knight', min: 5000 },
  { level: 30, name: 'Shadow Hunter', min: 9000 },
  { level: 40, name: 'Arcane Sage', min: 15000 },
  { level: 50, name: 'Legend', min: 25000 },
];

export function getRank(level: number): string {
  let rank = RANKS[0].name;
  for (const r of RANKS) {
    if (level >= r.level) rank = r.name;
  }
  return rank;
}

export function getXpForLevel(level: number): number {
  return Math.floor(100 * Math.pow(1.5, level - 1));
}

export const defaultUser: User = {
  id: '1',
  name: 'Hero',
  email: 'hero@leveluplife.app',
  avatar: '⚔️',
  level: 7,
  xp: 340,
  xpToNextLevel: getXpForLevel(7),
  totalXp: 2840,
  longestStreak: 14,
  currentStreak: 5,
  habitsCompleted: 87,
  rank: 'Focus Warrior',
  joinedAt: '2026-01-01',
};

export const defaultHabits: Habit[] = [
  {
    id: 'h1',
    name: 'Morning Meditation',
    difficulty: 'Easy',
    frequency: 'Daily',
    xpReward: 25,
    completedDates: [today, yesterday, twoDaysAgo],
    streak: 5,
    createdAt: '2026-04-01',
    icon: '🧘',
  },
  {
    id: 'h2',
    name: 'Workout Session',
    difficulty: 'Hard',
    frequency: 'Daily',
    xpReward: 100,
    completedDates: [yesterday, twoDaysAgo],
    streak: 3,
    createdAt: '2026-04-01',
    icon: '💪',
  },
  {
    id: 'h3',
    name: 'Read 20 Pages',
    difficulty: 'Medium',
    frequency: 'Daily',
    xpReward: 50,
    completedDates: [today, yesterday],
    streak: 7,
    createdAt: '2026-04-05',
    icon: '📚',
  },
  {
    id: 'h4',
    name: 'Drink 2L Water',
    difficulty: 'Easy',
    frequency: 'Daily',
    xpReward: 25,
    completedDates: [today],
    streak: 12,
    createdAt: '2026-03-15',
    icon: '💧',
  },
  {
    id: 'h5',
    name: 'No Social Media',
    difficulty: 'Hard',
    frequency: 'Daily',
    xpReward: 100,
    completedDates: [twoDaysAgo],
    streak: 1,
    createdAt: '2026-05-01',
    icon: '🚫',
  },
];

export const defaultAchievements: Achievement[] = [
  {
    id: 'a1', name: 'First Step', description: 'Complete your first habit',
    icon: '👣', unlocked: true, unlockedAt: '2026-04-01', xpReward: 50, rarity: 'Common',
  },
  {
    id: 'a2', name: 'On Fire', description: 'Maintain a 7-day streak',
    icon: '🔥', unlocked: true, unlockedAt: '2026-04-08', xpReward: 100, rarity: 'Rare',
  },
  {
    id: 'a3', name: 'Century Club', description: 'Complete 100 habits total',
    icon: '💯', unlocked: false, xpReward: 250, rarity: 'Epic',
  },
  {
    id: 'a4', name: 'Iron Will', description: 'Maintain a 30-day streak',
    icon: '🏆', unlocked: false, xpReward: 500, rarity: 'Legendary',
  },
  {
    id: 'a5', name: 'Level Up!', description: 'Reach Level 10',
    icon: '⬆️', unlocked: false, xpReward: 200, rarity: 'Rare',
  },
  {
    id: 'a6', name: 'Scholar', description: 'Read for 30 days straight',
    icon: '📖', unlocked: false, xpReward: 300, rarity: 'Epic',
  },
  {
    id: 'a7', name: 'Early Bird', description: 'Meditate 5 mornings in a row',
    icon: '🌅', unlocked: true, unlockedAt: '2026-05-10', xpReward: 75, rarity: 'Common',
  },
  {
    id: 'a8', name: 'Legend Status', description: 'Reach Level 50',
    icon: '👑', unlocked: false, xpReward: 1000, rarity: 'Legendary',
  },
];

export const bossBattle: BossBattle = {
  id: 'b1',
  name: 'The Procrastination Hydra',
  description: 'A vile beast that feeds on your delay. Strike it down with discipline!',
  hpMax: 1000,
  hpCurrent: 620,
  reward: 'Shadow Hunter Badge',
  rewardXp: 500,
  expiresAt: new Date(Date.now() + 3 * 86400000).toISOString(),
};

export const HABIT_ICONS = ['🧘', '💪', '📚', '💧', '🍎', '🚶', '✍️', '🧠', '😴', '🎯', '🎨', '🎵', '💻', '🌿', '🚫'];

export const FREQUENCY_OPTIONS: Frequency[] = ['Daily', 'Weekdays', 'Weekly'];
export const DIFFICULTY_OPTIONS: Difficulty[] = ['Easy', 'Medium', 'Hard'];

export function isCompletedToday(habit: Habit): boolean {
  return habit.completedDates.includes(today);
}

export function getTodayString(): string {
  return today;
}

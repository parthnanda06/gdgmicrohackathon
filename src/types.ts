export type Difficulty = 'Easy' | 'Medium' | 'Hard';
export type Frequency = 'Daily' | 'Weekdays' | 'Weekly';

export interface Habit {
  id: string;
  name: string;
  difficulty: Difficulty;
  frequency: Frequency;
  xpReward: number;
  completedDates: string[];
  streak: number;
  createdAt: string;
  icon?: string;
}

export interface Achievement {
  id: string;
  name: string;
  description: string;
  icon: string;
  unlocked: boolean;
  unlockedAt?: string;
  xpReward: number;
  rarity: 'Common' | 'Rare' | 'Epic' | 'Legendary';
}

export interface User {
  id: string;
  name: string;
  email: string;
  avatar: string;
  level: number;
  xp: number;
  xpToNextLevel: number;
  totalXp: number;
  longestStreak: number;
  currentStreak: number;
  habitsCompleted: number;
  rank: string;
  joinedAt: string;
}

export interface BossBattle {
  id: string;
  name: string;
  description: string;
  hpMax: number;
  hpCurrent: number;
  reward: string;
  rewardXp: number;
  expiresAt: string;
}

export type Screen = 'login' | 'dashboard' | 'profile' | 'add-habit';

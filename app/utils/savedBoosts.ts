export interface SavedBoost {
  id: string;
  text: string;
  mood: string;
  scenario: string;
  timestamp: number;
}

const STORAGE_KEY = 'viba_saved_boosts';

export function getSavedBoosts(): SavedBoost[] {
  if (typeof window === 'undefined') return [];
  
  const saved = localStorage.getItem(STORAGE_KEY);
  if (!saved) return [];
  
  try {
    return JSON.parse(saved);
  } catch {
    return [];
  }
}

export function saveBoost(boost: Omit<SavedBoost, 'id' | 'timestamp'>): SavedBoost | null {
  const boosts = getSavedBoosts();
  
  // Check for duplicates
  if (boosts.some(b => b.text === boost.text)) {
    return null;
  }
  
  const newBoost: SavedBoost = {
    ...boost,
    id: Math.random().toString(36).substring(2) + Date.now().toString(36),
    timestamp: Date.now()
  };
  
  localStorage.setItem(STORAGE_KEY, JSON.stringify([newBoost, ...boosts]));
  return newBoost;
}

export function unsaveBoost(id: string): void {
  const boosts = getSavedBoosts();
  localStorage.setItem(
    STORAGE_KEY,
    JSON.stringify(boosts.filter(b => b.id !== id))
  );
}

export function isBoostSaved(text: string): boolean {
  const boosts = getSavedBoosts();
  return boosts.some(b => b.text === text);
}

export function formatTimestamp(timestamp: number): string {
  const now = Date.now();
  const diff = now - timestamp;
  
  const minutes = Math.floor(diff / 60000);
  const hours = Math.floor(minutes / 60);
  const days = Math.floor(hours / 24);
  
  if (days > 0) {
    return `${days} day${days === 1 ? '' : 's'} ago`;
  }
  if (hours > 0) {
    return `${hours} hour${hours === 1 ? '' : 's'} ago`;
  }
  if (minutes > 0) {
    return `${minutes} minute${minutes === 1 ? '' : 's'} ago`;
  }
  return 'Just now';
} 
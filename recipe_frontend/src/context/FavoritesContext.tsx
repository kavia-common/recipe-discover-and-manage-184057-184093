import React, { createContext, useContext, useEffect, useMemo, useState } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';

type FavoritesContextValue = {
  favorites: Set<string>;
  isFavorite: (id: string) => boolean;
  toggleFavorite: (id: string) => void;
  ready: boolean;
};

const FavoritesContext = createContext<FavoritesContextValue | undefined>(undefined);

const STORAGE_KEY = 'favorites.v1';

// PUBLIC_INTERFACE
export function FavoritesProvider({ children }: { children: React.ReactNode }) {
  /** Provides simple favorites state with persistence in AsyncStorage. */
  const [favorites, setFavorites] = useState<Set<string>>(new Set());
  const [ready, setReady] = useState(false);

  useEffect(() => {
    (async () => {
      try {
        const raw = await AsyncStorage.getItem(STORAGE_KEY);
        if (raw) {
          const parsed: string[] = JSON.parse(raw);
          setFavorites(new Set(parsed));
        }
      } catch {
        // ignore
      } finally {
        setReady(true);
      }
    })();
  }, []);

  const isFavorite = (id: string) => favorites.has(id);

  const toggleFavorite = (id: string) => {
    setFavorites(prev => {
      const next = new Set(prev);
      if (next.has(id)) next.delete(id);
      else next.add(id);
      AsyncStorage.setItem(STORAGE_KEY, JSON.stringify(Array.from(next))).catch(() => {});
      return next;
    });
  };

  const value = useMemo(() => ({ favorites, isFavorite, toggleFavorite, ready }), [favorites, ready]);

  return <FavoritesContext.Provider value={value}>{children}</FavoritesContext.Provider>;
}

// PUBLIC_INTERFACE
export function useFavorites() {
  /** Hook to access favorites state. */
  const ctx = useContext(FavoritesContext);
  if (!ctx) throw new Error('useFavorites must be used within FavoritesProvider');
  return ctx;
}

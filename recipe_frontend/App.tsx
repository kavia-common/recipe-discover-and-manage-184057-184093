import React from 'react';
import { StatusBar } from 'expo-status-bar';
import RootNavigator from './src/navigation';
import { FavoritesProvider } from './src/context/FavoritesContext';
import { Colors } from './src/theme/colors';

export default function App() {
  return (
    <FavoritesProvider>
      <StatusBar style="dark" backgroundColor={Colors.background} />
      <RootNavigator />
    </FavoritesProvider>
  );
}

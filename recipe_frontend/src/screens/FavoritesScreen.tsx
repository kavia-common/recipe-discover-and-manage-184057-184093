import React, { useMemo } from 'react';
import { SafeAreaView, StyleSheet, Text, View, FlatList } from 'react-native';
import { Colors, Spacing, Typography } from '../theme/colors';
import { useFavorites } from '../context/FavoritesContext';
import recipesData from '../../assets/data/recipes.json';
import type { Recipe } from '../types';
import { RecipeCard } from '../components/RecipeCard';
import { useNavigation } from '@react-navigation/native';
import type { RootStackParamList } from '../navigation';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';

type Nav = NativeStackNavigationProp<RootStackParamList>;

export default function FavoritesScreen() {
  const { favorites } = useFavorites();
  const navigation = useNavigation<Nav>();

  const list = useMemo(() => {
    const all = recipesData as Recipe[];
    return all.filter(r => favorites.has(r.id));
  }, [favorites]);

  return (
    <SafeAreaView style={styles.safe}>
      <View style={styles.container}>
        <Text style={styles.heading}>Favorites</Text>
        {list.length === 0 ? (
          <Text style={styles.empty}>No favorites yet. Save recipes to see them here.</Text>
        ) : (
          <FlatList
            data={list}
            keyExtractor={item => item.id}
            renderItem={({ item }) => (
              <RecipeCard
                recipe={item}
                onPress={() => navigation.navigate('RecipeDetail', { id: item.id })}
              />
            )}
          />
        )}
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safe: { flex: 1, backgroundColor: Colors.background },
  container: { flex: 1, padding: Spacing.xl },
  heading: { ...Typography.title, marginBottom: Spacing.md },
  empty: { ...Typography.body, color: '#6B7280' },
});

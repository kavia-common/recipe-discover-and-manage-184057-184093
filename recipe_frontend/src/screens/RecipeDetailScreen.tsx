import React, { useMemo } from 'react';
import { Image, SafeAreaView, ScrollView, StyleSheet, Text, View } from 'react-native';
import recipesData from '../../assets/data/recipes.json';
import type { Recipe } from '../types';
import { Colors, Spacing, Typography } from '../theme/colors';
import { PrimaryButton } from '../components/PrimaryButton';
import { useFavorites } from '../context/FavoritesContext';
import { useRoute } from '@react-navigation/native';

type RouteParams = { id: string };

export default function RecipeDetailScreen() {
  const route = useRoute();
  const params = route.params as RouteParams;
  const recipe = useMemo(
    () => (recipesData as Recipe[]).find(r => r.id === params?.id),
    [params?.id]
  );
  const { isFavorite, toggleFavorite } = useFavorites();

  if (!recipe) {
    return (
      <SafeAreaView style={styles.safe}>
        <View style={{ padding: Spacing.xl }}>
          <Text style={styles.title}>Recipe not found</Text>
        </View>
      </SafeAreaView>
    );
  }

  const imgSource = recipe.image.startsWith('http') ? { uri: recipe.image } : undefined;

  const fav = isFavorite(recipe.id);

  return (
    <SafeAreaView style={styles.safe}>
      <ScrollView>
        <View style={styles.heroWrapper}>
          {imgSource ? (
            <Image source={imgSource} style={styles.hero} />
          ) : (
            <View style={[styles.hero, styles.heroPlaceholder]}>
              <Text style={styles.heroText}>Hero</Text>
            </View>
          )}
        </View>
        <View style={styles.section}>
          <Text style={styles.title}>{recipe.title}</Text>
          <Text style={styles.meta}>
            {recipe.timeMinutes} min • {recipe.servings} servings
          </Text>
          {recipe.description ? (
            <Text style={styles.description}>{recipe.description}</Text>
          ) : null}
          <PrimaryButton
            title={fav ? 'Remove from Favorites' : 'Save to Favorites'}
            onPress={() => toggleFavorite(recipe.id)}
            style={{ marginTop: Spacing.md }}
          />
        </View>

        <View style={styles.section}>
          <Text style={styles.h2}>Ingredients</Text>
          {recipe.ingredients.map((ing, idx) => (
            <Text key={idx} style={styles.li}>• {ing}</Text>
          ))}
        </View>

        <View style={styles.section}>
          <Text style={styles.h2}>Steps</Text>
          {recipe.steps.map((step, idx) => (
            <Text key={idx} style={styles.step}>{idx + 1}. {step}</Text>
          ))}
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safe: {
    flex: 1,
    backgroundColor: Colors.background,
  },
  heroWrapper: {
    width: '100%',
    height: 240,
    backgroundColor: '#E5E7EB',
  },
  hero: {
    width: '100%',
    height: '100%',
  },
  heroPlaceholder: {
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#E0EAFF',
  },
  heroText: {
    ...Typography.caption,
    color: Colors.primary,
    fontWeight: '700',
  },
  section: {
    paddingHorizontal: Spacing.xl,
    paddingVertical: Spacing.lg,
  },
  title: {
    ...Typography.title,
    marginBottom: Spacing.xs,
  },
  meta: {
    ...Typography.caption,
    color: Colors.muted,
    marginBottom: Spacing.md,
  },
  description: {
    ...Typography.body,
    lineHeight: 20,
  },
  h2: {
    ...Typography.subtitle,
    color: Colors.text,
    marginBottom: Spacing.sm,
  },
  li: {
    ...Typography.body,
    marginBottom: Spacing.xs,
  },
  step: {
    ...Typography.body,
    marginBottom: Spacing.sm,
    lineHeight: 20,
  },
});

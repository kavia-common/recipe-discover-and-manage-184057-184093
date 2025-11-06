import React from 'react';
import { Image, Platform, Pressable, StyleSheet, Text, View } from 'react-native';
import { Colors, Radius, Spacing, Typography } from '../theme/colors';
import { TagChip } from './TagChip';
import type { Recipe } from '../types';

type Props = {
  recipe: Recipe;
  onPress?: (recipe: Recipe) => void;
};

// PUBLIC_INTERFACE
export function RecipeCard({ recipe, onPress }: Props) {
  /** Card view for a recipe used in lists with image, title, tags, and metadata. */
  const handlePress = () => {
    if (onPress) onPress(recipe);
  };

  const imgSource = recipe.image.startsWith('http')
    ? { uri: recipe.image }
    : // Require local assets only if present; fallback to a colored block
      undefined;

  return (
    <Pressable onPress={handlePress} style={({ pressed }) => [styles.card, pressed && styles.pressed]}>
      <View style={styles.imageWrapper}>
        {imgSource ? (
          <Image source={imgSource} style={styles.image} resizeMode="cover" />
        ) : (
          <View style={[styles.image, styles.imagePlaceholder]}>
            <Text style={styles.imagePlaceholderText}>Image</Text>
          </View>
        )}
      </View>
      <View style={styles.content}>
        <Text style={styles.title} numberOfLines={2}>{recipe.title}</Text>
        <View style={styles.metaRow}>
          <Text style={styles.meta}>{recipe.timeMinutes} min</Text>
          <Text style={styles.dot}>•</Text>
          <Text style={styles.meta}>{recipe.servings} servings</Text>
        </View>
        <View style={styles.tagsRow}>
          {recipe.tags.slice(0, 3).map(tag => (
            <TagChip key={tag} label={tag} />
          ))}
        </View>
      </View>
    </Pressable>
  );
}

const styles = StyleSheet.create({
  card: {
    backgroundColor: Colors.surface,
    borderRadius: Radius.lg,
    overflow: 'hidden',
    marginBottom: Spacing.lg,
    shadowColor: Colors.shadow,
    shadowOpacity: 0.6,
    shadowOffset: { width: 0, height: 8 },
    shadowRadius: 16,
    elevation: 3,
  },
  pressed: {
    opacity: 0.9,
    transform: [{ scale: Platform.select({ ios: 0.99, android: 0.99, default: 1 })! }],
  },
  imageWrapper: {
    width: '100%',
    height: 160,
    backgroundColor: '#E5E7EB',
  },
  image: {
    width: '100%',
    height: '100%',
  },
  imagePlaceholder: {
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#E0EAFF',
  },
  imagePlaceholderText: {
    ...Typography.caption,
    color: Colors.primary,
    fontWeight: '700',
  },
  content: {
    padding: Spacing.lg,
  },
  title: {
    ...Typography.title,
    marginBottom: Spacing.sm,
    color: Colors.text,
  },
  metaRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: Spacing.md,
  },
  meta: {
    ...Typography.caption,
    color: Colors.muted,
    fontWeight: '600',
  },
  dot: {
    marginHorizontal: Spacing.sm,
    color: Colors.muted,
  },
  tagsRow: {
    flexDirection: 'row',
    flexWrap: 'wrap',
  },
});

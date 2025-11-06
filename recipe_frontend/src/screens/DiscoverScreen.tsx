import React, { useMemo, useState } from 'react';
import { FlatList, SafeAreaView, StyleSheet, Text, TextInput, View } from 'react-native';
import { Colors, Radius, Spacing, Typography } from '../theme/colors';
import recipesData from '../../assets/data/recipes.json';
import { RecipeCard } from '../components/RecipeCard';
import type { Recipe } from '../types';
import { useNavigation } from '@react-navigation/native';
import type { RootStackParamList } from '../navigation';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { TagChip } from '../components/TagChip';

type Nav = NativeStackNavigationProp<RootStackParamList>;

const allTags = Array.from(
  new Set((recipesData as Recipe[]).flatMap(r => r.tags))
).slice(0, 6);

export default function DiscoverScreen() {
  const [query, setQuery] = useState('');
  const [activeTag, setActiveTag] = useState<string | null>(null);
  const navigation = useNavigation<Nav>();

  const filtered = useMemo(() => {
    const list = recipesData as Recipe[];
    return list.filter(r => {
      const matchesQuery =
        !query ||
        r.title.toLowerCase().includes(query.toLowerCase()) ||
        r.tags.some(t => t.toLowerCase().includes(query.toLowerCase()));
      const matchesTag = !activeTag || r.tags.includes(activeTag);
      return matchesQuery && matchesTag;
    });
  }, [query, activeTag]);

  return (
    <SafeAreaView style={styles.safe}>
      <View style={styles.container}>
        <Text style={styles.heading}>Discover</Text>
        <TextInput
          placeholder="Search recipes..."
          placeholderTextColor="#9CA3AF"
          value={query}
          onChangeText={setQuery}
          style={styles.search}
        />
        <View style={styles.filterRow}>
          <TagChip label={activeTag ? `Filter: ${activeTag}` : 'All'} />
          <View style={{ flexDirection: 'row', flexWrap: 'wrap' }}>
            {allTags.map(tag => (
              <Text
                key={tag}
                onPress={() => setActiveTag(prev => (prev === tag ? null : tag))}
                style={[
                  styles.filterTag,
                  activeTag === tag && styles.filterTagActive,
                ]}
              >
                {tag}
              </Text>
            ))}
          </View>
        </View>
        <FlatList
          data={filtered}
          keyExtractor={item => item.id}
          contentContainerStyle={{ paddingBottom: 32 }}
          showsVerticalScrollIndicator={false}
          renderItem={({ item }) => (
            <RecipeCard
              recipe={item}
              onPress={() => navigation.navigate('RecipeDetail', { id: item.id })}
            />
          )}
        />
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safe: {
    flex: 1,
    backgroundColor: Colors.background,
  },
  container: {
    padding: Spacing.xl,
    flex: 1,
  },
  heading: {
    ...Typography.title,
    marginBottom: Spacing.md,
  },
  search: {
    backgroundColor: Colors.surface,
    borderRadius: Radius.lg,
    paddingVertical: Spacing.md,
    paddingHorizontal: Spacing.lg,
    borderWidth: 1,
    borderColor: '#E5E7EB',
    marginBottom: Spacing.md,
  },
  filterRow: {
    marginBottom: Spacing.lg,
  },
  filterTag: {
    ...Typography.caption,
    paddingHorizontal: Spacing.md,
    paddingVertical: Spacing.xs,
    borderRadius: Radius.pill,
    borderWidth: 1,
    borderColor: '#E5E7EB',
    color: Colors.muted,
    marginRight: Spacing.sm,
    marginBottom: Spacing.sm,
  },
  filterTagActive: {
    backgroundColor: '#DBEAFE',
    borderColor: '#BFDBFE',
    color: Colors.primary,
    fontWeight: '700',
  },
});

// src/app/screens/WorkoutSelectionScreen.tsx

import React from 'react';
import { StyleSheet, FlatList, View, Text } from 'react-native';
import WorkoutListItem from '@/components/WorkoutSelectionListItem';
import { useTheme } from '@/contexts/ThemeContext';
import Colors from '@/constants/Colors';
import LoadingOverlay from '@/components/LoadingOverlay';
import { useWorkoutSelectionViewModel } from '@/viewmodels/WorkoutSelectionScreenViewModel';

export default function WorkoutSelectionScreen() {
  const { theme } = useTheme();
  const colors = Colors[theme];
  const { workouts, isLoading, error, handleWorkoutSelection } = useWorkoutSelectionViewModel();

  if (isLoading) {
    return <LoadingOverlay />;
  }

  if (error) {
    return (
      <View style={[styles.container, { backgroundColor: colors.background }]}>
        <Text style={[styles.errorText, { color: colors.text }]}>{error}</Text>
      </View>
    );
  }

  return (
    <View style={[styles.container, { backgroundColor: colors.listBackground }]}>
      <FlatList
        data={workouts}
        keyExtractor={(item) => item.id.toString()}
        renderItem={({ item }) => (
          <WorkoutListItem
            item={item}
            onPress={() => handleWorkoutSelection(item.id)}
          />
        )}
        contentContainerStyle={styles.listContent}
        showsVerticalScrollIndicator={false}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  listContent: {
    padding: 10,
  },
  errorText: {
    fontSize: 16,
    textAlign: 'center',
    marginTop: 20,
  },
});
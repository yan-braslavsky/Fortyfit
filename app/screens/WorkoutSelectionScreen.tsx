// src/app/screens/WorkoutSelectionScreen.tsx

import React from 'react';
import { StyleSheet, FlatList, View } from 'react-native';
import WorkoutListItem from '@/components/WorkoutListItem';
import { useTheme } from '@/contexts/ThemeContext';
import Colors from '@/constants/Colors';
import LoadingOverlay from '@/components/LoadingOverlay';
import { useWorkoutSelectionViewModel } from '@/viewmodels/WorkoutSelectionScreenViewModel';

export default function WorkoutSelectionScreen() {
  const { theme } = useTheme();
  const colors = Colors[theme];
  const { workouts, isLoading, handleWorkoutSelection } = useWorkoutSelectionViewModel();

  if (isLoading) {
    return <LoadingOverlay />;
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
});
import React from 'react';
import { StyleSheet, FlatList, View, useColorScheme } from 'react-native';
import { WorkoutDataModel } from '@/constants/DataModels';
import { DEMO_WORKOUTS } from '@/constants/Data';
import WorkoutListItem from '@/components/WorkoutListItem';
import { router } from 'expo-router';
import Colors, { ColorsTheme } from '@/constants/Colors';

export default function WorkoutSelectionScreen() {
  const colorScheme = useColorScheme() as ColorsTheme;
  const colors = Colors.getColorsByTheme(colorScheme);

  const handleWorkoutSelection = (workoutId: string) => {
    router.push({
      pathname: "/workout/[id]",
      params: { id: workoutId }
    });
  };

  return (
    <View style={[styles.container, { backgroundColor: colors.listBackground }]}>
      <FlatList
        data={DEMO_WORKOUTS}
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
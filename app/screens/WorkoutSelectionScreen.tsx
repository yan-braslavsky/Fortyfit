import React, { useEffect, useState } from 'react';
import { StyleSheet, FlatList, View } from 'react-native';
import { WorkoutDataModel } from '@/constants/DataModels';
import WorkoutListItem from '@/components/WorkoutListItem';
import { router } from 'expo-router';
import { useTheme } from '@/contexts/ThemeContext';
import Colors from '@/constants/Colors';
import { fetchRawWorkouts } from '@/services/workoutService';
import { adaptRawWorkoutToWorkoutDataModel } from '@/services/dataAdaptionHelper';
import LoadingOverlay from '@/components/LoadingOverlay';

export default function WorkoutSelectionScreen() {
  const { theme } = useTheme();
  const colors = Colors[theme];
  const [workouts, setWorkouts] = useState<WorkoutDataModel[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    fetchWorkouts();
  }, []);

  const fetchWorkouts = async () => {
    setIsLoading(true);
    try {
      const rawWorkouts = await fetchRawWorkouts();
      const adaptedWorkouts = await Promise.all(rawWorkouts.map(adaptRawWorkoutToWorkoutDataModel));
      setWorkouts(adaptedWorkouts);
    } catch (error) {
      console.error('Error fetching workouts:', error);
      // You might want to show an error message to the user
    } finally {
      setIsLoading(false);
    }
  };

  const handleWorkoutSelection = (workoutId: string) => {
    router.push({
      pathname: "/workout/[id]",
      params: { id: workoutId }
    });
  };

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
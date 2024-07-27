// src/viewmodels/WorkoutSelectionViewModel.ts

import { useState, useEffect } from 'react';
import { WorkoutDataModel } from '@/constants/DataModels';
import { fetchRawWorkouts } from '@/services/workoutService';
import { adaptRawWorkoutToWorkoutDataModel } from '@/services/dataAdaptionHelper';
import { router } from 'expo-router';

export const useWorkoutSelectionViewModel = () => {
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

  return {
    workouts,
    isLoading,
    handleWorkoutSelection,
  };
};
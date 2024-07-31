// src/viewmodels/WorkoutSelectionViewModel.ts

import { useState, useEffect } from 'react';
import { WorkoutDataModel } from '@/constants/DataModels';
import { fetchRawWorkouts, RawWorkout } from '@/services/workoutService';
import { adaptRawWorkoutToWorkoutDataModel } from '@/services/dataAdaptionHelper';
import { router } from 'expo-router';

export const useWorkoutSelectionViewModel = () => {
  const [workouts, setWorkouts] = useState<WorkoutDataModel[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    fetchWorkouts();
  }, []);

  const fetchWorkouts = async () => {
    setIsLoading(true);
    setError(null);
    try {
      console.log("Fetching workouts...");
      const rawWorkouts = await fetchRawWorkouts();
      console.log("Raw workouts fetched:", rawWorkouts);

      if (!rawWorkouts || rawWorkouts.length === 0) {
        console.log("No workouts found or rawWorkouts is undefined");
        setError('No workouts found');
        return;
      }

      console.log("Adapting workouts...");
      const adaptedWorkouts = await Promise.all(
        rawWorkouts.map(async (rawWorkout: RawWorkout) => {
          try {
            return await adaptRawWorkoutToWorkoutDataModel(rawWorkout);
          } catch (error) {
            console.error("Error adapting workout:", error);
            return null;
          }
        })
      );

      console.log("Adapted workouts:", adaptedWorkouts);

      const validWorkouts = adaptedWorkouts.filter((workout): workout is WorkoutDataModel => workout !== null);
      setWorkouts(validWorkouts);

      if (validWorkouts.length === 0) {
        setError('No valid workouts found');
      }
    } catch (error) {
      console.error('Error fetching workouts:', error);
      setError('Failed to fetch workouts. Please try again.');
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
    error,
    handleWorkoutSelection,
  };
};
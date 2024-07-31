// src/viewmodels/WorkoutViewModel.ts

import { useState, useEffect } from 'react';
import { WorkoutDataModel } from '@/constants/DataModels';
import { fetchRawWorkout, RawWorkout } from '@/services/workoutService';
import { adaptRawWorkoutToWorkoutDataModel } from '@/services/dataAdaptionHelper';

export const useWorkoutViewModel = (workoutId: string) => {
  const [workout, setWorkout] = useState<WorkoutDataModel | null>(null);
  const [currentGroupIndex, setCurrentGroupIndex] = useState(0);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const loadWorkout = async () => {
      setIsLoading(true);
      setError(null);
      try {
        const rawWorkout = await fetchRawWorkout(workoutId);
        if (rawWorkout) {
          const adaptedWorkout = await adaptRawWorkoutToWorkoutDataModel(rawWorkout);
          setWorkout(adaptedWorkout);
        } else {
          setError('Workout not found');
        }
      } catch (err) {
        setError('Error loading workout');
        console.error('Error loading workout:', err);
      } finally {
        setIsLoading(false);
      }
    };
    loadWorkout();
  }, [workoutId]);

  const moveToNextGroup = () => {
    if (workout && currentGroupIndex < workout.exerciseGroups.length - 1) {
      setCurrentGroupIndex(currentGroupIndex + 1);
    } else {
      // Workout completed
      console.log('Workout completed');
    }
  };

  return {
    workout,
    currentGroupIndex,
    moveToNextGroup,
    isLoading,
    error,
  };
};
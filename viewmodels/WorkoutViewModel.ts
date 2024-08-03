// src/viewmodels/WorkoutViewModel.ts

import { useState, useEffect } from 'react';
import { WorkoutDataModel } from '@/constants/DataModels';
import { fetchRawWorkout } from '@/services/workoutService';
import { adaptRawWorkoutToWorkoutDataModel } from '@/services/dataAdaptionHelper';
import { ExerciseStatus, CompoundSet } from '@/models/WorkoutModel';
import { ExerciseGroup } from '@/constants/DataModels';

export const useWorkoutViewModel = (workoutId: string) => {
  const [workout, setWorkout] = useState<WorkoutDataModel | null>(null);
  const [currentGroupIndex, setCurrentGroupIndex] = useState(0);
  const [currentCompoundSets, setCurrentCompoundSets] = useState<CompoundSet[]>([]);
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
          initializeCompoundSets(adaptedWorkout.exerciseGroups[currentGroupIndex]);
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

  const initializeCompoundSets = (exercisesGroup: ExerciseGroup) => {
    const newCompoundSets = createCompoundSets(exercisesGroup);
    setCurrentCompoundSets(newCompoundSets);
  };

  const createCompoundSets = (exerciseGroup: ExerciseGroup): CompoundSet[] => {
    return Array(exerciseGroup.sets).fill(null).map((_, i) => ({
      id: `compound-${i}`,
      singleSets: exerciseGroup.exercises.map(exercise => ({
        id: `${exercise.id}-${i}`,
        name: exercise.name,
        weight: exercise.sets[0].weight,
        reps: exercise.sets[0].reps,
        recomendedRepsRange: { min: exercise.sets[0].reps - 2, max: exercise.sets[0].reps + 2 },
        imageUrl: exercise.imageUrl
      })),
      status: ExerciseStatus.NotActive
    }));
  };

  const moveToNextGroup = () => {
    if (workout && currentGroupIndex < workout.exerciseGroups.length - 1) {
      const nextGroupIndex = currentGroupIndex + 1;
      setCurrentGroupIndex(nextGroupIndex);
      initializeCompoundSets(workout.exerciseGroups[nextGroupIndex]);
    } else {
      // Workout completed
      console.log('Workout completed');
    }
  };

  return {
    workout,
    currentGroupIndex,
    currentCompoundSets,
    moveToNextGroup,
    isLoading,
    error,
  };
};
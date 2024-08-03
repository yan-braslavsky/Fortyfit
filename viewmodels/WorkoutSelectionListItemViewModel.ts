// src/viewmodels/WorkoutSelectionListItemViewModel.ts

import { useState, useEffect } from 'react';
import { WorkoutDataModel, EquipmentModel, MuscleGroup } from '@/constants/DataModels';

export const useWorkoutSelectionListItemViewModel = (item: WorkoutDataModel) => {
  const [duration, setDuration] = useState(0);
  const [totalExercises, setTotalExercises] = useState(0);
  const [uniqueEquipment, setUniqueEquipment] = useState<string[]>([]);
  const [muscleGroups, setMuscleGroups] = useState<MuscleGroup[]>([]);
  const [exerciseImages, setExerciseImages] = useState<string[]>([]);

  useEffect(() => {
    calculateWorkoutDetails();
  }, [item]);

  const calculateWorkoutDetails = () => {
    const allExercises = item.exerciseGroups.flatMap(group => group.exercises);
    
    // Calculate duration (estimate based on number of exercises and sets)
    const totalSets = item.exerciseGroups.reduce((sum, group) => sum + group.sets, 0);
    const estimatedDuration = totalSets * 2 + allExercises.length * 1; // 2 minutes per set, 1 minute per exercise for rest
    setDuration(Math.max(estimatedDuration, 20)); // Minimum 20 minutes
    
    // Calculate total exercises
    setTotalExercises(allExercises.length);

    // Get unique equipment
    const equipment = Array.from(new Set(allExercises.flatMap(exercise => exercise.equipment)))
      .filter((equipment): equipment is EquipmentModel => equipment !== null && equipment !== undefined);
    setUniqueEquipment(Array.from(new Set(equipment.map(eq => eq.name))));

    // Get unique muscle groups
    setMuscleGroups(Array.from(new Set(allExercises.flatMap(exercise => exercise.muscleGroups))));

    // Get 4 random exercise images
    setExerciseImages(
      allExercises
        .map(exercise => exercise.imageUrl)
        .filter(url => url !== '')
        .sort(() => 0.5 - Math.random())
        .slice(0, 4)
    );
  };

  return {
    duration,
    totalExercises,
    uniqueEquipment,
    muscleGroups,
    exerciseImages,
  };
};
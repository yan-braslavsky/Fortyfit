// src/viewmodels/WorkoutListItemViewModel.ts

import { useState, useEffect } from 'react';
import { WorkoutDataModel, EquipmentModel } from '@/constants/DataModels';

export const useWorkoutListItemViewModel = (item: WorkoutDataModel) => {
  const [duration, setDuration] = useState(0);
  const [totalExercises, setTotalExercises] = useState(0);
  const [uniqueEquipment, setUniqueEquipment] = useState<string[]>([]);
  const [muscleGroups, setMuscleGroups] = useState<string[]>([]);
  const [exerciseImages, setExerciseImages] = useState<string[]>([]);

  useEffect(() => {
    calculateWorkoutDetails();
  }, [item]);

  const calculateWorkoutDetails = () => {
    const allExercises = item.exercises.flat();
    
    // Calculate duration (random between 30 and 60 minutes)
    setDuration(Math.floor(Math.random() * (60 - 30 + 1)) + 30);
    
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
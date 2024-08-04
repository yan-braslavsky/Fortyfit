// src/services/dataAdaptionHelper.ts

import { WorkoutDataModel, ExerciseDataModel, EquipmentModel, ExerciseGroup, ExerciseSetDataModel, MuscleGroup } from '@/constants/DataModels';
import { RawWorkout } from '../services/workoutService';
import { RawExercise, fetchRawExercise } from '../services/exercisesService';
import { RawEquipment, fetchRawEquipment } from '../services/equipmentService';

export async function adaptRawWorkoutToWorkoutDataModel(rawWorkout: RawWorkout): Promise<WorkoutDataModel> {

  if (!rawWorkout.exerciseGroups || !Array.isArray(rawWorkout.exerciseGroups)) {
    console.error("Invalid exerciseGroups in rawWorkout:", rawWorkout.exerciseGroups);
    throw new Error("Invalid exerciseGroups in rawWorkout");
  }

  const exerciseGroupsPromises = rawWorkout.exerciseGroups.map(async (group): Promise<ExerciseGroup> => {
    if (!group.exercises || !Array.isArray(group.exercises)) {
      console.error("Invalid exercises in group:", group);
      throw new Error("Invalid exercises in group");
    }

    const exercisesPromises = group.exercises.map(async (exerciseData) => {
      const rawExercise = await fetchRawExercise(exerciseData.exerciseId);
      if (!rawExercise) {
        console.warn(`Exercise with id ${exerciseData.exerciseId} not found`);
        return null;
      }

      const equipment = await Promise.all(
        (rawExercise.equipmentIds || []).map(async equipmentId => {
          const rawEquipment = await fetchRawEquipment(equipmentId);
          return rawEquipment ? adaptRawEquipmentToEquipmentModel(rawEquipment) : null;
        })
      );

      return adaptRawExerciseToExerciseDataModel(rawExercise, equipment.filter((eq): eq is EquipmentModel => eq !== null), {
        weight: exerciseData.weight,
        reps: exerciseData.reps,
      });
    });

    const exercises = (await Promise.all(exercisesPromises)).filter((exercise): exercise is ExerciseDataModel => exercise !== null);
    return {
      exercises,
      sets: group.sets
    };
  });

  const exerciseGroups = await Promise.all(exerciseGroupsPromises);

  return new WorkoutDataModel(
    rawWorkout.id,
    rawWorkout.name,
    rawWorkout.imageUrl,
    exerciseGroups
  );
}

function adaptRawExerciseToExerciseDataModel(
  rawExercise: RawExercise,
  equipment: EquipmentModel[],
  setData: { weight: number; reps: number }
): ExerciseDataModel {
  const muscleGroups = (rawExercise.muscleGroups || []).map(group => MuscleGroup[group as keyof typeof MuscleGroup] || MuscleGroup.FullBody);

  const sets = [new ExerciseSetDataModel(
    `${rawExercise.id}-set-1`,
    'Set 1',
    setData.weight,
    setData.reps
  )];

  return new ExerciseDataModel(
    rawExercise.id,
    rawExercise.name,
    rawExercise.imageUrl,
    60, // default rest time
    sets,
    equipment,
    rawExercise.description || '',
    muscleGroups
  );
}

function adaptRawEquipmentToEquipmentModel(rawEquipment: RawEquipment): EquipmentModel {
  return {
    id: rawEquipment.id,
    name: rawEquipment.name,
    imageUrl: rawEquipment.imageUrl
  };
}
import { WorkoutDataModel, ExerciseDataModel, EquipmentModel } from '../constants/DataModels';
import { RawWorkout } from '../services/workoutService';
import { RawExercise, fetchRawExercise } from '../services/exercisesService';
import { RawEquipment, fetchRawEquipment } from '../services/equipmentService';

// TODO: Remove this when real muscle groups are implemented
const FAKE_MUSCLE_GROUPS = ['Chest', 'Back', 'Legs', 'Arms', 'Shoulders', 'Core'];

export async function adaptRawWorkoutToWorkoutDataModel(rawWorkout: RawWorkout): Promise<WorkoutDataModel> {
  const exercisesPromises = rawWorkout.exerciseGroups.map(async (group, groupIndex) => {
    const groupExercises = await Promise.all(group.exercises.map(async (exerciseData, exerciseIndex) => {
      const rawExercise = await fetchRawExercise(exerciseData.exerciseId);
      if (!rawExercise) {
        console.warn(`Exercise with id ${exerciseData.exerciseId} not found`);
        return null;
      }

      const equipment = await Promise.all(
        rawExercise.equipmentIds.map(async equipmentId => {
          const rawEquipment = await fetchRawEquipment(equipmentId);
          return rawEquipment ? adaptRawEquipmentToEquipmentModel(rawEquipment) : null;
        })
      );

      return adaptRawExerciseToExerciseDataModel(rawExercise, equipment.filter((eq): eq is EquipmentModel => eq !== null), {
        weight: exerciseData.weight,
        reps: exerciseData.reps,
        setNumber: exerciseIndex + 1
      });
    }));

    return groupExercises.filter((exercise): exercise is ExerciseDataModel => exercise !== null);
  });

  const exercises = await Promise.all(exercisesPromises);

  return {
    id: rawWorkout.id,
    name: rawWorkout.name,
    imageUrl: rawWorkout.imageUrl,
    exercises: exercises
  };
}

function adaptRawExerciseToExerciseDataModel(
  rawExercise: RawExercise, 
  equipment: EquipmentModel[], 
  setData: { weight: number; reps: number; setNumber: number }
): ExerciseDataModel {
  // TODO: Remove this when real muscle groups are implemented
  const muscleGroups = rawExercise.muscleGroups && rawExercise.muscleGroups.length > 0
    ? rawExercise.muscleGroups
    : FAKE_MUSCLE_GROUPS.sort(() => 0.5 - Math.random()).slice(0, 3);

  return {
    id: rawExercise.id,
    name: rawExercise.name,
    imageUrl: rawExercise.imageUrl,
    description: rawExercise.description,
    sets: [{
      id: `${rawExercise.id}-set-${setData.setNumber}`,
      name: `Set ${setData.setNumber}`,
      weight: setData.weight,
      reps: setData.reps
    }],
    equipment: equipment,
    restTimeInSeconds: 60, // You might want to add this to your RawExercise model
    muscleGroups: muscleGroups
  };
}

function adaptRawEquipmentToEquipmentModel(rawEquipment: RawEquipment): EquipmentModel {
  return {
    id: rawEquipment.id,
    name: rawEquipment.name,
    imageUrl: rawEquipment.imageUrl
  };
}
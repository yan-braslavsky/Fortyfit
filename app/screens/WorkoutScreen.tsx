// src/app/screens/WorkoutScreen.tsx

import React from 'react';
import { View, Text } from 'react-native';
import { useLocalSearchParams } from "expo-router";
import { useWorkoutViewModel } from '@/viewmodels/WorkoutViewModel';
import ExerciseGroupScreen from './ExerciseGroupScreen';
import LoadingOverlay from '@/components/LoadingOverlay';
import { ExerciseStatus, CompoundSet } from '@/models/WorkoutModel';
import SingleSetModel from '@/models/SingleSetModel';
import { ExerciseGroup } from '@/constants/DataModels';

export default function WorkoutScreen() {
    const { id } = useLocalSearchParams();
    const { workout, currentGroupIndex, moveToNextGroup, isLoading, error } = useWorkoutViewModel(id as string);

    if (isLoading) {
        return <LoadingOverlay />;
    }

    if (error || !workout) {
        return <View><Text>{error || 'An error occurred'}</Text></View>;
    }

    const currentGroup = workout.exerciseGroups[currentGroupIndex];

    const createInitialCompoundSets = (exerciseGroup: ExerciseGroup): CompoundSet[] => {
        return Array(currentGroup.sets).fill(null).map((_, i) => ({
            id: `compound-${i}`,
            singleSets: exerciseGroup.exercises.map(exercise => ({
                id: `${exercise.id}-${i}`,
                name: exercise.name,
                weight: exercise.sets[0].weight,
                reps: exercise.sets[0].reps,
                recomendedRepsRange: { min: exercise.sets[0].reps - 2, max: exercise.sets[0].reps + 2 },
                imageUrl: exercise.imageUrl
            } as SingleSetModel)),
            status: ExerciseStatus.NotActive
        }));
    };

    const initialCompoundSets = createInitialCompoundSets(currentGroup);

    return (
        <ExerciseGroupScreen
            exerciseHeaders={currentGroup.exercises.map(exercise => ({
                imageUrl: exercise.imageUrl,
                title: exercise.name,
                subtitle: exercise.muscleGroups.join(', '),
                equipmentImagesUrls: exercise.equipment.map(eq => eq.imageUrl)
            }))}
            initialCompoundSets={initialCompoundSets}
            onGroupComplete={moveToNextGroup}
        />
    );
}
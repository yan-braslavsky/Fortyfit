// src/app/screens/WorkoutScreen.tsx

import React from 'react';
import { View, Text } from 'react-native';
import { useLocalSearchParams } from "expo-router";
import { useWorkoutViewModel } from '@/viewmodels/WorkoutViewModel';
import ExerciseGroupScreen from './ExerciseGroupScreen';
import LoadingOverlay from '@/components/LoadingOverlay';
import { ExerciseStatus, CompoundSet, SingleSetModel } from '@/models/WorkoutModel';
import { ExerciseDataModel } from '@/constants/DataModels';

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

    const mapToCompoundSets = (exercises: ExerciseDataModel[]): CompoundSet[] => {
        const compoundSets: CompoundSet[] = [];

        for (let i = 0; i < 3; i++) {
            const singleSets = exercises.map(exercise => ({
                id: `${exercise.id}-${i}`,
                name: exercise.name,
                weight: exercise.sets[0].weight, // Assuming we use the first set's weight
                reps: exercise.sets[0].reps, // Assuming we use the first set's reps
                recomendedRepsRange: { min: exercise.sets[0].reps - 2, max: exercise.sets[0].reps + 2 },
                imageUrl: exercise.imageUrl
            } as SingleSetModel));

            compoundSets.push({
                id: `compound-${i}`,
                singleSets,
                status: ExerciseStatus.NotActive
            });
        }

        return compoundSets;
    };

    return (
        <ExerciseGroupScreen
            exerciseHeaders={currentGroup.exercises.map(exercise => ({
                imageUrl: exercise.imageUrl,
                title: exercise.name,
                subtitle: exercise.muscleGroups.join(', '),
                equipmentImagesUrls: exercise.equipment.map(eq => eq.imageUrl)
            }))}
            compoundSets={mapToCompoundSets(currentGroup.exercises)}
            onGroupComplete={moveToNextGroup}
        />
    );
}
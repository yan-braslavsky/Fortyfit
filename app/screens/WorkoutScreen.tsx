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
        return exercises.map(exercise => ({
            id: exercise.id,
            singleSets: exercise.sets.map(set => ({
                ...set,
                recomendedRepsRange: { min: set.reps - 2, max: set.reps + 2 }, // Example range
                imageUrl: exercise.imageUrl // Using exercise image for each set
            } as SingleSetModel)),
            status: ExerciseStatus.NotActive
        }));
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
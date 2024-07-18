import { useEffect, useState } from 'react';
import { Alert } from 'react-native';
import SingleSetModel from '@/models/SingleSetModel';
import { generateDemoWorkoutModel } from '@/constants/DataGenerationUtils';
import { ExerciseStatus } from '@/models/WorkoutModel';
import { WorkoutModel } from '@/models/WorkoutModel';
import { router } from 'expo-router';


export const useWorkoutViewModel = () => {
    const [workoutModel, setWorkoutModel] = useState<WorkoutModel>(generateDemoWorkoutModel());
    const [activeCompoundSetId, setActiveCompoundSetId] = useState<string | null>(null);

    useEffect(() => {
        handleSetActivation(workoutModel.compoundSets[0].id);
    }, []);

    const handleSetActivation = (id: string) => {
        const currentActiveSet = findSetById(activeCompoundSetId);
        const nextActiveSet = findSetById(id)!;

        if (currentActiveSet) {
            currentActiveSet.status = ExerciseStatus.Finished;
        }
        nextActiveSet.status = ExerciseStatus.Active;
        setActiveCompoundSetId(id);
    };

    const handleSetCompletion = (id: string, completedSets: SingleSetModel[]) => {
        const completedSet = findSetById(id)!;
        completedSet.singleSets = completedSets;
        completedSet.status = ExerciseStatus.Finished;
        setNextActiveExercise();
    };

    const setNextActiveExercise = () => {
        const nextActiveSet = workoutModel.compoundSets.find(set => set.status === ExerciseStatus.NotActive);
        if (!nextActiveSet) {
            showExitDialog();
            return;
        }
        handleSetActivation(nextActiveSet.id);
    };

    const findSetById = (id: string | null) => {
        return workoutModel.compoundSets.find(set => set.id === id);
    };

    const showExitDialog = () => {
        Alert.alert("Exit", "Are you sure you want to exit?", [
            { text: "No", style: "cancel" },
            {
                text: "Yes", onPress: () => {
                    //TODO: maybe we want to go to the next exercise
                    router.back();
                }
            }
        ], { cancelable: false });
    }

    return {
        workoutModel,
        handleSetActivation,
        handleSetCompletion,
        showExitDialog
    };
};



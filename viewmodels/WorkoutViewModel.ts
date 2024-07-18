import { useState, useCallback, useRef } from 'react';
import { Alert } from 'react-native';
import { WorkoutModel, CompoundSet, ExerciseStatus } from '@/models/WorkoutModel';
import { generateDemoWorkoutModel } from '@/constants/DataGenerationUtils';
import SingleSetModel from '@/models/SingleSetModel';
import { TimerOverlayRef } from '@/components/TimerOverlay';
import { router } from 'expo-router';

export const useWorkoutViewModel = (workoutId: string) => {
    const [workoutModel, setWorkoutModel] = useState<WorkoutModel>(generateDemoWorkoutModel());
    const [activeCompoundSetIndex, setActiveCompoundSetIndex] = useState<number | null>(null);
    const [isTimerVisible, setIsTimerVisible] = useState(false);
    const timerRef = useRef<TimerOverlayRef>(null);

    console.log('Current Workout ID:', workoutId);

    const findNextUnfinishedSetIndex = useCallback((startIndex: number): number | null => {
        const totalSets = workoutModel.compoundSets.length;
        for (let i = 1; i <= totalSets; i++) {
            const nextIndex = (startIndex + i) % totalSets;
            if (workoutModel.compoundSets[nextIndex].status !== ExerciseStatus.Finished) {
                return nextIndex;
            }
        }
        return null;
    }, [workoutModel.compoundSets]);

    const handleSetCompletion = useCallback((id: string, completedSets: SingleSetModel[]) => {
        setWorkoutModel((prevModel) => {
            const updatedCompoundSets = prevModel.compoundSets.map((compoundSet) => {
                if (compoundSet.id === id) {
                    return {
                        ...compoundSet,
                        singleSets: completedSets,
                        status: ExerciseStatus.Finished,
                    };
                }
                return compoundSet;
            });

            return { ...prevModel, compoundSets: updatedCompoundSets };
        });

        setIsTimerVisible(true);
        timerRef.current?.show();

        if (activeCompoundSetIndex !== null) {
            const nextIndex = findNextUnfinishedSetIndex(activeCompoundSetIndex);
            setActiveCompoundSetIndex(nextIndex);
        }
    }, [activeCompoundSetIndex, findNextUnfinishedSetIndex]);

    const handleSetActivation = useCallback((id: string) => {
        setWorkoutModel((prevModel) => {
            const updatedCompoundSets = prevModel.compoundSets.map((compoundSet) => {
                if (compoundSet.id === id) {
                    return { ...compoundSet, status: ExerciseStatus.Active };
                } else if (compoundSet.status === ExerciseStatus.Active) {
                    return { ...compoundSet, status: ExerciseStatus.NotActive };
                }
                return compoundSet;
            });

            return { ...prevModel, compoundSets: updatedCompoundSets };
        });

        const index = workoutModel.compoundSets.findIndex((set) => set.id === id);
        setActiveCompoundSetIndex(index);
    }, [workoutModel]);

    const handleTimerEnd = useCallback(() => {
        setIsTimerVisible(false);
        timerRef.current?.hide();

        if (activeCompoundSetIndex !== null) {
            const nextIndex = findNextUnfinishedSetIndex(activeCompoundSetIndex);
            if (nextIndex !== null) {
                handleSetActivation(workoutModel.compoundSets[nextIndex].id);
            } else {
                showExitDialog();
            }
        }
    }, [workoutModel, activeCompoundSetIndex, findNextUnfinishedSetIndex, handleSetActivation]);

    const showExitDialog = useCallback(() => {
        Alert.alert(
            "Workout Completed",
            "What would you like to do next?",
            [
                {
                    text: "Start Another Workout",
                    onPress: () => {
                        const newWorkoutId = `workout-${Date.now()}`;
                        router.push({
                            pathname: "/workout/[id]",
                            params: { id: newWorkoutId }
                        });
                    }
                },
                {
                    text: "Return to Workout Selection",
                    onPress: () => {
                        // Return all the way back popping the entire stack
                        router.dismissAll();
                    }
                }
            ]
        );
    }, []);

    return {
        workoutModel,
        handleSetCompletion,
        handleSetActivation,
        handleTimerEnd,
        showExitDialog,
        timerRef,
        isTimerVisible,
    };
};
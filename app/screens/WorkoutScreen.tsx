import React from 'react';
import { StyleSheet, TouchableWithoutFeedback, Keyboard, ScrollView, View, Button } from 'react-native';
import { useLocalSearchParams } from "expo-router";
import ExerciseHeaderCompound from '@/components/ExerciseHeaderCompound';
import ActiveCompoundSet from '@/components/ActiveCompoundSet';
import FinishedCompoundSet from '@/components/FinishedCompoundSet';
import NotActiveCompoundSet from '@/components/NotActiveCompoundSet';
import Separator from '@/components/Separator';
import { useWorkoutViewModel } from '@/viewmodels/WorkoutViewModel';
import { ExerciseStatus } from '@/models/WorkoutModel';

export default function WorkoutScreen() {

    const { workoutID } = useLocalSearchParams();
    const {
        workoutModel,
        handleSetCompletion,
        handleSetActivation,
        showExitDialog
    } = useWorkoutViewModel();

    const renderExercises = () => {
        return workoutModel.compoundSets.map(compoundSet => {
            switch (compoundSet.status) {
                case ExerciseStatus.Active:
                    return (
                        <ActiveCompoundSet
                            key={compoundSet.id}
                            id={compoundSet.id}
                            sets={compoundSet.singleSets}
                            onDonePress={handleSetCompletion}
                        />
                    );
                case ExerciseStatus.Finished:
                    return (
                        <FinishedCompoundSet
                            key={compoundSet.id}
                            id={compoundSet.id}
                            pressHandler={handleSetActivation}
                            repsCompleted={compoundSet.singleSets.map(set => set.completedReps || 0)}
                        />
                    );
                case ExerciseStatus.NotActive:
                    return (
                        <NotActiveCompoundSet
                            key={compoundSet.id}
                            id={compoundSet.id}
                            pressHandler={handleSetActivation}
                            numberOfExercises={compoundSet.singleSets.length}
                            suggestedRepsRange={{
                                min: Math.min(...compoundSet.singleSets.map(set => set.recomendedRepsRange.min)),
                                max: Math.max(...compoundSet.singleSets.map(set => set.recomendedRepsRange.max)),
                            }}
                        />
                    );
                default:
                    return null;
            }
        });
    };

    return (
        <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
            <ScrollView contentContainerStyle={styles.scrollView}>
                <View style={styles.container}>
                    <ExerciseHeaderCompound exerciseHeaderModels={workoutModel.exerciseHeaderModels} />
                    <Separator />
                    <View style={styles.exercisesContainer}>
                        {renderExercises()}
                    </View>
                    <View style={styles.finishExerciseBtnContainer}>
                        <Button title="Finish Exercise" onPress={showExitDialog} />
                    </View>
                </View>
            </ScrollView>
        </TouchableWithoutFeedback>
    );
}

const styles = StyleSheet.create({
    scrollView: { flexGrow: 1, padding: 5 },
    container: { flex: 1, padding: 10, borderRadius: 10 },
    exercisesContainer: { flex: 1, flexDirection: 'column' },
    finishExerciseBtnContainer: { marginVertical: 20 },
});

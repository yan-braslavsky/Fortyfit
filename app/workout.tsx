import React, { useCallback, useLayoutEffect, useState } from 'react';
import { StyleSheet, TouchableWithoutFeedback, Keyboard, ScrollView, Alert, Pressable, View, Text, Button } from 'react-native';
import { useNavigation, useRouter, useLocalSearchParams } from "expo-router";
import Colors from '@/constants/Colors';
import { DEMO_WORKOUTS } from '@/constants/Data';
import Separator from '@/components/Separator';
import ExerciseHeader from '@/components/ExerciseHeaderCompound';
import { FontAwesome } from '@expo/vector-icons';
import ActiveCompoundSet from '@/components/ActiveCompoundSet';
import FinishedCompoundSet from '@/components/FinishedCompoundSet';
import NotActiveCompoundSet from '@/components/NotActiveCompoundSet';
import { render } from '@testing-library/react-native';
import { ExerciseDataModel, WorkoutDataModel } from '@/constants/DataModels';
import { ExerciseSetDataModel } from '@/constants/DataModels';

export default function Workout() {
    const navigation = useNavigation();
    const router = useRouter();
    const { workoutID } = useLocalSearchParams();
    const [activeSetIndex, setActiveSetIndex] = useState(0);
    const [completedRepsForIndex, setCompletedRepsForIndex] = useState(new Map<number, number>());

    //TODO : Load those from the server
    const workoutModel = DEMO_WORKOUTS.find((item) => item.id === workoutID);
    if (!workoutModel) return <View><Text>Workout not found</Text></View>;

    const currentExercise = workoutModel.exercises[0][0];

    const showExitDialog = useCallback(() => {
        Alert.alert("Exit", "Are you sure you want to exit?", [
            { text: "No", style: "cancel" },
            { text: "Yes", onPress: () => router.back() }
        ], { cancelable: false });
    }, [router]);

    useLayoutEffect(() => {
        navigation.setOptions({
            title: 'Workout',
            headerLeft: () => <HeaderIcon name="close" onPress={showExitDialog} />,
            headerRight: () => <HeaderIcon name="list" onPress={showExitDialog} />,
        });
    }, [navigation, showExitDialog]);

    const setNextActiveIndex = (index: number) => {
        if (completedRepsForIndex.size === currentExercise.sets.length - 1) {
            showExitDialog();
            return;
        }

        let nextIndex = index + 1;
        while (completedRepsForIndex.has(nextIndex)) {
            nextIndex = nextIndex >= currentExercise.sets.length ? 0 : nextIndex + 1;
        }

        setActiveSetIndex(nextIndex);
    };

    const handleSetCompletion = (index: number, completedReps: number) => {
        const updatedCompletedRepsForIndex = new Map(completedRepsForIndex);
        updatedCompletedRepsForIndex.set(index, completedReps);
        setCompletedRepsForIndex(updatedCompletedRepsForIndex);
        setNextActiveIndex(index);
    };

    const handleSetReactivation = (index: number) => {
        const updatedCompletedRepsForIndex = new Map(completedRepsForIndex);
        updatedCompletedRepsForIndex.delete(index);
        setCompletedRepsForIndex(updatedCompletedRepsForIndex);
        setActiveSetIndex(index);
    };

    //Go over all exercises in the workout and render their headers
    function renderCompoundExerciseHeader(workout: WorkoutDataModel): React.ReactNode {
        return workout.exercises.map((exercise, index) => (
            <ExerciseHeader key={index} imageUrl={exercise[0].imageUrl} title={exercise[0].name} subtitle={exercise[0].description} />
        ));
    }

    function renderExerciseSet(workout: WorkoutDataModel): React.ReactNode {
        //TODO : need to change data models and make them more atomic.
        //Create an interface for the Active set that will be transformed from the model

        // //create array of exercise sets
        // let exerciseSets:ExerciseSetDataModel[][] = new Array();

        // return workout.exercises.map((exercises, index) => {
        //     //first exercise set
        //     exercises[0].sets

        //     //Render Active Set
        //     exercises.forEach((exercise) => {
        //         exercise.sets
        //     });
            
        //     <ActiveCompoundSet key={index} exercises={exercises} pressHandler={(completedReps) => handleSetCompletion(index, completedReps)} />;
        // }); 
        return currentExercise.sets.map((set, index) => {
            const completedReps = completedRepsForIndex.get(index) || 0;
            if (index === activeSetIndex) {
                return <ActiveCompoundSet key={index} imageUrl={currentExercise.imageUrl} completedReps={completedReps} doneHandler={(completedReps) => handleSetCompletion(index, completedReps)} />;
            } else if (completedRepsForIndex.has(index)) {
                return <FinishedCompoundSet key={index} repsCompleted={completedReps} pressHandler={() => handleSetReactivation(index)} />;
            } else {
                return <NotActiveCompoundSet key={index} suggestedReps={set.reps} pressHandler={() => setActiveSetIndex(index)} />;
            }
        });
    }

    return (
        <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
            <ScrollView contentContainerStyle={styles.scrollView}>
                <View style={styles.container}>
                    {renderCompoundExerciseHeader(workoutModel)}
                    <Separator />
                    {renderExerciseSet(workoutModel)}
                    <View style={styles.finishExerciseBtnContainer}>
                        <Button title="Finish Exercise" onPress={showExitDialog} />
                    </View>
                </View>
            </ScrollView>
        </TouchableWithoutFeedback>
    );
}

const HeaderIcon = ({ name, onPress }) => (
    <Pressable onPress={onPress}>
        {({ pressed }) => (
            <FontAwesome name={name} size={24} color={Colors.light.primary} style={{ opacity: pressed ? 0.5 : 1 }} />
        )}
    </Pressable>
);

const styles = StyleSheet.create({
    scrollView: {
        flex:1,
        flexGrow: 1,
        padding: 5,
    },
    container: {
        // flex: 1, Good for iOS, not good for Android
        flex:1,
        padding: 10,
        borderRadius: 10,
    },
    finishExerciseBtnContainer: {
        marginVertical: 20,
    },
});
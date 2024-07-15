import React, { useCallback, useLayoutEffect, useState } from 'react';
import { StyleSheet, TouchableWithoutFeedback, Keyboard, ScrollView, Alert, Pressable, View, Text, Button } from 'react-native';
import { useNavigation, useRouter, useLocalSearchParams } from "expo-router";
import Colors from '@/constants/Colors';
import { DEMO_WORKOUTS } from '@/constants/Data';
import Separator from '@/components/Separator';
import { FontAwesome } from '@expo/vector-icons';
import ActiveCompoundSet from '@/components/ActiveCompoundSet';
import FinishedCompoundSet from '@/components/FinishedCompoundSet';
import NotActiveCompoundSet from '@/components/NotActiveCompoundSet';
import { WorkoutDataModel } from '@/constants/DataModels';
import ExerciseHeaderCompound from '@/components/ExerciseHeaderCompound';

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
        const distinctExercises = workout.exercises.flatMap(exercises => exercises[0]);
        const models = distinctExercises.map(exercise => ({
            imageUrl: exercise.imageUrl,
            title: exercise.name,
            subtitle: exercise.muscleGroups.join(","),
            equipmentImagesUrls: exercise.equipment.map(equipment => equipment.imageUrl),
        }));

        return (<ExerciseHeaderCompound exerciseHeaderModels={models} />);
    }

    function renderExerciseSet(workout: WorkoutDataModel): React.ReactNode {
        return currentExercise.sets.map((set, index) => {
            const completedReps = completedRepsForIndex.get(index) || 0;
            if (index === activeSetIndex) {
                return <ActiveCompoundSet key={index} 
                onDonePress={(completedReps) => handleSetCompletion(index, completedReps)} 
                sets={currentExercise.sets.map(set => ({ recomendedReps: set.reps, imageUrl: currentExercise.imageUrl }))}
                />;
            } 
            
            // else if (completedRepsForIndex.has(index)) {
            //     return <FinishedCompoundSet key={index} />;
            //     pressHandler={() => handleSetReactivation(index)} />;
            // } else {
            //     return <NotActiveCompoundSet key={index} suggestedReps={set.reps} pressHandler={() => setActiveSetIndex(index)} />;
            // }
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
        flex: 1,
        flexGrow: 1,
        padding: 5,
    },
    container: {
        // flex: 1, Good for iOS, not good for Android
        flex: 1,
        padding: 10,
        borderRadius: 10,
    },
    finishExerciseBtnContainer: {
        marginVertical: 20,
    },
});
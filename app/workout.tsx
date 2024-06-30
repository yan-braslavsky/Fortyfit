import { StyleSheet, TouchableWithoutFeedback, Keyboard, ScrollView } from 'react-native';
import { Text, View } from 'react-native';
import { Button } from 'react-native';
import { useCallback, useLayoutEffect, useState } from 'react';
import { useLocalSearchParams, useNavigation, useRouter } from "expo-router";
import { Alert } from 'react-native';
import React from 'react';
import Colors from '@/constants/Colors';
import { DEMO_WORKOUTS } from '@/constants/Data';
import Separator from '@/components/Separator';
import ExerciseHeader from '@/components/ExerciseHeader';
import { FontAwesome } from '@expo/vector-icons';
import { Pressable } from 'react-native';
import { ExerciseSetDataModel } from '@/constants/DataModels';
import ActiveSingleSet from '@/components/sets/single/ActiveSingleSet';
import FinishedSingleSet from '@/components/sets/single/FinishedSingleSet';
import NotActiveSingleSet from '@/components/sets/single/NotActiveSingleSet';

export default function Workout() {

    const navigation = useNavigation();
    const router = useRouter();
    const params = useLocalSearchParams();
    const { workoutID } = params;
    const [activeSetIndex, setActiveSetIndex] = useState(0);
    const [completedRepsForIndex, setCompletedRepsForIndex] = useState(new Map<number, number>());


    //TODO: Replace with global state
    const workoutModel = DEMO_WORKOUTS.find((item) => item.id === workoutID);
    if (!workoutModel) {
        return (
            <View>
                <Text>Workout not found</Text>
            </View>
        );
    }

    //TODO : check here if the set is single or double
    const isDoubleSet = workoutModel.exercises[0].length == 2 ? true : false;
    console.log(isDoubleSet);


    const currentExercise = workoutModel.exercises[0][0];

    const showExitDialog = useCallback(() => {
        Alert.alert(
            "Exit",
            "Are you sure you want to exit?",
            [
                {
                    text: "No",
                    onPress: () => console.log("No Pressed"),
                    style: "cancel"
                },
                {
                    text: "Yes",
                    onPress: () => router.back(),
                }
            ],
            { cancelable: false }
        );
    }, [router]);


    //Customise the title bar
    useLayoutEffect(() => {
        navigation.setOptions({
            title: 'Workout',
            headerLeft: () => (
                <Pressable onPress={showExitDialog}>
                    {({ pressed }) => (
                        <FontAwesome
                            name="close"
                            size={24}
                            color={Colors.light.primary}
                            style={{ opacity: pressed ? 0.5 : 1 }}
                        />
                    )}
                </Pressable>
            ),
            headerRight: () => (
                <Pressable onPress={showExitDialog}>
                    {({ pressed }) => (
                        <FontAwesome
                            name="list"
                            size={24}
                            color={Colors.light.primary}
                            style={{ opacity: pressed ? 0.5 : 1 }}
                        />
                    )}
                </Pressable>
            ),
        });
    }, [navigation, showExitDialog]);

    function setNextActiveIndex(index: number) {

        //if all sets are completed
        if (completedRepsForIndex.size === currentExercise.sets.length - 1) {
            showExitDialog();
            return;
        }

        let nextIndex = index + 1;


        //find the next index that is not in finishedSetsIndexes
        while (completedRepsForIndex.has(nextIndex)) {
            nextIndex = nextIndex >= currentExercise.sets.length ? 0 : nextIndex + 1;
        }

        setActiveSetIndex(nextIndex);
    }

    return (
        <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
            <ScrollView contentContainerStyle={styles.scrollView} automaticallyAdjustKeyboardInsets={true}>
                <View style={styles.container}>
                    <ExerciseHeader imageUrl={workoutModel.imageUrl} title={currentExercise.name} subtitle={currentExercise.description} />
                    <Separator />

                    {// Render sets


                        currentExercise.sets.map((set: ExerciseSetDataModel, index: number) => {

                            let completedReps = 0;
                            if (index === activeSetIndex) {

                                //In case reopening completed set
                                if (completedRepsForIndex.has(index)) {

                                    //get updated set for index 
                                    const updatedCompletedRepsForIndex = completedRepsForIndex.get(index);
                                    completedReps = updatedCompletedRepsForIndex ? updatedCompletedRepsForIndex : 0;
                                }

                                return <ActiveSingleSet imageUrl={currentExercise.imageUrl} completedReps={completedReps} key={index} pressHandler={(completedReps: number) => {

                                    // Clone and update the completedRepsForIndex map
                                    const updatedCompletedRepsForIndex = new Map(completedRepsForIndex);
                                    updatedCompletedRepsForIndex.set(index, completedReps);

                                    setCompletedRepsForIndex(updatedCompletedRepsForIndex);

                                    //Make set inactive and make the next active
                                    setNextActiveIndex(index);

                                }} />
                            } else if (completedRepsForIndex.has(index)) {
                                completedReps = completedRepsForIndex.get(index) || 0;
                                return <FinishedSingleSet repsCompleted={completedReps} key={index} pressHandler={() => {
                                    //remove the set from completedRepsForIndex
                                    const updatedCompletedRepsForIndex = new Map(completedRepsForIndex);
                                    updatedCompletedRepsForIndex.delete(index);
                                    setCompletedRepsForIndex(updatedCompletedRepsForIndex);
                                    setActiveSetIndex(index)
                                }} />
                            } else {
                                //TODO pass params
                                return <NotActiveSingleSet suggestedReps={set.reps} key={index} pressHandler={() => { setActiveSetIndex(index) }} />
                            }
                        })
                    }

                    <View style={styles.finishExerciseBtnContainer}>
                        <Button title="Finish Exercise" onPress={() => {
                            showExitDialog();
                        }} />
                    </View>

                </View>
            </ScrollView>
        </TouchableWithoutFeedback>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        height: '100%',
        padding: 10,
        borderRadius: 10,
    },
    scrollView: {
        flexGrow: 1,
        padding: 5,
    },
    remainingRepsInfoContainer: {
        alignItems: 'center',
        marginBottom: 10,
    },

    finishExerciseBtnContainer: {
        marginVertical: 20,

    },
    finishExerciseBtn: {
        backgroundColor: Colors.light.primary,
        color: Colors.light.text,
        padding: 10,
        borderRadius: 10,
    },

});
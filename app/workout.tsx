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
import NotActiveSet from '@/components/NotActiveSet';
import ExerciseHeader from '@/components/ExerciseHeader';
import { FontAwesome } from '@expo/vector-icons';
import { Pressable } from 'react-native';
import ActiveSet from '@/components/ActiveSet';
import FinishedSet from '@/components/FinishedSet';
import { ExerciseSetDataModel } from '@/constants/DataModels';


export default function Workout() {

    const navigation = useNavigation();
    const router = useRouter();
    const params = useLocalSearchParams();
    const { workoutID } = params;
    const [activeSetIndex, setActiveSetIndex] = useState(0);
    const numbers: number[] = [];
    // const [finishedSetsIndexes, setFinishedSetsIndexes] = useState(numbers);
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

    const currentExercise = workoutModel.exercises[0];

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
                            size={25}
                            color={Colors.light.text}
                            style={{ marginRight: 15, opacity: pressed ? 0.5 : 1 }}
                        />
                    )}
                </Pressable>
            ),
            headerRight: () => (
                <Pressable onPress={showExitDialog}>
                    {({ pressed }) => (
                        <FontAwesome
                            name="list"
                            size={25}
                            color={Colors.light.text}
                            style={{ marginRight: 15, opacity: pressed ? 0.5 : 1 }}
                        />
                    )}
                </Pressable>
            ),
        });
    }, [navigation, showExitDialog]);

    function setNextActiveIndex(index: number) {

        //if all sets are completed
        if (completedRepsForIndex.size === currentExercise.sets.length-1) {
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
                    <ExerciseHeader imageUrl={workoutModel.imageUrl} title={workoutModel.exercises[0].name} subtitle={workoutModel.exercises[0].description} />
                    <Separator />

                    {// Render sets


                        currentExercise.sets.map((set: ExerciseSetDataModel, index: number) => {

                            let completedReps = 0;
                            if (index === activeSetIndex) {

                                //In case reopening completed set
                                if(completedRepsForIndex.has(index)){

                                    //get updated set for index 
                                    const updatedCompletedRepsForIndex = completedRepsForIndex.get(index);
                                    completedReps = updatedCompletedRepsForIndex ? updatedCompletedRepsForIndex : 0;
                                }

                                return <ActiveSet completedReps={completedReps} key={index} pressHandler={(completedReps: number) => {

                                    // Clone and update the completedRepsForIndex map
                                    const updatedCompletedRepsForIndex = new Map(completedRepsForIndex);
                                    updatedCompletedRepsForIndex.set(index, completedReps);

                                    setCompletedRepsForIndex(updatedCompletedRepsForIndex);

                                    //Make set inactive and make the next active
                                    setNextActiveIndex(index);

                                }} />
                            } else if (completedRepsForIndex.has(index)) {
                                completedReps = completedRepsForIndex.get(index) || 0;
                                return <FinishedSet repsCompleted={completedReps} key={index} pressHandler={() => { setActiveSetIndex(index) }} />
                            } else {
                                //TODO pass params
                                return <NotActiveSet suggestedReps={set.reps} key={index} pressHandler={() => { setActiveSetIndex(index) }} />
                            }
                        })
                    }

                    <View style={styles.finishExerciseBtn}>
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
        backgroundColor: Colors.light.background,
    },
    scrollView: {
        flexGrow: 1,
    },
    remainingRepsInfoContainer: {
        alignItems: 'center',
        marginBottom: 10,
    },

    finishExerciseBtn: {
        marginVertical: 20,
    }
});
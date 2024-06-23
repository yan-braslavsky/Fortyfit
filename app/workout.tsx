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


export default function Workout() {

    const navigation = useNavigation();
    const router = useRouter();
    const params = useLocalSearchParams();
    const { workoutID } = params;


    //TODO: Replace with global state
    const item = DEMO_WORKOUTS.find((item) => item.id === workoutID);
    if (!item) {
        return (
            <View>
                <Text>Workout not found</Text>
            </View>
        );
    }

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

    return (
        <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
            <ScrollView contentContainerStyle={styles.scrollView}>
                <View style={styles.container}>
                    <ExerciseHeader imageUrl={item.imageUrl} title={item.exercises[0].name} subtitle={item.exercises[0].description} />
                    <Separator />

                    <FinishedSet pressHandler={() => { Alert.alert('pressed') }} />

                    {/* Active Set Section */}
                    <ActiveSet />

                    {/* Remaining sets info */}
                    <View style={styles.remainingRepsInfoContainer}>
                        <Text style={styles.remainingRepsInfoText}>Remaining Sets</Text>
                    </View>

                    {Array.from({ length: 3 }, (_, i) => i + 1).map((_, index) => (
                        <NotActiveSet key={index} pressHandler={() => { Alert.alert('pressed index ' + index) }} />
                    ))}


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
    remainingRepsInfoText: {
        color: Colors.light.secondary,
        fontSize: 14,
    },
    finishExerciseBtn: {
        marginVertical: 20,
    }
});
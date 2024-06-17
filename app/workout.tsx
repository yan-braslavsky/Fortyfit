import { ScrollView, StyleSheet, Image } from 'react-native';
import { Text, View } from '@/components/Themed';
import { Button } from 'react-native';
import { useCallback, useLayoutEffect } from 'react';
import { useLocalSearchParams, useNavigation, useRouter } from "expo-router";
import { Alert } from 'react-native';
import React from 'react';
import { WorkoutDataModel } from '@/constants/DataModels';
import Colors from '@/constants/Colors';
import { DEMO_WORKOUTS } from '@/constants/Data';


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
                <Button
                    onPress={showExitDialog}
                    title="Exit"
                    color="#000"
                />
            ),
            headerRight: () => (
                <Button
                    onPress={() => alert('Exercises button pressed')}
                    title="Exercises"
                    color="#000"
                />
            ),
        });
    }, [navigation, showExitDialog]);

    return (
        <ScrollView style={styles.container}>

            {/* Exercise Information Section */}
            <View style={styles.exerciseInfo}>
                <Image source={{ uri: item.imageUrl }} style={{ width: 50, height: 50 }} />
                <View style={styles.exerciseTitleContainer}>
                    <Text style={styles.exerciseTitle}>Smith Machine Incline Bench Press</Text>
                    <Text style={styles.exerciseSubtitle}>Aim for 25 reps each set</Text>
                    <View />
                </View>
            </View>

            <View style={styles.separator} lightColor="#eee" darkColor="rgba(255,255,255,0.1)" />

            <View style={styles.suggestions}>
                <View style={styles.suggestionItem}>
                    <Text style={styles.suggestionText}>Suggested</Text>
                    <Text style={styles.weightText}>25 kg</Text>
                    <Text style={styles.smallText}>(Last 40)</Text>
                </View>
                <View style={styles.suggestionItem}>
                    <Text style={styles.suggestionText}>10-12 reps</Text>
                    <Text style={styles.smallText}>(Last 12)</Text>
                </View>
                <View style={styles.suggestionItemHighlight}>
                    <Text style={styles.didItText}>Did It</Text>
                </View>
            </View>

            <View style={styles.platesInfo}>
                <Text style={styles.platesText}>Plates only, without bar weight</Text>
            </View>

            {[1, 2, 3].map((_, index) => (
                <View key={index} style={styles.suggestedSet}>
                    <Text style={styles.suggestedSetText}>Suggested</Text>
                    <Text style={styles.setWeight}>25 kg</Text>
                    <Text style={styles.setReps}>10-12 reps</Text>
                    <Text style={styles.setSmallText}>(Last 12)</Text>
                </View>
            ))}

            <View style={styles.logButton}>
                <Button title="Finish Exercise" onPress={() => {
                    showExitDialog();
                }} />
            </View>
        </ScrollView>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        padding: 10,
        backgroundColor: Colors.light.background,
    },
    exerciseInfo: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        // backgroundColor: Colors.light.card,
        // borderRadius: 10,
        // borderWidth: 1,
        padding: 10,
        // borderColor: Colors.light.border,
    },
    exerciseTitleContainer: {
        flexDirection: 'column',
    },
    exerciseTitle: {
        color: Colors.light.primary,
        fontSize: 18,
    },
    exerciseSubtitle: {
        color: Colors.light.text,
        fontSize: 12,
    },
    suggestions: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        backgroundColor: '#2c2c2e',
        padding: 10,
        borderRadius: 10,
        marginBottom: 10,
    },
    suggestionItem: {
        alignItems: 'center',
    },
    suggestionText: {
        color: '#ffcc00',
        fontSize: 14,
    },
    weightText: {
        color: '#fff',
        fontSize: 22,
    },
    smallText: {
        color: '#a1a1a1',
        fontSize: 12,
    },
    suggestionItemHighlight: {
        backgroundColor: '#ffcc00',
        padding: 10,
        borderRadius: 10,
    },
    didItText: {
        color: '#000',
        fontSize: 16,
    },
    platesInfo: {
        alignItems: 'center',
        marginBottom: 10,
    },
    platesText: {
        color: '#ffcc00',
        fontSize: 14,
    },
    suggestedSet: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        backgroundColor: '#2c2c2e',
        padding: 10,
        borderRadius: 10,
        marginBottom: 10,
    },
    suggestedSetText: {
        color: '#fff',
        fontSize: 14,
    },
    setWeight: {
        color: '#fff',
        fontSize: 22,
    },
    setReps: {
        color: '#fff',
        fontSize: 14,
    },
    setSmallText: {
        color: '#a1a1a1',
        fontSize: 12,
    },
    logButton: {
        marginVertical: 20,
    },
    separator: {
        marginVertical: 30,
        height: 1,
        width: '100%',
    }
});
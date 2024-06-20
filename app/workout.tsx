import { ScrollView, StyleSheet, Image, TextInput, Pressable } from 'react-native';
import { Text, View } from 'react-native';
import { Button } from 'react-native';
import { useCallback, useLayoutEffect, useState } from 'react';
import { useLocalSearchParams, useNavigation, useRouter } from "expo-router";
import { Alert } from 'react-native';
import React from 'react';
import Colors from '@/constants/Colors';
import { DEMO_WORKOUTS } from '@/constants/Data';
import Separator, {SeparatorType} from '@/components/Separator';


export default function Workout() {
    const [activeSetRepsInput, setActiveSetRepsInput] = useState('25');
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

            <Separator />

            {/* Active Set Section */}
            <View style={styles.activeSetSectionContainer}>
                <View style={styles.activeRepsInputContainer}>
                    <Text style={styles.suggestionText}>Reps</Text>
                    <TextInput style={styles.weightText} onChangeText={setActiveSetRepsInput}
                        value={activeSetRepsInput}
                        placeholder="25kg"
                        keyboardType="numeric" />
                </View>
                <Separator type={SeparatorType.Vertical}/>
                <View style={styles.activeRepsInputContainer}>
                    <Text style={styles.suggestionText}>10-12 reps</Text>
                    <Text style={styles.smallText}>(Last 12)</Text>
                </View>
                <Separator type={SeparatorType.Vertical}/>

                <Pressable onPress={() => alert('Done button pressed')}
                    style={(state) =>
                        state.pressed
                            ? [styles.suggestionItemHighlight, styles.doneBtnPressed]
                            : styles.suggestionItemHighlight
                    }
                >
                    <Text style={styles.doneBtn}>DONE</Text>
                </Pressable>
            </View>


            {/* Rest of exercises text */}
            <View style={styles.remainingRepsInfoContainer}>
                <Text style={styles.remainingRepsInfoText}>Remaining Sets</Text>
            </View>

            {[1, 2, 3].map((_, index) => (
                <View key={index} style={styles.suggestedSet}>
                    <Text style={styles.suggestedSetText}>Suggested</Text>
                    <Text style={styles.setWeight}>15 reps</Text>
                    <Separator type={SeparatorType.Vertical}/>
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
        padding: 10,
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
    activeSetSectionContainer: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        backgroundColor: Colors.light.card,
        padding: 10,
        borderRadius: 10,
        borderWidth: 1,
        borderColor: Colors.light.border,
        marginBottom: 10,
        height: '40%',
    },
    activeRepsInputContainer: {
        backgroundColor: 'transparent',
        alignItems: 'center',
    },
    suggestionText: {
        color: Colors.light.tabIconDefault,
        fontSize: 14,
    },
    weightText: {
        color: Colors.light.text,
        backfaceVisibility: 'hidden',
        backgroundColor: 'transparent',
        fontSize: 24,
    },
    smallText: {
        color: Colors.light.smallText,
        fontSize: 12,
    },
    suggestionItemHighlight: {
        backgroundColor: Colors.light.secondary,
        padding: 10,
        borderRadius: 10,
    },
    doneBtn: {
        color: Colors.light.text,
    },
    doneBtnPressed: {
        opacity: 0.5,
    },
    remainingRepsInfoContainer: {
        alignItems: 'center',
        marginBottom: 10,
    },
    remainingRepsInfoText: {
        color: Colors.light.secondary,
        fontSize: 14,
    },
    suggestedSet: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        backgroundColor: Colors.light.backgroundColorHard,
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

});
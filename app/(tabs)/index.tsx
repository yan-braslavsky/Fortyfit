import { Stack, useNavigation } from 'expo-router';
import { Text, View, TouchableWithoutFeedback, Keyboard, ScrollView } from 'react-native';
import React, { useEffect } from 'react';
import ActiveCompoundSet from '@/components/ActiveCompoundSet';
import ActiveCompoundSetModel from '@/models/ActiveCompoundSetModel';
import NotActiveCompoundSet from '@/components/NotActiveCompoundSet';
import FinishedCompoundSet from '@/components/FinishedCompoundSet';
import ExerciseHeader from '@/components/ExerciseHeader';
import Colors from '@/constants/Colors';

export default function Test() {
    const navigation = useNavigation();

    const squatImageUrl = "https://w7.pngwing.com/pngs/489/476/png-transparent-exercise-streaching-legs-gym-fitness-workout-activity-glyph-icon-thumbnail.png";
    const pushupImageUrl = "https://w7.pngwing.com/pngs/381/172/png-transparent-computer-icons-push-up-exercise-others.png";
    const pullUpImageUrl = "https://www.shutterstock.com/shutterstock/photos/1517740955/display_1500/stock-vector-a-sport-man-taking-physical-activity-street-workout-training-1517740955.jpg";

    const voleyBallImageUrl = "https://pngimg.com/d/volleyball_PNG51.png";
    const gymnasticRingsImageUrl = "https://cdn-icons-png.flaticon.com/512/1545/1545659.png";
    const resistanceBandsImageUrl = "https://static.thenounproject.com/png/2491861-200.png";

    useEffect(() => {
        navigation.setOptions({ headerShown: false });
    }, [navigation]);

    const sets: ActiveCompoundSetModel[] = [
        {
            completedReps: 10,
            recomendedReps: 12,
            imageUrl: squatImageUrl
        },
        {
            completedReps: 8,
            recomendedReps: 10,
            imageUrl: pushupImageUrl
        },
        {
            recomendedReps: 15,
            imageUrl: pullUpImageUrl
        }
    ];

    return (
        <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
            <ScrollView style={{
                flex: 1,
                flexGrow: 1,
                padding: 5,
                marginVertical: 20,
                marginTop: 80,
            }}>
                <View style={{
                    flex: 1,
                    justifyContent: 'center',
                }}>


                    <View style={{
                        borderWidth: 1,
                        borderColor: Colors.light.text,
                        borderRadius: 10,
                        margin: 10,
                        padding: 5
                    }}>
                        <ExerciseHeader
                            imageUrl={pullUpImageUrl}
                            title="Pull Up"
                            subtitle="Back, Biceps"
                            equipmentImagesUrls={[voleyBallImageUrl, gymnasticRingsImageUrl, resistanceBandsImageUrl]}
                        />
                        <ExerciseHeader
                            imageUrl={pushupImageUrl}
                            title="Push Up"
                            subtitle="Chest, Triceps"

                        />
                        <ExerciseHeader
                            imageUrl={squatImageUrl}
                            title="Squat"
                            subtitle="Legs, Glutes"
                            equipmentImagesUrls={[resistanceBandsImageUrl]}
                        />
                    </View>

                    <ActiveCompoundSet key="demoKey"
                        style={{ margin: 10 }}
                        onDonePress={(completedSets) => {
                            //Just print the results for now
                            const completedRepsArray = completedSets.map(set => set.completedReps);
                            console.log('Completed sets:', completedRepsArray.join(', ').toString());
                        }
                        }
                        sets={sets}
                    />

                    <NotActiveCompoundSet
                        style={{ margin: 10 }}
                        pressHandler={() => console.log('Pressed')}
                        numberOfExercises={3}
                        suggestedRepsRange={{ min: 8, max: 12 }}
                        equipmentImagesUrls={[voleyBallImageUrl, gymnasticRingsImageUrl, resistanceBandsImageUrl]}
                    />

                    <FinishedCompoundSet
                        style={{ margin: 10 }}
                        pressHandler={() => console.log('Pressed')}
                        repsCompleted={[10, 12, 8]}
                    />
                </View>
            </ScrollView>
        </TouchableWithoutFeedback>
    );
}
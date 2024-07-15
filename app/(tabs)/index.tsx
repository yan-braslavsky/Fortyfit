import { useNavigation } from 'expo-router';
import { Text, View, TouchableWithoutFeedback, Keyboard, ScrollView } from 'react-native';
import React, { useEffect } from 'react';
import ActiveCompoundSet from '@/components/ActiveCompoundSet';
import NotActiveCompoundSet from '@/components/NotActiveCompoundSet';
import FinishedCompoundSet from '@/components/FinishedCompoundSet';
import Colors from '@/constants/Colors';
import ExerciseHeaderCompound from '@/components/ExerciseHeaderCompound';
import SingleSetModel from '@/models/CompoundSetModel';
import { voleyBallImageUrl, gymnasticRingsImageUrl, resistanceBandsImageUrl, squatImageUrl, pushupImageUrl, pullUpImageUrl } from '@/constants/DemoImageUrls';
import { generateRandomId } from '@/constants/Utilities';


export default function Test() {
    const navigation = useNavigation();

    useEffect(() => {
        navigation.setOptions({ headerShown: false });
    }, [navigation]);

    const sets: SingleSetModel[] = [
        {
            id: generateRandomId(),
            completedReps: 10,
            recomendedRepsRange: { min: 8, max: 12 },
            imageUrl: squatImageUrl
        },
        {
            id: generateRandomId(),
            completedReps: 8,
            recomendedRepsRange: { min: 8, max: 10 },
            imageUrl: pushupImageUrl
        },
        {
            id: generateRandomId(),
            recomendedRepsRange: { min: 8, max: 15 },
            imageUrl: pullUpImageUrl
        }
    ];

    const demoExerciseHeaderModels = [
        {
            imageUrl: squatImageUrl,
            title: 'Squat',
            subtitle: 'Legs',
            equipmentImagesUrls: [voleyBallImageUrl, gymnasticRingsImageUrl, resistanceBandsImageUrl]
        },
        {
            imageUrl: pushupImageUrl,
            title: 'Pushup',
            subtitle: 'Chest',
            equipmentImagesUrls: [voleyBallImageUrl, gymnasticRingsImageUrl, resistanceBandsImageUrl]
        },
        {
            imageUrl: pullUpImageUrl,
            title: 'Pull Up',
            subtitle: 'Back',
            equipmentImagesUrls: [voleyBallImageUrl, gymnasticRingsImageUrl, resistanceBandsImageUrl]
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
                    <Text style={{
                        textAlign: 'center',
                        fontSize: 24,
                        color: Colors.light.primary,
                    }}>Test</Text>


                    <View style={{
                        flex: 1,
                        justifyContent: 'center',
                    }}>

                        <ExerciseHeaderCompound
                            exerciseHeaderModels={demoExerciseHeaderModels}
                        />

                    </View>

                    <ActiveCompoundSet key="demoKey"
                        id={generateRandomId()}
                        style={{ margin: 10 }}
                        onDonePress={(id,completedSets) => {
                            //Just print the results for now
                            const completedRepsArray = completedSets.map(set => set.completedReps);
                            console.log('Completed sets:', completedRepsArray.join(', ').toString());
                        }
                        }
                        sets={sets}
                    />

                    <NotActiveCompoundSet
                        id={generateRandomId()}
                        style={{ margin: 10 }}
                        pressHandler={() => console.log('Pressed')}
                        numberOfExercises={3}
                        suggestedRepsRange={{ min: 8, max: 12 }}
                        equipmentImagesUrls={[voleyBallImageUrl, gymnasticRingsImageUrl, resistanceBandsImageUrl]}
                    />

                    <FinishedCompoundSet
                        id={generateRandomId()}
                        style={{ margin: 10 }}
                        pressHandler={() => console.log('Pressed')}
                        repsCompleted={[10, 12, 8]}
                    />
                </View>
            </ScrollView>
        </TouchableWithoutFeedback >
    );
}
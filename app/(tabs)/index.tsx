import { Stack, useNavigation } from 'expo-router';
import { Text, View } from 'react-native';
import React, { useEffect } from 'react';
import ActiveCompoundSet from '@/components/ActiveCompoundSet';
import ActiveSingleSetRow from '@/components/ActiveSingleSetRow';
import ActiveCompoundSetModel from '@/models/ActiveCompoundSetModel';
import NotActiveCompoundSet from '@/components/NotActiveCompoundSet';
import FinishedCompoundSet from '@/components/FinishedCompoundSet';

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
        <View style={{
            flex: 1,
            justifyContent: 'center',
        }}>
            {/* <ActiveSingleSetRow 
            
            imageUrl="https://www.shutterstock.com/shutterstock/photos/1517740955/display_1500/stock-vector-a-sport-man-taking-physical-activity-street-workout-training-1517740955.jpg"
            // activeSetRepsInputValue="5"
            activeSetRepsPlaceholderValue="7"
            onRepsChange={(reps) => console.log(reps)}

            /> */}

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
    );
}
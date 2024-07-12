import { Stack, useNavigation } from 'expo-router';
import { Text, View } from 'react-native';
import { useEffect } from 'react';
import ActiveCompoundSet from '@/components/ActiveCompoundSet';
import ActiveSingleSetRow from '@/components/ActiveSingleSetRow';
import ActiveCompoundSetModel from '@/models/ActiveCompoundSetModel';

export default function Test() {
    const navigation = useNavigation();

    const squatImageUrl = "https://w7.pngwing.com/pngs/489/476/png-transparent-exercise-streaching-legs-gym-fitness-workout-activity-glyph-icon-thumbnail.png";
    const pushupImageUrl = "https://w7.pngwing.com/pngs/381/172/png-transparent-computer-icons-push-up-exercise-others.png";
    const pullUpImageUrl = "https://www.shutterstock.com/shutterstock/photos/1517740955/display_1500/stock-vector-a-sport-man-taking-physical-activity-street-workout-training-1517740955.jpg";


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
        },
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
                onDonePress={(completedSets) => {
                    //Just print the results for now
                    const completedRepsArray = completedSets.map(set => set.completedReps);
                    console.log('Completed sets:', completedRepsArray.join(', ').toString());
                }
                }
                sets={sets}
            />
        </View>
    );
}
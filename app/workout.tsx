import React, { useCallback, useEffect, useLayoutEffect, useState } from 'react';
import { StyleSheet, TouchableWithoutFeedback, Keyboard, ScrollView, Alert, Pressable, View, Text, Button } from 'react-native';
import { useNavigation, useRouter, useLocalSearchParams } from "expo-router";
import Colors from '@/constants/Colors';
import Separator from '@/components/Separator';
import { FontAwesome } from '@expo/vector-icons';
import ActiveCompoundSet from '@/components/ActiveCompoundSet';
import ExerciseHeaderCompound from '@/components/ExerciseHeaderCompound';
import ExerciseHeaderModel from '@/models/ExerciseHeaderModel';
import { getRandomImage } from '@/constants/DemoImageUrls';
import { generateRandomId } from '@/constants/Utilities';
import FinishedCompoundSet from '@/components/FinishedCompoundSet';
import NotActiveCompoundSet from '@/components/NotActiveCompoundSet';
import SingleSetModel from '@/models/SingleSetModel';

enum ExerciseStatus {
    Active,
    Finished,
    NotActive
}

interface CompoundSet {
    id: string;
    singleSets: SingleSetModel[]
    status: ExerciseStatus
}

interface WorkoutModel {
    workoutID: string;
    exerciseHeaderModels: ExerciseHeaderModel[]
    compoundSets: CompoundSet[]
}

function generateRandomCompoundSet(): CompoundSet {
    return {
        id: generateRandomId(),
        singleSets: [
            {
                id: generateRandomId(),
                recomendedRepsRange: { min: 6, max: 8 },
                imageUrl: getRandomImage()
            },
            {
                id: generateRandomId(),
                recomendedRepsRange: { min: 8, max: 10 },
                imageUrl: getRandomImage()
            },
            {
                id: generateRandomId(),
                recomendedRepsRange: { min: 10, max: 15 },
                imageUrl: getRandomImage()
            }
        ],
        status: ExerciseStatus.NotActive
    }
}

function generateDemoWorkoutModel(): WorkoutModel {
    return {
        workoutID: generateRandomId(),
        exerciseHeaderModels: [
            {
                imageUrl: getRandomImage(),
                title: 'Squat',
                subtitle: 'Legs',
                equipmentImagesUrls: [getRandomImage(), getRandomImage()]
            },
            {
                imageUrl: getRandomImage(),
                title: 'Pushup',
                subtitle: 'Chest',
                equipmentImagesUrls: [getRandomImage(), getRandomImage(), getRandomImage()]
            },
            {
                imageUrl: getRandomImage(),
                title: 'Pull Up',
                subtitle: 'Back',
                equipmentImagesUrls: []
            }
        ],
        compoundSets: [
            generateRandomCompoundSet(),
            generateRandomCompoundSet(),
            generateRandomCompoundSet(),
        ]
    }
}


export default function Workout() {
    const navigation = useNavigation();
    const router = useRouter();
    const { workoutID } = useLocalSearchParams();
    //TODO : use file base routing params for that
    // console.log("Id of the selected workout " + workoutID);


    //Handle initial state and data
    const workoutModel = React.useMemo(() => generateDemoWorkoutModel(), []);
    const [activeCompoundSetId, setActiveCompoundSetId] = useState(null as string | null);

    useEffect(() => {
        //TODO : Implement this
        handleSetActivation(workoutModel.compoundSets[0].id);
    }
    , []);

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

    const setNextActiveExercise = () => {
        //Go over all sets and find the first one that is not finished
        const nextActiveSet = workoutModel.compoundSets.find(set => set.status === ExerciseStatus.NotActive);
        if (!nextActiveSet) {
            //If there are no more exercises, go back
            showExitDialog();
            //TODO : Update the results in Data Base and navigate to the next workout
            return;
        }

        handleSetActivation(nextActiveSet.id);
    };

    const handleSetCompletion = (id: string, completedSets: SingleSetModel[]) => {
        //find clicked set and update the completed sets with their reps
        const completedSet = findSetById(id)!;
        completedSet.singleSets = completedSets;
        completedSet.status = ExerciseStatus.Finished;
        setNextActiveExercise();
    };

    const handleSetActivation = (id: string) => {
        //find current and clicked sets
        const currentActiveSet = findSetById(activeCompoundSetId!);
        const nextActiveSet = findSetById(id)!;

        //change current active to non active and next to active
        if (currentActiveSet) {
            currentActiveSet.status = ExerciseStatus.Finished;
        }
        nextActiveSet.status = ExerciseStatus.Active;

        //update state to trigger re-render
        setActiveCompoundSetId(id);
    };


    function findSetById(id: string) {
        return workoutModel.compoundSets.find(set => set.id === id);
    }

    function renderActiveExercise(compoundSet: CompoundSet): React.ReactNode {
        return (
            <ActiveCompoundSet
                key={compoundSet.id}
                id={compoundSet.id}
                sets={compoundSet.singleSets}
                onDonePress={handleSetCompletion}
            />
        )
    }

    function renderFinishedExercise(compoundSet: CompoundSet): React.ReactNode {
        return (
            <FinishedCompoundSet
                key={compoundSet.id}
                id={compoundSet.id}
                pressHandler={handleSetActivation}
                repsCompleted={compoundSet.singleSets.map(set => set.completedReps || 0)}
            />
        )
    }

    function renderNotActiveExercise(compoundSet: CompoundSet): React.ReactNode {
        const minRepRange = compoundSet.singleSets.reduce((min, set) => Math.min(min, set.recomendedRepsRange.min), 100);
        const maxRepRange = compoundSet.singleSets.reduce((max, set) => Math.max(max, set.recomendedRepsRange.max), 0);
        return (
            <NotActiveCompoundSet
                key={compoundSet.id}
                id={compoundSet.id}
                pressHandler={handleSetActivation}
                numberOfExercises={compoundSet.singleSets.length}
                suggestedRepsRange={{ min: minRepRange, max: maxRepRange }}

            />
        )
    }

    function renderExercises(workout: WorkoutModel): React.ReactNode {
        return workout.compoundSets.map((compoundSet) => {
            switch (compoundSet.status) {
                case ExerciseStatus.Active:
                    return renderActiveExercise(compoundSet);
                case ExerciseStatus.Finished:
                    return renderFinishedExercise(compoundSet);
                case ExerciseStatus.NotActive:
                    return renderNotActiveExercise(compoundSet);
                default:
                    return null;
            }
        })
    }

    return (
        <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
            <ScrollView contentContainerStyle={styles.scrollView}>
                <View style={styles.container}>
                    <ExerciseHeaderCompound exerciseHeaderModels={workoutModel.exerciseHeaderModels} />
                    <Separator />
                    <View style={styles.exercisesContainer}>
                        {renderExercises(workoutModel)}
                    </View>
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
        flexGrow: 1,
        padding: 5,
    },
    container: {
        // flex: 1, Good for iOS, not good for Android
        flex: 1,
        padding: 10,
        borderRadius: 10,
    },
    exercisesContainer: {
        flex: 1,
        flexDirection: 'column',
    },
    finishExerciseBtnContainer: {
        marginVertical: 20,
    },
});
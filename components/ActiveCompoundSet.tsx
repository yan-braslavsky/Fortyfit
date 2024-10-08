// src/components/ActiveCompoundSet.tsx

import React from 'react';
import { StyleSheet, View, ViewStyle } from 'react-native';
import SingleSetModel from '@/models/SingleSetModel';
import DoneBtn from '@/components/DoneBtn';
import Separator from '@/components/Separator';
import ActiveSingleSetRow from './ActiveSingleSetRow';
import Colors from '@/constants/Colors';
import { useActiveCompoundSetViewModel } from '@/viewmodels/ActiveCompoundSetViewModel';

interface ActiveCompoundSetProps {
    id: string;
    onDonePress?: (id: string, completedSets: SingleSetModel[]) => void;
    sets: SingleSetModel[];
    style?: ViewStyle
}

const ActiveCompoundSet: React.FC<ActiveCompoundSetProps> = ({ id, onDonePress, sets, style }) => {
    const viewModel = useActiveCompoundSetViewModel({
        sets: sets, 
        doneHandler: (completedSets: SingleSetModel[]) => {
            if (onDonePress) {
                onDonePress(id, completedSets);
            }
        }
    });

    return (
        <View style={[styles.container, style]}>
            <View style={styles.rowsContainer}>
                {sets.map((set: SingleSetModel, index: number) => (
                    <View key={index + 50}>
                        {(index > 0) && <Separator style={{ marginVertical: 15 }} />}
                        <ActiveSingleSetRow
                            activeSetRepsPlaceholderValue={set.recomendedRepsRange.max.toString()}
                            activeSetRepsInputValue={set.completedReps?.toString()}
                            imageUrl={set.imageUrl}
                            onRepsChange={(reps) => viewModel.repsChangeForSet(reps, set)}
                        />
                    </View>
                ))}
            </View>
            <View style={styles.doneBtnContainer}>
                <DoneBtn pressHandler={viewModel.handleDonePress} style={styles.doneBtn} />
            </View>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        backgroundColor: Colors.light.card,
        padding: 10,
        borderRadius: 10,
        borderWidth: 1,
        borderColor: Colors.light.background,
    },
    rowsContainer: {
        flex: 1,
        flexDirection: 'column',
    },
    doneBtnContainer: {
        width: '30%',
        // height: '100%',
        aspectRatio: 0.5,
        justifyContent: 'center',
        alignItems: 'center',
        marginLeft: 10,
    },
    doneBtn: {
        width: '90%',
        height: '90%',
    },
});

export default ActiveCompoundSet;
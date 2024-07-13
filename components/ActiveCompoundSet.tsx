import React from 'react';
import { useActiveCompoundSetViewModel } from '@/viewmodels/ActiveCompoundSetViewModel';
import ActiveCompoundSetModel from '@/models/ActiveCompoundSetModel';
import { StyleSheet, View } from 'react-native';
import DoneBtn from '@/components/DoneBtn';
import Separator from '@/components/Separator';
import Colors from '@/constants/Colors';
import { SeparatorType } from '@/components/Separator';
import ActiveSingleSetRow from './ActiveSingleSetRow';
import { ViewStyle } from 'react-native';

interface ActiveCompoundSetProps {
    onDonePress?: (completedSets: ActiveCompoundSetModel[]) => void;
    sets: ActiveCompoundSetModel[];
    style?: ViewStyle
}

const ActiveCompoundSet: React.FC<ActiveCompoundSetProps> = ({ onDonePress, sets, style }) => {

    const viewModel = useActiveCompoundSetViewModel({ sets: sets, doneHandler: onDonePress });

    return (
        <View style={[styles.container,style]}>
            <View style={styles.rowsContainer}>
                {sets.map(function (set: ActiveCompoundSetModel, index: number) {
                    return (
                        <View key={index + 50}>
                            {(index > 0) && <Separator type={SeparatorType.Horizontal} style={{ marginHorizontal: 0, marginVertical: 15 }} />}
                            <ActiveSingleSetRow
                                activeSetRepsPlaceholderValue={set.recomendedReps.toString()}
                                activeSetRepsInputValue={set.completedReps?.toString()}
                                imageUrl={set.imageUrl}
                                onRepsChange={(reps) => viewModel.repsChangeForSet(reps, set)}
                            />
                        </View>
                    );
                })}
            </View>
            <Separator type={SeparatorType.Vertical} />
            <DoneBtn pressHandler={viewModel.handleDonePress} />
        </View>
    );
}

export default ActiveCompoundSet;

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
        height: 'auto',
    },
    rowsContainer: {
        flex: 1,
        flexDirection: 'column',
    }
});
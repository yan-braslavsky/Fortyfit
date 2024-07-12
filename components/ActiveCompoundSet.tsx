import React from 'react';
import { useActiveCompoundSetViewModel } from '@/viewmodels/ActiveCompoundSetViewModel';
import ActiveCompoundSetModel from '@/models/ActiveCompoundSetModel';
import { StyleSheet, View } from 'react-native';
import DoneBtn from '@/components/DoneBtn';
import Separator from '@/components/Separator';
import Colors from '@/constants/Colors';
import { SeparatorType } from '@/components/Separator';
import ActiveSingleSetRow from './ActiveSingleSetRow';

interface ActiveCompoundSetProps {
    onDonePress?: (completedSets: ActiveCompoundSetModel[]) => void;
    sets: ActiveCompoundSetModel[];
}

const ActiveCompoundSet: React.FC<ActiveCompoundSetProps> = ({ onDonePress, sets }) => {

    const viewModel = useActiveCompoundSetViewModel({ sets: sets, doneHandler: onDonePress });

    return (
        <View style={styles.container}>
            <View style={styles.rowsContainer}>
                {sets.map((set: ActiveCompoundSetModel, index: number) => (
                    <ActiveSingleSetRow key={index}
                        activeSetRepsPlaceholderValue={set.recomendedReps.toString()}
                        activeSetRepsInputValue={set.completedReps?.toString()}
                        imageUrl={set.imageUrl}
                        onRepsChange={(reps) => viewModel.repsChangeForSet(reps, set)}
                    />
                ))}
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
        marginBottom: 10,
        height: 'auto',
    },
    rowsContainer: {
        flex: 1,
        flexDirection: 'column',
    }
});
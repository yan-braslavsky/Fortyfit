import React from 'react';
import ActiveCompoundSetView from './ActiveCompoundSetView';
import { useActiveCompoundSetViewModel } from '@/viewmodels/ActiveCompoundSetViewModel';

interface ActiveCompoundSetProps {
    pressHandler?: (completedReps: number) => void;
    completedReps: number;
    imageUrl: string;
}

const ActiveCompoundSet: React.FC<ActiveCompoundSetProps> = ({ pressHandler, completedReps, imageUrl }) => {
    const viewModel = useActiveCompoundSetViewModel(completedReps);

    const handleDone = () => viewModel.handleDonePress(pressHandler);

    return (
        <ActiveCompoundSetView
            activeSetRepsInput={viewModel.activeSetRepsInput}
            imageUrl={imageUrl}
            onRepsChange={viewModel.handleRepsInputChange}
            onDonePress={handleDone}
        />
    );
}

export default ActiveCompoundSet;
import { useState } from 'react';

export function useActiveCompoundSetViewModel(initialReps: number) {
    const [activeSetRepsInput, setActiveSetRepsInput] = useState('');
    const [completedReps, setCompletedReps] = useState(initialReps);

    function handleRepsInputChange(reps: string) {
        setActiveSetRepsInput(reps);
    }

    function handleDonePress(pressHandler?: (completedReps: number) => void) {
        if (pressHandler) {
            pressHandler(parseInt(activeSetRepsInput, 10));
        }
        setCompletedReps(parseInt(activeSetRepsInput, 10));
    }

    return {
        activeSetRepsInput,
        completedReps,
        handleRepsInputChange,
        handleDonePress
    };
}

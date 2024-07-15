import CompoundSetModel from '@/models/ActiveCompoundSetModel';
import { useState } from 'react';

interface UseActiveCompoundSetViewModelParams {
    sets: CompoundSetModel[];
    doneHandler?: (completedSets: CompoundSetModel[]) => void;
}

export function useActiveCompoundSetViewModel({ sets, doneHandler }: UseActiveCompoundSetViewModelParams) {

    //use a copy of the sets to avoid changing the original data
    //TODO : Dow we really need that state here ?
    const [activeSets, setActiveSets] = useState([...sets]);

    function handleDonePress() {
        const updatedSets = activeSets.map(set => ({ ...set }));
        setActiveSets(updatedSets);

        if (doneHandler) {
            doneHandler(updatedSets);
        }

    }

    function repsChangeForSet(reps: string, set: CompoundSetModel) {
        const updatedSets = activeSets.map((s) => {
            //We just use string comparison here, but in a real app we would use a unique identifier
            if (s.id === set.id) {
                s.completedReps = parseInt(reps, 10);
                return { ...s, reps };
            }
            return s;
        });
        setActiveSets(updatedSets);
    }

    return {
        handleDonePress,
        repsChangeForSet
    };
}

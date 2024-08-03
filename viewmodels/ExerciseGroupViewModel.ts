// src/viewmodels/ExerciseGroupViewModel.ts

import { useState, useCallback, useRef } from 'react';
import { Alert } from 'react-native';
import { CompoundSet, ExerciseStatus } from '@/models/WorkoutModel';
import SingleSetModel from '@/models/SingleSetModel';
import { TimerOverlayRef } from '@/components/TimerOverlay';

export const useExerciseGroupViewModel = (
  initialCompoundSets: CompoundSet[],
  onGroupComplete: () => void
) => {
  const [compoundSets, setCompoundSets] = useState<CompoundSet[]>(initialCompoundSets);
  const [activeCompoundSetIndex, setActiveCompoundSetIndex] = useState<number | null>(null);
  const [isTimerVisible, setIsTimerVisible] = useState(false);
  const timerRef = useRef<TimerOverlayRef>(null);

  const handleSetCompletion = useCallback((id: string, completedSets: SingleSetModel[]) => {
    setCompoundSets(prevSets => 
      prevSets.map(set => 
        set.id === id 
          ? { ...set, singleSets: completedSets, status: ExerciseStatus.Finished } 
          : set
      )
    );
    setIsTimerVisible(true);
    timerRef.current?.show();
  }, []);

  const handleSetActivation = useCallback((id: string) => {
    setCompoundSets(prevSets => 
      prevSets.map(set => 
        set.id === id 
          ? { ...set, status: ExerciseStatus.Active } 
          : set.status === ExerciseStatus.Active 
            ? { ...set, status: ExerciseStatus.NotActive }
            : set
      )
    );
    setActiveCompoundSetIndex(compoundSets.findIndex(set => set.id === id));
  }, [compoundSets]);

  const handleTimerEnd = useCallback(() => {
    setIsTimerVisible(false);
    timerRef.current?.hide();
    // Logic to move to next set or finish if all sets are complete
    const allSetsCompleted = compoundSets.every(set => set.status === ExerciseStatus.Finished);
    if (allSetsCompleted) {
      showExitDialog();
    }
  }, [compoundSets]);

  const showExitDialog = useCallback(() => {
    Alert.alert(
      "Exercise Group Completed",
      "Are you sure you want to finish this exercise group?",
      [
        {
          text: "Cancel",
          style: "cancel"
        },
        { 
          text: "Finish", 
          onPress: onGroupComplete 
        }
      ]
    );
  }, [onGroupComplete]);

  return {
    compoundSets,
    handleSetCompletion,
    handleSetActivation,
    handleTimerEnd,
    showExitDialog,
    timerRef,
    isTimerVisible,
  };
};
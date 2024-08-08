// src/viewmodels/ExerciseGroupViewModel.ts

import { useState, useCallback, useRef, useEffect } from 'react';
import { Alert } from 'react-native';
import { CompoundSet, ExerciseStatus } from '@/models/WorkoutModel';
import SingleSetModel from '@/models/SingleSetModel';
import { TimerOverlayRef } from '@/components/TimerOverlay';

export const useExerciseGroupViewModel = (
  initialCompoundSets: CompoundSet[],
  onGroupComplete: () => void
) => {
  const [compoundSets, setCompoundSets] = useState<CompoundSet[]>(initialCompoundSets);
  const [isTimerVisible, setIsTimerVisible] = useState(false);
  const timerRef = useRef<TimerOverlayRef>(null);

  // Add this useEffect to update compoundSets when initialCompoundSets changes
  useEffect(() => {
    setCompoundSets(initialCompoundSets);
  }, [initialCompoundSets]);

  const handleSetCompletion = useCallback((id: string, completedSets: SingleSetModel[]) => {
    setCompoundSets(prevSets => 
      prevSets.map(set => 
        set.id === id 
          ? { ...set, singleSets: completedSets, status: ExerciseStatus.Finished } 
          : set
      )
    );
    setIsTimerVisible(true);
  }, []);

  useEffect(() => {
    if (isTimerVisible) {
      timerRef.current?.show();
    } else {
      timerRef.current?.hide();
    }
  }, [isTimerVisible]);

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
  }, []);

  const activateNextSet = useCallback(() => {
    const nextNotActiveIndex = compoundSets.findIndex(set => set.status === ExerciseStatus.NotActive);
    if (nextNotActiveIndex !== -1) {
      handleSetActivation(compoundSets[nextNotActiveIndex].id);
      return true;
    }
    return false;
  }, [compoundSets, handleSetActivation]);

  const handleTimerEnd = useCallback(() => {
    setIsTimerVisible(false);
    if (!activateNextSet()) {
      showExitDialog();
    }
  }, [activateNextSet]);

  const handleTimerDismiss = useCallback(() => {
    setIsTimerVisible(false);
    if (!activateNextSet()) {
      showExitDialog();
    }
  }, [activateNextSet]);

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
    handleTimerDismiss,
    showExitDialog,
    timerRef,
    isTimerVisible,
    setIsTimerVisible
  };
};
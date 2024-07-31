// src/app/screens/ExerciseGroupScreen.tsx

import React from 'react';
import { StyleSheet, TouchableWithoutFeedback, Keyboard, ScrollView, View, Button } from 'react-native';
import ExerciseHeaderCompound from '@/components/ExerciseHeaderCompound';
import ActiveCompoundSet from '@/components/ActiveCompoundSet';
import FinishedCompoundSet from '@/components/FinishedCompoundSet';
import NotActiveCompoundSet from '@/components/NotActiveCompoundSet';
import Separator from '@/components/Separator';
import { useExerciseGroupViewModel } from '@/viewmodels/ExerciseGroupViewModel';
import { ExerciseStatus, CompoundSet } from '@/models/WorkoutModel';
import TimerOverlay from '@/components/TimerOverlay';
import { useTheme } from '@/contexts/ThemeContext';
import Colors from '@/constants/Colors';
import ExerciseHeaderModel from '@/models/ExerciseHeaderModel';

interface ExerciseGroupScreenProps {
  exerciseHeaders: ExerciseHeaderModel[];
  compoundSets: CompoundSet[];
  onGroupComplete: () => void;
}

export default function ExerciseGroupScreen({ exerciseHeaders, compoundSets, onGroupComplete }: ExerciseGroupScreenProps) {
  const { theme } = useTheme();
  const colors = Colors[theme];
  const {
    compoundSets: currentCompoundSets,
    handleSetCompletion,
    handleSetActivation,
    handleTimerEnd,
    showExitDialog,
    timerRef,
    isTimerVisible
  } = useExerciseGroupViewModel(compoundSets, onGroupComplete);

  const renderExercises = () => {
    return currentCompoundSets.map((compoundSet, index) => {
      const key = `${compoundSet.id}-${compoundSet.status}`;
      switch (compoundSet.status) {
        case ExerciseStatus.Active:
          return (
            <ActiveCompoundSet
              key={key}
              id={compoundSet.id}
              sets={compoundSet.singleSets}
              onDonePress={handleSetCompletion}
              style={styles.compoundSet}
            />
          );
        case ExerciseStatus.Finished:
          return (
            <FinishedCompoundSet
              key={key}
              id={compoundSet.id}
              pressHandler={handleSetActivation}
              repsCompleted={compoundSet.singleSets.map(set => set.completedReps || 0)}
              style={styles.compoundSet}
            />
          );
        case ExerciseStatus.NotActive:
          return (
            <NotActiveCompoundSet
              key={key}
              id={compoundSet.id}
              pressHandler={handleSetActivation}
              numberOfExercises={compoundSet.singleSets.length}
              suggestedRepsRange={{
                min: Math.min(...compoundSet.singleSets.map(set => set.recomendedRepsRange.min)),
                max: Math.max(...compoundSet.singleSets.map(set => set.recomendedRepsRange.max)),
              }}
              style={styles.compoundSet}
            />
          );
        default:
          return null;
      }
    });
  };

  return (
    <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
      <ScrollView contentContainerStyle={[styles.scrollView, { backgroundColor: colors.listBackground }]}>
        <View style={[styles.container, { backgroundColor: colors.background }]}>
          <ExerciseHeaderCompound exerciseHeaderModels={exerciseHeaders} />
          <Separator />
          <View style={styles.exercisesContainer}>
            {renderExercises()}
          </View>
          <View style={styles.finishExerciseBtnContainer}>
            <Button title="Finish Exercise Group" onPress={showExitDialog} color={colors.primary} />
          </View>
        </View>

        {isTimerVisible && (
          <TimerOverlay
            ref={timerRef}
            onDismiss={handleTimerEnd}
            isActiveOnStart={true}
            initialTime={45}
            backgroundNotifications={false}
            onTimerEnd={handleTimerEnd}
            onTimeChange={time => console.log(`Time left: ${time}`)}
            theme={theme}
          />
        )}
      </ScrollView>
    </TouchableWithoutFeedback>
  );
}


const styles = StyleSheet.create({
  scrollView: {
    flexGrow: 1,
    padding: 5
  },
  container: {
    flex: 1,
    padding: 10,
    borderRadius: 10
  },
  exercisesContainer: {
    flex: 1,
    flexDirection: 'column',
    justifyContent: 'flex-start',
  },
  compoundSet: {
    marginBottom: 10,
  },
  finishExerciseBtnContainer: {
    marginVertical: 20
  },
});
import React from 'react'
import { Redirect } from 'expo-router';

export const routes = {
    test: 'screens/TestScreen',
    workoutSelection: 'screens/WorkoutSelectionScreen',
    workout: 'screens/WorkoutScreen'
}

//Index
export default function Index() {
  return <Redirect href="/(tabs)" />;
}
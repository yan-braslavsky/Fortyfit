import React from 'react'
import { Redirect } from 'expo-router';

export const routes = {
    test: 'screens/TestScreen',
    workoutSelection: 'screens/WorkoutSelectionScreen',
    workout: 'screens/WorkoutScreen'
}

export default function Index() {
    return <Redirect href={routes.workoutSelection} />;
}
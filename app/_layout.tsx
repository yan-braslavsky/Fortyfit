import { Stack } from 'expo-router';
import { routes } from '@/app/index';

export default function Layout() {
  return <Stack>
    <Stack.Screen name={routes.workoutSelection}  />
    <Stack.Screen name={routes.workout} options={{
      // presentation: 'fullScreenModal',
      // headerTitleAlign: 'center'
    }} />
  </Stack>
}



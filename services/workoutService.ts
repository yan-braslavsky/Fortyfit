import { collection, getDocs } from 'firebase/firestore';
import { db } from '../firebaseConfig';

export interface RawWorkout {
  id: string;
  name: string;
  imageUrl: string;
  exerciseGroups: {
    sets: number;
    exercises: {
      exerciseId: string;
      reps: number;
      weight: number;
    }[];
  }[];
}

export async function fetchRawWorkouts(): Promise<RawWorkout[]> {
  const workoutsCol = collection(db, 'workouts');
  const workoutSnapshot = await getDocs(workoutsCol);


  const rawWorkouts = workoutSnapshot.docs.map(doc => ({
    id: doc.id,
    ...doc.data()
  } as RawWorkout));

  // console.log(rawWorkouts);

  return rawWorkouts;
}
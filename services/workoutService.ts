import { collection, getDocs, doc, getDoc } from 'firebase/firestore';
import { db } from '../firebaseConfig';

export interface RawWorkout {
  id: string;
  name: string;
  imageUrl: string;
  exerciseGroups: ExerciseGroup[];
}

interface ExerciseGroup {
  exercises: Exercise[];
  sets: number;
}

interface Exercise {
  exerciseId: string;
  reps: number;
  weight: number;
}

export async function fetchRawWorkouts(): Promise<RawWorkout[]> {
  try {
    const workoutsCol = collection(db, 'workouts');
    const workoutSnapshot = await getDocs(workoutsCol);

    if (workoutSnapshot.empty) {
      console.log("No workouts found in Firestore");
      return [];
    }

    const rawWorkouts = workoutSnapshot.docs.map(doc => {
      const data = doc.data();
      return {
        id: doc.id,
        ...data
      } as RawWorkout;
    });

    return rawWorkouts;
  } catch (error) {
    console.error("Error fetching workouts:", error);
    throw error;
  }
}

export async function fetchRawWorkout(workoutId: string): Promise<RawWorkout | null> {
  try {
    const workoutDoc = await getDoc(doc(db, 'workouts', workoutId));

    if (!workoutDoc.exists()) {
      return null;
    }

    return {
      id: workoutDoc.id,
      ...workoutDoc.data()
    } as RawWorkout;
  } catch (error) {
    console.error("Error fetching workout:", error);
    throw error;
  }
}
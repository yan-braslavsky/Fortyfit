import { doc, getDoc } from 'firebase/firestore';
import { db } from '../firebaseConfig';

export interface RawExercise {
  id: string;
  name: string;
  imageUrl: string;
  description: string;
  equipmentIds: string[]; //FR Key for equipment
  muscleGroups: string[]; //FR Key for muscleGroups
}

export async function fetchRawExercise(exerciseId: string): Promise<RawExercise | null> {
  const exerciseDoc = await getDoc(doc(db, 'exercises', exerciseId));
  
  if (!exerciseDoc.exists()) {
    return null;
  }

  return {
    id: exerciseDoc.id,
    ...exerciseDoc.data()
  } as RawExercise;
}
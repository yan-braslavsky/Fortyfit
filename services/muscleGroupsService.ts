// src/services/muscleGroupsService.ts

import { doc, getDoc, collection, getDocs } from 'firebase/firestore';
import { db } from '../firebaseConfig';

export interface MuscleGroup {
  id: string;
  name: string;
  muscles: Muscle[];
  imageUrl: string;
}

export interface Muscle {
  name: string;
  imageUrl: string;
  description: string;
}

export async function fetchAllMuscleGroups(): Promise<MuscleGroup[]> {
  const muscleGroupsCol = collection(db, 'muscleGroups');
  const muscleGroupSnapshot = await getDocs(muscleGroupsCol);

  const muscleGroups = muscleGroupSnapshot.docs.map(doc => ({
    id: doc.id,
    ...doc.data()
  } as MuscleGroup));

  return muscleGroups;
}

export async function fetchMuscleGroupById(id: string): Promise<MuscleGroup | null> {
  const muscleGroupDoc = await getDoc(doc(db, 'muscleGroups', id));
  
  if (!muscleGroupDoc.exists()) {
    return null;
  }

  return {
    id: muscleGroupDoc.id,
    ...muscleGroupDoc.data()
  } as MuscleGroup;
}
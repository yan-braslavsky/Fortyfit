import { doc, getDoc } from 'firebase/firestore';
import { db } from '../firebaseConfig';

export interface RawEquipment {
  id: string;
  name: string;
  imageUrl: string;
}

export async function fetchRawEquipment(equipmentId: string): Promise<RawEquipment | null> {
  const equipmentDoc = await getDoc(doc(db, 'equipment', equipmentId));
  
  if (!equipmentDoc.exists()) {
    return null;
  }

  return {
    id: equipmentDoc.id,
    ...equipmentDoc.data()
  } as RawEquipment;
}
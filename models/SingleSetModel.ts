// src/models/SingleSetModel.ts

import { EquipmentModel } from '@/constants/DataModels';

export default interface SingleSetModel {
    id: string;
    name: string;
    weight: number;
    reps: number;
    completedReps?: number;
    recomendedRepsRange: { min: number, max: number };
    imageUrl: string;
    equipment?: EquipmentModel[]; // Add this line
}
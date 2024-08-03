// src/models/SingleSetModel.ts

export default interface SingleSetModel {
    id: string;
    name: string;
    weight: number;
    reps: number;
    completedReps?: number;
    recomendedRepsRange: { min: number, max: number };
    imageUrl: string;
}
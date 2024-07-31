// src/models/WorkoutModel.ts

export enum ExerciseStatus {
    Active = 'Active',
    Finished = 'Finished',
    NotActive = 'NotActive'
}

export interface SingleSetModel {
    id: string;
    name: string;
    weight: number;
    reps: number;
    completedReps?: number;
    recomendedRepsRange: { min: number, max: number };
    imageUrl: string;
}

export interface CompoundSet {
    id: string;
    singleSets: SingleSetModel[];
    status: ExerciseStatus;
}
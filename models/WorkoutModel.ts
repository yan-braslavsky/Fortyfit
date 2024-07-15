import ExerciseHeaderModel from './ExerciseHeaderModel';
import SingleSetModel from './SingleSetModel';

export enum ExerciseStatus {
    Active,
    Finished,
    NotActive
}

export interface CompoundSet {
    id: string;
    singleSets: SingleSetModel[];
    status: ExerciseStatus;
}

export interface WorkoutModel {
    workoutID: string;
    exerciseHeaderModels: ExerciseHeaderModel[];
    compoundSets: CompoundSet[];
}
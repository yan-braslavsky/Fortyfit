// src/models/WorkoutModel.ts

import SingleSetModel from './SingleSetModel';

export enum ExerciseStatus {
    Active = 'Active',
    Finished = 'Finished',
    NotActive = 'NotActive'
}

export { SingleSetModel };

export interface CompoundSet {
    id: string;
    singleSets: SingleSetModel[];
    status: ExerciseStatus;
}
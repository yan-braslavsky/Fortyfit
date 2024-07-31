// src/constants/DataModels.ts

export class WorkoutDataModel {
    readonly id: string;
    readonly name: string;
    readonly imageUrl: string;
    readonly exerciseGroups: ExerciseGroup[];

    constructor(id: string, name: string, imageUrl: string, exerciseGroups: ExerciseGroup[]) {
        this.id = id;
        this.name = name;
        this.imageUrl = imageUrl;
        this.exerciseGroups = exerciseGroups;
    }
}

export interface ExerciseGroup {
    exercises: ExerciseDataModel[];
    sets: number;
}

export class ExerciseDataModel {
    readonly id: string;
    readonly name: string;
    readonly imageUrl: string;
    readonly description: string;
    readonly muscleGroups: MuscleGroup[];
    readonly restTimeInSeconds: number;
    readonly sets: ExerciseSetDataModel[];
    readonly equipment: EquipmentModel[];

    constructor(id: string, name: string, imageUrl: string, restTimeInSeconds: number, sets: ExerciseSetDataModel[], equipment: EquipmentModel[], description: string, muscleGroups: MuscleGroup[]) {
        this.id = id;
        this.name = name;
        this.description = description;
        this.imageUrl = imageUrl;
        this.restTimeInSeconds = restTimeInSeconds;
        this.sets = sets;
        this.equipment = equipment;
        this.muscleGroups = muscleGroups;
    }
}

export class ExerciseSetDataModel {
    readonly id: string;
    readonly name: string;
    readonly weight: number;
    readonly reps: number;

    constructor(id: string, name: string, weight: number, reps: number) {
        this.id = id;
        this.name = name;
        this.weight = weight;
        this.reps = reps;
    }
}

export enum MuscleGroup {
    Chest = "Chest",
    Back = "Back",
    Shoulders = "Shoulders",
    Arms = "Arms",
    Abs = "Abs",
    Legs = "Legs",
    FullBody = "FullBody"
}

export interface EquipmentModel {
    id: string;
    name: string;
    imageUrl: string;
}
export class WorkoutDataModel {
    readonly id: string;
    readonly name: string;
    readonly imageUrl: string;
    //TODO: find another way to represent sets
    readonly exercises: ExerciseDataModel[][]; // can be a single set or a superset

    constructor(id: string, name: string, imageUrl: string, exercises: [ExerciseDataModel, ExerciseDataModel][]) {
        this.id = id;
        this.name = name;
        this.imageUrl = imageUrl;
        this.exercises = exercises;
    }
}

export class ExerciseSetDataModel {
    readonly id: string;
    readonly name: string;
    readonly weight: number;
    readonly reps: number;

    constructor(id: string, name: string, weight: number, suggestedReps: number) {
        this.id = id;
        this.name = name;
        this.weight = weight;
        this.reps = suggestedReps;
    }
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

export enum MuscleGroup {
    Chest = "Chest",
    Back = "Back",
    Shoulders = "Shoulders",
    Arms = "Arms",
    Abs = "Abs",
    Legs = "Legs",
    FullBody = "FullBody"
}

// export class EquipmentModel {
//     readonly id: string;
//     readonly name: string;
//     readonly imageUrl: string;

//     constructor(id: string, name: string, imageUrl: string) {
//         this.id = id;
//         this.name = name;
//         this.imageUrl = imageUrl;
//     }
// }

export interface EquipmentModel {
    id: string;
    name: string;
    imageUrl: string;
  }
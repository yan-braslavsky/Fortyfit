export class WorkoutDataModel {
    readonly id: string;
    readonly name: string;
    readonly imageUrl: string;
    readonly exercises: ExerciseDataModel[];

    constructor(id: string, name: string, imageUrl: string, exercises: ExerciseDataModel[]) {
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
    readonly restTimeInSeconds: number;
    readonly sets: ExerciseSetDataModel[];
    readonly equipment: EquipmentModel[];

    constructor(id: string, name: string,imageUrl: string, restTimeInSeconds: number, sets: ExerciseSetDataModel[], equipment: EquipmentModel[],description: string) {
        this.id = id;
        this.name = name;
        this.description = description;
        this.imageUrl = imageUrl;
        this.restTimeInSeconds = restTimeInSeconds;
        this.sets = sets;
        this.equipment = equipment;
    }
}

export class EquipmentModel {
    readonly id: string;
    readonly name: string;
    readonly imageUrl: string;

    constructor(id: string, name: string, imageUrl: string) {
        this.id = id;
        this.name = name;
        this.imageUrl = imageUrl;
    }
}
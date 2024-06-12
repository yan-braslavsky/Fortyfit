export class WorkoutDataModel {
    id: number;
    name: string;
    imageUrl: string;
    exercises: ExerciseDataModel[];

    constructor(id: number, name: string, imageUrl: string, exercises: ExerciseDataModel[]) {
        this.id = id;
        this.name = name;
        this.imageUrl = imageUrl;
        this.exercises = exercises;
    }
}

export class ExerciseSetDataModel {
    id: number;
    name: string;
    weight: number;
    reps: number;

    constructor(id: number, name: string, weight: number, reps: number) {
        this.id = id;
        this.name = name;
        this.weight = weight;
        this.reps = reps;
    }
}


export class ExerciseDataModel {
    id: number;
    name: string;
    imageUrl: string;
    restTimeInSeconds: number;
    sets: ExerciseSetDataModel[];
    equipment: EquipmentModel[];

    constructor(id: number, name: string, imageUrl: string, restTimeInSeconds: number, sets: ExerciseSetDataModel[], equipment: EquipmentModel[]) {
        this.id = id;
        this.name = name;
        this.imageUrl = imageUrl;
        this.restTimeInSeconds = restTimeInSeconds;
        this.sets = sets;
        this.equipment = equipment;
    }
}

export class EquipmentModel {
    id: number;
    name: string;
    imageUrl: string;

    constructor(id: number, name: string, imageUrl: string) {
        this.id = id;
        this.name = name;
        this.imageUrl = imageUrl;
    }
}


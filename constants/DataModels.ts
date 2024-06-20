export class WorkoutDataModel {
    id: string;
    name: string;
    imageUrl: string;
    exercises: ExerciseDataModel[];

    constructor(id: string, name: string, imageUrl: string, exercises: ExerciseDataModel[]) {
        this.id = id;
        this.name = name;
        this.imageUrl = imageUrl;
        this.exercises = exercises;
    }
}

export class ExerciseSetDataModel {
    id: string;
    name: string;
    weight: number;
    reps: number;

    constructor(id: string, name: string, weight: number, reps: number) {
        this.id = id;
        this.name = name;
        this.weight = weight;
        this.reps = reps;
    }
}


export class ExerciseDataModel {
    id: string;
    name: string;
    imageUrl: string;
    description: string;
    restTimeInSeconds: number;
    sets: ExerciseSetDataModel[];
    equipment: EquipmentModel[];

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
    id: string;
    name: string;
    imageUrl: string;

    constructor(id: string, name: string, imageUrl: string) {
        this.id = id;
        this.name = name;
        this.imageUrl = imageUrl;
    }
}
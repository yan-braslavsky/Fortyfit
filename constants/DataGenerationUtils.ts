import { getRandomImage } from '@/constants/DemoImageUrls';
import { generateRandomId } from '@/constants/Utilities';
import { ExerciseStatus } from '@/models/WorkoutModel';

export function generateRandomCompoundSet() {
    return {
        id: generateRandomId(),
        singleSets: [
            { id: generateRandomId(), recomendedRepsRange: { min: 6, max: 8 }, imageUrl: getRandomImage() },
            { id: generateRandomId(), recomendedRepsRange: { min: 8, max: 10 }, imageUrl: getRandomImage() },
            { id: generateRandomId(), recomendedRepsRange: { min: 10, max: 15 }, imageUrl: getRandomImage() },
        ],
        status: ExerciseStatus.NotActive,
    };
}

export function generateDemoWorkoutModel() {
    return {
        workoutID: generateRandomId(),
        exerciseHeaderModels: [
            { imageUrl: getRandomImage(), title: 'Squat', subtitle: 'Legs', equipmentImagesUrls: [getRandomImage(), getRandomImage()] },
            { imageUrl: getRandomImage(), title: 'Pushup', subtitle: 'Chest', equipmentImagesUrls: [getRandomImage(), getRandomImage(), getRandomImage()] },
            { imageUrl: getRandomImage(), title: 'Pull Up', subtitle: 'Back', equipmentImagesUrls: [] },
        ],
        compoundSets: [generateRandomCompoundSet(), generateRandomCompoundSet(), generateRandomCompoundSet()],
    };
}
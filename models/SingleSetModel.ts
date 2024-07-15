export default interface SingleSetModel {
    id: string;
    completedReps?: number;
    recomendedRepsRange: { min: number, max: number };
    imageUrl: string;
}
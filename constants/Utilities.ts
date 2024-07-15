export function generateRandomId(): string {
    return `${Date.now()}-${Math.random().toString(36).substring(2, 15)}`;
}

export function generateRandomInt(min: number, max: number): number {
    return Math.floor(Math.random() * (max - min + 1)) + min;
}
export const squatImageUrl = "https://w7.pngwing.com/pngs/489/476/png-transparent-exercise-streaching-legs-gym-fitness-workout-activity-glyph-icon-thumbnail.png";
export const pushupImageUrl = "https://w7.pngwing.com/pngs/381/172/png-transparent-computer-icons-push-up-exercise-others.png";
export const pullUpImageUrl = "https://www.shutterstock.com/shutterstock/photos/1517740955/display_1500/stock-vector-a-sport-man-taking-physical-activity-street-workout-training-1517740955.jpg";

export const voleyBallImageUrl = "https://pngimg.com/d/volleyball_PNG51.png";
export const gymnasticRingsImageUrl = "https://cdn-icons-png.flaticon.com/512/1545/1545659.png";
export const resistanceBandsImageUrl = "https://static.thenounproject.com/png/2491861-200.png";

export const getRandomImage = () => {
    const images = [squatImageUrl, pushupImageUrl, pullUpImageUrl, voleyBallImageUrl, gymnasticRingsImageUrl, resistanceBandsImageUrl];
    return images[Math.floor(Math.random() * images.length)];
}
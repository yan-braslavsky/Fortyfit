import { WorkoutDataModel, EquipmentModel, ExerciseSetDataModel, ExerciseDataModel, MuscleGroup } from './DataModels';

const squatImageUrl = "https://w7.pngwing.com/pngs/489/476/png-transparent-exercise-streaching-legs-gym-fitness-workout-activity-glyph-icon-thumbnail.png";
const pushupImageUrl = "https://w7.pngwing.com/pngs/381/172/png-transparent-computer-icons-push-up-exercise-others.png";
const pullUpImageUrl = "https://www.shutterstock.com/shutterstock/photos/1517740955/display_1500/stock-vector-a-sport-man-taking-physical-activity-street-workout-training-1517740955.jpg";

const ringsEquipment = new EquipmentModel(Math.random().toString(), 'Rings', "https://www.shutterstock.com/shutterstock/photos/1264166743/display_1500/stock-vector-gymnastic-rings-vector-icon-1264166743.jpg");
const gymnasticBallEquipment = new EquipmentModel(Math.random().toString(), 'Gymnastic Ball',
    "https://cdn.iconscout.com/icon/premium/png-512-thumb/exercise-ball-3242214-2715557.png");

export const DEMO_WORKOUTS = [

    //Leg Day
    new WorkoutDataModel(Math.random().toString(), 'Leg Day',
        squatImageUrl,
        [
            // Pair: Squats and Lunges
            [
                new ExerciseDataModel(Math.random().toString(), 'Squats', squatImageUrl, 60,
                    [
                        new ExerciseSetDataModel(Math.random().toString(), 'Set 1', 0, 25),
                        new ExerciseSetDataModel(Math.random().toString(), 'Set 2', 0, 25),
                        new ExerciseSetDataModel(Math.random().toString(), 'Set 3', 0, 25),
                    ],
                    [],
                    "Squats are a compound exercise that works the quadriceps, hamstrings, and glutes. It also works the calves, lower back, and core.",
                    [MuscleGroup.Legs, MuscleGroup.FullBody]
                ),
                new ExerciseDataModel(Math.random().toString(), 'Lunges', squatImageUrl, 60,
                    [
                        new ExerciseSetDataModel(Math.random().toString(), 'Set 1', 0, 25),
                        new ExerciseSetDataModel(Math.random().toString(), 'Set 2', 0, 25),
                        new ExerciseSetDataModel(Math.random().toString(), 'Set 3', 0, 25),
                    ],
                    [],
                    "Lunges are a compound exercise that works the quadriceps, hamstrings, glutes, and calves. It also works the lower back and core."
                    , [MuscleGroup.Legs, MuscleGroup.FullBody]
                )
            ],
            // Pair: Ball Curls and Leg Press
            [
                new ExerciseDataModel(Math.random().toString(), 'Ball Curls', squatImageUrl, 60,
                    [
                        new ExerciseSetDataModel(Math.random().toString(), 'Set 1', 0, 25),
                        new ExerciseSetDataModel(Math.random().toString(), 'Set 2', 0, 25),
                        new ExerciseSetDataModel(Math.random().toString(), 'Set 3', 0, 25),
                    ],
                    [gymnasticBallEquipment],
                    "Ball Curls are a compound exercise that works the quadriceps, hamstrings, and glutes. It also works the calves, lower back, and core."
                    , [MuscleGroup.Legs, MuscleGroup.FullBody]
                ),
                new ExerciseDataModel(Math.random().toString(), 'Leg Press', squatImageUrl, 60,
                    [
                        new ExerciseSetDataModel(Math.random().toString(), 'Set 1', 0, 25),
                        new ExerciseSetDataModel(Math.random().toString(), 'Set 2', 0, 25),
                        new ExerciseSetDataModel(Math.random().toString(), 'Set 3', 0, 25),
                    ],
                    [],
                    "Leg Press is a compound exercise that works the quadriceps, hamstrings, and glutes. It also works the calves, lower back, and core."
                    , [MuscleGroup.Legs, MuscleGroup.FullBody]
                )
            ],
            // Pair: Leg Extensions and Toes to Bar
            [
                new ExerciseDataModel(Math.random().toString(), 'Leg Extensions', squatImageUrl, 60,
                    [
                        new ExerciseSetDataModel(Math.random().toString(), 'Set 1', 0, 25),
                        new ExerciseSetDataModel(Math.random().toString(), 'Set 2', 0, 25),
                        new ExerciseSetDataModel(Math.random().toString(), 'Set 3', 0, 25),
                    ],
                    [],
                    "Leg Extensions are a compound exercise that works the quadriceps, hamstrings, and glutes. It also works the calves, lower back, and core."
                    , [MuscleGroup.Legs, MuscleGroup.FullBody]
                ),
                new ExerciseDataModel(Math.random().toString(), 'Toes to Bar', squatImageUrl, 60,
                    [
                        new ExerciseSetDataModel(Math.random().toString(), 'Set 1', 0, 25),
                        new ExerciseSetDataModel(Math.random().toString(), 'Set 2', 0, 25),
                        new ExerciseSetDataModel(Math.random().toString(), 'Set 3', 0, 25),
                    ],
                    [ringsEquipment],
                    "Toes to Bar are a compound exercise that works the quadriceps, hamstrings, and glutes. It also works the calves, lower back, and core."
                    , [MuscleGroup.Abs, MuscleGroup.FullBody]
                )
            ]
        ]
    ),

    //Pull Day
    new WorkoutDataModel(Math.random().toString(), 'Pull Day',
        pullUpImageUrl,
        [
            // Pair: Pull-Ups and Bent Over Rows
            [
                new ExerciseDataModel(Math.random().toString(), 'Pull-Ups', pullUpImageUrl, 60,
                    [
                        new ExerciseSetDataModel(Math.random().toString(), 'Set 1', 0, 10),
                        new ExerciseSetDataModel(Math.random().toString(), 'Set 2', 0, 10),
                        new ExerciseSetDataModel(Math.random().toString(), 'Set 3', 0, 10),
                    ],
                    [ringsEquipment],
                    "Pull-Ups are a compound exercise that works the biceps, back, and core."
                    , [MuscleGroup.Back, MuscleGroup.FullBody]
                ),
                new ExerciseDataModel(Math.random().toString(), 'Bent Over Rows', pullUpImageUrl, 60,
                    [
                        new ExerciseSetDataModel(Math.random().toString(), 'Set 1', 0, 15),
                        new ExerciseSetDataModel(Math.random().toString(), 'Set 2', 0, 15),
                        new ExerciseSetDataModel(Math.random().toString(), 'Set 3', 0, 15),
                    ],
                    [],
                    "Bent Over Rows are a compound exercise that works the biceps, back, and core."
                    , [MuscleGroup.Back, MuscleGroup.FullBody]
                )
            ],
            // Pair: Deadlifts and Bicep Curls
            [
                new ExerciseDataModel(Math.random().toString(), 'Deadlifts', pullUpImageUrl, 60,
                    [
                        new ExerciseSetDataModel(Math.random().toString(), 'Set 1', 0, 15),
                        new ExerciseSetDataModel(Math.random().toString(), 'Set 2', 0, 15),
                        new ExerciseSetDataModel(Math.random().toString(), 'Set 3', 0, 15),
                    ],
                    [],
                    "Deadlifts are a compound exercise that works the biceps, back, and core."
                    , [MuscleGroup.Back, MuscleGroup.FullBody]
                ),
                new ExerciseDataModel(Math.random().toString(), 'Bicep Curls', pullUpImageUrl, 60,
                    [
                        new ExerciseSetDataModel(Math.random().toString(), 'Set 1', 0, 15),
                        new ExerciseSetDataModel(Math.random().toString(), 'Set 2', 0, 15),
                        new ExerciseSetDataModel(Math.random().toString(), 'Set 3', 0, 15),
                    ],
                    [],
                    "Bicep Curls are a compound exercise that works the biceps, back, and core."
                    , [MuscleGroup.Back, MuscleGroup.FullBody]
                )
            ]
        ]
    ),

    //Push Day
    new WorkoutDataModel(Math.random().toString(), 'Push Day',
        pushupImageUrl,
        [
            // Pair: Push-Ups and Shoulder Press
            [
                new ExerciseDataModel(Math.random().toString(), 'Push-Ups', pushupImageUrl, 60,
                    [
                        new ExerciseSetDataModel(Math.random().toString(), 'Set 1', 0, 20),
                        new ExerciseSetDataModel(Math.random().toString(), 'Set 2', 0, 20),
                        new ExerciseSetDataModel(Math.random().toString(), 'Set 3', 0, 20),
                    ],
                    [],
                    "Push-Ups are a compound exercise that works the chest, triceps, and shoulders."
                    , [MuscleGroup.Chest, MuscleGroup.FullBody]
                ),
                new ExerciseDataModel(Math.random().toString(), 'Shoulder Press', pushupImageUrl, 60,
                    [
                        new ExerciseSetDataModel(Math.random().toString(), 'Set 1', 0, 15),
                        new ExerciseSetDataModel(Math.random().toString(), 'Set 2', 0, 15),
                        new ExerciseSetDataModel(Math.random().toString(), 'Set 3', 0, 15),
                    ],
                    [],
                    "Shoulder Press is a compound exercise that works the chest, triceps, and shoulders."
                    , [MuscleGroup.Chest, MuscleGroup.FullBody]
                )
            ],
            // Pair: Bench Press and Tricep Dips
            [
                new ExerciseDataModel(Math.random().toString(), 'Bench Press', pushupImageUrl, 60,
                    [
                        new ExerciseSetDataModel(Math.random().toString(), 'Set 1', 0, 15),
                        new ExerciseSetDataModel(Math.random().toString(), 'Set 2', 0, 15),
                        new ExerciseSetDataModel(Math.random().toString(), 'Set 3', 0, 15),
                    ],
                    [],
                    "Bench Press is a compound exercise that works the chest, triceps, and shoulders."
                    , [MuscleGroup.Chest, MuscleGroup.FullBody]
                ),
                new ExerciseDataModel(Math.random().toString(), 'Tricep Dips', pushupImageUrl, 60,
                    [
                        new ExerciseSetDataModel(Math.random().toString(), 'Set 1', 0, 15),
                        new ExerciseSetDataModel(Math.random().toString(), 'Set 2', 0, 15),
                        new ExerciseSetDataModel(Math.random().toString(), 'Set 3', 0, 15),
                    ],
                    [],
                    "Tricep Dips are a compound exercise that works the chest, triceps, and shoulders."
                    , [MuscleGroup.Chest, MuscleGroup.FullBody]
                )
            ]
        ]
    ),
];
// Base movements for the synthetic exercise library. generateExerciseLibrary.js
// expands each one into an exercise per equipment option and per variation.
export const MOVEMENTS = [
  {
    movement: "Bench Press",
    primaryMuscleGroup: "Chest",
    secondaryMuscleGroups: ["Triceps", "Shoulders"],
    mechanic: "Compound",
    difficulty: "Intermediate",
    equipment: ["Barbell", "Dumbbell", "Smith machine"],
    summary:
      "A horizontal press and the classic upper-body strength builder for the chest, front shoulders, and triceps.",
    steps: [
      "Lie back on the bench with your eyes under the bar or weights and your feet planted on the floor.",
      "Squeeze your shoulder blades together and keep a slight arch in your upper back.",
      "Lower the weight under control to the middle of your chest with your elbows about 45 degrees from your body.",
      "Press back up until your arms are straight, keeping your shoulders pinned to the bench.",
    ],
    variations: [
      {
        label: "Incline",
        cue: "Set the bench to about 30 degrees, which shifts more of the work to the upper chest and front shoulders.",
      },
      {
        label: "Decline",
        cue: "Set the bench to a slight decline and hook your legs in, which emphasizes the lower chest.",
      },
      {
        label: "Close-Grip",
        equipment: ["Barbell", "Smith machine"],
        primaryMuscleGroup: "Triceps",
        secondaryMuscleGroups: ["Chest", "Shoulders"],
        cue: "Bring your hands to shoulder width and keep your elbows tucked, which moves much of the work to the triceps.",
      },
      {
        label: "Wide-Grip",
        equipment: ["Barbell", "Smith machine"],
        cue: "Take a grip a few inches wider than usual to shorten the range of motion and load the chest more.",
      },
      {
        label: "Neutral-Grip",
        equipment: ["Dumbbell"],
        cue: "Hold the dumbbells with your palms facing each other, which is easier on the shoulders.",
      },
      {
        label: "Single-Arm",
        equipment: ["Dumbbell"],
        difficultyChange: 1,
        cue: "Press one dumbbell at a time and brace your core so your body doesn't twist toward the weight.",
      },
    ],
  },
  {
    movement: "Chest Press",
    primaryMuscleGroup: "Chest",
    secondaryMuscleGroups: ["Triceps", "Shoulders"],
    mechanic: "Compound",
    difficulty: "Beginner",
    equipment: ["Machine", "Cable", "Resistance band"],
    summary:
      "A pressing movement for the chest that follows a guided or anchored path, making it easy to learn and safe to push close to failure.",
    steps: [
      "Set the seat or anchor so the handles line up with the middle of your chest.",
      "Grip the handles, pull your shoulder blades back, and brace your core.",
      "Press forward until your arms are straight without locking your elbows hard.",
      "Return slowly until you feel a stretch across your chest.",
    ],
    variations: [
      {
        label: "Incline",
        cue: "Use an incline seat or a low anchor and press upward at an angle to bias the upper chest.",
      },
      {
        label: "Decline",
        equipment: ["Machine", "Cable"],
        cue: "Use a high anchor or decline setting and press slightly downward to bias the lower chest.",
      },
      {
        label: "Single-Arm",
        equipment: ["Machine", "Cable", "Resistance band"],
        difficultyChange: 1,
        cue: "Press with one arm and resist the pull to rotate, which also trains your core.",
      },
    ],
  },
  {
    movement: "Chest Fly",
    primaryMuscleGroup: "Chest",
    secondaryMuscleGroups: ["Shoulders"],
    mechanic: "Isolation",
    difficulty: "Beginner",
    equipment: ["Dumbbell", "Cable", "Machine", "Resistance band"],
    summary:
      "An isolation movement that trains the chest's main job of bringing the arms together across the body.",
    steps: [
      "Start with your arms out to the sides and a soft bend in your elbows.",
      "Keep that elbow angle fixed as you bring your hands together in a wide arc.",
      "Squeeze your chest when your hands meet in front of you.",
      "Open your arms slowly until you feel a stretch, without letting your shoulders roll forward.",
    ],
    variations: [
      {
        label: "Incline",
        equipment: ["Dumbbell", "Cable", "Resistance band"],
        cue: "Use an incline bench or a low anchor to bias the upper chest.",
      },
      {
        label: "Decline",
        equipment: ["Dumbbell", "Cable"],
        cue: "Use a decline bench or a high anchor to bias the lower chest.",
      },
      {
        label: "Low-to-High",
        equipment: ["Cable", "Resistance band"],
        cue: "Sweep your hands from hip height up to shoulder height to emphasize the upper chest.",
      },
      {
        label: "High-to-Low",
        equipment: ["Cable", "Resistance band"],
        cue: "Sweep your hands from above shoulder height down toward your hips to emphasize the lower chest.",
      },
      {
        label: "Single-Arm",
        equipment: ["Cable", "Machine", "Resistance band"],
        difficultyChange: 1,
        cue: "Work one arm at a time to even out strength differences between sides.",
      },
    ],
  },
  {
    movement: "Push-Up",
    primaryMuscleGroup: "Chest",
    secondaryMuscleGroups: ["Triceps", "Shoulders", "Core"],
    mechanic: "Compound",
    difficulty: "Beginner",
    equipment: ["Bodyweight"],
    summary:
      "A bodyweight press that trains the chest, shoulders, and triceps while your core holds your body in a straight line.",
    steps: [
      "Place your hands slightly wider than your shoulders and step your feet back into a plank.",
      "Brace your core and squeeze your glutes so your body stays straight from head to heels.",
      "Lower your chest toward the floor with your elbows about 45 degrees from your body.",
      "Push the floor away until your arms are straight.",
    ],
    variations: [
      {
        label: "Incline",
        difficultyChange: -1,
        cue: "Put your hands on a bench or box to reduce the load, a good starting point for beginners.",
      },
      {
        label: "Knee",
        difficultyChange: -1,
        cue: "Keep your knees on the floor to reduce the load while you build strength.",
      },
      {
        label: "Decline",
        difficultyChange: 1,
        cue: "Put your feet on a bench so more of your weight shifts to your upper chest and shoulders.",
      },
      {
        label: "Wide-Grip",
        cue: "Place your hands well outside your shoulders to put more of the work on the chest.",
      },
      {
        label: "Diamond",
        difficultyChange: 1,
        primaryMuscleGroup: "Triceps",
        secondaryMuscleGroups: ["Chest", "Shoulders"],
        cue: "Bring your hands together under your chest so your thumbs and index fingers form a diamond, which loads the triceps.",
      },
      {
        label: "Deficit",
        difficultyChange: 1,
        cue: "Put your hands on blocks or plates so your chest can sink below hand level for a longer range of motion.",
      },
      {
        label: "Archer",
        difficultyChange: 2,
        cue: "Shift your weight to one arm while the other arm stays straight out to the side.",
      },
      {
        label: "Weighted",
        difficultyChange: 1,
        cue: "Have a partner place a plate on your upper back or wear a weight vest.",
      },
    ],
  },
  {
    movement: "Chest Dip",
    primaryMuscleGroup: "Chest",
    secondaryMuscleGroups: ["Triceps", "Shoulders"],
    mechanic: "Compound",
    difficulty: "Intermediate",
    equipment: ["Bodyweight", "Machine"],
    summary:
      "A vertical press on parallel bars with a forward lean that puts the lower chest through a deep stretch.",
    steps: [
      "Support yourself on parallel bars with your arms straight.",
      "Lean your torso forward and let your elbows flare slightly.",
      "Lower yourself until you feel a stretch across your chest, about where your upper arms are parallel to the floor.",
      "Press back up to straight arms while keeping the forward lean.",
    ],
    variations: [
      {
        label: "Weighted",
        equipment: ["Bodyweight"],
        difficultyChange: 1,
        cue: "Hang a plate or dumbbell from a dip belt once bodyweight dips feel easy.",
      },
      {
        label: "Band-Assisted",
        equipment: ["Bodyweight"],
        difficultyChange: -1,
        cue: "Loop a band under your knees across the bars to take off some of your bodyweight.",
      },
    ],
  },
  {
    movement: "Pullover",
    primaryMuscleGroup: "Chest",
    secondaryMuscleGroups: ["Back", "Triceps"],
    mechanic: "Compound",
    difficulty: "Intermediate",
    equipment: ["Dumbbell", "Barbell", "Cable", "EZ bar"],
    summary:
      "A movement that brings the arms from overhead down toward the hips, working the chest and lats together.",
    steps: [
      "Lie on a bench and hold the weight above your chest with a slight bend in your elbows.",
      "Lower the weight back behind your head in an arc until you feel a stretch through your chest and lats.",
      "Keep your ribs down so your lower back doesn't arch off the bench.",
      "Pull the weight back over your chest along the same arc.",
    ],
    variations: [
      {
        label: "Cross-Bench",
        equipment: ["Dumbbell"],
        difficultyChange: 1,
        cue: "Lie across the bench with only your upper back supported for a deeper stretch.",
      },
      {
        label: "Decline",
        equipment: ["Dumbbell", "Barbell", "EZ bar"],
        cue: "Use a decline bench to increase the range of motion.",
      },
    ],
  },
  {
    movement: "Row",
    primaryMuscleGroup: "Back",
    secondaryMuscleGroups: ["Biceps", "Forearms", "Shoulders"],
    mechanic: "Compound",
    difficulty: "Intermediate",
    equipment: [
      "Barbell",
      "Dumbbell",
      "Kettlebell",
      "Smith machine",
      "Resistance band",
    ],
    summary:
      "A horizontal pull that builds the middle back and lats and balances out pressing work.",
    steps: [
      "Get your torso close to parallel with the floor, either hinged over with a flat back or lying on a bench.",
      "Let the weight hang at arm's length below your shoulders.",
      "Pull the weight toward your lower ribs, driving your elbows back and squeezing your shoulder blades together.",
      "Lower the weight under control without letting your back round.",
    ],
    variations: [
      {
        label: "Bent-Over",
        cue: "Keep your torso close to parallel with the floor for the longest range of motion.",
      },
      {
        label: "Underhand-Grip",
        equipment: ["Barbell", "Smith machine"],
        cue: "Hold the weight with palms facing forward, which brings in more biceps and lower lats.",
      },
      {
        label: "Wide-Grip",
        equipment: ["Barbell", "Smith machine"],
        cue: "Take a wide grip and pull toward your chest to emphasize the upper back and rear shoulders.",
      },
      {
        label: "Pendlay",
        placement: "afterEquipment",
        equipment: ["Barbell"],
        difficultyChange: 1,
        cue: "Return the bar to the floor after every rep and pull explosively from a dead stop.",
      },
      {
        label: "Chest-Supported",
        equipment: ["Dumbbell", "Kettlebell"],
        difficultyChange: -1,
        cue: "Lie face down on an incline bench so your lower back doesn't have to hold the hinge.",
      },
      {
        label: "Single-Arm",
        equipment: ["Dumbbell", "Kettlebell", "Resistance band"],
        difficultyChange: 1,
        cue: "Brace one hand and knee on a bench and row with the other arm.",
      },
      {
        label: "Meadows",
        placement: "afterEquipment",
        equipment: ["Barbell"],
        difficultyChange: 1,
        cue: "Stand side-on to a landmine and row the end of the bar with one hand.",
      },
    ],
  },
  {
    movement: "Seated Row",
    primaryMuscleGroup: "Back",
    secondaryMuscleGroups: ["Biceps", "Forearms", "Shoulders"],
    mechanic: "Compound",
    difficulty: "Beginner",
    equipment: ["Cable", "Machine", "Resistance band"],
    summary:
      "A seated horizontal pull that trains the mid back and lats with very little strain on the lower back.",
    steps: [
      "Sit tall with your feet braced and your knees slightly bent.",
      "Reach forward to grab the handle and let your shoulder blades spread apart.",
      "Pull the handle to your stomach, driving your elbows back past your torso.",
      "Return slowly until your arms are straight, keeping your chest up.",
    ],
    variations: [
      {
        label: "Close-Grip",
        cue: "Use a narrow V-handle to keep your elbows tight to your sides and emphasize the lats.",
      },
      {
        label: "Wide-Grip",
        equipment: ["Cable", "Machine"],
        cue: "Use a long bar with a wide grip and pull to your lower chest to load the upper back.",
      },
      {
        label: "Neutral-Grip",
        equipment: ["Cable", "Machine"],
        cue: "Hold the handles with palms facing each other, a comfortable position for most shoulders.",
      },
      {
        label: "Single-Arm",
        equipment: ["Cable", "Machine", "Resistance band"],
        difficultyChange: 1,
        cue: "Row one arm at a time and let your torso rotate slightly at the start for a longer range.",
      },
    ],
  },
  {
    movement: "Lat Pulldown",
    primaryMuscleGroup: "Back",
    secondaryMuscleGroups: ["Biceps", "Forearms"],
    mechanic: "Compound",
    difficulty: "Beginner",
    equipment: ["Cable", "Machine", "Resistance band"],
    summary:
      "A vertical pull that trains the lats, a good way to build up to pull-ups.",
    steps: [
      "Sit with your thighs locked under the pad and grab the bar a little wider than your shoulders.",
      "Lean back slightly and lift your chest.",
      "Pull the bar to your upper chest, driving your elbows down toward your hips.",
      "Let the bar rise under control until your arms are straight.",
    ],
    variations: [
      {
        label: "Close-Grip",
        cue: "Use a narrow handle so your elbows stay close to your body through the pull.",
      },
      {
        label: "Wide-Grip",
        equipment: ["Cable", "Machine"],
        cue: "Take a wide grip to emphasize the outer lats and shorten the range of motion.",
      },
      {
        label: "Underhand-Grip",
        equipment: ["Cable", "Machine"],
        cue: "Hold the bar with palms facing you, which brings in more biceps.",
      },
      {
        label: "Neutral-Grip",
        equipment: ["Cable", "Machine"],
        cue: "Use parallel handles with palms facing each other.",
      },
      {
        label: "Single-Arm",
        equipment: ["Cable", "Machine", "Resistance band"],
        difficultyChange: 1,
        cue: "Pull with one arm to focus on each lat and get a deeper stretch at the top.",
      },
    ],
  },
  {
    movement: "Pull-Up",
    primaryMuscleGroup: "Back",
    secondaryMuscleGroups: ["Biceps", "Forearms", "Core"],
    mechanic: "Compound",
    difficulty: "Intermediate",
    equipment: ["Bodyweight"],
    summary:
      "A bodyweight vertical pull and one of the best tests of upper-body pulling strength.",
    steps: [
      "Hang from a bar with an overhand grip slightly wider than your shoulders.",
      "Pull your shoulder blades down before you bend your arms.",
      "Pull until your chin is over the bar, keeping your legs still.",
      "Lower yourself until your arms are fully straight.",
    ],
    variations: [
      {
        label: "Wide-Grip",
        difficultyChange: 1,
        cue: "Take a wide grip to put more of the load on the lats.",
      },
      {
        label: "Neutral-Grip",
        cue: "Use parallel handles with palms facing each other, which is easier on the elbows and shoulders.",
      },
      {
        label: "Weighted",
        difficultyChange: 1,
        cue: "Add load with a dip belt or weight vest once you can do several clean reps.",
      },
      {
        label: "Band-Assisted",
        difficultyChange: -1,
        cue: "Loop a band over the bar and under your knee or foot to take off some of your bodyweight.",
      },
      {
        label: "Archer",
        difficultyChange: 2,
        cue: "Pull toward one hand while the other arm straightens out to the side.",
      },
      {
        label: "L-Sit",
        difficultyChange: 1,
        cue: "Hold your legs straight out in front of you throughout the set to add a core challenge.",
      },
      {
        label: "Negative",
        difficultyChange: -1,
        cue: "Jump to the top position and lower yourself as slowly as you can.",
      },
    ],
  },
  {
    movement: "Chin-Up",
    primaryMuscleGroup: "Back",
    secondaryMuscleGroups: ["Biceps", "Forearms"],
    mechanic: "Compound",
    difficulty: "Intermediate",
    equipment: ["Bodyweight"],
    summary:
      "A vertical pull with palms facing you, which brings in more biceps than a pull-up.",
    steps: [
      "Hang from a bar with an underhand grip at about shoulder width.",
      "Pull your shoulder blades down to start the movement.",
      "Pull until your chin clears the bar.",
      "Lower yourself under control to straight arms.",
    ],
    variations: [
      {
        label: "Weighted",
        difficultyChange: 1,
        cue: "Add load with a dip belt or weight vest.",
      },
      {
        label: "Band-Assisted",
        difficultyChange: -1,
        cue: "Use a band looped over the bar to take off some of your bodyweight.",
      },
      {
        label: "Close-Grip",
        cue: "Bring your hands closer together to put more of the work on the biceps.",
      },
    ],
  },
  {
    movement: "Straight-Arm Pulldown",
    primaryMuscleGroup: "Back",
    secondaryMuscleGroups: ["Core", "Triceps"],
    mechanic: "Isolation",
    difficulty: "Beginner",
    equipment: ["Cable", "Resistance band"],
    summary:
      "A lat isolation movement that keeps the arms straight so the biceps stay out of it.",
    steps: [
      "Face a high anchor and hold the attachment with straight arms at eye level.",
      "Hinge forward slightly and brace your core.",
      "Sweep your arms down in an arc until your hands reach your thighs.",
      "Let your arms rise slowly back to the start.",
    ],
    variations: [
      {
        label: "Rope",
        placement: "afterEquipment",
        equipment: ["Cable"],
        cue: "Use a rope attachment and pull the ends apart at the bottom.",
      },
      {
        label: "Kneeling",
        cue: "Kneel in front of the anchor to keep your hips still.",
      },
      {
        label: "Single-Arm",
        equipment: ["Cable", "Resistance band"],
        difficultyChange: 1,
        cue: "Work one arm at a time to even out strength differences between sides.",
      },
    ],
  },
  {
    movement: "Deadlift",
    primaryMuscleGroup: "Back",
    secondaryMuscleGroups: ["Glutes", "Hamstrings", "Forearms", "Core"],
    mechanic: "Compound",
    difficulty: "Intermediate",
    equipment: ["Barbell", "Dumbbell", "Kettlebell"],
    summary:
      "A full-body pull from the floor that builds the whole back side of the body.",
    steps: [
      "Stand with the weight over your midfoot and your feet about hip-width apart.",
      "Hinge down and grip the weight just outside your legs, keeping your back flat and your chest up.",
      "Push the floor away and stand up tall, keeping the weight close to your legs.",
      "Lower the weight by pushing your hips back first, then bending your knees once it passes them.",
    ],
    variations: [
      {
        label: "Sumo",
        placement: "afterEquipment",
        primaryMuscleGroup: "Glutes",
        secondaryMuscleGroups: ["Quadriceps", "Back", "Hamstrings"],
        cue: "Take a wide stance with toes turned out and grip inside your knees, which brings in more glutes and inner thighs.",
      },
      {
        label: "Deficit",
        equipment: ["Barbell", "Dumbbell"],
        difficultyChange: 1,
        cue: "Stand on a low platform so the weight starts farther from your hips.",
      },
      {
        label: "Snatch-Grip",
        equipment: ["Barbell"],
        difficultyChange: 1,
        cue: "Take a very wide grip, which forces you lower and works the upper back harder.",
      },
      {
        label: "Suitcase",
        placement: "afterEquipment",
        equipment: ["Dumbbell", "Kettlebell"],
        primaryMuscleGroup: "Core",
        secondaryMuscleGroups: ["Back", "Glutes", "Forearms"],
        cue: "Hold one weight at your side and stay perfectly upright, which challenges the obliques.",
      },
    ],
  },
  {
    movement: "Shrug",
    primaryMuscleGroup: "Back",
    secondaryMuscleGroups: ["Forearms"],
    mechanic: "Isolation",
    difficulty: "Beginner",
    equipment: ["Barbell", "Dumbbell", "Smith machine", "Cable", "Machine"],
    summary:
      "A short movement that trains the upper traps, the muscles that lift your shoulders.",
    steps: [
      "Hold the weight at your sides or in front of your thighs with straight arms.",
      "Lift your shoulders straight up toward your ears.",
      "Hold the top for a moment without rolling your shoulders.",
      "Lower slowly until you feel a stretch in your upper traps.",
    ],
    variations: [
      {
        label: "Behind-the-Back",
        equipment: ["Barbell", "Smith machine"],
        cue: "Hold the bar behind your thighs to shift the work toward the middle traps.",
      },
      {
        label: "Seated",
        equipment: ["Dumbbell"],
        cue: "Sit on the end of a bench so you can't use your legs to help.",
      },
      {
        label: "Single-Arm",
        equipment: ["Dumbbell", "Cable"],
        difficultyChange: 1,
        cue: "Work one arm at a time to even out strength differences between sides.",
      },
    ],
  },
  {
    movement: "Back Extension",
    primaryMuscleGroup: "Back",
    secondaryMuscleGroups: ["Glutes", "Hamstrings"],
    mechanic: "Compound",
    difficulty: "Beginner",
    equipment: ["Bodyweight", "Machine"],
    summary:
      "A hinge that strengthens the lower back muscles along the spine, along with the glutes and hamstrings.",
    steps: [
      "Set the pad just below your hip bones and lock your feet in.",
      "Cross your arms over your chest and keep your back flat.",
      "Lower your torso by bending at the hips until you feel a stretch in your hamstrings.",
      "Lift back up until your body forms a straight line, without arching past it.",
    ],
    variations: [
      {
        label: "Weighted",
        difficultyChange: 1,
        cue: "Hug a plate to your chest once bodyweight reps feel easy.",
      },
      {
        label: "Single-Leg",
        equipment: ["Bodyweight"],
        difficultyChange: 1,
        cue: "Work one leg at a time, which adds a balance challenge and evens out side-to-side differences.",
      },
      {
        label: "45-Degree",
        equipment: ["Bodyweight"],
        cue: "Use an angled bench, which is easier at the top and harder at the bottom.",
      },
    ],
  },
  {
    movement: "Inverted Row",
    primaryMuscleGroup: "Back",
    secondaryMuscleGroups: ["Biceps", "Core", "Shoulders"],
    mechanic: "Compound",
    difficulty: "Beginner",
    equipment: ["Bodyweight", "Smith machine"],
    summary:
      "A horizontal pull where you row your own body up to a bar, a good partner to the push-up.",
    steps: [
      "Set a bar at about hip height and hang under it with straight arms.",
      "Keep your body straight from head to heels.",
      "Pull your chest to the bar, squeezing your shoulder blades together.",
      "Lower yourself until your arms are straight.",
    ],
    variations: [
      {
        label: "Feet-Elevated",
        difficultyChange: 1,
        cue: "Put your feet on a bench so your body is closer to horizontal.",
      },
      {
        label: "Underhand-Grip",
        cue: "Use an underhand grip to bring in more biceps.",
      },
      {
        label: "Wide-Grip",
        cue: "Take a wide grip and pull to your upper chest to work the upper back.",
      },
    ],
  },
  {
    movement: "Overhead Press",
    primaryMuscleGroup: "Shoulders",
    secondaryMuscleGroups: ["Triceps", "Core"],
    mechanic: "Compound",
    difficulty: "Intermediate",
    equipment: ["Barbell", "Dumbbell", "Kettlebell", "Smith machine"],
    summary:
      "A vertical press that builds the shoulders and triceps and demands a strong, braced core.",
    steps: [
      "Hold the weight at shoulder height with your elbows slightly in front of the bar or weights.",
      "Brace your core so your lower back doesn't arch.",
      "Press straight up, moving your head back slightly so the weight clears your face.",
      "Finish with the weight directly over your shoulders, then lower it back down.",
    ],
    variations: [
      {
        label: "Seated",
        cue: "Sit on a bench with back support, which takes your legs and lower back out of the lift.",
      },
      {
        label: "Single-Arm",
        equipment: ["Dumbbell", "Kettlebell"],
        difficultyChange: 1,
        cue: "Press one side at a time and keep your torso from leaning away from the weight.",
      },
      {
        label: "Behind-the-Neck",
        equipment: ["Barbell", "Smith machine"],
        difficultyChange: 1,
        cue: "Lower the bar behind your head, only if your shoulder mobility allows it comfortably.",
      },
      {
        label: "Half-Kneeling",
        equipment: ["Dumbbell", "Kettlebell"],
        cue: "Kneel on one knee to keep your lower back from arching.",
      },
    ],
  },
  {
    movement: "Shoulder Press",
    primaryMuscleGroup: "Shoulders",
    secondaryMuscleGroups: ["Triceps"],
    mechanic: "Compound",
    difficulty: "Beginner",
    equipment: ["Machine", "Resistance band", "Cable"],
    summary:
      "A guided vertical press that lets you train the shoulders hard without needing to balance the weight.",
    steps: [
      "Set the seat or anchor so the handles start at about shoulder height.",
      "Brace your core and keep your back against the pad or tall.",
      "Press up until your arms are straight.",
      "Lower slowly back to shoulder height.",
    ],
    variations: [
      {
        label: "Neutral-Grip",
        equipment: ["Machine"],
        cue: "Use handles with palms facing each other, which many people find easier on the shoulders.",
      },
      {
        label: "Single-Arm",
        equipment: ["Machine", "Resistance band", "Cable"],
        difficultyChange: 1,
        cue: "Work one arm at a time to even out strength differences between sides.",
      },
      {
        label: "Half-Kneeling",
        equipment: ["Resistance band", "Cable"],
        cue: "Kneel on one knee to keep your lower back from arching.",
      },
    ],
  },
  {
    movement: "Arnold Press",
    primaryMuscleGroup: "Shoulders",
    secondaryMuscleGroups: ["Triceps"],
    mechanic: "Compound",
    difficulty: "Intermediate",
    equipment: ["Dumbbell"],
    summary:
      "A dumbbell press that adds a rotation, taking the front shoulders through a longer range of motion.",
    steps: [
      "Hold the dumbbells in front of your shoulders with palms facing you.",
      "As you press up, rotate your palms until they face forward.",
      "Finish with your arms straight overhead.",
      "Reverse the rotation as you lower the weights back to the start.",
    ],
    variations: [
      {
        label: "Seated",
        cue: "Sit on a bench with back support to keep your torso still.",
      },
      {
        label: "Single-Arm",
        equipment: ["Dumbbell"],
        difficultyChange: 1,
        cue: "Work one arm at a time to even out strength differences between sides.",
      },
    ],
  },
  {
    movement: "Lateral Raise",
    primaryMuscleGroup: "Shoulders",
    secondaryMuscleGroups: [],
    mechanic: "Isolation",
    difficulty: "Beginner",
    equipment: ["Dumbbell", "Cable", "Machine", "Resistance band"],
    summary:
      "An isolation movement for the side shoulders, the muscles that make shoulders look broader.",
    steps: [
      "Hold the weight at your sides with a soft bend in your elbows.",
      "Raise your arms out to the sides, leading with your elbows.",
      "Stop when your hands reach shoulder height.",
      "Lower slowly without letting the weight swing.",
    ],
    variations: [
      {
        label: "Seated",
        equipment: ["Dumbbell"],
        cue: "Sit on a bench to stop yourself from using your legs to swing the weight.",
      },
      {
        label: "Single-Arm",
        equipment: ["Dumbbell", "Cable", "Resistance band"],
        difficultyChange: 1,
        cue: "Raise one arm at a time and hold onto something with your free hand for stability.",
      },
      {
        label: "Leaning",
        equipment: ["Dumbbell", "Cable"],
        cue: "Hold onto a post and lean away from it, which keeps tension on the shoulder at the bottom.",
      },
      {
        label: "Behind-the-Back",
        equipment: ["Cable"],
        cue: "Run the cable behind your body for more tension at the start of the lift.",
      },
    ],
  },
  {
    movement: "Front Raise",
    primaryMuscleGroup: "Shoulders",
    secondaryMuscleGroups: ["Chest"],
    mechanic: "Isolation",
    difficulty: "Beginner",
    equipment: ["Dumbbell", "Barbell", "Cable", "Resistance band"],
    summary: "An isolation movement for the front shoulders.",
    steps: [
      "Hold the weight in front of your thighs with straight arms.",
      "Raise the weight in front of you with straight arms.",
      "Stop at shoulder height.",
      "Lower slowly without rocking your torso.",
    ],
    variations: [
      {
        label: "Single-Arm",
        equipment: ["Dumbbell", "Cable", "Resistance band"],
        difficultyChange: 1,
        cue: "Work one arm at a time to even out strength differences between sides.",
      },
      {
        label: "Alternating",
        equipment: ["Dumbbell"],
        cue: "Raise one dumbbell at a time, switching arms each rep.",
      },
      {
        label: "Seated",
        equipment: ["Dumbbell"],
        cue: "Sit on a bench to keep your torso from rocking.",
      },
    ],
  },
  {
    movement: "Rear Delt Fly",
    primaryMuscleGroup: "Shoulders",
    secondaryMuscleGroups: ["Back"],
    mechanic: "Isolation",
    difficulty: "Beginner",
    equipment: ["Dumbbell", "Cable", "Machine", "Resistance band"],
    summary:
      "An isolation movement for the rear shoulders, which balances out pressing work and supports good posture.",
    steps: [
      "Hinge forward or face the pad with your arms out in front of you.",
      "Keep a soft bend in your elbows.",
      "Open your arms out to the sides, leading with the backs of your hands.",
      "Return slowly without shrugging your shoulders.",
    ],
    variations: [
      {
        label: "Bent-Over",
        equipment: ["Dumbbell", "Resistance band"],
        cue: "Hinge forward until your torso is nearly parallel with the floor.",
      },
      {
        label: "Chest-Supported",
        equipment: ["Dumbbell"],
        difficultyChange: -1,
        cue: "Lie face down on an incline bench to take your lower back out of the movement.",
      },
      {
        label: "Seated",
        equipment: ["Dumbbell"],
        cue: "Sit on the end of a bench and lean forward over your thighs.",
      },
      {
        label: "Single-Arm",
        equipment: ["Cable", "Machine", "Resistance band"],
        difficultyChange: 1,
        cue: "Work one arm at a time to even out strength differences between sides.",
      },
    ],
  },
  {
    movement: "Face Pull",
    primaryMuscleGroup: "Shoulders",
    secondaryMuscleGroups: ["Back"],
    mechanic: "Isolation",
    difficulty: "Beginner",
    equipment: ["Cable", "Resistance band"],
    summary:
      "A pull toward the face that trains the rear shoulders and the small muscles that keep the shoulder joint healthy.",
    steps: [
      "Set the anchor at about face height and hold the rope with your thumbs pointing back.",
      "Step back until your arms are straight.",
      "Pull the rope toward your eyes, spreading the ends apart and pulling your elbows high and wide.",
      "Return slowly until your arms are straight.",
    ],
    variations: [
      {
        label: "Kneeling",
        cue: "Kneel in front of the anchor so you can't lean back to help.",
      },
      {
        label: "Seated",
        cue: "Sit on a bench or the floor to keep your torso still.",
      },
      {
        label: "Single-Arm",
        equipment: ["Cable", "Resistance band"],
        difficultyChange: 1,
        cue: "Work one arm at a time to even out strength differences between sides.",
      },
    ],
  },
  {
    movement: "Upright Row",
    primaryMuscleGroup: "Shoulders",
    secondaryMuscleGroups: ["Back", "Biceps"],
    mechanic: "Compound",
    difficulty: "Intermediate",
    equipment: ["Barbell", "Dumbbell", "Cable", "Smith machine", "EZ bar"],
    summary: "A vertical pull that works the side shoulders and upper traps.",
    steps: [
      "Hold the weight in front of your thighs with your hands about shoulder-width apart.",
      "Lift the weight along your body, leading with your elbows.",
      "Stop when your elbows reach shoulder height.",
      "Lower the weight slowly.",
    ],
    variations: [
      {
        label: "Wide-Grip",
        equipment: ["Barbell", "Smith machine", "EZ bar", "Cable"],
        cue: "Use a wider grip, which most people find easier on the shoulders.",
      },
      {
        label: "Single-Arm",
        equipment: ["Dumbbell", "Cable"],
        difficultyChange: 1,
        cue: "Work one arm at a time to even out strength differences between sides.",
      },
    ],
  },
  {
    movement: "Landmine Press",
    primaryMuscleGroup: "Shoulders",
    secondaryMuscleGroups: ["Chest", "Triceps", "Core"],
    mechanic: "Compound",
    difficulty: "Beginner",
    equipment: ["Barbell"],
    summary:
      "A press at an angle using a barbell anchored at one end, which is easy on the shoulders.",
    steps: [
      "Wedge one end of a barbell into a corner or landmine attachment.",
      "Hold the other end at your shoulder with your elbow tucked.",
      "Press the bar up and forward until your arm is straight.",
      "Lower it slowly back to your shoulder.",
    ],
    variations: [
      {
        label: "Half-Kneeling",
        cue: "Kneel on the knee on the same side as the pressing arm to train core stability.",
      },
      {
        label: "Single-Arm",
        equipment: ["Barbell"],
        difficultyChange: 1,
        cue: "Press with one hand and keep your torso from twisting.",
      },
    ],
  },
  {
    movement: "Pike Push-Up",
    primaryMuscleGroup: "Shoulders",
    secondaryMuscleGroups: ["Triceps", "Core"],
    mechanic: "Compound",
    difficulty: "Intermediate",
    equipment: ["Bodyweight"],
    summary:
      "A bodyweight overhead press done from an inverted V position, building toward handstand push-ups.",
    steps: [
      "Start in a push-up position and walk your feet in until your hips are high.",
      "Bend your elbows and lower the top of your head toward the floor in front of your hands.",
      "Keep your hips high so your torso stays close to vertical.",
      "Push back up until your arms are straight.",
    ],
    variations: [
      {
        label: "Feet-Elevated",
        difficultyChange: 1,
        cue: "Put your feet on a box to load more of your bodyweight onto your shoulders.",
      },
      {
        label: "Deficit",
        difficultyChange: 1,
        cue: "Put your hands on blocks so your head can go below hand level.",
      },
    ],
  },
  {
    movement: "Handstand Push-Up",
    primaryMuscleGroup: "Shoulders",
    secondaryMuscleGroups: ["Triceps", "Core"],
    mechanic: "Compound",
    difficulty: "Advanced",
    equipment: ["Bodyweight"],
    summary:
      "An advanced bodyweight press done upside down, usually against a wall.",
    steps: [
      "Kick up into a handstand with your heels resting on a wall.",
      "Lower your head toward the floor with your elbows tracking forward.",
      "Touch your head lightly to a mat.",
      "Press back up to straight arms.",
    ],
    variations: [
      {
        label: "Deficit",
        cue: "Put your hands on blocks to increase the range of motion.",
      },
      {
        label: "Negative",
        difficultyChange: -1,
        cue: "Lower yourself as slowly as you can and come down from the handstand to reset each rep.",
      },
    ],
  },
  {
    movement: "Curl",
    primaryMuscleGroup: "Biceps",
    secondaryMuscleGroups: ["Forearms"],
    mechanic: "Isolation",
    difficulty: "Beginner",
    equipment: [
      "Barbell",
      "Dumbbell",
      "EZ bar",
      "Cable",
      "Resistance band",
      "Kettlebell",
    ],
    summary: "The basic biceps exercise, bending the elbow against resistance.",
    steps: [
      "Hold the weight with straight arms and your palms facing forward.",
      "Keep your upper arms still as you curl the weight up toward your shoulders.",
      "Squeeze your biceps at the top.",
      "Lower slowly until your arms are straight.",
    ],
    variations: [
      {
        label: "Seated",
        equipment: ["Dumbbell"],
        cue: "Sit on the end of a bench so you can't swing the weight with your body.",
      },
      {
        label: "Incline",
        equipment: ["Dumbbell"],
        difficultyChange: 1,
        cue: "Lie back on an incline bench so your arms hang behind your body for a deep stretch.",
      },
      {
        label: "Alternating",
        equipment: ["Dumbbell", "Kettlebell"],
        cue: "Curl one weight at a time, switching arms each rep.",
      },
      {
        label: "Wide-Grip",
        equipment: ["Barbell", "EZ bar"],
        cue: "Hold the bar outside shoulder width.",
      },
      {
        label: "Close-Grip",
        equipment: ["Barbell", "EZ bar"],
        cue: "Hold the bar with your hands inside shoulder width.",
      },
      {
        label: "Single-Arm",
        equipment: ["Cable", "Resistance band", "Dumbbell"],
        difficultyChange: 1,
        cue: "Work one arm at a time to even out strength differences between sides.",
      },
      {
        label: "Drag",
        placement: "afterEquipment",
        equipment: ["Barbell", "EZ bar"],
        difficultyChange: 1,
        cue: "Drag the bar up along your body, pulling your elbows back as you curl.",
      },
      {
        label: "Bayesian",
        equipment: ["Cable"],
        difficultyChange: 1,
        cue: "Face away from a low cable and curl with your arm behind your body for a stretch at the start.",
      },
      {
        label: "Spider",
        placement: "afterEquipment",
        equipment: ["Dumbbell", "EZ bar", "Barbell"],
        cue: "Lie chest-down on an incline bench and curl with your arms hanging straight down.",
      },
    ],
  },
  {
    movement: "Hammer Curl",
    primaryMuscleGroup: "Biceps",
    secondaryMuscleGroups: ["Forearms"],
    mechanic: "Isolation",
    difficulty: "Beginner",
    equipment: ["Dumbbell", "Cable", "Resistance band", "Kettlebell"],
    summary:
      "A curl with palms facing each other, which works the biceps along with the brachialis and forearms.",
    steps: [
      "Hold the weights at arm's length with palms facing in.",
      "Keep your upper arms still.",
      "Curl the weights up without rotating your wrists.",
      "Lower slowly to straight arms.",
    ],
    variations: [
      {
        label: "Cross-Body",
        equipment: ["Dumbbell", "Kettlebell"],
        cue: "Curl the weight across your body toward the opposite shoulder.",
      },
      {
        label: "Seated",
        equipment: ["Dumbbell"],
        cue: "Sit on a bench to stop your body from swinging.",
      },
      {
        label: "Alternating",
        equipment: ["Dumbbell", "Kettlebell"],
        cue: "Curl one side at a time, switching arms each rep.",
      },
      {
        label: "Rope",
        placement: "afterEquipment",
        equipment: ["Cable"],
        cue: "Use a rope attachment on a low pulley and keep your palms facing each other.",
      },
    ],
  },
  {
    movement: "Preacher Curl",
    primaryMuscleGroup: "Biceps",
    secondaryMuscleGroups: ["Forearms"],
    mechanic: "Isolation",
    difficulty: "Beginner",
    equipment: ["EZ bar", "Dumbbell", "Machine", "Cable", "Barbell"],
    summary:
      "A curl with your upper arms braced on an angled pad, which removes any swinging.",
    steps: [
      "Sit at the preacher bench with the backs of your upper arms flat on the pad.",
      "Hold the weight with straight arms at the bottom.",
      "Curl the weight up until your forearms are close to vertical.",
      "Lower slowly until your arms are almost straight.",
    ],
    variations: [
      {
        label: "Single-Arm",
        equipment: ["Dumbbell", "Cable", "Machine"],
        difficultyChange: 1,
        cue: "Work one arm at a time to even out strength differences between sides.",
      },
      {
        label: "Wide-Grip",
        equipment: ["EZ bar", "Barbell"],
        cue: "Hold the bar wider than shoulder width.",
      },
      {
        label: "Close-Grip",
        equipment: ["EZ bar", "Barbell"],
        cue: "Hold the bar with your hands inside shoulder width.",
      },
    ],
  },
  {
    movement: "Concentration Curl",
    primaryMuscleGroup: "Biceps",
    secondaryMuscleGroups: ["Forearms"],
    mechanic: "Isolation",
    difficulty: "Beginner",
    equipment: ["Dumbbell", "Cable", "Kettlebell"],
    summary: "A strict one-arm curl with your elbow braced against your thigh.",
    steps: [
      "Lean forward and brace the back of your upper arm against your inner thigh or knee.",
      "Let the weight hang with your arm straight.",
      "Curl the weight toward your shoulder, keeping your upper arm still.",
      "Lower slowly to a full stretch.",
    ],
    variations: [
      {
        label: "Standing",
        equipment: ["Dumbbell", "Cable"],
        cue: "Stand bent over with your free hand on your knee.",
      },
    ],
  },
  {
    movement: "Triceps Pushdown",
    primaryMuscleGroup: "Triceps",
    secondaryMuscleGroups: [],
    mechanic: "Isolation",
    difficulty: "Beginner",
    equipment: ["Cable", "Resistance band"],
    summary:
      "An isolation movement that straightens the elbow against resistance from above.",
    steps: [
      "Stand facing a high anchor and hold the attachment with your elbows at your sides.",
      "Keep your upper arms still as you push the attachment down.",
      "Straighten your arms fully and squeeze your triceps.",
      "Let the attachment rise until your forearms are just past parallel with the floor.",
    ],
    variations: [
      {
        label: "Rope",
        placement: "afterEquipment",
        equipment: ["Cable"],
        cue: "Use a rope attachment and pull the ends apart at the bottom.",
      },
      {
        label: "Straight-Bar",
        placement: "afterEquipment",
        equipment: ["Cable"],
        cue: "Use a straight bar attachment, which lets you move the most weight.",
      },
      {
        label: "V-Bar",
        placement: "afterEquipment",
        equipment: ["Cable"],
        cue: "Use a V-shaped bar attachment for a neutral, comfortable grip.",
      },
      {
        label: "Reverse-Grip",
        equipment: ["Cable"],
        cue: "Hold the bar with palms facing up to shift some work to the inner triceps.",
      },
      {
        label: "Single-Arm",
        equipment: ["Cable", "Resistance band"],
        difficultyChange: 1,
        cue: "Work one arm at a time to even out strength differences between sides.",
      },
    ],
  },
  {
    movement: "Overhead Triceps Extension",
    primaryMuscleGroup: "Triceps",
    secondaryMuscleGroups: [],
    mechanic: "Isolation",
    difficulty: "Beginner",
    equipment: ["Dumbbell", "Cable", "EZ bar", "Resistance band", "Kettlebell"],
    summary:
      "A triceps exercise done with the arms overhead, which stretches the long head of the triceps.",
    steps: [
      "Hold the weight overhead with your arms straight.",
      "Keep your elbows pointing forward and close to your head.",
      "Lower the weight behind your head by bending your elbows.",
      "Straighten your arms to lift the weight back up.",
    ],
    variations: [
      {
        label: "Seated",
        equipment: ["Dumbbell", "EZ bar", "Kettlebell"],
        cue: "Sit on a bench with back support to keep your lower back from arching.",
      },
      {
        label: "Single-Arm",
        equipment: ["Dumbbell", "Cable", "Resistance band", "Kettlebell"],
        difficultyChange: 1,
        cue: "Work one arm at a time to even out strength differences between sides.",
      },
      {
        label: "Kneeling",
        equipment: ["Cable"],
        cue: "Kneel facing away from the anchor and lean forward slightly.",
      },
      {
        label: "Rope",
        placement: "afterEquipment",
        equipment: ["Cable"],
        cue: "Use a rope attachment and face away from a low or high anchor.",
      },
    ],
  },
  {
    movement: "Skull Crusher",
    primaryMuscleGroup: "Triceps",
    secondaryMuscleGroups: [],
    mechanic: "Isolation",
    difficulty: "Intermediate",
    equipment: ["EZ bar", "Barbell", "Dumbbell"],
    summary:
      "A lying triceps extension that lowers the weight toward your forehead.",
    steps: [
      "Lie on a bench holding the weight over your shoulders with straight arms.",
      "Keep your upper arms still and lower the weight toward your forehead or just behind your head.",
      "Stop when your elbows are bent about 90 degrees.",
      "Straighten your arms to press the weight back up.",
    ],
    variations: [
      {
        label: "Incline",
        cue: "Use an incline bench to keep tension on the triceps at the top.",
      },
      {
        label: "Decline",
        cue: "Use a decline bench for a longer range of motion.",
      },
      {
        label: "Neutral-Grip",
        equipment: ["Dumbbell"],
        cue: "Hold the dumbbells with palms facing each other.",
      },
    ],
  },
  {
    movement: "Triceps Dip",
    primaryMuscleGroup: "Triceps",
    secondaryMuscleGroups: ["Chest", "Shoulders"],
    mechanic: "Compound",
    difficulty: "Intermediate",
    equipment: ["Bodyweight", "Machine"],
    summary:
      "An upright dip that keeps the torso vertical so the triceps do most of the work.",
    steps: [
      "Support yourself on parallel bars or the machine handles with straight arms.",
      "Keep your torso upright and your elbows close to your body.",
      "Lower yourself until your elbows are bent about 90 degrees.",
      "Press back up to straight arms.",
    ],
    variations: [
      {
        label: "Bench",
        equipment: ["Bodyweight"],
        difficultyChange: -1,
        cue: "Put your hands on a bench behind you and your feet on the floor, which makes the dip much easier.",
      },
      {
        label: "Weighted",
        equipment: ["Bodyweight"],
        difficultyChange: 1,
        cue: "Add load with a dip belt.",
      },
      {
        label: "Band-Assisted",
        equipment: ["Bodyweight"],
        difficultyChange: -1,
        cue: "Loop a band across the bars to take off some of your bodyweight.",
      },
    ],
  },
  {
    movement: "Triceps Kickback",
    primaryMuscleGroup: "Triceps",
    secondaryMuscleGroups: [],
    mechanic: "Isolation",
    difficulty: "Beginner",
    equipment: ["Dumbbell", "Cable", "Resistance band"],
    summary:
      "An isolation movement that straightens the elbow with the upper arm held behind the body.",
    steps: [
      "Hinge forward and pull your upper arm back so it's parallel with your torso.",
      "Keep your upper arm still and let your forearm hang down.",
      "Straighten your arm behind you until it's fully locked out.",
      "Lower your forearm slowly.",
    ],
    variations: [
      {
        label: "Chest-Supported",
        equipment: ["Dumbbell"],
        cue: "Lie face down on an incline bench to keep your torso still.",
      },
      {
        label: "Kneeling",
        equipment: ["Dumbbell"],
        cue: "Kneel on a bench with one hand and knee for support.",
      },
    ],
  },
  {
    movement: "JM Press",
    primaryMuscleGroup: "Triceps",
    secondaryMuscleGroups: ["Chest"],
    mechanic: "Compound",
    difficulty: "Advanced",
    equipment: ["Barbell", "Smith machine", "EZ bar"],
    summary:
      "A hybrid of a close-grip bench press and a skull crusher that lets the triceps handle heavy loads.",
    steps: [
      "Lie on a bench and hold the bar with a close grip over your upper chest.",
      "Bend your elbows and let the bar travel down and slightly back toward your chin.",
      "Keep your elbows pointing toward your feet.",
      "Press the bar back up along the same path.",
    ],
    variations: [],
  },
  {
    movement: "Wrist Curl",
    primaryMuscleGroup: "Forearms",
    secondaryMuscleGroups: [],
    mechanic: "Isolation",
    difficulty: "Beginner",
    equipment: ["Barbell", "Dumbbell", "Cable", "EZ bar"],
    summary:
      "An isolation movement for the forearm flexors that also helps grip strength.",
    steps: [
      "Sit with your forearms on your thighs or a bench and your wrists hanging over the edge.",
      "Hold the weight with palms facing up.",
      "Let the weight roll down toward your fingertips.",
      "Curl your wrists up as far as you can.",
    ],
    variations: [
      {
        label: "Behind-the-Back",
        equipment: ["Barbell"],
        cue: "Stand holding the bar behind your thighs and curl it up with your wrists.",
      },
      {
        label: "Single-Arm",
        equipment: ["Dumbbell", "Cable"],
        difficultyChange: 1,
        cue: "Work one arm at a time to even out strength differences between sides.",
      },
    ],
  },
  {
    movement: "Reverse Wrist Curl",
    primaryMuscleGroup: "Forearms",
    secondaryMuscleGroups: [],
    mechanic: "Isolation",
    difficulty: "Beginner",
    equipment: ["Barbell", "Dumbbell", "Cable", "Resistance band"],
    summary:
      "An isolation movement for the forearm extensors on the back of the forearm.",
    steps: [
      "Sit with your forearms on your thighs and your wrists hanging over your knees.",
      "Hold the weight with palms facing down.",
      "Lift the back of your hands toward the ceiling.",
      "Lower slowly.",
    ],
    variations: [
      {
        label: "Single-Arm",
        equipment: ["Dumbbell", "Cable", "Resistance band"],
        difficultyChange: 1,
        cue: "Work one arm at a time to even out strength differences between sides.",
      },
    ],
  },
  {
    movement: "Reverse Curl",
    primaryMuscleGroup: "Forearms",
    secondaryMuscleGroups: ["Biceps"],
    mechanic: "Isolation",
    difficulty: "Beginner",
    equipment: ["Barbell", "EZ bar", "Dumbbell", "Cable", "Resistance band"],
    summary:
      "A curl with palms facing down, which shifts the work to the forearms and the brachialis.",
    steps: [
      "Hold the weight with an overhand grip at about shoulder width.",
      "Keep your elbows at your sides.",
      "Curl the weight up while keeping your wrists straight.",
      "Lower slowly to straight arms.",
    ],
    variations: [
      {
        label: "Preacher",
        equipment: ["EZ bar", "Barbell", "Dumbbell"],
        cue: "Brace your upper arms on a preacher pad to remove any swinging.",
      },
      {
        label: "Single-Arm",
        equipment: ["Dumbbell", "Cable"],
        difficultyChange: 1,
        cue: "Work one arm at a time to even out strength differences between sides.",
      },
    ],
  },
  {
    movement: "Farmer's Carry",
    primaryMuscleGroup: "Forearms",
    secondaryMuscleGroups: ["Core", "Back", "Shoulders"],
    mechanic: "Compound",
    difficulty: "Beginner",
    equipment: ["Dumbbell", "Kettlebell"],
    allowsTempoVariations: false,
    summary:
      "A loaded walk that builds grip strength, core stability, and upper-back endurance.",
    steps: [
      "Pick up a heavy weight in each hand with a neutral grip.",
      "Stand tall with your shoulders back and your core braced.",
      "Walk with short, controlled steps for the set distance or time.",
      "Set the weights down by hinging at the hips, not by rounding your back.",
    ],
    variations: [
      {
        label: "Bottoms-Up",
        equipment: ["Kettlebell"],
        difficultyChange: 1,
        cue: "Hold kettlebells upside down by the handle, which forces a crushing grip.",
      },
      {
        label: "Overhead",
        equipment: ["Dumbbell", "Kettlebell"],
        difficultyChange: 1,
        primaryMuscleGroup: "Shoulders",
        secondaryMuscleGroups: ["Core", "Triceps"],
        cue: "Hold the weight locked out overhead as you walk.",
      },
    ],
  },
  {
    movement: "Dead Hang",
    primaryMuscleGroup: "Forearms",
    secondaryMuscleGroups: ["Back", "Shoulders"],
    mechanic: "Isolation",
    difficulty: "Beginner",
    equipment: ["Bodyweight"],
    allowsTempoVariations: false,
    summary:
      "Hanging from a bar for time, which builds grip endurance and decompresses the shoulders.",
    steps: [
      "Grab a pull-up bar with an overhand grip at shoulder width.",
      "Lift your feet and hang with straight arms.",
      "Keep your shoulders slightly engaged rather than fully relaxed.",
      "Hold for the set time, then step down.",
    ],
    variations: [
      {
        label: "Single-Arm",
        difficultyChange: 2,
        cue: "Hang from one hand to roughly double the load on your grip.",
      },
      {
        label: "Towel",
        difficultyChange: 1,
        cue: "Drape two towels over the bar and hang from them for a thicker, harder grip.",
      },
      {
        label: "Weighted",
        difficultyChange: 1,
        cue: "Hang a weight from a dip belt to make the hold harder.",
      },
    ],
  },
  {
    movement: "Plank",
    primaryMuscleGroup: "Core",
    secondaryMuscleGroups: ["Shoulders", "Glutes"],
    mechanic: "Isolation",
    difficulty: "Beginner",
    equipment: ["Bodyweight"],
    allowsTempoVariations: false,
    summary: "A static hold that trains the core to keep the spine steady.",
    steps: [
      "Rest on your forearms with your elbows under your shoulders.",
      "Step your feet back so your body forms a straight line.",
      "Squeeze your glutes and pull your ribs down toward your hips.",
      "Hold the position for the set time while breathing steadily.",
    ],
    variations: [
      {
        label: "Side",
        cue: "Balance on one forearm and the side of one foot to work the obliques.",
      },
      {
        label: "Weighted",
        difficultyChange: 1,
        cue: "Have a partner place a plate on your upper back.",
      },
      {
        label: "RKC",
        difficultyChange: 1,
        cue: "Squeeze everything as hard as you can and pull your elbows toward your toes, which makes a short hold very intense.",
      },
      {
        label: "Long-Lever",
        difficultyChange: 1,
        cue: "Place your elbows farther in front of your shoulders to increase the load.",
      },
      {
        label: "Shoulder-Tap",
        cue: "Hold a high plank and tap each shoulder with the opposite hand without letting your hips rock.",
      },
      {
        label: "Copenhagen",
        difficultyChange: 1,
        cue: "Hold a side plank with your top leg resting on a bench to work the inner thighs and obliques.",
      },
    ],
  },
  {
    movement: "Crunch",
    primaryMuscleGroup: "Core",
    secondaryMuscleGroups: [],
    mechanic: "Isolation",
    difficulty: "Beginner",
    equipment: [
      "Bodyweight",
      "Cable",
      "Machine",
      "Dumbbell",
      "Resistance band",
    ],
    summary: "A short spinal flexion that trains the front abdominal muscles.",
    steps: [
      "Set up on your back with knees bent, in the machine, or kneeling at the anchor.",
      "Lift your head and shoulders by curling your ribs toward your hips.",
      "Pause and squeeze your abs at the top.",
      "Lower slowly without pulling on your neck.",
    ],
    variations: [
      {
        label: "Reverse",
        placement: "afterEquipment",
        equipment: ["Bodyweight"],
        cue: "Lift your hips off the floor by curling your knees toward your chest.",
      },
      {
        label: "Bicycle",
        placement: "afterEquipment",
        equipment: ["Bodyweight"],
        cue: "Bring each elbow toward the opposite knee as you pedal your legs.",
      },
      {
        label: "Decline",
        equipment: ["Bodyweight", "Dumbbell"],
        difficultyChange: 1,
        cue: "Hook your feet on a decline bench for a longer, harder range.",
      },
      {
        label: "Kneeling",
        equipment: ["Cable", "Resistance band"],
        cue: "Kneel in front of a high anchor and crunch down, pulling your elbows toward your knees.",
      },
    ],
  },
  {
    movement: "Hanging Leg Raise",
    primaryMuscleGroup: "Core",
    secondaryMuscleGroups: ["Forearms"],
    mechanic: "Isolation",
    difficulty: "Intermediate",
    equipment: ["Bodyweight"],
    summary:
      "A core exercise done hanging from a bar that trains the lower abs and hip flexors.",
    steps: [
      "Hang from a pull-up bar with straight arms.",
      "Brace your core to stop your body from swinging.",
      "Raise your legs until your hips are bent at least 90 degrees.",
      "Lower your legs slowly.",
    ],
    variations: [
      {
        label: "Bent-Knee",
        difficultyChange: -1,
        cue: "Raise your knees toward your chest instead of keeping your legs straight.",
      },
      {
        label: "Oblique",
        cue: "Raise your legs toward one side, alternating sides each rep.",
      },
      {
        label: "Toes-to-Bar",
        difficultyChange: 1,
        cue: "Raise your legs all the way until your toes touch the bar.",
      },
      {
        label: "Weighted",
        difficultyChange: 1,
        cue: "Hold a light dumbbell between your feet.",
      },
    ],
  },
  {
    movement: "Lying Leg Raise",
    primaryMuscleGroup: "Core",
    secondaryMuscleGroups: [],
    mechanic: "Isolation",
    difficulty: "Beginner",
    equipment: ["Bodyweight"],
    summary: "A floor exercise that trains the lower abs by lifting the legs.",
    steps: [
      "Lie on your back with your legs straight and your hands under your hips.",
      "Press your lower back into the floor.",
      "Raise your legs until they're vertical.",
      "Lower them slowly without letting your lower back arch.",
    ],
    variations: [
      {
        label: "Weighted",
        difficultyChange: 1,
        cue: "Wear ankle weights or hold a light dumbbell between your feet.",
      },
    ],
  },
  {
    movement: "Russian Twist",
    primaryMuscleGroup: "Core",
    secondaryMuscleGroups: [],
    mechanic: "Isolation",
    difficulty: "Beginner",
    equipment: ["Bodyweight", "Dumbbell", "Kettlebell"],
    summary: "A seated rotation that trains the obliques.",
    steps: [
      "Sit with your knees bent and lean back until your torso is at about 45 degrees.",
      "Hold your hands or the weight in front of your chest.",
      "Rotate your torso to one side, then the other.",
      "Keep your chest up and your lower back from rounding.",
    ],
    variations: [
      {
        label: "Feet-Elevated",
        difficultyChange: 1,
        cue: "Lift your feet off the floor so your core also has to balance you.",
      },
    ],
  },
  {
    movement: "Pallof Press",
    primaryMuscleGroup: "Core",
    secondaryMuscleGroups: ["Shoulders"],
    mechanic: "Isolation",
    difficulty: "Beginner",
    equipment: ["Cable", "Resistance band"],
    summary:
      "An anti-rotation exercise where you resist the pull of a cable or band trying to twist you.",
    steps: [
      "Set up side-on to the anchor and hold the handle against your chest.",
      "Brace your core and stay tall.",
      "Press the handle straight out in front of you without letting your torso turn.",
      "Bring the handle back to your chest.",
    ],
    variations: [
      {
        label: "Half-Kneeling",
        cue: "Kneel on the knee closest to the anchor for a smaller base of support.",
      },
      {
        label: "Tall-Kneeling",
        cue: "Kneel on both knees so your hips can't help.",
      },
      {
        label: "Split-Stance",
        cue: "Stand in a split stance to challenge your balance.",
      },
      {
        label: "Overhead",
        difficultyChange: 1,
        cue: "Press the handle overhead instead of straight out.",
      },
    ],
  },
  {
    movement: "Woodchop",
    primaryMuscleGroup: "Core",
    secondaryMuscleGroups: ["Shoulders"],
    mechanic: "Compound",
    difficulty: "Beginner",
    equipment: ["Cable", "Resistance band", "Dumbbell", "Kettlebell"],
    summary:
      "A diagonal rotation that trains the obliques to produce power across the body.",
    steps: [
      "Set up side-on to the anchor, or hold the weight beside one hip.",
      "Rotate through your torso and hips to sweep the handle or weight diagonally across your body.",
      "Keep your arms mostly straight and let your back foot pivot.",
      "Return slowly along the same path.",
    ],
    variations: [
      {
        label: "High-to-Low",
        cue: "Start above one shoulder and finish beside the opposite hip.",
      },
      {
        label: "Low-to-High",
        cue: "Start beside one hip and finish above the opposite shoulder.",
      },
      {
        label: "Half-Kneeling",
        cue: "Kneel on one knee to keep your hips still, so the rotation comes from your torso.",
      },
    ],
  },
  {
    movement: "Dead Bug",
    primaryMuscleGroup: "Core",
    secondaryMuscleGroups: [],
    mechanic: "Isolation",
    difficulty: "Beginner",
    equipment: ["Bodyweight", "Dumbbell", "Resistance band"],
    summary:
      "A floor exercise that trains the core to keep the lower back still while the arms and legs move.",
    steps: [
      "Lie on your back with your arms pointing at the ceiling and your knees bent over your hips.",
      "Press your lower back gently into the floor.",
      "Lower one arm behind your head and the opposite leg toward the floor at the same time.",
      "Return to the start and switch sides.",
    ],
    variations: [],
  },
  {
    movement: "Mountain Climber",
    primaryMuscleGroup: "Core",
    secondaryMuscleGroups: ["Shoulders", "Quadriceps"],
    mechanic: "Compound",
    difficulty: "Beginner",
    equipment: ["Bodyweight"],
    allowsTempoVariations: false,
    summary:
      "A fast-paced plank where you drive your knees toward your chest, training the core and conditioning.",
    steps: [
      "Start in a high plank with your hands under your shoulders.",
      "Drive one knee toward your chest.",
      "Switch legs quickly, keeping your hips level.",
      "Continue for the set time or number of reps.",
    ],
    variations: [
      {
        label: "Cross-Body",
        cue: "Drive each knee toward the opposite elbow to bring in the obliques.",
      },
    ],
  },
  {
    movement: "Sit-Up",
    primaryMuscleGroup: "Core",
    secondaryMuscleGroups: [],
    mechanic: "Isolation",
    difficulty: "Beginner",
    equipment: ["Bodyweight", "Dumbbell"],
    summary: "A full-range trunk flexion from lying to sitting.",
    steps: [
      "Lie on your back with your knees bent and feet anchored.",
      "Curl your chest up toward your knees until you're sitting upright.",
      "Keep the movement smooth rather than jerking up.",
      "Lower yourself back down slowly.",
    ],
    variations: [
      {
        label: "Decline",
        difficultyChange: 1,
        cue: "Use a decline bench for a longer range and more resistance.",
      },
      {
        label: "Butterfly",
        cue: "Put the soles of your feet together with your knees out to the sides.",
      },
    ],
  },
  {
    movement: "Ab Rollout",
    primaryMuscleGroup: "Core",
    secondaryMuscleGroups: ["Back", "Shoulders"],
    mechanic: "Compound",
    difficulty: "Intermediate",
    equipment: ["Barbell"],
    summary:
      "An anti-extension exercise where you roll forward and stop your lower back from sagging.",
    steps: [
      "Kneel and hold a barbell with round plates or an ab wheel under your shoulders.",
      "Brace your core and roll forward slowly.",
      "Go as far as you can without your lower back arching.",
      "Pull yourself back to the start using your abs.",
    ],
    variations: [
      {
        label: "Standing",
        difficultyChange: 2,
        cue: "Start from your feet instead of your knees, an advanced progression.",
      },
    ],
  },
  {
    movement: "Squat",
    primaryMuscleGroup: "Quadriceps",
    secondaryMuscleGroups: ["Glutes", "Hamstrings", "Core"],
    mechanic: "Compound",
    difficulty: "Intermediate",
    equipment: [
      "Barbell",
      "Dumbbell",
      "Kettlebell",
      "Smith machine",
      "Bodyweight",
    ],
    summary:
      "The foundational lower-body movement, bending the knees and hips together to train the whole leg.",
    steps: [
      "Stand with your feet about shoulder-width apart and toes turned out slightly.",
      "Brace your core and sit your hips down and back between your heels.",
      "Keep your chest up and your knees tracking over your toes.",
      "Go as deep as you can with a flat back, then drive up through your whole foot.",
    ],
    variations: [
      {
        label: "Front",
        placement: "afterEquipment",
        equipment: ["Barbell", "Smith machine", "Dumbbell", "Kettlebell"],
        difficultyChange: 1,
        cue: "Hold the weight on the front of your shoulders, which keeps your torso upright and loads the quads.",
      },
      {
        label: "Goblet",
        placement: "afterEquipment",
        equipment: ["Dumbbell", "Kettlebell"],
        difficultyChange: -1,
        cue: "Hold one weight against your chest, which makes it easy to stay upright and learn the squat.",
      },
      {
        label: "Box",
        placement: "afterEquipment",
        equipment: ["Barbell", "Smith machine", "Bodyweight", "Dumbbell"],
        cue: "Sit back to a box behind you before standing up, which teaches depth and control.",
      },
      {
        label: "Sumo",
        placement: "afterEquipment",
        equipment: ["Dumbbell", "Kettlebell", "Barbell"],
        cue: "Take a wide stance with toes turned out to bring in more glutes and inner thighs.",
      },
      {
        label: "Heels-Elevated",
        cue: "Put your heels on a small plate or wedge, which lets your knees travel forward and works the quads more.",
      },
      {
        label: "Jump",
        placement: "afterEquipment",
        equipment: ["Bodyweight", "Dumbbell"],
        cue: "Explode up into a jump and land softly back into the next rep.",
      },
      {
        label: "Zercher",
        placement: "afterEquipment",
        equipment: ["Barbell"],
        difficultyChange: 1,
        cue: "Hold the bar in the crooks of your elbows, which challenges the upper back and core.",
      },
      {
        label: "Overhead",
        placement: "afterEquipment",
        equipment: ["Barbell", "Dumbbell", "Kettlebell"],
        difficultyChange: 1,
        cue: "Hold the weight locked out overhead throughout, which demands a lot of mobility.",
      },
    ],
  },
  {
    movement: "Leg Press",
    primaryMuscleGroup: "Quadriceps",
    secondaryMuscleGroups: ["Glutes", "Hamstrings"],
    mechanic: "Compound",
    difficulty: "Beginner",
    equipment: ["Machine"],
    summary:
      "A machine press that lets you load the legs heavily without needing to balance the weight.",
    steps: [
      "Sit in the machine with your back flat against the pad.",
      "Place your feet shoulder-width apart in the middle of the platform.",
      "Release the safeties and lower the platform until your knees are bent about 90 degrees.",
      "Press back up without locking your knees hard.",
    ],
    variations: [
      {
        label: "Single-Leg",
        difficultyChange: 1,
        cue: "Work one leg at a time, which adds a balance challenge and evens out side-to-side differences.",
      },
      {
        label: "Narrow-Stance",
        cue: "Place your feet close together and low on the platform to focus on the quads.",
      },
      {
        label: "Wide-Stance",
        primaryMuscleGroup: "Glutes",
        secondaryMuscleGroups: ["Quadriceps", "Hamstrings"],
        cue: "Place your feet wide and high on the platform to bring in more glutes and inner thighs.",
      },
    ],
  },
  {
    movement: "Hack Squat",
    primaryMuscleGroup: "Quadriceps",
    secondaryMuscleGroups: ["Glutes"],
    mechanic: "Compound",
    difficulty: "Intermediate",
    equipment: ["Machine", "Barbell"],
    summary:
      "A squat with the load behind you or on an angled sled that puts heavy emphasis on the quads.",
    steps: [
      "Stand on the platform with your back against the pad, or hold a barbell behind your legs.",
      "Place your feet about shoulder-width apart.",
      "Lower until your thighs are at least parallel to the platform or floor.",
      "Drive back up through your whole foot.",
    ],
    variations: [
      {
        label: "Narrow-Stance",
        cue: "Bring your feet closer together to focus more on the quads.",
      },
      {
        label: "Reverse",
        equipment: ["Machine"],
        cue: "Face the pad instead of leaning back on it, which shifts some work to the glutes.",
      },
    ],
  },
  {
    movement: "Lunge",
    primaryMuscleGroup: "Quadriceps",
    secondaryMuscleGroups: ["Glutes", "Hamstrings"],
    mechanic: "Compound",
    difficulty: "Beginner",
    equipment: [
      "Barbell",
      "Dumbbell",
      "Kettlebell",
      "Smith machine",
      "Bodyweight",
    ],
    summary:
      "A single-leg movement that steps into a split stance, training the legs and balance together.",
    steps: [
      "Stand tall with your feet hip-width apart.",
      "Step forward and lower until both knees are bent about 90 degrees.",
      "Keep your torso upright and your front knee over your foot.",
      "Push through your front foot to return to standing.",
    ],
    variations: [
      {
        label: "Reverse",
        placement: "afterEquipment",
        cue: "Step backward instead of forward, which is easier on the knees.",
      },
      {
        label: "Walking",
        placement: "afterEquipment",
        equipment: ["Dumbbell", "Kettlebell", "Bodyweight", "Barbell"],
        cue: "Step through into the next lunge instead of returning to the start.",
      },
      {
        label: "Lateral",
        placement: "afterEquipment",
        equipment: ["Dumbbell", "Kettlebell", "Bodyweight"],
        primaryMuscleGroup: "Glutes",
        secondaryMuscleGroups: ["Quadriceps"],
        cue: "Step out to the side and sit back into that hip.",
      },
      {
        label: "Curtsy",
        placement: "afterEquipment",
        equipment: ["Dumbbell", "Kettlebell", "Bodyweight"],
        primaryMuscleGroup: "Glutes",
        secondaryMuscleGroups: ["Quadriceps"],
        cue: "Step back and across behind your front leg to bring in more glutes.",
      },
      {
        label: "Jumping",
        placement: "afterEquipment",
        equipment: ["Bodyweight"],
        difficultyChange: 1,
        cue: "Jump and switch legs in the air between reps.",
      },
    ],
  },
  {
    movement: "Split Squat",
    primaryMuscleGroup: "Quadriceps",
    secondaryMuscleGroups: ["Glutes", "Hamstrings"],
    mechanic: "Compound",
    difficulty: "Beginner",
    equipment: [
      "Dumbbell",
      "Barbell",
      "Kettlebell",
      "Smith machine",
      "Bodyweight",
    ],
    summary: "A stationary split-stance squat that trains one leg at a time.",
    steps: [
      "Stand in a long split stance with your back heel lifted.",
      "Lower straight down until your back knee nearly touches the floor.",
      "Keep most of your weight on your front foot.",
      "Drive up through your front foot and repeat before switching sides.",
    ],
    variations: [
      {
        label: "Bulgarian",
        placement: "afterEquipment",
        difficultyChange: 1,
        cue: "Rest your back foot on a bench behind you, which puts much more load on the front leg.",
      },
      {
        label: "Front-Foot-Elevated",
        cue: "Put your front foot on a low step for a deeper range of motion.",
      },
    ],
  },
  {
    movement: "Leg Extension",
    primaryMuscleGroup: "Quadriceps",
    secondaryMuscleGroups: [],
    mechanic: "Isolation",
    difficulty: "Beginner",
    equipment: ["Machine", "Resistance band"],
    summary:
      "An isolation movement for the quads that straightens the knee against resistance.",
    steps: [
      "Sit with your back against the pad and the roller just above your ankles.",
      "Grip the handles to keep your hips down.",
      "Straighten your legs fully and squeeze your quads.",
      "Lower slowly until your knees are bent about 90 degrees.",
    ],
    variations: [
      {
        label: "Single-Leg",
        difficultyChange: 1,
        cue: "Extend one leg at a time to even out strength differences between sides.",
      },
    ],
  },
  {
    movement: "Step-Up",
    primaryMuscleGroup: "Quadriceps",
    secondaryMuscleGroups: ["Glutes", "Hamstrings"],
    mechanic: "Compound",
    difficulty: "Beginner",
    equipment: ["Dumbbell", "Barbell", "Kettlebell", "Bodyweight"],
    summary:
      "A single-leg movement where you step up onto a box, building leg strength and balance.",
    steps: [
      "Stand facing a box or bench about knee height.",
      "Place your whole foot on the box.",
      "Drive through that foot to stand up on the box, without pushing off the back foot.",
      "Step back down slowly with the same leg leading.",
    ],
    variations: [
      {
        label: "Lateral",
        placement: "afterEquipment",
        cue: "Stand beside the box and step up sideways.",
      },
      {
        label: "Crossover",
        placement: "afterEquipment",
        primaryMuscleGroup: "Glutes",
        secondaryMuscleGroups: ["Quadriceps"],
        cue: "Step across your body onto a box beside you to bring in more glutes.",
      },
      {
        label: "High-Box",
        difficultyChange: 1,
        cue: "Use a box above knee height for a longer range of motion.",
      },
    ],
  },
  {
    movement: "Sissy Squat",
    primaryMuscleGroup: "Quadriceps",
    secondaryMuscleGroups: [],
    mechanic: "Isolation",
    difficulty: "Advanced",
    equipment: ["Bodyweight"],
    summary:
      "A bodyweight quad exercise where you lean back and let your knees travel far forward.",
    steps: [
      "Stand holding a post for balance and rise onto the balls of your feet.",
      "Push your knees forward and lean your torso back in a straight line from knees to head.",
      "Lower as far as you can control.",
      "Squeeze your quads to return to standing.",
    ],
    variations: [
      {
        label: "Assisted",
        difficultyChange: -1,
        cue: "Hold onto a post with both hands and use your arms to help on the way up.",
      },
      {
        label: "Weighted",
        difficultyChange: 0,
        cue: "Hold a plate against your chest.",
      },
    ],
  },
  {
    movement: "Wall Sit",
    primaryMuscleGroup: "Quadriceps",
    secondaryMuscleGroups: ["Glutes"],
    mechanic: "Isolation",
    difficulty: "Beginner",
    equipment: ["Bodyweight", "Dumbbell"],
    allowsTempoVariations: false,
    summary:
      "A static hold in a seated position against a wall that builds quad endurance.",
    steps: [
      "Lean your back against a wall and walk your feet out.",
      "Slide down until your thighs are parallel to the floor.",
      "Keep your knees over your ankles and your back flat on the wall.",
      "Hold for the set time.",
    ],
    variations: [
      {
        label: "Single-Leg",
        difficultyChange: 1,
        cue: "Lift one foot off the floor and hold the position on one leg.",
      },
    ],
  },
  {
    movement: "Pistol Squat",
    primaryMuscleGroup: "Quadriceps",
    secondaryMuscleGroups: ["Glutes", "Core"],
    mechanic: "Compound",
    difficulty: "Advanced",
    equipment: ["Bodyweight", "Kettlebell"],
    summary:
      "A full single-leg squat with the other leg held straight out in front.",
    steps: [
      "Stand on one leg with the other leg held out in front of you.",
      "Reach your arms forward for balance.",
      "Sit down on the standing leg as low as you can control.",
      "Drive back up without letting your knee cave in.",
    ],
    variations: [
      {
        label: "Box",
        difficultyChange: -1,
        cue: "Sit down to a box behind you to limit the depth while you build strength.",
      },
      {
        label: "Assisted",
        equipment: ["Bodyweight"],
        difficultyChange: -1,
        cue: "Hold a post or a band anchored in front of you to help with balance.",
      },
    ],
  },
  {
    movement: "Romanian Deadlift",
    primaryMuscleGroup: "Hamstrings",
    secondaryMuscleGroups: ["Glutes", "Back", "Forearms"],
    mechanic: "Compound",
    difficulty: "Intermediate",
    equipment: [
      "Barbell",
      "Dumbbell",
      "Kettlebell",
      "Smith machine",
      "Resistance band",
    ],
    summary:
      "A hip hinge with nearly straight legs that stretches and strengthens the hamstrings.",
    steps: [
      "Stand tall holding the weight in front of your thighs.",
      "Keep a soft bend in your knees and push your hips back.",
      "Slide the weight down your legs until you feel a strong stretch in your hamstrings.",
      "Drive your hips forward to stand back up, keeping your back flat.",
    ],
    variations: [
      {
        label: "Single-Leg",
        equipment: ["Dumbbell", "Kettlebell", "Barbell"],
        difficultyChange: 1,
        cue: "Hinge on one leg while the other leg reaches back behind you.",
      },
      {
        label: "Staggered-Stance",
        cue: "Put most of your weight on your front leg with your back foot on its toes, a stepping stone to the single-leg version.",
      },
      {
        label: "Deficit",
        equipment: ["Barbell", "Dumbbell", "Kettlebell"],
        difficultyChange: 1,
        cue: "Stand on a low platform to increase the stretch.",
      },
    ],
  },
  {
    movement: "Leg Curl",
    primaryMuscleGroup: "Hamstrings",
    secondaryMuscleGroups: ["Calves"],
    mechanic: "Isolation",
    difficulty: "Beginner",
    equipment: ["Machine", "Resistance band", "Cable", "Dumbbell"],
    summary:
      "An isolation movement for the hamstrings that bends the knee against resistance.",
    steps: [
      "Set up so the pad sits just above your heels.",
      "Keep your hips still against the bench or seat.",
      "Curl your heels toward your glutes as far as you can.",
      "Lower slowly to straight legs.",
    ],
    variations: [
      {
        label: "Seated",
        equipment: ["Machine"],
        cue: "Use the seated machine, which trains the hamstrings in a lengthened position.",
      },
      {
        label: "Lying",
        equipment: ["Machine", "Resistance band", "Dumbbell"],
        cue: "Lie face down on the bench or floor and curl your heels toward your glutes.",
      },
      {
        label: "Standing",
        equipment: ["Machine", "Cable", "Resistance band"],
        cue: "Stand and curl one leg at a time.",
      },
      {
        label: "Single-Leg",
        equipment: ["Machine", "Resistance band", "Cable"],
        difficultyChange: 1,
        cue: "Work one leg at a time, which adds a balance challenge and evens out side-to-side differences.",
      },
    ],
  },
  {
    movement: "Nordic Hamstring Curl",
    primaryMuscleGroup: "Hamstrings",
    secondaryMuscleGroups: ["Glutes"],
    mechanic: "Isolation",
    difficulty: "Advanced",
    equipment: ["Bodyweight"],
    summary:
      "A very demanding bodyweight exercise where you lower your body forward with only your hamstrings holding you.",
    steps: [
      "Kneel with your ankles anchored under a pad or held by a partner.",
      "Keep your body straight from knees to head.",
      "Lower yourself forward as slowly as you can.",
      "Catch yourself with your hands and push back up to the start.",
    ],
    variations: [
      {
        label: "Band-Assisted",
        difficultyChange: -1,
        cue: "Loop a band from behind you around your chest to support part of your weight.",
      },
      {
        label: "Eccentric-Only",
        difficultyChange: -1,
        cue: "Focus only on the slow lowering and use your hands to reset.",
      },
    ],
  },
  {
    movement: "Good Morning",
    primaryMuscleGroup: "Hamstrings",
    secondaryMuscleGroups: ["Back", "Glutes"],
    mechanic: "Compound",
    difficulty: "Intermediate",
    equipment: ["Barbell", "Smith machine", "Resistance band"],
    summary:
      "A hip hinge with the bar on your back that trains the hamstrings and lower back.",
    steps: [
      "Place the bar across your upper back as you would for a squat.",
      "Keep a soft bend in your knees and push your hips back.",
      "Lower your torso until it's nearly parallel to the floor or you feel a strong hamstring stretch.",
      "Drive your hips forward to stand up.",
    ],
    variations: [
      {
        label: "Seated",
        equipment: ["Barbell"],
        difficultyChange: 1,
        cue: "Sit on a bench and fold forward, which removes the legs from the movement.",
      },
      {
        label: "Wide-Stance",
        cue: "Take a wider stance to bring in more of the inner thighs and glutes.",
      },
    ],
  },
  {
    movement: "Glute-Ham Raise",
    primaryMuscleGroup: "Hamstrings",
    secondaryMuscleGroups: ["Glutes", "Calves"],
    mechanic: "Compound",
    difficulty: "Advanced",
    equipment: ["Machine"],
    summary: "A machine exercise that combines a hip extension and a leg curl.",
    steps: [
      "Lock your feet in the glute-ham developer with your knees just behind the pad.",
      "Start with your body upright from knees to head.",
      "Lower your torso forward until it's parallel to the floor.",
      "Curl yourself back up by pulling with your hamstrings.",
    ],
    variations: [
      {
        label: "Band-Assisted",
        difficultyChange: -1,
        cue: "Hold a band anchored in front of you to help on the way up.",
      },
      {
        label: "Weighted",
        difficultyChange: 0,
        cue: "Hold a plate against your chest.",
      },
    ],
  },
  {
    movement: "Stiff-Leg Deadlift",
    primaryMuscleGroup: "Hamstrings",
    secondaryMuscleGroups: ["Back", "Glutes"],
    mechanic: "Compound",
    difficulty: "Intermediate",
    equipment: ["Barbell", "Dumbbell", "Kettlebell"],
    summary:
      "A deadlift with very little knee bend, starting each rep from the floor, for a big hamstring stretch.",
    steps: [
      "Stand with the weight on the floor in front of your feet.",
      "Keep your legs almost straight and hinge down to grip the weight.",
      "Stand up by driving your hips forward.",
      "Lower the weight back to the floor with your back flat.",
    ],
    variations: [
      {
        label: "Deficit",
        difficultyChange: 1,
        cue: "Stand on a platform so you can lower the weight farther.",
      },
    ],
  },
  {
    movement: "Hip Thrust",
    primaryMuscleGroup: "Glutes",
    secondaryMuscleGroups: ["Hamstrings", "Quadriceps"],
    mechanic: "Compound",
    difficulty: "Beginner",
    equipment: [
      "Barbell",
      "Dumbbell",
      "Smith machine",
      "Machine",
      "Resistance band",
      "Bodyweight",
    ],
    summary:
      "A hip extension with your upper back on a bench, the most direct way to load the glutes heavily.",
    steps: [
      "Sit with your upper back against a bench and the weight across your hips.",
      "Plant your feet so your shins are vertical at the top.",
      "Tuck your chin and drive your hips up until your body is straight from shoulders to knees.",
      "Squeeze your glutes hard at the top, then lower slowly.",
    ],
    variations: [
      {
        label: "Single-Leg",
        equipment: ["Dumbbell", "Bodyweight", "Barbell"],
        difficultyChange: 1,
        cue: "Drive through one foot with the other leg lifted.",
      },
      {
        label: "B-Stance",
        equipment: ["Barbell", "Dumbbell", "Smith machine"],
        cue: "Put most of your weight on one foot with the other heel lifted, a step toward the single-leg version.",
      },
      {
        label: "Feet-Elevated",
        equipment: ["Barbell", "Bodyweight"],
        cue: "Put your feet on a low step for more hamstring involvement.",
      },
    ],
  },
  {
    movement: "Glute Bridge",
    primaryMuscleGroup: "Glutes",
    secondaryMuscleGroups: ["Hamstrings"],
    mechanic: "Isolation",
    difficulty: "Beginner",
    equipment: ["Bodyweight", "Barbell", "Dumbbell", "Resistance band"],
    summary:
      "A floor hip extension that teaches you to drive with your glutes.",
    steps: [
      "Lie on your back with your knees bent and your feet flat near your hips.",
      "Press your lower back gently into the floor.",
      "Drive your hips up until your body is straight from shoulders to knees.",
      "Squeeze at the top, then lower slowly.",
    ],
    variations: [
      {
        label: "Single-Leg",
        equipment: ["Bodyweight", "Dumbbell"],
        difficultyChange: 1,
        cue: "Work one leg at a time, which adds a balance challenge and evens out side-to-side differences.",
      },
      {
        label: "Feet-Elevated",
        equipment: ["Bodyweight", "Dumbbell"],
        cue: "Put your heels on a bench to bring in more hamstrings.",
      },
      {
        label: "Frog",
        equipment: ["Bodyweight", "Dumbbell"],
        cue: "Put the soles of your feet together with your knees out to the sides.",
      },
    ],
  },
  {
    movement: "Glute Kickback",
    primaryMuscleGroup: "Glutes",
    secondaryMuscleGroups: ["Hamstrings"],
    mechanic: "Isolation",
    difficulty: "Beginner",
    equipment: ["Cable", "Machine", "Resistance band", "Bodyweight"],
    summary:
      "An isolation movement that drives one leg back to train the glutes.",
    steps: [
      "Attach the cuff or band to your ankle, or set up on all fours.",
      "Brace your core and keep your hips square.",
      "Drive your leg back and up by squeezing your glute.",
      "Return slowly without arching your lower back.",
    ],
    variations: [
      {
        label: "Straight-Leg",
        equipment: ["Cable", "Resistance band"],
        cue: "Keep your working leg straight throughout to lengthen the lever.",
      },
      {
        label: "Quadruped",
        equipment: ["Bodyweight", "Resistance band"],
        cue: "Start on your hands and knees and kick one heel toward the ceiling.",
      },
    ],
  },
  {
    movement: "Hip Abduction",
    primaryMuscleGroup: "Glutes",
    secondaryMuscleGroups: [],
    mechanic: "Isolation",
    difficulty: "Beginner",
    equipment: ["Machine", "Cable", "Resistance band"],
    summary:
      "An isolation movement that pushes the legs apart to train the side glutes.",
    steps: [
      "Sit in the machine or stand side-on to the anchor.",
      "Brace your core and keep your torso still.",
      "Push your leg or legs outward as far as you can.",
      "Return slowly.",
    ],
    variations: [
      {
        label: "Seated",
        equipment: ["Machine", "Resistance band"],
        cue: "Do the movement seated, which is the most stable option.",
      },
      {
        label: "Standing",
        equipment: ["Cable", "Resistance band"],
        cue: "Stand and move one leg out to the side.",
      },
      {
        label: "Leaning",
        equipment: ["Machine"],
        cue: "Lean forward in the machine to target the upper glutes.",
      },
    ],
  },
  {
    movement: "Pull-Through",
    primaryMuscleGroup: "Glutes",
    secondaryMuscleGroups: ["Hamstrings", "Back"],
    mechanic: "Compound",
    difficulty: "Beginner",
    equipment: ["Cable", "Resistance band"],
    summary:
      "A hip hinge where you face away from a low anchor and pull it through your legs.",
    steps: [
      "Face away from a low anchor and hold the rope between your legs.",
      "Walk forward a few steps and take a wide stance.",
      "Hinge back, letting the rope pull your hands between your legs.",
      "Drive your hips forward to stand tall and squeeze your glutes.",
    ],
    variations: [],
  },
  {
    movement: "Kettlebell Swing",
    primaryMuscleGroup: "Glutes",
    secondaryMuscleGroups: ["Hamstrings", "Back", "Core"],
    mechanic: "Compound",
    difficulty: "Intermediate",
    equipment: ["Kettlebell"],
    allowsTempoVariations: false,
    summary:
      "An explosive hip hinge that builds power in the glutes and hamstrings and conditions the whole body.",
    steps: [
      "Stand with the kettlebell a short distance in front of you.",
      "Hinge and hike the bell back between your legs.",
      "Drive your hips forward explosively so the bell floats to chest height.",
      "Let the bell fall back into the next hinge without squatting.",
    ],
    variations: [
      {
        label: "Single-Arm",
        equipment: ["Kettlebell"],
        difficultyChange: 1,
        cue: "Swing with one hand to add a rotational challenge for the core.",
      },
      {
        label: "American",
        difficultyChange: 1,
        cue: "Swing the bell all the way overhead.",
      },
      {
        label: "Hand-to-Hand",
        difficultyChange: 1,
        cue: "Switch hands at the top of each swing.",
      },
    ],
  },
  {
    movement: "Frog Pump",
    primaryMuscleGroup: "Glutes",
    secondaryMuscleGroups: [],
    mechanic: "Isolation",
    difficulty: "Beginner",
    equipment: ["Bodyweight", "Dumbbell"],
    summary:
      "A short-range glute bridge with the soles of the feet together, done for high reps.",
    steps: [
      "Lie on your back with the soles of your feet together and knees out to the sides.",
      "Pull your heels close to your hips.",
      "Drive your hips up and squeeze your glutes.",
      "Lower and repeat at a steady pace.",
    ],
    variations: [],
  },
  {
    movement: "Reverse Hyperextension",
    primaryMuscleGroup: "Glutes",
    secondaryMuscleGroups: ["Hamstrings", "Back"],
    mechanic: "Isolation",
    difficulty: "Intermediate",
    equipment: ["Machine", "Bodyweight"],
    summary:
      "A movement that lifts the legs behind you while your torso stays supported, training the glutes and lower back.",
    steps: [
      "Lie face down on the machine or a high bench with your hips at the edge.",
      "Hold on to the handles or the bench.",
      "Lift your legs until they're in line with your body.",
      "Lower slowly without letting your legs swing.",
    ],
    variations: [
      {
        label: "Bent-Knee",
        cue: "Keep your knees bent to focus on the glutes.",
      },
    ],
  },
  {
    movement: "Standing Calf Raise",
    primaryMuscleGroup: "Calves",
    secondaryMuscleGroups: [],
    mechanic: "Isolation",
    difficulty: "Beginner",
    equipment: [
      "Machine",
      "Barbell",
      "Dumbbell",
      "Smith machine",
      "Bodyweight",
    ],
    summary:
      "An isolation movement that rises up onto the toes with straight knees to train the calves.",
    steps: [
      "Stand with the balls of your feet on a step or platform.",
      "Keep your knees straight but not locked.",
      "Lower your heels until you feel a deep stretch in your calves.",
      "Rise as high as you can onto your toes and pause.",
    ],
    variations: [
      {
        label: "Single-Leg",
        equipment: ["Dumbbell", "Bodyweight", "Machine", "Smith machine"],
        difficultyChange: 1,
        cue: "Work one leg at a time, which adds a balance challenge and evens out side-to-side differences.",
      },
      {
        label: "Toes-In",
        cue: "Point your toes slightly inward to bias the outer calf.",
      },
      {
        label: "Toes-Out",
        cue: "Point your toes slightly outward to bias the inner calf.",
      },
    ],
  },
  {
    movement: "Seated Calf Raise",
    primaryMuscleGroup: "Calves",
    secondaryMuscleGroups: [],
    mechanic: "Isolation",
    difficulty: "Beginner",
    equipment: ["Machine", "Dumbbell", "Barbell", "Smith machine"],
    summary:
      "A calf raise with bent knees, which focuses on the soleus, the deeper calf muscle.",
    steps: [
      "Sit with the balls of your feet on a platform and the weight on your thighs.",
      "Lower your heels as far as you can.",
      "Push up onto your toes as high as possible.",
      "Pause at the top, then lower slowly.",
    ],
    variations: [
      {
        label: "Single-Leg",
        equipment: ["Machine", "Dumbbell"],
        difficultyChange: 1,
        cue: "Work one leg at a time, which adds a balance challenge and evens out side-to-side differences.",
      },
      {
        label: "Toes-In",
        cue: "Point your toes slightly inward.",
      },
      {
        label: "Toes-Out",
        cue: "Point your toes slightly outward.",
      },
    ],
  },
  {
    movement: "Leg Press Calf Raise",
    primaryMuscleGroup: "Calves",
    secondaryMuscleGroups: [],
    mechanic: "Isolation",
    difficulty: "Beginner",
    equipment: ["Machine"],
    summary:
      "A calf raise done on the leg press, which lets you load the calves heavily.",
    steps: [
      "Sit in the leg press with only the balls of your feet on the bottom of the platform.",
      "Keep your knees straight but not locked.",
      "Let the platform push your toes back toward you for a stretch.",
      "Press the platform away by pointing your toes.",
    ],
    variations: [
      {
        label: "Single-Leg",
        difficultyChange: 1,
        cue: "Work one leg at a time, which adds a balance challenge and evens out side-to-side differences.",
      },
    ],
  },
  {
    movement: "Donkey Calf Raise",
    primaryMuscleGroup: "Calves",
    secondaryMuscleGroups: [],
    mechanic: "Isolation",
    difficulty: "Intermediate",
    equipment: ["Machine", "Bodyweight"],
    summary:
      "A calf raise with your hips bent forward, which stretches the calves at the bottom.",
    steps: [
      "Bend forward at the hips with your hands on a support and the balls of your feet on a step.",
      "Keep your knees straight.",
      "Lower your heels as far as you can.",
      "Rise onto your toes and pause.",
    ],
    variations: [
      {
        label: "Single-Leg",
        difficultyChange: 1,
        cue: "Work one leg at a time, which adds a balance challenge and evens out side-to-side differences.",
      },
    ],
  },
  {
    movement: "Pogo Jump",
    primaryMuscleGroup: "Calves",
    secondaryMuscleGroups: ["Quadriceps"],
    mechanic: "Isolation",
    difficulty: "Beginner",
    equipment: ["Bodyweight"],
    allowsTempoVariations: false,
    summary:
      "Small, quick jumps on stiff ankles that train the calves to be springy.",
    steps: [
      "Stand tall with your feet hip-width apart.",
      "Jump using mostly your ankles, keeping your knees nearly straight.",
      "Land on the balls of your feet and bounce straight back up.",
      "Keep each ground contact as short as possible.",
    ],
    variations: [
      {
        label: "Single-Leg",
        difficultyChange: 1,
        cue: "Bounce on one foot, which doubles the load on that calf.",
      },
      {
        label: "Lateral",
        cue: "Bounce side to side over a line.",
      },
    ],
  },
  {
    movement: "Tibialis Raise",
    primaryMuscleGroup: "Calves",
    secondaryMuscleGroups: [],
    mechanic: "Isolation",
    difficulty: "Beginner",
    equipment: ["Bodyweight", "Resistance band", "Machine"],
    summary:
      "Lifting your toes toward your shins to train the muscle on the front of the lower leg, which balances calf work.",
    steps: [
      "Lean your back against a wall with your heels about a foot away from it.",
      "Keep your legs straight.",
      "Lift your toes toward your shins as high as you can.",
      "Lower them slowly without touching the floor.",
    ],
    variations: [
      {
        label: "Single-Leg",
        equipment: ["Bodyweight", "Resistance band"],
        difficultyChange: 1,
        cue: "Work one leg at a time, which adds a balance challenge and evens out side-to-side differences.",
      },
    ],
  },
];

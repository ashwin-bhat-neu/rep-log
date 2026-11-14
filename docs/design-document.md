# RepLog: Design Document

## Project description

RepLog helps people keep track of their training and see where their effort is going. Users log workouts with the exercises they did, the sets and reps for each, and the muscle group each exercise targets. They can browse an exercise library, save their own custom exercise templates, and view a breakdown of their training over the past week or month: how many exercises and sets they did, and which muscle groups they trained most and least.

The app has two independent features:

- **Workout log and training breakdown**: create, edit, and delete workout sessions, browse and filter past workouts, and see sets and exercises per muscle group for the last week or month.
- **Exercise library and custom templates**: search the library by name, muscle group, and equipment, open an exercise for its details, and create, edit, and delete custom exercise templates.

Each exercise logged in a workout stores its own name and target muscle group, so the workout log and breakdown work without reading the exercise library. Users log in with a username and password, and workouts and custom templates are private to each user.

### Team and work division

| Member                        | Feature                        | Collections                     | Scope                                                                                      |
| ----------------------------- | ------------------------------ | ------------------------------- | ------------------------------------------------------------------------------------------ |
| Ashwin Bhat                   | Workout log and breakdown      | `users`, `workouts`, `sessions` | Authentication, workout CRUD, history filtering, weekly and monthly muscle group breakdown |
| Mohammed Sameer Sarfaraz Bake | Exercise library and templates | `exercises`, `customTemplates`  | Exercise search and filtering, exercise detail page, custom template CRUD                  |

Each of us builds the full stack for our own feature: MongoDB collection, Express routes, and React components.

### Tech stack

- **Frontend:** React with hooks, React Router, Fetch API, PropTypes, Chart.js, built with Vite
- **Backend:** Node.js and Express
- **Authentication:** Passport with the local strategy and `express-session`
- **Database:** MongoDB with the native Node.js driver
- **Deployment:** Vercel, with MongoDB Atlas

## User personas

### Arjun, a beginner

Arjun started going to the gym two months ago. He follows a program a friend sent him, but he forgets what weight he used last time and keeps his notes in a phone app that doesn't line up sessions side by side.

- **Goal:** a quick way to record each session and see his numbers go up.
- **Frustration:** notes apps don't know what a set is, and fitness apps bury logging under subscriptions and social feeds.

### Maya, an intermediate lifter

Maya trains five days a week on a push, pull, legs split. Some weeks she swaps sessions around her work schedule, and she suspects some muscle groups get skipped more often than she realizes.

- **Goal:** check over a week or a month that every muscle group is getting work.
- **Frustration:** she can't see that balance without counting sets by hand.

### Kevin, a kinesiology student

Kevin is studying how exercises are classified by the muscles they target and the equipment they need. He wants to look movements up by muscle group and compare them.

- **Goal:** search and filter exercises by muscle group and equipment, and read how each one works.
- **Frustration:** exercise sites mix advice and ads with the data he actually needs.

## Muscle groups

Both features use the same fixed list, so a workout logged as "Chest" and a library exercise targeting "Chest" refer to the same thing:

Chest, Back, Shoulders, Biceps, Triceps, Forearms, Core, Quadriceps, Hamstrings, Glutes, Calves.

## User stories

### Workout log and training breakdown (Ashwin)

#### 1. Log, edit, and delete workouts

> As Arjun, I want to create, edit, and delete workout sessions with the exercises, sets, and reps I did so that I can keep an accurate record of my training.

After leg day, Arjun opens **Workouts** and clicks **Log workout**. The date is already set to today. He adds "Barbell squat", picks Quadriceps as the muscle group, and enters four sets of 8 reps at 60 kg. He adds leg press, Romanian deadlifts, and calf raises the same way, writes "Squats felt heavy" in the notes, and saves. The next morning he notices he logged three sets of leg press instead of four, so he clicks **Edit**, adds the missing set, and saves again. A workout he logged twice by mistake he deletes after confirming.

- Date is required and defaults to today. Notes are optional, up to 500 characters.
- A workout has 1 to 20 exercises. Each exercise has a name (up to 80 characters), a target muscle group from the fixed list, and 1 to 20 sets.
- Each set has a rep count from 1 to 100 and an optional weight in kilograms from 0 to 1,000.
- **Edit** opens the same form with every field filled in. **Delete** asks for confirmation first.
- Workouts are stored under the logged-in user. Another user's workout returns a 404, the same as one that doesn't exist.

#### 2. Browse and filter past workouts

> As Arjun, I want to view my past workouts and filter them by date range or exercise so that I can see how my sets and reps have changed over time.

Arjun wants to know whether his squat is improving. On **Workouts** he types "squat" into the exercise filter and applies it. The list narrows to the workouts that include a squat, newest first, and each card shows only the squat with its sets, so reading down the list he can see he went from 3 × 8 at 60 kg to 4 × 8 at 65 kg. He then sets the date range to last month to compare just those sessions.

- Workouts are sorted by date, newest first, 20 per page with **Previous** and **Next**.
- **From** and **To** are optional and inclusive. Either one can be used on its own.
- The exercise filter matches any part of an exercise name, ignoring case. When it is active, each card shows only the matching exercises and how many of the workout's exercises are hidden.
- Filtering happens on the server with `?from=`, `?to=`, `?exercise=`, and `?page=`. **Clear** resets all filters.

#### 3. See a training breakdown by muscle group

> As Maya, I want to see a breakdown of how many exercises and sets I did per muscle group over the past week or month so that I can spot muscle groups I'm undertraining.

At the end of the month Maya opens **Breakdown** and picks **Month**. The page shows 14 workouts, 58 exercises, and 216 sets over the last 30 days. Chest is her most trained group at 48 sets, Core the least trained at 4, and Calves and Forearms are flagged as not trained at all. The chart of sets per muscle group makes the gap obvious, so she adds calf raises and wrist curls to her leg and pull days. She switches to **Week** to check that the change shows up the following week.

- **Week** covers the last 7 days including today. **Month** covers the last 30 days including today.
- Every muscle group in the fixed list appears, including groups with zero sets, so missing groups are visible rather than absent.
- **Most trained** and **Least trained** compare groups with at least one set. Groups with zero sets are listed separately as **Not trained**.
- The chart shows sets per group. A table next to it lists exercises and sets per group, so the same numbers are readable without the chart.

### Exercise library and custom templates (Mohammed)

#### 4. Search and filter the exercise library

> As Kevin, I want to search and filter the exercise library by name, muscle group, and equipment so that I can find exercises that target a specific area.

#### 5. View an exercise's details

> As Kevin, I want to open an exercise and see its target muscles, equipment, difficulty, and description so that I understand how the movement works.

#### 6. Manage custom exercise templates

> As Maya, I want to create, edit, and delete my own custom exercise templates with a name, target muscles, and default sets/reps so that I can save exercises that aren't in the library.

## Data model

### `users`

| Field          | Type     | Notes                                                      |
| -------------- | -------- | ---------------------------------------------------------- |
| `_id`          | ObjectId |                                                            |
| `username`     | string   | 3 to 30 letters, numbers, or underscores, stored lowercase |
| `passwordHash` | string   | scrypt hash from Node's `crypto` module, hex encoded       |
| `passwordSalt` | string   | Random per-user salt, hex encoded                          |
| `createdAt`    | Date     |                                                            |

Unique index on `{ username: 1 }`.

### `workouts`

| Field                                | Type           | Notes                                                                      |
| ------------------------------------ | -------------- | -------------------------------------------------------------------------- |
| `_id`                                | ObjectId       |                                                                            |
| `userId`                             | ObjectId       | Owner                                                                      |
| `performedOn`                        | string         | `YYYY-MM-DD`, kept as a date-only string so time zones can't shift the day |
| `notes`                              | string         | Optional                                                                   |
| `exercises`                          | array          | 1 to 20 entries                                                            |
| `exercises[].exerciseName`           | string         | Up to 80 characters                                                        |
| `exercises[].targetMuscleGroup`      | string         | One of the fixed muscle groups                                             |
| `exercises[].sets`                   | array          | 1 to 20 entries                                                            |
| `exercises[].sets[].repetitionCount` | number         | 1 to 100                                                                   |
| `exercises[].sets[].weightKilograms` | number or null | 0 to 1,000; null for bodyweight sets                                       |
| `createdAt`                          | Date           |                                                                            |
| `updatedAt`                          | Date           |                                                                            |

Indexed on `{ userId: 1, performedOn: -1 }`, which serves the history list, the date range filter, and the breakdown query.

### `sessions`

Login sessions for `express-session`, stored in MongoDB so they survive across Vercel's serverless instances.

| Field       | Type   | Notes                                     |
| ----------- | ------ | ----------------------------------------- |
| `_id`       | string | Session ID from the signed cookie         |
| `session`   | object | Serialized session, holding the user's ID |
| `expiresAt` | Date   | TTL index removes the session after this  |

### Authentication API

| Method | Route                              | Purpose                              |
| ------ | ---------------------------------- | ------------------------------------ |
| `POST` | `/api/authentication/register`     | Create an account and log in         |
| `POST` | `/api/authentication/login`        | Log in with username and password    |
| `POST` | `/api/authentication/logout`       | End the session                      |
| `GET`  | `/api/authentication/current-user` | Return the logged-in user, or `null` |

### Workouts API

All routes require a logged-in user and only touch that user's workouts.

| Method   | Route                     | Purpose                                                              |
| -------- | ------------------------- | -------------------------------------------------------------------- |
| `GET`    | `/api/workouts`           | List workouts newest first; `?from=`, `?to=`, `?exercise=`, `?page=` |
| `GET`    | `/api/workouts/:id`       | Get one workout for the edit form                                    |
| `POST`   | `/api/workouts`           | Create a workout                                                     |
| `PUT`    | `/api/workouts/:id`       | Replace a workout with the edited version                            |
| `DELETE` | `/api/workouts/:id`       | Delete a workout                                                     |
| `GET`    | `/api/training-breakdown` | Exercises and sets per muscle group between `?from=` and `?to=`      |

## Design mockups

### Logging in

![Login page](../assets/images/login.png)

### Creating an account

![Register page](../assets/images/register.png)

### Workout history

![Workout history page](../assets/images/workout-history.png)

### Filtering workouts by exercise

![Workout history filtered by exercise](../assets/images/workout-history-filtered.png)

### No workouts yet

![Empty workout history](../assets/images/workout-history-empty.png)

### Logging a workout

The same form is used for editing, with every field filled in and the heading changed to "Edit workout".

![Workout form](../assets/images/workout-editor.png)

### Deleting a workout

![Delete confirmation](../assets/images/workout-delete.png)

### Training breakdown

![Training breakdown page](../assets/images/training-breakdown.png)

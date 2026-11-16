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

Kevin is writing a report on hip-dominant movements. He opens **Exercises**, where the library lists all 1,157 exercises alphabetically. He sets **Muscle group** to Glutes and **Equipment** to Dumbbell and applies the filters: 60 exercises remain, and each row shows its main target, its equipment, and its difficulty, with the other muscles it works underneath the name. He types "split squat" into **Name** to compare the split squat variations, then copies the address to send the same search to his lab partner.

- The library is sorted by name, 20 per page with **Previous** and **Next**.
- **Name** matches any part of an exercise name, ignoring case. **Muscle group**, **Equipment**, and **Difficulty** each pick one value from a fixed list or "Any".
- A muscle group filter matches exercises that work that group as either the main target or a secondary one, since Kevin wants every exercise that trains an area.
- Filters apply on **Apply** or Enter, not on every keystroke. **Clear** resets them all.
- Filtering happens on the server with `?search=`, `?muscleGroup=`, `?equipment=`, `?difficulty=`, and `?page=`. The page puts the same parameters in its own address, so Back, refresh, and shared links keep the results.
- When nothing matches, the page says so and suggests loosening the filters.

#### 5. View an exercise's details

> As Kevin, I want to open an exercise and see its target muscles, equipment, difficulty, and description so that I understand how the movement works.

From his filtered list Kevin opens "Incline Dumbbell Bench Press". The page shows Chest as the main target, Triceps and Shoulders as secondary muscles, the equipment, an Intermediate difficulty, and that it is a compound movement. Below that, a description explains what the incline changes compared with a flat press, and numbered steps walk through the movement. **Back to exercise library** returns him to the same filtered page he came from.

- The page shows the name, main target, other muscles worked, equipment, difficulty, type (compound or isolation), a description, and step-by-step instructions.
- An address with an unknown or malformed exercise ID shows "Exercise not found" instead of an error.
- **Save as custom template** starts a new template with the exercise's name and muscle groups already filled in, so a library exercise can be tweaked into a personal one.

#### 6. Manage custom exercise templates

> As Maya, I want to create, edit, and delete my own custom exercise templates with a name, target muscles, and default sets/reps so that I can save exercises that aren't in the library.

Maya's gym has a sled, which isn't in the library. On **Templates** she clicks **New template**, names it "Sled push", ticks Quadriceps, Glutes, and Calves, sets 4 sets of 1 rep, and notes that one rep is one length of the turf. After a few weeks she does six lengths instead, so she clicks **Edit** on the card and changes the sets. A "Landmine rotation" template she no longer uses she deletes after confirming.

- Name is required, up to 80 characters, and unique per user ignoring case. Saving a second "sled push" shows an error instead of creating a duplicate.
- At least one target muscle group, chosen from the fixed list.
- Default sets from 1 to 20 and default reps from 1 to 100, both whole numbers. Notes are optional, up to 500 characters.
- Templates are listed alphabetically as cards showing the sets and reps, muscle groups, and notes.
- **Edit** opens the same form with every field filled in. **Delete** asks for confirmation first.
- Templates are stored under the logged-in user. Another user's template returns a 404, the same as one that doesn't exist. Logged-out visitors are asked to log in.

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

### `exercises`

The shared library, the same for every user. `npm run seed:exercises` in `backend/` fills it with 1,157 synthetic exercises: 83 base movements, each expanded into one exercise per piece of equipment it can use and per variation (incline, single-arm, paused, and so on). The generator is deterministic, so reseeding always produces the same library.

| Field                   | Type     | Notes                                                       |
| ----------------------- | -------- | ----------------------------------------------------------- |
| `_id`                   | ObjectId |                                                             |
| `name`                  | string   | Unique, ignoring case                                       |
| `primaryMuscleGroup`    | string   | One of the fixed muscle groups                              |
| `secondaryMuscleGroups` | array    | Other fixed muscle groups it works, possibly empty          |
| `equipment`             | string   | Barbell, Dumbbell, EZ bar, Kettlebell, Cable, Machine, Smith machine, Resistance band, or Bodyweight |
| `difficulty`            | string   | Beginner, Intermediate, or Advanced                         |
| `mechanic`              | string   | Compound (several joints) or Isolation (one joint)          |
| `description`           | string   | What the exercise trains and what this variation changes    |
| `instructions`          | array    | Ordered steps, as strings                                   |

Indexed on `{ name: 1 }` (unique, case-insensitive collation, which also serves the alphabetical sort), `{ primaryMuscleGroup: 1 }`, `{ secondaryMuscleGroups: 1 }`, and `{ equipment: 1 }`.

### `customTemplates`

| Field                    | Type     | Notes                                |
| ------------------------ | -------- | ------------------------------------ |
| `_id`                    | ObjectId |                                      |
| `userId`                 | ObjectId | Owner                                |
| `name`                   | string   | Up to 80 characters                  |
| `targetMuscleGroups`     | array    | 1 or more of the fixed muscle groups |
| `defaultSetCount`        | number   | 1 to 20                              |
| `defaultRepetitionCount` | number   | 1 to 100                             |
| `notes`                  | string   | Up to 500 characters, may be empty   |
| `createdAt`              | Date     |                                      |
| `updatedAt`              | Date     |                                      |

Unique index on `{ userId: 1, name: 1 }` with a case-insensitive collation, which keeps names unique per user and serves the alphabetical list.

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

### Exercise library API

Public, since the library is the same for everyone.

| Method | Route                        | Purpose                                                                                     |
| ------ | ---------------------------- | ------------------------------------------------------------------------------------------- |
| `GET`  | `/api/exercises`             | List exercises by name; `?search=`, `?muscleGroup=`, `?equipment=`, `?difficulty=`, `?page=` |
| `GET`  | `/api/exercises/:exerciseId` | Get one exercise with its description and instructions                                      |

### Custom templates API

All routes require a logged-in user and only touch that user's templates.

| Method   | Route                               | Purpose                              |
| -------- | ----------------------------------- | ------------------------------------ |
| `GET`    | `/api/custom-templates`             | List the user's templates by name    |
| `GET`    | `/api/custom-templates/:templateId` | Get one template for the edit form   |
| `POST`   | `/api/custom-templates`             | Create a template                    |
| `PUT`    | `/api/custom-templates/:templateId` | Replace a template with the edited version |
| `DELETE` | `/api/custom-templates/:templateId` | Delete a template                    |

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

### Exercise library

![Exercise library page](../assets/images/exercise-library.png)

### Filtering the library

![Exercise library filtered by muscle group and equipment](../assets/images/exercise-library-filtered.png)

### No matching exercises

![Exercise library with no results](../assets/images/exercise-library-empty.png)

### Exercise details

![Exercise detail page](../assets/images/exercise-detail.png)

### Custom templates

![Custom templates page](../assets/images/custom-templates.png)

### No templates yet

![Empty custom templates page](../assets/images/custom-templates-empty.png)

### Creating a template

The same form is used for editing, with every field filled in and the heading changed to "Edit template".

![New template form](../assets/images/custom-template-new.png)

### Editing a template

![Edit template form](../assets/images/custom-template-edit.png)

### Deleting a template

![Delete template confirmation](../assets/images/custom-template-delete.png)

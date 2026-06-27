import { db } from '../db'

const EXERCISES = [
  'Barbell Back Squat',
  'Pendulum Squat',
  'Hack Squat',
  'Bulgarian Split Squat',
  'Barbell Romanian Deadlift',
  'Pull Up',
  'Chin Up',
  'Barbell Bent Over Row',
  'Chest Supported Row',
  'Barbell Overhead Press',
  'Dumbbell Shoulder Press',
  'Dumbbell Incline Press',
  'Smith Machine Incline Press',
  'Dips',
  'Dumbbell Romanian Deadlift',
]

export async function seedExercises() {
  const count = await db.exercises.count()
  if (count > 0) return
  await db.exercises.bulkAdd(EXERCISES.map(name => ({ name })))
}

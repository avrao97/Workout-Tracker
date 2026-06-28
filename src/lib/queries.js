import { db } from '../db'

export async function getLastSetsForExercise(exerciseId) {
  const allEntries = await db.entries
    .where('exerciseId').equals(exerciseId)
    .toArray()

  if (allEntries.length === 0) return null

  const workoutIds = [...new Set(allEntries.map(e => e.workoutId))]
  const workouts = await db.workouts.bulkGet(workoutIds)

  const sorted = workouts
    .filter(Boolean)
    .sort((a, b) => (a.date < b.date ? 1 : -1))

  const lastWorkout = sorted[0]
  if (!lastWorkout) return null

  const lastEntry = allEntries.find(e => e.workoutId === lastWorkout.id)
  if (!lastEntry) return null

  const sets = await db.sets
    .where('entryId').equals(lastEntry.id)
    .toArray()

  return sets.map(s => ({ weight: String(s.weight), reps: String(s.reps) }))
}

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

export async function buildChartData(exerciseId) {
  const allEntries = await db.entries
    .where('exerciseId').equals(exerciseId)
    .toArray()

  if (allEntries.length === 0) return []

  const workoutIds = [...new Set(allEntries.map(e => e.workoutId))]
  const workouts = await db.workouts.bulkGet(workoutIds)

  const workoutMap = {}
  workouts.filter(Boolean).forEach(w => { workoutMap[w.id] = w.date })

  // Collect all sets grouped by date
  const byDate = {}
  for (const entry of allEntries) {
    const date = workoutMap[entry.workoutId]
    if (!date) continue
    if (!byDate[date]) byDate[date] = []
    const sets = await db.sets.where('entryId').equals(entry.id).toArray()
    byDate[date].push(...sets)
  }

  // Compute top set per date
  const results = []
  for (const [date, sets] of Object.entries(byDate)) {
    if (sets.length === 0) continue

    const allBodyweight = sets.every(s => s.weight === 0)

    if (allBodyweight) {
      const maxReps = Math.max(...sets.map(s => s.reps))
      results.push({ date, value: maxReps, reps: maxReps, isBodyweight: true })
    } else {
      const weighted = sets.filter(s => s.weight > 0)
      const top = weighted.reduce((best, s) => {
        if (s.weight > best.weight) return s
        if (s.weight === best.weight && s.reps > best.reps) return s
        return best
      }, weighted[0])
      results.push({ date, value: top.weight, reps: top.reps, isBodyweight: false })
    }
  }

  return results.sort((a, b) => (a.date < b.date ? -1 : 1))
}

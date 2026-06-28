import { useEffect, useState } from 'react'
import { useParams, Link } from 'react-router-dom'
import { db } from '../db'

export default function WorkoutDetail() {
  const { id } = useParams()
  const [workout, setWorkout] = useState(null)
  const [entries, setEntries] = useState([])

  useEffect(() => {
    async function load() {
      const w = await db.workouts.get(Number(id))
      setWorkout(w)

      const rawEntries = await db.entries
        .where('workoutId').equals(Number(id))
        .sortBy('order')

      const full = await Promise.all(
        rawEntries.map(async entry => {
          const exercise = await db.exercises.get(entry.exerciseId)
          const sets = await db.sets.where('entryId').equals(entry.id).toArray()
          return { exercise, sets }
        })
      )

      setEntries(full)
    }
    load()
  }, [id])

  if (!workout) {
    return <div className="p-4 text-gray-500">Loading...</div>
  }

  return (
    <div className="p-4 flex flex-col gap-6">
      <div className="flex items-start gap-3">
        <Link to="/history" className="text-blue-600 text-sm mt-1">← Back</Link>
        <div>
          <h1 className="text-2xl font-bold">{workout.title || workout.date}</h1>
          {workout.title ? <p className="text-sm text-gray-400">{workout.date}</p> : null}
        </div>
      </div>

      {entries.map(({ exercise, sets }, i) => (
        <div key={i} className="bg-white border border-gray-200 rounded-xl p-4 flex flex-col gap-2">
          <h2 className="font-semibold text-lg">{exercise.name}</h2>
          {sets.map((s, j) => (
            <p key={j} className="text-gray-600 text-sm">
              Set {j + 1}: {s.weight === 0 ? 'Bodyweight' : `${s.weight} lbs`} × {s.reps} reps
            </p>
          ))}
        </div>
      ))}
    </div>
  )
}

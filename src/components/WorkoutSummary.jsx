import { useEffect, useState } from 'react'
import { db } from '../db'

export default function WorkoutSummary({ workoutId, onDone }) {
  const [entries, setEntries] = useState([])

  useEffect(() => {
    async function load() {
      const rawEntries = await db.entries
        .where('workoutId').equals(workoutId)
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
  }, [workoutId])

  return (
    <div className="p-4 flex flex-col gap-6">
      <h1 className="text-2xl font-bold">Workout Summary</h1>

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

      <button
        onClick={onDone}
        className="bg-blue-600 text-white rounded-xl min-h-[52px] text-base font-semibold"
      >
        Done
      </button>
    </div>
  )
}

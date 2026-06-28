import { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import { db } from '../db'

async function deleteWorkout(id) {
  const entries = await db.entries.where('workoutId').equals(id).toArray()
  const entryIds = entries.map(e => e.id)
  await db.sets.where('entryId').anyOf(entryIds).delete()
  await db.entries.where('workoutId').equals(id).delete()
  await db.workouts.delete(id)
}

export default function History() {
  const [workouts, setWorkouts] = useState([])

  useEffect(() => {
    db.workouts.orderBy('date').reverse().toArray().then(setWorkouts)
  }, [])

  async function handleDelete(id) {
    if (!confirm('Delete this workout?')) return
    await deleteWorkout(id)
    setWorkouts(prev => prev.filter(w => w.id !== id))
  }

  if (workouts.length === 0) {
    return (
      <div className="p-4">
        <h1 className="text-2xl font-bold mb-2">History</h1>
        <p className="text-gray-500">No workouts yet. Log one first!</p>
      </div>
    )
  }

  return (
    <div className="p-4">
      <h1 className="text-2xl font-bold mb-4">History</h1>
      <ul className="flex flex-col gap-2">
        {workouts.map(w => (
          <li key={w.id} className="flex items-center gap-2">
            <Link
              to={`/history/${w.id}`}
              className="flex-1 flex items-center justify-between px-4 py-3 min-h-[44px] bg-white border border-gray-200 rounded-lg text-base"
            >
              <div className="flex flex-col">
                <span className="font-medium">{w.title || w.date}</span>
                {w.title ? <span className="text-xs text-gray-400">{w.date}</span> : null}
              </div>
              <span className="text-gray-400">›</span>
            </Link>
            <button
              onClick={() => handleDelete(w.id)}
              className="min-h-[44px] min-w-[44px] flex items-center justify-center text-gray-400 hover:text-red-500 bg-white border border-gray-200 rounded-lg"
            >
              🗑️
            </button>
          </li>
        ))}
      </ul>
    </div>
  )
}

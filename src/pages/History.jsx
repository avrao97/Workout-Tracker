import { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import { db } from '../db'

export default function History() {
  const [workouts, setWorkouts] = useState([])

  useEffect(() => {
    db.workouts.orderBy('date').reverse().toArray().then(setWorkouts)
  }, [])

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
          <li key={w.id}>
            <Link
              to={`/history/${w.id}`}
              className="flex items-center justify-between px-4 py-3 min-h-[44px] bg-white border border-gray-200 rounded-lg text-base"
            >
              <span>{w.date}</span>
              <span className="text-gray-400">›</span>
            </Link>
          </li>
        ))}
      </ul>
    </div>
  )
}

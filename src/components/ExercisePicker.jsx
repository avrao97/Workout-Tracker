import { useEffect, useState } from 'react'
import { db } from '../db'

export default function ExercisePicker({ onSelect }) {
  const [exercises, setExercises] = useState([])

  useEffect(() => {
    db.exercises.orderBy('name').toArray().then(setExercises)
  }, [])

  return (
    <div className="p-4">
      <h2 className="text-xl font-bold mb-4">Pick an Exercise</h2>
      <ul className="flex flex-col gap-2">
        {exercises.map(ex => (
          <li key={ex.id}>
            <button
              onClick={() => onSelect(ex)}
              className="w-full text-left px-4 py-3 min-h-[44px] bg-white border border-gray-200 rounded-lg text-base active:bg-blue-50"
            >
              {ex.name}
            </button>
          </li>
        ))}
      </ul>
    </div>
  )
}

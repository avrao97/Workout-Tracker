import { useState } from 'react'
import { db } from '../db'
import ExercisePicker from '../components/ExercisePicker'
import SetEditor from '../components/SetEditor'

const DEFAULT_SETS = [
  { weight: '', reps: '' },
  { weight: '', reps: '' },
  { weight: '', reps: '' },
]

function todayISO() {
  return new Date().toISOString().slice(0, 10)
}

export default function LogWorkout() {
  const [stage, setStage] = useState('start')
  const [date, setDate] = useState(todayISO)
  const [workoutId, setWorkoutId] = useState(null)
  const [exercise, setExercise] = useState(null)
  const [sets, setSets] = useState(DEFAULT_SETS)

  async function handleStart() {
    const id = await db.workouts.add({ date })
    setWorkoutId(id)
    setStage('pick')
  }

  function handleSelectExercise(ex) {
    setExercise(ex)
    setSets([...DEFAULT_SETS.map(s => ({ ...s }))])
    setStage('log')
  }

  async function handleSave() {
    const validSets = sets.filter(s => s.reps !== '' && s.reps !== '0')
    if (validSets.length === 0) return

    const entryCount = await db.entries
      .where('workoutId').equals(workoutId).count()

    const entryId = await db.entries.add({
      workoutId,
      exerciseId: exercise.id,
      order: entryCount,
    })

    await db.sets.bulkAdd(
      validSets.map(s => ({
        entryId,
        weight: Number(s.weight) || 0,
        reps: Number(s.reps),
      }))
    )

    setStage('pick')
    setExercise(null)
    setSets([...DEFAULT_SETS.map(s => ({ ...s }))])
  }

  if (stage === 'start') {
    return (
      <div className="p-4 flex flex-col gap-6">
        <h1 className="text-2xl font-bold">Start Workout</h1>
        <div className="flex flex-col gap-2">
          <label className="text-sm font-medium text-gray-600">Date</label>
          <input
            type="date"
            value={date}
            onChange={e => setDate(e.target.value)}
            className="border border-gray-300 rounded-lg px-3 min-h-[44px] text-base"
          />
        </div>
        <button
          onClick={handleStart}
          className="bg-blue-600 text-white rounded-xl min-h-[52px] text-base font-semibold"
        >
          Start Workout
        </button>
      </div>
    )
  }

  if (stage === 'pick') {
    return <ExercisePicker onSelect={handleSelectExercise} />
  }

  if (stage === 'log') {
    return (
      <div className="p-4 flex flex-col gap-6">
        <h1 className="text-2xl font-bold">{exercise.name}</h1>
        <SetEditor sets={sets} onChange={setSets} />
        <button
          onClick={handleSave}
          className="bg-blue-600 text-white rounded-xl min-h-[52px] text-base font-semibold"
        >
          Save Exercise
        </button>
      </div>
    )
  }
}

import { useEffect, useState } from 'react'
import { db } from '../db'
import { buildChartData } from '../lib/queries'
import ExerciseChart from '../components/ExerciseChart'

export default function Dashboard() {
  const [charts, setCharts] = useState([])

  useEffect(() => {
    async function load() {
      const allEntries = await db.entries.toArray()
      const exerciseIds = [...new Set(allEntries.map(e => e.exerciseId))]

      const results = await Promise.all(
        exerciseIds.map(async id => {
          const exercise = await db.exercises.get(id)
          const data = await buildChartData(id)
          return { exercise, data }
        })
      )

      setCharts(results.filter(r => r.exercise && r.data.length > 0))
    }
    load()
  }, [])

  if (charts.length === 0) {
    return (
      <div className="p-4">
        <h1 className="text-2xl font-bold mb-2">Dashboard</h1>
        <p className="text-gray-500">No workouts logged yet. Log one to see your progress!</p>
      </div>
    )
  }

  return (
    <div className="p-4 flex flex-col gap-4">
      <h1 className="text-2xl font-bold">Dashboard</h1>
      {charts.map(({ exercise, data }) => (
        <ExerciseChart key={exercise.id} name={exercise.name} data={data} />
      ))}
    </div>
  )
}

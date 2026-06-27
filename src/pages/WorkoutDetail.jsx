import { useParams } from 'react-router-dom'

export default function WorkoutDetail() {
  const { id } = useParams()

  return (
    <div className="p-4">
      <h1 className="text-2xl font-bold mb-2">Workout Detail</h1>
      <p className="text-gray-500">Workout ID: {id}</p>
    </div>
  )
}

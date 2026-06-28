import {
  ResponsiveContainer,
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
} from 'recharts'

export default function ExerciseChart({ name, data }) {
  if (data.length === 0) return null

  const isBodyweight = data.every(d => d.isBodyweight)
  const yLabel = isBodyweight ? 'Max reps' : 'Top weight (lbs)'

  return (
    <div className="bg-white border border-gray-200 rounded-xl p-4">
      <h2 className="font-semibold text-base mb-1">{name}</h2>
      <p className="text-xs text-gray-400 mb-3">{yLabel} · reps labeled on each point</p>
      <ResponsiveContainer width="100%" height={160}>
        <LineChart data={data} margin={{ top: 20, right: 16, bottom: 0, left: -16 }}>
          <CartesianGrid strokeDasharray="3 3" stroke="#f3f4f6" />
          <XAxis dataKey="date" tick={{ fontSize: 10 }} />
          <YAxis tick={{ fontSize: 10 }} />
          <Tooltip
            formatter={(value) => [value, isBodyweight ? 'Reps' : 'lbs']}
          />
          <Line
            type="monotone"
            dataKey="value"
            stroke="#2563eb"
            strokeWidth={2}
            dot={{ r: 4, fill: '#2563eb' }}
            label={({ x, y, index }) => (
              <text
                key={index}
                x={x}
                y={y - 12}
                textAnchor="middle"
                fill="#6b7280"
                fontSize={11}
              >
                {data[index]?.reps}r
              </text>
            )}
          />
        </LineChart>
      </ResponsiveContainer>
    </div>
  )
}

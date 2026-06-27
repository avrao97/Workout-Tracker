const DEFAULT_SET = { weight: '', reps: '' }

export default function SetEditor({ sets, onChange }) {
  function updateSet(index, field, value) {
    const next = sets.map((s, i) => i === index ? { ...s, [field]: value } : s)
    onChange(next)
  }

  function addSet() {
    onChange([...sets, { ...DEFAULT_SET }])
  }

  function removeSet(index) {
    if (sets.length <= 2) return
    onChange(sets.filter((_, i) => i !== index))
  }

  return (
    <div className="flex flex-col gap-3">
      <div className="grid grid-cols-[1fr_1fr_44px] gap-2 text-sm font-medium text-gray-500 px-1">
        <span>Weight (lbs)</span>
        <span>Reps</span>
        <span />
      </div>

      {sets.map((s, i) => (
        <div key={i} className="grid grid-cols-[1fr_1fr_44px] gap-2 items-center">
          <input
            type="number"
            inputMode="numeric"
            placeholder="0 = BW"
            value={s.weight}
            onChange={e => updateSet(i, 'weight', e.target.value)}
            className="border border-gray-300 rounded-lg px-3 min-h-[44px] text-base w-full"
          />
          <input
            type="number"
            inputMode="numeric"
            placeholder="Reps"
            value={s.reps}
            onChange={e => updateSet(i, 'reps', e.target.value)}
            className="border border-gray-300 rounded-lg px-3 min-h-[44px] text-base w-full"
          />
          <button
            onClick={() => removeSet(i)}
            disabled={sets.length <= 2}
            className="min-h-[44px] text-gray-400 disabled:opacity-30 text-xl"
          >
            ✕
          </button>
        </div>
      ))}

      <button
        onClick={addSet}
        className="mt-1 text-blue-600 text-sm font-medium min-h-[44px] text-left px-1"
      >
        + Add set
      </button>
    </div>
  )
}

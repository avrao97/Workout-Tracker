import Dexie from 'dexie'

export const db = new Dexie('WorkoutTracker')

db.version(1).stores({
  exercises: '++id, name',
  workouts:  '++id, date',
  entries:   '++id, workoutId, exerciseId',
  sets:      '++id, entryId',
})

import { Routes, Route, NavLink } from 'react-router-dom'
import Dashboard from './pages/Dashboard'
import LogWorkout from './pages/LogWorkout'
import History from './pages/History'
import WorkoutDetail from './pages/WorkoutDetail'

function NavBar() {
  const base = 'flex-1 flex flex-col items-center justify-center gap-1 text-xs py-2 min-h-[56px]'
  const active = 'text-blue-600 font-semibold'
  const inactive = 'text-gray-500'

  return (
    <nav className="fixed bottom-0 left-0 right-0 bg-white border-t border-gray-200 flex">
      <NavLink to="/" end className={({ isActive }) => `${base} ${isActive ? active : inactive}`}>
        <span className="text-xl">📊</span>
        <span>Dashboard</span>
      </NavLink>
      <NavLink to="/log" className={({ isActive }) => `${base} ${isActive ? active : inactive}`}>
        <span className="text-xl">➕</span>
        <span>Log</span>
      </NavLink>
      <NavLink to="/history" className={({ isActive }) => `${base} ${isActive ? active : inactive}`}>
        <span className="text-xl">📋</span>
        <span>History</span>
      </NavLink>
    </nav>
  )
}

export default function App() {
  return (
    <div className="min-h-screen bg-gray-50 pb-16">
      <Routes>
        <Route path="/" element={<Dashboard />} />
        <Route path="/log" element={<LogWorkout />} />
        <Route path="/history" element={<History />} />
        <Route path="/history/:id" element={<WorkoutDetail />} />
      </Routes>
      <NavBar />
    </div>
  )
}

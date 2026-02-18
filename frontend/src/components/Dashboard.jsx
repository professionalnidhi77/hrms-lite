import { useState, useEffect } from 'react'
import API from '../api'

export default function Dashboard() {
  const [stats, setStats] = useState({
    totalEmployees: 0,
    data: []
  })
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState('')

  useEffect(() => {
    fetchDashboardData()
  }, [])

  const fetchDashboardData = async () => {
    try {
      const empRes = await API.get('/employees')
      const employees = empRes.data
      
      setStats({
        totalEmployees: employees.length,
        data: employees
      })
    } catch (err) {
      setError('Error loading dashboard data')
      console.error(err)
    } finally {
      setLoading(false)
    }
  }

  if (loading) return <div className="loading">Loading dashboard...</div>

  return (
    <div className="dashboard-container">
      <div className="dashboard-cards">
        <div className="dashboard-card">
          <h3>Total Employees</h3>
          <p className="stat-number">{stats.totalEmployees}</p>
        </div>
      </div>

      {error && <div className="error-message">{error}</div>}

      <div className="departments-section">
        <h3>Employees by Department</h3>
        {stats.data.length > 0 ? (
          <div className="department-grid">
            {getDepartmentStats(stats.data).map((dept) => (
              <div key={dept.name} className="dept-card">
                <h4>{dept.name}</h4>
                <p>{dept.count} employee{dept.count !== 1 ? 's' : ''}</p>
              </div>
            ))}
          </div>
        ) : (
          <p>No employees yet</p>
        )}
      </div>
    </div>
  )
}

function getDepartmentStats(employees) {
  const deptMap = {}
  employees.forEach(emp => {
    deptMap[emp.department] = (deptMap[emp.department] || 0) + 1
  })
  return Object.entries(deptMap).map(([name, count]) => ({ name, count }))
}

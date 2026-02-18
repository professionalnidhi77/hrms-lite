import { useEffect, useState } from 'react'
import API from '../api'
import AttendanceForm from './AttendanceForm'
import AttendanceList from './AttendanceList'

export default function EmployeeList() {
  const [employees, setEmployees] = useState([])
  const [loading, setLoading] = useState(true)
  const [expandedId, setExpandedId] = useState(null)
  const [error, setError] = useState('')
  const [searchTerm, setSearchTerm] = useState('')

  useEffect(() => {
    fetchEmployees()
  }, [])

  const fetchEmployees = async () => {
    try {
      setError('')
      const res = await API.get('/employees')
      setEmployees(res.data)
    } catch (error) {
      setError('Error fetching employees')
      console.error(error)
    } finally {
      setLoading(false)
    }
  }

  const deleteEmployee = async (id) => {
    if (window.confirm('Are you sure you want to delete this employee?')) {
      try {
        await API.delete(`/employees/${id}`)
        fetchEmployees()
      } catch (error) {
        alert(error.response?.data?.detail || 'Error deleting employee')
      }
    }
  }

  const toggleExpand = (id) => {
    setExpandedId(expandedId === id ? null : id)
  }

  const filteredEmployees = employees.filter(emp =>
    emp.full_name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    emp.employee_id.toLowerCase().includes(searchTerm.toLowerCase()) ||
    emp.email.toLowerCase().includes(searchTerm.toLowerCase())
  )

  if (loading) return <div className="loading">Loading employees...</div>

  if (error) return <div className="error-message">{error}</div>

  if (employees.length === 0) {
    return <div className="empty-state">No employees found. Add one to get started!</div>
  }

  return (
    <div className="employee-list-container">
      <div className="list-header">
        <h2>Employees ({filteredEmployees.length})</h2>
        <input
          type="text"
          className="search-input"
          placeholder="Search by name, ID, or email..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
        />
      </div>

      {filteredEmployees.length === 0 ? (
        <div className="empty-state">No employees match your search</div>
      ) : (
        filteredEmployees.map((emp) => (
          <div key={emp.id} className="employee-card">
            <div className="employee-header" onClick={() => toggleExpand(emp.id)}>
              <div className="employee-info">
                <h3>{emp.full_name}</h3>
                <p className="emp-id">ID: <strong>{emp.employee_id}</strong> | {emp.department}</p>
              </div>
              <div className="employee-actions">
                <button
                  className="btn-expand"
                  onClick={(e) => {
                    e.stopPropagation()
                    toggleExpand(emp.id)
                  }}
                  title="Toggle details"
                >
                  {expandedId === emp.id ? '▼' : '▶'}
                </button>
                <button
                  className="btn-delete"
                  onClick={(e) => {
                    e.stopPropagation()
                    deleteEmployee(emp.id)
                  }}
                  title="Delete employee"
                >
                  Delete
                </button>
              </div>
            </div>

            {expandedId === emp.id && (
              <div className="employee-details">
                <p><strong>Email:</strong> {emp.email}</p>
                <p><strong>Department:</strong> {emp.department}</p>
                <hr />
                <AttendanceForm empId={emp.id} />
                <AttendanceList empId={emp.id} />
              </div>
            )}
          </div>
        ))
      )}
    </div>
  )
}

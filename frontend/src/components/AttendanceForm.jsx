import { useState } from 'react'
import API from '../api'

export default function AttendanceForm({ empId }) {
  const [date, setDate] = useState('')
  const [status, setStatus] = useState('Present')
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState('')
  const [success, setSuccess] = useState(false)

  const handleSubmit = async (e) => {
    e.preventDefault()
    if (!date) {
      setError('Please select a date')
      return
    }

    setError('')
    setSuccess(false)
    setLoading(true)

    try {
      await API.post(`/employees/${empId}/attendance`, {
        date,
        status
      })

      setSuccess(true)
      setDate('')
      setStatus('Present')

      setTimeout(() => setSuccess(false), 2000)
    } catch (error) {
      setError(error.response?.data?.detail || 'Error marking attendance')
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="attendance-form-container">
      <h4>Mark Attendance</h4>

      {error && <div className="error-message">{error}</div>}
      {success && <div className="success-message">✓ Attendance marked!</div>}

      <form onSubmit={handleSubmit} className="attendance-form">
        <div className="form-group-inline">
          <input
            type="date"
            value={date}
            onChange={(e) => setDate(e.target.value)}
            required
          />

          <select value={status} onChange={(e) => setStatus(e.target.value)}>
            <option value="Present">Present</option>
            <option value="Absent">Absent</option>
            <option value="Leave">Leave</option>
          </select>

          <button type="submit" disabled={loading}>
            {loading ? 'Marking...' : 'Mark'}
          </button>
        </div>
      </form>
    </div>
  )
}

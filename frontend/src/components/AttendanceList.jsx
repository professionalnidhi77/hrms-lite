import { useEffect, useState } from 'react'
import API from '../api'

export default function AttendanceList({ empId }) {
  const [records, setRecords] = useState([])
  const [loading, setLoading] = useState(true)
  const [summary, setSummary] = useState(null)

  useEffect(() => {
    fetchAttendance()
  }, [empId])

  const fetchAttendance = async () => {
    try {
      const [attendanceRes, summaryRes] = await Promise.all([
        API.get(`/employees/${empId}/attendance`),
        API.get(`/employees/${empId}/attendance/summary`)
      ])
      setRecords(attendanceRes.data)
      setSummary(summaryRes.data)
    } catch (error) {
      console.error('Error fetching attendance:', error)
    } finally {
      setLoading(false)
    }
  }

  if (loading) return <p>Loading attendance...</p>

  if (records.length === 0) {
    return <p className="empty-message">No attendance records yet.</p>
  }

  return (
    <div className="attendance-list-container">
      <h4>Attendance Records</h4>

      {summary && (
        <div className="attendance-summary">
          <div className="summary-stat">
            <span>Present:</span>
            <strong className="present-color">{summary.total_present}</strong>
          </div>
          <div className="summary-stat">
            <span>Absent:</span>
            <strong className="absent-color">{summary.total_absent}</strong>
          </div>
          <div className="summary-stat">
            <span>Total:</span>
            <strong>{summary.total_records}</strong>
          </div>
        </div>
      )}

      <table className="attendance-table">
        <thead>
          <tr>
            <th>Date</th>
            <th>Status</th>
          </tr>
        </thead>
        <tbody>
          {records.map((record) => (
            <tr key={record.id}>
              <td>{new Date(record.date).toLocaleDateString()}</td>
              <td>
                <span className={`status-badge status-${record.status.toLowerCase()}`}>
                  {record.status}
                </span>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  )
}

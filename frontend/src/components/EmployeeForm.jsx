import { useState } from 'react'
import API from '../api'

export default function EmployeeForm({ onSuccess }) {
  const [formData, setFormData] = useState({
    employee_id: '',
    full_name: '',
    email: '',
    department: ''
  })
  const [error, setError] = useState('')
  const [loading, setLoading] = useState(false)
  const [success, setSuccess] = useState(false)

  const handleChange = (e) => {
    const { name, value } = e.target
    setFormData(prev => ({
      ...prev,
      [name]: value
    }))
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    setError('')
    setSuccess(false)
    setLoading(true)

    try {
      await API.post('/employees', formData)
      setSuccess(true)
      setFormData({
        employee_id: '',
        full_name: '',
        email: '',
        department: ''
      })
      
      setTimeout(() => {
        onSuccess && onSuccess()
      }, 1500)
    } catch (err) {
      setError(err.response?.data?.detail || 'Error adding employee')
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="form-container">
      <h2>Add New Employee</h2>
      
      {error && <div className="error-message">{error}</div>}
      {success && <div className="success-message">✓ Employee added successfully!</div>}
      
      <form onSubmit={handleSubmit}>
        <div className="form-group">
          <label htmlFor="employee_id">Employee ID *</label>
          <input
            id="employee_id"
            type="text"
            name="employee_id"
            value={formData.employee_id}
            onChange={handleChange}
            required
            placeholder="e.g., EMP001"
          />
        </div>

        <div className="form-group">
          <label htmlFor="full_name">Full Name *</label>
          <input
            id="full_name"
            type="text"
            name="full_name"
            value={formData.full_name}
            onChange={handleChange}
            required
            placeholder="John Doe"
          />
        </div>

        <div className="form-group">
          <label htmlFor="email">Email *</label>
          <input
            id="email"
            type="email"
            name="email"
            value={formData.email}
            onChange={handleChange}
            required
            placeholder="john@example.com"
          />
        </div>

        <div className="form-group">
          <label htmlFor="department">Department *</label>
          <select
            id="department"
            name="department"
            value={formData.department}
            onChange={handleChange}
            required
          >
            <option value="">Select Department</option>
            <option value="HR">HR</option>
            <option value="IT">IT</option>
            <option value="Finance">Finance</option>
            <option value="Sales">Sales</option>
            <option value="Operations">Operations</option>
            <option value="Marketing">Marketing</option>
          </select>
        </div>

        <button type="submit" disabled={loading}>
          {loading ? 'Adding...' : 'Add Employee'}
        </button>
      </form>
    </div>
  )
}

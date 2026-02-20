import { useState, useEffect } from 'react'
import EmployeeForm from './components/EmployeeForm'
import EmployeeList from './components/EmployeeList'
import Dashboard from './components/Dashboard'
import './App.css'

function App() {
  const [activeTab, setActiveTab] = useState('list')
  const [refreshKey, setRefreshKey] = useState(0)
  const [isConnected, setIsConnected] = useState(false)

  useEffect(() => {
    // Check API connection
    checkApiConnection()
  }, [])

  const checkApiConnection = async () => {
    try {
      const apiUrl = import.meta.env.VITE_API_URL || "http://localhost:8000"
      const response = await fetch(`${apiUrl}/`)
      if (response.ok) {
        setIsConnected(true)
      }
    } catch (error) {
      console.warn("Backend not responding")
      setIsConnected(false)
    }
  }

  const handleEmployeeAdded = () => {
    setRefreshKey(prev => prev + 1)
    setActiveTab('list')
  }

  return (
    <div className="app-container">
      <header className="app-header">
        <h1>HRMS Lite</h1>
        <p>Human Resource Management System</p>
        {isConnected && <span className="api-status">✓ Connected</span>}
      </header>

      <nav className="app-nav">
        <button
          className={`nav-btn ${activeTab === 'dashboard' ? 'active' : ''}`}
          onClick={() => setActiveTab('dashboard')}
        >
          Dashboard
        </button>
        <button
          className={`nav-btn ${activeTab === 'list' ? 'active' : ''}`}
          onClick={() => setActiveTab('list')}
        >
          Employee List
        </button>
        <button
          className={`nav-btn ${activeTab === 'add' ? 'active' : ''}`}
          onClick={() => setActiveTab('add')}
        >
          Add Employee
        </button>
      </nav>

      <main className="app-main">
        {activeTab === 'dashboard' && <Dashboard key={refreshKey} />}
        {activeTab === 'list' && <EmployeeList key={refreshKey} />}
        {activeTab === 'add' && <EmployeeForm onSuccess={handleEmployeeAdded} />}
      </main>

      <footer className="app-footer">
        <p>&copy; 2026 HRMS Lite. All rights reserved.</p>
      </footer>
    </div>
  )
}

export default App

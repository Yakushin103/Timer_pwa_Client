import { useEffect } from 'react'
import { useLocation } from 'react-router-dom'

import NavMenu from './components/NavMenu'

import MainPage from './pages/Main/Index'
import ReportPage from './pages/Report/Index'
import SettingsPage from './pages/Settings/Index'

import { getCompanyStoreApi } from './api/companyApi'

import './styles/App.scss'

function App() {
  const location = useLocation()

  useEffect(() => {
    getStore()
  }, [])

  async function getStore() {
    try {
      const response = await getCompanyStoreApi()

    } catch (error) { }
  }


  return (
    <div className="app">
      {
        location.pathname === '/' &&
        <MainPage />
      }

      {
        location.pathname === '/report' &&
        <ReportPage />
      }

      {
        location.pathname === '/settings' &&
        <SettingsPage />
      }


      <NavMenu />
    </div>
  )
}

export default App

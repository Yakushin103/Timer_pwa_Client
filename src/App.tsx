import { useEffect } from 'react'
import { useLocation } from 'react-router-dom'

import NavMenu from './components/NavMenu'
import WatchLoader from './components/WatchLoader'

import MainPage from './pages/Main/Index'
import ReportPage from './pages/Report/Index'
import SettingsPage from './pages/Settings/Index'

import { getCompanyListApi } from './api/companyApi'
import { useAppDispatch, useAppSelector } from './store/hooks'
import { setCompanies } from './store/reducer'

import './styles/App.scss'

function App() {
  const location = useLocation()

  const dispatch = useAppDispatch()

  const loading = useAppSelector((store) => store.loading)

  useEffect(() => {
    getStore()
  }, [])

  async function getStore() {
    try {
      const { success, data } = await getCompanyListApi()

      if (success) {
        dispatch(setCompanies(data))
      } else {
        dispatch(setCompanies([]))
      }

    } catch (error) {
      dispatch(setCompanies([]))
    }
  }


  return (
    <div className="app">
      {
        loading &&
        <WatchLoader />
      }

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

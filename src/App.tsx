import { useEffect } from 'react'
import { useLocation, useNavigate } from 'react-router-dom'

import NavMenu from './components/NavMenu'
import WatchLoader from './components/WatchLoader'

import MainPage from './pages/Main/Index'
import ReportPage from './pages/Report/Index'
import SettingsPage from './pages/Settings/Index'
import AuthPage from './pages/Auth/Index'

import { getCompanyListApi } from './api/companyApi'
import { useAppDispatch, useAppSelector } from './store/hooks'
import { setAccessToken, setCompanies, setLoading } from './store/reducer'

import './styles/App.scss'
import { instance } from './api/instance'
import { errorSignOut } from './store/thunk'

function App() {
  const location = useLocation()
  const navigate = useNavigate()

  const dispatch = useAppDispatch()

  const loading = useAppSelector((store) => store.loading)
  const accessToken = useAppSelector((store) => store.accessToken)

  useEffect(() => {
    if (!!accessToken) {
      instance.defaults.headers.common = {
        Authorization: `Bearer ${accessToken}`,
      };

      navigate('/')
      getStore()
    } else {
      navigate('auth')
    }
  }, [accessToken])

  async function getStore() {
    try {
      dispatch(setLoading(true))
      const { success, data, message } = await getCompanyListApi()

      if (success) {
        dispatch(setCompanies(data))
      } else {
        if (message === 'Authorization is required') {
          dispatch(errorSignOut(''))
        } else {
          dispatch(setCompanies([]))
        }
      }

      dispatch(setLoading(false))
    } catch (error) {
      dispatch(setAccessToken(null))
      dispatch(setCompanies([]))
      dispatch(setLoading(false))
    }
  }


  return (
    <div className="app">
      {
        loading &&
        <WatchLoader />
      }

      {
        location.pathname === '/auth' &&
        <AuthPage />
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

      {
        location.pathname !== '/auth' &&
        <NavMenu />
      }
    </div>
  )
}

export default App

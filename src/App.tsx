import { useCallback, useEffect, useState } from 'react'
import { useLocation, useNavigate } from 'react-router-dom'
import { useStopwatch } from 'react-timer-hook'

import NavMenu from './components/NavMenu'
import WatchLoader from './components/WatchLoader'

import MainPage from './pages/Main/Index'
import ReportPage from './pages/Report/Index'
import SettingsPage from './pages/Settings/Index'
import AuthPage from './pages/Auth/Index'
import UpdateNotifier from './components/UpdateNotif'

import { getCompanyListApi } from './api/companyApi'
import { useAppDispatch, useAppSelector } from './store/hooks'
import { setAccessToken, setCompanies, setLoading } from './store/reducer'
import { instance } from './api/instance'
import { errorSignOut } from './store/thunk'
import { usePWA } from './hooks/usePWA'
import { getFormat } from './utils/funcs'

import { DataProps } from './modules/pages/Main'

import './styles/App.scss'

function App() {
  const location = useLocation()
  const navigate = useNavigate()

  const dispatch = useAppDispatch()

  const loading = useAppSelector((store) => store.loading)
  const accessToken = useAppSelector((store) => store.accessToken)

  const { checkForUpdates } = usePWA()

  const {
    seconds,
    minutes,
    hours,
    start,
    pause,
    reset,
  } = useStopwatch({ autoStart: false, interval: 1000 });

  const [isStart, setIsStart] = useState(false)
  const [data, setData] = useState<DataProps>({
    day: '',
    seconds: 0,
    minutes: 0,
    hours: 0,
  })
  const [timeString, setTimeString] = useState<string | null>(null)

  useEffect(() => {
    checkForUpdates()
  }, [checkForUpdates])

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

  useEffect(() => {
    if (isStart) {
      start()
    } else {
      pause()
      setData({
        ...data,
        hours,
        minutes,
        seconds,
      })
    }
  }, [isStart])

  useEffect(() => {
    if (data.seconds === 0 && data.minutes === 0 && data.hours === 0) {
      reset(undefined, false)
      setTimeString(null)
    }
  }, [data])

  useEffect(() => {
    if (location.pathname !== '/auth' && location.pathname !== '/' && (!!seconds || !!minutes || !!hours)) {
      setTimeString(`${getFormat(hours)[0]}${getFormat(hours)[1]} : ${getFormat(minutes)[0]}${getFormat(minutes)[1]} : ${getFormat(seconds)[0]}${getFormat(seconds)[1]}`)
    }

  }, [seconds, minutes, hours, location.pathname])

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

  const handleStart = useCallback((value: boolean) => {
    setIsStart(value)
  }, [])

  const handleData = useCallback((value: DataProps) => {
    setData({ ...value })
  }, [])

  return (
    <div className="app">
      {
        loading &&
        <WatchLoader />
      }

      {
        location.pathname !== '/auth' &&
        <UpdateNotifier />
      }


      {
        location.pathname === '/auth' &&
        <AuthPage />
      }

      {
        location.pathname === '/' &&
        <MainPage
          seconds={seconds}
          minutes={minutes}
          hours={hours}
          isStart={isStart}
          handleStart={handleStart}
          data={data}
          handleData={handleData}
        />
      }

      {
        location.pathname === '/report' &&
        <ReportPage time_string={timeString} />
      }

      {
        location.pathname === '/settings' &&
        <SettingsPage time_string={timeString} />
      }

      {
        location.pathname !== '/auth' &&
        <NavMenu />
      }
    </div>
  )
}

export default App

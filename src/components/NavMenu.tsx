import { useEffect, useState } from 'react'
import { useLocation, useNavigate } from 'react-router-dom'
import classNames from 'classnames'

import Icon from './Icon'

import '../styles/components/NavMenu.scss'

export default function NavMenu() {
  const navigate = useNavigate()
  const location = useLocation()

  const [isMobile, setIsMobile] = useState(false)

  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth <= 680)
    }

    checkMobile()
    window.addEventListener('resize', checkMobile)

    return () => window.removeEventListener('resize', checkMobile)
  }, [])

  function handleNavigate(name: string) {
    navigate(name)
  }

  return (
    <>
      <div className="__show-on-wide nav">
        <button
          className={classNames({ _active: location.pathname === '/', _liquid: isMobile })}
          onClick={() => handleNavigate('')}
        >
          Your time

          <Icon
            viewBox="0 0 48 48"
            icon="time-1"
          />
        </button>

        <button
          className={classNames({ _active: location.pathname === '/report', _liquid: isMobile })}
          onClick={() => handleNavigate('report')}
        >
          List

          <Icon
            viewBox="0 0 48 48"
            icon="report-1"
          />
        </button>

        <button
          className={classNames({ _active: location.pathname === '/settings', _liquid: isMobile })}
          onClick={() => handleNavigate('settings')}
        >
          Settings

          <Icon
            viewBox="0 0 128 128"
            icon="settings-1"
          />
        </button>
      </div>

      <div className="__show-on-tablet nav">
        <button
          className={classNames({ _active: location.pathname === '/' })}
          onClick={() => handleNavigate('')}
        >
          Your time

          <Icon
            viewBox="0 0 48 48"
            icon="time-1"
          />
        </button>

        <button
          className={classNames({ _active: location.pathname === '/report' })}
          onClick={() => handleNavigate('report')}
        >
          List

          <Icon
            viewBox="0 0 48 48"
            icon="report-1"
          />
        </button>

        <button
          className={classNames({ _active: location.pathname === '/settings' })}
          onClick={() => handleNavigate('settings')}
        >
          Settings

          <Icon
            viewBox="0 0 128 128"
            icon="settings-1"
          />
        </button>
      </div>

      <div className="__show-on-mobile nav">
        <button
          className={classNames({ _active: location.pathname === '/', _liquid: true })}
          onClick={() => handleNavigate('')}
        >
          <Icon
            viewBox="0 0 48 48"
            icon="time-1"
          />
        </button>

        <button
          className={classNames({ _active: location.pathname === '/report', _liquid: true })}
          onClick={() => handleNavigate('report')}
        >
          <Icon
            viewBox="0 0 48 48"
            icon="report-1"
          />
        </button>

        <button
          className={classNames({ _active: location.pathname === '/settings', _liquid: true })}
          onClick={() => handleNavigate('settings')}
        >
          <Icon
            viewBox="0 0 128 128"
            icon="settings-1"
          />
        </button>
      </div>
    </>
  )
}

import { useNavigate } from 'react-router-dom'

import { TimeViewProps } from '../modules/components/TimeView'

import '../styles/components/TimeView.scss'

export default function TimeView({ time_string }: TimeViewProps) {
  const navigate = useNavigate()

  function handleMain() {
    navigate('/')
  }
  return (
    <div className='time-view-container'>
      <div
        className='time-view'
        onClick={() => handleMain()}
      >
        {time_string}
      </div>
    </div>
  )
}

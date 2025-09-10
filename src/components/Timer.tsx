import { useEffect } from 'react';
import { useStopwatch } from 'react-timer-hook';

import { TimerProps } from '../modules/components/Timer';

import '../styles/components/Timer.scss'



export default function Timer({ isStart }: TimerProps) {
  const {
    seconds,
    minutes,
    hours,
    start,
    pause,
  } = useStopwatch({ autoStart: false, interval: 20 });

  useEffect(() => {
    if (isStart) {
      start()
    } else {
      pause()
    }
  }, [isStart])

  function getFormat(value: number) {
    let string = ''

    if (value >= 10) {
      string = value.toString()
    } else {
      string = `0${value}`
    }

    return string
  }


  return (
    <div className='timer'>
      <div className='time'>
        <span className='time-value'> {getFormat(hours)[0]} </span>
        <span className='time-value'> {getFormat(hours)[1]} </span>

        <span className='time-popup'>H</span>
      </div>

      <div className='time'>
        <span className='time-value'> {getFormat(minutes)[0]} </span>
        <span className='time-value'> {getFormat(minutes)[1]} </span>

        <span className='time-popup'>M</span>
      </div>

      <div className='time'>
        <span className='time-value'> {getFormat(seconds)[0]} </span>
        <span className='time-value'> {getFormat(seconds)[1]} </span>

        <span className='time-popup'>S</span>
      </div>
    </div>
  )
}

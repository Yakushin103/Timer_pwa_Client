import { memo } from 'react';

import { TimerProps } from '../modules/components/Timer';

import { getFormat } from '../utils/funcs';

import '../styles/components/Timer.scss'

function Timer({
  seconds,
  minutes,
  hours,
}: TimerProps) {

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

export default memo(Timer)
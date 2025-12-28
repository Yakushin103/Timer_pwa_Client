import { memo } from 'react'

import { ModalSaveTimeProps } from '../modules/components/ModalSaveTime'

import '../styles/components/ModalSaveTime.scss'

function ModalSaveTime({ hours, seconds, minutes, handleClose, handleSave, company_name }: ModalSaveTimeProps) {
  function getTimeString(time: number) {
    let time_string = `${time}`

    if (time_string.length === 1) {
      time_string = `0${time_string}`
    }

    return time_string
  }

  return (
    <div className='modal-save-time'>
      <div className='block'>
        <div className='title'> You have no saved time. </div>

        <div> {getTimeString(hours)} : {getTimeString(minutes)} : {getTimeString(seconds)} </div>

        <div> Selected company: {company_name} </div>

        <div className="empty"></div>

        <div className="buttons">
          <button
            className="white delete"
            onClick={handleClose}
          >
            Close
          </button>

          <button
            className="white save"
            onClick={handleSave}
          >
            Save
          </button>
        </div>
      </div>
    </div>
  )
}

export default memo(ModalSaveTime)
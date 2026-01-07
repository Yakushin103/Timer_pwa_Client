
import { useCallback, useEffect, useState } from 'react'
import classNames from 'classnames'
//@ts-ignore
import moment from 'moment'

import SelectIdsComponent from '../../components/Select'
import Timer from '../../components/Timer'
import ModalSaveTime from '../../components/ModalSaveTime'

import { useAppDispatch, useAppSelector } from '../../store/hooks'
import { addTimeApi, getStoreApi, updatedTimeApi } from '../../api/timerApi'
import { errorSignOut } from '../../store/thunk'
import { instance } from '../../api/instance'
import { setSelectedCompany, setStartTime } from '../../store/reducer'

import { IndexProps } from '../../modules/pages/Main'
import { ItemStoreProps } from '../../modules/api/Timer'

import '../../styles/pages/Main.scss'

export default function Index({
  seconds,
  minutes,
  hours,
  isStart,
  handleStart,
  data,
  handleData,
}: IndexProps) {
  const dispatch = useAppDispatch()

  const companyOprions = useAppSelector((store) => store.companies)
  const accessToken = useAppSelector((store) => store.accessToken)
  const selectedCompany = useAppSelector((store) => store.selectedCompany)
  const startTime = useAppSelector((store) => store.start_time)

  const [showModal, setShowModal] = useState(false)

  const [report, setReport] = useState<ItemStoreProps[]>([])
  const [oldTime, setOldTime] = useState({
    seconds: 0,
    minutes: 0,
    hours: 0,
  })

  useEffect(() => {
    getStore()
  }, [])

  useEffect(() => {
    if (!!startTime && !isStart) {
      getSaveOldTime()
    }
  }, [])

  function getSaveOldTime() {
    const startMoment = moment(startTime);
    const now = moment();
    const duration = moment.duration(now.diff(startMoment));

    setOldTime({
      hours: Math.floor(duration.asHours()),
      minutes: duration.minutes(),
      seconds: duration.seconds()
    })

    setShowModal(true)
  }


  async function saveTime() {
    if (report.length && selectedCompany) {
      let day = ''
      let hours = 0
      let minutes = 0
      let seconds = 0
      let id = 0

      report.forEach(item => {
        if (item.company_id === selectedCompany) {
          day = item.day
          hours = data.hours + item.hours
          minutes = data.minutes + item.minutes
          seconds = data.seconds + item.seconds
          id = item.id

          if (seconds >= 60) {
            minutes += Math.floor(seconds / 60);
            seconds = seconds % 60;
          }

          // Обрабатываем минуты
          if (minutes >= 60) {
            hours += Math.floor(minutes / 60);
            minutes = minutes % 60;
          }
        }
      })

      const { success, message } = await updatedTimeApi({
        ...data,
        day,
        hours,
        minutes,
        seconds,
        company_id: selectedCompany,
        id,
      })

      if (success) {
        handleClearTime()
      } else {
        if (message === 'Authorization is required') {
          dispatch(errorSignOut(''))
        }
      }
    } else {
      const { success, message } = await addTimeApi({
        ...data,
        day: moment().format('DD-MM-YYYY'),
        company_id: selectedCompany,
      })

      if (success) {
        handleClearTime()
      } else {
        if (message === 'Authorization is required') {
          dispatch(errorSignOut(''))
        }
      }
    }
  }


  async function getStore() {
    let date = moment().format('DD-MM-YYYY')

    if (!!accessToken) {
      instance.defaults.headers.common = {
        Authorization: `Bearer ${accessToken}`,
      };
    }

    const { success, data, message } = await getStoreApi(date)

    if (success) {
      setReport(data)
    } else {
      if (message === 'Authorization is required') {
        dispatch(errorSignOut(''))
      }
    }
  }

  const handleSaveOldTime = useCallback(async () => {
    if (report.length && selectedCompany) {
      let day = ''
      let hours = 0
      let minutes = 0
      let seconds = 0
      let id = 0

      report.forEach(item => {
        if (item.company_id === selectedCompany) {
          day = item.day
          hours = oldTime.hours + item.hours
          minutes = oldTime.minutes + item.minutes
          seconds = oldTime.seconds + item.seconds
          id = item.id

          if (seconds >= 60) {
            minutes += Math.floor(seconds / 60);
            seconds = seconds % 60;
          }

          // Обрабатываем минуты
          if (minutes >= 60) {
            hours += Math.floor(minutes / 60);
            minutes = minutes % 60;
          }
        }
      })

      const { success, message } = await updatedTimeApi({
        ...oldTime,
        day,
        hours,
        minutes,
        seconds,
        company_id: selectedCompany,
        id,
      })

      if (success) {
        handleCloseOldTimeModal()
        getStore()
      } else {
        if (message === 'Authorization is required') {
          dispatch(errorSignOut(''))
        }
      }
    } else {
      const { success, message } = await addTimeApi({
        ...oldTime,
        day: moment().format('DD-MM-YYYY'),
        company_id: selectedCompany,
      })

      if (success) {
        handleCloseOldTimeModal()
        getStore()
      } else {
        if (message === 'Authorization is required') {
          dispatch(errorSignOut(''))
        }
      }
    }
  }, [oldTime, report])

  function handleClearTime() {
    handleData({
      day: '',
      seconds: 0,
      minutes: 0,
      hours: 0,
    })
    getStore()
  }

  function getNameButton() {
    let name = ''

    if (isStart) {
      name = 'Stop'
    } else {
      if (!checkEmptyTime()) {
        name = 'Resume'
      } else {
        name = 'Start'
      }
    }

    return name
  }

  function checkEmptyTime() {
    let check = true

    if (!!data.seconds || !!data.minutes || !!data.hours) {
      check = false
    }

    return check
  }

  function getStringForWorkToday() {
    let string = ''

    if (!!report.length) {
      if (report.length === 1) {
        let company_name = ''
        let hours = '00'
        let minutes = '00'
        let seconds = '00'

        companyOprions.forEach(item => {
          if (item.id === report[0].company_id) {
            company_name = item.name

            if (!!report[0].hours) {
              hours = `${report[0].hours}`
            }

            if (!!report[0].minutes) {
              minutes = `${report[0].minutes}`
            }

            if (!!report[0].seconds) {
              seconds = `${report[0].seconds}`
            }
          }
        })

        string = `You have already worked for the ${company_name} company for ${hours}:${minutes}:${seconds} today.`
      } else {
        let company_names = ''
        let company_ids = report.map(item => item.company_id)

        companyOprions.forEach(item => {
          if (company_ids.includes(item.id)) {
            if (company_names === '') {
              company_names = item.name
            } else {
              company_names += `${company_names}, ${item.name}`

            }
          }
        })

        string = `You worked for ${company_names} today.`
      }
    } else {
      string = `You haven't worked yet today, have a nice day!`
    }

    return string
  }

  function handleSelectCompany(value: number) {
    dispatch(setSelectedCompany(value))
  }

  function handleStartTime() {
    handleStart(!isStart)

    if (!isStart) {
      dispatch(setStartTime(moment().toISOString()))
    } else {
      startTime && dispatch(setStartTime(null))
    }
  }

  const handleCloseOldTimeModal = useCallback(() => {
    dispatch(setStartTime(null))
    setOldTime({
      seconds: 0,
      minutes: 0,
      hours: 0,
    })
    setShowModal(false)
  }, [])

  function getCompanyName() {
    let name = ''

    companyOprions.forEach(item => {
      if (item.id === selectedCompany) {
        name = item.name
      }
    })

    return name
  }

  return (
    <div className="content main-page">
      {
        showModal &&
        <ModalSaveTime
          hours={oldTime.hours}
          minutes={oldTime.minutes}
          seconds={oldTime.seconds}
          handleClose={handleCloseOldTimeModal}
          handleSave={handleSaveOldTime}
          company_name={getCompanyName()}
        />
      }
      <div className='row'>
        <SelectIdsComponent
          id={selectedCompany}
          options={companyOprions.map(option => {
            return {
              id: option.id,
              name: option.name
            }
          })}
          handleSelect={(value) => handleSelectCompany(value as number)}
        />
      </div>

      <div className='row center'>
        {getStringForWorkToday()}
      </div>

      <div>
        <Timer
          seconds={seconds}
          minutes={minutes}
          hours={hours}
        />
      </div>

      <div className='button-start'>
        <button
          className={classNames({
            'resume': getNameButton() === 'Resume'
          })}
          disabled={selectedCompany === 0}
          onClick={() => handleStartTime()}
        >
          {getNameButton()}
        </button>

        {
          !checkEmptyTime() &&
          <button
            className='save'
            onClick={() => saveTime()}
          >
            Save
          </button>
        }

        {
          !checkEmptyTime() &&
          <button
            className='clear'
            onClick={() => handleClearTime()}
          >
            Clear
          </button>
        }
      </div>
    </div>
  )
}

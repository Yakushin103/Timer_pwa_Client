
import { useEffect, useState } from 'react'
import classNames from 'classnames'
//@ts-ignore
import moment from 'moment'

import SelectIdsComponent from '../../components/Select'
import Timer from '../../components/Timer'

import { useAppSelector } from '../../store/hooks'
import { addTimeApi, getStoreApi, updatedTimeApi } from '../../api/timerApi'

import { DataProps } from '../../modules/pages/Main'
import { ItemStoreProps } from '../../modules/api/Timer'

import '../../styles/pages/Main.scss'

export default function Index() {
  const companyOprions = useAppSelector((store) => store.companies)

  const [isStart, setIsStart] = useState(false)

  const [data, setData] = useState<DataProps>({
    day: '',
    seconds: 0,
    minutes: 0,
    hours: 0,
    company_id: 0,
  })
  const [report, setReport] = useState<ItemStoreProps[]>([])

  useEffect(() => {
    getStore()
  }, [])

  async function saveTime() {
    if (report.length && data.company_id) {
      let day = ''
      let hours = 0
      let minutes = 0
      let seconds = 0
      let id = 0

      report.forEach(item => {
        if (item.company_id === data.company_id) {
          day = item.day
          hours = data.hours + item.hours
          minutes = data.minutes + item.minutes
          seconds = data.seconds + item.seconds
          id = item.id
        }
      })

      const { success } = await updatedTimeApi({
        ...data,
        day,
        hours,
        minutes,
        seconds,
        id,
      })

      if (success) {
        handleClearTime()
      }
    } else {
      const { success } = await addTimeApi({
        ...data,
        day: moment().format('DD-MM-YYYY'),
      })

      if (success) {
        handleClearTime()
      }
    }
  }


  async function getStore() {
    let date = moment().format('DD-MM-YYYY')
    const { success, data } = await getStoreApi(date)

    if (success) {
      setReport(data)
    }
  }

  function handleClearTime() {
    setData({
      day: '',
      seconds: 0,
      minutes: 0,
      hours: 0,
      company_id: 0,
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

  return (
    <div className="content main-page">
      <div className='row'>
        <SelectIdsComponent
          id={data.company_id}
          options={companyOprions.map(option => {
            return {
              id: option.id,
              name: option.name
            }
          })}
          handleSelect={(value) => setData({ ...data, company_id: value as number })}
        />
      </div>

      <div className='row center'>
        {getStringForWorkToday()}
      </div>

      <div>
        <Timer isStart={isStart} data={data} setData={setData} />
      </div>

      <div className='button-start'>
        <button
          className={classNames({
            'resume': getNameButton() === 'Resume'
          })}
          disabled={data.company_id === 0}
          onClick={() => setIsStart(!isStart)}
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

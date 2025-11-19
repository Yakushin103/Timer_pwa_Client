
import { useEffect, useState } from 'react'
import classNames from 'classnames'
//@ts-ignore
import moment from 'moment'

import SelectIdsComponent from '../../components/Select'
import Timer from '../../components/Timer'

import { useAppSelector } from '../../store/hooks'
import { addTimeApi, getStoreApi } from '../../api/timerApi'

import { DataProps } from '../../modules/pages/Main'

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

  useEffect(() => {
    console.log('JJJJ');
    
    getStore()
  }, [])

  async function saveTime() {
    const { success } = await addTimeApi({
      ...data,
      day: moment().format('DD-MM-YYYY'),
    })

    if (success) {
      handleClearTime()
    }
  }

  async function getStore() {
    let date = moment().format('YYYY-MM-DD')
    const { success, data } = await getStoreApi(date)

    if (success) {
      console.log('DATA', data);

    }
  }

  function handleClearTime() {
    setData({
      ...data,
      seconds: 0,
      minutes: 0,
      hours: 0,
    })
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

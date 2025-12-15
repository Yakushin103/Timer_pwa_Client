import { useEffect, useState } from "react"
import classNames from 'classnames'
//@ts-ignore
import moment from "moment"

import SelectIdsComponent from "../../components/Select"
import Icon from "../../components/Icon"

import { useAppDispatch, useAppSelector } from "../../store/hooks"
import { addTimeApi, deleteTimeApi, getStoreApi, updatedTimeApi } from '../../api/timerApi'
import { getFormat } from "../../utils/funcs"
import { errorSignOut } from "../../store/thunk"

import { ItemStoreProps } from "../../modules/api/Timer"

import "react-datepicker/dist/react-datepicker.css";

export default function Index() {
  const dispatch = useAppDispatch()

  const companyOptions = useAppSelector((store) => store.companies)

  const [filters, setFilters] = useState({
    company_id: 0,
    day: 'all'
  })
  const [report, setReport] = useState<ItemStoreProps[]>([])
  const [total, setTotal] = useState('')
  const [editTime, setEditTime] = useState({
    hours: 0,
    minutes: 0,
    seconds: 0,
    id: 0,
  })
  const [addTime, setAddTime] = useState({
    day: moment().format('YYYY-MM-DD'),
    company_id: 0,
    hours: 0,
    minutes: 0,
    seconds: 0,
    is_open: false,
  })

  useEffect(() => {
    getStore()
  }, [filters.company_id])

  async function getStore() {
    const { success, data, total_time, message } = await getStoreApi(filters.day, !!filters.company_id ? filters.company_id : undefined)

    if (success) {
      setReport(data)
      setTotal(total_time)
    } else {
      if (message === 'Authorization is required') {
        dispatch(errorSignOut(''))
      }
    }
  }

  async function handleRemoveTime(id: number) {
    try {
      const { success, message } = await deleteTimeApi(id)

      if (success) {
        getStore()
      } else {
        if (message === 'Authorization is required') {
          dispatch(errorSignOut(''))
        }
      }
    } catch (error) { }
  }

  async function handleUpdatedTime() {
    try {
      const { success, message } = await updatedTimeApi({
        ...editTime,
        day: '',
        company_id: 0,
      })

      if (success) {
        getStore()
        handleCancel()
      } else {
        if (message === 'Authorization is required') {
          dispatch(errorSignOut(''))
        }
      }
    } catch (error) { }
  }

  async function handleSaveAddTime() {
    try {
      let day = moment(addTime.day).format('DD-MM-YYYY')

      const { success, message } = await addTimeApi({
        ...addTime,
        day,
      })

      if (success) {
        getStore()
        handleCancelAdd()
      } else {
        if (message === 'Authorization is required') {
          dispatch(errorSignOut(''))
        }
      }
    } catch (error) { }
  }

  function getTime(hours: number, minutes: number, seconds: number) {
    return `${getFormat(hours)[0]}${getFormat(hours)[1]} : ${getFormat(minutes)[0]}${getFormat(minutes)[1]} : ${getFormat(seconds)[0]}${getFormat(seconds)[1]}`
  }

  function getCompanyName(id: number) {
    let name = ''

    companyOptions.forEach(item => {
      if (item.id === id) {
        name = item.name
      }
    })

    return name
  }

  function handleEditTime(id: number, hours: number, minutes: number, seconds: number) {
    setEditTime({
      id,
      hours,
      minutes,
      seconds,
    })
  }

  function handleCancel() {
    setEditTime({
      hours: 0,
      minutes: 0,
      seconds: 0,
      id: 0,
    })
  }

  function handleCancelAdd() {
    setAddTime({
      day: moment().format('YYYY-MM-DD'),
      company_id: 0,
      hours: 0,
      minutes: 0,
      seconds: 0,
      is_open: false,
    })
  }

  function handleAddTime() {
    setAddTime({
      ...addTime,
      company_id: filters.company_id,
      is_open: true,
    })
  }

  return (
    <div className="content">
      <div className="row-buttons sb">
        <div>
          <SelectIdsComponent
            id={filters.company_id}
            options={companyOptions.map(option => {
              return {
                id: option.id,
                name: option.name
              }
            })}
            handleSelect={(value) => setFilters({ ...filters, company_id: value as number })}
          />
        </div>

        <div>
          <button
            className="white"
            disabled={!!editTime.id}
            onClick={() => handleAddTime()}
          >
            Add Time
          </button>
        </div>
      </div>

      <div className="row sb">
        The total time is {total}
      </div>

      <div className="__show-on-wide">
        <div className="table-row mt">
          <table className="table">
            <thead>
              <tr>
                <th>Date</th>
                <th>Time</th>
                <th>Company</th>
                <th>Edit</th>
                <th>Remove</th>
              </tr>
            </thead>

            <tbody>
              {
                report.map(item => (
                  <tr
                    key={item.id}
                    className={classNames({ _active: item.id === editTime.id })}
                  >
                    <td> {item.day} </td>
                    <td> {getTime(item.hours, item.minutes, item.seconds)} </td>
                    <td> {getCompanyName(item.company_id)} </td>
                    <td>
                      {
                        !addTime.is_open &&
                        <div
                          className="action edit"
                          onClick={() => handleEditTime(item.id, item.hours, item.minutes, item.seconds)}
                        >
                          <Icon
                            icon="pencil-1"
                          />
                        </div>
                      }
                    </td>
                    <td>
                      {
                        !addTime.is_open &&
                        <div
                          className="action delete"
                          onClick={() => handleRemoveTime(item.id)}
                        >
                          <Icon
                            icon="delete-1"
                            viewBox="0 0 128 128"
                          />
                        </div>
                      }
                    </td>
                  </tr>
                ))
              }
            </tbody>
          </table>
        </div>
      </div>

      <div className="__show-on-tablet">
        <div className="table-row mt">
          <table className="table">
            <thead>
              <tr>
                <th>Date</th>
                <th>Time</th>
                <th>Company</th>
                <th>Edit</th>
                <th>Remove</th>
              </tr>
            </thead>

            <tbody>
              {
                report.map(item => (
                  <tr
                    key={item.id}
                    className={classNames({ _active: item.id === editTime.id })}
                  >
                    <td> {item.day} </td>
                    <td> {getTime(item.hours, item.minutes, item.seconds)} </td>
                    <td> {getCompanyName(item.company_id)} </td>
                    <td>
                      {
                        !addTime.is_open &&
                        <div
                          className="action edit"
                          onClick={() => handleEditTime(item.id, item.hours, item.minutes, item.seconds)}
                        >
                          <Icon
                            icon="pencil-1"
                          />
                        </div>
                      }
                    </td>
                    <td>
                      {
                        !addTime.is_open &&
                        <div
                          className="action delete"
                          onClick={() => handleRemoveTime(item.id)}
                        >
                          <Icon
                            icon="delete-1"
                            viewBox="0 0 128 128"
                          />
                        </div>
                      }
                    </td>
                  </tr>
                ))
              }
            </tbody>
          </table>
        </div>
      </div>

      <div className="__show-on-mobile">
        <div className='table-mobile mt'>
          {
            report.map(item => (
              <div key={item.id} className="item">
                <div className="left">
                  <div className='row-mobile'>
                    <span className='name'>Day:</span>

                    <span className='value'> {item.day} </span>
                  </div>

                  <div className='row-mobile'>
                    <span className='name'>Time:</span>

                    <span className='value'> {getTime(item.hours, item.minutes, item.seconds)} </span>
                  </div>

                  <div className='row-mobile'>
                    <span className='name'>Company:</span>

                    <span className='value'> {getCompanyName(item.company_id)} </span>
                  </div>
                </div>

                <div className="right">
                  {
                    !addTime.is_open &&
                    <div className='row-mobile'>
                      <span className='name'>Pay:</span>

                      <div
                        className="action edit"
                        onClick={() => handleEditTime(item.id, item.hours, item.minutes, item.seconds)}
                      >
                        <Icon
                          icon="pencil-1"
                        />
                      </div>
                    </div>
                  }

                  {
                    !addTime.is_open &&
                    <div className='row-mobile'>
                      <span className='name'>Delete:</span>

                      <div
                        className="action delete"
                        onClick={() => handleRemoveTime(item.id)}
                      >
                        <Icon
                          icon="delete-1"
                          viewBox="0 0 128 128"
                        />
                      </div>
                    </div>
                  }
                </div>
              </div>
            ))
          }
        </div>
      </div>

      {
        !!editTime.id &&
        <div className="row sb gap mt">
          <div className="field">
            <span>Hours</span>

            <input
              type="number"
              className="input-text-add"
              value={Number(editTime.hours).toFixed(0)}
              onChange={(event) => setEditTime({ ...editTime, hours: +event.target.value })}
            />
          </div>

          <div className="field">
            <span>Minutes</span>

            <input
              type="number"
              className="input-text-add"
              value={Number(editTime.minutes).toFixed(0)}
              onChange={(event) => setEditTime({ ...editTime, minutes: +event.target.value })}
            />
          </div>

          <div className="field">
            <span>Seconds</span>

            <input
              type="number"
              className="input-text-add"
              value={Number(editTime.seconds).toFixed(0)}
              onChange={(event) => setEditTime({ ...editTime, seconds: +event.target.value })}
            />
          </div>
        </div>
      }

      {
        !!editTime.id &&
        <div className="row gap flex-end mt">
          <button
            className="white delete"
            onClick={() => handleCancel()}
          >
            Cancel
          </button>

          <button
            className="white save"
            onClick={() => handleUpdatedTime()}
          >
            Save
          </button>
        </div>
      }

      {
        addTime.is_open &&
        <div className="row sb gap mt">
          <div className="field">
            <span>Company</span>

            <SelectIdsComponent
              id={addTime.company_id}
              options={companyOptions.map(option => {
                return {
                  id: option.id,
                  name: option.name
                }
              })}
              handleSelect={(value) => setAddTime({ ...addTime, company_id: value as number })}
            />
          </div>

          <div className="field">
            <span>Day</span>

            <input
              type="date"
              className="input-text-add"
              value={addTime.day}
              onChange={(event) => setAddTime({ ...addTime, day: event.target.value })}
            />
          </div>
        </div>
      }

      {
        addTime.is_open &&
        <div className="row sb gap mt">
          <div className="field">
            <span>Hours</span>

            <input
              type="number"
              className="input-text-add"
              value={Number(addTime.hours).toFixed(0)}
              onChange={(event) => setAddTime({ ...addTime, hours: +event.target.value })}
            />
          </div>

          <div className="field">
            <span>Minutes</span>

            <input
              type="number"
              className="input-text-add"
              value={Number(addTime.minutes).toFixed(0)}
              onChange={(event) => setAddTime({ ...addTime, minutes: +event.target.value })}
            />
          </div>

          <div className="field">
            <span>Seconds</span>

            <input
              type="number"
              className="input-text-add"
              value={Number(addTime.seconds).toFixed(0)}
              onChange={(event) => setAddTime({ ...addTime, seconds: +event.target.value })}
            />
          </div>
        </div>
      }

      {
        addTime.is_open &&
        <div className="row-buttons gap flex-end mt">
          <button
            className="white delete"
            onClick={() => handleCancelAdd()}
          >
            Cancel
          </button>

          <button
            className="white save"
            disabled={(!addTime.hours && !addTime.minutes && !addTime.seconds) || !addTime.company_id || !addTime.day}
            onClick={() => handleSaveAddTime()}
          >
            Add
          </button>
        </div>
      }
    </div>
  )
}

import { useEffect, useState } from 'react'

import SelectIdsComponent from '../../components/Select'

import { useAppSelector } from '../../store/hooks'
import { addReportApi, getReportSettingsStoreApi, getReportsStoreApi } from '../../api/reportsApi'

import { AddReportProps } from '../../modules/pages/Settings'

export default function AddReport({ handlePage }: AddReportProps) {
  const companyOptions = useAppSelector((store) => store.companies)

  const [data, setData] = useState({
    start_date: '',
    end_date: '',
    payout: '',
    company_id: 0,
    is_payout: false,
  })

  const [filters, setFilters] = useState({
    min_date: '',
    max_date: '',
  })

  const [total, setTotal] = useState({
    total_hours: '',
    total_payout: '',
  })

  useEffect(() => {
    getStore()
  }, [])

  useEffect(() => {
    if (!!data.company_id) {
      getStoreWithFilters()
    }

  }, [data.start_date, data.end_date, data.company_id])

  async function getStore() {
    try {
      const { success, min_date, max_date } = await getReportsStoreApi()

      if (success) {
        setFilters({
          min_date: !!min_date ? min_date : filters.min_date,
          max_date: !!max_date ? max_date : filters.max_date,
        })
      } else {
        setFilters({
          min_date: '',
          max_date: '',
        })
      }
    } catch (error) {
      setFilters({
        min_date: '',
        max_date: '',
      })
    }
  }

  async function getStoreWithFilters() {
    try {
      const { success, total_hours, total_payout, min_date, max_date } = await getReportSettingsStoreApi(data.company_id, data.start_date, data.end_date)

      if (success) {
        setTotal({
          total_hours,
          total_payout,
        })
        setFilters({
          min_date,
          max_date,
        })
      } else {
        handleClear()
      }
    } catch (error) {
      handleClear()
    }
  }

  async function handleAddReport() {
    try {
      const { success } = await addReportApi(data)
      if (success) {
        handlePage('reports')
      } else {
        handleClear()
      }
    } catch (error) {
      handleClear()
    }
  }

  function handleClear() {
    setData({
      start_date: '',
      end_date: '',
      payout: '',
      company_id: 0,
      is_payout: false,
    })
    setTotal({
      total_hours: '',
      total_payout: '',
    })
    setFilters({
      min_date: '',
      max_date: '',
    })
  }

  function handleFocus(event: any) {
    const target = event.currentTarget;

    target.type = 'text';
    target.setSelectionRange(target.value.length, target.value.length);
    target.type = 'number';
    target && target.focus()
  }

  function handleChangeItem(event: any) {
    let price = event.target.value

    let numberWithoutDot = price.split('.')

    if (Number(price) >= 0 && !!price) {
      if (numberWithoutDot[1] && numberWithoutDot[1].toString().length > 2) {
        let newNumber = `${numberWithoutDot[0]}${numberWithoutDot[1].toString()[0]}.${numberWithoutDot[1].toString()[1]}${price[price.length - 1]}`
        setData({ ...data, payout: newNumber })
      } else {
        let newNumber = price

        setData({ ...data, payout: newNumber })
      }
    }
  }

  function handleChangeItemBackspace(event: any) {
    if (event.keyCode === 8) {
      event.preventDefault()
      let price = event.target.value
      let numberWithoutDot = `${price}`.split('.')
      if (numberWithoutDot[0].length > 1) {
        let newNumber = `${numberWithoutDot[0].slice(0, -1)}.${numberWithoutDot[0][numberWithoutDot[0].length - 1]}${numberWithoutDot[1][0]}`
        setData({ ...data, payout: newNumber })
      } else {
        let newNumber = `0.${numberWithoutDot[0][0]}${numberWithoutDot[1][0]}`
        setData({ ...data, payout: newNumber })
      }
    }
  }

  return (
    <div className="companies-list">
      <div className="row sb">
        <div className="title">New Report</div>

        <button
          className="white"
          onClick={() => handlePage('reports')}
        >
          Back
        </button>
      </div>

      {
        !!total.total_hours &&
        <div className="row sb gap">
          <p> You have unpaid time - {total.total_hours}, for the amount  - {total.total_payout} </p>
        </div>
      }

      <div className="row sb gap">
        <div className="field">
          <span>Company</span>

          <SelectIdsComponent
            id={data.company_id}
            options={companyOptions.map(option => {
              return {
                id: option.id,
                name: option.name
              }
            })}
            handleSelect={(value) => setData({ ...data, company_id: value as number })}
          />
        </div>

        <div className="field">
          <span>Payout</span>

          <input
            type="number"
            className="input-text-add"
            step="0.01"
            value={Number(data.payout).toFixed(2)}
            onFocus={(event) => handleFocus(event)}
            onChange={(event) => handleChangeItem(event)}
            onKeyDown={(event) => handleChangeItemBackspace(event)}
          />
        </div>
      </div>

      {
        !!data.company_id &&
        <div className="row sb gap">
          <div className="field">
            <span>Date start</span>

            <input
              type="date"
              className="input-text-add"
              min={filters.min_date}
              max={filters.max_date}
              value={data.start_date}
              onChange={(event) => setData({ ...data, start_date: event.target.value })}
            />
          </div>

          <div className="field">
            <span>Date end</span>

            <input
              type="date"
              className="input-text-add"
              disabled={!data.start_date}
              min={data.start_date}
              max={filters.max_date}
              value={data.end_date}
              onChange={(event) => setData({ ...data, end_date: event.target.value })}
            />
          </div>
        </div>
      }

      <div className="row gap flex-end">
        <button
          className="white delete"
          disabled={(!data.start_date && !data.end_date) || !data.company_id || !data.payout}
          onClick={() => handleClear()}
        >
          Clear
        </button>

        <button
          className="white save"
          disabled={(!data.start_date && !data.end_date) || !data.company_id || !data.payout}
          onClick={() => handleAddReport()}
        >
          Save
        </button>
      </div>
    </div>
  )
}

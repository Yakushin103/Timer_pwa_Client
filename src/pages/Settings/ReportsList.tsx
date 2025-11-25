import { memo, useEffect, useState } from 'react'
import classNames from 'classnames'

import Icon from '../../components/Icon'

import { deleteReportApi, getReportsStoreApi, payReportApi } from '../../api/reportsApi'
import { useAppDispatch } from '../../store/hooks'
import { setLoading } from '../../store/reducer'

import { DeleteReportProps, ReportDataProps } from '../../modules/api/Reports'
import { ReportsListProps } from '../../modules/pages/Settings'

function ReportsList({ handlePage }: ReportsListProps) {
  const dispatch = useAppDispatch()

  const [report, setReport] = useState<ReportDataProps[]>([])

  useEffect(() => {
    getStore()
  }, [])

  async function getStore() {
    dispatch(setLoading(true))
    try {
      const { success, data } = await getReportsStoreApi()

      if (success) {
        setReport(data)
      } else {
        setReport([])
      }

      dispatch(setLoading(false))
    } catch (error) {
      setReport([])
      dispatch(setLoading(false))
    }
  }

  async function deleteReport(data: DeleteReportProps) {
    dispatch(setLoading(true))
    try {
      const { success } = await deleteReportApi(data)
      if (success) {
        getStore()
      } else {
        getStore()
      }

      dispatch(setLoading(false))
    } catch (error) {
      getStore()
    }
  }

  async function handlePayReport(id: number) {
    dispatch(setLoading(true))
    try {
      const { success } = await payReportApi(id)
      if (success) {
        getStore()
      } else {
        getStore()
      }
    } catch (error) {
      getStore()
    }
  }

  return (
    <div className="companies-list">
      <div className="row sb">
        <div className="title">All Reports</div>

        <div className="row-action">
          <button
            className="white"
            onClick={() => handlePage('')}
          >
            Back
          </button>

          <button
            className="white"
            onClick={() => handlePage('add_report')}
          >
            Add Report
          </button>
        </div>
      </div>

      {
        !!report.length &&
        <div className="__show-on-wide">
          <div className="row">
            <table className="table">
              <tr>
                <th>Company Name</th>
                <th>Start Date</th>
                <th>End Date</th>
                <th>Payout</th>
                <th>Is Payout</th>
                <th>Create Date</th>
                <th>Payout Date</th>
                <th>Pay</th>
                <th>Delete</th>
              </tr>

              {
                report.map(item => (
                  <tr key={item.id}>
                    <td> {item.company_name} </td>

                    <td> {item.start_date} </td>

                    <td> {item.end_date} </td>

                    <td> {item.payout} </td>

                    <td
                      className={classNames({
                        _green: item.is_payout,
                        _red: !item.is_payout,
                      })}
                    > {item.is_payout ? 'Yes' : 'No'} </td>

                    <td> {item.create_date} </td>

                    <td> {item.payout_date} </td>

                    <td>
                      <div
                        className="action save"
                        onClick={() => handlePayReport(item.id)}
                      >
                        <Icon
                          viewBox='0 0 1024 1024'
                          icon="pay-7"
                        />
                      </div>
                    </td>

                    <td>
                      <div
                        className="action delete"
                        onClick={() => deleteReport({ id: item.id, company_id: item.company_id, start_date: item.start_date, end_date: item.end_date })}
                      >
                        <Icon
                          icon="delete-1"
                          viewBox="0 0 128 128"
                        />
                      </div>
                    </td>
                  </tr>
                ))
              }
            </table>
          </div>
        </div>
      }

      {
        !!report.length &&
        <div className="__show-on-tablet">
          <div className="row">
            <table className="table">
              <tr>
                <th>Company</th>
                <th>Start / End Date</th>
                <th>Payout / Is</th>
                <th>Create / Payout Date</th>
                <th>Pay / Delete</th>
              </tr>

              {
                report.map(item => (
                  <tr key={item.id}>
                    <td>
                      <div className='col'>
                        <div> {item.company_name} </div>

                      </div>
                    </td>

                    <td>
                      <div className='col'>
                        <div> {item.start_date} </div>
                        <div> {item.end_date} </div>
                      </div>
                    </td>

                    <td>
                      <div className='col'>
                        <div> {item.payout} </div>
                        <div
                          className={classNames({
                            _green: item.is_payout,
                            _red: !item.is_payout,
                          })}
                        > {item.is_payout ? 'Yes' : 'No'} </div>
                      </div>
                    </td>

                    <td>
                      <div className='col'>
                        <div> {item.create_date} </div>
                        <div> {item.payout_date} </div>
                      </div>
                    </td>

                    <td>
                      <div className='col'>
                        <div
                          className="action save"
                          onClick={() => handlePayReport(item.id)}
                        >
                          <Icon
                            viewBox='0 0 1024 1024'
                            icon="pay-7"
                          />
                        </div>

                        <div
                          className="action delete"
                          onClick={() => deleteReport({ id: item.id, company_id: item.company_id, start_date: item.start_date, end_date: item.end_date })}
                        >
                          <Icon
                            icon="delete-1"
                            viewBox="0 0 128 128"
                          />
                        </div>
                      </div>
                    </td>
                  </tr>
                ))
              }
            </table>
          </div>
        </div>
      }

      {
        !!report.length &&
        <div className="__show-on-mobile">
          <div className='table-mobile'>
            {
              report.map(item => (
                <div key={item.id} className="item">
                  <div className="left">
                    <div className='row-mobile'>
                      <span className='name'>Company:</span>

                      <span className='value'> {item.company_name} </span>
                    </div>

                    <div className='row-mobile'>
                      <span className='name'>Start Date:</span>

                      <span className='value'> {item.start_date} </span>
                    </div>

                    <div className='row-mobile'>
                      <span className='name'>End Date:</span>

                      <span className='value'> {item.end_date} </span>
                    </div>

                    <div className='row-mobile'>
                      <span className='name'>Payout:</span>

                      <span className='value'> {item.payout} </span>
                    </div>

                    <div className='row-mobile'>
                      <span className='name'>Is Payout:</span>

                      <span
                        className={classNames('value', {
                          _green: item.is_payout,
                          _red: !item.is_payout,
                        })}
                      > {item.is_payout ? 'Yes' : 'No'} </span>
                    </div>
                  </div>

                  <div className="right">
                    <div className='row-mobile'>
                      <span className='name'>Create Date:</span>

                      <span className='value'> {item.create_date} </span>
                    </div>

                    <div className='row-mobile'>
                      <span className='name'>Payout Date:</span>

                      <span className='value'> {item.payout_date} </span>
                    </div>

                    <div className='row-mobile'>
                      <span className='name'>Pay:</span>

                      <div
                        className="action save"
                        onClick={() => handlePayReport(item.id)}
                      >
                        <Icon
                          viewBox='0 0 1024 1024'
                          icon="pay-7"
                        />
                      </div>
                    </div>

                    <div className='row-mobile'>
                      <span className='name'>Delete:</span>

                      <div
                        className="action delete"
                        onClick={() => deleteReport({ id: item.id, company_id: item.company_id, start_date: item.start_date, end_date: item.end_date })}
                      >
                        <Icon
                          icon="delete-1"
                          viewBox="0 0 128 128"
                        />
                      </div>
                    </div>
                  </div>
                </div>
              ))
            }
          </div>
        </div>
      }
    </div>
  )
}

export default memo(ReportsList)
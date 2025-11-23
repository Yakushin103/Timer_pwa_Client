import { useEffect, useState } from 'react'
import classNames from 'classnames'

import Icon from '../../components/Icon'

import { deleteReportApi, getReportsStoreApi, payReportApi } from '../../api/reportsApi'

import { DeleteReportProps, ReportDataProps } from '../../modules/api/Reports'
import { ReportsListProps } from '../../modules/pages/Settings'

export default function ReportsList({ handlePage }: ReportsListProps) {
  const [report, setReport] = useState<ReportDataProps[]>([])

  useEffect(() => {
    getStore()
  }, [])

  async function getStore() {
    try {
      const { success, data } = await getReportsStoreApi()

      if (success) {
        setReport(data)
      } else {
        setReport([])
      }
    } catch (error) {
      setReport([])
    }
  }

  async function deleteReport(data: DeleteReportProps) {
    try {
      const { success } = await deleteReportApi(data)
      if (success) {
        getStore()
      } else {
        getStore()
      }
    } catch (error) {
      getStore()
    }
  }

  async function handlePayReport(id: number) {
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

      <div className="row">
        <div className="row">
          {
            !!report.length &&
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
          }
        </div>
      </div>
    </div>
  )
}

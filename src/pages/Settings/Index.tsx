import { useState } from 'react'

import CompaniesList from './CompaniesList'
import CurrencyList from './CurrencyList'
import PaymentMethodList from './PaymentMethodList'
import ReportsList from './ReportsList'

import AddCompany from './AddCompany'
import AddCurrency from './AddCurrency'
import AddPaymentMethod from './AddPaymentMethod'
import AddReport from './AddReport'

import '../../styles/pages/Settings.scss'

export default function Index() {
  const [page, setPage] = useState('')

  function handlePage(name: string) {
    setPage(name)
  }
  return (
    <>
      {
        page === '' &&
        <div className="content settings">
          <button
            className='white'
            onClick={() => handlePage('companies_list')}
          >
            Companies
          </button>

          <button
            className='white'
            onClick={() => handlePage('currency_list')}
          >
            Currency
          </button>

          <button
            className='white'
            onClick={() => handlePage('payment_method_list')}
          >
            Payment Method
          </button>

          <button
            className='white'
            onClick={() => handlePage('reports')}
          >
            Reports
          </button>
        </div>
      }

      {
        page === 'currency_list' &&
        <CurrencyList handlePage={handlePage} />
      }

      {
        page === 'add_currency' &&
        <AddCurrency handlePage={handlePage} />
      }

      {
        page === 'companies_list' &&
        <CompaniesList handlePage={handlePage} />
      }

      {
        page === 'add_company' &&
        <AddCompany handlePage={handlePage} />
      }

      {
        page === 'payment_method_list' &&
        <PaymentMethodList handlePage={handlePage} />
      }

      {
        page === 'add_payment_method' &&
        <AddPaymentMethod handlePage={handlePage} />
      }

      {
        page === 'reports' &&
        <ReportsList handlePage={handlePage} />
      }

      {
        page === 'add_report' &&
        <AddReport handlePage={handlePage} />
      }
    </>
  )
}

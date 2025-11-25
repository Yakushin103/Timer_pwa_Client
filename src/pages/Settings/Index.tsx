import { memo, useCallback, useState } from 'react'

import CompaniesList from './CompaniesList'
import CurrencyList from './CurrencyList'
import PaymentMethodList from './PaymentMethodList'
import ReportsList from './ReportsList'
import UsersList from './UsersList'

import AddCompany from './AddCompany'
import AddCurrency from './AddCurrency'
import AddPaymentMethod from './AddPaymentMethod'
import AddReport from './AddReport'
import AddUser from './AddUser'

import '../../styles/pages/Settings.scss'

function Index() {
  const [page, setPage] = useState('')

  function handlePage(name: string) {
    setPage(name)
  }

  const memoizedHandlePage = useCallback(handlePage, []);
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

          <button
            className='white'
            onClick={() => handlePage('users_list')}
          >
            Users
          </button>
        </div>
      }

      {
        page === 'users_list' &&
        <UsersList handlePage={memoizedHandlePage} />
      }

      {
        page === 'add_user' &&
        <AddUser handlePage={memoizedHandlePage} />
      }

      {
        page === 'currency_list' &&
        <CurrencyList handlePage={memoizedHandlePage} />
      }

      {
        page === 'add_currency' &&
        <AddCurrency handlePage={memoizedHandlePage} />
      }

      {
        page === 'companies_list' &&
        <CompaniesList handlePage={memoizedHandlePage} />
      }

      {
        page === 'add_company' &&
        <AddCompany handlePage={memoizedHandlePage} />
      }

      {
        page === 'payment_method_list' &&
        <PaymentMethodList handlePage={memoizedHandlePage} />
      }

      {
        page === 'add_payment_method' &&
        <AddPaymentMethod handlePage={memoizedHandlePage} />
      }

      {
        page === 'reports' &&
        <ReportsList handlePage={memoizedHandlePage} />
      }

      {
        page === 'add_report' &&
        <AddReport handlePage={memoizedHandlePage} />
      }
    </>
  )
}

export default memo(Index)
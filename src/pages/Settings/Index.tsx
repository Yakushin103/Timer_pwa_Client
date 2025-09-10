import { useState } from 'react'

import CompaniesList from './CompaniesList'
import AddCompany from './AddCompany'
import CurrencyList from './CurrencyList'
import AddCurrency from './AddCurrency'
import PaymentMethodList from './PaymentMethodList'
import AddPaymentMethod from './AddPaymentMethod'

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

    </>
  )
}

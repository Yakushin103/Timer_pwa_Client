import { useState } from "react";

import { addPaymentMethodApi } from "../../api/paymentMethodApi";

import { AddPaymentMethodProps, NewPaymentMethodProps } from "../../modules/pages/Settings";

export default function AddPaymentMethod({ handlePage }: AddPaymentMethodProps) {
  const [data, setData] = useState<NewPaymentMethodProps>({
    name: '',
    description: '',
    period: '',
  })

  function handleClear() {
    setData({
      name: '',
      description: '',
      period: '',
    })
  }

  async function handleAddPaymentMethod() {
    try {
      const { success } = await addPaymentMethodApi(data)

      if (success) {
        handlePage('payment_method_list')
      } else {
        setData({
          name: '',
          description: '',
          period: '',
        })
      }
    } catch (error) {
      setData({
        name: '',
        description: '',
        period: '',
      })
    }
  }
  return (
    <div className="companies-list">
      <div className="row-buttons sb">
        <div className="title">New Payment Method</div>

        <button
          className="white"
          onClick={() => handlePage('payment_method_list')}
        >
          Back
        </button>
      </div>

      <div className="row sb gap">
        <div className="field">
          <span>Name</span>

          <input
            type="text"
            className="input-text-add"
            value={data.name}
            onChange={(event) => setData({ ...data, name: event.target.value })}
          />
        </div>

        <div className="field">
          <span>Period</span>

          <input
            type="text"
            className="input-text-add"
            value={data.period}
            onChange={(event) => setData({ ...data, period: event.target.value })}
          />
        </div>
      </div>

      <div className="row sb gap">
        <div className="field">
          <span>Description</span>

          <input
            type="text"
            className="input-text-add"
            value={data.description}
            onChange={(event) => setData({ ...data, description: event.target.value })}
          />
        </div>
      </div>

      <div className="row-buttons gap flex-end">
        <button
          className="white delete"
          disabled={data.name === '' || data.period === ''}
          onClick={() => handleClear()}
        >
          Clear
        </button>

        <button
          className="white save"
          disabled={data.name === '' || data.period === ''}
          onClick={() => handleAddPaymentMethod()}
        >
          Save
        </button>
      </div>

    </div>
  )
}
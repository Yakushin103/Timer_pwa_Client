import { memo, useState } from "react";

import { addPaymentMethodApi } from "../../api/paymentMethodApi";
import { useAppDispatch } from "../../store/hooks";
import { setLoading } from "../../store/reducer";
import { errorSignOut } from "../../store/thunk";

import { AddPaymentMethodProps, NewPaymentMethodProps } from "../../modules/pages/Settings";

function AddPaymentMethod({ handlePage }: AddPaymentMethodProps) {
  const dispatch = useAppDispatch()

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
    dispatch(setLoading(true))
    try {
      const { success, message } = await addPaymentMethodApi(data)

      if (success) {
        handlePage('payment_method_list')
      } else {
        if (message === 'Authorization is required') {
          dispatch(errorSignOut(''))
        } else {
          setData({
            name: '',
            description: '',
            period: '',
          })
        }
      }

      dispatch(setLoading(false))
    } catch (error) {
      setData({
        name: '',
        description: '',
        period: '',
      })
      dispatch(setLoading(false))
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

export default memo(AddPaymentMethod)
import { memo, useState } from "react";

import { addCurrencyApi } from "../../api/currencyApi";
import { useAppDispatch } from "../../store/hooks";
import { setLoading } from "../../store/reducer";

import { AddCurrencyProps, NewCurrencyProps } from "../../modules/pages/Settings";

function AddCurrency({ handlePage }: AddCurrencyProps) {
  const dispatch = useAppDispatch()

  const [data, setData] = useState<NewCurrencyProps>({
    name: '',
    short_name: '',
  })

  function handleClear() {
    setData({
      name: '',
      short_name: '',
    })
  }

  async function handleAddCurrency() {
    dispatch(setLoading(true))
    try {
      const { success } = await addCurrencyApi(data)

      if (success) {
        handlePage('currency_list')
      } else {
        setData({
          name: '',
          short_name: '',
        })
      }
      dispatch(setLoading(false))
    } catch (error) {
      setData({
        name: '',
        short_name: '',
      })
      dispatch(setLoading(false))
    }
  }

  return (
    <div className="companies-list">
      <div className="row-buttons sb">
        <div className="title">New Currency</div>

        <button
          className="white"
          onClick={() => handlePage('currency_list')}
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
          <span>Short Name</span>

          <input
            type="text"
            className="input-text-add"
            value={data.short_name}
            onChange={(event) => setData({ ...data, short_name: event.target.value })}
          />
        </div>
      </div>

      <div className="row-buttons gap flex-end">
        <button
          className="white delete"
          disabled={data.name === '' || data.short_name === ''}
          onClick={() => handleClear()}
        >
          Clear
        </button>

        <button
          className="white save"
          disabled={data.name === '' || data.short_name === ''}
          onClick={() => handleAddCurrency()}
        >
          Save
        </button>
      </div>

    </div>
  )
}

export default memo(AddCurrency)
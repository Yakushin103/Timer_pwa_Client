import { useState } from "react";

import { addCurrencyApi } from "../../api/currencyApi";

import { AddCurrencyProps, NewCurrencyProps } from "../../modules/pages/Settings";

export default function AddCurrency({ handlePage }: AddCurrencyProps) {
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
    } catch (error) {
      setData({
        name: '',
        short_name: '',
      })
    }
  }
  return (
    <div className="companies-list">
      <div className="row sb">
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

      <div className="row gap flex-end">
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
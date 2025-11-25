import { memo, useEffect, useState } from "react";

import SelectIdsComponent from "../../components/Select";

import { addCompanyStoreApi, getCompanyStoreApi } from "../../api/companyApi";
import { useAppDispatch } from "../../store/hooks";

import { AddCompanyProps, CompaniesListOptionsProps } from "../../modules/pages/Settings";
import { updatedCompanyListThunk } from "../../store/thunk";
import { setLoading } from "../../store/reducer";

function AddCompany({ handlePage }: AddCompanyProps) {
  const dispatch = useAppDispatch()

  const [options, setOptions] = useState<CompaniesListOptionsProps>({
    currency_options: [],
    payment_method_options: [],
  })

  const [data, setData] = useState({
    name: '',
    currency_id: 0,
    short_name: '',
    payment_method_id: 0,
  })

  useEffect(() => {
    getStore()
  }, [])

  async function getStore() {
    dispatch(setLoading(true))
    try {
      const { success, data } = await getCompanyStoreApi()

      if (success) {
        setOptions(data)
      }

      dispatch(setLoading(false))
    } catch (error) {
      dispatch(setLoading(false))
    }
  }

  async function handleAddCompany() {
    dispatch(setLoading(true))
    try {
      const { success } = await addCompanyStoreApi(data)
      if (success) {
        dispatch(updatedCompanyListThunk(''))
        handlePage('companies_list')
      }

      dispatch(setLoading(false))
    } catch (error) {
      dispatch(setLoading(false))
    }
  }

  function handleClear() {
    setData({
      name: '',
      currency_id: 0,
      short_name: '',
      payment_method_id: 0,
    })
  }

  return (
    <div className="companies-list">
      <div className="row-buttons sb">
        <div className="title">New Company</div>

        <button
          className="white"
          onClick={() => handlePage('companies_list')}
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

      <div className="row sb gap">
        <div className="field">
          <span>Currency</span>

          <SelectIdsComponent
            id={data.currency_id}
            options={options.currency_options.map(option => {
              return {
                id: option.id,
                name: option.name
              }
            })}
            handleSelect={(value) => setData({ ...data, currency_id: value as number })}
          />
        </div>

        <div className="field">
          <span>Payment Method</span>

          <SelectIdsComponent
            id={data.payment_method_id}
            options={options.payment_method_options.map(option => {
              return {
                id: option.id,
                name: option.name
              }
            })}
            handleSelect={(value) => setData({ ...data, payment_method_id: value as number })}
          />
        </div>
      </div>

      <div className="row-buttons gap flex-end">
        <button
          className="white delete"
          disabled={!data.name && !data.short_name && !data.currency_id && !data.payment_method_id}
          onClick={() => handleClear()}
        >
          Clear
        </button>

        <button
          className="white save"
          disabled={!data.name || !data.short_name || !data.currency_id || !data.payment_method_id}
          onClick={() => handleAddCompany()}
        >
          Save
        </button>
      </div>
    </div>
  )
}

export default memo(AddCompany)
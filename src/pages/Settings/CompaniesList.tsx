import { memo, useEffect, useState } from "react";

import Icon from "../../components/Icon";
import SelectComponent from "../../components/Select";

import { useAppDispatch, useAppSelector } from "../../store/hooks";
import { deleteCompanyApi, getCompanyStoreApi } from "../../api/companyApi";
import { errorSignOut, updatedCompanyListThunk } from "../../store/thunk";
import { setLoading } from "../../store/reducer";

import { CompanyProps } from "../../modules/api/Company";
import { CompaniesListOptionsProps, CompaniesListProps } from "../../modules/pages/Settings";

function CompaniesList({ handlePage }: CompaniesListProps) {
  const dispatch = useAppDispatch()

  const companies = useAppSelector((store) => store.companies)

  const [edit, setEdit] = useState<CompanyProps | null>(null)
  const [options, setOptions] = useState<CompaniesListOptionsProps>({
    currency_options: [],
    payment_method_options: [],
  })

  useEffect(() => {
    getStore()
  }, [])

  async function getStore() {
    dispatch(setLoading(true))
    try {
      const { success, data, message } = await getCompanyStoreApi()

      if (success) {
        setOptions(data)
      } else {
        if (message === 'Authorization is required') {
          dispatch(errorSignOut(''))
        }
      }
      dispatch(setLoading(false))
    } catch (error) {
      dispatch(setLoading(false))
    }
  }

  async function editCompany() {
    try {

    } catch (error) { }
  }

  async function deleteCompany(id: number) {
    dispatch(setLoading(true))
    try {
      const { success, message } = await deleteCompanyApi(id)

      if (success) {
        dispatch(updatedCompanyListThunk(''))
      } else {
        if (message === 'Authorization is required') {
          dispatch(errorSignOut(''))
        }
      }

      dispatch(setLoading(false))
    } catch (error) {
      dispatch(setLoading(false))
    }
  }

  return (
    <div className="companies-list">
      <div className="row-buttons sb">
        <div className="title">All Companies</div>

        <div className="row-action">
          <button
            className="white"
            onClick={() => handlePage('')}
          >
            Back
          </button>

          <button
            className="white"
            onClick={() => handlePage('add_company')}
          >
            Add Company
          </button>
        </div>
      </div>

      {
        !!companies.length &&
        <div className="__show-on-wide">
          <div className="row">
            <table className="table">
              <tr>
                <th>Name</th>
                <th>Short Name</th>
                <th>Currency</th>
                <th>Peyment Method</th>
                <th>Edit</th>
                <th>Delete</th>
              </tr>

              {
                companies.map(item => (
                  <tr key={item.id}>
                    <td>
                      {
                        edit && edit.id === item.id ?
                          <input
                            type="text"
                            className="input-text"
                            value={edit.name}
                            onChange={(event) => setEdit({ ...edit, name: event.target.value })}
                          /> :
                          item.name
                      }
                    </td>

                    <td>
                      {
                        edit && edit.id === item.id ?
                          <input
                            type="text"
                            className="input-text"
                            value={edit.short_name}
                            onChange={(event) => setEdit({ ...edit, short_name: event.target.value })}
                          /> :
                          item.short_name
                      }
                    </td>

                    <td>
                      {
                        edit && edit.id === item.id ?
                          <SelectComponent
                            id={edit.currency_id}
                            options={options.currency_options.map(option => {
                              return {
                                id: option.id,
                                name: option.name
                              }
                            })}
                            handleSelect={(value) => setEdit({ ...edit, currency_id: value as number })}
                          />
                          :
                          item.currency_name
                      }
                    </td>

                    <td>
                      {
                        edit && edit.id === item.id ?
                          <SelectComponent
                            id={edit.payment_method_id}
                            options={options.payment_method_options.map(option => {
                              return {
                                id: option.id,
                                name: option.name
                              }
                            })}
                            handleSelect={(value) => setEdit({ ...edit, payment_method_id: value as number })}
                          />
                          :
                          item.payment_method_name
                      }
                    </td>

                    <td>
                      {
                        !!edit && edit.id === item.id &&
                        <div
                          className="action save"
                          onClick={() => editCompany()}
                        >
                          <Icon
                            icon="save-1"
                          />
                        </div>
                      }

                      {
                        !edit &&
                        <div
                          className="action edit"
                          onClick={() => setEdit(item)}
                        >
                          <Icon
                            icon="pencil-1"
                          />
                        </div>
                      }
                    </td>

                    <td>
                      {
                        !!edit && edit.id === item.id &&
                        <div
                          className="action delete"
                          onClick={() => setEdit(null)}
                        >
                          <Icon
                            icon="delete-1"
                            viewBox="0 0 128 128"
                          />
                        </div>
                      }

                      {
                        !edit &&
                        <div
                          className="action delete"
                          onClick={() => deleteCompany(item.id)}
                        >
                          <Icon
                            icon="delete-1"
                            viewBox="0 0 128 128"
                          />
                        </div>
                      }
                    </td>
                  </tr>
                ))
              }
            </table>
          </div>
        </div>
      }

      {
        !!companies.length &&
        <div className="__show-on-tablet">
          <div className="row">
            <table className="table">
              <tr>
                <th>Name / Short</th>
                <th>Currency / Peyment Method</th>
                <th>Edit / Delete</th>
              </tr>

              {
                companies.map(item => (
                  <tr key={item.id}>
                    <td>
                      <div className='col'>
                        <div>
                          {
                            edit && edit.id === item.id ?
                              <input
                                type="text"
                                className="input-text"
                                value={edit.name}
                                onChange={(event) => setEdit({ ...edit, name: event.target.value })}
                              /> :
                              item.name
                          }
                        </div>

                        <div>
                          {
                            edit && edit.id === item.id ?
                              <input
                                type="text"
                                className="input-text"
                                value={edit.short_name}
                                onChange={(event) => setEdit({ ...edit, short_name: event.target.value })}
                              /> :
                              item.short_name
                          }
                        </div>
                      </div>
                    </td>

                    <td>
                      <div>
                        {
                          edit && edit.id === item.id ?
                            <SelectComponent
                              id={edit.currency_id}
                              options={options.currency_options.map(option => {
                                return {
                                  id: option.id,
                                  name: option.name
                                }
                              })}
                              handleSelect={(value) => setEdit({ ...edit, currency_id: value as number })}
                            />
                            :
                            item.currency_name
                        }
                      </div>

                      <div>
                        {
                          edit && edit.id === item.id ?
                            <SelectComponent
                              id={edit.payment_method_id}
                              options={options.payment_method_options.map(option => {
                                return {
                                  id: option.id,
                                  name: option.name
                                }
                              })}
                              handleSelect={(value) => setEdit({ ...edit, payment_method_id: value as number })}
                            />
                            :
                            item.payment_method_name
                        }
                      </div>
                    </td>

                    <td>
                      <div className='col'>
                        <div>
                          {
                            !!edit && edit.id === item.id &&
                            <div
                              className="action save"
                              onClick={() => editCompany()}
                            >
                              <Icon
                                icon="save-1"
                              />
                            </div>
                          }

                          {
                            !edit &&
                            <div
                              className="action edit"
                              onClick={() => setEdit(item)}
                            >
                              <Icon
                                icon="pencil-1"
                              />
                            </div>
                          }
                        </div>
                      </div>

                      <div>
                        {
                          !!edit && edit.id === item.id &&
                          <div
                            className="action delete"
                            onClick={() => setEdit(null)}
                          >
                            <Icon
                              icon="delete-1"
                              viewBox="0 0 128 128"
                            />
                          </div>
                        }

                        {
                          !edit &&
                          <div
                            className="action delete"
                            onClick={() => deleteCompany(item.id)}
                          >
                            <Icon
                              icon="delete-1"
                              viewBox="0 0 128 128"
                            />
                          </div>
                        }
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
        companies.length &&
        <div className="__show-on-mobile">
          <div className='table-mobile mt'>
            {
              companies.map(item => (
                <div key={item.id} className="item">
                  <div className="left">
                    <div className='row-mobile'>
                      <span className='name'>Name:</span>

                      <span className='value'> {item.name} </span>
                    </div>

                    <div className='row-mobile'>
                      <span className='name'>Short Name:</span>

                      <span className='value'> {item.short_name} </span>
                    </div>

                    <div className='row-mobile'>
                      <span className='name'>Currency:</span>

                      <span className='value'> {item.currency_name} </span>
                    </div>

                    <div className='row-mobile'>
                      <span className='name'>Peyment Method:</span>

                      <span className='value'> {item.payment_method_name} </span>
                    </div>
                  </div>

                  <div className="right">
                    <div className='row-mobile'>
                      <span className='name'>Edit:</span>

                      {
                        !!edit && edit.id === item.id &&
                        <div
                          className="action save"
                          onClick={() => editCompany()}
                        >
                          <Icon
                            icon="save-1"
                          />
                        </div>
                      }

                      {
                        !edit &&
                        <div
                          className="action edit"
                          onClick={() => setEdit(item)}
                        >
                          <Icon
                            icon="pencil-1"
                          />
                        </div>
                      }
                    </div>

                    <div className='row-mobile'>
                      <span className='name'>Delete:</span>

                      {
                        !!edit && edit.id === item.id &&
                        <div
                          className="action delete"
                          onClick={() => setEdit(null)}
                        >
                          <Icon
                            icon="delete-1"
                            viewBox="0 0 128 128"
                          />
                        </div>
                      }

                      {
                        !edit &&
                        <div
                          className="action delete"
                          onClick={() => deleteCompany(item.id)}
                        >
                          <Icon
                            icon="delete-1"
                            viewBox="0 0 128 128"
                          />
                        </div>
                      }
                    </div>
                  </div>
                </div>
              ))
            }
          </div>
        </div >
      }
    </div >
  )
}

export default memo(CompaniesList)
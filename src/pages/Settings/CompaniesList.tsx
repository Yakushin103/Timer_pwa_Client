import { useEffect, useState } from "react";

import Icon from "../../components/Icon";
import SelectComponent from "../../components/Select";

import { useAppDispatch, useAppSelector } from "../../store/hooks";
import { deleteCompanyApi, getCompanyStoreApi } from "../../api/companyApi";

import { CompanyProps } from "../../modules/api/Company";
import { CompaniesListOptionsProps, CompaniesListProps } from "../../modules/pages/Settings";
import { updatedCompanyListThunk } from "../../store/thunk";

export default function CompaniesList({ handlePage }: CompaniesListProps) {
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
    try {
      const { success, data } = await getCompanyStoreApi()

      if (success) {
        setOptions(data)
      }
    } catch (error) { }
  }

  async function editCompany() {
    try {

    } catch (error) { }
  }

  async function deleteCompany(id: number) {
    try {
      const { success } = await deleteCompanyApi(id)

      if (success) {
        dispatch(updatedCompanyListThunk(''))
      }
    } catch (error) { }
  }

  return (
    <div className="companies-list">
      <div className="row sb">
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

      <div className="row">
        {
          !!companies.length &&
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
        }
      </div>
    </div>
  )
}

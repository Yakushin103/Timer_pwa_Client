import { memo, useEffect, useState } from "react";

import Icon from "../../components/Icon";

import { deleteCurrencyApi, editCurrencyApi, getCurrencyStoreApi } from "../../api/currencyApi";
import { useAppDispatch } from "../../store/hooks";
import { setLoading } from "../../store/reducer";

import { CurrencyListProps, CurrencyProps } from "../../modules/pages/Settings";

function CurrencyList({ handlePage }: CurrencyListProps) {
  const dispatch = useAppDispatch()

  const [list, setList] = useState<CurrencyProps[] | null>(null)

  const [edit, setEdit] = useState<CurrencyProps | null>(null)

  useEffect(() => {
    getStore()
  }, [])

  async function getStore() {
    dispatch(setLoading(true))
    try {
      const { success, data } = await getCurrencyStoreApi()

      if (success) {
        setList(data)
      } else {
        setList([])
      }
      dispatch(setLoading(false))
    } catch (error) {
      setList([])
      dispatch(setLoading(false))
    }
  }

  async function deleteCurrency(id: number) {
    dispatch(setLoading(true))
    try {
      const { success } = await deleteCurrencyApi(id)

      if (success) {
        getStore()
      } else {
        dispatch(setLoading(false))
      }
    } catch (error) {
      getStore()
    }
  }


  async function editCurrency() {
    dispatch(setLoading(true))
    try {
      if (edit) {
        const { success } = await editCurrencyApi(edit)

        if (success) {
          setEdit(null)
          getStore()
        } else {
          dispatch(setLoading(false))
        }
      }
    } catch (error) {
      getStore()
    }
  }

  return (
    <div className="companies-list">
      <div className="row-buttons sb">
        <div className="title">All Currency</div>

        <div className="row-action">
          <button
            className="white"
            onClick={() => handlePage('')}
          >
            Back
          </button>

          <button
            className="white"
            onClick={() => handlePage('add_currency')}
          >
            Add Currency
          </button>
        </div>
      </div>

      <div className="row">
        {
          list &&
          <table className="table">
            <thead>
              <tr>
                <th>Name</th>
                <th>Short Name</th>
                <th>Edit</th>
                <th>Delete</th>
              </tr>
            </thead>

            <tbody>
              {
                list.map(item => (
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
                        !!edit && edit.id === item.id &&
                        <div
                          className="action save"
                          onClick={() => editCurrency()}
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
                          onClick={() => deleteCurrency(item.id)}
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
            </tbody>
          </table>
        }
      </div>
    </div>
  )
}

export default memo(CurrencyList)
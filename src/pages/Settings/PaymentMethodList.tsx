import { memo, useEffect, useState } from "react";

import Icon from "../../components/Icon";

import { deletePaymentMethodApi, editPaymentMethodApi, getPaymentMethodStoreApi } from "../../api/paymentMethodApi";
import { useAppDispatch } from "../../store/hooks";
import { setLoading } from "../../store/reducer";
import { errorSignOut } from "../../store/thunk";

import { PaymentMethodListProps, PaymentMethodProps } from "../../modules/pages/Settings";

function PaymentMethodList({ handlePage }: PaymentMethodListProps) {
  const dispatch = useAppDispatch()

  const [list, setList] = useState<PaymentMethodProps[] | null>(null)

  const [edit, setEdit] = useState<PaymentMethodProps | null>(null)

  useEffect(() => {
    getStore()
  }, [])

  async function getStore() {
    dispatch(setLoading(true))
    try {
      const { success, data, message } = await getPaymentMethodStoreApi()

      if (success) {
        setList(data)
      } else {
        if (message === 'Authorization is required') {
          dispatch(errorSignOut(''))
        }

        setList([])
      }

      dispatch(setLoading(false))
    } catch (error) {
      setList([])
      dispatch(setLoading(false))
    }
  }

  async function deletePaymentMethod(id: number) {
    dispatch(setLoading(true))
    try {
      const { success, message } = await deletePaymentMethodApi(id)

      if (success) {
        getStore()
      } else {
        if (message === 'Authorization is required') {
          dispatch(errorSignOut(''))
        }

        dispatch(setLoading(false))
      }
    } catch (error) {
      getStore()
    }
  }


  async function editPaymentMethod() {
    dispatch(setLoading(true))
    try {
      if (edit) {
        const { success, message } = await editPaymentMethodApi(edit)

        if (success) {
          setEdit(null)
          getStore()
        } else {
          if (message === 'Authorization is required') {
            dispatch(errorSignOut(''))
          }

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
        <div className="title">All Payment Method</div>

        <div className="row-action">
          <button
            className="white"
            onClick={() => handlePage('')}
          >
            Back
          </button>

          <button
            className="white"
            onClick={() => handlePage('add_payment_method')}
          >
            Add Payment Method
          </button>
        </div>
      </div>

      <div className="row">
        {
          list &&
          <table className="table">
            <tr>
              <th>Name</th>
              <th>Description</th>
              <th>Period</th>
              <th>Edit</th>
              <th>Delete</th>
            </tr>

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
                          value={edit.description}
                          onChange={(event) => setEdit({ ...edit, description: event.target.value })}
                        /> :
                        item.description
                    }
                  </td>

                  <td>
                    {
                      edit && edit.id === item.id ?
                        <input
                          type="text"
                          className="input-text"
                          value={edit.period}
                          onChange={(event) => setEdit({ ...edit, period: event.target.value })}
                        /> :
                        item.period
                    }
                  </td>

                  <td>
                    {
                      !!edit && edit.id === item.id &&
                      <div
                        className="action save"
                        onClick={() => editPaymentMethod()}
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
                        onClick={() => deletePaymentMethod(item.id)}
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

export default memo(PaymentMethodList)